import { useState } from 'react';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import CatalogPage from './pages/CatalogPage';
import Footer from './components/Footer';
import ProductPage from './pages/ProductPage';

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
      <Footer />
    </>
  );
}

export default App;
