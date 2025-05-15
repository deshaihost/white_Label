import React, { useState, useEffect, useRef } from "react";
import "./index.css";
import "./multiselect.css";
import dummyPropertyImg from "../../../../../public/img/dummyPropertyImg.png";
import { formatDateRange, timeFormat } from "../../../../../helper/commonFun";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import ToastHandle from "../../../../../helper/ToastMessage";
import Loader from "../../../../../helper/Loader";
import HostBuddyIcon from "./icons/hostbuddy_icon.svg";
import NeutralIcon from "./icons/neutral_sentiment_icon.svg";
import PositiveIcon from "./icons/positive_sentiment_icon.svg";
import NegativeIcon from "./icons/negative_sentiment_icon.svg";
import ChevDownIcon from "./icons/chevDown_icon.svg";
import CheckBoxIcon from "../mildeSection/message/icons/check_box.svg";
import { getActiveToken } from "../../../../../helper/apiCore";

// Import action items API function from ActionsItemsTable
const callGetActionItemsApi = async (setActionItems, setGetActionItemsLoading) => {
  const baseUrl = process.env.REACT_APP_API_ENDPOINT;
  const API_KEY = process.env.REACT_APP_API_KEY;
  setGetActionItemsLoading(true);

  try {
    const config = {
      headers: { "X-API-Key": API_KEY },
      validateStatus: function (status) { return status >= 200 && status < 500; }
    };
    const response = await axios.get(`${baseUrl}/get_action_items?status=incomplete&limit=200`, config);

    if (response.status === 200) {
      setActionItems(response.data.action_items);
    }
    else { ToastHandle(response?.data?.error, "danger"); }
    return response.data;
  } catch (error) {
    ToastHandle("Error - unable to get action items", "danger");
    return { error: "Internal server error" };
  } finally {
    setGetActionItemsLoading(false);
  }
};

const RightSection = ({ rightSectionData, updateConversationFromApi, setCurrentView }) => {
  const { arrival_date, departure_date, status, guest_name, sentiment, sentiment_justification, property_name, guest_chatbot_status, property_chatbot_status, conversation_id, image_url, user } = rightSectionData ? rightSectionData : {};
  
  const until_formatted = guest_chatbot_status?.until_utc == 'indefinitely' ? 'indefinitely' : (guest_chatbot_status?.until_local ? timeFormat(guest_chatbot_status?.until_local) : null);
  let { channel, is_locked } = rightSectionData || {};
  const [selectedOption, setSelectedOption] = useState('');
  const [toggleStatusLoading, setToggleStatusLoading] = useState(false);
  const [issuesExpanded, setIssuesExpanded] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [hostbuddyDropdownOpen, setHostbuddyDropdownOpen] = useState(false);
  const [selectedSentiment, setSelectedSentiment] = useState(sentiment || 'neutral');
  // State for sub-user names
  const [subUserNames, setSubUserNames] = useState([]);
  const [subUserLoading, setSubUserLoading] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [assignUserDropdownOpen, setAssignUserDropdownOpen] = useState(false);
  
  const dropdownRef = useRef(null);
  const assignUserDropdownRef = useRef(null);
  const hostbuddyDropdownRef = useRef(null);
  const navigate = useNavigate();
  
  // State for action items
  const [actionItems, setActionItems] = useState([]);
  const [getActionItemsLoading, setGetActionItemsLoading] = useState(false);
    // Fetch action items when component mounts
  useEffect(() => {
    callGetActionItemsApi(setActionItems, setGetActionItemsLoading);
  }, []);

  // Handle user selection for multi-select
  const handleUserSelect = (user) => {
    setSelectedUsers(prev => {
      // Check if user is already selected
      if (prev.some(selected => selected.email === user.email)) {
        // If already selected, remove it
        return prev.filter(selected => selected.email !== user.email);
      } else {
        // If not selected, add it
        return [...prev, user];
      }
    });
  };

  // Handle removing a user from selection
  const handleRemoveUser = (email) => {
    setSelectedUsers(prev => prev.filter(user => user.email !== email));
  };

  // Clear all selected users
  const handleClearAllUsers = () => {
    setSelectedUsers([]);
  };

  // Fetch sub-user names when component mounts
  useEffect(() => {
    const fetchSubUserNames = async () => {
      setSubUserLoading(true);
      try {
        const baseUrl = process.env.REACT_APP_API_ENDPOINT;
        const API_KEY = process.env.REACT_APP_API_KEY;
        
        // Get token from the apiCore's active token or fall back to localStorage
        const token = getActiveToken() || localStorage.getItem('authToken');
        
        const config = {
          headers: { 
            "X-API-Key": API_KEY,
            "Authorization": token ? `Bearer ${token}` : undefined
          },
          validateStatus: function (status) { return status >= 200 && status < 500; }
        };
        
        const response = await axios.get(`${baseUrl}/get_sub_user_names`, config);
        
        if (response.status === 200) {
          setSubUserNames(response.data.sub_user_names || []);
        } else {
          ToastHandle(response?.data?.error || "Failed to fetch user names", "danger");
        }
      } catch (error) {
        ToastHandle("Error fetching user names", "danger");
      } finally {
        setSubUserLoading(false);
      }
    };
    
    fetchSubUserNames();
  }, []);  
  // Function to assign selected users to the conversation
  const assignUsersToConversation = async () => {
    if (!conversation_id) return;

    try {
      const baseUrl = process.env.REACT_APP_API_ENDPOINT;
      const API_KEY = process.env.REACT_APP_API_KEY;
      
      // Get token from the apiCore's active token or fall back to localStorage
      const token = getActiveToken() || localStorage.getItem('authToken');
      
      const config = {
        headers: { 
          "X-API-Key": API_KEY,
          "Authorization": token ? `Bearer ${token}` : undefined
        },
        validateStatus: function (status) { return status >= 200 && status < 500; }
      };
      
      // Extract emails from selected users
      const subUserEmails = selectedUsers.map(user => user.email);
      
      const bodyData = {
        conversation_id: conversation_id,
        sub_user_emails: subUserEmails
      };
      
      const response = await axios.put(`${baseUrl}/assign_sub_users_to_conversation`, bodyData, config);
      
      if (response.status === 200) {
        ToastHandle("Users assigned successfully", "success");
        // You can optionally update the conversation data if needed
        if (updateConversationFromApi && typeof updateConversationFromApi === 'function') {
          updateConversationFromApi(conversation_id);
        }
      } else {
        ToastHandle(response?.data?.error || "Failed to assign users", "danger");
      }
    } catch (error) {
      console.error("Error assigning users:", error);
      ToastHandle("Error assigning users", "danger");
    }
  };
  // Use a debounced effect to call the assign function when selectedUsers changes
  useEffect(() => {
    // Skip initial render and if no conversation is selected
    if (!conversation_id) return;
    
    // Create a debounce timer to wait a short period after selection changes before making the API call
    const debounceTimer = setTimeout(() => {
      assignUsersToConversation();
    }, 500); // 500ms delay
    
    // Clear timeout if selectedUsers changes again within the delay period
    return () => clearTimeout(debounceTimer);
  }, [selectedUsers, conversation_id]);
  // Fetch any existing assigned users when conversation changes
  useEffect(() => {
    const fetchAssignedUsers = async () => {
      if (!conversation_id) {
        setSelectedUsers([]);
        return;
      }
      
      try {
        const baseUrl = process.env.REACT_APP_API_ENDPOINT;
        const API_KEY = process.env.REACT_APP_API_KEY;
        
        // Get token from the apiCore's active token or fall back to localStorage
        const token = getActiveToken() || localStorage.getItem('authToken');
        
        const config = {
          headers: { 
            "X-API-Key": API_KEY,
            "Authorization": token ? `Bearer ${token}` : undefined
          },
          validateStatus: function (status) { return status >= 200 && status < 500; }
        };
        
        const response = await axios.get(`${baseUrl}/get_sub_users_for_conversation/${conversation_id}`, config);
        
        if (response.status === 200 && response.data.sub_user_emails) {
          // Map assigned users to match our selected users format
          const assignedUsers = response.data.sub_user_emails.map(email => {
            // Find matching user in subUserNames
            const user = subUserNames.find(user => user.email === email);
            return user || { email, display_name: email.split('@')[0] }; // Fallback if user not found
          });
          
          setSelectedUsers(assignedUsers);
        }
      } catch (error) {
        console.error("Error fetching assigned users:", error);
      }
    };
    
    // Only run if we have sub-user names loaded
    if (subUserNames.length > 0) {
      fetchAssignedUsers();
    }
  }, [conversation_id, subUserNames]);

  // Effect to handle outside clicks for dropdown
  useEffect(() => {
    function handleOutsideClick(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
      if (assignUserDropdownRef.current && !assignUserDropdownRef.current.contains(event.target)) {
        setAssignUserDropdownOpen(false);
      }
    }
    
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);
  
  // Update selectedSentiment when rightSectionData changes
  useEffect(() => {
    if (sentiment) {
      setSelectedSentiment(sentiment);
    } else {
      setSelectedSentiment('neutral'); // Default to neutral
    }
  }, [sentiment]);

  // Handle clicks outside the Hostbuddy dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (hostbuddyDropdownRef.current && !hostbuddyDropdownRef.current.contains(event.target)) {
        setHostbuddyDropdownOpen(false);
      }
    };
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  
  // Force display for testing - remove in production
  const isCheckInToday = true; // For testing
  const isCheckOutToday = true; // For testing
  // Function to handle sentiment selection
  const handleSentimentSelect = (sentiment) => {
    setSelectedSentiment(sentiment);
    setDropdownOpen(false);
    
    // Call the API to update the sentiment if conversation_id exists
    if (conversation_id) {
      updateSentiment(conversation_id, sentiment);
    }
  };

  // Function to handle keyboard navigation in dropdown
  const handleHostbuddyDropdownKeyDown = (e) => {
    if (hostbuddyDropdownOpen) {
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault();
        const menu = hostbuddyDropdownRef.current?.querySelector('[role="listbox"]');
        if (menu) {
          const options = Array.from(menu.querySelectorAll('[role="option"]'));
          const currentFocus = document.activeElement;
          const currentIndex = options.indexOf(currentFocus);
          
          let nextIndex;
          if (e.key === 'ArrowDown') {
            nextIndex = currentIndex < options.length - 1 ? currentIndex + 1 : 0;
          } else {
            nextIndex = currentIndex > 0 ? currentIndex - 1 : options.length - 1;
          }
          
          options[nextIndex]?.focus();
        }
      } else if (e.key === 'Escape') {
        setHostbuddyDropdownOpen(false);
      } else if (e.key === 'Home') {
        e.preventDefault();
        const menu = hostbuddyDropdownRef.current?.querySelector('[role="listbox"]');
        menu?.querySelector('[role="option"]')?.focus();
      } else if (e.key === 'End') {
        e.preventDefault();
        const menu = hostbuddyDropdownRef.current?.querySelector('[role="listbox"]');
        const options = menu?.querySelectorAll('[role="option"]');
        options?.[options.length - 1]?.focus();
      }
    }
  };

  // Function to call the API to update sentiment
  const updateSentiment = async (conversationId, sentimentValue) => {
    if (!conversationId) return;
    
    const baseUrl = process.env.REACT_APP_API_ENDPOINT;
    const API_KEY = process.env.REACT_APP_API_KEY;
    
    try {
      // Get token from the apiCore's active token or fall back to localStorage
      const token = getActiveToken() || localStorage.getItem('authToken');
      
      const config = {
        headers: { 
          "X-API-Key": API_KEY,
          "Authorization": token ? `Bearer ${token}` : undefined
        },
        validateStatus: function (status) { return status >= 200 && status < 500; }
      };
        const bodyData = { 
        conversation_id: conversationId,
        new_sentiment: sentimentValue,
        property_name: property_name || undefined
      };
      
      const response = await axios.post(`${baseUrl}/change_sentiment`, bodyData, config);
  
      if (response.status === 200) { 
        ToastHandle(`Sentiment updated to ${sentimentValue}`, "success");
        
        // Update the conversation data if needed
        if (updateConversationFromApi && typeof updateConversationFromApi === 'function') {
          updateConversationFromApi(conversationId);
        }
      } else { 
        ToastHandle(response?.data?.error || "Failed to update sentiment", "danger"); 
      }
    } catch (error) {
      ToastHandle("Error updating sentiment", "danger");
    }
  };

  // Function to get the appropriate icon based on sentiment
  const getSentimentIcon = (sentiment) => {
    switch(sentiment) {
      case 'positive':
        return PositiveIcon;
      case 'negative':
        return NegativeIcon;
      case 'neutral':
      default:
        return NeutralIcon;
    }
  };
  const currentDate = new Date();
  
  const isToday = (dateString) => {
    if (!dateString) return false;
    
    try {
      // Parse the YYMMDD_HHMMSS format
      // Format example: 250419_120000 (for April 19, 2025 at 12:00:00)
      const year = parseInt('20' + dateString.substring(0, 2)); // Convert YY to YYYY
      const month = parseInt(dateString.substring(2, 4)) - 1; // JS months are 0-indexed
      const day = parseInt(dateString.substring(4, 6));
      
      const departure = new Date(year, month, day);
      
      return (
        currentDate.getFullYear() === departure.getFullYear() &&
        currentDate.getMonth() === departure.getMonth() &&
        currentDate.getDate() === departure.getDate()
      );
    } catch (error) {
      console.error("Error comparing dates:", error);
      return false;
    }
  };





  console.log("Debug - Arrival date:", arrival_date);
  console.log("Debug - Departure date:", departure_date);

  // Format timestamp for issues in "Month Time" format (e.g. "Feb 3:45pm")
  const formatIssueTime = (dateTimeString) => {
    if (!dateTimeString) return "";
    
    const date = new Date(dateTimeString);
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    
    const month = months[date.getMonth()];
    let hours = date.getHours();
    let minutes = date.getMinutes();
    const ampm = hours >= 12 ? "pm" : "am";
    
    hours = hours % 12;
    hours = hours ? hours : 12; // 0 hour should be 12
    minutes = minutes < 10 ? "0" + minutes : minutes;
    
    return `${month} ${hours}:${minutes}${ampm}`;
  };

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

  // Navigate to action items page
  const navigateToActionItems = () => {
    navigate('/action-item');
  };

  return (
    <div className="right-side" >
      {/* Mobile Back Button */}
      <div className="d-block d-lg-none mobile-nav">
        <button onClick={() => setCurrentView('messages')} className="btn btn-link">
          Back to Messages
        </button>
      </div>

      <div className="right-title">
        <p>Reservation details</p>
      </div>

      {/* Guest Image */}
      <div className="guest-image-container" style={{ marginBottom: '2px', textAlign: 'center' }}>
        {image_url ? (
          <img 
            src={image_url} 
            alt={`${guest_name || 'Guest'}`}
            style={{ 
              
              width: '85%',
              height: '75%',
              objectFit: 'contain',
              borderRadius: '8px',
              display: 'block',
              marginLeft: '0'
            }}
            onError={(e) => {
              e.target.onerror = null; 
              e.target.src = dummyPropertyImg;
            }}
          />
        ) : (
          <img 
            src={dummyPropertyImg} 
            alt="Default guest" 
            style={{ 
              maxWidth: '272px',
              maxHeight: '220px',
              width: 'auto',
              height: 'auto',
              objectFit: 'contain',
              borderRadius: '8px',
              display: 'block',
              marginLeft: '0'
            }}
          />
        )}
      </div>
      
      {/* User info aligned to the left */}
      {user && (
        <div style={{ textAlign: 'left', paddingLeft: '0px', marginBottom: '2px' ,marginTop: '5px'}}>
          <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '4px' }}>
            <div 
              style={{
                display: 'inline-block',
                color: '#BDC1C9',
                fontFamily: '"DM Sans", Helvetica',
                fontSize: '14px',
                fontStyle: 'normal',
                fontWeight: 500,
                letterSpacing: '0px',
                lineHeight: 'var(--body-medium-med-500-line-height)',
                padding: '2px ',
                borderRadius: '4px',
                height: '25px',
                backgroundColor: '#bdc1c926'
              }}
            >
              {user ? user.charAt(0).toUpperCase() + user.slice(1) : user}
            </div>
            
            {/* Check-in-today badge */}
            {isToday(arrival_date) && 
                              <span className="checkin-badge">
                                check-in today
                              </span>
                            }
            
            {/* Check-out-today badge */}
            {isToday(departure_date) && 
                              <span className="checkout-badge">
                                check-out today
                              </span>
                            }
          </div>
        </div>
      )}

      <div >

        <div className="guest">
          {statusText || guest_name || property_name ? (
            <>
              {/* {statusText && <span>{statusText}</span>} */}
              {/* <h1 style={{ fontSize: '14px', margin: 0 }}>{guest_name}</h1> */}
              <h1 style={{ fontSize: '16px' ,fontWeight:"600", fontFamily: '"DM Sans", Helvetica' }}>{property_name}</h1>
              <h1 className="guest_date" style={{ fontSize: '14px' }}>{arrival_date && formatDateRange(arrival_date, departure_date, true)}</h1>
            </>
          ) : (
            <p>No guest selected</p>
          )}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '4px', marginBottom: '5px' }}>
          <span style={{ 
            display: 'inline-block',
            color: '#BDC1C9',
            fontFamily: '"DM Sans", Helvetica',
            fontSize: '14px',
            fontStyle: 'normal',
            fontWeight: 700,
            letterSpacing: '0px',
            lineHeight: 'var(--body-medium-med-500-line-height)',
            padding: '1px 6px',
            borderRadius: '3px',
            height: '25px',
            backgroundColor: '#bdc1c926'
          }}>{channel}</span>
        </div>
        
        {/* Adding dividing line after channel */}
        <div style={{ 
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)', 
          margin: '10px auto', 
          width: '100%', 
          maxWidth: '400px' 
        }}></div>

        {/* Contact Information Section */}
        <div style={{ marginBottom: '15px' }}>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            marginBottom: '10px' 
          }}>
            <h2 style={{ 
              margin: 0,
              color: '#ffffff',
              fontFamily: '"Poppins-SemiBold", Helvetica',
              fontSize: '16px',
              fontWeight: 600,
              lineHeight: '19.6px',
            }}>Contact information</h2>
            <span style={{ 
              color: '#4187ff', 
              fontSize: '14px', 
              cursor: 'pointer',
              fontFamily: '"DM Sans", Helvetica'
            }}>
              Edit
            </span>
          </div>
          
          <div style={{ marginBottom: '5px' }}>
            <span style={{ 
              color: '#8b8d94',
              fontFamily: '"DM Sans", Helvetica',
              fontSize: '14px',
              fontWeight: 400
            }}>
              Phone:
            </span>
            <span style={{ 
              color: 'white',
              fontFamily: '"DM Sans", Helvetica',
              fontSize: '14px',
              fontWeight: 400,
              marginLeft: '5px'
            }}>
              (316) 555-0116
            </span>
          </div>
          
          <div>
            <span style={{ 
              color: '#8b8d94',
              fontFamily: '"DM Sans", Helvetica',
              fontSize: '14px',
              fontWeight: 400
            }}>
              Email:
            </span>
            <span style={{ 
              color: 'white',
              fontFamily: '"DM Sans", Helvetica',
              fontSize: '14px',
              fontWeight: 400,
              marginLeft: '5px'
            }}>
              floydmiles@gmail.com
            </span>
          </div>
        </div>

        <div style={{ 
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)', 
          margin: '10px auto', 
          width: '100%', 
          maxWidth: '400px' 
        }}></div>

      </div>

      {!(channel == 'Chat Window') && (
        !is_locked ? (
          curr_status && (
            <div className="toggle">
              {curr_status && (
                <div style={{fontSize:"12px", display: "flex", alignItems: "center", gap: "5px", marginBottom: "10px"}}>                  <img src={HostBuddyIcon} alt="HostBuddy" style={{width: "25px", height: "25px"}} />
                  <span style={{fontSize:"14px" ,fontWeight:"600" , fontFamily:"Poppins Helvetica"}}>HostBuddy </span>
                  <span>is</span>
                  {!toggleStatusLoading ? (
                    <div ref={hostbuddyDropdownRef} style={{ position: 'relative', display: 'inline-block', width:"15vw" }}>
                      {/* Custom Dropdown Button */}
                      <div 
                        onClick={() => setHostbuddyDropdownOpen(!hostbuddyDropdownOpen)}
                        style={{
                          alignItems: 'center',
                          display: 'flex',
                          backgroundColor: '#24262E',
                          border: '1px solid',
                          borderColor: 'rgba(57, 61, 70, 1)',
                          borderRadius: '4px',
                          gap: '6px',
                          height: '32px',
                          padding: '0px 8px',
                          position: 'relative',
                          width: '100%',
                          cursor: 'pointer',
                          color: curr_status === 'on' ? "rgb(0,180,0)" : "rgb(200,0,0)",
                          fontWeight: "bold",
                          transition: 'background-color 0.2s ease'
                        }}
                        tabIndex={0}
                        role="button"
                        aria-haspopup="listbox"
                        aria-expanded={hostbuddyDropdownOpen}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            setHostbuddyDropdownOpen(!hostbuddyDropdownOpen);
                          }
                          handleHostbuddyDropdownKeyDown(e);
                        }}
                      >
                        <span style={{ display: 'inline-block', marginRight: '4px' }}>●</span>
                        <span style={{ flexGrow: 1 }}>{curr_status === 'on' ? 'Active' : 'Turned off'}</span>
                        <img 
                          src={ChevDownIcon} 
                          alt="Dropdown Icon" 
                          style={{ 
                            width: '16px', 
                            height: '16px', 
                            transform: hostbuddyDropdownOpen ? 'rotate(180deg)' : 'rotate(0)',
                            transition: 'transform 0.3s ease'
                          }} 
                        />
                      </div>
                      
                      {/* Custom Dropdown Menu */}
                      {hostbuddyDropdownOpen && (
                        <div 
                          style={{
                            position: 'absolute',
                            top: '100%',
                            left: '0',
                            right: '0',
                            backgroundColor: '#262730',
                            borderRadius: '4px',
                            marginTop: '4px',
                            zIndex: 100,
                            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
                            border: '1px solid rgba(57, 61, 70, 1)',
                            overflow: 'hidden'
                          }}
                          role="listbox"
                        >
                          {curr_status === 'on' && (                            <div 
                              onClick={() => {
                                callSetStatusAPI('off', 'indefinitely');
                                setHostbuddyDropdownOpen(false);
                              }}
                              style={{
                                padding: '8px 16px',
                                cursor: 'pointer',
                                transition: 'background-color 0.2s ease',
                                color: 'white',                              hoverBackgroundColor: '#393d46'
                              }}
                              role="option"
                              tabIndex={0}
                              onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#393d46'}
                              onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                              onFocus={(e) => e.currentTarget.style.backgroundColor = '#393d46'}
                              onBlur={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                  e.preventDefault();
                                  callSetStatusAPI('off', 'indefinitely');
                                  setHostbuddyDropdownOpen(false);
                                }
                              }}
                            >
                              Turn off
                            </div>
                          )}
                          
                          {curr_status === 'off' && (
                            <div 
                              onClick={() => {
                                callSetStatusAPI('on', 'indefinitely');
                                setHostbuddyDropdownOpen(false);
                              }}
                              style={{
                                padding: '8px 16px',
                                cursor: 'pointer',
                                transition: 'background-color 0.2s ease',
                                color: 'white',
                                hoverBackgroundColor: '#393d46'
                              }}                              role="option"
                              tabIndex={0}
                              onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#393d46'}
                              onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                              onFocus={(e) => e.currentTarget.style.backgroundColor = '#393d46'}
                              onBlur={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                  e.preventDefault();
                                  callSetStatusAPI('on', 'indefinitely');
                                  setHostbuddyDropdownOpen(false);
                                }
                              }}
                            >
                              Turn back on
                            </div>
                          )}
                          
                          {curr_status === 'on' && (
                            <>                              <div 
                                onClick={() => {
                                  callSetStatusAPI(curr_status, '15m');
                                  setHostbuddyDropdownOpen(false);
                                }}
                                style={{
                                  padding: '8px 16px',
                                  cursor: 'pointer',
                                  transition: 'background-color 0.2s ease',
                                  color: 'white'
                                }}
                                role="option"
                                tabIndex={0}                                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#393d46'}
                                onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                                onFocus={(e) => e.currentTarget.style.backgroundColor = '#393d46'}
                                onBlur={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter' || e.key === ' ') {
                                    e.preventDefault();
                                    callSetStatusAPI(curr_status, '15m');
                                    setHostbuddyDropdownOpen(false);
                                  }
                                }}
                              >
                                For 15 minutes
                              </div>                              <div 
                                onClick={() => {
                                  callSetStatusAPI(curr_status, '1h');
                                  setHostbuddyDropdownOpen(false);
                                }}
                                style={{
                                  padding: '8px 16px',
                                  cursor: 'pointer',
                                  transition: 'background-color 0.2s ease',
                                  color: 'white'
                                }}                                role="option"
                                tabIndex={0}
                                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#393d46'}
                                onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                                onFocus={(e) => e.currentTarget.style.backgroundColor = '#393d46'}
                                onBlur={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter' || e.key === ' ') {
                                    e.preventDefault();
                                    callSetStatusAPI(curr_status, '1h');
                                    setHostbuddyDropdownOpen(false);
                                  }
                                }}
                              >
                                For 1 hour
                              </div>                              <div 
                                onClick={() => {
                                  callSetStatusAPI(curr_status, '1d');
                                  setHostbuddyDropdownOpen(false);
                                }}
                                style={{
                                  padding: '8px 16px',
                                  cursor: 'pointer',
                                  transition: 'background-color 0.2s ease',
                                  color: 'white'
                                }}                                role="option"
                                tabIndex={0}
                                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#393d46'}
                                onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                                onFocus={(e) => e.currentTarget.style.backgroundColor = '#393d46'}
                                onBlur={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter' || e.key === ' ') {
                                    e.preventDefault();
                                    callSetStatusAPI(curr_status, '1d');
                                    setHostbuddyDropdownOpen(false);
                                  }
                                }}
                              >
                                For 24 hours
                              </div>                              <div 
                                onClick={() => {
                                  callSetStatusAPI(curr_status, 'indefinitely');
                                  setHostbuddyDropdownOpen(false);
                                }}
                                style={{
                                  padding: '8px 16px',
                                  cursor: 'pointer',
                                  transition: 'background-color 0.2s ease',
                                  color: 'white'
                                }}                                role="option"
                                tabIndex={0}
                                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#393d46'}
                                onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                                onFocus={(e) => e.currentTarget.style.backgroundColor = '#393d46'}
                                onBlur={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter' || e.key === ' ') {
                                    e.preventDefault();
                                    callSetStatusAPI(curr_status, 'indefinitely');
                                    setHostbuddyDropdownOpen(false);
                                  }
                                }}
                              >
                                Indefinitely
                              </div>
                            </>
                          )}
                        </div>
                      )}
                    </div>
                  ) : (
                    <span style={{display: "inline-flex", alignItems: "center", height: "24px"}}><Loader /></span>
                  )}
                </div>
              )}

              {/* {(source=='guest') && (
                until_formatted === 'indefinitely' ? (
                  <p style={{ fontSize: "12px" }}>Indefinitely</p>
                ) : (
                  <p style={{ fontSize: "12px" }}>Until {until_formatted}</p>
                )
              )} */}

              {/* Additional time selection dropdown if needed */}
              


              {/* {here setDuration code is available below} */}
              
              {/* {!toggleStatusLoading && curr_status && source=='property' && (
                <select className="select-dropdown" value={selectedOption} onChange={(e) => handleSelectChange(e, curr_status)}>
                  <option value="" disabled>Set duration</option>
                  <option value="15m">For 15 minutes</option>
                  <option value="1h">For 1 hour</option>
                  <option value="1d">For 24 hours</option>
                  <option value="indefinitely">Indefinitely</option>
                </select>
              )} */}
                {source=='guest1' && !toggleStatusLoading && (
                <div style={{ textAlign: 'center' }}>
                  <a 
                    style={{ 
                      fontSize: "14px", 
                      color: "#0d6efd", 
                      cursor: "pointer",
                      padding: "4px 8px",
                      marginTop: "8px",
                      display: "inline-block"
                    }} 
                    onClick={handleRevertStatus}
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handleRevertStatus();
                      }
                    }}
                  >
                    11Turn back {curr_status === 'on' ? 'off' : 'on'}
                  </a>
                </div>
              )}
            </div>
          )
        ) : 
        (
          <div className="toggle">
            <p style={{fontSize:"12px"}}>HostBuddy is <span style={{color:"rgb(200,0,0)"}}>NOT RESPONDING</span> to this guest.</p>
            <p style={{fontSize:"12px"}}><Link to='/properties' style={{fontSize:"14px"}}>Unlock</Link> this property to start responding.</p>
          </div>
        )
      )}

      {!(channel == 'Chat Window') && (
        <div className="satisfy">
          <h2>Sentiment</h2>
          <div ref={dropdownRef} style={{ position: 'relative' }}>
            {/* Sentiment Dropdown Button */}            <div 
              onClick={() => setDropdownOpen(!dropdownOpen)}              
              onMouseDown={(e) => {
                const currentSentiment = selectedSentiment;
                if (currentSentiment === 'positive') {
                  e.currentTarget.style.backgroundColor = '#002B0B';
                } else if (currentSentiment === 'negative') {
                  e.currentTarget.style.backgroundColor = '#3B1900';
                } else {
                  e.currentTarget.style.backgroundColor = 'rgba(15, 17, 23, 0.6)';
                }
              }}
              onMouseUp={(e) => {
                const currentSentiment = selectedSentiment;
                if (currentSentiment === 'positive') {
                  e.currentTarget.style.backgroundColor = '#014714';
                } else if (currentSentiment === 'negative') {
                  e.currentTarget.style.backgroundColor = '#4D2100';
                } else {
                  e.currentTarget.style.backgroundColor = 'rgba(189, 193, 201, 0.08)';
                }
              }}onMouseEnter={(e) => {
                const currentSentiment = selectedSentiment;
                if (currentSentiment === 'positive') {
                  e.currentTarget.style.backgroundColor = '#036920';
                } else if (currentSentiment === 'negative') {
                  e.currentTarget.style.backgroundColor = '#7A3601'; // Same as default per specs
                } else {
                  e.currentTarget.style.backgroundColor = 'rgba(189, 193, 201, 0.08)'; // Same as default per specs
                }
              }}
              onMouseLeave={(e) => {
                const currentSentiment = selectedSentiment;
                if (currentSentiment === 'positive') {
                  e.currentTarget.style.backgroundColor = '#014714';
                } else if (currentSentiment === 'negative') {
                  e.currentTarget.style.backgroundColor = '#4D2100';
                } else {
                  e.currentTarget.style.backgroundColor = 'rgba(189, 193, 201, 0.08)';
                }
              }}              style={{
                alignItems: 'center',
                cursor: 'pointer',
                alignSelf: 'stretch',
                backgroundColor: selectedSentiment === 'positive' 
                  ? '#014714' 
                  : selectedSentiment === 'negative' 
                    ? '#4D2100' 
                    : 'rgba(189, 193, 201, 0.08)',
                borderRadius: '4px',
                display: 'flex',
                gap: '6px',
                height: '32px',
                padding: '0px 8px',
                position: 'relative',
                width: '100%',
                marginLeft: '0px',
                transition: 'background-color 0.2s ease'
              }}
            >
              <img src={getSentimentIcon(selectedSentiment)} alt="Sentiment Icon" style={{ width: "18px", height: "18px" }} />
              <span 
                style={{ 
                  color: selectedSentiment === 'neutral' 
                    ? "#BBB" 
                    : selectedSentiment === 'positive' 
                      ? "white" 
                      : "white",
                  flexGrow: 1,
                  fontSize: '14px'
                }}
              >
                {selectedSentiment.charAt(0).toUpperCase() + selectedSentiment.slice(1)}
              </span>
              <img 
                src={ChevDownIcon} 
                alt="Dropdown Icon" 
                style={{ 
                  width: "16px", 
                  height: "16px", 
                  transform: dropdownOpen ? 'rotate(180deg)' : 'rotate(0)',
                  transition: 'transform 0.3s ease'
                }} 
              />
            </div>            {/* Dropdown Menu */}
            {dropdownOpen && (              
              <div 
                style={{
                  position: 'absolute',
                  top: '80%',
                  left: '0',
                  right: '0',
                  backgroundColor: '#262730',
                  borderRadius: '4px',
                  marginTop: '4px',
                  zIndex: 100,
                  border: '2px solid rgba(57, 61, 70, 1)',
                  overflow: 'hidden'
                }}
              >                {/* Neutral Option */}
                <div 
                  onClick={() => handleSentimentSelect('neutral')}
                  style={{
                    padding: '8px 16px',
                    cursor: 'pointer',
                    transition: 'background-color 0.2s ease',
                    
                  }}
                >
                  <span style={{ color: 'white' }}>Neutral</span>
                </div>
                
                {/* Positive Option */}
                <div 
                  onClick={() => handleSentimentSelect('positive')}
                  style={{
                    padding: '8px 16px',
                    cursor: 'pointer',
                    transition: 'background-color 0.2s ease',
                    
                  }}
                >
                  <span style={{ color: 'white' }}>Positive</span>
                </div>
                
                {/* Negative Option */}
                <div 
                  onClick={() => handleSentimentSelect('negative')}
                  style={{
                    padding: '8px 16px',
                    cursor: 'pointer',
                    transition: 'background-color 0.2s ease'
                  }}
                >
                  <span style={{ color: 'white' }}>Negative</span>
                </div>
              </div>
            )}
            
            {sentiment_justification && (
              <p style={{ fontSize:'14px', marginTop:'3px', color: 'rgb(208, 211, 219)' }}>
                {sentiment_justification}
              </p>
            )}
          </div>
        </div>
      )}

      {!(channel == 'Chat Window') && (
        <div style={{ 
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)', 
          margin: '10px auto', 
          width: '100%', 
          maxWidth: '400px' 
        }}></div>
      )}      {/* render here the assign user  */}      <div>
        <h2 style={{ 
          margin: 0,
          marginBottom: '5px',
          color: '#ffffff',
          fontFamily: '"Poppins-SemiBold", Helvetica',
          fontSize: '16px',
          fontWeight: 600,
          lineHeight: '19.6px',        }}>Assign user</h2>          
        <div className="user-dropdown-container" ref={assignUserDropdownRef} style={{ border: '1px solid rgba(189, 193, 201, 0.15)', borderRadius: '4px' }}>            
          {/* Custom dropdown that looks like the sentiment dropdown */}
          <div 
            className="user-dropdown-header"
            onClick={() => setAssignUserDropdownOpen(!assignUserDropdownOpen)}
          >
            {/* Show selected users or placeholder */}
            {selectedUsers.length > 0 ? (
              <div className="user-tags-container">
                {selectedUsers.map(user => (
                  <div key={user.email} className="user-tag">
                    <span className="user-tag-text">
                      {user.display_name}
                    </span>
                    <span 
                      className="user-tag-close"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveUser(user.email);
                      }}
                    >
                      ×
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <span className="user-dropdown-placeholder">
                Select
              </span>
            )}
            
            {/* Dropdown icon */}
            <img 
              src={ChevDownIcon} 
              alt="Dropdown Icon" 
              className="user-dropdown-icon"
              style={{ 
                transform: assignUserDropdownOpen ? 'rotate(180deg)' : 'rotate(0)'
              }} 
            />
          </div>

          {/* Dropdown menu */}
          {assignUserDropdownOpen && !subUserLoading && (
            <div className="user-dropdown-menu">
              {subUserNames && subUserNames.map((user, index) => (
                <div 
                  key={index} 
                  className={`user-dropdown-item ${
                    selectedUsers.some(selected => selected.email === user.email) 
                      ? 'user-dropdown-item-selected' 
                      : ''
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleUserSelect(user);
                  }}
                >
                  <span className="user-dropdown-item-text">{user.display_name}</span>
                  {selectedUsers.some(selected => selected.email === user.email) && (
                    <span className="user-dropdown-item-check">✓</span>
                  )}
                </div>
              ))}
            </div>
          )}
          
          {/* Loading indicator */}
          {subUserLoading && (
            <div className="user-dropdown-loading">
              <span style={{ color: 'white' }}>Loading...</span>
            </div>
          )}
        </div>
      </div>

        <div style={{ 
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)', 
          margin: '10px auto', 
          width: '100%', 
          maxWidth: '400px' 
        }}></div>
      
      {!(channel == 'Chat Window') && (
        <div className="issue">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0px' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <h1 style={{ 
                margin: 0,
                color: '#ffffff',
                fontFamily: '"Poppins-SemiBold", Helvetica',
                fontSize: '14px',
                fontWeight: 600,
                letterSpacing: 0,
                lineHeight: '19.6px',
                whiteSpace: 'nowrap',
                position: 'relative'  /* Using relative instead of fixed to maintain layout flow */
              }}>Open Issues</h1>
              {actionItems && actionItems.filter(obj => obj.status === "incomplete").length > 0 && (
                <span style={{ 
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#24262E',
                  color: 'white',
                  borderRadius: '50%',
                  width: '20px',
                  height: '20px',
                  fontSize: '10px',
                  marginLeft: '8px',
                  fontWeight: 'bold' ,
                  margin:'5px'
                }}>
                  {actionItems.filter(obj => obj.status === "incomplete").length}
                </span>
              )}
            </div>
            
            {/* View All link - always rendered and navigates to action items page */}
            <span 
              onClick={navigateToActionItems} 
              style={{ 
                color: '#146ef5', 
                fontSize: '14px', 
                cursor: 'pointer'
              }}
            >
              View All
            </span>
          </div>

          {actionItems && actionItems.filter(obj => obj.status === "incomplete").length > 0 ? (
            <>
              {/* Always display the first/latest issue with timestamp above */}
              <div style={{ marginBottom: "10px" }}>
                <div style={{ fontSize: "12px", color: "#808080", marginBottom: "2px" }}>
                  {formatIssueTime(actionItems.filter(obj => obj.status === "incomplete")[0].created_at)}
                </div>
                <p style={{ 
                  margin: 0,
                  color: '#d0d3db',
                  fontFamily: '"DM Sans-Regular", Helvetica',
                  fontSize: '14px',
                  fontWeight: 400,
                  letterSpacing: 0,
                  lineHeight: 'normal',
                  position: 'relative',  /* Using relative instead of fixed to maintain proper layout */
                  width: '236px'
                }}>
                  {actionItems.filter(obj => obj.status === "incomplete")[0].item}
                </p>
              </div>
              
              {/* Show remaining issues when expanded with timestamps above each */}
              {issuesExpanded && actionItems.filter(obj => obj.status === "incomplete").length > 1 && (
                <div>
                  {actionItems.filter(obj => obj.status === "incomplete")
                    .slice(1)
                    .map((obj, index) => (
                      <div key={index} style={{ marginBottom: "10px" }}>
                        <div style={{ fontSize: "12px", color: "#808080", marginBottom: "2px" }}>
                          {formatIssueTime(obj.created_at)}
                        </div>
                        <p style={{ 
                              margin: 0,
                              color: '#d0d3db',
                              fontFamily: '"DM Sans-Regular", Helvetica',
                              fontSize: '14px',
                              fontWeight: 400,
                              letterSpacing: 0,
                              lineHeight: 'normal',
                              position: 'relative',  /* Using relative instead of fixed to maintain proper layout */
                              width: '236px'
                }}>
                          {obj.item}
                        </p>
                      </div>
                    ))
                  }
                </div>
              )}
              
              {/* Show "+X more issues" text (clickable to expand issues) */}
              {!issuesExpanded && actionItems.filter(obj => obj.status === "incomplete").length > 1 && (
                <span 
                  onClick={() => setIssuesExpanded(true)} 
                  style={{ 
                    color: '#a6a9b2',
                    fontFamily: '"DM Sans-Regular", Helvetica',
                    fontSize: '14px',
                    fontWeight: 400,
                    letterSpacing: 0,
                    lineHeight: 'normal',
                    position: 'relative',  /* Using relative instead of fixed to maintain proper layout */
                    display: 'block',
                    marginBottom: '10px',
                    width: '272px',
                    cursor: 'pointer'
                  }}
                >
                  +{actionItems.filter(obj => obj.status === "incomplete").length - 1} more {actionItems.filter(obj => obj.status === "incomplete").length - 1 === 1 ? 'issue' : 'issues'}
                </span>
              )}
            </>
          ) : (
            <p style={{color:'#BBB'}}>None</p>
          )}
        </div>
      )}
    </div>
  );
};

export default RightSection;
