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
    <div className="upsells_tab_grid text-white setting_tab_data p-3" style={{ borderRadius: "20px", margin: "40px 60px"}}>
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
          <div style={{ marginBottom: '40px' }}>
            <h1 
              className="text-white mb-4" 
              style={{ 
                fontSize: '40px', 
                fontFamily: "'DM Sans', sans-serif", 
                fontWeight: '700',
                fontVariationSettings: "'opsz' 14" 
              }}
            >
              Upsells
            </h1>
            <p 
              style={{ 
                color: '#a6a9b2', 
                fontSize: '16px', 
                fontFamily: "'DM Sans', sans-serif", 
                fontWeight: '400',
                lineHeight: '1.6',
                maxWidth: '900px',
                fontVariationSettings: "'opsz' 14" 
              }}
            >
              Intelligent automations that help you maximize occupancy and leave less money on the table. Customize your upsell settings and messages to suit your property and guest preferences.
            </p>
          </div>

   
       <div style={{ borderTop: '1px solid #013280', marginBottom: '40px' }}></div>
          <div 
            style={{
              width: '100%',
              backgroundColor: 'var(--white-label-background-secondary, #17191F)',
              border: '2px solid #013280',
              borderRadius: '12px',
              padding: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              cursor: 'pointer',
              transition: 'all 0.3s',
              boxShadow: '0 0 25px rgba(1, 50, 128, 0.2)',
              marginBottom: '20px'
            }}
            onClick={() => setSelectedSection("postStayUpsells")}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#01255e';
              e.currentTarget.style.borderColor = '#3e88f7';
              const arrow = e.currentTarget.querySelector('.arrow-icon');
              if (arrow) arrow.style.transform = 'translateX(4px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--white-label-background-secondary, #17191F)';
              e.currentTarget.style.borderColor = '#013280';
              const arrow = e.currentTarget.querySelector('.arrow-icon');
              if (arrow) arrow.style.transform = 'translateX(0)';
            }}
          >
            <div style={{ flex: 1 }}>
              <h3 
                style={{ 
                  color: 'white', 
                  fontSize: '22px', 
                  fontFamily: "'DM Sans', sans-serif", 
                  fontWeight: '700',
                  marginBottom: '12px',
                  fontVariationSettings: "'opsz' 14"
                }}
              >
                Post-stay Gap Night
              </h3>
              <p 
                style={{ 
                  color: '#a6a9b2', 
                  fontSize: '16px', 
                  fontFamily: "'DM Sans', sans-serif", 
                  fontWeight: '400',
                  lineHeight: '1.6',
                  fontVariationSettings: "'opsz' 14"
                }}
              >
                Send your guests an offer to depart later when there's a vacant night after their stay.
              </p>
            </div>
            <svg 
              className="arrow-icon"
              style={{ 
                width: '24px', 
                height: '24px', 
                color: '#3e88f7', 
                marginLeft: '32px', 
                flexShrink: 0,
                transition: 'transform 0.3s'
              }}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14m-7-7l7 7-7 7" />
            </svg>
          </div>

          <div 
            style={{
              width: '100%',
              backgroundColor: 'var(--white-label-background-secondary, #17191F)',
              border: '2px solid #013280',
              borderRadius: '12px',
              padding: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              cursor: 'pointer',
              transition: 'all 0.3s',
              boxShadow: '0 0 25px rgba(1, 50, 128, 0.2)',
              marginBottom: '20px'
            }}
            onClick={() => setSelectedSection("preStayUpsells")}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#01255e';
              e.currentTarget.style.borderColor = '#3e88f7';
              const arrow = e.currentTarget.querySelector('.arrow-icon');
              if (arrow) arrow.style.transform = 'translateX(4px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--white-label-background-secondary, #17191F)';
              e.currentTarget.style.borderColor = '#013280';
              const arrow = e.currentTarget.querySelector('.arrow-icon');
              if (arrow) arrow.style.transform = 'translateX(0)';
            }}
          >
            <div style={{ flex: 1 }}>
              <h3 
                style={{ 
                  color: 'white', 
                  fontSize: '22px', 
                  fontFamily: "'DM Sans', sans-serif", 
                  fontWeight: '700',
                  marginBottom: '12px',
                  fontVariationSettings: "'opsz' 14"
                }}
              >
                Pre-stay Gap Night
              </h3>
              <p 
                style={{ 
                  color: '#a6a9b2', 
                  fontSize: '16px', 
                  fontFamily: "'DM Sans', sans-serif", 
                  fontWeight: '400',
                  lineHeight: '1.6',
                  fontVariationSettings: "'opsz' 14"
                }}
              >
                Send your guests an offer to arrive earlier when there's a vacant night before their stay.
              </p>
            </div>
            <svg 
              className="arrow-icon"
              style={{ 
                width: '24px', 
                height: '24px', 
                color: '#3e88f7', 
                marginLeft: '32px', 
                flexShrink: 0,
                transition: 'transform 0.3s'
              }}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14m-7-7l7 7-7 7" />
            </svg>
          </div>

          <div 
            style={{
              width: '100%',
              backgroundColor: 'var(--white-label-background-secondary, #17191F)',
              border: '2px solid #013280',
              borderRadius: '12px',
              padding: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              cursor: 'pointer',
              transition: 'all 0.3s',
              boxShadow: '0 0 25px rgba(1, 50, 128, 0.2)',
              marginBottom: '20px'
            }}
            onClick={() => setSelectedSection("inquiryWinbacks")}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#01255e';
              e.currentTarget.style.borderColor = '#3e88f7';
              const arrow = e.currentTarget.querySelector('.arrow-icon');
              if (arrow) arrow.style.transform = 'translateX(4px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--white-label-background-secondary, #17191F)';
              e.currentTarget.style.borderColor = '#013280';
              const arrow = e.currentTarget.querySelector('.arrow-icon');
              if (arrow) arrow.style.transform = 'translateX(0)';
            }}
          >
            <div style={{ flex: 1 }}>
              <h3 
                style={{ 
                  color: 'white', 
                  fontSize: '22px', 
                  fontFamily: "'DM Sans', sans-serif", 
                  fontWeight: '700',
                  marginBottom: '12px',
                  fontVariationSettings: "'opsz' 14"
                }}
              >
                Inquiry Follow-Ups
              </h3>
              <p 
                style={{ 
                  color: '#a6a9b2', 
                  fontSize: '16px', 
                  fontFamily: "'DM Sans', sans-serif", 
                  fontWeight: '400',
                  lineHeight: '1.6',
                  fontVariationSettings: "'opsz' 14"
                }}
              >
                Send a message following up with guests who inquired but didn't book.
              </p>
            </div>
            <svg 
              className="arrow-icon"
              style={{ 
                width: '24px', 
                height: '24px', 
                color: '#3e88f7', 
                marginLeft: '32px', 
                flexShrink: 0,
                transition: 'transform 0.3s'
              }}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14m-7-7l7 7-7 7" />
            </svg>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpsellsIndex;
