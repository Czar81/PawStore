function ProductCard({ product, onClick }) {
  const productName = product.name || 'No name';
  const productPrice = product.price || 0;
  const productCategory = product.category || 'No category';
  const productImage =
    product.image || 'https://placehold.co/300x200?text=No+Image';

  return (
    <article className="product-card">
      <img src={productImage} alt={productName} />
      <div className="description">
        <h3>{productName}</h3>
        <p className="price">₡{productPrice}</p>
        <p className="category">{productCategory}</p>
        <button className="btn btn-lilac" type="button" onClick={onClick}>
          View details
        </button>
      </div>
    </article>
  );
}

export default ProductCard;
