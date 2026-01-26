import { useEffect, useState } from 'react';
import Spinner from '../components/spinner';
import ProductCard from '../components/ProductCard';
import productsData from '../data/products.json';

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
  return (
    <main className='catalog'>
        <h2>Catalogo de Productos</h2>
        <div className='products-container'>
      {products.map((product) => (
        <ProductCard
          key={product.id}
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
