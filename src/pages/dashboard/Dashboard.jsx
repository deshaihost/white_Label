import React, { useEffect, useState } from "react";
import SideBar from "../../component/sideBar/SideBar";
import { Link, useNavigate } from "react-router-dom";
import "./dashboard.css";
import { useSelector, useDispatch } from "react-redux";
import {
  getActionItemsActions,
  getUserDataActions,
  putCompleteActionItemActions,
  stateEmptyActions,
} from "../../redux/actions";
import { BoxLoader, FullScreenLoader } from "../../helper/Loader";
import AccountNotifBanner from "../../component/accountNotifBanner/accountNotifBanner";
import SubscriptionBanner from "../../component/accountNotifBanner/subscriptionBanner";
import "react-circular-progressbar/dist/styles.css";
import ToastHandle from "../../helper/ToastMessage";
import { Helmet } from "react-helmet";
import { FaCircleCheck, FaCheck } from "react-icons/fa6";
import ConverSationtranscriptModel from "../propertyInsight/transcriptsTable/transcriptsModel/ConverSationtranscriptModel";
import HostDaddy from "../../component/hostDaddy/hostDaddy";
import NoltWidget from "../../component/nolt/nolt";
import useWhiteLabelBranding from "../../helper/useWhiteLabelBranding";
import { useWhiteLabelCss } from "../../helper/WhiteLabelCssContext";

import {
  MetricTile,
  HistogramTile,
  renderTiles,
} from "../statistics/statisticsTilesComponents";
import {
  getStatisticsData,
  formatDateToReadable,
} from "../statistics/dataManager";

const Dashboard = () => {
  const store = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isWhiteLabel, brandName, displayName } = useWhiteLabelBranding();
  const { cssConfig, loading: cssLoading } = useWhiteLabelCss();
  const userDataGet = store?.getUserDataReducer?.getUserData?.data?.user;
  const userDataLoading = store?.getUserDataReducer?.loading;
  const actionItemsConvertationData =
    store?.getActionItemsReducer?.getActionsItems?.data?.action_items;
  const actionItemsCovertationLoading = store?.getActionItemsReducer?.loading;
  const createPropertiesName =
    store?.getUserDataReducer?.getUserData?.data?.user?.properties;
  const actionItems = actionItemsConvertationData
    ? actionItemsConvertationData
    : [];

  const hospitableWhReminder = userDataGet?.hospitable_wh_reminder; // date string: "2021-09-30T16:49:56Z"
  const hospitableWhReminderMoreThan24hAgo = hospitableWhReminder
    ? new Date() - new Date(hospitableWhReminder) > 24 * 60 * 60 * 1000
    : false;
  const integrationAccountId = userDataGet?.calry_integrations
    ? Object.values(userDataGet.calry_integrations)[0]?.integrationAccountId
    : null;

  // Statistics logic -----------------------------------------------------------------------------------------------

  const [rawApiReturn, setRawApiReturn] = useState({}); // The raw data returned by the API
  const [apiStatisticsData, setApiStatisticsData] = useState({}); // The data structures for the statistics tiles, after populated by the API and formatted in dataManager
  const [statisticsDataLoading, setStatisticsDataLoading] = useState(true);

  const dataStartDate = rawApiReturn?.statistics?.start_date;
  const dataEndDate = rawApiReturn?.statistics?.end_date;
  const startDateDisplay = dataStartDate
    ? formatDateToReadable(dataStartDate)
    : "";
  const endDateDisplay = dataEndDate ? formatDateToReadable(dataEndDate) : "";

  // When the page loads, fetch the data and populate the charts
  useEffect(() => {
    getStatisticsData(
      setRawApiReturn,
      setApiStatisticsData,
      setStatisticsDataLoading
    );
  }, []);

  // *** THIS contains the (static) definition of which tiles to render, and in which order *** //
  const statisticsTiles = [
    {
      component: MetricTile,
      dataSets: apiStatisticsData?.totalMessagesResponded,
      width: 4,
      height: "240px",
    },
    {
      component: MetricTile,
      dataSets: apiStatisticsData?.responseTimes,
      width: 4,
      height: "240px",
    },
    {
      component: MetricTile,
      dataSets: apiStatisticsData?.sentimentMetrics,
      width: 4,
      height: "240px",
    },
    {
      component: HistogramTile,
      dataSets: apiStatisticsData?.messageTimingData,
      width: 12,
      height: "350px",
      dateRange: startDateDisplay && endDateDisplay ? { start: startDateDisplay, end: endDateDisplay } : null,
      showStatisticsLink: true,
    },
  ];

  // ----------------------------------------------------------------------------------------------------------------

  // For legacy dict type: flatten and sort action items by creation time (TODO: delete)
  let sortedActionItems = actionItems;
  if (typeof actionItems === "object" && !Array.isArray(actionItems)) {
    sortedActionItems = Object.keys(actionItems)
      .flatMap((property_name) =>
        Object.keys(actionItems[property_name]).flatMap((conversationID) => {
          const conversation_data = actionItems[property_name][conversationID];
          return conversation_data.items.map((item) => ({
            ...item,
            guest_name: conversation_data.guest_name,
            property_name,
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
    const { status } = actionItem;
    const statusFilterValLower = statusFilterVal.toLowerCase();
    return status.toLowerCase().includes(statusFilterValLower);
  });

  // After above filtering, get only the action items that match the selected property filter (if any is applied)
  const filteredSearchProperty = filteredActionItems?.filter((actionItem) => {
    return (
      propertySearchVal === "" ||
      actionItem.property
        .toLowerCase()
        .includes(propertySearchVal.toLowerCase())
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
        <i className="bi bi-search me-2 text-white"></i>
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

  const { first_name } = userDataGet || {};
  const completeActionsItemLoading =
    store?.completeActionsItemsReducer?.loading;
  const completeActionsItemStatus =
    store?.completeActionsItemsReducer?.completeActionsItems?.status;
  const completeActionsItemMessage =
    store?.completeActionsItemsReducer?.completeActionsItems?.data?.message;

  const compeletHndle = (conversationID, propyName, convrtionId) => {
    dispatch(
      putCompleteActionItemActions({
        action_item_id: conversationID,
        property_name: propyName,
        conversation_id: convrtionId,
      })
    );
  };

  useEffect(() => {
    dispatch(getUserDataActions(false));
    dispatch(getActionItemsActions(8));
  }, []);

  // When user data is loaded, save the payment/subscription information to local storage. We need this information for the warning banner logic (in the NavBar), which should be shown on all portal pages.
  useEffect(() => {
    if (false && userDataGet) {
      // not used
      localStorage.setItem(
        "paymentStatus",
        userDataGet?.subscription?.payment_standing
      );
      localStorage.setItem(
        "servicesExpireDate",
        userDataGet?.subscription?.services_good_until
      );
      localStorage.setItem(
        "numPropertiesAllowed",
        userDataGet?.subscription?.num_properties_allowed
      );
      localStorage.setItem(
        "numPropertiesUsed",
        Object.keys(userDataGet?.property_data || {}).length
      );
      localStorage.setItem(
        "tooManyPropertiesGraceUntil",
        userDataGet?.subscription?.too_many_properties_grace_until
      );
    }
  }, [userDataGet]);

  useEffect(() => {
    if (completeActionsItemStatus === 200) {
      ToastHandle(completeActionsItemMessage, "success");
      dispatch(stateEmptyActions());
      dispatch(getActionItemsActions(8));
    }
  }, [completeActionsItemStatus]);
  const [converSationId, setConverSationId] = useState("");
  const propertiesConversationGetData =
    store?.propertyGetConversationReducer?.propertyGetConversation?.data;
  const propertiesConversationLoading =
    store?.propertyGetConversationReducer?.loading;
  const [propertyNameForConversationData, setPropertyNameForConversationData] =
    useState("");

  const [model, setModel] = useState({
    conversationModel: false,
    conversationDataSend: "",
  });
  const conversationModelOpen = "conversationModelOpen";
  const conversationModelClose = "conversationModelClose";

  const handleModelOpen = (type, data) => {
    if (type === conversationModelOpen) {
      setModel({
        ...model,
        conversationModel: true,
        conversationDataSend: data,
      });
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
        let findConverSationFilter =
          propertiesConversationGetData?.conversations?.filter(
            (item) => item?.conversation_id === converSationId
          );
        if (findConverSationFilter?.[0]) {
          findConverSationFilter[0].property_name =
            propertyNameForConversationData;
        }
        handleModelOpen(conversationModelOpen, findConverSationFilter?.[0]);
      }
    }
  }, [propertiesConversationGetData]);

  return (
    <>
      <Helmet>
        <title>Dashboard - {isWhiteLabel ? `${displayName} AI` : 'HostBuddy AI'}</title>
      </Helmet>{" "}
      {propertiesConversationLoading && <FullScreenLoader />}
      {completeActionsItemLoading && <FullScreenLoader />}
      <div 
        className="account-main"
        style={{
          background: !cssLoading ? (cssConfig?.css_data?.background?.primary || '#0F1117') : '#0F1117'
        }}
      >
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10 col-xl-10 col-xxl-10">
              <div className="banner-heading">
                {/* <h2>My {brandName}</h2> */}
                {/* <h2>Dashboard</h2> */}
              </div>
            </div>
          </div>
          {userDataGet?.hospitable_permission_error && (
            <div style={{ marginBottom: "20px" }}>
              <AccountNotifBanner
                title="Messaging Permissions Needed"
                theme="warning"
                message={
                  <>
                    Your HostBuddy messages aren't going through because your
                    messaging permissions have not been enabled within
                    Hospitable. Follow{" "}
                    <a
                      target="_blank"
                      rel="noreferrer"
                      href="https://userguide.hostbuddy.ai/pms-integration-guides/hospitable"
                    >
                      these steps
                    </a>{" "}
                    to obtain the needed permissions for your account.
                  </>
                }
              />
            </div>
          )}
          {hospitableWhReminder && (
            <div
              style={{
                marginBottom: "20px",
                marginTop: userDataGet?.hospitable_permission_error
                  ? "0px"
                  : "-30px",
              }}
            >
              {!hospitableWhReminderMoreThan24hAgo ? (
                <AccountNotifBanner
                  title="Set Up Your Webhooks In Hospitable"
                  theme="default"
                  message={
                    <>
                      If you haven't done so already, you'll need to set up
                      webhooks in your Hospitable account following{" "}
                      <a
                        target="_blank"
                        rel="noreferrer"
                        href="https://userguide.hostbuddy.ai/pms-integration-guides/hospitable"
                      >
                        these steps
                      </a>
                      . This is needed to ensure your reservation data refreshes
                      in real time.
                      <br />
                      <br />
                      Your unique listener URL is:{" "}
                      <code style={{ fontSize: "14px", marginLeft: "4px" }}>
                        https://prod.calry.app/api/v1/listener/hospitable/
                        {integrationAccountId}
                      </code>
                    </>
                  }
                />
              ) : (
                <AccountNotifBanner
                  title="Set Up Your Webhooks In Hospitable"
                  theme="warning"
                  message={
                    <>
                      Follow{" "}
                      <a
                        target="_blank"
                        rel="noreferrer"
                        href="https://userguide.hostbuddy.ai/pms-integration-guides/hospitable"
                      >
                        these steps
                      </a>{" "}
                      to set up webhooks in your Hospitable account. This is
                      needed to ensure your reservation data refreshes in real
                      time.
                      <br />
                      <br />
                      Your unique listener URL is:{" "}
                      <code style={{ fontSize: "14px", marginLeft: "4px" }}>
                        https://prod.calry.app/api/v1/listener/hospitable/
                        {integrationAccountId}
                      </code>
                    </>
                  }
                />
              )}
            </div>
          )}{" "}
          <div className="row justify-content-center">
            <div
              className="col-lg-2 col-xl-2 col-xxl-2"
              style={{ display: "none" }}
            >
              <SideBar />
            </div>
            <div 
              className="col-lg-10 col-xl-10 col-xxl-10"
              style={{
                background: !cssLoading ? (cssConfig?.css_data?.background?.primary || '#0F1117') : '#0F1117'
              }}
            >
              <h1 style={{color:"white" , marginBottom:"20px"}}>Dashboard</h1>
              <div 
                className="dashboard-container blur-background-top-right"
                style={{
                  background: !cssLoading ? (cssConfig?.css_data?.background?.primary || '#0F1117') : undefined
                }}
              >
                <div className="account_heading">
                  {first_name ? (
                    <h3>
                      Welcome to {brandName}, {!userDataLoading && first_name}
                    </h3>
                  ) : (
                    <h3>Welcome to {brandName}!</h3>
                  )}
                  <h4>
                    New to {brandName}?{" "}
                    <Link
                      style={{ textDecoration: "underline", marginLeft: "5px" }}
                      to="/getstarted"
                    >
                      Get Started
                    </Link>
                  </h4>
                </div>
                <div className="account-content">
                  <SubscriptionBanner userData={userDataGet} />

                  {!statisticsDataLoading ? (
                    renderTiles(statisticsTiles)
                  ) : (
                    <BoxLoader />
                  )}

                  <div className="row">
                    {!actionItemsCovertationLoading ? (
                      <div style={{
                        backgroundColor: '#17191f',
                        border: '2px solid #013280',
                        borderRadius: '12px',
                        overflow: 'hidden',
                        boxShadow: '0 0 25px rgba(30, 75, 158, 0.2)'
                      }}>
                        <div style={{
                          padding: '24px',
                          paddingBottom: '16px',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          borderBottom: '1px solid #013280'
                        }}>
                          <div>
                            <h5 style={{ 
                              fontSize: "16px", 
                              fontFamily: "'DM Sans', sans-serif", 
                              fontWeight: 600,
                              fontVariationSettings: "'opsz' 14",
                              color: "white",
                              marginBottom: 0
                            }}>
                              Incomplete Action Items{" "}
                              <span
                                style={{ 
                                  fontSize: "14px", 
                                  color: "#a6a9b2",
                                  fontFamily: "'DM Sans', sans-serif",
                                  fontWeight: 400,
                                  fontVariationSettings: "'opsz' 14"
                                }}
                              >
                                (Most Recent)
                              </span>
                            </h5>
                          </div>
                          <div>
                            <Link
                              to={"/action-item"}
                              style={{ 
                                fontSize: "14px",
                                fontFamily: "'DM Sans', sans-serif",
                                fontWeight: 500,
                                fontVariationSettings: "'opsz' 14",
                                color: "#3e88f7",
                                textDecoration: "none"
                              }}
                              onMouseOver={(e) => e.target.style.textDecoration = 'underline'}
                              onMouseOut={(e) => e.target.style.textDecoration = 'none'}
                            >
                              See All
                            </Link>
                          </div>
                        </div>
                        {filteredSearchProperty?.length > 0 ? (
                          <>
                            {/* Table Header */}
                            <div style={{
                              display: 'grid',
                              gridTemplateColumns: '100px 200px 1fr 80px',
                              gap: '16px',
                              padding: '12px 24px',
                              backgroundColor: !cssLoading ? (cssConfig?.css_data?.background?.primary || '#0F1117') : '#0F1117',
                              borderBottom: '1px solid #013280'
                            }}>
                              <p style={{
                                color: '#a6a9b2',
                                fontSize: '12px',
                                fontFamily: "'DM Sans', sans-serif",
                                fontWeight: 600,
                                textTransform: 'uppercase',
                                fontVariationSettings: "'opsz' 14",
                                margin: 0
                              }}>
                                Date/Time
                              </p>
                              <p style={{
                                color: '#a6a9b2',
                                fontSize: '12px',
                                fontFamily: "'DM Sans', sans-serif",
                                fontWeight: 600,
                                textTransform: 'uppercase',
                                fontVariationSettings: "'opsz' 14",
                                margin: 0
                              }}>
                                Property/Guest
                              </p>
                              <p style={{
                                color: '#a6a9b2',
                                fontSize: '12px',
                                fontFamily: "'DM Sans', sans-serif",
                                fontWeight: 600,
                                textTransform: 'uppercase',
                                fontVariationSettings: "'opsz' 14",
                                margin: 0
                              }}>
                                Action Item
                              </p>
                              <p style={{
                                color: '#a6a9b2',
                                fontSize: '12px',
                                fontFamily: "'DM Sans', sans-serif",
                                fontWeight: 600,
                                textTransform: 'uppercase',
                                textAlign: 'center',
                                fontVariationSettings: "'opsz' 14",
                                margin: 0
                              }}>
                                Complete
                              </p>
                            </div>

                            {/* Table Rows */}
                            <div style={{ maxHeight: '500px', overflowY: 'auto' }}>
                              {filteredSearchProperty?.map((actionItem) => {
                                const {
                                  id,
                                  created_at,
                                  property_name,
                                  conversationID,
                                  item,
                                } = actionItem;
                                
                                // Split date and time from formatDateTime
                                const dateTimeFormatted = formatDateTime(created_at);
                                const [datePart, timePart] = dateTimeFormatted.split('\n');
                                
                                return (
                                  <div
                                    key={id}
                                    style={{
                                      display: 'grid',
                                      gridTemplateColumns: '100px 200px 1fr 80px',
                                      gap: '16px',
                                      padding: '16px 24px',
                                      borderBottom: '1px solid #013280',
                                      transition: 'background-color 0.2s',
                                      cursor: 'default'
                                    }}
                                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#01255e'}
                                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                                  >
                                    <div>
                                      <p style={{ 
                                        fontFamily: "'DM Sans', sans-serif",
                                        fontWeight: 500,
                                        fontSize: "14px",
                                        color: "white",
                                        fontVariationSettings: "'opsz' 14",
                                        margin: 0,
                                        marginBottom: '4px'
                                      }}>
                                        {datePart}
                                      </p>
                                      <p style={{ 
                                        fontFamily: "'DM Sans', sans-serif",
                                        fontWeight: 400,
                                        fontSize: "12px",
                                        color: "#a6a9b2",
                                        fontVariationSettings: "'opsz' 14",
                                        margin: 0
                                      }}>
                                        {timePart}
                                      </p>
                                    </div>
                                    <div>
                                      <p style={{ 
                                        fontFamily: "'DM Sans', sans-serif",
                                        fontWeight: 500,
                                        fontSize: "14px",
                                        color: "white",
                                        fontVariationSettings: "'opsz' 14",
                                        margin: 0,
                                        marginBottom: actionItem?.guest_name ? '4px' : 0
                                      }}>
                                        {property_name}
                                      </p>
                                      {actionItem?.guest_name && (
                                        <p style={{ 
                                          fontFamily: "'DM Sans', sans-serif",
                                          fontWeight: 400,
                                          fontSize: "12px",
                                          color: "#a6a9b2",
                                          fontVariationSettings: "'opsz' 14",
                                          margin: 0
                                        }}>
                                          {actionItem.guest_name}
                                        </p>
                                      )}
                                    </div>
                                    <p style={{ 
                                      fontFamily: "'DM Sans', sans-serif",
                                      fontWeight: 400,
                                      fontSize: "14px",
                                      color: "white",
                                      fontVariationSettings: "'opsz' 14",
                                      margin: 0
                                    }}>
                                      {item}
                                    </p>
                                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                      <button
                                        className="complete-button"
                                        onClick={() => {
                                          compeletHndle(
                                            id,
                                            property_name,
                                            conversationID
                                          );
                                        }}
                                        title="Mark Complete"
                                      >
                                        <FaCheck className="complete-button-icon" />
                                      </button>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </>
                        ) : (
                          <div style={{
                            padding: '32px',
                            textAlign: 'center',
                            color: '#a6a9b2',
                            fontSize: '14px',
                            fontFamily: "'DM Sans', sans-serif",
                            fontVariationSettings: "'opsz' 14"
                          }}>
                            No Incomplete Items
                          </div>
                        )}
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
      <HostDaddy />
      <NoltWidget />
    </>
  );
};

export default Dashboard;
