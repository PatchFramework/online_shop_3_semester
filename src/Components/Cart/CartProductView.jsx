import React from "react";

import "./CartProductView.css";

const CartProductView = ({ item, cartItems, setCartItems }) => {
  
  // ############ Functions ############
  const increseItemCount = () => {
    // TODO: Add Option to decrease the amount of an item here
  };

  const decreseItemCount = () => {
    // TODO: Add Option to increase the amount of an item here
  };
  
  // ############ Main ############
  return (
    <div className="cartItemCard">
      <img className="cartItemImage" src={item.imgSrc} alt="productImage" />

      <div className="cartItemDescription">
        <div className="cartItemTitle">{item.title}</div>
        <div className="cartItemText">{item.text}</div>
      </div>

      <span className="amountSpanContainer">
        <div className="amountDescriber"> Amount: </div>
        <span className="amountCounterSpan">
          <button
            className="decreaseAmount"
            onClick={() => decreseItemCount()}
          >
            -
          </button>
          <div className="amountNum"> 1 </div>
          <button
            className="increaseAmount"
            onClick={() => increseItemCount()}
          >
            +
          </button>
        </span>
      </span>
    </div>
  );
};

export default CartProductView;
