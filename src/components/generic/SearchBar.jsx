import icon from '../../assets/icons/hand-lens.svg';
function SearchBar() {
  return (
    <div className="search-bar">
      <div className="search-wrapper">
        <img src={icon} alt="" className="search-icon" />
        <input
          className="search"
          type="text"
          placeholder="Buscar producto..."
        />
      </div>
      <div className="checkbox-wrapper">
        <input type="checkbox" name="available" id="chk-available" />
        <label htmlFor="chk-available">Mostrar solo disponibles</label>
      </div>
    </div>
  );
}

export default SearchBar;
