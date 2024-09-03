import React, { useEffect, useState } from "react";
import { Tooltip } from "react-tooltip";
import SideBar from "../../component/sideBar/SideBar";
import GetStartedImg from "../../public/img/getstartedimg.png";
import { Link } from "react-router-dom";
import "./dashboard.css";
import { useSelector, useDispatch } from "react-redux";
import {
  PropertyGetConversationsActions,
  getActionItemsActions,
  getUserDataActions,
  putCompleteActionItemActions,
  stateEmptyActions,
} from "../../redux/actions";
import { BoxLoader, FullScreenLoader } from "../../helper/Loader";
import "react-circular-progressbar/dist/styles.css";
import { GoArrowUpRight } from "react-icons/go";
import ToastHandle from "../../helper/ToastMessage";
import { Helmet } from "react-helmet";
import { FaCircleCheck } from "react-icons/fa6";
import ConverSationtranscriptModel from "../propertyInsight/transcriptsTable/transcriptsModel/ConverSationtranscriptModel";
import { Dropdown } from "primereact/dropdown";

const Dashboard = () => {
  const store = useSelector((state) => state);
  const dispatch = useDispatch();
  const userDataGet = store?.getUserDataReducer?.getUserData?.data?.user;
  const statistics = userDataGet?.statistics?.num_conversations;
  const { neutral, successful, total, unsuccessful } = statistics
    ? statistics
    : [];
  const userDataLoading = store?.getUserDataReducer?.loading;
  const userDataGetLoading = store?.getUserDataReducer?.loading;
  const actionItemsConvertationData = store?.getActionItemsReducer?.getActionsItems?.data?.action_items;
  const actionItemsCovertationLoading = store?.getActionItemsReducer?.loading;
  const createPropertiesName = store?.getUserDataReducer?.getUserData?.data?.user?.properties;
  const actionItems = actionItemsConvertationData ? actionItemsConvertationData : [];

  // For legacy dict type: flatten and sort action items by creation time (TODO: delete)
  let sortedActionItems = actionItems;
  if (typeof actionItems === 'object' && !Array.isArray(actionItems)) {
    sortedActionItems = Object.keys(actionItems)
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
  }

  // Binary search function. This lets us do below calculation for recently created action items more efficiently
  const binarySearch = (arr, targetDate) => {
    let left = 0;
    let right = arr.length - 1;

    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      const midDate = new Date(arr[mid].created_at);

      if (midDate > targetDate) {
        left = mid + 1;
      } else if (midDate < targetDate) {
        right = mid - 1;
      } else {
        return mid;
      }
    }
    return left;
  };

  // Calculate recently created action items, for the statistics tiles
  const ONE_DAY = 24 * 60 * 60 * 1000;
  const FOURTEEN_DAYS = 14 * ONE_DAY;
  const now = Date.now();
  const actionItemsLast24h = binarySearch(
    sortedActionItems,
    new Date(now - ONE_DAY)
  );
  const actionItemsLast14d = binarySearch(
    sortedActionItems,
    new Date(now - FOURTEEN_DAYS)
  );
  
  // new code
  const [statusFilterVal, setStatusFilterVal] = useState("Incomplete");
  const [propertySearchVal, setPropertySearchVal] = useState("");

  // Get only the action items that match the selected status filter (there must be exactly one active status filter selection)
  const filteredActionItems = sortedActionItems?.filter((actionItem) => {
    const { property_name, guest_name, status } = actionItem;
    const statusFilterValLower = statusFilterVal.toLowerCase();
    return (
      property_name.toLowerCase().includes(statusFilterValLower) ||
      guest_name?.toLowerCase().includes(statusFilterValLower) ||
      status.toLowerCase().includes(statusFilterValLower)
    );
  });

  // After above filtering, get only the action items that match the selected property filter (if any is applied)
  const filteredSearchProperty = filteredActionItems?.filter((actionItem) => {
    return (
      propertySearchVal === "" ||
      actionItem.property.toLowerCase().includes(propertySearchVal.toLowerCase())
    );
  });

  // search bar
  const allPropertyName =
    createPropertiesName !== undefined ? createPropertiesName : [];

  const selectedTemplate = (option, props) => {
    if (option) {
      return (
        <div className="flex align-items-center defult">
          <div>{option.name.toLowerCase()}</div>
        </div>
      );
    }
    return (
      <span className="search-btn">
        <i class="bi bi-search me-2 text-white"></i>
        {propertySearchVal !== "" ? propertySearchVal : "Search Property"}
      </span>
    );
  };

  const OptionTemplate = (option) => {
    return (
      <div className="flex align-items-center defult">
        <div>{option.name}</div>
      </div>
    );
  };
  // new code

  // date formate
  function formatDateTime(dateTimeString) {
    const date = new Date(dateTimeString);
    const months = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];

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

  const { first_name } = userDataGet ? userDataGet : [];
  // this functionality complete convertation
  const completeActionsItemLoading =
    store?.completeActionsItemsReducer?.loading;
  const completeActionsItemStatus =
    store?.completeActionsItemsReducer?.completeActionsItems?.status;
  const completeActionsItemMessage =
    store?.completeActionsItemsReducer?.completeActionsItems?.data?.message;

  const compeletHndle = (conversationID, propyName, convrtionId) => {
    dispatch( putCompleteActionItemActions({ action_item_id: conversationID, property_name: propyName, conversation_id: convrtionId }) );
  };

  useEffect(() => {
    dispatch(getUserDataActions());
    dispatch(getActionItemsActions());
  }, []);

  // When user data is loaded, save the payment/subscription information to local storage. We need this information for the warning banner logic (in the NavBar), which should be shown on all portal pages.
  useEffect(() => {
    if (userDataGet) {
      localStorage.setItem( "paymentStatus", userDataGet?.subscription?.payment_standing );
      localStorage.setItem( "servicesExpireDate", userDataGet?.subscription?.services_good_until );
      localStorage.setItem( "numPropertiesAllowed", userDataGet?.subscription?.num_properties_allowed );
      localStorage.setItem( "numPropertiesUsed", Object.keys(userDataGet?.property_data || {}).length );
      localStorage.setItem( "tooManyPropertiesGraceUntil", userDataGet?.subscription?.too_many_properties_grace_until );
    }
  }, [userDataGet]);

  useEffect(() => {
    if (completeActionsItemStatus === 200) {
      ToastHandle(completeActionsItemMessage, "success");
      dispatch(stateEmptyActions());
      dispatch(getActionItemsActions());
    }
  }, [completeActionsItemStatus]);
  const [converSationId, setConverSationId] = useState("");
  const propertiesConversationGetData = store?.propertyGetConversationReducer?.propertyGetConversation?.data;
  const propertiesConversationLoading = store?.propertyGetConversationReducer?.loading;
  const [propertyNameForConversationData, setPropertyNameForConversationData] = useState("");

  // When the "view" button is clicked, trigger the GET /conversations API call to get the the selected conversation
  const conversationCallOnDashboard = (item) => {
    const { propertyName, conversationID } = item;
    setConverSationId(conversationID);
    setPropertyNameForConversationData(propertyName);
    dispatch(PropertyGetConversationsActions({ propertyName: propertyName }));
  };

  const [model, setModel] = useState({ conversationModel: false, conversationDataSend: "" });
  const conversationModelOpen = "conversationModelOpen";
  const conversationModelClose = "conversationModelClose";

  const handleModelOpen = (type, data) => {
    if (type === conversationModelOpen) {
      setModel({ ...model, conversationModel: true, conversationDataSend: data });
    }
  };

  const handleModelClose = (type) => {
    if (type === conversationModelClose) {
      setModel({ ...model, conversationModel: false });
    }
  };

  // When conversation data is retrieved from teh API (triggered by "view" button click), open the transcript modal with hte conversation data
  useEffect(() => {
    if (propertiesConversationGetData !== undefined) {
      if (converSationId !== "") {
        let findConverSationFilter = propertiesConversationGetData?.conversations?.filter( (item) => item?.conversation_id === converSationId );
        if (findConverSationFilter?.[0]) {
          findConverSationFilter[0].property_name = propertyNameForConversationData;
        }
        handleModelOpen(conversationModelOpen, findConverSationFilter?.[0]);
      }
    }
  }, [propertiesConversationGetData]);
  

  return (
    <>
      <Helmet>
        <title>Dashboard - HostBuddy AI</title>
      </Helmet>
      {propertiesConversationLoading && <FullScreenLoader />}
      {completeActionsItemLoading && <FullScreenLoader />}
      <div className="account-main">
        <div className="container">
          <div className="banner-heading">
            <h2>My HostBuddy</h2>
          </div>
          <div className="row">
            <div className="col-lg-2 col-xl-2  col-xxl-2">
              <SideBar />
            </div>
            <div className="col-lg-10 col-xl-10  col-xxl-10">
              <div className="dashboard-container">
                <div className="account_heading">
                  <h3>
                    Welcome to HostBuddy,{" "}
                    {!userDataLoading && <>{first_name}</>}
                  </h3>
                </div>
                <div className="account-content">
                  <div className="row">
                    <div className="col-lg-9">
                      <div className="row">
                        <div className="col-lg-6 mb-3">
                          <div className="account-box">
                            {!userDataGetLoading ? (
                              <>
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" >
                                  <path fill-rule="evenodd" clip-rule="evenodd" fill="#146EF5" d="M15.3422 0.656793C15.4156 0.730166 15.4662 0.823302 15.4877 0.924871C15.5092 1.02644 15.5007 1.13207 15.4632 1.2289L10.1064 15.1567C10.0684 15.2552 10.0022 15.3404 9.91608 15.4014C9.82992 15.4625 9.72764 15.4967 9.62209 15.4998C9.51653 15.5029 9.41242 15.4747 9.32283 15.4188C9.23325 15.3629 9.16218 15.2818 9.11856 15.1856L6.87831 10.2573L10.1739 6.96072C10.3158 6.80839 10.3931 6.60693 10.3894 6.39876C10.3857 6.19059 10.3014 5.99198 10.1542 5.84476C10.007 5.69754 9.80833 5.61321 9.60016 5.60953C9.39199 5.60586 9.19053 5.68313 9.0382 5.82507L5.74158 9.12059L0.813244 6.88143C0.716785 6.83787 0.635392 6.76671 0.579339 6.67693C0.523286 6.58715 0.495084 6.48278 0.498293 6.37699C0.501503 6.2712 0.535979 6.16873 0.597371 6.08251C0.658763 5.9963 0.74432 5.9302 0.843243 5.89256L14.7711 0.535729C14.8678 0.498525 14.9732 0.49016 15.0746 0.511648C15.176 0.533135 15.2689 0.583553 15.3422 0.656793Z"></path>
                                </svg>
                                <h4>{total}</h4>
                                <p>Total Messages Processed</p>
                              </>
                            ) : (
                              <BoxLoader />
                            )}
                          </div>
                        </div>
                        <div className="col-lg-6 mb-3">
                          <div className="account-box">
                            {!userDataGetLoading ? (
                              <>
                                <i class="bi bi-house-door icon-style"></i>
                                <h4 className="mt-3">
                                  {allPropertyName?.length}
                                </h4>
                                <p>Number of Properties</p>
                              </>
                            ) : (
                              <BoxLoader />
                            )}
                          </div>
                        </div>
                        {/*
                        <div className="col-lg-4 mb-3">
                          <div className="account-box">
                            {!userDataGetLoading ? (
                              <>
                                <i class="bi bi-clock icon-style"></i>
                                <h4 className="mt-3">0</h4>
                                <p>Total Hosting Time</p>
                              </>
                            ) : (
                              <BoxLoader />
                            )}
                          </div>
                        </div>
                        */}
                        <div className="col-lg-6 mb-3">
                          <div className="account-box">
                            {!userDataGetLoading ? (
                              <>
                                <i class="bi bi-file-text icon-style"></i>
                                <h4 className="mt-3">{actionItemsLast14d}</h4>
                                <p>Action Items (last 14d)</p>
                              </>
                            ) : (
                              <BoxLoader />
                            )}
                          </div>
                        </div>
                        <div className="col-lg-6 mb-3">
                          <div className="account-box">
                            {!userDataGetLoading ? (
                              <>
                                <i class="bi bi-file-text icon-style "></i>
                                <h4 className="mt-3">{actionItemsLast24h}</h4>
                                <p>Action Items (last 24h)</p>
                              </>
                            ) : (
                              <BoxLoader />
                            )}
                          </div>
                        </div>
                        {/*
                        <div className="col-lg-4  mb-3">
                          <div className="account-box">
                            {!userDataGetLoading ? (
                              <>
                                <i class="bi bi-people-fill icon-style "></i>
                                <h4 className="mt-3">0</h4>
                                <p>Total Guests Supported</p>
                              </>
                            ) : (
                              <BoxLoader />
                            )}
                          </div>
                        </div>
                        */}
                      </div>
                    </div>
                    <div className="col-lg-3 mb-3 ">
                      <div className="row">
                        <div className="col-lg-12">
                          <div className="get-started">
                            <img src={GetStartedImg} alt="get-started" />
                            <p className="pb-2">
                              Explore how to set up and get started with
                              HostBuddy
                            </p>
                            <Link to="/getstarted">Get Started</Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    {!actionItemsCovertationLoading ? (
                      <div className="">
                        <div className="text-white mt-3 pt-3 pb-1 d-flex flex-wrap flex-md-nowrap justify-content-between align-items-center gap-md-0 gap-2">
                          <div>
                            <h5 className="">Action Items</h5>
                          </div>
                          <div>
                            <div className="d-flex flex-wrap flex-md-nowrap justify-content-between gap-2 gap-xl-4">
                              <div class="form-check">
                                <input
                                  class="form-check-input"
                                  type="radio"
                                  name="flexRadioDefault"
                                  id="flexRadioDefault2"
                                  checked={statusFilterVal === "Incomplete"}
                                  onClick={() => {
                                    setStatusFilterVal("Incomplete");
                                  }}
                                />
                                <label
                                  class="form-check-label fs-14"
                                  for="flexRadioDefault2"
                                >
                                  Incomplete
                                </label>
                              </div>
                              <div class="form-check">
                                <input
                                  class="form-check-input"
                                  type="radio"
                                  name="flexRadioDefault"
                                  id="flexRadioDefault1"
                                  checked={statusFilterVal === "Completed"}
                                  onClick={() => {
                                    setStatusFilterVal("Completed");
                                  }}
                                />
                                <label
                                  class="form-check-label fs-14"
                                  for="flexRadioDefault1"
                                >
                                  Complete
                                </label>
                              </div>
                              <div class="form-check">
                                <input
                                  class="form-check-input"
                                  type="radio"
                                  name="flexRadioDefault"
                                  id="flexRadioDefault3"
                                  checked={statusFilterVal === "Expired"}
                                  onClick={() => {
                                    setStatusFilterVal("Expired");
                                  }}
                                />
                                <label
                                  class="form-check-label fs-14"
                                  for="flexRadioDefault3"
                                >
                                  Expired
                                  <i
                                    className="bi bi-question-circle ms-2"
                                    data-tooltip-id="expireTooltip"
                                    data-tooltip-content='Incomplete action items are marked "Expired" after 14 days. All action items are permanently deleted after 60 days.'
                                  ></i>
                                  <Tooltip
                                    className="action-item-tooltip"
                                    id="expireTooltip"
                                    delayShow={0}
                                    place="top"
                                    effect="solid"
                                  />
                                </label>
                              </div>
                              <div className="text-white  ">
                                <Dropdown
                                  value={propertySearchVal}
                                  onChange={(e) =>
                                    setPropertySearchVal( e.value?.name )
                                  }
                                  options={allPropertyName.map(
                                    (properties) => ({
                                      name: properties,
                                    })
                                  )} // Assuming countries is an array of strings
                                  optionLabel="name"
                                  placeholder="Search Property"
                                  filter
                                  valueTemplate={selectedTemplate}
                                  itemTemplate={OptionTemplate}
                                  className="w-full md:w-14rem search rounded-pill border px-2 fs-14 "
                                />
                                {propertySearchVal !== "" && (
                                  <i
                                    class="bi bi-x-circle ms-2"
                                    onClick={() => {
                                      setPropertySearchVal("");
                                      setStatusFilterVal("Incomplete");
                                    }}
                                  ></i>
                                )}
                                {/* <button>Clear</button> */}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div
                          className="table-responsive"
                          style={{ overflowY: "auto", height: "500px" }}
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
                                    const { id, created_at, property_name, conversationID, item } = actionItem;
                                    let actionItemSend = { propertyName: property_name, conversationID };
                                    return (
                                      <tr key={id}>
                                        <td style={{ whiteSpace: "pre-line" }}> {/* whiteSpace: 'pre-line' preserves the newline between date and time */}
                                          {formatDateTime(created_at)}
                                        </td>
                                        <td>
                                          {property_name}
                                          <br />
                                          {actionItem?.guest_name !== null ? actionItem?.guest_name : ""}
                                        </td>
                                        <td className="">
                                          <div className="">{item}</div>
                                        </td>
                                        <td className="text-center">
                                          <span className="mainCursor" style={{ marginRight: "10px" }}
                                            onClick={() => { conversationCallOnDashboard( actionItemSend ); }}
                                          >
                                            <GoArrowUpRight className="text-white fs-6" />
                                          </span>
                                          <span
                                            className="mainCursor"
                                            onClick={() => { compeletHndle( id, property_name, conversationID ); }}
                                          >
                                            <FaCircleCheck className="text-primary fs-6" />
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
                      </div>
                    ) : (
                      <BoxLoader />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ConverSationtranscriptModel
        handleClose={handleModelClose}
        show={model?.conversationModel}
        prntData={model?.conversationDataSend}
      />
    </>
  );
};

export default Dashboard;
