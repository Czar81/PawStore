import { useParams, useNavigate } from 'react-router-dom';
import { useProductStore } from '@/store/productStore';
import { useCartStore } from '@/store/cartStore';

function ProductPage() {
  const { id } = useParams();
  const product = useProductStore((state) =>
    state.products.find((p) => p.id === Number(id))
  );
  const addToCart = useCartStore((state) => state.addToCart);
  const navigate = useNavigate();

  if (!product) {
    return (
      <main className="main-text">
        <h2>Product not found</h2>
        <p>The product you are looking for does not exist or has been removed.</p>
        <button
          className="btn btn-lilac"
          type="button"
          onClick={() => navigate('/products')}
        >
          Back to catalog
        </button>
      </main>
    );
  }

  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <main className="product-details">
      <div className="img-product-container">
        <img
          className="img-product"
          src={product.image || 'https://placehold.co/400?text=No+Image'}
          alt="Product image"
        />
      </div>
      <div className="product-desc">
        <h2 className="title">{product.name || 'No name'}</h2>
        <p className="price">₡{product.price || 0}</p>
        <p className="category">{product.category || 'No category'}</p>
        <p className="description">
          {product.description || 'No description'}
        </p>
        <button
          className="btn btn-lilac"
          type="button"
          onClick={handleAddToCart}
        >
          Add to cart
        </button>
        <button
          className="btn btn-blank"
          type="button"
          onClick={() => navigate('/products')}
        >
          Back to catalog
        </button>
      </div>
    </main>
  );
}

export default ProductPage;
