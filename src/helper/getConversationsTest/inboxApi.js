import axios from "axios";
import ToastHandle from "../ToastMessage";


// Get all conversations. FYI, this endpoint uses POST type to support more complex queries
export const callGetConversationsApi = async (limit=null, conversationIdsAlreadyHave={}, urgentOnly=false, propertyName="", phase="", meetHbOnly=false, guestName='', conversationId=null, usersAssigned=[]) => {
  const baseUrl = process.env.REACT_APP_API_ENDPOINT;
  const API_KEY = process.env.REACT_APP_API_KEY;

  try {
    const config = {
      headers: { "X-API-Key": API_KEY },
      validateStatus: function (status) { return status >= 200 && status < 500; } // don't throw an error for non-2xx responses
    };
      const body_data = { 'query_data': { 'limit':limit, 'conversations_already_have':conversationIdsAlreadyHave, 'action_items':urgentOnly } };
    if (propertyName) { body_data.query_data.property_name = propertyName; }
    if (phase) { body_data.query_data.reservation_phase = phase; }
    if (guestName) { body_data.query_data.guest_name = guestName; }
    if (meetHbOnly) { body_data.query_data.last_message_sender = 'hostbuddy'; }
    if (conversationId) { body_data.query_data.conversation_id = conversationId; }
    if (usersAssigned && usersAssigned.length > 0) { body_data.query_data.users_assigned = usersAssigned; }
    const response = await axios.post( `${baseUrl}/get_all_conversations`, body_data, config );

    if (response.status === 200) { }
    //else { ToastHandle(response?.data?.error, "danger"); }
    return response.data;  } catch (error) {
    //ToastHandle("Internal server error", "danger");
    return { error: "Internal server error" };
  }
};


// Get a single conversation by ID
export const callGetSingleConversationApi = async (conversationId) => {
  const baseUrl = process.env.REACT_APP_API_ENDPOINT;
  const API_KEY = process.env.REACT_APP_API_KEY;

  try {
    const config = {
      headers: { "X-API-Key": API_KEY },
      validateStatus: function (status) { return status >= 200 && status < 500; } // don't throw an error for non-2xx responses
    };
    
    const body_data = { 'query_data': { 'conversation_id':conversationId } };
    const response = await axios.post( `${baseUrl}/get_all_conversations`, body_data, config );
    // console.log("callGetSingleConversationApi response", response.data);
    if (response.status === 200) { }
    else { ToastHandle(response?.data?.error, "danger"); }
    return response.data;
  } catch (error) {
    ToastHandle("Internal server error", "danger");
    return { error: "Internal server error" };
  }
};


// Send a message in a conversation
export const callSendMessageApi = async (message, conversationId, reservationId, propertyName, assistanceUsed=null) => {
  const baseUrl = process.env.REACT_APP_API_ENDPOINT;
  const API_KEY = process.env.REACT_APP_API_KEY;

  try {
    const config = {
      headers: { "X-API-Key": API_KEY },
      validateStatus: function (status) { return status >= 200 && status < 500; } // don't throw an error for non-2xx responses
    };
    
    const body_data = { conversation_id:conversationId, reservation_id:reservationId, property_name:propertyName, message }
    if (assistanceUsed) { body_data.assistance_used = assistanceUsed; }
    const response = await axios.post( `${baseUrl}/send_message_manual`, body_data, config );

    if (response.status === 200) { }
    else { ToastHandle(response?.data?.error, "danger"); }
    return response.data;
  } catch (error) {
    ToastHandle("Internal server error", "danger");
    return { error: "Internal server error" };
  }
};

// Send a WhatsApp message in a conversation with TWILIO_WHATSAPP channel
export const callSendWhatsAppMessageApi = async (message, conversationId, reservationId, propertyName, assistanceUsed=null) => {
  const baseUrl = process.env.REACT_APP_API_ENDPOINT;
  const API_KEY = process.env.REACT_APP_API_KEY;

  try {
    const config = {
      headers: { "X-API-Key": API_KEY },
      validateStatus: function (status) { return status >= 200 && status < 500; } // don't throw an error for non-2xx responses
    };
    
    const body_data = { 
      conversation_id: conversationId, 
      reservation_id: reservationId, 
      property_name: propertyName, 
      message,
      channel: "TWILIO_WHATSAPP"
    };
    if (assistanceUsed) { body_data.assistance_used = assistanceUsed; }
    const response = await axios.post( `${baseUrl}/send_message_manual`, body_data, config );

    if (response.status === 200) { }
    else { ToastHandle(response?.data?.error, "danger"); }
    return response.data;
  } catch (error) {
    ToastHandle("Internal server error", "danger");
    return { error: "Internal server error" };
  }
};


// Send a OpenPhone message in a conversation with OPENPHONE channel
export const callSendOpenPhoneMessageApi = async (message, conversationId, reservationId, propertyName, assistanceUsed=null) => {
  const baseUrl = process.env.REACT_APP_API_ENDPOINT;
  const API_KEY = process.env.REACT_APP_API_KEY;

  try {
    const config = {
      headers: { "X-API-Key": API_KEY },
      validateStatus: function (status) { return status >= 200 && status < 500; } // don't throw an error for non-2xx responses
    };
    
    const body_data = { 
      conversation_id: conversationId, 
      reservation_id: reservationId, 
      property_name: propertyName, 
      message,
      channel: "OPENPHONE"
    };
    if (assistanceUsed) { body_data.assistance_used = assistanceUsed; }
    const response = await axios.post( `${baseUrl}/send_message_manual`, body_data, config );

    if (response.status === 200) { }
    else { ToastHandle(response?.data?.error, "danger"); }
    return response.data;
  } catch (error) {
    ToastHandle("Internal server error", "danger");
    return { error: "Internal server error" };
  }
};


export const callMarkConversationAsOpenedApi = async (conversationId, propertyName) => {
  const baseUrl = process.env.REACT_APP_API_ENDPOINT;
  const API_KEY = process.env.REACT_APP_API_KEY;

  try {
    const config = {
      headers: { "X-API-Key": API_KEY },
      validateStatus: function (status) { return status >= 200 && status < 500; } // don't throw an error for non-2xx responses
    };
    
    const body_data = { conversation_id:conversationId, property_name:propertyName }
    const response = await axios.put( `${baseUrl}/mark_conversation_as_opened`, body_data, config );

    if (response.status === 200) { }
    else { }
    return response.data;
  } catch (error) {
    return { error: "Internal server error" };
  }
};

// Get available senders for a property
export const callGetAvailableSendersApi = async (propertyName) => {
  const baseUrl = process.env.REACT_APP_API_ENDPOINT;
  const API_KEY = process.env.REACT_APP_API_KEY;

  try {
    const jwtToken = localStorage.getItem('jwt_token');
    const headers = {
      "X-API-Key": API_KEY
    };
    
    // Only add Authorization header if we have a valid JWT token
    if (jwtToken) {
      headers['Authorization'] = `Bearer ${jwtToken}`;
    }

    const config = {
      headers,
      validateStatus: function (status) { return status >= 200 && status < 500; }
    };
    
    const url = `${baseUrl}/get_available_senders_for_property?property_name=${encodeURIComponent(propertyName)}`;
    const response = await axios.get(url, config);

    if (response.status === 200) { }
    else { ToastHandle(response?.data?.error, "danger"); }
    return response.data;
  } catch (error) {
    ToastHandle("Internal server error", "danger");
    return { error: "Internal server error" };
  }
};

// Set sender for conversation
export const callSetSenderForConversationApi = async (conversationId, senderId, senderName) => {
  const baseUrl = process.env.REACT_APP_API_ENDPOINT;
  const API_KEY = process.env.REACT_APP_API_KEY;

  try {
    const jwtToken = localStorage.getItem('jwt_token');
    const headers = {
      "X-API-Key": API_KEY,
      'Content-Type': 'application/json'
    };
    
    // Only add Authorization header if we have a valid JWT token
    if (jwtToken) {
      headers['Authorization'] = `Bearer ${jwtToken}`;
    }

    const config = {
      headers,
      validateStatus: function (status) { return status >= 200 && status < 500; }
    };
    
    const body_data = {
      conversation_id: conversationId,
      sender_id: senderId,
      sender_name: senderName
    };
    const response = await axios.post(`${baseUrl}/set_sender_for_conversation`, body_data, config);

    if (response.status === 200) { }
    else { ToastHandle(response?.data?.error, "danger"); }
    return response.data;
  } catch (error) {
    ToastHandle("Internal server error", "danger");
    return { error: "Internal server error" };
  }
};