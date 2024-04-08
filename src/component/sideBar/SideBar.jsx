import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./sidebar.css";
import { logoutActions } from "../../redux/actions";
import { useSelector, useDispatch } from "react-redux";
const SideBar = () => {
  const store = useSelector((state) => state);
  const dispatch = useDispatch();
  const location = useLocation();
  const findlocation = location?.pathname;
  const [logoutFind, setLogoutFind] = useState(false);
  const logoutHandle = () => {
    localStorage.clear();
    sessionStorage.removeItem("hostBuddy_auth");
  };

  return (
    <div className="navigation-links">
      <ul>
        <li>
          <Link
            to="/dashboard"
            className={findlocation === "/dashboard" ? "active" : ""}
          >
            Dashboard
          </Link>
        </li>
        <li>
          <Link
            to="/properties"
            className={findlocation === "/properties" ? "active" : ""}
          >
            Properties
          </Link>
        </li>
        <li>
          <Link
            to="/property-insight"
            className={findlocation === "/property-insight" ? "active" : ""}
          >
            Property Insight
          </Link>
        </li>
        <li>
          <Link
            to="/subscription"
            className={findlocation === "/subscription" ? "active" : ""}
          >
            Subscription
          </Link>
        </li>
        <li>
          <Link
            to="/account"
            className={findlocation === "/account" ? "active" : ""}
          >
            Account
          </Link>
        </li>
        <li>
          <Link
            to="/setup-guide"
            className={findlocation === "/setup-guide" ? "active" : ""}
          >
            Setup Guide
          </Link>
        </li>
        <li>
          <Link
            onClick={() => {
              logoutHandle("logout");
            }}
            className={logoutFind ? "active" : ""}
          >
            Log out
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default SideBar;
