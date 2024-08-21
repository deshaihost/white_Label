import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import Authorized from "../helper/Authorized";
import { jwtDecode } from 'jwt-decode';
import axios from "axios";

const ProtectedRoute = ({ children }) => {
  let location = useLocation();
  const getAuthToken = Authorized();
  const { token } = getAuthToken ? getAuthToken : {};

  // Check if the token exists and is not expired
  const isTokenValid = (token) => {
    try {
      const decoded = jwtDecode(token);
      return decoded.exp * 1000 > Date.now(); // jwt exp is in seconds
    } catch (error) {
      return false; // if token is invalid or error in decoding
    }
  };

  if (!token || !isTokenValid(token)) {
    // Remove the token from the local storage and redirect to login page
    localStorage.clear();
    sessionStorage.removeItem("hostBuddy_auth");
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
