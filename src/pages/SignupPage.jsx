import { useState } from 'react';
import { useUserStore } from '@/store/userStore';
import { signUp as signupAPI } from '@/services/user/authService';
import { getProfile } from '@/services/user/apiUser';
import FormSignup from '@/components/forms/FormSignup';

function SignupPage({ setActiveView }) {
  const setUser = useUserStore((state) => state.setUser);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const onSubmit = async (data) => {
    setLoading(true);
    setError(null);
    try {
      const signupResult  = await signupAPI({
        name: data.name,
        email: data.email,
        password: data.password,
      });

      if (!signupResult ) {
        setError('Credenciales inválidas. Intenta de nuevo.');
        return;
      }

      const userProfile = await getProfile();

      if (userProfile) {
        setUser({
          id: userProfile.id,
          name: data.name,
          email: data.email,
          role: userProfile.role || 'user',
          token: signupResult.token,
        });
        setActiveView(userProfile.role === 'admin' ? 'admin' : 'products');
      } else {
        setError('Error al obtener datos del usuario');
      }
    } catch (err) {
      setError('Error al iniciar sesión. Por favor, intenta de nuevo.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="page-generic">
      <section className="section-form">
        <h2>Crear una cuenta</h2>
        <p className="form-subtitle">Crea una cuenta de PawStore</p>

        <FormSignup onSubmit={onSubmit} loading={loading} error={error} />

        <div className="form-footer">
          <p>¿Ya tienes cuenta?</p>
          <a className='link' onClick={() => setActiveView("login")}>Inicia sesion</a>
        </div>
      </section>
    </main>
  );
}

export default SignupPage;