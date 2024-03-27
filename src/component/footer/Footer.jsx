import React from 'react';
import { MDBFooter, MDBContainer, MDBRow, MDBCol, MDBIcon } from 'mdb-react-ui-kit';
import FooterLogo from '../../public/img/footer-logo.webp';
import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom';
import './footer.css';

const Footer = () => {
  return (
    <MDBFooter className='text-center text-lg-start text-muted footer'>
      <Container>
        <div className="footer-container">
          <section className=''>
            <MDBContainer className='text-center text-md-start mt-5'>
              <MDBRow className='mt-3'>
                <MDBCol md="4" className='mb-4'>
                  <div className="footer-desc">
                    <Link to='/' className='text-uppercase fw-bold mb-4'>
                      <img src={FooterLogo} alt='footer-logo' />
                    </Link>
                    <p>Our mission is to simplify the hosting experience, making it easier and more enjoyable for hosts while enhancing the guest experience.</p>
                  </div>
                </MDBCol>

                <MDBCol md="2" className='mb-4'>
                  <h6 className='text-uppercase fw-bold mb-4 links-heading'>Quick links</h6>
                  <p className="links">
                    <Link to="/" className='text-reset'>
                      Home
                    </Link>
                  </p>
                  <p className="links">
                    <Link to="/" className='text-reset'>
                      Pricing
                    </Link>
                  </p>
                  <p className="links">
                    <Link to="/" className='text-reset'>
                      Meet HostBuddy
                    </Link>
                  </p>
                  <p className="links">
                    <Link to="/" className='text-reset'>
                      FAQs
                    </Link>
                  </p>
                </MDBCol>

                <MDBCol md="3" className='mb-4'>
                  <h6 className='text-uppercase fw-bold mb-4 links-heading'>Features</h6>
                  <p className="links">Industry leading AI technology</p>
                  <p className="links">24/7 Support</p>
                  <p className="links">Tailored Hosting Intelligence</p>
                  <p className="links">Direct integration</p>
                </MDBCol>

                <MDBCol md="3" className='mb-md-0 mb-4'>
                  <h6 className='text-uppercase fw-bold mb-4 links-heading'>Contact</h6>
                  <p className="links">Phone :
                    <Link to='tel:+146-798-7894'>+146-798-7894</Link>
                  </p>
                  <p className="links">Email :
                    <Link to="mailto: info@hostbuddyai.com">info@hostbuddyai.com</Link>
                  </p>
                  <p className="links">Address :
                    <Link to='/'>81 Boradway street</Link>
                  </p>
                </MDBCol>
              </MDBRow>
            </MDBContainer>
          </section>

          <div className='text-center copyright'>
            <p>©2024 by HostBuddy AI.</p>
          </div>
        </div>
      </Container>
    </MDBFooter>
  )
}

export default Footer
