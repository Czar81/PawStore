import ProductDashboard from '@/components/product/ProductDashboard';
import FormAddPorduct from '@/components/forms/FormAddProduct';
import FormEditProduct from '@/components/forms/FormEditProduct';
import { useProductStore } from '@/store/productStore';

function AdminPage() {
  const selectedProduct = useProductStore((state) =>
    state.getSelectedProduct()
  );

  return (
    <main className="admin-page">
      <section className="admin-card">
        <h2>Product Administration</h2>
        <p>
          In this section you can manage the PawStore product catalog.
        </p>
        <ProductDashboard />
      </section>
      <section className="admin-card">
        <h2>Add a new product</h2>
        <FormAddPorduct />
      </section>
      {selectedProduct && <FormEditProduct product={selectedProduct} />}
    </main>
  );
}

export default AdminPage;
