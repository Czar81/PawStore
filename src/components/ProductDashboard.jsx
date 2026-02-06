function ProductDashboard() {
  const products = [{
    "id": 1,
    "nombre": "Collar de cuero",
    "descripcion": "Collar resistente para perros de todos los tamaños.",
    "precio": 8500,
    "categoria": "Perros",
    "imagen": "https://placehold.co/300x200.png?text=Collar+de+cuero",
    "stock": 12
  },
  {
    "id": 2,
    "nombre": "Cama suave para gatos",
    "descripcion": "Cama acolchada y cómoda para gatos de interior.",
    "precio": 12000,
    "categoria": "Gatos",
    "imagen": "https://placehold.co/300x200.png?text=Cama+para+gatos",
    "stock": 5
  },];
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
        {products.length===0 ? (
          <tr>
            <td colSpan="6" className="no-data">
              No hay productos disponibles
            </td>
          </tr>
        ) :
        products.map((product) => {
          return (
            <tr key={product.id}>
              <td className="dashboard-cell">{product.id}</td>
              <td className="dashboard-cell">{product.nombre}</td>
              <td className="dashboard-cell">₡{product.precio}</td>
              <td className="dashboard-cell">{product.categoria}</td>
              <td className="dashboard-cell">{product.stock}</td>
              <td className="dashboard-cell dashboard-actions">
                <button className="btn-lilac" type="button">
                  Editar
                </button>
                <button className="btn-lilac" type="button">
                  Eliminar
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default ProductDashboard;
