import React, { useState } from "react";
import "./index.css";
import dummyPropertyImg from "../../../../../public/img/dummyPropertyImg.png";
import { formatDateRange } from "../../../../../helper/commonFun";
import JustificationModal from "../../../../testProperty/banner/messages/justificationModal/justificationModal";
const RightSection = ({ rightSectionData }) => {
  const { arrival_date, departure_date, status, guest_name, sentiment, property_name } = rightSectionData ? rightSectionData : {};
  let { channel } = rightSectionData || {};
  if (channel) { channel = channel.split(" (")[0]; } // channel e.g. "Airbnb (via Hostfully)". Remove the second part.
  else { channel = ""; }


  return (
    <div className="right-side">
      <div className="bordr-cl right-title">
        <h2>Reservation</h2>
      </div>
      <div className="row">
        <div className="col-lg-9">
          <div className="guest">
            <span>Past Guest </span>
            <h2>{guest_name}</h2>
            <p>{property_name}</p>
            <p className="guest_date">{arrival_date && formatDateRange(arrival_date, departure_date, true)}</p>
          </div>
        </div>
        <div className="col-lg-3 guest-img">
          <img src={dummyPropertyImg} alt="" />
        </div>
      </div>
      <div className="issue">
        <h3>Issues</h3>
        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
        <div style={{ display: "flex", justifyContent: "center", marginTop: "5px" }}>
          <a href="#" style={{fontSize:"14px"}}>Manage</a>
        </div>
      </div>
      <div className="satisfy">
        {sentiment && (
          <>
            <h2>Satisfaction</h2>
            <p className="result" style={{color: sentiment === "positive" ? "rgb(0, 128, 0)" : sentiment === "neutral" ? "#BBB" : "rgb(255, 0, 0)"}}>
              {sentiment}
            </p>
          </>
        )}
      </div>
      <div className="about">
        <div className="about-inner">
          <h2>About Jorge</h2>
          <div className="user-detail">
            <p>Phone Number: 98765433</p>
            <p>Plateform Booked: {channel}</p>
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
            <p></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightSection;
