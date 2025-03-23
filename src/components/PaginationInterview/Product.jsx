import React from "react";

const Product = ({ product }) => {
  const { title, description, price, rating, images } = product;
  return (
    <div className="product-main">
      <div className="left-half">
        <img loading={"lazy"} src={`${images[0]}`} alt={title} />
      </div>
      <div className="right-half">
        <h1>{title}</h1>
        <p className="desc">{description}</p>
        <h1>${price}</h1>
        <p>{rating}</p>
      </div>
    </div>
  );
};

export default Product;
