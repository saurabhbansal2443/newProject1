import React from 'react';
import { useRouteError } from 'react-router-dom';

const Error = () => {
    const {error }= useRouteError();
    console.log(error);
  return (
    <div>
      <h1> This is error page </h1>
    </div>
  )
}

export default Error
