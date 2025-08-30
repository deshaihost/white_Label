import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import React, { useState, useEffect } from "react";
import ErrorMessageShow from "../helper/ErrorMessageShow";
import { ErrorMessageKey } from "../helper/ErrorMessageKey";
import axios from "axios";

const BookDemoModal = ({show, onHide, sourceMsg}) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showBackupLink, setShowBackupLink] = useState(false);
  const [redirectURL, setRedirectURL] = useState('');
  const [demoFormData, setDemoFormData] = useState({});

  // Form data state variables
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [propertyCount, setPropertyCount] = useState('');
  const [source, setSource] = useState('');
  const [errors, setErrors] = useState({});
  const [showDemoOptions, setShowDemoOptions] = useState(null);

  // Synchronize demoFormData with input states
  useEffect(() => {
    setDemoFormData({ name, email, propertyCount, source });
  }, [name, email, propertyCount, source]);


  // 1. SET DEMO LINKS
  const camiloDemoLink = 'https://calendly.com/d/cm2q-5ht-w5m/hostbuddy-ai-demo';
  const groupDemoLink = 'https://calendly.com/camilo-hostbuddy/hostbuddy-ai-group-demo';
  const selfServiceDemoLink = 'https://www.loom.com/share/26fe773dbcc141699285b8f36cb7475b?sid=b645c6cd-7690-4e9d-bad5-610daa11fe36';
  const tylerDemoLink = 'https://calendly.com/d/cwbc-cdz-84r/hostbuddy-ai-product-demo';


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
    dataToSend.message = "Demo Requested";
    if (!dataToSend.source) dataToSend.source = "[Not provided]";

    dataToSend.message += "\nProperty count: " + dataToSend.propertyCount;
    dataToSend.message += "\nHow did you hear about us: " + dataToSend.source;
    if (sourceMsg) dataToSend.message += "\nClick source: " + String(sourceMsg);
    if (demoTypeChoice) dataToSend.message += "\nChosen demo type: " + demoTypeChoice;

    delete dataToSend.source; // don't send this to the API

    try {
      const config = {
        headers: { "X-API-Key": API_KEY },
        validateStatus: function (status) { return status >= 200 && status < 500; } // don't throw an error for non-2xx responses
      };

      const response = await axios.post(`${baseUrl}/contact_us`, dataToSend, config);
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

    // Don't use "data" at all - use the state variables
    const formData = { name:name, email:email, propertyCount:propertyCount, source:source };

    setIsSubmitted(true);
    trackFormSubmission();

    // 2. SET THE APPROPRIATE LOGIC TO SELECT THE CORRECT 1:1 URL BASED ON PROPERTY COUNT
    // Based on the property count: choose the appropriate demo link
    let urlForOneOnOneDemos = camiloDemoLink; // default
    if (parseInt(formData.propertyCount) < 40) {
      urlForOneOnOneDemos = camiloDemoLink;
    } else {
      urlForOneOnOneDemos = tylerDemoLink;
    }
    setRedirectURL(urlForOneOnOneDemos);

    // 3. SET APPROPRIATE LOGIC TO EITHER REDIRECT DIRECTLY (handleRedirectToDemoLink) OR SHOW OPTIONS BETWEEN 1:1, GROUP, OR SELF SERVICE (setShowDemoOptions) BASED ON PROPERTY COUNT
    // Based on the property count: either redirect straight to the demo link chosen above, or show the user a choice
    if ((parseInt(formData.propertyCount) < 40) || true) { // Always just let them choose
      //handleRedirectToDemoLink(urlForOneOnOneDemos);
      setShowDemoOptions({ groupLink:groupDemoLink, oneOnOneLink:urlForOneOnOneDemos, selfServiceLink:selfServiceDemoLink }); // actually, let small fish choose 1:1 also
    } else {
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const errors = {};
    if (!email) {
      errors.email = ErrorMessageKey.PLEASE_ENTER_YOUR_EMAIL;
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
      errors.email = 'Please enter a valid email address.';
    }
    if (!propertyCount) {
      errors.propertyCount = "Please enter your property count.";
    } else if (parseInt(propertyCount) < 0) {
      errors.propertyCount = "Property count must be at least 0.";
    } else if (parseInt(propertyCount) > 9999) {
      errors.propertyCount = "Property count cannot exceed 9999.";
    } else if (!Number.isInteger(parseFloat(propertyCount))) {
      errors.propertyCount = "Property count must be an integer.";
    }
    setErrors(errors);
    if (Object.keys(errors).length === 0) { // No errors, proceed
      const data = { name, email, property_count: propertyCount, source};
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
        {!showDemoOptions ? (
          isSubmitted ? (
            <>
              <p style={{ marginTop: '15px', fontSize: '16px', color: 'white', textAlign: 'center' }}>Thanks! Redirecting...</p>
              {showBackupLink && (
                <p style={{ marginTop: '15px', fontSize: '16px', color: 'white', textAlign: 'center' }}>
                  If you are not redirected, please click <a href={redirectURL} target="_blank" rel="noopener noreferrer">here</a>.
                </p>
              )}
            </>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="input-group">
                <input className="form-control" type="text" value={name} onChange={(e) => setName(e.target.value)} maxLength="100"/>
                <label>Name</label>
              </div>

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

              <div className="my-3">
                <div className="input-group">
                  <input className="form-control" type="number" value={propertyCount} onChange={(e) => setPropertyCount(e.target.value)}/>
                  <label>How many properties?</label>
                </div>
                {errors.propertyCount && (
                  <p style={{ color: '#F80', marginTop: '1px', marginLeft: '10px', fontSize: '14px' }}>
                    {errors.propertyCount}
                  </p>
                )}
              </div>

              <div className="input-group">
                <input className="form-control" type="text" value={source} onChange={(e) => setSource(e.target.value)} maxLength="500"/>
                <label>How did you hear about us?</label>
              </div>

              <div className="text-center">
                <Button type="submit" className="bg_theme_btn" style={{ marginTop: '20px' }}>
                  Continue...
                </Button>
              </div>
            </form>
          )
        ) : (
          <>
            <h6 style={{fontSize:'20px', color:'white', textAlign:'center', fontWeight:'bold'}}>
              Select A Demo Type
            </h6>

            <p style={{ marginTop: '30px', fontSize: '16px', color: 'white', textAlign: 'center' }}>
              Group Demo
            </p>
            <div className="text-center">
              {showBackupLink ? (
                <a href={showDemoOptions.groupLink} target="_blank" rel="noopener noreferrer">
                  <Button className="bg_theme_btn" style={{marginTop:'5px'}}>
                    Join a Group Demo
                  </Button>
                </a>
              ) : (
                <Button className="bg_theme_btn" onClick={() => handleRedirectToDemoLink(showDemoOptions.groupLink, 'Group')} style={{marginTop:'5px'}}>
                  Join a Group Demo
                </Button>
              )}
            </div>

            <p style={{ marginTop: '35px', fontSize: '16px', color: 'white', textAlign: 'center' }}>
              1:1 Demo (Limited Availability)
            </p>
            <div className="text-center">
              {showBackupLink ? (
                <a href={showDemoOptions.oneOnOneLink} target="_blank" rel="noopener noreferrer">
                  <Button className="bg_theme_btn" style={{marginTop:'5px'}}>
                    Book a 1:1 Demo
                  </Button>
                </a>
              ) : (
                <Button className="bg_theme_btn" onClick={() => handleRedirectToDemoLink(showDemoOptions.oneOnOneLink, '1:1')} style={{marginTop:'5px'}}>
                  Book a 1:1 Demo
                </Button>
              )}
            </div>

            <p style={{ marginTop: '35px', fontSize: '16px', color: 'white', textAlign: 'center' }}>
              Watch Recorded Demo
            </p>
            <div className="text-center">
              {showBackupLink ? (
                <a href={showDemoOptions.selfServiceLink} target="_blank" rel="noopener noreferrer">
                  <Button className="bg_theme_btn" style={{marginTop:'5px'}}>
                    Watch Recording
                  </Button>
                </a>
              ) : (
                <Button className="bg_theme_btn" onClick={() => handleRedirectToDemoLink(showDemoOptions.selfServiceLink, 'Self-Service')} style={{marginTop:'5px'}}>
                  Watch Recording
                </Button>
              )}
            </div>
          </>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default BookDemoModal;
