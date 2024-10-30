import React, { useEffect } from 'react';
import './bestPractices.css';
import { Helmet } from 'react-helmet';
import { Link } from "react-router-dom";

const CustomizeHostBuddyGuide = () => {
  return (
    <div>
      <div className="account-main">
        <Helmet>
          <title>Conversation Preferences - HostBuddy AI</title>
          <link rel="canonical" href="https://www.hostbuddy.ai/conversation-preferences" />
        </Helmet>
        <div className="container">
          <div className="banner-heading">
            <h2>Conversation Preferences</h2>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div className="account-container blur-background-top-right">
                <div className="account_heading">
                  <h3>Find detailed information on customizing HostBuddy to best fit your preferences.</h3>
                </div>
                <div className="account-content">
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="guide-steps">
                        
                        <div className="step-box">
                          <h4>HostBuddy is designed for flexibility, allowing you to tailor its behavior to meet your specific needs. You’ll find these customization options on the inbox page under ‘Preferences’. Here’s an overview of each setting.</h4>
                        </div>

                        <div className="step-box section" id="defer-behavior">
                          <h4>Defer Behavior:</h4>
                          <p>While HostBuddy can handle most troubleshooting and support queries with ease, some issues require a bit more intervention. When HostBuddy encounters an issue it can’t resolve independently, it generates an action item and notifies you (see the Action Items and Notifications training page). In these cases, HostBuddy will follow your chosen defer behavior to seamlessly hand off the issue.</p>
                          <p>Let’s look at how each defer option would handle the following situation:</p>
                          <p>John and his group checked in 10 minutes ago. You're currently on "Do Not Disturb" and missed several calls. John sends this message:</p>
                          <p><em>"Hey, we arrived at the unit, and the toilet is spraying water all over the bathroom."</em></p>
                          <p>Unable to resolve this issue through messaging alone, HostBuddy will follow your selected defer behavior:</p>
                          <ul>
                            <li><strong>Defer to Host:</strong> HostBuddy might respond, "Hey John, this sounds serious. Thank you for bringing it to our attention. I'll inform the primary host so we can work on getting this resolved!"</li>
                            <li><strong>Defer to Team:</strong> HostBuddy might respond, "Hey John, this sounds serious. Thanks for letting us know. I’ll connect with my team to help get this sorted out!"</li>
                            <li><strong>Embody Host:</strong> HostBuddy might respond, "Hey John, this sounds serious. Thanks for letting me know. Give me a bit of time to find a solution, and I’ll get back to you shortly."</li>
                          </ul>
                          <p>These defer options reassure the guest that their message has been received and that the issue is being worked on.</p>
                        </div>

                        <div className="step-box section" id="share-direct-contact">
                          <h4>Share Direct Contact:</h4>
                          <p>HostBuddy can share contact details for a designated person whom the guest can reach out to directly.</p>
                        </div>

                        <div className="step-box section" id="do-not-respond">
                          <h4>Do Not Respond:</h4>
                          <p>If this preference is selected, HostBuddy will not respond.</p>
                        </div>

                        <div className="step-box section" id="other-settings">
                          <h4>Other Settings on the Conversation Preferences Page:</h4>
                          <ul>
                            <li><strong>Use Signature:</strong> When enabled, HostBuddy will always include a custom signature of your choice in its messages.</li>
                            <li><strong>AI Transparency:</strong> This setting addresses the rare case when a guest inquires if they’re interacting with AI. You can specify how HostBuddy should respond in this situation.</li>
                            <li><strong>Message Delay:</strong> Add a message delay here if desired. This is ideal for hosts who like to jump into conversations first. HostBuddy will hold its response if it detects you’ve already replied.</li>
                          </ul>
                        </div>

                        <div className="step-box section" id="configurations">
                          <h4>Configurations:</h4>
                          <p>Want different preferences for specific properties or times of day? Use the Configurations feature at the top right of the page to set up unique preferences based on property or time parameters.</p>
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

export default CustomizeHostBuddyGuide;