import React, {  useEffect } from 'react'
import './bestPractices.css';
import { Helmet } from 'react-helmet';
import { Link } from "react-router-dom";


const BestPractices = () => {

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll(".step-box.section");
      sections.forEach((section) => {
        const bounding = section.getBoundingClientRect();
        if (bounding.top <= 20 && bounding.bottom >= 50) {
          // setActiveLink(section.id);
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
          <title>Best Practices - HostBuddy AI</title>
          <link rel="canonical" href="https://www.hostbuddy.ai/best-practices" />
        </Helmet>
        <div className="container">
          <div className="banner-heading">
            <h2>Perfecting your Knowledge Base</h2>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div className="account-container">
                <div className="account_heading">
                  <h3>Best Practices For Optimizing Your Knowledge Knowledge Base And Responses</h3>
                </div>
                <div className="account-content">
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="guide-steps">
                        
                        <div className="step-box">
                          <h4>Welcome to Hostbuddy AI!</h4>
                          <p><em>HostBuddy is only as good as the information it has access to, and you'll get the best possible responses by ensuring that its knowledge base is as thorough as possible, in addition to being accurate and up-to-date. When you add your properties, we automatically pull relevant property information from your integration into HostBuddy's knowledge base. While that will get you up and running, going the extra mile to review and perfect the information you’ve added will ensure that HostBuddy is performing at its best for you. Here are our best practices for perfecting your knowledge base.</em></p>
                        </div>

                        <div className="step-box section" id="step1">
                          <h4>1. Use Auto-Fill, Then Review</h4>
                          <p>When setting up a property, auto-fill lets you automatically pull information about the property from your PMS, conversation history, and any uploaded documents into your property profile. It’s much easier for you to view and manage individual pieces of information after it has been added to your property profile.</p>
                          <p>Once you have auto-filled the information, do a quick review of each page on the property profile. This is the easiest way for you to make sure that HostBuddy has all of the information it needs to support your guests. Fill out any fields in the profile that may not have been filled by auto-fill, and address any fields that you think could use some additional clarification. Clicking the pencil icon next to any question lets you add free text to provide HostBuddy with more details.</p>
                        </div>

                        <div className="step-box section" id="step2">
                          <h4>2. Set the Right Sources in the Knowledge Base</h4>
                          <p>You can give HostBuddy access to property details from your PMS, conversation history, and any uploaded documents. However you may decide not to include some of these sources directly. For example, maybe the conversation history contains some incorrect details about the property that were accidentally provided once in the past. Or maybe a single detail in one of your documents has changed, so now you’re unsure about whether or not you should upload the entire thing.</p>
                          <p>In these situations, auto-fill is your friend. You can include all of these sources and use them to auto-fill your property profile, but choose to keep the documents themselves out of the knowledge base. Then, you can edit individual fields directly in the profile to remove any incorrect or out-of-date information. This way you are able to easily copy over all of the useful information from your existing sources, while retaining maximum control and ease of management over the knowledge base.</p>
                        </div>

                        <div className="step-box section" id="step3">
                          <h4>3. Test it out!</h4>
                          <p>Iteratively testing is an excellent way to refine and improve how HostBuddy responds to common queries. On the properties page, click “Test Property” next to a property to open a chat window where you can interact with HostBuddy directly, as if you were a guest at that property. Give HostBuddy a challenge! Ask it the types of questions you receive from guests and see how it responds. You can click on “Where did this come from?” under any of HostBuddy’s messages for an explanation of why HostBuddy responded that way, and what specific information in the knowledge base was used to generate that response.</p>
                          <p>HostBuddy’s responses are grounded on the information in its knowledge base. If it gives some response that is incorrect, it is generally because of some information in the knowledge base that pointed HostBuddy to the incorrect answer. Use the “Where did this come from?” feature to help you pinpoint the culprit information, then correct or clarify it in the property profile.</p>
                          <p>If HostBuddy is unable to provide sufficient information to resolve a guest’s query around a particular subject, you can add more details about that subject in the property profile.</p>
                          <p>To control HostBuddy’s general behavior, you can adjust your <Link to="/setting/conversation-preferences">conversation preferences</Link>.</p>
                        </div>

                        <div className="step-box section" id="step3">
                          <h4>Still not getting the right behavior?</h4>
                          <p>Ensuring our AI meets the needs of our users is our top priority. If you’re experiencing issues or having trouble getting the responses you’re looking for, please feel free to reach out to us at info@hostbuddy.ai and we’ll get back to you promptly to help.</p>
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

export default BestPractices;
