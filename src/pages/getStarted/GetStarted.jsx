import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import "./GetStarted.css";
import { FaArrowRightLong } from "react-icons/fa6";
import HostDaddy from '../../component/hostDaddy/hostDaddy';
import faviconImage from "../../public/img/logo/logoGraphicOnlySquare.png";

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
              {/* Step 1: Connect your PMS */}
              <div className="col-lg-6">
                <div
                  className="px-4 py-3 border border-primary rounded-15 d-flex mainCursor flex-column link_card_box position-relative"
                  onClick={() => handleTileClick(connectYourPMS)}
                >
                  <div className="card-number">1</div>
                  <div className="card-title-top">Connect your PMS</div>
                  <div className="step-card-visual-main">
                    {/* PMS System - Cloud Server */}
                    <div className="visual-item-v2">
                      <div className="icon-wrapper-64">
                        <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
                          {/* Cloud */}
                          <path d="M48 28C48 24 45 20 40 20C40 14 35 10 28 10C21 10 16 14 16 20C11 20 8 24 8 28C8 32 11 36 16 36H48C53 36 56 32 56 28C56 24 53 20 48 20V28Z" fill="#01255e" opacity="0.3"/>
                          <path d="M48 28C48 24 45 20 40 20C40 14 35 10 28 10C21 10 16 14 16 20C11 20 8 24 8 28C8 32 11 36 16 36H48C53 36 56 32 56 28C56 24 53 20 48 20V28Z" stroke="#3e88f7" strokeWidth="2.5"/>
                          {/* Server lines */}
                          <rect x="16" y="42" width="32" height="8" rx="2" fill="#3e88f7" opacity="0.6"/>
                          <rect x="16" y="52" width="32" height="8" rx="2" fill="#3e88f7"/>
                          <circle cx="20" cy="46" r="1.5" fill="white"/>
                          <circle cx="20" cy="56" r="1.5" fill="white"/>
                        </svg>
                      </div>
                      <span className="visual-label-v2">Your PMS</span>
                    </div>
                    
                    {/* Sync Arrow */}
                    <div className="visual-arrow-v2">
                      <FaArrowRightLong style={{ width: '40px', height: '40px', color: '#3e88f7' }} strokeWidth={2.5} />
                    </div>
                    
                    {/* HostBuddy Icon */}
                    <div className="visual-item-v2">
                      <div className="hostbuddy-icon-v2">
                        <img src={faviconImage} alt="HostBuddy AI" />
                      </div>
                      <span className="visual-label-v2">HostBuddy AI</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 2: Import your Properties */}
              <div className="col-lg-6">
                <div
                  className="px-4 py-3 border mainCursor border-primary rounded-15 d-flex flex-column link_card_box position-relative"
                  onClick={() => handleTileClick(importYourProperties)}>
                  <div className="card-number">2</div>
                  <div className="card-title-top">Import your Properties</div>
                  <div className="step-card-visual-main">
                    {/* Multiple property cards */}
                    <div className="property-cards-container">
                      {/* Property card 1 */}
                      <div className="property-card-v2 card-v2-1">
                        <div className="card-header-img"></div>
                        <div className="card-text-lines">
                          <div className="text-line"></div>
                          <div className="text-line short-line"></div>
                        </div>
                      </div>
                      {/* Property card 2 */}
                      <div className="property-card-v2 card-v2-2">
                        <div className="card-header-img"></div>
                        <div className="card-text-lines">
                          <div className="text-line"></div>
                          <div className="text-line short-line"></div>
                        </div>
                      </div>
                      {/* Property card 3 */}
                      <div className="property-card-v2 card-v2-3">
                        <div className="card-header-img"></div>
                        <div className="card-text-lines">
                          <div className="text-line"></div>
                          <div className="text-line short-line"></div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="visual-arrow-v2">
                      <FaArrowRightLong style={{ width: '40px', height: '40px', color: '#3e88f7' }} strokeWidth={2.5} />
                    </div>
                    
                    {/* HostBuddy with badge */}
                    <div className="visual-item-v2">
                      <div className="hostbuddy-icon-v2 position-relative">
                        <img src={faviconImage} alt="HostBuddy AI" />
                        <div className="property-count-badge">3</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 3: Test */}
              <div className="col-lg-6">
                <div
                  className="px-4 py-3 border mainCursor border-primary rounded-15 d-flex flex-column link_card_box position-relative"
                  onClick={() => handleTileClick(test)}>
                  <div className="card-number">3</div>
                  <div className="card-title-top">Test</div>
                  <div className="step-card-visual-main">
                    {/* Chat bubbles with AI */}
                    <div className="chat-wrapper">
                      {/* User message */}
                      <div className="chat-bubble-v2 user-bubble">
                        <div className="bubble-dots">
                          <div className="bubble-dot"></div>
                          <div className="bubble-dot"></div>
                          <div className="bubble-dot"></div>
                        </div>
                      </div>
                      {/* AI response */}
                      <div className="chat-bubble-v2 ai-bubble position-relative">
                        <div className="bubble-dots">
                          <div className="bubble-dot ai-dot"></div>
                          <div className="bubble-dot ai-dot"></div>
                          <div className="bubble-dot ai-dot"></div>
                        </div>
                        {/* AI badge */}
                        <div className="ai-badge-avatar">
                          <img src={faviconImage} alt="AI" />
                        </div>
                      </div>
                    </div>
                    
                    {/* Testing checklist */}
                    <div className="test-checklist-box">
                      <div className="checklist-row">
                        <div className="check-icon completed">
                          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                            <path d="M2 5L4 7L8 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                        <div className="check-progress-line completed"></div>
                      </div>
                      <div className="checklist-row">
                        <div className="check-icon completed">
                          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                            <path d="M2 5L4 7L8 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                        <div className="check-progress-line completed"></div>
                      </div>
                      <div className="checklist-row">
                        <div className="check-icon in-progress">
                          <div className="pulse-dot-v2"></div>
                        </div>
                        <div className="check-progress-line in-progress"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 4: Go Live */}
              <div className="col-lg-6">
                <div
                  className="px-4 py-3 border border-primary mainCursor rounded-15 d-flex flex-column link_card_box position-relative"
                  onClick={() => handleTileClick(goLive)}>
                  <div className="card-number">4</div>
                  <div className="card-title-top">Go Live</div>
                  <div className="step-card-visual-main justify-content-center">
                    {/* Simple Rocket Launch SVG */}
                    <svg width="120" height="80" viewBox="0 0 120 80" fill="none">
                      {/* Rocket body */}
                      <path d="M60 15L50 35H70L60 15Z" fill="#3e88f7"/>
                      <rect x="50" y="35" width="20" height="25" rx="2" fill="#3e88f7"/>
                      {/* Window */}
                      <circle cx="60" cy="45" r="4" fill="#98bffa"/>
                      {/* Fins */}
                      <path d="M50 50L40 65L50 60Z" fill="#01255e"/>
                      <path d="M70 50L80 65L70 60Z" fill="#01255e"/>
                      {/* Flame */}
                      <path d="M55 60L52 70L60 65L68 70L65 60Z" fill="#5296f8" opacity="0.6"/>
                      <path d="M57 60L55 68L60 64L65 68L63 60Z" fill="#98bffa" opacity="0.8"/>
                      {/* Motion lines */}
                      <path d="M20 25L30 25" stroke="#3e88f7" strokeWidth="2" strokeLinecap="round" opacity="0.4"/>
                      <path d="M15 35L25 35" stroke="#3e88f7" strokeWidth="2" strokeLinecap="round" opacity="0.4"/>
                      <path d="M18 45L28 45" stroke="#3e88f7" strokeWidth="2" strokeLinecap="round" opacity="0.4"/>
                      <path d="M90 25L100 25" stroke="#3e88f7" strokeWidth="2" strokeLinecap="round" opacity="0.4"/>
                      <path d="M95 35L105 35" stroke="#3e88f7" strokeWidth="2" strokeLinecap="round" opacity="0.4"/>
                      <path d="M92 45L102 45" stroke="#3e88f7" strokeWidth="2" strokeLinecap="round" opacity="0.4"/>
                    </svg>
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
