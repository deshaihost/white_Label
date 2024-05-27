import React, { useState } from "react";
import "./AddProperty.css";
import AddPropertiesHeader from "./addPropertiesHeader/AddPropertiesHeader";
import BacisInformatioForm from "./basicInformation/BacisInformatioForm";
import SupportingDocForm from "./supportingDoc/SupportingDocForm";
import ListingDetailsForm from "./listingDetails/ListingDetailsForm";
import AmenitiesForm from "./amenities/AmenitiesForm";
import ExtrasForm from "./extras/ExtrasForm";
import { Container } from "react-bootstrap";
import { Helmet } from "react-helmet";
import { GetquestionnaireFunction, nameKey } from "../../../helper/Authorized";
import QuestionnaireInput from "./allQuestionnaireInput/QuestionnaireInput";
const AddPropertiesIndex = () => {
  const ExtrasFormCall = GetquestionnaireFunction();
  const { metadata } = ExtrasFormCall ? ExtrasFormCall : [];
  const { section_order } = metadata ? metadata : [];
  const basics = "Basics";
  const supportingDoc = "External Resources";
  const listingDetails = "Listing Details";
  const amenities = "Amenities";
  const extras = "Extras";
  const nameKeyGet = nameKey();
  const propertyName = nameKeyGet?.nameKey;

  const activeComponent = (activePoint) => {
    return (
      <>
        {section_order?.map((section) => {
          if (section === activePoint) {
            return (
              <QuestionnaireInput
                prntFuntionHeaderActive={mainHandleHeaderActive}
                interFaceActiveQuestionnarie={propertiesInterFace}
              />
            );
          }
        })}
      </>
    );
  };

  const [addPropertiesIndexConditions, setPropertiesConditions] = useState({
    progressPoint: 20,
    propertieShowInterFace: basics,
  });
  const propertiesInterFace =
    addPropertiesIndexConditions?.propertieShowInterFace;

  const mainHandleHeaderActive = (type) => {
    const typeString = type.trim();
    activeComponent(type)
    if (typeString === basics.trim()) {
      setPropertiesConditions({
        progressPoint: 20,
        propertieShowInterFace: type,
      });
    } else if (typeString === supportingDoc.trim()) {
      setPropertiesConditions({
        progressPoint: 40,
        propertieShowInterFace: type,
      });
    } else if (typeString === listingDetails.trim()) {
      setPropertiesConditions({
        progressPoint: 60,
        propertieShowInterFace: type,
      });
    } else if (typeString === amenities.trim()) {
      setPropertiesConditions({
        progressPoint: 80,
        propertieShowInterFace: type,
      });
    } else if (typeString === extras.trim()) {
      setPropertiesConditions({
        progressPoint: 100,
        propertieShowInterFace: type,
      });
    }
  };

  return (
    <div>
      <Helmet>
        <title>Add Properties</title>
      </Helmet>
      ;
      <Container className="mt-3 mt-md-5 py-3 py-md-5">
        <div className="row">
          <div className="col-lg-8 mx-auto">
            <hr className="border-secondary" style={{ opacity: "1" }} />
          </div>
          <div className="col-12">
            <AddPropertiesHeader
              propertiesTypes={addPropertiesIndexConditions}
              prntFuntionHeaderActive={mainHandleHeaderActive}
              propertyName={propertyName}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-lg-9 mx-auto mt-5 form_multisteps">
            {propertiesInterFace === basics ? (
              <BacisInformatioForm
                prntFuntionHeaderActive={mainHandleHeaderActive}
              />
            ) : propertiesInterFace === supportingDoc ? (
              <SupportingDocForm
                prntFuntionHeaderActive={mainHandleHeaderActive}
              />
            ) : (
              <>{activeComponent(propertiesInterFace)}</>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default AddPropertiesIndex;
