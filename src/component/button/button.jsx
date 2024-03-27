import React from 'react';
import './button.css';

const PrimaryButton = ({ onClick, text, additionalClass }) => {
    return (
        <button className={`primary-button button-global ${additionalClass}`} onClick={onClick}>
            {text}
        </button>
    );
};

export default PrimaryButton;

export const OutlineButton = ({ onClick, text, additionalClass }) => {
    return (
        <button className={`outline-button button-global ${additionalClass}`} onClick={onClick}>
            {text}
        </button>
    );
};
