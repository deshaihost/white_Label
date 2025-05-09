import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./sidebar.css";
import axios from "axios";
import { FullScreenLoader } from "../../helper/Loader";
import { logOut } from "../../helper/Authorized";

const SideBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const findlocation = location?.pathname;
  const [logoutLoader, setLogoutLoader] = useState(false);

  const logoutHandle = async () => {
    try {
      setLogoutLoader(true);
      logOut();
      setLogoutLoader(false);
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  // Return null to stop rendering the sidebar content
  // The component is still mounted but doesn't render anything to the DOM
  return null;

  /* Original sidebar code - commented out to stop rendering
  return (
    <div className="navigation-links custom-nav-links">
      <ul>
        <li>
          <Link to="/getstarted" className={findlocation === "/getstarted" ? "active" : ""}>
            Get Started
          </Link>
        </li>
        <li>
          <Link to="/dashboard" className={findlocation === "/dashboard" ? "active" : ""}>
            Dashboard
          </Link>
        </li>
        <li>
          <Link to="/properties" className={findlocation === "/properties" ? "active" : ""}>
            Properties
          </Link>
        </li>
        <li>
          <Link to="/inbox" className={findlocation === "/inbox" ? "active" : ""}>
            Messaging
          </Link>
        </li>
        <li>
          <Link to="/action-item" className={findlocation === "/action-item" ? "active" : ""}>
            Action Items
          </Link>
        </li>
        <li>
          <Link to="/statistics" className={findlocation === "/statistics" ? "active" : ""}>
            Insights
          </Link>
        </li>
        <li>
          <Link to="/setting" className={findlocation === "/setting" ? "active" : ""}>
            Settings
          </Link>
        </li>
        <li>
          {!logoutLoader ? (
            <Link onClick={() => {logoutHandle("logout");}}>
              Log out
            </Link>
          ) : (
            <FullScreenLoader />
          )}
        </li>
      </ul>
    </div>
  );
  */
};

export default SideBar;
