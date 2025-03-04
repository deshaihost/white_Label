import axios from 'axios';
import ToastHandle from '../../helper/ToastMessage';
//import { APICore } from '../../helper/apiCore';
import { setAuthorization } from '../../helper/apiCore';

export const callGetGcsUserDataApi = async (setLoading=null) => {
  const baseUrl = process.env.REACT_APP_API_ENDPOINT;
  const API_KEY = process.env.REACT_APP_API_KEY;
  if (setLoading) setLoading(true);

  try {
    const config = {
      headers: { "X-API-Key": API_KEY },
      validateStatus: function (status) { return status >= 200 && status < 500; } // don't throw an error for non-2xx responses
    };

    const response = await axios.get(`${baseUrl}/get_gcs_user_data`, config);

    if (response.status === 200) { 
      return response.data; 
    } else { 
      ToastHandle(response?.data?.error || "Failed to retrieve GCS users data", "danger");
      return null;
    }
  } catch (error) {
    console.error("Error fetching GCS user data:", error);
    ToastHandle("An error occurred retrieving the GCS users data", "danger");
    return null;
  } finally {
    if (setLoading) setLoading(false);
  }
}

export const callGetSubAccountTokenApi = async (subAccountUserId, setLoading=null) => {
  const baseUrl = process.env.REACT_APP_API_ENDPOINT;
  const API_KEY = process.env.REACT_APP_API_KEY;
  if (setLoading) setLoading(true);

  try {
    const config = {
      headers: { "X-API-Key": API_KEY },
      validateStatus: function (status) { return status >= 200 && status < 500; } // don't throw an error for non-2xx responses
    };

    const response = await axios.get(`${baseUrl}/get_subaccount_token?user_id=${subAccountUserId}`, config);

    if (response.status === 200) { return response.data.access_token; }
    else { ToastHandle(response?.data?.error, "danger"); }
  } catch (error) {
    ToastHandle(`An error occurred retrieving the token for the account: ${subAccountUserId}`, "danger");
  } finally {
    if (setLoading) setLoading(false);
  }
}


export const callAddSubAccountApi = async (subAccountName, setLoading=null) => {
  const baseUrl = process.env.REACT_APP_API_ENDPOINT;
  const API_KEY = process.env.REACT_APP_API_KEY;
  if (setLoading) setLoading(true);

  try {
    const config = {
      headers: { "X-API-Key": API_KEY },
      validateStatus: function (status) { return status >= 200 && status < 500; } // don't throw an error for non-2xx responses
    };

    const response = await axios.post(`${baseUrl}/create_subaccount`, { sub_account_name: subAccountName }, config);

    if (response.status === 200) { return response.data; } // {'message':'Account created successfully', 'subaccount_id':subaccount_id}
    else { ToastHandle(response?.data?.error, "danger"); }
  } catch (error) {
    ToastHandle("An error occurred adding the subaccount", "danger");
  } finally {
    if (setLoading) setLoading(false);
  }
}


export const setToken = (token) => {
  if (token) {
    setAuthorization(token);
  }
}