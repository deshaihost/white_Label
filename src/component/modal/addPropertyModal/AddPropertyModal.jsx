import Modal from "react-bootstrap/Modal";
import { useForm } from "react-hook-form";
import { ErrorMessageKey } from "../../../helper/ErrorMessageKey";
import ErrorMessageShow from "../../../helper/ErrorMessageShow";
import AddNewPropertyModal from "../addNewPropertyModal/AddNewPropertyModal";
import { useState } from "react";
import { Link } from "react-router-dom";

function AddPropertyModal({ handleClose, show, handleSubscribe }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [confirmPropertyModel, setConfirmPropertyModel] = useState({
    status: false,
    items: "",
  });
  const onSubmit = (data) => {
    setConfirmPropertyModel({
      ...confirmPropertyModel,
      status: true,
      items: data,
    });
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
          <h5 className="modal-title">Your Plan</h5>
        </Modal.Header>
        <Modal.Body>
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
                    Choose How Many Properties Want To Add
                  </label>
                  <input
                    type="number"
                    name="num-of-properties"
                    id="num-of-properties"
                    placeholder="Enter or select"
                    className="form-control pricing_range"
                    {...register("num_properties", {
                      required: true,
                      max: 100,
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
                  <select
                    id="selected_plan_stripe"
                    name="selected_plan_stripe"
                    className="form-control"
                    {...register("subscription_plan", {
                      required: true,
                    })}
                  >
                    <option value="The Essentials">The Essentials</option>
                    <option value="The Works">The Works</option>
                  </select>
                </div>
                {errors.subscription_plan?.type === "required" && (
                  <>
                    {ErrorMessageShow(ErrorMessageKey.PLEASE_ONE_PLAN_SELECT)}
                  </>
                )}
                <div className="form-design mt-3 text-center">
                  <button type="submit">Subscribe Now</button>
                </div>
              </div>
            </div>
          </form>

          {/* Don't show ToS and priv policy here, we'll show in the next modal
          <div className="d-flex align-items-center justify-content-center gap-2 flex-wrap">
          <Link to="/privacy-policy" className="text-blue">Privacy Policy</Link>
          <span className="text-white">|</span>
          <Link to="/termsof-service" className="text-blue">Terms of Service</Link>
          </div>
          */}
          
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

export default AddPropertyModal;
