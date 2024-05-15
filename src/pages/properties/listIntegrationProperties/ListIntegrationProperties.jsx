import React, { useEffect, useState } from "react";
import {
  deleteListIntegrationPropertiesActions,
  getPropertyInsightByNameActions,
  getUserDataActions,
  stateEmptyActions,
  toggleChatbotoNoFFPutActions,
} from "../../../redux/actions";
import "./Listintigrationproperties.css";
import default_thumbnail_img from "../../../public/img/prop_thumbnail_default.jpg";
import dummyPropertyImg from "../../../public/img/dummyPropertyImg.png";
import { useSelectorUseDispatch } from "../../../helper/Authorized";
import ToastHandle from "../../../helper/ToastMessage";
import Loader, { BoxLoader, FullScreenLoader } from "../../../helper/Loader";
import { useNavigate } from "react-router-dom";
import WebPageUrlModel from "./modelListProperties/webPageUrlModel/WebPageUrlModel";
import SupportingDocumentModel from "./modelListProperties/supportingDocumentModel/SupportingDocumentModel";
import { Button, Dropdown } from "react-bootstrap";
import { CiCalendar } from "react-icons/ci";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import "react-circular-progressbar/dist/styles.css";
import CalenderModel from "./calender/CalenderModel";

const ListIntegrationProperties = () => {
  const navigate = useNavigate();
  let localStorageKey = "nameKey";
  const [getInputNameKey, setGetInputNameKey] = useState({ nameKey: "" });
  const [testPropertyKey, setTestPropertyKey] = useState({ nameKey: "" });
  const [chatBox, setChatBox] = useState({
    linkCopy: false,
    testingProperty: false,
  });

  const [showCalender, setShowCalender] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState("");
  const [allProperties, setAllProperty] = useState([]);
  const { store, dispatch } = useSelectorUseDispatch();
  const userDataGetLoading = store?.getUserDataReducer?.loading;
  const createPropertiesName =
    store?.getUserDataReducer?.getUserData?.data?.user?.properties;
  const createPropertiesSubscriptionAllowed =
    store?.getUserDataReducer?.getUserData?.data?.user?.subscription
      ?.num_properties_allowed;
  const propertyCheckSubscription =
    createPropertiesSubscriptionAllowed - (createPropertiesName?.length || 0);
  const dummyArraySubscriptionAllowed = [];

  for (let i = 0; i < propertyCheckSubscription; i++) {
    // Your code logic inside the loop goes here
    dummyArraySubscriptionAllowed.push(i);
  }

  const PropertiesExtraData =
    store?.getUserDataReducer?.getUserData?.data?.user?.property_data; // The "property_data" field of the get_user_data API return is an object with thumbnail_image and toggle_status for each property

  const propertiesDeleteMessage =
    store?.deleteListIntegrationPropertiesReducer
      ?.deleteListIntegrationProperties?.data?.message;
  const propertiesDeleteError =
    store?.deleteListIntegrationPropertiesReducer
      ?.deleteListIntegrationProperties?.data?.error;
  const propertiesDeleteStatus =
    store?.deleteListIntegrationPropertiesReducer
      ?.deleteListIntegrationProperties?.status;
  const propertiesDeleteLoading =
    store?.deleteListIntegrationPropertiesReducer?.loading;
  const chatBoxGetByNameData =
    store?.getPropertyByNameReducer?.getPropertybyName?.data?.property;
  const { chatbot_key, property_name } = chatBoxGetByNameData
    ? chatBoxGetByNameData
    : [];
  const [copyLinkSetData, setCopyLinkSetData] = useState({
    chatBotKey: "",
    propertyName: "",
  });
  const chatBoxGetByNameLoading = store?.getPropertyByNameReducer?.loading;
  const chatBoxGetByNameError =
    store?.getPropertyByNameReducer?.getPropertybyName?.data?.error;
  const chatBoxGetByNameStatus =
    store?.getPropertyByNameReducer?.getPropertybyName?.status;

  const [model, setModel] = useState({
    webPageUrl: false,
    supportingDocuments: false,
  });
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
    }
  };
  const handleModelClose = (type) => {
    if (type === webPageUrlClose) {
      setModel({ ...model, webPageUrl: false });
    } else if (type === supportingDocumentsClose) {
      setModel({ ...model, supportingDocuments: false });
    }
  };

  let editProperty = "editProperty";
  let webPageURLs = "webPageURLs";
  let supportingDocuments = "supportingDocuments";
  let deleteProperty = "deleteProperty";
  let copyChatbotLink = "copyChatbotLink";
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
    } else if (findType === deleteProperty) {
      dispatch(deleteListIntegrationPropertiesActions(data));
    } else if (findType === copyChatbotLink) {
      setChatBox({
        linkCopy: true,
        testingProperty: false,
      });
      dispatch(
        getPropertyInsightByNameActions({
          propertyName: data,
        })
      );
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
      navigate("/add-properties/");
    }
  };

  // toggle chatBot on/off

  const [toggleOnOff, setToggleOnOff] = useState("");
  const [toggleActive, setToggleActive] = useState(true);
  const [chatBoxIndex, setChatBoxIndex] = useState("");
  const toggleChatBotHndle = (type, id) => {
    if (type) {
      setToggleOnOff("on");
      setToggleActive(true);
      setChatBoxIndex(id);
    } else {
      setToggleOnOff("FORCED_OFF");
      setToggleActive(false);
      setChatBoxIndex(id);
    }
  };
  useEffect(() => {
    if (toggleOnOff !== "") {
      dispatch(
        toggleChatbotoNoFFPutActions({
          properties: [createPropertiesName[chatBoxIndex]],
          state: toggleOnOff,
        })
      );
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
      navigate(
        "/add-properties/kd6PrMhLpwQrj5C94mscgOtydO8tXjQItEvjr3OUPal03jtMaGvW9PMrwdsxIFuw"
      );
      localStorage.setItem(localStorageKey, JSON?.stringify(getInputNameKey));
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
        setCopyLinkSetData({
          chatBotKey: chatbot_key,
          propertyName: property_name,
        });
        setChatBox({
          linkCopy: false,
          testingProperty: false,
        });
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
            return (
              <>
                <div className="row">
                  <div className="col-lg-12">
                    <div className="d-flex gap-1 align-items-center justify-content-between property_lisiting mb-4">
                      <div className="d-flex gap-1 align-items-center property_listing_item">
                        <div className="img-with-title">
                          <img
                            src={
                              PropertiesExtraData?.[properties]
                                ?.thumbnail_image || dummyPropertyImg
                            }
                            alt=""
                          />

                          <span>THE WORKS</span>
                        </div>
                        <div className="property_listing_detail">
                          <div className="property-detail">
                            <h4>{properties}</h4>
                            <div className="d-flex gap-2">
                              {PropertStop === "FORCED_OFF" ? (
                                <>
                                  {" "}
                                  <button
                                    className="bg-danger text-white rounded-pill border-danger btn border"
                                    onClick={(e) => {
                                      toggleChatBotHndle(true, index);
                                    }}
                                  >
                                    STOPPED
                                  </button>
                                </>
                              ) : (
                                <>
                                  <button
                                    className="bg-dark text-primary border-primary btn border rounded-pill"
                                    onClick={(e) => {
                                      toggleChatBotHndle(false, index);
                                    }}
                                  >
                                    STOP
                                  </button>
                                </>
                              )}

                              <Button
                                onClick={() =>
                                  handleCalenderModalOpen(properties)
                                }
                                className="border-0 shadow-none bg-none p-0 fs-5"
                              >
                                <CiCalendar className="text-primary" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="property_listing_btn">
                        <div className="d-flex">
                          <Button
                            className="property-edit-btn"
                            onClick={() => {
                              selectedHandle(editProperty, properties);
                            }}
                          >
                            <i class="bi bi-pen"></i>
                          </Button>
                          <div>
                            <Dropdown className="property-dropdown">
                              <Dropdown.Toggle
                                className=""
                                id="dropdown-button-drop-down-centered"
                                drop="down-centered"
                              >
                                <HiOutlineDotsHorizontal />
                              </Dropdown.Toggle>

                              <Dropdown.Menu>
                                <Dropdown.Item
                                  onClick={() => {
                                    selectedHandle(editProperty, properties);
                                  }}
                                >
                                  Edit Property
                                </Dropdown.Item>
                                <Dropdown.Item
                                  onClick={() => {
                                    selectedHandle(deleteProperty, properties);
                                  }}
                                >
                                  Delete Property
                                </Dropdown.Item>
                                <Dropdown.Item
                                  onClick={() => {
                                    selectedHandle(copyChatbotLink, properties);
                                  }}
                                >
                                  <span>Copy Chatbot Link</span>
                                </Dropdown.Item>
                              </Dropdown.Menu>
                            </Dropdown>
                          </div>
                        </div>
                        <Button
                          className="test-property-btn border-0"
                          onClick={() => {
                            selectedHandle(testProperty, properties);
                          }}
                        >
                          Test Property
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            );
          })}
          {dummyArraySubscriptionAllowed?.map((properties, index) => {
            return (
              <>
                <div className="row">
                  <div className="col-lg-12">
                    <div className="d-flex gap-1 align-items-center justify-content-between property_lisiting mb-4">
                      <div className="d-flex gap-1 align-items-center property_listing_item">
                        <div className="img-with-title">
                          <img
                            src={
                              PropertiesExtraData?.[properties]
                                ?.thumbnail_image || dummyPropertyImg
                            }
                            alt=""
                          />

                          <span>THE WORKS</span>
                        </div>
                        <div className="property_listing_detail">
                          <div className="property-detail">
                            <h4>----</h4>
                          </div>
                        </div>
                      </div>
                      <div className="property_listing_btn">
                        <div className="d-flex">
                          <Button
                            className="property-edit-btn"
                            onClick={() => {
                              selectedHandle(
                                dummySubscriptionCount,
                                properties
                              );
                            }}
                          >
                            <i class="bi bi-pen"></i>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            );
          })}
        </>
      ) : (
        <BoxLoader />
      )}
      <div>
        <WebPageUrlModel
          handleShow={model.webPageUrl}
          handleClose={handleModelClose}
        />
        <SupportingDocumentModel
          handleShow={model.supportingDocuments}
          handleClose={handleModelClose}
        />
      </div>
      {showCalender && (
        <CalenderModel
          selectedProperty={selectedProperty}
          showCalender={showCalender}
          setShowCalender={setShowCalender}
          allProperties={allProperties}
        />
      )}
    </div>
  );
};

export default ListIntegrationProperties;
