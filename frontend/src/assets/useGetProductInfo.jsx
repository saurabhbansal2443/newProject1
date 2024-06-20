import {useState , useEffect} from "react";

let useGetProductInfo = (id)=>{
    let [obj , setObj ] = useState(null)
    
    let getData = async () => {
        let data = await fetch(`https://dummyjson.com/products/${id}`);
        let object = await data.json();
        setObj(object)
    }

    useEffect(()=>{
      getData()
    },[])

    return obj 
}


export default useGetProductInfo