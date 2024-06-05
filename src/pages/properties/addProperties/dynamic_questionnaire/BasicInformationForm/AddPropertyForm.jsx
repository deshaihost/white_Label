import BasicInformationForm from "./BasicInformationForm";
import React from "react";

// This is just a container for the BasicInformationForm when adding a new property, to give it a header and padding.
// Could just put all this in BasicInformationForm and have it apply when creating a new property (i.e. when property_name is null). But this works too
const AddPropertyForm = ( ) => {
  return (
    <div className="add-properties-form">
      <h1>Create New Property</h1>
      <BasicInformationForm property_name={null} />
    </div>
  );
};

export default AddPropertyForm;