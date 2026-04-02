function Spinner({ size = 40, text = 'Loading...' }) {
  return (
    <>
      <div className="spinner" style={{ width: size, height: size }} />
      <span className="spinner-text">{text}</span>
    </>
  );
}

export default Spinner;
