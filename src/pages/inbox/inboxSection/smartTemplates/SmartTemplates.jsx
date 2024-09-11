import React from "react";
import {useState, useEffect} from "react";
import axios from "axios";
import ToastHandle from "../../../../helper/ToastMessage";
import "../resources/upsells.css";

import ReviewUpsells from "./reviewUpsells";

/*
default_settings = {
  'enabled': false,
  'number_of_nights_criteria': 1,
  'send_to_which_reservation': 'both before first', // 'before', 'after', 'both before first', 'both after first'
  'days_before_check_out': 1,
  'time_before_check_out': '12:00',
  'days_before_check_in': 1,
  'time_before_check_in': '12:00',
  'discount_type': 'percentage', // 'percentage', 'absolute'
  'discount_percentage': 10,
  'discount_absolute': 10,
  'upsell_message': "Hi [[guest_name]], we have [[num_days_available]] that opened up right [[before_or_after]] your reservation. If you're interested, I'd like to offer these nights to you at a [[discount_percentage]]% discount. Let me know if you'd like to add these nights to your stay!"
}
*/


const SmartTemplates = ({allPropertyNamesList}) => {

  const [selectedSection, setSelectedSection] = useState("index");

  const [reviewSettingsApiData, setReviewSettingsApiData] = useState({}); // Data retrieved directly from the API, for all settings config
  const [reviewLocalSettingsData, setReviewLocalSettingsData] = useState({}); // Live data for what is currently on the UI, for only the selected config
  const [getReviewSettingsLoading, setGetReviewSettingsLoading] = useState(false);

  const [reviewUpcomingMessagesData, setReviewUpcomingMessagesData] = useState([]);
  const [getReviewUpcomingMessagesLoading, setGetReviewUpcomingMessagesLoading] = useState(false);


  // Call the API to get all the user's settings
  const callGetSettingsApi = async (upsell_type) => {
    const baseUrl = process.env.REACT_APP_API_ENDPOINT;
    const API_KEY = process.env.REACT_APP_API_KEY;
    if (upsell_type === 'review_upsell') { setGetReviewSettingsLoading(true); }
  
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
        }
      }
      else { }
    } catch (error) {
      
    } finally {
      if (upsell_type === 'review_upsell') { setGetReviewSettingsLoading(false); }
    }
  }


  // Call the API to get the upcoming messages
  const callGetUpcomingMessagesApi = async (regenerate, upsell_type) => {
    const baseUrl = process.env.REACT_APP_API_ENDPOINT;
    const API_KEY = process.env.REACT_APP_API_KEY;
    if (upsell_type === 'review_upsell') { setGetReviewUpcomingMessagesLoading(true); }

    try {
      const config = {
        headers: { "X-API-Key": API_KEY },
        validateStatus: function (status) { return status >= 200 && status < 500; } // don't throw an error for non-2xx responses
      };

      const response = await axios.get(`${baseUrl}/get_upcoming_messages?upsell_type=${upsell_type}&regenerate=${regenerate}`, config);

      if (response.status === 200) {
        if (upsell_type === 'review_upsell') { setReviewUpcomingMessagesData(response?.data?.upcoming_messages); }
      }
      else { ToastHandle(response?.data?.error, "danger"); }
    } catch (error) {
      
    } finally {
      if (upsell_type === 'review_upsell') { setGetReviewUpcomingMessagesLoading(false); }
    }
  }


  return (
    <div className="smart_templates_tab_grid text-white setting_tab_data border border-primary p-3" style={{ borderRadius: "20px", margin: "20px"}}>
      {selectedSection === "reviewUpsells" && (
        <ReviewUpsells setSection={setSelectedSection} settingsApiData={reviewSettingsApiData} setSettingsApiData={setReviewSettingsApiData} localSettingsData={reviewLocalSettingsData} setLocalSettingsData={setReviewLocalSettingsData} callGetSettingsApi={callGetSettingsApi} getSettingsLoading={getReviewSettingsLoading} callGetUpcomingMessagesApi={callGetUpcomingMessagesApi} getUpcomingMessagesLoading={getReviewUpcomingMessagesLoading} upcomingMessagesData={reviewUpcomingMessagesData} allPropertyNamesList={allPropertyNamesList} />
      )}
      
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
