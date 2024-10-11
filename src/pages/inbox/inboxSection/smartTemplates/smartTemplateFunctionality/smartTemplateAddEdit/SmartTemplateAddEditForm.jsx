import React, { useState } from "react";
import TriggersTrargetsConditionsModel from "./TriggersTrargetsConditionsModel";
import { dataInput } from "./SmartTemplateJson";

const SmartTemplateAddEditForm = ({
  addEditSmart,
  addEditClose,
  AllDataGetHndle,
}) => {
  const { type, smartTemplateData } = addEditSmart;
  const { triggers, targets, conditions } = dataInput;
  const edit = "Edit";
  const add = "Add";
  const triggerName = "Trigger";
  const targetsName = "Targets";
  const conditionsName = "Conditions";
  const [allData, setAllData] = useState({
    modelShow: false,
    modelShowType: "",
    formData: [],
  });

  const dataStructurePayload = smartTemplateData?.smartItem
    ? smartTemplateData?.smartItem
    : {
        name: "",
        is_enabled: false,
        triggers: [],
        targets: [],
        conditions: [],
      };
  const [dataStructure, setDataStructure] = useState(dataStructurePayload);

  const submitHndle = (getFormData) => {
    const { data, type, editAddTypeSubmitHndle, modelShowType } = getFormData;
    const { typepAddEdit, editIndex } = editAddTypeSubmitHndle || {};
    const newTrigger = {
      type,
      data,
    };
    if (modelShowType === triggerName) {
      setDataStructure((prevData) => {
        if (typepAddEdit === add) {
          return {
            ...prevData,
            triggers: [...prevData.triggers, newTrigger],
          };
        } else if (typepAddEdit === edit) {
          const updatedTriggers = [...prevData.triggers];
          if (editIndex >= 0 && editIndex < updatedTriggers.length) {
            updatedTriggers[editIndex] = newTrigger;
          }
          return {
            ...prevData,
            triggers: updatedTriggers,
          };
        }
      });
    } else if (modelShowType === targetsName) {
      setDataStructure((prevData) => {
        if (typepAddEdit === add) {
          return {
            ...prevData,
            targets: [...prevData.targets, newTrigger],
          };
        } else if (typepAddEdit === edit) {
          const updatedTriggers = [...prevData.targets];
          if (editIndex >= 0 && editIndex < updatedTriggers.length) {
            updatedTriggers[editIndex] = newTrigger;
          }
          return {
            ...prevData,
            targets: updatedTriggers,
          };
        }
      });
    } else if (modelShowType === conditionsName) {
      setDataStructure((prevData) => {
        if (typepAddEdit === add) {
          return {
            ...prevData,
            conditions: [...prevData.conditions, newTrigger],
          };
        } else if (typepAddEdit === edit) {
          const updatedTriggers = [...prevData.conditions];
          if (editIndex >= 0 && editIndex < updatedTriggers.length) {
            updatedTriggers[editIndex] = newTrigger;
          }
          return {
            ...prevData,
            conditions: updatedTriggers,
          };
        }
      });
    }
  };

  return (
    <div>
      <div className="d-flex gap-3 flex-wrap align-items-center justify-content-between mb-3">
        <div>
          <h1>{type?.type} Smart Template</h1>
          <p onClick={addEditClose} className="text-primary">{"<"} Smart Templates </p>
        </div>

        <button
          className="bg_theme_btn mb-3"
          onClick={() => {
            AllDataGetHndle(dataStructure, type);
            addEditClose();
          }}
        >
          Save
        </button>
      </div>
      <hr className="bg-white opacity-100 my-4" style={{ height: "2px" , opacity:'75%'}} />
      <div className="my-3">
        <p className="d-flex align-items-center gap-5">
          Enable Post Stay Review Request
          <div class="form-check form-switch">
            <input
              className="form-check-input"
              type="checkbox"
              checked={dataStructure?.is_enabled}
              onClick={(e) => {
                setDataStructure({
                  ...dataStructure,
                  is_enabled: e.target.checked,
                });
              }}
              id="flexSwitchCheckChecked"
            />
          </div>
        </p>
        <p className="fs-14 text-muted">
          You currently have post-stay review requests{" "}
          <span
            className={
              dataStructure?.is_enabled ? "text-success" : "text-danger"
            }
          >
            {dataStructure?.is_enabled ? "enabled" : "disable"}
          </span>
        </p>
      </div>
      <div className="row">
        <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12">
          <p className="fs-5 fw-bold">Template Name</p>
          <input
            className="form-control mt-2"
            type="text"
            value={dataStructure?.name}
            onChange={(e) => {
              setDataStructure({ ...dataStructure, name: e.target.value });
            }}
          />
        </div>
      </div>
      <div className="my-3">
        <p className="fs-5 fw-bold">Triggers</p>
        <p className="fs-14 mt-1 text-muted">
          This controls what will cause the message to be send
        </p>
        {dataStructure?.triggers?.length > 0 &&
          dataStructure?.triggers?.map((trigger, index) => {
            const { type } = trigger;
            return (
              <div className="row">
                <div className="col-lg-4">
                  <div className="d-flex align-items-center justify-content-between gap-2 mt-2">
                    <p className="fs-6">{type}</p>

                    <div className="d-flex align-items-center gap-3">
                      <p
                        className="text-danger mainCursor fs-6"
                        onClick={() => {
                          setDataStructure((prevData) => ({
                            ...prevData,
                            triggers: dataStructure?.triggers?.filter(
                              (_, id) => id !== index
                            ),
                          }));
                        }}
                      >
                        Remove
                      </p>
                      <p
                        onClick={() =>
                          setAllData({
                            modelShow: true,
                            modelShowType: triggerName,
                            formData: triggers,
                            editFormData: trigger,
                            editIndex: index,
                            typepAddEdit: edit,
                          })
                        }
                        className="text-primary mainCursor fs-6"
                      >
                        Edit
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        <button
          className="bg-none text-primary border-0 outline-0 fs-6 fw-bold px-2 mt-1 d-flex align-items-center"
          onClick={() =>
            setAllData({
              modelShow: true,
              modelShowType: triggerName,
              formData: triggers,
              typepAddEdit: add,
            })
          }
        >
          <i className="bi bi-plus fs-3"></i> Add a Trigger
        </button>
      </div>
      <div className="my-3">
        <p className="fs-5 fw-bold">Targets</p>
        <p className="fs-14 mt-1 text-muted">
          These are the guests that will receive the message
        </p>
        {dataStructure?.targets?.length > 0 &&
          dataStructure?.targets?.map((targetsItem, index) => {
            const { type } = targetsItem;
            return (
              <div className="row">
                <div className="col-lg-4">
                  <div className="d-flex align-items-center justify-content-between gap-2 mt-2">
                    <p className="fs-6">{type}</p>

                    <div className="d-flex align-items-center gap-3">
                      <p
                        className="text-danger mainCursor fs-6"
                        onClick={() => {
                          setDataStructure((prevData) => ({
                            ...prevData,
                            targets: dataStructure?.targets?.filter(
                              (_, id) => id !== index
                            ),
                          }));
                        }}
                      >
                        Remove
                      </p>
                      <p
                        onClick={() =>
                          setAllData({
                            modelShow: true,
                            modelShowType: targetsName,
                            formData: targets,
                            editFormData: targetsItem,
                            editIndex: index,
                            typepAddEdit: edit,
                          })
                        }
                        className="text-primary mainCursor fs-6"
                      >
                        Edit
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        <button
          className="bg-none text-primary border-0 outline-0 fs-6 fw-bold px-2 mt-1 d-flex align-items-center"
          onClick={() =>
            setAllData({
              modelShow: true,
              modelShowType: targetsName,
              formData: targets,
              typepAddEdit: add,
            })
          }
        >
          <i className="bi bi-plus fs-3 "></i> Add a Target
        </button>
      </div>
      <div className="my-3">
        <p className="fs-5 fw-bold">Conditions</p>
        {dataStructure?.conditions?.length > 0 &&
          dataStructure?.conditions?.map((conditionsItem, index) => {
            const { type } = conditionsItem;
            return (
              <div className="row">
                <div className="col-lg-4">
                  <div className="d-flex align-items-center justify-content-between gap-2 mt-2">
                    <p className="fs-6">{type}</p>

                    <div className="d-flex align-items-center gap-3">
                      <p
                        className="text-danger mainCursor fs-6"
                        onClick={() => {
                          setDataStructure((prevData) => ({
                            ...prevData,
                            conditions: dataStructure?.conditions?.filter(
                              (_, id) => id !== index
                            ),
                          }));
                        }}
                      >
                        Remove
                      </p>
                      <p
                        onClick={() =>
                          setAllData({
                            modelShow: true,
                            modelShowType: conditionsName,
                            formData: conditions,
                            editFormData: conditionsItem,
                            editIndex: index,
                            typepAddEdit: edit,
                          })
                        }
                        className="text-primary mainCursor fs-6"
                      >
                        Edit
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        <button
          className="bg-none text-primary border-0 outline-0 fs-6 fw-bold px-2 mt-1 d-flex align-items-center"
          onClick={() =>
            setAllData({
              modelShow: true,
              modelShowType: conditionsName,
              formData: conditions,
              typepAddEdit: add,
            })
          }
        >
          <i className="bi bi-plus fs-3 "></i> Add a Conditions
        </button>
      </div>
      <TriggersTrargetsConditionsModel
        show={allData}
        handleClose={() =>
          setAllData({
            modelShow: false,
            modelShowType: "",
          })
        }
        submitHndle={submitHndle}
      />
    </div>
  );
};

export default SmartTemplateAddEditForm;
