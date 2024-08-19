import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import "./GetStarted.css";
import { Link } from "react-router-dom";
import { FaArrowRightLong } from "react-icons/fa6";

const step1img = 'https://hostbuddylb.com/get-started/1.%20Connect%20your%20PMS.webp';
const step2img = 'https://hostbuddylb.com/get-started/2.%20Add%20your%20properties.webp';
const step3img = 'https://hostbuddylb.com/get-started/3.%20Set%20Knowledge%20Base.webp';
const step4img = 'https://hostbuddylb.com/get-started/4.%20Try%20it%20out.webp';
const step5img = 'https://hostbuddylb.com/get-started/5.%20Schedule.webp';

const featureData = [
  {
    title: "Customize HostBuddy's Behavior",
    description: "See how HostBuddy can be tailored to suit the needs and nuances of your business.",
    link: "/setting/conversation-preferences",
  },
  {
    title: "Get Notified",
    description: "HostBuddy intelligently identifies issues and action items, and can notify your team through various channels.",
    link: "/setting/notifications",
  },
  {
    title: "Vacant Night Upsells",
    description: "See how HostBuddy can pay for itself by proactively offering your guests extension discounts when there are vacant nights between bookings.",
    link: "/setting/upsells",
  },
  {
    title: "Smart Review Requests",
    description: "HostBuddy can detect the sentiment of a guest's stay, and automatically send review requests to guests who had a positive experience.",
    link: "/setting/upsells",
  },
  {
    title: "Optimize HostBuddy's responses",
    // description: "Best practices for iteratively testing and improving HostBuddy's responses for your property, ensuring every potential issue is covered.",
    // description: "Ensure every potential issue is covered using these best practices for structuring and improving the knowledge base.",
    description: "A quick guide to best practices for structuring and improving the knowledge base, ensuring every potential issue is covered.",
    link: "/best-practices",
  },
];

const GetStarted = () => {
  return (
    <>
      <div className="get_started">
        <Container>
          <Row className="mt-5">
            
            <Col lg={12}>
              <h3 style={{marginBottom:"30px", marginTop: "15px"}} className="text-center samsung-bold text-white fs-1">Welcome to HostBuddy!</h3>
              <p style={{marginBottom:"70px"}} className="text-center color-light-grey text-white fs-6">Thanks for choosing HostBuddy as your copilot for your short-term rental business! You can add your properties and test HostBuddy as much as you'd like before you begin your subscription. Follow these quick steps and you'll be up and running in no time.</p>
            </Col>
            
            <Col lg={12}>
              <div className="border border-primary p-3 p-md-5 rounded-15 welcome_steps step_odd">
                <img src={step1img} className="img-fluid" alt="" />
                <div className="content-container d-flex flex-column">
                  <h3 className="text-white mb-4 fs-4 samsung-bold">1. Connect your PMS</h3>
                  <p className="fs-6 color-light-grey mb-3">On the properties page, select “PMS Integration” to connect your PMS. If you do not have a PMS, please skip this step.</p>
                  <Link to="/properties" className="d-flex justify-content-end align-items-center gap-1 properties_link border-primary border-bottom mt-auto">
                    Get Connected
                    <FaArrowRightLong />
                  </Link>
                </div>
              </div>
            </Col>

            <Col lg={12}>
              <div className="border border-primary p-3 p-md-5 rounded-15 welcome_steps step_even">
                <div className="content-container d-flex flex-column">
                  <h3 className="text-white mb-4 fs-4 samsung-bold">2. Add your Properties</h3>
                  <p className="fs-6 color-light-grey mb-4">If you’ve connected your PMS, select “Import Properties”, then choose which listings you’d like to import into HostBuddy. Property details and live guest data will be automatically imported from your PMS.</p>
                  <p className="fs-6 color-light-grey mb-3">If you haven’t connected a PMS, add a property by clicking the pen icon next to the blank listing.</p>
                  <Link to="/properties" className=" d-flex justify-content-end align-items-center gap-1 properties_link border-primary border-bottom mt-auto">
                    Add Some Properties
                    <FaArrowRightLong />
                  </Link>
                </div>
                <img src={step2img} className="img-fluid" alt="" />
              </div>
            </Col>

            <Col lg={12}>
              <div className="border border-primary p-3 p-md-5 rounded-15 welcome_steps step_odd">
                <img src={step3img} className="img-fluid" alt="" />
                <div className="content-container d-flex flex-column">
                  <h3 className="text-white mb-4 fs-4 samsung-bold">3. Set Knowledge Base (Autofill Property Details)</h3>
                  <p className="fs-6 color-light-grey mb-4">Select the pen icon next to your first property to access the property profile. Scroll down to find the HostBuddy Knowledge Base, which will list all the data HostBuddy is using to respond to your guests for that particular property. Here, you can upload any property documents, and manage the data HostBuddy will use.</p>
                  <p className="fs-6 color-light-grey mb-3">Once you’re ready, you can auto-fill your property details by selecting the auto-fill button. HostBuddy will now complete your property profile using the data you’ve selected. From here, you can choose to add more data, or skip to the next step.</p>
                  <Link to="/properties" className=" d-flex justify-content-end align-items-center gap-1 properties_link border-primary border-bottom mt-auto">
                    Let's go
                    <FaArrowRightLong />
                  </Link>
                </div>
              </div>
            </Col>

            <Col lg={12}>
              <div className="border border-primary p-3 p-md-5 rounded-15 welcome_steps step_even">
                <div className="content-container d-flex flex-column">
                  <h3 className="text-white mb-4 fs-4 samsung-bold">4. Try it out!</h3>
                  <p className="fs-6 color-light-grey mb-4">Put HostBuddy to the test by navigating back to the properties page and selecting “Test property” next to the property of your choosing. Ask HostBuddy your most common guest questions and watch it handle them with ease.</p>
                  <p className="fs-6 color-light-grey mb-3">HostBuddy will always respond based on real data you’ve provided, and you can see more information about each response by selecting “Where did this come from?”. If you feel that HostBuddy is missing data, navigate back to the property profile and add what’s needed!</p>
                  <Link to="/properties" className=" d-flex justify-content-end align-items-center gap-1 properties_link border-primary border-bottom mt-auto">
                    Try it out
                    <FaArrowRightLong />
                  </Link>
                </div>
                <img src={step4img} className="img-fluid" alt="" />
              </div>
            </Col>

            <Col lg={12}>
              <div className="border border-primary p-3 p-md-5 rounded-15 welcome_steps step_odd">
                <img src={step5img} className="img-fluid" alt="" />
                <div className="content-container d-flex flex-column">
                  <h3 className="text-white mb-4 fs-4 samsung-bold">5. Schedule</h3>
                  <p className="fs-6 color-light-grey mb-4">Now that HostBuddy has been tested, it’s time to schedule its first shift. On the properties page, select the calendar icon next to a property of your choosing.</p>
                  <p className="fs-6 color-light-grey mb-3">Here, you can set HostBuddy’s weekly schedule. Navigate to the monthly view in the top right of the calendar window to set specific days/times for HostBuddy to be on or off. Now sit back and relax while HostBuddy handles your guest support!</p>
                  <Link to="/properties" className=" d-flex justify-content-end align-items-center gap-1 properties_link border-primary border-bottom mt-auto">
                    Schedule HostBuddy
                    <FaArrowRightLong />
                  </Link>
                </div>
              </div>
            </Col>
          </Row>
          
          <Row>
            <Col lg={10} className="mx-auto">
              {/* <h3 className="text-center fw-bold text-white fs-1 mb-4">That's it!</h3> */}
              <p className="mb-3 text-center fw-bold text-white fs-5">You now have state of the art technology doing the heavy lifting for you. Welcome to the future of hosting!</p>
            </Col>
          </Row>
          
          <Row style={{marginTop:"50px", marginBottom:"100px"}}>
            <Col lg={12} className="mx-auto">
              <h3 className="text-center fw-bold text-white fs-1 mb-4">Explore <strong>HostBuddy's Features</strong></h3>
              {/* <p className="mb-3 text-center fw-bold text-white fs-6">HostBuddy is packed with features that make it easy for you to automate your short term rental business. Read on to learn how to make the most of your AI companion.</p> */}
              <p className="mb-3 text-center fw-bold text-white fs-6">HostBuddy is packed with features that make it easy for you to automate your short term rental business. Check them out below.</p>
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
                <div className="more-coming-soon-box">
                  <p style={{ fontSize: '24px', color: 'rgb(128, 128, 128)' }}>More coming soon!</p>
                </div>
              </div>
            </Col>
          </Row>
          
        </Container>
      </div>
    </>
  );
};

export default GetStarted;
