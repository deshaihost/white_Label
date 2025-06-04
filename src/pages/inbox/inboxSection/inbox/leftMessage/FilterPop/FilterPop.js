import React from 'react';
import './FilterPop.css';
import DropdownComponent from '../DropdownComponent/DropdownComponent';

const FilterPop = ({ 
  show,
  onClose,
  allPropertyNamesList,
  tempPropertyFilter,
  tempPhaseFilter,
  tempUrgentFilter,
  tempFromHostBuddyFilter,
  handlePropertyFilterChange,
  handlePhaseFilterChange,
  handleUrgentClick,
  handleFromHostBuddyClick,
  handleResetFilters,
  handleCancelFilters,
  handleApplyFilters
}) => {
  if (!show) return null;  // Transform property names to dropdown options
  const propertyOptions = [
    { id: '', label: 'All Properties' },
    ...(allPropertyNamesList?.map((property, index) => ({
      id: property,
      label: property
    })) || [])
  ];


  // Phase options
  const phaseOptions = [
    { id: '', label: 'All Phases' },
    { id: 'inquiry', label: 'Inquiry' },
    { id: 'future', label: 'Future' },
    { id: 'current', label: 'Current' },
    { id: 'past', label: 'Past' }
  ];

  // Importance options
  const importanceOptions = [
    { id: 'urgent', label: 'Urgent' }
  ];

  // Source options
  const sourceOptions = [
    { id: 'from_hostbuddy', label: 'From HostBuddy' }
  ];

  // Find selected property option
  const selectedPropertyOption = propertyOptions.find(option => option.id === tempPropertyFilter) || null;
  
  // Find selected phase option
  const selectedPhaseOption = phaseOptions.find(option => option.id === tempPhaseFilter) || null;

  // Handle property selection
  const handlePropertySelect = (option) => {
    const mockEvent = { target: { value: option?.id || '' } };
    handlePropertyFilterChange(mockEvent);
  };

  // Handle phase selection
  const handlePhaseSelect = (option) => {
    const mockEvent = { target: { value: option?.id || '' } };
    handlePhaseFilterChange(mockEvent);
  };

  // Handle importance selection
  const handleImportanceSelect = (option) => {
    if (option?.id === 'urgent') {
      handleUrgentClick();
    }
  };

  // Handle source selection
  const handleSourceSelect = (option) => {
    if (option?.id === 'from_hostbuddy') {
      handleFromHostBuddyClick();
    }
  };

  return (
    <div className="filter-modal-overlay">
      <div className="filter-pop-container">
        <button className="filter-modal-close" onClick={onClose}></button>
        <h2 className="filter-pop-heading">Filter</h2>
        <div className="filter-pop-dropdown">
          <label className="filter-pop-label">Property</label>
          <DropdownComponent 
            options={propertyOptions}
            placeholder="Select property"
            onSelect={handlePropertySelect}
            defaultValue={selectedPropertyOption}
          />
          
          <label className="filter-pop-label">Phase</label>
          <DropdownComponent 
            options={phaseOptions}
            placeholder="Select phase"
            onSelect={handlePhaseSelect}
            defaultValue={selectedPhaseOption}
          />
          
          <label className="filter-pop-label">Importance</label>
          <DropdownComponent 
            options={importanceOptions}
            placeholder={tempUrgentFilter ? "Urgent (Selected)" : "Select importance"}
            onSelect={handleImportanceSelect}
            defaultValue={tempUrgentFilter ? importanceOptions[0] : null}
          />
          
          <label className="filter-pop-label">Source</label>
          <DropdownComponent 
            options={sourceOptions}
            placeholder={tempFromHostBuddyFilter ? "From HostBuddy (Selected)" : "Select source"}
            onSelect={handleSourceSelect}
            defaultValue={tempFromHostBuddyFilter ? sourceOptions[0] : null}
          />
        </div>
        
        <div className="filter-pop-buttons">
          <button className="filter-pop-button filter-pop-button--reset" onClick={handleResetFilters}>
            Reset Filter
          </button>
          <button className="filter-pop-button filter-pop-button--cancel" onClick={handleCancelFilters}>
            Cancel
          </button>
          <button className="filter-pop-button filter-pop-button--apply" onClick={handleApplyFilters}>
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterPop;
