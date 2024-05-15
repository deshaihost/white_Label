import React from "react";
import "./Loader.css";
const Loader = () => {
  return (
    <div>
      <div className="spinner-border" role="status">
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
    <div class="loader-container">
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};
