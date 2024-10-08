import React from 'react';
import './pmsInstructions.css';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

const LodgifyInstructions = () => {

  return (
    <div>
      <div className="account-main">
        <Helmet>
          <title>Lodgify Integration - HostBuddy AI</title>
          <link rel="canonical" href="https://www.hostbuddy.ai/pms-instructions/lodgify-instructions" />
        </Helmet>
        <div className="container">
          <div className="banner-heading">
            <h2>Lodgify Integration via Calry</h2>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div className="account-container blur-background-top-right">
                <div className="account_heading">
                  <h3>Integrating Lodgify with HostBuddy AI</h3>
                </div>
                <div className="account-content">
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="guide-steps">

                        <div className="step-box section" id="step1">
                          <h4>1. Start the Integration Process in HostBuddy AI</h4>
                          <p>Log in to your HostBuddy AI account, and navigate to the <Link to='/properties'>Properties</Link> page. Select <strong>PMS Integration</strong>, choose <strong>Lodgify</strong> from the list of PMS options, and navigate to the Calry link provided.</p>
                        </div>

                        <div className="step-box section" id="step2">
                          <h4>2. Get the API Key from Lodgify</h4>
                          <p>Switch over to your Lodgify account in a new tab. Go to your <strong>Main Menu</strong> &gt; <strong>Settings</strong> &gt; <strong>Public API</strong>. Your API key will be displayed here.</p>
                          <p>Once the API key is generated, copy it to your clipboard.</p>
                        </div>

                        <div className="step-box section" id="step3">
                          <h4>3. Complete the Integration in HostBuddy AI</h4>
                          <p>Paste the API key into the screen shown in Step 1 in the HostBuddy AI app. Once successfully done, you will be redirected back to HostBuddy AI, and your integration will be complete. You're all set to start using HostBuddy AI with Lodgify!</p>
                        </div>

                        <div className="step-box section" id="step4">
                          <h4>4. Advanced API Settings (Optional)</h4>
                          <p>If you need additional control over API settings, revisit your Lodgify account settings. Navigate to <strong>Settings</strong> &gt; <strong>API</strong> for more advanced options.</p>
                          <p>You can manage permissions, generate new secrets, or update settings as needed.</p>
                        </div>

                        <div className="step-box section" id="step5">
                          <h4>5. Troubleshooting and Support</h4>
                          <p>If you have any questions or need assistance, feel free to reach out to us. We're here to ensure that your integration with Lodgify and HostBuddy AI is smooth and hassle-free.</p>
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

export default LodgifyInstructions;
