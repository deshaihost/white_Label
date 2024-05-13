import React, { useState, useEffect } from 'react'
import './testingQuestions.css';
import { Helmet } from 'react-helmet';
const TestingQuestions = () => {
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
      <div className="account-main">
        <Helmet>
          <title>Hostbuddy Testing Questions</title>
        </Helmet>
        <div className="container">
          <div className="banner-heading">
            <h2>Hostbuddy Testing Questions</h2>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div className="account-container">
                <div className="account_heading">
                  <h3>Hostbuddy Testing Questions</h3>
                </div>
                <div className="account-content">
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="guide-steps">
                        <div className="step-box">
                          <h4>Welcome to Hostbuddy AI!</h4>
                          <p>Please use the following questions during your testing phase to ensure that HostBuddy has all of the information required to support your guests.</p>
                        </div>
                        <div className="step-box section" id="step1">
                          <h4>Access Questions</h4>
                          <ol>
                            <li>
                              What is the address of the property?
                            </li>
                            <li>
                              I need help checking in, how do I get in?
                            </li>
                            <li>
                              I can’t find the lockbox/code to enter the property. Can you send this to me?
                            </li>
                            <li>
                              The access code is not working/the key to enter is missing from the lockbox. I need help to get in!
                            </li>
                            <li>
                              Where do I park my car?
                            </li>
                          </ol>
                        </div>
                        <div className="step-box section" id="step2">
                          <h4>Issue Troubleshooting</h4>
                          <ol>
                            <li>
                              I can’t figure out how to use the TV, can you help me with this?
                            </li>
                            <li>
                              The AC/Heater is not working, how do I turn this on?
                            </li>
                            <li>
                              I’m getting an error code on the thermostat and can’t get the AC/Heater to turn on. Can you help me?
                            </li>
                            <li>
                              How do I operate the smart home devices in your house?
                            </li>
                            <li>
                              The coffee machine is not turning on. How do I use this?
                            </li>
                            <li>
                              The dishwasher is not working, I need help!
                            </li>
                            <li>
                              I accidentally broke a mug and it shattered on the floor. Is there a broom or cleaning supplies that I can use to clean this up?
                            </li>
                          </ol>
                        </div>

                        <div className="step-box section" id="step3">
                        <h4>General Questions</h4>
                          <ol>
                            <li>
                              Is there a protocol for recycling and garbage disposal in this area?
                            </li>
                            <li>
                              Can you accommodate an early check-in or late check-out?
                            </li>
                            <li>
                              What are your policies on additional guests staying over?
                            </li>
                            <li>
                              Can you recommend a nearby clinic or hospital in case of an emergency?
                            </li>
                            <li>
                              Are there any local noise ordinances that I should be aware of during my stay?
                            </li>
                            <li>
                              What's the best way to get around the city without a car?
                            </li>
                            <li>
                              Is the tap water here safe to drink or should I buy bottled water?
                            </li>
                            <li>
                              What should I do if there's an unexpected power outage?
                            </li>
                            <li>
                              Are there any restricted areas within your property or community?
                            </li>
                            <li>
                              How do I handle receiving mail or packages here during my stay?
                            </li>
                            <li>
                              What are the check-out procedures? Do I need to clean anything?
                            </li>
                            <li>
                              What are your rules regarding the use of communal spaces like pools or gyms?
                            </li>
                            <li>
                              Do you have any safety equipment in case of an earthquake or other natural disaster?
                            </li>
                            <li>
                              What is the policy for extending my stay beyond the initial booking dates?
                            </li>
                            <li>
                              How do I contact you in the middle of the night in case of an emergency?
                            </li>
                          </ol>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestingQuestions;
