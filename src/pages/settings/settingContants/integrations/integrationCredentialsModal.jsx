import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";
import ToastHandle from "../../../../helper/ToastMessage";

const IntegrationCredentialsModal = ({ 
  show, 
  handleClose, 
  onSuccess, 
  integration, 
  title 
}) => {
  const [credentials, setCredentials] = useState({
    token: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const getCredentialFields = () => {
    switch(integration) {
      case "hostfullyGuidebooks":
        return (
          <Form.Group className="mb-3">
            <Form.Label>Enter the Hostfully Guidebooks token</Form.Label>
            <Form.Control 
              type="text" 
              name="token"
              placeholder="Paste your token here" 
              value={credentials.token} 
              onChange={handleInputChange} 
            />
          </Form.Group>
        );
      // Add cases for future integrations here
      default:
        return null;
    }
  };

  const callConnectToHostfullyGuidebooksApi = async (token) => {
    const baseUrl = process.env.REACT_APP_API_ENDPOINT;
    const API_KEY = process.env.REACT_APP_API_KEY;
  
    try {
      const config = {
        headers: { "X-API-Key": API_KEY, 'Content-Type': 'application/json' },
        validateStatus: function (status) { return status >= 200 && status < 500; }
      };
      const body_data = { token };
  
      const response = await axios.post(`${baseUrl}/connect_to_hostfully_guidebooks`, body_data, config);
  
      if (response.status === 200) {
        ToastHandle('Connected!', 'success');
        onSuccess && onSuccess();
        handleClose();
      } else {
        ToastHandle(`Connection failed: ${response.data?.error || 'Unknown error'}`, 'danger');
      }
    } catch (error) {
      ToastHandle('Internal server error', 'danger');
      console.error("Error connecting to integration:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    
    switch(integration) {
      case "hostfullyGuidebooks":
        callConnectToHostfullyGuidebooksApi(credentials.token);
        break;
      // Add cases for future integrations here
      default:
        setIsSubmitting(false);
        console.error("Unknown integration type");
    }
  };

  // Reset form when modal is opened or closed
  const handleModalClose = () => {
    setCredentials({ token: "" });
    handleClose();
  };

  const isFormValid = () => {
    switch(integration) {
      case "hostfullyGuidebooks":
        return credentials.token.trim() !== "";
      // Add cases for future integrations here
      default:
        return false;
    }
  };

  return (
    <Modal show={show} onHide={handleModalClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{title || "Connect Integration"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          {getCredentialFields()}
        </Form>
      </Modal.Body>
      <Modal.Footer className="d-flex justify-content-center">
        <Button variant="secondary" onClick={handleModalClose} disabled={isSubmitting}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSubmit} disabled={!isFormValid() || isSubmitting}>
          {isSubmitting ? "Connecting..." : "Connect"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default IntegrationCredentialsModal;
