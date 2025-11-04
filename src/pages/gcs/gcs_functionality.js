import axios from 'axios';
import ToastHandle from '../../helper/ToastMessage';
import { jwtDecode } from 'jwt-decode';
import { setAuthorization, getActiveToken } from '../../helper/apiCore';

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


export const callAddSubAccountApi = async (accountData, setLoading=null) => {
  const baseUrl = process.env.REACT_APP_API_ENDPOINT;
  const API_KEY = process.env.REACT_APP_API_KEY;
  if (setLoading) setLoading(true);

  try {
    const config = {
      headers: { "X-API-Key": API_KEY },
      validateStatus: function (status) { return status >= 200 && status < 500; } // don't throw an error for non-2xx responses
    };

    // Build the request body with all provided fields
    const requestBody = {
      sub_account_name: accountData.accountName
    };
    
    // Add optional fields if they exist
    if (accountData.email) requestBody.email = accountData.email;
    if (accountData.password) requestBody.password = accountData.password;
    if (accountData.confirmPassword) requestBody.confirm_password = accountData.confirmPassword;

    const response = await axios.post(`${baseUrl}/create_subaccount`, requestBody, config);

    if (response.status === 200) { return response.data; } // {'message':'Account created successfully', 'subaccount_id':subaccount_id}
    else { ToastHandle(response?.data?.error, "danger"); }
  } catch (error) {
    ToastHandle("An error occurred adding the subaccount", "danger");
  } finally {
    if (setLoading) setLoading(false);
  }
}


// If there is a GCS token saved in the user object in local or session storage, restore it
// This ensures the user is acting as the GCS user, not from one of their subaccounts
export const restoreGcsTokenIfAvailable = async () => {
  return new Promise((resolve) => {
    
    // Get the saved auth/token data. Check localStorage first, then sessionStorage as fallback
    const localAuth = JSON.parse(localStorage.getItem("hostBuddy_auth"));
    const sessionAuth = JSON.parse(sessionStorage.getItem("hostBuddy_auth"));
    
    const authData = localAuth || sessionAuth;
    
    if (authData && authData.gcs_access_token) { // Set the GCS token if it exists in the user object
      setAuthorization(authData.gcs_access_token);
      resolve(true);
    } else {
      resolve(false);
    }
  });
}


// Sets the token to be used for ALL api calls. Set this to the GCS user's token for the user to act as the GCS user; set this to a subaccount's token for the user to act as that subaccount
export const setToken = (token) => {
  if (token) {
    setAuthorization(token);
  }
}


// If the user is logged in as a GCS user, return the GCS token. Otherwise, return null
export const getGcsToken = () => {
  const localAuth = JSON.parse(localStorage.getItem("hostBuddy_auth"));
  const sessionAuth = JSON.parse(sessionStorage.getItem("hostBuddy_auth"));
  const getAuthToken = localAuth || sessionAuth;
  
  // If token exists in local but not session storage, copy it to session storage
  if (localAuth && !sessionAuth) {
    sessionStorage.setItem("hostBuddy_auth", JSON.stringify(localAuth));
  }
  
  if (!getAuthToken) return null;
  
  try {
    const { gcs_access_token } = getAuthToken;
    if (!gcs_access_token) return null;

    const decoded = jwtDecode(gcs_access_token);
    if (decoded.exp * 1000 <= Date.now()) {return null;}

    return gcs_access_token;

  } catch (error) {
    return null;
  }
};


// True if user is currently acting as a GCS master user (their active token is equal to the stored GCS token), false otherwise
export const is_gcs_master_user = () => {
  const localAuth = JSON.parse(localStorage.getItem("hostBuddy_auth"));
  const sessionAuth = JSON.parse(sessionStorage.getItem("hostBuddy_auth"));
  const getAuthToken = localAuth || sessionAuth;

  if (!getAuthToken) return false;
  
  try {
    const { gcs_access_token } = getAuthToken;
    if (!gcs_access_token) return false;

    const activeToken = getActiveToken();
    return gcs_access_token === activeToken;

  } catch (error) {
    return false;
  }
}


// True if user is currently acting as a GCS subaccount user (they have a GCS token saved, and it is different from their active token), false otherwise
export const is_gcs_subaccount_user = () => {
  const localAuth = JSON.parse(localStorage.getItem("hostBuddy_auth"));
  const sessionAuth = JSON.parse(sessionStorage.getItem("hostBuddy_auth"));
  const getAuthToken = localAuth || sessionAuth;

  if (!getAuthToken) return false;
  
  try {
    const { gcs_access_token } = getAuthToken;
    if (!gcs_access_token) return false;
    
    const activeToken = getActiveToken();
    if (!activeToken) return false;
    
    // The user is a subaccount if they have a GCS token that is different from the active token
    return gcs_access_token !== activeToken;

  } catch (error) {
    return false;
  }
}

// Navigate into a specific subaccount's portal
export const navigateToSubaccount = async (subAccountUserId, navigate, options = {}) => {
  const { 
    setNavigatingToSubaccount=null, 
    setLoadingAccountId=null,
    subAccountName=null 
  } = options;
  
  if (setNavigatingToSubaccount) setNavigatingToSubaccount(true);
  if (setLoadingAccountId) setLoadingAccountId(subAccountUserId);
  
  try {
    const token = await callGetSubAccountTokenApi(subAccountUserId);
    
    if (token) {
      setToken(token);
      
      // Save the subaccount name to session storage if provided
      if (subAccountName) {
        sessionStorage.setItem("hostBuddy_subaccount_name", subAccountName);
      }
      
      navigate('/dashboard');
      return true;
    } else { // Just reset the loading state - don't navigate anywhere
      if (setLoadingAccountId) setLoadingAccountId(null);
      if (setNavigatingToSubaccount) setNavigatingToSubaccount(false);
      return false;
    }
  } catch (error) { // If an error occurred, reset the loading state
    if (setLoadingAccountId) setLoadingAccountId(null);
    if (setNavigatingToSubaccount) setNavigatingToSubaccount(false);
    ToastHandle(`Error navigating to subaccount: ${error}`, "danger");
    return false;
  }
};
