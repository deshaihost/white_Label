import React, { useEffect } from "react";
import "./meetHostBuddy.css";
import MeetBanner from "./banner/MeetBanner";
import Setup from "./setup/Setup";
import Discover from "./discover/Discover";
import { Helmet } from "react-helmet";
import Authorized, { ParamsGet } from "../../helper/Authorized";
import { APICore, setAuthorization } from "../../helper/apiCore";
import { useLocation } from 'react-router-dom';

const MeetHostBoddy = () => {
  const api = new APICore();

  /* Mboddie: This is the proper way to get data from the URL.
  The data is expected to be passed in the URL as query parameters. So in addition to below changes, I changed the file "ListIntegrationProperties.jsx" to create the URL as:
  "/meet-hostbuddy?key=<chatbot_key>&name=<property_name>&user=<user>"
  TODO (Expinator team) - please create a new path in the application for the property chat window, since it should not use the same path as Meet Hostbuddy and
  should not have "Meet-Hostbuddy" in the URL (use a path like "/property-chat"). You can copy over most of this logic. */
  function useQuery() { return new URLSearchParams(useLocation().search); }
  let query = useQuery();

  const chatbot_key = query.get("key");
  const property_name = query.get("name");
  const user_type = query.get("user");

  let urlData;
  if (chatbot_key !== null && property_name !== null && user_type !== null) {
    urlData = { chatbot_key, property_name, user_type }; }

  /* Old code. TODO: Delete
  const chatBoxUrl = ParamsGet();
  const urlData =
    chatBoxUrl !== undefined &&
    typeof chatBoxUrl !==
      "kd6PrMhLpwQrj5C94mscgOtydO8tXjQItEvjr3OUPal03jtMaGvW9PMrwdsxIFuw" &&
    JSON.parse(
      chatBoxUrl !==
        "kd6PrMhLpwQrj5C94mscgOtydO8tXjQItEvjr3OUPal03jtMaGvW9PMrwdsxIFuw" &&
        chatBoxUrl
    ); */
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
        <title>Meet HostBuddy – HostBuddy</title>
      </Helmet>
      <div className="meet-buddy-container">
        <MeetBanner urlData={urlData} />
        {urlData === undefined && (
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
