import React, { useState, useEffect } from "react";

import { Button, Modal } from "react-bootstrap";
import ToastHandle from "../../../../helper/ToastMessage";

const SelectModalNote = ({
  show,
  handleClose,
  noteClickData,
  addedNote,
  setAddedNote,
}) => {
  const [noteData, setNoteData] = useState("");

  const handleAddNote = () => {
    console.log("Note Data: ", noteData);
    // if (noteData.trim() !== "") {
    setAddedNote((prev) => ({
      ...prev,
      [noteClickData?.name]: noteData,
    }));
    handleClose();
    // }else{
    //   ToastHandle("Empty note cannot be added", "danger");
    // }
  };

  useEffect(() => {
    if (addedNote && noteClickData?.name in addedNote) {
      // If addedNote contains a key matching noteClickData.name, set noteData to its value
      setNoteData(addedNote[noteClickData.name]);
    } else {
      setNoteData(noteClickData.value !== null ? noteClickData.value : "");
    }
  }, [noteClickData, addedNote]);

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
            <label>{noteClickData?.question}</label>
            <textarea
              className="form-control"
              name={noteClickData?.name}
              id=""
              cols="30"
              rows="10"
              placeholder="Enter note here..."
              value={noteData}
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

export default SelectModalNote;
