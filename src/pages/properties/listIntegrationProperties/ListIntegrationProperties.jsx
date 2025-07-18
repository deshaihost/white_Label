import React, { useEffect, useState } from "react";
import { deleteListIntegrationPropertiesActions, getPropertyInsightByNameActions, getUserDataActions, stateEmptyActions, toggleChatbotoNoFFPutActions } from "../../../redux/actions";
import "./Listintigrationproperties.css";
import dummyPropertyImg from "../../../public/img/dummyPropertyImg.png";
import { useSelectorUseDispatch } from "../../../helper/Authorized";
import ToastHandle from "../../../helper/ToastMessage";
import  { BoxLoader, FullScreenLoader } from "../../../helper/Loader";
import { getSubscriptionStatus } from "../../../helper/Authorized";
import { useNavigate } from "react-router-dom";
import WebPageUrlModel from "./modelListProperties/webPageUrlModel/WebPageUrlModel";
import SupportingDocumentModel from "./modelListProperties/supportingDocumentModel/SupportingDocumentModel";
import UnlockPropertiesModal from "../../../component/modal/unlockPropertiesModal/unlockPropertiesModal";
import LockPropertiesModal from "../../../component/modal/lockPropertiesModal/lockPropertiesModal";
import EmbedModal from "./embedModal/embedModal";
import { Button, Dropdown } from "react-bootstrap";
import { CiCalendar } from "react-icons/ci";
import { HiOutlineDotsVertical } from "react-icons/hi";
import "react-circular-progressbar/dist/styles.css";
import CalenderModel from "./calender/CalenderModel";
import axios from "axios";

const ListIntegrationProperties = () => {
  const navigate = useNavigate();
  let localStorageKey = "nameKey";
  const [getInputNameKey, setGetInputNameKey] = useState({ nameKey: "" });
  const [testPropertyKey, setTestPropertyKey] = useState({ nameKey: "" });
  const [scheduleChanged, setScheduleChanged] = useState(false); // If the user changes the schedule in the calendar, we need to re-render the listings since the current status line might change
  const [chatBox, setChatBox] = useState({linkCopy: false, testingProperty: false});

  const [showCalender, setShowCalender] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState("");
  const [allProperties, setAllProperty] = useState([]);

  const [propertyDataIsReady, setPropertyDataIsReady] = useState(false);

  const { store, dispatch } = useSelectorUseDispatch();
  const userDataGetLoading = store?.getUserDataReducer?.loading;
  const userData = store?.getUserDataReducer?.getUserData?.data?.user;
  const createPropertiesName = userData?.properties;
  const PropertiesExtraData = userData?.property_data;
  
  //const subscription_data = userData?.subscription;
  const subscription_data = getSubscriptionStatus(userData); // {plan:<plan_name>, props_allowed:<num_props_allowed>}
  //const createPropertiesSubscriptionAllowed = userData?.subscription?.num_properties_allowed;
  const numPropertiesAllowed = subscription_data?.props_allowed;
  const numPropsAlreadyUnlocked = PropertiesExtraData ? Object.values(PropertiesExtraData).filter(property => !property.hasOwnProperty('is_locked')).length : 0;
  const numPropsStillLocked = PropertiesExtraData ? Object.values(PropertiesExtraData).filter(property => property.hasOwnProperty('is_locked')).length : 0;
  const remainingUnlocksAllowed = numPropertiesAllowed - numPropsAlreadyUnlocked;
  //const has_active_subscription = (numPropertiesAllowed == 0 || numPropertiesAllowed == undefined) ? false : true;
  const has_active_subscription = !['trial', 'trial_over', 'canceled'].includes(subscription_data.plan);
  const payment_failed = subscription_data.status === 'payment_failed';

  const propertiesDeleteMessage =store?.deleteListIntegrationPropertiesReducer?.deleteListIntegrationProperties?.data?.message;
  const propertiesDeleteError = store?.deleteListIntegrationPropertiesReducer?.deleteListIntegrationProperties?.data?.error;
  const propertiesDeleteStatus = store?.deleteListIntegrationPropertiesReducer?.deleteListIntegrationProperties?.status;
  const propertiesDeleteLoading = store?.deleteListIntegrationPropertiesReducer?.loading;
  const chatBoxGetByNameData = store?.getPropertyByNameReducer?.getPropertybyName?.data?.property;
  const { chatbot_key, property_name } = chatBoxGetByNameData ? chatBoxGetByNameData : [];
  const chatBoxGetByNameLoading = store?.getPropertyByNameReducer?.loading;
  const chatBoxGetByNameError = store?.getPropertyByNameReducer?.getPropertybyName?.data?.error;
  const chatBoxGetByNameStatus = store?.getPropertyByNameReducer?.getPropertybyName?.status;

  const [model, setModel] = useState({ webPageUrl:false, supportingDocuments:false, unlockProperty:false, lockProperty:false });
  const [propertiesToUnlock, setPropertiesToUnlock] = useState([]);
  const [regenerateApiLoading, setRegenerateApiLoading] = useState(false);
  const [lockPropertyLoading, setLockPropertyLoading] = useState(false);
  const [embedModalData, setEmbedModalData] = useState({show:false, chatbotKey:""});
  const [propertiesToLock, setPropertiesToLock] = useState([]);



  let webPageUrlOpen = "webPageUrlOpen";
  let supportingDocumentsOpen = "supportingDocumentsOpen";
  let webPageUrlClose = "webPageUrlClose";
  let supportingDocumentsClose = "supportingDocumentsClose";

  const handleCalenderModalOpen = (propertyName) => {
    setSelectedProperty(() => propertyName);
    setAllProperty(() => createPropertiesName);
    setShowCalender(true);
  };
  const handleModelOpen = (type) => {
    if (type === webPageUrlOpen) {
      setModel({ ...model, webPageUrl: true });
    } else if (type === supportingDocumentsOpen) {
      setModel({ ...model, supportingDocuments: true });
    } else if (type === "UnlockProperty") {
      setModel({ ...model, unlockProperty: true });
    } else if (type === "lockProperty") {
      setModel({ ...model, lockProperty: true });
    }
  };
  const handleModelClose = (type) => {
    if (type === webPageUrlClose) {
      setModel({ ...model, webPageUrl: false });
    } else if (type === supportingDocumentsClose) {
      setModel({ ...model, supportingDocuments: false });
    } else {
      setModel({ webPageUrl: false, supportingDocuments: false, unlockProperty: false, lockProperty: false });
    }
  };

  const callRegenerateChatbotLinkAPI = async (property_name) => {
    const baseUrl = process.env.REACT_APP_API_ENDPOINT;
    const API_KEY = process.env.REACT_APP_API_KEY;
    const dataToSend = {'type':'property', 'property_name':property_name};
    setRegenerateApiLoading(true);

    try {
      const config = {
        headers: { "X-API-Key": API_KEY },
        validateStatus: function (status) { return status >= 200 && status < 500; } // don't throw an error for non-2xx responses
      };

      //const response = await axios.post( `${baseUrl}/properties/${property_name}/regenerate_chatbot_key`, dataToSend, config );
      const response = await axios.post( `${baseUrl}/regenerate_chatbot_key`, dataToSend, config );

      if (response.status === 200) { ToastHandle("Chat link regenerated", "success"); }
      else { ToastHandle(response?.data?.error, "danger"); }
    } catch (error) { ToastHandle(error, "danger"); }
    finally { setRegenerateApiLoading(false); }
  }


  const callLockPropertyApi = async (property_name) => {
    const baseUrl = process.env.REACT_APP_API_ENDPOINT;
    const API_KEY = process.env.REACT_APP_API_KEY;
    const dataToSend = {'property_names': [property_name]};
    setLockPropertyLoading(true);

    try {
      const config = {
        headers: { "X-API-Key": API_KEY },
        validateStatus: function (status) { return status >= 200 && status < 500; } // don't throw an error for non-2xx responses
      };

      const response = await axios.post( `${baseUrl}/lock_properties`, dataToSend, config );

      if (response.status === 200) {
        ToastHandle("Property locked", "success");
        dispatch(getUserDataActions());
      } else { ToastHandle('Failed to lock property', "danger"); }
    } catch (error) { ToastHandle('An error occurred', "danger"); }
    finally { setLockPropertyLoading(false); }
  }


  let editProperty = "editProperty";
  let webPageURLs = "webPageURLs";
  let supportingDocuments = "supportingDocuments";
  let deleteProperty = "deleteProperty";
  let lockProperty = "lockProperty";
  let copyChatbotLink = "copyChatbotLink";
  let regenerateChatbotLink = "regenerateChatbotLink";
  let testProperty = "testProperty";
  let dummySubscriptionCount = "dummySubscriptionCount";

  const selectedHandle = (types, data) => {
    let findType = types;
    if (findType === editProperty) {
      setGetInputNameKey({ nameKey: data });
    } else if (findType === webPageURLs) {
      handleModelOpen(webPageUrlOpen);
    } else if (findType === supportingDocuments) {
      handleModelOpen(supportingDocumentsOpen);
    } else if (findType === "UnlockProperty") {
      setPropertiesToUnlock(data);
      handleModelOpen("UnlockProperty");
    } else if (findType === lockProperty) {
      setPropertiesToLock([data]);
      handleModelOpen("lockProperty");
    } else if (findType === deleteProperty) {
      if (window.confirm("Are you sure you want to delete this property?")) {
        dispatch(deleteListIntegrationPropertiesActions(data));
      }
    } else if (findType === regenerateChatbotLink) {
      if (window.confirm('WARNING: This will invalidate any existing chat links, embedded chat windows, and embedded widgets for this property. Proceed?')) {
        callRegenerateChatbotLinkAPI(data);
      }
    } else if (findType === copyChatbotLink) {
      setChatBox({
        linkCopy: true,
        testingProperty: false,
      });
      dispatch( getPropertyInsightByNameActions({ propertyName: data }) );
    } else if (findType === testProperty) {
      setChatBox({
        linkCopy: false,
        testingProperty: true,
      });
      setTestPropertyKey({ nameKey: data });
      dispatch(
        getPropertyInsightByNameActions({
          propertyName: data,
        })
      );
    } else if (findType === dummySubscriptionCount) {
      localStorage.removeItem(localStorageKey)
      navigate("/add-property/");
    }
  };

  const handleEmbedClick = (chatbot_key) => {
    setEmbedModalData({show:true, chatbotKey:chatbot_key});
  };


  // toggle chatBot on/off

  const [toggleOnOff, setToggleOnOff] = useState("");
  // const [toggleActive, setToggleActive] = useState(true);
  const [chatBoxIndex, setChatBoxIndex] = useState("");
  const toggleChatBotHndle = (type, id) => {
    if (type) {
      setToggleOnOff("on");
      setChatBoxIndex(id);
    } else {
      setToggleOnOff("FORCED_OFF");
      setChatBoxIndex(id);
    }
  };

  // When the schedule is changed, re-render the property list
  useEffect(() => {
    if (scheduleChanged) {
      setScheduleChanged(false);
      dispatch(getUserDataActions());
    }
  }, [scheduleChanged]);

  useEffect(() => {
    if (toggleOnOff !== "") {
      dispatch( toggleChatbotoNoFFPutActions({ properties: [createPropertiesName[chatBoxIndex]], state: toggleOnOff }) );
      setToggleOnOff("");
    }
  }, [toggleOnOff]);
  // toggle chatBot on/off

  useEffect(() => {
    if (propertiesDeleteStatus === 200) {
      ToastHandle(propertiesDeleteMessage, "success");
      dispatch(getUserDataActions());
      dispatch(stateEmptyActions());
    } else if (propertiesDeleteStatus === 404) {
      ToastHandle(propertiesDeleteError, "danger");
      dispatch(stateEmptyActions());
    } else if (getInputNameKey.nameKey !== "") {

      // OLD CODE (navigate to the old questionnaire page, and put the property name in local storage so we can get it)
      //navigate( "/add-properties/kd6PrMhLpwQrj5C94mscgOtydO8tXjQItEvjr3OUPal03jtMaGvW9PMrwdsxIFuw" );
      //localStorage.setItem(localStorageKey, JSON?.stringify(getInputNameKey));
      //setGetInputNameKey({ nameKey: "" });

      // NEW CODE (navigate to the new questionnaire page. No need to put the property name in local storage, since it's now a URL path param)
      // If setup_status is present in the property data (assume setup incomplete): navigate to the guided-setup page. Otherwise, nav to the edit-property page
      if (PropertiesExtraData?.[getInputNameKey.nameKey]?.setup_status) {
        navigate(`/guided-setup/${encodeURIComponent(getInputNameKey.nameKey)}`);
      } else {
        navigate(`/edit-property/${encodeURIComponent(getInputNameKey.nameKey)}`);
      }
      setGetInputNameKey({ nameKey: "" });
    }
  }, [propertiesDeleteStatus, getInputNameKey, testPropertyKey]);

  
  // user that chatBox intigration
  let urlLink = {
    id: "wdsxIFuw",
    chatbot_key: chatbot_key,
    propertyN: property_name,
    // item: authToke,
    // item1: authRefracetoke,
  };
  /* (Mboddie) Rewrote function to remove deprecated "execCommand" and use more straightforward logic
  const copyToClipboard = (text) => {
    var textField = document.createElement("textarea");
    textField.innerText = text;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand("copy");
    textField.remove();
  }; */
  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
    }
  };
  useEffect(() => {
    if (chatBoxGetByNameStatus === 200) {
      if (chatBox?.linkCopy) {
        let url_encoded_chatbot_key = encodeURIComponent(urlLink.chatbot_key);
        let urlToCopy = `https://hostbuddy.ai/property-chat/${url_encoded_chatbot_key}`;
        copyToClipboard(urlToCopy);

        ToastHandle("Link copied", "success");
        setChatBox({ linkCopy: false, testingProperty: false });
        dispatch(stateEmptyActions());
        return;
      } else if (chatBox?.testingProperty) {
        setChatBox({
          linkCopy: false,
          testingProperty: false,
        });

        let url_encoded_chatbot_key = encodeURIComponent(urlLink.chatbot_key);
        navigate(`/test-property/${url_encoded_chatbot_key}`)

        localStorage.setItem(localStorageKey, JSON?.stringify(testPropertyKey));
        setTestPropertyKey({ nameKey: "" });
        dispatch(stateEmptyActions());
      }
    } else if (chatBoxGetByNameStatus === 404) {
      ToastHandle(chatBoxGetByNameError, "danger");
      dispatch(stateEmptyActions());
    }
  }, [chatBoxGetByNameStatus, chatBox]);

  useEffect(() => {
    dispatch(getUserDataActions());
  }, []);

  // Check to see if property_data has been populated properly (if its keys map to objs that actually have values). If not (i.e. if it wasnt fetched with the last getUserDataActions call), then we'll need to wait for it to re-fetch since the logic on this page depends on this data being there
  // I don't think this is necessary. I think I wrote this logic when I tried to do the thing where we get user data once and store it in state, but I couldn't get that to work and never implemented it. So below block may be completely unnecessary
  useEffect(() => {
    if (!userDataGetLoading && PropertiesExtraData) {
      // Check if at least one property exists and has the required fields
      const propertyNames = Object.keys(PropertiesExtraData);
      if (propertyNames.length > 0) {
        const sampleProperty = PropertiesExtraData[propertyNames[0]];
        const hasAnyFields = Object.keys(sampleProperty).length > 0;
        
        setPropertyDataIsReady(hasAnyFields);
        
        // If data isn't properly populated, trigger a re-fetch
        if (!hasAnyFields) {
          //dispatch(getUserDataActions());
        }
      } else {
        // No properties exist, we can consider the data ready
        setPropertyDataIsReady(true);
      }
    }
  }, [userDataGetLoading, PropertiesExtraData]);

  console.log("Current plan:", subscription_data?.plan);

  const isPro = subscription_data?.plan?.toLowerCase().includes("pro");
  // const isMountPlan = subscription_data?.plan === "HostBuddy x Mount - Guest Experience Concierge";
  // const isMountPlan = subscription_data?.plan === "HostBuddy x Mount - Guest Experience Concierge" || subscription_data?.plan === "Mount - Guest Experience Concierge";
  const isMountPlan = subscription_data?.plan?.toLowerCase().includes("mount");
  return (
    <div>
      {chatBoxGetByNameLoading && <FullScreenLoader />}
      {propertiesDeleteLoading && <FullScreenLoader />}
      {((!userDataGetLoading) && (propertyDataIsReady)) ? (
        <>
          {createPropertiesName?.map((properties, index) => {
            let PropertStop = PropertiesExtraData?.[properties]?.toggle_status;
            let is_locked = PropertiesExtraData?.[properties]?.is_locked ?? false;
            let chatbot_key = PropertiesExtraData?.[properties]?.chatbot_key;

            return (
              <div className="row" key={properties}>
                <div className="col-lg-12">
                  <div className="d-flex gap-1 align-items-center justify-content-between property_lisiting mb-4">
                    <div className="d-flex gap-1 align-items-center property_listing_item">
                      <div className="img-with-title">
                        <img src={PropertiesExtraData?.[properties]?.thumbnail_image || dummyPropertyImg} alt="" onError={(e) => { e.target.onerror = null; e.target.src = dummyPropertyImg; }}/>
                      </div>
                      <div className="property_listing_detail">
                        <div className="property-detail">
                          <h4 style={{fontWeight:'bold', fontSize: '1.3em'}}>{properties}</h4>
                          {!is_locked && (
                            <div className="d-flex gap-2">
                              {PropertStop === "FORCED_OFF" ? (
                                <button className="bg-danger text-white rounded-pill border-danger btn border" style={{ padding: '4px 12px', fontSize: '0.8em' }} onClick={(e) => {toggleChatBotHndle(true, index);}}>
                                  STOPPED
                                </button>
                              ) : (
                                <button className="bg-dark text-primary border-primary btn border rounded-pill" style={{ padding: '4px 12px', fontSize: '0.8em' }} onClick={(e) => {toggleChatBotHndle(false, index);}}>
                                  STOP
                                </button>
                              )}
                              <Button className="border-0 shadow-none bg-none p-0 fs-5" onClick={() => handleCalenderModalOpen(properties)} style={{cursor:'pointer'}}>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                  <CiCalendar className="text-primary" />
                                  <p style={{margin:'2px 0 0 4px', fontSize:'14px', color:'#146ef5', cursor:'pointer'}}>Schedule</p>
                                </div>
                              </Button>
                            </div>
                          )}
                          {is_locked ? (
                            <h6 style={{ marginTop:'13px', color: 'rgb(135,135,135)', fontSize:'0.84em', fontWeight:'normal' }}>
                              This property is locked.{' '}
                              <button className="text-primary border-0 bg-none p-0" onClick={() => { selectedHandle("UnlockProperty", [properties]); }}>Unlock it</button>
                              {' '}to access options for responding to guests.
                            </h6>
                          ) : (
                            <h6 style={{ marginTop:'13px', color: 'rgb(135,135,135)', fontSize:'0.84em', fontWeight:'normal' }}>
                              {PropertiesExtraData?.[properties]?.status_statement?.split(' ').map((word, index) => 
                                <React.Fragment key={index}>
                                  {word === 'RESPONDING' ? <span style={{ color: 'rgb(0,200,0)' }}>{word}</span> :
                                  word === 'OFF' ? <span style={{ color: 'rgb(255,0,0)' }}>{word}</span> :
                                  word}
                                  {' '}
                                </React.Fragment>
                              ) || 'Status not available'}
                            </h6>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="property_listing_btn">
                      <Button className="property-edit-btn" onClick={() => {selectedHandle(editProperty, properties);}}>
                        Property Setup
                      </Button>
                      <Button className="test-property-btn border-0" onClick={() => { navigate(`/workbench/${properties}`); }}>
                        Test Property
                      </Button>
                    </div>

                    <Dropdown className="property-dropdown">
                      <Dropdown.Toggle className="dropdown-toggle-vertical" id="dropdown-button-drop-down-centered">
                        <HiOutlineDotsVertical />
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        {!isMountPlan && (
                          <Dropdown.Item onClick={() => { selectedHandle(editProperty, properties); }}>
                            Edit Property
                          </Dropdown.Item>
                        )}
                        {!is_locked && (
                          <>
                            {!isMountPlan && (
                              <Dropdown.Item
                                style={{
                                  opacity: isPro ? 0.5 : 1,
                                  pointerEvents: isPro ? "none" : "auto",
                                  display: 'flex',
                                  justifyContent: 'space-between',
                                  alignItems: 'center'
                                }}
                                disabled={isPro}
                                onClick={(e) => {
                                  if (isPro) return;
                                  handleEmbedClick(chatbot_key);
                                }}
                              >
                                Get Chat Link or Embed
                                {isPro && (
                                  <span
                                    style={{ color: '#146ef5', fontWeight: 500, fontSize: '0.95em', marginLeft: 'auto', cursor: 'pointer', pointerEvents: 'auto', textDecoration: 'underline' }}
                                    onClick={e => {
                                      e.stopPropagation();
                                      navigate('/setting/subscription');
                                    }}
                                  >
                                    Upgrade
                                  </span>
                                )}
                              </Dropdown.Item>
                            )}
                            {!isMountPlan && (
                              <Dropdown.Item
                                style={{
                                  opacity: isPro ? 0.5 : 1,
                                  pointerEvents: isPro ? "none" : "auto",
                                  display: 'flex',
                                  justifyContent: 'space-between',
                                  alignItems: 'center'
                                }}
                                disabled={isPro}
                                onClick={(e) => {
                                  if (isPro) return;
                                  selectedHandle(regenerateChatbotLink, properties);
                                }}
                              >
                                Regenerate Chat Link
                                {isPro && (
                                  <span
                                    style={{ color: '#146ef5', fontWeight: 500, fontSize: '0.95em', marginLeft: 'auto', cursor: 'pointer', pointerEvents: 'auto', textDecoration: 'underline' }}
                                    onClick={e => {
                                      e.stopPropagation();
                                      navigate('/setting/subscription');
                                    }}
                                  >
                                    Upgrade
                                  </span>
                                )}
                              </Dropdown.Item>
                            )}
                            {!lockPropertyLoading ? (
                              <Dropdown.Item onClick={() => { selectedHandle(lockProperty, properties); }}>
                                Lock Property
                              </Dropdown.Item>
                            ) : (
                              <Dropdown.Item>
                                <BoxLoader />
                              </Dropdown.Item>
                            )}
                          </>
                        )}
                        <Dropdown.Item onClick={() => { selectedHandle(deleteProperty, properties); }}>
                          Delete Property
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                </div>
              </div>
            );
          })}
          <div className="row">
            <div className="col-lg-12">
              <div className="d-flex gap-1 align-items-center justify-content-between property_lisiting mb-4">
                <div className="d-flex gap-1 align-items-center property_listing_item">
                  <div className="img-with-title">
                    <img src={dummyPropertyImg} alt=""/>
                  </div>
                  <div className="property_listing_detail">
                    <div className="property-detail">
                      <h4 style={{ color: 'rgb(128, 128, 128)', fontStyle: 'italic' }}>Add New Property (Without PMS)</h4>
                    </div>
                  </div>
                </div>
                <div className="property_listing_btn">
                  <div className="d-flex">
                    <Button className="property-edit-btn" onClick={() => { selectedHandle( dummySubscriptionCount, null ); }}>
                      <i class="bi bi-pen"></i>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <BoxLoader />
      )}
      <div>
        <WebPageUrlModel handleShow={model.webPageUrl} handleClose={handleModelClose}/>
        <SupportingDocumentModel handleShow={model.supportingDocuments} handleClose={handleModelClose}/>
      </div>
      {showCalender && (
        <CalenderModel selectedProperty={selectedProperty} showCalender={showCalender} setShowCalender={setShowCalender} allProperties={allProperties} setScheduleChanged={setScheduleChanged}/>
      )}
      <UnlockPropertiesModal propertiesToUnlock={propertiesToUnlock} has_active_subscription={has_active_subscription} payment_failed={payment_failed} remaining_unlocks_allowed={remainingUnlocksAllowed} remaining_locked_properties={numPropsStillLocked} modalShow={model.unlockProperty} handleClose={handleModelClose} setPropertiesChanged={setScheduleChanged}/>
      <LockPropertiesModal propertiesToLock={propertiesToLock} modalShow={model.lockProperty} handleClose={handleModelClose} setPropertiesChanged={setScheduleChanged}/>
      <EmbedModal show={embedModalData.show} handleClose={() => setEmbedModalData({show:false, chatbotKey:""})} chatbotKey={embedModalData.chatbotKey}/>
    </div>
  );
};

export default ListIntegrationProperties;
