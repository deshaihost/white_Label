import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import {
  getQuestionnaireActions,
  getUserDataActions,
  stateEmptyActions,
} from "../../../../../redux/actions";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import Loader from "../../../../../helper/Loader";
import ToastHandle from "../../../../../helper/ToastMessage";
import {
  GetquestionnaireFunction,
  nameKey,
} from "../../../../../helper/Authorized";

const CopyExistingPropertyModel = ({
  handleClose,
  show,
  copyExistingPropertyNameGetPrnt,
}) => {
  const store = useSelector((state) => state);
  const dispatch = useDispatch();
  const createPropertiesName =
    store?.getUserDataReducer?.getUserData?.data?.user?.properties;
  const copyExistingPropertiesStatus =
    store?.copyExistingPropertyReducer?.copyExistingProperty?.status;
  const copyExistingPropertiesMessage =
    store?.copyExistingPropertyReducer?.copyExistingProperty?.data?.message;
  const copyExistingProertiesLoading =
    store?.copyExistingPropertyReducer?.loading;

  const getLocalStorageData = nameKey();
  const getLocalStorageNameKey = getLocalStorageData?.nameKey;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [propertyCheck, setPropertyCheck] = useState(false);
  const [propertySelect, setPropertySelect] = useState("");

  const onSubmit = (data) => {
    setPropertySelect(data);
    setPropertyCheck(true);
    // copyExistingPropertyNameGetPrnt(data);
    // handleClose("copyExistingPropertyClose");
  };
  const closeHndle = () => {
    handleClose("copyExistingPropertyClose");
    setPropertyCheck(false);
  };

  useEffect(() => {
    dispatch(getUserDataActions());
  }, []); // TODO: only run this when the user selects "Copy Existing Property"

  useEffect(() => {
    if (copyExistingPropertiesStatus === 200) {
      ToastHandle(copyExistingPropertiesMessage, "success");
      dispatch(stateEmptyActions());
      handleClose("copyExistingPropertyClose");
      dispatch(getQuestionnaireActions(getLocalStorageNameKey));
    }
  }, [copyExistingPropertiesStatus]);

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
                  onClick={() => copyExistingPropertyNameGetPrnt(propertySelect)}
                >
                  {!copyExistingProertiesLoading ? "YES" : <Loader />}
                  
                </button>
                <button
                  className="btn btn-danger mx-4"
                  onClick={() => handleClose("copyExistingPropertyClose")}
                >
                  NO
                </button>
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
