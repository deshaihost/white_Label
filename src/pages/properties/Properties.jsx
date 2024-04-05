import React, {useState} from 'react'
import SideBar from '../../component/sideBar/SideBar';
import './properties.css';
import AddPropertyModal from '../../component/modal/addPropertyModal/AddPropertyModal';
import NoWorkPlanModal from '../../component/modal/noWorkPlanModal/NoWorkPlanModal';
import AddNewPropertyModal from '../../component/modal/addNewPropertyModal/AddNewPropertyModal';

const Properties = () => {
  const [show, setShow] = useState(false);
  const [showNoPlan, setShowNoPlan] = useState(false);
  const [showNewPropertyModal, setShowNewPropertyModal] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleNoPlanClose = () => setShowNoPlan(false);
  const handleNoPlanShow = () => setShowNoPlan(true);
  const handleAddPropertyShow = () => {
    handleClose();
    setShowNewPropertyModal(true);
  }

  const handleAddPropertyClose = () => setShowNewPropertyModal(false);
  return (
    <>
      <div className="account-main">
        <div className="container">
          <div className="banner-heading">
            <h2>My HostBuddy</h2>
            <p>Manage your profile here </p>
          </div>
          <div className="row">
            <div className="col-lg-4">
              <SideBar />
            </div>
            <div className="col-lg-8">
              <div className="account-container">
                <div className="account_heading">
                  <h3>Property Listing</h3>
                  <div className="property-heading-right">
                    <p>Hostbuddy Status</p>
                    <div className="form-check form-switch custom_switch">
                      <input
                        className="form-check-input toggle-user-chatbot"
                        type="checkbox"
                        role="switch"
                        id="statuscheck"
                      />
                      <label className="form-check-label" htmlFor="statuscheck">On</label>
                    </div>
                    <div className="expendable_search">
                        <button className="search_btn">
                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12.5 11H11.71L11.43 10.73C12.4439 9.55402 13.0011 8.0527 13 6.5C13 5.21442 12.6188 3.95772 11.9046 2.8888C11.1903 1.81988 10.1752 0.986756 8.98744 0.494786C7.79973 0.00281635 6.49279 -0.125905 5.23192 0.124899C3.97104 0.375703 2.81285 0.994767 1.90381 1.90381C0.994767 2.81285 0.375703 3.97104 0.124899 5.23192C-0.125905 6.49279 0.00281635 7.79973 0.494786 8.98744C0.986756 10.1752 1.81988 11.1903 2.8888 11.9046C3.95772 12.6188 5.21442 13 6.5 13C8.11 13 9.59 12.41 10.73 11.43L11 11.71V12.5L16 17.49L17.49 16L12.5 11ZM6.5 11C4.01 11 2 8.99 2 6.5C2 4.01 4.01 2 6.5 2C8.99 2 11 4.01 11 6.5C11 8.99 8.99 11 6.5 11Z" fill="#146EF5"></path>
                            </svg>
                        </button>
                        <input type="search" name="properties_search" placeholder="Search" id="search_field" />
                    </div>
                  </div>
                </div>
                <div className="addproperty_links text-center">
                  <button type='button'  onClick={() => handleShow()}>Add Property</button>
                  <button type='button' onClick={() => handleNoPlanShow()}>PMS Integration</button>
                </div>
                <div className="property_list">
                  <ul>
                    <li className="not-found">
                      <h4 className='text-center text-white'>No property found</h4>
                    </li>
                  </ul>
                </div>
                <div className="load_more"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {show && (
        <AddPropertyModal handleClose={handleClose} show={show} handleSubscribe={handleAddPropertyShow} />
      )}

      {showNoPlan && (
        <NoWorkPlanModal handleNoPlanClose={handleNoPlanClose} showNoPlan={showNoPlan} />
      )}

      {showNewPropertyModal && (
        <AddNewPropertyModal handleClose={handleAddPropertyClose} show={showNewPropertyModal} />
      )}
    </>
  )
}

export default Properties
