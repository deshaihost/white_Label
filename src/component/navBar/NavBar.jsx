import React, { useState } from "react";
import { Link } from "react-router-dom";
import LogoNavBar from "../../helper/staticImage/logoNavBar.svg";
import "./NavBar.css";
import RightBtn from "./mobileView/RightBtn";
import LeftBtn from "./mobileView/LeftBtn";
const NavBar = () => {
  const [mobileViewshow, setMobileViewShow] = useState({
    rightBtn: false,
    leftBtn: false,
  });

  return (
    <>
      <div className="bg-dark fluid text-white py-4">
        <div className="container ">
          <div className="row">
            <div className="col ">
              <img src={LogoNavBar}></img>
            </div>
            <div className="col  d-flex justify-content-evenly align-items-center mobileView">
              <div>
                <Link to="/" className="navText ">
                  Home
                </Link>
              </div>
              <div>
                <Link to="/pricing" className="navText ">
                  Pricing
                </Link>
              </div>
              <div>
                <Link to="/meetHostBuddy" className="navText ">
                  Meet HostBuddy
                </Link>
              </div>
              <div>
                <Link to="/faqs" className="navText ">
                  FAQs
                </Link>
              </div>
            </div>
            <div className="col d-flex justify-content-center align-items-center mobileView">
              <div>
                <button className="btn btn-primary rounded-pill">
                  <Link to="/signup" className="navText ">
                    Sign Up
                  </Link>
                </button>
              </div>
              <div className="ms-4">
                <button className="btn btn-dark border rounded-pill">
                  <Link to="/login" className="navText ">
                    Login
                  </Link>
                </button>
              </div>
            </div>
            <div className="col d-flex justify-content-center align-items-center deskTopView">
              <div>
                <button
                  className="btn btn-primary rounded-pill"
                  onClick={() => {
                    setMobileViewShow({ leftBtn: !mobileViewshow.leftBtn });
                  }}
                >
                  <i class="bi bi-person"></i>
                </button>
              </div>
              <div className="ms-4">
                <button
                  className="btn btn-dark border rounded-pill"
                  onClick={() => {
                    setMobileViewShow({ rightBtn: !mobileViewshow.rightBtn });
                  }}
                >
                  <i class="bi bi-justify"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {mobileViewshow?.leftBtn && <LeftBtn />}
      {mobileViewshow?.rightBtn && <RightBtn />}
    </>
  );
};

export default NavBar;
