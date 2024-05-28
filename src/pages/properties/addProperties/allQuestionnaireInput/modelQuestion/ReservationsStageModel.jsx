import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
const ReservationsStageModel = ({
  show,
  handleClose,
  modelSubmitBtnListExtras,
}) => {
  const { reservations, questionData, CloseType, data } = show;
  const { question_type, response_text, hideForReservations } = data
    ? data
    : [];
  const select = "select";
  const [textAreaInput, setTextAreaInput] = useState("");
  const hideForReservationDefault = ["CURRENT", "FUTURE", "INQUIRY/PAST"];
  const index = questionData?.questionData;
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
    const questionModelData = { data, hideGetArray, textAreaInput };
    modelSubmitBtnListExtras(questionModelData);
    handleClose(CloseType);
    setHideGetArray([]);
    setTextAreaInput("");
  };
  const closeBtnAllConditioncmp = () => {
    handleClose(CloseType);
    setHideGetArray([]);
    setTextAreaInput("");
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
      if (response_text !== null) {
        setTextAreaInput(response_text);
      }
    }
  }, [reservations, index, response_text]);

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
          <Modal.Title id="contained-modal-title-vcenter">{question_type === select?"Additional Information":"Settings"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form-design mb-4">
            {question_type === select && (
              <>
                {/* <label>{noteClickData?.question}</label> */}
                <textarea
                  className="form-control"
                  // name={noteClickData?.name}
                  id=""
                  cols="30"
                  rows="10"
                  placeholder="Enter note here..."
                  value={textAreaInput}
                  onChange={(e) => setTextAreaInput(e.target.value, data)}
                ></textarea>
              </>
            )}

            <hr style={{ borderTop: "0px solid #0078F0" }} />
            <label>
              Information from this question will only be provided to guests at
              the selected (blue) reservation stages. You can de-select stages
              below to prevent HostBuddy from sharing this information with
              those guests.
            </label>
            <div className=" d-flex justify-content-between mt-3 gap-2">
              {hideForReservationDefault?.map((item) => {
                return (
                  <>
                    <button
                      key={index}
                      className={`btn text-sm ${
                        hideGetArray.includes(item)
                          ? "btn-unselected"
                          : "btn-primary"
                      } d-block w-100 rounded-pill`}
                      onClick={() => handleButtonClick(item)}
                      style={
                        hideGetArray.includes(item)
                          ? {
                              borderColor: "#0078f0",
                              color: "#fff",
                              background: "none",
                            }
                          : {}
                      }
                    >
                      {item}
                    </button>
                  </>
                );
              })}
            </div>
            <hr
              style={{
                borderTop: "2px solid #0078F0",
                margin: "20px 0 30px 0",
              }}
            />
            <div className="d-flex justify-content-center mt-3">
              <button className="mw-auto" onClick={mainHandleCloe}>
                Save & Add Note
              </button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ReservationsStageModel;
