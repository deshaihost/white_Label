import axios from "axios";
import ToastHandle from "../ToastMessage";

const callGetConversationsApi = async () => {
  const baseUrl = process.env.REACT_APP_API_ENDPOINT;
  const API_KEY = process.env.REACT_APP_API_KEY;

  try {
    const config = {
      headers: { "X-API-Key": API_KEY },
      validateStatus: function (status) { return status >= 200 && status < 500; } // don't throw an error for non-2xx responses
    };
    const response = await axios.get( `${baseUrl}/get_all_conversations`, config );

    if (response.status === 200) {
      // ToastHandle("Conversations retrieved successfully", "success");
    }
    else { ToastHandle(response?.data?.error, "danger"); }
    return response;
  } catch (error) {
    ToastHandle("Internal server error", "danger");
  } finally { }
};

export default callGetConversationsApi;