import React, { useEffect, useState } from "react";
import "./account.css";
import Loader, { FullScreenLoader } from "../../helper/Loader";
import ToastHandle from "../../helper/ToastMessage";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getUserDataActions, stateEmptyActions } from "../../redux/actions";

// Location & Time Zone Section of account page
const AccountRegionSection = () => {
  const store = useSelector((state) => state);
  const dispatch = useDispatch();
  const userDataGet = store?.getUserDataReducer?.getUserData?.data?.user;
  
  const [updateRegionApiLoading, setUpdateRegionApiLoading] = useState(false);
  const [city, setCity] = useState(userDataGet?.user_region?.city ?? "");
  const [state, setState] = useState(userDataGet?.user_region?.state ?? "");
  const [postalCode, setPostalCode] = useState(userDataGet?.user_region?.["Area Code"] ?? "");
  const [country, setCountry] = useState(userDataGet?.user_region?.country ?? "");

  const time_zone_name = userDataGet?.user_region?.time_zone_name;

  const callUpdateTimeZoneAPI = async (locationData) => {
    const baseUrl = process.env.REACT_APP_API_ENDPOINT;
    const API_KEY = process.env.REACT_APP_API_KEY;
    const dataToSend = {...locationData};
    setUpdateRegionApiLoading(true);

    try {
      const config = {
        headers: { "X-API-Key": API_KEY },
        validateStatus: function (status) { return status >= 200 && status < 500; } // don't throw an error for non-2xx responses
      };

      const response = await axios.put( `${baseUrl}/update_user_region`, dataToSend, config );

      if (response.status === 200) { ToastHandle(response.data.message, "success"); }
      else { ToastHandle(response?.data?.error, "danger"); }
      setUpdateRegionApiLoading(false);
      return response.status;
    }
    catch (error) { ToastHandle(error, "danger"); }
    finally { setUpdateRegionApiLoading(false); }
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const locationData = {};
    if (city) locationData.City = city;
    if (state) locationData.State = state;
    if (postalCode) locationData["Area Code"] = postalCode; // API expects "Area Code" instead of "Postal Code"
    if (country) locationData.Country = country;

    if (Object.keys(locationData).length === 0) { ToastHandle("At least one field is required", "danger"); }
    else {
      const apiResponseCode = await callUpdateTimeZoneAPI(locationData);
      if (apiResponseCode === 200) {
        dispatch(stateEmptyActions());
        dispatch(getUserDataActions()); // Update our record of user data with the new region data we just added to the database
      }
    }
  };

  // Fetch user data on page load, to populate "userDataGet"
  useEffect(() => {
    dispatch(getUserDataActions());
  }, []);

  // when userDataGet populates, update the state of the form fields
  useEffect(() => {
    if (userDataGet?.user_region) {
      setCity(userDataGet.user_region.City ?? "");
      setState(userDataGet.user_region.State ?? "");
      setPostalCode(userDataGet.user_region["Area Code"] ?? "");
      setCountry(userDataGet.user_region.Country ?? "");
    }
  }, [userDataGet]);

  return (
    <div className="account-content location-section">
      <h5>Location / Region Settings</h5>
      <p style={{marginLeft:"10px", textAlign:"center", fontSize:"15px"}}>This information is used to determine your time zone and other regional configuration. You must add sufficient information to determine your time zone before enabling certain features, such as daily notifications.</p>

      <form action="">
        <div className="row">
          <div className="col input_group">
            <label htmlFor="City">City</label>
            <input type="text" id="City" name="City" className="form-control" value={city} onChange={e => setCity(e.target.value)} />
          </div>
          <div className="col input_group">
            <label htmlFor="State">State</label>
            <input type="text" id="State" name="State" className="form-control" value={state} onChange={e => setState(e.target.value)} />
          </div>
        </div>
        <div className="row">
          <div className="col input_group">
            <label htmlFor="">Postal Code</label>
            <input type="text" id="Postal Code" name="Postal Code" className="form-control" value={postalCode} onChange={e => setPostalCode(e.target.value)} />
          </div>
          <div className="col input_group">
            <label htmlFor="Country">Country</label>
            <input type="text" id="Country" name="Country" className="form-control" value={country} onChange={e => setCountry(e.target.value)} />
          </div>
        </div>

        <div className="row">
          <div className="col text-center">
            <button type="submit" className="bg_theme_btn update_user_info" onClick={(event) => handleSubmit(event)}>
              {!updateRegionApiLoading ? <>Update</> : <Loader />}
            </button>
          </div>
        </div>

        <h5>
          Your time zone: {time_zone_name ? <span className="grey-text">{time_zone_name}</span> : <span className="warning-text">Not Determined</span>}
        </h5>

      </form>
    </div>
  );
};

export default AccountRegionSection;
