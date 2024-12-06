import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import "./GetStarted.css";
import IconOne from "../../helper/staticImage/icon1.webp";
import IconTwo from "../../helper/staticImage/icon2.webp";
import IconThree from "../../helper/staticImage/icon3.webp";
import IconFour from "../../helper/staticImage/icon4.webp";
// import GetStartConnect from "./model/GetStartConnect";
import { Link } from "react-router-dom";
import { FaArrowRightLong } from "react-icons/fa6";
import HostDaddy from '../../component/hostDaddy/hostDaddy';

const step1img = "https://hostbuddylb.com/get-started/1.%20Connect%20your%20PMS.webp";
const step2img = "https://hostbuddylb.com/get-started/2.%20Add%20your%20properties.webp";
const step3img = "https://hostbuddylb.com/get-started/3.%20Set%20Knowledge%20Base.webp";
const step4img = "https://hostbuddylb.com/get-started/4.%20Try%20it%20out.webp";
const step5img = "https://hostbuddylb.com/get-started/5.%20Schedule.webp";

const featureData = [
  /*
  {
    title: "Schedule HostBuddy",
    description: "Set HostBuddy's coverage schedule to fit your exact needs.",
    link: "/schedule-guide",
  },
  */
  {
    title: "Customize HostBuddy's Behavior",
    description: "See how HostBuddy can be tailored to suit the needs and nuances of your business.",
    //link: "/customize-hostbuddy-guide",
    link: 'https://userguide.hostbuddy.ai/messaging-overview/conversation-preferences'
  },
  {
    title: "Get Notified",
    description: "HostBuddy intelligently identifies issues and action items, and can notify your team through various channels.",
    //link: "/notifications-guide",
    link: 'https://userguide.hostbuddy.ai/settings/notifications'
  },
  {
    title: "Smart Templates",
    description: "Leverage HostBuddy's advanced templating system to automate strategic upsells, friendly check-ins, policy reminders, and much more.",
    //link: "/smart-templates?portal=true", // not sure if we're in the user portal. TODO: dynamically determine whether user is logged in and put the query param if so
    //link: "/smart-templates",
    link: 'https://userguide.hostbuddy.ai/messaging-overview/smart-templating'
  },
  {
    title: "Upsells",
    description: "See how HostBuddy can pay for itself by offering your guests extension discounts when there are vacant nights between bookings.",
    //link: "/inbox/upsells",
    link: 'https://userguide.hostbuddy.ai/messaging-overview/upsells'
  },
  {
    title: "Optimize HostBuddy's responses",
    // description: "Best practices for iteratively testing and improving HostBuddy's responses for your property, ensuring every potential issue is covered.",
    // description: "Ensure every potential issue is covered using these best practices for structuring and improving the knowledge base.",
    description: "A quick guide to best practices for structuring and improving the knowledge base, ensuring every potential issue is covered.",
    //link: "/best-practices",
    link: 'https://userguide.hostbuddy.ai/detailed-setup-instructions/build-your-property-profiles'
  },
];

const connectYourPMS = "connectYourPMS";
const importYourProperties = "importYourProperties";
const test = "test";
const goLive = "goLive";
const allType = { connectYourPMS, importYourProperties, test, goLive };
const GetStarted = () => {
  // const [modalShow, setModalShow] = useState({type: false, interFaceShow: ""});

  const mainTileLinks = {
    connectYourPMS: "https://userguide.hostbuddy.ai/quick-start/1-connect-your-pms",
    importYourProperties: "https://userguide.hostbuddy.ai/quick-start/2-import-your-properties",
    test: "https://userguide.hostbuddy.ai/quick-start/3-test",
    goLive: "https://userguide.hostbuddy.ai/quick-start/4-go-live",
  }

  // Factor out the onClick handler into a function
  const handleTileClick = (interFaceShow) => {
    //setModalShow({ type:true, interFaceShow, allType });
    window.open(mainTileLinks[interFaceShow], '_blank');
  };

  return (
    <>
      <div className="get_started">
        <Container>
          <Row className="mt-5">
            <Col lg={12}>
              <h3 style={{ marginBottom: "30px", marginTop: "15px" }} className="samsung-bold text-white fs-1">
                Welcome to HostBuddy!
              </h3>
              <p className="color-light-grey text-white fs-6">
                Click the tiles below to get up and running in no time!
              </p>
            </Col>

            <div className="new-get row">
              <div className="col-lg-6 ">
                <div
                  className="px-4 py-3 border border-primary rounded-15 d-flex mainCursor flex-column link_card_box"
                  onClick={() => handleTileClick(connectYourPMS)}
                >
                  <div className="icon-con ">
                    <h2>1</h2>
                    <div className="icon-right">
                      <span>Connect your PMS</span>
                      <img src={IconOne} alt="" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 ">
                <div
                  className="px-4 py-3 border mainCursor border-primary rounded-15 d-flex flex-column link_card_box"
                  onClick={() => handleTileClick(importYourProperties)}>
                  <div className="icon-con ">
                    <h2>2</h2>
                    <div className="icon-right">
                      <span>Import your Properties</span>
                      <img src={IconTwo} alt="" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 ">
                <div
                  className="px-4 py-3 border mainCursor border-primary rounded-15 d-flex flex-column link_card_box"
                  onClick={() => handleTileClick(test)}>
                  <div className="icon-con ">
                    <h2>3</h2>
                    <div className="icon-right">
                      <span>Test</span>
                      <img src={IconThree} alt="" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 ">
                <div
                  className="px-4 py-3 border border-primary mainCursor rounded-15 d-flex flex-column link_card_box "
                  onClick={() => handleTileClick(goLive)}>
                  <div className="icon-con">
                    <h2>4</h2>
                    <div className="icon-right">
                      <span>Go Live</span>
                      <img src={IconFour} alt="" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* <GetStartConnect show={modalShow} onHide={() => setModalShow(false)}/> */}
          </Row>
          <Row style={{ marginTop: "50px", marginBottom: "100px" }}>
            <Col lg={12} className="mx-auto">
              <h3 className="fw-bold text-white fs-1 mb-4">
                Explore <strong>HostBuddy's Features</strong>
              </h3>
              {/* <p className="mb-3 fw-bold text-white fs-6">HostBuddy is packed with features that make it easy for you to automate your short term rental business. Read on to learn how to make the most of your AI companion.</p> */}
              <p className="mb-3 fw-bold text-white fs-6">
                HostBuddy is packed with features that make it easy for you to automate your short term rental business and drive more revenue. Check them out below.
              </p>
            </Col>
            <Col lg={12} className="mb-3 mb-md-5 mt-5">
              <div className="get_started_featured">
                {featureData.map((feature, index) => (
                  <React.Fragment key={index}>
                    {/* <Link to={feature.link} key={index} className="px-4 py-3 border border-primary rounded-15 d-flex flex-column link_card_box"> */}
                    <a href={feature.link} target="_blank" className="px-4 py-3 border border-primary rounded-15 d-flex flex-column link_card_box">
                      <span className="border-bottom mb-4 border-primary text-primary fs-6 fw-bold link-title">
                        {feature.title}
                        <FaArrowRightLong className="ms-1" />
                      </span>
                      <span className="text-white fs-6 fw-bold">
                        {feature.description}
                      </span>
                    </a>
                    {/* </Link> */}
                  </React.Fragment>
                ))}
                <div className="more-coming-soon-box">
                  <p style={{ fontSize: "24px", color: "rgb(128, 128, 128)" }}>
                    More coming soon!
                  </p>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <HostDaddy />
    </>
  );
};

export default GetStarted;
