import React, { useState } from "react";
import "./SubscriptionFeatures.css";
import CheckImg from "../icons/subscriptionCheck.svg";
import WrongImg from "../icons/subscriptionCrossCheck.svg";
import HelpCircleIcon from "../../../../pricing/icons/features_help_circle.svg";

const SubscriptionFeatures = ({ numProperties = 32, billingPeriod = 'monthly', currentSubscriptionPlan = '' }) => {
  const [activeTooltip, setActiveTooltip] = useState(null);

  const handleTooltipClick = (featureName, event) => {
    event.stopPropagation();
    setActiveTooltip(activeTooltip === featureName ? null : featureName);
  };

  const handleClickOutside = () => {
    setActiveTooltip(null);
  };

  const getTooltipContent = (featureName) => {
    const tooltipTexts = {
      "PMS Integration": "Connect HostBuddy directly to your property management system to automatically access property information, reservation details, availability, pricing, and more. HostBuddy can automatically respond to all guest messages directly within your PMS, providing seamless communication without switching platforms.",
      "Smart Inbox": "Track all guest conversations in one place. View-only access shows message history and AI-generated summaries, while full functionality allows you to generate and send messages, and manage conversations directly.",
      "Upsells": "Automatically identify booking opportunities and maximize occupancy with intelligent gap night offers and inquiry follow-ups.",
      "Smart Template": "Create scheduled message templates with dynamic fields that automatically personalize for each guest and property. Your plan limits how many templates you can have active at once.",
      "Website Chat Widget": "Add a customizable AI chat assistant to your vacation rental website that answers guest questions 24/7, provides property information, and helps convert website visitors into bookings.",
      "Multiproperty Configuration": "Create custom groups of properties with their own highly trained AI.",
      "Action Item Notifications": "Automatically identifies guest requests requiring action and sends alerts to your team. Storage limits determine how long these items remain in your system.",
      "Custom Tone & Delay": "Personalize your AI's communication style (casual, professional, friendly) and set automatic response delays to match your brand voice and operational workflow.",
      "Team Collaboration": "Add team members to your account with customizable permissions.",
      "Testing Sandbox": "Preview and test your automated responses in a safe environment before deploying them to actual guest conversations.",
      "Third Party Integrations": "Connect HostBuddy with services like Turno, Tidy, Minut, and other property management tools to create a seamless operational workflow.",
      "Non-PMS Communication Channels": "Expand beyond your PMS to handle guest communications via WhatsApp, SMS, and email - all from a single unified inbox.",
      "Webhooks": "Create custom connections between HostBuddy and your other software tools to trigger automated actions when items need the host's attention."
    };
    return tooltipTexts[featureName] || `Feature information for ${featureName}`;
  };

  // Pricing tiers configuration
  const pricingTiers = {
    monthly: {
      Pro: [
        { min: 1, max: 9, price: 7 },
        { min: 10, max: 49, price: 6 },
        { min: 50, max: 99, price: 5 },
        { min: 100, max: 249, price: 4 },
        { min: 250, max: 499, price: 3.50 },
        { min: 500, max: 999, price: 3 },
        { min: 1000, max: Infinity, price: 2.50 }
      ],
      Elite: [
        { min: 1, max: 9, price: 10 },
        { min: 10, max: 49, price: 8 },
        { min: 50, max: 99, price: 6 },
        { min: 100, max: 249, price: 4.75 },
        { min: 250, max: 499, price: 4 },
        { min: 500, max: 999, price: 3.50 },
        { min: 1000, max: Infinity, price: 3 }
      ],
      Ultimate: [
        { min: 1, max: 9, price: 12 },
        { min: 10, max: 49, price: 10 },
        { min: 50, max: 99, price: 8 },
        { min: 100, max: 249, price: 6.25 },
        { min: 250, max: 499, price: 5 },
        { min: 500, max: 999, price: 4.25 },
        { min: 1000, max: Infinity, price: 3.50 }
      ]
    }
  };

  // Calculate yearly pricing (16.67% discount)
  pricingTiers.yearly = {};
  Object.keys(pricingTiers.monthly).forEach(plan => {
    pricingTiers.yearly[plan] = pricingTiers.monthly[plan].map(tier => ({
      ...tier,
      price: Math.round(tier.price * 0.8333 * 100) / 100 // 16.67% discount, rounded to 2 decimals
    }));
  });

  // Function to calculate total price based on tiered pricing
  const calculateTotalPrice = (numProperties, planName, isYearly = false) => {
    if (!numProperties || !planName || numProperties <= 0) {
      return 0;
    }
    
    const period = isYearly ? 'yearly' : 'monthly';
    const tiers = pricingTiers[period][planName];
    
    if (!tiers) {
      return 0;
    }
    
    let totalPrice = 0;
    let remainingProperties = numProperties;
    
    for (const tier of tiers) {
      if (remainingProperties <= 0) break;
      
      const tierSize = tier.max === Infinity ? remainingProperties : (tier.max - tier.min + 1);
      const propertiesInThisTier = Math.min(remainingProperties, tierSize);
      
      const tierCost = propertiesInThisTier * tier.price;
      totalPrice += tierCost;
      remainingProperties -= propertiesInThisTier;
      
      if (tier.max === Infinity) break;
    }
    
    return Math.round(totalPrice * 100) / 100; // Round to 2 decimal places
  };

  // Calculate prices for each plan
  const isYearly = billingPeriod === 'annual';
  const proPriceTotal = calculateTotalPrice(numProperties, 'Pro', isYearly);
  const elitePriceTotal = calculateTotalPrice(numProperties, 'Elite', isYearly);
  const ultimatePriceTotal = calculateTotalPrice(numProperties, 'Ultimate', isYearly);

  // Calculate per-property price for display
  const proPricePerProperty = numProperties > 0 ? (proPriceTotal / numProperties) : 0;
  const elitePricePerProperty = numProperties > 0 ? (elitePriceTotal / numProperties) : 0;
  const ultimatePricePerProperty = numProperties > 0 ? (ultimatePriceTotal / numProperties) : 0;

  // Helper function to normalize plan names for comparison
  const normalizePlanName = (planName) => {
    if (!planName) return '';
    if (planName.toLowerCase().includes('pro')) return 'Pro';
    if (planName.toLowerCase().includes('elite')) return 'Elite';
    if (planName.toLowerCase().includes('ultimate')) return 'Ultimate';
    return planName;
  };

  // Get normalized current subscription plan
  const normalizedCurrentPlan = normalizePlanName(currentSubscriptionPlan);

  // Button click handlers
  const handleSubscribe = (planName) => {
    // TODO: Implement subscription logic
    console.log(`Subscribe to ${planName} plan`);
  };

  const handleUpgrade = (planName) => {
    // TODO: Implement upgrade logic
    console.log(`Upgrade to ${planName} plan`);
  };

  const handleDowngrade = (planName) => {
    // TODO: Implement downgrade logic
    console.log(`Downgrade to ${planName} plan`);
  };

  // Helper function to get button text and state
  const getButtonProps = (planName) => {
    // Define plan hierarchy: Pro < Elite < Ultimate
    const planHierarchy = { 'Pro': 1, 'Elite': 2, 'Ultimate': 3 };
    const currentPlanLevel = planHierarchy[normalizedCurrentPlan] || 0;
    const targetPlanLevel = planHierarchy[planName] || 0;

    if (normalizedCurrentPlan === planName) {
      return {
        text: 'Subscribed',
        disabled: true,
        variant: 'disabled'
      };
    } else if (normalizedCurrentPlan && normalizedCurrentPlan !== '') {
      if (targetPlanLevel > currentPlanLevel) {
        // Higher plan - show Upgrade
        return {
          text: 'Upgrade',
          disabled: false,
          variant: 'upgrade',
          onClick: () => handleUpgrade(planName)
        };
      } else {
        // Lower plan - show Downgrade
        return {
          text: 'Downgrade',
          disabled: false,
          variant: 'downgrade',
          onClick: () => handleDowngrade(planName)
        };
      }
    } else {
      return {
        text: 'Subscribe',
        disabled: false,
        variant: 'subscribe',
        onClick: () => handleSubscribe(planName)
      };
    }
  };
 const featurePlans = [
    {
      name: "AI-Powered Guest Messaging",
      pro: true,
      elite: true,
      ultimate: true,
      tooltip: "no",
    },
    {
      name: "Global Language Support",
      pro: true,
      elite: true,
      ultimate: true,
      tooltip: "no",
    },
    {
      name: "PMS Integration",
      pro: true,
      elite: true,
      ultimate: true,
      tooltip: "yes",
    },
    {
      name: "Smart Inbox",
      pro: "View Only",
      elite: true,
      ultimate: true,
      tooltip: "yes",
    },
    {
      name: "Conversation History",
      pro: "30 Days Max",
      elite: "60 Days Max",
      ultimate: "Max",
      tooltip: "no",
    },
    {
      name: "Upsells",
      pro: true,
      elite: true,
      ultimate: true,
      tooltip: "yes",
    },
    {
      name: "Smart Template",
      pro: "Max 2",
      elite: "Max 5",
      ultimate: "Unlimited",
      tooltip: "yes",
    },
    {
      name: "Website Chat Widget",
      pro: true,
      elite: true,
      ultimate: true,
      tooltip: "yes",
    },
    {
      name: "Multiproperty Configuration",
      pro: true,
      elite: true,
      ultimate: true,
      tooltip: "yes",
    },
    {
      name: "Past Conversation Learning",
      pro: true,
      elite: true,
      ultimate: true,
      tooltip: "no",
    },
    {
      name: "Action Item Notifications",
      pro: "3 Days Max",
      elite: "30 Days Max",
      ultimate: 'Unlimited',
      tooltip: "yes",
    },
    {
      name: "Knowledge Base Customization",
      pro: true,
      elite: true,
      ultimate: true,
      tooltip: "no",
    },
    {
      name: "Custom Tone & Delay",
      pro: false,
      elite: true,
      ultimate: true,
      tooltip: "yes",
    },
    {
      name: "Team Collaboration",
      pro: false,
      elite: "Max 3",
      ultimate: "Unlimited",
      tooltip: "yes",
    },
    {
      name: "Testing Sandbox",
      pro: true,
      elite: true,
      ultimate: true,
      tooltip: "yes",
    },
    {
      name: "Business Insights",
      pro: "Limited",
      elite: "Unlimited",
      ultimate: "Unlimited",
      tooltip: "no",
    },
    {
      name: "Third Party Integrations",
      pro: false,
      elite: true,
      ultimate: true,
      tooltip: "yes",
    },
    {
      name: "Non-PMS Communication Channels",
      pro: false,
      elite: true,
      ultimate: true,
      tooltip: "yes",
    },
    {
      name: "Slack Notifications",
      pro: false,
      elite: true,
      ultimate: true,
      tooltip: "no",
    },
    {
      name: "Webhooks",
      pro: false,
      elite: true,
      ultimate: true,
      tooltip: "yes",
    },
    {
      name: "Early Feature Access",
      pro: false,
      elite: false,
      ultimate: true,
      tooltip: "no",
    },
  ];
    return (
      <div className="features" onClick={handleClickOutside}>
        <div className="heading-box">
          <h2 style={{ fontFamily: 'DM Sans', fontWeight: 600, fontSize: '40px' }}>Compare Features</h2>
          {/* <p>Find the plan that best suits your needs</p> */}
        </div>{" "}
        <div className="features-list">
          {" "}
          <table style={{ borderSpacing: "10px 0", borderCollapse: "separate" }}>
            <thead>
              <tr>
                <th>
                  <h3 style={{ textAlign: "left" }}></h3>
                </th>{" "}
                <th
                  style={{
                    backgroundColor: "rgba(39, 43, 54, 1)",
                    borderTopLeftRadius: "20px",
                    borderTopRightRadius: "20px",
                    width: "260px",
                    padding: "20px",
                  }}
                >
                  <h3 style={{ marginBottom: "15px" }}>Pro</h3>
                  <div style={{ textAlign: 'center' }}>
                    {/* <div style={{ fontSize: '14px', fontFamily: 'Samsung Sharp Sans', fontWeight: '500', color: '#FFFFFF', marginBottom: '5px' }}>
                      {billingPeriod === 'annual' ? '2 weeks free, then' : '2 weeks free, then'}
                    </div> */}
                    <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', marginBottom: '5px' }}>
                      <span style={{ fontSize: '32px', fontWeight: 'bold', color: 'white' }}>
                        ${proPricePerProperty.toFixed(2)}
                      </span>
                      <span style={{ fontSize: '14px', fontFamily: 'Samsung Sharp Sans', fontWeight: '500', color: '#FFFFFF', marginLeft: '8px' }}>
                        per property
                      </span>
                    </div>
                    <div style={{ fontSize: '14px', fontFamily: 'Samsung Sharp Sans', fontWeight: '500', color: '#FFFFFF' }}>
                      ${proPriceTotal} {billingPeriod === 'annual' ? 'yearly' : 'monthly'}
                    </div>
                  </div>
                </th>{" "}
                <th
                  style={{
                    backgroundColor: "rgba(19, 34, 77, 1)",
                    borderTopLeftRadius: "20px",
                    borderTopRightRadius: "20px",
                    width: "260px",
                    padding: "20px",
                  }}
                >
                  <h3 style={{ marginBottom: "15px" }}>Elite</h3>
                  <div style={{ textAlign: 'center' }}>
                    {/* <div style={{ fontSize: '14px', fontFamily: 'Samsung Sharp Sans', fontWeight: '500', color: '#AAAAAA', marginBottom: '5px' }}>
                      {billingPeriod === 'annual' ? '2 weeks free, then' : '2 weeks free, then'}
                    </div> */}
                    <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', marginBottom: '5px' }}>
                      <span style={{ fontSize: '32px', fontWeight: 'bold', color: 'white' }}>
                        ${elitePricePerProperty.toFixed(2)}
                      </span>
                      <span style={{ fontSize: '14px', fontFamily: 'Samsung Sharp Sans', fontWeight: '500', color: '#FFFFFF', marginLeft: '8px' }}>
                        per property
                      </span>
                    </div>
                    <div style={{ fontSize: '14px', fontFamily: 'Samsung Sharp Sans', fontWeight: '500', color: '#FFFFFF' }}>
                      ${elitePriceTotal} {billingPeriod === 'annual' ? 'yearly' : 'monthly'}
                    </div>
                  </div>
                </th>{" "}
                <th
                  style={{
                    backgroundColor: "rgba(23, 25, 31, 1)",
                    borderTopLeftRadius: "20px",
                    borderTopRightRadius: "20px",
                    width: "260px",
                    padding: "20px",
                  }}
                >
                  <h3 style={{ marginBottom: "15px" }}>Ultimate</h3>
                  <div style={{ textAlign: 'center' }}>
                    {/* <div style={{ fontSize: '14px', fontFamily: 'Samsung Sharp Sans', fontWeight: '500', color: '#AAAAAA', marginBottom: '5px' }}>
                      {billingPeriod === 'annual' ? '2 weeks free, then' : '2 weeks free, then'}
                    </div> */}
                    <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', marginBottom: '5px' }}>
                      <span style={{ fontSize: '32px', fontWeight: 'bold', color: 'white' }}>
                        ${ultimatePricePerProperty.toFixed(2)}
                      </span>
                      <span style={{ fontSize: '14px', fontFamily: 'Samsung Sharp Sans', fontWeight: '500', color: '#FFFFFF', marginLeft: '8px' }}>
                        per property
                      </span>
                    </div>
                    <div style={{ fontSize: '14px', fontFamily: 'Samsung Sharp Sans', fontWeight: '500', color: '#FFFFFF' }}>
                      ${ultimatePriceTotal} {billingPeriod === 'annual' ? 'yearly' : 'monthly'}
                    </div>
                  </div>
                </th>
              </tr>
            </thead>{" "}
            <tbody>
              {featurePlans?.map((feature, i) => {
                return (
                  <tr key={i}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', position: 'relative' }}>
                        <h5 style={{ fontFamily: 'DM Sans', fontWeight: 400, fontSize: '20px', margin: 0 }}>{feature.name}</h5>
                        {feature.tooltip === "yes" && (
                          <div style={{ position: 'relative' }}>
                            <img 
                              src={HelpCircleIcon} 
                              alt="help" 
                              style={{ width: '20px', height: '20px', cursor: 'pointer' }}
                              onClick={(e) => handleTooltipClick(feature.name, e)}
                            />
                            {activeTooltip === feature.name && (
                              <div
                                style={{
                                  position: 'absolute',
                                  top: '50%',
                                  left: '30px',
                                  transform: 'translateY(-50%)',
                                  backgroundColor: '#BDC1C9',
                                  color: '#0F1117',
                                  padding: '12px 16px',
                                  borderRadius: '8px',
                                  fontSize: '14px',
                                  fontFamily: 'DM Sans',
                                  fontWeight: 400,
                                  maxWidth: '300px',
                                  width: 'max-content',
                                  zIndex: 1000,
                                  boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                                  lineHeight: '1.4',
                                }}
                              >
                                {getTooltipContent(feature.name)}
                                <div
                                  style={{
                                    position: 'absolute',
                                    top: '50%',
                                    left: '-8px',
                                    transform: 'translateY(-50%)',
                                    width: 0,
                                    height: 0,
                                    borderTop: '8px solid transparent',
                                    borderBottom: '8px solid transparent',
                                    borderRight: '8px solid #BDC1C9',
                                  }}
                                />
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </td>{" "}
                    <td
                      style={{
                        backgroundColor: "rgba(39, 43, 54, 1)",
                      }}
                    >
                      {typeof feature.pro === "boolean" ? (
                        <img
                          src={feature.pro ? CheckImg : WrongImg}
                          alt="check-img"
                        />                    ) : (
                        <p className="pricing-feature-text">{feature.pro}</p>
                      )}{" "}
                    </td>
                    <td
                      style={{
                        backgroundColor: "rgba(19, 34, 77, 1)",
                      }}
                    >
                      {typeof feature.elite === "boolean" ? (
                        <img
                          src={feature.elite ? CheckImg : WrongImg}
                          alt="check-img"
                        />                    ) : (
                        <p className="pricing-feature-text">
                          {feature.elite}
                        </p>
                      )}{" "}
                    </td>
                    <td
                      style={{
                        backgroundColor: "rgba(23, 25, 31, 1)",
                      }}
                    >
                      {typeof feature.ultimate === "boolean" ? (
                        <img
                          src={feature.ultimate ? CheckImg : WrongImg}
                          alt="check-img"
                        />                    ) : (
                        <p className="pricing-feature-text">
                          {feature.ultimate}
                        </p>
                      )}
                    </td>
                  </tr>
                );
              })}
              {/* Pricing Row at the bottom */}
              <tr>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', position: 'relative' }}>
                    {/* <h5 style={{ fontFamily: 'DM Sans', fontWeight: 600, fontSize: '20px', margin: 0 }}>Pricing</h5> */}
                  </div>
                </td>
                <td
                  style={{
                    backgroundColor: "rgba(39, 43, 54, 1)",
                    padding: "20px",
                  }}
                >
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', marginBottom: '5px' }}>
                      <span style={{ fontSize: '32px', fontWeight: 'bold', color: 'white' }}>
                        ${proPricePerProperty.toFixed(2)}
                      </span>
                      <span style={{ fontSize: '14px', fontFamily: 'Samsung Sharp Sans', fontWeight: '500', color: '#FFFFFF', marginLeft: '8px' }}>
                        per property
                      </span>
                    </div>
                    <div style={{ fontSize: '14px', fontFamily: 'Samsung Sharp Sans', fontWeight: '500', color: '#FFFFFF' }}>
                      ${proPriceTotal} {billingPeriod === 'annual' ? 'yearly' : 'monthly'}
                    </div>
                  </div>
                </td>
                <td
                  style={{
                    backgroundColor: "rgba(19, 34, 77, 1)",
                    padding: "20px",
                  }}
                >
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', marginBottom: '5px' }}>
                      <span style={{ fontSize: '32px', fontWeight: 'bold', color: 'white' }}>
                        ${elitePricePerProperty.toFixed(2)}
                      </span>
                      <span style={{ fontSize: '14px', fontFamily: 'Samsung Sharp Sans', fontWeight: '500', color: '#FFFFFF', marginLeft: '8px' }}>
                        per property
                      </span>
                    </div>
                    <div style={{ fontSize: '14px', fontFamily: 'Samsung Sharp Sans', fontWeight: '500', color: '#FFFFFF' }}>
                      ${elitePriceTotal} {billingPeriod === 'annual' ? 'yearly' : 'monthly'}
                    </div>
                  </div>
                </td>
                <td
                  style={{
                    backgroundColor: "rgba(23, 25, 31, 1)",
                    padding: "20px",
                  }}
                >
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', marginBottom: '5px' }}>
                      <span style={{ fontSize: '32px', fontWeight: 'bold', color: 'white' }}>
                        ${ultimatePricePerProperty.toFixed(2)}
                      </span>
                      <span style={{ fontSize: '14px', fontFamily: 'Samsung Sharp Sans', fontWeight: '500', color: '#FFFFFF', marginLeft: '8px' }}>
                        per property
                      </span>
                    </div>
                    <div style={{ fontSize: '14px', fontFamily: 'Samsung Sharp Sans', fontWeight: '500', color: '#FFFFFF' }}>
                      ${ultimatePriceTotal} {billingPeriod === 'annual' ? 'yearly' : 'monthly'}
                    </div>
                  </div>
                </td>
              </tr>
              {/* Button Row */}
              <tr>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', position: 'relative' }}>
                    {/* <h5 style={{ fontFamily: 'DM Sans', fontWeight: 600, fontSize: '20px', margin: 0 }}>Choose Plan</h5> */}
                  </div>
                </td>
                <td
                  style={{
                    backgroundColor: "rgba(39, 43, 54, 1)",
                    borderBottomLeftRadius: "20px",
                    borderBottomRightRadius: "20px",
                    padding: "20px",
                  }}
                >
                  <div style={{ textAlign: 'center' }}>
                    {(() => {
                      const buttonProps = getButtonProps('Pro');
                      return (
                        <button
                          onClick={buttonProps.onClick}
                          disabled={buttonProps.disabled}
                          className="subscription-button"
                          style={{
                            padding: '8px 12px',
                            borderRadius: '100px',
                            border: 'none',
                            fontSize: '16px',
                            fontWeight: '600',
                            cursor: buttonProps.disabled ? 'not-allowed' : 'pointer',
                            backgroundColor: buttonProps.disabled ? '#131723' : (
                              buttonProps.variant === 'upgrade' ? '#0D6EFD' : 
                              buttonProps.variant === 'downgrade' ? '#DC3545' : 
                              '#28a745'
                            ),
                            color: 'white',
                            opacity: buttonProps.disabled ? 0.6 : 1,
                            transition: 'all 0.2s ease',
                            width: 'auto',
                            minWidth: '89px',
                            height: '32px',
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          {buttonProps.text}
                        </button>
                      );
                    })()}
                  </div>
                </td>
                <td
                  style={{
                    backgroundColor: "rgba(19, 34, 77, 1)",
                    borderBottomLeftRadius: "20px",
                    borderBottomRightRadius: "20px",
                    padding: "20px",
                  }}
                >
                  <div style={{ textAlign: 'center' }}>
                    {(() => {
                      const buttonProps = getButtonProps('Elite');
                      return (
                        <button
                          onClick={buttonProps.onClick}
                          disabled={buttonProps.disabled}
                          className="subscription-button"
                          style={{
                            padding: '8px 12px',
                            borderRadius: '100px',
                            border: 'none',
                            fontSize: '16px',
                            fontWeight: '600',
                            cursor: buttonProps.disabled ? 'not-allowed' : 'pointer',
                            backgroundColor: buttonProps.disabled ? '#131723' : (
                              buttonProps.variant === 'upgrade' ? '#0D6EFD' : 
                              buttonProps.variant === 'downgrade' ? '#DC3545' : 
                              '#28a745'
                            ),
                            color: 'white',
                            opacity: buttonProps.disabled ? 0.6 : 1,
                            transition: 'all 0.2s ease',
                            width: 'auto',
                            minWidth: '89px',
                            height: '32px',
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          {buttonProps.text}
                        </button>
                      );
                    })()}
                  </div>
                </td>
                <td
                  style={{
                    backgroundColor: "rgba(23, 25, 31, 1)",
                    borderBottomLeftRadius: "20px",
                    borderBottomRightRadius: "20px",
                    padding: "20px",
                  }}
                >
                  <div style={{ textAlign: 'center' }}>
                    {(() => {
                      const buttonProps = getButtonProps('Ultimate');
                      return (
                        <button
                          onClick={buttonProps.onClick}
                          disabled={buttonProps.disabled}
                          className="subscription-button"
                          style={{
                            padding: '8px 12px',
                            borderRadius: '100px',
                            border: 'none',
                            fontSize: '16px',
                            fontWeight: '600',
                            cursor: buttonProps.disabled ? 'not-allowed' : 'pointer',
                            backgroundColor: buttonProps.disabled ? '#131723' : (
                              buttonProps.variant === 'upgrade' ? '#0D6EFD' : 
                              buttonProps.variant === 'downgrade' ? '#DC3545' : 
                              '#28a745'
                            ),
                            color: 'white',
                            opacity: buttonProps.disabled ? 0.6 : 1,
                            transition: 'all 0.2s ease',
                            width: 'auto',
                            minWidth: '89px',
                            height: '32px',
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          {buttonProps.text}
                        </button>
                      );
                    })()}
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
};

export default SubscriptionFeatures;
