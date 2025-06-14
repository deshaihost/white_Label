import React, { useState, useEffect } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import "./NavBar.css";
import "./LoginPopupFix.css"; // Import the fix CSS
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Authorized, { logOut } from "../../helper/Authorized";
import { setAuthorization } from "../../helper/apiCore";
import { positionLoginPopup, positionNavMenuPopup } from "./LoginPopupFix";

// import LogoNavBar from "../../helper/staticImage/logoNavBar.svg";
const LogoNavBar = "https://hostbuddylb.com/logo/logoNavBar.svg";

const UserNavBar = ({ gcsToken }) => {
  // Define all React hooks at the top level to follow React's rules of hooks
  const location = useLocation();
  const navigate = useNavigate();
  const getAuthToken = Authorized();
  const { token } = getAuthToken ? getAuthToken : {};
  // Mobile navbar functionality - always defined at top level before any conditional returns
  const [loginIcon, setLoginIcon] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [navMenuOpen, setNavMenuOpen] = useState(false);

  // Debug log for state changes
  console.log('UserNavBar render - navMenuOpen:', navMenuOpen, 'loginIcon:', loginIcon);

  // List of paths that should show portal navigation. Need to add to this list whenver a new protected path is added
  const protectedPaths = [
    "/dashboard",
    "/statistics",
    "/properties",
    "/test-property",
    "/workbench",
    "/property-insight",
    "/subscription",
    "/setting",
    "/add-property",
    "/edit-property",
    "/guided-setup",
    "/inbox",
    "/action-item",
    "/getstarted",
    "/journey",
    "/gcs-users",
    "/gcs-settings",
  ];
  const isInGcsPortal = ["/gcs-users", "/gcs-settings"].includes(
    location.pathname
  );

  // Check if current path should show portal navigation
  const isProtectedPath = protectedPaths.some((path) =>
    location.pathname.startsWith(path)
  );

  // List of paths that should show portal navigation based on login status
  const conditionalPaths = ["/getstarted", "/smart-templates"];

  // Check if current path should show portal navigation based on login status
  const isConditionalPath = conditionalPaths.includes(location.pathname);

  // Define all handlers at the top level, before any conditional returns
  const logoutHandle = async (e) => {
    e.preventDefault();
    logOut();
    navigate("/login");
  };  const handleToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('handleToggle clicked, current navMenuOpen:', navMenuOpen);
    const newNavMenuState = !navMenuOpen;
    console.log('Setting navMenuOpen to:', newNavMenuState);
    setNavMenuOpen(newNavMenuState);
    // Only close login dropdown if it's actually open
    if (loginIcon) {
      setLoginIcon(false);
    }
  };
  const handleNavLinkClick = () => {
    setExpanded(false);
    setLoginIcon(false); // Close the login dropdown as well
    setNavMenuOpen(false); // Close the nav menu
  };

  // Set the token back to the GCS token, so that API calls are now made as the GCS user isntead of the subaccount user
  // then navigate back to GCS home
  const handlebackToUsersClick = (e) => {
    e.preventDefault();
    setExpanded(false);
    setAuthorization(gcsToken);
    navigate("/gcs-users");
  };  const handleToggleLogin = () => {
    console.log('handleToggleLogin clicked, current loginIcon:', loginIcon);
    setLoginIcon(!loginIcon);
    // Only close nav menu if it's actually open
    if (navMenuOpen) {
      setNavMenuOpen(false);
    }
    setExpanded(false);
  };// Positioning effect for the login popup
  useEffect(() => {
    let cleanup;
    if (loginIcon) {
      // Set a small timeout to ensure DOM is ready
      const timer = setTimeout(() => {
        cleanup = positionLoginPopup();
      }, 50);

      // Return a cleanup function that clears the timeout and runs the original cleanup
      return () => {
        clearTimeout(timer);
        if (cleanup) cleanup();
      };
    }
  }, [loginIcon]);
  // Positioning effect for the navigation menu popup
  useEffect(() => {
    console.log('Nav menu useEffect triggered, navMenuOpen:', navMenuOpen);
    let cleanup;
    if (navMenuOpen) {
      // Set a small timeout to ensure DOM is ready
      const timer = setTimeout(() => {
        cleanup = positionNavMenuPopup();
      }, 50);

      // Return a cleanup function that clears the timeout and runs the original cleanup
      return () => {
        clearTimeout(timer);
        if (cleanup) cleanup();
      };
    }
  }, [navMenuOpen]);
  // Close login popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      const loginPopup = document.getElementById("login-popup");
      const loginToggle = document.getElementById("login-toggle-btn");

      if (
        loginIcon &&
        loginPopup &&
        loginToggle &&
        !loginPopup.contains(event.target) &&
        !loginToggle.contains(event.target)
      ) {
        setLoginIcon(false);
      }
    };

    if (loginIcon) {
      document.addEventListener("click", handleClickOutside);
      return () => {
        document.removeEventListener("click", handleClickOutside);
      };
    }
  }, [loginIcon]);

  // Close nav menu popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      const navPopup = document.getElementById("nav-menu-popup");
      const navToggle = document.getElementById("nav-toggle-btn");

      if (
        navMenuOpen &&
        navPopup &&
        navToggle &&
        !navPopup.contains(event.target) &&
        !navToggle.contains(event.target)
      ) {
        setNavMenuOpen(false);
      }
    };

    if (navMenuOpen) {
      document.addEventListener("click", handleClickOutside);
      return () => {
        document.removeEventListener("click", handleClickOutside);
      };
    }
  }, [navMenuOpen]);

  // Create the component content
  // Always render UserNavBar when this component is called
  // The logic for when to show this vs NavBarContainer is handled in Routes.jsx
  const content = (
    <header className="header" style={{ padding: "10px" }}>
      <Container>
        <Navbar
          expand="lg"
          expanded={expanded}
          className="bg-body-tertiary header-container"
        >
          <Navbar.Brand>
            <NavLink to="/">
              <img src={LogoNavBar} alt="HostBuddy AI Logo" />
            </NavLink>
          </Navbar.Brand>{" "}
          <div className="header-icons-list">
            {!isProtectedPath && (
              <div className="login-dropdown-container" id="login-dropdown">
                <div
                  className="header-icon login-toggle"
                  onClick={handleToggleLogin}
                  id="login-toggle-btn"
                >
                  {loginIcon ? (
                    <div className="close-icon">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-x-lg"
                        viewBox="0 0 16 16"
                      >
                        <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"></path>
                      </svg>
                    </div>
                  ) : (
                    <div>
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill="#146EF5"
                          d="M9.99999 9.99999C12.5783 9.99999 14.6667 7.91166 14.6667 5.33332C14.6667 2.75499 12.5783 0.666656 9.99999 0.666656C7.42166 0.666656 5.33332 2.75499 5.33332 5.33332C5.33332 7.91166 7.42166 9.99999 9.99999 9.99999ZM9.99999 12.3333C6.88499 12.3333 0.666656 13.8967 0.666656 17V19.3333H19.3333V17C19.3333 13.8967 13.115 12.3333 9.99999 12.3333Z"
                        ></path>
                      </svg>
                    </div>
                  )}
                </div>
                {loginIcon && (
                  <div className="account-detail" id="login-popup">
                    <NavLink
                      to="/login"
                      className="nav-link"
                      onClick={handleNavLinkClick}
                    >
                      Login
                    </NavLink>
                    <NavLink
                      to="/signup"
                      className="nav-link"
                      onClick={handleNavLinkClick}
                    >
                      Signup
                    </NavLink>
                  </div>
                )}
              </div>
            )}{" "}
            <div className="nav-dropdown-container">
              <div
                id="nav-toggle-btn"
                className="header-icon hamburger-toggle"
                onClick={handleToggle}
              >
                {navMenuOpen ? (
                  <div className="close-icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-x-lg"
                      viewBox="0 0 16 16"
                    >
                      <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"></path>
                    </svg>
                  </div>
                ) : (
                  <>
                    <span className="toggle-line my-1"></span>
                    <span className="toggle-line my-1"></span>
                    <span className="toggle-line my-1"></span>
                  </>
                )}
              </div>
            </div>            {navMenuOpen && (
              <div className="nav-menu-detail" id="nav-menu-popup">
                {console.log('Rendering nav menu popup, navMenuOpen:', navMenuOpen)}
                <NavLink
                  to="/"
                  className="nav-link"
                  onClick={handleNavLinkClick}
                >
                  Home
                </NavLink>
                <NavLink
                  to="/meet-hostbuddy"
                  className="nav-link"
                  onClick={handleNavLinkClick}
                >
                  Meet HostBuddy
                </NavLink>
                <NavLink
                  to="/integrations"
                  className="nav-link"
                  onClick={handleNavLinkClick}
                >
                  Integrations
                </NavLink>
                <NavLink
                  to="/pricing"
                  className="nav-link"
                  onClick={handleNavLinkClick}
                >
                  Pricing
                </NavLink>
                <NavLink
                  to="https://userguide.hostbuddy.ai/quick-start/getting-started"
                  className="nav-link"
                  onClick={handleNavLinkClick}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Docs
                </NavLink>
              </div>
            )}
          </div>
          <Navbar.Collapse id="navbarSupportedContent">
            <Nav>
              {isProtectedPath || (isConditionalPath && token) ? ( // in user portal
                <>
                  {gcsToken ? (
                    <NavLink
                      to="/gcs-users"
                      className="nav-link"
                      onClick={handlebackToUsersClick}
                    >
                      All Accounts
                    </NavLink>
                  ) : (
                    <NavLink
                      to="/getstarted"
                      className={({ isActive }) =>
                        isActive ? "nav-link active" : "nav-link"
                      }
                      onClick={handleNavLinkClick}
                    >
                      Get Started
                    </NavLink>
                  )}
                  {!isInGcsPortal && (
                    <>
                      <NavLink
                        to="/dashboard"
                        className={({ isActive }) =>
                          isActive ? "nav-link active" : "nav-link"
                        }
                        onClick={handleNavLinkClick}
                      >
                        Dashboard
                      </NavLink>
                      <NavLink
                        to="/properties"
                        className={({ isActive }) =>
                          isActive ? "nav-link active" : "nav-link"
                        }
                        onClick={handleNavLinkClick}
                      >
                        Properties
                      </NavLink>
                      <NavLink
                        to="/inbox"
                        className={({ isActive }) =>
                          isActive ? "nav-link active" : "nav-link"
                        }
                        onClick={handleNavLinkClick}
                      >
                        Messaging
                      </NavLink>
                      <NavLink
                        to="/action-item"
                        className={({ isActive }) =>
                          isActive ? "nav-link active" : "nav-link"
                        }
                        onClick={handleNavLinkClick}
                      >
                        Action Items
                      </NavLink>
                    </>
                  )}
                  <NavLink
                    to={isInGcsPortal ? "/gcs-settings" : "/setting"}
                    className={({ isActive }) =>
                      isActive ? "nav-link active" : "nav-link"
                    }
                    onClick={handleNavLinkClick}
                  >
                    {isInGcsPortal ? "GCS Acct Settings" : "Settings"}
                  </NavLink>
                  {isInGcsPortal && (
                    <NavLink
                      to="/login"
                      className="nav-link"
                      onClick={logoutHandle}
                    >
                      Log Out
                    </NavLink>
                  )}
                </>
              ) : (
                // one of the front pages, outside of user portal
                <>
                  <NavLink
                    to="/"
                    className="nav-link"
                    onClick={handleNavLinkClick}
                  >
                    Home
                  </NavLink>
                  <NavLink
                    to="/meet-hostbuddy"
                    className="nav-link"
                    onClick={handleNavLinkClick}
                  >
                    Meet HostBuddy
                  </NavLink>
                  <NavLink
                    to="/integrations"
                    className="nav-link"
                    onClick={handleNavLinkClick}
                  >
                    Integrations
                  </NavLink>
                  <NavLink
                    to="/pricing"
                    className="nav-link"
                    onClick={handleNavLinkClick}
                  >
                    Pricing
                  </NavLink>
                  {/* 
                  <NavLink to="/faqs" className="nav-link" onClick={handleNavLinkClick}>
                    FAQs
                  </NavLink>
                  */}
                  <NavLink
                    to="https://userguide.hostbuddy.ai/quick-start/getting-started"
                    className="nav-link"
                    onClick={handleNavLinkClick}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Docs
                  </NavLink>
                  {/* <NavLink to="/about-us" className="nav-link" onClick={handleNavLinkClick}>
                    About Us
                  </NavLink>
                  <NavLink to="/blog" className="nav-link" onClick={handleNavLinkClick}>
                    Blog
                  </NavLink> */}
                </>
              )}
            </Nav>
          </Navbar.Collapse>
          {(!isProtectedPath || (isConditionalPath && !token)) && (
            <div className="nav-buttons">
              <Link
                className="nav-btn nav-btn-primary link-btn outline-btn"
                to="/signup"
                style={{ marginRight: 10 }}
              >
                Sign Up
              </Link>
              <Link
                className="nav-btn nav-btn-outline link-btn filled-btn"
                to="/login"
              >
                Log In
              </Link>
            </div>
          )}{" "}
        </Navbar>
      </Container>
    </header>
  );

  return content;
};

export default UserNavBar;
