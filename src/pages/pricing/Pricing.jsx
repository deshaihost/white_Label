import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import "./pricing.css";
import Features from "./features/Features";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import BookDemoModal from "../../component/bookDemoModal";
import NewPricingTiles from "./newPricingTiles/newPricingTiles";
import PriceSlider from "./slider/priceSlider";
import ContactUs from "../meetHostBuddy/discover/contactUs/ContactUs";
import SlidingComponent from "./SlidingComponent/SlidingComponent";
import FrequentlyAskedComponent from "./frequestlyAskedComponent/FrequentlyAskedComponent";
import PricingFooter from "./pricingFooter/PricingFooter";
import BackgroundBlurComponent from "./BackgroundBlurComponent";
import Slider from "react-slick";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

import ItemOne from "../../helper/staticImage/homePage/trusted-logo/itme10.webp";
import ItemTwo from "../../helper/staticImage/homePage/trusted-logo/item11.webp";
import ItemThree from "../../helper/staticImage/homePage/trusted-logo/item12.webp";
import ItemFour from "../../helper/staticImage/homePage/trusted-logo/item13.webp";
import ItemFive from "../../helper/staticImage/homePage/trusted-logo/item14.webp";
import ItemSix from "../../helper/staticImage/homePage/trusted-logo/item15.webp";
import ItemSeven from "../../helper/staticImage/homePage/trusted-logo/item16.webp";
import ItemEight from "../../helper/staticImage/homePage/trusted-logo/item17.webp";

const imageTrustedLogo = [
  ItemOne,
  ItemTwo,
  ItemThree,
  ItemFour,
  ItemFive,
  ItemSix,
  ItemSeven,
  ItemEight,
];

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    >
      <FaChevronRight />
    </div>
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    >
      <FaChevronLeft />
    </div>
  );
}

const Pricing = () => {
  const navigate = useNavigate();
  const [demoModalShow, setDemoModalShow] = useState(false);
  const [contactModalShow, setContactModalShow] = useState(false);
  const [billingPeriod, setBillingPeriod] = useState("monthly"); // 'monthly' or 'annual'
  const [propertyCount, setPropertyCount] = useState(0);
  const [inputValue, setInputValue] = useState("0"); // Separate state for input display

  // Pricing tiers structure
  const pricingTiers = [
    {
      min: 1,
      max: 9,
      monthly: { pro: 7, elite: 10, ultimate: 12 },
      yearly: { pro: 5.83, elite: 8.33, ultimate: 10.0 },
    },
    {
      min: 10,
      max: 49,
      monthly: { pro: 6, elite: 8, ultimate: 10 },
      yearly: { pro: 5.0, elite: 6.67, ultimate: 8.33 },
    },
    {
      min: 50,
      max: 99,
      monthly: { pro: 5, elite: 6, ultimate: 8 },
      yearly: { pro: 4.17, elite: 5.0, ultimate: 6.67 },
    },
    {
      min: 100,
      max: 249,
      monthly: { pro: 4, elite: 4.75, ultimate: 6.25 },
      yearly: { pro: 3.33, elite: 3.96, ultimate: 5.21 },
    },
    {
      min: 250,
      max: 499,
      monthly: { pro: 3.5, elite: 4, ultimate: 5 },
      yearly: { pro: 2.92, elite: 3.33, ultimate: 4.17 },
    },
    {
      min: 500,
      max: 999,
      monthly: { pro: 3, elite: 3.5, ultimate: 4.25 },
      yearly: { pro: 2.5, elite: 2.92, ultimate: 3.54 },
    },
    {
      min: 1000,
      max: Infinity,
      monthly: { pro: 2.5, elite: 3, ultimate: 3.5 },
      yearly: { pro: 2.08, elite: 2.5, ultimate: 2.92 },
    },
  ];

  // Helper function to calculate base price without 12x multiplier
  const calculateBasePricePerPeriod = (plan, propertyCount, billingPeriod) => {
    if (propertyCount === 0) return 0;

    let totalPrice = 0;
    let remainingProperties = propertyCount;

    // Convert 'annual' to 'yearly' to match our pricing tiers structure
    const tierKey = billingPeriod === "annual" ? "yearly" : billingPeriod;

    for (const tier of pricingTiers) {
      if (remainingProperties <= 0) break;

      const propertiesInThisTier = Math.min(
        remainingProperties,
        tier.max - tier.min + 1
      );
      const pricePerProperty =
        tier[tierKey] && tier[tierKey][plan] ? tier[tierKey][plan] : 0;

      totalPrice += propertiesInThisTier * pricePerProperty;
      remainingProperties -= propertiesInThisTier;

      if (tier.max === Infinity) break;
    }

    return totalPrice;
  };

  // Calculate total price for a plan based on property count and billing period
  const calculateTotalPrice = (plan, propertyCount, billingPeriod) => {
    const basePrice = calculateBasePricePerPeriod(plan, propertyCount, billingPeriod);
    
    // For yearly/annual billing, multiply by 12 to show annual total cost
    if (billingPeriod === "annual") {
      return basePrice * 12;
    }
    
    return basePrice;
  };

  // Calculate average per-property price for display
  const calculateAveragePerPropertyPrice = (plan, propertyCount, billingPeriod) => {
    if (propertyCount === 0) {
      // Show 0 when count is 0
      return 0;
    }
    
    const basePrice = calculateBasePricePerPeriod(plan, propertyCount, billingPeriod);
    return basePrice / propertyCount;
  };

  // Format price for display
  const formatPrice = (price) => {
    const formattedPrice = price.toFixed(2);
    const [dollars, cents] = formattedPrice.split(".");

    // Add comma formatting for thousands
    const formatWithCommas = (num) => {
      return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    const formattedAmount = cents === "00" 
      ? formatWithCommas(dollars)
      : formatWithCommas(dollars) + "." + cents;

    return {
      dollar: "$",
      amount: formattedAmount,
      period: billingPeriod === "monthly" ? "/month" : "/year",
    };
  };

  var settingsf = {
    dots: false,
    infinite: true, // Ensures that the slider loops back to the beginning
    arrows: true,
    speed: 400, // Slide speed of 0.4 seconds (400ms)
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay: true,
    autoplaySpeed: 6000, // Pause for 6 seconds after all slides are visible
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
    ],
  };

  // When the user navigates to this page, make sure it's scrolled to the top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Sync inputValue with propertyCount when propertyCount changes externally
  useEffect(() => {
    setInputValue(propertyCount.toString());
  }, [propertyCount]);

  // Toggle billing period between monthly and annual
  const handleBillingToggle = (period) => {
    setBillingPeriod(period);
  };

  // Toggle between monthly and annual when clicking anywhere on the toggle container
  const handleToggleClick = () => {
    setBillingPeriod(billingPeriod === "monthly" ? "annual" : "monthly");
  };

  // Handle navigation to signup page
  const handleTryForFree = () => {
    navigate("/signup");
  };

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
          <div
            style={{
              backgroundColor: "#1E1E1E",
              borderRadius: "30px",
              padding: "10px 20px",
              display: "inline-flex",
              alignItems: "center",
            }}
          >
            <span
              style={{
                color: "white",
                fontSize: "14px",
              }}
            >
              {propertyCount === 1 ? 'Property' : 'Properties'}:
            </span>
            <input
              type="text"
              min="0"
              value={inputValue}
              onChange={(e) => {
                const newValue = e.target.value;
                
                // Allow only numbers
                if (!/^\d*$/.test(newValue)) {
                  return;
                }
                
                setInputValue(newValue);
                
                // Update property count
                if (newValue === '' || newValue === '0') {
                  setPropertyCount(0);
                } else {
                  const num = parseInt(newValue, 10);
                  if (!isNaN(num) && num >= 0) {
                    setPropertyCount(num);
                  }
                }
              }}
              onFocus={(e) => {
                // Select all text when focused so typing replaces the value
                e.target.select();
              }}
              onBlur={(e) => {
                // When focus is lost, clean up the display value
                if (inputValue === '' || parseInt(inputValue, 10) === 0) {
                  setInputValue("0");
                  setPropertyCount(0);
                } else {
                  const cleanValue = parseInt(inputValue, 10).toString();
                  setInputValue(cleanValue);
                  setPropertyCount(parseInt(cleanValue, 10));
                }
              }}
              style={{
                color: "white",
                fontWeight: "bold",
                marginLeft: "8px",
                fontSize: "16px",
                backgroundColor: "transparent",
                border: "none",
                outline: "none",
                width: "60px",
                textAlign: "center",
              }}
            />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginLeft: "4px",
              }}
            >
              <button
                onClick={() => {
                  const newValue = propertyCount + 1;
                  setPropertyCount(newValue);
                  setInputValue(newValue.toString());
                }}
                style={{
                  color: "white",
                  backgroundColor: "transparent",
                  border: "1px solid rgba(255, 255, 255, 0.3)",
                  borderRadius: "2px",
                  width: "16px",
                  height: "12px",
                  fontSize: "10px",
                  fontWeight: "bold",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "1px",
                }}
              >
                ▲
              </button>
              <button
                onClick={() => {
                  const newValue = Math.max(0, propertyCount - 1);
                  setPropertyCount(newValue);
                  setInputValue(newValue.toString());
                }}
                style={{
                  color: "white",
                  backgroundColor: "transparent",
                  border: "1px solid rgba(255, 255, 255, 0.3)",
                  borderRadius: "2px",
                  width: "16px",
                  height: "12px",
                  fontSize: "10px",
                  fontWeight: "bold",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                ▼
              </button>
            </div>
          </div>{" "}
          <div className="billing-toggle">
            {/* <span className="months-free">2 Months Free</span> */}
            <div className="toggle-buttons-container">
              <div
                style={{
                  backgroundColor: "#1E1E1E",
                  borderRadius: "30px",
                  padding: "5px",
                  display: "inline-flex",
                  alignItems: "center",
                  cursor: "pointer",
                }}
                onClick={handleToggleClick}
              >
                <div
                  style={{
                    display: "flex",
                    position: "relative",
                    borderRadius: "30px",
                    overflow: "hidden",
                  }}
                >
                  <button
                    style={{
                      padding: "10px 25px",
                      background: billingPeriod === 'monthly' ? "#0D6EFD" : "transparent",
                      color: "white",
                      border: "none",
                      borderRadius: "30px",
                      fontWeight: "500",
                      cursor: "pointer",
                      zIndex: "1",
                      pointerEvents: "none",
                    }}
                  >
                    Monthly
                  </button>
                  <span
                    style={{
                      margin: "0 5px",
                      color: "white",
                      alignSelf: "center",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    →
                  </span>
                  <button
                    style={{
                      padding: "10px 25px",
                      background: billingPeriod === 'annual' ? "#0D6EFD" : "transparent",
                      color: "white",
                      border: "none",
                      borderRadius: "30px",
                      fontWeight: "500",
                      cursor: "pointer",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      pointerEvents: "none",
                    }}
                  >
                    <span>Annual</span>
                    <span
                      style={{
                        fontSize: "12px",
                        color: "#FFA500",
                        fontWeight: "400",
                        fontFamily: "'DM Sans', sans-serif",
                        fontStyle: "italic",
                      }}
                    >
                      2 Months Free!
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>{" "}
        {/* Background blur component positioned at left top - half size */}
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
        </div>{" "}
        <div
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
              <div className="main-price">
                <span className="dollar">
                  {
                    formatPrice(
                      calculateAveragePerPropertyPrice("pro", propertyCount, billingPeriod)
                    ).dollar
                  }
                </span>
                <span className="amount">
                  {
                    formatPrice(
                      calculateAveragePerPropertyPrice("pro", propertyCount, billingPeriod)
                    ).amount
                  }
                </span>
                <span className="period">
                  per property
                </span>
              </div>
              {propertyCount >= 0 && (
                <div className="total-price">
                  {formatPrice(calculateTotalPrice("pro", propertyCount, billingPeriod)).dollar}
                  {formatPrice(calculateTotalPrice("pro", propertyCount, billingPeriod)).amount}
                  {" " + (billingPeriod === "monthly" ? "monthly" : "yearly")}
                </div>
              )}
            </div>

            <button className="try-free-btn" onClick={handleTryForFree}>
              Try For Free
            </button>
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
              <div className="main-price">
                <span className="dollar">
                  {
                    formatPrice(
                      calculateAveragePerPropertyPrice("elite", propertyCount, billingPeriod)
                    ).dollar
                  }
                </span>
                <span className="amount">
                  {
                    formatPrice(
                      calculateAveragePerPropertyPrice("elite", propertyCount, billingPeriod)
                    ).amount
                  }
                </span>
                <span className="period">
                  per property
                </span>
              </div>
              {propertyCount >= 0 && (
                <div className="total-price">
                  {formatPrice(calculateTotalPrice("elite", propertyCount, billingPeriod)).dollar}
                  {formatPrice(calculateTotalPrice("elite", propertyCount, billingPeriod)).amount}
                  {" " + (billingPeriod === "monthly" ? "monthly" : "yearly")}
                </div>
              )}
            </div>

            <button className="try-free-btn" onClick={handleTryForFree}>
              Try For Free
            </button>
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
              <div className="main-price">
                <span className="dollar">
                  {
                    formatPrice(
                      calculateAveragePerPropertyPrice("ultimate", propertyCount, billingPeriod)
                    ).dollar
                  }
                </span>
                <span className="amount">
                  {
                    formatPrice(
                      calculateAveragePerPropertyPrice("ultimate", propertyCount, billingPeriod)
                    ).amount
                  }
                </span>
                <span className="period">
                  per property
                </span>
              </div>
              {propertyCount >= 0 && (
                <div className="total-price">
                  {formatPrice(calculateTotalPrice("ultimate", propertyCount, billingPeriod)).dollar}
                  {formatPrice(calculateTotalPrice("ultimate", propertyCount, billingPeriod)).amount}
                  {" " + (billingPeriod === "monthly" ? "monthly" : "yearly")}
                </div>
              )}
            </div>

            <button className="try-free-btn" onClick={handleTryForFree}>
              Try For Free
            </button>
          </div>
        </div>{" "}
        {/* Old pricing section removed */}
        {/* <PriceSlider /> */}
        <Features />
        {/* <SlidingComponent /> */}
        <FrequentlyAskedComponent />
        <div className="row">
          <div className="col-lg-12" >
            <h2 className="fs-1 fw-bold text-white mb-5 text-center">
              Trusted by Leading Property Managers
            </h2>
          </div>
          <div className="col-lg-12" style={{margin:"10px"}}>
            <div>
              <Slider {...settingsf}>
                {imageTrustedLogo?.map((images) => {
                  return (
                    <div className="outline-0 trusted-logo-box mx-auto">
                      <img
                        src={images}
                        alt="works-img"
                        className="img-fluid w-100 h-100"
                      />
                    </div>
                  );
                })}
              </Slider>
            </div>
          </div>
        </div>
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
