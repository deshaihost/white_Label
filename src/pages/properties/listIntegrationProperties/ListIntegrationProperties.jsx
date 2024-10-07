import React, { useEffect, useState } from "react";
import { deleteListIntegrationPropertiesActions, getPropertyInsightByNameActions, getUserDataActions, stateEmptyActions, toggleChatbotoNoFFPutActions } from "../../../redux/actions";
import "./Listintigrationproperties.css";
import dummyPropertyImg from "../../../public/img/dummyPropertyImg.png";
import { useSelectorUseDispatch } from "../../../helper/Authorized";
import ToastHandle from "../../../helper/ToastMessage";
import  { BoxLoader, FullScreenLoader } from "../../../helper/Loader";
import { useNavigate } from "react-router-dom";
import WebPageUrlModel from "./modelListProperties/webPageUrlModel/WebPageUrlModel";
import SupportingDocumentModel from "./modelListProperties/supportingDocumentModel/SupportingDocumentModel";
import UnlockPropertiesModal from "../../../component/modal/unlockPropertiesModal/unlockPropertiesModal";
import { Button, Dropdown } from "react-bootstrap";
import { CiCalendar } from "react-icons/ci";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
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
  const { store, dispatch } = useSelectorUseDispatch();
  const userDataGetLoading = store?.getUserDataReducer?.loading;
  const createPropertiesName = store?.getUserDataReducer?.getUserData?.data?.user?.properties;
  const PropertiesExtraData = store?.getUserDataReducer?.getUserData?.data?.user?.property_data;

  const subscription_data = store?.getUserDataReducer?.getUserData?.data?.user?.subscription;
  const createPropertiesSubscriptionAllowed = store?.getUserDataReducer?.getUserData?.data?.user?.subscription?.num_properties_allowed;
  const propertyCheckSubscription = createPropertiesSubscriptionAllowed - (createPropertiesName?.length || 0);
  const dummyArraySubscriptionAllowed = [];
  const numPropsAlreadyUnlocked = PropertiesExtraData ? Object.values(PropertiesExtraData).filter(property => !property.hasOwnProperty('is_locked')).length : 0;
  const numPropsStillLocked = PropertiesExtraData ? Object.values(PropertiesExtraData).filter(property => property.hasOwnProperty('is_locked')).length : 0;
  const remainingUnlocksAllowed = createPropertiesSubscriptionAllowed - numPropsAlreadyUnlocked;
  const subscription_active = (subscription_data?.num_properties_allowed == 0 || subscription_data?.num_properties_allowed == undefined) ? false : true;

  for (let i = 0; i < propertyCheckSubscription; i++) {
    dummyArraySubscriptionAllowed.push(i);
  }

  const propertiesDeleteMessage =store?.deleteListIntegrationPropertiesReducer?.deleteListIntegrationProperties?.data?.message;
  const propertiesDeleteError = store?.deleteListIntegrationPropertiesReducer?.deleteListIntegrationProperties?.data?.error;
  const propertiesDeleteStatus = store?.deleteListIntegrationPropertiesReducer?.deleteListIntegrationProperties?.status;
  const propertiesDeleteLoading = store?.deleteListIntegrationPropertiesReducer?.loading;
  const chatBoxGetByNameData = store?.getPropertyByNameReducer?.getPropertybyName?.data?.property;
  const { chatbot_key, property_name } = chatBoxGetByNameData ? chatBoxGetByNameData : [];
  const chatBoxGetByNameLoading = store?.getPropertyByNameReducer?.loading;
  const chatBoxGetByNameError = store?.getPropertyByNameReducer?.getPropertybyName?.data?.error;
  const chatBoxGetByNameStatus = store?.getPropertyByNameReducer?.getPropertybyName?.status;

  const [model, setModel] = useState({ webPageUrl:false, supportingDocuments:false, unlockProperty:false });
  const [propertiesToUnlock, setPropertiesToUnlock] = useState([]);
  const [regenerateApiLoading, setRegenerateApiLoading] = useState(false);
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
    }
  };
  const handleModelClose = (type) => {
    if (type === webPageUrlClose) {
      setModel({ ...model, webPageUrl: false });
    } else if (type === supportingDocumentsClose) {
      setModel({ ...model, supportingDocuments: false });
    } else {
      setModel({ webPageUrl: false, supportingDocuments: false, unlockProperty: false });
    }
  };

  const callRegenerateChatbotLinkAPI = async (property_name) => {
    const baseUrl = process.env.REACT_APP_API_ENDPOINT;
    const API_KEY = process.env.REACT_APP_API_KEY;
    const dataToSend = { }; // empty body
    setRegenerateApiLoading(true);

    try {
      const config = {
        headers: { "X-API-Key": API_KEY },
        validateStatus: function (status) { return status >= 200 && status < 500; } // don't throw an error for non-2xx responses
      };

      const response = await axios.post( `${baseUrl}/properties/${property_name}/regenerate_chatbot_key`, dataToSend, config );

      if (response.status === 200) { ToastHandle("Chat link regenerated", "success"); }
      else { ToastHandle(response?.data?.error, "danger"); }
    } catch (error) { ToastHandle(error, "danger"); }
    finally { setRegenerateApiLoading(false); }
  }

  let editProperty = "editProperty";
  let webPageURLs = "webPageURLs";
  let supportingDocuments = "supportingDocuments";
  let deleteProperty = "deleteProperty";
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
    } else if (findType === deleteProperty) {
      if (window.confirm("Are you sure you want to delete this property?")) {
        dispatch(deleteListIntegrationPropertiesActions(data));
      }
    } else if (findType === regenerateChatbotLink) {
      callRegenerateChatbotLinkAPI(data);
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
      navigate(`/edit-property/${encodeURIComponent(getInputNameKey.nameKey)}`);
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

  return (
    <div>
      {chatBoxGetByNameLoading && <FullScreenLoader />}
      {propertiesDeleteLoading && <FullScreenLoader />}
      {!userDataGetLoading ? (
        <>
          {createPropertiesName?.map((properties, index) => {
            let PropertStop = PropertiesExtraData?.[properties]?.toggle_status;
            let is_locked = PropertiesExtraData?.[properties]?.hasOwnProperty('is_locked') ?? false;
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
                                <>
                                  {" "}
                                  <button className="bg-danger text-white rounded-pill border-danger btn border" style={{ padding: '4px 12px', fontSize: '0.8em' }} onClick={(e) => {toggleChatBotHndle(true, index);}}>
                                    STOPPED
                                  </button>
                                </>
                              ) : (
                                <>
                                  <button className="bg-dark text-primary border-primary btn border rounded-pill" style={{ padding: '4px 12px', fontSize: '0.8em' }} onClick={(e) => {toggleChatBotHndle(false, index);}}>
                                    STOP
                                  </button>
                                </>
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
                              {PropertiesExtraData?.[properties]?.status_statement.split(' ').map((word, index) => 
                                <React.Fragment key={index}>
                                  {word === 'RESPONDING' ? <span style={{ color: 'rgb(0,200,0)' }}>{word}</span> :
                                  word === 'OFF' ? <span style={{ color: 'rgb(255,0,0)' }}>{word}</span> :
                                  word}
                                  {' '}
                                </React.Fragment>
                              )}
                            </h6>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="property_listing_btn">
                      <div className="d-flex">
                        <Button className="property-edit-btn" onClick={() => {selectedHandle(editProperty, properties);}}>
                          <i class="bi bi-pen"></i>
                        </Button>
                        <div>
                          <Dropdown className="property-dropdown">
                            <Dropdown.Toggle className="" id="dropdown-button-drop-down-centered" drop="down-centered">
                              <HiOutlineDotsHorizontal />
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                              <Dropdown.Item onClick={() => { selectedHandle(editProperty, properties); }}>
                                Edit Property
                              </Dropdown.Item>
                              {!is_locked &&
                                <>
                                  <Dropdown.Item onClick={() => { selectedHandle(copyChatbotLink, properties); }}>
                                    Copy Chatbot Link
                                  </Dropdown.Item>
                                  <Dropdown.Item onClick={() => { selectedHandle(regenerateChatbotLink, properties); }}>
                                    Regenerate Chatbot Link
                                  </Dropdown.Item>
                                </>
                              }
                              <Dropdown.Item onClick={() => { selectedHandle(deleteProperty, properties); }}>
                                Delete Property
                              </Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown>
                        </div>
                      </div>
                      <Button className="test-property-btn border-0" onClick={() => { selectedHandle(testProperty, properties); }}>
                        Test Property
                      </Button>
                    </div>
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
                      <h4 style={{ color: 'rgb(128, 128, 128)', fontStyle: 'italic' }}>Add New Property</h4>
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
      <UnlockPropertiesModal property_names={propertiesToUnlock} subscription_active={subscription_active} remaining_unlocks_allowed={remainingUnlocksAllowed} remaining_locked_properties={numPropsStillLocked} modalShow={model.unlockProperty} handleClose={handleModelClose} setPropertiesChanged={setScheduleChanged}/>
    </div>
  );
};

export default ListIntegrationProperties;
