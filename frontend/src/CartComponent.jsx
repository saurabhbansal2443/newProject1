import React from 'react';
import { useDispatch } from 'react-redux';
import { removeItem , increaseQuantity , decreseQuantity } from './assets/CartSlice';

const CartComponent = ({cartObj}) => {
    let dispatch = useDispatch();
    let {obj , quantity } = cartObj
    let {title , brand , price , rating  , category,   thumbnail, 
        availabilityStatus, id 
        } = obj
    return (
    
            <tr className='text-xl'>

                <td>
                    <div className="flex items-center gap-3">
                        <div className="avatar">
                            <div className="mask mask-squircle w-20  h-20 bg-red-200 z-20">
                                <img src={thumbnail} alt="Avatar Tailwind CSS Component" />
                            </div>
                        </div>
                        <div>
                            <div className="font-bold">{title}</div>
                            <div className="text-sm opacity-50 capitalize ">{brand}</div>
                        </div>
                    </div>
                </td>
                <td className="capitalize">
                {category}
                    <br />
                    <span className="badge badge-ghost badge-sm">{availabilityStatus}</span>
                </td>
                <td className='px-8'> <span onClick={()=>{dispatch(increaseQuantity(id))}}>⬆</span> {quantity}  <span onClick={()=>{dispatch(decreseQuantity(id))}}>⬇</span></td>
                <td>  {price } </td>
                <td className='px-8'> {rating}</td>
                <th>
                    <button className="btn text-lg" onClick={()=>dispatch(removeItem(id))}>Remove </button>
                </th>
            </tr>

    )
}

export default CartComponent
