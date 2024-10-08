import React from 'react';
import './pmsInstructions.css';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

const OwnerRezInstructions = () => {

  return (
    <div>
      <div className="account-main">
        <Helmet>
          <title>OwnerRez Integration - HostBuddy AI</title>
          <link rel="canonical" href="https://www.hostbuddy.ai/pms-instructions/ownerrez-instructions" />
        </Helmet>
        <div className="container">
          <div className="banner-heading">
            <h2>OwnerRez Integration via Calry</h2>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div className="account-container blur-background-top-right">
                <div className="account_heading">
                  <h3>Integrating OwnerRez with HostBuddy AI</h3>
                </div>
                <div className="account-content">
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="guide-steps">

                        <div className="step-box section" id="step1">
                          <h4>1. Start the Integration Process in HostBuddy AI</h4>
                          <p>Log in to your HostBuddy AI account, and navigate to the <Link to='/properties'>Properties</Link> page. Select <strong>PMS Integration</strong>, choose <strong>OwnerRez</strong> from the list of PMS options, and navigate to the Calry link provided.</p>
                        </div>

                        <div className="step-box section" id="step2">
                          <h4>2. Authorize HostBuddy</h4>
                          <p>You will be directed to log in to your OwnerRez account. Once you log in, click <strong>Authorize</strong> button to allow HostBuddy AI to access your OwnerRez account.</p>
                          <p>That's it! You will be redirected back to HostBuddy AI. You're all set to start using HostBuddy AI with OwnerRez!</p>
                        </div>

                        <div className="step-box section" id="step5">
                          <h4>3. Troubleshooting and Support</h4>
                          <p>If you have any questions or need assistance, feel free to reach out to us. We're here to ensure that your integration with OwnerRez and HostBuddy AI is smooth and hassle-free.</p>
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

export default OwnerRezInstructions;
