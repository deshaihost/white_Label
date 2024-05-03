import React, { useEffect, useState } from "react";
import {
  deleteListIntegrationPropertiesActions,
  getPropertyInsightByNameActions,
  getUserDataActions,
  stateEmptyActions,
  toggleChatbotoNoFFPutActions,
} from "../../../redux/actions";
import "./Listintigrationproperties.css";
import { useSelectorUseDispatch } from "../../../helper/Authorized";
import ToastHandle from "../../../helper/ToastMessage";
import Loader, { BoxLoader, FullScreenLoader } from "../../../helper/Loader";
import { useNavigate } from "react-router-dom";
import WebPageUrlModel from "./modelListProperties/webPageUrlModel/WebPageUrlModel";
import SupportingDocumentModel from "./modelListProperties/supportingDocumentModel/SupportingDocumentModel";
import { Button, Dropdown, Form } from "react-bootstrap";
import { CiCalendar } from "react-icons/ci";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import "react-circular-progressbar/dist/styles.css";
import CalenderModel from "./calender/CalenderModel";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Authorized from "../../../helper/Authorized";

const ListIntegrationProperties = () => {
  const navigate = useNavigate();
  let localStorageKey = "nameKey";
  const authData = Authorized();
  const authToke = authData?.token;
  const authRefracetoke = authData?.refreshToken;
  const [getInputNameKey, setGetInputNameKey] = useState({ nameKey: "" });
  const [testPropertyKey, setTestPropertyKey] = useState({ nameKey: "" });
  const [chatBox, setChatBox] = useState({
    linkCopy: false,
    testingProperty: false,
  });

  const [showCalender, setShowCalender] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState("");
  const { store, dispatch } = useSelectorUseDispatch();
  const userDataGetLoading = store?.getUserDataReducer?.loading;
  const createPropertiesName =
    store?.getUserDataReducer?.getUserData?.data?.user?.properties;
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
      setToggleOnOff("off");
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
        console.log('Text copied to clipboard');
    } catch (err) {
        console.error('Error in copying text: ', err);
    }
  };
  useEffect(() => {
    if (chatBoxGetByNameStatus === 200) {
      if (chatBox?.linkCopy) {

        /* Mboddie: changed below code to pass URL variables properly as query params, rather than a JSON object.
        Also changed the corresponding logic in MeetHostBuddy.jsx to correctly parse these variables in their new form.
        TODO: eventually baseUrl should be a global variable somewhere. There shouldn't be hardcoded references to the vercel URL scattered
        throughout the code, since it will make it more difficult to change to our actual domain in the future. */
        const baseUrl = "https://hostbuddy-react-frontend-three.vercel.app/meet-hostbuddy";
        const url = new URL(baseUrl);
        url.searchParams.append("key", urlLink.chatbot_key);
        url.searchParams.append("name", urlLink.propertyN);
        url.searchParams.append("user", "guest"); // "guest" since we're using the copied chatbot link, not "Test Property"
        copyToClipboard(url.toString());

        /* copyToClipboard(
          `https://hostbuddy-react-frontend-three.vercel.app/meet-hostbuddy/${JSON.stringify(
            urlLink
          )}`
        ); */

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

        /* Mboddie: changed below code to pass URL variables properly as query params, rather than a JSON object.
        Also changed the corresponding logic in MeetHostBuddy.jsx to correctly parse these variables in their new form.
        TODO: eventually baseUrl should be a global variable somewhere. There shouldn't be hardcoded references to the vercel URL scattered
        throughout the code, since it will make it more difficult to change to our actual domain in the future. */
        const baseUrl = "https://hostbuddy-react-frontend-three.vercel.app/meet-hostbuddy";
        const url = new URL(baseUrl);
        url.searchParams.append("key", urlLink.chatbot_key);
        url.searchParams.append("name", urlLink.propertyN);
        url.searchParams.append("user", "host"); // "host" since we're using "Test Property", not the copied chatbot link

        window.open( url.toString(), "_blank" );

        /* const routingPart = "/meet-hostbuddy/";
        window.open(
          `https://hostbuddy-react-frontend-three.vercel.app/${routingPart}${JSON?.stringify(
            urlLink
          )}`,
          "_blank"
        ); */
        // navigate(`${routingPart}${JSON?.stringify(urlLink)}`);
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
            return (
              <>
                <div className="row">
                  <div className="col-lg-12">
                    <div className="d-flex gap-1 align-items-center justify-content-between property_lisiting mb-4">
                      <div className="d-flex gap-1 align-items-center property_listing_item">
                        <div className="img-with-title">
                          <img
                            src={
                              properties.img ||
                              "https://img.freepik.com/free-photo/sustainable-travel-concept_23-2151049514.jpg?size=626&ext=jpg&ga=GA1.1.1314459612.1713268062&semt=sph"
                            }
                            alt=""
                          />
                          <span>THE WORKS</span>
                        </div>
                        <div className="property_listing_detail">
                          <div className="property-detail">
                            <h4>{properties}</h4>
                            <div className="d-flex gap-2">
                              <div className="form-check form-switch custom_switch">
                                <input
                                  className="form-check-input toggle-user-chatbot"
                                  type="checkbox"
                                  role="switch"
                                  id="statuscheck"
                                  onClick={(e) => {
                                    toggleChatBotHndle(e.target.checked, index);
                                  }}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="statuscheck"
                                >
                                  {toggleActive ? (
                                    <>{chatBoxIndex === index ? "ON" : "OFF"}</>
                                  ) : (
                                    "OFF"
                                  )}
                                </label>
                              </div>
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
                                    selectedHandle(webPageURLs);
                                  }}
                                >
                                  Web Page URLs
                                </Dropdown.Item>
                                <Dropdown.Item
                                  onClick={() => {
                                    selectedHandle(supportingDocuments);
                                  }}
                                >
                                  Supporting Documents
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
        />
      )}
    </div>
  );
};

export default ListIntegrationProperties;
