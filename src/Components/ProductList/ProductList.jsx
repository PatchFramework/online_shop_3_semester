import React from 'react'

import './ProductList.css'
import ProductCard from './ProductCard'

const ProductList = (props) => {
    
    return (
      <div className="displayContainer">
        <div className="productsGrid">
          {
            // Load the product items from the data and populate cards with them

            props.productData.items.map((item) => {
              return (
                <ProductCard
                  key={item.id}
                  className="card"
                  addToCartHandler={props.addToCartHandler}
                  item={item}
                />
              );
            })
          }
        </div>
      </div>
    );
}

export default ProductList;