import axios from "axios";
import ToastHandle from "../ToastMessage";
import { getActiveToken } from "../apiCore";

// Pin or unpin a conversation
export const callPinConversationApi = async (conversationId, pinnedState = true) => {
  const baseUrl = process.env.REACT_APP_API_ENDPOINT;
  const API_KEY = process.env.REACT_APP_API_KEY;

  try {
    // Get token from the apiCore's active token or fall back to localStorage
    const token = getActiveToken() || localStorage.getItem('authToken');
    
    const config = {
      headers: { 
        "X-API-Key": API_KEY,
        "Authorization": token ? `Bearer ${token}` : undefined
      },
      validateStatus: function (status) { return status >= 200 && status < 500; }
    };
    
    // According to the API documentation, this is the required format:
    // PUT /pin_conversation
    // Body: { "conversation_id": "string", "pinned_state": true|false }
    const body_data = { 
      conversation_id: conversationId,
      pinned_state: pinnedState
    };
    
    const response = await axios.put(`${baseUrl}/pin_conversation`, body_data, config);

    if (response.status === 200) {
      return response.data;
    } else {
      ToastHandle(response?.data?.error || "Failed to update pin status", "danger");
      return { error: response?.data?.error || "Failed to update pin status" };
    }
  } catch (error) {
    ToastHandle("Internal server error", "danger");
    return { error: "Internal server error" };
  }
};
