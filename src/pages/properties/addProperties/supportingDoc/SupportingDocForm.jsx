import React, { useEffect, useState } from "react";
// import { set, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
// import {
//   supportingDocumentPostActions,
//   supportingUrlPostActions,
// } from "../../../../redux/actions";
import { useSelectorUseDispatch } from "../../../../helper/Authorized";
import { nameKey } from "../../../../helper/Authorized";
import ToastHandle from "../../../../helper/ToastMessage";
import Loader, { BoxLoader } from "../../../../helper/Loader";
import { stateEmptyActions } from "../../../../redux/actions";
import { listIntegrationPropertiesActions } from "../../../../redux/actions";
// import ToastHandle from "../../../../helper/ToastMessage";
import DochideForReservationsModel from "./dochideForReservationsModel/DochideForReservationsModel";

import axios from "axios";
import PopupModal from "./PopupModal";

const SupportingDocForm = ({ prntFuntionHeaderActive }) => {
  const { id } = useParams();

  const { store, dispatch } = useSelectorUseDispatch();

  const supportingNameKey = nameKey();
  const [showPreviousDoc, setShowPreviousDoc] = useState(false);
  const [showDocHideForResrv, setDocHideForResrv] = useState(false);

  const [prevUploadedDoc, setPrevUploadedDoc] = useState([]);
  const [hideForReservation, setHideForReservatin] = useState([]);

  const [prevLinkedIntegration, setPrevLinkedIntegration] = useState(null);
  // const [uploadedDoc, setUploadedDoc] = useState();
  const [uploadedUrl, setUploadedUrl] = useState("");
  const [docUploadIsLoading, setdocUploadIsLoading] = useState(false);

  const [suppertingInput, setSuppertingInput] = useState({
    updateDoc: true,
    urlToWebPage: false,
    pmsIntegration: false,
  });
  let updateDocN = "updateDoc";
  let urlToWebPageN = "urlToWebPage";
  let pmsIntegrationN = "pmsIntegration";
  const suppertingOnclick = (type) => {
    if (type === updateDocN) {
      setSuppertingInput({ updateDoc: true });
    } else if (type === urlToWebPageN) {
      setSuppertingInput({ urlToWebPage: true });
    } else if (type === pmsIntegrationN) {
      setSuppertingInput({ pmsIntegration: true });
    }
  };
  const supportingStatus = suppertingInput?.updateDoc
    ? store?.supportingDocumentPostReducer?.supportingDoc?.status
    : suppertingInput?.urlToWebPage
    ? store?.supportingUrlPostReducer?.supportingUrl?.status
    : "";
  const supportingUrlMessage = suppertingInput?.updateDoc
    ? store?.supportingDocumentPostReducer?.supportingDoc?.data?.error
    : suppertingInput?.urlToWebPage
    ? store?.supportingUrlPostReducer?.supportingUrl?.data?.error
    : "";
  const supportingLoading = suppertingInput?.updateDoc
    ? store?.supportingDocumentPostReducer?.loading
    : suppertingInput?.urlToWebPage
    ? store?.supportingUrlPostReducer?.loading
    : "";

  // list_integration_properties API Logic ------------------------------------------------------------------------------------------

  const [hasCalledAPI, setHasCalledAPI] = useState(false); // keep track of whether we've already called the list_integration_properties API. We only ever want to do it once, when the user clicks "PMS Integration"
  const [selectedIntegrationPropertyId, setSelectedIntegrationPropertyId] =
    useState(null); // User-selected integration property
  const [linkIsLoading, setLinkIsLoading] = useState(false);
  const [unlinkIsLoading, setUnlinkIsLoading] = useState(false);

  const integrationPropertyList =
    store?.listIntegrationPropertiesReducer?.listIntegrationProperties?.data
      ?.properties; // array of integration_property objects; each with "name" and "id" properties
  const integrationPropertiesLoading = store?.listIntegrationPropertiesReducer?.loading;

  // When "PMS Integration" is selected, call API to get the list of integration properties
  useEffect(() => {
    if (!prevLinkedIntegration) {
      // If already linked to an integration, don't call the API
      if (suppertingInput.pmsIntegration && !hasCalledAPI) {
        dispatch(listIntegrationPropertiesActions());
        setHasCalledAPI(true);
      }
    }
  }, [suppertingInput?.pmsIntegration]);

  // -------------------------------------------------------------------------------------------------------------------------------

  function isValidURL(url) {
    // Regular expression to match a period in the middle of the string
    return /^[^.].+?\..+[^.]$/.test(url);
  }

  

  const redrectcomponent = () => {
    prntFuntionHeaderActive(id !== undefined && "listingDetails");
  };

  const go_to_next_page = async () => {
    setTimeout(() => {
      redrectcomponent();
    }, 500);
    return;
  };

  const handleUploadUrl = async () => {
    if (!isValidURL(uploadedUrl)) {
      redrectcomponent();
      return;
    }

    const baseUrl = process.env.REACT_APP_API_ENDPOINT;
    const API_KEY = process.env.REACT_APP_API_KEY;

    const getSessionStorageData = JSON.parse(
      sessionStorage.getItem("hostBuddy_auth")
    );

    const token = getSessionStorageData?.token;

    const property = JSON.parse(localStorage.getItem("nameKey"));

    const propertyName = property?.nameKey;

    const urlToSend = {
      url: uploadedUrl,
    };
    // return;
    try {
      if (token && propertyName) {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
            "X-API-Key": API_KEY,
          },
        };
        const response = await axios.post(
          `${baseUrl}/properties/${propertyName}/add_url`,
          urlToSend,
          config
        );

        if (response.status === 200) {
          ToastHandle(response?.data?.message, "success");
          setTimeout(() => {
            prntFuntionHeaderActive(id !== undefined && "listingDetails");
          }, 1500);
        } else {
          console.log("Error");
        }
      } else {
        alert("Missing Token or propertyName");
      }
    } catch (error) {
      if (error.status === 400) {
        ToastHandle(error?.data?.error, "danger");
      } else {
        ToastHandle("Something went wrong", "danger");
      }
    }
  };

  const [file, setFile] = useState(null);
  const [getDocApiCall, setGetDocApiCall] = useState(false);
  const documentUploadMainHndle = async (resrData) => {
    setdocUploadIsLoading(true);
    const baseUrl = process.env.REACT_APP_API_ENDPOINT;
    const API_KEY = process.env.REACT_APP_API_KEY;
    const getSessionStorageData = JSON.parse(
      sessionStorage.getItem("hostBuddy_auth")
    );

    let payload = new FormData();

    payload.append("file", file);
    payload.append("hide_for_reservations", JSON.stringify(resrData)); // JSON-style string representing the array of strings, per backend requirement

    const token = getSessionStorageData?.token;
    const supportingkeyName = supportingNameKey?.nameKey;

    try {
      if (token && supportingkeyName) {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
            "X-API-Key": API_KEY,
            "Content-Type": file.type, // Set the Content-Type based on the file type
            // 'Content-Type': 'multipart/form-data',
          },
        };

        const response = await axios.post(
          `${baseUrl}/properties/${supportingkeyName}/add_file`,
          payload,
          config
        );

        setdocUploadIsLoading(false);

        if (response.status === 200) {
          ToastHandle("File uploaded successfully", "success");
          setDocHideForResrv(false);
          setGetDocApiCall(true);
        } else {
          console.log("Error", response);
        }
      } else {
        alert("Missing Token or supportingkeyName");
      }
    } catch (error) {
      setdocUploadIsLoading(false);
      console.error("Error uploading file:", error);
      ToastHandle(error?.data?.error, "danger");
    }
  };

  const documentUploadHandle = () => {
    if (!file) {
      ToastHandle("No file uploaded", "danger");
      return;
    }
    setDocHideForResrv(true);

    // setdocUploadIsLoading(true);

    // const baseUrl = process.env.REACT_APP_API_ENDPOINT;
    // const API_KEY = process.env.REACT_APP_API_KEY;

    // const getSessionStorageData = JSON.parse(
    //   sessionStorage.getItem("hostBuddy_auth")
    // );

    // let payload = new FormData();

    // payload.append("file", file);
    // // payload.append("hide_for_reservations", []);

    // const token = getSessionStorageData?.token;
    // const supportingkeyName = supportingNameKey?.nameKey;

    // try {
    //   if (token && supportingkeyName) {
    //     const config = {
    //       headers: {
    //         Authorization: `Bearer ${token}`,
    //         "X-API-Key": API_KEY,
    //         "Content-Type": file.type, // Set the Content-Type based on the file type
    //         // 'Content-Type': 'multipart/form-data',
    //       },
    //     };

    //     const response = await axios.post(
    //       `${baseUrl}/properties/${supportingkeyName}/add_file`,
    //       payload,
    //       config
    //     );

    //     setdocUploadIsLoading(false);

    //     if (response.status === 200) {
    //       ToastHandle("File uploaded successfully", "success");
    //     } else {
    //       ("Erconsole.logror", response);
    //     }
    //   } else {
    //     alert("Missing Token or supportingkeyName");
    //   }
    // } catch (error) {
    //   setdocUploadIsLoading(false);
    //   console.error("Error uploading file:", error);
    //   ToastHandle(error?.data?.error, "danger");
    // }
  };

  const handleSubmitForm = (e, uploadType) => {
    e.preventDefault();
    if (uploadType?.urlToWebPage) {
      handleUploadUrl();
    } else if (uploadType?.updateDoc) {
      documentUploadHandle();
    }
  };

  const save_and_next = (e) => {
    e.preventDefault();
    go_to_next_page();
  };

  const link_integration = async (e, propertyName, integrationPropertyId) => {
    e.preventDefault();
    setLinkIsLoading(true);
    const baseUrl = process.env.REACT_APP_API_ENDPOINT;
    const API_KEY = process.env.REACT_APP_API_KEY;
    const getSessionStorageData = JSON.parse(
      sessionStorage.getItem("hostBuddy_auth")
    );
    const token = getSessionStorageData?.token;

    // Get the integrationPropertyName from the integrationPropertyId
    const selectedIntegrationProperty = integrationPropertyList.find(
      (property) => property.id === integrationPropertyId
    );
    const integrationPropertyName = selectedIntegrationProperty?.name;

    try {
      if (token) {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
            "X-API-Key": API_KEY,
          },
        };

        const jsonPayload = {
          platform_property_id: integrationPropertyId,
          platform_property_name: integrationPropertyName,
        };
        const response = await axios.post(
          `${baseUrl}/properties/${propertyName}/link_to_integration`,
          jsonPayload,
          config
        );

        if (response.status === 200) {
          ToastHandle(response.data.message, "success");
          setPrevLinkedIntegration(integrationPropertyName);
          setSuppertingInput({ pmsIntegration: true }); // re-render "PMS Integration" section (i.e. re-click the radio button)
        } else {
          ToastHandle(response.data.error, "danger");
        }
      } else {
        alert("No Token");
      }
    } catch (error) {
      console.error("Error linking integration:", error);
      ToastHandle("Error linking integration", "danger");
    } finally {
      setLinkIsLoading(false);
    }
  };

  const unlink_integration = async (e, propertyName) => {
    e.preventDefault();
    setUnlinkIsLoading(true);
    const baseUrl = process.env.REACT_APP_API_ENDPOINT;
    const API_KEY = process.env.REACT_APP_API_KEY;
    const getSessionStorageData = JSON.parse(
      sessionStorage.getItem("hostBuddy_auth")
    );
    const token = getSessionStorageData?.token;

    try {
      if (token) {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
            "X-API-Key": API_KEY,
          },
        };
        const response = await axios.delete(
          `${baseUrl}/properties/${propertyName}/unlink_from_integration`,
          config
        );

        if (response.status === 200) {
          ToastHandle(response.data.message, "success");
          setPrevLinkedIntegration(null);
          setSuppertingInput({ pmsIntegration: true }); // re-render "PMS Integration" section (i.e. re-click the radio button)
        } else {
          ToastHandle(response.data.error, "danger");
        }
      } else {
        alert("No Token");
      }
    } catch (error) {
      console.error("Error unlinking integration:", error);
      ToastHandle("Error unlinking integration", "danger");
    } finally {
      setUnlinkIsLoading(false);
    }
  };

  // const previousUploadedDoc = async (propertyName) => {
  //   const baseUrl = process.env.REACT_APP_API_ENDPOINT;

  //   const getSessionStorageData = JSON.parse(
  //     sessionStorage.getItem("hostBuddy_auth")
  //   );

  //   const token = getSessionStorageData?.token;

  //   try {
  //     if (token) {
  //       const config = {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //           "X-API-Key": API_KEY,
  //         },
  //       };
  //       const response = await axios.get(
  //         `${baseUrl}/properties/${propertyName}`,
  //         config
  //       );

  //       setCalendarSchedule(() => response?.data?.schedule);

  //       // if (response.status === 200) {
  //       //     dispatch({
  //       //         type: "get_all_Task",
  //       //         payload: response.data.data,
  //       //     });
  //       // } else {
  //       //     dispatch({
  //       //         type: "get_all_Task",
  //       //         payload: [],
  //       //     });
  //       // }
  //     } else {
  //       alert("No Token");
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // Call the backend API to get the list of previously uploaded documents, and the name of any previously linked integration property
  const [previouslyGetApiLoading, setPreviousGetApiLoading] = useState(false);
  const previousUploadedDoc = async (propertyName) => {
    setPreviousGetApiLoading(true);
    const baseUrl = process.env.REACT_APP_API_ENDPOINT;
    const API_KEY = process.env.REACT_APP_API_KEY;
    const getSessionStorageData = JSON.parse(
      sessionStorage.getItem("hostBuddy_auth")
    );
    const token = getSessionStorageData?.token;

    try {
      if (token) {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
            "X-API-Key": API_KEY,
          },
        };
        const response = await axios.get(
          `${baseUrl}/properties/${propertyName}`,
          config
        );

        if (response.status === 200) {
          setPreviousGetApiLoading(false);

          const propertyData = response.data.property;
          if (propertyData && propertyData.supporting_doc_items) {
            const fileData = propertyData.supporting_doc_items.file_data;
            if (fileData) {
              const uploadedDocs = Object.keys(fileData);
              setPrevUploadedDoc(uploadedDocs);
              setHideForReservatin(fileData);
            }
          }
          if (
            propertyData &&
            propertyData?.integration?.integration_property_name
          ) {
            setPrevLinkedIntegration(
              propertyData?.integration?.integration_property_name
            );
          }
        } else {
          // Handle non-200 status
          setPreviousGetApiLoading(false);

          console.log("Received non-200 status:", response.status);
        }
      } else {
        setPreviousGetApiLoading(false);

        alert("No Token");
      }
    } catch (error) {
      // Handle error
      setPreviousGetApiLoading(false);

      console.log("Error:", error);
    }
  };
  // THIS FUNCTIONALITY USED DOCUMENT DELETE AFTER THAT THIS PREVIOUS UPLOAD DOCUMENT START
  const deleteResAfterPreviousDocCall = () => {
    previousUploadedDoc(propertyName);
  };

  // THIS FUNCTIONALITY USED DOCUMENT DELETE AFTER THAT THIS PREVIOUS UPLOAD DOCUMENT END

  const property = JSON.parse(localStorage.getItem("nameKey"));
  const propertyName = property?.nameKey;

  // When the page is loaded, call the GET property API to get the name of any previously linked integration property.
  // TODO: have some functionality to prevent excessive calls, since there are other conditions on this page that also trigger this API call
  useEffect(() => {
    if (propertyName) {
      previousUploadedDoc(propertyName);
    }
  }, [propertyName]);

  const handleShowPopUp = () => {
    setShowPreviousDoc(true);
    previousUploadedDoc(propertyName)
  };
  useEffect(() => {
    const getSessionStorageData = JSON.parse(
      sessionStorage.getItem("hostBuddy_auth")
    );
    const token = getSessionStorageData?.token;
    const property = JSON.parse(localStorage.getItem("nameKey"));
    const propertyName = property?.nameKey;
    // previousUploadedDoc(propertyName);
  }, [sessionStorage.getItem("hostBuddy_auth")]);

  useEffect(() => {
    if (supportingStatus === 404) {
      ToastHandle(supportingUrlMessage, "danger");
      dispatch(stateEmptyActions());
    } else if (supportingStatus === 400) {
      ToastHandle(supportingUrlMessage, "danger");
      dispatch(stateEmptyActions());
    }
  }, [supportingStatus]);

  useEffect(() => {
    if (getDocApiCall) {
      previousUploadedDoc(propertyName);
      setGetDocApiCall(false);
    }
  }, [getDocApiCall]);

  return (
    <>
      <div>
        <div className="row">
          <div className="col-12 form-design">
            <div>
              <h5 className="text-white fw-bold mb-3 fs-4">
                Integrate external resources here
                {/* Upload documents
              Previous Documents */}
              </h5>
            </div>
            <div className="row">
              <div className="col-4 mt-3">
                <div class="form-check custom_checkbox">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="flexRadioDefault"
                    id="flexRadioDefault1"
                    checked={suppertingInput?.updateDoc}
                    onClick={() => {
                      suppertingOnclick(updateDocN);
                    }}
                  />
                  <label class="form-check-label" for="flexRadioDefault1">
                    Upload documents
                  </label>
                </div>
                <div class="old-docs mt-2" onClick={handleShowPopUp}>
                  <a href="javascript:void(0);">
                    <svg
                      width="17"
                      height="20"
                      viewBox="0 0 17 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M11.6875 2H2.125V18H14.875V5H11.6875V2ZM2.125 0H12.75L17 4V18C17 18.5304 16.7761 19.0391 16.3776 19.4142C15.9791 19.7893 15.4386 20 14.875 20H2.125C1.56141 20 1.02091 19.7893 0.622398 19.4142C0.223883 19.0391 0 18.5304 0 18V2C0 1.46957 0.223883 0.960859 0.622398 0.585786C1.02091 0.210714 1.56141 0 2.125 0ZM4.25 9H12.75V11H4.25V9ZM4.25 13H12.75V15H4.25V13Z"
                        fill="#146EF5"
                      ></path>
                    </svg>
                    Previous Documents
                  </a>
                </div>
              </div>
              {/*
              <div className="col-4 mt-3">
                <div class="form-check custom_checkbox">
                  <input
                    class="form-check-input "
                    type="radio"
                    name="flexRadioDefault"
                    id="flexRadioDefault2"
                    onClick={() => {
                      suppertingOnclick(urlToWebPageN);
                    }}
                    checked={suppertingInput?.urlToWebPage}
                  />
                  <label class="form-check-label" for="flexRadioDefault2">
                    URLs to Web Page
                  </label>
                </div>
              </div>
              */}
              <div className="col-4 mt-3">
                <div class="form-check custom_checkbox">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="flexRadioDefault"
                    id="flexRadioDefault3"
                    onClick={() => {
                      suppertingOnclick(pmsIntegrationN);
                    }}
                    checked={suppertingInput?.pmsIntegration}
                  />
                  <label class="form-check-label" for="flexRadioDefault3">
                    PMS Integration
                  </label>
                </div>
              </div>
              <form>
                {suppertingInput?.updateDoc && (
                  <div className="col-12 mt-4 ">
                    <label className="text-white">
                      Documents <span>(.txt, .docx, .pdf supported)</span>
                    </label>
                    <div className="d-flex">
                      <div className="col-6 me-4">
                        <input
                          type="file"
                          id="fileInput"
                          className="form-control"
                          onChange={(e) => setFile(e.target.files[0])}
                          // {...register("docx")}
                        />
                      </div>
                      <div className="col-3">
                        {!docUploadIsLoading ? (
                          <button
                            className="btn btn-primary"
                            onClick={(e) =>
                              handleSubmitForm(e, suppertingInput)
                            }
                          >
                            {"Submit File"}
                          </button>
                        ) : (
                          <>
                            <span style={{ color: "white" }}>
                              Submitting...
                            </span>
                            <BoxLoader />
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {suppertingInput?.urlToWebPage && (
                  <div className="col-12 mt-4 ">
                    <label className="text-white">Enter URL</label>
                    <div className="">
                      <input
                        className="bg-dark form-control"
                        type="text"
                        // {...register("url")}
                        value={uploadedUrl}
                        onChange={(e) => setUploadedUrl(e.target.value)}
                        placeholder="Eg.example.com"
                      />
                    </div>
                  </div>
                )}

                {suppertingInput?.pmsIntegration && (
                  <>
                    {prevLinkedIntegration ? ( // If already linked to an integration property: show the name of the linked integration property and option to unlink
                      <>
                        <div className="row">
                          <div className="col-6 mt-4 ">
                            <p style={{ color: "white", marginTop: "10px" }}>
                              Linked to property: {prevLinkedIntegration}
                            </p>
                          </div>
                          <div className="col-6 mt-4 ">
                            {unlinkIsLoading ? (
                              <>
                                <p
                                  style={{ color: "white", marginTop: "20px" }}
                                >
                                  Unlinking...
                                </p>
                                <BoxLoader />
                              </>
                            ) : (
                              <button
                                className="UnlinkPMSButton"
                                onClick={(e) =>
                                  unlink_integration(
                                    e,
                                    supportingNameKey?.nameKey
                                  )
                                }
                              >
                                Unlink
                              </button>
                            )}
                          </div>
                        </div>
                      </>
                    ) : (
                      // If not linked to n integration property: show a select with the list of integration properties (pulled from the backend API)
                      <>
                        {!integrationPropertiesLoading ? (
                          <>
                            <div className="col-12 mt-4 ">
                              {/* Vertical spacer */}
                            </div>
                            <div class="property_select">
                              {integrationPropertyList?.length > 0 ? (
                                <select
                                  id="integration_property_select"
                                  style={{ marginTop: "20px", width: "70%" }}
                                  class="form-select form-control"
                                  onChange={(e) =>
                                    setSelectedIntegrationPropertyId(
                                      e.target.value
                                    )
                                  }
                                >
                                  {integrationPropertyList?.map((property) => {
                                    // Each option shows the integration property name, but uses the integration property ID as the value
                                    return (
                                      <option
                                        key={property.id}
                                        value={property.id}
                                      >
                                        {property.name}
                                      </option>
                                    );
                                  })}
                                </select>
                              ) : (
                                <div
                                  style={{
                                    color: "white",
                                    marginTop: "20px",
                                    wordWrap: "break-word",
                                    width: "100%",
                                  }}
                                >
                                  User account does not have a PMS integration.
                                  Connect your account to a PMS from the
                                  Properties page first, then you can this
                                  property to a property listing on the
                                  integration account here.
                                </div>
                              )}
                            </div>
                            <div className="col-4 mt-4 ">
                              {integrationPropertyList?.length > 0 &&
                                (linkIsLoading ? (
                                  <>
                                    <p
                                      style={{
                                        color: "white",
                                        marginTop: "20px",
                                      }}
                                    >
                                      Linking...
                                    </p>
                                    <BoxLoader />
                                  </>
                                ) : (
                                  <button
                                    className="LinkPMSButton"
                                    onClick={(e) =>
                                      link_integration(
                                        e,
                                        supportingNameKey?.nameKey,
                                        selectedIntegrationPropertyId
                                      )
                                    }
                                  >
                                    Link To This Property
                                  </button>
                                ))}
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="col-12 mt-4 ">
                              {/* Vertical spacer */}
                            </div>
                            <p style={{ color: "white", marginTop: "20px" }}>
                              Loading integration properties...
                            </p>
                            <BoxLoader />
                          </>
                        )}
                      </>
                    )}
                  </>
                )}

                <div className="col-lg-12 text-center">
                  <div className="mt-5"></div> {/* vertical spacer */}
                  {(!(linkIsLoading || unlinkIsLoading || (!prevLinkedIntegration && integrationPropertiesLoading))) && ( // hide Save & Next if loading something - but no need to hide if integrationPropertiesLoading but we're already linked to an integration property
                    <button
                      className="btn btn-primary mt-5"
                      onClick={(e) => save_and_next(e)}
                    >
                      {!supportingLoading ? "Save & Next" : <Loader />}
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <DochideForReservationsModel
        show={showDocHideForResrv}
        setShow={setDocHideForResrv}
        documentUploadMainHndle={documentUploadMainHndle}
        btnLoading={docUploadIsLoading}
      />
      {showPreviousDoc && (
        <PopupModal
          show={showPreviousDoc}
          setShow={setShowPreviousDoc}
          prevUploadedDoc={prevUploadedDoc}
          supportingDocsObj={hideForReservation}
          deleteResAfterPreviousDocCall={deleteResAfterPreviousDocCall}
          previouslyGetApiLoading={previouslyGetApiLoading}
        />
      )}
    </>
  );
};

export default SupportingDocForm;
