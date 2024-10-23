import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./discover.css";
import ContactUs from "./contactUs/ContactUs";
import BookDemoModal from "../../../component/bookDemoModal";

const Discover = () => {
    const [contactModalShow, setContactModalShow] = useState(false);
    const [demoModalShow, setDemoModalShow] = useState(false);

  return (
    <section className="discover">
      <Container>
      
        <div className="row">
          <div className="col-lg-6">
            <h2>
              <strong>Questions?</strong> We're Here To Help!
            </h2>
            <div>
              <a className="link-btn filled-btn" style={{ cursor: "pointer", marginRight: '20px' }} target="_blank" rel="noopener noreferrer" onClick={(e) => {
                  e.preventDefault(); // Don't go to any link - just open the modal
                  setDemoModalShow(true);
              }}>Book a Demo</a>
              <Link className="link-btn outline-btn" onClick={() => setContactModalShow(true)}> Contact Us </Link>
            </div>
          </div>
        </div>
      </Container>
      <ContactUs show={contactModalShow} onHide={() => setContactModalShow(false)} />
      <BookDemoModal show={demoModalShow} onHide={() => setDemoModalShow(false)} sourceMsg='meet hostbuddy discover'/>
    </section>
  );
};

export default Discover;
