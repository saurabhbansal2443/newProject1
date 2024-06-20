import React from "react";
import { useSelector, useDispatch } from "react-redux";
import CartComponent from "./CartComponent";
import { sortDecresing, sortIncresing ,clearAll} from "./assets/CartSlice";
import { useContext } from "react";
import { ThemeData } from "./assets/ThemeContext";
import OrderSummary from "./OrderSummary";

const Cart = () => {
  let cartData = useSelector((state) => state.cart.items);

  let dispatch = useDispatch();

  let handleIncreseRating = () => {
    dispatch(sortIncresing());
  };

  let handleDecreseRating = () => {
    dispatch(sortDecresing());
  };

  let { theme } = useContext(ThemeData);

  let lightTheme = "bg-white text-black min-h-screen ";
  let darkTheme = "bg-gray-500 text-white min-h-screen ";
  return (
    <div className={theme == "light" ? lightTheme : darkTheme}>
      <div className="overflow-x-auto mx-10 text-2xl">
        <table className="table w-full">
          <thead>
            <tr className="text-xl text-blue-900">
              <th>Product Name</th>
              <th>Description </th>
              <th>Quantity</th>
              <th> Price </th>
              <th>
                {" "}
                <span onClick={handleIncreseRating}> 🔼 </span> Rating{" "}
                <span onClick={handleDecreseRating}> 🔽 </span>{" "}
              </th>
              <th>
                <OrderSummary></OrderSummary>
              </th>
            </tr>
          </thead>
          <tbody >
            {cartData.map((item) => (
              <CartComponent cartObj={item}></CartComponent>
            ))}
          </tbody>
        </table>
        <div className="flex flex-col justify-center item-center w-full" >
          <hr className="" />
        <button className="btn text-xl w-60 btn-error border-0 text-white m-auto mt-4" onClick={()=>{dispatch(clearAll())}}> Clear Cart </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
