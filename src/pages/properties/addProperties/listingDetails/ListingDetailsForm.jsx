import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  GetquestionnaireFunction,
  nameKey,
} from "../../../../helper/Authorized";
import { stateEmptyActions, updateQuestionnaireActions } from "../../../../redux/actions";
import Loader, { BoxLoader } from "../../../../helper/Loader";
import ToastHandle from "../../../../helper/ToastMessage";
import { Button, Modal } from "react-bootstrap";
import SelectModalNote from "../extraNoteModal/SelectModalNote";

const ListingDetailsForm = ({ prntFuntionHeaderActive }) => {
  const { id } = useParams();
  const store = useSelector((state) => state);
  const dispatch = useDispatch();

  const [loadingStatus, setLoadingStatus] = useState(false);
  const [show, setShow] = useState(false);
  const [addedNote, setAddedNote] = useState({});
  const [noteClickData, setNoteClickData] = useState({
    question: "",
    name: "",
    value: "",
  });

  const getLocalStorageData = nameKey();

  // to get the updateQuestionaire status
  const updateQuestionaireStatus =
    store?.updateQuestionnaireReducer?.updateQuestionnaire?.status;
    const updateQuestionaireLoading = store?.updateQuestionnaireReducer?.loading;
  const updateQuestionnaireMessage = store?.updateQuestionnaireReducer?.updateQuestionnaire?.data?.message;

  const ExtrasFormCall = GetquestionnaireFunction();
  const { questionnaireApi, apiQuestionnaireLoading } = ExtrasFormCall
    ? ExtrasFormCall
    : [];

  const listingDetailsInputData = questionnaireApi["Listing Details"]
    ? questionnaireApi["Listing Details"]
    : [];
  const Booking = listingDetailsInputData["Booking"];

  const checkInandCheckout = listingDetailsInputData["Check-in and Check-out"];

  const Details = listingDetailsInputData["Details"];

  // to get the complete questionaire object
  const apiQuestionnaireObject =
    store?.getQuestionnaireReducer?.getQuestionnaire?.data;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleClose = () => setShow(false);
  const handleShow = (question, name, value) => {
    setNoteClickData({
      ...noteClickData,
      question: question,
      name: name,
      value: value,
    });
    setShow(true);
  };

  const onSubmit = (data) => {
    console.log("New Form Data: ", data);

    const questionaireToSend = structuredClone(apiQuestionnaireObject);

    if (Booking) {
      Booking[0]["response_text"] =
        data?.booking_short_answer0.trim() === ""
          ? null
          : data?.booking_short_answer0;
      Booking[1]["response_option"] =
        data?.booking_select1.trim() === "" ? null : data?.booking_select1;

      // Add Note Text
      Booking[1]["response_text"] =
        addedNote && "select1_bookingnote" in addedNote
          ? addedNote.select1_bookingnote === ""
            ? null
            : addedNote.select1_bookingnote
          : null;

      Booking[2]["response_option"] =
        data?.booking_select2.trim() === "" ? null : data?.booking_select2;

      // Add Note Text
      Booking[2]["response_text"] =
        addedNote && "select2_bookingnote" in addedNote
          ? addedNote.select2_bookingnote === ""
            ? null
            : addedNote.select2_bookingnote
          : null;

      Booking[3]["response_text"] =
        data?.booking_short_answer3.trim() === ""
          ? null
          : data?.booking_short_answer3;

      Booking[4]["response_text"] =
        data?.booking_short_answer4.trim() === ""
          ? null
          : data?.booking_short_answer4;

      Booking[5]["response_text"] =
        data?.booking_short_answer5.trim() === ""
          ? null
          : data?.booking_short_answer5;
      Booking[6]["response_option"] =
        data?.booking_select6.trim() === "" ? null : data?.booking_select6;

      // Add Note Text
      Booking[6]["response_text"] =
        addedNote && "select6_bookingnote" in addedNote
          ? addedNote.select6_bookingnote === ""
            ? null
            : addedNote.select6_bookingnote
          : null;
    }

    if (checkInandCheckout) {
      checkInandCheckout[0]["response_text"] =
        data?.checkInOut_short_answer0.trim() === ""
          ? null
          : data?.checkInOut_short_answer0;
      checkInandCheckout[1]["response_text"] =
        data?.checkInOut_short_answer1.trim() === ""
          ? null
          : data?.checkInOut_short_answer1;
      checkInandCheckout[2]["response_text"] =
        data?.checkInOut_short_answer2.trim() === ""
          ? null
          : data?.checkInOut_short_answer2;
      checkInandCheckout[3]["response_text"] =
        data?.checkInOut_long_answer3.trim() === ""
          ? null
          : data?.checkInOut_long_answer3;
      checkInandCheckout[4]["response_text"] =
        data?.checkInOut_short_answer4.trim() === ""
          ? null
          : data?.checkInOut_short_answer4;
      checkInandCheckout[5]["response_text"] =
        data?.checkInOut_short_answer5.trim() === ""
          ? null
          : data?.checkInOut_short_answer5;
      checkInandCheckout[6]["response_text"] =
        data?.checkInOut_long_answer6.trim() === ""
          ? null
          : data?.checkInOut_long_answer6;
      checkInandCheckout[7]["response_text"] =
        data?.checkInOut_long_answer7.trim() === ""
          ? null
          : data?.checkInOut_long_answer7;
      checkInandCheckout[8]["response_text"] =
        data?.checkInOut_long_answer8.trim() === ""
          ? null
          : data?.checkInOut_long_answer8;
      checkInandCheckout[9]["response_text"] =
        data?.checkInOut_short_answer9.trim() === ""
          ? null
          : data?.checkInOut_short_answer9;
      checkInandCheckout[10]["response_text"] =
        data?.checkInOut_short_answer10.trim() === ""
          ? null
          : data?.checkInOut_short_answer10;
    }

    if (Details) {
      Details[0]["response_text"] =
        data?.details_short_answer0.trim() === ""
          ? null
          : data?.details_short_answer0;
      Details[1]["response_text"] =
        data?.details_short_answer1.trim() === ""
          ? null
          : data?.details_short_answer1;
      Details[2]["response_text"] =
        data?.details_short_answer2.trim() === ""
          ? null
          : data?.details_short_answer2;
      Details[3]["response_text"] =
        data?.details_short_answer3.trim() === ""
          ? null
          : data?.details_short_answer3;
      Details[4]["response_text"] =
        data?.details_short_answer4.trim() === ""
          ? null
          : data?.details_short_answer4;
      Details[5]["response_text"] =
        data?.details_short_answer5.trim() === ""
          ? null
          : data?.details_short_answer5;
      Details[6]["response_text"] =
        data?.details_long_answer6.trim() === ""
          ? null
          : data?.details_long_answer6;
      Details[7]["response_text"] =
        data?.details_short_answer7.trim() === ""
          ? null
          : data?.details_short_answer7;
      Details[8]["response_text"] =
        data?.details_short_answer8.trim() === ""
          ? null
          : data?.details_short_answer8;
      Details[9]["response_text"] =
        data?.details_short_answer9.trim() === ""
          ? null
          : data?.details_short_answer9;
      Details[10]["response_text"] =
        data?.details_short_answer10.trim() === ""
          ? null
          : data?.details_short_answer10;
      Details[11]["response_text"] =
        data?.details_long_answer11.trim() === ""
          ? null
          : data?.details_long_answer11;
      Details[12]["response_text"] =
        data?.details_long_answer12.trim() === ""
          ? null
          : data?.details_long_answer12;
    }

    questionaireToSend["questionnaire"]["questionnaire"]["Listing Details"][
      "Booking"
    ] = Booking;

    questionaireToSend["questionnaire"]["questionnaire"]["Listing Details"][
      "Check-in and Check-out"
    ] = checkInandCheckout;

    questionaireToSend["questionnaire"]["questionnaire"]["Listing Details"][
      "Details"
    ] = Details;

    dispatch(
      updateQuestionnaireActions({
        nameKey: getLocalStorageData,
        formeData: questionaireToSend,
      })
    );

    setLoadingStatus(true);
  };

  useEffect(() => {
    if (updateQuestionaireStatus === 200) {
      if (loadingStatus) {
        ToastHandle(updateQuestionnaireMessage, "success");
        prntFuntionHeaderActive(id !== undefined && "amenities");
        dispatch(stateEmptyActions());
        setLoadingStatus(false);
      }
    }
  }, [updateQuestionaireStatus, loadingStatus]);

  console.log("addedNote: ", addedNote);

  return (
    <>
      {show && (
        <SelectModalNote
          show={show}
          handleClose={handleClose}
          noteClickData={noteClickData}
          addedNote={addedNote}
          setAddedNote={setAddedNote}
        />
      )}

      {!apiQuestionnaireLoading ? (
        <div className="form-design">
          <h1 className="text-white mb-3 fs-4 fw-bold">Booking</h1>
          <div className="row my-3">
            {Booking?.map((booking, index) => {
              const selectOption = booking?.options;
              return (
                <>
                  {booking?.question_type === "select" ? (
                    <>
                      <div className="col-6 mt-3">
                        <label className="text-white">
                          {booking?.question_text}
                          <Button
                            style={{ width: "auto" }}
                            onClick={() =>
                              handleShow(
                                booking.question_text,
                                `${booking.question_type}${index}_bookingnote`,
                                booking.response_text
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
                                fill="#146EF5
                           "
                              ></path>
                            </svg>
                          </Button>
                        </label>
                        <select
                          class="form-select form-control"
                          aria-label="Default select example"
                          {...register(
                            `booking_${booking.question_type}${index}`
                          )}
                          defaultValue={booking.response_option} // Set defaultValue to item.response_option
                        >
                          {selectOption?.map((options, optionIndex) => {
                            return (
                              <>
                                <option
                                  key={optionIndex}
                                  value={options}
                                  selected={options === booking.response_option}
                                >
                                  {options}
                                </option>
                              </>
                            );
                          })}
                        </select>
                      </div>
                    </>
                  ) : (
                    <div className="col-6 mt-3">
                      <label className="text-white">
                        {booking?.question_text}
                      </label>
                      <div className="">
                        <input
                          className="bg-dark form-control"
                          type="text"
                          {...register(
                            `booking_${booking.question_type}${index}`
                          )}
                          placeholder={booking?.placeholder_text}
                          defaultValue={booking?.response_text}
                        />
                      </div>
                    </div>
                  )}
                </>
              );
            })}
          </div>

          <h1 className="text-white mb-3 fs-4 fw-bold mt-5">
            Check-in and Check-out
          </h1>
          <div className="row my-3">
            {checkInandCheckout?.map((checkInandCheckout, index) => {
              return (
                <>
                  <div className="col-6 mt-3">
                    <label className="text-white">
                      {checkInandCheckout?.question_text}
                    </label>
                    <div className="">
                      <input
                        className="bg-dark form-control"
                        type="text"
                        {...register(
                          `checkInOut_${checkInandCheckout.question_type}${index}`
                        )}
                        placeholder={checkInandCheckout?.placeholder_text}
                        defaultValue={checkInandCheckout?.response_text}
                      />
                    </div>
                  </div>
                </>
              );
            })}
          </div>

          <h1 className="text-white mb-3 fs-4 fw-bold mt-5">Details</h1>
          <div className="row my-3">
            {Details?.map((details, index) => {
              return (
                <>
                  <div className="col-6 mt-3">
                    <label className="text-white">
                      {details?.question_text}
                    </label>
                    <div className="">
                      <input
                        className="bg-dark form-control"
                        type="text"
                        {...register(
                          `details_${details.question_type}${index}`
                        )}
                        placeholder={details?.placeholder_text}
                        defaultValue={details?.response_text}
                      />
                    </div>
                  </div>
                </>
              );
            })}
          </div>

          <div className="d-flex justify-content-around my-5">
            <button class="btn btn-primary">Previous</button>

            <button
              class="border_theme_btn previous"
              onClick={handleSubmit(
                (data) => {
                  onSubmit(data);
                },
                (err) => {
                  console.log(err, "ee");
                }
              )}
            >
              {!updateQuestionaireLoading?<>Save & Next</>:<Loader/>}
            
            </button>
          </div>
        </div>
      ) : (
        <BoxLoader />
      )}
    </>
  );
};

export default ListingDetailsForm;
