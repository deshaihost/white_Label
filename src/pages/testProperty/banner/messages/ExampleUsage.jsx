import React, { useState } from "react";
import CustomJustificationModal from "./justificationModal/CustomJustificationModal";

// Example component showing how to use the custom justification modal
const ExampleUsage = () => {
  const [showModal, setShowModal] = useState(false);
  
  // Mock property data
  const propertyName = "Beach House";
  
  // Mock justification data - in a real app this would be structured data
  const justificationData = {
    sources: [
      {
        type: "Guest Data",
        content: "From \"Guest Data\" source, I can see this is a Booking.com reservation that has been pre-paid."
      },
      {
        type: "Past Conversations",
        content: "From \"Past Conversations\" source, I see no precedent for handling employer-specific receipts."
      },
      {
        type: "Property Questionnaire",
        content: "From \"Property Questionnaire\" source, I see no specific information about billing/receipt procedures."
      }
    ]
  };
  
  return (
    <div>
      <button onClick={() => setShowModal(true)} className="btn-show-justification">
        Where did this response come from?
      </button>
      
      <CustomJustificationModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        propertyName={propertyName}
        justification={justificationData}
      />
    </div>
  );
};

export default ExampleUsage;
