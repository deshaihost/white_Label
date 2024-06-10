import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./discover.css";
import ContactUs from "./contactUs/ContactUs";

const Discover = () => {
    const [modalShow, setModalShow] = useState(false);

  return (
    <section className="discover">
      <Container>
      
        <div className="row">
          <div className="col-lg-6">
            <h2>
              <strong>Questions?</strong> We're Here To Help!
            </h2>
            <div onClick={() => setModalShow(true)}>
            <a href="https://calendly.com/jay-u6bh/30min" className="link-btn filled-btn" style={{ marginRight: '20px' }} target="_blank" rel="noopener noreferrer">Book a Demo</a>
            <Link  className="link-btn outline-btn"> Contact Us </Link>
            </div>
          </div>
        </div>
      </Container>
      <ContactUs show={modalShow} onHide={() => setModalShow(false)} />
    </section>
  );
};

export default Discover;
