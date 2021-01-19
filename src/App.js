import React, {useState} from 'react';
import {BrowserRouter, Route, NavLink, Switch} from 'react-router-dom';

import Data from './Data/ShopItems.json';
import Products from './Pages/Products';

import logo from './logo.svg';
import './App.css';

function App() {
  // Save global data to make it accessable to all child processes
  // Usually this data would come from a backendserver
  const [data, setData] = useState(Data);
  console.log(data);

  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route
            path="/"
            exact
            component={ () => <Products data={data} setData={setData} /> }
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
