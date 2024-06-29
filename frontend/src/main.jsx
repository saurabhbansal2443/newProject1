import React ,{lazy, Suspense}from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AboutUs from "./AboutUs.jsx";
import Cart from "./Cart.jsx";
import Home from "./Home.jsx";
import Error from "./Error.jsx";
import ProductInfo from "./ProductInfo.jsx";
import Shimmer from "./Shimmer.jsx";
import LoginPage from "./LoginPage.jsx";
import SignUp from "./SignUp.jsx";
import ProtectedRoute from "./assets/ProtectedRoute.jsx";

const FoodApp = lazy (() => import('./FoodApp.jsx'));

let HomeProtect = ProtectedRoute(Home);
let AboutProtect = ProtectedRoute(AboutUs);
let CartProtect = ProtectedRoute(Cart);
let ProductInfoProtect = ProtectedRoute(ProductInfo);



let appRouter = createBrowserRouter([
  { path: "/", 
  element: <App></App> ,
  children : [
    {
        path: "/",
        element:<HomeProtect></HomeProtect> ,
    },
    {
        path:"/about",
        element:<AboutProtect></AboutProtect>
    },
    {
        path:"/cart",
        element:<CartProtect></CartProtect>
    },
    {
      path : "/prodInfo/:id",
      element:<ProductInfoProtect></ProductInfoProtect>
    },{
      path : "/food",
      element: (
        <Suspense fallback={<Shimmer></Shimmer>}>
          <FoodApp></FoodApp>
        </Suspense>
      )
    },{
      path:"/login",
      element:<LoginPage></LoginPage>
    },{
      path:"/signup",
      element:<SignUp></SignUp>
    }
  ],
  errorElement : <Error></Error>
},

  
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  
  <RouterProvider router={appRouter}></RouterProvider>
  
);
