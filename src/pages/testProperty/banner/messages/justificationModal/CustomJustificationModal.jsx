import React, { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import "./customJustificationModal.css"; // We'll create this CSS file next

// Custom justification modal component that matches the screenshot
const CustomJustificationModal = ({ show, handleClose, propertyName, justification }) => {
  const modalRef = useRef(null);

  // Handle click outside to close
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target) && show) {
        handleClose();
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [handleClose, show]);

  // If not showing, don't render
  if (!show) return null;

  // Example data structure based on the screenshot
  const justificationSections = [
    {
      title: "Guest Data",
      content: "From \"Guest Data\" source, I can see this is a Booking.com reservation that has been pre-paid."
    },
    {
      title: "Past Conversations",
      content: "From \"Past Conversations\" source, I see no precedent for handling employer-specific receipts."
    },
    {
      title: "Property Questionnaire",
      content: "From \"Property Questionnaire\" source, I see no specific information about billing/receipt procedures."
    }
  ];

  return (
    <div className="custom-modal-overlay">
      <div className="custom-modal-container" ref={modalRef}>
        <div className="custom-modal-header">
          <div className="custom-modal-logo">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#4a90e2">
              <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
            </svg>
          </div>
          <h5 className="custom-modal-title">Hey HostBuddy, where did this response come from?</h5>
          <button className="custom-modal-close" onClick={handleClose}>×</button>
        </div>
        <div className="custom-modal-body">
          {justificationSections.map((section, index) => (
            <div key={index} className="custom-justification-section">
              <h4>{section.title}</h4>
              <p>{section.content}</p>
              {index < justificationSections.length - 1 && <hr />}
            </div>
          ))}
          <hr />
          <div className="custom-modal-footer">
            <p>
             HostBuddy's responses are based on the information in its knowledge base for this property. 
              If something is missing or incorrect, you can <Link to={`/edit-property/${propertyName}`} className="custom-link">manage the knowledge base</Link> or <Link to={`/edit-property/${propertyName}`} className="custom-link">add to the property profile</Link>.
            </p>
            <p>
              You can also adjust your <Link to='/inbox/preferences' className="custom-link">conversation preferences</Link> to change HostBuddy's behavior.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomJustificationModal;
