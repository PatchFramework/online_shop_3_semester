import React from 'react'

import './ProductCard.css'

// Adds the item to the cartList and updates the state
const addToCartHandler = (item, cartList, setCartList) => {
  let newCartList = cartList.concat(item);
  setCartList(newCartList);
}

// Using object destructuring on the props object for convenience
const ProductCard = ({ item, cartList, setCartList }) => {
    return (
      <div className="cardContainer">
        {/* Conditionally render parts of the card
            TODO: Use a default picture in case a picture can't be fetched */}
        <img className="cardImage" src={item.imgSrc} alt="productImage" />
        <div className="cardTitle">{item.title}</div>
        {item.text && <div className="cardBody">{item.text}</div>}
        <button
          className="addToCart"
          onClick={() => addToCartHandler(item, cartList, setCartList)}
        >
          Add to Cart
        </button>

        {item.footer && <div className="cardFooter">{item.footer}</div>}
      </div>
    );
}

export default ProductCard;