import ProductDashboard from '../components/product/ProductDashboard';
import FormAddPorduct from '../components/forms/FormAddProduct';
import FormEditProduct from '../components/forms/FormEditProduct';
import { useProductStore } from '../store/productStore';

function AdminPage() {
  const selectedProduct = useProductStore((state) =>
    state.getSelectedProduct()
  );

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
      {selectedProduct && <FormEditProduct product={selectedProduct} />}
    </main>
  );
}

export default AdminPage;
