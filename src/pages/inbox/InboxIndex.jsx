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
import axios from "axios";

const InboxIndex = () => {
  const store = useSelector((state) => state);
  const dispatch = useDispatch();

  const [interFaceComponent, setInterFaceComponent] = useState(0);
  const [allGuestNames, setAllGuestNames] = useState({});

  const allUserData = store?.getUserDataReducer?.getUserData?.data?.user;
  const userPropertiesData = allUserData?.property_data; // dict, keys are property names. values aren't important here
  const allPropertyNamesList = userPropertiesData ? Object.keys(userPropertiesData) : [];

  const showTimeZoneNotif = !allUserData?.user_region;

  const callGetGuestNamesApi = async () => {
    const baseUrl = process.env.REACT_APP_API_ENDPOINT;
    const API_KEY = process.env.REACT_APP_API_KEY;

    try {
      const config = {
        headers: { "X-API-Key": API_KEY },
        validateStatus: function (status) { return status >= 200 && status < 500; } // don't throw an error for non-2xx responses
      };
      const response = await axios.get( `${baseUrl}/get_all_guest_names`, config );

      if (response.status === 200) { }
      else { }
      return response.data;
    } catch (error) {
      return { error: "Internal server error" };
    }
  }

  // Call API to get guest names (like: { "property_name1": ["guest_name1", "guest_name2", ...], ... })
  // Save in the state like: [ { name:"Guest Name1", searchable:"guestname1", property:"property_name1" }, ... ]
  const populateGuestNames = async () => {
    const data = await callGetGuestNamesApi();
    if (data?.guest_names) {
      const transformedGuestNames = Object.entries(data.guest_names).flatMap(([property, names]) =>
        names.map(name => ({
          name: name,
          searchable: name.toLowerCase().replace(/[^a-z0-9]/g, ''),
          property: property
        }))
      );
      setAllGuestNames(transformedGuestNames);
    }
  };

  // On page load, call some APIs
  useEffect(() => {
    dispatch(getUserDataActions()); // So we can have the list of property names for the various dropdowns
    populateGuestNames(); // So we can have the list of guest names for the guest search bar
  }, []);

  return (
    <div className="inbox-container">
      <InBoxHeader showInterFace={(id) => setInterFaceComponent(id)} interFaceComponent={interFaceComponent} showTimeZoneNotif={showTimeZoneNotif}/>
      {interFaceComponent === 0 && <Inbox allPropertyNamesList={allPropertyNamesList} allGuestNamesList={allGuestNames}/>}
      {interFaceComponent === 1 && <SmartTemplates allPropertyNamesList={allPropertyNamesList}/>}
      {interFaceComponent === 2 && <ReviewRemoval allPropertyNamesList={allPropertyNamesList}/>}
      {interFaceComponent === 3 && <Preferences />}
      {interFaceComponent === 4 && <Upsells allPropertyNamesList={allPropertyNamesList}/>}
    </div>
  );
};

export default InboxIndex;
