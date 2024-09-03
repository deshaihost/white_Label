import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PropertyGetConversationsActions, getActionItemsActions, getUserDataActions, putCompleteActionItemActions } from "../../../redux/actions";
import AdditionalInformationModel from "./additionalInformationModel/AdditionalInformationModel";
import { Container, Form } from "react-bootstrap";
import ToastHandle from "../../../helper/ToastMessage";
import { FullScreenLoader } from "../../../helper/Loader";
import "./actionItem.css";
import axios from "axios";

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

  const store = useSelector((state) => state);
  const dispatch = useDispatch();

  const createPropertiesName = store?.getUserDataReducer?.getUserData?.data?.user?.property_data;
  const allPropertyName = createPropertiesName !== undefined ? createPropertiesName : {};

  const [selectedStatus, setSelectedStatus] = useState("incomplete");
  const [selectedProperty, setSelectedProperty] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");


  const [converSationId, setConverSationId] = useState("");
  const [propertyNameForConversationData, setPropertyNameForConversationData] = useState("");
  const [modalShowAdditional, setModalShowAdditional] = useState(false);
  const [dropDownShow, setDropDownShow] = useState({ inputArow: false });
  const [actionItems, setActionItems] = useState([]);
  const [getActionItemsLoading, setGetActionItemsLoading] = useState(false);

  // Apply the property name filter
  let filteredActionItems = actionItems?.filter((actionItem) => {
    return (selectedProperty === "" || actionItem.property_name.toLowerCase().includes(selectedProperty.toLowerCase()));
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

  const conversationCallOnDashboard = (item) => {
    const { propertyName, conversationID } = item;
    setConverSationId(conversationID);
    setPropertyNameForConversationData(propertyName);
    dispatch(PropertyGetConversationsActions({ propertyName: propertyName }));
  };

  const compeletHndle = (conversationID, propyName, convrtionId) => {
    dispatch(putCompleteActionItemActions({ action_item_id: conversationID, property_name: propyName, conversation_id: convrtionId }));
  };

  // property search handle
  /*
  const [dropDownSearch, setDropDownSearch] = useState("");
  const propertyGetSearchFun = allPropertyName?.filter((propertyName) => {
    const inputValue = dropDownSearch.toLowerCase();
    return propertyName.toLowerCase().includes(inputValue);
  });
  */

  const handleSelectChange = (e) => {
    setSelectedStatus(e.target.value);
    callGetActionItemsApi(e.target.value);
  };

  // On page load, get user data and action items
  useEffect(() => {
    dispatch(getUserDataActions());
    callGetActionItemsApi('incomplete');
  }, []);

  return (
    <>
      <Container>
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
                <option value="OTHER">Other</option>
              </select>
            </div>

            <div className="item-select">
              <select aria-label="Default select example" className="bg-dark form-select" value={selectedStatus} onChange={handleSelectChange}>
                <option value="incomplete">Incomplete</option>
                <option value="completed">Completed</option>
                <option value="expired">Expired</option>
              </select>
            </div>

            <div className="item-select">
              <select aria-label="Default select example" className="bg-dark form-select" value={selectedProperty} onChange={(e) => setSelectedProperty(e.target.value)}>
                <option value="">All Properties</option>
                {Object.keys(allPropertyName).map((key) => (
                  <option key={key} value={key}>
                    {key}
                  </option>
                ))}
              </select>
            </div>

            {/*
            <div className="multiselector1 item-select1">
              <div className="multiinputfirst1">
                <input type="text" value="Property" onClick={() => setDropDownShow({ inputArow: !dropDownShow?.inputArow })}/>
                <div className="pro-icon1" onClick={() => setDropDownShow({ inputArow: !dropDownShow?.inputArow })}>
                  {dropDownShow?.inputArow ? (
                    <i class="bi bi-x-lg"></i>
                  ) : (
                    <i class="bi bi-chevron-down"></i>
                  )}
                </div>
              </div>
              {dropDownShow?.inputArow && (
                <>
                  <div className="search-option1">
                    <div className="search-multi1">
                      <input type="search" id="multi-search1" onChange={(e) => setDropDownSearch(e.target.value)} />
                      <div className="search-icon">
                        <i class="bi bi-search"></i>
                      </div>
                    </div>
                    <div className="multioption">
                      <ul>
                        {propertyGetSearchFun?.map((property) => {
                          return (
                            <li>
                              <input type="checkbox" />
                              {property}
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </div>
                </>
              )}
            </div>
            */}
          </div>
        </div>
        <div className="table-responsive" style={{ overflowY: "auto", marginBottom: "30px" }}>
          {filteredActionItems?.length > 0 ? (
            <>
              <table class="table text-white action-items-table">
                <thead style={{ background: "#020d29" }}>
                  <tr>
                    <th>Date/Time</th>
                    <th>Property/Guest</th>
                    <th>Category</th>
                    <th>Action Item</th>
                    <th>View/Done</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredActionItems?.map((actionItem) => {
                    const { id, created_at, property_name, conversationID, item } = actionItem;
                    let actionItemSend = { propertyName: property_name, conversationID };
                    return (
                      <tr key={id}>
                        <td style={{ whiteSpace: "pre-line" }}>
                          {/* whiteSpace: 'pre-line' preserves the newline between date and time */}
                          {formatDateTime(created_at)}
                        </td>
                        <td>
                          {property_name}
                          <br />
                          {actionItem?.guest_name ? actionItem?.guest_name : ""}
                        </td>
                        <td>{actionItem?.category ? actionItem?.category : ""}</td>
                        <td className="">
                          <div className="">{item}</div>
                        </td>
                        <td className="text-center">
                          <span onClick={() => setModalShowAdditional(true)}>
                            <i class="bi bi-pencil-square" data-tooltip-id="expireTooltip"></i>
                          </span>
                          <span
                            className="mainCursor" style={{ marginRight: "10px" }}
                            onClick={() => { conversationCallOnDashboard(actionItemSend); }}>
                            <i className="bi bi-arrow-up-right ms-2" data-tooltip-id="expireTooltip"></i>
                          </span>
                          <span className="mainCursor" onClick={() => { compeletHndle(id, property_name, conversationID); }}>
                            <i className="bi bi-check2 text-primary fs-6" data-tooltip-id="expireTooltip"></i>
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </>
          ) : (
            <span className="d-flex justify-content-center align-items-center" style={{ height:'500px', color:"#FFF" }}>
              No Data Yet
            </span>
          )}
        </div>
      </Container>
      <AdditionalInformationModel
        show={modalShowAdditional}
        onHide={() => setModalShowAdditional(false)}
      />
    </>
  );
};

export default ActionsItemsTable;
