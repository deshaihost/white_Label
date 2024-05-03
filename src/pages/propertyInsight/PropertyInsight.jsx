import React, { useEffect, useState } from "react";
import "./PropertyInsight.css";
import SideBar from "../../component/sideBar/SideBar";
import SuccessTotalBox from "./successTotalBox/SuccessTotalBox";
import TranscriptsTable from "./transcriptsTable/TranscriptsTable";
import SuggestionsBusiness from "./suggestionsBusiness/SuggestionsBusiness";
import { getUserDataActions } from "../../redux/actions";
import { useSelectorUseDispatch } from "../../helper/Authorized";
import { PropertyGetConversationsActions } from "../../redux/actions";
import Loader, { BoxLoader, FullScreenLoader } from "../../helper/Loader";
import { useParams } from "react-router-dom";
const PropertyInsight = () => {
  const { store, dispatch } = useSelectorUseDispatch();
  const chatBoxUrl = useParams();
  const propertiesConversationGetData =
    store?.propertyGetConversationReducer?.propertyGetConversation?.data
      ?.conversations;

  const propertiesConversationLoading =
    store?.propertyGetConversationReducer?.loading;

  const userDataGet =
    store?.getUserDataReducer?.getUserData?.data?.user?.properties;
  const userpertieslistName = userDataGet?.[0];

  const [propertySelectName, setPropertySelectName] = useState("");

  useEffect(() => {
    dispatch(getUserDataActions());
  }, []);

  useEffect(() => {
    dispatch(
      PropertyGetConversationsActions({
        propertyName:
          propertySelectName !== "" ? propertySelectName : userpertieslistName,
      })
    );
  }, [propertySelectName, userpertieslistName]);
  return (
    <>
      <div className="account-main">
        <div className="container">
          <div className="banner-heading">
            <h2>My HostBuddy</h2>
            <p>Manage your profile here </p>
          </div>
          <div className="row">
            <div className="col-lg-4">
              <SideBar />
            </div>
            <div className="col-lg-8">
              <div class="account-container">
                <div class="account_heading account_heading_white">
                  <h3 className="text-white">Property Insight </h3>
                  <div class="property_select">
                    {userDataGet?.length > 0 ? (
                      <select
                        id="properies_insight"
                        className=""
                        onChange={(e) => {
                          setPropertySelectName(e.target.value);
                        }}
                      >
                        {userDataGet?.map((userData) => {
                          return (
                            <>
                              <option value={userData}>{userData}</option>
                            </>
                          );
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
                            totalConversation={
                              propertiesConversationGetData?.length
                            }
                          />
                        </div>
                        <div className="">
                          <TranscriptsTable
                            conversationData={propertiesConversationGetData}
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
