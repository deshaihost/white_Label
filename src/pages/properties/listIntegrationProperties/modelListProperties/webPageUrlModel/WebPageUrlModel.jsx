import React from "react";
import { Modal } from "react-bootstrap";

const WebPageUrlModel = ({ handleShow, handleClose }) => {
  return (
    <div>
      <Modal
        show={handleShow}
        size="lg"
        onHide={() => handleClose("webPageUrlClose")}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body>
            <div className="text-center text-white">
                <h3>Property URLs</h3>
                <div className="text-danger border mt-5 ">
                You do not added any url to this property.
                </div>
            </div>

        </Modal.Body>
      </Modal>
    </div>
  );
};

export default WebPageUrlModel;
