import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/structure/Navbar';
import Footer from './components/structure/Footer';
import ProtectedRoute from './components/structure/ProtectedRoute';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import CatalogPage from './pages/CatalogPage';
import ProductPage from './pages/ProductPage';
import AdminPage from './pages/AdminPage';
import CheckoutPage from './pages/CheckoutPage';
import CartPage from './pages/CartPage';
import ThankYouPage from './pages/ThankYouPage';
import ContactPage from './pages/ContactPage';
import NotFoundPage from './pages/NotFoundPage';
import { useProductStore } from './store/productStore';
import { useUserStore } from './store/userStore';
import { getProducts } from '@/services/apiProduct';
import { checkSession } from '@/services/user/authService';
import { getProfile } from '@/services/user/apiUser';
import Spinner from './components/generic/spinner';

function App() {
  const setProducts = useProductStore((state) => state.setProducts);
  const [loading, setLoading] = useState(true);
  const setUser = useUserStore((state) => state.setUser);
  const logout = useUserStore((state) => state.logout);

  useEffect(() => {
    async function initialize() {
      setLoading(true);
      try {
        const isValid = await checkSession();
        if (isValid) {
          const profile = await getProfile();
          if (profile) {
            setUser({
              id: profile.id,
              email: profile.email,
              role: profile.role || 'user',
            });
          }
        } else {
          logout();
        }

        const products = await getProducts();
        if (Array.isArray(products)) {
          setProducts(products);
        }
      } catch (err) {
        console.error('Error initializing app:', err);
      } finally {
        setLoading(false);
      }
    }

    initialize();
  }, []);

  if (loading) {
    return (
      <>
        <Navbar />
        <main className="main-text">
          <Spinner />
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<CatalogPage />} />
        <Route path="/products/:id" element={<ProductPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/thanks" element={<ThankYouPage />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute requiredRoles={['admin']}>
              <AdminPage />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
