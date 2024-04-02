import React from "react";

const Authorized = () => {
  const getAuthToken = JSON.parse(sessionStorage.getItem("hostBuddy_auth"));
  return getAuthToken;
};

export default Authorized;
