import React, { useState } from "react";
import "./features.css";
import CheckImg from "../../../public/img/right_check.png";
import WrongImg from "../icons/princing_grey.svg";
import HelpCircleIcon from "../icons/features_help_circle.svg";

const Features = () => {
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
                }}
              >
                <h3>
                  <br />
                  Pro
                </h3>
              </th>{" "}
              <th
                style={{
                  backgroundColor: "rgba(19, 34, 77, 1)",
                  borderTopLeftRadius: "20px",
                  borderTopRightRadius: "20px",
                  width: "260px",
                }}
              >
                <h3>
                  <br />
                  Elite
                </h3>
              </th>{" "}
              <th
                style={{
                  backgroundColor: "rgba(23, 25, 31, 1)",
                  borderTopLeftRadius: "20px",
                  borderTopRightRadius: "20px",
                  width: "260px",
                }}
              >
                <h3>
                  <br />
                  Ultimate
                </h3>
              </th>
            </tr>
          </thead>{" "}
          <tbody>
            {featurePlans?.map((feature, i) => {
              const isLastRow = i === featurePlans.length - 1;
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
                                top: '-10px',
                                left: '50%',
                                transform: 'translateX(-50%) translateY(-100%)',
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
                                  top: '100%',
                                  left: '50%',
                                  transform: 'translateX(-50%)',
                                  width: 0,
                                  height: 0,
                                  borderLeft: '8px solid transparent',
                                  borderRight: '8px solid transparent',
                                  borderTop: '8px solid #BDC1C9',
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
                      ...(isLastRow && {
                        borderBottomLeftRadius: "20px",
                        borderBottomRightRadius: "20px",
                      }),
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
                      ...(isLastRow && {
                        borderBottomLeftRadius: "20px",
                        borderBottomRightRadius: "20px",
                      }),
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
                      ...(isLastRow && {
                        borderBottomLeftRadius: "20px",
                        borderBottomRightRadius: "20px",
                      }),
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
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Features;
