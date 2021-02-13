import React from "react";

import "./ProductCard.css";

// Using object destructuring on the props object for convenience
const ProductCard = ({ item, addToCartHandler }) => {
  //########## Functions ##########

  

  // ########## Main ##########

  return (
    <div className="cardContainer">
      {/* Conditionally render parts of the card
            TODO: Use a default picture in case a picture can't be fetched */}
      <img className="cardImage" src={item.imgSrc} alt="productImage" />
      <div className="cardTitle">{item.title}</div>
      {item.text && <div className="cardBody">{item.text}</div>}
      <div className="price">{item.price.toFixed(2)} €</div>
      <button
        className="addToCart"
        onClick={() => addToCartHandler(item)}
      >
        Add to Cart
      </button>

      {item.footer && <div className="cardFooter">{item.footer}</div>}
    </div>
  );
};

export default ProductCard;
