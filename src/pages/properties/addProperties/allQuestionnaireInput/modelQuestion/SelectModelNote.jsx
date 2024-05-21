import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";

const SelectModelNote = ({ show, handleClose, modelSubmitBtn }) => {
  const { questionData, CloseType, select } = show;
  console.log("showshow", questionData);
  const [responseOptionInput, setResponseOptionInput] = useState("");
  const selectOptionDefult = "selectOption";
  // hide for reservation button functinality
  const hideForReservationDefault = ["CURRENT", "FUTURE", "INQUIRY/PAST"];
  const hideForReservations = questionData?.hideForReservations;
  const response_option = questionData?.response_option;
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
  // hide for reservation button functinality

  const mainHandleCloe = () => {

    const questionModelData = {
      questionData,
      hideGetArray,
      responseOptionInput,
      selectOptionDefult,
    };
    modelSubmitBtn(questionModelData);
    handleClose(CloseType);
  };
  const closeBtnAllConditioncmp = () => {
    handleClose(CloseType);
    setHideGetArray([]);
  };
  useEffect(() => {
    if (select) {
      if (convertJsonHideForReser?.length > 0) {
        setHideGetArray(convertJsonHideForReser);
      } else {
        if (hideGetArray?.length > 0) {
          setHideGetArray(hideGetArray);
        }
      }
      if (response_option !== "") {
        setResponseOptionInput(response_option);
      }
    }
  }, [select, index, response_option]);

  return (
    <>
      <Modal
        size="md"
        show={show?.select}
        onHide={() => closeBtnAllConditioncmp()}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="contact-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Additional Information
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form-design mb-4">
            {/* <label>{noteClickData?.question}</label> */}
            <textarea
              className="form-control"
              // name={noteClickData?.name}
              id=""
              cols="30"
              rows="10"
              placeholder="Enter note here..."
              value={responseOptionInput}
              onChange={(e) => setResponseOptionInput(e.target.value)}
            ></textarea>
            <hr style={{ borderTop: "0px solid #0078F0" }} />
            <label>
              Information from this question will only be provided to guests at
              the selected (blue) reservation stages. You can de-select stages
              below to prevent HostBuddy from sharing this information with
              those guests.
            </label>
            <div className=" d-flex justify-content-between mt-3">
              {hideForReservationDefault?.map((item) => {
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
              {/* <div class="col text-center">
                <input
                  type="checkbox"
                  // checked={checkedSchedule.Future}
                  // onChange={(e) => handleOnChange(e, "Future")}
                  className="btn-check"
                  id="future"
                  autocomplete="off"
                />
                <label
                  // className={`btn btn-primary rounded-pill px-4 tab-btn-stage ${
                  //   checkedSchedule.Future ? "btn-unselected" : ""
                  // }`}
                  for="future"
                >
                  Future
                </label>
              </div>
              <div class="col text-center">
                <input
                  type="checkbox"
                  // checked={checkedSchedule.Past}
                  // onChange={(e) => handleOnChange(e, "Past")}
                  className="btn-check"
                  id="past"
                  autocomplete="off"
                />
                <label
                  // className={`btn btn-primary rounded-pill px-4 tab-btn-stage ${
                  //   checkedSchedule.Past ? "btn-unselected" : ""
                  // }`}
                  for="past"
                >
                  Inquiry/Past
                </label>
              </div>
              <div class="col text-center">
                <input
                  type="checkbox"
                  // checked={checkedSchedule.Current}
                  // onChange={(e) => handleOnChange(e, "Current")}
                  className="btn-check"
                  id="current"
                  autocomplete="off"
                />
                <label
                  // className={`btn btn-primary rounded-pill tab-btn-stage px-4 ${
                  //   checkedSchedule.Current ? "btn-unselected" : ""
                  // }`}
                  for="current"
                >
                  Current
                </label>
              </div> */}
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

export default SelectModelNote;
