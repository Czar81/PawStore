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
import { useAuth } from './context/AuthContext';
import { getProducts } from '@/services/apiProduct';
import Spinner from './components/generic/spinner';

function App() {
  const setProducts = useProductStore((state) => state.setProducts);
  const { isLoading: authLoading } = useAuth();
  const [loadingProducts, setLoadingProducts] = useState(true);

  useEffect(() => {
    async function initProducts() {
      setLoadingProducts(true);
      try {
        const products = await getProducts();
        if (Array.isArray(products)) {
          setProducts(products);
        }
      } catch (err) {
        console.error('Error fetching products:', err);
      } finally {
        setLoadingProducts(false);
      }
    }

    initProducts();
  }, [setProducts]);

  if (authLoading || loadingProducts) {
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
