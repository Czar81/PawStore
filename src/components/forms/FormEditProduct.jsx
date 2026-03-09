import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { useProductStore } from '@/store/productStore';
import { updateProduct as updateProductAPI } from '@/services/apiProduct';

function EditProductPage({ product }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      nombre: product.name || product.nombre,
      descripcion: product.descripcion,
      precio: product.price || product.precio,
      categoria: product.categoria,
      imagen: product.imagen,
      stock: product.amount || product.stock,
    },
  });
  const updateProductStore = useProductStore((state) => state.updateProduct);

  const clearSelectedProductId = useProductStore(
    (state) => state.clearSelectedProductId
  );

  const onSubmit = async (data) => {
    setLoading(true);
    setError(null);
    try {
      const productId = product.id_product || product.id;
      const productData = {
        sku: data.sku,
        name: data.nombre,
        price: parseFloat(data.precio),
        amount: parseInt(data.stock),
      };

      const result = await updateProductAPI(productId, productData);
      if (result) {
        updateProductStore(productId, productData);
        clearSelectedProductId();
      } else {
        setError('Error al actualizar el producto');
      }
    } catch (err) {
      setError('Error al actualizar el producto');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="overlay">
      <div className="overlay-card">
        <h2>Editar producto</h2>

        <form className="form-products" onSubmit={handleSubmit(onSubmit)}>
          {error && <div className="alert-error">{error}</div>}
          <label htmlFor="nombre">Nombre:</label>
          <input
            type="text"
            id="nombre"
            className={`form-input ${errors.nombre ? 'input-error' : ''}`}
            {...register('nombre', { required: true })}
          />

          <label htmlFor="descripcion">Descripción:</label>
          <textarea
            type="text"
            id="descripcion"
            className={`form-input form-textarea ${errors.descripcion ? 'input-error' : ''}`}
            {...register('descripcion', { required: true })}
          />

          <label htmlFor="precio">Precio:</label>
          <input
            type="number"
            id="precio"
            className={`form-input ${errors.precio ? 'input-error' : ''}`}
            {...register('precio', { required: true })}
          />

          <label htmlFor="categoria">Categoría:</label>
          <input
            type="text"
            id="categoria"
            className={`form-input ${errors.categoria ? 'input-error' : ''}`}
            {...register('categoria', { required: true })}
          />

          <label htmlFor="imagen">Imagen URL:</label>
          <input
            type="text"
            id="imagen"
            className={`form-input ${errors.imagen ? 'input-error' : ''}`}
            {...register('imagen', { required: true })}
          />

          <label htmlFor="stock">Stock:</label>
          <input
            type="number"
            id="stock"
            className={`form-input ${errors.stock ? 'input-error' : ''}`}
            {...register('stock', { required: true })}
          />

          <div className="btn-container">
            <button
              className="btn btn-blank"
              type="button"
              onClick={clearSelectedProductId}
              disabled={loading}
            >
              Cancelar
            </button>

            <button className="btn btn-lilac" type="submit" disabled={loading}>
              {loading ? 'Guardando...' : 'Guardar cambios'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditProductPage;
