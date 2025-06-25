import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import "./pricing.css";
import Features from "./features/Features";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import BookDemoModal from "../../component/bookDemoModal";
import NewPricingTiles from "./newPricingTiles/newPricingTiles";
import PriceSlider from "./slider/priceSlider";
import ContactUs from "../meetHostBuddy/discover/contactUs/ContactUs";
import SlidingComponent from "./SlidingComponent/SlidingComponent";
import FrequentlyAskedComponent from "./frequestlyAskedComponent/FrequentlyAskedComponent";
import PricingFooter from "./pricingFooter/PricingFooter";
import BackgroundBlurComponent from "./BackgroundBlurComponent";

const Pricing = () => {
  const [demoModalShow, setDemoModalShow] = useState(false);
  const [contactModalShow, setContactModalShow] = useState(false);

  // When the user navigates to this page, make sure it's scrolled to the top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className="pricing">
      <Helmet>
        <title>
          HostBuddy AI Pricing - Flexible Plans for Short-Term Rentals
        </title>
        <meta
          name="title"
          content="HostBuddy AI Pricing - Flexible Plans for Short-Term Rentals"
        />
        <meta
          name="description"
          content="Explore HostBuddy AI pricing plans. Start your 2-week free trial today."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.hostbuddy.ai/pricing" />
        <meta
          property="og:title"
          content="HostBuddy AI Pricing - Flexible Plans for Short-Term Rentals"
        />
        <meta
          property="og:description"
          content="Explore HostBuddy AI pricing plans. Start your 2-week free trial today."
        />
        <meta
          property="og:image"
          content="https://i.postimg.cc/05KJThn5/host-buddy-metaimg.png"
        />
        <meta property="twitter:card" content="summary_large_image" />
        <meta
          property="twitter:url"
          content="https://www.hostbuddy.ai/pricing"
        />
        <meta
          property="twitter:title"
          content="HostBuddy AI Pricing - Flexible Plans for Short-Term Rentals"
        />
        <meta
          property="twitter:description"
          content="Explore HostBuddy AI pricing plans. Start your 2-week free trial today."
        />
        <meta
          property="twitter:image"
          content="https://i.postimg.cc/05KJThn5/host-buddy-metaimg.png"
        />
        <link rel="canonical" href="https://www.hostbuddy.ai/pricing" />
      </Helmet>
      <Container>
        {" "}
        <div className="pricing-heading">
          <h1>Pricing</h1>{" "}
          <p className="pricing-description">
            Automate your guest messaging with state of the art conversational
            AI, connected to your&nbsp;PMS.
          </p>
        </div>{" "}
        {/* Number of properties selector */}
        <div className="properties-selector">
          <div className="number-properties">
            <h3>Number of properties:</h3>
            <div className="property-selector">
              <input type="text" defaultValue="1" />
              <span>Property</span>
            </div>
          </div>{" "}
          <div className="billing-toggle">
            <span className="months-free">2 Months Free</span>
            <div className="toggle-buttons-container">
              <span className="months-free-label">2 Months Free</span>
              <div className="toggle-buttons">
                <button className="toggle-button active">Monthly</button>
                <span className="toggle-arrow">→</span>
                <button className="toggle-button">Annual</button>
              </div>
            </div>
          </div>
        </div>{" "}        {/* Background blur component positioned at left top - half size */}
        <div
          style={{
            position: "fixed",
            top: "200px",
            left: "-50px",
            zIndex: -1,
            transform: "scale(0.5)",
            transformOrigin: "left center",
          }}
        >
          <BackgroundBlurComponent />
        </div>          <div
          style={{
            position: "fixed",
            top: "0px",
            right: "0px",
            zIndex: -1,
          }}
        >
          <BackgroundBlurComponent />
        </div>
        
        {/* Background blur component positioned at bottom center */}
        <div
          style={{
            position: "fixed",
            bottom: "100px",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: -1,
          }}
        >
          <BackgroundBlurComponent />
        </div>
        {/* Pricing Cards */}
        <div className="pricing-cards-container">
          {/* Pro Card */}
          <div className="pricing-card pro-card">
            <h2>Pro</h2>
            <p className="card-description">
              Essential AI tools for individual hosts and small operators.
            </p>

            <div className="trial-info">
              <span>2 weeks free, then</span>
            </div>

            <div className="price">
              <span className="dollar">$</span>
              <span className="amount">7</span>
              <span className="period">
                /month
                <br />
                per property
              </span>
            </div>

            <button className="try-free-btn">Try For Free</button>
          </div>

          {/* Elite Card */}
          <div className="pricing-card elite-card">
            <div className="best-value-tag">Best value</div>
            <h2>Elite</h2>
            <p className="card-description">
              Advanced solution for growing property management businesses.
            </p>

            <div className="trial-info">
              <span>2 weeks free, then</span>
            </div>

            <div className="price">
              <span className="dollar">$</span>
              <span className="amount">10</span>
              <span className="period">
                /month
                <br />
                per property
              </span>
            </div>

            <button className="try-free-btn">Try For Free</button>
          </div>

          {/* Ultimate Card */}
          <div className="pricing-card ultimate-card">
            <h2>Ultimate</h2>
            <p className="card-description">
              Enterprise capabilities for large portfolio management companies.
            </p>

            <div className="trial-info">
              <span>2 weeks free, then</span>
            </div>

            <div className="price">
              <span className="dollar">$</span>
              <span className="amount">12</span>
              <span className="period">
                /month
                <br />
                per property
              </span>
            </div>

            <button className="try-free-btn">Try For Free</button>
          </div>
        </div>{" "}
        {/* Old pricing section removed */}
        <PriceSlider />
        <Features />
        <SlidingComponent />
        <FrequentlyAskedComponent />
        <div className="started">
          <div className="started-content">
            {/* <h3>Get Started Today!</h3>
            <p>Sign up now to get a 2 week free trial.</p> */}
            <div style={{ marginBottom: "10px" }}>
              {/* <Link className="explore-link" to="/signup">
                Start Your trial Today
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="13"
                  viewBox="0 0 14 13"
                  fill="none"
                >
                  <path
                    d="M13.0303 7.03033C13.3232 6.73744 13.3232 6.26256 13.0303 5.96967L8.25736 1.1967C7.96447 0.903806 7.48959 0.903806 7.1967 1.1967C6.90381 1.48959 6.90381 1.96447 7.1967 2.25736L11.4393 6.5L7.1967 10.7426C6.90381 11.0355 6.90381 11.5104 7.1967 11.8033C7.48959 12.0962 7.96447 12.0962 8.25736 11.8033L13.0303 7.03033ZM0.5 7.25H12.5V5.75H0.5V7.25Z"
                    fill="#146EF5"
                  ></path>                </svg>
              </Link> */}
            </div>{" "}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                width: "100%",
                overflow: "visible",
                padding: 0,
              }}
            >
              <h2
                style={{
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: 700,
                  fontSize: "44px",
                  color: "rgba(255, 255, 255, 1)",
                  whiteSpace: "nowrap",
                  textAlign: "center",
                  margin: 0,
                  padding: 0,
                }}
              >
                Want to See It in Action?{" "}
                <span style={{ color: "rgba(20, 110, 245, 1)" }}>
                  Try a Free Demo!
                </span>
              </h2>
            </div>{" "}
            <div
              style={{
                width: "100%",
                textAlign: "center",
                margin: "0",
                padding: "0",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <div
                  style={{
                    fontFamily: "DM Sans, sans-serif",
                    fontWeight: 400,
                    fontSize: "20px",
                    color: "rgba(255, 255, 255, 0.8)",
                    margin: "0",
                    padding: "0",
                    whiteSpace: "nowrap",
                  }}
                >
                  We're excited to show you how our software can work for you.
                  Schedule a free demo today
                </div>

                <div
                  style={{
                    fontFamily: "DM Sans, sans-serif",
                    fontWeight: 400,
                    fontSize: "20px",
                    color: "rgba(255, 255, 255, 0.8)",
                    margin: "0",
                    padding: "0",
                    whiteSpace: "nowrap",
                  }}
                >
                  and experience the features firsthand. Let's explore how we
                  can make things better together!
                </div>
              </div>
            </div>{" "}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                width: "100%",
                margin: "20px 0",
              }}
            >
              {" "}
              <a
                style={{
                  cursor: "pointer",
                  fontFamily: "Montserrat, sans-serif",
                  fontWeight: 600,
                  fontSize: "14px",
                  width: "250px",
                  height: "58px",
                  borderRadius: "50px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  textDecoration: "none",
                  backgroundColor: "rgba(20, 110, 245, 1)",
                  color: "white",
                }}
                className="explore-link"
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => {
                  e.preventDefault(); // Don't go to the link - just open the modal
                  setDemoModalShow(true);
                }}
              >
                Book a Demo
                {/* <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="13"
                  viewBox="0 0 14 13"
                  fill="none"
                >
                  <path
                    d="M13.0303 7.03033C13.3232 6.73744 13.3232 6.26256 13.0303 5.96967L8.25736 1.1967C7.96447 0.903806 7.48959 0.903806 7.1967 1.1967C6.90381 1.48959 6.90381 1.96447 7.1967 2.25736L11.4393 6.5L7.1967 10.7426C6.90381 11.0355 6.90381 11.5104 7.1967 11.8033C7.48959 12.0962 7.96447 12.0962 8.25736 11.8033L13.0303 7.03033ZM0.5 7.25H12.5V5.75H0.5V7.25Z"
                    fill="#146EF5"
                  ></path>
                </svg> */}{" "}
              </a>
            </div>
          </div>
        </div>
      </Container>
      <PricingFooter />
      <ContactUs
        show={contactModalShow}
        onHide={() => setContactModalShow(false)}
      />
      <BookDemoModal
        show={demoModalShow}
        onHide={() => setDemoModalShow(false)}
        sourceMsg="pricing page"
      />
    </section>
  );
};

export default Pricing;
