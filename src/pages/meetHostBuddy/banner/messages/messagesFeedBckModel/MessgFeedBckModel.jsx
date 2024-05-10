import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { useSelector, useDispatch } from "react-redux";
import { messageFeedBackActions } from "../../../../../redux/actions";
import ToastHandle from "../../../../../helper/ToastMessage";
const MessgFeedBckModel = ({ show, handleClose, feedBackDataGet }) => {
  const store = useSelector((state) => state);
  const dispatch = useDispatch();
  const { typeThumbs, messageId, conversationId, propertyName } =
    feedBackDataGet ? feedBackDataGet : [];

  const [feedBackInput, setFeedBackInput] = useState("");
  const [feedBackThanks, setFeedBackThanks] = useState(false);
  const feedBackMainHndl = () => {
    if (feedBackInput !== "") {
      let FeedBackData = {
        conversation_id: conversationId,
        message_id: messageId,
        thumbs: typeThumbs,
        text: feedBackInput,
      };
      dispatch(
        messageFeedBackActions({
          propertyNm: propertyName,
          FeedBackData,
        })
      );
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
    <Modal
      show={show}
      size="lg"
      onHide={() => closeFeedBackModel()}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <h5 className="modal-title">Message Feedback</h5>
      </Modal.Header>
      <Modal.Body>
        {feedBackThanks ? (
          <>
            <div>
              <div>
                <h1 className="text-white text-center">Thank you</h1>
              </div>
              <div>
                <div className="d-flex justify-content-center mt-3">
                  <button
                    className="mw-auto btn btn-primary "
                    onClick={closeFeedBackModel}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="form-design">
            <label>
              <span>
                <i
                  class={
                    typeThumbs === "up"
                      ? "bi bi-hand-thumbs-up mainCursor text-danger"
                      : "bi bi-hand-thumbs-up mainCursor"
                  }
                ></i>
              </span>
              <span>
                <i
                  class={
                    typeThumbs === "down"
                      ? "bi bi-hand-thumbs-down mainCursor text-danger"
                      : "bi bi-hand-thumbs-down mainCursor"
                  }
                  // onClick={() => feedBckModelOpen(key)}
                ></i>
              </span>
            </label>
            <textarea
              className="form-control"
              // name={noteClickData?.name}
              id=""
              cols="30"
              rows="10"
              placeholder="Enter note here..."
              // value={noteData || ""}
              onChange={(e) => setFeedBackInput(e.target.value)}
            ></textarea>
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
