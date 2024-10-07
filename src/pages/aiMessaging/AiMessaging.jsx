import React from "react";
import TestShowConvIndex from "../testShowConversations/TestShowConvIndex";
import NightHouse from "../../helper/staticImage/night-house.webp";
import "./AiMessaging.css";
import Clock from "../../helper/staticImage/clock.webp";
import TwentyFour from "../../helper/staticImage/24 hours.webp";
import Money from "../../helper/staticImage/money-bag.webp";

import TryItOutCTA from "../home/tryItOut/tryItOut";


const AiMessaging = () => {
  return (
    <div className="ai-messaging">
      <div className="unmatched">
        <div className="container">
          <h2>
            <span>Unmatched </span>Natural Conversation
          </h2>
          <div className="row first-section">
            <div className="col-lg-7">
              <p>HostBuddy's greatest strength is the quality and fluency of its responses. We've spent countless hours optimizing HostBuddy for natural-sounding conversation, critical thinking, effective troubleshooting, and grounded responses and behavior.</p>
              <p>We pride ourselves in providing the most fluent AI communication in short-term rentals, achieving performance and trust that is unprecedented in the industry.</p>
            </div>
            <div className="col-lg-5 blur-background-top-left">
              <img src={NightHouse} alt=" " />
            </div>
          </div>
          <div className="trust">
            <h2>
              <span className="color-change">Proven Trust. </span>Real Benefits.
            </h2>
            <h4>
              <span className="color-change">Millions</span> of total property hours covered.
            </h4>
          </div>
          <div className="row icon-row">
            <div className="col-lg-2 col-md-2">
              <div className="icon-img">
                <img src={Clock} alt="" />
              </div>
            </div>
            <div className="col-lg-10 col-md-10">
              <div className="icon-boc-con">
                <h2>
                  <span className="color-change">20 hours </span>per day
                </h2>
                <p>Average hours of AI coverage per day for our active properties.</p>
              </div>
            </div>
            <div className="col-lg-10 col-md-10 text-right right-icon-side">
              <div className="icon-boc-con">
                <h2>
                  <span className="color-change">70%</span> of active users
                </h2>
                <p>Schedule AI coverage for 24 hours a day for their properties.</p>
              </div>
            </div>
            <div className="col-lg-2 col-md-2 mobile-order">
              <div className="icon-img">
                <img src={TwentyFour} alt="" />
              </div>
            </div>
            <div className="col-lg-2 col-md-2">
              <div className="icon-img">
                <img src={Money} alt="" />
              </div>
            </div>
            <div className="col-lg-10 col-md-10">
              <div className="icon-boc-con">
                <h2>Over  <span className="color-change">92% </span>more cost-effective</h2>
                <p>Than human coverage.</p>
              </div>
            </div>
          </div>
          <div className="see-what">
            <h2>See what <span>HostBuddy</span> Can Do</h2>
            <p>Check out some of HostBuddy's conversations with real guests </p>
          </div>
        </div>
      </div>
      <TestShowConvIndex titles={['24 Hour Troubleshooting', 'Inquiry Handling', 'Smart Deferral']}/>
      <TryItOutCTA />
    </div>
  );
};

export default AiMessaging;
