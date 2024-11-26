import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getQuestionnaireActions } from "../redux/actions";
import { jwtDecode } from 'jwt-decode';
import { getUserDataActions } from "../redux/actions";
import axios from 'axios';

// If the user is logged in (i.e. valid & unexpired token), return the token. Otherwise, return null
const Authorized = () => {
  const getAuthToken = JSON.parse(localStorage.getItem("hostBuddy_auth")) || JSON.parse(sessionStorage.getItem("hostBuddy_auth")); // Check local storage first (used if user selects "remember me"), then session storage
  
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

// Get the most recently fetched user data from session storage. If it doesn't exist, call the API to fetch it.
// This is useful for when we want to access user data fields that don't really change, so we don't have to call the API every time we need them (e.g. PMS name, date created, etc)
// FYI, this DOESN'T WORK becuase we're doing the async/await handling incorrectly.
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