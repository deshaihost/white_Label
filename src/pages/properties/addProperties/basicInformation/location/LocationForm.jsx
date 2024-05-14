import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  stateEmptyActions,
  updateQuestionnaireActions,
} from "../../../../../redux/actions";
import {
  GetquestionnaireFunction,
  nameKey,
} from "../../../../../helper/Authorized";
import Loader, { BoxLoader } from "../../../../../helper/Loader";
import { Button } from "react-bootstrap";
import ToastHandle from "../../../../../helper/ToastMessage";
import SelectModalNote from "../../extraNoteModal/SelectModalNote";
import ReservationStageModal from "../../extraNoteModal/ReservationStageModal";

const LocationForm = ({
  prntFuntionHeaderActive,
  updateImageHndle,
  imageOnchageCheck,
}) => {
  const { id } = useParams();
  const [loadingStatus, setLoadingStatus] = useState(false);
  const [show, setShow] = useState(false);
  const [showReservation, setShowReservation] = useState(false);
  const [addedNote, setAddedNote] = useState({});
  const [noteClickData, setNoteClickData] = useState({
    question: "",
    name: "",
    value: "",
  });
  const [reservationClickData, setReservationClickData] = useState({
    name: "",
    value: "",
  });
const prentImageOnchangeCheckInput=imageOnchageCheck?.propertyOnchangecheck
  const handleClose = () => setShow(false);
  const handleReservationClose = () => setShowReservation(false);
  const handleShow = (question, name, value, hideName, hideValue) => {
    setNoteClickData({
      ...noteClickData,
      question: question,
      name: name,
      value: value,
    });

    setReservationClickData({
      ...reservationClickData,
      name: hideName,
      value: hideValue,
    });

    setShow(true);
  };

  // button click handle for without not data
  const handleHideReservationShow = (name, value) => {
    setReservationClickData({
      ...reservationClickData,
      name: name,
      value: value,
    });
    setShowReservation(true);
  };

  const store = useSelector((state) => state);
  const dispatch = useDispatch();
  const getLocalStorageData = nameKey();
  const ExtrasFormCall = GetquestionnaireFunction();

  // to get the updateQuestionaire status
  const updateQuestionaireStatus =
    store?.updateQuestionnaireReducer?.updateQuestionnaire?.status;
  const updateQuestionaireLoading = store?.updateQuestionnaireReducer?.loading;
  const updateQuestionnaireMessage =
    store?.updateQuestionnaireReducer?.updateQuestionnaire?.data?.message;

  // to get the complete questionaire object
  const apiQuestionnaireObject =
    store?.getQuestionnaireReducer?.getQuestionnaire?.data;
  // to get the questionaire for the property

  const { questionnaireApi, apiQuestionnaireLoading } = ExtrasFormCall
    ? ExtrasFormCall
    : [];
  const locationFildInput = questionnaireApi["Basics"]?.["Location"];

  const [responseOptions, setResponseOptions] = useState({});
  const [responseTexts, setResponseTexts] = useState({});

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm();

  // When the API data comes in, update responseOptions and responseTexts for all of our questions
  useEffect(() => {
    const responseOptions = {};
    const responseTexts = {};
    locationFildInput?.forEach((item, index) => {
      responseTexts[`${item.question_type}${index}`] = item.response_text;
      if (item.question_type === "select") {
        responseOptions[`${item.question_type}${index}`] = item.response_option;
      }
    });
    setResponseOptions(responseOptions);
    setResponseTexts(responseTexts);

    // Need to use setValue to update the form value when the API data comes in, otherwise it wont be recognized by React (even though it's in the component)
    locationFildInput?.forEach((item, index) => {
      if (item.question_type === "select") {
        setValue(
          `${item.question_type}${index}`,
          responseOptions[`${item.question_type}${index}`]
        );
      } else {
        setValue(
          `${item.question_type}${index}`,
          responseTexts[`${item.question_type}${index}`]
        );
      }
    });
  }, [locationFildInput]);

  // For select questions, when a new option is selected, update the response_option in the state and the component
  const [inputChangesCheck, setInputChangesCheck] = useState(false);
  const handleSelectChange = (event, type) => {
    setInputChangesCheck(type);
    setResponseOptions({
      ...responseOptions,
      [event.target.name]: event.target.value,
    });
  };

  // For text questions, when a new value is entered, update the response_text in the state and the component
  const handleTextChange = (event, type) => {
    setInputChangesCheck(type);
    setResponseTexts({
      ...responseTexts,
      [event.target.name]: event.target.value,
    });
  };
  const onSubmit = (data) => {
    //if (inputChangesCheck) { // disable for now, because it's not recognizing changes to extra note or to reservation stages
    if (true) {
      updateImageHndle();
      // console.log("addedNote data: ", addedNote)
      // return
      const questionaireToSend = structuredClone(apiQuestionnaireObject);

      if (
        questionnaireApi["Basics"] &&
        questionnaireApi["Basics"]["Location"]
      ) {
        // select value updation
        questionaireToSend["questionnaire"]["questionnaire"]["Basics"][
          "Location"
        ][0]["response_option"] = data?.select0;

        questionaireToSend["questionnaire"]["questionnaire"]["Basics"][
          "Location"
        ][0]["response_text"] =
          addedNote && "select0_note" in addedNote
            ? addedNote.select0_note === ""
              ? null
              : addedNote.select0_note
            : null;

        if (addedNote && "select0_hidereservation" in addedNote) {
          questionaireToSend["questionnaire"]["questionnaire"]["Basics"][
            "Location"
          ][0]["hide_for_reservations"] =
            addedNote?.select0_hidereservation ?? "";
        }

        questionaireToSend["questionnaire"]["questionnaire"]["Basics"][
          "Location"
        ][1]["response_text"] = data?.short_answer1;

        if (addedNote && "short_answer1_hidereservation" in addedNote) {
          questionaireToSend["questionnaire"]["questionnaire"]["Basics"][
            "Location"
          ][1]["hide_for_reservations"] =
            addedNote?.short_answer1_hidereservation ?? "";
          // addedNote && "short_answer1_hidereservation" in addedNote
          //   ? addedNote?.short_answer1_hidereservation ?? ""
          //   : "";
        }

        questionaireToSend["questionnaire"]["questionnaire"]["Basics"][
          "Location"
        ][2]["response_text"] = data?.short_answer2;

        if (addedNote && "short_answer2_hidereservation" in addedNote) {
          questionaireToSend["questionnaire"]["questionnaire"]["Basics"][
            "Location"
          ][2]["hide_for_reservations"] =
            addedNote?.short_answer2_hidereservation ?? "";
        }

        questionaireToSend["questionnaire"]["questionnaire"]["Basics"][
          "Location"
        ][3]["response_text"] = data?.short_answer3;

        if (addedNote && "short_answer3_hidereservation" in addedNote) {
          questionaireToSend["questionnaire"]["questionnaire"]["Basics"][
            "Location"
          ][3]["hide_for_reservations"] =
            addedNote?.short_answer3_hidereservation ?? "";
        }

        questionaireToSend["questionnaire"]["questionnaire"]["Basics"][
          "Location"
        ][4]["response_text"] = data?.short_answer4;

        if (addedNote && "short_answer4_hidereservation" in addedNote) {
          questionaireToSend["questionnaire"]["questionnaire"]["Basics"][
            "Location"
          ][4]["hide_for_reservations"] =
            addedNote?.short_answer4_hidereservation ?? "";
        }

        questionaireToSend["questionnaire"]["questionnaire"]["Basics"][
          "Location"
        ][5]["response_text"] = data?.short_answer5;

        if (addedNote && "short_answer5_hidereservation" in addedNote) {
          questionaireToSend["questionnaire"]["questionnaire"]["Basics"][
            "Location"
          ][5]["hide_for_reservations"] =
            addedNote?.short_answer5_hidereservation ?? "";
        }

        questionaireToSend["questionnaire"]["questionnaire"]["Basics"][
          "Location"
        ][6]["response_text"] = data?.short_answer6;

        if (addedNote && "short_answer6_hidereservation" in addedNote) {
          questionaireToSend["questionnaire"]["questionnaire"]["Basics"][
            "Location"
          ][6]["hide_for_reservations"] =
            addedNote?.short_answer6_hidereservation ?? "";
        }
      }

      dispatch(
        updateQuestionnaireActions({
          nameKey: getLocalStorageData,
          formeData: questionaireToSend,
        })
      );

      setLoadingStatus(true);
    } else {
      prntFuntionHeaderActive(id !== undefined && "supportingDoc");
    }
  };

  useEffect(() => {
    if (updateQuestionaireStatus === 200) {
      if (loadingStatus) {
        ToastHandle(updateQuestionnaireMessage, "success");
        prntFuntionHeaderActive(id !== undefined && "supportingDoc");
        dispatch(stateEmptyActions());
        setLoadingStatus(false);
      }
    } else {
      setLoadingStatus(false);
    }
  }, [updateQuestionaireStatus]);

  useEffect(()=>{
    if(prentImageOnchangeCheckInput){
      setInputChangesCheck(prentImageOnchangeCheckInput)
    }
    
  },[prentImageOnchangeCheckInput])

  return (
    <>
      {show && (
        <SelectModalNote
          show={show}
          handleClose={handleClose}
          noteClickData={noteClickData}
          reservationClickData={reservationClickData}
          addedNote={addedNote}
          setAddedNote={setAddedNote}
        />
      )}

      {showReservation && (
        <ReservationStageModal
          show={showReservation}
          handleClose={handleReservationClose}
          reservationClickData={reservationClickData}
          addedNote={addedNote}
          setAddedNote={setAddedNote}
        />
      )}

      {!apiQuestionnaireLoading ? (
        <div>
          <form
            onSubmit={handleSubmit(
              (data) => {
                onSubmit(data);
              },
              (err) => {
                console.log(err, "ee");
              }
            )}
          >
            <div>
              <h3 className="text-white fw-bold mb-3 mt-4 fs-4">Location</h3>
            </div>
            <div className="row">
              {locationFildInput?.slice(0, 8).map((item, index) => (
                <div
                  key={index}
                  className={` mt-4 col-${index % 2 === 0 ? "6" : "6"}`}
                >
                  {item.question_type === "select" ? (
                    <>
                      <label className="text-white">
                        {item.question_text}
                        <Button
                          style={{ width: "auto" }}
                          onClick={() =>
                            handleShow(
                              item.question_text,
                              `${item.question_type}${index}_note`,
                              item.response_text,
                              `${item.question_type}${index}_hidereservation`,
                              item.hide_for_reservations
                            )
                          }
                          className="bg-none p-0 border-0 d-inline shadow-none"
                        >
                          <svg
                            className="ms-2"
                            style={{ maxWidth: "16px" }}
                            width="18"
                            height="18"
                            viewBox="0 0 18 18"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M17.71 4.03957C18.1 3.64957 18.1 2.99957 17.71 2.62957L15.37 0.28957C15 -0.10043 14.35 -0.10043 13.96 0.28957L12.12 2.11957L15.87 5.86957M0 14.2496V17.9996H3.75L14.81 6.92957L11.06 3.17957L0 14.2496Z"
                              fill={`${
                                (addedNote &&
                                  `${item.question_type}${index}_hidereservation` in
                                    addedNote &&
                                  addedNote[
                                    `${item.question_type}${index}_hidereservation`
                                  ].length > 0) ||
                                ((!addedNote ||
                                  !(
                                    `${item.question_type}${index}_hidereservation` in
                                    addedNote
                                  )) &&
                                  item.hide_for_reservations.length > 0)
                                  ? "#ffc107"
                                  : "#146EF5"
                              }`}

                              // fill={`${item.hide_for_reservations.length > 0 ? '#ffeb3b' : '#146EF5'}`}
                            ></path>
                          </svg>
                        </Button>
                      </label>
                      <select
                        className="form-select form-control"
                        {...register(`${item.question_type}${index}`)}
                        // value={responseOptions[`${item.question_type}${index}`]} // controlled by React Hook Form
                        onChange={(e) => handleSelectChange(e, true)}
                      >
                        {item.options.map((option, optionIndex) => (
                          <option
                            key={optionIndex}
                            value={option}
                            selected={option === item.response_option}
                          >
                            {option}
                          </option>
                        ))}
                      </select>
                    </>
                  ) : (
                    <div>
                      <label className="text-white">{item.question_text}</label>
                      <Button
                        style={{ width: "auto" }}
                        onClick={() =>
                          handleHideReservationShow(
                            // item.question_text,
                            `${item.question_type}${index}_hidereservation`,
                            item.hide_for_reservations
                          )
                        }
                        className="bg-none p-0 border-0 d-inline shadow-none"
                      >
                        <svg
                          className="ms-2"
                          style={{ maxWidth: "16px" }}
                          width="18"
                          height="18"
                          viewBox="0 0 18 18"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M17.71 4.03957C18.1 3.64957 18.1 2.99957 17.71 2.62957L15.37 0.28957C15 -0.10043 14.35 -0.10043 13.96 0.28957L12.12 2.11957L15.87 5.86957M0 14.2496V17.9996H3.75L14.81 6.92957L11.06 3.17957L0 14.2496Z"
                            fill={`${
                              (addedNote &&
                                `${item.question_type}${index}_hidereservation` in
                                  addedNote &&
                                addedNote[
                                  `${item.question_type}${index}_hidereservation`
                                ].length > 0) ||
                              ((!addedNote ||
                                !(
                                  `${item.question_type}${index}_hidereservation` in
                                  addedNote
                                )) &&
                                item.hide_for_reservations.length > 0)
                                ? "#ffc107"
                                : "#146EF5"
                            }`}

                            // fill={`${item.hide_for_reservations.length > 0 ? '#ffeb3b' : '#146EF5'}`}
                          ></path>
                        </svg>
                      </Button>

                      <input
                        type="text"
                        className="form-control"
                        {...register(`${item.question_type}${index}`)}
                        placeholder={item.placeholder_text}
                        value={responseTexts[`${item.question_type}${index}`]}
                        onChange={(e) => handleTextChange(e, true)}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="col-md-12 text-center">
              <button className="mt-5">
                {" "}
                {!updateQuestionaireLoading ? <>Save & Next</> : <Loader />}
              </button>
            </div>
          </form>
        </div>
      ) : (
        <BoxLoader />
      )}
    </>
  );
};

export default LocationForm;
