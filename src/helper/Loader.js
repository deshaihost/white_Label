import React from "react";
import hostBuddyIcon from "../public/img/hostbuddy_icon_white.png";

const Loader = () => {
  return (
    // <div>
    //   <div className="spinner-border" role="status">
    //     <span className="visually-hidden">Loading...</span>
    //   </div>
    // </div>

    <div
      className="d-flex flex-start align-items-center justify-content-between gap-2"
      style={{ maxWidth: "40px", maxHeight: "40px" }}
    >
      <img src={hostBuddyIcon} alt="" class="userimg" />
      <div class="msgcnt">
        <svg
          class="active"
          width="32"
          height="8"
          viewBox="0 0 32 8"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="4" cy="4" r="4" fill="white" class="svg-elem-1"></circle>
          <circle cx="16" cy="4" r="4" fill="white" class="svg-elem-2"></circle>
          <circle cx="28" cy="4" r="4" fill="white" class="svg-elem-3"></circle>
        </svg>
      </div>
    </div>
  );
};

export default Loader;
