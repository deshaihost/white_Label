import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import Authorized from "../helper/Authorized";

const ProtectedRoute = ({ children }) => {
  let location = useLocation();
  const authData = Authorized();

  if (!authData) { // Clear storage and redirect to login
    localStorage.clear();
    sessionStorage.removeItem("hostBuddy_auth");
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
