import React from 'react';
import {useGetDataQuery} from "./assets/AuthQuery"

const AboutUs = () => {
    const { data, error, isLoading } = useGetDataQuery();
    if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading data</p>;
  console.log(data)
  return (
    <div>
       <h1>Data</h1>
       <pre>{JSON.stringify(data)}</pre>
    </div>
  )
}

export default AboutUs
