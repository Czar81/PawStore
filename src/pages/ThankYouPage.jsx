import { Link, useLocation } from 'react-router-dom';
import icon from '@/assets/icons/completed.svg'

function ThankYouPage() {
  const location = useLocation();
  // Safe extraction of the order that we just passed from CheckoutPage
  const order = location.state?.order;

  const formatPriceCR = (price) => {
    return price.toLocaleString('es-CR').replace(/,/g, ' ');
  };

  return (
    <main className="thankyou-page-new">
      <div className="thankyou-success-card">
        <div className="success-icon-wrapper">
          <img src={icon} alt="Success icon" />
        </div>
        <h2 className="success-title">Purchase completed successfully</h2>
        <p className="success-message">
          Your order has been processed correctly. You will receive an email with the confirmation and details of your purchase.
        </p>
      </div>

      {order && (
        <div className="thankyou-summary-card">
          <h3 className="summary-title">Purchase Summary</h3>
          
          <table className="summary-table">
            <thead>
              <tr>
                <th className="th-product">Product</th>
                <th className="th-qty">Quantity</th>
                <th className="th-price">Unit Price</th>
                <th className="th-subtotal">Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {order.products.map((item) => (
                <tr key={item.id}>
                  <td className="td-product">{item.name}</td>
                  <td className="td-qty">{item.quantity}</td>
                  <td className="td-price">₡{formatPriceCR(item.price)}</td>
                  <td className="td-subtotal">₡{formatPriceCR(item.subtotal)}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="3" className="tf-total-label">Total</td>
                <td className="tf-total-value">₡{formatPriceCR(order.total)}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      )}

      <div className="thankyou-actions">
        <Link to="/products" className="btn btn-lilac btn-thanks-action">
          Back to catalog
        </Link>
        <Link to="/" className="btn-thanks-secondary btn">
          Go to home
        </Link>
      </div>
    </main>
  );
}

export default ThankYouPage;
