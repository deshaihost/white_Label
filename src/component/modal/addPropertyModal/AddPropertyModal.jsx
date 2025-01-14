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

  const handleNumberChange = (e) => {
    const value = Math.max(1, parseInt(e.target.value) || 1);
    setNumProperties(value);
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
          {(['trial', 'trial_over', 'subscription_over'].includes(subscription_data.plan) || ['canceled'].includes(subscription_data.status)) ? ( // user not subscribed - give them the option to subscribe
            <form onSubmit={onSubmit}>
              <div className="upgrade-plan-box plan-box">
                <div className="membership-list">
                  <div className="form-design mt-3 text-start">
                    <label htmlFor="">
                      Choose How Many Properties To Add
                    </label>
                    <input type="number" name="num-of-properties" id="num-of-properties" min="1" placeholder="Enter or select" className="form-control pricing_range" value={numProperties} onChange={handleNumberChange}/>
                    {errors.num_properties && (
                      <>{ErrorMessageShow(errors.num_properties)}</>
                    )}
                  </div>
                  <div className="form-design mt-3 text-start">
                    <label htmlFor="">Select Plan</label>
                    <select id="selected_plan_stripe" name="selected_plan_stripe" className="form-control" onChange={handlePlanChange} value={subscriptionPlan}>
                      <option value="" disabled style={{color: 'rgb(180, 180, 180)'}}>-- Please Select --</option>
                      <option value="HostBuddy Pro">HostBuddy Pro</option>
                      <option value="HostBuddy Elite">HostBuddy Elite</option>
                    </select>
                  </div>
                  {errors.subscription_plan && (
                    <>{ErrorMessageShow(errors.subscription_plan)}</>
                  )}

                  {subscriptionPlan && (
                    <div className="plan-info-box">
                      <h3>{subscriptionPlan}</h3>
                      {subscriptionPlan === "HostBuddy Pro" ? (
                        <>
                          <h6>Unlimited access to HostBuddy's AI messaging and core automation features.
                          <br/><br/>
                          Leverage additional revenue-driving features: Smart templating, upsells, action items and notifications, review removal support.
                          <br/><br/>
                          <span style={{ color: 'rgb(255, 165, 0)' }}>View-only</span> Smart Inbox. View your conversations, review HostBuddy's messages, and see AI-detected action items and sentiment analysis.</h6>
                        </>
                      ) : subscriptionPlan === "HostBuddy Elite" ? (
                        <>
                          <h6>Your Complete AI Guest Communication Suite. Everything in Pro, plus:
                          <br/><br/>
                          <strong>Full Functionality Smart Inbox.</strong> Send messages to your guests, and generate AI responses from your command or from scratch to maximize efficiency.
                          <br/><br/>
                          <strong>AI-Driven Business Intelligence.</strong> Unlock a wealth of new insights into your business with comprehensive analytics. Delve into data on your guest satisfaction rates, message timing, and more.</h6>
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
          ) : ( // user is subscribed - show them the option to add a new property
            <div className="d-flex flex-column justify-content-center">
              <p style={{ color: 'white', marginBottom: '20px', textAlign: 'center' }}> 
                To add a new property: import from your PMS below, or click "Edit" in the blank listing at the bottom of the properties list to add without a PMS.
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