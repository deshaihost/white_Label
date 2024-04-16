import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { getRemoveIntegrationActions, stateEmptyActions } from "../../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { removeIntegrationActions } from "../../../redux/actions";
import Loader from "../../../helper/Loader";
import ToastHandle from "../../../helper/ToastMessage";
const RemoveIntegrations = ({ handleNoPlanClose, showNoPlan }) => {
  const store = useSelector((state) => state);
  const dispatch = useDispatch();
  const removeIntegrationList =
    store?.removeIntegrationGetReducer?.removeIntegrationGet?.data
      ?.integrations;
  const removeIntegrationListLoading =
    store?.removeIntegrationGetReducer?.loading;
  const [integrationIdGet, setIntegrationIdGet] = useState("");
  const removeIntegrateStatus =
    store?.removeIntegrationReducer?.removeIntegration?.status;
    const removeIntegrateMessage =
    store?.removeIntegrationReducer?.removeIntegration?.data?.error;
    const removeIntegrateLoading =
    store?.removeIntegrationReducer?.loading;
  console.log(
    store?.removeIntegrationReducer?.removeIntegration?.data?.error
    ,

    "storestore"
  );
  const integratonDeleteHandle = (e) => {
    e.preventDefault();
    if (integrationIdGet !== "") {
      dispatch(
        removeIntegrationActions({ integration_platform: integrationIdGet })
      );
    }
  };

  useEffect(() => {
    if (showNoPlan) dispatch(getRemoveIntegrationActions());
  }, [showNoPlan]);
  useEffect(()=>{
    if(removeIntegrateStatus===400){
      ToastHandle(removeIntegrateMessage,'danger')
      dispatch(stateEmptyActions());

    }

  },[removeIntegrateStatus])
  return (
    <div>
      <Modal
        show={showNoPlan}
        size="lg"
        onHide={() => handleNoPlanClose("removeIntegrationsClose")}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body>
          <div className="row">
            <div className="6">
              <h3 className="text-white text-center">Integrate Platform</h3>
            </div>
          </div>
          {!removeIntegrationListLoading ? (
            <>
              <form onSubmit={integratonDeleteHandle}>
                {removeIntegrationList?.map((item) => {
                  return (
                    <>
                      <div class="form-check ">
                        <input
                          class="form-check-input"
                          type="radio"
                          name="flexRadioDefault"
                          id="flexRadioDefault1"
                          value="option1"
                          onClick={() => {
                            setIntegrationIdGet(item);
                          }}
                        />
                        <label class="form-check-label" for="flexRadioDefault1">
                          {item}
                        </label>
                      </div>
                    </>
                  );
                })}
                <div>
                  <button className="btn btn-primary"> {!removeIntegrateLoading?"Remove Platform":<Loader/>}</button>
                </div>
              </form>
            </>
          ) : (
            <Loader />
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default RemoveIntegrations;
