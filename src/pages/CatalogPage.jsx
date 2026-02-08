import ProductCard from '../components/product/ProductCard';
import NotFound from '../components/generic/NotFound';
import { useProductStore } from '../store/productStore';

function CatalogPage({ setActiveView }) {
  const setSelectedProductId = useProductStore(
    (state) => state.setSelectedProductId
  );
  const products = useProductStore((state) => state.products);

  if (products.length === 0) {
    return (
      <main className="main-text">
        <NotFound
          title="No hay productos disponibles por el momento"
          desc="Intenta cambiar los filtros o la busqueda"
        />
      </main>
    );
  }
  return (
    <main className="catalog">
      <h2>Catalogo de Productos</h2>
      <div className="products-container">
        {products.map((product) => (
          <ProductCard
            product={product}
            key={product.id}
            onClick={() => {
              setActiveView('product');
              setSelectedProductId(product.id);
            }}
          />
        ))}
      </div>
    </main>
  );
}

export default CatalogPage;
