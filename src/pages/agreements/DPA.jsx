import React, { useEffect } from 'react'
import './agreements.css';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

const DPA = () => {
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
          <title>Data Processing Agreement - HostBuddy AI</title>
          <link rel="canonical" href="https://www.hostbuddy.ai/data-processing-agreement" />
        </Helmet>
        <div className="container">
          <div className="banner-heading">
            <h2>Data Processing Agreement</h2>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div className="account-container blur-background-top-right">
                <div className="account_heading">
                  <h3>Data Processing Agreement</h3>
                </div>
                <div className="account-content">
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="guide-steps">
                        <div className="step-box">
                          <p>
                            This Data Processing Agreement ("DPA") governs HostBuddy's processing of personal data on behalf of the Customer (the "Controller") in connection with the services provided under the Terms of Service agreement between the parties.
                          </p>
                        </div>
                        
                        <div className="step-box section" id="step1">
                          <h4>1. Purpose of This Agreement</h4>
                          <p>
                            This Data Processing Agreement ("DPA") governs HostBuddy's processing of personal data on behalf of the Customer (the "Controller") in connection with the services provided under the Main Agreement between the parties.
                          </p>
                          <p>
                            Under this DPA:
                          </p>
                          <ul>
                            <li><strong>You (the Customer)</strong> act as the <strong>data controller;</strong></li>
                            <li><strong>HostBuddy</strong> acts as your <strong>data processor</strong>.</li>
                          </ul>
                        </div>

                        <div className="step-box section" id="step2">
                          <h4>2. What Data We Process and Why</h4>
                          <p>
                            When you use HostBuddy AI, we process guest data from your connected Property Management Software (PMS) systems in order to provide automated guest communication and related features. This includes:
                          </p>
                          <h5>a. Guest Details</h5>
                          <ul>
                            <li>Includes: Guest name(s), contact information (email, phone number, WhatsApp number).</li>
                            <li>Used to provide context to the AI, personalize communication, and support your messaging workflows.</li>
                          </ul>
                          <h5>b. Guest Conversations</h5>
                          <ul>
                            <li>Transcripts of your conversations with your guests, including those pulled from your PMS, and those transacted directly on the HostBuddy platform.</li>
                            <li>Used to maintain context, enable intelligent, consistent, and relevant messaging by HostBuddy AI, and support your messaging workflows.</li>
                          </ul>
                          <h5>c. Reservation Details</h5>
                          <ul>
                            <li>Data such as: property booked, dates, number of guests, pets, and amount paid.</li>
                            <li>Used to inform the AI for accurate and relevant responses to guest inquiries, and for your internal organization.</li>
                          </ul>
                          <p>
                            HostBuddy only processes this data for the purposes of delivering its services to you and only in accordance with your documented instructions.
                          </p>
                        </div>

                        <div className="step-box section" id="step3">
                          <h4>3. Duration of Processing</h4>
                          <p>
                            HostBuddy will process guest data for as long as you maintain an account on our platform. Users can delete their account at any time. Upon account deletion, all guest personal data will be deleted.
                          </p>
                        </div>

                        <div className="step-box section" id="step4">
                          <h4>4. Categories of Data Subjects</h4>
                          <ul>
                            <li>Guests of the Controller's short-term rental properties</li>
                          </ul>
                        </div>

                        <div className="step-box section" id="step5">
                          <h4>5. Processor Obligations</h4>
                          <p>HostBuddy will:</p>
                          <ul>
                            <li>a. Process personal data only on documented instructions from the Controller</li>
                            <li>b. Ensure that employees and agents authorized to process data are bound by confidentiality</li>
                            <li>c. Implement appropriate technical and organizational security measures</li>
                            <li>d. Assist the Controller with data subject requests under GDPR (e.g. access, erasure, rectification)</li>
                            <li>e. Promptly notify the Controller of any personal data breach</li>
                            <li>f. Assist with data protection impact assessments where applicable</li>
                            <li>g. Delete or return all guest data upon termination unless otherwise required by law</li>
                            <li>h. Provide necessary information to demonstrate compliance and enable audits</li>
                          </ul>
                        </div>

                        <div className="step-box section" id="step6">
                          <h4>6. Subprocessors</h4>
                          <p>
                            The Controller authorizes HostBuddy to use subprocessors. A list of current subprocessors is available <Link to="/subprocessors" target="_blank" rel="noopener noreferrer">here</Link>.
                          </p>
                          <p>
                            HostBuddy will notify the Controller in advance of any intended changes to subprocessors, providing an opportunity to object. All subprocessors are bound by obligations no less protective than those set out in this DPA.
                          </p>
                        </div>

                        <div className="step-box section" id="step7">
                          <h4>7. International Data Transfers</h4>
                          <p>
                            Guest data is generally stored and processed in the <strong>United States</strong>. HostBuddy participates in and complies with the <strong>EU–US Data Privacy Framework (DPF)</strong> for lawful cross-border transfers of personal data from the EEA to the U.S.
                          </p>
                        </div>

                        <div className="step-box section" id="step8">
                          <h4>8. Security Measures</h4>
                          <p>
                            HostBuddy maintains appropriate technical and organizational security measures, including:
                          </p>
                          <ul>
                            <li>Encryption of data in transit and at rest.</li>
                            <li>Access control and authentication.</li>
                            <li>Logging and monitoring.</li>
                            <li>Secure API endpoints and least-privilege access policies.</li>
                          </ul>
                        </div>

                        <div className="step-box section" id="step9">
                          <h4>9. Data Breach Notification</h4>
                          <p>
                            HostBuddy will notify the Controller without undue delay (no later than 48 hours) after becoming aware of a personal data breach involving guest data. The notice will include known details about the breach, steps taken, and contact information for follow-up.
                          </p>
                        </div>

                        <div className="step-box section" id="step10">
                          <h4>10. Assistance and Audits</h4>
                          <p>HostBuddy will:</p>
                          <ul>
                            <li>Assist the Controller with data protection obligations where applicable.</li>
                            <li>Allow audits or provide documentation once per year with at least 30 days' notice, unless required more frequently due to a confirmed security incident or regulatory request.</li>
                          </ul>
                        </div>

                        <div className="step-box section" id="step11">
                          <h4>11. Governing Law</h4>
                          <p>
                            This DPA is governed by and construed in accordance with the law applicable to the Main Agreement.
                          </p>
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

export default DPA;