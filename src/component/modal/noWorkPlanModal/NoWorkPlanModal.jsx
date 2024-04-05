import Modal from "react-bootstrap/Modal";
import NoPlanImg from '../../../public/img/503.png';
import { Link } from "react-router-dom";

function NoWorkPlanModal({ handleNoPlanClose, showNoPlan }) {
  return (
    <Modal
      show={showNoPlan}
      size="lg"
      onHide={()=>handleNoPlanClose("pmsIntegrationClose")}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body>
        
          <div className="upgrade-plan-box">
            <img src={NoPlanImg} alt='no-plan' />
            <p>You are not on Works plan, Please upgrade plan to access this feature </p>
            <Link to='/' className="bg_theme_btn manage-subscription">Upgrade Plan</Link>
          </div>
        </Modal.Body>
    </Modal>
  );
}

export default NoWorkPlanModal;
