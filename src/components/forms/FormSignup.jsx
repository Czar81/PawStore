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
      <label htmlFor="name">Nombre Completo</label>
      {errors.name && (
        <span role="alert" className="alert-message">
          {errors.name.message}
        </span>
      )}
      <input
        type="text"
        id="name"
        className={`form-input ${errors.name ? 'input-error' : ''}`}
        placeholder="Ingresa tu nombre completo"
        {...register('name', {
          required: 'El nombre es obligatorio',
          minLength: {
            value: 5,
            message: 'El nombre debe tener al menos 5 caracteres',
          },
        })}
      />

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
            value: 8,
            message: 'La contraseña debe tener al menos 8 caracteres',
          },
        })}
      />

      <label htmlFor="confirmPass">Confirmar Contraseña</label>
      {errors.confirmPass && (
        <span role="alert" className="alert-message">
          {errors.confirmPass.message}
        </span>
      )}
      <input
        type="password"
        id="confirmPass"
        className={`form-input ${errors.confirmPass ? 'input-error' : ''}`}
        placeholder="Ingresa tu contraseña"
        {...register('confirmPass', {
          required: 'La contraseña es obligatoria',
          validate: (value) =>
            value === getValues('password') || 'Las contraseñas no coinciden',
        })}
      />

      <button type="submit" className="btn-lilac btn" disabled={loading}>
        {loading ? 'Creado cuenta...' : 'Registrarse'}
      </button>
    </form>
  );
}

export default FormSignup;
