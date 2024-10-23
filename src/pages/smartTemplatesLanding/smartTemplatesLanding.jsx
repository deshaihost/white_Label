import React, {useState} from "react";
import NightHouse from "../../helper/staticImage/night-house.webp";
import "./smartTemplatesLanding.css";
import { Helmet } from 'react-helmet';

import SendWhenIfTile from "./sendWhenIfTiles/sendWhenIfTiles";
import ConditionsModal from "./modals/conditionsModal";
// import AiExamplesModal from "./modals/aiExamplesModal";


const SmartTemplatesLanding = () => {

  const [showConditionsModal, setShowConditionsModal] = useState(false);
  const [showAiExamplesModal, setShowAiExamplesModal] = useState(false);

  // sendWheIfTiles content
  const title1 = "Post-Stay Review Request";
  const topTextArray1 = ["After the reservation:", "0 days after at 3:30pm."];
  const bottomTextArray1 = ["Guest sentiment is positive."];

  const title2 = "Early Check-In Ready Message";
  const topTextArray2 = ["After pre-stay cleaning is complete."];
  const bottomTextArray2 = ["Check-in is today;", "Time of day is 12:00AM - 4:00PM."];

  const title3 = "Pet Policy Reminder";
  const topTextArray3 = ["Before the reservation:", "1 day before at 2:00pm."];
  const bottomTextArray3 = ["Pet count is 1 or greater."];

  const title4 = "Trash Day Reminder";
  const topTextArray4 = ["Every Monday at 8:00am."];
  const bottomTextArray4 = ['Reservation status is "current".'];

  const handleShowModalClick = (event, setShowFunct) => {
    event.preventDefault();
    setShowFunct(true);
  };

  return (
    <div className="smart-templates-landing">
      <Helmet>
        <title>HostBuddy AI: Natural AI Conversations for Short-Term Rentals</title>
        <meta name="title" content="HostBuddy AI: AI-powered templated messaging for Short-Term Rentals" />
        <meta name="description" content="Discover HostBuddy AI's unmatched natural conversation capabilities for short-term rentals. Benefit from 24/7 AI coverage and cost-effective property management." />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="../../helper/staticImage/night-house.webp" />
        <meta property="og:title" content="HostBuddy AI: AI-powered templated messaging for Short-Term Rentals" />
        <meta property="og:description" content="Discover HostBuddy AI's unmatched natural conversation capabilities for short-term rentals. Benefit from 24/7 AI coverage and cost-effective property management." />
        <meta property="og:image" content="../../helper/staticImage/night-house.webp" />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="../../helper/staticImage/night-house.webp" />
        <meta property="twitter:title" content="HostBuddy AI: AI-powered templated messaging for Short-Term Rentals" />
        <meta property="twitter:description" content="Discover HostBuddy AI's unmatched natural conversation capabilities for short-term rentals. Benefit from 24/7 AI coverage and cost-effective property management." />
        <meta property="twitter:image" content="../../helper/staticImage/night-house.webp" />
        <link rel="canonical" href="https://www.hostbuddy.ai/smart-templates" />
      </Helmet>
      <div className="unmatched">
        <div className="container">
          <h1>Templated Messages <span>For Everything</span>.</h1>
          <h4>Supercharged with AI.</h4>
          <div className="row first-section">
            <div className="col-lg-5 blur-background-top-left blur-background-bottom-right">
              <img src={NightHouse} alt=" " />
            </div>
            <div className="col-lg-7">
              <p>HostBuddy provides the most advanced templated messaging support in short-term rentals. Target any subset of your guests by choosing from a multitude of timing options and conditions. Use AI to bring context awareness and a human-like touch to your messages.</p>
              <p>Smart Templates makes it easy for you to set up automations that earn you value. Automate strategic upsells that make money, timely check-ins that make your guests feel special, and so much more.</p>
            </div>
          </div>
          <div className="trust">
            <h2>
              How It <span className="color-change">Works</span>
            </h2>
            {/*
            <h4>
              <span className="color-change">Millions</span> of total property hours covered.
            </h4>
            */}
          </div>
          <div className="steps-container">
            <div className="row">
              <div className="col-lg-7 col-md-7 left-column">
                <div className="icon-boc-con" style={{marginTop:'0px'}}>
                  <h2>1. <span className="color-change">Compose</span></h2>
                  <p>Write your message, and add variables to match the data for each reservation.</p>
                </div>
                <div className="icon-boc-con">
                  <h2>2. <span className="color-change">Target</span></h2>
                  <p>Choose from a myriad of conditions and parameters to narrow down on the specific set of guests you want to message. <a href="#" onClick={(e) => handleShowModalClick(e, setShowConditionsModal)}>See all the conditions</a> you can target by.</p>
                </div>
                <div className="icon-boc-con">
                  <h2>3. <span className="color-change">Schedule</span></h2>
                  <p>Schedule for anytime before, during, or after the guest’s reservation; a specific weekday or calendar date; or when a specific event happens, such as a booking.</p>
                </div>
                <div className="icon-boc-con">
                  <h2>4. Enable <span className="color-change">AI</span></h2>
                  <p>HostBuddy can use AI stop your message from sending if it is not relevant to a guest or not contextually appropriate - for example, if you’re asking a guest to leave a review when they already told you they have.</p>
                  {/* <p>HostBuddy can also use AI to personalize each message to each guest, making it sound less like a robotic templated message and more like a more friendly, human gesture. <a href="#" onClick={(e) => handleShowModalClick(e, setShowAiExamplesModal)}>See examples</a>.</p> */}
                  <p>HostBuddy can also use AI to personalize each message to each guest, making it sound less like a robotic templated message and more like a more friendly, human gesture.</p>
                </div>
              </div>
              <div className="col-lg-5 col-md-5 right-column blur-background-top-left blur-background-bottom-right">
                <SendWhenIfTile title={title1} topTextArray={topTextArray1} bottomTextArray={bottomTextArray1} top={0} left={10} tileWidth="350px" zIndex={1} />
                <SendWhenIfTile title={title2} topTextArray={topTextArray2} bottomTextArray={bottomTextArray2} top={192} left={80} tileWidth="350px" zIndex={2} />
                <SendWhenIfTile title={title3} topTextArray={topTextArray3} bottomTextArray={bottomTextArray3} top={384} left={10} tileWidth="350px" zIndex={3} />
                <SendWhenIfTile title={title4} topTextArray={topTextArray4} bottomTextArray={bottomTextArray4} top={576} left={80} tileWidth="350px" zIndex={4} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <ConditionsModal show={showConditionsModal} handleClose={() => setShowConditionsModal(false)} />
      {/* <AiExamplesModal show={showAiExamplesModal} handleClose={() => setShowAiExamplesModal(false)} /> */}
    </div>
  );
};

export default SmartTemplatesLanding;
