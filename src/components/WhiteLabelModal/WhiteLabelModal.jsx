import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import React, { useState, useEffect } from "react";
import { ErrorMessageKey } from "../../helper/ErrorMessageKey";
import axios from "axios";

const WhiteLabelModal = ({show, onHide, sourceMsg}) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showBackupLink, setShowBackupLink] = useState(false);
  const [redirectURL, setRedirectURL] = useState('');
  const [demoFormData, setDemoFormData] = useState({});

  // Form data state variables
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState(sourceMsg || '');
  const [source, setSource] = useState('');
  const [errors, setErrors] = useState({});

  // Synchronize demoFormData with input states
  useEffect(() => {
    setDemoFormData({ email, message });
  }, [email, message]);


  // Call the meta pixel tracking functionality added to the head in routes.jsx, to track the form submission
  const trackFormSubmission = () => {
    try {
      if (window.fbq) {
        window.fbq('track', 'Schedule');
      } else { } // Meta pixel not initialized
    } catch (error) { }
  };

  const callSubmitApi = async (dataToSend, demoTypeChoice=null) => {
    const baseUrl = process.env.REACT_APP_API_ENDPOINT;
    const API_KEY = process.env.REACT_APP_API_KEY;
    
    // Set the subject and recipient for white label requests
    dataToSend.subject = "White Label Request";
    dataToSend.recipient = "rishitha@hostbuddy.ai";

    try {
      const config = {
        headers: { "X-API-Key": API_KEY },
        validateStatus: function (status) { return status >= 200 && status < 500; } // don't throw an error for non-2xx responses
      };

      const response = await axios.post(`${baseUrl}/white_label_request`, dataToSend, config);
      if (response.status === 200) { } else { } // don't really care about the response. Show the user a success message regardless

    } catch (error) {
      // Handle error if needed
    }
  }

  const handleRedirectToDemoLink = (url, chosenDemoType=null) => {
    // Track form submission with google ads and meta pixel
    window.gtag_report_conversion('book-a-demo');
    callSubmitApi(demoFormData, chosenDemoType);

    setTimeout(() => {
      window.open(url, '_blank');
    }, 300);  // Wait a lil, to try to give gtag_report_conversion a chance to fire

    setTimeout(() => {
      setShowBackupLink(true);
    }, 800);  // Show backup link after 3 seconds, in case the user isn't automatically redirected (might happen with ad / popup blockers)
  };

  const handleMainFormSubmit = (data) => {
    setIsSubmitted(true);
    trackFormSubmission();

    // Submit the request via API
    const dataToSend = { 
      email: email, 
      message: message
    };
    callSubmitApi(dataToSend);

    // Clear form fields
    setEmail('');
    setMessage('');
    setErrors({});

    // Close the modal
    onHide();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const errors = {};
    if (!email) {
      errors.email = ErrorMessageKey.PLEASE_ENTER_YOUR_EMAIL;
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
      errors.email = 'Please enter a valid email address.';
    }
    if (!message) {
      errors.message = 'Please enter a message.';
    }
    setErrors(errors);
    if (Object.keys(errors).length === 0) { // No errors, proceed
      const data = { email, message };
      handleMainFormSubmit(data);
    }
  };

  return (
    <Modal show={show} onHide={onHide} size="md" aria-labelledby="contained-modal-title-vcenter" centered className="contact-modal">
      <Modal.Header closeButton>
        <div>
          <Modal.Title id="contained-modal-title-vcenter">HostBuddy AI - Book A Demo</Modal.Title>
          {/*
          <p style={{ marginTop: '15px', fontSize: '16px', color: 'white', textAlign: 'center' }}>
            Please provide your information, then you will be redirected to a Calendly page where you can book a demo with our team.
          </p>
          */}
        </div>
      </Modal.Header>
      <Modal.Body>
            <form onSubmit={handleSubmit}>
              <div className="my-3">
                <div className="input-group">
                  <input className="form-control" type="text" value={email} onChange={(e) => setEmail(e.target.value)}/>
                  <label>Email</label>
                </div>
                {errors.email && (
                  <p style={{ color: '#F80', marginTop: '1px', marginLeft: '10px', fontSize: '14px' }}>
                    {errors.email}
                  </p>
                )}
              </div>

              <div className="input-group">
                <input className="form-control" type="text" value={message} onChange={(e) => setMessage(e.target.value)} maxLength="500"/>
                <label>Message</label>
              </div>
              {errors.message && (
                <p style={{ color: '#F80', marginTop: '1px', marginLeft: '10px', fontSize: '14px' }}>
                  {errors.message}
                </p>
              )}

              <div className="text-center">
                <Button type="submit" className="bg_theme_btn" style={{ marginTop: '20px' }}>
                  Submit
                </Button>
              </div>
            </form>
      </Modal.Body>
    </Modal>
  );
};

export default WhiteLabelModal;
