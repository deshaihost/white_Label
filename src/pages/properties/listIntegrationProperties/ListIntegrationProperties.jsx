import React, { useEffect, useState } from "react";
import {
  deleteListIntegrationPropertiesActions,
  getUserDataActions,
  stateEmptyActions,
} from "../../../redux/actions";
import "./Listintigrationproperties.css";
import { useSelectorUseDispatch } from "../../../helper/Authorized";
import ToastHandle from "../../../helper/ToastMessage";
import Loader from "../../../helper/Loader";
// import NavDropdown from "react-bootstrap/NavDropdown";
import { useNavigate } from "react-router-dom";
import WebPageUrlModel from "./modelListProperties/webPageUrlModel/WebPageUrlModel";
import SupportingDocumentModel from "./modelListProperties/supportingDocumentModel/SupportingDocumentModel";
import { Button, Dropdown, Form } from "react-bootstrap";
import { CiCalendar } from "react-icons/ci";
import { HiOutlineDotsHorizontal } from "react-icons/hi";

import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import CalenderModel from "./calender/CalenderModel";

const ListIntegrationProperties = () => {
  const navigate = useNavigate();
  let localStorageKey = "nameKey";
  const [getInputNameKey, setGetInputNameKey] = useState({ nameKey: "" });
  const [testPropertyKey, setTestPropertyKey] = useState({ nameKey: "" });

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

  const [model, setModel] = useState({
    webPageUrl: false,
    supportingDocuments: false,
  });
  let webPageUrlOpen = "webPageUrlOpen";
  let supportingDocumentsOpen = "supportingDocumentsOpen";
  let webPageUrlClose = "webPageUrlClose";
  let supportingDocumentsClose = "supportingDocumentsClose";

  const handleCalenderModalOpen = (propertyName) => {
    console.log("PropertyName: ", propertyName);
    setSelectedProperty(() => propertyName);

    setShowCalender(true);
  };

  const handleCalenderModalClose = () => {
    setShowCalender(false);
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
    } else if (findType === testProperty) {
      setTestPropertyKey({ nameKey: data });
    }
  };

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
    } else if (testPropertyKey.nameKey !== "") {
      navigate(
        "/meet-hostbuddy/kd6PrMhLpwQrj5C94mscgOtydO8tXjQItEvjr3OUPal03jtMaGvW9PMrwdsxIFuw"
      );
      localStorage.setItem(localStorageKey, JSON?.stringify(testPropertyKey));
      setTestPropertyKey({ nameKey: "" });
    }
  }, [propertiesDeleteStatus, getInputNameKey, testPropertyKey]);

  useEffect(() => {
    dispatch(getUserDataActions());
  }, []);

  console.log("Property Data: ", createPropertiesName);

  return (
    <div>
      {propertiesDeleteLoading && <Loader />}
      {!userDataGetLoading ? (
        <>
          {createPropertiesName?.map((properties, index) => {
            return (
              <>
                <div className="row mt-5">
                  <div className="col-lg-12">
                    <div className="d-flex gap-1 align-items-center justify-content-between">
                      <div className="d-flex gap-1 align-items-center">
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
                        <div className="property-detail">
                          <h4>{properties}</h4>
                          <div className="d-flex gap-1">
                            <div className="form-check form-switch custom_switch">
                              <input
                                className="form-check-input toggle-user-chatbot"
                                type="checkbox"
                                role="switch"
                                id="statuscheck"
                              />
                              <label
                                className="form-check-label"
                                htmlFor="statuscheck"
                              >
                                on
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
                        <div>
                          {/* <span className="fs-6"> */}
                          {/* chart */}
                          <CircularProgressbar
                            className="progressBar"
                            styles={buildStyles({
                              pathColor: "#146EF5",
                              textColor: "#146EF5",
                            })}
                            value={100}
                            text={`${100}%`}
                          />
                          {/* </span> */}
                        </div>
                      </div>
                      <div>
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
                                    selectedHandle(copyChatbotLink);
                                  }}
                                >
                                  Copy Chatbot Link
                                </Dropdown.Item>
                              </Dropdown.Menu>
                            </Dropdown>
                          </div>
                        </div>
                        <Button
                          className="test-property-btn"
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
                {/* previous flow */}
                {/* <div className="row border p-4">
                  <div className="col-4 ">image</div>
                  <div className="col-4">
                    <div>{properties}</div>
                    <div>
                      <span>Switch</span>
                      <span className="border ms-2">Celander</span>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="d-flex justify-content-between px-5">
                      <div
                        onClick={() => {
                          selectedHandle(editProperty, properties);
                        }}
                      >
                        <i class="bi bi-pen"></i>
                      </div>
                      <div>
                        <NavDropdown title="..." id="basic-nav-dropdown">
                          <NavDropdown.Item
                            onClick={() => {
                              selectedHandle(editProperty, properties);
                            }}
                          >
                            Edit Property
                          </NavDropdown.Item>
                          <NavDropdown.Item
                            onClick={() => {
                              selectedHandle(webPageURLs);
                            }}
                          >
                            Web Page URLs
                          </NavDropdown.Item>
                          <NavDropdown.Item
                            onClick={() => {
                              selectedHandle(supportingDocuments);
                            }}
                          >
                            Supporting Documents
                          </NavDropdown.Item>
                          <NavDropdown.Item
                            onClick={() => {
                              selectedHandle(deleteProperty, properties);
                            }}
                          >
                            Delete Property
                          </NavDropdown.Item>
                          <NavDropdown.Item
                            onClick={() => {
                              selectedHandle(copyChatbotLink);
                            }}
                          >
                            Copy Chatbot Link
                          </NavDropdown.Item>
                        </NavDropdown>
                      </div>
                    </div>
                    <div
                      className="border"
                      onClick={() => {
                        selectedHandle(testProperty, properties);
                      }}
                    >
                      Test Property
                    </div>
                  </div>
                </div> */}
              </>
            );
          })}
        </>
      ) : (
        <Loader />
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
      )}{" "}
    </div>
  );
};

export default ListIntegrationProperties;
