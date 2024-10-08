import React from 'react';
import './pmsInstructions.css';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

const HostawayInstructions = () => {

  return (
    <div>
      <div className="account-main">
        <Helmet>
          <title>Hostaway Integration - HostBuddy AI</title>
          <link rel="canonical" href="https://www.hostbuddy.ai/pms-instructions/hostaway-instructions" />
        </Helmet>
        <div className="container">
          <div className="banner-heading">
            <h2>Hostaway Integration via Calry</h2>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div className="account-container blur-background-top-right">
                <div className="account_heading">
                  <h3>Integrating Hostaway with HostBuddy AI</h3>
                </div>
                <div className="account-content">
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="guide-steps">

                        <div className="step-box section" id="step1">
                          <h4>1. Start the Integration Process in HostBuddy AI</h4>
                          <p>Log in to your HostBuddy AI account, and navigate to the <Link to='/properties'>Properties</Link> page. Select <strong>PMS Integration</strong>, choose <strong>Hostaway</strong> from the list of PMS options, and navigate to the Calry link provided.</p>
                        </div>

                        <div className="step-box section" id="step2">
                          <h4>2. Get the API Key from Hostaway</h4>
                          <p>Switch over to your Hostaway Account in a new tab to retrieve your API Key.</p>
                          <ul>
                            <li>Go to the <strong>Marketplace</strong> within your Hostaway Dashboard.</li>
                            <li>Search for <strong>HostBuddy AI</strong> and click the ‘<strong>Connect/Configure</strong>’ button.</li>
                            <li>This will expand the partner box, and you can click <strong>Connect</strong> again to generate the API Key.</li>
                            <li>Click <strong>Create</strong> to generate the key. Make sure to copy and save it as the API key will only be visible once.</li>
                          </ul>
                        </div>

                        <div className="step-box section" id="step3">
                          <h4>3. Complete the Integration in HostBuddy AI</h4>
                          <p>Paste the API key into the screen shown in Step 1 in the HostBuddy AI app. Once successfully done, you will be redirected back to HostBuddy AI, and your integration will be complete. You're all set to start using HostBuddy AI with Hostaway!</p>
                        </div>

                        <div className="step-box section" id="step4">
                          <h4>4. Advanced API Settings (Optional)</h4>
                          <p>If you need additional control over API settings, go back to Hostaway, and in the top navigation bar, click <strong>Settings</strong> then <strong>API</strong>.</p>
                          <p>From there, you can configure additional options or create new API keys as needed.</p>
                        </div>

                        <div className="step-box section" id="step5">
                          <h4>5. Troubleshooting and Support</h4>
                          <p>If you have any questions or need assistance, feel free to reach out to us. We're here to ensure that your integration with Hostaway and HostBuddy AI is smooth and hassle-free.</p>
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

export default HostawayInstructions;
