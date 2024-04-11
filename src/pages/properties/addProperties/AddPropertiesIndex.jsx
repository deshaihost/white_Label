import React, { useEffect, useState } from "react";
import AddPropertiesHeader from "./addPropertiesHeader/AddPropertiesHeader";
import BacisInformatioForm from "./basicInformation/BacisInformatioForm";
import SupportingDocForm from "./supportingDoc/SupportingDocForm";
import ListingDetailsForm from "./listingDetails/ListingDetailsForm";
import AmenitiesForm from "./amenities/AmenitiesForm";
import ExtrasForm from "./extras/ExtrasForm";
import { useDispatch } from "react-redux";
import { testingApiActions } from "../../../redux/actions";
const AddPropertiesIndex = () => {
  const dispatch = useDispatch();
  
  const [addPropertiesIndexConditions, setPropertiesConditions] = useState({
    basics: true,
    supportingDoc: false,
    listingDetails: false,
    amenities: false,
    extras: false,
    progressPoint: 20,
    propertieShowInterFace: "basics",
  });
  const propertiesInterFace =
    addPropertiesIndexConditions?.propertieShowInterFace;

  const mainHandleHeaderActive = (type) => {
    if (type === "basics") {
      setPropertiesConditions({
        basics: true,
        supportingDoc: false,
        listingDetails: false,
        amenities: false,
        extras: false,
        progressPoint: 20,
        propertieShowInterFace: type,
      });
    } else if (type === "supportingDoc") {
      setPropertiesConditions({
        basics: true,
        supportingDoc: true,
        listingDetails: false,
        amenities: false,
        extras: false,
        progressPoint: 40,
        propertieShowInterFace: type,
      });
    } else if (type === "listingDetails") {
      setPropertiesConditions({
        basics: true,
        supportingDoc: true,
        listingDetails: true,
        amenities: false,
        extras: false,
        progressPoint: 60,
        propertieShowInterFace: type,
      });
    } else if (type === "amenities") {
      setPropertiesConditions({
        basics: true,
        supportingDoc: true,
        listingDetails: true,
        amenities: true,
        extras: false,
        progressPoint: 80,
        propertieShowInterFace: type,
      });
    } else if (type === "extras") {
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

  // useEffect(() => {
  //   dispatch(testingApiActions());
  // }, []);
  return (
    <div>
      <div className="row">
        <div className="col-12">
          <AddPropertiesHeader
            propertiesTypes={addPropertiesIndexConditions}
            prntFuntionHeaderActive={mainHandleHeaderActive}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          {propertiesInterFace === "basics" ? (
            <BacisInformatioForm />
          ) : propertiesInterFace === "supportingDoc" ? (
            <SupportingDocForm />
          ) : propertiesInterFace === "listingDetails" ? (
            <ListingDetailsForm />
          ) : propertiesInterFace === "amenities" ? (
            <AmenitiesForm />
          ) : propertiesInterFace === "extras" ? (
            <ExtrasForm />
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default AddPropertiesIndex;
