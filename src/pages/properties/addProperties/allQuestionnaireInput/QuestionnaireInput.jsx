import React from "react";
import QuestionnaireForm from "./QustionnaireForm/QuestionnaireForm";
const QuestionnaireInput = ({ interFaceActiveQuestionnarie }) => {
  const InterFaceQuestion = interFaceActiveQuestionnarie.trim();
  return (
    <div className="text-white">
      <div>
        <QuestionnaireForm InterFaceQuestion={InterFaceQuestion} />
      </div>
    </div>
  );
};

export default QuestionnaireInput;
