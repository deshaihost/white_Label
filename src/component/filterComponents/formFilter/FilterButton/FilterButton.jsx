import React from "react";
import FilterListIcon from '@mui/icons-material/FilterList';
import "./FilterButton.css";

const FilterButton = ({ onClick, children }) => (
  <button className="filter-button" onClick={onClick}>
    <FilterListIcon className="filter-icon" />
    {children}
  </button>
);

export default FilterButton;
