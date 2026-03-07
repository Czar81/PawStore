import ProductCard from '@/components/product/ProductCard';
import NotFound from '@/components/generic/NotFound';
import { useProductStore } from '@/store/productStore';

function CatalogPage({ setActiveView }) {
  const setSelectedProductId = useProductStore(
    (state) => state.setSelectedProductId
  );
  const products = useProductStore((state) => state.products);

  const normalizedProducts = products.map((product) => ({
    ...product,
    id: product.id_product,
    nombre: product.name ,
    precio: product.price,
    imagen:
      product.image ||
      'https://via.placeholder.com/300x200?text=No+Image',
    categoria: product.categoria || 'Sin categoría',
    stock: product.amount|| 0,
  }));

  if (normalizedProducts.length === 0) {
    return (
      <main className="main-text">
        <NotFound
          title="No hay productos disponibles por el momento"
          desc="Intenta cambiar los filtros o la búsqueda"
        />
      </main>
    );
  }

  return (
    <main className="catalog">
      <h2>Catalogo de Productos</h2>
      <div className="products-container">
        {normalizedProducts.map((product) => (
          <ProductCard
            product={product}
            key={product.id}
            onClick={() => {
              setActiveView('product');
              setSelectedProductId(product.id);
            }}
          />
        ))}
      </div>
    </main>
  );
}

export default CatalogPage;
