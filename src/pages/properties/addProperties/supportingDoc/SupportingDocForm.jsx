import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  supportingDocumentPostActions,
  supportingUrlPostActions,
} from "../../../../redux/actions";
import { useSelectorUseDispatch } from "../../../../helper/Authorized";
import { nameKey } from "../../../../helper/Authorized";
import ToastHandle from "../../../../helper/ToastMessage";
import Loader from "../../../../helper/Loader";
import { stateEmptyActions } from "../../../../redux/actions";
const SupportingDocForm = () => {
  const { store, dispatch } = useSelectorUseDispatch();

  const supportingNameKey = nameKey();
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

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    let supportingkeyName = supportingNameKey?.nameKey;
    if (suppertingInput.updateDoc) {
      const formData = new FormData();
      formData.append("filess", data.docx[0]);
      dispatch(supportingDocumentPostActions({ supportingkeyName, formData }));
    } else if (suppertingInput.urlToWebPage) {
      dispatch(
        supportingUrlPostActions({
          supportingkeyName,
          data: { url: data.url },
        })
      );
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
        <div className="col-12 border p-5">
          <div>
            <h5 className="text-white">
              Choose one of the method as supporting doc Upload documents
              Previous Documents
            </h5>
          </div>
          <div className="row">
            <div className="col-3">
              <div class="form-check">
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
              <div class="form-check">
                <input
                  class="form-check-input"
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
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="radio"
                  name="flexRadioDefault"
                  id="flexRadioDefault2"
                  onClick={() => {
                    suppertingOnclick(pmsIntegrationN);
                  }}
                  checked={suppertingInput?.pmsIntegration}
                />
                <label class="form-check-label" for="flexRadioDefault2">
                  PMS Integration
                </label>
              </div>
            </div>
            <form
              onSubmit={handleSubmit(
                (data) => {
                  onSubmit(data);
                },
                (err) => {
                  console.log(err, "ee");
                }
              )}
            >
              {suppertingInput?.updateDoc && (
                <div className="col-10 mt-5 ">
                  <div className="text-white">
                    Supporting Documents (.txt, .docx, .pdf supported)
                  </div>
                  <div className="input-container">
                    <input type="file" {...register("docx")} />
                  </div>
                </div>
              )}
              {suppertingInput?.urlToWebPage && (
                <div className="col-10 mt-5 ">
                  <div className="text-white">Enter URL</div>
                  <div className="input-container">
                    <input
                      className="bg-dark"
                      type="text"
                      {...register("url")}
                      placeholder="Eg.example.com"
                    />
                  </div>
                </div>
              )}
              {suppertingInput?.pmsIntegration && (
                <div className="col-10 mt-5 ">
                  <div className="text-white">PMS Integration</div>
                  <div className="input-container">
                    <input
                      className="bg-dark"
                      disabled
                      value="Cloudbeds"
                      type="text"
                    />
                  </div>
                </div>
              )}
              <button className="btn btn-primary mt-5">
                {" "}
                {!supportingLoading ? "save & Next" : <Loader />}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportingDocForm;
