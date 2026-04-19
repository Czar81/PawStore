import { useForm } from 'react-hook-form';

function FormLogin({ onSubmit, loading, error }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <form className="form-generic" onSubmit={handleSubmit(onSubmit)}>
      {error && <div className="alert-error">{error}</div>}

      <label htmlFor="email">Email Address</label>
      {errors.email && (
        <span role="alert" className="alert-message">
          {errors.email.message}
        </span>
      )}
      <input
        type="email"
        id="email"
        className={`form-input ${errors.email ? 'input-error' : ''}`}
        placeholder="Enter your email"
        {...register('email', {
          required: 'Email is required',
          minLength: {
            value: 3,
            message: 'Email must be at least 3 characters',
          },
        })}
      />

      <label htmlFor="password">Password</label>
      {errors.password && (
        <span role="alert" className="alert-message">
          {errors.password.message}
        </span>
      )}
      <input
        type="password"
        id="password"
        className={`form-input ${errors.password ? 'input-error' : ''}`}
        placeholder="Enter your password"
        {...register('password', {
          required: 'Password is required',
          minLength: {
            value: 6,
            message: 'Password must be at least 6 characters',
          },
        })}
      />

      <button type="submit" className="btn-lilac btn" disabled={loading}>
        {loading ? 'Logging in...' : 'Login'}
      </button>
    </form>
  );
}

export default FormLogin;