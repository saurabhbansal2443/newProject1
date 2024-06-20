import React, { useEffect , useState } from 'react';
import { useSelector } from 'react-redux';

const OrderSummary = () => {
    let cartData = useSelector((state)=>state.cart.items);

    let [totalItems , setTotalItems] = useState(0);
    let [totalPrice , setTotalPrice] = useState(0);
    useEffect(()=>{
       let TI = cartData.reduce((acc , cartObj)=>{
        return acc + cartObj.quantity
       },0);
       setTotalItems(TI);

       let TP = cartData.reduce((acc , cartObj)=>{
        return acc + (cartObj.obj.price * cartObj.quantity)
       },0);
       setTotalPrice(TP);


    })
   

    

    return (
        <div className="drawer drawer-end">
            <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
               
                <label htmlFor="my-drawer-4" className="drawer-button btn btn-success">Order Summary </label>
            </div>
            <div className="drawer-side z-20">
                <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
                <div className="menu p-4 w-80 h-full bg-base-200 text-base-content">
                    <p className='text-center my-4 text-xl text-white'> Order Summary</p>
                   <div className="box h-1/2 w-9/10 border-2 border-white ">
                      <table className='text-lg italic'>
                        <thead></thead>
                        <tbody>
                        <tr>
                            <td> Total Items  </td>
                         
                            <td>{totalItems} </td>
                        </tr>
                        <tr>
                            <td>Total Price </td>
                           
                            <td> $ {(totalPrice.toFixed(1))} </td>
                        </tr>
                        <tr>
                            <td> Discount  </td>
                           
                            <td> $ {(totalPrice*0.1).toFixed(1)} </td>
                        </tr>
                        <tr>
                            <td> Delivery Charges  </td>
                           
                            <td> $ {(totalItems * 0.05).toFixed(1)} </td>
                        </tr>

                        </tbody>
                      </table>
                      <div className="border-t-2 m-2 p-1 mt-[45%] flex justify-around text-2xl text-white">
                        <span> Total Amount </span>
                        <span> ${(totalPrice - (totalPrice * 0.05 )).toFixed(1)} </span>
                      </div>
                   </div>
                   <button className='btn btn-primary mt-3 text-lg'> Proceed to Payment </button>
                </div>
            </div>
        </div>
    )
}

export default OrderSummary
