import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8080" , credentials: 'include'}),
  endpoints: (builder) => ({
    signup : builder.mutation({
        query : (data)=>({
            url: "/signup",
            method: "POST" ,
            body : data ,   
        })
    }),
    login : builder.mutation({
        query: (data)=>({
            url : "/login",
            method : "POST" ,
            body : data 
        })
    }),
    getData : builder.query({
        query : ()=>({
            url : "/userdata",
            method:"GET"
        })
    })
  })
});

export const { useLoginMutation, useSignupMutation, useGetDataQuery } = apiSlice;
