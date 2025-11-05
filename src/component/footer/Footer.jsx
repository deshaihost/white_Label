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
import { useWhiteLabelBranding } from '../../helper/useWhiteLabelBranding';

// import FooterLogo from "../../public/img/logo_footer.png";
const FooterLogo = 'https://hostbuddylb.com/logo/logo_footer.webp';

const Footer = () => {
  const [demoModalShow, setDemoModalShow] = useState(false);

  // White-label branding
  const { whiteLabelLogos, isHostBuddyDomain } = useWhiteLabelBranding();

  // Get the appropriate logo based on domain
  // CRITICAL: White-label domains must NEVER show default HostBuddy logo
  const getLogoUrl = () => {
    if (isHostBuddyDomain) {
      return FooterLogo;
    }
    // Return null if no white-label logo available - skeleton loader will show instead
    return whiteLabelLogos?.full_logo?.url || whiteLabelLogos?.logo?.url || null;
  };

  const logoUrl = getLogoUrl();

  return (
    <MDBFooter className="text-center text-lg-start text-muted footer">
      <Container>
        <div className="footer-container">
          <MDBRow>
            <MDBCol md="4">
              <div className="footer-desc">
                <Link to="/" className="text-uppercase fw-bold mb-4">
                  {logoUrl ? (
                    <img src={logoUrl} alt="footer-logo" />
                  ) : (
                    <div className="logo-skeleton" style={{
                      width: '150px',
                      height: '50px',
                      backgroundColor: '#e0e0e0',
                      borderRadius: '8px',
                      animation: 'pulse 1.5s ease-in-out infinite'
                    }}></div>
                  )}
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
                  <Link to="/about-us" className="text-reset">About Us</Link>
                </p>
              
                <p className="links">
                  <Link to="/blog" className="text-reset">Blog</Link>
                </p>
              </div>
            </MDBCol>

            <MDBCol md="3">
              <div className="footer-links">
                <h6 className=" fw-bold mb-4 links-heading">Contact</h6>
                <p className="links">
                  <a style={{ display: 'inline-block', cursor: 'pointer', marginBottom: '10px' }} className="text-reset mb-0" target="_blank" rel="noopener noreferrer" onClick={(e) => {
                    e.preventDefault(); // Don't go to any link - just open the modal
                    setDemoModalShow(true);
                  }}> Book a Demo </a>
                </p>
                <Link to="/become-an-affiliate" className="links">
                  Become an Affiliate</Link><br />
                <Link to="/software-solutions" className="links">
                  Software Solutions</Link>
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
      {demoModalShow && <BookDemoModal show={demoModalShow} onHide={() => setDemoModalShow(false)} sourceMsg='footer link'/>}
    </MDBFooter>
  );
};

export default Footer;
