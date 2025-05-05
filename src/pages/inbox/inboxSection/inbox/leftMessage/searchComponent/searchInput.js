import React from "react";

import "./searchInput.css";
import SearchMdScreen from "./searchIcon";
export const TextField = ({ value, onChange, placeholder = "Search" }) => {
    return (
        <div className="text-field">
            <div className="input">
                <SearchMdScreen className="search-md" color="#A6A9B2" />
                <input 
                    className="placeholder" 
                    placeholder={placeholder} 
                    type="text" 
                    value={value}
                    onChange={onChange}
                />
            </div>
        </div>
    );
};
