import { Link } from "react-router-dom";
import { useContext, useEffect } from "react";
import { ThemeData } from "./assets/ThemeContext";
import { useSelector } from "react-redux";
import { useLogoutMutation } from "./assets/AuthQuery";
import { useNavigate } from "react-router-dom";


let NavBar = () => {


  let { theme, setTheme } = useContext(ThemeData);

  let [logout,  { isLoading, isError, isSuccess }] = useLogoutMutation();
  let cartItems = useSelector((state) => state.cart.items);
  let navigate = useNavigate();

  let handleThemeChange = () => {
    setTheme(theme == "light" ? "dark" : "light");
  }

  const handleLogout = async () => {
    try {
      const response = await logout().unwrap();
      console.log(response); // Log the response to see its structure
      if (response && response.res === true) {
        navigate("/login");
      } else {
        console.error("Logout failed:", response);
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };
  useEffect(() => {
    localStorage.setItem("Theme", theme)
  },[theme])
  let lightTheme = "navbar bg-primary text-primary-content";
  let darkTheme = "navbar bg-base-300 text-primary-content text-white"
  return (
    <>
    { }
      <div className={theme == "light" ? lightTheme : darkTheme}>
        <div className="flex-1">
          <Link to="/" className="btn btn-ghost text-2xl">
            GetKart
          </Link>
        </div>
        <div className="flex-none">
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle"
            >
              <div className="indicator">
                <Link to="/cart">

                  <svg
                    width="40px"
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-9 w-9"
                    fill="white"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </Link>
                <span className="badge badge-sm indicator-item z-10">{cartItems.length}</span>
              </div>
            </div>

          </div>
          <Link to="/about">
            <p className="mx-4 text-2xl"> Profile </p>
          </Link>
          <Link to="/food">
            <p className="mx-4 text-2xl"> Food </p>
           
          </Link>
          <div className="theme">
            <label className="flex cursor-pointer gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="5" />
                <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
              </svg>
              <input
                type="checkbox"
                value="synthwave"
                className="toggle theme-controller"
                onClick={handleThemeChange}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >


                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
              </svg>
            </label>

           
          </div>

          <Link >
            <p className="mx-4 text-2xl" onClick={handleLogout}> Logout </p>
           
          </Link>
        </div>
      </div>
    </>
  );
};

export default NavBar;



// HTTP server 
// express 
// middlewares 
// api 
// rest api 
// MVC 
// MongoDB connection 
// MongoDB login aut JWT 
// frontend --> backend 
// deploy 
