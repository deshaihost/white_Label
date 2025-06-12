import React from "react";
import icon from "../../navIcons/chevron-down.svg";
import "./chevDown.css";

const chevDownDefault = () => {
  return (
    <div className="bar-chart-square">
      <img className="icon" alt="Icon" src={icon} />
    </div>
  );
};

export default chevDownDefault;
