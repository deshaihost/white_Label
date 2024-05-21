import React, { useEffect, useState } from "react";
import {
  GetquestionnaireFunction,
  nameKey,
} from "../../../../helper/Authorized";
import { useDispatch, useSelector } from "react-redux";
import { updateQuestionnaireActions } from "../../../../redux/actions";
import CheckBoxModelNote from "./modelQuestion/CheckBoxModelNote";
import Loader from "../../../../helper/Loader";
import SelectModelNote from "./modelQuestion/SelectModelNote";
import ReservationsStageModel from "./modelQuestion/ReservationsStageModel";
const QuestionnaireInput = ({ interFaceActiveQuestionnarie }) => {
  const store = useSelector((state) => state);
  const dispatch = useDispatch();
  const updateQuestionaireLoading = store?.updateQuestionnaireReducer?.loading;

  const getLocalStorageData = nameKey();
  const listingDetails = "Listing Details";
  const amenities = "Amenities";
  const extras = "Extras";
  const InterFaceQuestion = interFaceActiveQuestionnarie.trim();
  const ExtrasFormCall = GetquestionnaireFunction();
  const { metadata, apiQuestionnaireData } = ExtrasFormCall
    ? ExtrasFormCall
    : [];
  const [questionaireToSend, setQuestionaireToSend] = useState(
    structuredClone(apiQuestionnaireData)
  );
  const allQuestionnaireUpdateState = questionaireToSend?.questionnaire;

  // section item in metaData
  const { subsection_order } = metadata ? metadata : [];
  const subsectionOrder = subsection_order ? subsection_order : [];
  const AmenitiesSubsetion = subsectionOrder["Amenities"];
  const ExtrasSubsection = subsectionOrder["Extras"];
  const listingDetailsSubsection = subsectionOrder["Listing Details"];
  // section item in metaData
  // questionnaire get key
  // const questionnaireApiGet = questionnaireApi ? questionnaireApi : [];
  const questionnaireApiGet = allQuestionnaireUpdateState
    ? allQuestionnaireUpdateState
    : [];

  const Amenities = questionnaireApiGet["Amenities"];
  const Extras = questionnaireApiGet["Extras"];
  const ListingDetails = questionnaireApiGet["Listing Details"];
  // questionnaire get key
  // all model functionality
  const [modelQuestion, setModelQuestion] = useState({
    checkBox: false,
    reservations: false,
    select: false,
  });
  const checkBoxModelOpen = "checkBoxModelOpen";
  const reservationModelOpen = "reservationModelOpen";
  const selectModelOpen = "selectModelOpen";
  const checkBoxModelClose = "checkBoxModelClose";
  const reservationModelClose = "reservationModelClose";
  const selectModelClose = "selectModelClose";
  const listingDetailsInput = "listingDetailsInput";
  const extrasInputInterFace = "extrasInputInterFace";

  // all model functionality

  //onChange input key get in api

  // listing Details functinality
  // const ListquestionaireToSend = structuredClone(apiQuestionnaireData);
  // const [listingquestionaireToSend, setListingQuestionaireToSend] = useState(
  //   structuredClone(apiQuestionnaireData)
  // );

  const listingDetailsOnchangeHndle = (event, question, index) => {
    const { questionData, hideGetArray } = event;
    const comonentCheckInterFace = questionData?.conponentCheck;
    const sections = questionData?.sections;
    const indexs = questionData?.indexs;
    const selectOptionDefult = event?.selectOptionDefult;
    const responseOptionInput = event?.responseOptionInput;
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
      updatedQuestionaire["questionnaire"]["Listing Details"][question][index][
        "response_text"
      ] = event.target.value;
    }
    setQuestionaireToSend(updatedQuestionaire);
  };

  const listingDetailsOnSubmitHnlde = () => {
    const questionnaire = { questionnaire: questionaireToSend };
    dispatch(
      updateQuestionnaireActions({
        nameKey: getLocalStorageData,
        formeData: questionnaire,
      })
    );
  };
  // listing Details functinality

  // functinality amenities check box
  // const [questionaireToSend, setQuestionaireToSend] = useState(
  //   structuredClone(apiQuestionnaireData)
  // );
  const [amenitesSelect, setAmenitesSelect] = useState({
    response_textAmenites: [],
    hide_for_reservations: [],
    respnse_optionsAmenitesIndoor: [],
    respnse_optionsAmenitesOutdoor: [],
    respnse_optionsAmenitesFamily: [],
    respnse_optionsAmenitesMore: [],
    respnse_optionsAmenitesRulesAndServ: [],
  });
  const Indoor = "Indoor";
  const Outdoor = "Outdoor";
  const Family = "Family";
  const More = "More";
  const RulesAndServices = "Rules and Services";

  const amenitiesOnchangesHndle = (e, amenites, index, checkHeading) => {
    const statusAmenites = e !== true ? e.target.checked : e;
    let updatedResponseOptions;
    let updatedQuestionaire = structuredClone(questionaireToSend);
    if (statusAmenites) {
      if (amenites.trim() === Indoor) {
        updatedResponseOptions = {
          ...amenitesSelect,
          respnse_optionsAmenitesIndoor: [
            ...amenitesSelect.respnse_optionsAmenitesIndoor,
            checkHeading,
          ],
        };
        updatedQuestionaire.questionnaire.Amenities[amenites][
          index
        ].response_options =
          updatedResponseOptions.respnse_optionsAmenitesIndoor;
      } else if (amenites.trim() === Outdoor) {
        updatedResponseOptions = {
          ...amenitesSelect,
          respnse_optionsAmenitesOutdoor: [
            ...amenitesSelect.respnse_optionsAmenitesOutdoor,
            checkHeading,
          ],
        };
        updatedQuestionaire.questionnaire.Amenities[amenites][
          index
        ].response_options =
          updatedResponseOptions.respnse_optionsAmenitesOutdoor;
      } else if (amenites.trim() === Family) {
        updatedResponseOptions = {
          ...amenitesSelect,
          respnse_optionsAmenitesFamily: [
            ...amenitesSelect.respnse_optionsAmenitesFamily,
            checkHeading,
          ],
        };
        updatedQuestionaire.questionnaire.Amenities[amenites][
          index
        ].response_options =
          updatedResponseOptions.respnse_optionsAmenitesFamily;
      } else if (amenites.trim() === More) {
        updatedResponseOptions = {
          ...amenitesSelect,
          respnse_optionsAmenitesMore: [
            ...amenitesSelect.respnse_optionsAmenitesMore,
            checkHeading,
          ],
        };
        updatedQuestionaire.questionnaire.Amenities[amenites][
          index
        ].response_options = updatedResponseOptions.respnse_optionsAmenitesMore;
      } else if (amenites.trim() === RulesAndServices.trim()) {
        updatedResponseOptions = {
          ...amenitesSelect,
          respnse_optionsAmenitesRulesAndServ: [
            ...amenitesSelect.respnse_optionsAmenitesRulesAndServ,
            checkHeading,
          ],
        };
        updatedQuestionaire.questionnaire.Amenities[amenites][
          index
        ].response_options =
          updatedResponseOptions.respnse_optionsAmenitesRulesAndServ;
      }
    } else {
      if (amenites.trim() === Indoor) {
        updatedResponseOptions = {
          ...amenitesSelect,
          respnse_optionsAmenitesIndoor:
            amenitesSelect.respnse_optionsAmenitesIndoor.filter(
              (amenitess) => amenitess.trim() !== checkHeading.trim()
            ),
        };
        updatedQuestionaire.questionnaire.Amenities[amenites][
          index
        ].response_options =
          updatedResponseOptions.respnse_optionsAmenitesIndoor;
      } else if (amenites.trim() === Outdoor) {
        updatedResponseOptions = {
          ...amenitesSelect,
          respnse_optionsAmenitesOutdoor:
            amenitesSelect.respnse_optionsAmenitesOutdoor.filter(
              (amenitess) => amenitess.trim() !== checkHeading.trim()
            ),
        };
        updatedQuestionaire.questionnaire.Amenities[amenites][
          index
        ].response_options =
          updatedResponseOptions.respnse_optionsAmenitesOutdoor;
      } else if (amenites.trim() === Family) {
        updatedResponseOptions = {
          ...amenitesSelect,
          respnse_optionsAmenitesFamily:
            amenitesSelect.respnse_optionsAmenitesFamily.filter(
              (amenitess) => amenitess.trim() !== checkHeading.trim()
            ),
        };
        updatedQuestionaire.questionnaire.Amenities[amenites][
          index
        ].response_options =
          updatedResponseOptions.respnse_optionsAmenitesFamily;
      } else if (amenites.trim() === More) {
        updatedResponseOptions = {
          ...amenitesSelect,
          respnse_optionsAmenitesMore:
            amenitesSelect.respnse_optionsAmenitesMore.filter(
              (amenitess) => amenitess.trim() !== checkHeading.trim()
            ),
        };
        updatedQuestionaire.questionnaire.Amenities[amenites][
          index
        ].response_options = updatedResponseOptions.respnse_optionsAmenitesMore;
      } else if (amenites.trim() === RulesAndServices.trim()) {
        updatedResponseOptions = {
          ...amenitesSelect,
          respnse_optionsAmenitesRulesAndServ:
            amenitesSelect.respnse_optionsAmenitesRulesAndServ.filter(
              (amenitess) => amenitess.trim() !== checkHeading.trim()
            ),
        };
        updatedQuestionaire.questionnaire.Amenities[amenites][
          index
        ].response_options =
          updatedResponseOptions.respnse_optionsAmenitesRulesAndServ;
      }
    }
    setAmenitesSelect(updatedResponseOptions);
    setQuestionaireToSend(updatedQuestionaire);
  };

  const amenitiesOnSubmitHnalde = () => {
    const questionnaire = { questionnaire: questionaireToSend };
    dispatch(
      updateQuestionnaireActions({
        nameKey: getLocalStorageData,
        formeData: questionnaire,
      })
    );
  };
  // update input value set
  const familyResponse_options =
    Amenities && Amenities["Family"] && Amenities["Family"][0]
      ? Amenities["Family"][0].response_options
      : [];

  const indoorResponse_options =
    Amenities && Amenities["Indoor"] && Amenities["Indoor"][0]
      ? Amenities["Indoor"][0].response_options
      : [];
  const MoreResponse_options =
    Amenities && Amenities["More"] && Amenities["More"][0]
      ? Amenities["More"][0].response_options
      : [];
  const OutdoorResponse_options =
    Amenities && Amenities["Outdoor"] && Amenities["Outdoor"][0]
      ? Amenities["Outdoor"][0].response_options
      : [];
  const RulesAndServicesResponse_options =
    Amenities &&
    Amenities["Rules and Services"] &&
    Amenities["Rules and Services"][0]
      ? Amenities["Rules and Services"][0].response_options
      : [];

  useEffect(() => {
    setAmenitesSelect({
      ...amenitesSelect,
      response_optionsAmenites: [],
      response_textAmenites: [],
      hide_for_reservations: [],
      respnse_optionsAmenitesIndoor: indoorResponse_options,
      respnse_optionsAmenitesOutdoor: OutdoorResponse_options,
      respnse_optionsAmenitesFamily: familyResponse_options,
      respnse_optionsAmenitesMore: MoreResponse_options,
      respnse_optionsAmenitesRulesAndServ: RulesAndServicesResponse_options,
    });
  }, [
    indoorResponse_options,
    familyResponse_options,
    MoreResponse_options,
    OutdoorResponse_options,
    RulesAndServicesResponse_options,
  ]);
  // update input value set
  // functinality amenities check box

  //extras functionality input

  const extrasOnchangeHndle = (event, extras, index) => {
    const { questionData, hideGetArray } = event;
    const comonentCheckInterFace = questionData?.conponentCheck;
    const sections = questionData?.sections;
    const indexs = questionData?.indexs;
    let updatedQuestionaire = structuredClone(questionaireToSend);
    if (comonentCheckInterFace === extrasInputInterFace) {
      updatedQuestionaire["questionnaire"]["Extras"][sections][indexs][
        "hide_for_reservations"
      ] = hideGetArray.length > 0 ? JSON.stringify(hideGetArray) : "";
    } else {
      updatedQuestionaire["questionnaire"]["Extras"][extras][index][
        "response_text"
      ] = event.target.value;
    }
    setQuestionaireToSend(updatedQuestionaire);
  };

  const extrasOnSubmitHnlde = () => {
    const questionnaire = { questionnaire: questionaireToSend };
    dispatch(
      updateQuestionnaireActions({
        nameKey: getLocalStorageData,
        formeData: questionnaire,
      })
    );
  };

  //mode handle
  const onlyCheckSelectAmenitesUsed = "onlyCheckSelectAmenitesUsed";
  const questionModelOpenHndl = (type, data) => {
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
        amenitiesOnchangesHndle(
          iconCheckSelect,
          sections,
          indexs,
          currentInputValue
        );
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
      listingDetailsOnchangeHndle(data);
    } else if (comonentCheckInterFace === extrasInputInterFace) {
      extrasOnchangeHndle(data);
    }
  };

  return (
    <div className="text-white">
      <div>
        {InterFaceQuestion === listingDetails.trim() ? (
          <>
            {listingDetailsSubsection?.map((listingDetail) => {
              return (
                <>
                  <div className="form-design">
                    <h1 className="text-white mt-5 fs-4 fw-bold mb-3">
                      {listingDetail}
                    </h1>
                    <div className="row">
                      <div className="col-lg-12">
                        <div className="row">
                          {ListingDetails[listingDetail]?.map(
                            (listingInput, listingInputIndex) => {
                              const question_text = listingInput?.question_text;
                              const selecter = listingInput?.question_type;
                              const placeholder_text =
                                listingInput?.placeholder_text;
                              const options = listingInput?.options;
                              const inputValue = listingInput?.response_text;
                              const hideForReservations =
                                listingInput?.hide_for_reservations;
                              const response_option =
                                listingInput?.response_option;

                              const modelOpenAllDataGetAndSendListing = {
                                listingAllData: {
                                  sections: listingDetail,
                                  indexs: listingInputIndex,
                                  conponentCheck: listingDetailsInput,
                                  hideForReservations,
                                  response_option,
                                },
                              };
                              return (
                                <>
                                  {selecter === "select" ? (
                                    <div className="col-6 mt-3">
                                      <label className="text-white">
                                        {question_text}
                                        <span>
                                          <button
                                            className="bg-none p-0 border-0 w-auto ms-2"
                                            onClick={() => {
                                              questionModelOpenHndl(
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
                                        defaultValue={inputValue}
                                        onChange={(e) => {
                                          listingDetailsOnchangeHndle(
                                            e,
                                            listingDetail,
                                            listingInputIndex
                                          );
                                        }}
                                      >
                                        {options?.map((options) => {
                                          return (
                                            <>
                                              <option value={options}>
                                                {options !== ""
                                                  ? options
                                                  : "Select"}
                                              </option>
                                            </>
                                          );
                                        })}
                                      </select>
                                    </div>
                                  ) : (
                                    <div className="col-6 mt-3">
                                      <label className="text-white">
                                        {question_text}
                                        <span>
                                          <button
                                            className="bg-none p-0 border-0 w-auto ms-2"
                                            onClick={() => {
                                              questionModelOpenHndl(
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
                                          placeholder={placeholder_text}
                                          defaultValue={inputValue}
                                          onChange={(e) => {
                                            listingDetailsOnchangeHndle(
                                              e,
                                              listingDetail,
                                              listingInputIndex
                                            );
                                          }}
                                        />
                                      </div>
                                    </div>
                                  )}
                                </>
                              );
                            }
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              );
            })}
            <div className="d-flex justify-content-around my-5">
              <button class="btn btn-primary">Previous</button>
              <button
                class="border_theme_btn previous btn btn-primary"
                onClick={listingDetailsOnSubmitHnlde}
              >
                {!updateQuestionaireLoading ? <>Save & Next</> : <Loader />}
              </button>
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
          </>
        ) : InterFaceQuestion === amenities.trim() ? (
          <>
            {AmenitiesSubsetion.map((ameniti) => {
              const activeAmeniti = ameniti;
              return (
                <React.Fragment key={ameniti}>
                  <h1 className="text-white mt-5 fs-4 fw-bold mb-3">
                    {ameniti}
                  </h1>
                  <div className="row">
                    <div className="col-lg-12">
                      <div>
                        {Amenities[ameniti]?.map((checkHeading, checkIndex) => {
                          const options = checkHeading?.options;
                          const activeAmenitesFun = (type) => {
                            if (activeAmeniti.trim() === Indoor) {
                              return amenitesSelect.respnse_optionsAmenitesIndoor.includes(
                                type
                              );
                            } else if (activeAmeniti.trim() === Outdoor) {
                              return amenitesSelect.respnse_optionsAmenitesOutdoor.includes(
                                type
                              );
                            } else if (activeAmeniti.trim() === Family) {
                              return amenitesSelect.respnse_optionsAmenitesFamily.includes(
                                type
                              );
                            } else if (activeAmeniti.trim() === More) {
                              return amenitesSelect.respnse_optionsAmenitesMore.includes(
                                type
                              );
                            } else if (
                              activeAmeniti.trim() === RulesAndServices.trim()
                            ) {
                              return amenitesSelect.respnse_optionsAmenitesRulesAndServ.includes(
                                type
                              );
                            }
                          };

                          return (
                            <div className="col-12" key={checkIndex}>
                              <div>
                                <label className="text-white">
                                  {checkHeading?.placeholder_text}
                                </label>
                              </div>
                              <ul className="amenties-list">
                                {options?.map((opteion, optIndex) => {
                                  const modelOpenAllDataGetAndSendAmenites = {
                                    amenitesAllData: {
                                      iconCheckSelect: true,
                                      sections: ameniti,
                                      indexs: 0,
                                      currentInputValue: opteion,
                                      onlyCheckSelect:
                                        onlyCheckSelectAmenitesUsed,
                                    },
                                  };
                                  return (
                                    <li
                                      className="amenties-list-item"
                                      key={optIndex}
                                    >
                                      <div
                                        className={
                                          activeAmenitesFun(opteion)
                                            ? "form-checkbox bg-light text-dark"
                                            : "form-checkbox "
                                        }
                                      >
                                        <input
                                          type="checkbox"
                                          className="form-check-input"
                                          checked={activeAmenitesFun(opteion)}
                                          onChange={(e) =>
                                            amenitiesOnchangesHndle(
                                              e,
                                              ameniti,
                                              0,
                                              opteion
                                            )
                                          }
                                        />
                                        <label className="form-check-label">
                                          {opteion}
                                        </label>
                                        <button
                                          className="bg-none p-0 border-0"
                                          onClick={() => {
                                            questionModelOpenHndl(
                                              checkBoxModelOpen,
                                              modelOpenAllDataGetAndSendAmenites
                                              // true,
                                              // ameniti,
                                              // 0,
                                              // opteion,
                                              // checkBoxModelOpen,
                                              // "amenities"
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
                                  );
                                })}
                              </ul>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </React.Fragment>
              );
            })}
            <div className="d-flex justify-content-around my-5">
              <button class="btn btn-primary">Previous</button>
              <button
                class="border_theme_btn previous btn btn-primary"
                onClick={amenitiesOnSubmitHnalde}
              >
                {!updateQuestionaireLoading ? <>Save & Next</> : <Loader />}
              </button>
            </div>
            <CheckBoxModelNote
              show={modelQuestion}
              handleClose={questionModelCloseHndl}
            />
          </>
        ) : InterFaceQuestion === extras.trim() ? (
          <>
            {ExtrasSubsection?.map((extras) => {
              return (
                <>
                  <h1 className="text-white mt-5 fs-4 fw-bold mb-3">
                    {extras}
                  </h1>
                  <div className="row">
                    {Extras[extras]?.map((extrasInput, extrasIndex) => {
                      const hide_for_reservations =
                        extrasInput?.hide_for_reservations;
                      const modelOpenAllDataGetAndSendExtras = {
                        ExtrasAllData: {
                          sections: extras,
                          indexs: extrasIndex,
                          conponentCheck: extrasInputInterFace,
                          hideForReservations: hide_for_reservations,
                        },
                      };

                      return (
                        <>
                          <div className="col-12 mt-4 form-design">
                            <label className="text-white">
                              {extrasInput?.question_text}
                              <span>
                                <button
                                  className="bg-none p-0 border-0 w-auto ms-2"
                                  onClick={() => {
                                    questionModelOpenHndl(
                                      reservationModelOpen,
                                      modelOpenAllDataGetAndSendExtras
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
                              <textarea
                                className="bg-dark form-control"
                                type="text"
                                defaultValue={extrasInput?.response_text}
                                onChange={(e) => {
                                  extrasOnchangeHndle(e, extras, extrasIndex);
                                }}
                                placeholder={extrasInput?.placeholder_text}
                              />
                            </div>
                          </div>
                        </>
                      );
                    })}
                    <div className="d-flex justify-content-around my-5">
                      <button class="btn btn-primary">Previous</button>
                      <button
                        class="border_theme_btn previous btn btn-primary"
                        onClick={extrasOnSubmitHnlde}
                      >
                        {!updateQuestionaireLoading ? (
                          <>Save & Next</>
                        ) : (
                          <Loader />
                        )}
                      </button>
                    </div>
                  </div>
                </>
              );
            })}
            <ReservationsStageModel
              show={modelQuestion}
              handleClose={questionModelCloseHndl}
              modelSubmitBtn={modelSubmitBtn}
            />
          </>
        ) : (
          "No Questionnaire"
        )}
      </div>
    </div>
  );
};

export default QuestionnaireInput;
