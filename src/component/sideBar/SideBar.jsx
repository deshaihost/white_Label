import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./sidebar.css";
import axios from "axios";
import { FullScreenLoader } from "../../helper/Loader";

const SideBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const findlocation = location?.pathname;
  const [logoutLoader, setLogoutLoader] = useState(false);


  const logoutHandle = async () => {
    try {
      setLogoutLoader(true);
      const baseUrl = process.env.REACT_APP_API_ENDPOINT;
      const logoutUrl = `${baseUrl}/logout`;
      // Define the refresh token
      const getSessionStorageData = JSON.parse(
        sessionStorage.getItem("hostBuddy_auth")
      );
      const refreshToken = getSessionStorageData?.refreshToken;
      // Define the request headers
      const headers = {
        Authorization: `Bearer ${refreshToken}`
      };

      /*
      const response = await axios.post(logoutUrl, {}, { headers });
      if (response.status === 200) {
        localStorage.clear();
        sessionStorage.removeItem("hostBuddy_auth");
        setLogoutLoader(false);
        navigate("/login");
      }
      */

      // Instead of above, just call the API and continue. Don't wait for it, we don't care about the result
      axios.post(logoutUrl, {}, { headers });
      localStorage.clear();
      sessionStorage.removeItem("hostBuddy_auth");
      setLogoutLoader(false);
      navigate("/login");
      
    } catch (error) {
      console.error(error);
    }

  };

  return (
    <div className="navigation-links custom-nav-links">
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
            Transcripts
          </Link>
        </li>
        <li>
          <Link
            to="/setting"
            className={findlocation === "/setting" ? "active" : ""}
          >
            Settings
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
          {!logoutLoader ? (
            <Link
              onClick={() => {
                logoutHandle("logout");
              }}
            >
              Log out
            </Link>
          ) : (
            <FullScreenLoader />
          )}
        </li>
      </ul>
    </div>
  );
};

export default SideBar;
