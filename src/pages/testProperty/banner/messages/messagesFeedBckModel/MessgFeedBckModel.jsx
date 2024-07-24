import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import {  useDispatch } from "react-redux";
import { messageFeedBackActions } from "../../../../../redux/actions";
import ToastHandle from "../../../../../helper/ToastMessage";
import { Link } from "react-router-dom";
const MessgFeedBckModel = ({ show, handleClose, feedBackDataGet }) => {
  const dispatch = useDispatch();
  const { typeThumbs, messageId, conversationId, propertyName } = feedBackDataGet ? feedBackDataGet : [];

  const [feedBackInput, setFeedBackInput] = useState("");
  const [feedBackThanks, setFeedBackThanks] = useState(false);
  const feedBackMainHndl = () => {
    if (feedBackInput !== "") {
      let FeedBackData = { conversation_id: conversationId, message_id: messageId, thumbs: typeThumbs, text: feedBackInput };
      dispatch( messageFeedBackActions({ propertyNm: propertyName, FeedBackData }) );
      setFeedBackThanks(true);
    } else {
      ToastHandle("Enter your FeedBack", "danger");
    }
  };

  const closeFeedBackModel=()=>{
    setFeedBackThanks(false)
    handleClose("addPropertyClose");
  }
  return (
    <Modal show={show} size="lg" onHide={() => closeFeedBackModel()} aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <h5 className="modal-title">Message Feedback</h5>
      </Modal.Header>
      <Modal.Body>
        {feedBackThanks ? (
          <>
            <div>
                <h3 className="text-white text-center" style={{marginBottom:"30px"}}>Feedback Submitted</h3>
                <p className="text-white text-center">Your feedback may not directly affect HostBuddy's responses. To manage or add to HostBuddy's knowledge base, edit the <Link to={`/edit-property/${propertyName}`}>property profile</Link>.</p>
            </div>
          </>
        ) : (
          <div className="form-design">
            <label>
              <span>
                <i class={ typeThumbs === "up" ? "bi bi-hand-thumbs-up mainCursor text-success" : "bi bi-hand-thumbs-up mainCursor" }></i>
              </span>
              <span>
                <i class={ typeThumbs === "down" ? "bi bi-hand-thumbs-down mainCursor text-danger" : "bi bi-hand-thumbs-down mainCursor" }></i>
              </span>
            </label>

            <textarea className="form-control" id="" cols="30" rows="10" placeholder="Enter note here..." onChange={(e) => setFeedBackInput(e.target.value)}></textarea>

            <p className="text-white text-center" style={{marginTop:"30px", marginBottom:"30px"}}>Your feedback may not directly affect HostBuddy's responses. To manage or add to HostBuddy's knowledge base, edit the <Link to={`/edit-property/${propertyName}`}>property profile</Link>.</p>

            <div className="d-flex justify-content-center mt-3">
              <button className="mw-auto" onClick={feedBackMainHndl}>
                Submit
              </button>
            </div>

          </div>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default MessgFeedBckModel;
