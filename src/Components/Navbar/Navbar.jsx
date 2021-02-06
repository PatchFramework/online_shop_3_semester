import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import './Navbar.css'
import NavbarItems from './NavbarItems';
import CartSvg from '../../Assets/shopping-basket-solid.svg';
import Logo from '../../Assets/round.svg';

const Navbar = ({ cartList, customer, setCustomer }) => {
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

  const isLoggedIn = (person) => {
    if (Object.entries(person).length === 0) { // If there are no entries in person
      return false;
    } else {
      return true;
    }
  }
    
  // ######## Main ########
  const LoginListItem = () => {
    return (
      <li className="navItemRightMenu">
        <Link to="/login" className="link loginLogout">
          <div className="loginLogoutText">Login</div>
        </Link>
      </li>
    );
  }

  const LogoutListItem = ({ setUserData }) => {
    return (
      <li className="navItemRightMenu">
        <div className="loginLogout" onClick={() => setUserData({})}>
          <div className="loginLogoutText">Logout</div>
        </div>
      </li>
    );
  }

  const ProfileIcon = ({ user }) => {
    let initialFirst = user.firstname[0];
    let initialSecond = user.lastname[0];

    return (
      <li className="navItemRightMenu">
        <Link to="/login" className="profileIcon">
          <div className="profileInitials">
          {`${initialFirst}${initialSecond}`}
          </div>
        </Link>
      </li>
      )
  }

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
          const cssClass = `navItemLeftMenu ${
            item.urlPath === location.pathname ? `active` : ``
          }`;

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
        {isLoggedIn(customer) && <ProfileIcon user={customer} />}
        {isLoggedIn(customer) ? <LogoutListItem setUserData={setCustomer} /> : <LoginListItem />}

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