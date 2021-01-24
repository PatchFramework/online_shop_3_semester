import React from 'react'

import ProductList from '../Components/ProductList/ProductList';

const Products = (props) => {
    return (
      <>
        {/*TODO: Add NAVBAR here*/ console.log(props)}

        <ProductList
          productData={props.productData}
          setProductData={props.setProductData}
          cartList={props.cartList}
          setCartList={props.setCartList}
          addToCartHandler={props.addToCartHandler}
        />

        {/*TODO: Add FOOTER here*/}
      </>
    );
}

export default Products;
