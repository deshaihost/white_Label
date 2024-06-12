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
import { nameKey } from "../../../helper/Authorized";
const AddPropertiesIndex = () => {
  const basics = "basics";
  const supportingDoc = "supportingDoc";
  const listingDetails = "listingDetails";
  const amenities = "amenities";
  const extras = "extras";
  const nameKeyGet = nameKey();
  const propertyName=nameKeyGet?.nameKey

  const [addPropertiesIndexConditions, setPropertiesConditions] = useState({
    basics: true,
    supportingDoc: false,
    listingDetails: false,
    amenities: false,
    extras: false,
    progressPoint: 20,
    propertieShowInterFace: basics,
  });
  const propertiesInterFace =
    addPropertiesIndexConditions?.propertieShowInterFace;

  const mainHandleHeaderActive = (type) => {
    if (type === basics) {
      setPropertiesConditions({
        basics: true,
        supportingDoc: false,
        listingDetails: false,
        amenities: false,
        extras: false,
        progressPoint: 20,
        propertieShowInterFace: type,
      });
    } else if (type === supportingDoc) {
      setPropertiesConditions({
        basics: true,
        supportingDoc: true,
        listingDetails: false,
        amenities: false,
        extras: false,
        progressPoint: 40,
        propertieShowInterFace: type,
      });
    } else if (type === listingDetails) {
      setPropertiesConditions({
        basics: true,
        supportingDoc: true,
        listingDetails: true,
        amenities: false,
        extras: false,
        progressPoint: 60,
        propertieShowInterFace: type,
      });
    } else if (type === amenities) {
      setPropertiesConditions({
        basics: true,
        supportingDoc: true,
        listingDetails: true,
        amenities: true,
        extras: false,
        progressPoint: 80,
        propertieShowInterFace: type,
      });
    } else if (type === extras) {
      setPropertiesConditions({
        basics: true,
        supportingDoc: true,
        listingDetails: true,
        amenities: true,
        extras: true,
        progressPoint: 100,
        propertieShowInterFace: type,
      });
    }
  };

  return (
    <div>
      <Helmet>
    <title>Add Properties</title>
  </Helmet>;
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
            ) : propertiesInterFace === listingDetails ? (
              <ListingDetailsForm
                prntFuntionHeaderActive={mainHandleHeaderActive}
              />
            ) : propertiesInterFace === amenities ? (
              <AmenitiesForm prntFuntionHeaderActive={mainHandleHeaderActive} />
            ) : propertiesInterFace === extras ? (
              <ExtrasForm />
            ) : (
              ""
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default AddPropertiesIndex;
