import React, { useState, useEffect } from "react";

import { Button, Modal } from "react-bootstrap";
import ToastHandle from "../../../../helper/ToastMessage";

const CheckboxModalNote = ({
  show,
  handleClose,
  noteClickData,
  responseOptions,
  responseText,
  setResponseText,
}) => {
  
  const [noteData, setNoteData] = useState("");

  const handleAddNote = () => {
    console.log("Note Data: ", noteData);
    // return;
    const valIndex = responseOptions?.indexOf(noteClickData?.name);
    // If the name exists in responseOptions, set the corresponding value from responseText to noteData
    if (valIndex !== -1) {
      const updatedResponseText = [...responseText];
      updatedResponseText[valIndex] = noteData;

      setResponseText(updatedResponseText);
    } else {
      ToastHandle("Something went wrong", "danger");
    }

    handleClose();

  };

  useEffect(() => {
    // Find the index of noteClickData.name in responseOptions array
    const index = responseOptions?.indexOf(noteClickData?.name);
    // If the name exists in responseOptions, set the corresponding value from responseText to noteData
    if (index !== -1) {
      setNoteData(responseText[index]);
    }
  }, [noteClickData, responseOptions, responseText]);

  return (
    <>
      <Modal
        size="md"
        show={show}
        onHide={handleClose}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="contact-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Extra Note
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form-design">
            <label>{noteClickData?.name}</label>
            <textarea
              className="form-control"
              name={noteClickData?.name}
              id=""
              cols="30"
              rows="10"
              placeholder="Enter note here..."
              value={noteData || ""}
              onChange={(e) => setNoteData(e.target.value)}
            ></textarea>
            <div className="d-flex justify-content-center mt-3">
              <button className="mw-auto" onClick={handleAddNote}>
                Add Note
              </button>
            </div>
          </div>

          <div className=" d-flex justify-content-between mt-3">
            <div class="col text-center">
              <input
                type="checkbox"
                // checked={checkedSchedule.Future}
                // onChange={(e) => handleOnChange(e, "Future")}
                className="btn-check"
                id="future"
                autocomplete="off"
              />
              <label
                className={`btn btn-primary rounded-pill px-4 tab-btn-stage 
                  }`}
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
                className={`btn btn-primary rounded-pill px-4 tab-btn-stage 
                  }`}
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
                className={`btn btn-primary rounded-pill tab-btn-stage px-4 
                  }`}
                for="current"
              >
                Current
              </label>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default CheckboxModalNote;
