import React from "react";
import { Link } from "react-router-dom";

const SubscriptionIndex = () => {
  return (
    <div>
      <h3 className="mb-4">Conversation Preferences</h3>
      <p className="mb-2">Go to <Link to='/inbox/preferences'>conversation preferences</Link></p>
    </div>
  );
};

export default SubscriptionIndex;
