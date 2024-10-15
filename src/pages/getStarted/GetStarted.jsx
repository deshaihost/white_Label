import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import "./GetStarted.css";
import IconOne from "../../helper/staticImage/icon1.webp";
import IconTwo from "../../helper/staticImage/icon2.webp";
import IconThree from "../../helper/staticImage/icon3.webp";
import IconFour from "../../helper/staticImage/icon4.webp";
import GetStartConnect from "./model/GetStartConnect";
const step1img =
  "https://hostbuddylb.com/get-started/1.%20Connect%20your%20PMS.webp";
const step2img =
  "https://hostbuddylb.com/get-started/2.%20Add%20your%20properties.webp";
const step3img =
  "https://hostbuddylb.com/get-started/3.%20Set%20Knowledge%20Base.webp";
const step4img = "https://hostbuddylb.com/get-started/4.%20Try%20it%20out.webp";
const step5img = "https://hostbuddylb.com/get-started/5.%20Schedule.webp";

const featureData = [
  {
    title: "Customize HostBuddy's Behavior",
    description:
      "See how HostBuddy can be tailored to suit the needs and nuances of your business.",
    link: "/inbox/preferences",
  },
  {
    title: "Get Notified",
    description:
      "HostBuddy intelligently identifies issues and action items, and can notify your team through various channels.",
    link: "/setting/notifications",
  },
  {
    title: "Vacant Night Upsells",
    description:
      "See how HostBuddy can pay for itself by proactively offering your guests extension discounts when there are vacant nights between bookings.",
    link: "/inbox/upsells",
  },
  {
    title: "Smart Review Requests",
    description:
      "HostBuddy can detect the sentiment of a guest's stay, and automatically send review requests to guests who had a positive experience.",
    link: "/inbox/smart-templates",
  },
  {
    title: "Optimize HostBuddy's responses",
    // description: "Best practices for iteratively testing and improving HostBuddy's responses for your property, ensuring every potential issue is covered.",
    // description: "Ensure every potential issue is covered using these best practices for structuring and improving the knowledge base.",
    description:
      "A quick guide to best practices for structuring and improving the knowledge base, ensuring every potential issue is covered.",
    link: "/best-practices",
  },
];

const connectYourPMS = "connectYourPMS";
const importYourProperties = "importYourProperties";
const test = "test";
const goLive = "goLive";
const allType = { connectYourPMS, importYourProperties, test, goLive };
const GetStarted = () => {
  const [modalShow, setModalShow] = useState({
    type: false,
    interFaceShow: "",
  });

  return (
    <>
      <div className="get_started">
        <Container>
          <Row className="mt-5">
            <Col lg={12}>
              <h3
                style={{ marginBottom: "30px", marginTop: "15px" }}
                className="samsung-bold text-white fs-1"
              >
                Welcome to HostBuddy!
              </h3>
              <p className="color-light-grey text-white fs-6">
                Thanks for choosing HostBuddy as your copilot for your
                short-term rental business! You can add your properties and test
                HostBuddy as much as you'd like before you begin your
                subscription. Follow these quick steps and you'll be up and
                running in no time.
              </p>
            </Col>

            <div className="new-get row">
              <div
                className="col-lg-6 mainCursor"
                onClick={() =>
                  setModalShow({
                    type: true,
                    interFaceShow: connectYourPMS,
                    allType,
                  })
                }
              >
                <div className="px-4 py-3 border border-primary rounded-15 d-flex flex-column link_card_box ">
                  <div className="icon-con">
                    <h2>1</h2>
                    <div className="icon-right">
                      <span>Connect your PMS</span>
                      <img src={IconOne} alt="" />
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="col-lg-6 mainCursor"
                onClick={() =>
                  setModalShow({
                    type: true,
                    interFaceShow: importYourProperties,
                    allType,
                  })
                }
              >
                <div className="px-4 py-3 border border-primary rounded-15 d-flex flex-column link_card_box">
                  <div className="icon-con">
                    <h2>2</h2>
                    <div className="icon-right">
                      <span>Import your Properties</span>
                      <img src={IconTwo} alt="" />
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="col-lg-6 mainCursor"
                onClick={() =>
                  setModalShow({
                    type: true,
                    interFaceShow: test,
                    allType,
                  })
                }
              >
                <div className="px-4 py-3 border border-primary rounded-15 d-flex flex-column link_card_box">
                  <div className="icon-con">
                    <h2>3</h2>
                    <div className="icon-right">
                      <span>Test</span>
                      <img src={IconThree} alt="" />
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="col-lg-6 mainCursor"
                onClick={() =>
                  setModalShow({
                    type: true,
                    interFaceShow: goLive,
                    allType,
                  })
                }
              >
                <div className="px-4 py-3 border border-primary rounded-15 d-flex flex-column link_card_box ">
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
            <GetStartConnect
              show={modalShow}
              onHide={() => setModalShow(false)}
            />
          </Row>
        </Container>
      </div>
    </>
  );
};

export default GetStarted;
