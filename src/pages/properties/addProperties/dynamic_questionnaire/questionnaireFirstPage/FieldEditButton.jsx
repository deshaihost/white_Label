import React from 'react';

/**
 * FieldEditButton component - Shows an edit pencil icon with optional indicators for:
 * - Orange dot: Field has modified reservation phases
 * - Blue dot: Field has notes
 * 
 * Matches the design reference styling from PropertySetup.tsx
 */
const FieldEditButton = ({ fieldKey, hasNote = false, hasPhaseChange = false, onClick }) => {
  return (
    <button 
      onClick={onClick}
      className="field-edit-button"
      aria-label={`Edit ${fieldKey}`}
      type="button"
    >
      <div className="field-edit-button-content">
        {hasPhaseChange && (
          <div className="field-indicator field-indicator-orange" title="Modified reservation phases" />
        )}
        {hasNote && (
          <div className="field-indicator field-indicator-blue" title="Has notes" />
        )}
        <svg className="field-edit-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
        </svg>
      </div>
    </button>
  );
};

export default FieldEditButton;
