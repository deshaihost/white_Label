import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { getUserDataActions } from "../../../redux/actions";
import AdditionalInformationModel from "./additionalInformationModel/AdditionalInformationModel";
import { Container, Form } from "react-bootstrap";
import ToastHandle from "../../../helper/ToastMessage";
import { BoxLoader, FullScreenLoader } from "../../../helper/Loader";
import "./actionItem.css";
import axios from "axios";
import { FaExternalLinkAlt } from "react-icons/fa";
import { FaCircleCheck } from "react-icons/fa6";
import { useLocation, useNavigate } from "react-router-dom";
import ConversationTranscriptModal from "../../inbox/inboxSection/resources/ConversationTranscriptModal";
import customStyles from './selectStyles';
import ActionItemsUpgrade from '../ActionItemsUpgrade/ActionItemsUpgrade';
import { getSubscriptionStatus } from '../../../helper/Authorized';

const ActionsItemsTable = () => {

  const callGetActionItemsApi = async (status_query) => {
    const baseUrl = process.env.REACT_APP_API_ENDPOINT;
    const API_KEY = process.env.REACT_APP_API_KEY;
    setGetActionItemsLoading(true);
  
    try {
      const config = {
        headers: { "X-API-Key": API_KEY },
        validateStatus: function (status) { return status >= 200 && status < 500; } // don't throw an error for non-2xx responses
      };
      const response = await axios.get( `${baseUrl}/get_action_items?status=${status_query}&limit=200`, config);
  
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

  const callCompleteActionItemApi = async (actionItemId) => {
    const baseUrl = process.env.REACT_APP_API_ENDPOINT;
    const API_KEY = process.env.REACT_APP_API_KEY;
    setActionItemCompleting(actionItemId);
  
    try {
      const config = {
        headers: { "X-API-Key": API_KEY },
        validateStatus: function (status) { return status >= 200 && status < 500; } // don't throw an error for non-2xx responses
      };
      const bodyData = { action_item_id: actionItemId };
      const response = await axios.put( `${baseUrl}/complete_action_item`, bodyData, config);
  
      if (response.status === 200) { 
        setActionItems(actionItems.filter((actionItem) => actionItem.id !== actionItemId)); // remove the completed action item from the state
      }

      else { ToastHandle(response?.data?.error, "danger"); }
      return response.data;
    } catch (error) {
    } finally {
      setActionItemCompleting("");
    }
  };

  const callGetConversationApi = async (conversationId, actionItemId, propertyName) => {
    setGetConversationLoading(actionItemId);
    const baseUrl = process.env.REACT_APP_API_ENDPOINT;
    const API_KEY = process.env.REACT_APP_API_KEY;
  
    try {
      const config = {
        headers: { "X-API-Key": API_KEY },
        validateStatus: function (status) { return status >= 200 && status < 500; } // don't throw an error for non-2xx responses
      };
      const body_data = { 'query_data': { 'conversation_id':conversationId } };
      console.log("body_data", body_data);
      console.log("conversationId", conversationId);
      const response = await axios.post( `${baseUrl}/get_all_conversations`, body_data, config ); // it's a POST endpoint because it handles more complex queries
  
      if (response.status === 200) {
        setConversationDataForModal({ conversationApiData:response.data.conversations[0], propertyName });
        setShowConversationTranscriptModal(true);
      }
      else { ToastHandle(response?.data?.error, "danger"); }
      return response.data;
    } catch (error) {
      return { error: "Internal server error" };
    } finally {
      setGetConversationLoading("");
    }
  };

  const store = useSelector((state) => state);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const createPropertiesName = store?.getUserDataReducer?.getUserData?.data?.user?.property_data;
  const allPropertyName = createPropertiesName !== undefined ? createPropertiesName : {};
  const propertyOptions = Object.keys(allPropertyName).map((key) => ({ value:key, label:key })); // All property options as an array of objects, for the React Select component

  const [selectedStatus, setSelectedStatus] = useState("incomplete");
  const [selectedProperties, setSelectedProperties] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");

  const [converSationId, setConverSationId] = useState("");
  const [propertyNameForConversationData, setPropertyNameForConversationData] = useState("");
  const [modalShowAdditional, setModalShowAdditional] = useState(false);
  const [dropDownShow, setDropDownShow] = useState({ inputArow: false });

  const [actionItems, setActionItems] = useState([]);
  const [getActionItemsLoading, setGetActionItemsLoading] = useState(false);
  const [actionItemCompleting, setActionItemCompleting] = useState("");

  const [getConversationLoading, setGetConversationLoading] = useState("");
  const [conversationDataForModal, setConversationDataForModal] = useState({});
  const [showConversationTranscriptModal, setShowConversationTranscriptModal] = useState(false);

  // Apply the property name filter
  let filteredActionItems = actionItems?.filter((actionItem) => {
    return (selectedProperties.length === 0 || selectedProperties.some((selectedProperty) => selectedProperty.value === actionItem.property_name));
  });

  // Apply the category filter
  filteredActionItems = filteredActionItems?.filter((actionItem) => {
    return (selectedCategory === "all" || actionItem.category === selectedCategory);
  });

  // date format
  function formatDateTime(dateTimeString) {
    const date = new Date(dateTimeString);
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const month = months[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    const ampm = hours >= 12 ? "pm" : "am";

    hours = hours % 12;
    hours = hours ? hours : 12; // 0 hour should be 12
    minutes = minutes < 10 ? "0" + minutes : minutes;

    return `${month} ${day}\n${hours}:${minutes}${ampm}`;
  }

  const formatCompletedBy = (completedBy) => {
    if (!completedBy) return "";
    if (completedBy === "hostbuddy") return "HostBuddy";
    if (completedBy === "user") return "User";
    if (completedBy.startsWith("user:")) return completedBy.split(":")[1];
    return completedBy;
  };

  const handleOpenConversation = (conversationId, actionItemId, propertyName) => {
    //callGetConversationApi(conversationId, actionItemId, propertyName);
    navigate(`/inbox?conversationId=${conversationId}`);
  }

  const handleComplete = (actionItemId) => {
    callCompleteActionItemApi(actionItemId);
  };

  const handleSelectStatusChange = (e) => {
    setSelectedStatus(e.target.value);
    callGetActionItemsApi(e.target.value);
  };

  const handlePropertyChange = (selectedOptions) => {
    setSelectedProperties(selectedOptions);
  };

  // On page load, get user data and action items
  useEffect(() => {
    dispatch(getUserDataActions(false)); // false - don't need property data, just need the names
    callGetActionItemsApi('incomplete');
  }, []);

  // If property name is passed as a query param, set it as the selected property when the param populates
  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const propertyNameQuery = query.get('property_name');
    if (propertyNameQuery) { setSelectedProperties([{ value: propertyNameQuery, label: propertyNameQuery }]); }
  }, [location.search]);

  // Get user plan
  const userData = store?.getUserDataReducer?.getUserData?.data?.user;
  const subscriptionPlan = getSubscriptionStatus(userData).plan || '';

  // Helper to determine cutoff days
  const getCutoffDays = () => {
    if (/elite/i.test(subscriptionPlan)) return 30;
    if (/pro/i.test(subscriptionPlan)) return 3;
    return 10000; // fallback for other plans (show all)
  };
  const cutoffDays = getCutoffDays();
  const now = new Date();

  // Split action items into visible and locked
  const isLocked = (item) => {
    const itemDate = new Date(item.created_at);
    const diffDays = (now - itemDate) / (1000 * 60 * 60 * 24);
    return diffDays > cutoffDays;
  };
  const hasLockedItems = filteredActionItems.some(isLocked);

  const handleComparePlans = () => {
    navigate('/setting/subscription');
  };

  // Split into unlocked and locked
  const unlockedActionItems = filteredActionItems.filter(item => !isLocked(item));
  const lockedActionItems = filteredActionItems.filter(isLocked);
  const lockedToShow = lockedActionItems.slice(0, 5);
  // Combine for rendering: unlocked first, then up to 5 locked
  const itemsToRender = [...unlockedActionItems, ...lockedToShow];

  // Find indices of first and last locked rows in itemsToRender
  const lockedRowIndices = itemsToRender
    .map((item, idx) => isLocked(item) ? idx : -1)
    .filter(idx => idx !== -1);
  const firstLockedIdx = lockedRowIndices.length > 0 ? lockedRowIndices[0] : null;
  const lastLockedIdx = lockedRowIndices.length > 0 ? lockedRowIndices[lockedRowIndices.length - 1] : null;

  // Refs for positioning overlay
  const tableBodyRef = useRef(null);
  const firstLockedRef = useRef(null);
  const lastLockedRef = useRef(null);
  const [overlayStyle, setOverlayStyle] = useState({ display: 'none' });

  useEffect(() => {
    if (firstLockedIdx !== null && lastLockedIdx !== null && firstLockedRef.current && lastLockedRef.current && tableBodyRef.current) {
      const tbodyRect = tableBodyRef.current.getBoundingClientRect();
      const firstRect = firstLockedRef.current.getBoundingClientRect();
      const lastRect = lastLockedRef.current.getBoundingClientRect();
      setOverlayStyle({
        position: 'absolute',
        left: 0,
        width: '100%',
        top: firstRect.top - tbodyRect.top,
        height: lastRect.bottom - firstRect.top,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 20,
        background: 'rgba(2, 14, 41, 0.7)',
        pointerEvents: 'auto',
      });
    } else {
      setOverlayStyle({ display: 'none' });
    }
  }, [firstLockedIdx, lastLockedIdx, filteredActionItems]);

  return (
    <>
      <Container>
        <div className="action-items-page" style={{ position: 'relative' }}>
          {getActionItemsLoading && <FullScreenLoader />}
          <div className="action-items">
            <div className="action-heading">
              <h3>Action Items</h3>
            </div>
            <div className="action-select">

              <div className="item-select">
                <select aria-label="Default select example" className="bg-dark form-select" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
                  <option value="all">All Categories</option>
                  <option value="CLEANLINESS">Cleanliness</option>
                  <option value="MAINTENANCE">Maintenance</option>
                  <option value="RESERVATION CHANGES">Reservation Changes</option>
                  <option value="GUEST REQUESTS">Guest Requests</option>
                  <option value="KNOWLEDGE BASE SUGGESTIONS">Knowledge Base Suggestions</option>
                  <option value="OTHER">Other</option>
                </select>
              </div>

              <div className="item-select">
                <select aria-label="Default select example" className="bg-dark form-select" value={selectedStatus} onChange={handleSelectStatusChange}>
                  <option value="incomplete">Incomplete</option>
                  <option value="completed">Completed</option>
                  <option value="expired">Expired</option>
                </select>
              </div>

              <div className="item-select" style={{width:"30%"}}>
                <Select className="custom-select property_Custom_Select" isMulti options={propertyOptions} value={selectedProperties} styles={customStyles} onChange={handlePropertyChange} placeholder="All Properties" closeMenuOnSelect={false}/>
              </div>

            </div>
          </div>
          <div className="table-responsive" style={{ overflowY: "auto", marginBottom: "30px", position: 'relative' }}>
            {itemsToRender?.length > 0 ? (
              <div style={{ position: 'relative' }}>
                <table className="table text-white action-items-table">
                  <thead style={{ background: "#020d29" }}>
                    <tr>
                      <th>Date/Time</th>
                      <th>Property/Guest</th>
                      <th>Category</th>
                      <th>Action Item</th>
                      {selectedStatus === "completed" && <th>Completed By</th>}
                      <th>View/Done</th>
                    </tr>
                  </thead>
                  <tbody ref={tableBodyRef}>
                    {itemsToRender.map((actionItem, idx) => {
                      const { id, created_at, property_name, conversation_id, item } = actionItem;
                      let actionItemSend = { propertyName: property_name, conversation_id };
                      const locked = isLocked(actionItem);
                      const rowRef =
                        idx === firstLockedIdx ? firstLockedRef :
                        idx === lastLockedIdx ? lastLockedRef :
                        null;
                      return (
                        <tr key={id} ref={rowRef} style={locked ? { pointerEvents: 'none' } : {}}>
                          <td style={{ whiteSpace: "pre-line" }}>
                            <div className={locked ? 'blurred-content' : ''}>
                              {formatDateTime(created_at)}
                            </div>
                          </td>
                          <td>
                            <div className={locked ? 'blurred-content' : ''}>
                              {property_name}
                              <br />
                              {actionItem?.guest_name ? actionItem?.guest_name : ""}
                            </div>
                          </td>
                          <td>
                            <div className={locked ? 'blurred-content' : ''}>
                              {actionItem?.category ? actionItem?.category : ""}
                            </div>
                          </td>
                          <td className="">
                            <div className={locked ? 'blurred-content' : ''}>{item}</div>
                          </td>
                          {selectedStatus === "completed" && (
                            <td style={{minWidth:'130px'}}>
                              <div className={locked ? 'blurred-content' : ''}>{formatCompletedBy(actionItem?.completed_by)}</div>
                            </td>
                          )}
                          <td className="text-center">
                            <div className={locked ? 'blurred-content' : ''}>
                              {actionItemCompleting === id || getConversationLoading === id ? (
                                <BoxLoader />
                              ) : (
                                <>
                                  <FaExternalLinkAlt style={{marginRight:'10px', cursor:'pointer'}} onClick={() => { if (!locked) handleOpenConversation(conversation_id, id, property_name); }} />
                                  <FaCircleCheck className="text-primary fs-6" style={{cursor:'pointer'}} onClick={() => { if (!locked) handleComplete(id); }} />
                                </>
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                {/* Single overlay for all locked rows */}
                {firstLockedIdx !== null && lastLockedIdx !== null && (
                  <div style={overlayStyle} className="action-items-upgrade-locked-overlay">
                    <ActionItemsUpgrade onComparePlans={handleComparePlans} />
                  </div>
                )}
              </div>
            ) : (
              <span className="d-flex justify-content-center align-items-center" style={{ height:'500px', color:"#FFF" }}>
                No Data Yet
              </span>
            )}
          </div>
        </div>
      </Container>
      <AdditionalInformationModel show={modalShowAdditional} onHide={() => setModalShowAdditional(false)}/>
      <ConversationTranscriptModal handleClose={() => setShowConversationTranscriptModal(false)} show={showConversationTranscriptModal} modalData={conversationDataForModal} />
    </>
  );
};

export default ActionsItemsTable;
