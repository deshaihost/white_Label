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
          <div>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              {...register("name", { required: true })}
              placeholder="Name"
            />
            {errors.name?.type === "required" && (
              <span className="text-danger">Please enter your Name </span>
            )}
          </div>
          <div className="my-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="text"
              {...register("email", {
                required: true,
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
              placeholder="Email"
            />
            {errors.email?.type === "required" && (
              <span className="text-danger">Please enter your email </span>
            )}
            {errors.email?.type === "pattern" && (
              <span className="text-danger">{errors.email?.message}</span>
            )}
          </div>
          <div>
            <Form.Label>Phone</Form.Label>
            <Form.Control
              type="text"
              {...register("phone", {
                required: true,
                pattern: /^[0-9]{10}$/,
              })}
              placeholder="Phone"
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
          </div>
          <div className="my-3">
            <Form.Label>Message</Form.Label>
            <Form.Control type="text" {...register("message")} placeholder="Message" />
          </div>
          <div className="text-center">
            <Button type="submit">Submit</Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ContactUs;
