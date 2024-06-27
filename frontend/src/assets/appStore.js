import { configureStore } from '@reduxjs/toolkit';
import cartReducer from "./CartSlice";
import { apiSlice } from './AuthQuery';

let appStore =  configureStore({
  reducer: {
    cart : cartReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
})

export default appStore