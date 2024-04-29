import React, { useEffect } from "react";
import SideBar from "../../component/sideBar/SideBar";
import { goToBillingportalPostActions } from "../../redux/actions";
import { useSelector, useDispatch } from "react-redux";
import { FullScreenLoader } from "../../helper/Loader";
import { Link } from "react-router-dom";
const Subscription = () => {
  const store = useSelector((state) => state);
  const billingPortalUrl =
    store?.gotoBillingPortalPostReducer?.gotoBillingPortal?.data
      ?.billing_portal_url;
  const billingPortalUrlLoading = store?.gotoBillingPortalPostReducer?.loading;
  const billingProtalUrlStatus =
    store?.gotoBillingPortalPostReducer?.gotoBillingPortal?.status;
  const subscriptionBillingError =
    store?.gotoBillingPortalPostReducer?.gotoBillingPortal?.data?.error;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(goToBillingportalPostActions());
  }, []);
  useEffect(() => {
    if (billingProtalUrlStatus === 200) {
      window.location.href = billingPortalUrl;
    } else if (billingProtalUrlStatus === 404) {
    }
  }, [billingProtalUrlStatus]);
  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-4">
          <SideBar />
        </div>
        <div className="col-lg-8">
          {billingPortalUrlLoading ? (
            <FullScreenLoader />
          ) : (
            <>
              {billingProtalUrlStatus === 404 ? (
                <>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      height: "100%",
                      padding: "22px",
                      color: "red",
                    }}
                  >
                    <div>
                      <div>{subscriptionBillingError}</div>
                      <div className="d-flex justify-content-center mt-5">
                        <Link to="/properties">
                          <button className="bg_theme_btn">Subscription</button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                ""
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Subscription;
