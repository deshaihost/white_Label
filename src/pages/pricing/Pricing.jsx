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
        <title>HostBuddy AI Pricing - Flexible Plans for Short-Term Rentals</title>
        <meta name="title" content="HostBuddy AI Pricing - Flexible Plans for Short-Term Rentals" />
        <meta name="description" content="Explore HostBuddy AI pricing plans. Start your 2-week free trial today." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.hostbuddy.ai/pricing" />
        <meta property="og:title" content="HostBuddy AI Pricing - Flexible Plans for Short-Term Rentals" />
        <meta property="og:description" content="Explore HostBuddy AI pricing plans. Start your 2-week free trial today." />
        <meta property="og:image" content="https://i.postimg.cc/05KJThn5/host-buddy-metaimg.png" />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://www.hostbuddy.ai/pricing" />
        <meta property="twitter:title" content="HostBuddy AI Pricing - Flexible Plans for Short-Term Rentals" />
        <meta property="twitter:description" content="Explore HostBuddy AI pricing plans. Start your 2-week free trial today." />
        <meta property="twitter:image" content="https://i.postimg.cc/05KJThn5/host-buddy-metaimg.png" />
        <link rel="canonical" href="https://www.hostbuddy.ai/pricing" />
      </Helmet>
      <Container>
        <div className="pricing-heading">
          <h1>Pricing</h1>
        </div>

        <div className="pricing-plans-descriptions-lg">
          <h3>HostBuddy Pro</h3>
          <p><strong>Unlimited access</strong> to HostBuddy's AI messaging and core automation features.</p>
          <ul>
            <li>Automate your guest messaging with state of the art conversational AI, connected to your PMS.</li>
            <li>Leverage additional revenue-driving features: Smart templating, upsells, action items and notifications, review removal support.</li>
            <li>View-only Smart Inbox. View your conversations, review HostBuddy's messages, and see AI-detected action items and sentiment analysis.</li>
          </ul>
          <div style={{ height: '25px' }}></div> {/* Vertical spacer */}
          <h3>HostBuddy Elite</h3>
          <p><strong>Your Complete AI Guest Communication Suite.</strong> Everything in Pro, plus:</p>
          <ul>
            <li><strong>Full Functionality Smart Inbox.</strong> Send messages to your guests, and generate AI responses from your command or from scratch to maximize efficiency.</li>
            <li><strong>AI-Driven Business Intelligence.</strong> Unlock a wealth of new insights into your business with comprehensive analytics. Delve into data on your guest satisfaction rates, message timing, and more.</li>
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
          <div className="col price-plans-column">
            <h3>HostBuddy Pro</h3>
            <div className="pricing-plans-descriptions-md-sm">
              <p><strong>Unlimited access</strong> to HostBuddy's AI messaging and core automation features.</p>
              <ul>
                <li>Automate your guest messaging with state of the art conversational AI, connected to your PMS.</li>
                <li>Leverage additional revenue-driving features: Smart templating, upsells, action items and notifications, review removal support.</li>
                <li>View-only Smart Inbox. View your conversations, review HostBuddy's messages, and see AI-detected action items and sentiment analysis.</li>
              </ul>
            </div>
            <NewPricingTiles num_props_range="1-10" monthlyPricePerProp="7" priceTier={2}/>
            <NewPricingTiles num_props_range="11-50" monthlyPricePerProp="6" priceTier={2}/>
            <NewPricingTiles num_props_range="51-99" monthlyPricePerProp="5" priceTier={2}/>
          </div>
          <div className="col price-plans-column">
            <h3>HostBuddy Elite</h3>
            <div className="pricing-plans-descriptions-md-sm">
              <p><strong>Your Complete AI Guest Communication Suite.</strong> Everything in Pro, plus:</p>
              <ul>
                <li><strong>Fully Capable Smart Inbox.</strong> Send messages to your guests, and generate AI responses from your command or from scratch to maximize efficiency.</li>
                <li><strong>AI-Driven Business Intelligence.</strong> Unlock a wealth of new insights into your business with comprehensive analytics. Delve into data on your guest satisfaction rates, message timing, and more.</li>
              </ul>
            </div>
            <NewPricingTiles num_props_range="1-10" monthlyPricePerProp="10" priceTier={3}/>
            <NewPricingTiles num_props_range="11-50" monthlyPricePerProp="8" priceTier={3}/>
            <NewPricingTiles num_props_range="51-99" monthlyPricePerProp="6" priceTier={3}/>
          </div>
          <h4 style={{marginTop:"20px"}}>100+ properties - <button className="contact-us-button" onClick={() => setContactModalShow(true)}>Contact Us</button></h4>
        </div>

        <Features />
        <div className="started">
          <div className="started-content">
          <h3>Get Started Today!</h3>
            <p>Sign up now to get a 2 week free trial.</p>
            <div style={{ marginBottom: '10px' }}>
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
