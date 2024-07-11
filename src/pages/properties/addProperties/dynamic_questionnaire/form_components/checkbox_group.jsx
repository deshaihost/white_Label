import React, { useState, useEffect } from "react";
import PencilIcon from "./pencil_icon";

const CheckboxGroupComponent = ({ question_object, sec_name, subsec_name, q_ind, handleInputComponentChange, handlePencilIconClick }) => {
  const options = question_object.options; // array
  const placeholder_text = question_object.placeholder_text; // string
  const response_options = question_object.response_options; // array
  const response_text = question_object.response_text; // array
  const hide_for_reservations = question_object.hide_for_reservations; // array
  const field_id_prefix = `${sec_name}_${subsec_name}_${q_ind}`; // string

  // Array of booleans, one for each box, to keep track of which checkboxes are checked. This is just to make the UI work, the actual data is stored and updated in handleInputComponentChange
  const [checkboxStatuses, setCheckboxStatuses] = useState(new Array(options.length).fill(false));

  // Array of booleans, one for each box, to keep track of whether the checkbox has any reservation stages selected to be hidden. This will be passed to the pencil icon and used to determine its color
  const [someResStageIsSelected, setSomeResStageIsSelected] = useState(new Array(options.length).fill(false));

  // When the component mounts, use setCheckboxStatuses to populate previously checked boxes. Only need to do this once, since subsequent changes will be handled by handleCheckboxClick
  useEffect(() => {
    const newCheckboxStatuses = new Array(options.length).fill(false);
    response_options.forEach((option) => {
        newCheckboxStatuses[options.indexOf(option)] = true;
      }
    );
    setCheckboxStatuses(newCheckboxStatuses);
  }, []);

  // When our question data changes, update someResStageIsSelected so the pencil icon color can update
  useEffect(() => {
    //console.log('updating someResStageIsSelected')
    const newSomeResStageIsSelected = options.map((option, index) => {
      const optionIndexInResponseOptions = response_options.indexOf(option);
      if (optionIndexInResponseOptions !== -1) {
        const hidden_res_stages_for_option = hide_for_reservations[optionIndexInResponseOptions];
        return hidden_res_stages_for_option !== undefined && hidden_res_stages_for_option && hidden_res_stages_for_option !== '[]';
      } else { return false; }
    });
    setSomeResStageIsSelected(newSomeResStageIsSelected);
  }, [hide_for_reservations, response_options]);

  const handleCheckboxClick = (event, sec_name, subsec_name, question_ind, option_ind) => {
    // Update the checkboxStatuses array so the box shows checked or unchecked in the UI
    const newCheckboxStatuses = [...checkboxStatuses];
    newCheckboxStatuses[option_ind] = event.target.checked;
    setCheckboxStatuses(newCheckboxStatuses);

    // Then, call handleInputComponentChange to update our questionnaire object with the new data
    handleInputComponentChange(event, sec_name, subsec_name, question_ind, "checkbox_group")
  }
  
  return (
    <div className="row ">
      <div className="col-lg-12">
        <label className="text-white">{placeholder_text} </label>
        <ul className="amenties-list">
          {options.map((option, option_index) => {
            //const someResStageIsSelected = hide_for_reservations[option_index] !== undefined && hide_for_reservations[option_index] && hide_for_reservations[option_index] !== '[]';
            return (
              <li className="amenties-list-item">
                <div className={ checkboxStatuses[option_index] ? "form-checkbox bg-light text-dark" : "form-checkbox" } key={`${field_id_prefix}_${option_index}`}>
                  <input className="form-check-input" type="checkbox" value={option} checked={checkboxStatuses[option_index]} id={`${field_id_prefix}_${option_index}`}
                  onChange={(e) => handleCheckboxClick(e, sec_name, subsec_name, q_ind, option_index)}/>
                  <label className="form-check-label" onClick={() => {} } 
                  style={{ color: checkboxStatuses[option_index] ? "black" : "rgb(255 255 255 / 60%)", fontSize: "15px", fontStyle: "normal", fontWeight: 500, lineHeight: "normal", cursor: "pointer", marginBottom: "0px" }}>
                    {option}
                  </label>
                  {checkboxStatuses[option_index] && <PencilIcon sec_name={sec_name} subsec_name={subsec_name} q_ind={q_ind} checkbox_group_option={option} handlePencilIconClick={handlePencilIconClick} someResStageIsSelected={someResStageIsSelected[option_index]}/>}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default CheckboxGroupComponent;
