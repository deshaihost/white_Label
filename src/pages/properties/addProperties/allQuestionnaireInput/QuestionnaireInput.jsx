import React from "react";

import QuestionnaireForm from "./QustionnaireForm/QuestionnaireForm";
const QuestionnaireInput = ({
  prntFuntionHeaderActive,
  interFaceActiveQuestionnarie,
}) => {
  const InterFaceQuestion = interFaceActiveQuestionnarie.trim();
  return (
    <div className="text-white">
      <div>
        <QuestionnaireForm
          InterFaceQuestion={InterFaceQuestion}
          prntFuntionHeaderActive={prntFuntionHeaderActive}
        />
      </div>
    </div>
  );
};

export default QuestionnaireInput;
