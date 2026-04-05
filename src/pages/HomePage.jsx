import { Link, useNavigate } from 'react-router-dom';
import { useProductStore } from '@/store/productStore';

function HomePage() {
  const products = useProductStore((state) => state.products);
  // Show up to 6 products
  const featuredProducts = products.slice(0, 6);
  const navigate = useNavigate();

  const handleProductClick = (id) => {
    navigate(`/products/${id}`);
  };

  const formatPrice = (price) => {
    return price.toLocaleString('es-CR').replace(/,/g, ' ');
  };

  return (
    <main className="main-text">
      <h2>Welcome to PawStore</h2>
      <p>
        We are a store dedicated to offering quality products for your pets.
      </p>
      <p>
        Explore our catalog to find beds, toys, accessories and health.
      </p>
      <Link to="/products" className="btn btn-lilac" style={{marginBottom: "2rem", display: "inline-block"}}>
        View products
      </Link>
      <br/>
      <small>This is the main page of the application.</small>

      <section className="featured-section" style={{marginTop: "5rem"}}>
        <h2 className="featured-title">Featured Products</h2>
        <div className="featured-grid">
          {featuredProducts.length > 0 ? (
            featuredProducts.map((product) => (
              <div key={product.id} className="featured-card">
                <div className="featured-card-img-wrapper">
                   <img src={product.image || 'https://placehold.co/300x300?text=No+Image'} alt={product.name} />
                </div>
                <div className="featured-card-content">
                  <h3 className="featured-card-title">{product.name}</h3>
                  <p className="featured-card-price">₡{formatPrice(product.price)}</p>
                  <button 
                    className="btn-featured-details"
                    onClick={() => handleProductClick(product.id)}
                  >
                    View details
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="no-products">No featured products available.</p>
          )}
        </div>
      </section>
    </main>
  );
}

export default HomePage;
