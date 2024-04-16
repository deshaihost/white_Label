import React, { useEffect, useState } from "react";
import {
  deleteListIntegrationPropertiesActions,
  getUserDataActions,
  stateEmptyActions,
} from "../../../redux/actions";
import { useSelectorUseDispatch } from "../../../helper/Authorized";
import ToastHandle from "../../../helper/ToastMessage";
import Loader from "../../../helper/Loader";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useNavigate } from "react-router-dom";
import WebPageUrlModel from "./modelListProperties/webPageUrlModel/WebPageUrlModel";
import SupportingDocumentModel from "./modelListProperties/supportingDocumentModel/SupportingDocumentModel";

const ListIntegrationProperties = () => {
  const navigate = useNavigate();
  let localStorageKey = "nameKey";
  const [getInputNameKey, setGetInputNameKey] = useState({ nameKey: "" });
  const [testPropertyKey, setTestPropertyKey] = useState({ nameKey: "" });

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

  return (
    <div>
      {propertiesDeleteLoading && <Loader />}
      {!userDataGetLoading ? (
        <>
          {createPropertiesName?.map((properties, index) => {
            return (
              <>
                <div className="row border p-4">
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
                </div>
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
    </div>
  );
};

export default ListIntegrationProperties;
