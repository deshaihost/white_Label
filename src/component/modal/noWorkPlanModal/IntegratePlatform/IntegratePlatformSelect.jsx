import React, { useState } from "react";
import IntergratePlatFormInput from "./IntergratePlatFormInput";
import { useSelector, useDispatch } from "react-redux";
const IntegratePlatformSelect = ({handleNoPlanClose}) => {
  const store = useSelector((state) => state);
  const dispatch = useDispatch();
  const pmsIntegrationData =
    store?.pmsIntegrationGetReducer?.pmsIntegrationData?.data?.integrations;
  const { cloudbeds, hostfully } = pmsIntegrationData ? pmsIntegrationData : [];
  const [pmsIntegrationInputGet, setPmsIntergratonInputGet] = useState({
    type: "cloudbeds",
    data: cloudbeds,
  });
  const [checkBox, setCheckBox] = useState({
    cloudbeds: true,
    hostfully: false,
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
        <IntergratePlatFormInput PmsIntegrationData={pmsIntegrationInputGet} handleNoPlanClose={handleNoPlanClose} />
      ) : (
        <>
          <div className="row">
            <div className="col-12 ">
              <div className="row">
                <div className="col-12 text-center my-3">
                  <div class="form-check ">
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
                  <div class="form-check">
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
                </div>
              </div>
              <div className="row">
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
          </div>
        </>
      )}
    </>
  );
};

export default IntegratePlatformSelect;
