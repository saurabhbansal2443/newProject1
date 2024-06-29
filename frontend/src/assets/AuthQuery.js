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
    }),
    logout : builder.mutation({
        query: ()=>({
            url : "/logout",
            method:"POST"
        })
    }),
    updatePicture: builder.mutation({
        query: ({ email, profilePicture }) => {
          const formData = new FormData();
          formData.append('email', email);
          formData.append('profilePicture', profilePicture);
  
          return {
            url: 'updatePicture',
            method: 'PATCH',
            body: formData,
          };
        }
  })
  })
});

export const { useLoginMutation, useSignupMutation, useGetDataQuery , useLogoutMutation , useUpdatePictureMutation} = apiSlice;
