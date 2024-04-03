import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import Authorized from "../helper/Authorized";

const ProtectedRoute = ({ children }) => {
  let location = useLocation();
  const getAuthToken = Authorized();
  const { token } = getAuthToken ? getAuthToken : [];
  if (token === undefined) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
};

export default ProtectedRoute;
