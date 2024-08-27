import React, { useEffect, useState } from "react";
import InBoxHeader from "./inboxHeader/InBoxHeader";
import Inbox from "./inboxSection/inbox/Inbox";
import SmartTemplates from "./inboxSection/smartTemplates/SmartTemplates";
import ReviewRemova from "./inboxSection/reviewRemova/ReviewRemova";
import Preferences from "./inboxSection/preferences/Preferences";
import Upsells from "./inboxSection/upsells/Upsells";
import axios from "axios";
import ToastHandle from "../../helper/ToastMessage";

const InboxIndex = () => {
  const [interFaceComponent, setInterFaceComponent] = useState(0);

  // to remove the schedule showed on the calender
  const getAllConversations = async () => {
    // setSubmit(true);
    const baseUrl = process.env.REACT_APP_API_ENDPOINT;
    const API_KEY = process.env.REACT_APP_API_KEY;

    const getSessionStorageData = JSON.parse(
      sessionStorage.getItem("hostBuddy_auth")
    );

    const token = getSessionStorageData?.token;

    try {
      if (token) {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
            "X-API-Key": API_KEY,
          },
        };
        const response = await axios.get(
          `${baseUrl}/get-conversations-test`,
          config
        );

        if (response.status === 200) {
          ToastHandle(response.data.message, "success");

          //   setTimeout(() => {
          //     setShowCalender(false);
          //   }, 1500);
        } else {
          ToastHandle("Something went wrong", "danger");
        }
      } else {
        ToastHandle("No Token", "danger");
      }
    } catch (error) {
      console.log(error);
      ToastHandle(error?.data?.error, "danger");
    }
    // setSubmit(false);
  };

  useEffect(() => {
    getAllConversations();
  }, []);

  return (
    <div>
      <InBoxHeader showInterFace={(id) => setInterFaceComponent(id)} />
      {interFaceComponent === 0 && <Inbox />}
      {interFaceComponent === 1 && <SmartTemplates />}
      {interFaceComponent === 2 && <ReviewRemova />}
      {interFaceComponent === 3 && <Preferences />}
      {interFaceComponent === 4 && <Upsells />}
    </div>
  );
};

export default InboxIndex;
