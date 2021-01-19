import React from 'react'

import './ProductCard.css'

const ProductCard = (props) => {
    return (
      <div className="cardContainer">
        {/* Conditionally render parts of the card
            TODO: Use a default picture in case a picture can't be fetched */}
        <img className="cardImage" src={props.imgSrc} alt="productImage" />
        <div className="cardTitle">{props.title}</div>
        {props.text && <div className="cardBody">{props.text}</div>}
        {props.footer && <div className="cardFooter">{props.footer}</div>}
      </div>
    );
}

export default ProductCard;