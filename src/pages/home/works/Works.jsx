import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import "./works.css";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import TemplatedMessages from "../../../helper/staticImage/homePage/Templated-messages.webp";
import Schedule from "../../../helper/staticImage/homePage/schdule.webp";
import FeOne from "../../../helper/staticImage/homePage/feature-logo/fe-1.webp";
import FeTwo from "../../../helper/staticImage/homePage/feature-logo/fe-2.webp";
import FeThree from "../../../helper/staticImage/homePage/feature-logo/fe-3.webp";
import FeFour from "../../../helper/staticImage/homePage/feature-logo/fe-4.webp";
import FeFive from "../../../helper/staticImage/homePage/feature-logo/fe-5.webp";

import Seamless from "../../../helper/staticImage/homePage/seamless.webp";

import ItemOne from "../../../helper/staticImage/homePage/trusted-logo/item-1.webp";
import ItemTwo from "../../../helper/staticImage/homePage/trusted-logo/item-2.webp";
import ItemThree from "../../../helper/staticImage/homePage/trusted-logo/item-3.webp";
import ItemFour from "../../../helper/staticImage/homePage/trusted-logo/item-4.webp";
import ItemFive from "../../../helper/staticImage/homePage/trusted-logo/item-5.webp";
import ItemSix from "../../../helper/staticImage/homePage/trusted-logo/item-6.webp";
import ItemSeven from "../../../helper/staticImage/homePage/trusted-logo/item-7.webp";
import ItemEight from "../../../helper/staticImage/homePage/trusted-logo/item-8.webp";
import ItemNine from "../../../helper/staticImage/homePage/trusted-logo/item-9.webp";
import { HiChatBubbleLeftRight } from "react-icons/hi2";
import { Ri24HoursFill } from "react-icons/ri";
import { FaRegClock, FaSackDollar } from "react-icons/fa6";

import ClientOne from "../../../helper/staticImage/homePage/whatTheCommunityIsSaying/client1.webp";
import ClientTwo from "../../../helper/staticImage/homePage/whatTheCommunityIsSaying/client2.webp";
import ClientThree from "../../../helper/staticImage/homePage/whatTheCommunityIsSaying/client3.webp";
import ClientFour from "../../../helper/staticImage/homePage/whatTheCommunityIsSaying/client4.webp";

const imageTrustedLogo = [
  ItemOne,
  ItemTwo,
  ItemThree,
  ItemFour,
  ItemFive,
  ItemSix,
  ItemSeven,
  ItemEight,
  ItemNine,
];

const imageFeatureLogo = [FeOne, FeTwo, FeThree, FeFour, FeFive];

const AssistantImg = "https://hostbuddylb.com/home/assistant.webp";
const IntegrationsImg =
  "https://hostbuddylb.com/home/integrations_works_crop.webp";
const PropertyWithAmenitiesImg =
  "https://hostbuddylb.com/home/property_with_amenities.webp";
const lateNightBot = "https://hostbuddylb.com/home/empty_desk_night.webp";

const cleaningManagement =
  "https://storage.googleapis.com/frontend_media/home-new/Cleaning%20Management%20Software%20Integrations%20(coming%20soon).webp";
const stayInCharge =
  "https://storage.googleapis.com/frontend_media/home-new/stay%20in%20control.webp";
const teamSpecific =
  "https://storage.googleapis.com/frontend_media/home-new/Team%20Specific%20Notifications%20(coming%20soon).webp";
const vacantNight =
  "https://storage.googleapis.com/frontend_media/home-new/Vacant%20Night%20Upsells%20(coming%20soon).webp";
const stayInformed =
  "https://storage.googleapis.com/frontend_media/home-new/Stay%20Informed.webp";
const schedule =
  "https://storage.googleapis.com/frontend_media/home-new/Schedule%20Based%20On%20Your%20Needs%20(1).webp";
const unlimitedTesting =
  "https://storage.googleapis.com/frontend_media/home-new/Test%20Before%20You%20Subscribe.webp";
const robustCustomization =
  "https://storage.googleapis.com/frontend_media/home-new/Customized%20Representation.webp";
const seamlessPropertySetup =
  "https://storage.googleapis.com/frontend_media/home-new/Seamless%20Property%20Setup.webp";
const industryLeadingAI =
  "https://storage.googleapis.com/frontend_media/home-new/Industry%20Leading%20AI.webp";
const SmartTemlating =
  "https://storage.googleapis.com/frontend_media/home-new/ReviewRequest.webp";
const actionItemsScreen =
  "https://storage.googleapis.com/frontend_media/home-new/action_items_screen.webp";
const inboxScreen =
  "https://storage.googleapis.com/frontend_media/home-new/inbox_screen.webp";
const reviewRemovalScreen =
  "https://storage.googleapis.com/frontend_media/home-new/review_removal_screen.webp";
const statistics =
  "https://storage.googleapis.com/frontend_media/home-new/statistics.webp";

const Works = () => {
  var settingsf = {
    dots: false,
    arrows: false,
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 0,
    speed: 8000,
    cssEase: "linear",
    infinite: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
 
  return (
    <section className="works">
      {/* <div className="works-heading">
        <Container>
          <div className="speed-circle"></div>
          <h2>
            Features
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="19"
              height="18"
              viewBox="0 0 19 18"
              fill="none"
            >
              <path
                d="M9.5 0L10.7092 7.79085L18.5 9L10.7092 10.2092L9.5 18L8.29085 10.2092L0.5 9L8.29085 7.79085L9.5 0Z"
                fill="url(#paint0_linear_27_486)"
              ></path>
              <path
                d="M15.5 12L16.094 14.406L18.5 15L16.094 15.594L15.5 18L14.906 15.594L12.5 15L14.906 14.406L15.5 12Z"
                fill="url(#paint1_linear_27_486)"
              ></path>
              <defs>
                <linearGradient
                  id="paint0_linear_27_486"
                  x1="9.5"
                  y1="0"
                  x2="9.5"
                  y2="18"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#F9FBFF"></stop>
                  <stop offset="1" stopColor="#6CA7FF"></stop>
                </linearGradient>
                <linearGradient
                  id="paint1_linear_27_486"
                  x1="15.5"
                  y1="12"
                  x2="15.5"
                  y2="18"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#F9FBFF"></stop>
                  <stop offset="1" stopColor="#6CA7FF"></stop>
                </linearGradient>
              </defs>
            </svg>
          </h2>
        </Container>
      </div> */}
      <Container>
        <div className="works-container">
          <div className="row">
            <div className="col-lg-6">
              <div className="works-content">
                <h3>
                  <strong>Industry-Leading</strong> AI Technology
                </h3>
                <p>
                  HostBuddy is built with effective guest communication at the
                  core of its design, using the most advanced AI available
                  today. It is trained to be conversational, solution-focused,
                  and perhaps most importantly, to sound like a human.
                </p>
                <Link to="/ai-messaging">Learn More &#8594;</Link>
              </div>
            </div>
            <div className="col-lg-6">
              <img src={lateNightBot} alt="works-img" />
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <h2 className="fs-1 fw-bold text-white mb-5 text-center">
                Featured on
              </h2>
            </div>
            <div className="col-lg-12">
              <div className="d-flex align-items-center justify-content-between gap-3 feature-logo-box">
                {imageFeatureLogo?.map((images) => {
                  return (
                    <div>
                      <img
                        src={images}
                        alt="feature-img"
                        className="img-fluid w-100 h-100 mw-100 mh-100 rounded-0"
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-6">
              <div className="works-content">
                <h3>
                  <strong>Seamless</strong> Property Setup with Autofill
                </h3>
                <p>
                  Set up all your properties in minutes by simply connecting
                  your property management system. HostBuddy does the legwork
                  for you by extracting information from existing welcome
                  documents, listing information, past conversations, or any
                  other available resources to automatically create an organized
                  database used to support your guests.
                </p>
              </div>
            </div>
            <div className="col-lg-6">
              <img
                src={Seamless}
                className="img-fluid object-fit-contain"
                style={{ objectFit: "contain" }}
                alt="works-img"
              />
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <h2 className="fs-1 fw-bold text-white mb-5 text-center">
                Trusted by leading Property Managers
              </h2>
            </div>
            <div className="col-lg-12">
              <div>
                <Slider {...settingsf}>
                  {imageTrustedLogo?.map((images) => {
                    return (
                      <div className="outline-0 trusted-logo-box">
                        <img
                          src={images}
                          alt="works-img"
                          className="img-fluid w-100 h-100"
                        />
                      </div>
                    );
                  })}
                </Slider>
              </div>
            </div>
          </div>

          <div className="row pt-4">
            <div className="col-lg-6">
              <div className="works-content">
                <h3>
                  Templated Messages <strong>For Everything</strong>
                </h3>
                <p>
                  Automate everything with HostBuddy's ultra robust templated
                  messaging system, enhanced with AI. Target the right guests at
                  the right time to boost guest satisfaction and earn more
                  revenue. <Link to="/smart-templates">Learn More &#8594;</Link>
                </p>
              </div>
            </div>
            <div className="col-lg-6">
              <img
                src={TemplatedMessages}
                style={{ objectFit: "contain" }}
                alt="works-img"
              />
            </div>
          </div>
          <div className="row align-items-center justify-content-center">
            <div className="col-lg-3 col-md-6 col-sm-12 mb-3">
              <div
                className="bg-primary p-4 text-white w-100 h-full d-flex flex-column gap-2 mx-3"
                style={{ borderRadius: "20px" }}
              >
                <FaRegClock className="fs-1" />
                <div className="d-flex align-items-end gap-1">
                  <h2 className="fs-2 fw-bold mb-0">22</h2>
                  <span className="fs-6">hours</span>
                </div>
                <p className="text-white fs-5 mb-0">
                  Average Hours of AI Coverage Per User
                </p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-12 mb-3">
              <div
                className="bg-primary p-4 text-white w-100 h-full d-flex flex-column gap-2 mx-3"
                style={{ borderRadius: "20px" }}
              >
                <HiChatBubbleLeftRight className="fs-1" />
                <div className="d-flex align-items-end gap-1">
                  <h2 className="fs-2 fw-bold mb-0">500,000</h2>
                  <span className="fs-6 ">
                    <i class="bi bi-plus"></i>
                  </span>
                </div>
                <p className="text-white fs-5 mb-0">
                  Total Messages Processed by HostBuddy
                </p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-12 mb-3">
              <div
                className="bg-primary p-4 text-white w-100 h-full d-flex flex-column gap-2 mx-3"
                style={{ borderRadius: "20px" }}
              >
                <Ri24HoursFill className="fs-1" />
                <div className="d-flex align-items-end gap-1">
                  <h2 className="fs-2 fw-bold mb-0">88%</h2>
                  <span className="fs-6">of active users</span>
                </div>
                <p className="text-white fs-5 mb-0">
                  Schedule AI for 24/7 Coverage
                </p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-12 mb-3">
              <div
                className="bg-primary p-4 text-white w-100 h-full d-flex flex-column gap-2 mx-3"
                style={{ borderRadius: "20px" }}
              >
                <FaSackDollar className="fs-1" />
                <div className="d-flex align-items-end gap-1">
                  <span className="fs-6">over</span>
                  <h2 className="fs-2 fw-bold mb-0">92%</h2>
                </div>
                <p className="text-white fs-5 mb-0">
                  More Cost Effective than Human Coverage
                </p>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-6">
              <div className="works-content">
                <h3>
                  <strong>Smart</strong> Inbox
                </h3>
                <p>
                  Centralize your inbox with HostBuddy to manage all your guest
                  communications in one place. Our smart inbox brings
                  industry-leading AI technology right to your fingertips,
                  allowing you to generate AI responses and view valuable
                  insights into each guest's stay through conversational
                  analysis. Filter messages by urgency, take the wheel when you
                  need to be involved, and review HostBuddy conversations all in
                  one place.
                </p>
              </div>
            </div>
            <div className="col-lg-6">
              <img
                className="mw-100 mh-100"
                src={inboxScreen}
                alt="works-img"
              />
            </div>
          </div>

          <div className="row">
            <div className="col-lg-6">
              <div className="works-content">
                <h3>
                  Schedule Based On <strong>Your Needs</strong>
                </h3>
                <p>
                  Lockouts, late-night messages, and issue troubleshooting are a
                  thing of the past for our users. HostBuddy can be scheduled to
                  fit your specific coverage needs, automating communication
                  anytime you need support.
                </p>
              </div>
            </div>
            <div className="col-lg-6">
              <img
                src={Schedule}
                style={{ objectFit: "contain" }}
                alt="works-img"
              />
            </div>
          </div>

          <div className="row">
            <div className="col-lg-12">
              <h2 className="fs-1 fw-bold text-white mb-5 text-center">
                What the Community is Saying
              </h2>
            </div>
            <div className="col-lg-3">
              <div className=" testimonial-slider">
                <div className="testimonial-item p-3">
                  <p className="client-comment">
                    “This does a lot of stuff! We all want to cut down on
                    active work time in any business. Add it to your tech
                    stack!”
                  </p>
                  <span className="client-img">
                    <img src={ClientOne} alt="" />
                  </span>
                  <p className="client-name">Avery Carl</p>
                  <span className="client-position">
                    3x Best Selling Author, CEO/Founder of The Short Term Shop
                  </span>
                </div>
              </div>
            </div>
            <div className="col-lg-3">
              <div className="testimonial-slider">
              <div className="testimonial-item  p-3">
                    <p className="client-comment">
                      “The AI will remember all the little details about each
                      individual property and the quirks that it has. That is
                      game changing.”
                    </p>
                    <span className="client-img">
                      <img src={ClientTwo} alt="" />
                    </span>
                    <p className="client-name">Jeff Brown</p>
                    <span className="client-position">Intellihost Founder</span>
                  </div>
              </div>
            </div>
            <div className="col-lg-3">
              <div className=" testimonial-slider">
                  <div className="testimonial-item  p-3">
                    <p className="client-comment">
                      “One of the coolest things I’ve seen” “I’m honestly blown
                      away by all the different things this tool is able to do”
                    </p>
                    <span className="client-img">
                      <img src={ClientThree} alt="" />
                    </span>
                    <p className="client-name">Tony Robinson</p>
                    <span className="client-position">
                      The Real Estate Robinsons, Bigger Pockets Podcast Host
                    </span>
                  </div>
              </div>
            </div>
            <div className="col-lg-3">
              <div className=" testimonial-slider">
                  <div className="testimonial-item  p-3">
                    <p className="client-comment">
                      “One of the most important tools in your kit for 2025!”
                    </p>
                    <span className="client-img">
                      <img
                        src={ClientFour}
                        alt=""
                      />
                    </span>
                    <p className="client-name">Mark Simpson</p>
                    <span className="client-position">Boostly Founder</span>
                  </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-6">
              <div className="works-content">
                <h3>
                  <strong>Stay Informed</strong> With Updates From HostBuddy
                </h3>
                <p>
                  HostBuddy analyzes each conversation, identifies issues and
                  action items, and brings them to your attention so you can see
                  what’s important at a glance. Have HostBuddy send action items
                  directly to certain members of your team using advanced
                  categorization. You can receive these updates through text,
                  email, or Slack integration to stay in the loop.
                </p>
              </div>
            </div>
            <div className="col-lg-6">
              <img src={stayInformed} alt="works-img" />
            </div>
          </div>

          <div className="row">
            <div className="col-lg-6">
              <div className="works-content">
                <h3>
                  <strong>Issue Tracking</strong> and Management
                </h3>
                <p>
                  Use the action items page to track issues requiring attention
                  at your properties. Filter by categories such as maintenance,
                  cleanliness, guest requests, and more to manage your team
                  efficiently. Add notes as you work to resolve issues, and
                  create your own action items to centralize the management of
                  your operations. Mark items as resolved upon completion, and
                  review past items to identify trends.
                </p>
              </div>
            </div>
            <div className="col-lg-6">
              <img src={actionItemsScreen} alt="works-img" />
            </div>
          </div>

          <div className="row">
            <div className="col-lg-6">
              <div className="works-content">
                <h3>
                  Test <strong>Before</strong> You Subscribe
                </h3>
                <p>
                  Set up your properties and simulate test messages without a
                  subscription. Test as much as you'd like before even beginning
                  your free trial.
                </p>
              </div>
            </div>
            <div className="col-lg-6">
              <img src={unlimitedTesting} alt="works-img" />
            </div>
          </div>

          {/*
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="works-content">
                                <h3><strong>Grounded</strong> Responses</h3>
                                <p>Don’t stress about hallucinations - HostBuddy is meticulously designed to respond based only on your property details, and can explain each response to ensure transparency.</p>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <img src={groundedResponses} alt='works-img' />
                        </div>
                    </div>
                    */}

          <div className="row">
            <div className="col-lg-6">
              <div className="works-content">
                <h3>
                  <strong>Robust</strong> Customization
                </h3>
                <p>
                  With advanced customization options, HostBuddy is designed for
                  maximum flexibility to fit the needs of your business, no
                  matter how complicated they may be. You can set behavior and
                  tone to your likings, and you're always in full control of
                  HostBuddy's knowledge base.
                </p>
              </div>
            </div>
            <div className="col-lg-6">
              <img src={robustCustomization} alt="works-img" />
            </div>
          </div>

          <div className="row">
            <div className="col-lg-6">
              <div className="works-content">
                <h3>
                  <strong>Business Insights</strong> You've Never Seen Before
                </h3>
                <p>
                  AI-driven analysis of your guest messaging lets you unlock a
                  wealth of new insights into your business. Guest satisfaction
                  levels, message timing, and more are available to you at a
                  glance to help you make data-driven decisions.
                </p>
              </div>
            </div>
            <div className="col-lg-6">
              <img src={statistics} alt="works-img" />
            </div>
          </div>

          <div className="row">
            <div className="col-lg-6">
              <div className="works-content">
                <h3>
                  <strong>Directed Responses</strong> with Slack
                </h3>
                <p>
                  HostBuddy will notify you when a guest message requires action
                  or decision making beyond its capability. Respond directly to
                  the notification to make the final call, and HostBuddy will
                  send the appropriate response to the guest based on your
                  guidance.
                </p>
              </div>
            </div>
            <div className="col-lg-6">
              <img src={stayInCharge} alt="works-img" />
            </div>
          </div>

          <div className="row">
            <div className="col-lg-6">
              <div className="works-content">
                <h3>
                  <strong>Review Removal</strong> Support
                </h3>
                <p>
                  Use review analysis to identify which reviews may violate OTA
                  policies and request the removal of less favorable reviews.
                  Generate and send reports written by HostBuddy AI to expedite
                  the review removal process.
                </p>
              </div>
            </div>
            <div className="col-lg-6">
              <img src={reviewRemovalScreen} alt="works-img" />
            </div>
          </div>

          <div className="row">
            <div className="col-lg-6">
              <div className="works-content">
                <h3>
                  Cleaning Management Software <strong>Integrations</strong>
                </h3>
                <p>
                  Keep HostBuddy informed about when your properties are ready
                  for check-in. Pull updates directly from your cleaning
                  management systems to allow for early check-ins when they are
                  available.
                </p>
              </div>
            </div>
            <div className="col-lg-6">
              <img src={cleaningManagement} alt="works-img" />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Works;
