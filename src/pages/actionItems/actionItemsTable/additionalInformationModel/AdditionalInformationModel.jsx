import React, { useState } from "react";
import { Modal } from "react-bootstrap";

const AdditionalInformationModel = (props) => {
  const { onHide, show } = props;
  const additional = "additional";
  const note = "note";
  const [additionalSection, setAdditionalSection] = useState(additional);

  const saveHandl = (type) => {
    if (additional === type) {
      setAdditionalSection(note);
    }
  };
  const closeHandle = (type) => {
    if (additional === type) {
      setAdditionalSection(type);
      onHide();
    }
  };

  return (
    <Modal
      show={show}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="text-white"
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          {additionalSection === additional
            ? "Additional Information"
            : "Notes"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {additionalSection === additional ? (
          <>
            <div className="form-design mb-4">
              <label style={{ display: "block", textAlign: "center" }}>
                Heating
              </label>
              <textarea
                className="form-control"
                id=""
                cols="30"
                rows="10"
                placeholder="Enter note here..."
              ></textarea>
              <hr style={{ borderTop: "0px solid #0078F0" }} />
              <label>
                Information from this question will only be provided to guests
                at the selected (blue) reservation stages. You can de-select
                stages below to prevent HostBuddy from sharing this information
                with those guests.
              </label>

              <div className=" d-flex justify-content-between mt-3">
                {["Future", "Inquiry/Post", "Current"]?.map((items) => {
                  return <button className="ms-2">{items}</button>;
                })}
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
                  onClick={() => saveHandl(additional)}
                >
                  Save
                </button>
              </div>
            </div>
          </>
        ) : (
          <>
            {" "}
            <div className="form-design mb-4">
              <label style={{ display: "block", textAlign: "center" }}>
                Heating
              </label>
              <textarea
                className="form-control"
                id=""
                cols="30"
                rows="10"
                placeholder="Enter note here..."
              ></textarea>
              <hr style={{ borderTop: "0px solid #0078F0" }} />

              <div className="d-flex justify-content-center mt-3">
                <button
                  className="mw-auto"
                  onClick={() => saveHandl(additional)}
                >
                  Save
                </button>
                <button className="" onClick={() => closeHandle(additional)}>
                  Close
                </button>
              </div>
            </div>
          </>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default AdditionalInformationModel;
