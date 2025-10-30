import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import Authorized from "../helper/Authorized";

const ProtectedRoute = ({ children }) => {
  console.log("🔒 STEP P: ProtectedRoute checking authorization", {
    timestamp: new Date().toISOString()
  });

  let location = useLocation();
  const authData = Authorized();

  console.log("🔒 STEP Q: ProtectedRoute auth result", {
    authData: !!authData,
    pathname: location.pathname,
    timestamp: new Date().toISOString()
  });

  if (!authData) { // Clear storage and redirect to login
    localStorage.clear();
    sessionStorage.removeItem("hostBuddy_auth");
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
