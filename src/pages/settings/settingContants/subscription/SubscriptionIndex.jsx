import React from "react";
import { Button } from "react-bootstrap";

const SubscriptionIndex = () => {
  return (
    <div>
      <h5 className="mb-2">SubscriptionIndex</h5>
      <p className="fs-14 mb-2">Current Subscriptions: The Works</p>
      <p className="fs-14 mb-2">Last Payment: $52.00</p>
      <p className="fs-14 mb-2">Billed on: 07/02/24</p>
      <Button className="btn btn-primary px-3 fs-6 rounded-pill mt-2">
        Manage Subscription
      </Button>
    </div>
  );
};

export default SubscriptionIndex;
