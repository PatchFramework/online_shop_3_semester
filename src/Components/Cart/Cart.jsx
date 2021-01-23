import React from 'react'
import CartProductView from './CartProductView';

import './Cart.css';

export const Cart = ({ cartList, setCartList }) => {
    return (
      <div className="cartListContainer">
        <ul className="cartList">
          {cartList.map((item, ind) => {
              {console.log(item);}
              return (
                <li key={ind} className="cartItem">
                  <CartProductView item={item} cartItems={cartList} setCartItems={setCartList} />
                </li>
              );
          })}
        </ul>
      </div>
    );
}

export default Cart;