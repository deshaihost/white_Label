import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Link } from "react-router-dom";

function AddNewPropertyModal({ handleClose, show }) {
    return (
        <Modal
            show={show}
            size="lg"
            onHide={handleClose}
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <h5 className="modal-title">New Property Addition Confirmation</h5>
            </Modal.Header>
            <Modal.Body>
                <div className="addition_des">
                    <p>Before proceeding to add a new property, please review and confirm the details below:</p>
                    <p><strong>Billing Information:</strong></p>
                    <ol>
                        <li><strong>Your Plan:</strong> <span class="user-cur-plan">The Essentials</span></li>
                        <li><strong>Total Properties:</strong> <span class="user-total-properties">5</span></li>

                        <li><strong>Price Per Property:</strong> <span class="user-per-property-price">10</span></li>

                        <li><strong>Prorated Cost:</strong> <span class="user-eta-cost">50</span></li>
                    </ol>
                    <p>By clicking the “Proceed to Checkout” button, you confirm that you have read, understood, and agreed to the <Link to="https://hostbuddy.ai/terms-of-service/" target="_blank">terms of service.</Link></p>
                </div>
                <div className="text-center mt-3 addition_des_button">
                    <button type="submit" className="bg_theme_btn">Confirm</button>
                </div>
            </Modal.Body>
        </Modal>
    );
}

export default AddNewPropertyModal;
