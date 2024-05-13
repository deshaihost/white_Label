import React, { useEffect, useState } from "react";
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
  const [propertyCheck, setPropertyCheck] = useState(true);

  const onSubmit = (data) => {
    copyExistingPropertyNameGetPrnt(data);
    handleClose("copyExistingPropertyClose");
  };
  const closeHndle=()=>{
    handleClose("copyExistingPropertyClose");
    setPropertyCheck(true)
  }

  useEffect(() => {
    dispatch(getUserDataActions());
  }, []); // TODO: only run this when the user selects "Copy Existing Property"

  return (
    <Modal
      show={show}
      size="lg"
      onHide={() => closeHndle()}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <h5 className="modal-title">Choose A Source Property</h5>
      </Modal.Header>
      <Modal.Body>
        {propertyCheck ? (
          <>
            <div className="text-white">
              <div>
                <h5>
                  This will overwrite any data previously added to this property
                  from this form. Files and integrations will not be copied or
                  overwritten. Would you like to proceed?
                </h5>
              </div>
              <div className="d-flex justify-content-center">
                <button
                  className="btn btn-primary"
                  onClick={() => setPropertyCheck(false)}
                >
                  YES
                </button>
                <button className="btn btn-danger mx-4" onClick={()=>handleClose("copyExistingPropertyClose")}>NO</button>
              </div>
            </div>
          </>
        ) : (
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
        )}
      </Modal.Body>
    </Modal>
  );
};

export default CopyExistingPropertyModel;
