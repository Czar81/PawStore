import { useNavigate } from 'react-router-dom';
import { useCart } from '@/context/CartContext';

function CartPage() {
  const { cart, total, clearCart, updateQuantity, removeFromCart } = useCart();
  const navigate = useNavigate();

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

  return (
    <main className="cart-page">
      <h2 className="cart-page-title">Shopping Cart</h2>

      <div className="cart-container">
        <div className="cart-items-list">
          {cart.map((item) => (
            <div key={item.id} className="cart-item-card">
              <div className="cart-item-image">
                <img
                  src={item.image || 'https://placehold.co/100?text=N/A'}
                  alt={item.name}
                />
              </div>
              
              <span className="cart-item-name">{item.name}</span>
              
              <div className="cart-item-actions">
                <div className="quantity-controls-new">
                  <button
                    type="button"
                    onClick={() =>
                      item.quantity > 1
                        ? updateQuantity(item.id, item.quantity - 1)
                        : removeFromCart(item.id)
                    }
                  >
                    −
                  </button>
                  <span className="qty-value-new">{item.quantity}</span>
                  <button
                    type="button"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    +
                  </button>
                </div>

                <div className="cart-item-price-info">
                    <span className="item-price">Price: ₡{formatPrice(item.price)}</span>
                    <span className="item-subtotal">Subtotal: ₡{formatPrice(item.subtotal)}</span>
                </div>

                <button
                  className="btn-remove-new"
                  type="button"
                  onClick={() => removeFromCart(item.id)}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 6h18"></path>
                    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                  </svg>
                  Remove
                </button>
              </div>
            </div>
          ))}

          <div className="cart-actions-bottom">
            <button className="btn-clear-cart" onClick={clearCart}>
               Empty cart
            </button>
          </div>
        </div>

        <div className="cart-summary-card">
           <div className="cart-summary-total">
              <span>Total:</span>
              <span>₡{formatPrice(total)}</span>
           </div>
           <button 
             className="btn btn-lilac btn-checkout-continue"
             onClick={() => navigate('/checkout')}
           >
             Proceed to checkout
           </button>
        </div>
      </div>
    </main>
  );
}

export default CartPage;
