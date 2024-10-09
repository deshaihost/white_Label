import React from 'react';
import './pmsInstructions.css';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

const GuestyInstructions = () => {

  const img1 = 'https://hostbuddylb.com/pms-instructions/guesty/guesty-1.webp'
  const img2 = 'https://hostbuddylb.com/pms-instructions/guesty/guesty-2.webp'
  const img3 = 'https://hostbuddylb.com/pms-instructions/guesty/guesty-3.webp'

  return (
    <div>
      <div className="account-main">
        <Helmet>
          <title>Guesty Integration - HostBuddy AI</title>
          <link rel="canonical" href="https://www.hostbuddy.ai/pms-instructions/guesty-instructions" />
        </Helmet>
        <div className="container">
          <div className="banner-heading">
            <h2>Guesty Integration Steps</h2>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div className="account-container blur-background-top-right">
                <div className="account_heading">
                  <h3>Integrating Guesty with HostBuddy AI</h3>
                </div>
                <div className="account-content">
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="guide-steps">

                        <div className="step-box section" id="step1">
                          <h4>1. Start the Integration Process in HostBuddy AI</h4>
                          <p>Log in to your HostBuddy AI account, and navigate to the <Link to='/properties'>Properties</Link> page. Select <strong>PMS Integration</strong>, choose <strong>Guesty</strong> from the list of PMS options, and navigate to the Calry link provided.</p>
                          <p>Under "Choose authentication type": choose "Partner Token".</p>
                          <img src={img1} alt="Guesty Integration" />
                        </div>

                        <div className="step-box section" id="step2">
                          <h4>2. Get the Integration Token from Guesty</h4>
                          <p>Switch over to your Guesty Account in a new tab. Go to <strong>Integrations</strong> <strong>Marketplace</strong> and search for HostBuddy AI. Click on the blue "Connect" button to generate the token, and copy it.</p>
                          <img src={img2} alt="Guesty Integration" />
                          <img src={img3} alt="Guesty Integration" />
                        </div>

                        <div className="step-box section" id="step3">
                          <h4>3. Complete the Integration in HostBuddy AI</h4>
                          <p>Paste the token into the screen shown in Step 1 in HostBuddy AI. Once successfully done, you will be redirected back to HostBuddy AI, and your integration will be complete. You're all set to start using HostBuddy AI with Guesty!</p>
                        </div>

                        <div className="step-box section" id="step5">
                          <h4>4. Troubleshooting and Support</h4>
                          <p>If you have any questions or need assistance, feel free to reach out to us. We're here to ensure that your integration with Guesty and HostBuddy AI is smooth and hassle-free.</p>
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

export default GuestyInstructions;
