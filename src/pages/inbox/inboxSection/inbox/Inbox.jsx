import React, { useState, useEffect } from 'react';
import { callGetConversationsApi, callGetSingleConversationApi } from "../../../../helper/getConversationsTest/inboxApi";
import LeftMessage from "./leftMessage/LeftMessage";
import MildeSection from "./mildeSection/MildeSection";
import RightSection from "./rightSection/RightSection";
import "./inboxIndex.css";

const Inbox = () => {
  const [conversations, setConversations] = useState(null); // All conversations to be displayed; array of objs
  const [error, setError] = useState(null);
  const [userMessage, setUserMessage] = useState({}); // The single selected conversation; obj. Messages are under the key 'messages'

  // Sort the conversations array by the most recent message (conversation.messages[-1].time ; format MM/DD/YYYY HH:MM:SS)
  const sortConversationsByMostRecentMessage = (conversations) => {
    return conversations.sort((a, b) => {
      const timeA = new Date(a.messages[a.messages.length - 1].time);
      const timeB = new Date(b.messages[b.messages.length - 1].time);
      return timeB - timeA; // Sort in descending order
    });
  };

  // Given a conversation ID: fetch that convo from the API and update that conversation in the state
  const updateConversation = async (conversationId, propertyName) => {
    const updatedConversationData = await callGetSingleConversationApi(conversationId, propertyName);
    if (updatedConversationData?.conversations && updatedConversationData.conversations.length > 0) {
      const retrievedConversation = updatedConversationData.conversations[0];
      let updatedConversations = conversations.map((conversation) => {
        if (conversation.conversation_id === conversationId) {
          return retrievedConversation;
        }
        return conversation;
      });
      updatedConversations = sortConversationsByMostRecentMessage(updatedConversations);
      setConversations(updatedConversations);
      // If the conversation to be updated is userMessage (the one currently being viewed), update that too
      if (userMessage.conversation_id === conversationId) {
        setUserMessage(retrievedConversation);
      }
    }
  };

  // Add a message to a conversation in our local record (conversations)
  const addMessageToLocalConversation = (conversationId, message) => {
    // Update the covnersation in covnersations
    const updatedConversations = conversations.map((conversation) => {
      if (conversation.conversation_id === conversationId) {
        conversation.messages.push(message);
      }
      return conversation;
    });
    setConversations(updatedConversations);
    // If the conversation to be updated is userMessage (the one currently being viewed), update it
    if (userMessage.conversation_id === conversationId) {
      setUserMessage((prevUserMessage) => {
        return {
          ...prevUserMessage,
          messages: [...prevUserMessage.messages, message],
        };
      });
    }
  };

  // Fetch all conversations on page load
  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const data = await callGetConversationsApi();
        setConversations(data?.conversations);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchConversations();
  }, []);

  return (
    <div className="row text-white">
      <div className="col-lg-3 left-bar">
        <LeftMessage
          messageList={conversations}
          getUserMessage={(data) => setUserMessage(data)}
        />
      </div>
      <div className="col-lg-6">
        <MildeSection allConversationData={userMessage} updateConversationFromApi={updateConversation} updateConversationLocal={addMessageToLocalConversation} />
      </div>
      <div className="col-lg-3">
        <RightSection rightSectionData={userMessage} />
      </div>
    </div>
  );
};

export default Inbox;