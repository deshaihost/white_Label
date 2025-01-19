import React, { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Alert } from "react-bootstrap";
import "./NavBar.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Authorized from "../../helper/Authorized";

// import LogoNavBar from "../../helper/staticImage/logoNavBar.svg";
const LogoNavBar = "https://hostbuddylb.com/logo/logoNavBar.svg";

const NavBar = () => {
  const location = useLocation();
  const getAuthToken = Authorized();
  const { token } = getAuthToken ? getAuthToken : {};

  // List of paths that should show portal navigation
  const protectedPaths = ["/dashboard", "/statistics", "/properties", "/test-property", "/workbench", "/property-insight", "/subscription", "/setting", "/add-property", "/edit-property", "/guided-setup", "/inbox", "/action-item", "/getstarted", "/journey"];

  // Check if current path should show portal navigation
  const isProtectedPath = protectedPaths.some((path) =>
    location.pathname.startsWith(path)
  );

  // List of paths that should show portal navigation based on login status
  const conditionalPaths = ["/getstarted", "/smart-templates"];

  // Check if current path should show portal navigation based on login status
  const isConditionalPath = conditionalPaths.includes(location.pathname);

  // Below data comes from /get_user_data API call on the Dashboard or Properties page. Used to determine whether to show warning banner about subscription, and to populate details on the banner
  const paymentStatus = localStorage.getItem("paymentStatus");
  const servicesExpireDate = localStorage.getItem("servicesExpireDate"); // Format: MM/DD/YYYY HH:MM:SS (24 hr time, UTC)
  const numPropertiesAllowed = parseInt(
    localStorage.getItem("numPropertiesAllowed")
  );
  const numPropertiesUsed = parseInt(localStorage.getItem("numPropertiesUsed"));
  const tooManyPropertiesGraceUntil = localStorage.getItem(
    "tooManyPropertiesGraceUntil"
  ); // Format: MM/DD/YYYY HH:MM:SS (24 hr time, UTC)

  // Parse the date string from the API into a Date object. Need to do it this way to make sure we properly account for UTC time.
  const parseDate = (dateString) => {
    const [date, time] = dateString.split(" ");
    const [month, day, year] = date.split("/");
    const [hour, minute, second] = time.split(":");
    return new Date(Date.UTC(year, month - 1, day, hour, minute, second));
  };

  // mobile navbar functionality
  const [loginIcon, setLoginIcon] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const handleToggle = () => {
    setExpanded(!expanded);
    setLoginIcon(false);
  };

  const handleNavLinkClick = () => {
    setExpanded(false);
  };

  const handleToggleLogin = () => {
    setLoginIcon(!loginIcon);
    setExpanded(false);
  };

  const handleNavLinkLoginClick = () => {
    setLoginIcon(false);
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
              {isProtectedPath || (isConditionalPath && token) ? (
                <>
                  <NavLink exact to="/getstarted" className="nav-link" activeClassName="active" onClick={handleNavLinkClick}>
                    Get Started
                  </NavLink>
                  <NavLink exact to="/dashboard" className="nav-link" activeClassName="active" onClick={handleNavLinkClick}>
                    Dashboard
                  </NavLink>
                  <NavLink exact to="/properties" className="nav-link" activeClassName="active" onClick={handleNavLinkClick}>
                    Properties
                  </NavLink>
                  <NavLink exact to="/inbox" className="nav-link" activeClassName="active" onClick={handleNavLinkClick}>
                    Messaging
                  </NavLink>
                  <NavLink exact to="/action-item" className="nav-link" activeClassName="active" onClick={handleNavLinkClick}>
                    Action Items
                  </NavLink>
                  <NavLink exact to="/setting" className="nav-link" activeClassName="active" onClick={handleNavLinkClick}>
                    Settings
                  </NavLink>
                </>
              ) : (
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

export default NavBar;