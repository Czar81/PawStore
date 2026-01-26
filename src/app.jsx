import { useState } from 'react';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import CatalogPage from './pages/CatalogPage';
import Footer from './components/Footer';

function App() {
  const [activeView, setActiveView] = useState('start');

  return (
    <>
      <Navbar activeView={activeView} setActiveView={setActiveView} />

      {activeView === 'start' && <HomePage setActiveView={setActiveView} />}

      {activeView === 'products' && (
        <CatalogPage setActiveView={setActiveView} />
      )}
      <Footer />
    </>
  );
}

export default App;
