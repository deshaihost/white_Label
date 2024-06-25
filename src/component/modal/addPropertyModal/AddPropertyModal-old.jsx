import Modal from "react-bootstrap/Modal";
import { useForm } from "react-hook-form";
import { ErrorMessageKey } from "../../../helper/ErrorMessageKey";
import ErrorMessageShow from "../../../helper/ErrorMessageShow";
import AddNewPropertyModal from "../addNewPropertyModal/AddNewPropertyModal";
import { useState } from "react";

// Shown when user clicks "Add property" if they have no active subscription. Asks user to select a plan and number of properties to add, with Submit button which opens a confirmation modal (AddNewPropertyModal)
function AddPropertyModalOld({ handleClose, show, subscription_data }) {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const [confirmPropertyModel, setConfirmPropertyModel] = useState({ status: false, items: "" });
  const [selectedPlan, setSelectedPlan] = useState('');

  const handlePlanChange = (event) => {
    setSelectedPlan(event.target.value);
    console.log('etv', event.target.value);
    console.log('selectedPlan', selectedPlan);
  };

  const onSubmit = (data) => {
    setConfirmPropertyModel({ ...confirmPropertyModel, status: true, items: data });
    handleClose("addPropertyClose");
  };

  const handleModelClose = () => {
    setConfirmPropertyModel({
      status: false,
      items: "",
    });
  };

  return (
    <>
      <Modal
        show={show}
        size="lg"
        onHide={() => handleClose("addPropertyClose")}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <h5 className="modal-title">Add Properties</h5>
        </Modal.Header>
        <Modal.Body>
          {subscription_data?.num_properties_allowed == 0 || subscription_data?.num_properties_allowed === undefined ? (
            <form
              onSubmit={handleSubmit(
                (data) => {
                  onSubmit(data);
                },
                (err) => {
                  console.log(err, "ee");
                }
              )}
            >
              <div className="upgrade-plan-box plan-box">
                <div className="membership-list">
                  <div className="form-design mt-3 text-start">
                    <label htmlFor="">
                      Choose How Many Properties To Add
                    </label>
                    <input type="number" name="num-of-properties" id="num-of-properties" placeholder="Enter or select" className="form-control pricing_range"
                      {...register("num_properties", {
                        required: true,
                        max: 1000,
                        min: 1,
                      })}
                    />
                    {errors.num_properties?.type === "required" && (
                      <>
                        {" "}
                        {ErrorMessageShow(ErrorMessageKey.THIS_FIELD_REQUIRED)}
                      </>
                    )}
                    {errors.num_properties?.type === "min" && (
                      <>
                        {" "}
                        {ErrorMessageShow(
                          ErrorMessageKey.PLEASE_SELECT_OR_ENTER_HOW_MANY_PROPERTIES_WANT_TO_ADD
                        )}
                      </>
                    )}
                    {errors.num_properties?.type === "max" && (
                      <>
                        {" "}
                        {ErrorMessageShow(
                          ErrorMessageKey.ONLY_FIVETY_PROPERTIES_CAN_BE_ADDED
                        )}
                      </>
                    )}
                  </div>
                  <div className="form-design mt-3 text-start">
                    <label htmlFor="">Select Plan</label>
                    <select id="selected_plan_stripe" name="selected_plan_stripe" className="form-control" onChange={handlePlanChange}
                      {...register("subscription_plan", {
                        required: "Please select a plan.",
                      })}
                    >
                      <option value="" disabled style={{color: 'rgb(180, 180, 180)'}}>-- Please Select --</option>
                      <option value="The Essentials">The Essentials</option>
                      <option value="The Works">The Works</option>
                      <option value="The Works Unlimited">The Works Unlimited</option>
                    </select>
                  </div>
                  {errors.subscription_plan?.type === "required" && (
                    <>
                      {ErrorMessageShow(ErrorMessageKey.PLEASE_ONE_PLAN_SELECT)}
                    </>
                  )}

                  {selectedPlan === "The Essentials" ? (
                    <h6 style={{color:'white', marginTop:'30px', marginBottom:'30px'}}>
                      State of the art AI, tailored to your properties. Make HostBuddy available to your guests 24/7 by sharing a property-specific URL, where they can access their HostBuddy chat window. PMS integration and messaging not supported.
                    </h6>
                  ) : selectedPlan === "The Works" ? (
                    <h6 style={{color:'white', marginTop:'30px', marginBottom:'30px'}}>
                      State of the art AI, tailored to your properties. Make HostBuddy available to your guests 24/7 by sharing a property-specific URL, where they can access their HostBuddy chat window. PMS integration and messaging supported.
                    </h6>
                  ) : selectedPlan === "The Works Unlimited" ? (
                    <h6 style={{color:'white', marginTop:'30px', marginBottom:'30px'}}>
                      State of the art AI, tailored to your properties. Make HostBuddy available to your guests 24/7 by sharing a property-specific URL, where they can access their HostBuddy chat window. PMS integration and messaging supported. Unlimited properties.
                    </h6>
                  ) : null}

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
      <AddNewPropertyModal
        handleClose={handleModelClose}
        show={confirmPropertyModel?.status}
        planModelDataSend={confirmPropertyModel}
      />
    </>
  );
}

export default AddPropertyModalOld;
