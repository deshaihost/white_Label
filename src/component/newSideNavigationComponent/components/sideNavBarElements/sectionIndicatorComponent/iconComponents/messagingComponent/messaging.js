import React from "react";
import icon from "../../navIcons/messageDefault.svg";
import "../dashboardComponent/dashboard.css";

const MessageDefault = () => {
    return (
        <div className="bar-chart-square">
            <img className="icon" alt="Icon" src={icon} />
        </div>
    );
};

export default MessageDefault;