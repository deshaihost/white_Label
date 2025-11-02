import PencilIcon from "./pencil_icon";

const LongAnswerComponent = ({ question_object, sec_name, subsec_name, q_ind, handleInputComponentChange, handlePencilIconClick }) => {
  const question_text = question_object.question_text;
  const response_text = question_object?.response_text || '';
  const placeholder_text = question_object.placeholder_text;
  const hide_for_reservations = question_object.hide_for_reservations;

  const someResStageIsSelected = hide_for_reservations && hide_for_reservations !== '[]';
  const field_id = `${sec_name}_${subsec_name}_${q_ind}`;

  return (
    <div style={{ marginBottom: '0' }}>
      <label className="modern-label" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        {question_text}
        <PencilIcon sec_name={sec_name} subsec_name={subsec_name} q_ind={q_ind} handlePencilIconClick={handlePencilIconClick} someResStageIsSelected={someResStageIsSelected}/>
      </label>
      <textarea 
        className="modern-input" 
        type="text" 
        id={field_id}
        onChange={(e) => handleInputComponentChange(e, sec_name, subsec_name, q_ind, "long_answer")}
        placeholder={placeholder_text} 
        value={response_text}
        rows="4"
        style={{ minHeight: '100px' }}
      />
    </div>
  )
}

export default LongAnswerComponent;