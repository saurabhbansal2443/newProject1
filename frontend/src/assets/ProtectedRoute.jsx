import React, { useEffect, useState } from "react";
import { useGetDataQuery } from "./AuthQuery";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = (Component) => {
  return (props) => {
    const { data, error, isLoading } = useGetDataQuery();
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
      if (isLoading) {
        return;
      }
      if (error) {
        console.error("Error fetching data:", error);
        navigate("/login")
        return;
      }
      if (data) {
        console.log("Data fetched:", data);
        if (data.res === true) {
          setUser(data.data);
        } else {
          navigate("/login");
        }
      } else {
        console.log("No data available");
      }
    });

    if (isLoading) {
      return <div>Loading...</div>;
    }

    if (error) {
      return <div>Error occurred</div>;
    }

    return user ? <Component {...props} user={user} /> : null;
  };
};

export default ProtectedRoute;