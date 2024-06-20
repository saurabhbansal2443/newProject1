import React from 'react'

const ReviewComponent = ({obj,idx , control}) => {
    let {setShowReviewIndex , showReviewIndex} = control ;
    let {rating ,reviewerName ,comment } = obj ;

  return (
   <>
    <div className="head bg-blue-200  w-10/12 h-12 mt-1 rounded-2xl flex justify-between items-center px-5"><p className="text-black text-lg font-bold"> {reviewerName}  </p> <p onClick={()=>{setShowReviewIndex(showReviewIndex!=idx? idx:null)}}> {showReviewIndex==idx?<>🔽</>:<>🔼</>} </p></div>
    {
        showReviewIndex == idx ? <div className="body bg-blue-400 my-1 w-10/12 h-12  rounded-2xl flex justify-between items-center px-11 text-xl text-black"><p>{comment}</p>  <p> Rating :{rating}</p> </div>:null
    }
   </>
  )
}

export default ReviewComponent
