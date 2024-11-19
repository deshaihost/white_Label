import React, { useState } from "react";
import IntergratePlatFormInput from "./IntergratePlatFormInput";
import { useSelector } from "react-redux";

const IntegratePlatformSelect = ({ handleNoPlanClose }) => {
  const store = useSelector((state) => state);
  const pmsIntegrationData = store?.pmsIntegrationGetReducer?.pmsIntegrationData?.data?.integrations;
  const additionalOptions = [
    { type: "Streamline", data: "streamline" },
    { type: "Track", data: "track" },
    { type: "Homhero", data: "homhero" },
    { type: "Resly", data: "resly" },
    { type: "eviivo", data: "eviivo" },
  ];
  const integrationsArray = [
    ...Object.keys(pmsIntegrationData || {}),
    ...additionalOptions.map(option => option.type)
  ]; // assign the values of the API return to an array
  const [pmsIntegrationInputGet, setPmsIntergratonInputGet] = useState(
    integrationsArray.length > 0 ? {
          type: integrationsArray[0],
          data: integrationsArray[0],
        }
      : {}
  );

  console.log('pmsIntegrationData', pmsIntegrationData);

  const [checkBox, setCheckBox] = useState(
    integrationsArray.reduce((obj, integration, index) => {
      obj[integration] = index === 0; // true for the first item, false for the rest
      return obj;
    }, {})
  );

  const onchangeHandlePms = (type, item) => {
    // Create a new object with all properties set to false
    const newCheckBox = Object.keys(checkBox).reduce((obj, key) => {
      obj[key] = false;
      return obj;
    }, {});
  
    // Set the selected type to true
    newCheckBox[type] = true;
  
    setCheckBox(newCheckBox);
  
    setPmsIntergratonInputGet({
      type: type,
      data: item,
    });
  };

  const isAdditionalOption = (integration) => additionalOptions.some(option => option.type === integration);

  const [pmsSelected, setPmsSelected] = useState(false);
  const continueHandleButton = () => {
    if (pmsIntegrationInputGet !== "") {
      setPmsSelected(true);
    }
  };
  
  return (
    <>
      {pmsSelected ? (
        <IntergratePlatFormInput PmsIntegrationData={pmsIntegrationInputGet} handleNoPlanClose={handleNoPlanClose}/>
      ) : (
        <>
          <div id="integrate_form1">
            <div className="row form-design">
              <div className="col-12 mt-3">
                {integrationsArray.map((integration, index) => (
                  <div className={`form-check custom_checkbox mb-3 ${isAdditionalOption(integration) ? 'additional-option' : ''}`} key={index}>
                    <input className="form-check-input" type="radio" name="flexRadioDefault" id={`flexRadioDefault${index}`} value={integration} checked={checkBox?.[integration]} onClick={() => {onchangeHandlePms(integration, integration);}}/>
                    <label className="form-check-label" htmlFor={`flexRadioDefault${index}`}>
                      {integration}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            <div className="row form-design mt-1">
              <div className="col-12 text-center">
                <button className="btn btn-primary px-5" onClick={continueHandleButton}>
                  Continue
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default IntegratePlatformSelect;
