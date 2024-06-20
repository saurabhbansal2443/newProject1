import React, { useContext } from 'react'
import { ThemeData } from './assets/ThemeContext';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addItem } from './assets/CartSlice';

const ProductCard = ({obj}) => {
    let {brand , category , price , images , rating , title ,id} = obj 

    let {theme} = useContext(ThemeData)

    let dispatch = useDispatch()
   
    let Navigate = useNavigate()



    let handleCardClick = ()=>{
      console.log("clicked ")
      Navigate(`/prodInfo/${id}`)
    }

    let handleAddBtn = (event)=>{
      event.stopPropagation()
      // console.log("Add btn is clicked ")\
      dispatch(addItem(obj))

    }

    let lightTheme = "card w-80 h-96 bg-white shadow-xl mx-3 mt-7  ";
    let darkTheme = "card w-80 h-96 bg-black text-white  shadow-xl mx-3 mt-7  "
    let lightThemeBody = 'card-body bg-primary text-black rounded-xl h-3/6 ';
    let darkThemeBody = "card-body bg-gray-700 text-white text-black rounded-xl h-3/6 ";

  
  return (
    <div>
      <div className={theme=="light"?lightTheme:darkTheme}  onClick={handleCardClick}>
  <figure className='w-full h-3/6'><img className='w-full h-full  ' src={images[0]} alt={category} /></figure>
  <div className={theme=="light"?lightThemeBody:darkThemeBody}>
    <div className="card-tittle  flex   justify-around items-center">
       <h2 className="text-lg font-bold">{brand}</h2> 
      <div className="badge">{category}</div>
      <div className="badge ">{rating}</div>
     
    </div>
    <p>{title}</p>
    <div className="card-actions justify-end">
     <p className="text-3xl"> $ {price}</p>
     <button className='btn' onClick={(event)=>handleAddBtn(event)}> Add </button>
    </div>
  </div>
</div>
    </div>
  )
}

export default ProductCard
