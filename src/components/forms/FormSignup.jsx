import { useForm } from 'react-hook-form';

function FormSignup({ onSubmit, loading, error }) {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();

  return (
    <form className="form-generic" onSubmit={handleSubmit(onSubmit)}>
      {error && <div className="alert-error">{error}</div>}
      <label htmlFor="name">Full Name</label>
      {errors.name && (
        <span role="alert" className="alert-message">
          {errors.name.message}
        </span>
      )}
      <input
        type="text"
        id="name"
        className={`form-input ${errors.name ? 'input-error' : ''}`}
        placeholder="Enter your full name"
        {...register('name', {
          required: 'Name is required',
          minLength: {
            value: 5,
            message: 'Name must be at least 5 characters',
          },
        })}
      />

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
            value: 8,
            message: 'Password must be at least 8 characters',
          },
        })}
      />

      <label htmlFor="confirmPass">Confirm Password</label>
      {errors.confirmPass && (
        <span role="alert" className="alert-message">
          {errors.confirmPass.message}
        </span>
      )}
      <input
        type="password"
        id="confirmPass"
        className={`form-input ${errors.confirmPass ? 'input-error' : ''}`}
        placeholder="Confirm your password"
        {...register('confirmPass', {
          required: 'Password confirmation is required',
          validate: (value) =>
            value === getValues('password') || 'Passwords do not match',
        })}
      />

      <button type="submit" className="btn-lilac btn" disabled={loading}>
        {loading ? 'Creating account...' : 'Sign Up'}
      </button>
    </form>
  );
}

export default FormSignup;
