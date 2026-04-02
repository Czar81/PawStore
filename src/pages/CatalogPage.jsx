import { useNavigate } from 'react-router-dom';
import { useProductStore } from '@/store/productStore';
import ProductCard from '@/components/product/ProductCard';
import NotFound from '@/components/generic/NotFound';

function CatalogPage() {
  const products = useProductStore((state) => state.products);
  const navigate = useNavigate();

  if (products.length === 0) {
    return (
      <main className="main-text">
        <NotFound
          title="No products available at the moment"
          desc="Try changing filters or search"
        />
      </main>
    );
  }

  return (
    <main className="catalog">
      <h2>Product Catalog</h2>
      <div className="products-container">
        {products.map((product) => (
          <ProductCard
            product={product}
            key={product.id}
            onClick={() => navigate(`/products/${product.id}`)}
          />
        ))}
      </div>
    </main>
  );
}

export default CatalogPage;
