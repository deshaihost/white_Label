import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import React, { useState, useEffect } from "react";
import ErrorMessageShow from "../helper/ErrorMessageShow";
import { ErrorMessageKey } from "../helper/ErrorMessageKey";
import axios from "axios";

const BookDemoModal = ({show, onHide, sourceMsg}) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showBackupLink, setShowBackupLink] = useState(false);
  const [randomlySelectedDemoPerson, setRandomlySelectedDemoPerson] = useState({});
  const [redirectURL, setRedirectURL] = useState('');

  // Form data state variables
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [propertyCount, setPropertyCount] = useState('');
  const [source, setSource] = useState('');
  const [errors, setErrors] = useState({});

  // Once, on page load, randomly select the demo person
  useEffect(() => {
    const all_demo_URLs = {
      'Sam': 'https://calendly.com/sam-hostbuddy/30min',
      'Jay': 'https://calendly.com/jay-u6bh/30min',
      'Nick': 'https://calendly.com/nick-hostbuddy/30min'
    }; // Sam group demo is below
    //const randomly_selected_demo_person = Object.keys(all_demo_URLs)[Math.floor(Math.random() * Object.keys(all_demo_URLs).length)];
    const randomly_selected_demo_person = 'Nick';  // Always choose Nick
    const randomly_selected_demo_URL = all_demo_URLs[randomly_selected_demo_person];
    setRandomlySelectedDemoPerson({
      person: randomly_selected_demo_person,
      url: randomly_selected_demo_URL
    });
  }, []);

  // Call the meta pixel tracking functionality added to the head in routes.jsx, to track the form submission
  const trackFormSubmission = () => {
    try {
      if (window.fbq) {
        window.fbq('track', 'Schedule');
      } else { } // Meta pixel not initialized
    } catch (error) { }
  };

  const callSubmitApi = async (dataToSend) => {
    const baseUrl = process.env.REACT_APP_API_ENDPOINT;
    const API_KEY = process.env.REACT_APP_API_KEY;
    dataToSend.message = "Demo Requested with " + randomlySelectedDemoPerson.person;
    if (!dataToSend.source) dataToSend.source = "[Not provided]";

    dataToSend.message += "\nProperty count: " + dataToSend.propertyCount;
    dataToSend.message += "\nHow did you hear about us: " + dataToSend.source;
    if (sourceMsg) dataToSend.message += "\nClick source: " + String(sourceMsg);

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

  const onSubmit = (data) => {

    // Don't use "data" at all - use the state variables
    const formData = { name: name, email: email, propertyCount: propertyCount, source: source };

    callSubmitApi(formData);
    setIsSubmitted(true);
    
    // Track form submission with google ads and meta pixel
    window.gtag_report_conversion('book-a-demo');
    trackFormSubmission();

    //let url = randomlySelectedDemoPerson.url;
    let url = 'https://calendly.com/d/ckq2-5yb-8f5/hostbuddy-ai-demo'; // big customer demo

    if (parseInt(formData.propertyCount) <= 15) {
      url = 'https://calendly.com/nick-hostbuddy/hostbuddy-ai-demo-webinar';
    } else if (parseInt(formData.propertyCount) <= 34) {
      url = 'https://calendly.com/d/ckq2-5yb-8f5/hostbuddy-ai-demo';
    } else if (parseInt(formData.propertyCount) <= 99) {
      url = 'https://calendly.com/d/cmyr-2pj-brv/hostbuddy-ai-product-demo';
    } else if (parseInt(formData.propertyCount) > 99) {
      url = 'https://calendly.com/sam-hostbuddy/30min';
    } else { // shouldn't happen
      url = 'https://calendly.com/nick-hostbuddy/hostbuddy-ai-demo-webinar';
    }


    setRedirectURL(url);

    setTimeout(() => {
      window.open(url, '_blank');
    }, 300);  // Wait a lil, to try to give gtag_report_conversion a chance to fire

    setTimeout(() => {
      setShowBackupLink(true);
    }, 3000);  // Show backup link after 3 seconds, in case the user isn't automatically redirected (might happen with ad / popup blockers)
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
      onSubmit(data);
    }
  };

  return (
    <Modal show={show} onHide={onHide} size="md" aria-labelledby="contained-modal-title-vcenter" centered className="contact-modal">
      <Modal.Header closeButton>
        <div>
          <Modal.Title id="contained-modal-title-vcenter">HostBuddy AI - Book A Demo</Modal.Title>
          <p style={{ marginTop: '15px', fontSize: '16px', color: 'white', textAlign: 'center' }}>
            Please provide your information, then you will be redirected to a Calendly page where you can book a demo with our team.
          </p>
        </div>
      </Modal.Header>
      <Modal.Body>
        {isSubmitted ? (
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
        )}
      </Modal.Body>
    </Modal>
  );
};

export default BookDemoModal;
