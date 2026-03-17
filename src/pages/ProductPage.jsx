import { useProductStore } from '@/store/productStore';

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
        <img className="img-product" src={product.imagen || 'https://via.placeholder.com/400'} alt="Product image" />
      </div>
      <div className="product-desc">
        <h2 className="title">{product.name || 'Sin nombre'}</h2>
        <p className="price">₡{product.price  || 0}</p>
        <p className="category">{product.categoria || 'Sin categoría'}</p>
        <p className="description">{product.descripcion || 'Sin descripción'}</p>
        <small>
          Más adelante aquí se podrá agregar este producto al carrito y
          completar la compra.
        </small>
        <button
          className="btn btn-lilac"
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
