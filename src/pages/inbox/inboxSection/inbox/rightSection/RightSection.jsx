import React, { useState } from "react";
import "./index.css";
import dummyPropertyImg from "../../../../../public/img/dummyPropertyImg.png";
import { formatDateRange } from "../../../../../helper/commonFun";
import { Link } from "react-router-dom";


const RightSection = ({ rightSectionData }) => {

  // Determines what to display for the status section
  const getStatusText = (status) => {
    if (status === "inquiry") {
      return "Inquiry";
    } else if (["past", "current", "future"].includes(status)) {
      return `${status.charAt(0).toUpperCase() + status.slice(1)} guest`;
    } else {
      return null;
    }
  };

  const { arrival_date, departure_date, status, guest_name, sentiment, sentiment_justification, property_name, action_items } = rightSectionData ? rightSectionData : {};
  let { channel } = rightSectionData || {};
  if (channel) { channel = channel.split(" (")[0]; } // channel e.g. "Airbnb (via Hostfully)". Remove the second part.
  else { channel = ""; }
  const statusText = getStatusText(status);


  return (
    <div className="right-side">
      <div className="bordr-cl right-title">
        <h2>Reservation</h2>
      </div>
      <div className="row">
        <div className="guest">
          {statusText && <span>{statusText}</span>}
          <h2>{guest_name}</h2>
          <p>{property_name}</p>
          <p className="guest_date">{arrival_date && formatDateRange(arrival_date, departure_date, true)}</p>
        </div>
        {/*
        <div className="col-lg-3 guest-img">
          <img src={dummyPropertyImg} alt="" />
        </div>
        */}
      </div>
      <div className="issue">
        <h3>Open Issues</h3>
        {action_items && action_items.filter(obj => obj.status === "incomplete").length > 0 ? (
          action_items.filter(obj => obj.status === "incomplete").map((obj, index) => (
            <p key={index} style={{ marginBottom: "10px" }}>{obj.item}</p>
          ))
        ) : (
          <p>None</p>
        )}
        {action_items && action_items.filter(obj => obj.status === "incomplete").length > 0 && (
          <div style={{ display: "flex", justifyContent: "center", marginTop: "5px" }}>
            <Link to={`/action-item?property_name=${property_name}`} style={{ fontSize: "14px" }}>Manage</Link>
          </div>
        )}
      </div>
      <div className="satisfy">
        {sentiment && (
          <>
            <h2>Satisfaction</h2>
            <p className="result" style={{ color: sentiment === "positive" ? "rgb(0, 180, 0)" : sentiment === "negative" ? "rgb(200, 0, 0)" : "#BBB" }}>
              {sentiment}
            </p>
            {sentiment_justification && (
              <p style={{ fontSize:'12px', marginTop:'3px' }}>{sentiment_justification}</p>
            )}
          </>
        )}
      </div>
      
      <div className="about about-inner user-detail">
        <p>Platform Booked: {channel}</p>
      </div>

      {/* Data not yet available in the API
      <div className="about">
        <div className="about-inner">
          <h2>About {guest_name}</h2>
          <div className="user-detail">
            <p>Phone Number: 98765433</p>
            <p>Plateform Booked: {channel}</p>
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
          </div>
        </div>
      </div>
      */}
    </div>
  );
};

export default RightSection;
