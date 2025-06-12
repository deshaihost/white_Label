import React from "react";
import icon from "../../navIcons/settingsDefault.svg";
import "../settingsComponent/settings.css";

const SettingsDefault = () => {
    return (
        <div className="bar-chart-square">
            <img className="icon" alt="Icon" src={icon} />
        </div>
    );
};

export default SettingsDefault;