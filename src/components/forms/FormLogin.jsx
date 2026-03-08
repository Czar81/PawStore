import { useForm } from 'react-hook-form';

function FormLogin({ onSubmit, loading, error }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <form className="form-login" onSubmit={handleSubmit(onSubmit)}>
      {error && <div className="alert-error">{error}</div>}

      <label htmlFor="email">Correo Electrónico</label>
      {errors.email && (
        <span role="alert" className="alert-message">
          {errors.email.message}
        </span>
      )}
      <input
        type="email"
        id="email"
        className={`form-input ${errors.email ? 'input-error' : ''}`}
        placeholder="Ingresa tu correo"
        {...register('email', {
          required: 'El correo es obligatorio',
          minLength: {
            value: 3,
            message: 'El correo debe tener al menos 3 caracteres',
          },
        })}
      />

      <label htmlFor="password">Contraseña</label>
      {errors.password && (
        <span role="alert" className="alert-message">
          {errors.password.message}
        </span>
      )}
      <input
        type="password"
        id="password"
        className={`form-input ${errors.password ? 'input-error' : ''}`}
        placeholder="Ingresa tu contraseña"
        {...register('password', {
          required: 'La contraseña es obligatoria',
          minLength: {
            value: 6,
            message: 'La contraseña debe tener al menos 6 caracteres',
          },
        })}
      />

      <button type="submit" className="btn-lilac btn" disabled={loading}>
        {loading ? 'Iniciando sesión...' : 'Iniciar sesión'}
      </button>
    </form>
  );
}

export default FormLogin;