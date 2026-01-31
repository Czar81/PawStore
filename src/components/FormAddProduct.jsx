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
      <input
        type="text"
        name="nombre"
        id="product-name"
        className="form-input"
        placeholder="Nombre del producto"
        {...register('nombre', {
          required: 'Campo obligatorio',
        })}
      />
      {errors.nombre && <span role="alert" className="alert-message">{errors.nombre.message}</span>}

      <label htmlFor="product-desc">Descripcion</label>
      <textarea
        name="descripcion"
        id="product-desc"
        className="form-input form-textarea"
        placeholder="Descripcion detallada del producto"
        {...register('descripcion', {
          required: 'Campo obligatorio',
        })}
      ></textarea>
      {errors.descripcion && (
        <span role="alert" className="alert-message">{errors.descripcion.message}</span>
      )}
      <div className="two-on-row">
        <div>
          <label htmlFor="product-price">Precio</label>
          <input
            type="number"
            name="precio"
            id="product-price"
            className="form-input"
            placeholder="0.00"
            {...register('precio', {
              required: 'Campo obligatorio',
            })}
          />
          {errors.precio && (
        <span role="alert" className="alert-message">{errors.precio.message}</span>
      )}
        </div>
        <div>
          <label htmlFor="product-category">Categoria</label>
          <input
            type="text"
            name="categoria"
            id="product-category"
            className="form-input"
            placeholder="Categoria del producto (ej. Alimento, Juguetes)"
            {...register('categoria', {
              required: 'Campo obligatorio',
            })}
          />
          {errors.categoria && (
        <span role="alert" className="alert-message">{errors.categoria.message}</span>
      )}
        </div>
      </div>
      <label htmlFor="product-img">URL de la imagen</label>
      <input
        type="text"
        name="imagen"
        id="product-img"
        className="form-input"
        placeholder="https://placehold.co/300x200.png?text=******"
        {...register('imagen', {
          required: 'Campo obligatorio',
        })}
      />
        {errors.imagen && (
        <span role="alert" className="alert-message">{errors.imagen.message}</span>
      )}
      <label htmlFor="product-stock">Stock</label>
      <input
        type="text"
        name="stock"
        id="product-stock"
        className="form-input"
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
