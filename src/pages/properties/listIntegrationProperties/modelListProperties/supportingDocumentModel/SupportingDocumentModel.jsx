import React from "react";
import { Modal } from "react-bootstrap";

const SupportingDocumentModel = ({ handleShow, handleClose }) => {
  return (
    <div>
      <Modal
        show={handleShow}
        size="lg"
        onHide={() => handleClose("supportingDocumentsClose")}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body>
          <div className="text-center text-white">
            <h3>Property Documents</h3>
            <div className="text-danger border mt-5 ">
              You do not added any url to this property.
            </div>
          </div>
        </Modal.Body>
      </Modal>{" "}
    </div>
  );
};

export default SupportingDocumentModel;
