import React, { useState, useEffect } from 'react';
import { callGetConversationsApi, callGetSingleConversationApi } from "../../../../helper/getConversationsTest/inboxApi";
import { howManyMinutesAgo } from '../../../../helper/commonFun';
import { FullScreenLoader } from "../../../../helper/Loader";
import LeftMessage from "./leftMessage/LeftMessage";
import MildeSection from "./mildeSection/MildeSection";
import RightSection from "./rightSection/RightSection";
import "./inboxIndex.css";

const Inbox = ({allPropertyNamesList}) => {
  const [conversations, setConversations] = useState([]); // All conversations to be displayed; array of objs
  const [selectedConversation, setSelectedConversation] = useState({}); // The single selected conversation; obj. Messages are under the key 'messages'
  const [conversationsNotYetFetched, setConversationsNotYetFetched] = useState(true);

  const [urgentFilterIsEnabled, setUrgentFilterIsEnabled] = useState(false);
  const [propertyFilterVal, setPropertyFilterVal] = useState("");
  const [phaseFilterVal, setPhaseFilterVal] = useState("");
  const [fromHostBuddyFilterVal, setFromHostBuddyFilterVal] = useState(false);

  // Get the conversations we already have in the format needed to send to the API: { conversationId1: { last_message_time:<last_message_time_utc> }, ... }
  const getConversationsAlreadyHave = () => {
    if (conversations) {
      return conversations.reduce((acc, conversation) => {
        acc[conversation.conversation_id] = {
          last_message_time: conversation.last_message_time_utc
        };
        return acc;
      }, {});
    } else {
      return {};
    }
  };

  // Call the API to get conversations, up to the specified limit, and update the state with the returned data.
  const fetchConversations = async (limit, reset=false, urgent=false, propertyName="", phase="", meetHbOnly=false) => {
    let conversationsAlreadyHave = {};
    if (reset) { // Clear conversations state
      conversationsAlreadyHave = {};
      setConversations([]);
    }
    else { // Tell the API which conversations we already have, so we don't need to get them again if they haven't been updated
      conversationsAlreadyHave = getConversationsAlreadyHave();
    }
    
    const data = await callGetConversationsApi(limit, conversationsAlreadyHave, urgent, propertyName, phase, meetHbOnly);
    if (data?.conversations) { updateConversationsWithApiData(data.conversations); }
    setConversationsNotYetFetched(false);
  };

  // Sort the conversations array by the most recent message (conversation.messages[-1].time ; format MM/DD/YYYY HH:MM:SS)
  const sortConversationsByMostRecentMessage = (conversations) => {
    return conversations.sort((a, b) => {
      const timeA = new Date(a.messages[a.messages.length - 1].time);
      const timeB = new Date(b.messages[b.messages.length - 1].time);
      return timeB - timeA; // Sort in descending order
    });
  };

  // Given a conversation ID: fetch that convo from the API and update that conversation in the state
  const updateConversation = async (conversationId) => {
    const updatedConversationData = await callGetSingleConversationApi(conversationId);
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
      // If the conversation to be updated is selectedConversation (the one currently being viewed), update that too
      if (selectedConversation.conversation_id === conversationId) {
        setSelectedConversation(retrievedConversation);
      }
    }
  };

  // Update our conversation state with a new list returned by the API. This does NOT call the API: it takes the API data as a parameter.
  const updateConversationsWithApiData = (apiConversationData) => {
    let newConversationState = apiConversationData.map(conversation => {
      const conversationId = conversation['conversation_id'];
      if (!conversation.hasOwnProperty('messages')) { // the API data doesn't include messages (or most other fields) for conversations we already have if there are no updates. Get the convo ID, find the convo in our local state, and copy that record over
        const localConversation = conversations.find(conv => conv.conversation_id === conversationId);
        return localConversation ? localConversation : conversation;
      }
      else {
        if (selectedConversation.conversation_id === conversationId) { // If this updated conversation record is the one currently being viewed, update the selectedConversation state
          setSelectedConversation(conversation);
        }
        return conversation;
      }
    });
    setConversations(newConversationState);
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
    // If the conversation to be updated is selectedConversation (the one currently being viewed), update it
    if (selectedConversation.conversation_id === conversationId) {
      setSelectedConversation((prevSelectedConversation) => {
        return {
          ...prevSelectedConversation,
          messages: [...prevSelectedConversation.messages, message],
        };
      });
    }
  };

  // Fetch the first batch of conversations on page load
  useEffect(() => {
    fetchConversations(10);
  }, []);

  // Fetch conversations every 10 seconds to keep the page up-to-date
  useEffect(() => {
    const intervalId = setInterval(() => {
      const num_existing_convos = conversations.length;
      const num_convos_to_fetch = Math.max(num_existing_convos, 2); // always fetch at least 2 convos, even if we're only looking at one (e.g. due to filter), so if there's simultaneous updates we're more likely to catch it. 2 is still an arbitrary number tbh
      fetchConversations(num_convos_to_fetch, false, urgentFilterIsEnabled, propertyFilterVal, phaseFilterVal, fromHostBuddyFilterVal);
    }, 10000); // 10000 milliseconds = 10 seconds

    const timeoutId = setTimeout(() => { // Stop auto-updating after the page has been open for 4 hours (14,400,000 milliseconds = 4 hours)
      clearInterval(intervalId);
    }, 14400000);

    return () => { // Cleanup the interval and timeout on component unmount
      clearInterval(intervalId);
      clearTimeout(timeoutId);
    };
  }, [conversations]);

  return (
    <>
      {conversationsNotYetFetched ? <FullScreenLoader /> : null}
      <div className="row text-white">
        <div className="col-lg-3 left-bar">
          <LeftMessage allPropertyNamesList={allPropertyNamesList} allConversations={conversations} setAllConversations={setConversations} setSelectedConvo={setSelectedConversation} fetchConversations={fetchConversations} urgentFilterIsEnabled={urgentFilterIsEnabled} setUrgentFilterIsEnabled={setUrgentFilterIsEnabled} propertyFilterVal={propertyFilterVal} setPropertyFilterVal={setPropertyFilterVal} phaseFilterVal={phaseFilterVal} setPhaseFilterVal={setPhaseFilterVal} fromHostBuddyFilterVal={fromHostBuddyFilterVal} setFromHostBuddyFilterVal={setFromHostBuddyFilterVal} />
        </div>
        <div className="col-lg-6">
          <MildeSection allConversationData={selectedConversation} updateConversationFromApi={updateConversation} updateConversationLocal={addMessageToLocalConversation} />
        </div>
        <div className="col-lg-3">
          <RightSection rightSectionData={selectedConversation} />
        </div>
      </div>
    </>
  );
};

export default Inbox;