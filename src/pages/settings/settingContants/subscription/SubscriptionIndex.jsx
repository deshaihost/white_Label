import React from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
//import { goToBillingportalPostActions } from "../../../../redux/actions";
import { Link } from "react-router-dom";
import axios from "axios";
import ToastHandle from "../../../../helper/ToastMessage";
import Loader, {BoxLoader} from "../../../../helper/Loader";

const SubscriptionIndex = () => {
  const store = useSelector((state) => state);
  const dispatch = useDispatch();

  const [goToBillingPortalLoading, setGoToBillingPortalLoading] = React.useState(false);

  const userSubscriptionData = store?.getUserDataReducer?.getUserData?.data?.user?.subscription;
  const subscriptionPlanName = userSubscriptionData?.plan;
  const numPropertiesAllowed = userSubscriptionData?.num_properties_allowed;
  const paymentGoodUntil = userSubscriptionData?.payment_good_until;
  const nextPaymentDate = paymentGoodUntil ? paymentGoodUntil.split(' ')[0] : '';


  // Call the billing portal API, get the URL from the response, then redirect the user to it securely (in a way that wont make the browser mad)
  const goToBillingPortal = async () => {
    setGoToBillingPortalLoading(true);
    const baseUrl = process.env.REACT_APP_API_ENDPOINT;
    const API_KEY = process.env.REACT_APP_API_KEY;

    try {
      const config = {
        headers: { "X-API-Key": API_KEY },
        validateStatus: function (status) { return status >= 200 && status < 500; } // don't throw an error for non-2xx responses
      };

      const response = await axios.post( `${baseUrl}/go_to_billing_portal`, {}, config );

      if (response.status === 200) {
        setGoToBillingPortalLoading(false);
        window.location.assign(response.data.billing_portal_url);
      }
      else { ToastHandle(response?.data?.error, "danger"); }
    } catch (error) {
      console.log("error:", error);
      ToastHandle("something went wrong", "danger");
    } finally {
      setGoToBillingPortalLoading(false);
    }
  };





  const subscriptionClickHandler = (event) => {
    event.preventDefault();

    // Remove local storage data related to subscription, since the user may be going to change it. This will re-update next time user goes to dashboard page.
    localStorage.removeItem("paymentStatus");
    localStorage.removeItem("servicesExpireDate");
    localStorage.removeItem("numPropertiesAllowed");
    localStorage.removeItem("numPropertiesUsed");
    localStorage.removeItem("tooManyPropertiesGraceUntil");

    goToBillingPortal();

    //dispatch(goToBillingportalPostActions());
  };



  return (
    <div>
      <h3 className="mb-4">Subscription</h3>
      {subscriptionPlanName && subscriptionPlanName !== "" ? (
        <>
          <p className="fs-14 mb-2">Current Subscription: {subscriptionPlanName} ({numPropertiesAllowed} properties)</p>
          <p className="fs-14 mb-2">Next Payment Date: {nextPaymentDate}</p>
          {!goToBillingPortalLoading ? (
            <Button className="btn btn-primary px-3 fs-6 rounded-pill mt-2" onClick={subscriptionClickHandler}>
              Manage Subscription
            </Button>
          ) : (
            <BoxLoader />
          )}
        </>
      ) : (
        <p className="mb-2">You are not yet subscribed. Click "Subscribe" on the <Link to='/properties'>Properties page</Link> to start your free trial and get HostBuddy connected to your guests!</p>
      )}
    </div>
  );
};

export default SubscriptionIndex;
