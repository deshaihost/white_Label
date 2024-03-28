import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import LogoNavBar from "../../helper/staticImage/logoNavBar.svg";
import "./NavBar.css";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
const NavBar = () => {

  return (
    <header className="header">
      <Container>
        <Navbar expand="lg" className="bg-body-tertiary header-container">
            <Navbar.Brand href="#"><img src={LogoNavBar}></img></Navbar.Brand>
            <div className="header-icons-list">
              <div className="header-icon">
                <button>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.99999 9.99999C12.5783 9.99999 14.6667 7.91166 14.6667 5.33332C14.6667 2.75499 12.5783 0.666656 9.99999 0.666656C7.42166 0.666656 5.33332 2.75499 5.33332 5.33332C5.33332 7.91166 7.42166 9.99999 9.99999 9.99999ZM9.99999 12.3333C6.88499 12.3333 0.666656 13.8967 0.666656 17V19.3333H19.3333V17C19.3333 13.8967 13.115 12.3333 9.99999 12.3333Z" fill="#146EF5"></path>
                  </svg>
                </button>
              </div>
              <Navbar.Toggle className="header-icon" aria-controls="navbarSupportedContent">
                <button>
                  <span className="toggle-line my-1"></span>
                  <span className="toggle-line my-1"></span>
                  <span className="toggle-line my-1"></span>
                </button>
              </Navbar.Toggle>
            </div>
            <Navbar.Collapse id="navbarSupportedContent">
            <Nav >
              <NavLink exact to="/" className="nav-link" activeClassName="active">Home</NavLink>
              <NavLink exact to="/pricing" className="nav-link" activeClassName="active">Pricing</NavLink>
              <NavLink exact to="/meetHostBuddy" className="nav-link" activeClassName="active">Meet HostBuddy</NavLink>
              <NavLink exact to="/faqs" className="nav-link" activeClassName="active">FAQs</NavLink>
            </Nav>
            </Navbar.Collapse>
            <div className="nav-buttons">
              
              <Link className="nav-btn nav-btn-primary link-btn filled-btn" to='/signup'>Signup</Link>
              <Link className="nav-btn nav-btn-outline link-btn outline-btn" to='/login'>Login</Link>
            </div>
        </Navbar>
      </Container>
    </header>
    
  );
};

export default NavBar;
