import PencilIcon from "./pencil_icon";

const ShortAnswerComponent = ({ question_object, sec_name, subsec_name, q_ind, handleInputComponentChange, handlePencilIconClick }) => {
  const question_text = question_object.question_text;
  const response_text = question_object.response_text;
  const placeholder_text = question_object.placeholder_text;
  const hide_for_reservations = question_object.hide_for_reservations;

  const someResStageIsSelected = hide_for_reservations && hide_for_reservations !== '[]';
  const field_id = `${sec_name}_${subsec_name}_${q_ind}`;

  return (
    <div className="col-6 mt-3">
      <label className="text-white">
        {question_text}
        <PencilIcon sec_name={sec_name} subsec_name={subsec_name} q_ind={q_ind} handlePencilIconClick={handlePencilIconClick} someResStageIsSelected={someResStageIsSelected}/>
      </label>
      <div className="">
        <input className="bg-dark form-control" type="text" id={field_id}
          onChange={(e) => handleInputComponentChange(e, sec_name, subsec_name, q_ind, "short_answer")}
          placeholder={placeholder_text} defaultValue={response_text} />
      </div>
    </div>
  )
}

export default ShortAnswerComponent;
