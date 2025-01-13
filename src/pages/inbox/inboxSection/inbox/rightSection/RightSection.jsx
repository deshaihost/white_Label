import React, { useState } from "react";
import "./index.css";
import dummyPropertyImg from "../../../../../public/img/dummyPropertyImg.png";
import { formatDateRange, timeFormat } from "../../../../../helper/commonFun";
import { Link } from "react-router-dom";
import axios from "axios";
import ToastHandle from "../../../../../helper/ToastMessage";
import Loader from "../../../../../helper/Loader";


const RightSection = ({ rightSectionData, updateConversationFromApi, setCurrentView }) => {
  const { arrival_date, departure_date, status, guest_name, sentiment, sentiment_justification, property_name, action_items, guest_chatbot_status, property_chatbot_status, conversation_id } = rightSectionData ? rightSectionData : {};
  const until_formatted = guest_chatbot_status?.until_utc == 'indefinitely' ? 'indefinitely' : (guest_chatbot_status?.until_local ? timeFormat(guest_chatbot_status?.until_local) : null);
  let { channel, is_locked } = rightSectionData || {};

  const [selectedOption, setSelectedOption] = useState('');
  const [toggleStatusLoading, setToggleStatusLoading] = useState(false);

  // Calculate end_time_utc based on timing, for toggle conversation status
  const calculateEndTimeUTC = (timing) => {
    const now = new Date();
    switch (timing) {
      case '15m':
        now.setMinutes(now.getMinutes() + 15);
        break;
      case '1h':
        now.setHours(now.getHours() + 1);
        break;
      case '1d':
        now.setDate(now.getDate() + 1);
        break;
      case 'indefinitely':
        return 'indefinitely';
      default:
        throw new Error('Invalid timing value');
    }
    return now.toISOString();
  };

  const get_current_status = () => {
    const { until_utc } = guest_chatbot_status || {};
  
    // Check to see if a guest status applies
    if (until_utc) {
      let currentTime, untilTime;
      if (until_utc !== 'indefinitely') {
        currentTime = new Date();
        untilTime = new Date(until_utc);
      }
  
      if (untilTime > currentTime || until_utc === 'indefinitely') { // a guest status is active
        if (guest_chatbot_status.status === 'on') { return {'curr_status':'on', source:'guest'}; }
        else if (guest_chatbot_status.status === 'off') { return {'curr_status':'off', source:'guest'}; }
        // else: status is probably 'not_specified'. Use property status
      }
    }

    // Otherwise, use property status
    return {'curr_status':property_chatbot_status, source:'property'}
  };

  const current_status_get = property_chatbot_status ? get_current_status() : null;
  const { curr_status, source } = current_status_get || {};

  const callSetStatusAPI = async (on_or_off, timing) => {
    const baseUrl = process.env.REACT_APP_API_ENDPOINT;
    const API_KEY = process.env.REACT_APP_API_KEY;
    setToggleStatusLoading(true);
  
    const end_time_utc = calculateEndTimeUTC(timing);
  
    try {
      const config = {
        headers: { "X-API-Key": API_KEY },
        validateStatus: function (status) { return status >= 200 && status < 500; } // don't throw an error for non-2xx responses
      };
      const body_data = { conversation_id:rightSectionData.conversation_id, status:on_or_off, until_utc:end_time_utc };
      const response = await axios.put(`${baseUrl}/toggle_conversation_status`, body_data, config);
  
      if (response.status === 200) {
        ToastHandle("Status updated successfully", "success");
        await updateConversationFromApi(conversation_id); // Call the API to get the updated conversation with the new status. This will trigger re-render
      } else {
        ToastHandle(response?.data?.error, "danger");
      }
      return response.data;
    } catch (error) {
      ToastHandle("Internal server error", "danger");
      return { error: "Internal server error" };
    } finally {
      setToggleStatusLoading(false);
    }
  };

  // When the user selects to toggle guest status
  const handleSelectChange = (event, curr_status) => {
    const on_or_off = curr_status === 'on' ? 'off' : 'on';
    callSetStatusAPI(on_or_off, event.target.value);
  };

  // When the user selects to revert guest status
  const handleRevertStatus = (e) => {
    e.preventDefault();
    callSetStatusAPI('not_specified', 'indefinitely');
  };


  // Determines what to display for the status section
  const getStatusText = (status) => {
    if (status === "inquiry") {
      return "Inquiry";
    } else if (["past", "current", "future"].includes(status)) {
      return `${status.charAt(0).toUpperCase() + status.slice(1)} guest`;
    } else {
      return null;
    }
  };

  if (channel) {
    channel = channel.split(" (")[0]; // channel e.g. "Airbnb (via Hostfully)". Remove the second part.
    channel = channel.replace('hostbuddy', 'Chat Window');
  }
  else { channel = ""; }
  const statusText = getStatusText(status);


  return (
    <div className="right-side">
      {/* Mobile Back Button */}
      <div className="d-block d-lg-none mobile-nav">
        <button onClick={() => setCurrentView('messages')} className="btn btn-link">
          Back to Messages
        </button>
      </div>

      <div className="bordr-cl right-title">
        <h2>Reservation</h2>
      </div>

      <div className="row">

        <div className="guest">
          {statusText || guest_name || property_name ? (
            <>
              {statusText && <span>{statusText}</span>}
              <h2>{guest_name}</h2>
              <p>{property_name}</p>
              <p className="guest_date">{arrival_date && formatDateRange(arrival_date, departure_date, true)}</p>
            </>
          ) : (
            <p>No guest selected</p>
          )}
        </div>

      </div>

      {!(channel == 'Chat Window') && (
        !is_locked ? (
          curr_status && (
            <div className="toggle">
              {curr_status === 'on' ? (
                <p style={{fontSize:"12px"}}>HostBuddy is <span style={{color:"rgb(0,180,0)"}}>RESPONDING</span> to this guest</p>
              ) : (
                <p style={{fontSize:"12px"}}>HostBuddy is <span style={{color:"rgb(200,0,0)"}}>NOT RESPONDING</span> to this guest</p>
              )}
              {(source=='guest') && (
                until_formatted === 'indefinitely' ? (
                  <p style={{ fontSize: "12px" }}>Indefinitely</p>
                ) : (
                  <p style={{ fontSize: "12px" }}>Until {until_formatted}</p>
                )
              )}

              {!toggleStatusLoading ? (
                (source=='property') ? (
                  <select className="select-dropdown" value={selectedOption} onChange={(e) => handleSelectChange(e, curr_status)}>
                    <option value="" disabled>Turn {curr_status === 'on' ? 'off' : 'on'}</option>
                    <option value="15m">For 15 minutes</option>
                    <option value="1h">For 1 hour</option>
                    <option value="1d">For 24 hours</option>
                    <option value="indefinitely">Indefinitely</option>
                  </select>
                ) : (
                  <div style={{ textAlign: 'center' }}>
                    <a style={{ fontSize: "14px", color: "#0d6efd", cursor: "pointer" }} onClick={handleRevertStatus}>
                      Turn back {curr_status === 'on' ? 'off' : 'on'}
                    </a>
                  </div>
                )
              ) : (
                <Loader />
              )}
            </div>
          )
        ) : (
          <div className="toggle">
            <p style={{fontSize:"12px"}}>HostBuddy is <span style={{color:"rgb(200,0,0)"}}>NOT RESPONDING</span> to this guest.</p>
            <p style={{fontSize:"12px"}}><Link to='/properties' style={{fontSize:"14px"}}>Unlock</Link> this property to start responding.</p>
          </div>
        )
      )}
      
      {!(channel == 'Chat Window') && (
        <div className="issue">
          <h3>Open Issues</h3>
          {action_items && action_items.filter(obj => obj.status === "incomplete").length > 0 ? (
            action_items.filter(obj => obj.status === "incomplete").map((obj, index) => (
              <p key={index} style={{ marginBottom: "10px" }}>{obj.item}</p>
            ))
          ) : (
            <p style={{color:'#BBB'}}>None</p>
          )}
          {action_items && action_items.filter(obj => obj.status === "incomplete").length > 0 && (
            <div style={{ display: "flex", justifyContent: "center", marginTop: "5px" }}>
              <Link to={`/action-item?property_name=${property_name}`} style={{ fontSize: "14px" }}>Manage</Link>
            </div>
          )}
        </div>
      )}

      {!(channel == 'Chat Window') && (
        <div className="satisfy">
          <h2>Sentiment</h2>
          {sentiment ? (
            <>
              <p className="result" style={{ color: sentiment === "positive" ? "rgb(0, 180, 0)" : sentiment === "negative" ? "rgb(200, 0, 0)" : "#BBB" }}>
                {sentiment.charAt(0).toUpperCase() + sentiment.slice(1)}
              </p>
              {sentiment_justification && (
                <p style={{ fontSize:'12px', marginTop:'3px' }}>{sentiment_justification}</p>
              )}
            </>
          ) : (
            <p style={{ color:"#BBB", fontSize:'16px' }}>No data yet</p>
          )}
        </div>
      )}
      
      <div className="about about-inner user-detail">
        <p>Channel: {channel ? channel : '--'}</p>
      </div>

      {/* Data not yet available in the API
      <div className="about">
        <div className="about-inner">
          <h2>About {guest_name}</h2>
          <div className="user-detail">
            <p>Phone Number: 98765433</p>
            <p>Plateform Booked: {channel}</p>
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
          </div>
        </div>
      </div>
      */}
    </div>
  );
};

export default RightSection;
