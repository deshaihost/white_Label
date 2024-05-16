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
  const checkPmsNotEmpty =
    store?.pmsIntegrationGetReducer?.pmsIntegrationData?.data?.integrations;
  const pmsIntegrationLoading = store?.pmsIntegrationGetReducer?.loading;
  const dispatch = useDispatch();

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
            {checkPmsNotEmpty !== "" ? (
              <IntegratePlatformSelect handleNoPlanClose={handleNoPlanClose} />
            ) : (
              <div className="upgrade-plan-box">
                <img src={NoPlanImg} alt="no-plan" />
                <p>
                  You are not on The Works plan, Please upgrade plan to access this
                  feature{" "}
                </p>
                <Link to="/" className="bg_theme_btn manage-subscription">
                  Upgrade Plan
                </Link>
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
