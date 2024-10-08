import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getCalryLinkActions,
  stateEmptyActions,
} from "../../../../redux/actions";
import ToastHandle from "../../../../helper/ToastMessage";
import { BoxLoader } from "../../../../helper/Loader";


const IntergratePlatFormInput = ({ PmsIntegrationData, handleNoPlanClose }) => {
  const { type } = PmsIntegrationData ? PmsIntegrationData : [];
  const store = useSelector((state) => state);
  const getCarlyLinkStatus = store?.getCalryLinkReducer?.getCalryLing?.status;
  const getCarlyLink = store?.getCalryLinkReducer?.getCalryLing?.data?.calry_link;
  const getCalryLinkLoading = store?.getCalryLinkReducer?.loading;
  const getCarlyLinkMessage = store?.getCalryLinkReducer?.getCalryLing?.data?.message;
  const getCalryLinkError = store?.getCalryLinkReducer?.getCalryLing?.data?.error;

  const pmsNameForUrl = type ? type.toLowerCase() : "";

  const goToCarlyLinkHndle = () => {
    const baseUrl = getCarlyLink;
    const url = new URL(baseUrl);
    window.open(url.toString(), "_blank");
    handleNoPlanClose('pmsIntegrationClose');
  };

  const dispatch = useDispatch();
  useEffect(() => {
    if (type) {
      dispatch(
        getCalryLinkActions({
          platform: type,
        })
      );
    }
  }, [type]);

  useEffect(() => {
    if (getCarlyLinkStatus === 200) {
      ToastHandle(getCarlyLinkMessage, "success");
    } else {
      /*
      ToastHandle(getCalryLinkError, "danger");
      dispatch(stateEmptyActions());
      */
    }
  }, [getCarlyLinkStatus]);

  return (
    <div>
      {!getCalryLinkLoading ? (
        <>
          {getCarlyLink !== undefined ? (
            <div className="text-white text-center">
              <p style={{fontSize:'1em', marginBottom:'20px'}}>
              <span style={{color:'#146ef5'}} className="mainCursor"
                onClick={() => {
                  if (getCarlyLink !== undefined) { goToCarlyLinkHndle(); }
                }}>
                CLICK HERE
              </span> to securely enter your account information and complete the integration.
              </p>
              <p>For specific instructions on how to complete your PMS integration with {pmsNameForUrl}, check out <a href={`/pms-instructions/${type}`} target="_blank">this page</a>.</p>
            </div>
          ) : (
            <>
              <span className="text-danger">Failed to create Calry link</span>
              <div className="row form-design mt-1">
                <div className="col-12 text-center">
                  <button
                    className="btn btn-primary px-5 mt-2"
                    onClick={()=>handleNoPlanClose('pmsIntegrationClose')}
                  >
                    Close
                  </button>
                </div>
              </div>
            </>
          )}
        </>
      ) : (
        <BoxLoader />
      )}
    </div>
  );
};

export default IntergratePlatFormInput;
