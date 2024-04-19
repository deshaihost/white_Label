import React from "react";
import { GetquestionnaireFunction } from "../../../../helper/Authorized";
import Loader from "../../../../helper/Loader";
const ExtrasForm = () => {
  const ExtrasFormCall = GetquestionnaireFunction();
  const { questionnaireApi, apiQuestionnaireLoading } = ExtrasFormCall
    ? ExtrasFormCall
    : [];
  const ExtrasTextarea = questionnaireApi["Extras"];
  const AdditionalInformation = ExtrasTextarea["Additional Information"];

  return (
    <>
      {!apiQuestionnaireLoading ? <div>
        <h1 className="text-white fs-4 fw-bold mb-3">Additional Information</h1>
        <div className="row ">
          {AdditionalInformation?.map((AdditionalInformation) => {
            return (
              <>
                <div className="col-12 mt-4 form-design">
                  <label className="text-white">{AdditionalInformation?.question_text}</label>
                  <div className="">
                    <textarea
                      className="bg-dark form-control"
                      type="text"
                      placeholder={AdditionalInformation?.placeholder_text}
                    />
                  </div>
                </div>
              </>
            );
          })}
        </div>

      </div> : <Loader />}</>

  );
};

export default ExtrasForm;
