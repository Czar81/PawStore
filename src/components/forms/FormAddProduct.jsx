import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useProductStore } from '@/store/productStore';
import { createProduct as createProductAPI } from '@/services/apiProduct';

function FormAddPorduct() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const addProduct = useProductStore((state) => state.addProduct);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const onSubmit = async (data) => {
    setLoading(true);
    setError(null);
    try {
      const productData = {
        sku: data.sku,
        name: data.nombre,
        price: parseFloat(data.precio),
        amount: parseInt(data.stock),
      };
      
      const result = await createProductAPI(productData);
      if (result?.id) {
        addProduct({ ...productData, id: result.id, id_product: result.id });
        reset();
      } else {
        setError('Error al crear el producto');
      }
    } catch (err) {
      setError('Error al crear el producto');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <form className="form-products" onSubmit={handleSubmit(onSubmit)}>
      {error && <div className="alert-error">{error}</div>}
      <label htmlFor="product-name">Nombre</label>
      {errors.nombre && (
        <span role="alert" className="alert-message">
          {errors.nombre.message}
        </span>
      )}
      <input
        type="text"
        name="nombre"
        id="product-name"
        className={`form-input ${errors.nombre ? 'input-error' : ''}`}
        placeholder="Nombre del producto"
        {...register('nombre', {
          setValueAs: (value) => value.trim(),

          required: 'Campo obligatorio',
        })}
      />

      <label htmlFor="product-desc">Descripcion</label>
      {errors.descripcion && (
        <span role="alert" className="alert-message">
          {errors.descripcion.message}
        </span>
      )}
      <textarea
        name="descripcion"
        id="product-desc"
        className={`form-input form-textarea ${errors.descripcion ? 'input-error' : ''}`}
        placeholder="Descripcion detallada del producto"
        {...register('descripcion', {
          setValueAs: (value) => value.trim(),
          required: 'Campo obligatorio',
        })}
      ></textarea>

      <div className="two-on-row">
        <div>
          <label htmlFor="product-price">Precio</label>
          {errors.precio && (
            <span role="alert" className="alert-message">
              {errors.precio.message}
            </span>
          )}
          <input
            type="number"
            name="precio"
            id="product-price"
            className={`form-input ${errors.precio ? 'input-error' : ''}`}
            placeholder="0.00"
            {...register('precio', {
              required: 'Campo obligatorio',
              setValueAs: (value) => value.trim(),
              min: {
                value: 0,
                message: 'No puede ser negativo',
              },
            })}
          />
        </div>
        <div>
          <label htmlFor="product-category">Categoria</label>
          {errors.categoria && (
            <span role="alert" className="alert-message">
              {errors.categoria.message}
            </span>
          )}
          <input
            type="text"
            name="categoria"
            id="product-category"
            className={`form-input ${errors.categoria ? 'input-error' : ''}`}
            placeholder="Categoria del producto (ej. Alimento, Juguetes)"
            {...register('categoria', {
              setValueAs: (value) => value.trim(),
              required: 'Campo obligatorio',
            })}
          />
        </div>
      </div>
      <label htmlFor="product-img">URL de la imagen</label>
      {errors.imagen && (
        <span role="alert" className="alert-message">
          {errors.imagen.message}
        </span>
      )}
      <input
        type="text"
        name="imagen"
        id="product-img"
        className={`form-input ${errors.imagen ? 'input-error' : ''}`}
        placeholder="https://placehold.co/300x200.png?text=example"
        {...register('imagen', {
          setValueAs: (value) => value.trim(),
          required: 'Campo obligatorio',
          pattern: {
            value: /^https?:\/\/.+/,
            message: 'Debe ser una URL válida',
          },
        })}
      />

      <label htmlFor="product-stock">Stock</label>
      {errors.stock && (
        <span role="alert" className="alert-message">
          {errors.stock.message}
        </span>
      )}
      <input
        type="number"
        name="stock"
        id="product-stock"
        className={`form-input ${errors.stock ? 'input-error' : ''}`}
        placeholder="0"
        {...register('stock', {
          setValueAs: (value) => value.trim(),
          min: {
            value: 0,
            message: 'No puede ser negativo',
          },
          required: 'Campo obligatorio',
        })}
      />
      <button type="submit" className="btn btn-lilac" disabled={loading}>
        {loading ? 'Agregando...' : 'Agregar producto'}
      </button>
    </form>
  );
}

export default FormAddPorduct;
