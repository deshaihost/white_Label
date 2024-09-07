import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserDataActions } from "../../redux/actions";
import InBoxHeader from "./inboxHeader/InBoxHeader";
import Inbox from "./inboxSection/inbox/Inbox";
import SmartTemplates from "./inboxSection/smartTemplates/SmartTemplates";
import ReviewRemoval from "./inboxSection/reviewRemoval/ReviewRemoval";
import Preferences from "./inboxSection/preferences/Preferences";
import Upsells from "./inboxSection/upsells/Upsells";
import "./inboxSection/inbox/inboxIndex.css";

const InboxIndex = () => {
  const store = useSelector((state) => state);
  const dispatch = useDispatch();

  const [interFaceComponent, setInterFaceComponent] = useState(0);

  const userPropertiesData = store?.getUserDataReducer?.getUserData?.data?.user?.property_data; // dict, keys are property names. values aren't important here
  const allPropertyNamesList = userPropertiesData ? Object.keys(userPropertiesData) : [];

  // On page load, get the user data so we can have the list of property names for the various dropdowns
  useEffect(() => {
    dispatch(getUserDataActions());
  }, []);

  return (
    <div className="inbox-container">
      <InBoxHeader showInterFace={(id) => setInterFaceComponent(id)} interFaceComponent={interFaceComponent}/>
      {interFaceComponent === 0 && <Inbox allPropertyNamesList={allPropertyNamesList}/>}
      {interFaceComponent === 1 && <SmartTemplates />}
      {interFaceComponent === 2 && <ReviewRemoval allPropertyNamesList={allPropertyNamesList}/>}
      {interFaceComponent === 3 && <Preferences />}
      {interFaceComponent === 4 && <Upsells />}
    </div>
  );
};

export default InboxIndex;
