/// FILE UNUSED! See ContactUs.jsx in pages > meetHostBuddy > discover > contactUs

import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";
import ErrorMessageShow from "../../../../helper/ErrorMessageShow";
import { ErrorMessageKey } from "../../../../helper/ErrorMessageKey";
const ContactUs = (props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
   
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
        <Form
          onSubmit={handleSubmit(
            (data) => {
              onSubmit(data);
            },
            (err) => {
              console.log(err, "ee");
            }
          )}
        >
          <div className="input-group">
            <Form.Control
              type="text"
              {...register("name", { required: true })}
            />

            <Form.Label>Name</Form.Label>
          </div>
          {errors.name?.type === "required" && (
            <>{ErrorMessageShow(ErrorMessageKey.PLEASE_ENTER_YOUR_NAME)}</>
          )}
          <div className="my-3">
            <div className=" input-group">
              <Form.Control
                type="text"
                {...register("email", {
                  required: true,
                  pattern: {
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
            <Form.Control
              type="text"
              {...register("phone", {
                required: true,
                pattern: /^[0-9]{10}$/,
              })}
              maxLength="10"
            />
            <Form.Label>Phone</Form.Label>
          </div>
          {errors.phone?.type === "required" && (
            <>
              {ErrorMessageShow(ErrorMessageKey.PLEASE_ENTER_YOUR_PHONE_NUMBER)}
            </>
          )}
          {errors.phone?.type === "pattern" && (
            <>
              {ErrorMessageShow(
                ErrorMessageKey.PLEASE_ENTER_A_VALID_PHONE_NUMBER
              )}
            </>
          )}
          <div className="my-3 input-group">
            <textarea
              className="form-control"
              {...register("message")}
            ></textarea>
            <Form.Label>Message</Form.Label>
          </div>

          <div className="text-center">
            <Button type="submit" className="bg_theme_btn">
              Submit
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ContactUs;
