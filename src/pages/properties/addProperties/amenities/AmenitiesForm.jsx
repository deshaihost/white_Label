// import React, { useState, useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { useParams } from "react-router-dom";
// import {
//   GetquestionnaireFunction,
//   nameKey,
// } from "../../../../helper/Authorized";
// import {
//   stateEmptyActions,
//   updateQuestionnaireActions,
// } from "../../../../redux/actions";
// import Loader, { BoxLoader } from "../../../../helper/Loader";
// import { Modal } from "react-bootstrap";
// import ToastHandle from "../../../../helper/ToastMessage";
// import CheckboxModalNote from "../extraNoteModal/CheckboxModalNote";
// const AmenitiesForm = ({ prntFuntionHeaderActive }) => {
//   const { id } = useParams();
//   const store = useSelector((state) => state);
//   const dispatch = useDispatch();

//   const [loadingStatus, setLoadingStatus] = useState(false);
//   const [inputChangesCheck, setInputChangesCheck] = useState(false);

//   const [amenitiesFamilyOptions, setAmenitiesFamilyOptions] = useState([]);
//   const [amenitiesIndoorOptions, setAmenitiesIndoorOptions] = useState([]);
//   const [amenitiesMoreOptions, setAmenitiesMoreOptions] = useState([]);
//   const [amenitiesOutdoorOptions, setAmenitiesOutdoorOptions] = useState([]);
//   const [amenitiesRulesOptions, setAmenitiesRulesOptions] = useState([]);

//   const [amenitiesFamilyResponse, setAmenitiesFamilyResponse] = useState([]);
//   const [amenitiesIndoorResponse, setAmenitiesIndoorResponse] = useState([]);
//   const [amenitiesMoreResponse, setAmenitiesMoreResponse] = useState([]);
//   const [amenitiesOutdoorResponse, setAmenitiesOutdoorResponse] = useState([]);
//   const [amenitiesRulesResponse, setAmenitiesRulesResponse] = useState([]);

//   const [amenitiesFamilyHideReservation, setAmenitiesFamilyHideReservation] =
//     useState([]);
//   const [amenitiesIndoorHideReservation, setAmenitiesIndoorHideReservation] =
//     useState([]);
//   const [amenitiesMoreHideReservation, setAmenitiesMoreHideReservation] =
//     useState([]);
//   const [amenitiesOutdoorHideReservation, setAmenitiesOutdoorHideReservation] =
//     useState([]);
//   const [amenitiesRulesHideReservation, setAmenitiesRulesHideReservation] =
//     useState([]);

//   const getLocalStorageData = nameKey();

//   const [show, setShow] = useState(false);
//   const [addedNote, setAddedNote] = useState({});
//   const [noteClickData, setNoteClickData] = useState({
//     type: "",
//     name: "",
//   });

//   const handleClose = () => setShow(false);
//   const handleShow = () => setShow(true);

//   const ExtrasFormCall = GetquestionnaireFunction();
//   const { questionnaireApi, apiQuestionnaireLoading } = ExtrasFormCall
//     ? ExtrasFormCall
//     : [];
//   const Amenities = questionnaireApi["Amenities"]
//     ? questionnaireApi["Amenities"]
//     : [];
//   const Family = Amenities["Family"]?.[0];
//   const Indoor = Amenities["Indoor"]?.[0];
//   const More = Amenities["More"]?.[0];
//   const Outdoor = Amenities["Outdoor"]?.[0];
//   const RulesAndServices = Amenities["Rules and Services"]?.[0];

//   // if (Family.response_options.length !== 0) {
//   //   setAmenitiesFamilyOptions(Family.response_options);
//   // }

//   // to get the complete questionaire object
//   const apiQuestionnaireObject =
//     store?.getQuestionnaireReducer?.getQuestionnaire?.data;

//   // to get the updateQuestionaire status
//   const updateQuestionaireStatus =
//     store?.updateQuestionnaireReducer?.updateQuestionnaire?.status;
//   const updateQuestionaireLoading = store?.updateQuestionnaireReducer?.loading;
//   const updateQuestionnaireMessage =
//     store?.updateQuestionnaireReducer?.updateQuestionnaire?.data?.message;

//   // const [amenitiesInputOnClickGet, setAmenitiesInputOnClickGet] = useState([]);

//   // const amenitiesMainHandle = (type, item, id) => {
//   //   if (type) {
//   //     setAmenitiesInputOnClickGet([...amenitiesInputOnClickGet, { id, item }]);
//   //   } else if (!type) {
//   //     let getFilter = amenitiesInputOnClickGet?.filter(
//   //       (items) => items?.id !== id
//   //     );
//   //     setAmenitiesInputOnClickGet(getFilter);
//   //   }
//   // };

//   // Checking whether any hideReservationstage present or not and setting pencil color based on that
//   const checkReservationStatus = (type, typeValue) => {
//     if (type === "Family") {
//       if (!amenitiesFamilyOptions.includes(typeValue)) {
//         // If the familyValue is not already included,
//         return "#146EF5";
//       } else {
//         const indexVal = amenitiesFamilyOptions.indexOf(typeValue);

//         let reservationStatusData = amenitiesFamilyHideReservation[indexVal];

//         if (reservationStatusData && reservationStatusData.length > 0) {
//           return "#ffc107";
//         } else {
//           return "#146EF5";
//         }
//       }
//     }

//     if (type === "Indoor") {
//       if (!amenitiesIndoorOptions.includes(typeValue)) {
//         // If the familyValue is not already included,
//         return "#146EF5";
//       } else {
//         const indexVal = amenitiesIndoorOptions.indexOf(typeValue);

//         let reservationStatusData = amenitiesIndoorHideReservation[indexVal];

//         if (reservationStatusData && reservationStatusData.length > 0) {
//           return "#ffc107";
//         } else {
//           return "#146EF5";
//         }
//       }
//     }

//     if (type === "More") {
//       if (!amenitiesMoreOptions.includes(typeValue)) {
//         // If the familyValue is not already included,
//         return "#146EF5";
//       } else {
//         const indexVal = amenitiesMoreOptions.indexOf(typeValue);

//         let reservationStatusData = amenitiesMoreHideReservation[indexVal];

//         if (reservationStatusData && reservationStatusData.length > 0) {
//           return "#ffc107";
//         } else {
//           return "#146EF5";
//         }
//       }
//     }

//     if (type === "Outdoor") {
//       if (!amenitiesOutdoorOptions.includes(typeValue)) {
//         // If the familyValue is not already included,
//         return "#146EF5";
//       } else {
//         const indexVal = amenitiesOutdoorOptions.indexOf(typeValue);

//         let reservationStatusData = amenitiesOutdoorHideReservation[indexVal];

//         if (reservationStatusData && reservationStatusData.length > 0) {
//           return "#ffc107";
//         } else {
//           return "#146EF5";
//         }
//       }
//     }

//     if (type === "RulesAndServices") {
//       if (!amenitiesRulesOptions.includes(typeValue)) {
//         // If the familyValue is not already included,
//         return "#146EF5";
//       } else {
//         const indexVal = amenitiesRulesOptions.indexOf(typeValue);

//         let reservationStatusData = amenitiesRulesHideReservation[indexVal];

//         if (reservationStatusData && reservationStatusData.length > 0) {
//           return "#ffc107";
//         } else {
//           return "#146EF5";
//         }
//       }
//     }
//   };

//   // handle checkbox click based on the text click
//   const handleCheckItemClick = (type, checkedValue) => {
//     if (type === "Family") {
//       if (!amenitiesFamilyOptions.includes(checkedValue)) {
//         // If the familyValue is not already included, add it to the state
//         setAmenitiesFamilyOptions((prevState) => [...prevState, checkedValue]);
//         // add "" for selected Family value
//         setAmenitiesFamilyResponse((prevState) => [...prevState, ""]);

//         setAmenitiesFamilyHideReservation((prevState) => [...prevState, ""]);
//       }

//       setNoteClickData({
//         ...noteClickData,
//         type: type,
//         name: checkedValue,
//       });
//     }

//     if (type === "Indoor") {
//       if (!amenitiesIndoorOptions.includes(checkedValue)) {
//         // If the familyValue is not already included, add it to the state
//         setAmenitiesIndoorOptions((prevState) => [...prevState, checkedValue]);
//         // add "" for selected Family value
//         setAmenitiesIndoorResponse((prevState) => [...prevState, ""]);

//         setAmenitiesIndoorHideReservation((prevState) => [...prevState, ""]);
//       }

//       setNoteClickData({
//         ...noteClickData,
//         type: type,
//         name: checkedValue,
//       });
//     }

//     if (type === "More") {
//       if (!amenitiesMoreOptions.includes(checkedValue)) {
//         // If the familyValue is not already included, add it to the state
//         setAmenitiesMoreOptions((prevState) => [...prevState, checkedValue]);
//         // add "" for selected Family value
//         setAmenitiesMoreResponse((prevState) => [...prevState, ""]);

//         setAmenitiesMoreHideReservation((prevState) => [...prevState, ""]);
//       }

//       setNoteClickData({
//         ...noteClickData,
//         type: type,
//         name: checkedValue,
//       });
//     }

//     if (type === "Outdoor") {
//       if (!amenitiesOutdoorOptions.includes(checkedValue)) {
//         // If the familyValue is not already included, add it to the state
//         setAmenitiesOutdoorOptions((prevState) => [...prevState, checkedValue]);
//         // add "" for selected Family value
//         setAmenitiesOutdoorResponse((prevState) => [...prevState, ""]);

//         setAmenitiesOutdoorHideReservation((prevState) => [...prevState, ""]);
//       }

//       setNoteClickData({
//         ...noteClickData,
//         type: type,
//         name: checkedValue,
//       });
//     }

//     if (type === "RulesAndServices") {
//       if (!amenitiesRulesOptions.includes(checkedValue)) {
//         // If the familyValue is not already included, add it to the state
//         setAmenitiesRulesOptions((prevState) => [...prevState, checkedValue]);
//         // add "" for selected Family value
//         setAmenitiesRulesResponse((prevState) => [...prevState, ""]);

//         setAmenitiesRulesHideReservation((prevState) => [...prevState, ""]);
//       }

//       setNoteClickData({
//         ...noteClickData,
//         type: type,
//         name: checkedValue,
//       });
//     }
//   };

//   // handle edit or add note button click to add checkbox to checked state
//   const handleEditButtonClick = (type, amenityValue) => {
//     if (type === "Family") {
//       if (!amenitiesFamilyOptions.includes(amenityValue)) {
//         // If the familyValue is not already included, add it to the state
//         setAmenitiesFamilyOptions((prevState) => [...prevState, amenityValue]);
//         // add "" for selected Family value
//         setAmenitiesFamilyResponse((prevState) => [...prevState, ""]);
//         // add "" for selected Family value
//         setAmenitiesFamilyHideReservation((prevState) => [...prevState, ""]);
//       }

//       setNoteClickData({
//         ...noteClickData,
//         type: type,
//         name: amenityValue,
//       });
//     }

//     if (type === "Indoor") {
//       if (!amenitiesIndoorOptions.includes(amenityValue)) {
//         // If the familyValue is not already included, add it to the state
//         setAmenitiesIndoorOptions((prevState) => [...prevState, amenityValue]);
//         // add "" for selected Family value
//         setAmenitiesIndoorResponse((prevState) => [...prevState, ""]);

//         setAmenitiesIndoorHideReservation((prevState) => [...prevState, ""]);
//       }

//       setNoteClickData({
//         ...noteClickData,
//         type: type,
//         name: amenityValue,
//       });
//     }

//     if (type === "More") {
//       if (!amenitiesMoreOptions.includes(amenityValue)) {
//         // If the familyValue is not already included, add it to the state
//         setAmenitiesMoreOptions((prevState) => [...prevState, amenityValue]);
//         // add "" for selected Family value
//         setAmenitiesMoreResponse((prevState) => [...prevState, ""]);

//         setAmenitiesMoreHideReservation((prevState) => [...prevState, ""]);
//       }

//       setNoteClickData({
//         ...noteClickData,
//         type: type,
//         name: amenityValue,
//       });
//     }

//     if (type === "Outdoor") {
//       if (!amenitiesOutdoorOptions.includes(amenityValue)) {
//         // If the familyValue is not already included, add it to the state
//         setAmenitiesOutdoorOptions((prevState) => [...prevState, amenityValue]);
//         // add "" for selected Family value
//         setAmenitiesOutdoorResponse((prevState) => [...prevState, ""]);

//         setAmenitiesOutdoorHideReservation((prevState) => [...prevState, ""]);
//       }

//       setNoteClickData({
//         ...noteClickData,
//         type: type,
//         name: amenityValue,
//       });
//     }

//     if (type === "RulesAndServices") {
//       if (!amenitiesRulesOptions.includes(amenityValue)) {
//         // If the familyValue is not already included, add it to the state
//         setAmenitiesRulesOptions((prevState) => [...prevState, amenityValue]);
//         // add "" for selected Family value
//         setAmenitiesRulesResponse((prevState) => [...prevState, ""]);

//         setAmenitiesRulesHideReservation((prevState) => [...prevState, ""]);
//       }

//       setNoteClickData({
//         ...noteClickData,
//         type: type,
//         name: amenityValue,
//       });
//     }

//     setShow(true);
//     // handleShow(
//     //   booking.question_text,
//     //   `${booking.question_type}${index}_bookingnote`,
//     //   booking.response_text
//     // )
//     // }
//   };

//   const handleFamilyCheckboxChange = (event, type) => {
//     setInputChangesCheck(type);
//     const { value, checked } = event.target;

//     if (checked) {
//       // If checkbox is checked, add value to the state
//       setAmenitiesFamilyOptions((prevState) => [...prevState, value]);
//       setAmenitiesFamilyResponse((prevState) => [...prevState, ""]);
//       setAmenitiesFamilyHideReservation((prevState) => [...prevState, ""]);
//     } else {
//       // If checkbox is unchecked, remove value from the state

//       const indexVal = amenitiesFamilyOptions.indexOf(value);
//       // remove responseText from array for Family
//       setAmenitiesFamilyResponse((prevState) =>
//         prevState.filter((item, index) => index !== indexVal)
//       );

//       // remove hideReservationText from array for Family
//       setAmenitiesFamilyHideReservation((prevState) =>
//         prevState.filter((item, index) => index !== indexVal)
//       );

//       setAmenitiesFamilyOptions((prevState) =>
//         prevState.filter((item) => item !== value)
//       );
//     }
//   };

//   const handleIndoorCheckboxChange = (event, type) => {
//     setInputChangesCheck(type);
//     const { value, checked } = event.target;
//     if (checked) {
//       // If checkbox is checked, add value to the state
//       setAmenitiesIndoorOptions((prevState) => [...prevState, value]);
//       setAmenitiesIndoorResponse((prevState) => [...prevState, ""]);
//       setAmenitiesIndoorHideReservation((prevState) => [...prevState, ""]);
//     } else {
//       // If checkbox is unchecked, remove value from the state
//       const indexVal = amenitiesIndoorOptions.indexOf(value);
//       // remove responseText from array for Family
//       setAmenitiesIndoorResponse((prevState) =>
//         prevState.filter((item, index) => index !== indexVal)
//       );

//       // remove hideReservationText from array for Family
//       setAmenitiesIndoorHideReservation((prevState) =>
//         prevState.filter((item, index) => index !== indexVal)
//       );

//       setAmenitiesIndoorOptions((prevState) =>
//         prevState.filter((item) => item !== value)
//       );
//     }
//   };

//   const handleMoreCheckboxChange = (event, type) => {
//     setInputChangesCheck(type);
//     const { value, checked } = event.target;
//     if (checked) {
//       // If checkbox is checked, add value to the state
//       setAmenitiesMoreOptions((prevState) => [...prevState, value]);
//       setAmenitiesMoreResponse((prevState) => [...prevState, ""]);
//     } else {
//       // If checkbox is unchecked, remove value from the state
//       const indexVal = amenitiesMoreOptions.indexOf(value);
//       // remove responseText from array for Family
//       setAmenitiesMoreResponse((prevState) =>
//         prevState.filter((item, index) => index !== indexVal)
//       );

//       setAmenitiesMoreOptions((prevState) =>
//         prevState.filter((item) => item !== value)
//       );
//     }
//   };

//   const handleOutdoorCheckboxChange = (event, type) => {
//     setInputChangesCheck(type);
//     const { value, checked } = event.target;
//     if (checked) {
//       // If checkbox is checked, add value to the state
//       setAmenitiesOutdoorOptions((prevState) => [...prevState, value]);
//       setAmenitiesOutdoorResponse((prevState) => [...prevState, ""]);
//     } else {
//       // If checkbox is unchecked, remove value from the state
//       const indexVal = amenitiesOutdoorOptions.indexOf(value);
//       // remove responseText from array for Family
//       setAmenitiesOutdoorResponse((prevState) =>
//         prevState.filter((item, index) => index !== indexVal)
//       );

//       setAmenitiesOutdoorOptions((prevState) =>
//         prevState.filter((item) => item !== value)
//       );
//     }
//   };

//   const handleRulesCheckboxChange = (event,type) => {
//     setInputChangesCheck(type)
//     const { value, checked } = event.target;
//     if (checked) {
//       // If checkbox is checked, add value to the state
//       setAmenitiesRulesOptions((prevState) => [...prevState, value]);
//       setAmenitiesRulesResponse((prevState) => [...prevState, ""]);
//     } else {
//       // If checkbox is unchecked, remove value from the state
//       const indexVal = amenitiesRulesOptions.indexOf(value);
//       // remove responseText from array for Family
//       setAmenitiesRulesResponse((prevState) =>
//         prevState.filter((item, index) => index !== indexVal)
//       );

//       setAmenitiesRulesOptions((prevState) =>
//         prevState.filter((item) => item !== value)
//       );
//     }
//   };

//   const handleSubmit = () => {
//     //if (inputChangesCheck) { // disable for now, because it's not recognizing changes to extra note or to reservation stages
//     if (true) {
//       const questionaireToSend = structuredClone(apiQuestionnaireObject);
      

//       // "Fill" the hideReservations arrays by adding empty strings where there are nulls, since backend expects an array of strings
//       const amenitiesFamilyHideReservationFilled =
//         amenitiesFamilyHideReservation.map((item) => item ?? "");
//       const amenitiesIndoorHideReservationFilled =
//         amenitiesIndoorHideReservation.map((item) => item ?? "");
//       const amenitiesMoreHideReservationFilled =
//         amenitiesMoreHideReservation.map((item) => item ?? "");
//       const amenitiesOutdoorHideReservationFilled =
//         amenitiesOutdoorHideReservation.map((item) => item ?? "");
//       const amenitiesRulesHideReservationFilled =
//         amenitiesRulesHideReservation.map((item) => item ?? "");
      
//       // return;

//       questionaireToSend["questionnaire"]["questionnaire"]["Amenities"][
//         "Family"
//       ][0]["response_options"] = amenitiesFamilyOptions;
//       questionaireToSend["questionnaire"]["questionnaire"]["Amenities"][
//         "Family"
//       ][0]["response_text"] = amenitiesFamilyResponse;
//       questionaireToSend["questionnaire"]["questionnaire"]["Amenities"][
//         "Family"
//       ][0]["hide_for_reservations"] = amenitiesFamilyHideReservationFilled;

//       questionaireToSend["questionnaire"]["questionnaire"]["Amenities"][
//         "Indoor"
//       ][0]["response_options"] = amenitiesIndoorOptions;
//       questionaireToSend["questionnaire"]["questionnaire"]["Amenities"][
//         "Indoor"
//       ][0]["response_text"] = amenitiesIndoorResponse;
//       questionaireToSend["questionnaire"]["questionnaire"]["Amenities"][
//         "Indoor"
//       ][0]["hide_for_reservations"] = amenitiesIndoorHideReservationFilled;

//       questionaireToSend["questionnaire"]["questionnaire"]["Amenities"][
//         "More"
//       ][0]["response_options"] = amenitiesMoreOptions;
//       questionaireToSend["questionnaire"]["questionnaire"]["Amenities"][
//         "More"
//       ][0]["response_text"] = amenitiesMoreResponse;
//       questionaireToSend["questionnaire"]["questionnaire"]["Amenities"][
//         "More"
//       ][0]["hide_for_reservations"] = amenitiesMoreHideReservationFilled;

//       questionaireToSend["questionnaire"]["questionnaire"]["Amenities"][
//         "Outdoor"
//       ][0]["response_options"] = amenitiesOutdoorOptions;
//       questionaireToSend["questionnaire"]["questionnaire"]["Amenities"][
//         "Outdoor"
//       ][0]["response_text"] = amenitiesOutdoorResponse;
//       questionaireToSend["questionnaire"]["questionnaire"]["Amenities"][
//         "Outdoor"
//       ][0]["hide_for_reservations"] = amenitiesOutdoorHideReservationFilled;

//       questionaireToSend["questionnaire"]["questionnaire"]["Amenities"][
//         "Rules and Services"
//       ][0]["response_options"] = amenitiesRulesOptions;
//       questionaireToSend["questionnaire"]["questionnaire"]["Amenities"][
//         "Rules and Services"
//       ][0]["response_text"] = amenitiesRulesResponse;
//       questionaireToSend["questionnaire"]["questionnaire"]["Amenities"][
//         "Rules and Services"
//       ][0]["hide_for_reservations"] = amenitiesRulesHideReservationFilled;

//       dispatch(
//         updateQuestionnaireActions({
//           nameKey: getLocalStorageData,
//           formeData: questionaireToSend,
//         })
//       );

//       setLoadingStatus(true);
//     } else {
//       prntFuntionHeaderActive(id !== undefined && "extras");
//     }
//   };

//   useEffect(() => {
//     if (updateQuestionaireStatus === 200) {
//       if (loadingStatus) {
//         ToastHandle(updateQuestionnaireMessage, "success");
//         prntFuntionHeaderActive(id !== undefined && "extras");
//         dispatch(stateEmptyActions());

//         setLoadingStatus(false);
//       }
//     }
//   }, [updateQuestionaireStatus, loadingStatus]);

//   useEffect(() => {
//     if (Family?.response_options.length > 0) {
//       setAmenitiesFamilyOptions(Family?.response_options);
//       setAmenitiesFamilyResponse(Family?.response_text);
//       setAmenitiesFamilyHideReservation(Family?.hide_for_reservations);
//     }

//     if (Indoor?.response_options.length > 0) {
//       setAmenitiesIndoorOptions(Indoor.response_options);
//       setAmenitiesIndoorResponse(Indoor.response_text);
//       setAmenitiesIndoorHideReservation(Indoor.hide_for_reservations);
//     }

//     if (More?.response_options.length > 0) {
//       setAmenitiesMoreOptions(More.response_options);
//       setAmenitiesMoreResponse(More.response_text);
//       setAmenitiesMoreHideReservation(More.hide_for_reservations);
//     }

//     if (Outdoor?.response_options.length > 0) {
//       setAmenitiesOutdoorOptions(Outdoor.response_options);
//       setAmenitiesOutdoorResponse(Outdoor.response_text);
//       setAmenitiesOutdoorHideReservation(Outdoor.hide_for_reservations);
//     }

//     if (RulesAndServices?.response_options.length > 0) {
//       setAmenitiesRulesOptions(RulesAndServices.response_options);
//       setAmenitiesRulesResponse(RulesAndServices.response_text);
//       setAmenitiesRulesHideReservation(RulesAndServices.hide_for_reservations);
//     }
//   }, [Family, Indoor, More, Outdoor, RulesAndServices]);

//   return (
//     <>
//       {show && (
//         <CheckboxModalNote
//           show={show}
//           handleClose={handleClose}
//           noteClickData={noteClickData}
//           responseOptions={
//             (noteClickData.type === "Family" && amenitiesFamilyOptions) ||
//             (noteClickData.type === "Indoor" && amenitiesIndoorOptions) ||
//             (noteClickData.type === "More" && amenitiesMoreOptions) ||
//             (noteClickData.type === "Outdoor" && amenitiesOutdoorOptions) ||
//             (noteClickData.type === "RulesAndServices" && amenitiesRulesOptions)
//           }
//           responseText={
//             (noteClickData.type === "Family" && amenitiesFamilyResponse) ||
//             (noteClickData.type === "Indoor" && amenitiesIndoorResponse) ||
//             (noteClickData.type === "More" && amenitiesMoreResponse) ||
//             (noteClickData.type === "Outdoor" && amenitiesOutdoorResponse) ||
//             (noteClickData.type === "RulesAndServices" &&
//               amenitiesRulesResponse)
//           }
//           setResponseText={
//             (noteClickData.type === "Family" && setAmenitiesFamilyResponse) ||
//             (noteClickData.type === "Indoor" && setAmenitiesIndoorResponse) ||
//             (noteClickData.type === "More" && setAmenitiesMoreResponse) ||
//             (noteClickData.type === "Outdoor" && setAmenitiesOutdoorResponse) ||
//             (noteClickData.type === "RulesAndServices" &&
//               setAmenitiesRulesResponse)
//           }
//           hideReservationText={
//             (noteClickData.type === "Family" &&
//               amenitiesFamilyHideReservation) ||
//             (noteClickData.type === "Indoor" &&
//               amenitiesIndoorHideReservation) ||
//             (noteClickData.type === "More" && amenitiesMoreHideReservation) ||
//             (noteClickData.type === "Outdoor" &&
//               amenitiesOutdoorHideReservation) ||
//             (noteClickData.type === "RulesAndServices" &&
//               amenitiesRulesHideReservation)
//           }
//           setHideReservationText={
//             (noteClickData.type === "Family" &&
//               setAmenitiesFamilyHideReservation) ||
//             (noteClickData.type === "Indoor" &&
//               setAmenitiesIndoorHideReservation) ||
//             (noteClickData.type === "More" &&
//               setAmenitiesMoreHideReservation) ||
//             (noteClickData.type === "Outdoor" &&
//               setAmenitiesOutdoorHideReservation) ||
//             (noteClickData.type === "RulesAndServices" &&
//               setAmenitiesRulesHideReservation)
//           }
//         />
//       )}

//       {!apiQuestionnaireLoading ? (
//         <div>
//           <h1 className="text-white fs-4 fw-bold mb-3">Family</h1>
//           <div className="row ">
//             <div className="col-lg-12">
//               <label className="text-white">{Family?.placeholder_text} </label>
//               <ul className="amenties-list">
//                 {Family?.options?.map((Family) => {
//                   return (
//                     <>
//                       <li className="amenties-list-item">
//                         <div
//                           class={
//                             amenitiesFamilyOptions.includes(Family)
//                               ? "form-checkbox bg-light text-dark"
//                               : "form-checkbox"
//                           }
//                         >
//                           <input
//                             class="form-check-input"
//                             type="checkbox"
//                             // id="inlineCheckbox1"
//                             value={Family}
//                             onChange={(e) =>
//                               handleFamilyCheckboxChange(e, true)
//                             }
//                             checked={amenitiesFamilyOptions.includes(Family)}
//                           />
//                           <label
//                             class="form-check-label"
//                             // for="inlineCheckbox2"
//                             onClick={() =>
//                               handleCheckItemClick("Family", Family)
//                             }
//                           >
//                             {Family}
//                           </label>
//                           <button
//                             className="bg-none p-0 border-0"
//                             onClick={() =>
//                               handleEditButtonClick("Family", Family)
//                             }
//                           >
//                             <svg
//                               width="18"
//                               height="18"
//                               viewBox="0 0 18 18"
//                               fill="none"
//                               xmlns="http://www.w3.org/2000/svg"
//                             >
//                               <path
//                                 d="M17.71 4.03957C18.1 3.64957 18.1 2.99957 17.71 2.62957L15.37 0.28957C15 -0.10043 14.35 -0.10043 13.96 0.28957L12.12 2.11957L15.87 5.86957M0 14.2496V17.9996H3.75L14.81 6.92957L11.06 3.17957L0 14.2496Z"
//                                 // fill="#146EF5"
//                                 fill={`${checkReservationStatus(
//                                   "Family",
//                                   Family
//                                 )}`}
//                               ></path>
//                             </svg>
//                           </button>
//                         </div>
//                       </li>
//                     </>
//                   );
//                 })}
//                 {/* {Family?.options?.map((Family, indexFamily) => {
//                   const activeName = amenitiesInputOnClickGet.some((el) =>
//                     Family.includes(el?.item)
//                   );
//                   return (
//                     <>
//                       <li className="amenties-list-item">
//                         <div
//                           class={
//                             activeName
//                               ? "form-checkbox active"
//                               : "form-checkbox "
//                           }
//                         >
//                           <input
//                             class="form-check-input"
//                             type="checkbox"
//                             id="inlineCheckbox1"
//                             value="option1"
//                             onClick={(e) => {
//                               amenitiesMainHandle(
//                                 e.target.checked,
//                                 Family,
//                                 indexFamily
//                               );
//                             }}
//                           />
//                           <label class="form-check-label" for="inlineCheckbox1">
//                             {Family}
//                           </label>
//                           <button
//                             onClick={handleShow}
//                             className="bg-none p-0 border-0"
//                           >
//                             <svg
//                               width="18"
//                               height="18"
//                               viewBox="0 0 18 18"
//                               fill="none"
//                               xmlns="http://www.w3.org/2000/svg"
//                             >
//                               <path
//                                 d="M17.71 4.03957C18.1 3.64957 18.1 2.99957 17.71 2.62957L15.37 0.28957C15 -0.10043 14.35 -0.10043 13.96 0.28957L12.12 2.11957L15.87 5.86957M0 14.2496V17.9996H3.75L14.81 6.92957L11.06 3.17957L0 14.2496Z"
//                                 fill="#146EF5
//                            "
//                               ></path>
//                             </svg>
//                           </button>
//                         </div>
//                       </li>
//                     </>
//                   );
//                 })} */}
//               </ul>
//             </div>
//           </div>
//           <h1 className="text-white mt-5 fs-4 fw-bold mb-3">Indoor</h1>
//           <div className="row">
//             <div className="col-lg-12">
//               <label className="text-white">{Indoor?.placeholder_text} </label>
//               <ul className="amenties-list">
//                 {Indoor?.options?.map((Indoor) => {
//                   return (
//                     <>
//                       <li className="amenties-list-item">
//                         <div
//                           class={
//                             amenitiesIndoorOptions.includes(Indoor)
//                               ? "form-checkbox bg-light text-dark"
//                               : "form-checkbox"
//                           }
//                         >
//                           <input
//                             class="form-check-input"
//                             type="checkbox"
//                             value={Indoor}
//                             onChange={(e) =>
//                               handleIndoorCheckboxChange(e, true)
//                             }
//                             checked={amenitiesIndoorOptions.includes(Indoor)}
//                           />
//                           <label
//                             class="form-check-label"
//                             onClick={() =>
//                               handleCheckItemClick("Indoor", Indoor)
//                             }
//                             // for="inlineCheckbox2"
//                           >
//                             {Indoor}
//                           </label>
//                           <button
//                             className="bg-none p-0 border-0"
//                             onClick={() =>
//                               handleEditButtonClick("Indoor", Indoor)
//                             }
//                           >
//                             <svg
//                               width="18"
//                               height="18"
//                               viewBox="0 0 18 18"
//                               fill="none"
//                               xmlns="http://www.w3.org/2000/svg"
//                             >
//                               <path
//                                 d="M17.71 4.03957C18.1 3.64957 18.1 2.99957 17.71 2.62957L15.37 0.28957C15 -0.10043 14.35 -0.10043 13.96 0.28957L12.12 2.11957L15.87 5.86957M0 14.2496V17.9996H3.75L14.81 6.92957L11.06 3.17957L0 14.2496Z"
//                                 // fill="#146EF5"
//                                 fill={`${checkReservationStatus(
//                                   "Indoor",
//                                   Indoor
//                                 )}`}
//                               ></path>
//                             </svg>
//                           </button>
//                         </div>
//                       </li>
//                     </>
//                   );
//                 })}
//               </ul>
//             </div>
//           </div>

//           <h1 className="text-white mt-5 fs-4 fw-bold mb-3">More</h1>
//           <div className="row ">
//             <div className="col-lg-12">
//               <label className="text-white">{Indoor?.placeholder_text} </label>
//               <ul className="amenties-list">
//                 {More?.options?.map((More) => {
//                   return (
//                     <>
//                       <li className="amenties-list-item">
//                         <div
//                           // class="form-checkbox"
//                           class={
//                             amenitiesMoreOptions.includes(More)
//                               ? "form-checkbox bg-light text-dark"
//                               : "form-checkbox"
//                           }
//                         >
//                           <input
//                             class="form-check-input"
//                             type="checkbox"
//                             // id="inlineCheckbox3"
//                             value={More}
//                             onChange={(e) => handleMoreCheckboxChange(e, true)}
//                             checked={amenitiesMoreOptions.includes(More)}
//                           />
//                           <label
//                             class="form-check-label"
//                             onClick={() => handleCheckItemClick("More", More)}
//                             // for="inlineCheckbox3"
//                           >
//                             {More}
//                           </label>
//                           <button
//                             className="bg-none p-0 border-0"
//                             onClick={() => handleEditButtonClick("More", More)}
//                           >
//                             <svg
//                               width="18"
//                               height="18"
//                               viewBox="0 0 18 18"
//                               fill="none"
//                               xmlns="http://www.w3.org/2000/svg"
//                             >
//                               <path
//                                 d="M17.71 4.03957C18.1 3.64957 18.1 2.99957 17.71 2.62957L15.37 0.28957C15 -0.10043 14.35 -0.10043 13.96 0.28957L12.12 2.11957L15.87 5.86957M0 14.2496V17.9996H3.75L14.81 6.92957L11.06 3.17957L0 14.2496Z"
//                                 // fill="#146EF5"
//                                 fill={`${checkReservationStatus("More", More)}`}
//                               ></path>
//                             </svg>
//                           </button>
//                         </div>
//                       </li>
//                     </>
//                   );
//                 })}
//               </ul>
//             </div>
//           </div>
//           <h1 className="text-white mt-5 fs-4 fw-bold mb-3">Outdoor</h1>
//           <div className="row ">
//             <div className="col-lg-12">
//               <label className="text-white">{Outdoor?.placeholder_text} </label>
//               <ul className="amenties-list">
//                 {Outdoor?.options?.map((Outdoor) => {
//                   return (
//                     <>
//                       <li className="amenties-list-item">
//                         <div
//                           // class="form-checkbox"
//                           class={
//                             amenitiesOutdoorOptions.includes(Outdoor)
//                               ? "form-checkbox bg-light text-dark"
//                               : "form-checkbox"
//                           }
//                         >
//                           <input
//                             class="form-check-input"
//                             type="checkbox"
//                             // id="inlineCheckbox4"
//                             value={Outdoor}
//                             onChange={(e) =>
//                               handleOutdoorCheckboxChange(e, true)
//                             }
//                             checked={amenitiesOutdoorOptions.includes(Outdoor)}
//                           />
//                           <label
//                             class="form-check-label"
//                             onClick={() =>
//                               handleCheckItemClick("Outdoor", Outdoor)
//                             }
//                             // for="inlineCheckbox4"
//                           >
//                             {Outdoor}
//                           </label>
//                           <button
//                             className="bg-none p-0 border-0"
//                             onClick={() =>
//                               handleEditButtonClick("Outdoor", Outdoor)
//                             }
//                           >
//                             <svg
//                               width="18"
//                               height="18"
//                               viewBox="0 0 18 18"
//                               fill="none"
//                               xmlns="http://www.w3.org/2000/svg"
//                             >
//                               <path
//                                 d="M17.71 4.03957C18.1 3.64957 18.1 2.99957 17.71 2.62957L15.37 0.28957C15 -0.10043 14.35 -0.10043 13.96 0.28957L12.12 2.11957L15.87 5.86957M0 14.2496V17.9996H3.75L14.81 6.92957L11.06 3.17957L0 14.2496Z"
//                                 // fill="#146EF5"
//                                 fill={`${checkReservationStatus(
//                                   "Outdoor",
//                                   Outdoor
//                                 )}`}
//                               ></path>
//                             </svg>
//                           </button>
//                         </div>
//                       </li>
//                     </>
//                   );
//                 })}
//               </ul>
//             </div>
//           </div>
//           <h1 className="text-white mt-5 fs-4 fw-bold mb-3">
//             Rules and Services
//           </h1>
//           <div className="row">
//             <div className="col-lg-12">
//               <label className="text-white">
//                 {RulesAndServices?.placeholder_text}{" "}
//               </label>
//               <ul className="amenties-list">
//                 {RulesAndServices?.options?.map((RulesAndServices) => {
//                   return (
//                     <>
//                       <li className="amenties-list-item">
//                         <div
//                           // class="form-checkbox"
//                           class={
//                             amenitiesRulesOptions.includes(RulesAndServices)
//                               ? "form-checkbox bg-light text-dark"
//                               : "form-checkbox"
//                           }
//                         >
//                           <input
//                             class="form-check-input"
//                             type="checkbox"
//                             // id="inlineCheckbox5"
//                             value={RulesAndServices}
//                             onChange={(e) => handleRulesCheckboxChange(e, true)}
//                             checked={amenitiesRulesOptions.includes(
//                               RulesAndServices
//                             )}
//                           />
//                           <label
//                             class="form-check-label"
//                             onClick={() =>
//                               handleCheckItemClick(
//                                 "RulesAndServices",
//                                 RulesAndServices
//                               )
//                             }
//                             // for="inlineCheckbox5"
//                           >
//                             {RulesAndServices}
//                           </label>
//                           <button
//                             className="bg-none p-0 border-0"
//                             onClick={() =>
//                               handleEditButtonClick(
//                                 "RulesAndServices",
//                                 RulesAndServices
//                               )
//                             }
//                           >
//                             <svg
//                               width="18"
//                               height="18"
//                               viewBox="0 0 18 18"
//                               fill="none"
//                               xmlns="http://www.w3.org/2000/svg"
//                             >
//                               <path
//                                 d="M17.71 4.03957C18.1 3.64957 18.1 2.99957 17.71 2.62957L15.37 0.28957C15 -0.10043 14.35 -0.10043 13.96 0.28957L12.12 2.11957L15.87 5.86957M0 14.2496V17.9996H3.75L14.81 6.92957L11.06 3.17957L0 14.2496Z"
//                                 // fill="#146EF5"
//                                 fill={`${checkReservationStatus(
//                                   "RulesAndServices",
//                                   RulesAndServices
//                                 )}`}
//                               ></path>
//                             </svg>
//                           </button>
//                         </div>
//                       </li>
//                     </>
//                   );
//                 })}
//               </ul>
//             </div>
//           </div>

//           <div className="d-flex justify-content-around my-5 form-design">
//             <button class="btn btn-primary">Previous</button>

//             <button class="border_theme_btn previous" onClick={handleSubmit}>
//               {!updateQuestionaireLoading ? <>Save & Next</> : <Loader />}
//             </button>
//           </div>
//         </div>
//       ) : (
//         <BoxLoader />
//       )}
//     </>
//   );
// };

// export default AmenitiesForm;
