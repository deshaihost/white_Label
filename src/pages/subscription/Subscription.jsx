import React, { useEffect } from "react";
import SideBar from "../../component/sideBar/SideBar";
import { goToBillingportalPostActions } from "../../redux/actions";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../../helper/Loader";

const Subscription = () => {
  const store = useSelector((state) => state);
  const billingPortalUrl =
    store?.gotoBillingPortalPostReducer?.gotoBillingPortal?.data
      ?.billing_portal_url;
  const billingPortalUrlLoading = store?.gotoBillingPortalPostReducer?.loading;
  const billingProtalUrlStatus =
    store?.gotoBillingPortalPostReducer?.gotoBillingPortal?.status;
  console.log(
    store?.gotoBillingPortalPostReducer?.gotoBillingPortal?.status,

    "storestorestore"
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(goToBillingportalPostActions());
  }, []);
  useEffect(() => {
    if(billingProtalUrlStatus===200){
      window.location.href = billingPortalUrl;
    }
  }, [billingProtalUrlStatus]);
  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-4">
          <SideBar />
        </div>
        <div className="col-lg-8">
          {billingPortalUrlLoading ? <Loader /> : ""}
        </div>
      </div>
    </div>
  );
};

export default Subscription;
