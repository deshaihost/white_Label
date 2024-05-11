import React, { useState, useEffect } from 'react'
import SideBar from '../../component/sideBar/SideBar';
import { Link } from 'react-router-dom';
import './PrivactyPolicy.css';
import { Helmet } from 'react-helmet';
const PrivacyPolicy = () => {
    const [activeLink, setActiveLink] = useState("");
  const handleClickScroll = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setActiveLink(id);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll(".step-box.section");
      sections.forEach((section) => {
        const bounding = section.getBoundingClientRect();
        if (bounding.top <= 20 && bounding.bottom >= 50) {
          setActiveLink(section.id);
        }
      });
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <div>
       <div>
      <div className="account-main">
        <Helmet>
          <title>Privacy Policy</title>
        </Helmet>
        <div className="container">
          <div className="banner-heading">
            <h2>Privacy Policy</h2>
          </div>
          <div className="row">
            {/* <div className="col-lg-4">
              <SideBar />
            </div> */}
            <div className="col-lg-12">
              <div className="account-container">
                <div className="account_heading">
                  <h3>Setup Guide</h3>
                </div>
                <div className="account-content">
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="guide-steps">
                        <div className="step-box">
                          <h4>Onboarding Steps</h4>
                          <p>
                            Welcome to HostBuddy! Follow the instructions below
                            to begin onboarding your short-term rental
                            properties with HostBuddy AI.
                          </p>
                        </div>
                        <div className="step-box section" id="step1">
                          <h4>Onboarding Expectations and Timeline:</h4>
                          <p>
                            The onboarding process involves several steps
                            designed to ensure that HostBuddy performs
                            effectively for each property. While it is possible
                            to complete onboarding in as little as one day,
                            typically, it takes additional time once you begin
                            testing. Don't worry—we provide plenty of resources
                            to guide you through this process! During and after
                            onboarding, you may contact our exceptional Customer
                            Support team for any technical assistance. Our
                            support team is able to assist you with any
                            questions you may have and is able to help
                            troubleshoot fixing responses you are not satisfied
                            with during your testing phase. If you require
                            support, please feel free to email our customer
                            support team at info@hostbuddy.ai.
                          </p>
                          <p>
                            For some of our frequently asked questions, please
                            visit our FAQ page:{" "}
                            <a href="/faqs" target="_blank">
                              HostBuddy FAQs
                            </a>
                          </p>
                          <p>
                            For general questions about the Onboarding process,
                            check out our welcome page below:
                          </p>
                        </div>
                        <div className="step-box section" id="step2">
                          <h4>Step 1: Property Onboarding</h4>
                          <p>
                            Below is a step by step guide for onboarding your
                            first property!
                          </p>
                          <h6 style={{ color: "white" }}>Subscription</h6>
                          <ol>
                            <li>
                              Once you have reviewed this Setup Guide and are
                              ready to onboard your first property, navigate to
                              the properties page in your user portal.
                            </li>
                            <li>
                              Select “Add Property”
                              <ul style={{ marginBottom: "0px" }}>
                                <li>
                                  Select the number of properties you would like
                                  to add, along with the plan that you are
                                  interested in. The main difference between our
                                  packages is that “The Works” allows for PMS
                                  integration and “The Essentials” generates a
                                  link to Hostbuddy that you can send to your
                                  guests.
                                </li>
                                <li>
                                  <em>
                                    Note: The number of properties you add
                                    initially will be the number of properties
                                    you can use for your free trial. Be sure to
                                    add the exact number of properties that you
                                    would like to use for the trial, as your
                                    selection will be final when it comes to the
                                    trial period. You can of course add more
                                    properties later, but they will not qualify
                                    for your trial period. Your card will not be
                                    charged until your trial period has been
                                    completed.
                                  </em>
                                </li>
                              </ul>
                            </li>
                            <li>
                              Once you continue, you will be directed to our
                              Stripe payment portal. Please enter in your
                              payment information and click submit, which will
                              bring you back to the Properties page.
                            </li>
                          </ol>
                          <h6 style={{ color: "white" }}>
                            Connecting your PMS (“The Works” Users)
                          </h6>
                          <p>
                            If you’ve selected the works plan, now is a great
                            time to connect your PMS!
                          </p>
                          <ol>
                            <li>Click the “Connect PMS” button</li>
                            <li>
                              Select your PMS and click “next”. You will be
                              redirected to a secure integrations page where you
                              can enter your PMS information and connect to
                              HostBuddy. Once finished, you will be redirected
                              to the Properties page, where you will see your
                              PMS listed in the top right. If you do not see
                              your PMS, please repeat steps 1 and 2 again.
                              <ul style={{ marginBottom: "0px" }}>
                                <li>
                                  <em>
                                    Note: If you have trouble locating the
                                    required information, please reach out to
                                    your PMS support team or refer to your PMS
                                    user guide if available.
                                  </em>
                                </li>
                              </ul>
                            </li>
                            <li>
                              Select your PMS and click “next”. You will be
                              redirected to a secure integrations page where you
                              can enter your PMS information and connect to
                              HostBuddy. Once finished, you will be redirected
                              to the Properties page, where you will see your
                              PMS listed in the top right. If you do not see
                              your PMS, please repeat steps 1 and 2 again.
                              <ul style={{ marginBottom: "0px" }}>
                                <li>
                                  <em>
                                    Note: If you have trouble locating the
                                    required information, please reach out to
                                    your PMS’ support team or refer to your PMS’
                                    user guide if available.
                                  </em>
                                </li>
                              </ul>
                            </li>
                          </ol>

                          <h6 style={{ color: "white" }}>
                            Customizing Properties
                          </h6>
                          <ol>
                            <li>
                              On the Properties page, you will see a number of
                              editable properties matching your chosen property
                              count in quantity. Select the pencil icon to begin
                              customizing your Hostbuddy properties.
                            </li>
                            <li>
                              Basics
                              <ul style={{ marginBottom: "0px" }}>
                                <li>
                                  Add a name for your property and a cover photo
                                  under “Basic Information”. After selecting
                                  next & next, please continue completing the
                                  remaining fields.
                                </li>
                                <li>
                                  Tip: Click the pencil icon next to applicable
                                  fields to add any additional information you’d
                                  like. For example, the property type field has
                                  a pencil icon that can be used to explain that
                                  a unit is in an apartment complex, or that a
                                  room is in a shared home. This feature is
                                  available in each section to provide
                                  additional information on specific property
                                  details.
                                </li>
                              </ul>
                            </li>
                            <li>
                              Supporting Doc
                              <ul style={{ marginBottom: "0px" }}>
                                <li>
                                  This page allows for you to upload any
                                  documents, such as a welcome document,
                                  detailed property document or any other item
                                  that you would like Hostbuddy to use to
                                  message guests. If you have subscribed to the
                                  works plan and you have not yet connected your
                                  PMS, please do so here. You also have the
                                  option of adding a URL as a supporting
                                  document. Please make sure any document or URL
                                  you upload contains the necessary information
                                  in text format (chatGPT can not process photo
                                  images).
                                </li>
                              </ul>
                            </li>
                            <li>
                              Listing Details, Amenities, and Extras
                              <ul style={{ marginBottom: "0px" }}>
                                <li>
                                  Complete as many fields as possible. The more
                                  information you add, the better Hostbuddy will
                                  be able to support your property. Please see
                                  our{" "}
                                  <a
                                    href="https://docs.google.com/document/d/14Gh0kUSOft94gi4afjVoYpDB9ujWBBTyb65fJxgZpyU"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    Hostbuddy Tips and Tricks
                                  </a>{" "}
                                  page to learn our best practices for filling
                                  out this information.
                                </li>
                              </ul>
                            </li>
                          </ol>
                        </div>

                        <div className="step-box section" id="step3">
                          <h4>Step 2: Testing</h4>
                          <p>
                            After inputting all desired property details on
                            Hostbuddy, now it’s time to thoroughly test to
                            ensure it's ready to support your business.
                          </p>
                          <ol>
                            <li>
                              Select the “Test Property” button on the
                              “Properties” page.{" "}
                            </li>
                            <li>
                              Compile a list of commonly asked questions that
                              you want to make sure Hostbuddy is capable of
                              handling. We have a list that you can use for this
                              phase, but we recommend that you tailor the
                              questions to your most common scenarios. To review
                              our recommended questions, please see our{" "}
                              <a
                                href="https://docs.google.com/document/d/1-UubWDNGtjd34M1u6fvvnCOEa3mS5t-xvjYt3k_BVew?usp=sharing"
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                Hostbuddy Testing Questions
                              </a>{" "}
                              document.
                            </li>
                            <li>
                              Take note of each response that does not align
                              with your expectations. For information that
                              Hostbuddy is missing, please return to the
                              “Properties” page, and select edit for the given
                              property. Here, you can make refinements to the
                              information that you would like for Hostbuddy to
                              use. If there are responses that fall short, which
                              you are having trouble fixing, please contact our
                              team at info@hostbuddy.ai and provide the property
                              name, a screenshot, and an example of what the
                              response should have been. We will reach back out
                              with either a recommendation for how to fix the
                              issue, or a request to meet to discuss more
                              nuanced requirements.
                            </li>
                          </ol>
                        </div>

                        <div className="step-box section" id="step4">
                          <h4>Step 3: Going Live</h4>
                          <p>“Essentials” Users</p>
                          <ol>
                            <li>
                              Once you are happy with the responses Hostbuddy is
                              providing, you are ready to provide Hostbuddy’s
                              unique URL to your guests for support. Click the
                              three dots next to your property, and click “Copy
                              URL”. The URL will be copied to your clipboard,
                              and can be provided to your guests via booking
                              channel, text, email, or any other platform you
                              use to communicate.
                            </li>
                          </ol>
                          <p>“The Works” Users</p>
                          <ol>
                            <li>
                              Once you are happy with the responses Hostbuddy is
                              providing, it’s time to schedule Hostbuddy’s first
                              shift! Select the calendar icon below your
                              property/s name to set a schedule for Hostbuddy.
                            </li>
                            <li>
                              The monthly schedule is great for setting certain
                              days that you plan to be offline. The schedule
                              button allows for you to set an ongoing schedule
                              for each calendar day in a week. See our
                              “Hostbuddy Scheduling Walkthrough” document for
                              additional information on scheduling.
                            </li>
                          </ol>
                        </div>

                        <div className="step-box section" id="step5">
                          <h4>Step 4: Post Go Live</h4>
                          <ol>
                            <li>
                              After going live with Hostbuddy, we advise that
                              you closely monitor conversations between your
                              guests and Hostbuddy. You can go to the “Property
                              Insights” page in your dashboard to see
                              transcripts that are categorized by whether the
                              conversation was deemed successful by Hostbuddy.
                              Conversations will be marked unsuccessful if
                              Hostbuddy does not have sufficient information to
                              support a guest, or if there is an item that
                              requires human intervention.
                            </li>
                            <li>
                              Consistently update each Hostbuddy property with
                              missing information, and if you need support,
                              please do not hesitate to reach out to our team!
                              Artificial intelligence is nuanced, and our team
                              is trained to troubleshoot problems that you may
                              encounter.
                            </li>
                            <li>
                              Sit back and relax! You now have state of the art
                              technology doing the heavy lifting for you.
                              Welcome to the future of hosting!
                            </li>
                          </ol>
                        </div>
                      </div>
                    </div>

                    {/* <div className="col-lg-3">
                      <div className="step-tab-links">
                        <div className="steps-line">
                          <div className="step-active-line"></div>
                        </div>
                        <ul>
                          <li
                            className={activeLink === "step1" ? "active" : ""}
                          >
                            <button
                              type="button"
                              onClick={() => handleClickScroll("step1")}
                              className="sec-link"
                            >
                              Onboarding Expectations and Timeline
                            </button>
                          </li>
                          <li
                            className={activeLink === "step2" ? "active" : ""}
                          >
                            <button
                              type="button"
                              onClick={() => handleClickScroll("step2")}
                              className="sec-link"
                            >
                              Step 1: Property Onboarding
                            </button>
                          </li>
                          <li
                            className={activeLink === "step3" ? "active" : ""}
                          >
                            <button
                              type="button"
                              onClick={() => handleClickScroll("step3")}
                              className="sec-link"
                            >
                              Step 2: Testing
                            </button>
                          </li>
                          <li
                            className={activeLink === "step4" ? "active" : ""}
                          >
                            <button
                              type="button"
                              onClick={() => handleClickScroll("step4")}
                              className="sec-link"
                            >
                              Step 3: Going Live
                            </button>
                          </li>
                          <li
                            className={activeLink === "step5" ? "active" : ""}
                          >
                            <button
                              type="button"
                              onClick={() => handleClickScroll("step5")}
                              className="sec-link"
                            >
                              Step 4: Post Go Live
                            </button>
                          </li>
                        </ul>
                      </div>
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}

export default PrivacyPolicy
