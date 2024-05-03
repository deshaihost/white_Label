import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
// import "./calenderModel.css";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import ToastHandle from "../../../../helper/ToastMessage";
import axios from "axios";

const PopupModal = ({
  show,
  setShow,
  prevUploadedDoc
}) => {
  console.log("prevUploadedDocfirst", prevUploadedDoc)
  const navigate = useNavigate();
  const [data, setData] = useState([])

  useEffect(() => {
    if (prevUploadedDoc) {
      setData(prevUploadedDoc);
    }
  }, [prevUploadedDoc]);


  console.log(prevUploadedDoc, "insise modal")


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
          <div className="row py-3 border-bottom">
            <div className="6">
              <h6 className="text-white text-center">Home Documents</h6>
            </div>
          </div>
          <div className="d-flex flex-column pt-4 gap-3 text-light" style={{ cursor: "default", userSelect: "none" }}>
            {data.length > 0 && data?.map((files, index) => (
              <div className="d-flex row">- {files} </div>
            ))}
            {data.length === 0 && <div className="d-flex row">No files Uploaded </div>
            }


          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default PopupModal;
