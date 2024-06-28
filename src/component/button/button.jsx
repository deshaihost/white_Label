import React from "react";
import "./button.css";

const PrimaryButton = ({ onClick, text, additionalClass, disableType, style }) => {
  return (
    <button
      className={`primary-button button-global ${additionalClass}`}
      disabled={disableType ? true : false}
      onClick={onClick}
      style={style}
    >
      {text}
    </button>
  );
};

export default PrimaryButton;

export const OutlineButton = ({ onClick, text, additionalClass }) => {
  return (
    <button
      className={`outline-button button-global ${additionalClass}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};
