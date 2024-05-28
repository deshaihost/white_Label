// import React, { useState, useEffect } from "react";
// import { useForm } from "react-hook-form";
// import { useParams, useNavigate } from "react-router-dom";
// // import { useNavigate } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
// import {
//   GetquestionnaireFunction,
//   nameKey,
// } from "../../../../helper/Authorized";
// import {
//   stateEmptyActions,
//   updateQuestionnaireActions,
// } from "../../../../redux/actions";
// import Loader, { BoxLoader } from "../../../../helper/Loader";
// import ToastHandle from "../../../../helper/ToastMessage";
// import ReservationStageModal from "../extraNoteModal/ReservationStageModal";
// import { Button } from "react-bootstrap";
// const ExtrasForm = () => {
//   const { id } = useParams();
//   const store = useSelector((state) => state);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const [loadingStatus, setLoadingStatus] = useState(false);
//   const [inputChangesCheck, setInputChangesCheck] = useState(false);

//   const [addedNote, setAddedNote] = useState({});
//   const [showReservation, setShowReservation] = useState(false);

//   const [reservationClickData, setReservationClickData] = useState({
//     name: "",
//     value: "",
//   });

//   const getLocalStorageData = nameKey();

//   // to get the complete questionaire object
//   const apiQuestionnaireObject =
//     store?.getQuestionnaireReducer?.getQuestionnaire?.data;

//   // to get the updateQuestionaire status
//   const updateQuestionaireStatus =
//     store?.updateQuestionnaireReducer?.updateQuestionnaire?.status;
//   const updateQuestionaireLoading = store?.updateQuestionnaireReducer?.loading;
//   const updateQuestionnaireMessage =
//     store?.updateQuestionnaireReducer?.updateQuestionnaire?.data?.message;

//   const ExtrasFormCall = GetquestionnaireFunction();
//   const { questionnaireApi, apiQuestionnaireLoading } = ExtrasFormCall
//     ? ExtrasFormCall
//     : [];
//   const ExtrasTextarea = questionnaireApi["Extras"]
//     ? questionnaireApi["Extras"]
//     : [];
//   const AdditionalInformation = ExtrasTextarea["Additional Information"];

//   const questionaireUpdateMessage =
//     store?.updateQuestionnaireReducer?.updateQuestionnaire?.data?.error;

//   const {
//     register,
//     handleSubmit,
//     reset,
//     formState: { errors },
//   } = useForm();

//   const handleReservationClose = () => setShowReservation(false);

//   // button click handle for without not data
//   const handleHideReservationShow = (name, value) => {
//     setReservationClickData({
//       ...reservationClickData,
//       name: name,
//       value: value,
//     });
//     setShowReservation(true);
//   };

//   const onSubmit = (data) => {
//     //if (inputChangesCheck) { // disable for now, because it's not recognizing changes to extra note or to reservation stages
//     if (true) {
//       const questionaireToSend = structuredClone(apiQuestionnaireObject);

//       AdditionalInformation[0]["response_text"] =
//         data?.AdditionalInformationlong_answer0.trim() === ""
//           ? null
//           : data?.AdditionalInformationlong_answer0;

//       if (
//         addedNote &&
//         "additionalInformation_long_answer0_hidereservation" in addedNote
//       ) {
//         AdditionalInformation[0]["hide_for_reservations"] =
//           addedNote?.additionalInformation_long_answer0_hidereservation ?? "";
//       }

//       AdditionalInformation[1]["response_text"] =
//         data?.AdditionalInformationlong_answer1.trim() === ""
//           ? null
//           : data?.AdditionalInformationlong_answer1;

//       if (
//         addedNote &&
//         "additionalInformation_long_answer1_hidereservation" in addedNote
//       ) {
//         AdditionalInformation[1]["hide_for_reservations"] =
//           addedNote?.additionalInformation_long_answer1_hidereservation ?? "";
//       }

//       questionaireToSend["questionnaire"]["questionnaire"]["Extras"][
//         "Additional Information"
//       ] = AdditionalInformation;
//       dispatch(
//         updateQuestionnaireActions({
//           nameKey: getLocalStorageData,
//           formeData: questionaireToSend,
//         })
//       );

//       setLoadingStatus(true);
//     } else {
//       navigate("/properties");
//     }
//   };

//   useEffect(() => {
//     if (updateQuestionaireStatus === 200) {
//       navigate("/properties");
//       dispatch(stateEmptyActions());
//       setLoadingStatus(false);
//     } else if (updateQuestionaireStatus === 402) {
//       ToastHandle(questionaireUpdateMessage, "danger");
//       dispatch(stateEmptyActions());
//       setLoadingStatus(false);
//     } else if (updateQuestionaireStatus === 409) {
//       ToastHandle(questionaireUpdateMessage, "danger");
//       dispatch(stateEmptyActions());
//       setLoadingStatus(false);
//     } else {
//       setLoadingStatus(false);
//     }
//   }, [updateQuestionaireStatus, loadingStatus]);

//   return (
//     <>
//       {showReservation && (
//         <ReservationStageModal
//           show={showReservation}
//           handleClose={handleReservationClose}
//           reservationClickData={reservationClickData}
//           addedNote={addedNote}
//           setAddedNote={setAddedNote}
//         />
//       )}

//       {!apiQuestionnaireLoading ? (
//         <div>
//           <h1 className="text-white fs-4 fw-bold mb-3">
//             Additional Information
//           </h1>
//           <div className="row ">
//             {AdditionalInformation?.map((AdditionalInformation, index) => {
//               return (
//                 <>
//                   <div className="col-12 mt-4 form-design">
//                     <label className="text-white">
//                       {AdditionalInformation?.question_text}
//                       <Button
//                         style={{ width: "auto" }}
//                         onClick={() =>
//                           handleHideReservationShow(
//                             // booking.question_text,
//                             `additionalInformation_${AdditionalInformation.question_type}${index}_hidereservation`,
//                             AdditionalInformation.hide_for_reservations
//                           )
//                         }
//                         className="bg-none p-0 border-0 d-inline shadow-none"
//                       >
//                         <svg
//                           className="ms-2"
//                           style={{ maxWidth: "16px" }}
//                           width="18"
//                           height="18"
//                           viewBox="0 0 18 18"
//                           fill="none"
//                           xmlns="http://www.w3.org/2000/svg"
//                         >
//                           <path
//                             d="M17.71 4.03957C18.1 3.64957 18.1 2.99957 17.71 2.62957L15.37 0.28957C15 -0.10043 14.35 -0.10043 13.96 0.28957L12.12 2.11957L15.87 5.86957M0 14.2496V17.9996H3.75L14.81 6.92957L11.06 3.17957L0 14.2496Z"
//                             // fill="#ffeb3b"
//                             fill={`${
//                               (addedNote &&
//                                 `additionalInformation_${AdditionalInformation.question_type}${index}_hidereservation` in
//                                   addedNote &&
//                                 addedNote[
//                                   `additionalInformation_${AdditionalInformation.question_type}${index}_hidereservation`
//                                 ].length > 0) ||
//                               ((!addedNote ||
//                                 !(
//                                   `additionalInformation_${AdditionalInformation.question_type}${index}_hidereservation` in
//                                   addedNote
//                                 )) &&
//                                 AdditionalInformation.hide_for_reservations
//                                   .length > 0)
//                                 ? "#ffc107"
//                                 : "#146EF5"
//                             }`}
//                           ></path>
//                         </svg>
//                       </Button>
//                     </label>
//                     <div className="">
//                       <textarea
//                         className="bg-dark form-control"
//                         type="text"
//                         {...register(
//                           `AdditionalInformation${AdditionalInformation.question_type}${index}`
//                         )}
//                         onChange={() => setInputChangesCheck(true)}
//                         placeholder={AdditionalInformation?.placeholder_text}
//                         defaultValue={AdditionalInformation?.response_text}
//                       />
//                     </div>
//                   </div>
//                 </>
//               );
//             })}
//           </div>

//           <div className="d-flex justify-content-around my-5 form-design">
//             <button class="btn btn-primary">Previous</button>
//             <button
//               class="border_theme_btn previous"
//               onClick={handleSubmit(
//                 (data) => {
//                   onSubmit(data);
//                 },
//                 (err) => {
//                   console.log(err, "ee");
//                 }
//               )}
//             >
//               {!updateQuestionaireLoading ? <>Submit</> : <Loader />}
//             </button>
//           </div>
//         </div>
//       ) : (
//         <BoxLoader />
//       )}
//     </>
//   );
// };

// export default ExtrasForm;
