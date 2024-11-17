import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getQuestionnaireActions } from "../redux/actions";
import { jwtDecode } from 'jwt-decode';

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
