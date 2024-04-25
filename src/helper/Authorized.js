import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getQuestionnaireActions } from "../redux/actions";

const Authorized = () => {
  const getAuthToken = JSON.parse(sessionStorage.getItem("hostBuddy_auth"));
  return getAuthToken;
};
export default Authorized;

export const nameKey = () => {
  let localStorageKey = "nameKey";
  const getLocalStorageData = JSON?.parse(
    localStorage?.getItem(localStorageKey)
  );
  return getLocalStorageData;
};

export const ParamsGet = () => {
  const { id } = useParams();
  return id;
};

export const GetquestionnaireFunction = () => {
  const store = useSelector((state) => state);
  const dispatch = useDispatch();
  const getLocalStorageData = nameKey();
  console.log("NameKey in Auth: ", getLocalStorageData)
  const getLocalStorageNameKey = getLocalStorageData?.nameKey;
  const apiQuestionnaireData =
    store?.getQuestionnaireReducer?.getQuestionnaire?.data?.questionnaire;
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
