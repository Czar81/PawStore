import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { login as loginAPI } from '@/services/user/authService';
import { getProfile } from '@/services/user/apiUser';
import FormLogin from '@/components/forms/FormLogin';

function LoginPage() {
  const { setUser } = useAuth();
  const navigate = useNavigate();
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
        setError('Invalid credentials. Please try again.');
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
        navigate(userProfile.role === 'admin' ? '/admin' : '/products');
      } else {
        setError('Error fetching user profile.');
      }
    } catch (err) {
      setError('An error occurred during login. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="page-generic">
      <section className="section-form">
        <h2>Login</h2>
        <p className="login-subtitle">Access your PawStore account</p>

        <FormLogin onSubmit={onSubmit} loading={loading} error={error} />

        <div className="form-footer">
          <p>Don't have an account?</p>
          <a className="link" onClick={() => navigate('/signup')}>
            Create one here
          </a>
        </div>
      </section>
    </main>
  );
}

export default LoginPage;