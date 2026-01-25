import { useState } from 'react';
import icon from '../assets/icons/pet-supplies.svg';

function Navbar() {
  const [value, setValue] = useState('start');

  const changeView = (newValue) => {
    setValue(newValue);
  };

  return (
    <nav>
      <div className="nav-right">
        <img className="nav-icon" src={icon} alt="Dog icon" />
        <h1 id="nav-title">PawStore</h1>
      </div>

      <div className="nav-left">
        <ul>
          <li className="nav-items" onClick={() => changeView('start')}>
            Inicio
          </li>
          <li className="nav-items" onClick={() => changeView('products')}>
            Productos
          </li>
          <li className="nav-items" onClick={() => changeView('contact')}>
            Contacto
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar