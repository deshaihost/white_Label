import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  PropertyGetConversationsActions,
  getActionItemsActions,
  getUserDataActions,
  putCompleteActionItemActions,
} from "../../../redux/actions";
import AdditionalInformationModel from "./additionalInformationModel/AdditionalInformationModel";
import { Container, Form } from "react-bootstrap";
import "./actionItem.css";

const ActionsItemsTable = () => {
  const store = useSelector((state) => state);
  const dispatch = useDispatch();

  const actionItemsConvertationData =
    store?.getActionItemsReducer?.getActionsItems?.data?.action_items;
  const createPropertiesName =
    store?.getUserDataReducer?.getUserData?.data?.user?.properties;
  // search
  const [statusFilterVal, setStatusFilterVal] = useState("Incomplete");
  const [propertySearchVal, setPropertySearchVal] = useState("");
  const [converSationId, setConverSationId] = useState("");
  const [propertyNameForConversationData, setPropertyNameForConversationData] =
    useState("");
  const [modalShowAdditional, setModalShowAdditional] = useState(false);
  const actionItems = actionItemsConvertationData
    ? actionItemsConvertationData
    : [];
  const allPropertyName =
    createPropertiesName !== undefined ? createPropertiesName : [];
  const sortedActionItems = Object.keys(actionItems)
    .flatMap((property) =>
      Object.keys(actionItems[property]).flatMap((conversationID) => {
        const conversation_data = actionItems[property][conversationID];
        return conversation_data.items.map((item) => ({
          ...item,
          guest_name: conversation_data.guest_name,
          property,
          conversationID,
        }));
      })
    )
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

  const filteredActionItems = sortedActionItems?.filter((actionItem) => {
    const { property, guest_name, status } = actionItem;
    const statusFilterValLower = statusFilterVal.toLowerCase();
    return (
      property.toLowerCase().includes(statusFilterValLower) ||
      guest_name?.toLowerCase().includes(statusFilterValLower) ||
      status.toLowerCase().includes(statusFilterValLower)
    );
  });

  const filteredSearchProperty = filteredActionItems?.filter((actionItem) => {
    return (
      propertySearchVal === "" ||
      actionItem.property
        .toLowerCase()
        .includes(propertySearchVal.toLowerCase())
    );
  });
  //search
  // date formate
  function formatDateTime(dateTimeString) {
    const date = new Date(dateTimeString);
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const month = months[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    const ampm = hours >= 12 ? "pm" : "am";

    hours = hours % 12;
    hours = hours ? hours : 12; // 0 hour should be 12
    minutes = minutes < 10 ? "0" + minutes : minutes;

    //return `${month} ${day}, ${year}\n${hours}:${minutes}${ampm}`;
    return `${month} ${day}\n${hours}:${minutes}${ampm}`;
  }

  const conversationCallOnDashboard = (item) => {
    const { propertyName, conversationID } = item;
    setConverSationId(conversationID);
    setPropertyNameForConversationData(propertyName);
    dispatch(PropertyGetConversationsActions({ propertyName: propertyName }));
  };

  const compeletHndle = (conversationID, propyName, convrtionId) => {
    dispatch(
      putCompleteActionItemActions({
        action_item_id: conversationID,
        property_name: propyName,
        conversation_id: convrtionId,
      })
    );
  };

  // property search handle
  const [dropDownSearch, setDropDownSearch] = useState("");
  const propertyGetSearchFun = allPropertyName?.filter((propertyName) => {
    const inputValue = dropDownSearch.toLowerCase();
    return propertyName.toLowerCase().includes(inputValue);
  });

  // property search handle

  const [dropDownShow, setDropDownShow] = useState({ inputArow: false });

  useEffect(() => {
    dispatch(getUserDataActions());
    dispatch(getActionItemsActions());
  }, []);

  return (
    <>
      <Container>
        <div className="action-items">
          <div className="action-heading">
            <h3>Action Items</h3>
          </div>
          <div className="action-select">
            <div className="item-select">
              <Form.Select
                aria-label="Default select example"
                className="bg-dark"
              >
                <option>Category</option>
                <option value="all">All</option>
                <option value="maintenance">Maintenance</option>
                <option value="guestrequests">Guest Requests</option>
                <option value="Cleanliness">Cleanliness</option>
                <option value="reservationchanges">Reservation Changes</option>
              </Form.Select>
            </div>
            <div className="item-select">
              <Form.Select
                aria-label="Default select example"
                className="bg-dark"
              >
                <option>Status</option>
                <option value="Incomplete">Incomplete</option>
                <option value="complete">complete</option>
                <option value="expired">Expired</option>
              </Form.Select>
            </div>

            <div className="multiselector1 item-select1">
              <div className="multiinputfirst1">
                <input
                  type="text"
                  value="Property"
                  onClick={() =>
                    setDropDownShow({ inputArow: !dropDownShow?.inputArow })
                  }
                />
                <div
                  className="pro-icon1"
                  onClick={() =>
                    setDropDownShow({ inputArow: !dropDownShow?.inputArow })
                  }
                >
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
                      <input
                        type="search"
                        id="multi-search1"
                        onChange={(e) => setDropDownSearch(e.target.value)}
                      />
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
          </div>
        </div>
        <div
          className="table-responsive"
          style={{ overflowY: "auto", height: "500px", marginBottom: "30px" }}
        >
          {filteredSearchProperty?.length > 0 ? (
            <>
              <table class="table text-white action-items-table">
                <thead style={{ background: "#020d29" }}>
                  <tr>
                    <th>Date/Time</th>
                    <th>Property/Guest</th>
                    <th>Action Item</th>
                    <th>View/Done</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredSearchProperty?.map((actionItem) => {
                    const { id, created_at, property, conversationID, item } =
                      actionItem;
                    let actionItemSend = {
                      propertyName: property,
                      conversationID,
                    };
                    return (
                      <tr key={id}>
                        <td style={{ whiteSpace: "pre-line" }}>
                          {" "}
                          {/* whiteSpace: 'pre-line' preserves the newline between date and time */}
                          {formatDateTime(created_at)}
                        </td>
                        <td>
                          {property}
                          <br />
                          {actionItem?.guest_name !== null
                            ? actionItem?.guest_name
                            : ""}
                        </td>
                        <td className="">
                          <div className="">{item}</div>
                        </td>
                        <td className="text-center">
                          <span onClick={() => setModalShowAdditional(true)}>
                            <i
                              class="bi bi-pencil-square"
                              data-tooltip-id="expireTooltip"
                              data-tooltip-content='Incomplete action items are marked "Expired" after 14 days. All action items are permanently deleted after 60 days.'
                            ></i>
                          </span>
                          <span
                            className="mainCursor"
                            style={{ marginRight: "10px" }}
                            onClick={() => {
                              conversationCallOnDashboard(actionItemSend);
                            }}
                          >
                            <i
                              className="bi bi-arrow-up-right ms-2"
                              data-tooltip-id="expireTooltip"
                              data-tooltip-content='Incomplete action items are marked "Expired" after 14 days. All action items are permanently deleted after 60 days.'
                            ></i>
                          </span>
                          <span
                            className="mainCursor"
                            onClick={() => {
                              compeletHndle(id, property, conversationID);
                            }}
                          >
                            <i
                              className="bi bi-check2 text-primary fs-6"
                              data-tooltip-id="expireTooltip"
                              data-tooltip-content='Incomplete action items are marked "Expired" after 14 days. All action items are permanently deleted after 60 days.'
                            ></i>
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </>
          ) : (
            <span className="text-danger d-flex justify-content-center align-items-center h-100">
              No Data
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
