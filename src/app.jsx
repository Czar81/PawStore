import { useState } from 'react';
import Navbar from './components/structure/Navbar';
import Footer from './components/structure/Footer';
import HomePage from './pages/HomePage';
import CatalogPage from './pages/CatalogPage';
import ProductPage from './pages/ProductPage';
import AdminPage from './pages/AdminPage';

function App() {
  const [activeView, setActiveView] = useState('start');
  return (
    <>
      <Navbar activeView={activeView} setActiveView={setActiveView} />

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
