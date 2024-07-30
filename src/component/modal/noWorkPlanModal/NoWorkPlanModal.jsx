import React, { useEffect } from "react";
import './NoWorkPlanModal.css'
import Modal from "react-bootstrap/Modal";
import NoPlanImg from "../../../public/img/503.png";
import { Link } from "react-router-dom";
import IntegratePlatformSelect from "./IntegratePlatform/IntegratePlatformSelect";
import { getPMSIntegrationActions } from "../../../redux/actions";
import { useSelector, useDispatch } from "react-redux";
import { BoxLoader } from "../../../helper/Loader";

function NoWorkPlanModal({ handleNoPlanClose, showNoPlan }) {
  const store = useSelector((state) => state);
  const checkPmsNotEmpty = store?.pmsIntegrationGetReducer?.pmsIntegrationData?.data?.integrations;
  const subscription_data = store?.getUserDataReducer?.getUserData?.data?.user?.subscription
  const pmsIntegrationLoading = store?.pmsIntegrationGetReducer?.loading;
  const dispatch = useDispatch();

  const subscription_plan = subscription_data?.plan;
  const isTheWorksPlan = subscription_plan === "The Works";

  useEffect(() => {
    if (showNoPlan) dispatch(getPMSIntegrationActions());
  }, [showNoPlan]);
  return (
    <Modal
      show={showNoPlan}
      size="md"
      onHide={() => handleNoPlanClose("pmsIntegrationClose")}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body>
        <h3 className="text-white text-center mb-4 fw-bold fs-4">Integrate Platform</h3>
        <hr />
        {!pmsIntegrationLoading ? (
          <>
            {true ? (
              <IntegratePlatformSelect handleNoPlanClose={handleNoPlanClose} />
            ) : (
              <div className="upgrade-plan-box">
                {/* <img src={NoPlanImg} alt="no-plan" /> */}
                <p style={{ fontSize: '1.1rem', lineHeight: '1.5' }}>
                  You are not on The Works plan. Please upgrade to this plan to access this feature.{" "}
                </p>
                <p style={{ fontSize: '1.1rem', lineHeight: '1.5' }}>
                  If you have not yet chosen a subscription plan, select "Subscribe" to choose your plan and begin your trial.{" "}
                </p>
                {/*
                <Link to="/" className="bg_theme_btn manage-subscription">
                  Upgrade Plan
                </Link>
                */}
              </div>
            )}
          </>
        ) : (
          <BoxLoader />
        )}
      </Modal.Body>
    </Modal>
  );
}

export default NoWorkPlanModal;
