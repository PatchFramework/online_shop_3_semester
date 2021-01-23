import React, {useState} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import productList from './Data/ShopItems.json';
import Products from './Pages/Products';
import Cart from './Components/Cart/Cart'
import Navbar from './Components/Navbar/Navbar';
import './App.css';

function App() {
  // Save global data to make it accessable to all child processes
  // Usually this data would come from a backendserver
  const [productData, setProductData] = useState(productList);
  const [cartList, setCartList] = useState([]);

  console.log(productData);

  return (
    <>
      <BrowserRouter>
        <Navbar cartList={cartList} />
        <Switch>
          <Route
            path="/"
            exact
            component={() => (
              <Products
                productData={productData}
                setProductData={setProductData}
                cartList={cartList}
                setCartList={setCartList}
              />
            )}
          />
          <Route
            path="/cart"
            exact
            component={(props) => (
              <Cart cartList={cartList} setCartList={setCartList} />
            )}
          />
          <Route
            path="/:404"
            component={() => (<h1>HTTP Error 404: Not found</h1>)}
          />
          {/*
          TODO: If CART and LOGIN (maybe a 404 page) components are created, they will be added with an according path here.
          */}
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
