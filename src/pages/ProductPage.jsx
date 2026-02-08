import { useProductStore } from '../store/productStore';

function ProductPage({ setActiveView }) {
  const product = useProductStore((state) => state.getSelectedProduct());
  if (!product) {
    return (
      <main className="main-text">
        <h2>Producto no encontrado</h2>
        <p>El producto que buscas no existe o ha sido eliminado.</p>
        <button
          className="btn-lilac"
          type="button"
          onClick={() => setActiveView('products')}
        >
          Volver al catalogo
        </button>
      </main>
    );
  }
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
