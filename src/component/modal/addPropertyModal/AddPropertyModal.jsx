import Modal from "react-bootstrap/Modal";
import { useState } from "react";
import { ErrorMessageKey } from "../../../helper/ErrorMessageKey";
import ErrorMessageShow from "../../../helper/ErrorMessageShow";
import AddNewPropertyModal from "../addNewPropertyModal/AddNewPropertyModal";
import "./AddPropertyModal.css";

// Shown when user clicks "Add property" if they have no active subscription. Asks user to select a plan and number of properties to add, with Submit button which opens a confirmation modal (AddNewPropertyModal)
function AddPropertyModal({ handleClose, show, subscription_data }) {
  const [numProperties, setNumProperties] = useState("");
  const [subscriptionPlan, setSubscriptionPlan] = useState("");
  const [errors, setErrors] = useState({});
  const [confirmPropertyModel, setConfirmPropertyModel] = useState({ status: false, items: "" });

  const handlePlanChange = (event) => {
    setSubscriptionPlan(event.target.value);
  };

  const validateForm = () => {
    let formErrors = {};
    if (!numProperties) { formErrors.num_properties = ErrorMessageKey.THIS_FIELD_REQUIRED; }
    else if (numProperties < 1) { formErrors.num_properties = ErrorMessageKey.PLEASE_SELECT_OR_ENTER_HOW_MANY_PROPERTIES_WANT_TO_ADD; }
    else if (numProperties > 1000) { formErrors.num_properties = ErrorMessageKey.ONLY_FIVETY_PROPERTIES_CAN_BE_ADDED; }
    if (!subscriptionPlan) { formErrors.subscription_plan = ErrorMessageKey.PLEASE_ONE_PLAN_SELECT; }
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const onSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      setConfirmPropertyModel({ status: true, items: { num_properties: numProperties, subscription_plan: subscriptionPlan } });
      handleClose("addPropertyClose");
    }
  };

  const handleModelClose = () => {
    setConfirmPropertyModel({ status: false, items: "" });
  };

  return (
    <>
      <Modal show={show} size="lg" onHide={() => handleClose("addPropertyClose")} aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Header closeButton>
          <h5 className="modal-title">Subscribe</h5>
        </Modal.Header>
        <Modal.Body>
          {subscription_data?.num_properties_allowed == 0 || subscription_data?.num_properties_allowed === undefined ? (
            <form onSubmit={onSubmit}>
              <div className="upgrade-plan-box plan-box">
                <div className="membership-list">
                  <div className="form-design mt-3 text-start">
                    <label htmlFor="">
                      Choose How Many Properties To Add
                    </label>
                    <input type="number" name="num-of-properties" id="num-of-properties" placeholder="Enter or select" className="form-control pricing_range" value={numProperties} onChange={(e) => setNumProperties(e.target.value)}/>
                    {errors.num_properties && (
                      <>{ErrorMessageShow(errors.num_properties)}</>
                    )}
                  </div>
                  <div className="form-design mt-3 text-start">
                    <label htmlFor="">Select Plan</label>
                    <select id="selected_plan_stripe" name="selected_plan_stripe" className="form-control" onChange={handlePlanChange} value={subscriptionPlan}>
                      <option value="" disabled style={{color: 'rgb(180, 180, 180)'}}>-- Please Select --</option>
                      <option value="The Essentials">The Essentials</option>
                      <option value="The Works">The Works</option>
                      <option value="The Works Unlimited">The Works Unlimited</option>
                    </select>
                  </div>
                  {errors.subscription_plan && (
                    <>{ErrorMessageShow(errors.subscription_plan)}</>
                  )}

                  {subscriptionPlan && (
                    <div className="plan-info-box">
                      <h3>{subscriptionPlan}</h3>
                      {subscriptionPlan === "The Essentials" ? (
                        <>
                          <h6>State of the art AI, tailored to your properties.
                          <br/><br/>
                          Make HostBuddy available to your guests 24/7 by sharing a property-specific URL, where they can access their HostBuddy chat window.
                          <br/><br/>
                          PMS messaging not supported.</h6>
                        </>
                      ) : subscriptionPlan === "The Works" ? (
                        <>
                          <h6>State of the art AI, tailored to your properties.
                          <br/><br/>
                          Connect a PMS account to give HostBuddy access to property details and real-time guest information, and to let HostBuddy see and respond to guest messages over your existing communication channels.
                          <br/><br/>
                          Schedule the times of day/week for HostBuddy to automatically respond to guests, up to a maximum of 12 hours per day.</h6>
                        </>
                      ) : subscriptionPlan === "The Works Unlimited" ? (
                        <>
                          <h6>State of the art AI, tailored to your properties.
                          <br/><br/>
                          Connect a PMS account to give HostBuddy access to property details and real-time guest information, and to let HostBuddy see and respond to guest messages over your existing communication channels.
                          <br/><br/>
                          Schedule the times of day/week for HostBuddy to automatically respond to guests, with no daily limit.</h6>
                        </>
                      ) : null}
                    </div>
                  )}

                  <div className="form-design mt-3 text-center">
                    <button type="submit">Subscribe Now</button>
                  </div>
                </div>
              </div>
            </form>
          ) : (
            <div className="d-flex flex-column justify-content-center">
              <p style={{ color: 'white', marginBottom: '20px', textAlign: 'center' }}> 
                To add a new property, click on the "Edit" button in one of the blank listings below. 
              </p>
              <p style={{ color: 'white', textAlign: 'center' }}> 
                To add more usable listings, go to "Account" &gt; "Subscription" and purchase more properties for your account.
              </p>
            </div>
          )}
        </Modal.Body>
      </Modal>
      <AddNewPropertyModal handleClose={handleModelClose} show={confirmPropertyModel?.status} planModelDataSend={confirmPropertyModel}/>
    </>
  );
}

export default AddPropertyModal;