import { useNavigate } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { createOrder } from '@/services/apiOrder';
import { useState } from 'react';
import CheckoutForm from '@/components/forms/FormCheckout';

function CheckoutPage() {
  const { cart, total, clearCart } = useCart();
  const { isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  if (cart.length === 0) {
    return (
      <main className="main-text">
        <h2>Your cart is empty</h2>
        <p>Add products from our catalog to get started.</p>
        <button
          className="btn btn-lilac"
          type="button"
          onClick={() => navigate('/products')}
        >
          View products
        </button>
      </main>
    );
  }

  if (!isLoading && !isAuthenticated) {
    return (
      <main className="main-text">
        <h2>Sign in to continue</h2>
        <p>You need to be logged in to place an order.</p>
        <div className="btn-container" style={{ justifyContent: 'center', gap: '1rem' }}>
          <button
            className="btn btn-lilac"
            type="button"
            onClick={() => navigate('/login')}
          >
            Log in
          </button>
          <button
            className="btn btn-blank"
            type="button"
            onClick={() => navigate('/register')}
          >
            Create account
          </button>
        </div>
      </main>
    );
  }

  const formatPrice = (price) => {
    return price.toLocaleString('es-CR').replace(/,/g, ' ');
  };

  const handleSubmit = async (data) => {
    setLoading(true);
    setError(null);

    const orderData = {
      customer: {
        name: data.name,
        email: data.email,
        address: data.address,
        phone: data.phone,
      },
      products: cart.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        subtotal: item.subtotal,
      })),
      total,
    };

    try {
      const result = await createOrder(orderData);
      if (result) {
        clearCart();
        navigate('/thanks', { state: { order: orderData } });
      } else {
        setError('There was a problem processing your purchase. Please try again.');
      }
    } catch {
      setError('There was a problem processing your purchase. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="checkout-page-split">
      <CheckoutForm
        onSubmit={handleSubmit}
        loading={loading}
        error={error}
        cart={cart}
        total={total}
        formatPrice={formatPrice}
        onCancel={() => navigate('/cart')}
      />
    </main>
  );
}

export default CheckoutPage;