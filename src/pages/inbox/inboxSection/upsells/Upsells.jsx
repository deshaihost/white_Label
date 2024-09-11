import React from "react";
import {useState, useEffect} from "react";
import axios from "axios";
import ToastHandle from "../../../../helper/ToastMessage";
import "../resources/upsells.css";

import PostStayUpsells from "./postStayUpsells";
import PreStayUpsells from "./preStayUpsells";
import InquiryWinbacks from "./inquiryWinbacks";

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


const UpsellsIndex = ({allPropertyNamesList}) => {


  const [selectedSection, setSelectedSection] = useState("index");

  const [preStaySettingsApiData, setPreStaySettingsApiData] = useState({}); // Data retrieved directly from the API, for all settings configs
  const [preStayLocalSettingsData, setPreStayLocalSettingsData] = useState({}); // Live data for what is currently on the UI, for all configs
  const [getPreStaySettingsLoading, setGetPreStaySettingsLoading] = useState(false);

  const [postStaySettingsApiData, setPostStaySettingsApiData] = useState({});
  const [postStayLocalSettingsData, setPostStayLocalSettingsData] = useState({});
  const [getPostStaySettingsLoading, setGetPostStaySettingsLoading] = useState(false);

  const [inquiryWinbacksSettingsApiData, setInquiryWinbacksSettingsApiData] = useState({});
  const [inquiryWinbacksLocalSettingsData, setInquiryWinbacksLocalSettingsData] = useState({});
  const [getInquiryWinbacksSettingsLoading, setGetInquiryWinbacksSettingsLoading] = useState(false);

  const [preStayUpcomingMessagesData, setPreStayUpcomingMessagesData] = useState([]);
  const [postStayUpcomingMessagesData, setPostStayUpcomingMessagesData] = useState([]);
  const [inquiryWinbacksUpcomingMessagesData, setInquiryWinbacksUpcomingMessagesData] = useState([]);
  const [getPreStayUpcomingMessagesLoading, setGetPreStayUpcomingMessagesLoading] = useState(false);
  const [getPostStayUpcomingMessagesLoading, setGetPostStayUpcomingMessagesLoading] = useState(false);
  const [getInquiryWinbacksUpcomingMessagesLoading, setGetInquiryWinbacksUpcomingMessagesLoading] = useState(false);


  // Call the API to get all the user's settings
  const callGetSettingsApi = async (upsell_type) => {
    const baseUrl = process.env.REACT_APP_API_ENDPOINT;
    const API_KEY = process.env.REACT_APP_API_KEY;
    if (upsell_type === 'pre_stay') { setGetPreStaySettingsLoading(true); }
    else if (upsell_type === 'post_stay') { setGetPostStaySettingsLoading(true); }
    else if (upsell_type === 'inquiry_winback') { setGetInquiryWinbacksSettingsLoading(true); }
  
    try {
      const config = {
        headers: { "X-API-Key": API_KEY },
        validateStatus: function (status) { return status >= 200 && status < 500; } // don't throw an error for non-2xx responses
      };
  
      const response = await axios.get( `${baseUrl}/get_upsell_settings?upsell_type=${upsell_type}`, config );
  
      if (response.status === 200 && response?.data?.upsell_settings) {
        if (upsell_type === 'pre_stay') {
          setGetPreStaySettingsLoading(false);
          setPreStaySettingsApiData(response?.data?.upsell_settings);
          setPreStayLocalSettingsData(response?.data?.upsell_settings); // Warning: preStaySettingsApiData and preStayLocalSettingsData become shallow copies of each other. Seems not to matter for our use
        } else if (upsell_type === 'post_stay') {
          setGetPostStaySettingsLoading(false);
          setPostStaySettingsApiData(response?.data?.upsell_settings);
          setPostStayLocalSettingsData(response?.data?.upsell_settings);
        } else if (upsell_type === 'inquiry_winback') {
          setGetInquiryWinbacksSettingsLoading(false);
          setInquiryWinbacksSettingsApiData(response?.data?.upsell_settings);
          setInquiryWinbacksLocalSettingsData(response?.data?.upsell_settings);
        }
      }
      else { }
    } catch (error) {
      
    } finally {
      if (upsell_type === 'pre_stay') { setGetPreStaySettingsLoading(false); }
      else if (upsell_type === 'post_stay') { setGetPostStaySettingsLoading(false); }
      else if (upsell_type === 'inquiry_winback') { setGetInquiryWinbacksSettingsLoading(false); }
    }
  }


  // Call the API to get the upcoming messages
  const callGetUpcomingMessagesApi = async (regenerate, upsell_type) => {
    const baseUrl = process.env.REACT_APP_API_ENDPOINT;
    const API_KEY = process.env.REACT_APP_API_KEY;
    if (upsell_type === 'pre_stay') { setGetPreStayUpcomingMessagesLoading(true); }
    else if (upsell_type === 'post_stay') { setGetPostStayUpcomingMessagesLoading(true); }
    else if (upsell_type === 'inquiry_winback') { setGetInquiryWinbacksUpcomingMessagesLoading(true); }

    try {
      const config = {
        headers: { "X-API-Key": API_KEY },
        validateStatus: function (status) { return status >= 200 && status < 500; } // don't throw an error for non-2xx responses
      };

      const response = await axios.get(`${baseUrl}/get_upcoming_messages?upsell_type=${upsell_type}&regenerate=${regenerate}`, config);

      if (response.status === 200) {
        if (upsell_type === 'pre_stay') { setPreStayUpcomingMessagesData(response?.data?.upcoming_messages); }
        else if (upsell_type === 'post_stay') { setPostStayUpcomingMessagesData(response?.data?.upcoming_messages); }
        else if (upsell_type === 'inquiry_winback') { setInquiryWinbacksUpcomingMessagesData(response?.data?.upcoming_messages); }
      }
      else { ToastHandle(response?.data?.error, "danger"); }
    } catch (error) {
      
    } finally {
      if (upsell_type === 'pre_stay') { setGetPreStayUpcomingMessagesLoading(false); }
      else if (upsell_type === 'post_stay') { setGetPostStayUpcomingMessagesLoading(false); }
      else if (upsell_type === 'inquiry_winback') { setGetInquiryWinbacksUpcomingMessagesLoading(false); }
    }
  }


  return (
    <div className="upsells_tab_grid text-white setting_tab_data border border-primary p-3" style={{ borderRadius: "20px", margin: "20px"}}>
      {selectedSection === "preStayUpsells" && (
        <PreStayUpsells setSection={setSelectedSection} settingsApiData={preStaySettingsApiData} setSettingsApiData={setPreStaySettingsApiData} localSettingsData={preStayLocalSettingsData} setLocalSettingsData={setPreStayLocalSettingsData} callGetSettingsApi={callGetSettingsApi} getSettingsLoading={getPreStaySettingsLoading} callGetUpcomingMessagesApi={callGetUpcomingMessagesApi} getUpcomingMessagesLoading={getPreStayUpcomingMessagesLoading} upcomingMessagesData={preStayUpcomingMessagesData} allPropertyNamesList={allPropertyNamesList}/>
      )}

      {selectedSection === "postStayUpsells" && (
        <PostStayUpsells setSection={setSelectedSection} settingsApiData={postStaySettingsApiData} setSettingsApiData={setPostStaySettingsApiData} localSettingsData={postStayLocalSettingsData} setLocalSettingsData={setPostStayLocalSettingsData} callGetSettingsApi={callGetSettingsApi} getSettingsLoading={getPostStaySettingsLoading} callGetUpcomingMessagesApi={callGetUpcomingMessagesApi} getUpcomingMessagesLoading={getPostStayUpcomingMessagesLoading} upcomingMessagesData={postStayUpcomingMessagesData} allPropertyNamesList={allPropertyNamesList}/>
      )}

      {selectedSection === "inquiryWinbacks" && (
        <InquiryWinbacks setSection={setSelectedSection} settingsApiData={inquiryWinbacksSettingsApiData} setSettingsApiData={setInquiryWinbacksSettingsApiData} localSettingsData={inquiryWinbacksLocalSettingsData} setLocalSettingsData={setInquiryWinbacksLocalSettingsData} callGetSettingsApi={callGetSettingsApi} getSettingsLoading={getInquiryWinbacksSettingsLoading} callGetUpcomingMessagesApi={callGetUpcomingMessagesApi} getUpcomingMessagesLoading={getInquiryWinbacksUpcomingMessagesLoading} upcomingMessagesData={inquiryWinbacksUpcomingMessagesData} allPropertyNamesList={allPropertyNamesList}/>
      )}
      
      {selectedSection === "index" && (
        <div className="upsells-settings">
          <div className="d-flex flex-wrap flex-md-nowrap gap-2 align-items-center justify-content-between">
            <h3>Upsells</h3>
          </div>
          <div style={{width:"90%", margin:"20px auto", textAlign:"center"}}>
            <p style={{color:"#CCC"}}>Intelligent, context-aware proactive messaging. Drive sales, get positive reviews, and increase guest satisfaction.</p>
          </div>

          <hr style={{ backgroundColor: 'white', height: '2px', border: 'none' }} className="mt-1"/>

          <div className="row mt-4 clickable-div" style={{marginLeft:"0", marginRight:"0"}} onClick={() => setSelectedSection("postStayUpsells")}>
            <div className="col-lg-11 col-12">
              <label className="fs-5">Post-stay Gap Night</label>
              <p className="settings-label">Send your guests an offer to depart later when there's a vacant night after their stay.</p>
            </div>
          </div>

          <div className="row mt-5 clickable-div" style={{marginLeft:"0", marginRight:"0"}} onClick={() => setSelectedSection("preStayUpsells")}>
            <div className="col-lg-11 col-12">
              <label className="fs-5">Pre-stay Gap Night</label>
              <p className="settings-label">Send your guests an offer to arrive earlier when there's a vacant night before their stay.</p>
            </div>
          </div>

          <div className="row mt-5 clickable-div" style={{marginLeft:"0", marginRight:"0"}} onClick={() => setSelectedSection("inquiryWinbacks")}>
            <div className="col-lg-11 col-12">
              <label className="fs-5">Inquiry Winbacks</label>
              <p className="settings-label">Send a message following up with guests who inquired but didn't book.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpsellsIndex;
