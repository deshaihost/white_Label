import React from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { goToBillingportalPostActions } from "../../../../redux/actions";
import { Link } from "react-router-dom";

const SubscriptionIndex = () => {
  const store = useSelector((state) => state);
  const dispatch = useDispatch();

  const userSubscriptionData = store?.getUserDataReducer?.getUserData?.data?.user?.subscription;
  const subscriptionPlanName = userSubscriptionData?.plan;
  const numPropertiesAllowed = userSubscriptionData?.num_properties_allowed;
  const paymentGoodUntil = userSubscriptionData?.payment_good_until;
  const nextPaymentDate = paymentGoodUntil ? paymentGoodUntil.split(' ')[0] : '';

  const subscriptionClickHandler = (event) => {
    event.preventDefault();

    // Remove local storage data related to subscription, since the user may be going to change it. This will re-update next time user goes to dashboard page.
    localStorage.removeItem("paymentStatus");
    localStorage.removeItem("servicesExpireDate");
    localStorage.removeItem("numPropertiesAllowed");
    localStorage.removeItem("numPropertiesUsed");
    localStorage.removeItem("tooManyPropertiesGraceUntil");

    dispatch(goToBillingportalPostActions());
  };



  return (
    <div>
      <h3 className="mb-4">Subscription</h3>
      {subscriptionPlanName && subscriptionPlanName !== "" ? (
        <>
          <p className="fs-14 mb-2">Current Subscription: {subscriptionPlanName} ({numPropertiesAllowed} properties)</p>
          <p className="fs-14 mb-2">Next Payment Date: {nextPaymentDate}</p>
          <Button className="btn btn-primary px-3 fs-6 rounded-pill mt-2" onClick={subscriptionClickHandler}>
            Manage Subscription
          </Button>
        </>
      ) : (
        <p className="mb-2">You are not yet subscribed. Click "Subscribe" on the <Link to='/properties'>Properties page</Link> to start your free trial and get HostBuddy connected to your guests!</p>
      )}
    </div>
  );
};

export default SubscriptionIndex;
