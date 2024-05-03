import React from "react";
import {
  MDBFooter,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBIcon,
} from "mdb-react-ui-kit";
import FooterLogo from "../../public/img/logo_footer.png";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";
import "./footer.css";

const Footer = () => {
  return (
    <MDBFooter className="text-center text-lg-start text-muted footer">
      <Container>
        <div className="footer-container">
          <MDBRow>
            <MDBCol md="4">
              <div className="footer-desc">
                <Link to="/" className="text-uppercase fw-bold mb-4">
                  <img src={FooterLogo} alt="footer-logo" />
                </Link>
                <p>
                  Our mission is to simplify the hosting experience, making it
                  easier and more enjoyable for hosts while enhancing the guest
                  experience.
                </p>
              </div>
            </MDBCol>

            <MDBCol md="2">
              <div className="footer-links">
                <h6 className=" fw-bold mb-4 links-heading">Quick links</h6>
                <p className="links">
                  <Link to="/" className="text-reset">
                    Home
                  </Link>
                </p>
                <p className="links">
                  <Link to="/pricing" className="text-reset">
                    Pricing
                  </Link>
                </p>
                <p className="links">
                  <Link to="/meet-hostbuddy" className="text-reset">
                    Meet HostBuddy
                  </Link>
                </p>
                <p className="links">
                  <Link to="/faqs" className="text-reset">
                    FAQs
                  </Link>
                </p>
              </div>
            </MDBCol>

            <MDBCol md="3">
              <div className="footer-links">
                <h6 className=" fw-bold mb-4 links-heading">Features</h6>
                <p className="links">Industry leading AI technology</p>
                <p className="links">24/7 Support</p>
                <p className="links">Tailored Hosting Intelligence</p>
                <p className="links">Direct integration</p>
              </div>
            </MDBCol>

            <MDBCol md="3">
              <div className="footer-links">
                <h6 className=" fw-bold mb-4 links-heading">Contact</h6>
                <p className="links">
                  Phone:
                  <Link to="tel:+146-798-7894"> +1 (530) 401-6167</Link>
                </p>
                <p className="links">
                  Email:
                  <Link to="mailto: info@hostbuddyai.com">
                    {" "}
                    info@hostbuddyai.com
                  </Link>
                </p>
                <p className="links">
                  Address:
                  <Link to="/"> Headquartered in San Diego, CA</Link>
                </p>
              </div>
            </MDBCol>
          </MDBRow>
        </div>
        <div className="text-center copyright">
          <p>©2024 by HostBuddy AI.</p>
        </div>
      </Container>
    </MDBFooter>
  );
};

export default Footer;
