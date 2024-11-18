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
