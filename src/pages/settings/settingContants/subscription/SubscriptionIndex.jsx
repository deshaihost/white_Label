import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
//import { goToBillingportalPostActions } from "../../../../redux/actions";
import { getSubscriptionStatus } from "../../../../helper/Authorized";
import { Link } from "react-router-dom";
import axios from "axios";
import ToastHandle from "../../../../helper/ToastMessage";
import Loader, { BoxLoader } from "../../../../helper/Loader";
import SubscriptionFeatures from "./features/SubscriptionFeatures";
import ArrowIcon from "./icons/arrow-narrow-right.svg";
import "./subscription.css";

const SubscriptionIndex = () => {
  const store = useSelector((state) => state);
  const dispatch = useDispatch();

  const [goToBillingPortalLoading, setGoToBillingPortalLoading] =
    React.useState(false);
  const [subscriptionNotFound, setSubscriptionNotFound] = useState(false);
  const [billingPeriod, setBillingPeriod] = useState('monthly'); // 'monthly' or 'annual'

  const userData = store?.getUserDataReducer?.getUserData?.data?.user;
  const userSubscriptionData = userData?.subscription;
  //const subscriptionPlanName = userSubscriptionData?.plan;
  const userSubscriptionStatus = getSubscriptionStatus(userData);
  const subscriptionPlanName = userSubscriptionStatus.plan;
  const numPropertiesAllowed = userSubscriptionStatus.props_allowed;
  const [numProperties, setNumProperties] = useState(numPropertiesAllowed || 1);
  const paymentGoodUntil =
    userData?.subscr_payment_good_until ||
    userSubscriptionData?.payment_good_until;
  const nextPaymentDate = paymentGoodUntil
    ? new Date(paymentGoodUntil).toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      })
    : "";



  // Pricing tiers structure (same as Pricing.jsx)
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

  // Helper function to calculate base price without 12x multiplier (same as Pricing.jsx)
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

  // Calculate total price for a plan based on property count and billing period (same as Pricing.jsx)
  const calculateTotalPrice = (plan, propertyCount, billingPeriod) => {
    const basePrice = calculateBasePricePerPeriod(plan, propertyCount, billingPeriod);
    
    // For yearly/annual billing, multiply by 12 to show annual total cost
    if (billingPeriod === "annual") {
      return basePrice * 12;
    }
    
    return basePrice;
  };

  // Calculate average per-property price for display (same as Pricing.jsx)
  const calculateAveragePerPropertyPrice = (plan, propertyCount, billingPeriod) => {
    if (propertyCount === 0) {
      // Show 0 when count is 0
      return 0;
    }
    
    const basePrice = calculateBasePricePerPeriod(plan, propertyCount, billingPeriod);
    return basePrice / propertyCount;
  };

  // Format price for display (same as Pricing.jsx)
  const formatPrice = (price) => {
    const formattedPrice = price.toFixed(2);
    const [dollars, cents] = formattedPrice.split(".");

    return {
      dollar: "$",
      amount: cents === "00" ? dollars : formattedPrice,
      period: billingPeriod === "monthly" ? "/month" : "/year",
    };
  };

  // Helper function to normalize plan names (extract plan type from full plan name)
  const normalizePlanName = (planName) => {
    if (!planName) return '';
    
    if (planName.toLowerCase().includes('pro')) {
      return 'pro';
    } else if (planName.toLowerCase().includes('elite')) {
      return 'elite';
    } else if (planName.toLowerCase().includes('ultimate')) {
      return 'ultimate';
    }
    
    return planName.toLowerCase();
  };

  // Calculate current subscription total price using new logic
  const normalizedPlan = normalizePlanName(subscriptionPlanName);
  const currentTotalPrice = calculateTotalPrice(
    normalizedPlan, 
    numPropertiesAllowed, 
    billingPeriod
  );

  // Calculate current subscription average per-property price
  const currentAveragePrice = calculateAveragePerPropertyPrice(
    normalizedPlan,
    numPropertiesAllowed,
    billingPeriod
  );

  // Call the billing portal API, get the URL from the response, then redirect the user to it securely (in a way that wont make the browser mad)
  const goToBillingPortal = async () => {
    setGoToBillingPortalLoading(true);
    const baseUrl = process.env.REACT_APP_API_ENDPOINT;
    const API_KEY = process.env.REACT_APP_API_KEY;

    try {
      const config = {
        headers: { "X-API-Key": API_KEY },
        validateStatus: function (status) {
          return status >= 200 && status < 500;
        }, // don't throw an error for non-2xx responses
      };

      const response = await axios.post(
        `${baseUrl}/go_to_billing_portal`,
        {},
        config
      );

      if (response.status === 200) {
        setGoToBillingPortalLoading(false);
        window.location.assign(response.data.billing_portal_url);
      } else if (response.status == 403) {
        // 403 means insufficient permission, thrown when a non-admin user tries to access the billing portal
        ToastHandle(response?.data?.error, "danger");
      } else {
        ToastHandle(response?.data?.error, "danger");
        setSubscriptionNotFound(true);
      }
    } catch (error) {
      console.log("error:", error);
      ToastHandle("something went wrong", "danger");
      setSubscriptionNotFound(true);
    } finally {
      setGoToBillingPortalLoading(false);
    }
  };

  const subscriptionClickHandler = (event) => {
    event.preventDefault();

    // Remove local storage data related to subscription, since the user may be going to change it. This will re-update next time user goes to dashboard page.
    localStorage.removeItem("paymentStatus");
    localStorage.removeItem("servicesExpireDate");
    localStorage.removeItem("numPropertiesAllowed");
    localStorage.removeItem("numPropertiesUsed");
    localStorage.removeItem("tooManyPropertiesGraceUntil");

    goToBillingPortal();

    //dispatch(goToBillingportalPostActions());
  };

  // Toggle billing period between monthly and annual
  const handleBillingToggle = (period) => {
    setBillingPeriod(period);
  };

  // Toggle between monthly and annual when clicking anywhere on the toggle container
  const handleToggleClick = () => {
    setBillingPeriod(billingPeriod === 'monthly' ? 'annual' : 'monthly');
  };

  // Handle properties input change
  const handlePropertiesChange = (e) => {
    const value = e.target.value;
    // Only allow positive numbers and 0
    if (value === '' || (Number(value) >= 0 && !isNaN(value))) {
      setNumProperties(value === '' ? 0 : Number(value));
    }
  };
  return (
    <div>
      {/* Subscription information */}
      <div
        style={{
          // border: "1px solid rgba(49, 52, 79, 1)",
          padding: "24px",
        }}
      >
        <h3
          className="mb-4 samsung-sharp-sans-medium samsung-sharp-sans-medium"
          style={{
            fontWeight: "500",
            fontSize: "28px",
          }}
        >
          Subscription
        </h3>
        <div
          style={{
            border: "1px solid rgba(49, 52, 79, 1)",
            borderRadius: "16px",
            padding: "24px",
          }}
        >
          {subscriptionPlanName && subscriptionPlanName !== "" ? (
            <>
              {/* <span
                style={{
                  backgroundColor: "rgba(7, 27, 83, 1)",
                  width: "108px",
                  height: "24px",
                  borderRadius: "100px",
                  paddingLeft: "8px",
                  paddingRight: "8px",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                  fontSize: "14px",
                  fontWeight: "500",
                  marginBottom: "24px",
                }}
              >
                Current plan
              </span> */}
              {/* <p className="fs-14 mb-2">
                Current Subscription: {subscriptionPlanName} (
                {numPropertiesAllowed} properties)
              </p> */}
              <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
              }}>
                <span
                  className="samsung-sharp-sans samsung-sharp-sans"
                  style={{
                    fontWeight: "500",
                    fontSize: "32px",
                  }}
                >
                  {subscriptionPlanName}
                </span>
                
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "40px" ,
                  paddingRight:"64px"
                }}>
                  <div style={{
                    width: "1px",
                    height: "40px",
                    backgroundColor: "#ccc"
                  }}></div>
                  <div style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center"
                  }}>
                    {/* Average per-property price (main display) */}
                    <div style={{
                      display: "flex",
                      alignItems: "baseline",
                      marginBottom: "4px"
                    }}>
                      <span
                        className="samsung-sharp-sans samsung-sharp-sans"
                        style={{
                          fontWeight: "500",
                          fontSize: "24px",
                        }}
                      >
                        {formatPrice(currentAveragePrice).dollar}
                      </span>
                      <span
                        className="samsung-sharp-sans samsung-sharp-sans"
                        style={{
                          fontWeight: "500",
                          fontSize: "32px",
                        }}
                      >
                        {formatPrice(currentAveragePrice).amount}
                      </span>
                      <span
                        className="samsung-sharp-sans samsung-sharp-sans"
                        style={{
                          fontWeight: "400",
                          fontSize: "14px",
                          marginLeft: "4px",
                          color: "#FFFFFF",
                        }}
                      >
                        per property
                      </span>
                    </div>
                    
                    {/* Total price (secondary display) */}
                    {numPropertiesAllowed > 1 && (
                      <div style={{
                        fontSize: "14px",
                        color: "#FFFFFF",
                        textAlign: "center"
                      }}>
                        {formatPrice(currentTotalPrice).dollar}
                        {formatPrice(currentTotalPrice).amount}
                        {" " + (billingPeriod === "monthly" ? "monthly" : "yearly")} 
                      </div>
                    )}
                    
                    <span
                      className="samsung-sharp-sans samsung-sharp-sans"
                      style={{
                        fontWeight: "500",
                        fontSize: "12px",
                        marginTop: "4px"
                      }}
                    >
                     Pricing ({billingPeriod === 'annual' ? 'Yearly' : 'Monthly'})
                    </span>
                  </div>
                  <div style={{
                    width: "1px",
                    height: "40px",
                    backgroundColor: "#ccc"
                  }}></div>
                  <div style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center"
                  }}>
                    <span
                      className="samsung-sharp-sans samsung-sharp-sans"
                      style={{
                        fontWeight: "500",
                        fontSize: "32px",
                      }}
                    >
                      {numPropertiesAllowed}
                    </span>
                    <span
                      className="samsung-sharp-sans samsung-sharp-sans"
                      style={{
                        fontWeight: "500",
                        fontSize: "12px",
                      }}
                    >
                     Total Properties
                    </span>
                  </div>
                </div>
              </div>
              <p className="fs-14 mb-2" >
                Next Payment{" "}
                <span
                  style={{
                    backgroundColor: "rgba(39, 41, 58, 1)",
                    height: "24px",
                    borderRadius: "100px",
                    paddingLeft: "8px",
                    paddingRight: "8px",
                    display: "inline-flex",
                    alignItems: "center",
                    color: "white",
                  }}
                >
                  {nextPaymentDate}
                </span>
              </p>
              {/* <p className="fs-14 mb-2" >
                Total Cost: ${currentTotalPrice} / {billingPeriod === 'monthly' ? 'mo' : 'yr'}
              </p> */}
              {!goToBillingPortalLoading ? (
                <Button
                  className="btn btn-primary px-3 fs-6 rounded-pill mt-2"
                  onClick={subscriptionClickHandler}
                >
                  Manage Subscription
                </Button>
              ) : (
                <BoxLoader />
              )}
              {subscriptionNotFound && (
                <>
                  <p style={{ marginTop: "30px", fontSize: "16px" }}>
                    <span style={{ color: "rgb(190,0,0)" }}>
                      We were unable to find a subscription for your account.
                    </span>{" "}
                    Please note that you must create a subscription (from the
                    Properties page) before accessing your billing portal here.
                  </p>
                  <p style={{ marginTop: "15px", fontSize: "16px" }}>
                    If you believe this is in error, please contact us at
                    info@hostbuddy.ai and we will promptly assist with your
                    subscription. We apologize for any inconvenience.
                  </p>
                </>
              )}
            </>
          ) : (
            <>
              <p className="mb-2">
                You are not yet subscribed. Click "Subscribe" on the{" "}
                <Link to="/properties">Properties page</Link> to start your free
                trial and get HostBuddy connected to your guests!
              </p>
            </>
          )}
        </div>
        {(!subscriptionPlanName || !/elite/i.test(subscriptionPlanName)) && ( // don't show this for elite users
          <p style={{ marginTop: "30px" }}>
            <a href="/pricing" target="_blank" rel="noopener noreferrer">
              View our plans
            </a>{" "}
            and pricing
          </p>
        )}
      </div>
      <div style={{ marginTop: "30px" }}>
        <h2
          className="samsung-sharp-sans-bold samsung-sharp-sans-bold"
          style={{
            fontSize: "28px",
            fontWeight: "700",
            marginLeft: "30px",
            marginBottom: "20px",
          }}
        >
          Compare Plans
        </h2>{" "}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "30px",
          }}
        >
          {/* Properties counter - Now positioned on the left */}
          <div
            style={{
              backgroundColor: "#1E1E1E",
              marginLeft: "30px",
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
              # of {numProperties === 0 || numProperties === 1 ? 'Property' : 'Properties'}:
            </span>
            <input
              type="number"
              value={numProperties}
              onChange={handlePropertiesChange}
              min="0"
              style={{
                color: "white",
                fontWeight: "bold",
                marginLeft: "8px",
                fontSize: "16px",
                backgroundColor: "transparent",
                border: "none",
                outline: "none",
                width: "60px",
                textAlign: "left",
              }}
            />
          </div>
          {/* Monthly/Annual toggle - Now positioned on the right with added margin-right */}
          <div
            style={{
              backgroundColor: "#1E1E1E",
              borderRadius: "30px",
              padding: "5px",
              display: "inline-flex",
              alignItems: "center",
              marginRight: "200px",
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
              {" "}
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
              </button>{" "}
              <img
                src={ArrowIcon}
                alt="Arrow"
                style={{
                  margin: "0 5px",
                  width: "24px",
                  height: "24px",
                  filter: "brightness(0) invert(1)", // Ensure pure white color
                  alignSelf: "center", // Center vertically within flex container
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              />
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
                <span>Annual</span>{" "}
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

      {/* Features component rendered below */}
      <div style={{ marginTop: "50px" }}>
        <SubscriptionFeatures 
          numProperties={numProperties} 
          billingPeriod={billingPeriod}
          currentSubscriptionPlan={subscriptionPlanName}
          calculateTotalPrice={calculateTotalPrice}
          calculateAveragePerPropertyPrice={calculateAveragePerPropertyPrice}
          formatPrice={formatPrice}
          normalizePlanName={normalizePlanName}
        />
      </div>
    </div>
  );
};

export default SubscriptionIndex;
