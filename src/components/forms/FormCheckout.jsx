import { useForm } from 'react-hook-form';

function CheckoutForm({ onSubmit, loading, error, cart, total, formatPrice, onCancel }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <form className="checkout-grid" onSubmit={handleSubmit(onSubmit)}>

      {/* Left Side: Information */}
      <section className="checkout-info-card">
        <h2 className="checkout-card-title">Checkout Information</h2>

        <div className="checkout-form-grid">
          <div className="form-group-new">
            <label htmlFor="checkout-name">Full Name</label>
            {errors.name && (
              <span role="alert" className="alert-message">
                {errors.name.message}
              </span>
            )}
            <input
              id="checkout-name"
              type="text"
              placeholder="John Doe"
              className={`form-input-new ${errors.name ? 'input-error' : ''}`}
              {...register('name', { required: 'Full name is required' })}
            />
          </div>

          <div className="form-group-new">
            <label htmlFor="checkout-email">Email Address</label>
            {errors.email && (
              <span role="alert" className="alert-message">
                {errors.email.message}
              </span>
            )}
            <input
              id="checkout-email"
              type="email"
              placeholder="john.doe@email.com"
              className={`form-input-new ${errors.email ? 'input-error' : ''}`}
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'Invalid email address',
                },
              })}
            />
          </div>

          <div className="form-group-new">
            <label htmlFor="checkout-address">Address</label>
            {errors.address && (
              <span role="alert" className="alert-message">
                {errors.address.message}
              </span>
            )}
            <input
              id="checkout-address"
              type="text"
              placeholder="123 Fake Street, City, Country"
              className={`form-input-new ${errors.address ? 'input-error' : ''}`}
              {...register('address', { required: 'Address is required' })}
            />
          </div>

          <div className="form-group-new">
            <label htmlFor="checkout-phone">Phone</label>
            {errors.phone && (
              <span role="alert" className="alert-message">
                {errors.phone.message}
              </span>
            )}
            <input
              id="checkout-phone"
              type="tel"
              placeholder="+1 234 567 8900"
              className={`form-input-new ${errors.phone ? 'input-error' : ''}`}
              {...register('phone', { required: 'Phone is required' })}
            />
          </div>

          <p className="checkout-disclaimer">
            This information will be used to complete your purchase.
          </p>
        </div>
      </section>

      {/* Right Side: Summary */}
      <section className="checkout-summary-card">
        <h2 className="checkout-card-title">Order Summary</h2>

        <div className="checkout-items-list">
          {cart.map((item) => (
            <div key={item.id} className="checkout-summary-item">
              <div className="summary-item-info">
                <span className="summary-item-name">{item.name}</span>
                <span className="summary-item-qty">
                  {item.quantity} x ₡{formatPrice(item.price)}
                </span>
              </div>
              <span className="summary-item-subtotal">
                ₡{formatPrice(item.subtotal)}
              </span>
            </div>
          ))}
        </div>

        <div className="checkout-summary-total">
          <span>Total:</span>
          <span>₡{formatPrice(total)}</span>
        </div>

        {error && <p className="checkout-error">{error}</p>}

        <div className="checkout-actions">
          <button
            className="btn btn-lilac btn-checkout-confirm"
            type="submit"
            disabled={loading}
          >
            {loading ? 'Processing...' : 'Confirm Purchase'}
          </button>
          <button
            className="btn-checkout-cancel"
            type="button"
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>
      </section>
    </form>
  );
}

export default CheckoutForm;