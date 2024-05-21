import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";

const ReservationsStageModel = ({ show, handleClose, modelSubmitBtn }) => {
  const { reservations, questionData, CloseType } = show;
  console.log(questionData,'questionDataquestionData')
  const hideForReservationDefault = ["CURRENT", "FUTURE", "INQUIRY/PAST"];
  const hideForReservations = questionData?.hideForReservations;
  const index=questionData?.questionData
  const convertJsonHideForReser =
    hideForReservations !== undefined
      ? hideForReservations !== ""
        ? JSON.parse(hideForReservations)
        : []
      : [];

  const [hideGetArray, setHideGetArray] = useState([]);
  // Function to handle button clicks
  const handleButtonClick = (item) => {
    // If item is in hideGetArray, remove it; otherwise, add it
    if (hideGetArray.includes(item)) {
      setHideGetArray(hideGetArray.filter((i) => i !== item));
    } else {
      setHideGetArray([...hideGetArray, item]);
    }
  };

  const mainHandleCloe = () => {
    const questionModelData = { questionData, hideGetArray };
    modelSubmitBtn(questionModelData);
    handleClose(CloseType);
  };
  const closeBtnAllConditioncmp = () => {
    handleClose(CloseType);
    setHideGetArray([]);
  };
  useEffect(() => {
    if (reservations) {
      if (convertJsonHideForReser?.length > 0) {
        setHideGetArray(convertJsonHideForReser);
      } else {
        if (hideGetArray?.length > 0) {
          setHideGetArray(hideGetArray);
        }
      }
    }
  }, [reservations,index]);

  return (
    <>
      <Modal
        size="md"
        show={reservations}
        onHide={() => closeBtnAllConditioncmp()}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="contact-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Settings</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form-design">
            <label>
              Information from this question will only be provided to guests at
              the selected (blue) reservation stages. You can de-select stages
              below to prevent HostBuddy from sharing this information with
              those guests.
            </label>
            {hideForReservationDefault?.map((item, index) => {
              return (
                <>
                  <div className=" d-flex justify-content-between mt-3">
                    <div class="col text-center">
                      <button
                        key={index}
                        className={`btn ${
                          hideGetArray.includes(item)
                            ? "btn-unselected"
                            : "btn-primary"
                        } d-block w-100 rounded-pill`}
                        onClick={() => handleButtonClick(item)}
                        style={
                          hideGetArray.includes(item)
                            ? { borderColor: "#0078f0", color: "#0078f0" }
                            : {}
                        }
                      >
                        {item}
                      </button>
                    </div>
                  </div>
                </>
              );
            })}

            <hr
              style={{
                borderTop: "2px solid #0078F0",
                margin: "20px 0 30px 0",
              }}
            />
            <div className="d-flex justify-content-center mt-3">
              <button className="mw-auto" onClick={() => mainHandleCloe()}>
                Save
              </button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ReservationsStageModel;
