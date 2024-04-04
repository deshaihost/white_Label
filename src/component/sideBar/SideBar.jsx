import React from "react";
import { Link, useLocation } from "react-router-dom";
import './sidebar.css';

const SideBar = () => {
  const location = useLocation();
  const findlocation = location?.pathname;

  return (
      <div className="navigation-links">
        <ul>
          <li>
            <Link
              to="/dashboard"
              className={
                findlocation === "/dashboard" ? "active" : ""
              }
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link to="/properties" className={
                findlocation === "/properties" ? "active" : ""
              }>Properties</Link>
          </li>
          <li>
            <Link to="/property-insight" className={
                findlocation === "/property-insight" ? "active" : ""
              }>Property Insight</Link>
          </li>
          <li>
            <Link to="/subscription" className={
                findlocation === "/subscription" ? "active" : ""
              }>Subscription</Link>
          </li>
          <li>
            <Link to="/account" className={
                findlocation === "/account" ? "active" : ""
              }>Account</Link>
          </li>
          <li>
            <Link to="/setup-guide" className={
                findlocation === "/setup-guide" ? "active" : ""
              }>Setup Guide</Link>
          </li>
          <li>
            <Link to="/">Log out</Link>
          </li>
        </ul>
      </div>
  );
};

export default SideBar;
