import { useState } from 'react';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import CatalogPage from './pages/CatalogPage';
import Footer from './components/Footer';
import ProductPage from './pages/ProductPage';
import AdminPage from './pages/AdminPage';
import productData from './data/products.json';

function App() {
  const [activeView, setActiveView] = useState('start');
  const [selectedProduct, setSelectedProduct] = useState(null);
  return (
    <>
      <Navbar activeView={activeView} setActiveView={setActiveView} />

      {activeView === 'start' && <HomePage setActiveView={setActiveView} />}

      {activeView === 'products' && (
        <CatalogPage
          setActiveView={setActiveView}
          setSelectedProduct={setSelectedProduct}
        />
      )}
      {activeView === 'product' && (
        <ProductPage setActiveView={setActiveView} product={selectedProduct} />
      )}
      {activeView === 'admin' && (
        <AdminPage setActiveView={setActiveView} />
      )}
      <Footer />
    </>
  );
}

export default App;
