import React, { useState } from "react";
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

  const inputOnChangeHndle = (event, data) => {
    const { section, index, interFaceInput } = data !== undefined ? data : [];
    const { questionData, hideGetArray } = event;
    const comonentCheckInterFace = questionData?.conponentCheck;
    const sections = questionData?.sections;
    const indexs = questionData?.indexs;
    const selectOptionDefult = event?.selectOptionDefult;
    const responseOptionInput = event?.response_option;
    let updatedQuestionaire = structuredClone(questionaireToSend);
    if (comonentCheckInterFace === listingDetailsInput) {
      updatedQuestionaire["questionnaire"]["Listing Details"][sections][indexs][
        "hide_for_reservations"
      ] = hideGetArray.length > 0 ? JSON.stringify(hideGetArray) : "";
      if (selectOptionDefult === "selectOption") {
        updatedQuestionaire["questionnaire"]["Listing Details"][sections][
          indexs
        ]["response_option"] = responseOptionInput;
      }
    } else {
      updatedQuestionaire["questionnaire"]["Listing Details"][section][index][
        "response_text"
      ] = event.target.value;
    }
    setQuestionaireToSend(updatedQuestionaire);
  };

  console.log(questionaireToSend, "1010questionaireToSend101");
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

  // model functionality 
  const onlyCheckSelectAmenitesUsed = "onlyCheckSelectAmenitesUsed";
  const checkBoxModelOpen = "checkBoxModelOpen";
  const reservationModelOpen = "reservationModelOpen";
  const selectModelOpen = "selectModelOpen";
  const checkBoxModelClose = "checkBoxModelClose";
  const reservationModelClose = "reservationModelClose";
  const selectModelClose = "selectModelClose";
  const listingDetailsInput = "listingDetailsInput";
  const extrasInputInterFace = "extrasInputInterFace";
  const [modelQuestion, setModelQuestion] = useState({
    checkBox: false,
    reservations: false,
    select: false,
  });

  const questionModelOpenHndl = (e, type, data) => {
    e.preventDefault();
    const { listingAllData, amenitesAllData, ExtrasAllData } = data;
    if (type === checkBoxModelOpen) {
      setModelQuestion({
        ...modelQuestion,
        checkBox: true,
        CloseType: checkBoxModelClose,
        amenitesData: amenitesAllData,
      });
      if (amenitesAllData?.onlyCheckSelect === onlyCheckSelectAmenitesUsed) {
        const { currentInputValue, sections, indexs, iconCheckSelect } =
          amenitesAllData;
        // amenitiesOnchangesHndle(
        //   iconCheckSelect,
        //   sections,
        //   indexs,
        //   currentInputValue
        // );
      }
    } else if (type === selectModelOpen) {
      setModelQuestion({
        ...modelQuestion,
        select: true,
        CloseType: selectModelClose,
        questionData: listingAllData,
      });
    } else if (type === reservationModelOpen) {
      setModelQuestion({
        ...modelQuestion,
        reservations: true,
        CloseType: reservationModelClose,
        questionData:
          listingAllData !== undefined ? listingAllData : ExtrasAllData,
      });
    }
  };
  const questionModelCloseHndl = (type) => {
    if (type === checkBoxModelClose) {
      setModelQuestion({
        ...modelQuestion,
        checkBox: false,
      });
    } else if (type === selectModelClose) {
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

  const modelSubmitBtn = (data) => {
    const { questionData } = data;
    const comonentCheckInterFace = questionData?.conponentCheck;
    if (comonentCheckInterFace === listingDetailsInput) {
      inputOnChangeHndle(data);
    } else if (comonentCheckInterFace === extrasInputInterFace) {
      // questionModelOpenHndl(data);
    }
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
                                    {options?.map((options) => {
                                      return (
                                        <>
                                          <li className="amenties-list-item">
                                            <div
                                              className="form-checkbox bg-light text-dark"
                                            >
                                              <input
                                                type="checkbox"
                                                className="form-check-input"
                                              />
                                              <label className="form-check-label">
                                                {options}
                                              </label>
                                              <button className="bg-none p-0 border-0">
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
                                  <button
                                    className="bg-none p-0 border-0 w-auto ms-2"
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
                                <textarea
                                  className="bg-dark form-control"
                                  type="text"
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
      />
    </form>
  );
};

export default QuestionnaireForm;
