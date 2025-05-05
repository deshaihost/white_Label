import PropTypes from "prop-types";
import React from "react";
import { useReducer } from "react";
import "./textField.css";
import SearchMdScreen from "../textFiledIcons/textIconsComponents/textIcon";


const TextField = ({
    showLeadingIcon = true,
    showAssistiveText = false,
    assistiveText = "Assistive text",
    showTrailingIcon = false,
    label = "Label",
    input = "Placeholder",
    isRequired = false,
    showLabel = true,
    stateProp,
    isCompact,
    inputType = "text",
}) => {
    const [state, dispatch] = useReducer(reducer, {
        state: stateProp || "focus",

        isCompact: isCompact || false,
    });

    return (
        <div
            className="text-field"
            onClick={() => {
                dispatch("click");
            }}
        >
            {showLabel && (
                <div className="label">
                    <div className="text-wrapper">{label}</div>
                </div>
            )}

            <div className={`input ${state.state}`}>
                {showLeadingIcon && <SearchMdScreen className="search-md" />}

                <div className="div">
                    {state.state === "focus" && <div className="caret" />}

                    <input className="placeholder" placeholder={input} type={inputType} />
                </div>
            </div>
        </div>
    );
};

function reducer(state, action) {
    switch (action) {
        case "click":
            return {
                ...state,
                state: "focus",
            };
    }

    return state;
}

TextField.propTypes = {
    showLeadingIcon: PropTypes.bool,
    showAssistiveText: PropTypes.bool,
    assistiveText: PropTypes.string,
    showTrailingIcon: PropTypes.bool,
    label: PropTypes.string,
    input: PropTypes.string,
    isRequired: PropTypes.bool,
    showLabel: PropTypes.bool,
    stateProp: PropTypes.oneOf(["hover", "focus"]),
    isCompact: PropTypes.bool,
    inputType: PropTypes.string,
};


export default TextField;