import Multiselect from "multiselect-react-dropdown";
import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";

const TriggersTrargetsConditionsModel = ({
  show,
  handleClose,
  submitHndle,
}) => {
  const {
    modelShow,
    modelShowType,
    formData,
    editFormData,
    typepAddEdit,
    editIndex,
  } = show;

  const [selectGet, setSelectGet] = useState({});
  const [inputDataGet, setInputDataGet] = useState({});
  const selectInterface = "selectInterface";
  const selecter = "selecter";
  const inputValue = "inputValue";
  const inputShow = selectGet?.formDataConvert
    ? selectGet?.formDataConvert
    : selectGet;
  const { type, inputFiled } = inputShow || {};
  const month1to31 = "month1to31";
  const [day, setDay] = useState("");

  const OnchangeHndle = (e, typeForm, onlyUsed) => {
    const { name, value } = e.target;
    if (typeForm === selectInterface) {
      const formDataFilter = formData?.filter((item) => item?.type === value);
      const formDataConvert = formDataFilter?.[0] || {};
      setSelectGet({ formDataConvert });
      setInputDataGet({});
      setDay("");
    } else if (typeForm === inputValue) {
      if (onlyUsed === month1to31) {
        if (value === "" || (value >= 1 && value <= 31)) {
          setDay(value);
          setInputDataGet({ ...inputDataGet, [name]: value });
        }
      } else {
        setInputDataGet({ ...inputDataGet, [name]: value });
      }
    } else if (typeForm === selecter) {
      setInputDataGet({ ...inputDataGet, [name]: value });
    }
  };
  const closeHndleModel = () => {
    handleClose();
    setSelectGet({});
    setInputDataGet({});
  };

  const onSubmitHndle = () => {
    const editAddTypeSubmitHndle = { typepAddEdit, editIndex };
    submitHndle({
      type: type,
      data: inputDataGet,
      editAddTypeSubmitHndle,
      modelShowType,
    });
    closeHndleModel();
  };

  // edit functionality
  const editTypeForm = editFormData?.type;
  const obj = editFormData?.data;
  const keys = obj && Object.keys(obj);
  const values = obj && Object.values(obj);

  useEffect(() => {
    const formDataFilter = formData?.filter(
      (item) => item?.type === editTypeForm
    );
    const formDataConvert = formDataFilter?.[0] || {};
    const editValueSetInput = formDataConvert?.inputFiled?.map((filed) => {
      if (keys?.includes(filed?.payloadType)) {
        const valueIndex = keys?.indexOf(filed?.payloadType);
        const fieldValue = values?.[valueIndex];
        return { ...filed, value: fieldValue };
      }
      return filed;
    });
    setSelectGet({ ...formDataConvert, inputFiled: editValueSetInput });
    setInputDataGet(editFormData?.data);
    let dayOfMonth = editFormData?.data?.day_of_month;
    if (dayOfMonth) {
      setDay(dayOfMonth);
    }
  }, [editFormData, formData]);
  return (
    <Modal
      show={modelShow}
      size="lg"
      onHide={closeHndleModel}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <h5 className="modal-title">
          {typepAddEdit} New {modelShowType}
        </h5>
      </Modal.Header>
      <Modal.Body>
        <div className="addition_des">
          <div className="item-select my-3">
            <select
              aria-label="Default select example"
              className="bg-dark form-control form-select text-white"
              onChange={(e) => OnchangeHndle(e, selectInterface)}
            >
              {formData?.map((item) => {
                const { type, guesttype } = item;
                return (
                  <option
                    value={type}
                    selected={editTypeForm === type ? true : false}
                  >
                    {guesttype}
                  </option>
                );
              })}
            </select>
          </div>
          <hr className="bg-primary my-4" style={{ height: "2px" }} />
          <>
            {inputFiled?.map((inputFile) => {
              const {
                type,
                inputLabel,
                payloadType,
                value,
                min,
                max,
                onlyUsed,
              } = inputFile;
              return (
                <>
                  {type === "number" || type === "time" ? (
                    <>
                      <label htmlFor="">{inputLabel}</label>
                      {onlyUsed === month1to31 ? (
                        <input
                          className="form-control mb-3"
                          type={type}
                          defaultValue={value}
                          value={onlyUsed === month1to31 ? day : ""}
                          name={payloadType}
                          min={min}
                          max={max}
                          onChange={(e) =>
                            OnchangeHndle(e, inputValue, onlyUsed)
                          }
                        />
                      ) : (
                        <input
                          type={type}
                          className="form-control mb-3"
                          defaultValue={value}
                          name={payloadType}
                          onChange={(e) =>
                            OnchangeHndle(e, inputValue, onlyUsed)
                          }
                        />
                      )}
                    </>
                  ) : type === "select" ? (
                    <>
                      <div className="item-select">
                        <select
                          aria-label="Default select example"
                          className="bg-dark form-select form-control mt-4 text-white"
                          name={payloadType}
                          onChange={(e) => OnchangeHndle(e, selecter)}
                        >
                          {inputLabel?.map((item) => {
                            const { value, selectLabel } = item;
                            return (
                              <option
                                value={value}
                                selected={
                                  value === inputDataGet?.before_or_after ||
                                  value === inputDataGet?.month
                                    ? true
                                    : false
                                }
                              >
                                {selectLabel}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                    </>
                  ) : type === "multiSelecter" ? (
                    <>
                      <Multiselect
                        className="mb-3 multiselect_option"
                        displayValue="label"
                        onKeyPressFn={function noRefCheck() {}}
                        onRemove={(selectedList) =>
                          setInputDataGet({
                            ...inputDataGet,
                            [payloadType]: selectedList,
                          })
                        }
                        onSearch={function noRefCheck() {}}
                        onSelect={(selectedList) =>
                          setInputDataGet({
                            ...inputDataGet,
                            [payloadType]: selectedList,
                          })
                        }
                        options={inputLabel}
                        selectedValues={value}
                      />
                    </>
                  ) : (
                    ""
                  )}
                </>
              );
            })}
          </>
        </div>
        {inputFiled?.length > 0 ? (
          <>
            <div className="text-center mt-3 gap-3 addition_des_button modal_addition_des_button d-flex md:flex-wrap">
              <button
                type="submit"
                className="bg_theme_btn mb-3 "
                onClick={closeHndleModel}
              >
                <>Cancel</>
              </button>
              <button
                type="submit"
                className="bg_theme_btn mb-3"
                onClick={onSubmitHndle}
              >
                <>Confirm</>
              </button>
            </div>
          </>
        ) : (
          <div className="text-center mt-3 addition_des_button modal_addition_des_button">
            <button
              type="submit"
              className="bg_theme_btn mb-3"
              onClick={closeHndleModel}
            >
              <>Close</>
            </button>
          </div>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default TriggersTrargetsConditionsModel;
