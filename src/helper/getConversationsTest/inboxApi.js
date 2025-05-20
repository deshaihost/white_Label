import axios from "axios";
import ToastHandle from "../ToastMessage";
import { getAbortSignal } from "./abortController";


// Get all conversations. FYI, this endpoint uses POST type to support more complex queries
export const callGetConversationsApi = async (limit=null, conversationIdsAlreadyHave={}, urgentOnly=false, propertyName="", phase="", meetHbOnly=false, guestName='', conversationId=null, requestId=null, currentConversationIdRef=null) => {
  const baseUrl = process.env.REACT_APP_API_ENDPOINT;
  const API_KEY = process.env.REACT_APP_API_KEY;

  try {
    const config = {
      headers: { "X-API-Key": API_KEY },
      validateStatus: function (status) { return status >= 200 && status < 500; } // don't throw an error for non-2xx responses
    };
    
    // If we're getting a specific conversation, use the AbortSignal
    if (conversationId) {
      const signal = getAbortSignal(conversationId, 'fetch_conversations');
      if (signal) {
        config.signal = signal;
      }
    }
    
    const body_data = { 'query_data': { 'limit':limit, 'conversations_already_have':conversationIdsAlreadyHave, 'action_items':urgentOnly } };
    if (propertyName) { body_data.query_data.property_name = propertyName; }
    if (phase) { body_data.query_data.reservation_phase = phase; }
    if (guestName) { body_data.query_data.guest_name = guestName; }
    if (meetHbOnly) { body_data.query_data.last_message_sender = 'hostbuddy'; }
    if (conversationId) { body_data.query_data.conversation_id = conversationId; }
    const response = await axios.post( `${baseUrl}/get_all_conversations`, body_data, config );

    // Check if this request is still valid based on current conversation and request ID
    if (requestId && currentConversationIdRef) {
      // For single conversation fetch, check if conversation ID has changed
      if (conversationId && currentConversationIdRef.current !== conversationId) {
        console.log("Ignoring stale response from get_all_conversations - conversation changed");
        return { error: "Conversation changed" };
      }
    }

    if (response.status === 200) { }
    //else { ToastHandle(response?.data?.error, "danger"); }
    return response.data;  } catch (error) {
    // Don't log errors for aborted requests (which happen during rapid conversation switching)
    if (error.name === 'AbortError' || error.name === 'CanceledError' || axios.isCancel(error)) {
      console.log("Request canceled due to conversation switch");
      return { error: "Request canceled" };
    }
    
    //ToastHandle("Internal server error", "danger");
    return { error: "Internal server error" };
  }
};


// Get a single conversation by ID
export const callGetSingleConversationApi = async (conversationId, requestId=null, currentConversationIdRef=null) => {
  const baseUrl = process.env.REACT_APP_API_ENDPOINT;
  const API_KEY = process.env.REACT_APP_API_KEY;

  try {
    const config = {
      headers: { "X-API-Key": API_KEY },
      validateStatus: function (status) { return status >= 200 && status < 500; } // don't throw an error for non-2xx responses
    };
    
    // Use AbortSignal to allow canceling this request if conversation changes
    const signal = getAbortSignal(conversationId, 'fetch_single_conversation');
    if (signal) {
      config.signal = signal;
    }
    
    const body_data = { 'query_data': { 'conversation_id':conversationId } };
    const response = await axios.post( `${baseUrl}/get_all_conversations`, body_data, config );

    // Check if this request is still valid based on current conversation and request ID
    if (requestId && currentConversationIdRef && currentConversationIdRef.current !== conversationId) {
      console.log("Ignoring stale response from get_all_conversations for single conversation - conversation changed");
      return { error: "Conversation changed" };
    }

    if (response.status === 200) { }
    else { 
      // Only show error if this is still the current conversation
      if (!currentConversationIdRef || currentConversationIdRef.current === conversationId) {
        ToastHandle(response?.data?.error, "danger"); 
      }
    }
    return response.data;  } catch (error) {
    // Don't show errors for aborted requests (which happen during rapid conversation switching)
    if (error.name === 'AbortError' || error.name === 'CanceledError' || axios.isCancel(error)) {
      console.log("Request canceled due to conversation switch");
      return { error: "Request canceled" };
    }
    
    // Only show error if this is still the current conversation
    if (!currentConversationIdRef || currentConversationIdRef.current === conversationId) {
      // ToastHandle("iNTEInternal server error ", "danger");
    }
    return { error: "Internal server error" };
  }
};


// Send a message in a conversation
export const callSendMessageApi = async (message, conversationId, reservationId, propertyName, assistanceUsed=null, requestId=null, currentConversationIdRef=null) => {
  const baseUrl = process.env.REACT_APP_API_ENDPOINT;
  const API_KEY = process.env.REACT_APP_API_KEY;

  try {
    const config = {
      headers: { "X-API-Key": API_KEY },
      validateStatus: function (status) { return status >= 200 && status < 500; } // don't throw an error for non-2xx responses
    };
    
    // Use AbortSignal to allow canceling this request if conversation changes
    const signal = getAbortSignal(conversationId, 'send_message');
    if (signal) {
      config.signal = signal;
    }
    
    const body_data = { conversation_id:conversationId, reservation_id:reservationId, property_name:propertyName, message }
    if (assistanceUsed) { body_data.assistance_used = assistanceUsed; }
    const response = await axios.post( `${baseUrl}/send_message_manual`, body_data, config );

    // Check if this request is still valid based on current conversation and request ID
    if (requestId && currentConversationIdRef && currentConversationIdRef.current !== conversationId) {
      console.log("Ignoring stale response from send_message_manual - conversation changed");
      return { error: "Conversation changed" };
    }

    if (response.status === 200) { }
    else { 
      // Only show error if this is still the current conversation
      if (!currentConversationIdRef || currentConversationIdRef.current === conversationId) {
        ToastHandle(response?.data?.error, "danger"); 
      }
    }
    return response.data;
  } catch (error) {
    // Don't show errors for aborted requests (which happen during rapid conversation switching)
    if (error.name === 'AbortError' || error.name === 'CanceledError' || axios.isCancel(error)) {
      console.log("Request canceled due to conversation switch");
      return { error: "Request canceled" };
    }
    
    // Only show error if this is still the current conversation
    if (!currentConversationIdRef || currentConversationIdRef.current === conversationId) {
      ToastHandle("Internal server error", "danger");
    }
    return { error: "Internal server error" };
  }
};


export const callMarkConversationAsOpenedApi = async (conversationId, propertyName, requestId=null, currentConversationIdRef=null) => {
  const baseUrl = process.env.REACT_APP_API_ENDPOINT;
  const API_KEY = process.env.REACT_APP_API_KEY;

  try {
    const config = {
      headers: { "X-API-Key": API_KEY },
      validateStatus: function (status) { return status >= 200 && status < 500; } // don't throw an error for non-2xx responses
    };
    
    // Use AbortSignal to allow canceling this request if conversation changes
    const signal = getAbortSignal(conversationId, 'mark_opened');
    if (signal) {
      config.signal = signal;
    }
    
    const body_data = { conversation_id:conversationId, property_name:propertyName }
    const response = await axios.put( `${baseUrl}/mark_conversation_as_opened`, body_data, config );

    // Check if this request is still valid based on current conversation and request ID
    if (requestId && currentConversationIdRef && currentConversationIdRef.current !== conversationId) {
      console.log("Ignoring stale response from mark_conversation_as_opened - conversation changed");
      return { error: "Conversation changed" };
    }

    if (response.status === 200) { }
    else {
      // Only show error if this is still the current conversation
      if (!currentConversationIdRef || currentConversationIdRef.current === conversationId) {
        console.error("Failed to mark conversation as opened:", response?.data?.error);
      }
    }
    return response.data;
  } catch (error) {
    // Don't show errors for aborted requests (which happen during rapid conversation switching)
    if (error.name === 'AbortError' || error.name === 'CanceledError' || axios.isCancel(error)) {
      console.log("Request canceled due to conversation switch");
      return { error: "Request canceled" };
    }
    
    // Only log error if this is still the current conversation
    if (!currentConversationIdRef || currentConversationIdRef.current === conversationId) {
      console.error("Error marking conversation as opened:", error);
    }
    return { error: "Internal server error" };
  }
};