import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import "./meetBanner.css";
import Message from "./messages/Messages";
import { Container } from "react-bootstrap";
import loaderGif from "../../../public/img/new_loader.gif";
import ToastHandle from "../../../helper/ToastMessage";

const MeetBanner = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [summary, setSummary] = useState("");
  const [promptPath, setPromptPath] = useState("");
  const [chatHistory, setChatHistory] = useState("");
  const [messages, setMessages] = useState([]);
  const [initialized, setInitialized] = useState(false);
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isUsingGemini, setIsUsingGemini] = useState(false);
  const messageListRef = useRef(null);

  const baseUrl = process.env.REACT_APP_API_ENDPOINT;
  const API_KEY = process.env.REACT_APP_API_KEY;
  const config = {
    headers: { "X-API-Key": API_KEY },
    validateStatus: (status) => status >= 200 && status < 500,
  };

  // Call initialize_journey
  const handleInitialize = async () => {
    setLoading(true);
    try {
      const dataToSend = {
        email_addr: userEmail,
        start_date: startDate || null,
        end_date: endDate || null,
      };
      const response = await axios.post(`${baseUrl}/initialize_journey`, dataToSend, config);
      if (response.status === 200) {
        setSummary(response.data.summary);
        setPromptPath(response.data.interaction_prompt_path);
        setInitialized(true);
        setIsUsingGemini(response.data?.model?.toLowerCase().includes('gemini'));
      } else {
        ToastHandle(response?.data?.error, 'danger');
      }
    } catch (err) {
      ToastHandle('Internal Server Error', 'danger');
    } finally {
      setLoading(false);
    }
  };

  // Send a chat message
  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;
    const userLine = `user: ${inputValue}\n`;
    const newMessages = [
      ...messages,
      { text: inputValue, sender: "user" },
      { text: { response: "" }, sender: "bot" } // placeholder for TypingIndicator
    ];
    setMessages(newMessages);
    setChatHistory(chatHistory + userLine);
    setInputValue("");
    setLoading(true);
    try {
      const response = await axios.post(`${baseUrl}/chat_journey`, { prompt_path:promptPath, chat_history:chatHistory+userLine, summary:summary }, config);
      if (response.status === 200 && response.data?.response) {
        setIsUsingGemini(response.data?.model?.toLowerCase().includes('gemini'));
        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = {
            text: { response: response.data.response },
            sender: "bot"
          };
          return updated;
        });
        setChatHistory((prev) => prev + `bot: ${response.data.response}\n`);
      } else {
        ToastHandle(response?.data?.error || 'Unknown error', 'danger');
      }
    } catch (err) {
      ToastHandle('Internal Server Error', 'danger');
    } finally {
      setLoading(false);
    }
  };

  // Scroll to the bottom when messages change
  useEffect(() => {
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="journey-meet-banner">
      <Container>
        <div className="content-container">
          <div className="left-side">
            {!initialized && (
              <div>
                <h2>Analyze User Activity</h2>

                <p style={{marginTop:'30px'}}>Enter a user's email address and an optional date range to get a summary of their activity in HostBuddy.</p>
                <p style={{marginTop:'10px'}}>If start date is not entered, the date of the user's account creation will be used.</p>
                <p style={{marginTop:'10px', marginBottom:'40px'}}>If end date is not entered, the current date will be used.</p>

                <div className="input-container">
                  <div className="dates-container">
                    <div>
                      <label htmlFor="startDate">Start Date:</label>
                      <input
                        id="startDate"
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                      />
                    </div>
                    <div>
                      <label htmlFor="endDate">End Date:</label>
                      <input
                        id="endDate"
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="userEmail">User Email:</label>
                    <input
                      id="userEmail"
                      type="email"
                      placeholder="User Email"
                      value={userEmail}
                      onChange={(e) => setUserEmail(e.target.value)}
                    />
                  </div>
                  <button onClick={handleInitialize} disabled={loading}>
                    {loading ? (
                      <img src={loaderGif} width="25" height="25" alt="loading..." />
                    ) : (
                      "Submit"
                    )}
                  </button>
                </div>
              </div>
            )}
            {initialized && (
              <div className="banner-heading">
                <h2>Summary of Activity</h2>
                {summary.split(/\n+/).map((paragraph, i) => (
                  <p key={i} style={{marginBottom:'15px'}}>{paragraph}</p>
                ))}
              </div>
            )}
          </div>
          <div className={`right-side ${!initialized ? 'disabled-chat' : ''}`}>
            {isUsingGemini && (
              <p style={{color:'rgb(255,165,0)', fontSize:'16px'}}>
                Warning: using Gemini due to large context size. Gemini is prone to make mistakes on more complex questions.
              </p>
            )}
            <div className="chatbot blur-background-bottom-right">
              <div className="message-list" ref={messageListRef}>
                {messages.map((message, index) => (
                  <Message key={index} text={message.text} sender={message.sender} />
                ))}
              </div>
              <div className="input-container">
                <input
                  type="text"
                  placeholder="Type a message..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                  disabled={loading}
                />
                <button onClick={handleSendMessage} disabled={loading}>
                  {loading ? (
                    <img src={loaderGif} width="25" height="25" alt="loading..." />
                  ) : (
                    "Send"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default MeetBanner;
