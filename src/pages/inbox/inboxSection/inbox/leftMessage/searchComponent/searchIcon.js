import React from "react";
// import icon from "../../../../../../assets/images/search-md.svg";
import "./searchIcon.css";
import icon from "./search-md.svg"
const SearchMdScreen = () => {
    return (
        <div className="search-md-screen">
            <img className="icon" alt="Icon" src={icon} />
        </div>
    );
};

export default SearchMdScreen;
