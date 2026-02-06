import { useForm } from 'react-hook-form';
import { useEffect } from 'react';

function EditProductPage({ product, onClose }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      nombre: product.nombre,
      descripcion: product.descripcion,
      precio: product.precio,
      categoria: product.categoria,
      imagen: product.imagen,
      stock: product.stock,
    },
  });
  const onSubmit = (data) => console.log(data);
  return (
    <div className="overlay">
      <div className="overlay-card">
        <h2>Editar producto</h2>

        <form className="form-products" onSubmit={handleSubmit(onSubmit)}>
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
            <button className="btn-blank" type="button" onClick={onClose}>
              Cancelar
            </button>

            <button className="btn-lilac" type="submit">
              Guardar cambios
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditProductPage;
