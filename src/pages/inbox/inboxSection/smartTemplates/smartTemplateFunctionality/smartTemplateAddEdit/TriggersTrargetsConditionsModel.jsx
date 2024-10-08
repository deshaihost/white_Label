import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";

const TriggersTrargetsConditionsModel = ({
  show,
  handleClose,
  submitHndle,
}) => {
  const { modelShow, modelShowType, formData, editFormData } = show;
  const [selectGet, setSelectGet] = useState({});
  const [inputDataGet, setInputDataGet] = useState({});
  const selectInterface = "selectInterface";
  const selecter = "selecter";
  const inputValue = "inputValue";
  const inputShow = selectGet?.formDataConvert;
  const { type, inputFiled } = inputShow || {};

  const OnchangeHndle = (e, typeForm) => {
    const { name, value } = e.target;
    if (typeForm === selectInterface) {
      const formDataFilter = formData?.filter((item) => item?.type === value);
      const formDataConvert = formDataFilter?.[0] || {};
      setSelectGet({ formDataConvert });
    } else if (typeForm === inputValue) {
      setInputDataGet({ ...inputDataGet, [name]: value });
    } else if (typeForm === selecter) {
      setInputDataGet({ ...inputDataGet, [name]: value });
    }
  };

  const closeHndleModel=()=>{
    handleClose();
    setSelectGet({});
  }

  const onSubmitHndle = () => {
    submitHndle({ type: type, data: inputDataGet, id: uuidv4() });
    closeHndleModel()
  };

  useEffect(() => {
    const editTypeForm = editFormData?.type;
    const formDataFilter = formData?.filter(
      (item) => item?.type === editTypeForm
    );
    const formDataConvert = formDataFilter?.[0] || {};
    setSelectGet({formDataConvert});
  }, [editFormData]);

console.log(editFormData,'editFormDataeditFormDataeditFormData',inputFiled)
  return (
    <Modal
      show={modelShow}
      size="lg"
      onHide={closeHndleModel}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <h5 className="modal-title">Add New {modelShowType}</h5>
      </Modal.Header>
      <Modal.Body>
        <div className="addition_des">
          {inputFiled !== undefined ? (
            <>
              {inputFiled?.map((inputFile) => {
                const { type, inputLabel, payloadType } = inputFile;
                return (
                  <>
                    {type === "number" ? (
                      <>
                        <label htmlFor="">{inputLabel}</label>
                        <input
                          type={type}
                          name={payloadType}
                          onChange={(e) => OnchangeHndle(e, inputValue)}
                        />
                      </>
                    ) : type === "select" ? (
                      <>
                        <div className="item-select">
                          <select
                            aria-label="Default select example"
                            className="bg-dark form-select text-white"
                            name={payloadType}
                            onChange={(e) => OnchangeHndle(e, selecter)}
                          >
                            {inputLabel?.map((item) => {
                              const { value, selectLabel } = item;
                              return (
                                <option value={value}>{selectLabel}</option>
                              );
                            })}
                          </select>
                        </div>
                      </>
                    ) : (
                      ""
                    )}
                  </>
                );
              })}
            </>
          ) : (
            <div className="item-select">
              <select
                aria-label="Default select example"
                className="bg-dark form-select text-white"
                onChange={(e) => OnchangeHndle(e, selectInterface)}
              >
                {formData?.map((item) => {
                  const { type, guesttype } = item;

                  return <option value={type}>{guesttype}</option>;
                })}
              </select>
            </div>
          )}
        </div>

        <div className="text-center mt-3 addition_des_button">
          <button
            type="submit"
            className="bg_theme_btn mb-3"
            onClick={onSubmitHndle}
          >
            <>Confirm</>
          </button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default TriggersTrargetsConditionsModel;
