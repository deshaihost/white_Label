import React, { useState } from "react";
import TriggersTrargetsConditionsModel from "./TriggersTrargetsConditionsModel";
import { dataInput } from "./SmartTemplateJson";

const SmartTemplateAddEditForm = ({ addEditClose }) => {
  const { triggers } = dataInput;
  const trigger = "Trigger";
  const targets = "Targets";
  const conditions = "Conditions";
  const [allData, setAllData] = useState({
    modelShow: false,
    modelShowType: "",
    formData: [],
  });

  const [dataStructure, setDataStructure] = useState({
    name: "hello",
    is_enabled: true,
    triggers: [],
    targets: [],
    conditions: [],
  });
  console.log(dataStructure,'dataStructuredataStructure')
  const submitHndle = (getFormData) => {

    const { data, type,id } = getFormData;
    console.log(getFormData,'getFormDatagetFormData')
    const newTrigger = {
      id,
      type,
      data,
    };
    setDataStructure((prevData) => ({
      ...prevData,
      triggers: [...prevData.triggers, newTrigger],
    }));
  };

  return (
    <div>
      <h1>Edit Smart Template</h1>
      <p onClick={addEditClose}>smart Templates </p>
      <div>
        <p>
          Enable Post Stay Review Request
          <div class="form-check form-switch text-white">
            <input
              class="form-check-input"
              type="checkbox"
              id="flexSwitchCheckChecked"
            />
          </div>
        </p>
      </div>
      <div>
        <p>Template Name</p>
        <input type="text" />
      </div>
      <div className="my-5">
        <p>Triggers</p>
        <p>This controls what will cause the message to be send</p>
        {dataStructure?.triggers?.length > 0 &&
          dataStructure?.triggers?.map((trigger, index) => {
            const { type } = trigger;
            return (
              <div>
                {type}{" "}
                <span className="mx-3" onClick={() =>
            setAllData({
              modelShow: true,
              modelShowType: "edit",
              formData: triggers,
              editFormData:trigger,
            })
          } ><i class="bi bi-pencil"></i></span>
                <span className="ms-3">
                  <i
                    class="bi bi-trash3"
                    onClick={() => {
                      setDataStructure((prevData) => ({
                        ...prevData,
                        triggers: dataStructure?.triggers?.filter(
                          (_, id) => id !== index
                        ),
                      }));
                    }}
                  ></i>
                </span>
              </div>
            );
          })}
        <button
          onClick={() =>
            setAllData({
              modelShow: true,
              modelShowType: trigger,
              formData: triggers,
            })
          }
        >
          Add a Trigger
        </button>
      </div>
      <div className="my-5">
        <p>Targets</p>
        <p>These are the guests that will receive the message</p>
        <button
          onClick={() =>
            setAllData({ modelShow: true, modelShowType: targets })
          }
        >
          Add a Target
        </button>
      </div>
      <div className="my-5">
        <p>Conditions</p>
        <button
          onClick={() =>
            setAllData({ modelShow: true, modelShowType: conditions })
          }
        >
          Add a Conditions
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
