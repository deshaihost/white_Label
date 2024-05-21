import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";
import React, { useState } from "react";
import ErrorMessageShow from "../../../../helper/ErrorMessageShow";
import { ErrorMessageKey } from "../../../../helper/ErrorMessageKey";
import axios from "axios";


const ContactUs = (props) => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const callSubmitApi = async (dataToSend) => {
    const baseUrl = process.env.REACT_APP_API_ENDPOINT;
    const API_KEY = process.env.REACT_APP_API_KEY;

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
  };

  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="contact-modal"
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Contact Us</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {isSubmitted ? (
          <p>Thanks! Your message has been submitted. We'll be in touch with you soon.</p>
        ) : (
          <Form onSubmit={handleSubmit(
            (data) => { onSubmit(data); },
            (err) => { console.log(err, "ee"); }
          )}
          >
            <div className="input-group">
              <Form.Control type="text" {...register("name", { required: false })} maxLength="100"/>
              <Form.Label>Name</Form.Label>
            </div>
            <div className="my-3">
              <div className=" input-group">
                <Form.Control type="text" {...register("email", { required: true, pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: `${ErrorMessageKey?.INVALID_EMAIL_ADDRESS}`,
                    },
                  })}
                />

                <Form.Label>Email</Form.Label>
              </div>
              {errors.email?.type === "required" && (
                <>{ErrorMessageShow(ErrorMessageKey.PLEASE_ENTER_YOUR_EMAIL)}</>
              )}
              {errors.email?.type === "pattern" && (
                <>{ErrorMessageShow(errors.email?.message)}</>
              )}
            </div>
            <div className="input-group">
              <Form.Control type="text" {...register("phone", { required: false })} maxLength="25" />
              <Form.Label>Phone (optional)</Form.Label>
            </div>
            {errors.phone?.type === "pattern" && (
              <>
                {ErrorMessageShow( ErrorMessageKey.PLEASE_ENTER_A_VALID_PHONE_NUMBER )}
              </>
            )}
            <div className="my-3 input-group">
              <textarea className="form-control" {...register("message", {required:true})} maxLength="2000"></textarea>
              <Form.Label>Message</Form.Label>
            </div>

            <div className="text-center">
              <Button type="submit" className="bg_theme_btn"> Submit </Button>
            </div>
          </Form>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default ContactUs;
