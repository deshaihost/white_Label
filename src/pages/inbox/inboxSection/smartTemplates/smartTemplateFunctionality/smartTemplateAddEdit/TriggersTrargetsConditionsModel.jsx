import Multiselect from "multiselect-react-dropdown";
import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";

const TriggersTrargetsConditionsModel = ({ show, handleClose, submitHndle }) => {
  const { modelShow, modelShowType, formData, editFormData, typepAddEdit, editIndex } = show;
  console.log(modelShowType);

  const [selectGet, setSelectGet] = useState({}); // Selected trigger/target/condition obj from the dataInput json
  const [inputDataGet, setInputDataGet] = useState({});
  const [label, setLabel] = useState("");
  const [labelLine2, setLabelLine2] = useState("");

  const selectInterface = "selectInterface";
  const selecter = "selecter";
  const inputValue = "inputValue";
  const inputShow = selectGet?.formDataConvert ? selectGet?.formDataConvert : selectGet;
  const { type, inputFiled } = inputShow || {};
  const month1to31 = "month1to31";

  const typeToTileMapping = {'Trigger':'Send When', 'Target':'Send To', 'Conditions':'Send If'};

  const OnchangeHndle = (e, typeForm, onlyUsed) => {
    const { name, value } = e.target;
    if (typeForm === selectInterface) {
      const formDataFilter = formData?.filter((item) => item?.type === value);
      const formDataConvert = formDataFilter?.[0] || {}; // Select the first item by default
      setSelectGet(formDataConvert);
      setLabel(formDataConvert?.label || ""); // Set label dynamically if present
      setLabelLine2(formDataConvert?.labelLine2 || ""); // Set labelLine2 dynamically if present

      // Initialize inputDataGet with default values from formDataConvert.inputFiled
      const defaultInputData = {};
      formDataConvert.inputFiled?.forEach((inputFile) => {
        const { payloadType, defaultVal, type } = inputFile;
        if (defaultVal !== undefined) {
          defaultInputData[payloadType] = defaultVal;
        } else if (type === "multiSelecter") {
          defaultInputData[payloadType] = []; // Empty array for multi-select
        } else {
          defaultInputData[payloadType] = ""; // Empty string for other types
        }
      });
      setInputDataGet(defaultInputData);
    } else if (typeForm === inputValue) {
      if (onlyUsed === month1to31) {
        if (value === "" || (value >= 1 && value <= 31)) {
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
    setLabel(""); // Reset label when modal is closed
    setLabelLine2(""); // Reset labelLine2 when modal is closed
  };

  const onSubmitHndle = () => {
    const editAddTypeSubmitHndle = { typepAddEdit, editIndex };
    submitHndle({ type:type, data:inputDataGet, editAddTypeSubmitHndle, modelShowType, triggerFormData:selectGet });
    closeHndleModel();
  };

  // edit functionality
  const editTypeForm = editFormData?.type;

  useEffect(() => {
    const formDataFilter = formData?.filter((item) => item?.type === editTypeForm);
    const formDataConvert = formDataFilter?.[0] || {};
    setLabel(formDataConvert?.label || ""); // Set label when editing if present
    setLabelLine2(formDataConvert?.labelLine2 || ""); // Set labelLine2 when editing if present
    setSelectGet(formDataConvert);

    if (editFormData?.data) {
      setInputDataGet(editFormData?.data);
    } else {
      // Initialize inputDataGet with default values
      const defaultInputData = {};
      formDataConvert.inputFiled?.forEach((inputFile) => {
        const { payloadType, defaultVal, type } = inputFile;
        if (defaultVal !== undefined) {
          defaultInputData[payloadType] = defaultVal;
        } else if (type === "multiSelecter") {
          defaultInputData[payloadType] = []; // Empty array for multi-select
        } else {
          defaultInputData[payloadType] = ""; // Empty string for other types
        }
      });
      setInputDataGet(defaultInputData);
    }
  }, [editFormData, formData]);

  return (
    <Modal show={modelShow} size="lg" onHide={closeHndleModel} aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        {/* <h5 className="modal-title">{typepAddEdit} New {modelShowType}</h5> */}
        <h5 className="modal-title">{typeToTileMapping?.[modelShowType]}</h5>
      </Modal.Header>
      <Modal.Body>
        <div className="addition_des">
          <div className="item-select my-3">
            <select
              aria-label="Default select example"
              className="bg-dark form-control form-select text-white"
              value={selectGet?.type || ""}
              onChange={(e) => OnchangeHndle(e, selectInterface)}
            >
              {formData?.map((item) => {
                const { type, guesttype } = item;
                return (
                  <option value={type} disabled={type === ""} key={type}>
                    {guesttype}
                  </option>
                );
              })}
            </select>
          </div>

          {/* Render the label dynamically if it exists */}
          {label && <p className="trigger-label">{label}</p>}
          {labelLine2 && <p className="trigger-label">{labelLine2}</p>}

          <hr className="bg-primary my-4" style={{ height: "2px" }} />

          <>
            {inputFiled?.map((inputFile) => {
              const { type, inputLabel, payloadType, min, max, onlyUsed } = inputFile;
              return (
                <React.Fragment key={payloadType}>
                  {type === "number" || type === "time" ? (
                    <>
                      <label htmlFor="">{inputLabel}</label>
                      <input
                        type={type}
                        className="form-control mb-3"
                        value={inputDataGet[payloadType] ?? ""}
                        name={payloadType}
                        onChange={(e) => OnchangeHndle(e, inputValue, onlyUsed)}
                        min={min}
                        max={max}
                      />
                    </>
                  ) : type === "select" ? (
                    <div className="item-select">
                      <select
                        aria-label="Default select example"
                        className="bg-dark form-select form-control mt-4 text-white"
                        name={payloadType}
                        value={inputDataGet[payloadType] || ""}
                        onChange={(e) => OnchangeHndle(e, selecter)}
                      >
                        {inputLabel?.map((item) => {
                          const { value, selectLabel } = item;
                          return (
                            <option value={value} key={value} disabled={value === ""}>
                              {selectLabel}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  ) : type === "multiSelecter" ? (
                    <Multiselect
                      className="mb-3 multiselect_option"
                      displayValue="label"
                      options={inputLabel}
                      selectedValues={inputDataGet[payloadType] || []}
                      onRemove={(selectedList) =>
                        setInputDataGet({ ...inputDataGet, [payloadType]: selectedList })
                      }
                      onSelect={(selectedList) =>
                        setInputDataGet({ ...inputDataGet, [payloadType]: selectedList })
                      }
                    />
                  ) : null}
                </React.Fragment>
              );
            })}
          </>
        </div>
        {inputFiled?.length > 0 ? (
          <>
            <div className="text-center mt-3 gap-3 addition_des_button modal_addition_des_button d-flex md:flex-wrap">
              <button type="submit" className="bg_theme_btn mb-3" onClick={closeHndleModel}>
                Cancel
              </button>
              <button type="submit" className="bg_theme_btn mb-3" onClick={onSubmitHndle}>
                Confirm
              </button>
            </div>
          </>
        ) : (
          <div className="text-center mt-3 addition_des_button modal_addition_des_button">
            <button type="submit" className="bg_theme_btn mb-3" onClick={closeHndleModel}>
              Close
            </button>
          </div>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default TriggersTrargetsConditionsModel;
