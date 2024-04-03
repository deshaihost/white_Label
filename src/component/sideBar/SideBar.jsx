import React from "react";
import { Link, useLocation } from "react-router-dom";

const SideBar = () => {
  const location = useLocation();
  const findlocation = location?.pathname;

  return (
    <div>
      <div>
        <Link
          to="/dashboard"
          className={
            findlocation === "/dashboard" ? "bg-dark text-white py-2 px-2" : ""
          }
        >
          Dashboard
        </Link>
      </div>
      <div className="my-2">
        <Link to="/properties" className={
            findlocation === "/properties" ? "bg-dark text-white py-2 px-2" : ""
          }>Properties</Link>
      </div>
      <div>
        <Link to="/property-insight" className={
            findlocation === "/property-insight" ? "bg-dark text-white py-2 px-2" : ""
          }>Property Insight</Link>
      </div>
      <div className="my-2">
        <Link to="/subscription" className={
            findlocation === "/subscription" ? "bg-dark text-white py-2 px-2" : ""
          }>Subscription</Link>
      </div>
      <div>
        <Link to="/account">Account</Link>
      </div>
      <div className="my-2">
        <Link to="/setup-guide">Setup Guide</Link>
      </div>
      <div>
        <Link to="/">Log out</Link>
      </div>
    </div>
  );
};

export default SideBar;
