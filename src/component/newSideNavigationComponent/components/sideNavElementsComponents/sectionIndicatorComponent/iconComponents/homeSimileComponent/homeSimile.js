import React from "react";
import icon from "../../navIcons/home-smile.svg";
import "./homeSimile.css";
 const HomeSmileScreenDefault = () => {
    return (
        <div className="home-smile-screen">
            <img className="icon" alt="Icon" src={icon} />
        </div>
    );
};

export default HomeSmileScreenDefault;