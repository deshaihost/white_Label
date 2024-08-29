import React, { useState } from "react";
import GetConversationsTest from "../../../../helper/getConversationsTest/getConversationsTest";
import LeftMessage from "./leftMessage/LeftMessage";
import MildeSection from "./mildeSection/MildeSection";
import RightSection from "./rightSection/RightSection";
import "./inboxIndex.css"

const Inbox = () => {
  const GetConversationsData = GetConversationsTest();
  const [userMessage, setUserMessage] = useState({});
  return (
    <div className="row text-white">
      <div className="col-lg-3 left-bar">
        <LeftMessage messageList={GetConversationsData} getUserMessage={(data) => setUserMessage(data)}/>
      </div>
      <div className="col-lg-6">
        <MildeSection allConversationData={userMessage} />
      </div>
      <div className="col-lg-3">
        <RightSection />
      </div>
    </div>
  );
};

export default Inbox;
