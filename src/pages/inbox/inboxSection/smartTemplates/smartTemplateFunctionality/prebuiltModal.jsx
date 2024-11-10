import React from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import { Modal } from "react-bootstrap";
import "./smartTemplate.css";
import "../../resources/upsells.css"
import { prebuiltTemplates } from "./preBuiltTemplates";

const PrebuiltTemplatesModal = ({modalShow, handleClose, saveTemplate, saveLoading, allPropertyNamesList, turno_user_id, minut_user_id}) => {
  const navigate = useNavigate();

  const handleTemplateClick = async (templateName, templateData) => {
    if (!turno_user_id && templateName === "Property Ready message") {
      navigate('/setting/integrations')
    } else {
      if (!saveLoading) {
        const templateDataWithId = { ...templateData, id:uuidv4(), properties:allPropertyNamesList }; // create a new id for the template, and select all properties by default
        await saveTemplate(templateDataWithId, false); // TODO: have this funct return success or failure, so we can close the modal only if successful
        handleClose();
      }
    }
  }

  return (
    <Modal show={modalShow} size="lg" onHide={handleClose} aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <h5 className="modal-title">Pre-built Templates</h5>
      </Modal.Header>
      <Modal.Body>
        <p style={{textAlign:'center', color:'#FFF'}}>Choose a pre-built template to get started quickly.</p>
        {prebuiltTemplates?.length > 0 && (
          prebuiltTemplates?.map((templateItem, templateIndex) => {
            const { displayData, templateData } = templateItem;
            const { templateName, templateDescription } = displayData;
            return (
              <div className="upsells-settings" key={templateIndex}>
                <div className="row mt-5 clickable-div" style={{ marginLeft: "0", marginRight: "0" }} onClick={() => handleTemplateClick(templateName, templateData)}>
                  <div className="col-lg-11 col-12">
                    <label className="fs-5">{templateName !== "" ? templateName : <p className="text-danger">No Name</p>}</label>
                    <p className="settings-label">{templateDescription}</p>
                    {templateName === "Property Ready message" && !turno_user_id && (
                      <p className="settings-label" style={{marginTop:'10px', color:'rgb(255, 165, 0)'}}>This template requires a Turno integration. Click here to set one up.</p>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
        {saveLoading && (<p style={{ marginTop: '20px', color: 'white', textAlign: 'center' }}>Loading...</p>)}
      </Modal.Body>
    </Modal>
  );
};

export default PrebuiltTemplatesModal;
