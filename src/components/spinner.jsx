function Spinner({ size = 40, text = 'Cargando...' }) {
  return (
    <>
      <div className="spinner" style={{ width: size, height: size }} />
      <span className="sr-only">{text}</span>
    </>
  );
}

export default Spinner;
