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
        name: data.name,
        description: data.description,
        image: data.image,
        category: data.category,
        price: parseFloat(data.price),
        amount: parseInt(data.amount),
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
      <label htmlFor="product-sku">SKU</label>
      {errors.sku && (
        <span role="alert" className="alert-message">
          {errors.sku.message}
        </span>
      )}
      <input
        type="text"
        name="sku"
        id="product-sku"
        className={`form-input ${errors.sku ? 'input-error' : ''}`}
        placeholder="SKU del producto"
        {...register('sku', {
          setValueAs: (value) => value.trim(),
          required: 'Campo obligatorio',
        })}
      />

      <label htmlFor="product-name">Nombre</label>
      {errors.name && (
        <span role="alert" className="alert-message">
          {errors.name.message}
        </span>
      )}
      <input
        type="text"
        name="name"
        id="product-name"
        className={`form-input ${errors.name ? 'input-error' : ''}`}
        placeholder="Nombre del producto"
        {...register('name', {
          setValueAs: (value) => value.trim(),

          required: 'Campo obligatorio',
        })}
      />

      <label htmlFor="product-desc">Descripcion</label>
      {errors.description && (
        <span role="alert" className="alert-message">
          {errors.description.message}
        </span>
      )}
      <textarea
        name="description"
        id="product-desc"
        className={`form-input form-textarea ${errors.description ? 'input-error' : ''}`}
        placeholder="Descripcion detallada del producto"
        {...register('description', {
          setValueAs: (value) => value.trim(),
          required: 'Campo obligatorio',
        })}
      ></textarea>

      <div className="two-on-row">
        <div>
          <label htmlFor="product-price">Precio</label>
          {errors.price && (
            <span role="alert" className="alert-message">
              {errors.price.message}
            </span>
          )}
          <input
            type="number"
            name="price"
            id="product-price"
            className={`form-input ${errors.price ? 'input-error' : ''}`}
            placeholder="0.00"
            {...register('price', {
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
          {errors.category && (
            <span role="alert" className="alert-message">
              {errors.category.message}
            </span>
          )}
          <input
            type="text"
            name="category"
            id="product-category"
            className={`form-input ${errors.category ? 'input-error' : ''}`}
            placeholder="Categoria del producto (ej. Alimento, Juguetes)"
            {...register('category', {
              setValueAs: (value) => value.trim(),
              required: 'Campo obligatorio',
            })}
          />
        </div>
      </div>
      <label htmlFor="product-image">URL de la imagen</label>
      {errors.image && (
        <span role="alert" className="alert-message">
          {errors.image.message}
        </span>
      )}
      <input
        type="text"
        name="image"
        id="product-image"
        className={`form-input ${errors.image ? 'input-error' : ''}`}
        placeholder="https://placehold.co/300x200.png?text=example"
        {...register('image', {
          setValueAs: (value) => value.trim(),
          required: 'Campo obligatorio',
          pattern: {
            value: /^https?:\/\/.+/,
            message: 'Debe ser una URL válida',
          },
        })}
      />

      <label htmlFor="product-amount">Stock</label>
      {errors.amount && (
        <span role="alert" className="alert-message">
          {errors.amount.message}
        </span>
      )}
      <input
        type="number"
        name="amount"
        id="product-amount"
        className={`form-input ${errors.amount ? 'input-error' : ''}`}
        placeholder="0"
        {...register('amount', {
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
