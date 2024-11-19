import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SmartTemplateAddEditForm from "./smartTemplateAddEdit/SmartTemplateAddEditForm";
import PrebuiltTemplatesModal from "./prebuiltModal";
import Loader from "../../../../../helper/Loader";
import ToastHandle from "../../../../../helper/ToastMessage";
import axios from "axios";
import "./smartTemplate.css";

import { describeTemplate } from "./smartTemplateAddEdit/SmartTemplateJson";

const SmartTemplateIndex = ({allPropertyNamesList, userData}) => {
  const add = "Add";
  const edit = "Edit";
  const { turno_user_id, minut_user_id } = userData || {};

  const [addEditSmart, setAddEditSmart] = useState({type: "", data: ""});
  const [smartAllData, setSmartAllData] = useState([]);
  const [getTemplatesLoading, setGetTemplatesLoading] = useState(true);
  const [saveTemplateLoading, setSaveTemplateLoading] = useState(false);
  const [deleteTemplateLoading, setDeleteTemplateLoading] = useState(false);
  const [showPrebuiltModal, setShowPrebuiltModal] = useState(false);

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
          id:key // save the id for each template
        }));
        setSmartAllData(dataArray);
        return true;
      } else {
        ToastHandle('Failed to get template data', 'danger');
        return false;
      }
    } catch (error) {
      ToastHandle('Failed to get template data', 'danger');
      return false;
    } finally { setGetTemplatesLoading(false); }
  };

  const callDeleteTemplateApi = async (template_id) => {
    const baseUrl = process.env.REACT_APP_API_ENDPOINT;
    const API_KEY = process.env.REACT_APP_API_KEY;
    setDeleteTemplateLoading(true);

    try {
      const config = {
        headers: { "X-API-Key": API_KEY },
        validateStatus: function (status) { return status >= 200 && status < 500; } // don't throw an error for non-2xx responses
      };

      const response = await axios.delete(`${baseUrl}/delete_template?template_id=${template_id}`, config);

      if (response.status === 200) {
        ToastHandle('Template deleted successfully', 'success');
        return true;
      } else {
        ToastHandle('Failed to delete template', 'danger');
        return false;
      }
    } catch (error) {
      ToastHandle('Failed to delete template', 'danger');
      return false;
    } finally { setDeleteTemplateLoading(false); }
  };

  const callSaveOneTemplateApi = async (template) => {
    const baseUrl = process.env.REACT_APP_API_ENDPOINT;
    const API_KEY = process.env.REACT_APP_API_KEY;
    setSaveTemplateLoading(true);

    try {
      const config = {
        headers: { "X-API-Key": API_KEY },
        validateStatus: function (status) { return status >= 200 && status < 500; } // don't throw an error for non-2xx responses
      };

      const template_id = template.id;
      delete template.id;
      const body_data = { template_id, template_data:template };
      const response = await axios.post(`${baseUrl}/save_template`, body_data, config);

      if (response.status === 200) {
        ToastHandle('Template saved successfully', 'success');
        return true;
      } else {
        ToastHandle('Failed to save template', 'danger');
        return false;
      }
    } catch (error) {
      ToastHandle('Failed to save template', 'danger');
      return false;
    } finally { setSaveTemplateLoading(false); }
  };

  // Check for errors that would prevent saving the template
  const checkForErrors = (dataStructure) => {
    const errors = [];
    if (!dataStructure?.name) {
      errors.push('Please enter a name for the template.'); }
    if (dataStructure?.name?.length > 200) {
      errors.push('The name of the template must be less than 200 characters.'); }
    if (dataStructure?.triggers?.length < 1) {
      errors.push('"Send When" must have at least one event.'); }
    if (dataStructure?.message?.length < 1) {
      errors.push('Please enter a message for the template.'); }
    if (!dataStructure?.properties || dataStructure?.properties.length < 1) {
      errors.push('Please select at least one property for the template.'); }
    
    // Check follow-up messages
    if (dataStructure.follow_ups?.length > 0) {
      dataStructure.follow_ups.forEach((followUp, index) => {
        if (!followUp.message || followUp.message.trim().length === 0) {
          errors.push(`Follow-up message ${index + 1} is empty.`);
        }
        if (!followUp.after_mins || followUp.after_mins <= 0) {
          errors.push(`Please set a valid delay time for follow-up message ${index + 1}.`);
        }
      });
    }

    return errors;
  };

  // Check for warnings to alert the user before saving the template
  const checkForWarnings = (dataStructure) => {
    const warnings = [];
    // Add a warning if reservation_status is not one of the conditions - only if daily, weekly, monthly, or yearly trigger being used
    const reservationStatusCondition = dataStructure?.conditions?.find(condition => condition.type === 'reservation_status');
    if (!reservationStatusCondition) {
      const hasDailyWeeklyMonthlyYearlyTrigger = dataStructure?.triggers?.some(trigger => ['daily', 'weekly', 'monthly', 'yearly'].includes(trigger.type));
      if (hasDailyWeeklyMonthlyYearlyTrigger) {
        warnings.push('Reservation status is not added as a condition. This means that the message can be sent to guests of any status, including inquiries, past, or cancelled reservations.');
      }      
    }
    return warnings;
  };

  const handleSaveTemplate = async (template, checkErrorsAndWarnings=true) => {
    if (checkErrorsAndWarnings) {
      const errors = checkForErrors(template);
      if (errors.length > 0) {
        ToastHandle(errors[0], 'danger');
        return;
      }
      const warnings = checkForWarnings(template);
      if (warnings.length > 0) {
        const warningsText = `${warnings.length} warning(s) found: \n${warnings.join(';\n')}\n\nAre you sure you want to save the template?`;
        if (!window.confirm(warningsText)) {
          return;
        }
      }
    }
    // Save the template
    const saveSuccess = await callSaveOneTemplateApi(template);
    if (saveSuccess) {
      setAddEditSmart({type: "", data: ""}) // Return to main page
      await callGetTemplatesApi();
    }
  };

  const handleDeleteTemplate = async (template_id) => {
    const deleteSuccess = await callDeleteTemplateApi(template_id);
    if (deleteSuccess) {
      setAddEditSmart({type: "", data: ""}) // Return to main page
      await callGetTemplatesApi();
    }
  };

  // When the page loads, call the API to get all the templates
  useEffect(() => {
    if (userData) { callGetTemplatesApi(); }
  }, [userData]);

  return (
    <>
      <div className="smart_templates_tab_grid text-white setting_tab_data upsells-settings border border-primary blur-background-top-right" style={{ borderRadius:"20px", margin:"40px 60px", background:"#000212" }}>
        {addEditSmart?.type?.type === add || addEditSmart?.type?.type === edit ? (
          <SmartTemplateAddEditForm addEditSmart={addEditSmart} addEditClose={() => setAddEditSmart({type: "", data: ""})} handleSaveTemplate={handleSaveTemplate} allPropertyNamesList={allPropertyNamesList} saveTemplateLoading={saveTemplateLoading} handleDeleteTemplate={handleDeleteTemplate} deleteTemplateLoading={deleteTemplateLoading} turno_user_id={turno_user_id} minut_user_id={minut_user_id}/>
        ) : (
          <>
            <div className="d-flex flex-wrap flex-md-nowrap gap-2 align-items-center justify-content-between">
              <h3>Smart Templates</h3>
            </div>
            <div style={{width:"95%", margin:"20px 5px"}}>
              <p style={{color:"#CCC", fontSize:'16px'}}>Highly customizable templated messages that let you contact the right guests at the right time. Automate friendly check-in messages, strategic upsells, policy reminders, and much more. Use AI to add context awareness and a personal touch to each message.</p>
              <Link to="/smart-templates?portal=true" style={{display:'inline-block', marginTop:'10px'}}>Learn more &rarr;</Link>
            </div>
            <hr style={{ backgroundColor: "white", height: "2px", border: "none" }} className="mt-1"/>

            {getTemplatesLoading ? (
              <Loader />
            ) : (
              smartAllData?.length > 0 && (
                smartAllData?.map((smartItem, smartIndex) => {
                  const { name, enabled } = smartItem;
                  const templateDescription = describeTemplate(smartItem);
                  return (
                    <div className="row mt-5 clickable-div" style={{ marginLeft: "0", marginRight: "0" }}
                      onClick={() => setAddEditSmart({type:{type:edit, index:smartIndex}, data: "", smartTemplateData:{smartItem}, description:templateDescription})}
                    >
                      <div className="col-lg-11 col-12">
                        <label className="fs-5 d-flex justify-content-between">
                          {name !== "" ? name : <p className="text-danger">No Name</p>}
                          <span className={`template-status ${enabled ? 'enabled' : 'not-enabled'}`}>
                            {enabled ? 'Enabled' : 'Not enabled'}
                          </span>
                        </label>
                        <p className="settings-label truncate-text">{templateDescription}</p>
                      </div>
                    </div>
                  );
                })
              )
            )}

            <div>
              <button className="bg-none text-primary border-0 outline-0 fs-4 fw-bold p-2 mt-4" onClick={() => setAddEditSmart({ type: { type: add }, data: "" })}>
                <i className="bi bi-plus fs-3 "></i> Add New
              </button>
            </div>

            <p className='p-2 mt-2'> Or start from a <a href="#" onClick={() => setShowPrebuiltModal(true)}>pre-built template</a></p>
          </>
        )}
      </div>

      <PrebuiltTemplatesModal modalShow={showPrebuiltModal} handleClose={() => setShowPrebuiltModal(false)} saveTemplate={handleSaveTemplate} saveLoading={saveTemplateLoading} allPropertyNamesList={structuredClone(allPropertyNamesList)} turno_user_id={turno_user_id} minut_user_id={minut_user_id}/>
    </>
  );
};

export default SmartTemplateIndex;
