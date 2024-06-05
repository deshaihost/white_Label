import React, { useState, useEffect } from "react";
import PencilIcon from "./pencil_icon";

const SelectComponent = ({ question_object, sec_name, subsec_name, q_ind, handleInputComponentChange, handlePencilIconClick }) => {
  const options = question_object.options;
  const question_text = question_object.question_text;
  const response_option = question_object.response_option;
  const response_text = question_object.response_text;
  const hide_for_reservations = question_object.hide_for_reservations;

  const someResStageIsSelected = hide_for_reservations && hide_for_reservations !== '[]';
  const field_id = `${sec_name}_${subsec_name}_${q_ind}`;
  
  return (
      <div className="col-6 mt-3">
        <label className="text-white">
          {question_text}
          <PencilIcon sec_name={sec_name} subsec_name={subsec_name} q_ind={q_ind} handlePencilIconClick={handlePencilIconClick} someResStageIsSelected={someResStageIsSelected}/>
        </label>
        <select className="form-select form-control" aria-label="Default select example" id={field_id} value={response_option}
        onChange={(e) => handleInputComponentChange(e, sec_name, subsec_name, q_ind, "select")}>
          {options.map((option_item, option_index) => {
            return (
              <option key={option_index} value={option_item ? option_item : ''}>
                {option_item}
              </option>
            );
          })}
        </select>
      </div>
    );
  }

export default SelectComponent;
