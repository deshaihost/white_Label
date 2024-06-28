import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import './pricing.css';
import Features from './features/Features';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import BookDemoModal from '../../component/bookDemoModal';
import NewPricingTiles from './newPricingTiles/newPricingTiles';
import ContactUs from '../meetHostBuddy/discover/contactUs/ContactUs';

const Pricing = () => {
  const [demoModalShow, setDemoModalShow] = useState(false);
  const [contactModalShow, setContactModalShow] = useState(false);

  // When the user navigates to this page, make sure it's scrolled to the top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className='pricing'>
      <Helmet>
        <title>Pricing – HostBuddy AI</title>
        <link rel="canonical" href="https://www.hostbuddy.ai/pricing" />
      </Helmet>
      <Container>
        <div className="pricing-heading">
          <h1>Pricing</h1>
        </div>

        <div className="pricing-plans-descriptions-lg">
          <h3>The Essentials</h3>
          <ul>
            <li>State of the art AI, tailored to your properties.</li>
            <li>Make HostBuddy available to your guests 24/7 by sharing a property-specific URL, where they can access their HostBuddy chat window.</li>
            <li>PMS integration and messaging not supported.</li>
          </ul>
          <div style={{ height: '25px' }}></div> {/* Vertical spacer */}
          <h3>The Works</h3>
          <ul>
            <li>Everything in The Essentials, plus:</li>
            <li><strong>Connect a PMS account</strong> to give HostBuddy access to property details and real-time guest information, and to let HostBuddy see and respond to guest messages over your existing communication channels.</li>
            <li>Schedule the times of day/week for HostBuddy to automatically respond to guests, up to a maximum of 12 hours per day.</li>
          </ul>
          <div style={{ height: '25px' }}></div> {/* Vertical spacer */}
          <h3>The Works Unlimited</h3>
          <ul>
            <li>Everything in The Works, with <strong>no daily limit</strong> on the number of hours HostBuddy can automatically respond to guests.</li>
          </ul>
        </div>

        <div className="row all-pricing-information">
          <div className="col d-flex flex-column justify-content-center align-items-start property-labels">
            <div style={{ height: '100px' }}></div> {/* Vertical spacer, to account for the  */}
            <div className="left-side-text d-flex align-items-center">
              <h5><strong>1-10</strong> Properties</h5>
            </div>
            <div className="left-side-text d-flex align-items-center">
              <h5><strong>11-50</strong> Properties</h5>
            </div>
            <div className="left-side-text d-flex align-items-center">
              <h5><strong>51-99</strong> Properties</h5>
            </div>
          </div>
          <div className="col price-plans-column" style={{marginTop:"0"}}>
            <h3>The Essentials</h3>
            <div className="pricing-plans-descriptions-md-sm">
              <ul>
                <li>State of the art AI, tailored to your properties.</li>
                <li>Make HostBuddy available to your guests 24/7 by sharing a property-specific URL, where they can access their HostBuddy chat window.</li>
                <li>PMS integration and messaging not supported.</li>
              </ul>
            </div>
            <NewPricingTiles num_props_range="1-10" monthlyPricePerProp="2" cents="50" priceTier={1}/>
            <NewPricingTiles num_props_range="11-50" monthlyPricePerProp="2" priceTier={1}/>
            <NewPricingTiles num_props_range="51-99" monthlyPricePerProp="1" cents="50" priceTier={1}/>
          </div>
          <div className="col price-plans-column">
            <h3>The Works</h3>
            <div className="pricing-plans-descriptions-md-sm">
              <ul>
                <li>Everything in The Essentials, plus:</li>
                <li><strong>Connect a PMS account</strong> to give HostBuddy access to property details and real-time guest information, and to let HostBuddy see and respond to guest messages over your existing communication channels.</li>
                <li>Schedule the times of day/week for HostBuddy to automatically respond to guests, up to a maximum of 12 hours per day.</li>
              </ul>
            </div>
            <NewPricingTiles num_props_range="1-10" monthlyPricePerProp="5" priceTier={2}/>
            <NewPricingTiles num_props_range="11-50" monthlyPricePerProp="4" priceTier={2}/>
            <NewPricingTiles num_props_range="51-99" monthlyPricePerProp="3" cents="50" priceTier={2}/>
          </div>
          <div className="col price-plans-column">
            <h3>The Works Unlimited</h3>
            <div className="pricing-plans-descriptions-md-sm">
              <ul>
                <li>Everything in The Works, with <strong>no daily limit</strong> on the number of hours HostBuddy can automatically respond to guests.</li>
              </ul>
            </div>
            <NewPricingTiles num_props_range="1-10" monthlyPricePerProp="7" priceTier={3}/>
            <NewPricingTiles num_props_range="11-50" monthlyPricePerProp="6" priceTier={3}/>
            <NewPricingTiles num_props_range="51-99" monthlyPricePerProp="5" priceTier={3}/>
          </div>
          <h4 style={{marginTop:"20px"}}>100+ properties - <button className="contact-us-button" onClick={() => setContactModalShow(true)}>Contact Us</button></h4>
        </div>

        <Features />
        <div className="started">
          <div className="started-content">
            <h2>Get Started today!</h2>
            <p>Sign up today to get a 2 week free trial.</p>
            <div style={{ marginBottom: '15px' }}>
              <Link className='explore-link' to="/signup">Start Your trial Today 
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="13" viewBox="0 0 14 13" fill="none">
                    <path d="M13.0303 7.03033C13.3232 6.73744 13.3232 6.26256 13.0303 5.96967L8.25736 1.1967C7.96447 0.903806 7.48959 0.903806 7.1967 1.1967C6.90381 1.48959 6.90381 1.96447 7.1967 2.25736L11.4393 6.5L7.1967 10.7426C6.90381 11.0355 6.90381 11.5104 7.1967 11.8033C7.48959 12.0962 7.96447 12.0962 8.25736 11.8033L13.0303 7.03033ZM0.5 7.25H12.5V5.75H0.5V7.25Z" fill="#146EF5"></path>
                </svg>
              </Link>
            </div>
            <div>
              <a style={{ cursor:"pointer" }}className='explore-link' target="_blank" rel="noopener noreferrer" onClick={(e) => {
                  e.preventDefault(); // Don't go to the link - just open the modal
                  setDemoModalShow(true);
              }}>
                Book a Demo
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="13" viewBox="0 0 14 13" fill="none">
                    <path d="M13.0303 7.03033C13.3232 6.73744 13.3232 6.26256 13.0303 5.96967L8.25736 1.1967C7.96447 0.903806 7.48959 0.903806 7.1967 1.1967C6.90381 1.48959 6.90381 1.96447 7.1967 2.25736L11.4393 6.5L7.1967 10.7426C6.90381 11.0355 6.90381 11.5104 7.1967 11.8033C7.48959 12.0962 7.96447 12.0962 8.25736 11.8033L13.0303 7.03033ZM0.5 7.25H12.5V5.75H0.5V7.25Z" fill="#146EF5"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </Container>
      <ContactUs show={contactModalShow} onHide={() => setContactModalShow(false)} />
      <BookDemoModal show={demoModalShow} onHide={() => setDemoModalShow(false)} />
    </section>
  )
}

export default Pricing
