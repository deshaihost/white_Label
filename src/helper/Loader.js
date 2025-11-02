import React from "react";
import "./Loader.css";
const Loader = ({ color = 'default' }) => {
  const style = color !== 'default' ? { borderColor: `${color} transparent transparent transparent` } : {};

  return (
    <div>
      <div className="spinner-border" role="status" style={style}>
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};
export default Loader;

export const BoxLoader = () => {
  return (
    <div className="boxLoader_css">
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export const FullScreenLoader = () => {
  return (
    <div className="loader-container">
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

// Full screen loader with percentage progress
export const ProgressLoader = ({ progress = 0, message = "Loading..." }) => {
  return (
    <div className="loader-container">
      <div className="progress-loader">
        <div className="progress-spinner">
          <svg className="progress-circle" viewBox="0 0 100 100">
            <circle
              className="progress-circle-bg"
              cx="50"
              cy="50"
              r="45"
            />
            <circle
              className="progress-circle-fill"
              cx="50"
              cy="50"
              r="45"
              style={{
                strokeDasharray: `${2 * Math.PI * 45}`,
                strokeDashoffset: `${2 * Math.PI * 45 * (1 - progress / 100)}`
              }}
            />
          </svg>
          <div className="progress-text">
            <span className="progress-percentage">{Math.round(progress)}%</span>
          </div>
        </div>
        <p className="progress-message">{message}</p>
      </div>
    </div>
  );
};

// Used on the inbox, to cover the contents of the inbox tab while loading but make sure the site navbar and inbox navbar are still interactable. Not sure how that is achieved tbh
export const InboxLoader = () => {
  return (
    <div className="inbox-loader-container">
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};
