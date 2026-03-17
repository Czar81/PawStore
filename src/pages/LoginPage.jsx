import { useState } from 'react';
import { useUserStore } from '@/store/userStore';
import { login as loginAPI } from '@/services/user/authService';
import { getProfile } from '@/services/user/apiUser';
import FormLogin from '@/components/forms/FormLogin';

function LoginPage({ setActiveView }) {
  const setUser = useUserStore((state) => state.setUser);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const onSubmit = async (data) => {
    setLoading(true);
    setError(null);
    try {
      const loginResult = await loginAPI({
        email: data.email,
        password: data.password,
      });

      if (!loginResult) {
        console.log(loginResult)
        setError('Credenciales inválidas. Intenta de nuevo.');
        return;
      }

      const userProfile = await getProfile();

      if (userProfile) {
        setUser({
          id: userProfile.id,
          email: data.email,
          role: userProfile.role || 'user',
          token: loginResult.token,
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
        <h2>Iniciar Sesión</h2>
        <p className="login-subtitle">Accede a tu cuenta de PawStore</p>

        <FormLogin onSubmit={onSubmit} loading={loading} error={error} />

        <div className="form-footer">
          <p>¿No tienes cuenta?</p>
          <a className='link' onClick={() => setActiveView("signup")}>Crea una aqui</a>
        </div>
      </section>
    </main>
  );
}

export default LoginPage;