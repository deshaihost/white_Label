import React, { useEffect, useState } from "react";
import {
  GetquestionnaireFunction,
  nameKey,
} from "../../../../../helper/Authorized";
import { updateQuestionnaireActions } from "../../../../../redux/actions";
import { useDispatch } from "react-redux";
import SelectModelNote from "../modelQuestion/SelectModelNote";
import ReservationsStageModel from "../modelQuestion/ReservationsStageModel";

const QuestionnaireForm = ({ InterFaceQuestion }) => {
  const dispatch = useDispatch();
  const getLocalStorageData = nameKey();

  const ExtrasFormCall = GetquestionnaireFunction();
  const { apiQuestionnaireData } = ExtrasFormCall ? ExtrasFormCall : [];
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
  const [amenitesArray, setAmenitesArray] = useState(questionnaire?.Amenities);
  const [amenitesQuestion, setAmenitesQuestion] = useState({});
  const [amenitesHideForReservations, setAmenitesHideForReservations] =
    useState({});

  const AmenitesMainComponentFun = (checked, data) => {
    const { currentValue, index, section } = data;
    if (amenitesMachingKey.includes(section)) {
      setAmenitesArray((prevState) => {
        const sectionArray = prevState[section] ? [...prevState[section]] : [];

        const updatedArray = checked
          ? [...sectionArray, currentValue]
          : sectionArray.filter((value) => value !== currentValue);

        // If updatedArray is empty after removal, delete the section key from the state
        const newState = { ...prevState, [section]: updatedArray };
        if (updatedArray.length === 0) {
          delete newState[section];
        }

        // Update response options and questionnaire inside the setAmenitesArray callback
        const updatedResponseOptions = {
          ...newState, // Use newState instead of amenitesArray
          [section]: updatedArray, // Use updatedArray instead of prevState[section]
        };

        // Deep clone the questionnaireToSend object
        const updatedQuestionaire = structuredClone(questionaireToSend);
        updatedQuestionaire.questionnaire.Amenities[section][
          index
        ].response_options = updatedResponseOptions[[section]];
        // Set the updated questionnaireToSend state
        setQuestionaireToSend(updatedQuestionaire);
        console.log(
          updatedResponseOptions[[section]],
          "formation",
          amenitesArray
        );
        return newState;
      });
    }
  };

  // onchange question
  const childInputOnchangeText = (value, data) => {
    const { section, indexOptions } = data;
    setAmenitesQuestion((prevIndex) => {
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
  };
  // onchange hide
  const childInputOnchangeHideRes = (value, data) => {
    const { section, indexOptions } = data;
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
  };
  const inputOnChangeHndle = (event, data) => {
    const { section, index, interFaceInput } = data !== undefined ? data : [];
    let updatedQuestionaire = structuredClone(questionaireToSend);
    if (interFaceInput === InterFaceQuestion) {
      updatedQuestionaire["questionnaire"][interFaceInput][section][index][
        "response_text"
      ] = event.target.value;
    }
    if (interFaceInput === InterFaceQuestion) {
      const statusAmenites = event.target.checked;
      AmenitesMainComponentFun(statusAmenites, data);
    }
    setQuestionaireToSend(updatedQuestionaire);
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
  const listingDetailsInput = "listingDetailsInput";
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
    }
  };

  const modelSubmitBtn = (data) => {
    const { index, section } = data?.data;
    const amenitesText = amenitesQuestion?.[section];
    const amenitesHide = amenitesHideForReservations?.[section];
    const updatedQuestionaire = structuredClone(questionaireToSend);
    updatedQuestionaire.questionnaire.Amenities[section][index].response_text =
      amenitesText !== undefined ? [amenitesText] : [];
    updatedQuestionaire.questionnaire.Amenities[section][
      index
    ].hide_for_reservations = [JSON.stringify(amenitesHide)];
    setQuestionaireToSend(updatedQuestionaire);
  };

  return (
    <form>
      <div>
        {formattedArray?.map((allQuestionKeyValue) => {
          const inputHeadingName = allQuestionKeyValue?.key;
          const AllInput = allQuestionKeyValue?.value;
          return (
            <>
              <h1 className="text-white mt-5 fs-4 fw-bold mb-3">
                {/* {ameniti} */}
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
                  const hide_for_reservations = input?.hide_for_reservations;
                  const response_option = input?.response_option;
                  const response_options = input?.response_options;
                  const questionUpdateInputdataSendOnchange = {
                    section: inputHeadingName,
                    interFaceInput: InterFaceQuestion,
                    index: inputIndex,
                  };
                  const modelOpenAllDataGetAndSendListing = {
                    listingAllData: {
                      sections: inputHeadingName,
                      indexs: inputIndex,
                      conponentCheck: listingDetailsInput,
                      hideForReservations: hide_for_reservations,
                      response_option,
                      interFaceInput: InterFaceQuestion,
                    },
                  };
                  return (
                    //   <>inputt</>
                    <>
                      {question_type === short_answer ? (
                        <>
                          <div className="col-6 mt-3">
                            <label className="text-white">
                              {/* dfdfdfdf */}
                              {question_text}
                              <span>
                                <button
                                  className="bg-none p-0 border-0 w-auto ms-2"
                                  onClick={(e) => {
                                    questionModelOpenHndl(
                                      e,
                                      reservationModelOpen,
                                      modelOpenAllDataGetAndSendListing
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
                                      fill="#146EF5"
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
                                  inputOnChangeHndle(
                                    e,
                                    questionUpdateInputdataSendOnchange
                                  );
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
                                      questionModelOpenHndl(
                                        e,
                                        selectModelOpen,
                                        modelOpenAllDataGetAndSendListing
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
                                        fill="#146EF5"
                                      ></path>
                                    </svg>
                                  </button>
                                </span>
                              </label>
                              <select
                                class="form-select form-control"
                                aria-label="Default select example"
                                value={response_text}
                                onChange={(e) => {
                                  inputOnChangeHndle(
                                    e,
                                    questionUpdateInputdataSendOnchange
                                  );
                                }}
                              >
                                {options?.map((select) => {
                                  return (
                                    <>
                                      <option value={select}>
                                        {select !== "" ? select : "Select"}
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
                                    {options?.map((options, indexOptions) => {
                                      const amenitTextRes = response_text?.map(
                                        (option) => {
                                          return option[indexOptions];
                                        }
                                      );
                                      const ameniteHide =
                                        hide_for_reservations?.map((hide) => {
                                          const hideForResrvationsRes =
                                            JSON.parse(hide);
                                          console.log(
                                            hideForResrvationsRes,
                                            "hkkkhide"
                                          );
                                          return hideForResrvationsRes[
                                            indexOptions
                                          ];
                                        });
                                      const amenitesObjec = {
                                        section: inputHeadingName,
                                        interFaceInput: InterFaceQuestion,
                                        index: inputIndex,
                                        currentValue: options,
                                        indexOptions,
                                        response_text: amenitTextRes[0],
                                        hide_for_reservations: ameniteHide[0],
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
                                              <label className="form-check-label">
                                                {options}
                                              </label>
                                              <button
                                                className="bg-none p-0 border-0"
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
                                                    fill="#146EF5"
                                                  ></path>
                                                </svg>
                                              </button>
                                            </div>
                                          </li>
                                        </>
                                      );
                                    })}
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
                                  <button className="bg-none p-0 border-0 w-auto ms-2">
                                    <svg
                                      width="18"
                                      height="18"
                                      viewBox="0 0 18 18"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        d="M17.71 4.03957C18.1 3.64957 18.1 2.99957 17.71 2.62957L15.37 0.28957C15 -0.10043 14.35 -0.10043 13.96 0.28957L12.12 2.11957L15.87 5.86957M0 14.2496V17.9996H3.75L14.81 6.92957L11.06 3.17957L0 14.2496Z"
                                        fill="#146EF5"
                                      ></path>
                                    </svg>
                                  </button>
                                </span>
                              </label>
                              <div className="">
                                <textarea
                                  className="bg-dark form-control"
                                  type="text"
                                  // value={response_text}
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
          <button class="btn btn-primary">Previous</button>
          <button
            class="border_theme_btn previous btn btn-primary"
            onClick={(e) => questionnaireSubmitHndle(e)}
          >
            Save & Next
            {/* {!updateQuestionaireLoading ? <>Save & Next</> : <Loader />} */}
          </button>
        </div>{" "}
      </div>
      <ReservationsStageModel
        show={modelQuestion}
        handleClose={questionModelCloseHndl}
        modelSubmitBtn={modelSubmitBtn}
      />
      <SelectModelNote
        show={modelQuestion}
        handleClose={questionModelCloseHndl}
        modelSubmitBtn={modelSubmitBtn}
        prentOnChangeTextHndl={(e, data) => childInputOnchangeText(e, data)}
        prentOnchangeHideRes={(e, data) => childInputOnchangeHideRes(e, data)}
      />
    </form>
  );
};

export default QuestionnaireForm;
