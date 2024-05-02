import React, { useState } from "react";
import IntergratePlatFormInput from "./IntergratePlatFormInput";
import { useSelector, useDispatch } from "react-redux";
const IntegratePlatformSelect = ({ handleNoPlanClose }) => {
  const store = useSelector((state) => state);
  const dispatch = useDispatch();
  const pmsIntegrationData =
    store?.pmsIntegrationGetReducer?.pmsIntegrationData?.data?.integrations;
  const { cloudbeds, hostfully, lodgify, smoobu } = pmsIntegrationData
    ? pmsIntegrationData
    : [];
  const SmoobuStatic = "Smoobu";
  const LodgifyStatic = "Lodgify";

  const [pmsIntegrationInputGet, setPmsIntergratonInputGet] = useState({
    type: "cloudbeds",
    data: cloudbeds,
  });
  const [checkBox, setCheckBox] = useState({
    cloudbeds: true,
    hostfully: false,
    smoobu: false,
    lodgify: false,
  });
  const onchangeHandlePms = (type, item) => {
    if (type === "cloudbeds") {
      setCheckBox({ ...checkBox, cloudbeds: true, hostfully: false });
      setPmsIntergratonInputGet({
        type: type,
        data: item,
      });
    } else if (type === "hostfully") {
      setCheckBox({ ...checkBox, cloudbeds: false, hostfully: true });
      setPmsIntergratonInputGet({
        type: type,
        data: item,
      });
    } else if (type === LodgifyStatic) {
      setCheckBox({
        ...checkBox,
        cloudbeds: false,
        hostfully: false,
        smoobu:false ,
        lodgify:  true,
      });
      setPmsIntergratonInputGet({
        type: type,
        data: item,
      });
    } else if (type === SmoobuStatic) {
      setCheckBox({
        ...checkBox,
        cloudbeds: false,
        hostfully: false,
        smoobu: true,
        lodgify: false,
      });
      setPmsIntergratonInputGet({
        type: type,
        data: item,
      });
    }
  };
  const [conditionCheck, setConditionCheck] = useState(false);
  const continueHandleButton = () => {
    if (pmsIntegrationInputGet !== "") {
      setConditionCheck(true);
    }
  };

  return (
    <>
      {conditionCheck ? (
        <IntergratePlatFormInput
          PmsIntegrationData={pmsIntegrationInputGet}
          handleNoPlanClose={handleNoPlanClose}
        />
      ) : (
        <>
          <div id="integrate_form1">
            <div className="row form-design">
              <div className="col-12 mt-3">
                <div class="form-check custom_checkbox mb-3">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="flexRadioDefault"
                    id="flexRadioDefault1"
                    value="option1"
                    checked={checkBox?.cloudbeds}
                    onClick={() => {
                      onchangeHandlePms("cloudbeds", cloudbeds);
                    }}
                  />
                  <label class="form-check-label" for="flexRadioDefault1">
                    Cloudbeds
                  </label>
                </div>
                <div class="form-check custom_checkbox mb-3">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="flexRadioDefault"
                    id="flexRadioDefault2"
                    value="option2"
                    checked={checkBox?.hostfully}
                    onClick={() => {
                      onchangeHandlePms("hostfully", hostfully);
                    }}
                  />
                  <label class="form-check-label" for="flexRadioDefault2">
                    Hostfully
                  </label>
                </div>
                <div class="form-check custom_checkbox mb-3">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="flexRadioDefault"
                    id="flexRadioDefault2"
                    value="option2"
                    checked={checkBox?.lodgify}
                    onClick={() => {
                      onchangeHandlePms(LodgifyStatic, lodgify);
                    }}
                  />
                  <label class="form-check-label" for="flexRadioDefault2">
                    Lodgify
                  </label>
                </div>
                <div class="form-check custom_checkbox mb-3">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="flexRadioDefault"
                    id="flexRadioDefault2"
                    value="option2"
                    checked={checkBox?.smoobu}
                    onClick={() => {
                      onchangeHandlePms(SmoobuStatic, smoobu);
                    }}
                  />
                  <label class="form-check-label" for="flexRadioDefault2">
                    Smoobu
                  </label>
                </div>
              </div>
            </div>
            <div className="row form-design mt-1">
              <div className="col-12 text-center">
                <button
                  className="btn btn-primary px-5"
                  onClick={continueHandleButton}
                >
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
