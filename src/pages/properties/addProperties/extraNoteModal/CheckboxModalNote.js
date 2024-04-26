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

  console.log("responseOptions inside Modal: ", responseOptions);
  console.log("responseText inside Modal: ", responseText);
  console.log("noteClickData inside Modal: ", noteClickData);

  const handleAddNote = () => {
    console.log("Note Data: ", noteData);
    // return;
    const valIndex = responseOptions?.indexOf(noteClickData?.name);
    // If the name exists in responseOptions, set the corresponding value from responseText to noteData
    if (valIndex !== -1) {
      const updatedResponseText = [...responseText];
      updatedResponseText[valIndex] = noteData;

      setResponseText(updatedResponseText);
    }else{
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
        </Modal.Body>
      </Modal>
    </>
  );
};

export default CheckboxModalNote;
