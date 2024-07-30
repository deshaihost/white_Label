import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import Loader from "../../../../../helper/Loader";

const DochideForReservationsModel = ({ show, setShow, documentUploadMainHndle, btnLoading }) => {
  const hideForReservationDefault = ["CURRENT", "FUTURE", "INQUIRY/PAST"];
  const [hideGetArray, setHideGetArray] = useState([]);

  // Function to handle button clicks. If item is in hideGetArray, remove it; otherwise, add it
  const handleButtonClick = (item) => {
    if (hideGetArray.includes(item)) { setHideGetArray(hideGetArray.filter((i) => i !== item)); }
    else { setHideGetArray([...hideGetArray, item]); }
  };

  const mainHandleClose=()=>{
    documentUploadMainHndle(hideGetArray);
    setShow(false)
  }

  useEffect(() => {
    setHideGetArray([]);
  }, [show]);

  return (
    <div>
      <Modal show={show} size="lg" onHide={() => setShow(false)} centered aria-labelledby="contained-modal-title-vcenter">
        <Modal.Body>

          <h4 className="text-center" style={{ color: 'white', marginBottom: '20px' }}>Hide For Reservation Stages</h4>
          <p className="text-center" style={{ color: 'rgb(200, 200, 200)', marginBottom: '25px' }}>
            You can de-select reservation stages below to prevent HostBuddy from sharing this document's information with guests in those stages.
          </p>

          <p className="text-center" style={{ color: 'rgb(200, 200, 200)', marginBottom: '30px' }}>
            With this selection, HostBuddy
            { hideGetArray.length === 0 ? <> can share this document's information with <span style={{ color: 'rgb(0, 180, 0)' }}>all guests</span> for this property.</> :
              hideGetArray.length === 1 ? <> cannot share this document's information with <span style={{ color: 'rgb(200, 0, 0)' }}>{hideGetArray[0]}</span> guests.</> :
              hideGetArray.length === 2 ? <> cannot share this document's information with <span style={{ color: 'rgb(200, 0, 0)' }}>{hideGetArray[0]}</span> or <span style={{ color: 'rgb(200, 0, 0)' }}>{hideGetArray[1]}</span> guests.</> :
              hideGetArray.length === 3 ? <> <span style={{ color: 'rgb(200, 0, 0)' }}>cannot</span> share this document's information with <span style={{ color: 'rgb(200, 0, 0)' }}>any guests</span>.</>
              : null
            }
          </p>

          <div className="d-flex align-items-center justify-content-between gap-3">
            {hideForReservationDefault.map((item, index) => (
              <button key={index}
                className={`btn ${ hideGetArray.includes(item) ? "btn-unselected" : "btn-primary" } d-block w-100 rounded-pill`}
                onClick={() => handleButtonClick(item)}
                style={hideGetArray.includes(item) ? { borderColor: '#0078f0', color: '#0078f0' } : {}}
              >
                {item}
              </button>
            ))}
          </div>

          <button onClick={() => { mainHandleClose() }} className="btn btn-primary form-control mt-4 w-auto px-5 mx-auto  d-block mb-2" >
            {!btnLoading ? <>Submit</> : <Loader />}
          </button>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default DochideForReservationsModel;
