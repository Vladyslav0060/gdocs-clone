// ProtectedRouteWrapper.js

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { checkSession } from "../api"; // Import your function for checking session

export const ProtectedRouteWrapper = ({ children }: any) => {
  const [authenticated, setAuthenticated] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    console.log("check in useeffect");
    const fetchData = async () => {
      try {
        const { authenticated } = await checkSession();
        const res = await checkSession();
        console.log(res);
        setAuthenticated(authenticated);

        if (!authenticated) {
          // Redirect to login page if not authenticated
          navigate("/login");
        }
      } catch (error) {
        // Handle error
      }
    };

    fetchData();
  }, []);

  // if (!authenticated) {
  //   // You can customize the loading state or show an alternative component
  //   return <div>Loading...</div>;
  // }

  // Render the child components if authenticated
  return authenticated ? <>{children}</> : <></>;
};
