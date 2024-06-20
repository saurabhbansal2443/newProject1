import React from 'react'

const AddedProductInCart = (ProductCard) => {
  return (props)=>{
    return (
        < div className="">
        <p className= 'rounded-2xl px-2 bg-orange-500 text-white  z-10  absolute mt-8 ml-4'> Added to cart    </p>
        <ProductCard {...props}></ProductCard>
        </div>
    )
  }
   
}

export default AddedProductInCart
