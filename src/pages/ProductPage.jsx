function ProductPage({ setActiveView, product }) {
  return (
    <main>
      <div className="img-product-container">
        <img className="img-product" src={product.imagen} alt="Product image" />
      </div>
      <div className="product-desc">
        <h2 className="title">{product.nombre}</h2>
        <p className="price">{product.precio}</p>
        <p className="category">{product.category}</p>
        <p>{product.descripcion}</p>
        <small>
          Más adelante aquí se podrá agregar este producto al carrito y
          completar la compra.
        </small>
        <button type="button" onClick={() => setActiveView('products')}>
          Volver al catalogo
        </button>
      </div>
    </main>
  );
}

export default ProductPage;
