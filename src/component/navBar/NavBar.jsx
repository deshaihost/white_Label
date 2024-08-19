import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Alert } from "react-bootstrap";
import "./NavBar.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Authorized from "../../helper/Authorized";

// import LogoNavBar from "../../helper/staticImage/logoNavBar.svg";
const LogoNavBar = "https://hostbuddylb.com/logo/logoNavBar.svg";

const NavBar = () => {
  const getAuthToken = Authorized();
  const { token } = getAuthToken ? getAuthToken : {};
  const localstorageDataGet = localStorage.getItem("chatBoxId");

  useEffect(() => {
    if (localstorageDataGet === 1234) {
      Authorized();
    }
  }, [localstorageDataGet]);

  // Below data comes from /get_user_data API call on the Dashboard or Properties page. Used to determine whether to show warning banner about subscription, and to populate details on the banner
  const paymentStatus = localStorage.getItem("paymentStatus");
  const servicesExpireDate = localStorage.getItem("servicesExpireDate"); // Format: MM/DD/YYYY HH:MM:SS (24 hr time, UTC)
  const numPropertiesAllowed = parseInt(localStorage.getItem("numPropertiesAllowed"));
  const numPropertiesUsed = parseInt(localStorage.getItem("numPropertiesUsed"));
  const tooManyPropertiesGraceUntil = localStorage.getItem("tooManyPropertiesGraceUntil"); // Format: MM/DD/YYYY HH:MM:SS (24 hr time, UTC)

  // Parse the date string from the API into a Date object. Need to do it this way to make sure we properly account for UTC time.
  const parseDate = (dateString) => {
    const [date, time] = dateString.split(" ");
    const [month, day, year] = date.split("/");
    const [hour, minute, second] = time.split(":");
    return new Date(Date.UTC(year, month - 1, day, hour, minute, second));
  };

  // Warning banner to be shown to user if their payment standing is bad
  const paymentStatusBanner = () => {
    if (paymentStatus === "bad") {
      const expiryDate = parseDate(servicesExpireDate);
      const currentDate = new Date(Date.now());
      const diffTime = Math.abs(expiryDate - currentDate); // time remaining, in milliseconds
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)); // time remaining, in full days

      if (expiryDate > currentDate) { // Payment standing is bad, but user still has grace period before services are paused
        return (<Alert variant="danger">{" "}Your last subscription payment didn't go through. Please click on "Subscription" in your <Link to="/account">Account page</Link> to update your payment info. Otherwise, your services will be paused in{" "}{diffDays} days.{" "}</Alert>);
      } else { // Payment standing is bad, and grace period is over. Services have been paused.
        return (<Alert variant="danger">{" "}Your last subscription payment didn't go through and your services have been paused. Please click on "Subscription" in your{" "} <Link to="/account">Account page</Link> to update your payment info.{" "}</Alert>);
      }
    } else if (numPropertiesUsed > numPropertiesAllowed) {
      /* No longer used. Instead, in this case, we'll just lock the extra properties.
        const expiryDate = parseDate(tooManyPropertiesGraceUntil);
        const currentDate = new Date(Date.now());
        const diffTime = Math.abs(expiryDate - currentDate); // time remaining, in milliseconds
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)); // time remaining, in full days
        if (expiryDate > currentDate) {
          // User has too many properties, but still has grace period before services are paused
          return (
            <Alert variant="danger">
              {" "}
              Your account has {numPropertiesUsed} properties, which is greater
              than your current subscription allows ({numPropertiesAllowed}).
              Please reconcile this by clicking on "Subscription" in your{" "}
              <Link to="/account">Account page</Link> to increase your allowance,
              or by deleting extra properties from the{" "}
              <Link to="/properties">Properties page</Link>. Otherwise, your
              services will be paused in {diffDays} days.{" "}
            </Alert>
          );
      } else {
        // User has too many properties, and grace period is over. Services have been paused.
        return (
          <Alert variant="danger">
            {" "}
            Your account has {numPropertiesUsed} properties, which is greater
            than your current subscription allows ({numPropertiesAllowed}). Your
            services for this account have been paused. To resume service,
            please click on "Subscription" in your{" "}
            <Link to="/account">Account page</Link> and ensure all properties
            are paid for, or delete extra properties from the{" "}
            <Link to="/properties">Properties page</Link> to match the current
            subscription allowance.{" "}
          </Alert>
        );
      }
      */
    }
  };

  // mobile navbar functionality
  const [expanded, setExpanded] = useState(false);

  const handleToggle = () => {
    setExpanded(!expanded);
  };

  const handleNavLinkClick = () => {
    setExpanded(false);
  };

  const [loginIcon, setLoginIcon] = useState(false);
  const handleToggleLogin = () => {
    setLoginIcon(!expanded);
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
            <div className="header-icon">
              <button onClick={handleToggleLogin}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9.99999 9.99999C12.5783 9.99999 14.6667 7.91166 14.6667 5.33332C14.6667 2.75499 12.5783 0.666656 9.99999 0.666656C7.42166 0.666656 5.33332 2.75499 5.33332 5.33332C5.33332 7.91166 7.42166 9.99999 9.99999 9.99999ZM9.99999 12.3333C6.88499 12.3333 0.666656 13.8967 0.666656 17V19.3333H19.3333V17C19.3333 13.8967 13.115 12.3333 9.99999 12.3333Z" fill="#146EF5"></path>
                </svg>
              </button>
            </div>
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
              {token !== undefined ? (
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
                  <NavLink exact to="/property-insight" className="nav-link" activeClassName="active" onClick={handleNavLinkClick}>
                    Transcripts
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
                  <NavLink exact to="/pricing" className="nav-link" activeClassName="active" onClick={handleNavLinkClick}>
                    Pricing
                  </NavLink>
                  <NavLink exact to="/faqs" className="nav-link" activeClassName="active" onClick={handleNavLinkClick}>
                    FAQs
                  </NavLink>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
          {token === undefined && (
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
        {(paymentStatus === "bad" ||
          numPropertiesUsed > numPropertiesAllowed) &&
          paymentStatusBanner()}
      </Container>
    </header>
  );
};

export default NavBar;
