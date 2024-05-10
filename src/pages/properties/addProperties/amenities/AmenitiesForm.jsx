import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import {
  GetquestionnaireFunction,
  nameKey,
} from "../../../../helper/Authorized";
import { stateEmptyActions, updateQuestionnaireActions } from "../../../../redux/actions";
import Loader, { BoxLoader } from "../../../../helper/Loader";
import { Modal } from "react-bootstrap";
import ToastHandle from "../../../../helper/ToastMessage";
import CheckboxModalNote from "../extraNoteModal/CheckboxModalNote";
const AmenitiesForm = ({ prntFuntionHeaderActive }) => {
  const { id } = useParams();
  const store = useSelector((state) => state);
  const dispatch = useDispatch();

  const [loadingStatus, setLoadingStatus] = useState(false);

  const [amenitiesFamilyOptions, setAmenitiesFamilyOptions] = useState([]);
  const [amenitiesIndoorOptions, setAmenitiesIndoorOptions] = useState([]);
  const [amenitiesMoreOptions, setAmenitiesMoreOptions] = useState([]);
  const [amenitiesOutdoorOptions, setAmenitiesOutdoorOptions] = useState([]);
  const [amenitiesRulesOptions, setAmenitiesRulesOptions] = useState([]);

  const [amenitiesFamilyResponse, setAmenitiesFamilyResponse] = useState([]);
  const [amenitiesIndoorResponse, setAmenitiesIndoorResponse] = useState([]);
  const [amenitiesMoreResponse, setAmenitiesMoreResponse] = useState([]);
  const [amenitiesOutdoorResponse, setAmenitiesOutdoorResponse] = useState([]);
  const [amenitiesRulesResponse, setAmenitiesRulesResponse] = useState([]);

  const [amenitiesFamilyHideReservation, setAmenitiesFamilyHideReservation] = useState([]);
  const [amenitiesIndoorHideReservation, setAmenitiesIndoorHideReservation] = useState([]);
  const [amenitiesMoreHideReservation, setAmenitiesMoreHideReservation] = useState([]);
  const [amenitiesOutdoorHideReservation, setAmenitiesOutdoorHideReservation] = useState([]);
  const [amenitiesRulesHideReservation, setAmenitiesRulesHideReservation] = useState([]);

  const getLocalStorageData = nameKey();

  const [show, setShow] = useState(false);
  const [addedNote, setAddedNote] = useState({});
  const [noteClickData, setNoteClickData] = useState({
    type: "",
    name: "",
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const ExtrasFormCall = GetquestionnaireFunction();
  const { questionnaireApi, apiQuestionnaireLoading } = ExtrasFormCall
    ? ExtrasFormCall
    : [];
  const Amenities = questionnaireApi["Amenities"]
    ? questionnaireApi["Amenities"]
    : [];
  const family = Amenities["Family"]?.[0];
  const Indoor = Amenities["Indoor"]?.[0];
  const More = Amenities["More"]?.[0];
  const Outdoor = Amenities["Outdoor"]?.[0];
  const RulesAndServices = Amenities["Rules and Services"]?.[0];

  // console.log("Family: ", family)
  // if (family.response_options.length !== 0) {
  //   setAmenitiesFamilyOptions(family.response_options);
  // }

  // to get the complete questionaire object
  const apiQuestionnaireObject =
    store?.getQuestionnaireReducer?.getQuestionnaire?.data;

  // to get the updateQuestionaire status
  const updateQuestionaireStatus =
    store?.updateQuestionnaireReducer?.updateQuestionnaire?.status;
  const updateQuestionaireLoading = store?.updateQuestionnaireReducer?.loading;
  const updateQuestionnaireMessage =
    store?.updateQuestionnaireReducer?.updateQuestionnaire?.data?.message;

  // const [amenitiesInputOnClickGet, setAmenitiesInputOnClickGet] = useState([]);

  // const amenitiesMainHandle = (type, item, id) => {
  //   if (type) {
  //     setAmenitiesInputOnClickGet([...amenitiesInputOnClickGet, { id, item }]);
  //   } else if (!type) {
  //     let getFilter = amenitiesInputOnClickGet?.filter(
  //       (items) => items?.id !== id
  //     );
  //     setAmenitiesInputOnClickGet(getFilter);
  //   }
  // };

  // handle checkbox click based on the text click
  const handleCheckItemClick = (type, checkedValue) => {

    if (type === "family") {
      if (!amenitiesFamilyOptions.includes(checkedValue)) {
        // If the familyValue is not already included, add it to the state
        setAmenitiesFamilyOptions((prevState) => [...prevState, checkedValue]);
        // add "" for selected family value
        setAmenitiesFamilyResponse((prevState) => [...prevState, ""]);

        setAmenitiesFamilyHideReservation((prevState) => [...prevState, ""]);
      }

      setNoteClickData({
        ...noteClickData,
        type: type,
        name: checkedValue,
      });
    }

    if (type === "Indoor") {
      if (!amenitiesIndoorOptions.includes(checkedValue)) {
        // If the familyValue is not already included, add it to the state
        setAmenitiesIndoorOptions((prevState) => [...prevState, checkedValue]);
        // add "" for selected family value
        setAmenitiesIndoorResponse((prevState) => [...prevState, ""]);
      }

      setNoteClickData({
        ...noteClickData,
        type: type,
        name: checkedValue,
      });
    }

    if (type === "More") {
      if (!amenitiesMoreOptions.includes(checkedValue)) {
        // If the familyValue is not already included, add it to the state
        setAmenitiesMoreOptions((prevState) => [...prevState, checkedValue]);
        // add "" for selected family value
        setAmenitiesMoreResponse((prevState) => [...prevState, ""]);
      }

      setNoteClickData({
        ...noteClickData,
        type: type,
        name: checkedValue,
      });
    }

    if (type === "Outdoor") {
      if (!amenitiesOutdoorOptions.includes(checkedValue)) {
        // If the familyValue is not already included, add it to the state
        setAmenitiesOutdoorOptions((prevState) => [...prevState, checkedValue]);
        // add "" for selected family value
        setAmenitiesOutdoorResponse((prevState) => [...prevState, ""]);
      }

      setNoteClickData({
        ...noteClickData,
        type: type,
        name: checkedValue,
      });
    }

    if (type === "RulesAndServices") {
      if (!amenitiesRulesOptions.includes(checkedValue)) {
        // If the familyValue is not already included, add it to the state
        setAmenitiesRulesOptions((prevState) => [...prevState, checkedValue]);
        // add "" for selected family value
        setAmenitiesRulesResponse((prevState) => [...prevState, ""]);
      }

      setNoteClickData({
        ...noteClickData,
        type: type,
        name: checkedValue,
      });
    }

  }

  // handle edit or add note button click to add checkbox to checked state
  const handleEditButtonClick = (type, amenityValue) => {
    console.log("amenityValue: ", amenityValue)
    if (type === "family") {
      if (!amenitiesFamilyOptions.includes(amenityValue)) {
        // If the familyValue is not already included, add it to the state
        setAmenitiesFamilyOptions((prevState) => [...prevState, amenityValue]);
        // add "" for selected family value
        setAmenitiesFamilyResponse((prevState) => [...prevState, ""]);
        // add "" for selected family value
        setAmenitiesFamilyHideReservation((prevState) => [...prevState, ""]);
      }

      setNoteClickData({
        ...noteClickData,
        type: type,
        name: amenityValue,
      });
    }

    if (type === "Indoor") {
      if (!amenitiesIndoorOptions.includes(amenityValue)) {
        // If the familyValue is not already included, add it to the state
        setAmenitiesIndoorOptions((prevState) => [...prevState, amenityValue]);
        // add "" for selected family value
        setAmenitiesIndoorResponse((prevState) => [...prevState, ""]);
      }

      setNoteClickData({
        ...noteClickData,
        type: type,
        name: amenityValue,
      });
    }

    if (type === "More") {
      if (!amenitiesMoreOptions.includes(amenityValue)) {
        // If the familyValue is not already included, add it to the state
        setAmenitiesMoreOptions((prevState) => [...prevState, amenityValue]);
        // add "" for selected family value
        setAmenitiesMoreResponse((prevState) => [...prevState, ""]);
      }

      setNoteClickData({
        ...noteClickData,
        type: type,
        name: amenityValue,
      });
    }

    if (type === "Outdoor") {
      if (!amenitiesOutdoorOptions.includes(amenityValue)) {
        // If the familyValue is not already included, add it to the state
        setAmenitiesOutdoorOptions((prevState) => [...prevState, amenityValue]);
        // add "" for selected family value
        setAmenitiesOutdoorResponse((prevState) => [...prevState, ""]);
      }

      setNoteClickData({
        ...noteClickData,
        type: type,
        name: amenityValue,
      });
    }

    if (type === "RulesAndServices") {
      if (!amenitiesRulesOptions.includes(amenityValue)) {
        // If the familyValue is not already included, add it to the state
        setAmenitiesRulesOptions((prevState) => [...prevState, amenityValue]);
        // add "" for selected family value
        setAmenitiesRulesResponse((prevState) => [...prevState, ""]);
      }

      setNoteClickData({
        ...noteClickData,
        type: type,
        name: amenityValue,
      });
    }

    setShow(true);
    // handleShow(
    //   booking.question_text,
    //   `${booking.question_type}${index}_bookingnote`,
    //   booking.response_text
    // )
    // }
  };

  const handleFamilyCheckboxChange = (event) => {
    const { value, checked } = event.target;
    console.log(value, checked, '+++++')
    if (checked) {
      // If checkbox is checked, add value to the state
      setAmenitiesFamilyOptions((prevState) => [...prevState, value]);
      setAmenitiesFamilyResponse((prevState) => [...prevState, ""]);
    } else {
      // If checkbox is unchecked, remove value from the state

      const indexVal = amenitiesFamilyOptions.indexOf(value);
      // remove responseText from array for family
      setAmenitiesFamilyResponse((prevState) =>
        prevState.filter((item, index) => index !== indexVal)
      );

      setAmenitiesFamilyOptions((prevState) =>
        prevState.filter((item) => item !== value)
      );
    }
  };

  const handleIndoorCheckboxChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      // If checkbox is checked, add value to the state
      setAmenitiesIndoorOptions((prevState) => [...prevState, value]);
      setAmenitiesIndoorResponse((prevState) => [...prevState, ""]);
    } else {
      // If checkbox is unchecked, remove value from the state
      const indexVal = amenitiesIndoorOptions.indexOf(value);
      // remove responseText from array for family
      setAmenitiesIndoorResponse((prevState) =>
        prevState.filter((item, index) => index !== indexVal)
      );

      setAmenitiesIndoorOptions((prevState) =>
        prevState.filter((item) => item !== value)
      );
    }
  };

  const handleMoreCheckboxChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      // If checkbox is checked, add value to the state
      setAmenitiesMoreOptions((prevState) => [...prevState, value]);
      setAmenitiesMoreResponse((prevState) => [...prevState, ""]);
    } else {
      // If checkbox is unchecked, remove value from the state
      const indexVal = amenitiesMoreOptions.indexOf(value);
      // remove responseText from array for family
      setAmenitiesMoreResponse((prevState) =>
        prevState.filter((item, index) => index !== indexVal)
      );

      setAmenitiesMoreOptions((prevState) =>
        prevState.filter((item) => item !== value)
      );
    }
  };

  const handleOutdoorCheckboxChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      // If checkbox is checked, add value to the state
      setAmenitiesOutdoorOptions((prevState) => [...prevState, value]);
      setAmenitiesOutdoorResponse((prevState) => [...prevState, ""]);
    } else {
      // If checkbox is unchecked, remove value from the state
      const indexVal = amenitiesOutdoorOptions.indexOf(value);
      // remove responseText from array for family
      setAmenitiesOutdoorResponse((prevState) =>
        prevState.filter((item, index) => index !== indexVal)
      );

      setAmenitiesOutdoorOptions((prevState) =>
        prevState.filter((item) => item !== value)
      );
    }
  };

  const handleRulesCheckboxChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      // If checkbox is checked, add value to the state
      setAmenitiesRulesOptions((prevState) => [...prevState, value]);
      setAmenitiesRulesResponse((prevState) => [...prevState, ""]);
    } else {
      // If checkbox is unchecked, remove value from the state
      const indexVal = amenitiesRulesOptions.indexOf(value);
      // remove responseText from array for family
      setAmenitiesRulesResponse((prevState) =>
        prevState.filter((item, index) => index !== indexVal)
      );

      setAmenitiesRulesOptions((prevState) =>
        prevState.filter((item) => item !== value)
      );
    }
  };

  const handleSubmit = () => {
    const questionaireToSend = structuredClone(apiQuestionnaireObject);
    // console.log(
    //   questionaireToSend["questionnaire"]["questionnaire"]["Amenities"][
    //     "Family"
    //   ][0]["response_options"]
    // );

    questionaireToSend["questionnaire"]["questionnaire"]["Amenities"][
      "Family"
    ][0]["response_options"] = amenitiesFamilyOptions;

    questionaireToSend["questionnaire"]["questionnaire"]["Amenities"][
      "Family"
    ][0]["response_text"] = amenitiesFamilyResponse;

    questionaireToSend["questionnaire"]["questionnaire"]["Amenities"][
      "Indoor"
    ][0]["response_options"] = amenitiesIndoorOptions;

    questionaireToSend["questionnaire"]["questionnaire"]["Amenities"][
      "Indoor"
    ][0]["response_text"] = amenitiesIndoorResponse;

    questionaireToSend["questionnaire"]["questionnaire"]["Amenities"][
      "More"
    ][0]["response_options"] = amenitiesMoreOptions;

    questionaireToSend["questionnaire"]["questionnaire"]["Amenities"][
      "More"
    ][0]["response_text"] = amenitiesMoreResponse;

    questionaireToSend["questionnaire"]["questionnaire"]["Amenities"][
      "Outdoor"
    ][0]["response_options"] = amenitiesOutdoorOptions;

    questionaireToSend["questionnaire"]["questionnaire"]["Amenities"][
      "Outdoor"
    ][0]["response_text"] = amenitiesOutdoorResponse;

    questionaireToSend["questionnaire"]["questionnaire"]["Amenities"][
      "Rules and Services"
    ][0]["response_options"] = amenitiesRulesOptions;

    questionaireToSend["questionnaire"]["questionnaire"]["Amenities"][
      "Rules and Services"
    ][0]["response_text"] = amenitiesRulesResponse;


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
        prntFuntionHeaderActive(id !== undefined && "extras");
        dispatch(stateEmptyActions());

        setLoadingStatus(false);
      }
    }
  }, [updateQuestionaireStatus, loadingStatus]);

  useEffect(() => {
    if (family?.response_options.length > 0) {
      setAmenitiesFamilyOptions(family?.response_options);
      setAmenitiesFamilyResponse(family?.response_text);
      setAmenitiesFamilyHideReservation(family?.hide_for_reservations);

    }

    if (Indoor?.response_options.length > 0) {
      setAmenitiesIndoorOptions(Indoor.response_options);
      setAmenitiesIndoorResponse(Indoor.response_text);
      setAmenitiesIndoorHideReservation(Indoor.hide_for_reservations);
    }

    if (More?.response_options.length > 0) {
      setAmenitiesMoreOptions(More.response_options);
      setAmenitiesMoreResponse(More.response_text);
      setAmenitiesMoreHideReservation(More.hide_for_reservations);
    }

    if (Outdoor?.response_options.length > 0) {
      setAmenitiesOutdoorOptions(Outdoor.response_options);
      setAmenitiesOutdoorResponse(Outdoor.response_text);
      setAmenitiesOutdoorHideReservation(Outdoor.hide_for_reservations);
    }

    if (RulesAndServices?.response_options.length > 0) {
      setAmenitiesRulesOptions(RulesAndServices.response_options);
      setAmenitiesRulesResponse(RulesAndServices.response_text);
      setAmenitiesRulesHideReservation(RulesAndServices.hide_for_reservations);
    }
  }, [family, Indoor, More, Outdoor, RulesAndServices]);

  return (
    <>

      {show && (
        <CheckboxModalNote
          show={show}
          handleClose={handleClose}
          noteClickData={noteClickData}
          responseOptions={
            (noteClickData.type === "family" && amenitiesFamilyOptions) ||
            (noteClickData.type === "Indoor" && amenitiesIndoorOptions) ||
            (noteClickData.type === "More" && amenitiesMoreOptions) ||
            (noteClickData.type === "Outdoor" && amenitiesOutdoorOptions) ||
            (noteClickData.type === "RulesAndServices" && amenitiesRulesOptions)
          }
          responseText={
            (noteClickData.type === "family" && amenitiesFamilyResponse) ||
            (noteClickData.type === "Indoor" && amenitiesIndoorResponse) ||
            (noteClickData.type === "More" && amenitiesMoreResponse) ||
            (noteClickData.type === "Outdoor" && amenitiesOutdoorResponse) ||
            (noteClickData.type === "RulesAndServices" &&
              amenitiesRulesResponse)
          }
          setResponseText={
            (noteClickData.type === "family" && setAmenitiesFamilyResponse) ||
            (noteClickData.type === "Indoor" && setAmenitiesIndoorResponse) ||
            (noteClickData.type === "More" && setAmenitiesMoreResponse) ||
            (noteClickData.type === "Outdoor" && setAmenitiesOutdoorResponse) ||
            (noteClickData.type === "RulesAndServices" &&
              setAmenitiesRulesResponse)
          }
          hideReservationText={
            (noteClickData.type === "family" && amenitiesFamilyHideReservation) ||
            (noteClickData.type === "Indoor" && amenitiesIndoorHideReservation) ||
            (noteClickData.type === "More" && amenitiesMoreHideReservation) ||
            (noteClickData.type === "Outdoor" && amenitiesOutdoorHideReservation) ||
            (noteClickData.type === "RulesAndServices" &&
              amenitiesRulesHideReservation)
          }
          setHideReservationText={
            (noteClickData.type === "family" && setAmenitiesFamilyHideReservation) ||
            (noteClickData.type === "Indoor" && setAmenitiesIndoorHideReservation) ||
            (noteClickData.type === "More" && setAmenitiesMoreHideReservation) ||
            (noteClickData.type === "Outdoor" && setAmenitiesOutdoorHideReservation) ||
            (noteClickData.type === "RulesAndServices" &&
              setAmenitiesRulesHideReservation)
          }
        />
      )}

      {!apiQuestionnaireLoading ? (
        <div>
          <h1 className="text-white fs-4 fw-bold mb-3">family</h1>
          <div className="row ">
            <div className="col-lg-12">
              <label className="text-white">{family?.placeholder_text} </label>
              <ul className="amenties-list">
                {family?.options?.map((family) => {
                  return (
                    <>
                      <li className="amenties-list-item">
                        <div class={amenitiesFamilyOptions.includes(family) ? "form-checkbox bg-light text-dark" : "form-checkbox"}>
                          <input
                            class="form-check-input"
                            type="checkbox"
                            // id="inlineCheckbox1"
                            value={family}
                            onChange={handleFamilyCheckboxChange}
                            checked={amenitiesFamilyOptions.includes(family)}
                          />
                          <label class="form-check-label"
                            // for="inlineCheckbox2" 
                            onClick={() => handleCheckItemClick("family", family)}
                          >
                            {family}
                          </label>
                          <button
                            className="bg-none p-0 border-0"
                            onClick={() =>
                              handleEditButtonClick("family", family)
                            }
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
                                fill="#146EF5
                                                                    "
                              ></path>
                            </svg>
                          </button>
                        </div>
                      </li>
                    </>
                  );
                })}
                {/* {family?.options?.map((family, indexFamily) => {
                  const activeName = amenitiesInputOnClickGet.some((el) =>
                    family.includes(el?.item)
                  );
                  return (
                    <>
                      <li className="amenties-list-item">
                        <div
                          class={
                            activeName
                              ? "form-checkbox active"
                              : "form-checkbox "
                          }
                        >
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="inlineCheckbox1"
                            value="option1"
                            onClick={(e) => {
                              amenitiesMainHandle(
                                e.target.checked,
                                family,
                                indexFamily
                              );
                            }}
                          />
                          <label class="form-check-label" for="inlineCheckbox1">
                            {family}
                          </label>
                          <button
                            onClick={handleShow}
                            className="bg-none p-0 border-0"
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
                                fill="#146EF5
                           "
                              ></path>
                            </svg>
                          </button>
                        </div>
                      </li>
                    </>
                  );
                })} */}
              </ul>
            </div>
          </div>
          <h1 className="text-white mt-5 fs-4 fw-bold mb-3">Indoor</h1>
          <div className="row">
            <div className="col-lg-12">
              <label className="text-white">{Indoor?.placeholder_text} </label>
              <ul className="amenties-list">
                {Indoor?.options?.map((Indoor) => {
                  return (
                    <>
                      <li className="amenties-list-item">
                        <div
                          class={amenitiesIndoorOptions.includes(Indoor) ? "form-checkbox bg-light text-dark" : "form-checkbox"}>
                          <input
                            class="form-check-input"
                            type="checkbox"
                            value={Indoor}
                            onChange={handleIndoorCheckboxChange}
                            checked={amenitiesIndoorOptions.includes(Indoor)}
                          />
                          <label class="form-check-label"
                            onClick={() => handleCheckItemClick("Indoor", Indoor)}
                          // for="inlineCheckbox2"
                          >
                            {Indoor}
                          </label>
                          <button
                            className="bg-none p-0 border-0"
                            onClick={() =>
                              handleEditButtonClick("Indoor", Indoor)
                            }
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

          <h1 className="text-white mt-5 fs-4 fw-bold mb-3">More</h1>
          <div className="row ">
            <div className="col-lg-12">
              <label className="text-white">{Indoor?.placeholder_text} </label>
              <ul className="amenties-list">
                {More?.options?.map((More) => {
                  return (
                    <>
                      <li className="amenties-list-item">
                        <div
                          // class="form-checkbox"
                          class={amenitiesMoreOptions.includes(More) ? "form-checkbox bg-light text-dark" : "form-checkbox"}>
                          <input
                            class="form-check-input"
                            type="checkbox"
                            // id="inlineCheckbox3"
                            value={More}
                            onChange={handleMoreCheckboxChange}
                            checked={amenitiesMoreOptions.includes(More)}
                          />
                          <label class="form-check-label"
                            onClick={() => handleCheckItemClick("More", More)}
                          // for="inlineCheckbox3"
                          >
                            {More}
                          </label>
                          <button
                            className="bg-none p-0 border-0"
                            onClick={() => handleEditButtonClick("More", More)}
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
                                fill="#146EF5
                                                                    "
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
          <h1 className="text-white mt-5 fs-4 fw-bold mb-3">Outdoor</h1>
          <div className="row ">
            <div className="col-lg-12">
              <label className="text-white">{Outdoor?.placeholder_text} </label>
              <ul className="amenties-list">
                {Outdoor?.options?.map((Outdoor) => {
                  return (
                    <>
                      <li className="amenties-list-item">
                        <div
                          // class="form-checkbox"
                          class={amenitiesOutdoorOptions.includes(Outdoor) ? "form-checkbox bg-light text-dark" : "form-checkbox"}>
                          <input
                            class="form-check-input"
                            type="checkbox"
                            // id="inlineCheckbox4"
                            value={Outdoor}
                            onChange={handleOutdoorCheckboxChange}
                            checked={amenitiesOutdoorOptions.includes(Outdoor)}
                          />
                          <label class="form-check-label"
                            onClick={() => handleCheckItemClick("Outdoor", Outdoor)}
                          // for="inlineCheckbox4"
                          >
                            {Outdoor}
                          </label>
                          <button
                            className="bg-none p-0 border-0"
                            onClick={() =>
                              handleEditButtonClick("Outdoor", Outdoor)
                            }
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
                                fill="#146EF5
                                                                    "
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
          <h1 className="text-white mt-5 fs-4 fw-bold mb-3">
            Rules and Services
          </h1>
          <div className="row">
            <div className="col-lg-12">
              <label className="text-white">
                {RulesAndServices?.placeholder_text}{" "}
              </label>
              <ul className="amenties-list">
                {RulesAndServices?.options?.map((RulesAndServices) => {
                  return (
                    <>
                      <li className="amenties-list-item">
                        <div
                          // class="form-checkbox"
                          class={amenitiesRulesOptions.includes(
                            RulesAndServices
                          ) ? "form-checkbox bg-light text-dark" : "form-checkbox"}
                        >
                          <input
                            class="form-check-input"
                            type="checkbox"
                            // id="inlineCheckbox5"
                            value={RulesAndServices}
                            onChange={handleRulesCheckboxChange}
                            checked={amenitiesRulesOptions.includes(
                              RulesAndServices
                            )}
                          />
                          <label class="form-check-label"
                            onClick={() => handleCheckItemClick("RulesAndServices", RulesAndServices)}
                          // for="inlineCheckbox5"
                          >
                            {RulesAndServices}
                          </label>
                          <button
                            className="bg-none p-0 border-0"
                            onClick={() =>
                              handleEditButtonClick(
                                "RulesAndServices",
                                RulesAndServices
                              )
                            }
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
                                fill="#146EF5
                                                                    "
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

          <div className="d-flex justify-content-around my-5 form-design">
            <button class="btn btn-primary">Previous</button>

            <button class="border_theme_btn previous" onClick={handleSubmit}>
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

export default AmenitiesForm;
