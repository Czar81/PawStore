import { Link } from 'react-router-dom';
import icon from '@/assets/icons/not_found.png'
function NotFoundPage() {
  return (
    <main className="main-text">
      <img src={icon} alt="Not found" />
      <h2>Page not found</h2>
      <p>The requested path does not exist or has been moved.</p>
      <Link to="/" className="btn btn-lilac">
        Back to home
      </Link>
    </main>
  );
}

export default NotFoundPage;
