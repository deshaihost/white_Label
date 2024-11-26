import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import axios from "axios";
import ToastHandle from "../../../../../../helper/ToastMessage";
import "../../questionnaire.css";
import Loader, { BoxLoader } from "../../../../../../helper/Loader";

import KnowledgeBasePencil from "./knowledgeBasePencil";
import ResStageModal from "./resStageModal";

const KnowledgeBaseSourcesModal = ({ handleClose, show, propertyName, sources, integrationDataKey, setApiPropertyData, availability_label }) => {
  const [apiLoading, setApiLoading] = useState(false);
  const [sourceAndSelectionData, setSourceAndSelectionData] = useState({});
  const [resStageModalData, setResStageModalData] = useState({show:false});

  // As soon as we get the source data, put it in the useState
  useEffect(() => {
    // If we have integration data, always have past conversations as an option, whether or not it is in the sources list
    const new_sources = {
      ...sources,
      ...(sources["PMS Integration"] && Object.keys(sources["PMS Integration"]).length > 0 && {
        "PMS Integration": {
          ...sources["PMS Integration"],
          "conversation_data": {
            label: "Past conversations",
            id: "conversation_data",
            use_for_knowledge_base: sources["PMS Integration"]?.["conversation_data"]?.use_for_knowledge_base ?? false,
            //hidden_res_stages: sources["PMS Integration"]?.["conversation_data"]?.hidden_res_stages || ['INQUIRY/PAST'] // default to inquiry/past hidden for conversation data
            hidden_res_stages: sources["PMS Integration"]?.["conversation_data"]?.hidden_res_stages || []
          }
        }
      })
    };       
    setSourceAndSelectionData(new_sources);
  }, [sources]);

  const handleCheckboxChange = (section, sourceId, isChecked) => {
    if (sourceId === 'availability_data') { return; } // for now, this can't be unchecked
    const updatedSourceAndSelectionData = { ...sourceAndSelectionData };
    updatedSourceAndSelectionData[section][sourceId].use_for_knowledge_base = isChecked;
    setSourceAndSelectionData(updatedSourceAndSelectionData);
  };

  const closeHndle = () => {
    handleClose();
  };

  const setResStageSelections = (section, sourceId, resStagesArray) => {
    const updatedSourceAndSelectionData = { ...sourceAndSelectionData };
    updatedSourceAndSelectionData[section][sourceId].hidden_res_stages = resStagesArray;
    setSourceAndSelectionData(updatedSourceAndSelectionData);
  };

  // Used to refresh property data after the user has updated the knowledge base settings, so changes can reflect in the knowledge base section
  const getPropertyDataFromAPI = async (propertyName) => {
    const baseUrl = process.env.REACT_APP_API_ENDPOINT;
    const API_KEY = process.env.REACT_APP_API_KEY;
    const getSessionStorageData = JSON.parse(sessionStorage.getItem("hostBuddy_auth"));
    const token = getSessionStorageData?.token;

    try {
      if (token) {
        const config = {
          headers: {Authorization: `Bearer ${token}`, "X-API-Key": API_KEY},
          validateStatus: function (status) { return status >= 200 && status < 500; } // don't throw an error for non-2xx responses
        };
        const response = await axios.get(`${baseUrl}/properties/${propertyName}`, config);

        if (response.status === 200) {
          setApiPropertyData(response.data.property);
        } else {  }
      } else {  }
    } catch (error) {  }
  };

  const callSetKnowledgeBaseApi = async () => {
    setApiLoading(true);
    const baseUrl = process.env.REACT_APP_API_ENDPOINT;
    const API_KEY = process.env.REACT_APP_API_KEY;
    const getSessionStorageData = JSON.parse(sessionStorage.getItem("hostBuddy_auth"));
    const token = getSessionStorageData?.token;

    try {
      if (token) {
        const config = {
          headers: { Authorization: `Bearer ${token}`, "X-API-Key": API_KEY },
          validateStatus: function (status) { return status >= 200 && status < 500; } // don't throw an error for non-2xx responses
        };

        // Construct the JSON body like:
        // { "docs_to_use": {
        //     "integration_data": { "hostfully_data":<bool> },
        //     "guest_data":<bool>,
        //     "conversation_data": { "num_months_to_use": 6, "hidden_res_stages": ["INQUIRY/PAST", ...] },
        //     "file_data": { "file_name_1":{ "use":<bool>, "hidden_res_stages": ["INQUIRY/PAST", ...] }, "file_name_2":{ "use":<bool>, "hidden_res_stages": ["INQUIRY/PAST", ...] }, ... }
        //  }  } 
        const json_body = { 'docs_to_use': { } };
        if ('integration_data' in sourceAndSelectionData['PMS Integration']) {
          json_body['docs_to_use']['integration_data'] = {[integrationDataKey]: sourceAndSelectionData['PMS Integration']['integration_data'].use_for_knowledge_base};
          json_body['docs_to_use']['guest_data'] = sourceAndSelectionData['PMS Integration']['guest_data'].use_for_knowledge_base;
          if ('conversation_data' in sourceAndSelectionData['PMS Integration']) {
            json_body['docs_to_use']['conversation_data'] = {
              num_months_to_use: sourceAndSelectionData['PMS Integration']['conversation_data'].use_for_knowledge_base ? 6 : 0,
              hidden_res_stages: sourceAndSelectionData['PMS Integration']['conversation_data'].hidden_res_stages
            };
          }
        }
        if (Object.keys(sourceAndSelectionData['Property Documents']).length > 0) {
          json_body['docs_to_use']['file_data'] = {};
          Object.keys(sourceAndSelectionData['Property Documents']).forEach(file_name => {
            json_body['docs_to_use']['file_data'][file_name] = {
              use: sourceAndSelectionData['Property Documents'][file_name].use_for_knowledge_base,
              hidden_res_stages: sourceAndSelectionData['Property Documents'][file_name].hidden_res_stages || []
            };
          });
        }
        json_body['docs_to_use']['questionnaire'] = sourceAndSelectionData['Property Profile']['Property Profile'].use_for_knowledge_base;

        const response = await axios.put(`${baseUrl}/properties/${propertyName}/set_knowledge_base`, json_body, config);

        if (response.status === 200) {
          ToastHandle(response.data.message, "success");
          getPropertyDataFromAPI(propertyName);
          closeHndle();
        } else { ToastHandle(response?.data?.error, "danger"); }
      }
    } catch (error) { ToastHandle("Sorry, an error occurred", "danger"); }
    finally { setApiLoading(false); }
  };

  return (
    <Modal show={show} size="lg" onHide={() => closeHndle()} aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <h5 className="modal-title">Manage knowledge Base</h5>
      </Modal.Header>
      <Modal.Body>
        <div className="auto-fill-modal text-white">
          <div>
            <div className="text-center">
              <p>Choose what information HostBuddy can access directly.</p>
              {/* <p>For better manageability of data and more efficient processing, it is recommended to use property documents and past conversations only for auto-fill, and leave them un-checked here.</p> */}
            </div>
            <hr style={{width: "90%", margin: "0 auto"}}/>

            {Object.keys(sourceAndSelectionData).map((section) => (
              <div key={section}>
                <h4>{section}</h4>
                {Object.keys(sourceAndSelectionData[section]).length > 0 ? (
                  <div className="sources-container">
                    {Object.keys(sourceAndSelectionData[section]).map((source) => (
                      <div key={source.id}>
                        {section === "Property Profile" ? (
                          <>
                            <input className="form-check-input" type="checkbox" value={sourceAndSelectionData[section][source].id} id={sourceAndSelectionData[section][source].id} checked onChange={(e) => e.preventDefault()} style={{opacity:0.5}} disabled/>
                            <label className="form-check-label" htmlFor={sourceAndSelectionData[section][source].id} style={{opacity: 1}}>
                              {sourceAndSelectionData[section][source].label}
                            </label>
                          </>
                        ) : (
                          <>
                            <input className="form-check-input" type="checkbox" value={sourceAndSelectionData[section][source].id} id={sourceAndSelectionData[section][source].id} checked={sourceAndSelectionData[section][source].use_for_knowledge_base} onChange={(e) => handleCheckboxChange(section, sourceAndSelectionData[section][source].id, e.target.checked)}/>
                            <label className="form-check-label" htmlFor={sourceAndSelectionData[section][source].id}>
                              {sourceAndSelectionData[section][source].label}
                              {sourceAndSelectionData[section][source].id === 'conversation_data' && <span> (last 6 months)</span>}
                            </label>
                            {!['integration_data', 'guest_data', 'availability_data'].includes(sourceAndSelectionData[section][source].id) && <KnowledgeBasePencil handlePencilIconClick={() => setResStageModalData({show:true, section:section, sourceId:sourceAndSelectionData[section][source].id, hiddenResStages:sourceAndSelectionData[section][source].hidden_res_stages})} someResStageIsHidden={sourceAndSelectionData[section][source].hidden_res_stages.length > 0} />}
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div style={{display: 'flex', justifyContent: 'center'}}>
                    <p style={{margin:"0", fontSize:"16px", color:"#AAA", fontStyle:"italic"}}>No {section.toLowerCase()} added</p>
                  </div>
                )}
              </div>
            ))}
            
            {!apiLoading ? (
              <div className="text-center">
                <button className="mw-auto btn btn-primary text-white border border-primary rounded-pill px-5 mt-3" onClick={() => callSetKnowledgeBaseApi()}>
                  Save
                </button>
              </div>
              ) : (
              <div className="text-center">
                <Loader />
              </div>
            )}
          </div>

          <ResStageModal modalData={resStageModalData} setModalData={setResStageModalData} handleModalSubmit={setResStageSelections} fileName={resStageModalData.sourceId} propertyName={propertyName} />
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default KnowledgeBaseSourcesModal;
