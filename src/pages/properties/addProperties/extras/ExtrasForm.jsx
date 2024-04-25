import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  GetquestionnaireFunction,
  nameKey,
} from "../../../../helper/Authorized";
import { updateQuestionnaireActions } from "../../../../redux/actions";
import Loader from "../../../../helper/Loader";
import ToastHandle from "../../../../helper/ToastMessage";
const ExtrasForm = () => {
  const { id } = useParams();
  const store = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loadingStatus, setLoadingStatus] = useState(false);

  const getLocalStorageData = nameKey();

  // to get the complete questionaire object
  const apiQuestionnaireObject =
    store?.getQuestionnaireReducer?.getQuestionnaire?.data;

  // to get the updateQuestionaire status
  const updateQuestionaireStatus =
    store?.updateQuestionnaireReducer?.updateQuestionnaire?.status;

  const ExtrasFormCall = GetquestionnaireFunction();
  const { questionnaireApi, apiQuestionnaireLoading } = ExtrasFormCall
    ? ExtrasFormCall
    : [];
  const ExtrasTextarea = questionnaireApi["Extras"];
  const AdditionalInformation = ExtrasTextarea["Additional Information"];

  const questionaireUpdateMessage =
    store?.updateQuestionnaireReducer?.updateQuestionnaire?.data?.error;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("New Form Data: ", data);

    const questionaireToSend = structuredClone(apiQuestionnaireObject);

    AdditionalInformation[0]["response_text"] =
      data?.AdditionalInformationlong_answer0.trim() === ""
        ? null
        : data?.AdditionalInformationlong_answer0;

    AdditionalInformation[1]["response_text"] =
      data?.AdditionalInformationlong_answer1.trim() === ""
        ? null
        : data?.AdditionalInformationlong_answer1;

    questionaireToSend["questionnaire"]["questionnaire"]["Extras"][
      "Additional Information"
    ] = AdditionalInformation;

    console.log("Updated Data to Send: ", questionaireToSend);

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
        ToastHandle("Questionaire updated successfully", "success");
        setTimeout(() => {
          navigate("/properties");
          console.log("hitted route");
        }, 2000);

        setLoadingStatus(false);
      }
      // dispatch(stateEmptyActions());
    } else if (updateQuestionaireStatus === 402) {
      ToastHandle(questionaireUpdateMessage, "danger");
      // dispatch(stateEmptyActions());
      setLoadingStatus(false);
    } else if (updateQuestionaireStatus === 409) {
      ToastHandle(questionaireUpdateMessage, "danger");
      // dispatch(stateEmptyActions());
      setLoadingStatus(false);
    } else {
      setLoadingStatus(false);
    }
  }, [updateQuestionaireStatus, loadingStatus]);

  return (
    <>
      {!apiQuestionnaireLoading ? (
        <div>
          <h1 className="text-white fs-4 fw-bold mb-3">
            Additional Information
          </h1>
          <div className="row ">
            {AdditionalInformation?.map((AdditionalInformation, index) => {
              return (
                <>
                  <div className="col-12 mt-4 form-design">
                    <label className="text-white">
                      {AdditionalInformation?.question_text}
                    </label>
                    <div className="">
                      <textarea
                        className="bg-dark form-control"
                        type="text"
                        {...register(
                          `AdditionalInformation${AdditionalInformation.question_type}${index}`
                        )}
                        placeholder={AdditionalInformation?.placeholder_text}
                        defaultValue={AdditionalInformation?.response_text}
                      />
                    </div>
                  </div>
                </>
              );
            })}
          </div>

          <div className="d-flex justify-content-around my-5 form-design">
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
              Submit{" "}
            </button>
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default ExtrasForm;
