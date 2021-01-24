import React, { useState } from "react";
import CartProductView from "./CartProductView";

import "./Cart.css";

const Cart = ({
  cartList,
  setCartList,
  increaseItemAmount,
  decreaseItemAmount,
}) => {
  console.log("Cart was rendered");
  return (
    <div className="cartListContainer">
      <ul className="cartList">
        {cartList.map((item) => {
          
            console.log(item);
          
          return (
            <li key={item.id} className="cartItem">
              <CartProductView
                item={item}
                cartItems={cartList}
                setCartItems={setCartList}
                increaseItemAmount={increaseItemAmount}
                decreaseItemAmount={decreaseItemAmount}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Cart;
