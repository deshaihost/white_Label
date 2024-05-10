import React, { useState, useEffect } from "react";

import { Button, Modal } from "react-bootstrap";
import ToastHandle from "../../../../helper/ToastMessage";

const SelectModalNote = ({
  show,
  handleClose,
  noteClickData,
  reservationClickData,
  addedNote,
  setAddedNote,
}) => {
  const [checkChange, setCheckChange] = useState(false);
  const [noteData, setNoteData] = useState("");

  const [checkedSchedule, setCheckedSchedule] = useState({
    Future: false,
    Past: false,
    Current: false,
  });


  const handleChangeStatus = (checkedData) => {
    // Mapping between keys and corresponding values
    const keyToValueMap = {
      Future: "FUTURE",
      Past: "INQUIRY/PAST",
      Current: "CURRENT"
    };
    let newStatus = [];
    let newReservationStage = "";

    // Iterate over the keys of checkedData
    for (const key in checkedData) {
      if (checkedData[key]) {
        // If the value is true, push the corresponding value to newStatus
        newStatus.push(keyToValueMap[key]);
      } else {
        // If the value is false, remove the corresponding value from newStatus
        const index = newStatus.indexOf(keyToValueMap[key]);
        if (index !== -1) {
          newStatus.splice(index, 1);
        }
      }
    }

    if (newStatus.length > 0) {
      newReservationStage = newStatus.join(",");
    }

    handleAddReservationStage(newReservationStage);

  }

  // handle Stage button clicks
  const handleOnChange = (e, type) => {
    if (type === "Future") {
      setCheckedSchedule((prevData) => ({
        ...prevData,
        Future: e.target.checked,
      }));
    }
    if (type === "Past") {
      setCheckedSchedule((prevData) => ({
        ...prevData,
        Past: e.target.checked,
      }));
    }
    if (type === "Current") {
      setCheckedSchedule((prevData) => ({
        ...prevData,
        Current: e.target.checked,
      }));
    }


    console.log("Checked: ", e.target.checked);
    setCheckChange(true)
  };

  const handleAddNote = () => {
    // console.log("Note Data: ", noteData);
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

  const handleAddReservationStage = (stageToSet) => {
    setAddedNote((prev) => ({
      ...prev,
      [reservationClickData?.name]: stageToSet,
    }));
  };

  useEffect(() => {
    // if (!checkChange) {
    if (addedNote && noteClickData?.name in addedNote) {
      // If addedNote contains a key matching noteClickData.name, set noteData to its value
      setNoteData(addedNote[noteClickData.name]);
    } else {
      if (noteData === "") {
        setNoteData(noteClickData.value !== null ? noteClickData.value : "");
      }
    }
    // }
  }, [noteClickData, addedNote]);

  useEffect(() => {
    if (addedNote && reservationClickData?.name in addedNote) {
      // If addedNote contains a key matching reservationClickData.name, set noteData to its value
      let existingStatus = addedNote[reservationClickData?.name]
      if (existingStatus.length > 0) {
        let deselectedStages = existingStatus.split(",")
        deselectedStages.forEach((type, index) => {

          if (type === "FUTURE") {
            setCheckedSchedule((prevData) => ({
              ...prevData,
              Future: true,
            }));
          }
          if (type === "INQUIRY/PAST") {
            setCheckedSchedule((prevData) => ({
              ...prevData,
              Past: true,
            }));
          }
          if (type === "CURRENT") {
            setCheckedSchedule((prevData) => ({
              ...prevData,
              Current: true,
            }));
          }

        })

      }

    } else {
      let existingStatusValue = reservationClickData?.value;

      if (existingStatusValue.length > 0) {
        let deselectedStagesData = existingStatusValue.split(",")
        deselectedStagesData.forEach((type, index) => {

          if (type === "FUTURE") {
            setCheckedSchedule((prevData) => ({
              ...prevData,
              Future: true,
            }));
          }
          if (type === "INQUIRY/PAST") {
            setCheckedSchedule((prevData) => ({
              ...prevData,
              Past: true,
            }));
          }
          if (type === "CURRENT") {
            setCheckedSchedule((prevData) => ({
              ...prevData,
              Current: true,
            }));
          }

        })

      }

    }
  }, [reservationClickData, addedNote]);

  useEffect(() => {
    if (checkChange) {
      handleChangeStatus(checkedSchedule);
      setCheckChange(false);
    }
  }, [checkChange, checkedSchedule])

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
          <div className="form-design mb-4">
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
          <div className="form-design">
            <label>Data will be applied to selected reservation status(es) below</label>
          </div>

          <div className=" d-flex justify-content-between mt-3">
            <div class="col text-center">
              <input
                type="checkbox"
                checked={checkedSchedule.Future}
                onChange={(e) => handleOnChange(e, "Future")}
                className="btn-check"
                id="future"
                autocomplete="off"
              />
              <label
                className={`btn btn-primary rounded-pill px-4 tab-btn-stage ${checkedSchedule.Future ? "btn-unselected" : ""
                  }`}
                for="future"
              >
                Future
              </label>
            </div>
            <div class="col text-center">
              <input
                type="checkbox"
                checked={checkedSchedule.Past}
                onChange={(e) => handleOnChange(e, "Past")}
                className="btn-check"
                id="past"
                autocomplete="off"
              />
              <label
                className={`btn btn-primary rounded-pill px-4 tab-btn-stage ${checkedSchedule.Past ? "btn-unselected" : ""
                  }`}
                for="past"
              >
                Inquiry/Past
              </label>
            </div>
            <div class="col text-center">
              <input
                type="checkbox"
                checked={checkedSchedule.Current}
                onChange={(e) => handleOnChange(e, "Current")}
                className="btn-check"
                id="current"
                autocomplete="off"
              />
              <label
                className={`btn btn-primary rounded-pill tab-btn-stage px-4 ${checkedSchedule.Current ? "btn-unselected" : ""
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

export default SelectModalNote;
