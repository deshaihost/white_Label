import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import Loader from "../../../../../helper/Loader";

const DochideForReservationsModel = ({
  show,
  setShow,
  documentUploadMainHndle,
  btnLoading,
}) => {
  const hideForReservationDefault = ["PAST", "INQUIRY/PAST", "FUTURE"];

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

  const mainHandleCloe=()=>{
documentUploadMainHndle(hideGetArray);
setShow(false)
  }
  useEffect(() => {
    setHideGetArray([]);
  }, [show]);

  return (
    <div>
      <Modal
        show={show}
        size="lg"
        onHide={() => setShow(false)}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body>
          <div className="d-flex align-items-center justify-content-between gap-3">
            {hideForReservationDefault.map((item, index) => (
              <button
                key={index}
                className={`btn ${
                  hideGetArray.includes(item) ? "btn-primary" : "btn-danger"
                } d-block w-100 rounded-pill`}
                onClick={() => handleButtonClick(item)}
              >
                {item}
              </button>
            ))}
          </div>
          <button
            className="btn btn-primary form-control mt-4 w-auto px-5 mx-auto  d-block mb-2"
            onClick={() => {
                mainHandleCloe()
            }}
          >
            {!btnLoading ? <>Submit</> : <Loader />}
          </button>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default DochideForReservationsModel;
