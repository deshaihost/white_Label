import React, { useState, useEffect } from "react";
import PencilIcon from "./pencil_icon";

const CheckboxGroupComponent = ({ question_object, sec_name, subsec_name, q_ind, handleInputComponentChange, handlePencilIconClick }) => {
  const options = question_object.options; // array
  const placeholder_text = question_object.placeholder_text; // string
  const response_options = question_object.response_options; // array
  const response_text = question_object.response_text; // array
  const hide_for_reservations = question_object.hide_for_reservations; // array
  const field_id_prefix = `${sec_name}_${subsec_name}_${q_ind}`; // string

  // Arrays of booleans, one for each box
  const [checkboxStatuses, setCheckboxStatuses] = useState(new Array(options.length).fill(false)); // Whether the box is checked. This is just to make the UI work, the actual data is stored and updated in handleInputComponentChange
  const [someResStageIsSelected, setSomeResStageIsSelected] = useState(new Array(options.length).fill(false)); // Whether the checkbox has any reservation stages selected to be hidden. This will be passed to the pencil icon and used to determine its color
  const [extraTextIsAdded, setExtraTextIsAdded] = useState(new Array(options.length).fill(false)); // Whether the pencil icon has extra text entered. This will be passed to the pencil icon and used to determine whether to show a green dot

  // When the component mounts, use setCheckboxStatuses to populate previously checked boxes. Only need to do this once, since subsequent changes will be handled by handleCheckboxClick
  useEffect(() => {
    const newCheckboxStatuses = new Array(options.length).fill(false);
    response_options.forEach((option) => {
        newCheckboxStatuses[options.indexOf(option)] = true;
      }
    );
    setCheckboxStatuses(newCheckboxStatuses);
  }, []);

  // When our question data changes, update someResStageIsSelected and extraTextIsAdded so the pencil icon color / green dot can update
  useEffect(() => {
    const newSomeResStageIsSelected = options.map((option, index) => {
      const optionIndexInResponseOptions = response_options.indexOf(option);
      if (optionIndexInResponseOptions !== -1) {
        const hidden_res_stages_for_option = hide_for_reservations[optionIndexInResponseOptions];
        return hidden_res_stages_for_option !== undefined && hidden_res_stages_for_option && hidden_res_stages_for_option !== '[]';
      } else { return false; }
    });
    setSomeResStageIsSelected(newSomeResStageIsSelected);

    const newExtraTextIsAdded = options.map((option, index) => {
      const optionIndexInResponseOptions = response_options.indexOf(option);
      if (optionIndexInResponseOptions !== -1) {
        const response_text_for_option = response_text[optionIndexInResponseOptions];
        return response_text_for_option !== undefined && response_text_for_option && response_text_for_option !== '';
      } else { return false; }
    });
    setExtraTextIsAdded(newExtraTextIsAdded);
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
        {placeholder_text && (
          <label className="modern-label" style={{ marginBottom: '16px', display: 'block' }}>
            {placeholder_text}
          </label>
        )}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(2, 1fr)', 
          gap: '12px' 
        }}>
          {options.map((option, option_index) => {
            const isChecked = checkboxStatuses[option_index];
            return (
              <div 
                key={`${field_id_prefix}_${option_index}`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '12px 16px',
                  background: isChecked ? '#013280' : '#17191f',
                  border: `1px solid ${isChecked ? '#3e88f7' : '#013280'}`,
                  borderRadius: '6px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                onClick={() => {
                  const checkbox = document.getElementById(`${field_id_prefix}_${option_index}`);
                  if (checkbox) {
                    checkbox.click();
                  }
                }}
              >
                <input 
                  className="form-check-input" 
                  type="checkbox" 
                  value={option} 
                  checked={isChecked} 
                  id={`${field_id_prefix}_${option_index}`}
                  onChange={(e) => handleCheckboxClick(e, sec_name, subsec_name, q_ind, option_index)}
                  style={{
                    width: '18px',
                    height: '18px',
                    cursor: 'pointer',
                    margin: 0,
                    flexShrink: 0
                  }}
                />
                <label 
                  className="form-check-label" 
                  htmlFor={`${field_id_prefix}_${option_index}`}
                  style={{ 
                    color: isChecked ? '#fff' : '#a6a9b2',
                    fontSize: '14px',
                    fontWeight: isChecked ? '500' : '400',
                    cursor: 'pointer',
                    margin: 0,
                    flex: 1,
                    userSelect: 'none'
                  }}
                >
                  {option}
                </label>
                {isChecked && (
                  <PencilIcon 
                    sec_name={sec_name} 
                    subsec_name={subsec_name} 
                    q_ind={q_ind} 
                    checkbox_group_option={option} 
                    handlePencilIconClick={handlePencilIconClick} 
                    someResStageIsSelected={someResStageIsSelected[option_index]} 
                    extraTextIsAdded={extraTextIsAdded[option_index]} 
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default CheckboxGroupComponent;
