import { useState, useEffect } from 'react';
import Navbar from './components/structure/Navbar';
import Footer from './components/structure/Footer';
import ProtectedRoute from './components/structure/ProtectedRoute';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import CatalogPage from './pages/CatalogPage';
import ProductPage from './pages/ProductPage';
import AdminPage from './pages/AdminPage';
import { useProductStore } from './store/productStore';
import { useUserStore } from './store/userStore';
import { getProducts } from '@/services/apiProduct';
import { checkSession } from '@/services/user/authService';
import Spinner from './components/generic/spinner';

function App() {
  const [activeView, setActiveView] = useState('start');
  const setProducts = useProductStore((state) => state.setProducts);
  const [loading, setLoading] = useState(true);
  const isAuthenticated = useUserStore((state) => state.isAuthenticated);
  const user = useUserStore((state) => state.user);
  const logout = useUserStore((state) => state.logout);


  useEffect(() => {
    async function verifySession() {
      const isValid = await checkSession();
      if (!isValid) {
        logout();
        setActiveView('start');
      }
    }

    verifySession();
  }, []);
  useEffect(() => {
    async function loadProducts() {
      setLoading(true);
      try {
        const products = await getProducts();
        if (Array.isArray(products)) {
          setProducts(products);
        }
      } catch (err) {
        console.error('Error loading products:', err);
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, [setProducts]);

  useEffect(() => {
    if (activeView === 'admin') {
      if (!isAuthenticated || user?.role !== 'admin') {
        setActiveView('start');
      }
    }
  }, [activeView, isAuthenticated, user]);

  if (loading && activeView !== 'login' && activeView !== 'signup') {
    {
      return (
        <>
          <Navbar activeView={activeView} setActiveView={setActiveView} />
          <main className="main-text">
            <Spinner />
          </main>
          <Footer />
        </>
      );
    }
  }
  return (
    <>
      <Navbar activeView={activeView} setActiveView={setActiveView} />

      {activeView === 'start' && <HomePage setActiveView={setActiveView} />}

      {activeView === 'login' && <LoginPage setActiveView={setActiveView} />}

      {activeView === 'signup' && <SignupPage setActiveView={setActiveView} />}

      {activeView === 'products' && (
        <CatalogPage setActiveView={setActiveView} />
      )}

      {activeView === 'product' && (
        <ProductPage setActiveView={setActiveView} />
      )}

      {activeView === 'admin' && (
        <ProtectedRoute requiredRoles={['admin']}>
          <AdminPage setActiveView={setActiveView} />
        </ProtectedRoute>
      )}

      <Footer />
    </>
  );
}

export default App;
