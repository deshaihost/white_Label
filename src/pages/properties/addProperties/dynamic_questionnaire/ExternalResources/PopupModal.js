import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import ToastHandle from "../../../../../helper/ToastMessage";
import { MdDeleteOutline } from "react-icons/md";
import { useSelectorUseDispatch } from "../../../../../helper/Authorized";
import { removeSupportingDocsActions, stateEmptyActions } from "../../../../../redux/actions";
import { FullScreenLoader } from "../../../../../helper/Loader";
import { GoArrowUpRight } from "react-icons/go";

const PopupModal = ({ show, setShow, prevUploadedDoc, supportingDocsObj, deleteResAfterPreviousDocCall, previouslyGetApiLoading, property_name }) => {
  const [data, setData] = useState([]);
  const { store, dispatch } = useSelectorUseDispatch();
  const removeSupportingDocsStatus = store?.removeSupportingDocsReducer?.removeSupportingDocs?.status;
  const removeSupportingDocsLoading = store?.removeSupportingDocsReducer?.loading;

  const documentRemoveHandle = (docName) => {
    dispatch( removeSupportingDocsActions({ newPropertyNm: property_name, doc_name: docName }) );
  };

  const openTextHandle = (textUrlGet) => {
    if (textUrlGet) { window.open(textUrlGet, "_blank"); }
  };

  useEffect(() => {
    if (prevUploadedDoc) { setData(prevUploadedDoc); }
  }, [prevUploadedDoc]);

  useEffect(() => {
    if (removeSupportingDocsStatus === 200) {
      ToastHandle("File deleted successfully", "success");
      dispatch(stateEmptyActions());
      deleteResAfterPreviousDocCall();
    } else if (removeSupportingDocsStatus === 500) {
      ToastHandle("500 Internal Server Error", "danger");
      dispatch(stateEmptyActions());
    }
  }, [removeSupportingDocsStatus]);


  return (
    <div>
      <Modal show={show} size="lg" onHide={() => setShow(false)} centered aria-labelledby="contained-modal-title-vcenter" >
        <Modal.Body>
          {previouslyGetApiLoading && <FullScreenLoader />}
          {removeSupportingDocsLoading && <FullScreenLoader />}
          <div className="6">
            <h5 className="text-white text-center">
              Documents Uploaded For This Property
            </h5>
          </div>
          <div className="d-flex flex-column pt-4 gap-3 text-light" style={{ cursor: "default", userSelect: "none" }}></div>
          {data.length !== 0 ? (
            <div className="table-responsive">
              <table class="table text-white action-items-table ">
                <thead className="border-bottom">
                  <tr>
                    <th>File Name</th>
                    <th>Hidden Reservation Stages</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {Object?.keys(supportingDocsObj)?.map((docName) => {
                    const hideForReservationGet = supportingDocsObj[docName]?.hide_for_reservations;
                    const textUrlGet = supportingDocsObj[docName]?.text_data_url;
                    return (
                      <>
                        <tr>
                          <td>{docName}</td>

                          <td className="text-center">
                            {hideForReservationGet?.join(", ")}
                          </td>
                          <td className="text-center">
                            <span className="mainCursor me-3" onClick={() => { openTextHandle(textUrlGet); }} >
                              <GoArrowUpRight className="text-white fs-6" />
                            </span>
                            <span className="mainCursor" onClick={() => { documentRemoveHandle(docName); }} >
                              <MdDeleteOutline />
                            </span>
                          </td>
                        </tr>
                      </>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="d-flex row text-white"> No files Uploaded </div>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default PopupModal;
