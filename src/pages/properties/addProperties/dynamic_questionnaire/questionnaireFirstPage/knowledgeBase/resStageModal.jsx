import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import Loader from "../../../../../../helper/Loader";

const ResStageModal = ({modalData, setModalData, handleModalSubmit}) => {
  const hideForReservationDefault = ["CURRENT", "FUTURE", "INQUIRY/PAST"];
  const [hideGetArray, setHideGetArray] = useState([]); // array of stages to hide
  const [visibleStages, setVisibleStages] = useState(hideForReservationDefault); // array of stages not hidden. Basically the "inverse" of above

  const {show, section, sourceId, hiddenResStages} = modalData;

  // Function to handle button clicks. If item is in hideGetArray, remove it; otherwise, add it
  const handleButtonClick = (item) => {
    let newHideGetArray;
    if (hideGetArray.includes(item)) {
      //setHideGetArray(hideGetArray.filter((i) => i !== item));
      newHideGetArray = hideGetArray.filter((i) => i !== item);
      setVisibleStages([...visibleStages, item]);
    }
    else {
      //setHideGetArray([...hideGetArray, item]);
      newHideGetArray = [...hideGetArray, item];
      setVisibleStages(visibleStages.filter((i) => i !== item));
    }
    setHideGetArray(newHideGetArray);
    handleModalSubmit(section, sourceId, newHideGetArray);
  };

  // On page load, initialize hideGetArray to the hiddenResStages array
  useEffect(() => {
    if (hiddenResStages) {
      setHideGetArray(hiddenResStages);
      setVisibleStages(hideForReservationDefault.filter((i) => !hiddenResStages.includes(i)));
    }
  }, [hiddenResStages]);

  return (
    <div>
      <Modal show={show} size="lg" onHide={() => setModalData({...modalData, show:false})} centered aria-labelledby="contained-modal-title-vcenter">
        <Modal.Body>

          <h4 className="text-center" style={{ color: 'white', marginBottom: '20px' }}>Hide For Reservation Stages</h4>
          <p className="text-center" style={{ color: 'rgb(200, 200, 200)', marginBottom: '25px' }}>
            You can manage HostBuddy's access to the information in this source by reservation stage. HostBuddy will ONLY have access to the information in this source in guest conversations for the reservation stages selected here.
          </p>

          <p className="text-center" style={{ color: 'rgb(200, 200, 200)', marginBottom: '30px' }}>
            With this selection, HostBuddy
            { visibleStages.length === 3 ? <> can share this document's information with <span style={{ color: 'rgb(0, 180, 0)' }}>all guests</span> for this property.</> :
              visibleStages.length === 2 ? <> can <span style={{ color: 'rgb(205, 95, 0)' }}>ONLY</span> share this document's information with <span style={{ color: 'rgb(205, 95, 0)' }}>{visibleStages[0]}</span> and <span style={{ color: 'rgb(205, 95, 0)' }}>{visibleStages[1]}</span> guests.</> :
              visibleStages.length === 1 ? <> can <span style={{ color: 'rgb(205, 95, 0)' }}>ONLY</span> share this document's information with <span style={{ color: 'rgb(205, 95, 0)' }}>{visibleStages[0]}</span> guests.</> :
              visibleStages.length === 0 ? <> <span style={{ color: 'rgb(200, 0, 0)' }}>cannot</span> share this document's information with <span style={{ color: 'rgb(200, 0, 0)' }}>any guests</span>.</>
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

          <button onClick={() => { setModalData({show:false}); }} className="btn btn-primary form-control mt-4 w-auto px-5 mx-auto d-block mb-2">
            Submit
          </button>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ResStageModal;
