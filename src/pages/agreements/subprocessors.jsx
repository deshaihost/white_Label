import React, { useEffect } from 'react'
import './agreements.css';
import { Helmet } from 'react-helmet';

const Subprocessors = () => {
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
          <title>Subprocessors - HostBuddy AI</title>
          <link rel="canonical" href="https://www.hostbuddy.ai/subprocessors" />
        </Helmet>
        <div className="container">
          <div className="banner-heading">
            <h2>Subprocessors</h2>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div className="account-container blur-background-top-right">
                <div className="account_heading">
                  <h3>Subprocessors</h3>
                </div>
                <div className="account-content">
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="guide-steps">
                        <div className="step-box">
                          <p>
                            As part of providing our services, HostBuddy AI uses certain third-party subprocessors that may process personal data of our users or their guests. The use of these subprocessors is consistent with our Terms of Service, DPA, and applicable data protection laws.
                          </p>
                        </div>

                        <div className="step-box section" id="google-cloud">
                          <h4>Google Cloud Platform</h4>
                          <ul>
                            <li><em>Used for:</em> Hosting, backend infrastructure, storage, and AI services.</li>
                            <li><em>Data involved:</em> All data processed or stored by our application.</li>
                          </ul>
                        </div>

                        <div className="step-box section" id="sendgrid">
                          <h4>SendGrid</h4>
                          <ul>
                            <li><em>Used for:</em> Sending emails to users (e.g. confirmations, account notifications).</li>
                            <li><em>Data involved:</em> User email addresses; email content (including opt-in account notifications like action items, if configured).</li>
                          </ul>
                        </div>

                        <div className="step-box section" id="stripe">
                          <h4>Stripe</h4>
                          <ul>
                            <li><em>Used for:</em> Payment processing, subscription management.</li>
                            <li><em>Data involved:</em> Payment information, subscription details, billing contact info.</li>
                          </ul>
                        </div>

                        <div className="step-box section" id="slack">
                          <h4>Slack</h4>
                          <ul>
                            <li><em>Used for:</em> Opt-in account notifications, e.g. action items (if configured).</li>
                            <li><em>Data involved:</em> Opt-in notification content (if configured).</li>
                          </ul>
                        </div>

                        <div className="step-box section" id="twilio">
                          <h4>Twilio</h4>
                          <ul>
                            <li><em>Used for:</em> Account notifications via SMS and WhatsApp (if configured); WhatsApp guest communication (if configured).</li>
                            <li><em>Data involved:</em> User contact information; guest WhatsApp number; message content; account notification content.</li>
                          </ul>
                        </div>

                        <div className="step-box section" id="meta">
                          <h4>Meta (WhatsApp)</h4>
                          <ul>
                            <li><em>Used for:</em> Account notifications via WhatsApp (if configured); WhatsApp guest communication (if configured).</li>
                            <li><em>Data involved:</em> User contact information; guest WhatsApp number; message content; account notification content.</li>
                          </ul>
                        </div>

                        <div className="step-box section" id="calry">
                          <h4>Calry</h4>
                          <ul>
                            <li><em>Used for:</em> Integration with Property Management Systems (PMSs).</li>
                            <li><em>Data involved:</em> All data synced to/from PMS, including: guest/reservation data, property data, conversations.</li>
                          </ul>
                        </div>

                        <div className="step-box section" id="anthropic">
                          <h4>Anthropic</h4>
                          <ul>
                            <li><em>Used for:</em> AI processing (message generation; action item detection; sentiment detection, etc).</li>
                            <li><em>Data involved:</em> Property data; guest/reservation data; conversations.</li>
                          </ul>
                        </div>

                        <div className="step-box section" id="aws">
                          <h4>Amazon Web Services (AWS)</h4>
                          <ul>
                            <li><em>Used for:</em> Hosting Anthropic's Claude models via AWS Bedrock.</li>
                            <li><em>Data involved:</em> Property data; guest/reservation data; conversations.</li>
                          </ul>
                        </div>

                        <div className="step-box section" id="openai">
                          <h4>OpenAI</h4>
                          <ul>
                            <li><em>Used for:</em> AI processing (message generation; action item detection; sentiment detection, etc).</li>
                            <li><em>Data involved:</em> Property data; guest/reservation data; conversations.</li>
                          </ul>
                        </div>

                        <div className="step-box section" id="azure-openai">
                          <h4>Azure OpenAI Service</h4>
                          <ul>
                            <li><em>Used for:</em> Hosting OpenAI's GPT models.</li>
                            <li><em>Data involved:</em> Property data; guest/reservation data; conversations.</li>
                          </ul>
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

export default Subprocessors;
