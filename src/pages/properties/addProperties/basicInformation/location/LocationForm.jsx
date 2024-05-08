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
import { Button, Modal } from "react-bootstrap";
import ToastHandle from "../../../../../helper/ToastMessage";
import SelectModalNote from "../../extraNoteModal/SelectModalNote";

const LocationForm = ({ prntFuntionHeaderActive, updateImageHndle }) => {
  const { id } = useParams();
  const [loadingStatus, setLoadingStatus] = useState(false);
  const [show, setShow] = useState(false);
  const [addedNote, setAddedNote] = useState({});
  const [noteClickData, setNoteClickData] = useState({
    question: "",
    name: "",
    value: "",
  });

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

  const store = useSelector((state) => state);
  const dispatch = useDispatch();
  const getLocalStorageData = nameKey();
  const ExtrasFormCall = GetquestionnaireFunction();

  const apiQuestionnaireData =
    store?.getQuestionnaireReducer?.getQuestionnaire?.data?.questionnaire;

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
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    updateImageHndle()
    const questionaireToSend = structuredClone(apiQuestionnaireObject);

    if (questionnaireApi["Basics"] && questionnaireApi["Basics"]["Location"]) {
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

      questionaireToSend["questionnaire"]["questionnaire"]["Basics"][
        "Location"
      ][1]["response_text"] = data?.short_answer1;

      questionaireToSend["questionnaire"]["questionnaire"]["Basics"][
        "Location"
      ][2]["response_text"] = data?.short_answer2;

      questionaireToSend["questionnaire"]["questionnaire"]["Basics"][
        "Location"
      ][3]["response_text"] = data?.short_answer3;

      questionaireToSend["questionnaire"]["questionnaire"]["Basics"][
        "Location"
      ][4]["response_text"] = data?.short_answer4;

      questionaireToSend["questionnaire"]["questionnaire"]["Basics"][
        "Location"
      ][5]["response_text"] = data?.short_answer5;

      questionaireToSend["questionnaire"]["questionnaire"]["Basics"][
        "Location"
      ][6]["response_text"] = data?.short_answer6;
    }

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
        prntFuntionHeaderActive(id !== undefined && "supportingDoc");
        dispatch(stateEmptyActions());
        setLoadingStatus(false);
      }
    } else {
      setLoadingStatus(false);
    }
  }, [updateQuestionaireStatus]);

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
      {/* <Modal
        size="md"
        show={show}
        onHide={handleClose}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="contact-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Extra Note
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form-design">
            <label>Property Type</label>
            <textarea
              className="form-control"
              name=""
              id=""
              cols="30"
              rows="10"
              placeholder="Enter note here..."
            ></textarea>
            <div className="d-flex justify-content-center mt-3">
              <button className="mw-auto">Add Note</button>
            </div>
          </div>
        </Modal.Body>
      </Modal> */}
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
            {/* <input type="file" {...register("defultImage")} /> */}
            <div>
              <h3 className="text-white fw-bold mb-3 mt-4 fs-4">Location</h3>
            </div>
            <div className="row">
              {locationFildInput?.slice(0, 8).map((item, index) => (
                <div
                  key={index}
                  className={` mt-4 col-${index % 2 === 0 ? "6" : "6"}`}
                >
                  {console.log("Rsponse: ", item?.responseText)}
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
                              item.response_text
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
                      {/* <select
                        className="form-select form-control"
                        {...register(`${item.question_type}${index}`)}
                        defaultValue={item.response_option}
                      >
                        {item.options.map((option, optionIndex) => (
                          <option key={optionIndex} value={option}>
                            {option}
                          </option>
                        ))}
                      </select> */}
                      <select
                        className="form-select form-control"
                        {...register(`${item.question_type}${index}`)}
                        defaultValue={item.response_option} // Set defaultValue to item.response_option
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
                      <input
                        type="text"
                        className="form-control"
                        {...register(`${item.question_type}${index}`)}
                        placeholder={item.placeholder_text}
                        defaultValue={item?.response_text}
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
