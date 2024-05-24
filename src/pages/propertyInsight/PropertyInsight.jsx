import React, { useEffect, useState } from "react";
import "./PropertyInsight.css";
import SideBar from "../../component/sideBar/SideBar";
import SuccessTotalBox from "./successTotalBox/SuccessTotalBox";
import TranscriptsTable from "./transcriptsTable/TranscriptsTable";
import {
  getPropertyInsightByNameActions,
  getUserDataActions,
} from "../../redux/actions";
import { useSelectorUseDispatch } from "../../helper/Authorized";
import { PropertyGetConversationsActions } from "../../redux/actions";
import  {  FullScreenLoader } from "../../helper/Loader";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";

const PropertyInsight = () => {
  const { store, dispatch } = useSelectorUseDispatch();
  const statisticsGetNameByProperty =
    store?.getPropertyByNameReducer?.getPropertybyName?.data?.property
      ?.statistics?.num_conversations;
  const chatBoxUrl = useParams();
  const completeReviewName = chatBoxUrl?.id;
  // Check if completeReviewName is ":id"
  const getCompleteReviewNameUrl =
    completeReviewName === ":id"
      ? completeReviewName
      : JSON.parse(completeReviewName);
  // If completeReviewName is ":id", set propertyName to empty string, else extract propertyName
  const propertyName =
    completeReviewName === ":id" ? "" : getCompleteReviewNameUrl?.propertyName;
  // const propertyConversationId =
  //   completeReviewName === ":id" ? "" : getCompleteReviewNameUrl?.itemId;
  const propertiesConversationGetData = store?.propertyGetConversationReducer?.propertyGetConversation?.data?.conversations;
  const propertiesConversationLoading = store?.propertyGetConversationReducer?.loading;

  const userDataGet = store?.getUserDataReducer?.getUserData?.data?.user?.properties;
  const userProperties = store?.getUserDataReducer?.getUserData?.data?.user?.property_data; // always use this obj as user properties list, as the "properties" field above is deprecated
  const userpertieslistName = userProperties ? Object.keys(userProperties)[0] : undefined; // grab any property name from the property_data obj, to use as default

  const [propertySelectName, setPropertySelectName] = useState(completeReviewName === ":id" ? "" : propertyName);
  const [propertySelectNameView, setPropertySelectNameView] = useState(completeReviewName === ":id" ? "" : propertyName);

  useEffect(() => {
    dispatch(getUserDataActions());
  }, []);

  useEffect(() => {
    if (propertyName === "") {
      setPropertySelectNameView(userpertieslistName);
      dispatch(
        PropertyGetConversationsActions({
          propertyName:
            propertySelectName !== ""
              ? propertySelectName
              : userpertieslistName,
        })
      );
      dispatch(
        getPropertyInsightByNameActions({
          propertyName:
            propertySelectName !== ""
              ? propertySelectName
              : userpertieslistName,
        })
      );
    } else {
      dispatch(
        PropertyGetConversationsActions({
          propertyName: propertySelectName !== "" ? propertySelectName : propertyName,
        })
      );
      dispatch(
        getPropertyInsightByNameActions({
          propertyName:
            propertySelectName !== "" ? propertySelectName : propertyName,
        })
      );
    }
  }, [propertySelectName, userpertieslistName, propertyName]);
  return (
    <>
      <Helmet>
        <title>Insights</title>
      </Helmet>
      ;
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
              <div class="account-container">
                <div class="account_heading account_heading_white">
                  <h3 className="text-white">Insights and Records</h3>
                  <div class="property_select">
                    {userProperties && Object.keys(userProperties).length > 0 ? (
                      <select id="properies_insight" className="" onChange={(e) => { setPropertySelectName(e.target.value); }}>
                        <option selected hidden>
                          {propertySelectNameView}
                        </option>
                        {Object.keys(userProperties).map((key) => {
                          return <option value={key}>{key}</option>;
                        })}
                      </select>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
                {!propertiesConversationLoading ? (
                  <>
                    {propertiesConversationGetData?.length > 0 ? (
                      <div className="px-lg-5 px-md-4 px-3 py-4">
                        <div>
                          <SuccessTotalBox
                            totalConversation={propertiesConversationGetData?.length}
                            statisticsGetNameByProperty={statisticsGetNameByProperty}
                          />
                        </div>
                        <div className="">
                          <TranscriptsTable
                            conversationData={propertiesConversationGetData}
                            // propertyConversationId={propertyConversationId}
                          />
                        </div>
                      </div>
                    ) : (
                      <div
                        className="text-danger"
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          height: "85%",
                        }}
                      >
                        No data to show yet
                      </div>
                    )}
                  </>
                ) : (
                  <FullScreenLoader />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PropertyInsight;
