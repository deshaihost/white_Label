import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import "./GetStarted.css";
import { Link } from "react-router-dom";
import { FaArrowRightLong } from "react-icons/fa6";
import Pimg from "../../public/img/properties_steps.jpg";

const featureData = [
  {
    title: "Get Connected",
    description: "HostBuddy intelligently identifies issues and action items, and can notify your team through various channels.",
    link: "/setup-guide",
  },
  {
    title: "Guest Relay for Hosts",
    description: "HostBuddy will check with you when it has identified a matter that requires your attention. Instruct HostBuddy how to respond, directly from the notification.",
    link: "/setup-guide",
  },
  {
    title: "Vacant Night Upsells",
    description: "See how HostBuddy can pay for itself by proactively offering your guests extension discounts for vacant nights created by minimum stay requirements.",
    link: "/setup-guide",
  },
  {
    title: "Test and Optimize HostBuddy's responses",
    description: "Best practices for iteratively testing and improving HostBuddy's responses for your property, ensuring every potential issue is covered.",
    link: "/setup-guide",
  },
];

const GetStarted = () => {
  return (
    <>
      <div className="get_started">
        <Container>
          <Row className="mt-5">
            
            <Col lg={12}>
              <h3 className="text-center fw-bold text-white fs-1 mb-4">
                Welcome to HostBuddy!
              </h3>
              <p className="mb-5 text-center fw-bold text-white fs-6">
                Thanks for choosing HostBuddy as your copilot for your short-term rental business! You can add your properties and test HostBuddy as much as you'd like before you begin your subscription. Follow these quick steps and you'll be up and running in no time.
              </p>
            </Col>
            
            <Col lg={12} className="mb-3 mb-md-5">
              <div className="border border-primary p-3 p-md-5 rounded-15 welcome_steps step_1">
                <div>
                  <img src={Pimg} className="img-fluid" alt="" />
                </div>
                <div>
                  <h3 className="text-white mb-3 fs-4 fw-bold">1. Connect your PMS</h3>
                  <p className="text-white fs-6 fw-bold mb-5">Go to the Properties page and select "PMS Integration" to link your PMS. If you don't have a PMS, you can skip this step.</p>
                  <Link to="/properties" className=" d-flex justify-content-end align-items-center gap-1 properties_link border-primary border-bottom">
                    Get Connected
                    <FaArrowRightLong />
                  </Link>
                </div>
              </div>
            </Col>

            <Col lg={12}>
              <div className="border border-primary p-3 p-md-5 rounded-15 welcome_steps step_2">
                <div>
                  <h3 className="text-white mb-3 fs-4 fw-bold">2. Add your Properties</h3>
                  <p className="text-white fs-6 fw-bold mb-3">If you've added a PMS, select "Import Properties" from the Properties page. Choose your listings to copy into HostBuddy. Property details and live guest data will be automatically imported.</p>
                  <p className="text-white fs-6 fw-bold mb-3">If you haven't added a PMS, add a property by clicking the pencil next to the blank listing.</p>
                  <Link to="/properties" className=" d-flex justify-content-end align-items-center gap-1 properties_link border-primary border-bottom">
                    Let's Go
                    <FaArrowRightLong />
                  </Link>
                </div>
                <div>
                  <img src={Pimg} className="img-fluid" alt="" />
                </div>
              </div>
            </Col>

          </Row>
          <Row className="mt-5">
            <Col lg={12}>
              <h3 className="text-center fw-bold text-white fs-1 mb-4">
                That's it!
              </h3>
              <p className="mb-3 text-center fw-bold text-white fs-6">You now have state of the art technology doing the heavy lifting for you. Welcome to the future of hosting!</p>
              <p className="mb-5 text-center fw-bold text-white fs-6">HostBuddy is packed with features that make it easy for you to automate your short term rental business. We recommend you take five minutes to watch our features overview and learn about everything HostBuddy can do.</p>
            </Col>
            <Col lg={8} md={12} className="mb-3 mb-md-5  mx-auto">
              <div>
                <img src={Pimg} className="img-fluid" alt="" />
              </div>
            </Col>
          </Row>
          <Row className="my-5">
            <Col lg={12}>
              <h3 className="text-center fw-bold text-white fs-1 mb-4">Get started with HostBuddy's features</h3>
            </Col>
            <Col lg={12} className="mb-3 mb-md-5 mt-5">
              <div className="get_started_featured">
                {featureData.map((feature, index) => (
                  <Link to={feature.link} key={index} className="px-4 py-3 border border-primary rounded-15 d-flex flex-column link_card_box">
                    <span className="border-bottom mb-4 border-primary text-primary fs-6 fw-bold link-title">
                      {feature.title}
                      <FaArrowRightLong className="ms-1" />
                    </span>
                    <span className="text-white fs-6 fw-bold">
                      {feature.description}
                    </span>
                  </Link>
                ))}
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default GetStarted;
