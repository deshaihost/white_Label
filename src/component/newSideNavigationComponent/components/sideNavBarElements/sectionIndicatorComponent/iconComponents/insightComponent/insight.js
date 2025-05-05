import React from "react";
import icon from "../../navIcons/insightDefault.svg";
import "../dashboardComponent/dashboard.css";

const InsightComponent = () => {
    return (
        <div className="bar-chart-square">
            <img className="icon" alt="Icon" src={icon} />
        </div>
    );
};

export default InsightComponent;