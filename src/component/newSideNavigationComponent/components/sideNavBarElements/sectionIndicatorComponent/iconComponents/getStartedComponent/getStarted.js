import React from "react";
import icon from "../../navIcons/getStartedDefault.svg";
import "../../iconComponents/getStartedComponent/getStarted.css";

const GetStarted = () => {
    return (
        <div className="bar-chart-square">
            <img className="icon" alt="Icon" src={icon} />
        </div>
    );
};

export default GetStarted;