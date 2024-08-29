import React, { useState } from "react";
import "./index.css";
import dummyPropertyImg from "../../../../../public/img/dummyPropertyImg.png";
import { formatDateRange } from "../../../../../helper/commonFun";
import JustificationModal from "../../../../testProperty/banner/messages/justificationModal/justificationModal";
import { useSelector } from "react-redux";
const RightSection = ({ rightSectionData }) => {
  const { arrival_date, departure_date, status, guest_name, sentiment } =
    rightSectionData ? rightSectionData : [];
  const [showJustificationModal, setShowJustificationModal] = useState(false);
  const [justificationText, setJustificationText] = useState(
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry"
  );
  const store = useSelector((state) => state);
  const getPropertyName =
    store?.getSessionIdReducer?.sessionId?.data?.property_name;

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
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry.{" "}
            </p>
            <span className="guest_date">
              {arrival_date && formatDateRange(arrival_date, departure_date)}
            </span>
          </div>
        </div>
        <div className="col-lg-3 guest-img">
          <img src={dummyPropertyImg} alt="" />
        </div>
      </div>
      <div className="issue">
        <h3>Isues</h3>
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry.{" "}
        </p>
        <div className="text-center" style={{ cursor: "pointer" }}>
          <button onClick={() => setShowJustificationModal(true)}>Manage</button>
        </div>
      </div>
      <div className="satisfy">
        <h2>Satisfaction</h2>
        <p className="result"> {status}</p>
      </div>
      <div className="about">
        <div className="about-inner">
          <h2>About Jorge</h2>
          <div className="user-detail">
            <p>Phone NUmber: 98765433</p>
            <p>Plateform Booked: Airbnb</p>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry.{" "}
            </p>
            <p></p>
          </div>
        </div>
      </div>
      <JustificationModal
        show={showJustificationModal}
        handleClose={() => setShowJustificationModal(false)}
        propertyName={getPropertyName}
        justification={justificationText}
      />
    </div>
  );
};

export default RightSection;
