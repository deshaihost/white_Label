import React, { useEffect } from 'react'
import './agreements.css';
import { Helmet } from 'react-helmet';

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
                          <h4>HostBuddy AI Data Processing Agreement</h4>
                          <p>
                            This Data Processing Agreement ("DPA") forms part of the Terms of Service between HostBuddy AI ("HostBuddy AI") and the Customer using HostBuddy AI's services ("Customer").
                          </p>
                        </div>

                        <div className="step-box section" id="step1">
                          <h4>1. Roles of the Parties</h4>
                          <p>
                            Customer acts as the Data Controller, and HostBuddy AI acts as the Data Processor regarding personal data processed under this Agreement.
                          </p>
                        </div>

                        <div className="step-box section" id="step2">
                          <h4>2. Scope and Purpose</h4>
                          <p>
                            HostBuddy AI will process personal data solely for the purpose of providing the Services in accordance with the Terms of Service and Customer's documented instructions.
                          </p>
                        </div>

                        <div className="step-box section" id="step3">
                          <h4>3. Compliance</h4>
                          <p>
                            HostBuddy AI shall comply with its obligations as a processor under applicable data protection laws, including the GDPR.
                          </p>
                        </div>

                        <div className="step-box section" id="step4">
                          <h4>4. Sub-Processors</h4>
                          <p>
                            Customer authorizes HostBuddy AI to engage sub-processors. HostBuddy AI shall impose on sub-processors the same data protection obligations as set out in this Agreement and shall remain fully liable for their compliance.
                          </p>
                        </div>

                        <div className="step-box section" id="step5">
                          <h4>5. Security Measures</h4>
                          <p>
                            HostBuddy AI shall implement appropriate technical and organizational measures to ensure a level of security appropriate to the risk.
                          </p>
                        </div>

                        <div className="step-box section" id="step6">
                          <h4>6. Data Subject Rights</h4>
                          <p>
                            HostBuddy AI shall assist Customer, as reasonably required, to respond to requests to exercise data subject rights.
                          </p>
                        </div>

                        <div className="step-box section" id="step7">
                          <h4>7. Data Breach Notification</h4>
                          <p>
                            HostBuddy AI shall notify Customer without undue delay after becoming aware of a personal data breach.
                          </p>
                        </div>

                        <div className="step-box section" id="step8">
                          <h4>8. Data Transfers</h4>
                          <p>
                            Where personal data is transferred outside the EEA or UK, HostBuddy AI shall ensure appropriate safeguards are in place in accordance with data protection laws.
                          </p>
                        </div>

                        <div className="step-box section" id="step9">
                          <h4>9. Deletion or Return of Data</h4>
                          <p>
                            Upon termination of the Services, HostBuddy AI shall, at Customer's choice, delete or return all personal data, unless retention is required by law.
                          </p>
                        </div>

                        <div className="step-box section" id="step10">
                          <h4>10. Audit Rights</h4>
                          <p>
                            Customer has the right to request information necessary to demonstrate HostBuddy AI's compliance with this Agreement and applicable laws.
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
