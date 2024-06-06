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
import { Helmet } from "react-helmet";

const PropertyInsight = () => {
  const { store, dispatch } = useSelectorUseDispatch();
  const statisticsGetNameByProperty = store?.getPropertyByNameReducer?.getPropertybyName?.data?.property?.statistics?.num_conversations;
  const propertyName = ""
  const propertiesConversationGetData = store?.propertyGetConversationReducer?.propertyGetConversation?.data?.conversations;
  const propertiesConversationLoading = store?.propertyGetConversationReducer?.loading;

  const userProperties = store?.getUserDataReducer?.getUserData?.data?.user?.property_data;
  const userpertieslistName = userProperties ? Object.keys(userProperties)[0] : undefined; // grab any property name from the property_data obj, to use as default

  const [propertySelectName, setPropertySelectName] = useState("");
  const [propertySelectNameView, setPropertySelectNameView] = useState("");

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
        <title>Transcripts - HostBuddy AI</title>
      </Helmet>
      ;
      <div className="account-main">
        <div className="container">
          <div className="banner-heading">
            <h2>My HostBuddy</h2>
            {/* <p>Manage your profile here </p> */}
          </div>
          <div className="row">
            <div className="col-lg-2">
              <SideBar />
            </div>
            <div className="col-lg-10">
              <div class="account-container">
                <div class="account_heading account_heading_white">
                  <h3 className="text-white">Transcripts</h3>
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
