import React, { useEffect, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { Alert } from "react-bootstrap";
import "./NavBar.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Authorized, { logOut } from "../../helper/Authorized";
import { setAuthorization } from "../../helper/apiCore";

// import LogoNavBar from "../../helper/staticImage/logoNavBar.svg";
const LogoNavBar = "https://hostbuddylb.com/logo/logoNavBar.svg";

const UserNavBar = ({ gcsToken }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const getAuthToken = Authorized();
  const { token } = getAuthToken ? getAuthToken : {};

  // mobile navbar functionality - MOVED BEFORE CONDITIONAL RETURN
  const [loginIcon, setLoginIcon] = useState(false);
  const [expanded, setExpanded] = useState(false);

  // Don't render UserNavBar for authenticated users (they'll use NavBarContainer instead)
  if (token) {
    return null;
  }

  const logoutHandle = async (e) => {
    e.preventDefault();
    logOut();
    navigate("/login");
  };

  // List of paths that should show portal navigation. Need to add to this list whenver a new protected path is added
  const protectedPaths = ["/dashboard", "/statistics", "/properties", "/test-property", "/workbench", "/property-insight", "/subscription", "/setting", "/add-property", "/edit-property", "/guided-setup", "/inbox", "/action-item", "/getstarted", "/journey", "/gcs-users", '/gcs-settings'];
  const isInGcsPortal = ["/gcs-users", '/gcs-settings'].includes(location.pathname);

  // Check if current path should show portal navigation
  const isProtectedPath = protectedPaths.some((path) =>
    location.pathname.startsWith(path)
  );

  // List of paths that should show portal navigation based on login status
  const conditionalPaths = ["/getstarted", "/smart-templates"];

  // Check if current path should show portal navigation based on login status
  const isConditionalPath = conditionalPaths.includes(location.pathname);

  const handleToggle = () => {
    setExpanded(!expanded);
    setLoginIcon(false);
  };

  const handleNavLinkClick = () => {
    setExpanded(false);
  };

  // Set the token back to the GCS token, so that API calls are now made as the GCS user isntead of the subaccount user
  // then navigate back to GCS home
  const handlebackToUsersClick = (e) => {
    e.preventDefault();
    setExpanded(false);
    setAuthorization(gcsToken);
    navigate("/gcs-users");
  };

  const handleToggleLogin = () => {
    setLoginIcon(!loginIcon);
    setExpanded(false);
  };
  // mobile navbar functionality

  return (
    <header className="header">
      <Container>
        <Navbar expand="lg" expanded={expanded} className="bg-body-tertiary header-container">
          <Navbar.Brand>
            <NavLink exact to="/">
              <img src={LogoNavBar} alt="HostBuddy AI Logo" />
            </NavLink>
          </Navbar.Brand>
          <div className="header-icons-list">
            {!isProtectedPath && (
              <>
                <Navbar.Toggle className="header-icon" aria-controls="navbarSupportedContent" onClick={handleToggleLogin}>
                  {loginIcon ? (
                    <div className="close-icon">
                      {" "}
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
                        <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"></path>
                      </svg>
                    </div>
                  ) : (
                    <div className="header-icon">
                      <button>
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path fill="#146EF5" d="M9.99999 9.99999C12.5783 9.99999 14.6667 7.91166 14.6667 5.33332C14.6667 2.75499 12.5783 0.666656 9.99999 0.666656C7.42166 0.666656 5.33332 2.75499 5.33332 5.33332C5.33332 7.91166 7.42166 9.99999 9.99999 9.99999ZM9.99999 12.3333C6.88499 12.3333 0.666656 13.8967 0.666656 17V19.3333H19.3333V17C19.3333 13.8967 13.115 12.3333 9.99999 12.3333Z"></path>
                        </svg>
                      </button>
                    </div>
                  )}
                </Navbar.Toggle>
                {loginIcon && (
                  <div className="account-detail">
                    <NavLink exact to="/login" className="nav-link" activeClassName="active" onClick={handleNavLinkClick}>
                      Login
                    </NavLink>
                    <NavLink exact to="/signup" className="nav-link" activeClassName="active" onClick={handleNavLinkClick}>
                      Signup
                    </NavLink>
                  </div>
                )}
              </>
            )}

            <Navbar.Toggle className="header-icon" aria-controls="navbarSupportedContent" onClick={handleToggle}>
              <button>
                <span className="toggle-line my-1"></span>
                <span className="toggle-line my-1"></span>
                <span className="toggle-line my-1"></span>
              </button>
            </Navbar.Toggle>
          </div>
          <Navbar.Collapse id="navbarSupportedContent">
            <Nav>
              {isProtectedPath || (isConditionalPath && token) ? ( // in user portal
                <>
                  {gcsToken ? (
                    <NavLink to="/gcs-users" className="nav-link" onClick={handlebackToUsersClick}>
                      All Accounts
                    </NavLink>
                  ) : (
                    <NavLink to="/getstarted" className={({isActive}) => isActive ? "nav-link active" : "nav-link"} onClick={handleNavLinkClick}>
                      Get Started
                    </NavLink>
                  )}
                  {!isInGcsPortal && (
                    <>
                      <NavLink to="/dashboard" className={({isActive}) => isActive ? "nav-link active" : "nav-link"} onClick={handleNavLinkClick}>
                        Dashboard
                      </NavLink>
                      <NavLink to="/properties" className={({isActive}) => isActive ? "nav-link active" : "nav-link"} onClick={handleNavLinkClick}>
                        Properties
                      </NavLink>
                      <NavLink to="/inbox" className={({isActive}) => isActive ? "nav-link active" : "nav-link"} onClick={handleNavLinkClick}>
                        Messaging
                      </NavLink>
                      <NavLink to="/action-item" className={({isActive}) => isActive ? "nav-link active" : "nav-link"} onClick={handleNavLinkClick}>
                        Action Items
                      </NavLink>
                    </>
                  )}
                  <NavLink to={isInGcsPortal ? '/gcs-settings' : '/setting'} className={({isActive}) => isActive ? "nav-link active" : "nav-link"} onClick={handleNavLinkClick}>
                    {isInGcsPortal ? 'GCS Acct Settings' : 'Settings'}
                  </NavLink>
                  {isInGcsPortal && (
                    <NavLink to="/login" className="nav-link" onClick={logoutHandle}>
                      Log Out
                    </NavLink>
                  )}
                </>
              ) : ( // one of the front pages, outside of user portal
                <>
                  <NavLink exact to="/" className="nav-link" activeClassName="active" onClick={handleNavLinkClick}>
                    Home
                  </NavLink>
                  <NavLink exact to="/meet-hostbuddy" className="nav-link" activeClassName="active" onClick={handleNavLinkClick}>
                    Meet HostBuddy
                  </NavLink>
                  <NavLink exact to="/integrations" className="nav-link" activeClassName="active" onClick={handleNavLinkClick}>
                    Integrations
                  </NavLink>
                  <NavLink exact to="/pricing" className="nav-link" activeClassName="active" onClick={handleNavLinkClick}>
                    Pricing
                  </NavLink>
                  {/*
                  <NavLink exact to="/faqs" className="nav-link" activeClassName="active" onClick={handleNavLinkClick}>
                    FAQs
                  </NavLink>
                  */}
                  <NavLink exact to="https://userguide.hostbuddy.ai/quick-start/getting-started" className="nav-link" activeClassName="active" onClick={handleNavLinkClick} target="_blank" rel="noopener noreferrer">
                    Docs
                  </NavLink>

                  {/* Remove About Us and Blog for now, to save space in the navbar. Will re-add shortly after the navbar is redesigned to accommodate more items */}
                  {/*
                  <NavLink exact to="/about-us" className="nav-link" activeClassName="active" onClick={handleNavLinkClick}>
                    About Us
                  </NavLink>
                  <NavLink exact to="/blog" className="nav-link" activeClassName="active" onClick={handleNavLinkClick}>
                    Blog
                  </NavLink>
                  */}

                </>
              )}
            </Nav>
          </Navbar.Collapse>
          {(!isProtectedPath || (isConditionalPath && !token)) && (
            <div className="nav-buttons">
              <Link className="nav-btn nav-btn-primary link-btn outline-btn" to="/signup" style={{ marginRight: 10 }}>
                Sign Up
              </Link>
              <Link className="nav-btn nav-btn-outline link-btn filled-btn" to="/login">
                Log In
              </Link>
            </div>
          )}
        </Navbar>
      </Container>
    </header>
  );
};

export default UserNavBar;