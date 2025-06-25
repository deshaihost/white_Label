import React from "react";
import "./SubscriptionFeatures.css";
import CheckImg from "../icons/subscriptionCheck.svg";
import WrongImg from "../icons/subscriptionCrossCheck.svg";

const SubscriptionFeatures = () => {
  const featurePlans = [
    {
      name: "AI-Powered Guest Messaging",
      pro: true,
      elite: true,
      ultimate: true,
    },
    {
      name: "Global Language Support",
      pro: true,
      elite: true,
      ultimate: true,
    },
    {
      name: "PMS Integration",
      pro: true,
      elite: true,
      ultimate: true,
    },
    {
      name: "Smart Inbox",
      pro: "View Only",
      elite: true,
      ultimate: true,
    },
    {
      name: "Conversation History",
      pro: "30 Days Max",
      elite: "60 Days Max",
      ultimate: "Max",
    },
    {
      name: "Users",
      pro: true,
      elite: true,
      ultimate: "Unlimited",
    },
    {
      name: "Website Chat Widget",
      pro: "Max 2 Active",
      elite: "Max 5 Active",
      ultimate: "Unlimited",
    },
    {
      name: "Multiproperty Configuration",
      pro: true,
      elite: true,
      ultimate: true,
    },
    {
      name: "Past Conversation Learning",
      pro: true,
      elite: true,
      ultimate: true,
    },
    {
      name: "Action Item Notifications",
      pro: true,
      elite: true,
      ultimate: true,
    },
    {
      name: "Knowledge Base Customization",
      pro: "3 Days Max",
      elite: "30 Days Max",
      ultimate: "Unlimited",
    },
    {
      name: "Custom Tone & Delay",
      pro: true,
      elite: true,
      ultimate: true,
    },
    {
      name: "Team Collaboration",
      pro: false,
      elite: "Max 3",
      ultimate: "Unlimited",
    },
    {
      name: "Testing Sandbox",
      pro: false,
      elite: "Max 3",
      ultimate: "Unlimited",
    },
    {
      name: "Business Insights",
      pro: true,
      elite: true,
      ultimate: true,
    },
    {
      name: "Third Party Integrations",
      pro: "Limited",
      elite: "Unlimited",
      ultimate: "Unlimited",
    },
    {
      name: "Non-PMS Communication Channels",
      pro: false,
      elite: true,
      ultimate: true,
    },
    {
      name: "Slack Notifications",
      pro: false,
      elite: true,
      ultimate: true,
    },
    {
      name: "Webhooks",
      pro: false,
      elite: false,
      ultimate: true,
    },
    {
      name: "Early Feature Access",
      pro: false,
      elite: false,
      ultimate: true,
    },
  ];
  return (
    <div className="features">
      <div className="heading-box">
        <h2>Compare Features</h2>
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
                    <h5>{feature.name}</h5>
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

export default SubscriptionFeatures;
