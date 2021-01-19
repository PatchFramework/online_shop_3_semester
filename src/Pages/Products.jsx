import React from 'react'

import ProductList from '../Components/ProductList/ProductList';

const Products = (props) => {
    return (
        <>
            {/*TODO: Add NAVBAR here*/
            console.log(props)}

            <ProductList data={props.data} setData={props.setData} />
            
            {/*TODO: Add FOOTER here*/}
        
        </>
    )
}

export default Products
