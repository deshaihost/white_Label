import React from 'react';
import './pmsInstructions.css';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

const Beds24Instructions = () => {

  const img1 = 'https://hostbuddylb.com/pms-instructions/beds24/beds24-1-take2.webp'
  const img2 = 'https://hostbuddylb.com/pms-instructions/beds24/beds24-2.webp'
  const img3 = 'https://hostbuddylb.com/pms-instructions/beds24/beds24-3.webp'
  const img4 = 'https://hostbuddylb.com/pms-instructions/beds24/beds24-4.webp'

  return (
    <div>
      <div className="account-main">
        <Helmet>
          <title>Beds24 Integration - HostBuddy AI</title>
          <link rel="canonical" href="https://www.hostbuddy.ai/pms-instructions/beds24-instructions" />
        </Helmet>
        <div className="container">
          <div className="banner-heading">
            <h2>Beds24 Integration Steps</h2>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div className="account-container blur-background-top-right">
                <div className="account_heading">
                  <h3>Integrating Beds24 with HostBuddy AI</h3>
                </div>
                <div className="account-content">
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="guide-steps">

                        <div className="step-box section" id="step1">
                          <h4>1. Start the Integration Process in HostBuddy AI</h4>
                          <p>Log in to your HostBuddy AI account, and navigate to the <Link to='/properties'>Properties</Link> page. Select <strong>PMS Integration</strong>, choose <strong>Beds24</strong> from the list of PMS options, and navigate to the Calry link provided.</p>
                          <img src={img1} alt="Beds24 Integration" />
                        </div>

                        <div className="step-box section" id="step2">
                          <h4>2. Get the Invite Code from Beds24</h4>
                          <p>Switch over to your Beds24 account in a new tab. Go to <strong>Settings</strong> &gt; <strong>Apps & Integrations</strong> &gt; <strong>API</strong> section and click on <strong>Generate Invite Code</strong>.</p>
                          <img src={img2} alt="Beds24 Integration" style={{ marginBottom: '20px' }} />
                          <p>Select on <strong>Select All</strong> on all three of these boxes like below. And then Click on <strong>Generate Invite Code</strong> once more.</p>
                          <img src={img3} alt="Beds24 Integration" />
                          <p>Copy the <strong>Invite Code</strong> as shown below.</p>
                          <img src={img4} alt="Beds24 Integration" />
                        </div>

                        <div className="step-box section" id="step3">
                          <h4>3. Complete the Integration in HostBuddy AI</h4>
                          <p>Paste the Invite Code into the authentication screen in HostBuddy AI. After clicking <strong>Connect</strong>, you'll see a confirmation message that the integration has been successfully authenticated. You will then be redirected back to HostBuddy AI, and the integration will be complete.</p>
                        </div>

                        <div className="step-box section" id="step5">
                          <h4>4. Troubleshooting and Support</h4>
                          <p>If you have any questions or encounter any issues, don't hesitate to contact us. We're here to ensure that your integration with Beds24 and HostBuddy AI goes smoothly.</p>
                          <p>Reach out to us at support@hostbuddy.ai for assistance.</p>
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

export default Beds24Instructions;
