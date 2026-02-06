function ProductCard({ product, onClick }) {
  return (
    <article className="product-card">
      <img src={product.imagen} alt="Image product" />
      <div className="description">
        <h3>{product.nombre}</h3>
        <p className="price">₡{product.precio}</p>
        <p className="category">{product.categoria}</p>
        <button className="btn-lilac" type="button" onClick={onClick}>
          Ver detalles
        </button>
      </div>
    </article>
  );
}

export default ProductCard;
