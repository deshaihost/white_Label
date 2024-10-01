import React, { useEffect, useState } from "react";
import TestShowConversations from "./TestShowConversations";
import Data from "./TestShowConve";

const TestShowConvIndex = () => {
  const [userShow, setUserShow] = useState(0);
  const [messages, setMessages] = useState([]);
  const dynamicThreshold = Data ? Data.length - 1 : 0;

  useEffect(() => {
    setMessages(Data[userShow]?.messages);
  }, [Data, userShow]);
  return (
    <div className="container">
      <div className="text-white">
        <div className="text-center box-header">
          <h2>Issue Troubleshooting</h2>
          <p>
            Hostbuddy can intelligently troubleshoot issues on your behalf based
            on the property information you provide it.
          </p>
        </div>
        <div className="main-chat-box">
          <div>
            <p
              className={`arwow prev ${userShow !== 0 && "Show-Icon"}`}
              onClick={() => {
                setUserShow((prevUserShow) => prevUserShow - 1);
              }}
            >
              <i class="bi bi-chevron-left"></i>
            </p>
          </div>
          <div className="chat-box">
            {messages?.map((message, index) => {
              return <TestShowConversations key={index} message={message} />;
            })}
          </div>
          <div>
            {console.log(userShow !== dynamicThreshold,'userShow !== dynamicThreshold')}
            <p
              className={`arwow next ${
                userShow !== dynamicThreshold===false && "Show-Icon111"
              }`}
              onClick={() => {
                setUserShow((prevUserShow) => prevUserShow + 1);
              }}
            >
              <i class="bi bi-chevron-right"></i>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestShowConvIndex;
