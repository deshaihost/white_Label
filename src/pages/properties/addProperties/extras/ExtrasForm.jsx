import React from "react";
import { GetquestionnaireFunction } from "../../../../helper/Authorized";
import Loader from "../../../../helper/Loader";
const ExtrasForm = () => {
  const ExtrasFormCall = GetquestionnaireFunction();
  const { questionnaireApi, apiQuestionnaireLoading } = ExtrasFormCall
    ? ExtrasFormCall
    : [];
  const ExtrasInput = questionnaireApi["Extras"];
  const AdditionalInformation = ExtrasInput["Additional Information"];

  return (
    <>
    {!apiQuestionnaireLoading?<div>
      <h1 className="text-white ">Additional Information</h1>
      <div className="row border p-5">
      {AdditionalInformation?.map((AdditionalInformation) => {
        return (
          <>
              <div className="col-6">
                <div className="text-white">{AdditionalInformation?.question_text}</div>
                <div className="input-container">
                  <input
                  className="bg-dark"
                    type="text"
                    placeholder={AdditionalInformation?.placeholder_text}
                  />
                </div>
              </div>
          </>
        );
      })}
      </div>

    </div>:<Loader/>}</>
    
  );
};

export default ExtrasForm;
