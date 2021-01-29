import React from "react";
import { Link } from 'react-router-dom';
import CartProductView from "./CartProductView";

import "./Cart.css";

const Cart = ({
  cartList,
  setCartList,
  increaseItemAmount,
  decreaseItemAmount,
}) => {
  // ########## Functions ##########
  
  const calcTotalPrice = (list) =>{
    let total = 0;
    list.forEach((item) => {
      total += item.amount * item.price
    })
    return total.toFixed(2);
  }
  
  
  // ########## Main ##########

  return (
    <div className="cartListContainer">

      {cartList.length === 0 && ( // Show if the cart is empty
        <div className="noCartContentLayout">
          <h1>There is nothing in here.</h1>
          <h2> You can add items from the products page. </h2>
        </div>
      )}

      {cartList.length !== 0 && ( // Display the total value of the cart if there are items in the cart
        <div className="grandTotalLayout">
          <Link to="/checkout" className="checkoutLink link">
            <div className="checkoutText">Checkout</div>
          </Link>
          <div className="grandTotal">
            <div className="grandTotalDescriber">Grand total:</div>
            <div className="grandTotalNumber">{calcTotalPrice(cartList)}</div>
          </div>
        </div>
      )}

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

      {cartList.length >= 5 && ( // Display checkout and amount at the end of cart if there are many items in the list
        <div className="grandTotalLayout">
          <Link to="/checkout" className="checkoutLink link">
            <div className="checkoutText">Checkout</div>
          </Link>
          <div className="grandTotal">
            <div className="grandTotalDescriber">Grand total:</div>
            <div className="grandTotalNumber">{calcTotalPrice(cartList)}</div>
          </div>
        </div>
      )}
      <br/>
    </div>
  );
};

export default Cart;
