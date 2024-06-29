import React, { useState } from 'react';
import {
  MDBFooter,
  MDBRow,
  MDBCol,
} from "mdb-react-ui-kit";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";
import "./footer.css";
import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube } from 'react-icons/fa';
import BookDemoModal from '../bookDemoModal';

// import FooterLogo from "../../public/img/logo_footer.png";
const FooterLogo = 'https://hostbuddylb.com/logo/logo_footer.webp';

const Footer = () => {
  const [demoModalShow, setDemoModalShow] = useState(false);

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
                  Welcome to the Future of Hosting!
                </p>
              </div>
            </MDBCol>

            <MDBCol md="2">
              <div className="footer-links">
                <h6 className=" fw-bold mb-4 links-heading">Quick links</h6>
                <p className="links">
                  <Link to="/" className="text-reset">Home</Link>
                </p>
                <p className="links">
                  <Link to="/meet-hostbuddy" className="text-reset">Meet HostBuddy</Link>
                </p>
                <p className="links">
                  <Link to="/pricing" className="text-reset">Pricing</Link>
                </p>
                <p className="links">
                  <Link to="/faqs" className="text-reset">FAQs</Link>
                </p>
                <p className="links">
                  <Link to="/blog" className="text-reset">Blog</Link>
                </p>
              </div>
            </MDBCol>

            <MDBCol md="3">
              <div className="footer-links">
                <h6 className=" fw-bold mb-4 links-heading">Features</h6>
                <p className="links">Industry leading AI technology</p>
                <p className="links">Robust Customization</p>
                <p className="links">Full Host Control</p>
                <p className="links">Always Stay In The Loop</p>
              </div>
            </MDBCol>

            <MDBCol md="3">
              <div className="footer-links">
                <h6 className=" fw-bold mb-4 links-heading">Contact</h6>
                <p className="links">
                  <a style={{ display: 'inline-block', cursor: 'pointer', marginBottom: '10px' }} className="text-reset" target="_blank" rel="noopener noreferrer" onClick={(e) => {
                      e.preventDefault(); // Don't go to any link - just open the modal
                      setDemoModalShow(true);
                  }}> Book a Demo </a>
                </p>
                <p className="links">
                  Email: info@hostbuddy.ai
                </p>
                <p className="links">
                  Headquartered in San Diego, CA, USA
                </p>
                <div className="social-media-links">
                  <a className="social-link" href="https://www.instagram.com/hostbuddy_ai" target="_blank" rel="noreferrer"><FaInstagram /></a>
                  <a className="social-link" href="https://www.linkedin.com/company/99139157" target="_blank" rel="noreferrer"><FaLinkedin /></a>
                  <a className="social-link" href="https://www.youtube.com/@hostbuddyai" target="_blank" rel="noreferrer"><FaYoutube /></a>
                  <a className="social-link" href="https://www.facebook.com/profile.php?id=61556285228319" target="_blank" rel="noreferrer"><FaFacebook /></a>
                </div>
              </div>
            </MDBCol>
          </MDBRow>
        </div>
        <div className="text-center copyright">
          <p>©2024 by HostBuddy AI.</p>
        </div>
      </Container>
      {demoModalShow && <BookDemoModal show={demoModalShow} onHide={() => setDemoModalShow(false)} />}
    </MDBFooter>
  );
};

export default Footer;
