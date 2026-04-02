import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <main className="main-text">
      <h2>Welcome to PawStore</h2>
      <p>
        We are a store dedicated to offering quality products for your pets.
      </p>
      <p>
        Explore our catalog to find beds, toys, accessories and more.
      </p>
      <Link to="/products" className="btn btn-lilac">
        View products
      </Link>
      <small>
        This is the main page of the application. Later on, featured products
        could be shown here.
      </small>
    </main>
  );
}

export default HomePage;
