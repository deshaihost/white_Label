import React from "react";
import icon from "../../navIcons/deshBoardDefault.svg";
import "../dashboardComponent/dashboard.css";

const DashBoardDefault = () => {
    return (
        <div className="bar-chart-square">
            <img className="icon" alt="Icon" src={icon} />
        </div>
    );
};

export default DashBoardDefault;