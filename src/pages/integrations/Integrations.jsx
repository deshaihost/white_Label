import React, { useState } from "react";
import IntiLogo from "../../../src/helper/staticImage/Copy of 1 (3).webp";
import Guesty from "../../../src/helper/staticImage/guesty.webp";
import Lodgify from "../../../src/helper/staticImage/lodgify.webp";
import Hostfully from "../../../src/helper/staticImage/hostfully.webp";
import Ownerrez from "../../../src/helper/staticImage/ownerrez.webp";
import Hostaway from "../../../src/helper/staticImage/hostaway.webp";
import Hospitable from "../../../src/helper/staticImage/hospitable.webp";
import Smoobu from "../../../src/helper/staticImage/smoobu.webp";
import Beds from "../../../src/helper/staticImage/beds.webp";
import Booking from "../../../src/helper/staticImage/Booking.webp";
import Minut from "../../../src/helper/staticImage/minut.webp";
import Turno from "../../../src/helper/staticImage/turno.webp";
import "./Integration.css";
import ContactUs from "../meetHostBuddy/discover/contactUs/ContactUs";


const Integrations = () => {
  const [contactModalShow, setContactModalShow] = useState(false);

  return (
    <div className="integrations">
      <div className="container">
        <div className="intre-heading">
          <h1>Integrations</h1>
          <img src={IntiLogo} alt="" />
        </div>
        <div className="intre-content">
          <h2>Property Management System</h2>
          <p>HostBuddy integrates with your existing property management system (PMS) to access guest, reservation, and property data. This seamless connection enables automated messaging and streamlined operations for an efficient hosting experience.</p>
        </div>
        <div className="inter-box row">
          <div className="col-lg-4 col-sm-6">
            <a href="https://www.guesty.com/" target="_blank" rel="noopener noreferrer">
              <div className="image-boc-inter">
                <img src={Guesty} alt="" />
              </div>
            </a>
          </div>
          <div className="col-lg-4 col-sm-6">
            <a href="https://www.lodgify.com/" target="_blank" rel="noopener noreferrer">
              <div className="image-boc-inter">
                <img src={Lodgify} alt="" />
              </div>
            </a>
          </div>
          <div className="col-lg-4 col-sm-6">
            <a href="https://www.hostfully.com/" target="_blank" rel="noopener noreferrer">
              <div className="image-boc-inter">
                <img src={Hostfully} alt="" />
              </div>
            </a>
          </div>
          <div className="col-lg-4 col-sm-6">
            <a href="https://www.ownerrez.com/" target="_blank" rel="noopener noreferrer">
              <div className="image-boc-inter">
                <img src={Ownerrez} alt="" />
              </div>
            </a>
          </div>

          <div className="col-lg-4 col-sm-6">
            <a href="https://www.hostaway.com/" target="_blank" rel="noopener noreferrer">
              <div className="image-boc-inter">
                <img src={Hostaway} alt="" />
              </div>
            </a>
          </div>
          <div className="col-lg-4 col-sm-6">
            <a href="https://www.smoobu.com/new/en/" target="_blank" rel="noopener noreferrer">
              <div className="image-boc-inter">
                <img src={Smoobu} alt="" />
              </div>
            </a>
          </div>
          <div className="col-lg-4 col-sm-6">
            <a href="https://beds24.com/" target="_blank" rel="noopener noreferrer">
              <div className="image-boc-inter">
                <img src={Beds} alt="" />
              </div>
            </a>
          </div>
          <div className="col-lg-4 col-sm-6">
            <a href="https://www.bookingsync.com/en/app-center/31" target="_blank" rel="noopener noreferrer">
              <div className="image-boc-inter">
                <img src={Booking} alt="" />
              </div>
            </a>
          </div>
        </div>
        <div className="intre-content">
          <h2>Other Software</h2>
          <p>HostBuddy connects to your essential management tools, superchanging your hosting experience.</p>
        </div>
        <div className="inter-box row">
          <div className="col-lg-4 col-sm-6">
            <a
              href="https://www.minut.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="image-boc-inter">
                <img src={Minut} alt="" />
              </div>
            </a>
          </div>
          <div className="col-lg-4 col-sm-6">
            <a href="https://turno.com/" target="_blank" rel="noopener noreferrer">
              <div className="image-boc-inter">
                <img src={Turno} alt="" />
              </div>
            </a>
          </div>
        </div>
        <div className="software-list">
          <h2>Don't see your software listed?</h2>
          <button onClick={() => {setContactModalShow(true);}}>
            Let Us Know!
          </button>
        </div>
      </div>
      <ContactUs show={contactModalShow} onHide={() => setContactModalShow(false)}/>
    </div>
  );
};

export default Integrations;
