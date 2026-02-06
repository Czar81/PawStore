import { useForm } from 'react-hook-form';

function FormAddPorduct() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);
  return (
    <form className="form-products" onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="product-name">Nombre</label>
      {errors.nombre && <span role="alert" className="alert-message">{errors.nombre.message}</span>}
      <input
        type="text"
        name="nombre"
        id="product-name"
        className={`form-input ${errors.nombre ? 'input-error' : ''}`}
        placeholder="Nombre del producto"
        {...register('nombre', {
          required: 'Campo obligatorio',
        })}
      />

      <label htmlFor="product-desc">Descripcion</label>
      {errors.descripcion && (
        <span role="alert" className="alert-message">{errors.descripcion.message}</span>
      )}
      <textarea
        name="descripcion"
        id="product-desc"
        className={`form-input form-textarea ${errors.descripcion ? 'input-error' : ''}`}
        placeholder="Descripcion detallada del producto"
        {...register('descripcion', {
          required: 'Campo obligatorio',
        })}
      ></textarea>
      
      <div className="two-on-row">
        <div>
          <label htmlFor="product-price">Precio</label>
          {errors.precio && (
        <span role="alert" className="alert-message">{errors.precio.message}</span>
      )}
          <input
            type="number"
            name="precio"
            id="product-price"
            className={`form-input ${errors.precio ? 'input-error' : ''}`}
            placeholder="0.00"
            {...register('precio', {
              required: 'Campo obligatorio',
            })}
          />
          
        </div>
        <div>
          <label htmlFor="product-category">Categoria</label>
          {errors.categoria && (
        <span role="alert" className="alert-message">{errors.categoria.message}</span>
      )}
          <input
            type="text"
            name="categoria"
            id="product-category"
            className={`form-input ${errors.categoria ? 'input-error' : ''}`}
            placeholder="Categoria del producto (ej. Alimento, Juguetes)"
            {...register('categoria', {
              required: 'Campo obligatorio',
            })}
          />
          
        </div>
      </div>
      <label htmlFor="product-img">URL de la imagen</label>
      {errors.imagen && (
        <span role="alert" className="alert-message">{errors.imagen.message}</span>
      )}
      <input
        type="text"
        name="imagen"
        id="product-img"
        className={`form-input ${errors.imagen ? 'input-error' : ''}`}
        placeholder="https://placehold.co/300x200.png?text=example"
        {...register('imagen', {
          required: 'Campo obligatorio',
        })}
      />
        
      <label htmlFor="product-stock">Stock</label>
      <input
        type="number"
        name="stock"
        id="product-stock"
        className={`form-input ${errors.stock ? 'input-error' : ''}`}
        placeholder="0"
        {...register('stock', {
          required: 'Campo obligatorio',
        })}
      />
      {errors.stock && (
        <span role="alert" className="alert-message">{errors.stock.message}</span>
      )}
      <button type="submit" className="btn-lilac">
        Agregar producto
      </button>
    </form>
  );
}

export default FormAddPorduct;
