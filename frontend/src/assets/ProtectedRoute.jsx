import React, { useEffect, useState } from "react";
import { useGetDataQuery } from "./AuthQuery";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = (Component) => {
  
  return (props) => {
    const { data, error, isLoading, refetch } = useGetDataQuery();
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
      refetch();
    }, []);

    useEffect(() => {
      if (isLoading) {
        return;
      }
      if (error) {
        navigate("/login");
        return;
      }
      if (data) {
        if (data.res === true) {
          setUser(data.data);
        } else {
          navigate("/login");
        }
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
