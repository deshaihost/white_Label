import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  GetquestionnaireFunction,
  nameKey,
} from "../../../../helper/Authorized";
import {
  stateEmptyActions,
  updateQuestionnaireActions,
} from "../../../../redux/actions";
import Loader, { BoxLoader } from "../../../../helper/Loader";
import ToastHandle from "../../../../helper/ToastMessage";
import { Button, Modal } from "react-bootstrap";
import SelectModalNote from "../extraNoteModal/SelectModalNote";
import ReservationStageModal from "../extraNoteModal/ReservationStageModal";

const ListingDetailsForm = ({ prntFuntionHeaderActive }) => {
  const { id } = useParams();
  const store = useSelector((state) => state);
  const dispatch = useDispatch();

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

  const getLocalStorageData = nameKey();

  // to get the updateQuestionaire status
  const updateQuestionaireStatus =
    store?.updateQuestionnaireReducer?.updateQuestionnaire?.status;
  const updateQuestionaireLoading = store?.updateQuestionnaireReducer?.loading;
  const updateQuestionnaireMessage =
    store?.updateQuestionnaireReducer?.updateQuestionnaire?.data?.message;

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
  const [inputChangesCheck, setInputChangesCheck] = useState(false);
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

  const onSubmit = (data) => {
    // return
    //if (inputChangesCheck) { // disable for now, because it's not recognizing changes to extra note or to reservation stages
    if (true) {
      const questionaireToSend = structuredClone(apiQuestionnaireObject);

      if (Booking) {
        Booking[0]["response_text"] =
          data?.booking_short_answer0.trim() === ""
            ? null
            : data?.booking_short_answer0;
  
        if (addedNote && "booking_short_answer0_hidereservation" in addedNote) {
          Booking[0]["hide_for_reservations"] =
            addedNote?.booking_short_answer0_hidereservation ?? "";
        }
  
        Booking[1]["response_option"] =
          data?.booking_select1.trim() === "" ? null : data?.booking_select1;
  
        // Add Note Text
        Booking[1]["response_text"] =
          addedNote && "select1_bookingnote" in addedNote
            ? addedNote.select1_bookingnote === ""
              ? null
              : addedNote.select1_bookingnote
            : null;
  
        if (addedNote && "booking_select1_hidereservation" in addedNote) {
          Booking[1]["hide_for_reservations"] =
            addedNote?.booking_select1_hidereservation ?? "";
        }
  
        Booking[2]["response_option"] =
          data?.booking_select2.trim() === "" ? null : data?.booking_select2;
  
        // Add Note Text
        Booking[2]["response_text"] =
          addedNote && "select2_bookingnote" in addedNote
            ? addedNote.select2_bookingnote === ""
              ? null
              : addedNote.select2_bookingnote
            : null;
  
        if (addedNote && "booking_select2_hidereservation" in addedNote) {
          Booking[2]["hide_for_reservations"] =
            addedNote?.booking_select2_hidereservation ?? "";
        }
  
        Booking[3]["response_text"] =
          data?.booking_short_answer3.trim() === ""
            ? null
            : data?.booking_short_answer3;
  
        if (addedNote && "booking_short_answer3_hidereservation" in addedNote) {
          Booking[3]["hide_for_reservations"] =
            addedNote?.booking_short_answer3_hidereservation ?? "";
        }
  
        Booking[4]["response_text"] =
          data?.booking_short_answer4.trim() === ""
            ? null
            : data?.booking_short_answer4;
  
        if (addedNote && "booking_short_answer4_hidereservation" in addedNote) {
          Booking[4]["hide_for_reservations"] =
            addedNote?.booking_short_answer4_hidereservation ?? "";
        }
  
        Booking[5]["response_text"] =
          data?.booking_short_answer5.trim() === ""
            ? null
            : data?.booking_short_answer5;
  
        if (addedNote && "booking_short_answer5_hidereservation" in addedNote) {
          Booking[5]["hide_for_reservations"] =
            addedNote?.booking_short_answer5_hidereservation ?? "";
        }
  
        Booking[6]["response_option"] =
          data?.booking_select6.trim() === "" ? null : data?.booking_select6;
  
        // Add Note Text
        Booking[6]["response_text"] =
          addedNote && "select6_bookingnote" in addedNote
            ? addedNote.select6_bookingnote === ""
              ? null
              : addedNote.select6_bookingnote
            : null;
  
        if (addedNote && "booking_select6_hidereservation" in addedNote) {
          Booking[6]["hide_for_reservations"] =
            addedNote?.booking_select6_hidereservation ?? "";
        }
      }
  
      if (checkInandCheckout) {
        checkInandCheckout[0]["response_text"] =
          data?.checkInOut_short_answer0.trim() === ""
            ? null
            : data?.checkInOut_short_answer0;
  
        if (
          addedNote &&
          "checkInOut_short_answer0_hidereservation" in addedNote
        ) {
          checkInandCheckout[0]["hide_for_reservations"] =
            addedNote?.checkInOut_short_answer0_hidereservation ?? "";
        }
  
        checkInandCheckout[1]["response_text"] =
          data?.checkInOut_short_answer1.trim() === ""
            ? null
            : data?.checkInOut_short_answer1;
  
        if (
          addedNote &&
          "checkInOut_short_answer1_hidereservation" in addedNote
        ) {
          checkInandCheckout[1]["hide_for_reservations"] =
            addedNote?.checkInOut_short_answer1_hidereservation ?? "";
        }
  
        checkInandCheckout[2]["response_text"] =
          data?.checkInOut_short_answer2.trim() === ""
            ? null
            : data?.checkInOut_short_answer2;
  
        if (
          addedNote &&
          "checkInOut_short_answer2_hidereservation" in addedNote
        ) {
          checkInandCheckout[2]["hide_for_reservations"] =
            addedNote?.checkInOut_short_answer2_hidereservation ?? "";
        }
        checkInandCheckout[3]["response_text"] =
          data?.checkInOut_long_answer3.trim() === ""
            ? null
            : data?.checkInOut_long_answer3;
  
        if (addedNote && "checkInOut_long_answer3_hidereservation" in addedNote) {
          checkInandCheckout[3]["hide_for_reservations"] =
            addedNote?.checkInOut_long_answer3_hidereservation ?? "";
        }
        checkInandCheckout[4]["response_text"] =
          data?.checkInOut_short_answer4.trim() === ""
            ? null
            : data?.checkInOut_short_answer4;
  
        if (
          addedNote &&
          "checkInOut_short_answer4_hidereservation" in addedNote
        ) {
          checkInandCheckout[4]["hide_for_reservations"] =
            addedNote?.checkInOut_short_answer4_hidereservation ?? "";
        }
        checkInandCheckout[5]["response_text"] =
          data?.checkInOut_short_answer5.trim() === ""
            ? null
            : data?.checkInOut_short_answer5;
  
        if (
          addedNote &&
          "checkInOut_short_answer5_hidereservation" in addedNote
        ) {
          checkInandCheckout[5]["hide_for_reservations"] =
            addedNote?.checkInOut_short_answer5_hidereservation ?? "";
        }
        checkInandCheckout[6]["response_text"] =
          data?.checkInOut_long_answer6.trim() === ""
            ? null
            : data?.checkInOut_long_answer6;
  
        if (addedNote && "checkInOut_long_answer6_hidereservation" in addedNote) {
          checkInandCheckout[6]["hide_for_reservations"] =
            addedNote?.checkInOut_long_answer6_hidereservation ?? "";
        }
        checkInandCheckout[7]["response_text"] =
          data?.checkInOut_long_answer7.trim() === ""
            ? null
            : data?.checkInOut_long_answer7;
  
        if (addedNote && "checkInOut_long_answer7_hidereservation" in addedNote) {
          checkInandCheckout[7]["hide_for_reservations"] =
            addedNote?.checkInOut_long_answer7_hidereservation ?? "";
        }
        checkInandCheckout[8]["response_text"] =
          data?.checkInOut_long_answer8.trim() === ""
            ? null
            : data?.checkInOut_long_answer8;
  
        if (addedNote && "checkInOut_long_answer8_hidereservation" in addedNote) {
          checkInandCheckout[8]["hide_for_reservations"] =
            addedNote?.checkInOut_long_answer8_hidereservation ?? "";
        }
        checkInandCheckout[9]["response_text"] =
          data?.checkInOut_short_answer9.trim() === ""
            ? null
            : data?.checkInOut_short_answer9;
  
        if (
          addedNote &&
          "checkInOut_short_answer9_hidereservation" in addedNote
        ) {
          checkInandCheckout[9]["hide_for_reservations"] =
            addedNote?.checkInOut_short_answer9_hidereservation ?? "";
        }
        checkInandCheckout[10]["response_text"] =
          data?.checkInOut_short_answer10.trim() === ""
            ? null
            : data?.checkInOut_short_answer10;
  
        if (
          addedNote &&
          "checkInOut_short_answer10_hidereservation" in addedNote
        ) {
          checkInandCheckout[10]["hide_for_reservations"] =
            addedNote?.checkInOut_short_answer10_hidereservation ?? "";
        }
      }
  
      if (Details) {
        Details[0]["response_text"] =
          data?.details_short_answer0.trim() === ""
            ? null
            : data?.details_short_answer0;
  
        if (addedNote && "details_short_answer0_hidereservation" in addedNote) {
          Details[0]["hide_for_reservations"] =
            addedNote?.details_short_answer0_hidereservation ?? "";
        }
  
        Details[1]["response_text"] =
          data?.details_short_answer1.trim() === ""
            ? null
            : data?.details_short_answer1;
  
        if (addedNote && "details_short_answer1_hidereservation" in addedNote) {
          Details[1]["hide_for_reservations"] =
            addedNote?.details_short_answer1_hidereservation ?? "";
        }
  
        Details[2]["response_text"] =
          data?.details_short_answer2.trim() === ""
            ? null
            : data?.details_short_answer2;
  
        if (addedNote && "details_short_answer2_hidereservation" in addedNote) {
          Details[2]["hide_for_reservations"] =
            addedNote?.details_short_answer2_hidereservation ?? "";
        }
  
        Details[3]["response_text"] =
          data?.details_short_answer3.trim() === ""
            ? null
            : data?.details_short_answer3;
  
        if (addedNote && "details_short_answer3_hidereservation" in addedNote) {
          Details[3]["hide_for_reservations"] =
            addedNote?.details_short_answer3_hidereservation ?? "";
        }
  
        Details[4]["response_text"] =
          data?.details_short_answer4.trim() === ""
            ? null
            : data?.details_short_answer4;
  
        if (addedNote && "details_short_answer4_hidereservation" in addedNote) {
          Details[4]["hide_for_reservations"] =
            addedNote?.details_short_answer4_hidereservation ?? "";
        }
  
        Details[5]["response_text"] =
          data?.details_short_answer5.trim() === ""
            ? null
            : data?.details_short_answer5;
  
        if (addedNote && "details_short_answer5_hidereservation" in addedNote) {
          Details[5]["hide_for_reservations"] =
            addedNote?.details_short_answer5_hidereservation ?? "";
        }
  
        Details[6]["response_text"] =
          data?.details_long_answer6.trim() === ""
            ? null
            : data?.details_long_answer6;
  
        if (addedNote && "details_long_answer6_hidereservation" in addedNote) {
          Details[6]["hide_for_reservations"] =
            addedNote?.details_long_answer6_hidereservation ?? "";
        }
  
        Details[7]["response_text"] =
          data?.details_short_answer7.trim() === ""
            ? null
            : data?.details_short_answer7;
  
        if (addedNote && "details_short_answer7_hidereservation" in addedNote) {
          Details[7]["hide_for_reservations"] =
            addedNote?.details_short_answer7_hidereservation ?? "";
        }
  
        Details[8]["response_text"] =
          data?.details_short_answer8.trim() === ""
            ? null
            : data?.details_short_answer8;
  
        if (addedNote && "details_short_answer8_hidereservation" in addedNote) {
          Details[8]["hide_for_reservations"] =
            addedNote?.details_short_answer8_hidereservation ?? "";
        }
  
        Details[9]["response_text"] =
          data?.details_short_answer9.trim() === ""
            ? null
            : data?.details_short_answer9;
  
        if (addedNote && "details_short_answer9_hidereservation" in addedNote) {
          Details[9]["hide_for_reservations"] =
            addedNote?.details_short_answer9_hidereservation ?? "";
        }
  
        Details[10]["response_text"] =
          data?.details_short_answer10.trim() === ""
            ? null
            : data?.details_short_answer10;
  
        if (addedNote && "details_short_answer10_hidereservation" in addedNote) {
          Details[10]["hide_for_reservations"] =
            addedNote?.details_short_answer10_hidereservation ?? "";
        }
  
        Details[11]["response_text"] =
          data?.details_long_answer11.trim() === ""
            ? null
            : data?.details_long_answer11;
  
        if (addedNote && "details_long_answer11_hidereservation" in addedNote) {
          Details[11]["hide_for_reservations"] =
            addedNote?.details_long_answer11_hidereservation ?? "";
        }
  
        Details[12]["response_text"] =
          data?.details_long_answer12.trim() === ""
            ? null
            : data?.details_long_answer12;
  
        if (addedNote && "details_long_answer12_hidereservation" in addedNote) {
          Details[12]["hide_for_reservations"] =
            addedNote?.details_long_answer12_hidereservation ?? "";
        }
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
    }else {
      prntFuntionHeaderActive(id !== undefined && "amenities");
    }
   
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
                                booking.response_text,
                                `booking_${booking.question_type}${index}_hidereservation`,
                                booking.hide_for_reservations
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
                                // fill="#146EF5"
                                fill={`${
                                  (addedNote &&
                                    `booking_${booking.question_type}${index}_hidereservation` in
                                      addedNote &&
                                    addedNote[
                                      `booking_${booking.question_type}${index}_hidereservation`
                                    ].length > 0) ||
                                  ((!addedNote ||
                                    !(
                                      `booking_${booking.question_type}${index}_hidereservation` in
                                      addedNote
                                    )) &&
                                    booking.hide_for_reservations.length > 0)
                                    ? "#ffc107"
                                    : "#146EF5"
                                }`}
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
                          onChange={() => {
                            setInputChangesCheck(true);
                          }}
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
                        <Button
                          style={{ width: "auto" }}
                          onClick={() =>
                            handleHideReservationShow(
                              // booking.question_text,
                              `booking_${booking.question_type}${index}_hidereservation`,
                              booking.hide_for_reservations
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
                              // fill="#ffeb3b"
                              fill={`${
                                (addedNote &&
                                  `booking_${booking.question_type}${index}_hidereservation` in
                                    addedNote &&
                                  addedNote[
                                    `booking_${booking.question_type}${index}_hidereservation`
                                  ].length > 0) ||
                                ((!addedNote ||
                                  !(
                                    `booking_${booking.question_type}${index}_hidereservation` in
                                    addedNote
                                  )) &&
                                  booking.hide_for_reservations.length > 0)
                                  ? "#ffc107"
                                  : "#146EF5"
                              }`}
                            ></path>
                          </svg>
                        </Button>
                      </label>
                      <div className="">
                        <input
                          className="bg-dark form-control"
                          type="text"
                          {...register(
                            `booking_${booking.question_type}${index}`
                          )}
                          onChange={() => {
                            setInputChangesCheck(true);
                          }}
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
                      <Button
                        style={{ width: "auto" }}
                        onClick={() =>
                          handleHideReservationShow(
                            // booking.question_text,
                            `checkInOut_${checkInandCheckout.question_type}${index}_hidereservation`,
                            checkInandCheckout.hide_for_reservations
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
                            // fill="#ffeb3b"
                            fill={`${
                              (addedNote &&
                                `checkInOut_${checkInandCheckout.question_type}${index}_hidereservation` in
                                  addedNote &&
                                addedNote[
                                  `checkInOut_${checkInandCheckout.question_type}${index}_hidereservation`
                                ].length > 0) ||
                              ((!addedNote ||
                                !(
                                  `checkInOut_${checkInandCheckout.question_type}${index}_hidereservation` in
                                  addedNote
                                )) &&
                                checkInandCheckout.hide_for_reservations
                                  .length > 0)
                                ? "#ffc107"
                                : "#146EF5"
                            }`}
                          ></path>
                        </svg>
                      </Button>
                    </label>
                    <div className="">
                      <input
                        className="bg-dark form-control"
                        type="text"
                        {...register(
                          `checkInOut_${checkInandCheckout.question_type}${index}`
                        )}
                        onChange={() => {
                          setInputChangesCheck(true);
                        }}
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
                      <Button
                        style={{ width: "auto" }}
                        onClick={() =>
                          handleHideReservationShow(
                            // booking.question_text,
                            `details_${details.question_type}${index}_hidereservation`,
                            details.hide_for_reservations
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
                            // fill="#ffeb3b"
                            fill={`${
                              (addedNote &&
                                `details_${details.question_type}${index}_hidereservation` in
                                  addedNote &&
                                addedNote[
                                  `details_${details.question_type}${index}_hidereservation`
                                ].length > 0) ||
                              ((!addedNote ||
                                !(
                                  `details_${details.question_type}${index}_hidereservation` in
                                  addedNote
                                )) &&
                                details.hide_for_reservations.length > 0)
                                ? "#ffc107"
                                : "#146EF5"
                            }`}
                          ></path>
                        </svg>
                      </Button>
                    </label>
                    <div className="">
                      <input
                        className="bg-dark form-control"
                        type="text"
                        {...register(
                          `details_${details.question_type}${index}`
                        )}
                        onChange={() => {
                          setInputChangesCheck(true);
                        }}
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
              {!updateQuestionaireLoading ? <>Save & Next</> : <Loader />}
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
