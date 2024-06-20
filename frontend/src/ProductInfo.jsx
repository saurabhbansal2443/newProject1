import React, { useEffect, useState, useContext } from "react";
// import obj from "./assets/SingleCard";
import { useParams } from "react-router-dom";
import { ThemeData } from "./assets/ThemeContext";
import useGetProductInfo from "./assets/useGetProductInfo";
import { useSelector, useDispatch } from "react-redux";
import { addItem } from "./assets/CartSlice";
import ReviewComponent from "./ReviewComponent";

const ProductInfo = () => {
  // const [obj , setObj ] = useState(null);

  let idsArray = useSelector((state) => state.cart.id);
  let [showReviewIndex , setShowReviewIndex] = useState(null);

  // console.log(idsArray)

  const { theme } = useContext(ThemeData);
  let dispatch = useDispatch();

  let { id } = useParams();

  let obj = useGetProductInfo(id); // this is a custom hook

  if (obj == null) {
    return <h1> ....loading </h1>;
  }

  let handleAdd = () => {
    dispatch(addItem(obj));
  };

  let {
    title,
    description,
    category,
    price,
    rating,
    stock,
    tags,
    brand,
    images,
    reviews
  } = obj;

  let lightTheme =
    "w-3/4 h-1/2 mt-5 card lg:card-side bg-white text-black border-2 border-red-500 shadow-xl";
  let darkTheme = "w-3/4 h-1/2 mt-5 card lg:card-side bg-gray-700 shadow-xl";
  return (
    <div className="w-screen h-screen bg-gray-500 flex  flex-col items-center">
      <div className={theme == "light" ? lightTheme : darkTheme}>
        {idsArray.find((pid) => pid == id) != undefined ? (
          <p className="rounded-2xl px-2 bg-orange-500 text-white  z-10  absolute mt-8 ml-4">
            {" "}
            Added to cart{" "}
          </p>
        ) : (
          <></>
        )}
        <figure className="   w-full">
          <img
            src={images[0]}
            alt="Album"
            className="h-full w-full  rounded-xl bg-white"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title text-3xl">{title}</h2>
          <p className="text-lg"> {brand}</p>
          <p className="text-lg">{description}</p>

          <div className="badge bg-white text-black ">{rating}</div>
          <div className="badge  bg-white text-black">{category}</div>
          {tags.map((ele, idx) => {
            return (
              <div key={idx} className="badge  bg-white text-black ">
                {" "}
                {ele}
              </div>
            );
          })}

          <div className="badge bg-white text-black ">Stock : {stock}</div>

          <div className="card-actions flex  justify-between">
            <div className="text-3xl ">Price : {price} $</div>

            <button className="btn btn-primary" onClick={handleAdd}>
              Add
            </button>
          </div>
        </div>
      </div>

      <div className=" h-1/3 w-2/3 mt-9 shadow-2xl bg-white rounded-2xl flex justify-center items-center flex-col">
       <p className="text-2xl font-bold text-center"> Customer Review's</p>
          {
            reviews.map((obj ,idx)=>{
              return <ReviewComponent obj={obj} idx={idx} control={{setShowReviewIndex , showReviewIndex}} key={idx}></ReviewComponent>
            })
          }
      </div>
    </div>
  );
};

export default ProductInfo;
