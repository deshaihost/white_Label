import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import {
  supportingDocumentPostActions,
  supportingUrlPostActions,
} from "../../../../redux/actions";
import { useSelectorUseDispatch } from "../../../../helper/Authorized";
import { nameKey } from "../../../../helper/Authorized";
import ToastHandle from "../../../../helper/ToastMessage";
import Loader from "../../../../helper/Loader";
import { stateEmptyActions } from "../../../../redux/actions";
// import ToastHandle from "../../../../helper/ToastMessage";

import axios from "axios";

const SupportingDocForm = ({ prntFuntionHeaderActive }) => {
  const { id } = useParams();

  const { store, dispatch } = useSelectorUseDispatch();

  const supportingNameKey = nameKey();
  const [uploadedDoc, setUploadedDoc] = useState();
  const [uploadedUrl, setUploadedUrl] = useState("");

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

  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  // } = useForm();

  // const onSubmit = (data) => {
  //   console.log(data, "data")
  //   return
  //   let supportingkeyName = supportingNameKey?.nameKey;
  //   if (suppertingInput.updateDoc) {
  //     const formData = new FormData();
  //     formData.append("filess", data.docx[0]);
  //     dispatch(supportingDocumentPostActions({ supportingkeyName, formData }));
  //   } else if (suppertingInput.urlToWebPage) {
  //     dispatch(
  //       supportingUrlPostActions({
  //         supportingkeyName,
  //         data: { url: data.url },
  //       })
  //     );
  //   }
  // };

  function isValidURL(url) {
    // Regular expression to match a period in the middle of the string
    return /^[^.].+?\..+[^.]$/.test(url);
  }

  const handleUploadUrl = async () => {
    if (!isValidURL(uploadedUrl)) {
      ToastHandle("Please enter valid webpage url.", "danger");
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
      console.log(error);
      if (error.status === 400) {
        ToastHandle(error?.data?.error, "danger");
      } else {
        ToastHandle("Something went wrong", "danger");
      }
    }
  };

  // documents upload handle
  const [docsInput, setDocsInput] = useState("");
  const documentUploadHandle = () => {
    let supportingkeyName = supportingNameKey?.nameKey;
    const formData = new FormData();
    formData.append("filess", docsInput?.[0]);
    dispatch(supportingDocumentPostActions({ supportingkeyName, formData }));
  };

  const handleSubmitForm = (e, uploadType) => {
    e.preventDefault();
    if (uploadType?.urlToWebPage) {
      handleUploadUrl();
    } else if (uploadType?.updateDoc) {
      documentUploadHandle();
    }
  };

  useEffect(() => {
    if (supportingStatus === 404) {
      ToastHandle(supportingUrlMessage, "danger");
      dispatch(stateEmptyActions());
    } else if (supportingStatus === 400) {
      ToastHandle(supportingUrlMessage, "danger");
      dispatch(stateEmptyActions());
    }
  }, [supportingStatus]);

  return (
    <div>
      <div className="row">
        <div className="col-12 form-design">
          <div>
            <h5 className="text-white fw-bold mb-3 fs-4">
              Choose one of the method as supporting doc
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
              <div class="old-docs mt-2">
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
                    Supporting Documents{" "}
                    <span>(.txt, .docx, .pdf supported)</span>
                  </label>
                  <div className="">
                    <input
                      type="file"
                      className="form-control"
                      onChange={(e) => setDocsInput(e.target.files)}
                      // {...register("docx")}
                    />
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
                <div className="col-12 mt-4 ">
                  <label className="text-white">PMS Integration</label>
                  <div className="">
                    <input
                      className="bg-dark form-control"
                      disabled
                      value="Cloudbeds"
                      type="text"
                    />
                  </div>
                </div>
              )}
              <div className="col-lg-12 text-center">
                <button
                  className="btn btn-primary mt-5"
                  onClick={(e) => handleSubmitForm(e, suppertingInput)}
                >
                  {" "}
                  {!supportingLoading ? "Save & Next" : <Loader />}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportingDocForm;
