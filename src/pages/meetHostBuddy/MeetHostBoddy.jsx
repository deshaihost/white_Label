import React, { useEffect } from "react";
import "./meetHostBuddy.css";
import MeetBanner from "./banner/MeetBanner";
import Setup from "./setup/Setup";
import Discover from "./discover/Discover";
import { Helmet } from "react-helmet";
import Authorized, { ParamsGet } from "../../helper/Authorized";
import { APICore, setAuthorization } from "../../helper/apiCore";

const MeetHostBoddy = () => {
  const api = new APICore();

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
  // const AUTH_SESSIsssON_KEY = "hostBuddy_auth";
  // const localStorageData = JSON.parse(sessionStorage.getItem(AUTH_SESSION_KEY));

  // useEffect(() => {
  //   if (urlData?.id === "wdsxIFuw") {
  //     let body = {
  //       data: "userData",
  //       id: 1,
  //       lastName: "User",
  //       password: "test",
  //       refreshToken: urlData?.item1,
  //       role: "userRole",
  //       token: urlData?.item,
  //     };
  //     api.setLoggedInUser(body);
  //     setAuthorization(body["token"]);
  //     // sessionStorage.setItem(AUTH_SESSION_KEY, JSON.stringify(body));
  //   }
  // }, [urlData]);

  return (
    <div className="meet-buddy">
      <Helmet>
        <title>Meet HostBuddy – Hostbuddy</title>
      </Helmet>
      <div className="meet-buddy-container">
        <MeetBanner urlData={urlData} />
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
