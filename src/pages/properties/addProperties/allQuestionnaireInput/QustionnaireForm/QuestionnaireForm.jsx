import React, { useEffect, useState } from "react";
import {
  GetquestionnaireFunction,
  nameKey,
} from "../../../../../helper/Authorized";
import {
  getQuestionnaireActions,
  updateQuestionnaireActions,
  updateQuestionnaireEmptyActions,
} from "../../../../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import SelectModelNote from "../modelQuestion/SelectModelNote";
import ReservationsStageModel from "../modelQuestion/ReservationsStageModel";
import ToastHandle from "../../../../../helper/ToastMessage";
import Loader, { BoxLoader } from "../../../../../helper/Loader";
import { useNavigate } from "react-router-dom";

const QuestionnaireForm = ({ InterFaceQuestion, prntFuntionHeaderActive }) => {
  const dispatch = useDispatch();
  const store = useSelector((state) => state);
  const getLocalStorageData = nameKey();
  const navigate = useNavigate();
  const getLocalStorageNameKey = getLocalStorageData?.nameKey;
  const apiQuestionnaireLoading = store?.getQuestionnaireReducer?.loading;

  const ExtrasFormCall = GetquestionnaireFunction();
  const QUESTIONNAIRE_KEY = "QUESTIONNAIRE_KEY";
  const sectionStoreQuestionnaireSet = (data) => {
    sessionStorage.setItem(QUESTIONNAIRE_KEY, JSON.stringify(data));
  };
  let questionnaireDataGetSessionStorage =
    sessionStorage.getItem(QUESTIONNAIRE_KEY);
  const converJsonForm = JSON.parse(questionnaireDataGetSessionStorage);
  const { apiQuestionnaireData, metadata } = ExtrasFormCall
    ? ExtrasFormCall
    : [];
  const { section_order } = metadata ? metadata : [];
  const [questionaireToSend, setQuestionaireToSend] = useState(
    structuredClone(apiQuestionnaireData)
  );

  const questionnaire = questionaireToSend?.questionnaire;
  const qustionKey = questionnaire[InterFaceQuestion];
  const entriesArray = Object.entries(qustionKey);
  const formattedArray = entriesArray.map(([key, value]) => ({ key, value }));
  const amenitesMachingKey = Object.keys(
    questionaireToSend?.questionnaire?.Amenities
  );
  const [amenitesQuestion, setAmenitesQuestion] = useState({});
  const [amenitesHideForReservations, setAmenitesHideForReservations] =
    useState({});

  const AmenitesMainComponentFun = (checked, data) => {
    const status = checked !== true ? checked.target.checked : true;
    const { currentValue, index, section } = data;
    if (amenitesMachingKey.includes(section)) {
      const amenitesApiResDataUpdateCheck =
        questionaireToSend?.questionnaire?.Amenities[section][index]
          ?.response_options;
      if (status) {
        const amenitesOldResp = amenitesApiResDataUpdateCheck?.includes(
          currentValue
        )
          ? amenitesApiResDataUpdateCheck
          : [...(amenitesApiResDataUpdateCheck || []), currentValue];
        const updatedQuestionaire = structuredClone(questionaireToSend);
        updatedQuestionaire.questionnaire.Amenities[section][
          index
        ].response_options = amenitesOldResp;
        // Set the updated questionnaireToSend state
        setQuestionaireToSend(updatedQuestionaire);
        sectionStoreQuestionnaireSet(updatedQuestionaire);

        // return amenitesOldResp;
      } else {
        const ameniteFilter = amenitesApiResDataUpdateCheck?.filter(
          (filterData) => filterData !== currentValue
        );
        const updatedQuestionaire = structuredClone(questionaireToSend);
        updatedQuestionaire.questionnaire.Amenities[section][
          index
        ].response_options = ameniteFilter;
        // Set the updated questionnaireToSend state
        setQuestionaireToSend(updatedQuestionaire);
        sectionStoreQuestionnaireSet(updatedQuestionaire);
      }
    }
  };

  const childInputOnchangeText = (value, data) => {
    const { section, indexOptions } = data;
    const amenitesApiResDataUpdateCheck =
      questionaireToSend?.questionnaire?.Amenities[section][0]?.response_text;

    if (
      amenitesApiResDataUpdateCheck &&
      amenitesApiResDataUpdateCheck.length > 0
    ) {
      // Check if the index exists
      if (amenitesApiResDataUpdateCheck[indexOptions] !== undefined) {
        amenitesApiResDataUpdateCheck[0][indexOptions] = value;
      } else {
        amenitesApiResDataUpdateCheck[0][indexOptions] = value;
      }
      setAmenitesQuestion((prevIndex) => {
        const sections = amenitesApiResDataUpdateCheck;

        const newStateAmeniteQuestion = {
          [section]: sections,
        };

        if (Object.keys(sections).length === 0) {
          delete newStateAmeniteQuestion[section];
        }
        return newStateAmeniteQuestion;
      });
    } else {
      setAmenitesQuestion((prevIndex) => {
        const sections = prevIndex[section] ? { ...prevIndex[section] } : {};
        sections[indexOptions] = value;
        const newStateAmeniteQuestion = {
          ...prevIndex,
          [section]: sections,
        };
        if (Object.keys(sections).length === 0) {
          delete newStateAmeniteQuestion[section];
        }
        return newStateAmeniteQuestion;
      });
    }
  };

  // onchange hide
  const childInputOnchangeHideRes = (value, data) => {
    const { section, indexOptions } = data;
    const amenitesApiResDataUpdateCheck =
      questionaireToSend?.questionnaire?.Amenities[section][0]
        ?.hide_for_reservations;

    if (amenitesApiResDataUpdateCheck.length > 0) {
      const updatehide = JSON.parse(amenitesApiResDataUpdateCheck);
      if (updatehide[indexOptions] == undefined) {
        updatehide[indexOptions] = value;
        setAmenitesHideForReservations((prevIndex) => {
          const sectionName = section; // Assume section is directly available
          const newStateAmeniteQuestion = {
            ...prevIndex,
            [sectionName]: updatehide,
          };
          return newStateAmeniteQuestion;
        });
      } else if (updatehide[indexOptions]) {
        updatehide[indexOptions] = value;
        setAmenitesHideForReservations((prevIndex) => {
          const sectionName = section; // Assume section is directly available
          const newStateAmeniteQuestion = {
            ...prevIndex,
            [sectionName]: updatehide,
          };
          return newStateAmeniteQuestion;
        });
      }
    } else {
      setAmenitesHideForReservations((prevIndex) => {
        const sectionName = section; // Assume section is directly available
        const amenityKey = indexOptions; // Assume indexOptions is the key for the amenity
        // Initialize or retrieve the section object
        const sections = prevIndex[sectionName]
          ? { ...prevIndex[sectionName] }
          : {};

        if (true) {
          // Set the amenity to an empty string if checked
          sections[amenityKey] = value;
        }
        // Update the main state object with the new section object
        const newStateAmeniteQuestion = {
          ...prevIndex,
          [sectionName]: sections,
        };
        // If the section object is empty, remove the section from the main state object
        if (Object.keys(sections).length === 0) {
          delete newStateAmeniteQuestion[sectionName];
        }
        return newStateAmeniteQuestion;
      });
    }
  };

  const inputOnChangeHndle = (event, data) => {
    const { section, index, interFaceInput, question_type } =
      data !== undefined ? data : [];
    let updatedQuestionaire = structuredClone(questionaireToSend);
    if (interFaceInput === InterFaceQuestion) {
      if (question_type === "select") {
        updatedQuestionaire.questionnaire[interFaceInput][section][
          index
        ].response_option = event.target.value;
      } else {
        updatedQuestionaire.questionnaire[interFaceInput][section][
          index
        ].response_text = event.target.value;
      }
    }
    setQuestionaireToSend(updatedQuestionaire);
    sectionStoreQuestionnaireSet(updatedQuestionaire);
  };

  const questionnaireSubmitHndle = (e) => {
    e.preventDefault();
    const questionnaire = { questionnaire: questionaireToSend };
    dispatch(
      updateQuestionnaireActions({
        nameKey: getLocalStorageData,
        formeData: questionnaire,
      })
    );
  };

  //this static code use only model (open model and close model functionality)
  const reservationModelOpen = "reservationModelOpen";
  const selectModelOpen = "selectModelOpen";
  const selectModelClose = "selectModelClose";
  const reservationModelClose = "reservationModelClose";
  const [modelQuestion, setModelQuestion] = useState({
    checkBox: false,
    reservations: false,
    select: false,
  });

  const questionModelOpenHndl = (e, ameniteStatus, type, data) => {
    e.preventDefault();
    if (type === selectModelOpen) {
      setModelQuestion({
        ...modelQuestion,
        select: true,
        CloseType: selectModelClose,
        data,
      });
      AmenitesMainComponentFun(ameniteStatus, data);
    }
  };
  const questionModelCloseHndl = (type) => {
    if (type === selectModelClose) {
      setModelQuestion({
        ...modelQuestion,
        select: false,
      });
    } else if (type === reservationModelClose) {
      setModelQuestion({
        ...modelQuestion,
        reservations: false,
      });
    }
  };

  const questionaListModelOpenHndle = (e, type, data) => {
    e.preventDefault();
    if (type === reservationModelOpen) {
      setModelQuestion({
        ...modelQuestion,
        reservations: true,
        CloseType: reservationModelClose,
        data,
      });
    }
  };

  const modelSubmitBtn = (data) => {
    const { index, section } = data?.data;
    const amenitesApiResDataUpdateCheck =
      questionaireToSend?.questionnaire?.Amenities[section][0]?.response_text;
    const amenitesText =
      amenitesApiResDataUpdateCheck && amenitesApiResDataUpdateCheck.length > 0
        ? amenitesApiResDataUpdateCheck[0]
        : amenitesQuestion?.[section];
    const amenitesHide = amenitesHideForReservations?.[section];
    const updatedQuestionaire = structuredClone(questionaireToSend);
    updatedQuestionaire.questionnaire.Amenities[section][index].response_text =
      amenitesText !== undefined ? [amenitesText] : [];
    updatedQuestionaire.questionnaire.Amenities[section][
      index
    ].hide_for_reservations = [JSON.stringify(amenitesHide)];
    setQuestionaireToSend(updatedQuestionaire);
    sectionStoreQuestionnaireSet(updatedQuestionaire);
  };
  const modelSubmitBtnListExtras = (modelData) => {
    const { data, hideGetArray, textAreaInput } = modelData;
    const { index, interFaceInput, section, question_type } = data;
    const updatedQuestionaire = structuredClone(questionaireToSend);
    if (question_type === "select") {
      updatedQuestionaire.questionnaire[interFaceInput][section][
        index
      ].hide_for_reservations = JSON.stringify(hideGetArray);
      updatedQuestionaire.questionnaire[interFaceInput][section][
        index
      ].response_text = textAreaInput;
    } else {
      updatedQuestionaire.questionnaire[interFaceInput][section][
        index
      ].hide_for_reservations = JSON.stringify(hideGetArray);
    }
    setQuestionaireToSend(updatedQuestionaire);
    sectionStoreQuestionnaireSet(updatedQuestionaire);
  };

  ///
  const [nextFormActive, setNextFormActive] = useState("");
  const [prevesActive, setPrevesActive] = useState("");
  const updateQuestionaireStatus =
    store?.updateQuestionnaireReducer?.updateQuestionnaire?.status;
  const updateQuestionaireLoading = store?.updateQuestionnaireReducer?.loading;
  const updateQuestionnaireMessage =
    store?.updateQuestionnaireReducer?.updateQuestionnaire?.data?.message;
  useEffect(() => {
    let x = section_order?.findIndex((ele) => ele == InterFaceQuestion);
    const oldOption = section_order[x - 1];
    const nextOption = section_order[x + 1];
    setPrevesActive(oldOption);
    setNextFormActive(nextOption);
  }, [InterFaceQuestion]);
  useEffect(() => {
    if (updateQuestionaireStatus === 200) {
      if (nextFormActive !== undefined) {
        prntFuntionHeaderActive(nextFormActive);
      } else {
        navigate("/properties");
        sessionStorage.removeItem(QUESTIONNAIRE_KEY);
      }
      dispatch(updateQuestionnaireEmptyActions());
      ToastHandle(updateQuestionnaireMessage, "success");
    }
  }, [updateQuestionaireStatus]);

  useEffect(() => {
    if (converJsonForm !== null) {
      setQuestionaireToSend(structuredClone(converJsonForm));
    }
  }, []);

  return (
    <>
      {!apiQuestionnaireLoading ? (
        <>
          <form>
            <div>
              {formattedArray?.map((allQuestionKeyValue) => {
                const inputHeadingName = allQuestionKeyValue?.key;
                const AllInput = allQuestionKeyValue?.value;
                return (
                  <>
                    <h1 className="text-white mt-5 fs-4 fw-bold mb-3">
                      {inputHeadingName}
                    </h1>
                    <div className="row">
                      {AllInput?.map((input, inputIndex) => {
                        const question_type = input?.question_type;
                        const short_answer = "short_answer";
                        const select = "select";
                        const checkbox_group = "checkbox_group";
                        const long_answer = "long_answer";
                        const options = input?.options;
                        const question_text = input?.question_text;
                        const placeholder_text = input?.placeholder_text;
                        const response_text = input?.response_text;
                        const hide_for_reservations =
                          input?.hide_for_reservations;

                        const hideForListingDetailExtrs =
                          hide_for_reservations?.length > 0
                            ? hide_for_reservations !== "CURRENT"
                              ? hide_for_reservations !== "FUTURE"
                                ? hide_for_reservations !==
                                  "FUTURE,INQUIRY/PAST,CURRENT"
                                  ? hide_for_reservations !== "INQUIRY/PAST"
                                    ? hide_for_reservations
                                    : "[]"
                                  : "[]"
                                : "[]"
                              : "[]"
                            : "[]";
                        const response_option = input?.response_option;
                        const response_options = input?.response_options;
                        const listingAllData = {
                          section: inputHeadingName,
                          interFaceInput: InterFaceQuestion,
                          index: inputIndex,
                          hideForReservations: hideForListingDetailExtrs,
                          response_text,
                          question_type,
                        };
                        const ActivePencilIconListExtras = () => {
                          let covertToStringArray =
                            hideForListingDetailExtrs !== ""
                              ? JSON.parse(hideForListingDetailExtrs).length > 0
                                ? "#ffc107"
                                : "#146EF5"
                              : "#146EF5";
                          return covertToStringArray;
                        };
                        return (
                          <>
                            {question_type === short_answer ? (
                              <>
                                <div className="col-6 mt-3">
                                  <label className="text-white">
                                    {question_text}
                                    <span>
                                      <button
                                        className="bg-none p-0 border-0 w-auto ms-2"
                                        onClick={(e) => {
                                          questionaListModelOpenHndle(
                                            e,
                                            reservationModelOpen,
                                            listingAllData
                                          );
                                        }}
                                      >
                                        <svg
                                          width="18"
                                          height="18"
                                          viewBox="0 0 18 18"
                                          fill="none"
                                          xmlns="http://www.w3.org/2000/svg"
                                        >
                                          <path
                                            d="M17.71 4.03957C18.1 3.64957 18.1 2.99957 17.71 2.62957L15.37 0.28957C15 -0.10043 14.35 -0.10043 13.96 0.28957L12.12 2.11957L15.87 5.86957M0 14.2496V17.9996H3.75L14.81 6.92957L11.06 3.17957L0 14.2496Z"
                                            fill={ActivePencilIconListExtras()}
                                          ></path>
                                        </svg>
                                      </button>
                                    </span>
                                  </label>
                                  <div className="">
                                    <input
                                      className="bg-dark form-control"
                                      type="text"
                                      value={response_text}
                                      onChange={(e) => {
                                        inputOnChangeHndle(e, listingAllData);
                                      }}
                                    />
                                  </div>
                                </div>
                              </>
                            ) : question_type === select ? (
                              <>
                                {
                                  <div className="col-6 mt-3">
                                    <label className="text-white">
                                      {question_text}{" "}
                                      <span>
                                        <button
                                          className="bg-none p-0 border-0 w-auto ms-2"
                                          onClick={(e) => {
                                            questionaListModelOpenHndle(
                                              e,
                                              reservationModelOpen,
                                              listingAllData
                                            );
                                          }}
                                        >
                                          <svg
                                            width="18"
                                            height="18"
                                            viewBox="0 0 18 18"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                          >
                                            <path
                                              d="M17.71 4.03957C18.1 3.64957 18.1 2.99957 17.71 2.62957L15.37 0.28957C15 -0.10043 14.35 -0.10043 13.96 0.28957L12.12 2.11957L15.87 5.86957M0 14.2496V17.9996H3.75L14.81 6.92957L11.06 3.17957L0 14.2496Z"
                                              fill={ActivePencilIconListExtras()}
                                            ></path>
                                          </svg>
                                        </button>
                                      </span>
                                    </label>
                                    <select
                                      class="form-select form-control"
                                      aria-label="Default select example"
                                      value={response_option}
                                      onChange={(e) => {
                                        inputOnChangeHndle(e, listingAllData);
                                      }}
                                    >
                                      {options?.map((select) => {
                                        return (
                                          <>
                                            <option value={select}>
                                              {select !== ""
                                                ? select
                                                : "Select"}
                                            </option>
                                          </>
                                        );
                                      })}
                                    </select>
                                  </div>
                                }
                              </>
                            ) : question_type === checkbox_group ? (
                              <>
                                <div className="row">
                                  <div className="col-lg-12">
                                    <div>
                                      <div className="col-12">
                                        <div>
                                          <label className="text-white">
                                            {placeholder_text}
                                          </label>
                                        </div>
                                        <ul className="amenties-list">
                                          {options?.map(
                                            (options, indexOptions) => {
                                              const amenitTextRes =
                                                response_text?.map((option) => {
                                                  return option[
                                                    indexOptions
                                                  ] !== undefined
                                                    ? option[indexOptions]
                                                    : "";
                                                });
                                              const ameniteHide =
                                                hide_for_reservations?.map(
                                                  (hide) => {
                                                    const hideForResrvationsRes =
                                                      hide !== ""
                                                        ? hide_for_reservations?.length ===
                                                          1
                                                          ? JSON.parse(hide)
                                                          : ""
                                                        : "";

                                                    return hideForResrvationsRes[
                                                      indexOptions
                                                    ];
                                                  }
                                                );
                                              const amenitesObjec = {
                                                section: inputHeadingName,
                                                interFaceInput:
                                                  InterFaceQuestion,
                                                index: inputIndex,
                                                currentValue: options,
                                                indexOptions,
                                                response_text: amenitTextRes[0],
                                                hide_for_reservations:
                                                  ameniteHide[0],
                                              };
                                              return (
                                                <>
                                                  <li className="amenties-list-item">
                                                    <div
                                                      className={
                                                        response_options.includes(
                                                          options
                                                        )
                                                          ? "form-checkbox bg-light text-dark"
                                                          : "form-checkbox "
                                                      }
                                                    >
                                                      <input
                                                        type="checkbox"
                                                        className="form-check-input"
                                                        checked={response_options.includes(
                                                          options
                                                        )}
                                                        onChange={(e) => {
                                                          AmenitesMainComponentFun(
                                                            e,
                                                            amenitesObjec
                                                          );
                                                        }}
                                                      />
                                                      <label className="form-check-label ">
                                                        {options}
                                                      </label>
                                                      <button
                                                        className="bg-none p-0 border-0 "
                                                        onClick={(e) => {
                                                          questionModelOpenHndl(
                                                            e,
                                                            true,
                                                            selectModelOpen,
                                                            amenitesObjec
                                                          );
                                                        }}
                                                      >
                                                        <svg
                                                          width="18"
                                                          height="18"
                                                          viewBox="0 0 18 18"
                                                          fill="none"
                                                          xmlns="http://www.w3.org/2000/svg"
                                                        >
                                                          <path
                                                            d="M17.71 4.03957C18.1 3.64957 18.1 2.99957 17.71 2.62957L15.37 0.28957C15 -0.10043 14.35 -0.10043 13.96 0.28957L12.12 2.11957L15.87 5.86957M0 14.2496V17.9996H3.75L14.81 6.92957L11.06 3.17957L0 14.2496Z"
                                                            fill={
                                                              (ameniteHide[0] !==
                                                                undefined &&
                                                                ameniteHide[0]
                                                                  .length >
                                                                  0) ||
                                                              (amenitTextRes[0] !==
                                                                undefined &&
                                                                amenitTextRes[0]
                                                                  .length > 0)
                                                                ? "#ffc107"
                                                                : "#146EF5"
                                                            }
                                                          ></path>
                                                        </svg>
                                                      </button>
                                                    </div>
                                                  </li>
                                                </>
                                              );
                                            }
                                          )}
                                        </ul>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </>
                            ) : question_type === long_answer ? (
                              <>
                                <div className="row">
                                  <div className="col-12 mt-4 form-design">
                                    <label className="text-white">
                                      {question_text}
                                      <span>
                                        <button
                                          className="bg-none p-0 border-0 w-auto ms-2"
                                          onClick={(e) => {
                                            questionaListModelOpenHndle(
                                              e,
                                              reservationModelOpen,
                                              listingAllData
                                            );
                                          }}
                                        >
                                          <svg
                                            width="18"
                                            height="18"
                                            viewBox="0 0 18 18"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                          >
                                            <path
                                              d="M17.71 4.03957C18.1 3.64957 18.1 2.99957 17.71 2.62957L15.37 0.28957C15 -0.10043 14.35 -0.10043 13.96 0.28957L12.12 2.11957L15.87 5.86957M0 14.2496V17.9996H3.75L14.81 6.92957L11.06 3.17957L0 14.2496Z"
                                              fill={ActivePencilIconListExtras()}
                                            ></path>
                                          </svg>
                                        </button>
                                      </span>
                                    </label>
                                    <div className="">
                                      <textarea
                                        className="bg-dark form-control"
                                        type="text"
                                        value={response_text}
                                        onChange={(e) => {
                                          inputOnChangeHndle(e, listingAllData);
                                        }}
                                      />
                                    </div>
                                  </div>
                                </div>
                              </>
                            ) : (
                              ""
                            )}
                          </>
                        );
                      })}
                    </div>
                  </>
                );
              })}
              <div className="d-flex justify-content-around my-5">
                <button
                  class="btn btn-primary"
                  onClick={() => prntFuntionHeaderActive(prevesActive)}
                >
                  Previous
                </button>
                <button
                  class="border_theme_btn previous btn btn-primary"
                  onClick={(e) => questionnaireSubmitHndle(e)}
                >
                  {/* Save & Next */}
                  {!updateQuestionaireLoading ? <>Save & Next</> : <Loader />}
                </button>
              </div>{" "}
            </div>
            <ReservationsStageModel
              show={modelQuestion}
              handleClose={questionModelCloseHndl}
              modelSubmitBtnListExtras={modelSubmitBtnListExtras}
            />
            <SelectModelNote
              show={modelQuestion}
              handleClose={questionModelCloseHndl}
              modelSubmitBtn={modelSubmitBtn}
              prentOnChangeTextHndl={(e, data) =>
                childInputOnchangeText(e, data)
              }
              prentOnchangeHideRes={(e, data) =>
                childInputOnchangeHideRes(e, data)
              }
            />
          </form>
        </>
      ) : (
        <BoxLoader />
      )}
    </>
  );
};

export default QuestionnaireForm;
