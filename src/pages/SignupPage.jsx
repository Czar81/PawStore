import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { signUp as signupAPI } from '@/services/user/authService';
import { getProfile } from '@/services/user/apiUser';
import FormSignup from '@/components/forms/FormSignup';

function SignupPage() {
  const { setUser } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const onSubmit = async (data) => {
    setLoading(true);
    setError(null);
    try {
      const signupResult = await signupAPI({
        name: data.name,
        email: data.email,
        password: data.password,
      });

      if (!signupResult) {
        setError('Invalid credentials. Please try again.');
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
        navigate(userProfile.role === 'admin' ? '/admin' : '/products');
      } else {
        setError('Error fetching user profile.');
      }
    } catch (err) {
      setError('An error occurred during signup. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="page-generic">
      <section className="section-form">
        <h2>Create an account</h2>
        <p className="form-subtitle">Create a PawStore account</p>

        <FormSignup onSubmit={onSubmit} loading={loading} error={error} />

        <div className="form-footer">
          <p>Already have an account?</p>
          <a className="link" onClick={() => navigate('/login')}>
            Login here
          </a>
        </div>
      </section>
    </main>
  );
}

export default SignupPage;