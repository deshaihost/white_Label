import React, {  useState } from "react";
import InBoxHeader from "./inboxHeader/InBoxHeader";
import Inbox from "./inboxSection/inbox/Inbox";
import SmartTemplates from "./inboxSection/smartTemplates/SmartTemplates";
import ReviewRemoval from "./inboxSection/reviewRemoval/ReviewRemoval";
import Preferences from "./inboxSection/preferences/Preferences";
import Upsells from "./inboxSection/upsells/Upsells";
import "./inboxSection/inbox/inboxIndex.css";

const InboxIndex = () => {
  const [interFaceComponent, setInterFaceComponent] = useState(0);

  return (
    <div className="inbox-container">
      <InBoxHeader showInterFace={(id) => setInterFaceComponent(id)} interFaceComponent={interFaceComponent}/>
      {interFaceComponent === 0 && <Inbox />}
      {interFaceComponent === 1 && <SmartTemplates />}
      {interFaceComponent === 2 && <ReviewRemoval />}
      {interFaceComponent === 3 && <Preferences />}
      {interFaceComponent === 4 && <Upsells />}
    </div>
  );
};

export default InboxIndex;
