import { useEffect, useState } from 'react';
import Spinner from '../components/spinner';
import ProductCard from '../components/ProductCard';
import productsData from '../data/products.json';
import NotFound from '../components/NotFound';

function CatalogPage({ setActiveView }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setProducts(productsData);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <main className="main-text">
        <Spinner size={48} text="Cargando productos..." />
      </main>
    );
  }
  if (products.length===0) {
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
            onClick={() => {
              setActiveView('product');
            }}
          />
        ))}
      </div>
    </main>
  );
}

export default CatalogPage;
