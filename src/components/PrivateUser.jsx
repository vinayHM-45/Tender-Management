import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { isLoggedIn } from "../storage";
const PrivateUser = () => {
  if (isLoggedIn()) {
    return <Outlet />;
  } else {
    return <Navigate to={"/login"} />;
  }
};

export default PrivateUser;
