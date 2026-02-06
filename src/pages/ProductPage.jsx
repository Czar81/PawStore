function ProductPage({ setActiveView, product }) {
  return (
    <main className="product-details">
      <div className="img-product-container">
        <img className="img-product" src={product.imagen} alt="Product image" />
      </div>
      <div className="product-desc">
        <h2 className="title">{product.nombre}</h2>
        <p className="price">₡{product.precio}</p>
        <p className="category">{product.categoria}</p>
        <p className="description">{product.descripcion}</p>
        <small>
          Más adelante aquí se podrá agregar este producto al carrito y
          completar la compra.
        </small>
        <button
          className="btn-lilac"
          type="button"
          onClick={() => setActiveView('products')}
        >
          Volver al catalogo
        </button>
      </div>
    </main>
  );
}

export default ProductPage;
