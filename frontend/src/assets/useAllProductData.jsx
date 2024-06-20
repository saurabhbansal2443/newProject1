import  {useState , useEffect} from 'react'

const useAllProductData = ( ) => {
    let [data , setdata ] = useState([])
    let getData = async () => {
        let data = await fetch("https://dummyjson.com/products");
        let obj = await data.json();
         setdata(obj.products)
      };
    
      useEffect(() => {
        getData();
      }, []);

      return data
}

export default useAllProductData
