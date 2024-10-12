import React, { useState } from "react";
import SmartTemplateAddEditForm from "./smartTemplateAddEdit/SmartTemplateAddEditForm";
import "./smartTemplate.css";

const SmartTemplateIndex = ({allPropertyNamesList}) => {
  const add = "Add";
  const edit = "Edit";
  const [addEditSmart, setAddEditSmart] = useState({type: "", data: ""});

  const [smartAllData, setSmartAllData] = useState([]);
  const AllDataGetHndle = (data, types) => {
    const { type, index } = types;
    if (type === add) {
      setSmartAllData([...smartAllData, data]);
    } else if (type === edit) {
      const updatedData = [...smartAllData];
      updatedData[index] = data;
      setSmartAllData(updatedData);
    }
  };

  return (
    <div className="smart_templates_tab_grid text-white setting_tab_data upsells-settings border border-primary py-3 px-5 blur-background-top-right" style={{ borderRadius: "20px", margin: "20px", background: "#000212" }}>
      {addEditSmart?.type?.type === add || addEditSmart?.type?.type === edit ? (
        <SmartTemplateAddEditForm addEditSmart={addEditSmart} addEditClose={() => setAddEditSmart({type: "", data: ""})} AllDataGetHndle={AllDataGetHndle} allPropertyNamesList={allPropertyNamesList}/>
      ) : (
        <>
          <div className="d-flex flex-wrap flex-md-nowrap gap-2 align-items-center justify-content-between">
            <h3>Smart Templates</h3>
          </div>
          <div style={{ width: "90%", margin: "20px auto", textAlign: "center" }}>
            <p style={{ color: "#CCC" }}>Send templated messages to the right guests at the right time. Use advanced technology to analyze conversations and situations to trigger messaging.</p>
          </div>
          <hr style={{ backgroundColor: "white", height: "2px", border: "none" }} className="mt-1"/>
          {smartAllData?.length > 0 && (
            smartAllData?.map((smartItem, smartIndex) => {
              const { name } = smartItem;
              return (
                <div className="row mt-5 clickable-div" style={{ marginLeft: "0", marginRight: "0" }}
                  onClick={() => setAddEditSmart({type: { type: edit, index: smartIndex }, data: "", smartTemplateData: { smartItem }})}
                >
                  <div className="col-lg-11 col-12">
                    <label className="fs-5">{name !== "" ? name : <p className="text-danger">Empty</p>}</label>
                    <p className="settings-label">Send a message to your guests who had a positive experience, asking them to leave a review.</p>
                  </div>
                </div>
              );
            })
          )}

          <div>
            <button className="bg-none text-primary border-0 outline-0 fs-4 fw-bold p-2 mt-3" onClick={() => setAddEditSmart({ type: { type: add }, data: "" })}>
              <i className="bi bi-plus fs-3 "></i> Add New
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default SmartTemplateIndex;
