import { useState, useEffect, useRef } from "react";
import "./index.css";
import "./multiselect.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import ToastHandle from "../../../../../helper/ToastMessage";
import Loader from "../../../../../helper/Loader";
import HostBuddyIcon from "./icons/hostbuddy_icon.svg";
import ChevDownIcon from "./icons/chevDown_icon.svg";
import XCloseSvg from "./icons/x-close.svg";
import { getActiveToken } from "../../../../../helper/apiCore";
import { set } from "react-hook-form";
import { use } from "react";

const NonGuestRightSection = ({
  rightSectionData,
  updateConversationFromApi,
  updateSpecificConversation,
  updateSelectedConversation,
  setCurrentView,
  setRightSectionVisible,
  contactType,
  setContactType,
}) => {
  const {
    assigned_sub_user_names,
    assigned_sub_users,
    departure_date,
    status,
    property_name,
    guest_chatbot_status,
    property_chatbot_status,
    conversation_id,
    reservation_id,
    action_items,
  } = rightSectionData ? rightSectionData : {};
  // console.log("Assigned Sub user ", assigned_sub_user_names);
  // console.log("assigned_sub_users", assigned_sub_users)

  let { channel } = rightSectionData || {};

  const [toggleStatusLoading, setToggleStatusLoading] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [localStatus, setLocalStatus] = useState(null); // Local state for tracking status changes
  const [subUserNames, setSubUserNames] = useState([]);
  const [subUserLoading, setSubUserLoading] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [combinedUsers, setCombinedUsers] = useState([]); // State to store both assigned and selected users
  const [combinedMails, setCombinedMails] = useState([]); // State to store email addresses for API calls
  const [assignUserDropdownOpen, setAssignUserDropdownOpen] = useState(false);
  const [dataFetched, setDataFetched] = useState(false); // Flag to track if data has been fetched
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [hostbuddyDropdownOpen, setHostbuddyDropdownOpen] = useState(false);
  const [isLocked, setIsLocked] = useState(false);
  const [propertyChatbotStatus, setPropertyChatbotStatus] = useState(property_chatbot_status);
  const [contactInfo, setContactInfo] = useState({
    name: "",
    phone: "",
    email: "",
    whatsapp: "",
    title: "",
    company: "",
  });
  const [getGuestDataLoading, setGetGuestDataLoading] = useState(false);
  const [updateGuestDataLoading, setUpdateGuestDataLoading] = useState(false);
  const [contactTypeDropdownOpen, setContactTypeDropdownOpen] = useState(false);
  const contactTypeDropdownRef = useRef(null);
  // Add these state variables with your other state declarations
  const [property, setProperty] = useState(false); // Default to current property_name if available
  const [propertyDropdownOpen, setPropertyDropdownOpen] = useState(false);
  const [properties, setProperties] = useState([]); // Will store available properties
  const [propertiesLoading, setPropertiesLoading] = useState(false);
  const propertyDropdownRef = useRef(null);
  const dropdownRef = useRef(null);
  const assignUserDropdownRef = useRef(null);
  const hostbuddyDropdownRef = useRef(null);
  const rightSideRef = useRef(null);

  // Cache to store user assignments per conversation
  const assignmentsByConversation = useRef({});
  // State for action items
  const [actionItems, setActionItems] = useState([]);
  // State for scroll overlay
  const [showTopGradient, setShowTopGradient] = useState(false);
  const [showBottomGradient, setShowBottomGradient] = useState(false);

  // Status calculation logic (moved here to avoid initialization issues)
  const get_current_status = () => {
    const { until_utc } = guest_chatbot_status || {};

    // Check to see if a guest status applies
    if (until_utc) {
      let currentTime, untilTime;
      if (until_utc !== "indefinitely") {
        currentTime = new Date();
        untilTime = new Date(until_utc);
      }

      if (untilTime > currentTime || until_utc === "indefinitely") {
        // a guest status is active
        if (guest_chatbot_status.status === "on") {
          return { curr_status: "on", source: "guest" };
        } else if (guest_chatbot_status.status === "off") {
          return { curr_status: "off", source: "guest" };
        }
        // else: status is probably 'not_specified'. Use property status
      }
    }

    // Otherwise, use property status
    const propertyStatus = property_chatbot_status || propertyChatbotStatus;
    const status = propertyStatus ? String(propertyStatus).toLowerCase() : "";
    return { curr_status: status, source: "property" };
  };

  const current_status_get = property_chatbot_status
    ? get_current_status()
    : null;
  const { curr_status, source } = current_status_get || {};

  // Initialize localStatus whenever curr_status changes
  useEffect(() => {
    setLocalStatus(curr_status);
  }, [curr_status]);

  useEffect(() => {
    if (rightSectionData?.is_locked !== undefined) {
      setIsLocked(rightSectionData.is_locked);
    }
  }, [rightSectionData?.is_locked]);

  useEffect(() => {
    if (rightSectionData?.property_chatbot_status !== undefined) {
      setPropertyChatbotStatus(rightSectionData.property_chatbot_status);
    }
  }, [rightSectionData?.property_chatbot_status]);

  // Handle clicks outside the Hostbuddy dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        hostbuddyDropdownRef.current &&
        !hostbuddyDropdownRef.current.contains(event.target)
      ) {
        setHostbuddyDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Refresh action items when conversation_id changes and there are no action_items in rightSectionData
  useEffect(() => {
    if (conversation_id && (!action_items || action_items.length === 0)) {
      // If there are no action_items in rightSectionData for this conversation,
      // we could either update the callGetActionItemsApi to filter by conversation_id
      // or rely on the updateConversationFromApi function to refresh the data
      if (
        updateConversationFromApi &&
        typeof updateConversationFromApi === "function"
      ) {
        updateConversationFromApi(conversation_id);
      }
    }
  }, [conversation_id, action_items, updateConversationFromApi]);  // Initialize combinedUsers with assigned_sub_user_names when component mounts or assigned users change

  useEffect(() => {
    if (!conversation_id) return;

    // Check if we have cached data for this conversation
    const cachedData = assignmentsByConversation.current[conversation_id];

    if (cachedData) {
      // Use cached data if available (user has modified this conversation before)
      setCombinedUsers(cachedData.users);
      setCombinedMails(cachedData.mails);
    } else {
      // Use props data for first time viewing this conversation
      if (assigned_sub_user_names && assigned_sub_user_names.length > 0) {
        const assignedUsersFormatted = assigned_sub_user_names.map(
          (name, index) => ({
            id: `assigned-${index}`,
            name: name,
            type: "assigned",
          })
        );
        setCombinedUsers(assignedUsersFormatted);

        // Initialize combinedMails with assigned_sub_users (emails)
        if (assigned_sub_users && assigned_sub_users.length > 0) {
          setCombinedMails([...assigned_sub_users]);
        } else {
          setCombinedMails([]);
        }
      } else {
        setCombinedUsers([]);
        setCombinedMails([]);
      }
    }
  }, [assigned_sub_user_names, assigned_sub_users, conversation_id]);  // Track when user explicitly takes an action that should trigger the API
  const [userActionTriggered, setUserActionTriggered] = useState(false);

  // Save current assignments to cache when user makes changes
  useEffect(() => {
    if (userActionTriggered && conversation_id && combinedMails.length >= 0) {
      // Cache the current state for this conversation
      assignmentsByConversation.current[conversation_id] = {
        users: [...combinedUsers],
        mails: [...combinedMails]
      };
    }
  }, [combinedUsers, combinedMails, userActionTriggered, conversation_id]);

  // Initial fetch of guest data and contact type when conversation_id and reservation_id are available
  useEffect(() => {
    if (conversation_id) {
      callGetGuestDataApi();
      // Set property from rightSectionData if available
      if (rightSectionData?.property_name !== undefined) {
        setProperty(rightSectionData.property_name || "");
      }
    }
  }, [conversation_id, reservation_id, rightSectionData?.property_name]);

  useEffect(() => {
    // Sync local property state with rightSectionData, but only if we're not in the middle of an update
    if (rightSectionData?.property_name !== undefined) {
      setProperty(rightSectionData.property_name || "");
    }
  }, [rightSectionData?.property_name]);

  // Trigger API call only when user explicitly takes an action
  useEffect(() => {
    if (userActionTriggered && conversation_id) {
      // Call API with current combinedMails
      assignUsersToConversation();
      // Reset flag after API call to prevent future automatic calls
      setUserActionTriggered(false);
    }
  }, [userActionTriggered, conversation_id]);

  // Function to fetch properties assigned to the user
  const fetchProperties = async () => {
    setPropertiesLoading(true);
    try {
      const baseUrl = process.env.REACT_APP_API_ENDPOINT;
      const API_KEY = process.env.REACT_APP_API_KEY;

      // Get token from the apiCore's active token or fall back to localStorage
      const token = getActiveToken() || localStorage.getItem("authToken");

      const config = {
        headers: {
          "X-API-Key": API_KEY,
          Authorization: token ? `Bearer ${token}` : undefined,
        },
        validateStatus: function (status) {
          return status >= 200 && status < 500;
        },
      };

      const response = await axios.get(`${baseUrl}/get_user_properties`, config);

      if (response.status === 200 && response.data.properties) {
        setProperties(response.data.properties);
      } else {
        ToastHandle(response?.data?.error || "Failed to fetch properties", "danger");
      }
    } catch (error) {
      console.error("Error fetching properties:", error);
      ToastHandle("Error fetching properties", "danger");
    } finally {
      setPropertiesLoading(false);
    }
  };

  // Function to handle keyboard navigation in dropdown
  const handleHostbuddyDropdownKeyDown = (e) => {
    if (hostbuddyDropdownOpen) {
      if (e.key === "ArrowDown" || e.key === "ArrowUp") {
        e.preventDefault();
        const menu =
          hostbuddyDropdownRef.current?.querySelector('[role="listbox"]');
        if (menu) {
          const options = Array.from(menu.querySelectorAll('[role="option"]'));
          const currentFocus = document.activeElement;
          const currentIndex = options.indexOf(currentFocus);

          let nextIndex;
          if (e.key === "ArrowDown") {
            nextIndex =
              currentIndex < options.length - 1 ? currentIndex + 1 : 0;
          } else {
            nextIndex =
              currentIndex > 0 ? currentIndex - 1 : options.length - 1;
          }

          options[nextIndex]?.focus();
        }
      } else if (e.key === "Escape") {
        setHostbuddyDropdownOpen(false);
      } else if (e.key === "Home") {
        e.preventDefault();
        const menu =
          hostbuddyDropdownRef.current?.querySelector('[role="listbox"]');
        menu?.querySelector('[role="option"]')?.focus();
      } else if (e.key === "End") {
        e.preventDefault();
        const menu =
          hostbuddyDropdownRef.current?.querySelector('[role="listbox"]');
        const options = menu?.querySelectorAll('[role="option"]');
        options?.[options.length - 1]?.focus();
      }
    }
  };

  // Function to fetch sub-user names
  const fetchSubUserNames = async () => {
    // If data was already fetched, don't fetch again
    if (dataFetched && subUserNames.length > 0) return;

    setSubUserLoading(true);
    try {
      const baseUrl = process.env.REACT_APP_API_ENDPOINT;
      const API_KEY = process.env.REACT_APP_API_KEY;

      // Get token from the apiCore's active token or fall back to localStorage
      const token = getActiveToken() || localStorage.getItem("authToken");

      const config = {
        headers: {
          "X-API-Key": API_KEY,
          Authorization: token ? `Bearer ${token}` : undefined,
        },
        validateStatus: function (status) {
          return status >= 200 && status < 500;
        },
      };

      const response = await axios.get(`${baseUrl}/get_sub_user_names`, config);

      if (response.status === 200) {
        setSubUserNames(response.data.sub_user_names || []);
        setDataFetched(true); // Mark data as fetched
      } else {
        ToastHandle(
          response?.data?.error || "Failed to fetch user names",
          "danger"
        );
      }
    } catch (error) {
      ToastHandle("Error fetching user names", "danger");
    } finally {
      setSubUserLoading(false);
    }
  };

  // Handle dropdown open - fetch data when dropdown is opened
  const handleAssignUserDropdownOpen = () => {
    const newState = !assignUserDropdownOpen;
    setAssignUserDropdownOpen(newState);

    // If opening the dropdown and we haven't fetched data yet, fetch it
    if (newState && !dataFetched) {
      fetchSubUserNames();
    }
  };  // Handle user selection for multi-select
  const handleUserSelect = (user) => {
    // Update combinedMails first to track email changes
    setCombinedMails((prev) => {
      if (prev.includes(user.email)) {
        // If email already exists, remove it
        return prev.filter((email) => email !== user.email);
      } else {
        // If email doesn't exist, add it
        return [...prev, user.email];
      }
    });

    setCombinedUsers((prev) => {
      // Check if user is already in combinedUsers
      if (
        prev.some(
          (selected) =>
            selected.name === user.display_name || selected.name === user.email
        )
      ) {
        // If already selected, remove it
        return prev.filter(
          (selected) =>
            selected.name !== user.display_name && selected.name !== user.email
        );
      } else {
        // If not selected, add it
        const newUser = {
          id: `selected-${user.email}`,
          name: user.display_name,
          email: user.email,
          type: "selected",
        };
        return [...prev, newUser];
      }
    });

    // Also update selectedUsers for API calls
    setSelectedUsers((prev) => {
      // Check if user is already selected
      if (prev.some((selected) => selected.email === user.email)) {
        // If already selected, remove it
        const newSelection = prev.filter(
          (selected) => selected.email !== user.email
        );
        return newSelection;
      } else {
        // If not selected, add it
        const newSelection = [...prev, user];
        return newSelection;
      }
    });

    // Trigger API call because user explicitly made a selection action
    setUserActionTriggered(true);
  };

  // Handle removing a user from selection
  const handleRemoveUser = (identifier) => {
    // Find the user being removed to get their email
    const userToRemove = combinedUsers.find(
      (user) => user.name === identifier || user.email === identifier
    );

    // Remove from combinedMails
    if (userToRemove) {
      setCombinedMails((prev) => {
        if (userToRemove.type === "assigned") {
          // For assigned users, find the email by matching the index
          const userIndex = assigned_sub_user_names?.indexOf(userToRemove.name);
          const emailToRemove = assigned_sub_users?.[userIndex];
          return prev.filter((email) => email !== emailToRemove);
        } else {
          // For selected users, remove by email
          return prev.filter((email) => email !== userToRemove.email);
        }
      });
    }

    // Remove from combinedUsers
    setCombinedUsers((prev) => {
      return prev.filter(
        (user) => user.name !== identifier && user.email !== identifier
      );
    });    // Also remove from selectedUsers if it's a selected user (for API calls)
    setSelectedUsers((prev) => {
      const newSelection = prev.filter(
        (user) => user.email !== identifier && user.display_name !== identifier
      );
      return newSelection;
    });

    // Trigger API call because user explicitly removed a user
    setUserActionTriggered(true);
  };

  // Function to assign selected users to the conversation
  const assignUsersToConversation = async () => {
    if (!conversation_id) return;

    try {
      const baseUrl = process.env.REACT_APP_API_ENDPOINT;
      const API_KEY = process.env.REACT_APP_API_KEY;

      // Get token from the apiCore's active token or fall back to localStorage
      const token = getActiveToken() || localStorage.getItem("authToken");

      const config = {
        headers: {
          "X-API-Key": API_KEY,
          Authorization: token ? `Bearer ${token}` : undefined,
        },
        validateStatus: function (status) {
          return status >= 200 && status < 500;
        },
      };

      // Use combinedMails instead of extracting from usersToAssign
      const subUserEmails = combinedMails;

      const bodyData = {
        conversation_id: conversation_id,
        sub_user_emails: subUserEmails,
      };

      const response = await axios.put(
        `${baseUrl}/assign_sub_users_to_conversation`,
        bodyData,
        config
      );

      if (response.status === 200) {
        ToastHandle("Users assigned successfully", "success");
        // You can optionally update the conversation data if needed
        if (
          updateConversationFromApi &&
          typeof updateConversationFromApi === "function"
        ) {
          updateConversationFromApi(conversation_id);
        }
      } else {
        ToastHandle(
          response?.data?.error || "Failed to assign users",
          "danger"
        );
      }
    } catch (error) {
      console.error("Error assigning users:", error);
      ToastHandle("Error assigning users", "danger");
    }
  };

  // Fetch any existing assigned users when conversation changes
  useEffect(() => {
    const fetchAssignedUsers = async () => {
      if (!conversation_id) {
        setSelectedUsers([]);
        return;
      }

      // Only fetch if we've already loaded the sub-user names
      if (!dataFetched || subUserNames.length === 0) {
        return;
      }

      try {
        const baseUrl = process.env.REACT_APP_API_ENDPOINT;
        const API_KEY = process.env.REACT_APP_API_KEY;

        // Get token from the apiCore's active token or fall back to localStorage
        const token = getActiveToken() || localStorage.getItem("authToken");

        const config = {
          headers: {
            "X-API-Key": API_KEY,
            Authorization: token ? `Bearer ${token}` : undefined,
          },
          validateStatus: function (status) {
            return status >= 200 && status < 500;
          },
        };

        const response = await axios.get(
          `${baseUrl}/get_sub_users_for_conversation/${conversation_id}`,
          config
        );

        if (response.status === 200 && response.data.sub_user_emails) {
          // Map assigned users to match our selected users format
          const assignedUsers = response.data.sub_user_emails.map((email) => {
            // Find matching user in subUserNames
            const user = subUserNames.find((user) => user.email === email);
            return user || { email, display_name: email.split("@")[0] }; // Fallback if user not found
          });

          setSelectedUsers(assignedUsers);
        }
      } catch (error) {
        console.error(
          "Error fetching assigned users for get_sub_users_for_conversation :",
          error
        );
      }
    };

    fetchAssignedUsers();
  }, [conversation_id, dataFetched, subUserNames]);

  // Effect to handle outside clicks for dropdown
  useEffect(() => {
    function handleOutsideClick(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
      if (
        assignUserDropdownRef.current &&
        !assignUserDropdownRef.current.contains(event.target)
      ) {
        setAssignUserDropdownOpen(false);
      }
      if (
        contactTypeDropdownRef.current &&
        !contactTypeDropdownRef.current.contains(event.target)
      ) {
        setContactTypeDropdownOpen(false);
      }
      if (
        propertyDropdownRef.current &&
        !propertyDropdownRef.current.contains(event.target)
      ) {
        setPropertyDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  // Handle scroll gradients for overflow content
  useEffect(() => {
    const checkScroll = () => {
      if (rightSideRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = rightSideRef.current;

        // Show top gradient when scrolled down
        setShowTopGradient(scrollTop > 10);

        // Show bottom gradient when there's more content to scroll to
        setShowBottomGradient(
          scrollHeight > clientHeight &&
          scrollTop < scrollHeight - clientHeight - 10
        );
      }
    };

    // Check initial state
    checkScroll();

    // Add scroll event listener
    const rightSide = rightSideRef.current;
    if (rightSide) {
      rightSide.addEventListener("scroll", checkScroll);

      // Also check when content might have changed
      const resizeObserver = new ResizeObserver(() => {
        checkScroll();
      });

      resizeObserver.observe(rightSide);

      return () => {
        rightSide.removeEventListener("scroll", checkScroll);
        resizeObserver.disconnect();
      };
    }
  }, [rightSectionData]);


  // console.log("Debug - Arrival date:", arrival_date);
  // console.log("Debug - Departure date:", departure_date);
  // Format timestamp for issues in "Month Day, Time" format (e.g. "Feb 15, 3:45pm")

  // Contact type options
  const contactTypeOptions = [
    "External Contact",
    "Vendor",
    "Owner",
    "Guest"
  ];

  // Handle property selection
  // Update the handlePropertySelect function
  const handlePropertySelect = async (selectedProperty) => {
    setProperty(selectedProperty);
    setPropertyDropdownOpen(false);

    // Call API to update the property name for this contact
    if (conversation_id) {
      const baseUrl = process.env.REACT_APP_API_ENDPOINT;
      const API_KEY = process.env.REACT_APP_API_KEY;

      try {
        // Get token from the apiCore's active token or fall back to localStorage
        const token = getActiveToken() || localStorage.getItem("authToken");

        const config = {
          headers: {
            "X-API-Key": API_KEY,
            Authorization: token ? `Bearer ${token}` : undefined,
            "Content-Type": "application/json",
          },
          validateStatus: function (status) {
            return status >= 200 && status < 500;
          },
        };

        // Build the request body with property name
        const requestBody = {
          conversation_id,
          property_name: selectedProperty,
          contact_data: {
            // Include contact_type to maintain existing value
            contact_type: contactType || "External Contact"
          }
        };

        // Add reservation_id only if it exists
        if (reservation_id) {
          requestBody.reservation_id = reservation_id;
        }

        const response = await axios.put(
          `${baseUrl}/update_external_contact_info`,
          requestBody,
          config
        );

        if (response.status === 200) {
          ToastHandle("Property updated successfully", "success");

          const guestData = response.data;
          const property_chatbot_status = guestData.property_chatbot_status;
          const isLocked = guestData.is_locked;

          setPropertyChatbotStatus(property_chatbot_status);
          setIsLocked(isLocked);

          // Update parent conversation data
          if (updateConversationFromApi && typeof updateConversationFromApi === "function") {
            updateConversationFromApi(conversation_id);
          }
          // console.log("isLocked", isLocked);

          if (updateSpecificConversation && rightSectionData?.conversation_id) {
            updateSpecificConversation(rightSectionData.conversation_id, {
              property_name: selectedProperty,
              property_chatbot_status: property_chatbot_status,
              is_locked: isLocked
            });

            if (updateSelectedConversation && rightSectionData?.conversation_id) {
              updateSelectedConversation(rightSectionData.conversation_id, {
                property_name: selectedProperty,
                property_chatbot_status: property_chatbot_status,
                is_locked: isLocked
              });
            }
          }
          // Refresh guest data to reflect the changes
          await callGetGuestDataApi();
        } else {
          ToastHandle(
            response?.data?.error || "Failed to update property",
            "danger"
          );
        }
      } catch (error) {
        console.error("Error updating property:", error);
        ToastHandle("Error updating property", "danger");
      }
    }
  };

  useEffect(() => {
    if (curr_status !== null && curr_status !== undefined) {
      const status = String(curr_status).toLowerCase();
      setLocalStatus(status);
    } else if (!property || property.trim() === "") {
      setLocalStatus("off");
    }
  }, [curr_status]);

  // Add this function to handle deselecting the property
  // Add this function to handle deselecting the property
  // Update the property deselection function to handle HostBuddy status better:
  const handlePropertyDeselect = async () => {
    // Immediately update all property-related states
    setProperty("");
    setPropertyDropdownOpen(false);
    setPropertyChatbotStatus("OFF");
    setIsLocked(false);

    // Also update local status for HostBuddy dropdown
    setLocalStatus("off");

    if (conversation_id) {
      const baseUrl = process.env.REACT_APP_API_ENDPOINT;
      const API_KEY = process.env.REACT_APP_API_KEY;

      try {
        const token = getActiveToken() || localStorage.getItem("authToken");

        const config = {
          headers: {
            "X-API-Key": API_KEY,
            Authorization: token ? `Bearer ${token}` : undefined,
            "Content-Type": "application/json",
          },
          validateStatus: function (status) {
            return status >= 200 && status < 500;
          },
        };

        const requestBody = {
          conversation_id,
          property_name: "", // Explicitly send empty string
          contact_data: {
            contact_type: contactType || "External Contact"
          }
        };

        const response = await axios.put(
          `${baseUrl}/update_external_contact_info`,
          requestBody,
          config
        );

        if (response.status === 200) {
          ToastHandle("Property cleared successfully", "success");

          // Update all conversation states with cleared values
          if (updateSpecificConversation && rightSectionData?.conversation_id) {
            updateSpecificConversation(rightSectionData.conversation_id, {
              property_name: null,
              property_chatbot_status: "OFF",
              is_locked: false,
              // Clear guest chatbot status when property is cleared
              guest_chatbot_status: null
            });

            if (updateSelectedConversation && rightSectionData?.conversation_id) {
              updateSelectedConversation(rightSectionData.conversation_id, {
                property_name: null,
                property_chatbot_status: "OFF",
                is_locked: false,
                guest_chatbot_status: null
              });
            }
          }

          if (updateConversationFromApi && typeof updateConversationFromApi === "function") {
            updateConversationFromApi(conversation_id);
          }

          await callGetGuestDataApi();
        } else {
          ToastHandle(
            response?.data?.error || "Failed to clear property",
            "danger"
          );
          // Revert all states if API fails
          setProperty(property_name || "");
          setPropertyChatbotStatus(rightSectionData?.property_chatbot_status || "OFF");
          setIsLocked(rightSectionData?.is_locked || false);
          setLocalStatus(rightSectionData?.property_chatbot_status?.toLowerCase() || "off");
        }
      } catch (error) {
        console.error("Error clearing property:", error);
        ToastHandle("Error clearing property", "danger");
        // Revert all states if error occurs
        setProperty(property_name || "");
        setPropertyChatbotStatus(rightSectionData?.property_chatbot_status || "OFF");
        setIsLocked(rightSectionData?.is_locked || false);
        setLocalStatus(rightSectionData?.property_chatbot_status?.toLowerCase() || "off");
      }
    }
  };

  // Fetch properties when component mounts
  useEffect(() => {
    fetchProperties();
  }, []);

  useEffect(() => {
    if (!property || property.trim() === "") {
      setLocalStatus("off");
    } else if (curr_status !== null && curr_status !== undefined) {
      const status = String(curr_status).toLowerCase();
      setLocalStatus(status);
    }
  }, [property, curr_status]);

  // Calculate end_time_utc based on timing, for toggle conversation status
  const calculateEndTimeUTC = (timing) => {
    const now = new Date();
    switch (timing) {
      case "15m":
        now.setMinutes(now.getMinutes() + 15);
        break;
      case "1h":
        now.setHours(now.getHours() + 1);
        break;
      case "1d":
        now.setDate(now.getDate() + 1);
        break;
      case "indefinitely":
        return "indefinitely";
      default:
        throw new Error("Invalid timing value");
    }
    return now.toISOString();
  };

  const callSetStatusAPI = async (on_or_off, timing) => {
    const baseUrl = process.env.REACT_APP_API_ENDPOINT;
    const API_KEY = process.env.REACT_APP_API_KEY;
    setToggleStatusLoading(true);

    // Update local status immediately for better user experience
    setLocalStatus(on_or_off);

    const end_time_utc = calculateEndTimeUTC(timing);

    try {
      const config = {
        headers: { "X-API-Key": API_KEY },
        validateStatus: function (status) {
          return status >= 200 && status < 500;
        }, // don't throw an error for non-2xx responses
      };
      const body_data = {
        conversation_id: rightSectionData.conversation_id,
        status: on_or_off,
        until_utc: end_time_utc,
      };
      const response = await axios.put(
        `${baseUrl}/toggle_conversation_status`,
        body_data,
        config
      );

      if (response.status === 200) {
        ToastHandle("Status updated successfully", "success");
        await updateConversationFromApi(conversation_id); // Call the API to get the updated conversation with the new status. This will trigger re-render
      } else {
        ToastHandle(response?.data?.error, "danger");
        // If API fails, revert local status to original
        setLocalStatus(curr_status);
      }
      return response.data;
    } catch (error) {
      ToastHandle("Internal server error", "danger");
      // If API fails, revert local status to original
      setLocalStatus(curr_status);
      return { error: "Internal server error" };
    } finally {
      setToggleStatusLoading(false);
    }
  };

  // When the user selects to revert guest status
  const handleRevertStatus = (e) => {
    if (e) e.preventDefault();
    callSetStatusAPI("not_specified", "indefinitely");
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
    channel = channel.replace("hostbuddy", "Chat Window");
  } else {
    channel = "";
  }
  const statusText = getStatusText(status);

  useEffect(() => {
    // Only sync from rightSectionData on initial load, not during updates
    if (conversation_id && rightSectionData?.property_name !== undefined) {
      // Check if this is the initial load (when we don't have a current property set)
      const isInitialLoad = property === false || property === null;

      if (isInitialLoad) {
        setProperty(rightSectionData.property_name || "");
      }
    }
  }, [conversation_id]); // Remove rightSectionData.property_name from dependencies

  // Function to call the API to get guest data and contact type
  // Update your callGetGuestDataApi function to handle property state better:
  const callGetGuestDataApi = async () => {
    if (!conversation_id) return;

    const baseUrl = process.env.REACT_APP_API_ENDPOINT;
    const API_KEY = process.env.REACT_APP_API_KEY;
    setGetGuestDataLoading(true);

    try {
      const token = getActiveToken() || localStorage.getItem("authToken");

      const config = {
        headers: {
          "X-API-Key": API_KEY,
          Authorization: token ? `Bearer ${token}` : undefined,
        },
        validateStatus: function (status) {
          return status >= 200 && status < 500;
        },
      };

      const queryParams = new URLSearchParams({
        conversation_id,
      });

      if (reservation_id) {
        queryParams.append("reservation_id", reservation_id);
      }

      const response = await axios.get(
        `${baseUrl}/get_external_contact_info?${queryParams.toString()}`,
        config
      );

      if (response.status === 200) {
        const guestData = response.data;

        // FIX: Handle property status from API response
        const apiPropertyStatus = guestData.property_chatbot_status;
        const apiIsLocked = guestData.is_locked !== undefined ? guestData.is_locked : false;

        // Update property status states
        if (apiPropertyStatus !== undefined) {
          setPropertyChatbotStatus(apiPropertyStatus);
        }
        setIsLocked(apiIsLocked);

        // Handle contact info
        const name = guestData.contact_info?.name && guestData.contact_info?.name !== ""
          ? guestData.contact_info.name
          : guestData.contact_info?.guest_name && guestData.contact_info?.guest_name !== ""
            ? guestData.contact_info.guest_name
            : "Not Added";

        const whatsappNumbers = guestData.contact_info?.whatsapp_numbers || [];
        const lastNumber = whatsappNumbers.length > 0 && whatsappNumbers[whatsappNumbers.length - 1]
          ? whatsappNumbers[whatsappNumbers.length - 1]
          : null;

        const emailAddresses = guestData.contact_info?.email_addresses || [];
        const lastEmail = emailAddresses.length > 0 && emailAddresses[emailAddresses.length - 1]
          ? emailAddresses[emailAddresses.length - 1]
          : null;

        const phoneNumbers = guestData.contact_info?.phone_numbers || [];
        const lastPhone = phoneNumbers.length > 0 && phoneNumbers[phoneNumbers.length - 1]
          ? phoneNumbers[phoneNumbers.length - 1]
          : null;

        const title = guestData.contact_info?.title && guestData.contact_info?.title !== ""
          ? guestData.contact_info.title
          : "Not Added";
        const company = guestData.contact_info?.company && guestData.contact_info?.company !== ""
          ? guestData.contact_info.company
          : "Not Added";
        const contactTypeValue = guestData.contact_info?.contact_type && guestData.contact_info?.contact_type !== ""
          ? guestData.contact_info.contact_type
          : "External Contact";

        setContactInfo({
          name: name,
          phone: lastPhone || "Not Added",
          email: lastEmail || "Not Added",
          whatsapp: lastNumber || "Not Added",
          title: title,
          company: company,
        });
        setContactType(contactTypeValue);

        // FIX: Handle property name from API - always use the API value as source of truth
        const apiPropertyName = guestData.contact_info?.property_name;
        setProperty(apiPropertyName || ""); // Use empty string if null/undefined

      } else {
        // Reset contact info when API fails
        setContactInfo({
          name: "Not Added",
          phone: "Not Added",
          email: "Not Added",
          whatsapp: "Not Added",
          title: "Not Added",
          company: "Not Added",
        });
        setContactType("External Contact");
        setProperty(""); // Reset property on API failure
      }
    } catch (error) {
      console.error("Error fetching guest data:", error);
      // Reset everything on error
      setContactInfo({
        name: "Not Added",
        phone: "Not Added",
        email: "Not Added",
        whatsapp: "Not Added",
        title: "Not Added",
        company: "Not Added",
      });
      setContactType("External Contact");
      setProperty(""); // Reset property on error
    } finally {
      setGetGuestDataLoading(false);
    }
  };

  // API function to update guest contact information
  const callUpdateGuestDataApi = async () => {
    if (!conversation_id) return;

    const baseUrl = process.env.REACT_APP_API_ENDPOINT;
    const API_KEY = process.env.REACT_APP_API_KEY;
    setUpdateGuestDataLoading(true);

    try {
      const token = getActiveToken() || localStorage.getItem("authToken");

      const config = {
        headers: {
          "X-API-Key": API_KEY,
          Authorization: token ? `Bearer ${token}` : undefined,
          "Content-Type": "application/json",
        },
        validateStatus: function (status) {
          return status >= 200 && status < 500;
        },
      };

      // Build the request body with contact information
      const requestBody = {
        conversation_id,
        contact_data: {
          contact_type: contactType,
          name: contactInfo.name && contactInfo.name !== "Not Added" ? contactInfo.name : "",
          phone_numbers: contactInfo.phone && contactInfo.phone !== "Not Added" ? [contactInfo.phone] : [],
          email_addresses: contactInfo.email && contactInfo.email !== "Not Added" ? [contactInfo.email] : [],
          whatsapp_numbers: contactInfo.whatsapp && contactInfo.whatsapp !== "Not Added" ? [contactInfo.whatsapp] : [],
          title: contactInfo.title && contactInfo.title !== "Not Added" ? contactInfo.title : "-",
          company: contactInfo.company && contactInfo.company !== "Not Added" ? contactInfo.company : "-",
        },
        property_name: property, // Include current property
      };

      // Add reservation_id only if it exists
      if (reservation_id) {
        requestBody.reservation_id = reservation_id;
      }

      const response = await axios.put(
        `${baseUrl}/update_external_contact_info`,
        requestBody,
        config
      );

      if (response.status === 200) {
        ToastHandle("Contact information updated successfully", "success");

        // Update parent conversation with the API response
        if (response.data.updated_conversation && updateSelectedConversation) {
          updateSelectedConversation(conversation_id, {
            contact_type: contactType,
            name: contactInfo.name,
            phone: contactInfo.phone,
            email: contactInfo.email,
            whatsapp: contactInfo.whatsapp,
            title: contactInfo.title,
            company: contactInfo.company,
            property: property,
          });
        }

        // Close modal first
        setContactModalOpen(false);

        // Refresh local contact data
        await callGetGuestDataApi();

        // Update parent conversation data
        if (updateConversationFromApi && typeof updateConversationFromApi === "function") {
          updateConversationFromApi(conversation_id);
        }

      } else {
        ToastHandle(
          response?.data?.error || "Failed to update contact information",
          "danger"
        );
      }
    } catch (error) {
      console.error("Error updating guest data:", error);
      ToastHandle("Error updating contact information", "danger");
    } finally {
      setUpdateGuestDataLoading(false);
    }
  };

  // Handle contact type selection and update backend immediately
  const handleContactTypeSelect = async (type) => {
    setContactType(type);
    setContactTypeDropdownOpen(false);

    if (!conversation_id) return;
    try {
      const baseUrl = process.env.REACT_APP_API_ENDPOINT;
      const API_KEY = process.env.REACT_APP_API_KEY;
      const token = getActiveToken() || localStorage.getItem("authToken");
      const config = {
        headers: {
          "X-API-Key": API_KEY,
          Authorization: token ? `Bearer ${token}` : undefined,
          "Content-Type": "application/json",
        },
        validateStatus: function (status) {
          return status >= 200 && status < 500;
        },
      };
      const body = {
        conversation_id,
        contact_data: {
          contact_type: type,
        },
      };
      const response = await axios.put(`${baseUrl}/update_external_contact_info`, body, config);

      if (response.status === 200) {
        ToastHandle("Contact type updated successfully", "success");
        await callGetGuestDataApi();

        // Update just this conversation in the list
        if (updateSpecificConversation && rightSectionData?.conversation_id) {
          updateSpecificConversation(rightSectionData.conversation_id, {
            contact_type: type
          });
        }

        if (updateSelectedConversation && rightSectionData?.conversation_id) {
          updateSelectedConversation(rightSectionData.conversation_id, {
            contact_type: type
          });
        }

        // ADD THIS: Also update the selectedConversation if it's the same conversation
        if (updateConversationFromApi && typeof updateConversationFromApi === "function") {
          // Force update the selected conversation to reflect the new contact_type
          await updateConversationFromApi(rightSectionData.conversation_id);
        }
      }
    } catch (error) {
      ToastHandle("Failed to update contact type", "danger");
    }
  };

  // When opening the modal, ensure defaults are set:
  const handleOpenContactModal = () => {
    setContactInfo({
      name: contactInfo.name || "Not Added",
      phone: contactInfo.phone || "Not Added",
      email: contactInfo.email || "Not Added",
      whatsapp: contactInfo.whatsapp || "Not Added",
      title: contactInfo.title || "-",
      company: contactInfo.company || "-",
    });
    setContactModalOpen(true);
  };

  // Initial fetch of guest data and contact type when conversation_id and reservation_id are available
  useEffect(() => {
    if (conversation_id) {
      callGetGuestDataApi();
    }
  }, [conversation_id, reservation_id]);

  // Add this function before the component's return statement
  const callRemoveReservationAssociationApi = async () => {
    if (!conversation_id) return;
    const baseUrl = process.env.REACT_APP_API_ENDPOINT;
    const API_KEY = process.env.REACT_APP_API_KEY;
    try {
      // Get token from the apiCore's active token or fall back to localStorage
      const token = getActiveToken() || localStorage.getItem("authToken");
      const config = {
        headers: {
          "X-API-Key": API_KEY,
          Authorization: token ? `Bearer ${token}` : undefined,
        },
        validateStatus: function (status) {
          return status >= 200 && status < 500;
        },
      };
      const response = await axios.delete(
        `${baseUrl}/remove_reservation_association?conversation_id=${conversation_id}`,
        config
      );
      if (response.status === 200) {
        ToastHandle("Reservation association removed", "success");
        // Refresh guest data and conversation
        await callGetGuestDataApi();
        if (updateConversationFromApi && typeof updateConversationFromApi === "function") {
          updateConversationFromApi(conversation_id);
        }
      } else {
        ToastHandle(response?.data?.error || "Failed to remove association", "danger");
      }
    } catch (error) {
      ToastHandle("Error removing reservation association", "danger");
    }
  };

  return (
    <div className="right-side" ref={rightSideRef}>
      {/* Gradient overlays for scrolling indication */}
      {showTopGradient && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "296px",
            height: "40px",
            background:
              "linear-gradient(0deg, rgba(0, 0, 0, 0.00) 0%, rgba(0, 0, 0, 0.70) 100%)",
            pointerEvents: "none",
            zIndex: 1,
          }}
        />
      )}
      {showBottomGradient && (
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "296px",
            height: "40px",
            background:
              "linear-gradient(180deg, rgba(0, 0, 0, 0.00) 0%, rgba(0, 0, 0, 0.70) 100%)",
            pointerEvents: "none",
            zIndex: 1,
          }}
        />
      )}
      {/* Mobile Back Button */}
      <div className="d-block d-lg-none mobile-nav">
        <button
          onClick={() => setCurrentView("messages")}
          className="btn btn-link"
        >
          Back to Messages
        </button>
      </div>{" "}
      <div
        className="right-title"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {setRightSectionVisible && (
          <button
            className="close-right-section-btn"
            onClick={() => setRightSectionVisible(false)}
            style={{
              background: "transparent",
              border: "none",
              color: "#D0D3DB",
              cursor: "pointer",
              fontSize: "24px",
              padding: "6px 12px",
              borderRadius: "4px",
              transition: "background-color 0.2s ease",
              width: "40px",
              height: "40px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: "bold",
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "#24262E")}
            onMouseLeave={(e) =>
              (e.target.style.backgroundColor = "transparent")
            }
          >
            <img
              src={XCloseSvg}
              alt="Close"
              style={{
                width: "18px",
                height: "18px",
                background: "transparent",
              }}
            />
          </button>
        )}
      </div>
      <div>
        {/* Contact Information Section */}
        <div style={{ marginBottom: "15px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "10px",
            }}
          >
            <h2
              style={{
                margin: 0,
                marginBottom: "5px",
                color: "#ffffff",
                fontFamily: '"Poppins-SemiBold", Helvetica',
                fontSize: "16px",
                fontWeight: 600,
                lineHeight: "19.6px",
              }}
            >              Contact Information
            </h2>
            <span
              onClick={handleOpenContactModal}
              style={{
                margin: 0,
                marginBottom: "5px",
                color: "#74A9F7",
                fontSize: "16px",
                cursor: "pointer",
                fontWeight: 600,
                lineHeight: "19.6px",
                fontFamily: '"Poppins-SemiBold", Helvetica',
              }}
            >
              Edit
            </span>
          </div>{" "}
          <div>
            <span
              style={{
                color: "#A6A9B2",
                fontFamily: '"DM Sans", Helvetica',
                fontSize: "14px",
                fontWeight: 400,
              }}
            >
              Name:
            </span>
            <span
              style={{
                color: "#D0D3DB",
                fontFamily: '"DM Sans", Helvetica',
                fontSize: "14px",
                fontWeight: 400,
                marginLeft: "5px",
              }}
            >
              {getGuestDataLoading ? "Loading..." : contactInfo.name}
            </span>
          </div>
          <div>
            <span
              style={{
                color: "#A6A9B2",
                fontFamily: '"DM Sans", Helvetica',
                fontSize: "14px",
                fontWeight: 400,
              }}
            >
              Phone:
            </span>
            <span
              style={{
                color: "#D0D3DB",
                fontFamily: '"DM Sans", Helvetica',
                fontSize: "14px",
                fontWeight: 400,
                marginLeft: "5px",
              }}
            >
              {getGuestDataLoading ? "Loading..." : contactInfo.phone}
            </span>
          </div>
          <div>
            <span
              style={{
                color: "#A6A9B2",
                fontFamily: '"DM Sans", Helvetica',
                fontSize: "14px",
                fontWeight: 400,
              }}
            >
              Email:
            </span>
            <span
              style={{
                color: "#D0D3DB",
                fontFamily: '"DM Sans", Helvetica',
                fontSize: "14px",
                fontWeight: 400,
                marginLeft: "5px",
              }}
            >
              {getGuestDataLoading ? "Loading..." : contactInfo.email}
            </span>
          </div>
          <div>
            <span
              style={{
                color: "#A6A9B2",
                fontFamily: '"DM Sans", Helvetica',
                fontSize: "14px",
                fontWeight: 400,
              }}
            >
              WhatsApp:
            </span>
            <span
              style={{
                color: "#D0D3DB",
                fontFamily: '"DM Sans", Helvetica',
                fontSize: "14px",
                fontWeight: 400,
                marginLeft: "5px",
              }}
            >
              {getGuestDataLoading ? "Loading..." : contactInfo.whatsapp}
            </span>
          </div>
          <div>
            <span
              style={{
                color: "#A6A9B2",
                fontFamily: '"DM Sans", Helvetica',
                fontSize: "14px",
                fontWeight: 400,
              }}
            >
              Title:
            </span>
            <span
              style={{
                color: "#D0D3DB",
                fontFamily: '"DM Sans", Helvetica',
                fontSize: "14px",
                fontWeight: 400,
                marginLeft: "5px",
              }}
            >
              {getGuestDataLoading ? "Loading..." : contactInfo.title}
            </span>
          </div>
          <div style={{ marginBottom: "5px" }}>
            <span
              style={{
                color: "#A6A9B2",
                fontFamily: '"DM Sans", Helvetica',
                fontSize: "14px",
                fontWeight: 400,
              }}
            >
              Company:
            </span>
            <span
              style={{
                color: "#D0D3DB",
                fontFamily: '"DM Sans", Helvetica',
                fontSize: "14px",
                fontWeight: 400,
                marginLeft: "5px",
              }}
            >
              {getGuestDataLoading ? "Loading..." : contactInfo.company}
            </span>
          </div>
        </div>
        <div
          style={{
            borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
            margin: "10px auto",
            width: "100%",
            maxWidth: "400px",
          }}
        ></div>
      </div>
      {/* render here the contact type  */}
      <div>
        <h2
          style={{
            margin: 0,
            marginBottom: "5px",
            color: "#ffffff",
            fontFamily: '"Poppins-SemiBold", Helvetica',
            fontSize: "16px",
            fontWeight: 600,
            lineHeight: "19.6px",
          }}
        >
          Contact Type
        </h2>
        <div
          className="user-dropdown-container"
          ref={contactTypeDropdownRef}
          style={{ border: "1px solid #24262E" }}
        >
          {/* Custom dropdown for contact type */}
          <div
            className="user-dropdown-header"
            onClick={() => setContactTypeDropdownOpen(!contactTypeDropdownOpen)}
          >
            <span
              className={contactType ? "" : "user-dropdown-placeholder"}
              style={{
                fontSize: "14px",
                fontFamily: '"DM Sans", Helvetica',
                color: "#D0D3DB"
              }}
            >
              {contactType || "Select"}
            </span>
            <img
              src={ChevDownIcon}
              alt="Dropdown Icon"
              className="user-dropdown-icon"
              style={{
                transform: contactTypeDropdownOpen
                  ? "rotate(180deg)"
                  : "rotate(0)",
              }}
            />
          </div>

          {/* Dropdown menu */}
          {contactTypeDropdownOpen && (
            <div className="user-dropdown-menu">
              {contactTypeOptions.map((type, index) => (
                <div
                  key={index}
                  className={`user-dropdown-item ${contactType === type ? "user-dropdown-item-selected" : ""
                    }`}
                  onClick={() => handleContactTypeSelect(type)}
                >
                  <span
                    className="user-dropdown-item-text"
                    style={{
                      fontSize: "14px",
                      fontFamily: '"DM Sans", Helvetica'
                    }}
                  >
                    {type}
                  </span>
                  {contactType === type && (
                    <span className="user-dropdown-item-check">✓</span>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <div
        style={{
          borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
          margin: "10px auto",
          width: "100%",
          maxWidth: "400px",
        }}
      ></div>
      {/* Property dropdown section */}
      <div>
        <h2
          style={{
            margin: 0,
            marginBottom: "5px",
            color: "#ffffff",
            fontFamily: '"Poppins-SemiBold", Helvetica',
            fontSize: "16px",
            fontWeight: 600,
            lineHeight: "19.6px",
          }}
        >
          Property Name
        </h2>
        <div
          className="user-dropdown-container"
          ref={propertyDropdownRef}
          style={{ border: "1px solid #24262E" }}
        >
          {/* Custom dropdown for property */}
          <div
            className="user-dropdown-header"
            onClick={() => setPropertyDropdownOpen(!propertyDropdownOpen)}
            style={{ display: "flex", alignItems: "center" }}
          >
            <span
              className={property ? "" : "user-dropdown-placeholder"}
              style={{
                fontSize: "14px",
                fontFamily: '"DM Sans", Helvetica',
                color: property ? "#D0D3DB" : "#A6A9B2",
                flex: 1
              }}
            >
              {property || "Select"}
            </span>

            {/* Clear button - only show when property is selected */}
            {property && (
              <button
                onClick={(e) => {
                  e.stopPropagation(); // Prevent dropdown from opening
                  handlePropertyDeselect();
                }}
                style={{
                  background: "none",
                  border: "none",
                  color: "#A6A9B2",
                  cursor: "pointer",
                  padding: "0 4px",
                  fontSize: "16px",
                  marginRight: "4px"
                }}
                title="Clear property selection"
              >
                ×
              </button>
            )}

            <img
              src={ChevDownIcon}
              alt="Dropdown Icon"
              className="user-dropdown-icon"
              style={{
                transform: propertyDropdownOpen ? "rotate(180deg)" : "rotate(0)",
              }}
            />
          </div>

          {/* Dropdown menu */}
          {propertyDropdownOpen && !propertiesLoading && (
            <div className="user-dropdown-menu">
              {properties.map((propertyName, index) => (
                <div
                  key={index}
                  className={`user-dropdown-item ${property === propertyName ? "user-dropdown-item-selected" : ""
                    }`}
                  onClick={() => handlePropertySelect(propertyName)}
                >
                  <span
                    className="user-dropdown-item-text"
                    style={{
                      fontSize: "14px",
                      fontFamily: '"DM Sans", Helvetica'
                    }}
                  >
                    {propertyName}
                  </span>
                  {property === propertyName && (
                    <span className="user-dropdown-item-check">✓</span>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Loading indicator */}
          {propertyDropdownOpen && propertiesLoading && (
            <div className="user-dropdown-loading">
              <span style={{ color: "white" }}>Loading...</span>
            </div>
          )}
        </div>
      </div>
      <div
        style={{
          borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
          margin: "10px auto",
          width: "100%",
          maxWidth: "400px",
        }}
      ></div>

      {!(channel == "Chat Window") && (
        <div className="toggle">
          <div
            style={{
              fontSize: "12px",
              display: "flex",
              alignItems: "center",
              gap: "5px",
              marginBottom: "10px",
            }}
          >
            <img
              src={HostBuddyIcon}
              alt="HostBuddy"
              style={{ width: "25px", height: "25px" }}
            />
            <span
              style={{
                fontSize: "14px",
                fontWeight: "600",
                fontFamily: "Poppins Helvetica",
              }}
            >
              HostBuddy{" "}
            </span>

            {(() => {
              const currentProperty = property;
              const chatbotStatus = propertyChatbotStatus ? String(propertyChatbotStatus).toLowerCase() : null;
              const currentStatus = chatbotStatus ? String(chatbotStatus).toLowerCase() : null;
              const hasProperty = currentProperty && currentProperty.trim() !== "";
              const isPropertyLocked = isLocked && hasProperty;

              // console.log("Current Property:", currentProperty, "chatbotStatus:", chatbotStatus, "currentStatus:", currentStatus, "isPropertyLocked:", isPropertyLocked, "localStatus:", localStatus);

              if (isPropertyLocked) {
                return (
                  <>
                    <span>is</span>
                    <span style={{ color: "rgb(200,0,0)", fontWeight: "bold" }}>
                      NOT RESPONDING
                    </span>
                    <div style={{ fontSize: "12px", marginTop: "5px" }}>
                      <Link to="/properties" style={{ fontSize: "14px" }}>
                        Unlock
                      </Link>{" "}
                      this property to start responding.
                    </div>
                  </>
                );
              }

              if (hasProperty && currentStatus) {
                return (
                  <>
                    <span>is</span>
                    {!toggleStatusLoading ? (
                      <div
                        ref={hostbuddyDropdownRef}
                        style={{
                          position: "relative",
                          display: "inline-block",
                          width: "100%",
                        }}
                      >
                        <div
                          onClick={() => setHostbuddyDropdownOpen(!hostbuddyDropdownOpen)}
                          style={{
                            alignItems: "center",
                            display: "flex",
                            backgroundColor: "#24262E",
                            borderRadius: "4px",
                            gap: "6px",
                            height: "32px",
                            padding: "0px 8px",
                            position: "relative",
                            width: "100%",
                            cursor: "pointer",
                            color: (localStatus || currentStatus) === "on" ? "rgb(0,180,0)" : "rgb(200,0,0)",
                            fontWeight: "bold",
                            transition: "background-color 0.2s ease",
                          }}
                          tabIndex={0}
                          role="button"
                          aria-haspopup="listbox"
                          aria-expanded={hostbuddyDropdownOpen}
                        >
                          <span style={{ display: "inline-block", marginRight: "4px" }}>●</span>
                          <span style={{ flexGrow: 1 }}>
                            {(localStatus || currentStatus) === "on" ? "Active" : "Turned off"}
                          </span>
                          <img
                            src={ChevDownIcon}
                            alt="Dropdown Icon"
                            style={{
                              width: "16px",
                              height: "16px",
                              transform: hostbuddyDropdownOpen ? "rotate(180deg)" : "rotate(0)",
                              transition: "transform 0.3s ease",
                            }}
                          />
                        </div>

                        {hostbuddyDropdownOpen && (
                          <div
                            style={{
                              position: "absolute",
                              top: "100%",
                              left: "0",
                              right: "0",
                              backgroundColor: "#262730",
                              borderRadius: "4px",
                              marginTop: "4px",
                              zIndex: 100,
                              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.3)",
                              border: "1px solid rgba(57, 61, 70, 1)",
                              overflow: "hidden",
                            }}
                            role="listbox"
                          >
                            {/* Show current status label */}
                            {(localStatus || currentStatus) === "on" && (
                              <span
                                style={{
                                  padding: "8px 16px",
                                  display: "block",
                                  color: "white",
                                  fontWeight: "500",
                                }}
                                role="option"
                                aria-selected="true"
                              >
                                Turn off
                              </span>
                            )}

                            {/* Turn back on option when status is off */}
                            {(localStatus || currentStatus) === "off" && (
                              <div
                                onClick={() => {
                                  callSetStatusAPI("on", "indefinitely");
                                  setHostbuddyDropdownOpen(false);
                                }}
                                style={{
                                  padding: "8px 16px",
                                  cursor: "pointer",
                                  transition: "background-color 0.2s ease",
                                  color: "white",
                                  display: "flex",
                                  alignItems: "center",
                                  position: "relative",
                                }}
                                role="option"
                                tabIndex={0}
                                onMouseOver={(e) => {
                                  e.currentTarget.style.backgroundColor = "rgba(1, 50, 128, 1)";
                                }}
                                onMouseOut={(e) => {
                                  e.currentTarget.style.backgroundColor = "transparent";
                                }}
                                onKeyDown={(e) => {
                                  if (e.key === "Enter" || e.key === " ") {
                                    e.preventDefault();
                                    callSetStatusAPI("on", "indefinitely");
                                    setHostbuddyDropdownOpen(false);
                                  }
                                }}
                              >
                                <span>Turn back on</span>
                              </div>
                            )}

                            {/* Turn off options when status is on */}
                            {(localStatus || currentStatus) === "on" && (
                              <>
                                <div
                                  onClick={() => {
                                    callSetStatusAPI("off", "15m");
                                    setHostbuddyDropdownOpen(false);
                                  }}
                                  style={{
                                    padding: "8px 16px",
                                    paddingLeft: "24px",
                                    cursor: "pointer",
                                    transition: "background-color 0.2s ease",
                                    color: "white",
                                    display: "flex",
                                    alignItems: "center",
                                  }}
                                  role="option"
                                  tabIndex={0}
                                  onMouseOver={(e) => {
                                    e.currentTarget.style.backgroundColor = "rgba(1, 50, 128, 1)";
                                  }}
                                  onMouseOut={(e) => {
                                    e.currentTarget.style.backgroundColor = "transparent";
                                  }}
                                  onKeyDown={(e) => {
                                    if (e.key === "Enter" || e.key === " ") {
                                      e.preventDefault();
                                      callSetStatusAPI("off", "15m");
                                      setHostbuddyDropdownOpen(false);
                                    }
                                  }}
                                >
                                  <span>For 15 minutes</span>
                                </div>

                                <div
                                  onClick={() => {
                                    callSetStatusAPI("off", "1h");
                                    setHostbuddyDropdownOpen(false);
                                  }}
                                  style={{
                                    padding: "8px 16px",
                                    paddingLeft: "24px",
                                    cursor: "pointer",
                                    transition: "background-color 0.2s ease",
                                    color: "white",
                                    display: "flex",
                                    alignItems: "center",
                                  }}
                                  role="option"
                                  tabIndex={0}
                                  onMouseOver={(e) => {
                                    e.currentTarget.style.backgroundColor = "rgba(1, 50, 128, 1)";
                                  }}
                                  onMouseOut={(e) => {
                                    e.currentTarget.style.backgroundColor = "transparent";
                                  }}
                                  onKeyDown={(e) => {
                                    if (e.key === "Enter" || e.key === " ") {
                                      e.preventDefault();
                                      callSetStatusAPI("off", "1h");
                                      setHostbuddyDropdownOpen(false);
                                    }
                                  }}
                                >
                                  <span>For 1 hour</span>
                                </div>

                                <div
                                  onClick={() => {
                                    callSetStatusAPI("off", "1d");
                                    setHostbuddyDropdownOpen(false);
                                  }}
                                  style={{
                                    padding: "8px 16px",
                                    paddingLeft: "24px",
                                    cursor: "pointer",
                                    transition: "background-color 0.2s ease",
                                    color: "white",
                                    display: "flex",
                                    alignItems: "center",
                                  }}
                                  role="option"
                                  tabIndex={0}
                                  onMouseOver={(e) => {
                                    e.currentTarget.style.backgroundColor = "rgba(1, 50, 128, 1)";
                                  }}
                                  onMouseOut={(e) => {
                                    e.currentTarget.style.backgroundColor = "transparent";
                                  }}
                                  onKeyDown={(e) => {
                                    if (e.key === "Enter" || e.key === " ") {
                                      e.preventDefault();
                                      callSetStatusAPI("off", "1d");
                                      setHostbuddyDropdownOpen(false);
                                    }
                                  }}
                                >
                                  <span>For 24 hours</span>
                                </div>

                                <div
                                  onClick={() => {
                                    callSetStatusAPI("off", "indefinitely");
                                    setHostbuddyDropdownOpen(false);
                                  }}
                                  style={{
                                    padding: "8px 16px",
                                    paddingLeft: "24px",
                                    cursor: "pointer",
                                    transition: "background-color 0.2s ease",
                                    color: "white",
                                    display: "flex",
                                    alignItems: "center",
                                  }}
                                  role="option"
                                  tabIndex={0}
                                  onMouseOver={(e) => {
                                    e.currentTarget.style.backgroundColor = "rgba(1, 50, 128, 1)";
                                  }}
                                  onMouseOut={(e) => {
                                    e.currentTarget.style.backgroundColor = "transparent";
                                  }}
                                  onKeyDown={(e) => {
                                    if (e.key === "Enter" || e.key === " ") {
                                      e.preventDefault();
                                      callSetStatusAPI("off", "indefinitely");
                                      setHostbuddyDropdownOpen(false);
                                    }
                                  }}
                                >
                                  <span>Indefinitely</span>
                                </div>
                              </>
                            )}
                          </div>
                        )}
                      </div>
                    ) : (
                      <span style={{ display: "inline-flex", alignItems: "center", height: "24px" }}>
                        <Loader />
                      </span>
                    )}
                  </>
                );
              }

              if (!hasProperty) {
                return (
                  <span style={{ color: "#A6A9B2", fontSize: "12px" }}>
                    Select a property to manage HostBuddy status
                  </span>
                );
              }

              return (
                <span style={{ color: "#A6A9B2", fontSize: "12px" }}>
                  Loading status...
                </span>
              );
            })()}
          </div>
        </div>
      )}
      {/* render here the assign user  */}{" "}
      <div>
        <h2
          style={{
            margin: 0,
            marginBottom: "5px",
            color: "#ffffff",
            fontFamily: '"Poppins-SemiBold", Helvetica',
            fontSize: "16px",
            fontWeight: 600,
            lineHeight: "19.6px",
          }}
        >
          Assign User
        </h2>
        <div
          className="user-dropdown-container"
          ref={assignUserDropdownRef}
          style={{ border: "1px solid #24262E" }}
        >
          {/* Custom dropdown that looks like the sentiment dropdown */}
          <div
            className="user-dropdown-header"
            onClick={handleAssignUserDropdownOpen}
          >
            {" "}
            {/* Show combined users or placeholder */}
            {combinedUsers.length > 0 ? (
              <div className="user-tags-container">
                {combinedUsers.map((user) => (
                  <div key={user.id} className="user-tag">
                    <span className="user-tag-text">{user.name}</span>
                    <span
                      className="user-tag-close"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveUser(user.name);
                      }}
                    >
                      ×
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <span className="user-dropdown-placeholder">Select</span>
            )}
            {/* Dropdown icon */}
            <img
              src={ChevDownIcon}
              alt="Dropdown Icon"
              className="user-dropdown-icon"
              style={{
                transform: assignUserDropdownOpen
                  ? "rotate(180deg)"
                  : "rotate(0)",
              }}
            />
          </div>

          {/* Dropdown menu */}
          {assignUserDropdownOpen && !subUserLoading && (
            <div className="user-dropdown-menu">
              {subUserNames &&
                subUserNames.map((user, index) => (
                  <div
                    key={index}
                    className={`user-dropdown-item ${combinedUsers.some(
                      (selected) =>
                        selected.name === user.display_name ||
                        selected.email === user.email
                    )
                      ? "user-dropdown-item-selected"
                      : ""
                      }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleUserSelect(user);
                    }}
                  >
                    <span className="user-dropdown-item-text">
                      {user.display_name}
                    </span>
                    {combinedUsers.some(
                      (selected) =>
                        selected.name === user.display_name ||
                        selected.email === user.email
                    ) && <span className="user-dropdown-item-check">✓</span>}
                  </div>
                ))}
            </div>
          )}

          {/* Loading indicator */}
          {subUserLoading && (
            <div className="user-dropdown-loading">
              <span style={{ color: "white" }}>Loading...</span>
            </div>
          )}
        </div>
      </div>
      {/* Contact Information Modal */}
      {contactModalOpen && (
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
            zIndex: 1000,
          }}
          onClick={() => setContactModalOpen(false)}
        >
          <div
            style={{
              width: "480px",
              height: "380px",
              backgroundColor: "#2B2E36",
              borderRadius: "4px", // Setting border radius to 4px as requested
              padding: "24px",
              gap: "16px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
              border: "1px solid rgb(67 70 78)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "20px",
              }}
            >
              <h2
                style={{
                  margin: 0,
                  color: "#D0D3DB",
                  fontFamily: '"Poppins", Helvetica, sams-serif',
                  fontSize: "24px",
                  fontWeight: 700,
                }}
              >
                Contact information
              </h2>
              <span
                onClick={() => setContactModalOpen(false)}
                style={{
                  cursor: "pointer",
                  fontSize: "20px",
                  color: "#A6A9B2",
                }}
              >
                &times;
              </span>
            </div>

            {/* Form Fields - Making email and phone labels appear horizontally */}
            <div style={{ marginBottom: "20px" }}>
              <div
                style={{ display: "flex", flexDirection: "row", gap: "20px" }}
              >
                {/* Name Field */}
                <div style={{ flex: 1 }}>
                  <label
                    style={{
                      display: "block",
                      // marginBottom: '5px',
                      fontSize: "14px",
                      color: "#A6A9B2", // Setting label color as requested
                    }}
                  >
                    Name
                  </label>
                  <input
                    type="email"
                    value={contactInfo.name}
                    onChange={(e) =>
                      setContactInfo({ ...contactInfo, name: e.target.value })
                    }
                    style={{
                      width: "100%",
                      padding: "8px",
                      backgroundColor: "#24262E",
                      border: "1px solid #393d46",
                      borderRadius: "4px",
                      color: "#D0D3DB", // Setting input text color as requested
                      fontSize: "14px",
                    }}
                  />
                </div>

                {/* Phone Field */}
                <div style={{ flex: 1 }}>
                  <label
                    style={{
                      display: "block",
                      // marginBottom: '5px',
                      fontSize: "14px",
                      color: "#A6A9B2", // Setting label color as requested
                    }}
                  >
                    Phone
                  </label>
                  <input
                    type="tel"
                    value={contactInfo.phone}
                    onChange={(e) =>
                      setContactInfo({ ...contactInfo, phone: e.target.value })
                    }
                    style={{
                      width: "100%",
                      padding: "8px",
                      backgroundColor: "#24262E",
                      border: "1px solid #393d46",
                      borderRadius: "4px",
                      color: "#D0D3DB", // Setting input text color as requested
                      fontSize: "14px",
                    }}
                  />
                </div>
              </div>
            </div>

            <div style={{ marginBottom: "20px" }}>
              <div
                style={{ display: "flex", flexDirection: "row", gap: "20px" }}
              >
                {/* Email Field */}
                <div style={{ flex: 1 }}>
                  <label
                    style={{
                      display: "block",
                      // marginBottom: '5px',
                      fontSize: "14px",
                      color: "#A6A9B2", // Setting label color as requested
                    }}
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    value={contactInfo.email}
                    onChange={(e) =>
                      setContactInfo({ ...contactInfo, email: e.target.value })
                    }
                    style={{
                      width: "100%",
                      padding: "8px",
                      backgroundColor: "#24262E",
                      border: "1px solid #393d46",
                      borderRadius: "4px",
                      color: "#D0D3DB", // Setting input text color as requested
                      fontSize: "14px",
                    }}
                  />
                </div>

                {/* WhatsApp Field */}
                <div style={{ flex: 1 }}>
                  <label
                    style={{
                      display: "block",
                      // marginBottom: '5px',
                      fontSize: "14px",
                      color: "#A6A9B2", // Setting label color as requested
                    }}
                  >
                    WhatsApp
                  </label>
                  <input
                    type="email"
                    value={contactInfo.whatsapp}
                    onChange={(e) =>
                      setContactInfo({ ...contactInfo, whatsapp: e.target.value })
                    }
                    style={{
                      width: "100%",
                      padding: "8px",
                      backgroundColor: "#24262E",
                      border: "1px solid #393d46",
                      borderRadius: "4px",
                      color: "#D0D3DB", // Setting input text color as requested
                      fontSize: "14px",
                    }}
                  />
                </div>
              </div>
            </div>

            <div style={{ marginBottom: "20px" }}>
              <div
                style={{ display: "flex", flexDirection: "row", gap: "20px" }}
              >
                {/* Title Field */}
                <div style={{ flex: 1 }}>
                  <label
                    style={{
                      display: "block",
                      // marginBottom: '5px',
                      fontSize: "14px",
                      color: "#A6A9B2", // Setting label color as requested
                    }}
                  >
                    Title
                  </label>
                  <input
                    type="email"
                    value={contactInfo.title}
                    onChange={(e) =>
                      setContactInfo({ ...contactInfo, title: e.target.value })
                    }
                    style={{
                      width: "100%",
                      padding: "8px",
                      backgroundColor: "#24262E",
                      border: "1px solid #393d46",
                      borderRadius: "4px",
                      color: "#D0D3DB", // Setting input text color as requested
                      fontSize: "14px",
                    }}
                  />
                </div>

                {/* Company Field */}
                <div style={{ flex: 1 }}>
                  <label
                    style={{
                      display: "block",
                      // marginBottom: '5px',
                      fontSize: "14px",
                      color: "#A6A9B2", // Setting label color as requested
                    }}
                  >
                    Company
                  </label>
                  <input
                    type="email"
                    value={contactInfo.company}
                    onChange={(e) =>
                      setContactInfo({ ...contactInfo, company: e.target.value })
                    }
                    style={{
                      width: "100%",
                      padding: "8px",
                      backgroundColor: "#24262E",
                      border: "1px solid #393d46",
                      borderRadius: "4px",
                      color: "#D0D3DB", // Setting input text color as requested
                      fontSize: "14px",
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                gap: "10px",
              }}
            >
              {" "}
              <button
                onClick={() => setContactModalOpen(false)}
                style={{
                  padding: "8px 16px",
                  border: "none",
                  backgroundColor: "transparent",
                  color: "#D0D3DB",
                  cursor: "pointer",
                  fontSize: "14px",
                }}
              >
                Cancel
              </button>
              <button
                onClick={callUpdateGuestDataApi}
                disabled={updateGuestDataLoading}
                style={{
                  padding: "8px 8px",
                  border: "none",
                  backgroundColor: updateGuestDataLoading
                    ? "#4A5568"
                    : "#0B5FDE",
                  color: "#ffffff",
                  borderRadius: "4px",
                  cursor: updateGuestDataLoading ? "not-allowed" : "pointer",
                  fontSize: "14px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  minWidth: "60px",
                }}
              >
                {updateGuestDataLoading ? <Loader /> : "Update"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NonGuestRightSection;
