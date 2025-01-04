import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getQuestionnaireActions } from "../redux/actions";
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';

// If the user is logged in (i.e. valid & unexpired token), return the token. Otherwise, return null
const Authorized = () => {
  const localAuth = JSON.parse(localStorage.getItem("hostBuddy_auth"));
  const sessionAuth = JSON.parse(sessionStorage.getItem("hostBuddy_auth"));
  const getAuthToken = localAuth || sessionAuth;
  
  // If token exists in local but not session storage, copy it to session storage
  if (localAuth && !sessionAuth) {
    sessionStorage.setItem("hostBuddy_auth", JSON.stringify(localAuth));
  }
  
  if (!getAuthToken) return null;
  
  try {
    const { token } = getAuthToken;
    const decoded = jwtDecode(token);
    if (decoded.exp * 1000 <= Date.now()) {
      return null;
    }
    return getAuthToken;
  } catch (error) {
    return null;
  }
};
export default Authorized;

export const nameKey = () => {
  let localStorageKey = "nameKey";
  const getLocalStorageData = JSON?.parse(localStorage?.getItem(localStorageKey));
  return getLocalStorageData;
};

export const GetquestionnaireFunction = () => {
  const store = useSelector((state) => state);
  const dispatch = useDispatch();
  const getLocalStorageData = nameKey();
  const getLocalStorageNameKey = getLocalStorageData?.nameKey;
  const apiQuestionnaireData = store?.getQuestionnaireReducer?.getQuestionnaire?.data?.questionnaire;
  const apiQuestionnaireLoading = store?.getQuestionnaireReducer?.loading;
  const { questionnaire } = apiQuestionnaireData ? apiQuestionnaireData : [];
  const questionnaireApi = questionnaire ? questionnaire : [];
  let dataQuestionnaire = { questionnaireApi, apiQuestionnaireLoading };

  useEffect(() => {
    if (getLocalStorageNameKey !== null) {
      dispatch(getQuestionnaireActions(getLocalStorageNameKey));
    }
  }, [getLocalStorageNameKey]);
  return dataQuestionnaire;
};

export const useSelectorUseDispatch = () => {
  const store = useSelector((state) => state);
  const dispatch = useDispatch();

  let useSeletUseDispa = {
    store,
    dispatch,
  };
  return useSeletUseDispa;
};

let userDataPromise = null;

// From the user data: look at all the subscription fields, and compute and return values that the program cares about
export const getSubscriptionStatus = (userData) => {
  if (!userData) return { plan: 'trial_over', props_allowed: 0, status: '' };

  // Get subscription status
  const subscrStatus = userData.subscr_status || '';

  // If user has a plan specified
  const planName = 'subscr_plan' in userData ? userData.subscr_plan : userData?.subscription?.plan || '';

  if (planName) {
    const propsAllowed = 'subscr_props_allowed' in userData ? userData.subscr_props_allowed : userData?.subscription?.num_properties_allowed || 0;
    
    // Check if subscription has ended
    const subscrEndDate = 'subscr_payment_good_until' in userData ? userData.subscr_payment_good_until : userData?.subscription?.payment_good_until;

    if (subscrEndDate) {
      const allowedOverdueDays = subscrStatus === 'canceled' ? 0 : 14;
      const endDate = new Date(subscrEndDate);
      const now = new Date();
      
      if (now > new Date(endDate.getTime() + allowedOverdueDays * 24 * 60 * 60 * 1000)) {
        return { plan: 'subscription_over', props_allowed: 0, status: subscrStatus };
      }
    }

    return { plan: planName, props_allowed: propsAllowed, status: subscrStatus };
  }

  // If no plan name, check if trial applies
  if ('trial_ends' in userData) {
    const trialEnds = new Date(userData.trial_ends);
    if (new Date() < trialEnds) {
      return { plan: 'trial', props_allowed: 100, status: subscrStatus };
    }
    return { plan: 'trial_over', props_allowed: 0, status: subscrStatus };
  }

  // Legacy user with no plan and no trial
  return { plan: 'trial_over', props_allowed: 0, status: subscrStatus };
};

// Get the most recently fetched user data from session storage. If it doesn't exist, call the API to fetch it.
// This is useful for when we want to access user data fields that don't really change, so we don't have to call the API every time we need them (e.g. PMS name, date created, etc)
// FYI, this DOESN'T WORK becuase we're doing the async/await handling incorrectly. So currently UNUSED
export const getLastUserDataAsync = async () => {
  const userDataFromStorage = JSON.parse(sessionStorage.getItem("userData"));
  if (userDataFromStorage) {
    return userDataFromStorage;
  }

  // Call the API with Axios
  const baseUrl = process.env.REACT_APP_API_ENDPOINT;
  const API_KEY = process.env.REACT_APP_API_KEY;

  try {
    const config = {
      headers: { "X-API-Key": API_KEY },
      validateStatus: function (status) { return status >= 200 && status < 500; }
    };

    const response = await axios.get(`${baseUrl}/get_user_data`, config);

    if (response.status === 200) {
      const userData = response.data?.user;
      sessionStorage.setItem("userData", JSON.stringify(userData));
      return userData;
    }
  } catch (error) { }

  return null;
};

// Synchronous wrapper that lets us call getLastUserDataAsync() and get the result synchronously
// FYI, this also DOESN'T WORK and is UNUSED
export const getLastUserData = () => {
  if (!userDataPromise) {
    userDataPromise = getLastUserDataAsync();
  }
  
  let result = null;
  try {
    result = userDataPromise;
  } catch { }
  return result;
};