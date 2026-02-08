import { useProductStore } from '../../store/productStore';

function ProductDashboard() {
  const products = useProductStore((state) => state.products);
  const setSelectedId = useProductStore((state) => state.setSelectedProductId);
  const deleteProduct = useProductStore((state) => state.deleteProduct);
  return (
    <table className="dashboard">
      <thead>
        <tr className="dashboard-header">
          <th>ID</th>
          <th>NOMBRE</th>
          <th>PRECIO</th>
          <th>CATEGORIA</th>
          <th>STOCK</th>
          <th className="dashboard-actions">Actions</th>
        </tr>
      </thead>
      <tbody className="dashboard-body">
        {products.length === 0 ? (
          <tr>
            <td colSpan="6" className="no-data">
              No hay productos disponibles
            </td>
          </tr>
        ) : (
          products.map((product) => {
            return (
              <tr key={product.id}>
                <td className="dashboard-cell">{product.id}</td>
                <td className="dashboard-cell">{product.nombre}</td>
                <td className="dashboard-cell">₡{product.precio}</td>
                <td className="dashboard-cell"><span className="dashboard-category">{product.categoria}</span></td>
                <td className="dashboard-cell">{product.stock}</td>
                <td className="dashboard-cell dashboard-actions">
                  <button
                    className="btn-lilac"
                    type="button"
                    onClick={() => setSelectedId(product.id)}
                  >
                    Editar
                  </button>
                  <button
                    className="btn-lilac"
                    type="button"
                    onClick={() => deleteProduct(product.id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            );
          })
        )}
      </tbody>
    </table>
  );
}

export default ProductDashboard;
