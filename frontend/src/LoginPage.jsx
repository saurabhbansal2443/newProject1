import React from "react";
import { useContext } from "react";
import { ThemeData } from "./assets/ThemeContext";
import { useFormik } from "formik";
import { loginSchema } from "./assets/ValidationSchemas";
import { useLoginMutation } from "./assets/AuthQuery";
import {useNavigate } from "react-router-dom"

const LoginPage = () => {
  let { theme } = useContext(ThemeData);
  let lightTheme = "h-[92vh] flex items-center justify-center w-full bg-white";
  let darkTheme =
    "h-[92vh] flex items-center justify-center w-full bg-gray-750";
  const [login, { isLoading, isError, isSuccess }] = useLoginMutation();

  let navigate = useNavigate()

  const handleLogin = async (value) => {
    try {
      let data = await login(value).unwrap();
      navigate("/");
    } catch (err) {
      console.error("Failed to login: ", err);
    }
  };

  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: (value, action) => {
      handleLogin(value);

      action.resetForm();
    },
  });

  return (
    <div className={theme == "light" ? lightTheme : darkTheme}>
      <div className="bg-gray-700 shadow-md rounded-lg px-6 py-4 w-1/4 h-1/2">
        <h1 className="text-2xl font-bold text-center mb-4 dark:text-gray-200">
          Welcome Back!
        </h1>
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Email Address
            </label>
            <input
              type="text"
              id="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter your email "
            />
            {formik.errors.email && formik.touched.password ? (
              <p className="text-red-600"> {formik.errors.email} </p>
            ) : null}
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter your password"
              autoComplete="false"
            />

            {formik.errors.password && formik.touched.password ? (
              <p className="text-red-600"> {formik.errors.password} </p>
            ) : null}
          </div>
          <div className="flex items-center justify-between mb-4">
            <a href="#" className="text-xs text-indigo-500 ">
              Create Account
            </a>
          </div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {isLoading ? "...loging in " : "Login"}
          </button>
          {isError == true ? <p> email/password is incorrect</p> : null}
        </form>
      </div>
    </div>
  );
};
export default LoginPage;
