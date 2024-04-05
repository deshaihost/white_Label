import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
// import PrimaryButton from '../../../../component/button/button';
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import { useForm } from "react-hook-form";

const ContactUs = (props) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data,'hello')
    // dispatch(
    //   loginActions({
    //     email: data.email,
    //     password: data.password,
    //   })
    // );
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
            {errors.name?.type === "required" && (
              <span className="text-danger">Please enter your Name </span>
            )}
            <Form.Label>Name</Form.Label>
          </div>
          <div className="my-3 input-group">
            <Form.Control
              type="text"
              {...register("email", {
                required: true,
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
            />
            {errors.email?.type === "required" && (
              <span className="text-danger">Please enter your email </span>
            )}
            {errors.email?.type === "pattern" && (
              <span className="text-danger">{errors.email?.message}</span>
            )}
            <Form.Label>Email</Form.Label>
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
            {errors.phone?.type === "required" && (
              <span className="text-danger">
                Please enter your phone number
              </span>
            )}
            {errors.phone?.type === "pattern" && (
              <span className="text-danger">
                Please enter a valid phone number
              </span>
            )}
            <Form.Label>Phone</Form.Label>
          </div>
          <div className="my-3 input-group">
            <textarea className="form-control" {...register("message")}></textarea>
            <Form.Label>Message</Form.Label>
          </div>
          <div className="text-center">
            <Button type="submit" className="bg_theme_btn">Submit</Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ContactUs;
