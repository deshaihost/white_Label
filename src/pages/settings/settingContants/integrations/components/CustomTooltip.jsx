import React, { useState } from 'react';
import './CustomTooltip.css';

const CustomTooltip = ({ title, description, children }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div 
      className="custom-tooltip-container" 
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {children}
      {showTooltip && (
        <div className="custom-tooltip-content">
          {title && <div className="custom-tooltip-title">{title}</div>}
          {description && <div className="custom-tooltip-description">{description}</div>}
        </div>
      )}
    </div>
  );
};

export default CustomTooltip;
