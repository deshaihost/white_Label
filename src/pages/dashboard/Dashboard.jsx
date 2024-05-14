import React, { useEffect, useState } from "react";
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
import { BsCheckCircle } from "react-icons/bs";
import ToastHandle from "../../helper/ToastMessage";
import { Helmet } from "react-helmet";
import { FaCircleCheck } from "react-icons/fa6";
import ConverSationtranscriptModel from "../propertyInsight/transcriptsTable/transcriptsModel/ConverSationtranscriptModel";

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
  const actionItemsConvertationData =
    store?.getActionItemsReducer?.getActionsItems?.data?.action_items;
  const actionItemsCovertationLoading = store?.getActionItemsReducer?.loading;

  // const actionItems = actionItemsConvertationData
  //   ? actionItemsConvertationData
  //   : [];

  const actionItems = actionItemsConvertationData
    ? actionItemsConvertationData
    : [];

  // Flatten and sort action items by creation time
  const sortedActionItems = Object.keys(actionItems)
    .flatMap((property) =>
      Object.keys(actionItems[property]).map((itemId) => {
        const item = actionItems[property][itemId];
        
        return {
          ...item,
          property,
          itemId,
          createdAt: item?.items[0]?.created_at,
          actionItems
        };
      })
    )
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  // date formate
  function formatDateTime(dateTimeString) {
    const date = new Date(dateTimeString);
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
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

    return `${month} ${day}, ${year} ${hours}:${minutes}${ampm}`;
  }
  const { first_name } = userDataGet ? userDataGet : [];
  console.log("t");
  // this functionality complete convertation
  const completeActionsItemLoading =
    store?.completeActionsItemsReducer?.loading;
  const completeActionsItemStatus =
    store?.completeActionsItemsReducer?.completeActionsItems?.status;
  const completeActionsItemMessage =
    store?.completeActionsItemsReducer?.completeActionsItems?.data?.message;

  const compeletHndle = (itemId, propyName, convrtionId) => {
    dispatch(
      putCompleteActionItemActions({
        action_item_id: itemId,
        property_name: propyName,
        conversation_id: convrtionId,
      })
    );
  };

  useEffect(() => {
    dispatch(getUserDataActions());
    dispatch(getActionItemsActions());
  }, []);

  useEffect(() => {
    if (completeActionsItemStatus === 200) {
      ToastHandle(completeActionsItemMessage, "success");
      dispatch(stateEmptyActions());
      dispatch(getActionItemsActions());
    }
  }, [completeActionsItemStatus]);
  const [converSationId, setConverSationId] = useState("");
  console.log(converSationId,'converSationIdconverSationId++++')
  const propertiesConversationGetData =
    store?.propertyGetConversationReducer?.propertyGetConversation?.data;
  const propertiesConversationLoading =
    store?.propertyGetConversationReducer?.loading;

  console.log(propertiesConversationGetData, "propertiesConversationGetData++");

  const conversationCallOnDashboard = (item) => {
    console.log(item, "itemitem");
    const { propertyName, itemId } = item;
    setConverSationId(itemId);
    dispatch(
      PropertyGetConversationsActions({
        propertyName: propertyName,
      })
    );
  };
  const [model, setModel] = useState({
    conversationModel: false,
    conversationDataSend: "",
  });
  const conversationModelOpen = "conversationModelOpen";
  const conversationModelClose = "conversationModelClose";
  const handleModelOpen = (type, data) => {
    console.log(type, data,'type, data')
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

  useEffect(() => {
    if (propertiesConversationGetData !== undefined) {
      if (converSationId !== "") {
        let findConverSationFilter =
          propertiesConversationGetData?.conversations?.filter(
            (item) => item?.conversation_id === converSationId
          );
        handleModelOpen(conversationModelOpen, findConverSationFilter?.[0]);
      }
    }
  }, [propertiesConversationGetData]);

  return (
    <>
      <Helmet>
        <title>Dashboard</title>
      </Helmet>

      {propertiesConversationLoading && <FullScreenLoader />}
      {completeActionsItemLoading && <FullScreenLoader />}
      <div className="account-main">
        <div className="container">
          <div className="banner-heading">
            <h2>My HostBuddy</h2>
            {/* <p>Manage your profile here </p> */}
          </div>
          <div className="row">
            <div className="col-lg-4">
              <SideBar />
            </div>
            <div className="col-lg-8">
              <div className="account-container">
                <div className="account_heading">
                  <h3>
                    Welcome to HostBuddy,{" "}
                    {!userDataLoading && <>{first_name}</>}{" "}
                  </h3>
                </div>
                <div className="account-content">
                  <div className="row">
                    <div className="col-lg-8">
                      <div className="row">
                        <div className="col-lg-6 mb-3">
                          <div className="account-box">
                            {!userDataGetLoading ? (
                              <>
                                <svg
                                  width="18"
                                  height="17"
                                  viewBox="0 0 18 17"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M5.66667 5.58366H12.3333M5.66667 8.91699H10.6667M8.15833 14.0887L5.66667 15.5837V13.0837H4C3.33696 13.0837 2.70107 12.8203 2.23223 12.3514C1.76339 11.8826 1.5 11.2467 1.5 10.5837V3.91699C1.5 3.25395 1.76339 2.61807 2.23223 2.14923C2.70107 1.68038 3.33696 1.41699 4 1.41699H14C14.663 1.41699 15.2989 1.68038 15.7678 2.14923C16.2366 2.61807 16.5 3.25395 16.5 3.91699V8.91699M11.5 13.917L13.1667 15.5837L16.5 12.2503"
                                    stroke="#146EF5"
                                    stroke-width="1.66667"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                  ></path>
                                </svg>
                                <h4>{successful}</h4>
                                {/* <p>Messages Processed</p> */}
                                <p>Successful</p>
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
                                <svg
                                  width="16"
                                  height="16"
                                  viewBox="0 0 16 16"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M8 15.5C3.85775 15.5 0.5 12.1423 0.5 8C0.5 3.85775 3.85775 0.5 8 0.5C12.1423 0.5 15.5 3.85775 15.5 8C15.5 12.1423 12.1423 15.5 8 15.5ZM8 14C9.5913 14 11.1174 13.3679 12.2426 12.2426C13.3679 11.1174 14 9.5913 14 8C14 6.4087 13.3679 4.88258 12.2426 3.75736C11.1174 2.63214 9.5913 2 8 2C6.4087 2 4.88258 2.63214 3.75736 3.75736C2.63214 4.88258 2 6.4087 2 8C2 9.5913 2.63214 11.1174 3.75736 12.2426C4.88258 13.3679 6.4087 14 8 14ZM8.75 8H11.75V9.5H7.25V4.25H8.75V8Z"
                                    fill="#146EF5"
                                  ></path>
                                </svg>
                                <h4>{unsuccessful}</h4>
                                {/* <p>Average Response Time</p> */}
                                <p>Unsuccessful</p>
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
                                <svg
                                  width="16"
                                  height="16"
                                  viewBox="0 0 16 16"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M8 15.5C3.85775 15.5 0.5 12.1423 0.5 8C0.5 3.85775 3.85775 0.5 8 0.5C12.1423 0.5 15.5 3.85775 15.5 8C15.5 12.1423 12.1423 15.5 8 15.5ZM8 14C9.5913 14 11.1174 13.3679 12.2426 12.2426C13.3679 11.1174 14 9.5913 14 8C14 6.4087 13.3679 4.88258 12.2426 3.75736C11.1174 2.63214 9.5913 2 8 2C6.4087 2 4.88258 2.63214 3.75736 3.75736C2.63214 4.88258 2 6.4087 2 8C2 9.5913 2.63214 11.1174 3.75736 12.2426C4.88258 13.3679 6.4087 14 8 14ZM8.75 8H11.75V9.5H7.25V4.25H8.75V8Z"
                                    fill="#146EF5"
                                  ></path>
                                </svg>
                                <h4>{neutral}</h4>
                                {/* <p>Average Response Time</p> */}
                                <p>Neutral</p>
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
                                <svg
                                  width="16"
                                  height="16"
                                  viewBox="0 0 16 16"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    fill-rule="evenodd"
                                    clip-rule="evenodd"
                                    d="M15.3422 0.656793C15.4156 0.730166 15.4662 0.823302 15.4877 0.924871C15.5092 1.02644 15.5007 1.13207 15.4632 1.2289L10.1064 15.1567C10.0684 15.2552 10.0022 15.3404 9.91608 15.4014C9.82992 15.4625 9.72764 15.4967 9.62209 15.4998C9.51653 15.5029 9.41242 15.4747 9.32283 15.4188C9.23325 15.3629 9.16218 15.2818 9.11856 15.1856L6.87831 10.2573L10.1739 6.96072C10.3158 6.80839 10.3931 6.60693 10.3894 6.39876C10.3857 6.19059 10.3014 5.99198 10.1542 5.84476C10.007 5.69754 9.80833 5.61321 9.60016 5.60953C9.39199 5.60586 9.19053 5.68313 9.0382 5.82507L5.74158 9.12059L0.813244 6.88143C0.716785 6.83787 0.635392 6.76671 0.579339 6.67693C0.523286 6.58715 0.495084 6.48278 0.498293 6.37699C0.501503 6.2712 0.535979 6.16873 0.597371 6.08251C0.658763 5.9963 0.74432 5.9302 0.843243 5.89256L14.7711 0.535729C14.8678 0.498525 14.9732 0.49016 15.0746 0.511648C15.176 0.533135 15.2689 0.583553 15.3422 0.656793Z"
                                    fill="#146EF5"
                                  ></path>
                                </svg>
                                <h4>{total}</h4>
                                {/* <p>Messages Sent</p> */}
                                <p>Total</p>
                              </>
                            ) : (
                              <BoxLoader />
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-4">
                      <div className="row">
                        <div className="col-lg-12">
                          <div className="get-started">
                            <img src={GetStartedImg} alt="get-started" />
                            <p>
                              Explore how to set up and get started with
                              HostBuddy
                            </p>
                            <Link to="/setup-guide">Get Started</Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    {!actionItemsCovertationLoading ? (
                      <div className="">
                        <h3 className="text-white my-3 border-bottom py-3">
                          ACTION ITEMS
                        </h3>
                        <div className="table-responsive">
                          <table class="table text-white action-items-table">
                            <thead>
                              <tr>
                                <th>Date/Time</th>
                                <th>Property/Guest</th>
                                <th>Action Item</th>
                                <th>Review</th>
                                <th>Complete</th>
                              </tr>
                            </thead>
                            <tbody>
                              {sortedActionItems.map((actionItem) => {
                                const { createdAt, property, itemId } =
                                  actionItem;
                                const item = actionItem.items[0];
                                let actionItemSend = {
                                  propertyName: property,
                                  itemId,
                                };
                                return (
                                  <tr key={itemId}>
                                    <td>{formatDateTime(createdAt)}</td>
                                    <td>{property}</td>
                                    <td>{item?.item}</td>
                                    <td className="text-center">
                                      <span
                                        className="mainCursor"
                                        onClick={() => {
                                          conversationCallOnDashboard(
                                            actionItemSend
                                          );
                                        }}
                                      >
                                        <GoArrowUpRight className="text-white fs-6" />
                                      </span>
                                    </td>
                                    <td className="text-center">
                                      <span
                                        className="mainCursor"
                                        onClick={() => {
                                          compeletHndle(
                                            item?.id,
                                            property,
                                            itemId
                                          );
                                        }}
                                      >
                                        <FaCircleCheck className="text-primary fs-6" />
                                      </span>
                                    </td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
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
