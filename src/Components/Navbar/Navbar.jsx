import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import './Navbar.css'
import NavbarItems from './NavbarItems';
import CartSvg from '../../Assets/shopping-basket-solid.svg';
import Logo from '../../Assets/round.svg';

const Navbar = ({ cartList }) => {
  // ######## Functions ########
  // Use location hook, to get the current URL path
  const location = useLocation();
  
  const calcCartItemNum = (list) => {
    let count = 0;
    list.forEach((item) => {
      count += item.amount;
    })
    return count;
  }
    
  // ######## Main ########
  return (
      <nav className="navbarContainer">
        <Link to="/" className="link">
          <img className="logo" src={Logo} />
          <div className="logoText">Rounderful</div>
        </Link>

        {/* Menu on the left side of the Navbar; Data is dynamically loaded */}
        <ul className="leftMenu">
          {NavbarItems.map((item, ind) => {

            // Check which CSS classes apply for the navbar element
            const cssClass = `navItemLeftMenu ${item.urlPath===location.pathname ? `active` : ``}`

            return (
              // Add the 'active' CSS class to a nav item if it represents the current path  
              <li key={ind} className={cssClass}>
                <Link to={item.urlPath} className="link">
                  <div className="navItemLeftMenuText">{item.text}</div>
                </Link>
              </li>
            );
          })}
        </ul>

        <ul className="rightMenu">
          <li className="navItemRightMenu">
            <Link to="/login" className="link loginLink">
              <div className="loginText">Login</div>
            </Link>
          </li>
          <li className="navItemRightMenu">
            <Link to="/cart" className="link">
              <img className="cartImg" src={CartSvg} alt="cart" />
              {/* TODO: Render this div only if there is an item in the cart and update the number of items shown in the pill */}
              <div className="numCartItems">{calcCartItemNum(cartList)}</div>
            </Link>
          </li>
        </ul>
      </nav>
    );
}

export default Navbar;