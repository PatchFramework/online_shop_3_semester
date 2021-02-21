import React, { useState } from 'react';
import {BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import ProductData from './Data/ShopItems.json';
import ProductList from './Components/ProductList/ProductList';
import Cart from './Components/Cart/Cart'
import Navbar from './Components/Navbar/Navbar';
import Credits from './Components/Credits/Credits';
import LoginForm from './Components/LoginForm/LoginForm'
import './App.css';
import ThankYou from './Components/ThankYou/ThankYou';

function App() {

  // Save data in state and make it accessable to all child processes via props
  // Data about tht products. Usually this data would come from a backendserver.
  const [productData, setProductData] = useState(ProductData);

  // Save the items in the cart here
  const [cartList, setCartList] = useState([]);

  // Save a list of the product ids here. 
  // It is used to keep track of the individual products and their position in cartList.
  const [prodIdsInCartList, setProdIdsInCartList] = useState([]);

  // Save the customer data after they login
  const [customer, setCustomer] = useState({});

  // Boolean that indicates if the navbar should be hidden
  const [navbarIsVisible, setNavbarIsVisible] = useState(true);

  /* If the website is hostet on github pages the entry path is not "/",
   but rather the project name. If you use this code locally you can delete all 
   occurences of entry path. */
  const ENTRY_PATH = "/online_shop_3_semester"

  // ########## Functions ##########

  /* This function is only neccessary when the SPA is hostet on github pages
    for further information on paths and github pages see 404.html in the public folder. */
  const redirectWhenUsingGhPages = (routingProps) => {
    if (sessionStorage.getItem('path')) {
      let path = sessionStorage.getItem('path');
      sessionStorage.removeItem('path');
      return <Redirect to={path} />;
    }
  }

  const increaseItemAmountInCart = (item) => {
    item.amount = item.amount + 1;
    // Create a copy (call by value) of the updated cartList and update the state with the new list
    setCartList([...cartList]) 
  };

  const decreaseItemAmountInCart = (item) => {
    item.amount = item.amount - 1;
    // delete an item if its amount is 0
    if (item.amount <= 0 ){
      let prodIndex = prodIdsInCartList.indexOf(item.id);
      cartList.splice(prodIndex, 1); 
      removeFromListOfProdIds(item);
    }
    // Create a copy (call by value) of the updated cartList and update the state with the new list
    setCartList([...cartList]) 
  };

  const addToListOfProdIds = (item) => {
    /* Set the list that contains all product ids in cartList */ 
    prodIdsInCartList.push(item.id);
    setProdIdsInCartList([...prodIdsInCartList]);
  };

  const removeFromListOfProdIds = (item) => {
    let removeId = prodIdsInCartList.indexOf(item.id);
    prodIdsInCartList.splice(removeId, 1);
    setProdIdsInCartList([...prodIdsInCartList]);
  }
  
  const addToCartHandler = (item) => {
    /* Adds the item to the cartList and updates the state */

    // If the productId is not in the cart, append that item to the cart list
    var newCartList = []; // variable in function scope
    let indexInCartList = prodIdsInCartList.indexOf(item.id);

    if (indexInCartList === -1) { //This means that the id isn't in the cart list
    let itemWithAmount = {...item, amount: 1};
    newCartList = cartList.concat(itemWithAmount);
    addToListOfProdIds(item);
    } 
    // If the productId is already in the cart, increase the amount of that item
    else {
      let increaseAmountItem = cartList[indexInCartList];
      let newAmount = increaseAmountItem.amount + 1;
      increaseAmountItem = {...increaseAmountItem, amount: newAmount}
      // change the old item in cart with the updated item that holds the new amount
      cartList[indexInCartList] = increaseAmountItem;
      newCartList = [...cartList];
    }
    setCartList(newCartList);
  };


  // ########## Main ##########
  return (
    <>
      <BrowserRouter>
      
      {redirectWhenUsingGhPages()}

        {navbarIsVisible && ( // Check if the Navbar should be hidden or not
          <Navbar
            cartList={cartList}
            customer={customer}
            setCustomer={setCustomer}
            entryPathConst={ENTRY_PATH}
          />
        )}

        <Switch>
          <Route
            path={`${ENTRY_PATH}/`}
            exact
            component={(props) => (
              <ProductList
                productData={productData}
                setProductData={setProductData}
                cartList={cartList}
                setCartList={setCartList}
                addToCartHandler={addToCartHandler}
                {...props}
              />
            )}
          />

          <Route
            path={`${ENTRY_PATH}/cart`}
            exact
            component={(props) => (
              <Cart
                cartList={cartList}
                setCartList={setCartList}
                increaseItemAmount={increaseItemAmountInCart}
                decreaseItemAmount={decreaseItemAmountInCart}
                {...props}
              />
            )}
          />

          <Route
            path={`${ENTRY_PATH}/login`}
            exact
            component={(props) => (
              <LoginForm
                customerData={customer}
                setCustomerData={setCustomer}
                cartList={cartList}
                isCheckout={false}
                {...props}
              />
            )}
          />

          {cartList.length !== 0 && ( // Only make the checkout accessable if there are items in the cart
            <Route
              path={`${ENTRY_PATH}/checkout`}
              exact
              component={(props) => (
                <LoginForm
                  customerData={customer}
                  setCustomerData={setCustomer}
                  cartList={cartList}
                  isCheckout={true}
                  {...props}
                />
              )}
            />
          )}

          <Route path={`${ENTRY_PATH}/credits`} exact component={Credits} />

          <Route
            path={`${ENTRY_PATH}/thankyou`}
            exact
            component={(props) => (
              <ThankYou
                customer={customer}
                setCustomerData={setCustomer}
                cartList={cartList}
                setCartList={setCartList}
                prodIdsInCartList={prodIdsInCartList}
                setProdIdsInCartList={setProdIdsInCartList}
                navbarIsVisible={navbarIsVisible}
                setNavbarIsVisible={setNavbarIsVisible}
                {...props}
              />
            )}
          />


          {/* Show 404 error if the path doesn't exist */}
          <Route
            path={`${ENTRY_PATH}/`}
            component={(props) => <h1>HTTP Error 404: We didn't find {props.history.location.pathname}</h1>}
          />

          {/* This is the usual entry path for react.
              Github pages requires the entry path to be the repository name,
              therefore, the user is redirected by using the defined entry path
              that is specified in the ENTRY_PATH constant.
              E.g. /cart -> /ENTRY_PATH/cart
              */}
          <Route
            path="/"
            component={(props) => {
              let pathParam = props.history.location.pathname;
              return <Redirect to={`${ENTRY_PATH}${pathParam}`} />;
          }}
          />

        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
