import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
// import "./calenderModel.css";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import ToastHandle from "../../../../helper/ToastMessage";
import axios from "axios";
import { MdDeleteOutline } from "react-icons/md";
import { nameKey, useSelectorUseDispatch } from "../../../../helper/Authorized";
import {
  removeSupportingDocsActions,
  stateEmptyActions,
} from "../../../../redux/actions";
import { FullScreenLoader } from "../../../../helper/Loader";
import { GoArrowUpRight } from "react-icons/go";

const PopupModal = ({ show, setShow, prevUploadedDoc, hideForReservation }) => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [documentLoading, setDocumentLoading] = useState(true);
  const { store, dispatch } = useSelectorUseDispatch();
  const removeSupportingDocsStatus =
    store?.removeSupportingDocsReducer?.removeSupportingDocs?.status;
  const removeSupportingDocsLoading =
    store?.removeSupportingDocsReducer?.loading;
  const nameKeyGet = nameKey();
  const documentRemoveHandle = (doc) => {
    dispatch(
      removeSupportingDocsActions({
        newPropertyNm: nameKeyGet?.nameKey,
        files: doc,
      })
    );
  };

  useEffect(() => {
    if (prevUploadedDoc) {
      setData(prevUploadedDoc);
    }
  }, [prevUploadedDoc]);

  useEffect(() => {
    if (removeSupportingDocsStatus === 200) {
      ToastHandle("Delete successfully", "success");
      dispatch(stateEmptyActions());
    } else if (removeSupportingDocsStatus === 500) {
      ToastHandle("500 Internal Server Error", "danger");
      dispatch(stateEmptyActions());
    }
  }, [removeSupportingDocsStatus]);

  useEffect(() => {
    if (data.length !== 0) {
      setTimeout(() => {
        setDocumentLoading(false);
      }, 2000);
      return;
    } else if (data.length === 0) {
      setTimeout(() => {
        setDocumentLoading(false);
      }, 2000);
      return;
    }
  }, [data.length]);

  return (
    <div>
      <Modal
        show={show}
        size="lg"
        onHide={() => setShow(false)}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body>
          {documentLoading && <FullScreenLoader />}
          {removeSupportingDocsLoading && <FullScreenLoader />}
          <div className="row py-3 border-bottom">
            <div className="6">
              <h6 className="text-white text-center">
                Documents Uploaded For This Property
              </h6>
            </div>
          </div>
          <div
            className="d-flex flex-column pt-4 gap-3 text-light"
            style={{ cursor: "default", userSelect: "none" }}
          ></div>
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
                  {Object?.keys(hideForReservation)?.map((property) => {
                    const hideForReservationGet =
                      hideForReservation[property]?.hide_for_reservations;
                    return (
                      <>
                        <tr>
                          <td>{property}</td>

                          <td className="text-center">
                            {hideForReservationGet?.map((itemss) => {
                              return `${itemss},`;
                            })}
                          </td>
                          <td className="text-center">
                            <span className="mainCursor me-3">
                              <GoArrowUpRight className="text-white fs-6" />
                            </span>
                            <span
                              className="mainCursor"
                              onClick={() => {
                                documentRemoveHandle([
                                  JSON.stringify(property),
                                ]);
                              }}
                            >
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
            <div className="d-flex row text-white">No files Uploaded </div>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default PopupModal;
