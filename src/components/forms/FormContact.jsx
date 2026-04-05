import { useForm } from 'react-hook-form';

function ContactForm({ onSubmit, loading, error }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <form className="form-products" onSubmit={handleSubmit(onSubmit)}>
      {error && <div className="alert-error">{error}</div>}

      <label htmlFor="contact-name">Name</label>
      {errors.name && (
        <span role="alert" className="alert-message">
          {errors.name.message}
        </span>
      )}
      <input
        id="contact-name"
        type="text"
        placeholder="Your name"
        className={`form-input ${errors.name ? 'input-error' : ''}`}
        {...register('name', { required: 'Name is required' })}
      />

      <label htmlFor="contact-email">Email</label>
      {errors.email && (
        <span role="alert" className="alert-message">
          {errors.email.message}
        </span>
      )}
      <input
        id="contact-email"
        type="email"
        placeholder="you@email.com"
        className={`form-input ${errors.email ? 'input-error' : ''}`}
        {...register('email', {
          required: 'Email is required',
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: 'Invalid email address',
          },
        })}
      />

      <label htmlFor="contact-message">Message</label>
      {errors.message && (
        <span role="alert" className="alert-message">
          {errors.message.message}
        </span>
      )}
      <textarea
        id="contact-message"
        placeholder="Write your message here..."
        className={`form-input form-textarea ${errors.message ? 'input-error' : ''}`}
        {...register('message', { required: 'Message is required' })}
      />

      <div className="btn-container">
        <button className="btn btn-lilac" type="submit" disabled={loading}>
          {loading ? 'Sending...' : 'Send message'}
        </button>
      </div>
    </form>
  );
}

export default ContactForm;