import React, {useState} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import ProductData from './Data/ShopItems.json';
import ProductList from './Components/ProductList/ProductList';
import Cart from './Components/Cart/Cart'
import Navbar from './Components/Navbar/Navbar';
import Credits from './Components/Credits/Credits';
import LoginForm from './Components/LoginForm/LoginForm'
import './App.css';

function App() {
  // Save global data to make it accessable to all child processes
  // Usually this data would come from a backendserver
  const [productData, setProductData] = useState(ProductData);
  // Save the items in the cart here
  const [cartList, setCartList] = useState([]);
  // save a list of the product ids here. 
  // It is used to keep track of the individual products and their position in cartList
  const [prodIdsInCartList, setProdIdsInCartList] = useState([]);
  // Save the customer data in case they dont check out immediately
  const [customer, setCustomer] = useState({});


  // ########## Functions ##########
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
        <Navbar cartList={cartList} />
        <Switch>
          <Route
            path="/"
            exact
            component={() => (
              <ProductList
                productData={productData}
                setProductData={setProductData}
                cartList={cartList}
                setCartList={setCartList}
                addToCartHandler={addToCartHandler}
              />
            )}
          />

          <Route
            path="/cart"
            exact
            component={() => (
              <Cart
                cartList={cartList}
                setCartList={setCartList}
                increaseItemAmount={increaseItemAmountInCart}
                decreaseItemAmount={decreaseItemAmountInCart}
              />
            )}
          />

          <Route
            path="/login"
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

          {cartList.length !== 0 && // Only make the checkout accessable if there are items in the cart
          <Route
            path="/checkout"
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
          />}

          <Route path="/credits" exact component={Credits} />

          <Route
            path="/:404"
            component={() => <h1>HTTP Error 404: Not found</h1>}
          />
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
