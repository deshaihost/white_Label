import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { getUserDataActions } from "../../../redux/actions";
import AdditionalInformationModel from "./additionalInformationModel/AdditionalInformationModel";
import { Container } from "react-bootstrap";
import ToastHandle from "../../../helper/ToastMessage";
import { BoxLoader, FullScreenLoader } from "../../../helper/Loader";
import "./actionItem.css";
import axios from "axios";
import { FaExternalLinkAlt, FaCheck } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import ConversationTranscriptModal from "../../inbox/inboxSection/resources/ConversationTranscriptModal";
import customStyles from './selectStyles';
import ActionItemsUpgrade from '../ActionItemsUpgrade/ActionItemsUpgrade';
import { getSubscriptionStatus } from '../../../helper/Authorized';
import { fetchCategoriesFromAPI } from "../../../component/multiSelect/actionItemCategoriesMultiSelect";
import { useWhiteLabelCss } from "../../../helper/WhiteLabelCssContext";

const ActionsItemsTable = () => {

  const { cssConfig, loading: cssLoading } = useWhiteLabelCss();

  const callGetActionItemsApi = async (status_query) => {
    const baseUrl = process.env.REACT_APP_API_ENDPOINT;
    const API_KEY = process.env.REACT_APP_API_KEY;
    setGetActionItemsLoading(true);

    try {
      const config = {
        headers: { "X-API-Key": API_KEY },
        validateStatus: function (status) { return status >= 200 && status < 500; } // don't throw an error for non-2xx responses
      };
      const response = await axios.get(`${baseUrl}/get_action_items?status=${status_query}&limit=200`, config);

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
      const response = await axios.put(`${baseUrl}/complete_action_item`, bodyData, config);

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
      const body_data = { 'query_data': { 'conversation_id': conversationId } };
      console.log("body_data", body_data);
      console.log("conversationId", conversationId);
      const response = await axios.post(`${baseUrl}/get_all_conversations`, body_data, config); // it's a POST endpoint because it handles more complex queries

      if (response.status === 200) {
        setConversationDataForModal({ conversationApiData: response.data.conversations[0], propertyName });
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
  const propertyOptions = Object.keys(allPropertyName).map((key) => ({ value: key, label: key })); // All property options as an array of objects, for the React Select component

  // Add category data retrieval from Redux store
  const createCategoriesName = store?.getUserDataReducer?.getUserData?.data?.user?.category_data;
  const allCategoryName = createCategoriesName !== undefined ? createCategoriesName : {};
  const categoryOptions = Object.keys(allCategoryName).map((key) => ({ value: key, label: key }));

  const [selectedStatus, setSelectedStatus] = useState("incomplete");
  const [selectedProperties, setSelectedProperties] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [categories, setCategories] = useState([]);
  const [categoriesLoading, setCategoriesLoading] = useState(false);

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

  // Apply the category filter - updated to handle multiple categories
  filteredActionItems = filteredActionItems?.filter((actionItem) => {
    return (selectedCategories.length === 0 || selectedCategories.some((selectedCategory) => selectedCategory.value === actionItem.category));
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

  const handleCategoryChange = (selectedOptions) => {
    setSelectedCategories(selectedOptions);
  };

  // On page load, get user data, action items and categories
  useEffect(() => {
    dispatch(getUserDataActions(false));
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
  const isMountPlan = subscriptionPlan?.toLowerCase().includes("mount");

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
    // Compare only calendar days; ignore hours/minutes
    const itemDate = new Date(item.created_at);
    const nowDate = new Date();
    // Normalise both to midnight so we only compare the date portion
    itemDate.setHours(0, 0, 0, 0);
    nowDate.setHours(0, 0, 0, 0);

    const diffDays = (nowDate - itemDate) / (1000 * 60 * 60 * 24);
    return diffDays > cutoffDays;
  };
  const hasLockedItems = filteredActionItems.some(isLocked);

  const handleComparePlans = () => {
    navigate('/setting/subscription');
  };

  // Keep only the items the current plan is allowed to see
  const unlockedActionItems = filteredActionItems.filter(item => !isLocked(item));
  const lockedActionItems = filteredActionItems.filter(isLocked);
  const itemsToRender = unlockedActionItems;

  // Let's add a useEffect to fetch categories directly from API
  useEffect(() => {
    const loadCategories = async () => {
      setCategoriesLoading(true);
      try {
        const fetchedCategories = await fetchCategoriesFromAPI();
        if (fetchedCategories && fetchedCategories.length > 0) {
          // Map categories to format needed for react-select
          const formattedCategories = fetchedCategories.map(cat => ({
            value: cat.name,
            label: cat.name
          }));
          setCategories(formattedCategories);
        }
      } catch (error) {
        console.error("Error loading categories:", error);
      } finally {
        setCategoriesLoading(false);
      }
    };

    loadCategories();
  }, []); // Empty dependency array means this runs once on component mount

  // Create dynamic styles with dropdown background color
  const getDynamicStyles = () => {
    const dropdownBgColor = cssLoading ? 'rgba(189, 193, 201, 0.08)' : (cssConfig?.css_data?.background?.dropdown || 'var(--white-label-background-dropdown, rgba(189, 193, 201, 0.08))');
    const hoverColor = cssLoading ? '#01255e' : (cssConfig?.css_data?.background?.hover || 'var(--white-label-background-hover, #01255e)');
    const borderPrimaryColor = cssLoading ? '#013280' : (cssConfig?.css_data?.borders?.primary || '#013280');
    const placeholderColor = cssLoading ? '#888' : (cssConfig?.css_data?.text?.placeholder || '#888');
    
    return {
      ...customStyles,
      control: (provided, state) => ({
        ...customStyles.control(provided, state),
        background: dropdownBgColor,
        border: `1px solid ${borderPrimaryColor}`,
        '&:hover': {
          borderColor: borderPrimaryColor,
        },
      }),
      menu: (provided) => ({
        ...customStyles.menu(provided),
        background: dropdownBgColor,
        border: `1px solid ${borderPrimaryColor}`,
      }),
      option: (provided, state) => ({
        ...customStyles.option(provided, state),
        backgroundColor: state.isFocused || state.isSelected ? hoverColor : 'transparent',
        '&:hover': {
          backgroundColor: hoverColor,
        },
      }),
      placeholder: (provided) => ({
        ...provided,
        color: placeholderColor,
      })
    };
  };

  return (
    <>
      <Container>
        <div className="action-items-page" style={{ position: 'relative' }}>
          {getActionItemsLoading && <FullScreenLoader />}
          <div className="action-items">
            <div className="action-heading">
              <h3 style={{
                color: !cssLoading && cssConfig?.css_data?.text?.primary ? 
                  cssConfig.css_data.text.primary : '#ffffff'
              }}>
                Action Items
              </h3>
            </div>
            <div className="action-select">

              {!isMountPlan && (
                <div className="item-select" style={{ width: "30%" }}>
                  <Select 
                    className="custom-select property_Custom_Select" 
                    isMulti 
                    options={categories} // Use locally fetched categories instead of categoryOptions
                    value={selectedCategories} 
                    styles={getDynamicStyles()} 
                    onChange={handleCategoryChange} 
                    placeholder="All Categories" 
                    closeMenuOnSelect={false}
                    isLoading={categoriesLoading} // Show loading state
                  />
                </div>
              )}

              <div className="item-select">
                <Select 
                  className="custom-select property_Custom_Select" 
                  options={[
                    { value: 'incomplete', label: 'Incomplete' },
                    { value: 'completed', label: 'Completed' },
                    { value: 'expired', label: 'Expired' }
                  ]} 
                  value={{ value: selectedStatus, label: selectedStatus.charAt(0).toUpperCase() + selectedStatus.slice(1) }} 
                  styles={getDynamicStyles()} 
                  onChange={(selected) => handleSelectStatusChange({ target: { value: selected.value } })} 
                  placeholder="Status"
                  isSearchable={false}
                />
              </div>

              <div className="item-select" style={{ width: "30%" }}>
                <Select className="custom-select property_Custom_Select" isMulti options={propertyOptions} value={selectedProperties} styles={getDynamicStyles()} onChange={handlePropertyChange} placeholder="All Properties" closeMenuOnSelect={false} />
              </div>

            </div>
          </div>
          <div 
            className="table-responsive" 
            style={{ 
              overflowY: "auto", 
              marginBottom: "30px", 
              position: 'relative',
              border: `2px solid ${cssConfig?.css_data?.borders?.primary || '#013280'}`
            }}
          >
            {itemsToRender?.length > 0 ? (
              <div style={{ position: 'relative' }}>
                <table className="table text-white action-items-table">
                  <thead style={{ background: "#020d29" }}>
                    <tr style={{ borderBottom: `1px solid ${cssConfig?.css_data?.borders?.primary || '#013280'} !important` }}>
                      <th style={{ borderBottom: `1px solid ${cssConfig?.css_data?.borders?.primary || '#013280'} !important`, color: cssConfig?.css_data?.text?.secondary || '#a6a9b2' }}>Date/Time</th>
                      <th style={{ borderBottom: `1px solid ${cssConfig?.css_data?.borders?.primary || '#013280'} !important`, color: cssConfig?.css_data?.text?.secondary || '#a6a9b2' }}>Property/Guest</th>
                      <th style={{ borderBottom: `1px solid ${cssConfig?.css_data?.borders?.primary || '#013280'} !important`, color: cssConfig?.css_data?.text?.secondary || '#a6a9b2' }}>Category</th>
                      <th style={{ borderBottom: `1px solid ${cssConfig?.css_data?.borders?.primary || '#013280'} !important`, color: cssConfig?.css_data?.text?.secondary || '#a6a9b2' }}>Action Item</th>
                      {selectedStatus === "completed" && <th style={{ borderBottom: `1px solid ${cssConfig?.css_data?.borders?.primary || '#013280'} !important`, color: cssConfig?.css_data?.text?.secondary || '#a6a9b2' }}>Completed By</th>}
                      <th style={{ borderBottom: `1px solid ${cssConfig?.css_data?.borders?.primary || '#013280'} !important`, color: cssConfig?.css_data?.text?.secondary || '#a6a9b2' }}>View/Done</th>
                    </tr>
                  </thead>
                  <tbody>
                    {itemsToRender.map((actionItem, idx) => {
                      const { id, created_at, property_name, conversation_id, item } = actionItem;
                      let actionItemSend = { propertyName: property_name, conversation_id };
                      const locked = false; // locked rows are not rendered
                      const borderColor = cssConfig?.css_data?.borders?.primary || '#013280';
                      return (
                        <tr key={id} style={{ borderBottom: `1px solid ${borderColor} !important` }}>
                          <td style={{ 
                            whiteSpace: "pre-line", 
                            borderBottom: `1px solid ${borderColor} !important`,
                            color: !cssLoading && cssConfig?.css_data?.text?.secondary ? 
                              cssConfig.css_data.text.secondary : '#ffffff'
                          }}>
                            <div className={locked ? 'blurred-content' : ''}>
                              {formatDateTime(created_at)}
                            </div>
                          </td>
                          <td style={{ 
                            borderBottom: `1px solid ${borderColor} !important`,
                            color: !cssLoading && cssConfig?.css_data?.text?.secondary ? 
                              cssConfig.css_data.text.secondary : '#ffffff'
                          }}>
                            <div className={locked ? 'blurred-content' : ''}>
                              {property_name}
                              <br />
                              <span style={{
                                color: !cssLoading && cssConfig?.css_data?.text?.secondary ? 
                                  cssConfig.css_data.text.secondary : '#a6a9b2'
                              }}>
                                {actionItem?.guest_name ? actionItem?.guest_name : ""}
                              </span>
                            </div>
                          </td>
                          <td style={{ 
                            borderBottom: `1px solid ${borderColor} !important`,
                            color: !cssLoading && cssConfig?.css_data?.text?.secondary ? 
                              cssConfig.css_data.text.secondary : '#ffffff'
                          }}>
                            <div className={locked ? 'blurred-content' : ''}>
                              {actionItem?.category ? actionItem?.category : ""}
                            </div>
                          </td>
                          <td className="" style={{ 
                            borderBottom: `1px solid ${borderColor} !important`,
                            color: !cssLoading && cssConfig?.css_data?.text?.secondary ? 
                              cssConfig.css_data.text.secondary : '#ffffff'
                          }}>
                            <div className={locked ? 'blurred-content' : ''}>{item}</div>
                          </td>
                          {selectedStatus === "completed" && (
                            <td style={{ 
                              minWidth: '130px', 
                              borderBottom: `1px solid ${borderColor} !important`,
                              color: !cssLoading && cssConfig?.css_data?.text?.secondary ? 
                                cssConfig.css_data.text.secondary : '#ffffff'
                            }}>
                              <div className={locked ? 'blurred-content' : ''}>{formatCompletedBy(actionItem?.completed_by)}</div>
                            </td>
                          )}
                          <td className="text-center" style={{ borderBottom: `1px solid ${borderColor} !important` }}>
                            <div className={locked ? 'blurred-content' : ''}>
                              {actionItemCompleting === id || getConversationLoading === id ? (
                                <BoxLoader />
                              ) : (
                                <>
                                  <FaExternalLinkAlt style={{ marginRight: '10px', cursor: 'pointer' }} onClick={() => { if (!locked) handleOpenConversation(conversation_id, id, property_name); }} />
                                  <button 
                                    className={`complete-button ${status === 'completed' ? 'completed' : ''}`}
                                    onClick={() => { if (!locked) handleComplete(id); }}
                                    title="Mark Complete"
                                  >
                                    <FaCheck className="check-icon" />
                                  </button>
                                </>
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                {/* Visual representation of locked items */}
                {lockedActionItems.length > 0 && (
                  <div className="position-relative my-4">
                    <table className="table text-white action-items-table mb-0" style={{ 
                      filter: 'blur(4px)', 
                      width: '100%',
                      color: !cssLoading && cssConfig?.css_data?.text?.quaternary ? 
                        cssConfig.css_data.text.quaternary : '#888'
                    }}> {/* blurred table mimics layout */}
                      <tbody>
                        {lockedActionItems.slice(0, 5).map((actionItem) => {
                          const { id, created_at, property_name, item } = actionItem;
                          return (
                            <tr key={id} style={{ pointerEvents: 'none' }}>
                              <td style={{ 
                                whiteSpace: 'pre-line',
                                color: !cssLoading && cssConfig?.css_data?.text?.quaternary ? 
                                  cssConfig.css_data.text.quaternary : '#888'
                              }}>
                                {formatDateTime(created_at)}
                              </td>
                              <td style={{ 
                                paddingLeft: '30px',
                                color: !cssLoading && cssConfig?.css_data?.text?.quaternary ? 
                                  cssConfig.css_data.text.quaternary : '#888'
                              }}>
                                {property_name}
                              </td>
                              <td style={{ 
                                paddingLeft: '60px',
                                color: !cssLoading && cssConfig?.css_data?.text?.quaternary ? 
                                  cssConfig.css_data.text.quaternary : '#888'
                              }}>
                                {actionItem?.category || ''}
                              </td>
                              <td style={{ 
                                paddingLeft: '40px',
                                color: !cssLoading && cssConfig?.css_data?.text?.quaternary ? 
                                  cssConfig.css_data.text.quaternary : '#888'
                              }}>
                                {item}
                              </td>
                              {selectedStatus === 'completed' && <td style={{ paddingLeft: '30px' }}>{formatCompletedBy(actionItem?.completed_by)}</td>}
                              <td></td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                    {/* Overlay upgrade prompt */}
                    <div className="position-absolute top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center" style={{ pointerEvents: 'auto' }}>
                      <ActionItemsUpgrade onComparePlans={handleComparePlans} />
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <span className="d-flex justify-content-center align-items-center" style={{ height: '500px', color: cssConfig?.css_data?.text?.secondary || "#FFF" }}>
                No Data Yet
              </span>
            )}
          </div>
        </div>
      </Container>
      <AdditionalInformationModel show={modalShowAdditional} onHide={() => setModalShowAdditional(false)} />
      <ConversationTranscriptModal handleClose={() => setShowConversationTranscriptModal(false)} show={showConversationTranscriptModal} modalData={conversationDataForModal} />
    </>
  );
};

export default ActionsItemsTable;