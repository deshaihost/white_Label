import React, { useState, useEffect } from "react";
import SmartTemplateAddEditForm from "./smartTemplateAddEdit/SmartTemplateAddEditForm";
import Loader from "../../../../../helper/Loader";
import ToastHandle from "../../../../../helper/ToastMessage";
import axios from "axios";
import "./smartTemplate.css";

import { describeTemplate } from "./smartTemplateAddEdit/SmartTemplateJson";

const SmartTemplateIndex = ({allPropertyNamesList}) => {
  const add = "Add";
  const edit = "Edit";

  const [addEditSmart, setAddEditSmart] = useState({type: "", data: ""});
  const [smartAllData, setSmartAllData] = useState([]);
  const [getTemplatesLoading, setGetTemplatesLoading] = useState(true);

  const callGetTemplatesApi = async () => {
    const baseUrl = process.env.REACT_APP_API_ENDPOINT;
    const API_KEY = process.env.REACT_APP_API_KEY;
    setGetTemplatesLoading(true);

    try {
      const config = {
        headers: { "X-API-Key": API_KEY },
        validateStatus: function (status) { return status >= 200 && status < 500; } // don't throw an error for non-2xx responses
      };

      const response = await axios.get(`${baseUrl}/get_templates`, config);

      if (response.status === 200) { // API returns as an obj - convert to array
        const data = response.data?.templates || {};
        const dataArray = Object.keys(data).map((key) => ({
          ...data[key],
          name: key // template name is the key
        }));
        setSmartAllData(dataArray);
      } else {
        ToastHandle('Failed to get template data', 'danger');
      }
    } catch (error) {
      ToastHandle('Failed to get template data', 'danger');
    } finally { setGetTemplatesLoading(false); }
  };

  // Save a template to the master list of all of them. Will likely replace this with API logic.
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

  // When the page loads, call the API to get all the templates
  useEffect(() => {
    callGetTemplatesApi();
  }, []);

  return (
    <>
      {getTemplatesLoading ? (
        <Loader />
      ) : (
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
                  const templateDescription = describeTemplate(smartItem);
                  return (
                    <div className="row mt-5 clickable-div" style={{ marginLeft: "0", marginRight: "0" }}
                      onClick={() => setAddEditSmart({type: { type: edit, index: smartIndex }, data: "", smartTemplateData: { smartItem }})}
                    >
                      <div className="col-lg-11 col-12">
                        <label className="fs-5">{name !== "" ? name : <p className="text-danger">Empty</p>}</label>
                        <p className="settings-label">{templateDescription}</p>
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
      )}
    </>
  );
};

export default SmartTemplateIndex;
