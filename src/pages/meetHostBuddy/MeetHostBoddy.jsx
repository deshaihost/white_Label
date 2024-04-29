import React, { useEffect } from "react";
import "./meetHostBuddy.css";
import MeetBanner from "./banner/MeetBanner";
import Setup from "./setup/Setup";
import Discover from "./discover/Discover";
import { Helmet } from "react-helmet";
import { ParamsGet } from "../../helper/Authorized";

const MeetHostBoddy = () => {
  const chatBoxUrl = ParamsGet();
  const urlData =
    chatBoxUrl !== undefined &&
    typeof chatBoxUrl !==
      "kd6PrMhLpwQrj5C94mscgOtydO8tXjQItEvjr3OUPal03jtMaGvW9PMrwdsxIFuw" &&
    JSON.parse(
      chatBoxUrl !==
        "kd6PrMhLpwQrj5C94mscgOtydO8tXjQItEvjr3OUPal03jtMaGvW9PMrwdsxIFuw" &&
        chatBoxUrl
    );
  const AUTH_SESSION_KEY = "hostBuddy_auth";

  useEffect(() => {
    if (urlData?.property_id === 1612) {
      sessionStorage.setItem(
        AUTH_SESSION_KEY,
        JSON.stringify(urlData?.authData)
      );
    }
  }, [urlData]);
  return (
    <div className="meet-buddy">
      <Helmet>
        <title>Meet HostBuddy – Hostbuddy</title>
      </Helmet>
      <div className="meet-buddy-container">
        <MeetBanner urlData={urlData}/>
        {chatBoxUrl === undefined && (
          <>
            <Setup />
            <Discover />
          </>
        )}
      </div>
    </div>
  );
};

export default MeetHostBoddy;
