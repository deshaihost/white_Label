import React from 'react';
import './pmsInstructions.css';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

const HospitableInstructions = () => {

  return (
    <div>
      <div className="account-main">
        <Helmet>
          <title>Hospitable Integration - HostBuddy AI</title>
          <link rel="canonical" href="https://www.hostbuddy.ai/pms-instructions/hospitable-instructions" />
        </Helmet>
        <div className="container">
          <div className="banner-heading">
            <h2>Hospitable Integration via Calry</h2>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div className="account-container blur-background-top-right">
                <div className="account_heading">
                  <h3>Integrating Hospitable with HostBuddy AI</h3>
                </div>
                <div className="account-content">
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="guide-steps">

                        <div className="step-box section" id="step1">
                          <h4>1. Start the Integration Process in HostBuddy AI</h4>
                          <p>Log in to your HostBuddy AI account, and navigate to the <Link to='/properties'>Properties</Link> page. Select <strong>PMS Integration</strong>, choose <strong>Hospitable</strong> from the list of PMS options, and navigate to the Calry link provided.</p>
                        </div>

                        <div className="step-box section" id="step2">
                          <h4>2. Get the API Key from Hospitable</h4>
                          <p>Switch over to your Hospitable Account in a new tab. Go to <strong>Apps &gt; API access</strong>, and click on <strong>+ Add new</strong>. Provide a name for the access token and select both <strong>Read</strong> and <strong>Write</strong> permissions.</p>
                          <p>For security, enter your account password when prompted, and then copy the newly generated API token.</p>
                        </div>

                        <div className="step-box section" id="step3">
                          <h4>3. Complete the Integration in HostBuddy AI</h4>
                          <p>Paste the API key into the screen shown in Step 1 in the HostBuddy AI app. Once done successfully, you will be redirected back to HostBuddy AI, and your integration with Hospitable will be complete. You're all set to start using HostBuddy AI with Hospitable!</p>
                        </div>

                        <div className="step-box section" id="step4">
                          <h4>4. Advanced API Settings (Optional)</h4>
                          <p>If you need more advanced control over API settings, you can revisit your Hospitable account. Go to <strong>Apps &gt; API access</strong>, and manage the settings there to fit your needs.</p>
                          <p>Make sure to save any credentials or secrets, as they will only be visible once.</p>
                        </div>

                        <div className="step-box section" id="step5">
                          <h4>5. Troubleshooting and Support</h4>
                          <p>If you have any questions or need assistance, feel free to reach out to us. We're here to ensure that your integration with Hospitable and HostBuddy AI is smooth and hassle-free.</p>
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

export default HospitableInstructions;
