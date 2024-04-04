import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function AddPropertyModal({ handleClose, show }) {
  return (
    <Modal
      show={show}
      size="lg"
      onHide={handleClose}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body>
        <Modal.Header closeButton>
          <h5 className="modal-title">Your Plan</h5>
        </Modal.Header>
        
          <div className="upgrade-plan-box plan-box">
            <div className="membership-list">
              <div className="form-design mt-3 text-start">
                <label htmlFor="">Choose How Many Properties Want To Add</label>
                <input
                  type="number"
                  name="num-of-properties"
                  id="num-of-properties"
                  placeholder="Enter or select"
                  class="form-control pricing_range"
                  max="50"
                  min="1"
                />
              </div>
              <div className="form-design mt-3 text-start">
                <label htmlFor="">Select Plan</label>
                <select
                  id="selected_plan_stripe"
                  name="selected_plan_stripe"
                  class="form-control"
                >
                  <option value="">The Essentials</option>
                  <option value="">The Works</option>
                </select>
              </div>
              <div className="form-design mt-3 text-center">
                <button type="submit">Subscribe Now</button>
              </div>
            </div>
          </div>
        </Modal.Body>
    </Modal>
  );
}

export default AddPropertyModal;
