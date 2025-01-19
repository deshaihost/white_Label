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
              Discover more about <strong>HostBuddy AI</strong>, Contact us
              today!
            </h2>
            <div onClick={() => setModalShow(true)}>
            <Link  className="link-btn filled-btn">
              Contact Us
            </Link>
            </div>
          </div>
        </div>
      </Container>
      <ContactUs show={modalShow} onHide={() => setModalShow(false)} />
    </section>
  );
};

export default Discover;
