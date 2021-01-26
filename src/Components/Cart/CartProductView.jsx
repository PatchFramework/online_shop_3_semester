import React from "react";

import "./CartProductView.css";
import TrashCan from '../../Assets/trash-alt-regular.svg';

const CartProductView = ({ item, cartItems, setCartItems, increaseItemAmount, decreaseItemAmount }) => {
  
  // ############ Main ############
  return (
    <div className="cartItemCard">
      <img className="cartItemImage" src={item.imgSrc} alt="productImage" />

      <div className="cartItemDescription">
        <div className="cartItemTitle">{item.title}</div>
        <div className="cartItemText">{item.text}</div>
        <div className="cartItemPrice">{item.price} €</div>
      </div>

      <span className="amountSpanContainer">
        <div className="amountDescriber"> Amount: </div>
        <span className="amountCounterSpan">
          <button
            className="decreaseAmount"
            onClick={() => decreaseItemAmount(item)}
          >
            {item.amount === 1 ? <img src={TrashCan} alt="Trash Can"/> : "-" }
          </button>
          <div className="amountNum"> {item.amount} </div>
          <button
            className="increaseAmount"
            onClick={() => increaseItemAmount(item)}
          >
            +
          </button>
        </span>
      </span>
    </div>
  );
};

export default CartProductView;
