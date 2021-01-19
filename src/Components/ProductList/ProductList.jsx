import React from 'react'

import './ProductList.css'
import ProductCard from './ProductCard'

const ProductList = (props) => {
    console.log(props)
    return (
      <div className="productsGrid">
        {// Load the product items from the data and populate cards with them 
        
        props.data.items.map((item) => {
          return (
            <ProductCard
              key={item.id}
              className="card"
              productId={item.id}
              title={item.title}
              text={item.text}
              footer={item.footer}
              imgSrc={item.imgSrc}
              {...props}
            />
          );
        })}
      </div>
    );
}

export default ProductList