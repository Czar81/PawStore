import icon from '@/assets/icons/pet-supplies.svg';
import SearchBar from '@/components/generic/SearchBar';
import AuthSection from '@/components/generic/AuthSection';
import { useUserStore } from '@/store/userStore';

function Navbar({ activeView, setActiveView }) {
  const user = useUserStore((state) => state.user);
  const isAuthenticated = useUserStore((state) => state.isAuthenticated);

  const navItems = [
    { id: 'start', label: 'Inicio' },
    { id: 'products', label: 'Productos' },
    { id: 'contact', label: 'Contacto' },
  ];

  if (isAuthenticated && user?.role === 'admin') {
    navItems.push({ id: 'admin', label: 'Administración' });
  }

  return (
    <header>
      <nav>
        <div className="nav-right">
          <img className="nav-icon" src={icon} alt="Dog icon" />
          <h1 id="nav-title">PawStore</h1>
        </div>
        <div className="nav-left">
          <ul>
            {navItems.map((item) => (
              <li
                key={item.id}
                className={`nav-items ${activeView === item.id ? 'nav-items-active' : ''}`}
                onClick={() => setActiveView(item.id)}
              >
                {item.label}
              </li>
            ))}
            <li>
              <AuthSection setActiveView={setActiveView} />
            </li>
          </ul>
        </div>
      </nav>
      {activeView === 'products' && (
        <div>
          <SearchBar />
        </div>
      )}
    </header>
  );
}

export default Navbar;
