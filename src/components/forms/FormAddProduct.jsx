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
        setError('Error creating product');
      }
    } catch (err) {
      setError('Error creating product');
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
        placeholder="Product SKU"
        {...register('sku', {
          setValueAs: (value) => value.trim(),
          required: 'Required field',
        })}
      />

      <label htmlFor="product-name">Name</label>
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
        placeholder="Product name"
        {...register('name', {
          setValueAs: (value) => value.trim(),

          required: 'Required field',
        })}
      />

      <label htmlFor="product-desc">Description</label>
      {errors.description && (
        <span role="alert" className="alert-message">
          {errors.description.message}
        </span>
      )}
      <textarea
        name="description"
        id="product-desc"
        className={`form-input form-textarea ${errors.description ? 'input-error' : ''}`}
        placeholder="Detailed product description"
        {...register('description', {
          setValueAs: (value) => value.trim(),
          required: 'Required field',
        })}
      ></textarea>

      <div className="two-on-row">
        <div>
          <label htmlFor="product-price">Price</label>
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
              required: 'Required field',
              setValueAs: (value) => value.trim(),
              min: {
                value: 0,
                message: 'Cannot be negative',
              },
            })}
          />
        </div>
        <div>
          <label htmlFor="product-category">Category</label>
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
            placeholder="Product category (e.g. Food, Toys)"
            {...register('category', {
              setValueAs: (value) => value.trim(),
              required: 'Required field',
            })}
          />
        </div>
      </div>
      <label htmlFor="product-image">Image URL</label>
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
          required: 'Required field',
          pattern: {
            value: /^https?:\/\/.+/,
            message: 'Must be a valid URL',
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
            message: 'Cannot be negative',
          },
          required: 'Required field',
        })}
      />
      <button type="submit" className="btn btn-lilac" disabled={loading}>
        {loading ? 'Adding...' : 'Add product'}
      </button>
    </form>
  );
}

export default FormAddPorduct;
