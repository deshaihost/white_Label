import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import "./smartTemplate.css";
import "../../resources/upsells.css"

const PrebuiltTemplatesModal = ({modalShow, handleClose, saveTemplate, saveLoading}) => {

  // For now: defining the pre-built templates here. TODO: move to a separate file
  const prebuiltTemplates = [
    {
      displayData: {
        templateName: "Post-stay review request",
        templateDescription: "Send a message to your guests after their stay if they have a positive sentiment, asking them to leave a review."
      },
      templateData: {
        name: "Post-stay review request",
        enabled: false,
        message: "Hi [[guest_name]],\n\n I hope you enjoyed your stay! If you have a moment, I’d greatly appreciate it if you could leave us a review. It really helps us out and ensures we can keep providing the best experience for our guests.\n\nThank you again for choosing us for your stay!\n\nBest regards.",
        triggers: [
          {
            type: "check_out",
            data: {
              before_or_after: "after",
              hours: 4,
              minutes: 0
            }
          }
        ],
        targets: [
          {
            type: "triggered_guest",
            data: {}
          }
        ],
        conditions: [
          {
            type: "sentiment",
            data: {
              criteria: ["positive"]
            }
          }
        ]
      }
    },
    {
      displayData: {
        templateName: "Property Ready message",
        templateDescription: "If your property is cleaned early, send a message to the next guest welcoming them to check in early.",
      },
      templateData: {
        name: "Property Ready message",
        enabled: false,
        message: "Hi [[guest_name]], the property is ready for you to check in! We're here if you need anything. Enjoy your stay!",
        triggers: [
          {
            type: "cleaning_complete",
            data: {
              before_or_after: "after",
              hours: 0,
              minutes: 0
            }
          }
        ],
        targets: [
          {
            type: "guests_checking_in",
            data: {
              min_days_from_now: 0,
              max_days_from_now: 0
            }
          }
        ],
        conditions: [
          {
            type: "is_within_time_range",
            data: {
              start_time: "00:00",
              end_time: "16:00"
            }
          }
        ]
      }
    },
    {
      displayData: {
        templateName: "Post-check-in welcome message",
        templateDescription: "Send a message to your guests after they check in to welcome them",
      },
      templateData: {
        name: "Post-check-in welcome message",
        enabled: false,
        ai_context_check: true,
        message: "Hi [[guest_name]], I hope you're finding everything well! If you need anything, don't hesitate to ask. Enjoy your stay!",
        triggers: [
          {
            type: "check_in",
            data: {
              before_or_after: "after",
              hours: 1,
              minutes: 30
            }
          }
        ],
        targets: [
          {
            type: "triggered_guest",
            data: {}
          }
        ],
        conditions: []
      }
    }
  ];

  // TODO: check if the name of the template being added is the same as an existing, and rename of so. Or maybe when I switch to IDs, this won't be needed
  const handleTemplateClick = async (templateData) => {
    if (!saveLoading) {
      await saveTemplate(templateData); // TODO: have this funct return success or failure, so we can close the modal only if successful
      handleClose();
    }
  }

  return (
    <Modal show={modalShow} size="lg" onHide={handleClose} aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <h5 className="modal-title">Pre-built Templates</h5>
      </Modal.Header>
      <Modal.Body>
      {prebuiltTemplates?.length > 0 && (
        prebuiltTemplates?.map((templateItem, templateIndex) => {
          const { displayData, templateData } = templateItem;
          const { templateName, templateDescription } = displayData;
          return (
            <div className="upsells-settings" key={templateIndex}>
              <div className="row mt-5 clickable-div" style={{ marginLeft: "0", marginRight: "0" }} onClick={() => handleTemplateClick(templateData)}>
                <div className="col-lg-11 col-12">
                  <label className="fs-5">{templateName !== "" ? templateName : <p className="text-danger">Empty</p>}</label>
                  <p className="settings-label">{templateDescription}</p>
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
