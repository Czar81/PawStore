import { NavLink, Link, useLocation } from 'react-router-dom';
import dogIcon from '@/assets/icons/pet-supplies.svg';
import cartIcon from '@/assets/icons/cart.svg';
import SearchBar from '@/components/generic/SearchBar';
import AuthSection from '@/components/generic/AuthSection';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';

function Navbar() {
  const { user, isAuthenticated } = useAuth();
  const { cart } = useCart();
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const location = useLocation();

  const navItems = [
    { to: '/', label: 'Home' },
    { to: '/products', label: 'Products' },
    { to: '/contact', label: 'Contact' },
  ];

  if (isAuthenticated && user?.role === 'admin') {
    navItems.push({ to: '/admin', label: 'Admin' });
  }

  return (
    <header>
      <nav>
        <div className="nav-right">
          <img className="nav-icon" src={dogIcon} alt="Dog icon" />
          <h1 id="nav-title">PawStore</h1>
        </div>
        <div className="nav-left">
          <ul>
            {navItems.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    `nav-items ${isActive ? 'nav-items-active' : ''}`
                  }
                  end={item.to === '/'}
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
            <li>
              <Link to="/cart" className="cart-link nav-items">
                <img src={cartIcon} alt="" className='icon'/>
                {cartCount > 0 && (
                  <span className="cart-badge">{cartCount}</span>
                )}
              </Link>
            </li>
            <li>
              <AuthSection />
            </li>
          </ul>
        </div>
      </nav>
      {location.pathname === '/products' && (
        <div>
          <SearchBar />
        </div>
      )}
    </header>
  );
}

export default Navbar;
