import { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import { postCreateCheckoutSessionActions } from "../../../redux/pages/pagesApis/actions";
import { stateEmptyActions } from "../../../redux/actions";
import Loader from "../../../helper/Loader";

// Shown when user clicks "Confirm" in AddPropertyModal. Asks user to confirm they want to add properties, and directs them to Stripe payment portal to complete registration payment
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
        window.gtag_report_conversion(null, 'go-to-checkout', false); // Report the checkout start to Google Ads
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
        </div>
        <div className="d-flex align-items-center justify-content-left gap-2 flex-wrap" style={{ marginTop: '20px' }}>
          <span className="text-white">
            By continuing, you agree to our 
            <a href="/termsof-service" target="_blank" className="text-blue"> Terms of Service </a> 
            and 
            <a href="/privacy-policy" target="_blank" className="text-blue"> Privacy Policy </a>
            .
          </span>
        </div>
        <div className="text-center mt-3 addition_des_button">
          <button
            type="submit"
            className="bg_theme_btn mb-3"
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
