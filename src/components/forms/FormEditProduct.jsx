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
      sku: product.sku || '',
      name: product.name || '',
      description: product.description || '',
      price: product.price || '',
      category: product.category || '',
      image: product.image || '',
      amount: product.amount || '',
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
        name: data.name,
        description: data.description,
        image: data.image,
        category: data.category,
        price: parseFloat(data.price),
        amount: parseInt(data.amount),
      };

      const result = await updateProductAPI(productId, productData);
      if (result) {
        updateProductStore(productId, productData);
        clearSelectedProductId();
      } else {
        setError('Error updating product');
      }
    } catch (err) {
      setError('Error updating product');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="overlay">
      <div className="overlay-card">
        <h2>Edit Product</h2>

        <form className="form-products" onSubmit={handleSubmit(onSubmit)}>
          {error && <div className="alert-error">{error}</div>}
          <label htmlFor="sku">SKU</label>
          <input
            type="text"
            id="sku"
            className={`form-input ${errors.sku ? 'input-error' : ''}`}
            {...register('sku', { required: true })}
          />

          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            className={`form-input ${errors.name ? 'input-error' : ''}`}
            {...register('name', { required: true })}
          />

          <label htmlFor="description">Description</label>
          <textarea
            type="text"
            id="description"
            className={`form-input form-textarea ${errors.description ? 'input-error' : ''}`}
            {...register('description', { required: true })}
          />

          <label htmlFor="price">Price</label>
          <input
            type="number"
            id="price"
            className={`form-input ${errors.price ? 'input-error' : ''}`}
            {...register('price', { required: true })}
          />

          <label htmlFor="category">Category</label>
          <input
            type="text"
            id="category"
            className={`form-input ${errors.category ? 'input-error' : ''}`}
            {...register('category', { required: true })}
          />

          <label htmlFor="image">Image URL</label>
          <input
            type="text"
            id="image"
            className={`form-input ${errors.image ? 'input-error' : ''}`}
            {...register('image', { required: true })}
          />

          <label htmlFor="amount">Stock</label>
          <input
            type="number"
            id="amount"
            className={`form-input ${errors.amount ? 'input-error' : ''}`}
            {...register('amount', { required: true })}
          />

          <div className="btn-container">
            <button
              className="btn btn-blank"
              type="button"
              onClick={clearSelectedProductId}
              disabled={loading}
            >
              Cancel
            </button>

            <button className="btn btn-lilac" type="submit" disabled={loading}>
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditProductPage;
