import React , {useEffect, useState }from 'react';
import {useGetDataQuery, useUpdatePictureMutation} from "./assets/AuthQuery"

const AboutUs = () => {
  let [user , setUser] = useState({})
    const { data, error, isLoading , refetch } = useGetDataQuery();
    const [uploadFile  ] = useUpdatePictureMutation()
    if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading data</p>;
 useEffect(() => {
  if (data) {
    setUser(data.data);
  }
 },[data])

 let handleFileChange = async (event)=>{
    await uploadFile({email : user.email , profilePicture : event.target.files[0] })
    refetch();
 }
  return (
    <div>
       <h1>{user.userName}</h1>
       <img src={user.profilePicture}></img>
       <input type="file" className="file-input file-input-bordered w-full max-w-xs" onChange={handleFileChange} />
    </div>
  )
}

export default AboutUs
