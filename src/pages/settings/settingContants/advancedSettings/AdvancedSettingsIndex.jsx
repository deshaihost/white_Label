import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Preferences from "../../../inbox/inboxSection/preferences/Preferences";

const AdvancedSettingsIndex = () => {
  const [allPropertyNamesList, setAllPropertyNamesList] = useState([]);
  const store = useSelector((state) => state);
  
  // Get property names from Redux store
  useEffect(() => {
    const userPropertiesData = store?.getUserDataReducer?.getUserData?.data?.user?.property_data;
    const propertyNames = userPropertiesData ? Object.keys(userPropertiesData) : [];
    setAllPropertyNamesList(propertyNames);
  }, [store?.getUserDataReducer?.getUserData]);

  return (
    <div>
      <h3 className="mb-4">Conversation Preferences</h3>
      <Preferences allPropertyNamesList={allPropertyNamesList} />
    </div>
  );
};

export default AdvancedSettingsIndex;
