import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SmartTemplateAddEditForm from "./smartTemplateAddEdit/SmartTemplateAddEditForm";
import PrebuiltTemplatesModal from "./prebuiltModal";
import InboxUpgrade from "../../inbox/mildeSection/inbox_Upgrade/InboxUpgrade";
import Loader from "../../../../../helper/Loader";
import ToastHandle from "../../../../../helper/ToastMessage";
import { getSubscriptionStatus } from "../../../../../helper/Authorized";
import axios from "axios";
import "./smartTemplate.css";

import { describeTemplate } from "./smartTemplateAddEdit/SmartTemplateJson";

const SmartTemplateIndex = ({allPropertyNamesList, userData}) => {
  const add = "Add";
  const edit = "Edit";
  const { turno_user_id, tidy_user_id, minut_user_id } = userData || {};
  const hasCleaningManagementIntegration = (turno_user_id || tidy_user_id) ? true : false;

  const [addEditSmart, setAddEditSmart] = useState({type: "", data: ""});
  const [smartAllData, setSmartAllData] = useState([]);
  const [getTemplatesLoading, setGetTemplatesLoading] = useState(true);
  const [saveTemplateLoading, setSaveTemplateLoading] = useState(false);
  const [deleteTemplateLoading, setDeleteTemplateLoading] = useState(false);
  const [toggleTemplateLoading, setToggleTemplateLoading] = useState(false);
  const [showPrebuiltModal, setShowPrebuiltModal] = useState(false);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

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
      console.log("Saving template with data:", body_data);
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

  const callToggleTemplateApi = async (template) => {
    const baseUrl = process.env.REACT_APP_API_ENDPOINT;
    const API_KEY = process.env.REACT_APP_API_KEY;
    setToggleTemplateLoading(true);

    try {
      const config = {
        headers: { "X-API-Key": API_KEY },
        validateStatus: function (status) { return status >= 200 && status < 500; } // don't throw an error for non-2xx responses
      };

      const template_id = template.id;
      const templateToSave = { ...template };
      delete templateToSave.id;
      const body_data = { template_id, template_data: templateToSave };
      console.log("Toggling template with data:", body_data);
      const response = await axios.post(`${baseUrl}/save_template`, body_data, config);

      if (response.status === 200) {
        ToastHandle(`Template ${template.enabled ? 'enabled' : 'disabled'} successfully`, 'success');
        return true;
      } else {
        ToastHandle('Failed to update template', 'danger');
        return false;
      }
    } catch (error) {
      ToastHandle('Failed to update template', 'danger');
      return false;
    } finally { setToggleTemplateLoading(false); }
  };

  // Check subscription limits for enabling templates
  const checkSubscriptionLimits = (isEnabling) => {
    if (!isEnabling) return true; // No restrictions for disabling
    
    // Use the getSubscriptionStatus function from Authorized.js to get the plan
    const subscriptionData = getSubscriptionStatus(userData);
    console.log("Subscription data from getSubscriptionStatus:", subscriptionData);
    
    const planNameLower = subscriptionData.plan.toLowerCase();
    console.log("Plan name (lowercase):", planNameLower);
    
    // Check if this is an Ultimate plan
    const hasUltimatePlan = planNameLower.includes('ultimate');
    console.log("Has Ultimate plan:", hasUltimatePlan);
    
    if (hasUltimatePlan) {
      console.log("User has Ultimate plan, no restrictions apply");
      // No restrictions for ultimate plan
      return true;
    }
    
    const enabledCount = smartAllData.filter(template => template.enabled).length;
    console.log("Current enabled templates:", enabledCount);
    
    // For non-Ultimate plans, apply the appropriate limits
    if (planNameLower.includes('pro')) {
      if (enabledCount >= 2) {
        console.log("Pro plan limit reached");
        setShowUpgradeModal(true);
        return false;
      }
    } else if (planNameLower.includes('elite')) {
      if (enabledCount >= 5) {
        console.log("Elite plan limit reached");
        setShowUpgradeModal(true);
        return false;
      }
    } else {
      // Default to pro plan restrictions for any other plan
      if (enabledCount >= 2) {
        console.log("Default plan limit reached");
        setShowUpgradeModal(true);
        return false;
      }
    }
    
    return true;
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

  const handleToggleTemplate = async (template, event) => {
    event.stopPropagation(); // Prevent the row click event from firing
    
    const isEnabling = !template.enabled;
    
    // Debug: Log the userData and subscription plan
    console.log("userData:", userData);
    console.log("Subscription Plan:", userData?.subscription_plan);
    
    // Check subscription limits before enabling
    const subscriptionCheckResult = checkSubscriptionLimits(isEnabling);
    console.log("Subscription check result:", subscriptionCheckResult);
    
    if (!subscriptionCheckResult) {
      console.log("Subscription limits exceeded, not proceeding with toggle");
      return; // Don't proceed if limits are exceeded
    }
    
    const updatedTemplate = { ...template, enabled: isEnabling };
    
    // Call the dedicated toggle API without interfering with other operations
    const toggleSuccess = await callToggleTemplateApi(updatedTemplate);
    if (toggleSuccess) {
      // Update the local state to reflect the change immediately
      setSmartAllData(prevData => 
        prevData.map(item => 
          item.id === template.id 
            ? { ...item, enabled: isEnabling }
            : item
        )
      );
    }
  };

  // When the page loads, call the API to get all the templates
  useEffect(() => {
    if (userData) { callGetTemplatesApi(); }
  }, [userData]);

  return (
    <>
      <div className="smart_templates_tab_grid text-white setting_tab_data upsells-settings blur-background-top-right" style={{ margin:"40px 60px", background:"#0F1117" }}>
        {addEditSmart?.type?.type === add || addEditSmart?.type?.type === edit ? (
          <SmartTemplateAddEditForm addEditSmart={addEditSmart} addEditClose={() => setAddEditSmart({type: "", data: ""})} handleSaveTemplate={handleSaveTemplate} allPropertyNamesList={allPropertyNamesList} saveTemplateLoading={saveTemplateLoading} handleDeleteTemplate={handleDeleteTemplate} deleteTemplateLoading={deleteTemplateLoading} hasCleaningManagementIntegration={hasCleaningManagementIntegration} minut_user_id={minut_user_id} userData={userData} smartAllData={smartAllData}/>
        ) : (
          <>
            <div className="d-flex flex-wrap flex-md-nowrap gap-2 align-items-center justify-content-between">
              <h3>Smart Templates</h3>
            </div>
            <div style={{width:"95%", margin:"20px 5px"}}>
              <p style={{color:"#CCC", fontSize:'16px'}}>Highly customizable templated messages that let you contact the right guests at the right time. Automate friendly check-in messages, strategic upsells, policy reminders, and much more. Use AI to add context awareness and a personal touch to each message.</p>
              <Link to="/smart-templates?portal=true" style={{display:'inline-block', marginTop:'10px'}}>Learn more &rarr;</Link>
            </div>
            <hr style={{ borderTop: "1px solid #013280", border: "none", marginBottom: "40px", marginTop: "10px" }} />

            {getTemplatesLoading ? (
              <Loader />
            ) : (
              smartAllData?.length > 0 && (
                smartAllData?.map((smartItem, smartIndex) => {
                  const { name, enabled } = smartItem;
                  const templateDescription = describeTemplate(smartItem);
                  return (
                    <div key={smartIndex} style={{ 
                      backgroundColor: "#0F1117",
                      border: "2px solid #013280",
                      borderRadius: "12px",
                      padding: "32px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      height: "140px",
                      boxShadow: "0 0 25px rgba(1, 50, 128, 0.2)",
                      marginTop: "20px"
                    }}>
                      <div style={{ flex: "1", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                        <h3 style={{ 
                          color: "white", 
                          fontSize: "22px", 
                          fontFamily: "'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
                          fontWeight: "700",
                          fontVariationSettings: "'opsz' 14",
                          marginBottom: "12px"
                        }}>
                          {name !== "" ? name : <span style={{color: "#ef4444"}}>No Name</span>}
                        </h3>
                        <p style={{ 
                          color: "#a6a9b2", 
                          fontSize: "16px",
                          fontFamily: "'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
                          fontWeight: "400",
                          fontVariationSettings: "'opsz' 14",
                          lineHeight: "1.6",
                          margin: "0",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          display: "-webkit-box",
                          WebkitLineClamp: "2",
                          WebkitBoxOrient: "vertical"
                        }}>
                          {templateDescription}
                        </p>
                      </div>
                      
                      <div style={{ display: "flex", alignItems: "center", gap: "24px", marginLeft: "32px", flexShrink: "0" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                          <span style={{ 
                            fontSize: "15px",
                            fontFamily: "'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
                            fontWeight: "600",
                            fontVariationSettings: "'opsz' 14",
                            whiteSpace: "nowrap",
                            color: enabled ? "#10b981" : "#ef4444"
                          }}>
                            {enabled ? 'Enabled' : 'Not enabled'}
                          </span>
                          <button
                            onClick={(e) => handleToggleTemplate(smartItem, e)}
                            style={{
                              width: "56px",
                              height: "28px",
                              borderRadius: "9999px",
                              position: "relative",
                              backgroundColor: enabled ? "#3e88f7" : "#676a73",
                              border: "none",
                              cursor: "pointer",
                              transition: "all 0.3s",
                              boxShadow: enabled ? "0 0 12px rgba(62, 136, 247, 0.4)" : "none"
                            }}
                          >
                            <div style={{
                              position: "absolute",
                              top: "2px",
                              width: "24px",
                              height: "24px",
                              backgroundColor: "white",
                              borderRadius: "50%",
                              transition: "transform 0.3s",
                              transform: enabled ? "translateX(28px)" : "translateX(2px)"
                            }}></div>
                          </button>
                        </div>
                        
                        <button
                          onClick={() => setAddEditSmart({type:{type:edit, index:smartIndex}, data: "", smartTemplateData:{smartItem}, description:templateDescription})}
                          style={{
                            color: "#98bffa",
                            fontSize: "16px",
                            fontFamily: "'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
                            fontWeight: "600",
                            fontVariationSettings: "'opsz' 14",
                            backgroundColor: "transparent",
                            border: "none",
                            cursor: "pointer",
                            padding: "0 16px",
                            transition: "color 0.2s"
                          }}
                          onMouseOver={(e) => e.target.style.color = "#3e88f7"}
                          onMouseOut={(e) => e.target.style.color = "#98bffa"}
                        >
                          Edit
                        </button>
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

      <PrebuiltTemplatesModal modalShow={showPrebuiltModal} handleClose={() => setShowPrebuiltModal(false)} saveTemplate={handleSaveTemplate} saveLoading={saveTemplateLoading} allPropertyNamesList={structuredClone(allPropertyNamesList)} hasCleaningManagementIntegration={hasCleaningManagementIntegration} minut_user_id={minut_user_id}/>
      <InboxUpgrade show={showUpgradeModal} handleClose={() => setShowUpgradeModal(false)} />
    </>
  );
};

export default SmartTemplateIndex;
