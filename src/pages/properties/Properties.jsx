import React, { useEffect, useState } from "react";
import SideBar from "../../component/sideBar/SideBar";
import "./properties.css";
import AddPropertyModal from "../../component/modal/addPropertyModal/AddPropertyModal";
import NoWorkPlanModal from "../../component/modal/noWorkPlanModal/NoWorkPlanModal";
import RemoveIntegrations from "./removeIntegrationsModel/RemoveIntegrations";
import { Helmet } from "react-helmet";
import {
  getUserDataActions,
  goToBillingportalPostActions,
  toggleChatbotoNoFFPutActions,
} from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { stateEmptyActions } from "../../redux/actions";
import  { FullScreenLoader } from "../../helper/Loader";
import { useNavigate } from "react-router-dom";
import ListIntegrationProperties from "./listIntegrationProperties/ListIntegrationProperties";
import ToastHandle from "../../helper/ToastMessage";
import BillingPortalModel from "./billingPortalModel/BillingPortalModel";

const Properties = () => {
  const store = useSelector((state) => state);
  const dispatch = useDispatch();
  const gotoBillingPortalCheckPaymentStatus =
    store?.gotoBillingPortalPostReducer?.gotoBillingPortal?.status;
  const gotoBillingPortalcheckPaymentLoading =
    store?.gotoBillingPortalPostReducer?.loading;
  const [model, setModel] = useState({
    addProperty: false,
    pmsIntegration: false,
    removeIntegration: false,
    billingPortal: false,
  });
  const [propertyConditionCheck, setPropertyConditionCheck] = useState(false);
  const handleModelOpen = (type) => {
    if (type === "addPropertyOpen") {
      dispatch(goToBillingportalPostActions());
      setPropertyConditionCheck(true);
    } else if (type === "pmsIntegrationOpen") {
      setModel({ ...model, pmsIntegration: true });
    } else if (type === "removeIntegrationsOpen") {
      setModel({ ...model, removeIntegration: true });
    }
  };
  const handleModelClose = (type) => {
    if (type === "addPropertyClose") {
      setModel({ ...model, addProperty: false });
    } else if (type === "pmsIntegrationClose") {
      setModel({ ...model, pmsIntegration: false });
      dispatch(stateEmptyActions());
    } else if (type === "removeIntegrationsClose") {
      setModel({ ...model, removeIntegration: false });
    } else if (type === "billingPortalClose") {
      setModel({ ...model, billingPortal: false });
    }
  };
  // toggle chatbot
  const createPropertiesName =
    store?.getUserDataReducer?.getUserData?.data?.user?.properties;
  const propertiesExtraData = store?.getUserDataReducer?.getUserData?.data?.user
    ?.property_data
    ? store?.getUserDataReducer?.getUserData?.data?.user?.property_data
    : [];
  // shows toggle state for each property
  const intergrationsMain =
    store?.getUserDataReducer?.getUserData?.data?.user?.calry_integrations;
  const intergrations = intergrationsMain ? intergrationsMain : [];
  const toggleChatMessage =
    store?.togglechatBotOnOffReducer?.toggleChatBotOnOff?.data?.message;
  const toggleChatLoading = store?.togglechatBotOnOffReducer?.loading;
  const toggleChatStatus =
    store?.togglechatBotOnOffReducer?.toggleChatBotOnOff?.status;

  const [toggleOnOff, setToggleOnOff] = useState("");

  const anyPropertyNotForcedOff = propertiesExtraData
    ? Object?.values(propertiesExtraData)?.some(
        (property) => property?.toggle_status !== "FORCED_OFF"
      )
    : [];

  const toggleChatBotHndle = (type) => {
    if (type) {
      setToggleOnOff("on"); // trigger the API call
      // setToggleActive(true); // set button state // no longer needed because button appearalce state is controlled by anyPropertyNotForcedOff, which comes directly from API data
    } else {
      setToggleOnOff("FORCED_OFF");
      // setToggleActive(false);
    }
  };

  useEffect(() => {
    if (toggleOnOff !== "") {
      dispatch(
        toggleChatbotoNoFFPutActions({
          properties: createPropertiesName,
          state: toggleOnOff,
        })
      );
      setToggleOnOff("");
    }
  }, [toggleOnOff]);

  useEffect(() => {
    if (propertyConditionCheck) {
      if (gotoBillingPortalCheckPaymentStatus === 200) {
        setPropertyConditionCheck(false);
        // navigate("/add-properties");
        setModel({ ...model, billingPortal: true });
        // dispatch(stateEmptyActions());
      } else if (gotoBillingPortalCheckPaymentStatus === 404) {
        setModel({ ...model, addProperty: true });
        dispatch(stateEmptyActions());
      }
    } else if (toggleChatStatus === 200) {
      ToastHandle(toggleChatMessage, "success");
      dispatch(getUserDataActions());
      dispatch(stateEmptyActions());
    }
  }, [
    gotoBillingPortalCheckPaymentStatus,
    propertyConditionCheck,
    toggleChatStatus,
  ]);

  return (
    <>
      <Helmet>
        <title>Properties</title>
      </Helmet>
      ;
      <div className="account-main">
        <div className="container">
          <div className="banner-heading">
            <h2>My HostBuddy</h2>
          </div>
          <div className="row">
            <div className="col-lg-4">
              <SideBar />
            </div>
            <div className="col-lg-8">
              <div className="account-container">
                <div className="account_heading">
                  <h3>Properties</h3>
                  <div className="property-heading-right">
                    <p>HostBuddy Status</p>
                    {toggleChatLoading && <FullScreenLoader />}
                    {propertiesExtraData && Object.keys(propertiesExtraData).length > 0 &&
                      (!anyPropertyNotForcedOff ? (
                        <>
                          {" "}
                          <button
                            className="bg-danger text-white rounded-pill border-danger btn border"
                            onClick={(e) => {
                              toggleChatBotHndle(true);
                            }}
                          >
                            STOPPED
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            className="bg-dark text-primary border-primary btn border rounded-pill"
                            onClick={(e) => {
                              toggleChatBotHndle(false);
                            }}
                          >
                            STOP
                          </button>
                        </>
                      ))}
                  </div>
                </div>
                <div
                  className="addproperty_links text-center"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <button
                    type="button"
                    className="shadow-none border-0"
                    onClick={() => {
                      handleModelOpen("addPropertyOpen");
                    }}
                  >
                    {!gotoBillingPortalcheckPaymentLoading ? (
                      "Add Property"
                    ) : propertyConditionCheck ? (
                      <>
                        <span>
                          Add Property
                          <span>{<FullScreenLoader />}</span>
                        </span>
                      </>
                    ) : (
                      "Add Property"
                    )}
                  </button>
                  {intergrations &&
                  Object.keys(intergrations).length > 0 ? ( // if calry_integrations in user data: show as connected to the integration (it only has one key). Capitalize the first letter of the integration.
                    <p style={{ color: "white" }}>
                      {`Connected to ${Object.keys(intergrations)[0].charAt(0).toUpperCase() + Object.keys(intergrations)[0].slice(1)}`}
                    </p>
                  ) : (
                    <button
                      className="shadow-none border-0"
                      type="button"
                      onClick={() => {
                        handleModelOpen("pmsIntegrationOpen");
                      }}
                    >
                      PMS Integration
                    </button>
                  )}
                </div>
                <div className="property_list">
                  <ul>
                    <li className="not-found px-0">
                      <div className="">
                        <ListIntegrationProperties />
                      </div>
                    </li>
                  </ul>
                </div>
                <div className="load_more"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <BillingPortalModel
        handleClose={handleModelClose}
        show={model?.billingPortal}
      />
      <AddPropertyModal
        handleClose={handleModelClose}
        show={model?.addProperty}
      />
      <NoWorkPlanModal
        handleNoPlanClose={handleModelClose}
        showNoPlan={model?.pmsIntegration}
      />
      <RemoveIntegrations
        handleNoPlanClose={handleModelClose}
        showNoPlan={model?.removeIntegration}
      />
    </>
  );
};

export default Properties;
