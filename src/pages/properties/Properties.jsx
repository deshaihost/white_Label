import React, { useEffect, useState } from "react";
import SideBar from "../../component/sideBar/SideBar";
import "./properties.css";
import AddPropertyModal from "../../component/modal/addPropertyModal/AddPropertyModal";
import NoWorkPlanModal from "../../component/modal/noWorkPlanModal/NoWorkPlanModal";
import RemoveIntegrations from "./removeIntegrationsModel/RemoveIntegrations";
import DisconnectIntegration from "./removeIntegrationsModel/DisconnectIntegration";
import ImportPropertiesModal from "../../component/modal/noWorkPlanModal/ImportProperties";
import SubscriptionBanner from "../../component/accountNotifBanner/subscriptionBanner";
import AccountNotifBanner from "../../component/accountNotifBanner/accountNotifBanner";
import { Helmet } from "react-helmet";
import {getUserDataActions, toggleChatbotoNoFFPutActions} from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { stateEmptyActions } from "../../redux/actions";
import { FullScreenLoader } from "../../helper/Loader";
import { getSubscriptionStatus } from "../../helper/Authorized";
import ListIntegrationProperties from "./listIntegrationProperties/ListIntegrationProperties";
import ToastHandle from "../../helper/ToastMessage";
import BillingPortalModel from "./billingPortalModel/BillingPortalModel";
import UnlockPropertiesModal from "../../component/modal/unlockPropertiesModal/unlockPropertiesModal";
import HostDaddy from "../../component/hostDaddy/hostDaddy";

const Properties = () => {
  const store = useSelector((state) => state);
  const dispatch = useDispatch();
  const gotoBillingPortalCheckPaymentStatus = store?.gotoBillingPortalPostReducer?.gotoBillingPortal?.status;
  const gotoBillingPortalcheckPaymentLoading = store?.gotoBillingPortalPostReducer?.loading;

  const [model, setModel] = useState({ addProperty: false, pmsIntegration: false, removeIntegration: false, billingPortal: false, importProperties: false, unlockProperties: false });
  const [newPropertiesAdded, setNewPropertiesAdded] = useState(false); // called by ImportPropertiesModal when properties are imported, to trigger a re-render of the property list
  const [propertyConditionCheck, setPropertyConditionCheck] = useState(false);
  const [unlockPropertyNames, setUnlockPropertyNames] = useState([]); // array of property names to unlock


  const handleModelOpen = (type) => {
    if (type === "addPropertyOpen") {
      setModel({ ...model, addProperty: true });
    } else if (type === "pmsIntegrationOpen") {
      setModel({ ...model, pmsIntegration: true });
    } else if (type === "removeIntegrationsOpen") {
      setModel({ ...model, removeIntegration: true });
    } else if (type === "disconnectIntegrationOpen") {
      setModel({ ...model, disconnectIntegration: true });
    } else if (type === "importPropertiesOpen") {
      setModel({ ...model, importProperties: true });
    } else if (type === "unlockPropertiesOpen") {
      setModel({ ...model, unlockProperties: true });
    }
  };
  const handleModelClose = (type) => {
    if (type === "addPropertyClose") {
      setModel({ ...model, addProperty: false });
    } else if (type === "pmsIntegrationClose") {
      setModel({ ...model, pmsIntegration: false });
      dispatch(stateEmptyActions());
    } else if (type === "removeIntegrationsClose") {
      setModel({ ...model, removeIntegration: false });
    } else if (type === "billingPortalClose") {
      setModel({ ...model, billingPortal: false });
    } else if (type === "disconnectIntegrationsClose") {
      setModel({ ...model, disconnectIntegration: false });
    } else if (type === "importPropertiesClose") {
      setModel({ ...model, importProperties: false });
    } else {
      setModel({addProperty: false, pmsIntegration: false, removeIntegration: false, billingPortal: false, importProperties: false, unlockProperties: false});
    }
  };
  // toggle chatbot
  const userData = store?.getUserDataReducer?.getUserData?.data?.user;
  const createPropertiesName = userData?.properties;
  const propertiesExtraData = userData?.property_data ? userData?.property_data : {};
  const intergrationsMain = userData?.calry_integrations;
  //const subscription_data = userData?.subscription;
  const subscription_data = getSubscriptionStatus(userData); // {plan:<plan_name>, props_allowed:<num_props_allowed>}
  console.log("subscription_data", subscription_data);
  const intergrations = intergrationsMain ? intergrationsMain : [];
  const toggleChatMessage = store?.togglechatBotOnOffReducer?.toggleChatBotOnOff?.data?.message;
  const toggleChatLoading = store?.togglechatBotOnOffReducer?.loading;
  const toggleChatStatus = store?.togglechatBotOnOffReducer?.toggleChatBotOnOff?.status;

  //const createPropertiesSubscriptionAllowed = userData?.subscription?.num_properties_allowed;
  const createPropertiesSubscriptionAllowed = subscription_data?.props_allowed;
  const propertyNamesStillLocked = propertiesExtraData
    ? Object.entries(propertiesExtraData)
        .filter(([_, value]) => value.is_locked)
        .map(([key, _]) => key)
    : [];
  const numPropsAlreadyUnlocked = Object.keys(propertiesExtraData).length - propertyNamesStillLocked.length;
  const numPropsStillLocked = propertyNamesStillLocked.length;
  const remainingUnlocksAllowed = createPropertiesSubscriptionAllowed - numPropsAlreadyUnlocked;

  const hospitableWhReminder = userData?.hospitable_wh_reminder; // date string: "2021-09-30T16:49:56Z"
  const hospitableWhReminderMoreThan24hAgo = hospitableWhReminder ? (new Date() - new Date(hospitableWhReminder)) > 24*60*60*1000 : false;
  const integrationAccountId = userData?.calry_integrations ? Object.values(userData.calry_integrations)[0]?.integrationAccountId : null;

  // Get information about the status of the subscription // removed - this has been moved to the UnlockPropertiesModal component
  //const paymentGoodUntilDate = new Date(subscription_data?.payment_good_until);
  //const isOnFreeTrial = (subscription_data?.payment_standing === "good" && paymentGoodUntilDate > new Date() && (!subscription_data?.payment_collected || subscription_data?.payment_collected == 0));

  const [toggleOnOff, setToggleOnOff] = useState("");

  const anyPropertyNotForcedOff = propertiesExtraData ? Object?.values(propertiesExtraData)?.some((property) => property?.toggle_status !== "FORCED_OFF") : [];

  const toggleChatBotHndle = (type) => {
    if (type) {
      setToggleOnOff("on");
    } // trigger the API call
    else {
      setToggleOnOff("FORCED_OFF");
    }
  };

  const handleUnlockAllClick = () => {
    if (Object.keys(propertiesExtraData).length > 0) {
      setUnlockPropertyNames(propertyNamesStillLocked);
      handleModelOpen("unlockPropertiesOpen");
    }
  };

  // When new properties are added (from ImportPropertiesModal), re-render the property list
  useEffect(() => {
    if (newPropertiesAdded) {
      setNewPropertiesAdded(false);
      dispatch(getUserDataActions());
    }
  }, [newPropertiesAdded]);

  useEffect(() => {
    if (toggleOnOff !== "") {
      dispatch(toggleChatbotoNoFFPutActions({properties: createPropertiesName, state: toggleOnOff}));
      setToggleOnOff("");
    }
  }, [toggleOnOff]);

  useEffect(() => {
    if (propertyConditionCheck) {
      if (gotoBillingPortalCheckPaymentStatus === 200) {
        setPropertyConditionCheck(false);
        // navigate("/add-properties");
        setModel({ ...model, billingPortal: true });
        // dispatch(stateEmptyActions());
      } else if (gotoBillingPortalCheckPaymentStatus === 404) {
        setModel({ ...model, addProperty: true });
        dispatch(stateEmptyActions());
      }
    } else if (toggleChatStatus === 200) {
      ToastHandle(toggleChatMessage, "success");
      dispatch(getUserDataActions());
      dispatch(stateEmptyActions());
    }
  }, [gotoBillingPortalCheckPaymentStatus, propertyConditionCheck, toggleChatStatus]);

  // Whenever the user's subscription data or property data changes, update this information in local storage to ensure we're rendeting the subscription warning banner with correct information
  /* No longer used
  useEffect(() => {
    localStorage.setItem("paymentStatus", subscription_data?.payment_standing);
    localStorage.setItem("servicesExpireDate", subscription_data?.services_good_until);
    localStorage.setItem("numPropertiesAllowed", subscription_data?.num_properties_allowed);
    localStorage.setItem("numPropertiesUsed", Object.keys(propertiesExtraData || {}).length);
    localStorage.setItem("tooManyPropertiesGraceUntil", subscription_data?.too_many_properties_grace_until);
  }, [subscription_data, propertiesExtraData]);
  */

  return (
    <>
      <Helmet>
        <title>Properties - HostBuddy AI</title>
      </Helmet>
      <div className="account-main">
        <div className="container">
          <div className="banner-heading">{/* <h2>My HostBuddy</h2> */}</div>

          {userData?.hospitable_permission_error && (
            <div style={{marginBottom:'20px', marginTop:'-30px'}}>
              <AccountNotifBanner title='Messaging Permissions Needed' theme='error' message={<>Your HostBuddy messages aren't going through because your messaging permissions have not been enabled within Hospitable. Follow <a target="_blank" rel="noreferrer" href="https://userguide.hostbuddy.ai/pms-integration-guides/hospitable">these steps</a> to obtain the needed permissions for your account.</>} />
            </div>
          )}

          {hospitableWhReminder && (
            <div style={{marginBottom:'20px', marginTop:(userData?.hospitable_permission_error ? '0px' : '-30px')}}>
              {!hospitableWhReminderMoreThan24hAgo ? (
                <AccountNotifBanner title='Set Up Your Webhooks In Hospitable' theme='default' message={
                  <>
                    If you haven't done so already, you'll need to set up webhooks in your Hospitable account following <a target="_blank" rel="noreferrer" href="https://userguide.hostbuddy.ai/pms-integration-guides/hospitable">these steps</a>. This is needed to ensure your reservation data refreshes in real time.<br /><br />
                    Your unique listener URL is: <code style={{fontSize:'14px', marginLeft:'4px'}}>https://prod.calry.app/api/v1/listener/hospitable/{integrationAccountId}</code>
                  </>
                } />
              ) : (
                <AccountNotifBanner title='Set Up Your Webhooks In Hospitable' theme='warning' message={
                  <>
                    Follow <a target="_blank" rel="noreferrer" href="https://userguide.hostbuddy.ai/pms-integration-guides/hospitable">these steps</a> to set up webhooks in your Hospitable account. This is needed to ensure your reservation data refreshes in real time.<br /><br />
                    Your unique listener URL is: <code style={{fontSize:'14px', marginLeft:'4px'}}>https://prod.calry.app/api/v1/listener/hospitable/{integrationAccountId}</code>
                  </>
                } />
              )}
            </div>
          )}
          
          <SubscriptionBanner userData={userData} bottomMargin={'20px'} topMargin={(userData?.hospitable_permission_error || hospitableWhReminder) ? '0px' : '-30px'} />

          <div className="row">
            <div className="col-lg-2 col-xl-2 col-xxl-2">
              <SideBar />
            </div>
            <div className="col-lg-10 col-xl-10 col-xxl-10">
              <div className="account-container blur-background-top-right">
                <div className="account_heading">
                  <h3>Properties</h3>
                  <div className="property-heading-right">
                    {propertiesExtraData && intergrations &&
                     Object.keys(propertiesExtraData).length > 0 &&
                     Object.keys(intergrations).length > 0 && (
                        <>
                          <p>HostBuddy Status</p>
                          {toggleChatLoading && <FullScreenLoader />}
                          {!anyPropertyNotForcedOff ? (
                            <button className="bg-danger text-white rounded-pill border-danger btn border" onClick={(e) => {toggleChatBotHndle(true);}}>
                              ALL STOPPED
                            </button>
                          ) : (
                            <button className="bg-dark text-primary border-primary btn border rounded-pill" onClick={(e) => {toggleChatBotHndle(false);}}>
                              STOP ALL
                            </button>
                          )}
                        </>
                      )}
                  </div>
                </div>
                <div
                  className="addproperty_links text-center"
                  style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                  <div className="tiles-container">
                    {(!intergrations || Object.keys(intergrations).length === 0) ? (
                      <div className="tile" onClick={() => handleModelOpen("pmsIntegrationOpen")}>
                        <h3>Connect Your PMS</h3>
                        <p>Connect your Property Management Software to import your properties.</p>
                      </div>
                    ) : (
                      <>
                        {/* Original connected statement layout - kept for reference
                        <div
                          className="ConnectedStatement"
                          style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                          <p style={{ color: "white" }}>
                            {`Connected to ${
                              Object.keys(intergrations)[0] === "ownerrez" ? "OwnerRez" :
                              Object.keys(intergrations)[0].charAt(0).toUpperCase() + Object.keys(intergrations)[0].slice(1)
                            }`}
                          </p>
                          <div
                            className="IntegrationsOptions"
                            style={{display: "flex", flexDirection: "row", justifyContent: "center"}}
                          >
                            <button
                              style={{fontSize: "0.9em", marginRight: "0px", color: "#146EF5", background: "none", border: "none"}}
                              onClick={() => handleModelOpen("importPropertiesOpen")}
                            >
                              Import Properties
                            </button>
                            <p
                              style={{fontSize: "0.9em", color: "white", marginLeft: "20px", marginRight: "20px"}}>
                              |
                            </p>
                            <button
                              style={{fontSize: "0.9em", marginLeft: "0px", color: "#146EF5", background: "none", border: "none"}}
                              onClick={() => handleModelOpen("disconnectIntegrationOpen")}
                            >
                              Disconnect
                            </button>
                          </div>
                        </div>
                        */}
                        <div className="tile" onClick={() => handleModelOpen("importPropertiesOpen")}>
                          <h3>Import Properties</h3>
                          <p>Connected to {
                            Object.keys(intergrations)[0] === "ownerrez" ? "OwnerRez" :
                            Object.keys(intergrations)[0].charAt(0).toUpperCase() + Object.keys(intergrations)[0].slice(1)
                          }. Click to import your properties.</p>
                        </div>
                      </>
                    )}
                    {(['trial', 'trial_over', 'subscription_over'].includes(subscription_data.plan) || ['canceled'].includes(subscription_data.status)) && (
                      <div className="tile" onClick={() => handleModelOpen("addPropertyOpen")}>
                        <h3>Subscribe</h3>
                        <p>Get HostBuddy plugged in to your guest communication.</p>
                      </div>
                    )}
                  </div>
                  {numPropsStillLocked > 0 &&
                    remainingUnlocksAllowed >= numPropsStillLocked && (
                      <button type="button" className="unlock-all-button" onClick={() => {handleUnlockAllClick();}}>
                        Unlock All Properties
                      </button>
                  )}
                </div>
                <div className="property_list">
                  <ul>
                    <li className="not-found px-0">
                      <div className="">
                        <ListIntegrationProperties />
                      </div>
                    </li>
                  </ul>
                </div>
                <div className="load_more"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <BillingPortalModel handleClose={handleModelClose} show={model?.billingPortal}/>
      <AddPropertyModal handleClose={handleModelClose} show={model?.addProperty} subscription_data={subscription_data}/>
      <NoWorkPlanModal handleNoPlanClose={handleModelClose} showNoPlan={model?.pmsIntegration}/>
      <RemoveIntegrations handleNoPlanClose={handleModelClose} showNoPlan={model?.removeIntegration}/>
      <DisconnectIntegration handleNoPlanClose={handleModelClose} showNoPlan={model?.disconnectIntegration}/>
      <ImportPropertiesModal handleNoPlanClose={handleModelClose} showNoPlan={model?.importProperties} setNewPropertiesAdded={setNewPropertiesAdded} userData={userData}/>
      <UnlockPropertiesModal handleClose={handleModelClose} modalShow={model?.unlockProperties} propertiesToUnlock={unlockPropertyNames} remaining_unlocks_allowed={remainingUnlocksAllowed} remaining_locked_properties={numPropsStillLocked} setPropertiesChanged={setNewPropertiesAdded}/>
      <HostDaddy />
    </>
  );
};

export default Properties;
