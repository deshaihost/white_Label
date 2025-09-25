import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {getCalryLinkActions, stateEmptyActions} from "../../../../redux/actions";
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
      dispatch(getCalryLinkActions({ platform: type.toLowerCase().replace(/\s+/g, '-') }));  // usually, the "integration definition key" that this API expects is the lowercase version of the PMS name with spaces replaced by hyphens (this will break for Smily i.e. BookingSync, but as of sep 22 2025 we've never had a customer for that so don't care rn). https://docs.calry.app/docs/common-api-reference/link/create-link
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

  const [earlyAccessRequested, setEarlyAccessRequested] = useState(false);

  return (
    <div>
      {!getCalryLinkLoading ? (
        <>
          {getCarlyLink !== undefined ? (
            <div className="text-white text-center">
              <p>
                Click below to securely enter your account information and complete the integration.
              </p>
              <button className="btn btn-primary px-5 my-4 rounded-pill" onClick={goToCarlyLinkHndle}>
                Integrate
              </button>
              <p style={{fontSize: '0.9em'}}>
                For specific instructions on how to complete your PMS integration with {type}, check out <a style={{fontSize: 'inherit'}} href={`https://userguide.hostbuddy.ai/pms-integration-guides/${pmsNameForUrl}`} target="_blank">this page</a>.
              </p>
            </div>
          ) : (
            getCarlyLinkStatus === 204 ? (
              <>
                <p className="text-white text-center">Support for {pmsNameForUrl} is not yet available, but it's in the works! Click below to request early access, and our team will be in touch with you soon.</p>
                <div className="row form-design mt-1">
                  <div className="col-12 text-center">
                    {earlyAccessRequested ? (
                      <p className="text-white">Early access requested!</p>
                    ) : (
                      <button className="btn btn-primary px-5 mt-2" onClick={() => setEarlyAccessRequested(true)}>
                        Request Early Access
                      </button>
                    )}
                  </div>
                </div>
              </>
            ) : (
              <>
                <span className="text-danger">Failed to create Calry link</span>
                <div className="row form-design mt-1">
                  <div className="col-12 text-center">
                    <button className="btn btn-primary px-5 mt-2" onClick={()=>handleNoPlanClose('pmsIntegrationClose')}>
                      Close
                    </button>
                  </div>
                </div>
              </>
            )
          )}
        </>
      ) : (
        <BoxLoader />
      )}
    </div>
  );
};

export default IntergratePlatFormInput;
