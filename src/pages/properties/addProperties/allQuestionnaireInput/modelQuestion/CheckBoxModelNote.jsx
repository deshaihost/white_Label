import React from "react";
import { Modal } from "react-bootstrap";

const CheckBoxModelNote = ({ show, handleClose }) => {
  console.log(show,'showshow')
  return (
    <div>
      <Modal
        size="md"
        show={show?.checkBox}
        onHide={()=>handleClose(show.CloseType)}
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
            {/* <label>{noteClickData?.name}</label> */}
            <textarea
              className="form-control"
              //   name={noteClickData?.name}
              id=""
              cols="30"
              rows="10"
              placeholder="Enter note here..."
              //   value={noteData || ""}
              //   onChange={(e) => setNoteData(e.target.value)}
            ></textarea>
            <hr style={{ borderTop: "0px solid #0078F0" }} />
            <label>
              Information from this question will only be provided to guests at
              the selected (blue) reservation stages. You can de-select stages
              below to prevent HostBuddy from sharing this information with
              those guests.
            </label>
            <div className=" d-flex justify-content-between mt-3">
              <div class="col text-center">
                <input
                  type="checkbox"
                  //   checked={checkedSchedule.Future}
                  //   onChange={(e) => handleOnChange(e, "Future")}
                  className="btn-check"
                  id="future"
                  autocomplete="off"
                />
                <label
                  //   className={`btn btn-primary rounded-pill px-4 tab-btn-stage ${checkedSchedule.Future ? "btn-unselected" : ""
                  //     }`}
                  for="future"
                >
                  Future
                </label>
              </div>
              <div class="col text-center">
                <input
                  type="checkbox"
                  //   checked={checkedSchedule.Past}
                  //   onChange={(e) => handleOnChange(e, "Past")}
                  className="btn-check"
                  id="past"
                  autocomplete="off"
                />
                <label
                  //   className={`btn btn-primary rounded-pill px-4 tab-btn-stage ${checkedSchedule.Past ? "btn-unselected" : ""
                  //     }`}
                  for="past"
                >
                  Inquiry/Past
                </label>
              </div>
              <div class="col text-center">
                <input
                  type="checkbox"
                  //   checked={checkedSchedule.Current}
                  //   onChange={(e) => handleOnChange(e, "Current")}
                  className="btn-check"
                  id="current"
                  autocomplete="off"
                />
                <label
                  //   className={`btn btn-primary rounded-pill tab-btn-stage px-4 ${checkedSchedule.Current ? "btn-unselected" : ""
                  //     }`}
                  for="current"
                >
                  Current
                </label>
              </div>
            </div>
            <hr
              style={{
                borderTop: "2px solid #0078F0",
                margin: "20px 0 30px 0",
              }}
            />
            <div className="d-flex justify-content-center mt-3">
              <button
                className="mw-auto"
                //    onClick={handleAddNote}
              >
                Save & Add Note
              </button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default CheckBoxModelNote;
