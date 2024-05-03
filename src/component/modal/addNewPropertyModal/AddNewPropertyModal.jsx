import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { postCreateCheckoutSessionActions } from "../../../redux/pages/pagesApis/actions";
import { stateEmptyActions } from "../../../redux/actions";
import Loader from "../../../helper/Loader";
function AddNewPropertyModal({ handleClose, show, planModelDataSend }) {
  const store = useSelector((state) => state);
  const dispatch = useDispatch();

  const striteUrlGet =
    store?.postcreateCheckoutSessionReducer?.createCheckoutSessionUrl?.data
      ?.checkout_session_url;
  const striteUrlLoading = store?.postcreateCheckoutSessionReducer?.loading;
  const [plantPring, setPlantPrint] = useState({
    yourPlan: "",
    TotalProperties: "",
    PricePerProperty: "",
    proratedCost: "",
  });

  const confirmHandle = () => {
    if (plantPring?.yourPlan !== "") {
      if (plantPring?.TotalProperties !== "") {
        dispatch(
          postCreateCheckoutSessionActions({
            subscription_plan: plantPring?.yourPlan,
            num_properties: JSON.parse(plantPring?.TotalProperties),
          })
        );
      }
    }
  };

  useEffect(() => {
    let PricePerProperty = 20;
    if (planModelDataSend?.items !== "") {
      const { num_properties, subscription_plan } =
        planModelDataSend?.items !== "" ? planModelDataSend?.items : [];
      const calculatPropratedCost = PricePerProperty * num_properties;
      setPlantPrint({
        ...plantPring,
        yourPlan: subscription_plan,
        TotalProperties: num_properties,
        PricePerProperty: PricePerProperty,
        proratedCost: calculatPropratedCost,
      });
    }
  }, [planModelDataSend]);

  useEffect(() => {
    if (striteUrlGet !== undefined) {
      dispatch(stateEmptyActions());
      window.location.href = striteUrlGet;
    }
  }, [striteUrlGet]);

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
          <p>
            You will be directed to the Stripe payment portal to securely complete your registration payment.
          </p>
          {/* <p>
            Before proceeding to add a new property, please review and confirm
            the details below:
          </p>
          <p>
            <strong>Billing Information:</strong>
          </p>
          <ol>
            <li>
              <strong>Your Plan:</strong>{" "}
              <span class="user-cur-plan">{plantPring?.yourPlan}</span>
            </li>
            <li>
              <strong>Total Properties:</strong>{" "}
              <span class="user-total-properties">
                {plantPring?.TotalProperties}
              </span>
            </li>

            <li>
              <strong>Price Per Property:</strong>{" "}
              <span class="user-per-property-price">
                {plantPring?.PricePerProperty}
              </span>
            </li>

            <li>
              <strong>Prorated Cost:</strong>{" "}
              <span class="user-eta-cost">{plantPring?.proratedCost}</span>
            </li>
          </ol>
          <p>
            By clicking the “Proceed to Checkout” button, you confirm that you
            have read, understood, and agreed to the{" "}
            <Link to="https://hostbuddy.ai/terms-of-service/" target="_blank">
              terms of service.
            </Link>
          </p> */}
        </div>
        <div className="text-center mt-3 addition_des_button">
          <button
            type="submit"
            className="bg_theme_btn"
            onClick={confirmHandle}
          >
            {!striteUrlLoading ? <>Confirm</> : <><Loader /></>}

          </button>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default AddNewPropertyModal;
