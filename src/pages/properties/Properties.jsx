import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import SideBar from "../../component/sideBar/SideBar";
import "./properties.css";
import AddPropertyModal from "../../component/modal/addPropertyModal/AddPropertyModal";
import NoWorkPlanModal from "../../component/modal/noWorkPlanModal/NoWorkPlanModal";
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
import MultiPropertiesChat from "./multiPropertiesChat/multiPropertiesChat";
import ToastHandle from "../../helper/ToastMessage";
import BillingPortalModel from "./billingPortalModel/BillingPortalModel";
import UnlockPropertiesModal from "../../component/modal/unlockPropertiesModal/unlockPropertiesModal";
import HostDaddy from "../../component/hostDaddy/hostDaddy";
import NoltWidget from "../../component/nolt/nolt";

const Properties = () => {
  const location = useLocation();
  const store = useSelector((state) => state);
  const dispatch = useDispatch();
  const gotoBillingPortalCheckPaymentStatus = store?.gotoBillingPortalPostReducer?.gotoBillingPortal?.status;
  const gotoBillingPortalcheckPaymentLoading = store?.gotoBillingPortalPostReducer?.loading;

  const [model, setModel] = useState({ addProperty: false, pmsIntegration: false, removeIntegration: false, billingPortal: false, importProperties: false, unlockProperties: false });
  const [newPropertiesAdded, setNewPropertiesAdded] = useState(false); // called by ImportPropertiesModal when properties are imported, to trigger a re-render of the property list
  const [propertyConditionCheck, setPropertyConditionCheck] = useState(false);
  const [unlockPropertyNames, setUnlockPropertyNames] = useState([]); // array of property names to unlock
  const [activeTab, setActiveTab] = useState('properties');

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
  const intergrations = intergrationsMain ? intergrationsMain : [];
  const toggleChatMessage = store?.togglechatBotOnOffReducer?.toggleChatBotOnOff?.data?.message;
  const toggleChatLoading = store?.togglechatBotOnOffReducer?.loading;
  const toggleChatStatus = store?.togglechatBotOnOffReducer?.toggleChatBotOnOff?.status;

  //const createPropertiesSubscriptionAllowed = userData?.subscription?.num_properties_allowed;
  const createPropertiesSubscriptionAllowed = subscription_data?.props_allowed;
  const propertyNamesStillLocked = propertiesExtraData ? Object.entries(propertiesExtraData).filter(([_, value]) => value.is_locked).map(([key, _]) => key) : [];
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

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get('multi') === 'true') {
      setActiveTab('chat');
    }
  }, [location]);

  return (
    <>
      <Helmet>
        <title>Properties - HostBuddy AI</title>
      </Helmet>
      <div className="properties-page-container">
        <div className="properties-max-width">
          {userData?.hospitable_permission_error && (
            <div style={{marginBottom:'20px'}}>
              <AccountNotifBanner title='Messaging Permissions Needed' theme='error' message={<>Your HostBuddy messages aren't going through because your messaging permissions have not been enabled within Hospitable. Follow <a target="_blank" rel="noreferrer" href="https://userguide.hostbuddy.ai/pms-integration-guides/hospitable">these steps</a> to obtain the needed permissions for your account.</>} />
            </div>
          )}

          {hospitableWhReminder && (
            <div style={{marginBottom:'20px'}}>
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
          
          <SubscriptionBanner userData={userData} bottomMargin={'20px'} topMargin={(userData?.hospitable_permission_error || hospitableWhReminder) ? '0px' : '0px'} />
          
          {/* Header */}
          <div className="properties-header">
            <h1 className="properties-title">Properties</h1>
            <div className="properties-header-actions">

              {/*
              {propertiesExtraData && Object.keys(propertiesExtraData).length > 0 && (
                <div className="hostbuddy-status-indicator">
                  <div className={`status-dot ${anyPropertyNotForcedOff ? 'status-online' : 'status-offline'}`}></div>
                  <span className="status-label">HostBuddy Status</span>
                </div>
              )}
              */}

              {toggleChatLoading && <FullScreenLoader />}
              {numPropsStillLocked > 0 && remainingUnlocksAllowed >= numPropsStillLocked && (
                <button className="unlock-all-btn" onClick={() => {handleUnlockAllClick();}}>
                  <svg className="lock-icon" width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <rect x="3" y="7" width="10" height="7" rx="1" stroke="currentColor" strokeWidth="1.5"/>
                    <path d="M5 7V5C5 3.34315 6.34315 2 8 2C9.65685 2 11 3.34315 11 5V7" stroke="currentColor" strokeWidth="1.5"/>
                  </svg>
                  Unlock All
                </button>
              )}
              {propertiesExtraData &&
               Object.keys(propertiesExtraData).length > 0 && (
                <>
                  {!anyPropertyNotForcedOff ? (
                    <button className="stop-all-btn resumed" onClick={(e) => {toggleChatBotHndle(true);}}>
                      RESUME ALL
                    </button>
                  ) : (
                    <button className="stop-all-btn" onClick={(e) => {toggleChatBotHndle(false);}}>
                      STOP ALL
                    </button>
                  )}
                </>
              )}
            </div>
          </div>

          {/* Action Tiles */}
          <div className="properties-tiles-section">
            <div className="properties-tiles-container">
              {(!intergrations || Object.keys(intergrations).length === 0) ? (
                <div className="properties-action-tile" onClick={() => handleModelOpen("pmsIntegrationOpen")}>
                  <h3 className="tile-title">Connect Your PMS</h3>
                  <p className="tile-description">Connect your Property Management Software to import your properties.</p>
                </div>
              ) : (
                <div className="properties-action-tile" onClick={() => handleModelOpen("importPropertiesOpen")}>
                  <h3 className="tile-title">Import Properties</h3>
                  <p className="tile-description">
                    Connected to {
                      Object.keys(intergrations)[0] === "ownerrez" ? "OwnerRez" :
                      Object.keys(intergrations)[0].charAt(0).toUpperCase() + Object.keys(intergrations)[0].slice(1)
                    }. Click to import your properties.
                  </p>
                </div>
              )}
              {(['trial', 'trial_over', 'subscription_over'].includes(subscription_data.plan) || ['canceled'].includes(subscription_data.status)) && (
                <div className="properties-action-tile" onClick={() => handleModelOpen("addPropertyOpen")}>
                  <h3 className="tile-title">Subscribe</h3>
                  <p className="tile-description">Get HostBuddy plugged in to your guest communication.</p>
                </div>
              )}
            </div>
          </div>

          {/* Tabs (if multi-property enabled) */}
          {userData?.allow_multiprop ? (
            <div className="properties-tabs-section">
              <div className="properties-tabs-container">
                <button
                  className={activeTab === 'properties' ? 'properties-tab-button active' : 'properties-tab-button'}
                  onClick={() => setActiveTab('properties')}
                >
                  Your Properties
                </button>
                <button
                  className={activeTab === 'chat' ? 'properties-tab-button active' : 'properties-tab-button'}
                  onClick={() => setActiveTab('chat')}
                >
                  Multi-Property Chat
                </button>
              </div>
            </div>
          ) : null}

          {/* Properties List */}
          <div className="properties-list-section">
            {(userData?.allow_multiprop && activeTab === 'chat') ? <MultiPropertiesChat /> : <ListIntegrationProperties />}
          </div>
        </div>
      </div>
      <BillingPortalModel handleClose={handleModelClose} show={model?.billingPortal}/>
      <AddPropertyModal handleClose={handleModelClose} show={model?.addProperty} subscription_data={subscription_data} user_data={userData}/>
      <NoWorkPlanModal handleNoPlanClose={handleModelClose} showNoPlan={model?.pmsIntegration}/>
      <DisconnectIntegration handleNoPlanClose={handleModelClose} showNoPlan={model?.disconnectIntegration}/>
      <ImportPropertiesModal handleNoPlanClose={handleModelClose} showNoPlan={model?.importProperties} setNewPropertiesAdded={setNewPropertiesAdded} userData={userData}/>
      <UnlockPropertiesModal handleClose={handleModelClose} modalShow={model?.unlockProperties} propertiesToUnlock={unlockPropertyNames} remaining_unlocks_allowed={remainingUnlocksAllowed} remaining_locked_properties={numPropsStillLocked} setPropertiesChanged={setNewPropertiesAdded}/>
      <HostDaddy />
      <NoltWidget />
    </>
  );
};

export default Properties;
