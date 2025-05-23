import React from "react";

import "./searchInput.css";
import SearchMdScreen from "./searchIcon";
export const TextField = ({ value, onChange, placeholder = "Search", className, style, type, ...rest }) => {
    // Determine if the input has text entered
    const hasValue = value && value.length > 0;
    
    return (
        <div className={`text-field ${className || ''}`} style={style}>
            <div className="input">
                <SearchMdScreen className="search-md" color="#A6A9B2" />
                <input 
                    className={`placeholder ${hasValue ? 'has-value' : ''}`}
                    placeholder={placeholder} 
                    type={type || "text"} 
                    value={value}
                    onChange={onChange}
                    style={{ color: hasValue ? '#ffffff' : '#676A73' }}
                    {...rest}
                />
            </div>
        </div>
    );
};
