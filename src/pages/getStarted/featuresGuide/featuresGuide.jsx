import React, { useState, useEffect } from 'react'
import SideBar from '../../component/sideBar/SideBar';
import { Helmet } from 'react-helmet';
import Authorized from '../../helper/Authorized';

const SetupGuide = () => {

  const getAuthToken = Authorized();
  const { token } = getAuthToken ? getAuthToken : {};

  const [activeLink, setActiveLink] = useState('');
  const handleClickScroll = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveLink(id);
    }
  };

  return (
    <div className="account-main">
      <Helmet>
    <title>Set Up Guide - HostBuddy AI</title>
  </Helmet>
      <div className="container">
        <div className="banner-heading">
          <h2>My HostBuddy</h2>
        </div>
        <div className="row">
          {token !== undefined && ( // user logged in
            <div className="col-lg-2 col-xl-2 col-xxl-2">
              <SideBar />
            </div>
          )}
          <div className="col-lg-10 col-xl-10 col-xxl-10">
            <div className="account-container">
              <div className="account_heading">
                <h3>Setup Guide</h3>
              </div>
              <div className="account-content">
                <div className="row">
                  <div className="col-lg-9">
                    <div className="guide-steps">
                      <div className="step-box">
                        <h4>Onboarding Steps</h4>
                        <p>Welcome to HostBuddy! Follow the instructions below to begin onboarding your short-term rental properties with HostBuddy AI.</p>
                      </div>
                      <div className="step-box section" id="step1">
                        <h4>Onboarding Expectations and Timeline:</h4>
                        <p>The onboarding process involves several steps designed to ensure that HostBuddy performs effectively for each property. While it is possible to complete onboarding in as little as one day, typically, it takes additional time once you begin testing. Don't worry—we provide plenty of resources to guide you through this process! During and after onboarding, you may contact our exceptional Customer Support team for any technical assistance. Our support team is able to assist you with any questions you may have and is able to help troubleshoot fixing responses you are not satisfied with during your testing phase. If you require support, please feel free to email our customer support team at info@HostBuddy.ai.</p>
                        <p>For some of our frequently asked questions, please visit our FAQ page: <a href='/faqs' target="_blank">HostBuddy FAQs</a></p>
                      </div>
                      <div className="step-box section" id="step2">
                        <h4>Step 1: Property Onboarding</h4>
                        <p>Below is a step by step guide for onboarding your first property!</p>
                        <h6 style={{ color: 'white' }}>Subscription</h6>
                        <ol>
                          <li>Once you have reviewed this Setup Guide and are ready to onboard your first property, navigate to the properties page in your user portal.</li>
                          <li>Select “Add Property”
                            <ul style={{ marginBottom: '0px' }}>
                              <li>Select the number of properties you would like to add, along with the plan that you are interested in. The main difference between our packages is that “The Works” allows for PMS integration and “The Essentials” generates a link to HostBuddy that you can send to your guests.</li>
                              <li><em>Note: The number of properties you add initially will be the number of properties you can use for your free trial. Be sure to add the exact number of properties that you would like to use for the trial, as your selection will be final when it comes to the trial period. You can of course add more properties later, but they will not qualify for your trial period. Your card will not be charged until your trial period has been completed.</em></li>
                            </ul>
                          </li>
                          <li>Once you continue, you will be directed to our Stripe payment portal. Please enter in your payment information and click submit, which will bring you back to the Properties page.</li>
                        </ol>

                        <iframe width="560" height="315" src="https://www.youtube.com/embed/swg5HR2uWqo?si=KRjQNN-5nKAZ0Oel" title="Getting Started YouTube video" frameborder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; speaker; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                        <div style={{ height: '20px' }}></div>

                        <h6 style={{ color: 'white' }}>Connecting your PMS (“The Works” Users)</h6>
                        <p>If you’ve selected the works plan, now is a great time to connect your PMS!</p>
                        <ol>
                          <li>Click the “Connect PMS” button</li>
                          <li>Select your PMS, click “continue”, and click on "CLICK HERE". You will be redirected to a secure integrations page where you can enter your PMS information and connect to HostBuddy. Once finished, you will be redirected to the Properties page, where you will see your PMS listed in the top right. If you do not see your PMS, please repeat steps 1 and 2 again.
                            <ul style={{ marginBottom: '0px' }}>
                              <li><em>Note: If you have trouble locating the required information, please reach out to your PMS support team or refer to your PMS user guide if available.</em></li>
                            </ul>
                          </li>
                          <li>Select your PMS and click “next”. You will be redirected to a secure integrations page where you can enter your PMS information and connect to HostBuddy. Once finished, you will be redirected to the Properties page, where you will see your PMS listed in the top right. If you do not see your PMS, please repeat steps 1 and 2 again.
                            <ul style={{ marginBottom: '0px' }}>
                              <li><em>Note: If you have trouble locating the required information, please reach out to your PMS’ support team or refer to your PMS’ user guide if available.</em></li>
                            </ul>
                          </li>
                        </ol>

                        <iframe width="560" height="315" src="https://www.youtube.com/embed/6GUYt9iKc8E?si=_dzfqiPs9blicFE4" title="PMS Integrations YouTube video" frameborder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; speaker; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                        <div style={{ height: '20px' }}></div>

                        <h6 style={{ color: 'white' }}>Customizing Properties</h6>
                        <ol>
                          <li>On the Properties page, you will see a number of editable properties matching your chosen property count in quantity. Select the pencil icon to begin customizing your HostBuddy properties.</li>
                          <li>Basics
                            <ul style={{ marginBottom: '0px' }}>
                              <li>Add a name for your property and a cover photo under “Basic Information”. After selecting save & next, please continue completing the remaining fields.</li>
                              <li>Tip: Click the pencil icon next to applicable fields to add any additional information you’d like. For example, the property type field has a pencil icon that can be used to explain that a unit is in an apartment complex, or that a room is in a shared home. This feature is available in each section to provide additional information on specific property details.</li>
                            </ul>
                          </li>
                          <li>Supporting Doc
                            <ul style={{ marginBottom: '0px' }}>
                              <li>This page allows for you to upload any documents, such as a welcome document, detailed property document or any other item that you would like HostBuddy to use to message guests. If you have subscribed to the works plan and you have not yet connected your PMS, please do so here. You also have the option of adding a URL as a supporting document. Please make sure any document or URL you upload contains the necessary information in text format, since we do not yet support image processing.</li>
                            </ul>
                          </li>
                          <li>Listing Details, Amenities, and Extras
                            <ul style={{ marginBottom: '0px' }}>
                              <li>Complete as many fields as possible. The more information you add, the better HostBuddy will be able to support your property. Please see our <a href='/tips-and-tricks' target="_blank">HostBuddy Tips and Tricks</a> page to learn our best practices for filling out this information.</li>
                            </ul>
                          </li>
                        </ol>

                        <iframe width="560" height="315" src="https://www.youtube.com/embed/uxzAcDGMaCg?si=Hc3sWHqdclU9F8qc" title="Property Profile YouTube video" frameborder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; speaker; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                        
                      </div>

                      <div className="step-box section" id="step3">
                        <h4>Step 2: Testing</h4>
                        <p>After inputting all desired property details on HostBuddy, now it’s time to thoroughly test to ensure it's ready to support your business.</p>
                        <ol>
                          <li>Select the “Test Property” button on the “Properties” page. </li>
                          <li>Compile a list of commonly asked questions that you want to make sure Hostbuddy is capable of handling. To review our recommended questions, please see our <a href='/testing-questions' target="_blank">HostBuddy Testing Questions</a> document.</li>
                          <li>Ask away! Observe HostBuddy’s responses to a variety of questions.</li>
                          <li>If HostBuddy is lacking sufficient information, head back to the Properties page and edit your property information to include what is needed. Explore how providing different information will impact your HostBuddy’s responses, and ensure it is responding just how you like it! Additionally, you’ll notice there is a thumbs up/down icon next to each response. Click this icon to provide feedback regarding the responses. This feature provides an opportunity for the technical team at HostBuddy AI to collect feedback for improving your HostBuddy. If there are responses that fall short, which you are having trouble fixing, please contact our team at info@HostBuddy.ai and provide the property name, a screenshot, and an example of your ideal host response. We will reach back out with either a recommendation for how to fix the issue, or a request to meet to discuss more nuanced requirements.</li>
                        </ol>

                        <iframe width="560" height="315" src="https://www.youtube.com/embed/WH0GhJOHMDE?si=cd3Uy6VsIMLbmjbY" title="Testing Property YouTube video" frameborder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; speaker; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

                      </div>

                      <div className="step-box section" id="step4">
                        <h4>Step 3: Going Live</h4>
                        <p>“Essentials” Users</p>
                        <ol>
                          <li>Once you are happy with the responses HostBuddy is providing, you are ready to provide HostBuddy’s unique URL to your guests for support. Click the three dots next to your property, and click “Copy URL”. The URL will be copied to your clipboard, and can be provided to your guests via booking channel, text, email, or any other platform you use to communicate.</li>
                        </ol>
                        <p>“The Works” Users</p>
                        <ol>
                          <li>Once you are happy with the responses HostBuddy is providing, it’s time to schedule HostBuddy’s first shift! Select the calendar icon below your property/s name to set a schedule for HostBuddy.
                            <ul style={{ marginBottom: '0px' }}>
                              <li>The monthly calendar is great for setting certain days/times that you require HostBuddy’s assistance. For example, if you’ll be out of town for several days you can schedule HostBuddy to activate during the exact start date/time of your trip!</li>
                              <li>The weekly schedule allows you to set an ongoing schedule for each day of the week. Our users typically schedule their HostBuddies to activate each night while they are asleep, and for other recurring unavailable times. See our <a href='/scheduling-walkthrough' target="_blank">Hostbuddy Scheduling Walkthrough</a> document for additional information on scheduling.</li>
                            </ul>
                          </li>
                        </ol>
                        <ul style={{ marginBottom: '0px' }}>
                          <li><em>Note: There is one toggle button for each property, and one master toggle button. These buttons control whether or not HostBuddy is following the schedules you have created. The “STOP” button will pause all scheduling, and HostBuddy will remain inactive until the button is clicked again. When unclicked, HostBuddy will follow the schedule. HostBuddy will remain off until it is scheduled to be active based on the statuses you’ve added to your schedule or calendar.</em></li>
                        </ul>

                        <iframe width="560" height="315" src="https://www.youtube.com/embed/JLqXXVLKQZA?si=4tjwnSojA4NLV742" title="Go Live Works YouTube video" frameborder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; speaker; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                        <iframe width="560" height="315" src="https://www.youtube.com/embed/_JVjYN4r_3A?si=AUwvE_JP52fApByx" title="Go Live Essentials YouTube video" frameborder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; speaker; picture-in-picture; web-share" referrerPolicy='strict-origin-when-cross-origin' allowFullScreen></iframe>

                      </div>

                      <div className="step-box section" id="step5">
                        <h4>Step 4: Post Go Live</h4>
                        <ol>
                          <li>After going live with HostBuddy, we advise that you closely monitor conversations between your guests and HostBuddy. You can go to the "Transcripts” page in your dashboard to see transcripts that are categorized by whether the conversation was deemed successful by HostBuddy. Conversations will be marked unsuccessful if HostBuddy does not have sufficient information to support a guest, or if there is an item that requires human intervention.</li>
                          <li>HostBuddy will track conversations and report any issues it was not able to resolve in the “Action Items” section of the dashboard. Here, you can monitor any action items that were missed when you were away, and mark them complete once they’re taken care of.</li>
                          <li>Consistently update each HostBuddy property with missing information, and if you need support, please do not hesitate to reach out to our team! Artificial intelligence is nuanced, and our team is trained to troubleshoot problems that you may encounter.</li>
                          <li>Sit back and relax! You now have state of the art technology doing the heavy lifting for you. Welcome to the future of hosting!</li>
                        </ol>
                      </div>

                      <iframe width="560" height="315" src="https://www.youtube.com/embed/v6-ha6G-Csc?si=KyJLXQ1v4KCr7l8O" title="Insights YouTube video" frameborder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; speaker; picture-in-picture; web-share" referrerPolicy='strict-origin-when-cross-origin' allowFullScreen></iframe>

                    </div>
                  </div>

                  <div className="col-lg-3">
                    <div className="step-tab-links">
                      <div className="steps-line">
                        <div className="step-active-line"></div>
                      </div>
                      <ul>
                        <li className={activeLink === 'step1' ? 'active' : ''}>
                          <button type='button' onClick={() => handleClickScroll('step1')} className='sec-link'>Onboarding Expectations and Timeline</button>
                        </li>
                        <li className={activeLink === 'step2' ? 'active' : ''}>
                          <button type='button' onClick={() => handleClickScroll('step2')} className='sec-link'>Step 1: Property Onboarding</button>
                        </li>
                        <li className={activeLink === 'step3' ? 'active' : ''}>
                          <button type='button' onClick={() => handleClickScroll('step3')} className='sec-link'>Step 2: Testing</button></li>
                        <li className={activeLink === 'step4' ? 'active' : ''}>
                          <button type='button' onClick={() => handleClickScroll('step4')} className='sec-link'>Step 3: Going Live</button>
                        </li>
                        <li className={activeLink === 'step5' ? 'active' : ''}>
                          <button type='button' onClick={() => handleClickScroll('step5')} className='sec-link'>Step 4: Post Go Live</button>
                        </li>
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
  )
}

export default SetupGuide
