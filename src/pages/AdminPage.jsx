import ProductDashboard from '../components/product/ProductDashboard';
import FormAddPorduct from '../components/forms/FormAddProduct';
import FormEditProduct from '../components/forms/FormEditProduct';
import { useState } from 'react';

function AdminPage({ setActiveView }) {
  const [editingProduct, setEditingProduct] = useState(null);
  return (
    <main className="admin-page">
      <section className="admin-card">
        <h2>Administración de productos</h2>
        <p>
          En esta sección puedes gestionar el catalogo de productos de PawStore
        </p>
        <ProductDashboard setEditingProduct={setEditingProduct} />
      </section>
      <section className="admin-card">
        <h2>Agregar un nuevo producto</h2>
        <FormAddPorduct />
      </section>
      {editingProduct && (
        <FormEditProduct
          product={editingProduct}
          onClose={() => setEditingProduct(null)}
        />
      )}
    </main>
  );
}

export default AdminPage;
