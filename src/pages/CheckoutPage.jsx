import { useNavigate } from 'react-router-dom';
import { useCartStore } from '@/store/cartStore';
import { createOrder } from '@/services/apiOrder';
import { useState } from 'react';
import CheckoutForm from '@/components/forms/FormCheckout';

function CheckoutPage() {
  const cart = useCartStore((state) => state.cart);
  const total = useCartStore((state) =>
    state.cart.reduce((sum, item) => sum + item.subtotal, 0)
  );
  const clearCart = useCartStore((state) => state.clearCart);
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