import React from 'react';
import './pmsInstructions.css';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

const HostfullyInstructions = () => {

  return (
    <div>
      <div className="account-main">
        <Helmet>
          <title>Hostfully Integration - HostBuddy AI</title>
          <link rel="canonical" href="https://www.hostbuddy.ai/pms-instructions/hostfully-instructions" />
        </Helmet>
        <div className="container">
          <div className="banner-heading">
            <h2>Hostfully Integration via Calry</h2>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div className="account-container blur-background-top-right">
                <div className="account_heading">
                  <h3>Integrating Hostfully with HostBuddy AI</h3>
                </div>
                <div className="account-content">
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="guide-steps">

                        <div className="step-box section" id="step1">
                          <h4>1. Start the Integration Process in HostBuddy AI</h4>
                          <p>Log in to your HostBuddy AI account, and navigate to the <Link to='/properties'>Properties</Link> page. Select <strong>PMS Integration</strong>, choose <strong>Hostfully</strong> from the list of PMS options, and navigate to the Calry link provided.</p>
                        </div>

                        <div className="step-box section" id="step2">
                          <h4>2. Get the API Key from Hostfully</h4>
                          <p>Switch over to your Hostfully account in a new tab. Go to <strong>Agency Settings</strong> and scroll down to locate your API key. Copy the API key to your clipboard.</p>
                        </div>

                        <div className="step-box section" id="step3">
                          <h4>3. Complete the Integration in HostBuddy AI</h4>
                          <p>Paste the API key into the screen shown in Step 1 in the HostBuddy AI app. Once successfully done, you will be redirected back to HostBuddy AI, and your integration will be complete. You're all set to start using HostBuddy AI with Hostfully!</p>
                        </div>

                        <div className="step-box section" id="step4">
                          <h4>4. API Availability</h4>
                          <p>Note that the Hostfully API is only available to Premium accounts or to organizations that are part of the Hostfully Preferred Partners group.</p>
                        </div>

                        <div className="step-box section" id="step5">
                          <h4>5. Troubleshooting and Support</h4>
                          <p>If you have any questions or need assistance, feel free to reach out to us. We're here to ensure that your integration with Hostfully and HostBuddy AI is smooth and hassle-free.</p>
                          <p>Contact us at support@hostbuddy.ai if you run into any issues.</p>
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

export default HostfullyInstructions;
