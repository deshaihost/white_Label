import React from "react";
import {useState, useEffect} from "react";
import axios from "axios";
import ToastHandle from "../../../../helper/ToastMessage";
import "../resources/upsells.css";

import ReviewUpsells from "./reviewUpsells";
//import PostCheckInMessages from "./postCheckInMessage";
//import PropertyReadyMessage from "./propertyReadyMessage";


const SmartTemplates = ({allPropertyNamesList}) => {

  const [selectedSection, setSelectedSection] = useState("index");

  const [reviewSettingsApiData, setReviewSettingsApiData] = useState({}); // Data retrieved directly from the API, for all settings config
  const [reviewLocalSettingsData, setReviewLocalSettingsData] = useState({}); // Live data for what is currently on the UI, for only the selected config
  const [getReviewSettingsLoading, setGetReviewSettingsLoading] = useState(false);

  const [checkInMessageApiData, setCheckInMessageApiData] = useState({});
  const [checkInLocalSettingsData, setCheckInLocalSettingsData] = useState({});
  const [getCheckInSettingsLoading, setGetCheckInSettingsLoading] = useState(false);

  const [propertyReadyApiData, setPropertyReadyApiData] = useState({});
  const [propertyReadyLocalData, setPropertyReadyLocalData] = useState({});
  const [getPropertyReadyLoading, setGetPropertyReadyLoading] = useState(false);


  const [reviewUpcomingMessagesData, setReviewUpcomingMessagesData] = useState([]);
  const [getReviewUpcomingMessagesLoading, setGetReviewUpcomingMessagesLoading] = useState(false);
  const [checkInUpcomingMessagesData, setCheckInUpcomingMessagesData] = useState([]);
  const [getCheckInUpcomingMessagesLoading, setGetCheckInUpcomingMessagesLoading] = useState(false);
  const [propertyReadyUpcomingMessagesData, setPropertyReadyUpcomingMessagesData] = useState([]);
  const [getPropertyReadyUpcomingMessagesLoading, setGetPropertyReadyUpcomingMessagesLoading] = useState(false);


  // Call the API to get all the user's settings
  const callGetSettingsApi = async (upsell_type) => {
    const baseUrl = process.env.REACT_APP_API_ENDPOINT;
    const API_KEY = process.env.REACT_APP_API_KEY;
    if (upsell_type === 'review_upsell') { setGetReviewSettingsLoading(true); }
    else if (upsell_type === 'check_in') { setGetCheckInSettingsLoading(true); }
    else if (upsell_type === 'property_ready') { setGetPropertyReadyLoading(true); }
  
    try {
      const config = {
        headers: { "X-API-Key": API_KEY },
        validateStatus: function (status) { return status >= 200 && status < 500; } // don't throw an error for non-2xx responses
      };
  
      const response = await axios.get( `${baseUrl}/get_upsell_settings?upsell_type=${upsell_type}`, config );
  
      if (response.status === 200 && response?.data?.upsell_settings) {
        if (upsell_type === 'review_upsell') {
          setGetReviewSettingsLoading(false);
          setReviewSettingsApiData(response?.data?.upsell_settings);
          setReviewLocalSettingsData(response?.data?.upsell_settings); // Warning: postStaySettingsApiData and postStayLocalSettingsData become shallow copies of each other. Seems not to matter for our use
        } else if (upsell_type === 'check_in') {
          setGetCheckInSettingsLoading(false);
          setCheckInMessageApiData(response?.data?.upsell_settings);
          setCheckInLocalSettingsData(response?.data?.upsell_settings);
        } else if (upsell_type === 'property_ready') {
          setGetPropertyReadyLoading(false);
          setPropertyReadyApiData(response?.data?.upsell_settings);
          setPropertyReadyLocalData(response?.data?.upsell_settings);
        }
      }
      else { }
    } catch (error) {
      
    } finally {
      if (upsell_type === 'review_upsell') { setGetReviewSettingsLoading(false); }
      else if (upsell_type === 'check_in') { setGetCheckInSettingsLoading(false); }
      else if (upsell_type === 'property_ready') { setGetPropertyReadyLoading(false); }
    }
  }


  // Call the API to get the upcoming messages
  const callGetUpcomingMessagesApi = async (regenerate, upsell_type) => {
    const baseUrl = process.env.REACT_APP_API_ENDPOINT;
    const API_KEY = process.env.REACT_APP_API_KEY;
    if (upsell_type === 'review_upsell') { setGetReviewUpcomingMessagesLoading(true); }
    else if (upsell_type === 'check_in') { setGetCheckInUpcomingMessagesLoading(true); }
    else if (upsell_type === 'property_ready') { setGetPropertyReadyUpcomingMessagesLoading(true); }

    try {
      const config = {
        headers: { "X-API-Key": API_KEY },
        validateStatus: function (status) { return status >= 200 && status < 500; } // don't throw an error for non-2xx responses
      };

      const response = await axios.get(`${baseUrl}/get_upcoming_messages?upsell_type=${upsell_type}&regenerate=${regenerate}`, config);

      if (response.status === 200) {
        if (upsell_type === 'review_upsell') { setReviewUpcomingMessagesData(response?.data?.upcoming_messages); }
        else if (upsell_type === 'check_in') { setCheckInUpcomingMessagesData(response?.data?.upcoming_messages); }
        else if (upsell_type === 'property_ready') { setPropertyReadyUpcomingMessagesData(response?.data?.upcoming_messages); }
      }
      else { ToastHandle(response?.data?.error, "danger"); }
    } catch (error) {
      
    } finally {
      if (upsell_type === 'review_upsell') { setGetReviewUpcomingMessagesLoading(false); }
      else if (upsell_type === 'check_in') { setGetCheckInUpcomingMessagesLoading(false); }
      else if (upsell_type === 'property_ready') { setGetPropertyReadyUpcomingMessagesLoading(false); }
    }
  }


  return (
    <div className="smart_templates_tab_grid text-white setting_tab_data border border-primary p-3" style={{ borderRadius: "20px", margin: "20px"}}>
      {selectedSection === "reviewUpsells" && (
        <ReviewUpsells setSection={setSelectedSection} settingsApiData={reviewSettingsApiData} setSettingsApiData={setReviewSettingsApiData} localSettingsData={reviewLocalSettingsData} setLocalSettingsData={setReviewLocalSettingsData} callGetSettingsApi={callGetSettingsApi} getSettingsLoading={getReviewSettingsLoading} callGetUpcomingMessagesApi={callGetUpcomingMessagesApi} getUpcomingMessagesLoading={getReviewUpcomingMessagesLoading} upcomingMessagesData={reviewUpcomingMessagesData} allPropertyNamesList={allPropertyNamesList} />
      )}

      {/*
      {selectedSection === "checkInUpsells" && (
        <PostCheckInMessages setSection={setSelectedSection} settingsApiData={checkInMessageApiData} setSettingsApiData={setCheckInMessageApiData} localSettingsData={checkInLocalSettingsData} setLocalSettingsData={setCheckInLocalSettingsData} callGetSettingsApi={callGetSettingsApi} getSettingsLoading={getCheckInSettingsLoading} callGetUpcomingMessagesApi={callGetUpcomingMessagesApi} getUpcomingMessagesLoading={getCheckInUpcomingMessagesLoading} upcomingMessagesData={checkInUpcomingMessagesData} allPropertyNamesList={allPropertyNamesList} />
      )}
      */}

      {/*
      {selectedSection === "propertyReady" && (
        <PropertyReadyMessage setSection={setSelectedSection} settingsApiData={propertyReadyApiData} setSettingsApiData={setPropertyReadyApiData} localSettingsData={propertyReadyLocalData} setLocalSettingsData={setPropertyReadyLocalData} callGetSettingsApi={callGetSettingsApi} getSettingsLoading={getPropertyReadyLoading} callGetUpcomingMessagesApi={callGetUpcomingMessagesApi} getUpcomingMessagesLoading={getPropertyReadyUpcomingMessagesLoading} upcomingMessagesData={propertyReadyUpcomingMessagesData} allPropertyNamesList={allPropertyNamesList} />
      )}
      */}
      
      {selectedSection === "index" && (
        <div className="upsells-settings">
          <div className="d-flex flex-wrap flex-md-nowrap gap-2 align-items-center justify-content-between">
            <h3>Smart Templates</h3>
          </div>
          <div style={{width:"90%", margin:"20px auto", textAlign:"center"}}>
            <p style={{color:"#CCC"}}>Send templated messages to the right guests at the right time. Use advanced technology to analyze conversations and situations to trigger messaging.</p>
          </div>

          <hr style={{ backgroundColor: 'white', height: '2px', border: 'none' }} className="mt-1"/>

          <div className="row mt-5 clickable-div" style={{marginLeft:"0", marginRight:"0"}} onClick={() => setSelectedSection("reviewUpsells")}>
            <div className="col-lg-11 col-12">
              <label className="fs-5">Post-Stay Review</label>
              <p className="settings-label">Send a message to your guests who had a positive experience, asking them to leave a review.</p>
            </div>
          </div>

          {/*
          <div className="row mt-5 clickable-div" style={{marginLeft:"0", marginRight:"0"}} onClick={() => setSelectedSection("checkInUpsells")}>
            <div className="col-lg-11 col-12">
              <label className="fs-5">Post-Check-In Message</label>
              <p className="settings-label">If your guest hasn't messaged you since they've checked in, send a message to them asking if they're finding everything well.</p>
            </div>
          </div>
          */}

          {/*
          <div className="row mt-5 clickable-div" style={{marginLeft:"0", marginRight:"0"}} onClick={() => setSelectedSection("propertyReady")}>
            <div className="col-lg-11 col-12">
              <label className="fs-5">Property Ready</label>
              <p className="settings-label">Send a message to your guests when their property is ready for check-in.</p>
            </div>
          </div>
          */}

          {/*
          <hr style={{ backgroundColor: 'white', height: '2px', border: 'none' }} className="mt-5"/>

          <h3 className="available-variables-heading mt-5 text-center">Upcoming Messages</h3>
          <p className="settings-label text-center">Showing the next 10</p>

          <div className="col-12 mt-4">
            <div className="upcoming-messages">
              <table className="table">
                <thead>
                  <tr>
                    <th>Sending at</th>
                    <th>Property</th>
                    <th>Guest</th>
                    <th>For vacant night(s)</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                {!getUpcomingMessagesLoading ? (
                  upcomingMessagesData && upcomingMessagesData.length > 0 ? (
                    <tbody>
                      {upcomingMessagesData.slice(0, 10).map((message, index) => ( // only show the first 20
                        <tr key={index}>
                          <td>{formatDateTime(message.time_to_send)}</td>
                          <td>{truncateString(message.property_name, 25)}</td>
                          <td>{truncateString(message.guest_first_name, 20)}</td>
                          <td>{formatDateRange(message.start_date, message.end_date)}</td>
                          <td>Waiting to send</td>
                          <td>
                            <FaExternalLinkAlt style={{ marginRight:'10px', marginLeft:'10px' }} onClick={() => console.log('View message')} />
                            <FaTimes style={{ color: 'red' }} onClick={() => console.log('Cancel message')} />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  ) : (
                    <tbody>
                      <tr>
                        <td colSpan="6" className="text-center">No upcoming messages</td>
                      </tr>
                    </tbody>
                  )
                ) : (
                  <tbody>
                    <tr>
                      <td colSpan="6" className="text-center">
                        <BoxLoader />
                      </td>
                    </tr>
                  </tbody>
                )}
              </table>
            </div>
          </div>
          */}
        </div>
      )}
    </div>
  );
};

export default SmartTemplates;
