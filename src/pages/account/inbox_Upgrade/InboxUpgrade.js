import React from "react";
import "./InboxUpgrade.css";
import upgradeBackground from "./assets/upgrade-background.png";
import smartInboxIcon from "./assets/smart-inbox-icon.svg";
import teamCollaborationIcon from "./assets/team-collaboration-icon.svg";
import actionItemsIcon from "./assets/action-items-icon.svg";
import multiPropertyIcon from "./assets/multi-property-icon.svg";
import smartTemplateIcon from "./assets/smart-template-icon.svg";
import integrationsIcon from "./assets/integrations-icon.svg";
import featuresIconsForMessage from "./assets/Features_icons_for_message_upgarde.svg";

const InboxUpgrade = ({ onClose }) => {
  const features = [
    {
      icon: smartInboxIcon,
      bgColor: "#3B450D",
      iconColor: "#DDEB9D",
      starColors: ["#DDEB9D", "#C2DA55", "#DDEB9D"],
    },
    {
      icon: teamCollaborationIcon,
      bgColor: "#593C75",
      iconColor: "#DAB5FF",
      starColors: ["#E2C4FF", "#BF86F7", "#E2C4FF"],
    },
    {
      icon: actionItemsIcon,
      bgColor: "#736339",
      iconColor: "#E4D5B0",
      starColors: ["#F1E3BF", "#BFAD7F", "#F1E3BF"],
    },
    {
      icon: multiPropertyIcon,
      bgColor: "#6C2C3A",
      iconColor: "#F7CFD8",
      starColors: ["#F7CFD8", "#EF849C", "#F7CFD8"],
    },
    {
      icon: smartTemplateIcon,
      bgColor: "#1E5C5C",
      iconColor: "#A6D6D6",
      starColors: ["#A6D6D6", "#3FCCCC", "#A6D6D6"],
    },
    {
      icon: integrationsIcon,
      bgColor: "#5F3841",
      iconColor: "#F7CFD8",
      starColors: ["#D37B8F", "#EEBBC7", "#D37B8F"],
    },
  ];

  return (
    <div className="inbox-upgrade">
      <div
        className="upgrade-header"
        style={{ backgroundImage: `url(${upgradeBackground})` }}
      >
        <h1>Upgrade Your HostBuddy Plan</h1>
        <p>This feature requires a higher plan level to access.</p>
      </div>

      <div className="upgrade-content">
        {" "}
        <div className="features-icons">
          {/* {features.map((feature, index) => (
            <div 
              key={index} 
              className="feature-icon"
              style={{ backgroundColor: feature.bgColor }}
            >
              <img 
                src={feature.icon} 
                alt="Feature icon" 
                style={{ filter: `brightness(0) saturate(100%) invert(94%) sepia(8%) saturate(445%) hue-rotate(19deg) brightness(100%) contrast(94%)` }}
              />
              <div className="star star-1" style={{ backgroundColor: feature.starColors[0] }}></div>
              <div className="star star-2" style={{ backgroundColor: feature.starColors[1] }}></div>
              <div className="star star-3" style={{ backgroundColor: feature.starColors[2] }}></div>
            </div>
          ))} */}
          <img
            src={featuresIconsForMessage}
            alt="Features icons for message upgrade"
            style={{ width: "auto", height: "auto" }}
          />
        </div>
        <p className="upgrade-description">
          Upgrade to unlock more powerful tools that help you save time,
          increase revenue, and deliver better guest experiences.
        </p>
        <p className="promotion-text">Get 2 months free with annual plans!</p>
        <div className="upgrade-buttons">
          <button className="btn-primary">Compare plans</button>
          <button className="btn-secondary" onClick={onClose}>Maybe later</button>
        </div>
      </div>
    </div>
  );
};

export default InboxUpgrade;
