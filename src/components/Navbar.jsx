import icon from '/src/assets/icons/pet-supplies.svg';
import SearchBar from '../components/SearchBar';

function Navbar({ activeView, setActiveView }) {
  const navItems = [
    { id: 'start', label: 'Inicio' },
    { id: 'products', label: 'Productos' },
    { id: 'contact', label: 'Contacto' },
  ];

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
