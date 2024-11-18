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
import { Link } from "react-router-dom";
const Integrations = () => {
  const [contactModalShow, setContactModelShow] = useState(false);

  return (
    <div className="integrations">
      <div className="container">
        <div className="intre-heading">
          <h1>Integrations</h1>
          <img src={IntiLogo} alt="" />
        </div>
        <div className="intre-content">
          <h2>Property Management System</h2>
          <p>
            HostBuddy integrates with your existing property management system
            (PMS) to access guest, reservation, and property data. This seamless
            connection enables automated messaging and streamlined operations
            for an efficient hosting experience.
          </p>
        </div>
        <div className="inter-box row">
          <div className="col-lg-4 col-sm-6">
            <a
              href="https://www.guesty.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="image-boc-inter">
                <img src={Guesty} alt="" />
              </div>
            </a>
          </div>
          <div className="col-lg-4 col-sm-6">
            <a
              href="https://www.lodgify.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="image-boc-inter">
                <img src={Lodgify} alt="" />
              </div>
            </a>
          </div>
          <div className="col-lg-4 col-sm-6">
            <a
              href="https://www.hostfully.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="image-boc-inter">
                <img src={Hostfully} alt="" />
              </div>
            </a>
          </div>
          <div className="col-lg-4 col-sm-6">
            <a
              href="https://www.ownerrez.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="image-boc-inter">
                <img src={Ownerrez} alt="" />
              </div>
            </a>
          </div>

          <div className="col-lg-4 col-sm-6">
            <a
              href="https://www.hostaway.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="image-boc-inter">
                <img src={Hostaway} alt="" />
              </div>
            </a>
          </div>
          <div className="col-lg-4 col-sm-6">
            <a
              href=" https://hospitable.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="image-boc-inter">
                <img src={Hospitable} alt="" />
              </div>
            </a>
          </div>
          <div className="col-lg-4 col-sm-6">
            <a
              href="https://www.smoobu.com/new/en/?sc=GBWEN&ppc_campaign_id=12427800621&ppc_adgroup_id=120843288920&ppc_ad_id=656247802224&ppc_placement&ppc_keyword=smoobu&ppc_extension_id&ppc_target&ppc_target_id=kwd-367069806370&ppc_location=9210541&ppc_device=c&ppc_device_model&ppc_network=g&ppc_matchtype=e&ppc_position&gad_source=1&gclid=Cj0KCQiA6Ou5BhCrARIsAPoTxrDY653fql0I7cQHJo9SDN8EvJdtcww3Q27uRIos38QWmj2cefXO3KMaAmSTEALw_wcB"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="image-boc-inter">
                <img src={Smoobu} alt="" />
              </div>
            </a>
          </div>
          <div className="col-lg-4 col-sm-6">
            <a
              href="https://beds24.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="image-boc-inter">
                <img src={Beds} alt="" />
              </div>
            </a>
          </div>
          <div className="col-lg-4 col-sm-6">
            <a
              href="https://www.bookingsync.com/en/app-center/31"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="image-boc-inter">
                <img src={Booking} alt="" />
              </div>
            </a>
          </div>
        </div>
        <div className="intre-content">
          <h2>Other Software</h2>
          <p>
            HostBuddy connects to uour essential management tools, superchanging
            your hosting experience.
          </p>
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
            <a
              href="https://turno.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="image-boc-inter">
                <img src={Turno} alt="" />
              </div>
            </a>
          </div>
        </div>
        <div className="software-list">
          <h2>Don't see your software listed?</h2>
          <button
            onClick={() => {
              setContactModelShow(true);
            }}
          >
            Let Us Know!
          </button>
        </div>
      </div>
      <ContactUs
        show={contactModalShow}
        onHide={() => setContactModelShow(false)}
      />
    </div>
  );
};

export default Integrations;
