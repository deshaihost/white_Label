import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useSearchParams, useLocation } from "react-router-dom";
import { getUserDataActions } from "../../redux/actions";
import { getSubscriptionStatus } from "../../helper/Authorized";
import Inbox from "./inboxSection/inbox/Inbox";
import SmartTemplateIndex from "./inboxSection/smartTemplates/smartTemplateFunctionality/SmartTemplateIndex";
import ReviewRemoval from "./inboxSection/reviewRemoval/ReviewRemoval";
import Preferences from "./inboxSection/preferences/Preferences";
import Upsells from "./inboxSection/upsells/Upsells";
import "./inboxSection/inbox/inboxIndex.css";
import axios from "axios";
import HostDaddy from "../../component/hostDaddy/hostDaddy";
//import NotificationBanner from "./Banner/NotificationBanner/NotificationBanner";
import VideoComponent from "./Banner/VideoComponent/VideoComponent";

const InboxIndex = () => {
  const { section } = useParams();
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const conversationIdFromUrl = searchParams.get("conversationId");
  const store = useSelector((state) => state);
  const dispatch = useDispatch();
  const [interFaceComponent, setInterFaceComponent] = useState(0);
  const [allGuestNames, setAllGuestNames] = useState({});
  const [showVideoComponent, setShowVideoComponent] = useState(false);
  const [showBanner, setShowBanner] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [allExternalContactNumbers, setAllExternalContactNumbers] = useState([]);

  const handleWatchLetter = () => {
    // Handle the watch letter click event
    // You can add your own logic here, like opening a modal or navigating to a new page
    console.log("Watch letter button clicked");
    // Show the video component when clicked
    setShowVideoComponent(true);
  };

  const handleCloseVideoComponent = () => {
    setShowVideoComponent(false);
  };
  const handleRemindLater = () => {
    setShowVideoComponent(false);
  };

  const sectionMapping = {
    "": 0,
    "smart-templates": 1,
    preferences: 2,
    upsells: 3,
    "review-removal": 4,
  }; // for URL path params

  // accountCreatedDate expected in format 'MM/DD/YYYY HH:MM:SS'
  const calculateAccountAgeInDays = (accountCreatedDate) => {
    if (!accountCreatedDate) return null;

    const createdDate = new Date(accountCreatedDate);
    const currentDate = new Date();
    const diffInMs = currentDate - createdDate;
    return diffInMs / (1000 * 60 * 60 * 24); // Convert milliseconds to days
  };

  // Parse the API-retrieved user data to get info we'll need throughout the inbox and the other tabs
  const allUserData = store?.getUserDataReducer?.getUserData?.data?.user;
  const userPropertiesData = allUserData?.property_data; // dict, keys are property names. values are empty objs (since we use false in the dispatch)
  const allPropertyNamesList = userPropertiesData
    ? Object.keys(userPropertiesData)
    : [];
  const showTimeZoneNotif = allUserData && !allUserData?.user_region;
  const userHasPMS =
    allUserData &&
    allUserData?.calry_integrations &&
    Object.keys(allUserData.calry_integrations).length > 0;
  //const subscriptionPlan = allUserData?.subscription?.plan || ""; // Full name of the subscription plan, or empty string if no subscription
  const subscriptionPlan = getSubscriptionStatus(allUserData).plan; // Full name of the subscription plan, or empty string if no subscription
  const accountCreatedDate = allUserData?.date_created; // 'MM/DD/YYYY HH:MM:SS' (it's in UTC)
  const accountAgeDays = calculateAccountAgeInDays(accountCreatedDate);

  const callGetGuestNamesApi = async () => {
    const baseUrl = process.env.REACT_APP_API_ENDPOINT;
    const API_KEY = process.env.REACT_APP_API_KEY;

    try {
      const config = {
        headers: { "X-API-Key": API_KEY },
        validateStatus: function (status) {
          return status >= 200 && status < 500;
        }, // don't throw an error for non-2xx responses
      };
      const response = await axios.get(
        `${baseUrl}/get_all_guest_names`,
        config
      );

      if (response.status === 200) {
      } else {
      }
      return response.data;
    } catch (error) {
      return { error: "Internal server error" };
    }
  };

  const callExternalContactNumbersApi = async () => {
    const baseUrl = process.env.REACT_APP_API_ENDPOINT;
    const API_KEY = process.env.REACT_APP_API_KEY;

    try {
      const config = {
        headers: { "X-API-Key": API_KEY },
        validateStatus: function (status) {
          return status >= 200 && status < 500;
        },
      };
      const response = await axios.get(
        `${baseUrl}/get_external_contact_numbers`,
        config
      );

      console.log('API response:', response.data); // Debug log

      if (response.status === 200) {
        return response.data;
      } else {
        console.error('API error:', response.data);
        return { error: "Failed to search contacts" };
      }
    } catch (error) {
      console.error('Network error:', error);
      return { error: "Internal server error" };
    }
  };

  // Call API to get guest names (like: { "property_name1": ["guest_name1", "guest_name2", ...], ... })
  // Save in the state like: [ { name:"Guest Name1", searchable:"guestname1", property:"property_name1" }, ... ]
  const populateGuestNames = async () => {
    const data = await callGetGuestNamesApi();
    if (data?.guest_names) {
      let idCounter = 1; // So we can give each guest a unique ID
      const transformedGuestNames = Object.entries(data.guest_names).flatMap(
        ([property, names]) =>
          names.map((name) => ({
            name: name,
            searchable: name.toLowerCase().replace(/[^a-z0-9]/g, ""),
            property: property,
            id_for_react: idCounter++,
          }))
      );
      setAllGuestNames(transformedGuestNames);
    }
  };


  const populateExternalContactNumbers = async () => {
  const data = await callExternalContactNumbersApi();

  if (data?.external_contact_numbers && typeof data.external_contact_numbers === 'object') {
    let idCounter = 1;
    
    // Transform the object into an array of contact entries
    const transformedExternalContactNumbers = Object.entries(data.external_contact_numbers)
      .flatMap(([conversation_id, contactInfo]) => {
        const name = contactInfo.name || `Unknown Contact (${conversation_id.slice(-4)})`;
        const numbers = contactInfo.phone_numbers || [];
        
        return numbers.map(number => {
          const cleanDigits = typeof number === "string" ? number.replace(/\D/g, "") : "";
          return {
            conversation_id,
            name,
            contact_number: number,
            channel: conversation_id.startsWith("whatsapp:") ? "WHATSAPP" : 
                    conversation_id.startsWith("openphone:") ? "OPENPHONE" : "UNKNOWN",
            searchable: cleanDigits,
            id_for_react: idCounter++,
            phone_numbers: [number]
          };
        });
      });
    
    setAllExternalContactNumbers(transformedExternalContactNumbers);
  } else {
    console.warn("No external_contact_numbers found in API response or invalid format.");
    setAllExternalContactNumbers([]);
  }
};

  // Track screen width for responsive rendering
  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    // Set up event listener
    window.addEventListener("resize", handleResize);

    // Clean up
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // On page load, call some APIs
  useEffect(() => {
    dispatch(getUserDataActions(false)); // So we can have the list of property names for the various dropdowns. false because we don't need the property data
    populateGuestNames(); // So we can have the list of guest names for the guest search bar
    populateExternalContactNumbers(); // So we can have the list of external contact numbers for the contact search bar

    // Check for component index from URL path param or from location state
    const componentFromLocation = location.state?.activeComponent;

    // Handle URL preservation if coming from settings route with originalPath
    if (
      location.state?.originalPath &&
      location.pathname === "/inbox/preferences"
    ) {
      // Update browser URL without triggering navigation
      window.history.replaceState(
        { ...window.history.state },
        document.title,
        location.state.originalPath
      );
    }
    if (componentFromLocation !== undefined) {
      setInterFaceComponent(componentFromLocation);
    } else {
      setInterFaceComponent(sectionMapping[section] || 0);
    }
  }, [section, location.state]); // Added section and location.state as dependencies
  return (
    <>
      {" "}
      {/* 
      {showBanner && screenWidth >= 1100 && location.pathname === "/inbox" && (
        <NotificationBanner
          onWatchLetter={handleWatchLetter}
          onClose={() => setShowBanner(false)}
          className="mb-3"
        />
      )}
      */}
      {/* Video Component Popup */}
      {showVideoComponent && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
          }}
          onClick={handleCloseVideoComponent}
        >
          <div
            style={{
              position: "relative",
              maxWidth: "90%",
              maxHeight: "90%",
              overflow: "auto",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={handleCloseVideoComponent}
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                background: "white",
                border: "none",
                borderRadius: "50%",
                width: "30px",
                height: "30px",
                cursor: "pointer",
                zIndex: 10000,
                fontSize: "16px",
                fontWeight: "bold",
              }}
            >
              ×
            </button>
            <VideoComponent onRemindLater={handleRemindLater} />
          </div>
        </div>
      )}
      <div className="inbox-container">
        {" "}
        {interFaceComponent === 0 && (
          <Inbox
            allPropertyNamesList={allPropertyNamesList}
            allGuestNamesList={allGuestNames}
            allExternalContactNumbersList={allExternalContactNumbers}
            userHasPMS={userHasPMS}
            subscriptionPlan={subscriptionPlan}
            accountAgeDays={accountAgeDays}
            singleConversationIdFromUrl={conversationIdFromUrl}
            bannerVisible={
              showBanner &&
              screenWidth >= 1100 &&
              location.pathname === "/inbox"
            }
            userData={allUserData}
          />
        )}
        {interFaceComponent === 1 && (
          <SmartTemplateIndex
            allPropertyNamesList={allPropertyNamesList}
            userData={allUserData}
          />
        )}
        {interFaceComponent === 2 && (
          <Preferences allPropertyNamesList={allPropertyNamesList} />
        )}
        {interFaceComponent === 3 && (
          <Upsells allPropertyNamesList={allPropertyNamesList} />
        )}
        {interFaceComponent === 4 && (
          <ReviewRemoval allPropertyNamesList={allPropertyNamesList} />
        )}
        {interFaceComponent != 0 && <HostDaddy />}{" "}
      </div>
    </>
  );
};

export default InboxIndex;