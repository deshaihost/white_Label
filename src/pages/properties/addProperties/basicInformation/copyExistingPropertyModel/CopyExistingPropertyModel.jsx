import React, { useEffect } from "react";
import { Modal } from "react-bootstrap";
import { getUserDataActions } from "../../../../../redux/actions";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";

const CopyExistingPropertyModel = ({
  handleClose,
  show,
  copyExistingPropertyNameGetPrnt,
}) => {
  const store = useSelector((state) => state);
  const dispatch = useDispatch();
  const createPropertiesName =
    store?.getUserDataReducer?.getUserData?.data?.user?.properties;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    copyExistingPropertyNameGetPrnt(data)
    handleClose("copyExistingPropertyClose")
  };

  useEffect(() => {
    dispatch(getUserDataActions());
  }, []);
  return (
    <Modal
      show={show}
      size="lg"
      onHide={() => handleClose("copyExistingPropertyClose")}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <h5 className="modal-title">Your Plan</h5>
      </Modal.Header>
      <Modal.Body>
        <div>
          <select
            class="form-select form-control"
            aria-label="Default select example"
            {...register("copyExisting")}
          >
            <option selected hidden value="">
              -Select Property-
            </option>
            {createPropertiesName?.map((propertiesName, optionIndex) => {
              return (
                <>
                  <option key={optionIndex} value={propertiesName}>
                    {propertiesName}
                  </option>
                </>
              );
            })}
          </select>
          <div className="text-center mt-5">
            <button
              className="mw-auto btn btn-primary text-white border border-primary rounded-pill px-5"
              onClick={handleSubmit(
                (data) => {
                  onSubmit(data);
                },
                (err) => {
                  console.log(err, "ee");
                }
              )}
            >
              Submit
            </button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default CopyExistingPropertyModel;
