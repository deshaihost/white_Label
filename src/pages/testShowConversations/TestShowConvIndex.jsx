import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import TestShowConversations from "./TestShowConversations";
import Data from "./TestShowConve";

const TestShowConvIndex = ({ titles }) => {
  const [userShow, setUserShow] = useState(0);
  const [messages, setMessages] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isTranslated, setIsTranslated] = useState(false);

  // Filter Data based on titles prop if provided, otherwise use all Data
  const filteredData = titles ? Data.filter((conv) => titles.includes(conv.title)) : Data;
  const dynamicThreshold = filteredData.length - 1;

  useEffect(() => {
    if (filteredData[userShow]) {
      setMessages(filteredData[userShow].messages);
      setTitle(filteredData[userShow].title);
      setDescription(filteredData[userShow].description);
    }
  }, [filteredData, userShow]);

  const handlePrevClick = () => {
    setUserShow((prevUserShow) => (prevUserShow === 0 ? dynamicThreshold : prevUserShow - 1));
  };

  const handleNextClick = () => {
    setUserShow((prevUserShow) => (prevUserShow === dynamicThreshold ? 0 : prevUserShow + 1));
  };

  const handleTranslateClick = () => {
    setIsTranslated((prevIsTranslated) => !prevIsTranslated);
  };

  const hasTranslatedText = messages.some((message) => message.translatedText);

  return (
    <div className="conv-showcase-container">
      <div className="text-white">
        <div className="text-center box-header">
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
        {hasTranslatedText && (
          <div className="translate-button-container">
            <div className="translate-button" onClick={handleTranslateClick}>
              {isTranslated ? "Show original" : "Translate"}
            </div>
          </div>
        )}
        <div className="main-chat-box">
          {filteredData.length > 1 ? (
            <p className="arwow prev Show-Icon" onClick={handlePrevClick}>
              <i className="bi bi-chevron-left"></i>
            </p>
          ) : (
            <div className="arrow-placeholder"></div>
          )}
          <div className="blur-background-top-left blur-background-bottom-right">
            <div className="chat-box">
              {messages?.map((message, index) => {
                const displayText = isTranslated && message.translatedText ? message.translatedText : message.text;
                return <TestShowConversations key={index} message={{ ...message, text: displayText }} />
              })}
            </div>
          </div>
          {filteredData.length > 1 ? (
            <p className="arwow next" onClick={handleNextClick}>
              <i className="bi bi-chevron-right"></i>
            </p>
          ) : (
            <div className="arrow-placeholder"></div>
          )}
        </div>
      </div>
    </div>
  );
};

TestShowConvIndex.propTypes = {
  titles: PropTypes.arrayOf(PropTypes.string),
};

export default TestShowConvIndex;