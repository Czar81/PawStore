import ProductDashboard from '../components/ProductDashboard';
import FormAddPorduct from '../components/FormAddProduct';

function AdminPage({ setActiveView }) {
  return (
    <main className="admin-page">
      <section className="admin-card">
        <h2>Administración de productos</h2>
        <p>
          En esta sección puedes gestionar el catalogo de productos de PawStore
        </p>
        <ProductDashboard />
      </section>
      <section className="admin-card">
        <h2>Agregar un nuevo producto</h2>
        <FormAddPorduct />
      </section>
    </main>
  );
}

export default AdminPage;
