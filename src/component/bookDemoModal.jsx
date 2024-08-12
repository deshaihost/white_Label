import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";
import React, { useState, useEffect } from "react";
import ErrorMessageShow from "../helper/ErrorMessageShow";
import { ErrorMessageKey } from "../helper/ErrorMessageKey";
import axios from "axios";


const BookDemoModal = (props) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showBackupLink, setShowBackupLink] = useState(false);
  const [randomlySelectedDemoPerson, setRandomlySelectedDemoPerson] = useState({});

  // Once, on page load, randomly select the demo person
  useEffect(() => {
    const all_demo_URLs = {'Sam':'https://calendly.com/sam-hostbuddy/30min', 'Jay':'https://calendly.com/jay-u6bh/30min'};
    //const randomly_selected_demo_person = Object.keys(all_demo_URLs)[Math.floor(Math.random() * Object.keys(all_demo_URLs).length)];
    const randomly_selected_demo_person = 'Sam';  // Always choose Sam
    const randomly_selected_demo_URL = all_demo_URLs[randomly_selected_demo_person];
    setRandomlySelectedDemoPerson({person: randomly_selected_demo_person, url: randomly_selected_demo_URL});
  }, []);

  const callSubmitApi = async (dataToSend) => {
    const baseUrl = process.env.REACT_APP_API_ENDPOINT;
    const API_KEY = process.env.REACT_APP_API_KEY;
    dataToSend.message = "Demo Requested with " + randomlySelectedDemoPerson.person;
    if (!dataToSend.source) dataToSend.source = "[Not provided]";
    dataToSend.message += "\nHow did you hear about us: " + dataToSend.source;
    delete dataToSend.source;

    try {
      const config = {
        headers: { "X-API-Key": API_KEY },
        validateStatus: function (status) { return status >= 200 && status < 500; } // don't throw an error for non-2xx responses
      };

      const response = await axios.post( `${baseUrl}/contact_us`, dataToSend, config );
      if (response.status === 200) { } else { } // don't really care about the response. Show the user a success message regardless

    } catch (error) {
    }
  }

  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    callSubmitApi(data);
    setIsSubmitted(true);
    window.gtag_report_conversion('book-a-demo');
    setTimeout(() => {
      window.open(randomlySelectedDemoPerson.url, '_blank');
    }, 300);  // Wait a lil, to try to give gtag_report_conversion a chance to fire
    setTimeout(() => {
      setShowBackupLink(true);
    }, 3000);  // Show backup link after 3 seconds, in case the user isn't automatically redirected (might happen with ad / popup blockers)
  };

  return (
    <Modal {...props} size="md" aria-labelledby="contained-modal-title-vcenter" centered className="contact-modal">
      <Modal.Header closeButton>
        <div>
          <Modal.Title id="contained-modal-title-vcenter">HostBuddy AI - Book A Demo</Modal.Title>
          <p style={{ marginTop: '15px', fontSize: '16px', color: 'white', textAlign: 'center' }}>Please provide your information, then you will be redirected to a Calendly page where you can book a demo with our team.</p>
        </div>
      </Modal.Header>
      <Modal.Body>
        {isSubmitted ? (
          <>
          <p style={{ marginTop: '15px', fontSize: '16px', color: 'white', textAlign: 'center' }}>Thanks! Redirecting...</p>
          {showBackupLink && (
            <p style={{ marginTop: '15px', fontSize: '16px', color: 'white', textAlign: 'center' }}>If you are not redirected, please click <a href={randomlySelectedDemoPerson.url} target="_blank" rel="noopener noreferrer">here</a>.</p>
          )}
          </>
        ) : (
          <Form onSubmit={handleSubmit((data) => { onSubmit(data); })}>

            <div className="input-group">
              <Form.Control type="text" {...register("name", { required: false })} maxLength="100"/>
              <Form.Label>Name</Form.Label>
            </div>

            <div className="my-3">
              <div className=" input-group">
                <Form.Control type="text" {...register("email", { required: true, pattern: {value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: `${ErrorMessageKey?.INVALID_EMAIL_ADDRESS}`}})}/>
                <Form.Label>Email</Form.Label>
              </div>
              {errors.email?.type === "required" && (<>{ErrorMessageShow(ErrorMessageKey.PLEASE_ENTER_YOUR_EMAIL)}</>)}
              {errors.email?.type === "pattern" && (<>{ErrorMessageShow(errors.email?.message)}</>)}
            </div>

            <div className="input-group">
              <Form.Control type="text" {...register("source", { required: false })} maxLength="500"/>
              <Form.Label>How did you hear about us?</Form.Label>
            </div>

            <div className="text-center">
              <Button type="submit" className="bg_theme_btn" style={{ marginTop: '20px' }}>Continue...</Button>
            </div>

          </Form>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default BookDemoModal;
