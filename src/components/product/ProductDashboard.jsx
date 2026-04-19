import { useEffect, useState } from 'react';
import { useProductStore } from '@/store/productStore';
import { getProducts, deleteProduct as deleteProductAPI } from '@/services/apiProduct';

function ProductDashboard() {
  const products = useProductStore((state) => state.products);
  const setProducts = useProductStore((state) => state.setProducts);
  const setSelectedId = useProductStore((state) => state.setSelectedProductId);
  const deleteProduct = useProductStore((state) => state.deleteProduct);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getProducts();
        if (Array.isArray(data)) {
          setProducts(data);
        }
      } catch (err) {
        setError('Error loading products');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, [setProducts]);

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteProductAPI(id);
        deleteProduct(id);
      } catch (err) {
        setError('Error deleting product');
        console.error(err);
      }
    }
  };
  if (loading) {
    return <div className="loading">Loading products...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }
  return (
    <table className="dashboard">
      <thead>
        <tr className="dashboard-header">
          <th>ID</th>
          <th>NAME</th>
          <th>PRICE</th>
          <th>STOCK</th>
          <th>Category</th>
          <th className="dashboard-actions">Actions</th>
        </tr>
      </thead>
      <tbody className="dashboard-body">
        {products.length === 0 ? (
          <tr>
            <td colSpan="5" className="no-data">
              No products available
            </td>
          </tr>
        ) : (
          products.map((product) => {
            return (
              <tr key={product.id}>
                <td className="dashboard-cell">{product.id}</td>
                <td className="dashboard-cell">{product.name }</td>
                <td className="dashboard-cell">₡{product.price}</td>
                <td className="dashboard-cell">{product.amount}</td>
                <td className="dashboard-cell">{product.category}</td>
                <td className="dashboard-cell dashboard-actions">
                  <button
                    className="btn btn-lilac"
                    type="button"
                    onClick={() => setSelectedId(product.id)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-lilac"
                    type="button"
                    onClick={() => handleDelete(product.id_product || product.id)}
                  >
                    Delete
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
