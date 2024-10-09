import React from 'react';
import './pmsInstructions.css';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

const BookingSyncInstructions = () => {

  return (
    <div>
      <div className="account-main">
        <Helmet>
          <title>BookingSync Integration - HostBuddy AI</title>
          <link rel="canonical" href="https://www.hostbuddy.ai/pms-instructions/bookingsync"/>
        </Helmet>
        <div className="container">
          <div className="banner-heading">
            <h2>BookingSync Integration via Calry</h2>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div className="account-container blur-background-top-right">
                <div className="account_heading">
                  <h3>Integrating BookingSync with HostBuddy AI</h3>
                </div>
                <div className="account-content">
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="guide-steps">

                        <div className="step-box section" id="step1">
                          <h4>1. Start the Integration Process in HostBuddy AI</h4>
                          <p>Log in to your HostBuddy AI account, and navigate to the <Link to='/properties'>Properties</Link> page. Select <strong>PMS Integration</strong>, choose <strong>BookingSync</strong> from the list of PMS options, and navigate to the Calry link provided.</p>
                        </div>

                        <div className="step-box section" id="step2">
                          <h4>2. Get the Private App Access Code</h4>
                          <p>Open your BookingSync account in a new tab and navigate to <strong>Apps</strong> &gt; <strong>Private Apps</strong>.</p>
                          <p>Get the <strong>Private App Access Code</strong> from HostBuddy AI’s team and paste it as requested. Then click on <strong>Add Private App</strong>.</p>
                        </div>

                        <div className="step-box section" id="step3">
                          <h4>3. Install the App</h4>
                          <p>Once the Private App has been added, you will see HostBuddy AI in your <strong>Private Apps</strong> section.</p>
                          <p>Click on it and select <strong>Install the App</strong>.</p>
                        </div>

                        <div className="step-box section" id="step4">
                          <h4>4. Authenticate the Integration</h4>
                          <p>After installing, you will be redirected to an authentication screen. Allow HostBuddy AI to access information from your BookingSync account.</p>
                          <p>Upon successful authentication, you will be redirected back to the HostBuddy AI app, and the integration will be complete.</p>
                        </div>

                        <div className="step-box section" id="step5">
                          <h4>5. Troubleshooting and Support</h4>
                          <p>If you have any questions or need assistance, feel free to reach out to us. We're here to ensure that your integration with BookingSync and HostBuddy AI is smooth and hassle-free.</p>
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

export default BookingSyncInstructions;
