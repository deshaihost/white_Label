import React, { useState } from 'react';
import './FilterButton.css';
import filterIcon from '../icons/filter-icon.svg';
import FormFilterComponent from '../FormFilterComponent';

const FilterButton = () => {
  const [showFilterForm, setShowFilterForm] = useState(false);

  const toggleFilterForm = () => {
    setShowFilterForm(!showFilterForm);
  };

  const handleCancelFilter = () => {
    setShowFilterForm(false);
  };

  return (
    <div className="filter-button-container">
      <button 
        className="filter-button" 
        onClick={toggleFilterForm}
      >
        <img src={filterIcon} alt="filter" className="filter-icon" />
        <span>Filter</span>
      </button>
      
      {showFilterForm && (
        <div className="filter-form-popup">
          <FormFilterComponent onCancel={handleCancelFilter} />
        </div>
      )}
    </div>
  );
};

export default FilterButton;