import { useState, useEffect } from 'react';
import Navbar from './components/structure/Navbar';
import Footer from './components/structure/Footer';
import HomePage from './pages/HomePage';
import CatalogPage from './pages/CatalogPage';
import ProductPage from './pages/ProductPage';
import AdminPage from './pages/AdminPage';
import {useProductStore} from './store/productStore';
import productsData from './data/products.json';
import Spinner from './components/generic/spinner';

function App() {
  const [activeView, setActiveView] = useState('start');
  const setProducts = useProductStore((state) => state.setProducts);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProducts() {
      setLoading(true);
      setProducts(productsData);
      setLoading(false);
    }
    loadProducts();
  }, []);

  
  return (
    <>
      <Navbar activeView={activeView} setActiveView={setActiveView} />
      {loading ? (
        <main className="main-text">
          <Spinner />
        </main>
      ) : null}

      {activeView === 'start' && <HomePage setActiveView={setActiveView} />}

      {activeView === 'products' && (
        <CatalogPage setActiveView={setActiveView} />
      )}
      {activeView === 'product' && (
        <ProductPage setActiveView={setActiveView} />
      )}
      {activeView === 'admin' && <AdminPage setActiveView={setActiveView} />}
      <Footer />
    </>
  );
}

export default App;
