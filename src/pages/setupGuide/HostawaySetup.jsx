import React, { useState, useEffect } from 'react'
import SideBar from '../../component/sideBar/SideBar';
import './setupguide.css';
import { Helmet } from 'react-helmet';
import Authorized from '../../helper/Authorized';

const HostawaySetupImg = "https://hostbuddylb.com/setup-guide/hostaway_setup.png";

const HostawaySetup = () => {

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

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('.step-box.section');
      sections.forEach(section => {
        const bounding = section.getBoundingClientRect();
        if (bounding.top <= 20 && bounding.bottom >= 50) {
          setActiveLink(section.id);
        }
      });
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
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
                        <p>For some of our frequently asked questions, please visit <a href='/faqs' target="_blank">our FAQ page</a></p>
                      </div>

                      <div className="step-box section" id="step2">
                        <h4>Step 1: Property Onboarding</h4>
                        <p>Below is a step by step guide for onboarding your first property!</p>

                        <h6 style={{ color: 'white' }}>Connecting Hostaway (“The Works” Users)</h6>
                        <p>If you plan to use either of “The Works” plans, you will start by integrating Hostaway.</p>
                        <ol>
                          <li>Click the “PMS Integration” button on your “Properties” page.</li>
                          <li>Select Hostaway and click “Continue”. You will be redirected to a secure integrations page where you can enter your Hostaway Account ID and API key to connect with HostBuddy.
                            <ul style={{ marginBottom: '0px' }}>
                              <li>To find your API Key and Account ID on Hostaway, navigate to “Settings” within your Hostaway account.</li>
                              <li>Next, select “Hostaway API” at the top of your screen (left of notifications).</li>
                              <li>Next, select “Create” at the top left. Here you will name your key and choose “Hostaway Public API” in the partner drop down.</li>
                              <li>After clicking “Create” the next window will display your API Key and Account ID.</li>
                            </ul>
                          </li>
                          <img src={HostawaySetupImg} alt="Hostaway Setup"/>
                          <li>Once you have added your API key and Account ID to the HostBuddy integrations page, you will be redirected back to the Properties page, where you will see “Hostaway” listed on the top right.
                            <ul style={{ marginBottom: '0px' }}>
                              <li><em>If you have trouble locating the required information, you can navigate to Hostaway's instruction page <a href='https://support.hostaway.com/hc/en-us/articles/360002576293-Hostaway-Public-API-Account-Secret-Key' target="_blank" rel="noreferrer">here</a>.</em></li>
                            </ul>
                          </li>
                          <li>After you have connected Hostaway, you will select “Import Properties”. Here you can select which properties you would like to build a HostBuddy integration with. After selecting all desired properties, click “Import These Properties” at the bottom of your screen.
                            <ul style={{ marginBottom: '0px' }}>
                              <li><em>Please note: It can take some time for the listings to connect after you have added your integrations. You can take this time to grab a coffee or begin writing down common questions that you receive from guests that can be used while testing.</em></li>
                            </ul>
                          </li>
                        </ol>
                        
                      </div>

                      <div className="step-box section" id="step3">
                        <h4>Step 2: Customizing Property Profiles</h4>

                        <ol>
                          <li>You should now see a list of properties that you have imported. HostBuddy will have pulled accessible property data to autofill your property name and image. Select the pencil icon to begin further customizing your Hostbuddy property profiles.</li>
                          <li>Resources<br />
                          The first page, titled “Resources”, can be used to help expedite your onboarding process. Here, you will see your connected listing from Hostaway and can upload resources such as welcome documents and technical documents, which will be used to autofill your property profile. Once all desired documents and integrations have been provided, you can select “Auto-Fill Property Details” to auto-fill information from your various resources.
                            <ul style={{ marginBottom: '0px' }}>
                              <li>The “HostBuddy Knowledge Base” section will indicate which “Auto-Fill” resources have already been utilized.</li>
                              <li>For each document that you upload, you will be able to decide which reservation phases you would like information to apply to. If you have information that is only relevant to current guests (backup codes, lockbox instructions, etc.), you can deselect specific reservation phases. This can also be done for specific information fields by selecting the pencil icon next to each field.</li>
                              <li>If you have similar properties, you can paste data pulled from previously completed property profiles. Simply click “Copy Data From Other Property” located at the bottom of the screen and indicate which existing property you would like to paste from.</li>
                              <li>When adding additional resources after the initial auto-fill, HostBuddy will only add new information that is relevant to your property.</li>
                            </ul>
                          </li>
                          <li>Basics<br />
                          Review and add any information that is missing or needs adjustment after auto populating your resources.<br />
                          Tip: Click the pencil icon  next to applicable fields to add any additional information you’d like. For example, the property type field has a pencil icon that can be used to explain that a unit is in an apartment complex, or that a room is in a shared home. This feature is available in each section to provide additional information on specific property details.</li>
                          <li>Listing Details, Amenities, and Extras<br />
                          Complete and elaborate on as many fields as possible. The more information that you add, the better HostBuddy will be able to support your property. The pencil icon can be used on every field to provide additional information for HostBuddy’s knowledgebase. You should review auto-populated fields to ensure information is correct. Please read our <a href='/tips-and-tricks' target="_blank">HostBuddy Tips and Tricks</a> page to learn our best practices for filling out this information.</li>
                        </ol>

                      </div>

                      <div className="step-box section" id="step4">
                        <h4>Step 3: Post Go Live</h4>

                        <p>After inputting all desired property details on HostBuddy, now it’s time to thoroughly test to ensure HostBuddy is ready to support your guests.</p>
                        <ol>
                          <li>Select the “Test Property” button on the “Properties” page.</li>
                          <li>Compile a list of commonly asked questions that you want to ensure HostBuddy is capable of handling. We have a list that you can use for this phase, but we recommend that you tailor the questions to your most common scenarios. To review our recommended questions, please see our <a href='/testing-questions' target="_blank">HostBuddy Testing Questions</a> page.</li>
                          <li>Take note of each response that does not align with your expectations. For information that HostBuddy is missing, please return to the “Properties” page, and select edit for the given property. Here, you can make refinements to the information that you would like for HostBuddy to use. If there are responses that fall short, which you are having trouble fixing, please contact our team at info@hostbuddy.ai and provide the property name, a screenshot, and an example of what the response should have been. We will reach back out with either a recommendation for how to fix the issue, or a request to meet to discuss more nuanced requirements.</li>
                        </ol>
                      </div>

                      <div className="step-box section" id="step5">
                        <h4>Step 4: Going Live</h4>

                        <p>4a. Subscription</p>
                        <ol>
                          <li>When you are happy with how HostBuddy is performing, you will be able to begin providing access to HostBuddy to your guests. You must subscribe to begin offering actual communication support.</li>
                          <li>Select “Subscribe”<br />
                          Here you will choose the number of properties you plan to add, along with the plan that you are interested in. The main difference between our packages is that “The Works” has a limit of 12 hours of communication coverage per day, while The Works Unlimited has no limits to coverage.
                            <ul style={{ marginBottom: '0px' }}>
                              <li><em>Please Note: The number of properties you have when you subscribe will be the number of properties you can use for your free trial and intro discount. Be sure to subscribe only when you have the exact number of properties that you would like to use for the trial, as your selection will be final for the trial period. You can of course add more properties later, but they will not qualify for your trial period. Your card will not be charged until your trial period has been completed.</em></li>
                            </ul>
                          </li>
                          <li>Once you continue, you will be directed to our Stripe payment portal. Please enter in your payment information, discount code (Hostaway2024!) and click submit, which will bring you back to the Properties page.</li>
                          <li>This will begin any free or discounted trials that might apply to your account.</li>
                        </ol>
                        <p>4b. Scheduling HostBuddy</p>
                        <ol>
                          <li>Once you are happy with the responses HostBuddy is providing and have subscribed, it’s time to schedule HostBuddy’s first shift! Select the calendar icon below your property(s) name to set a schedule for HostBuddy.</li>
                          <li>The monthly schedule is great for setting certain days that you plan to be offline. The schedule button allows for you to set an ongoing schedule for each calendar day in a week. See our <a href='/scheduling-walkthrough' target="_blank">HostBuddy Scheduling Walkthrough</a> page for additional information on scheduling.</li>
                        </ol>
                        <ul style={{ marginBottom: '0px' }}>
                          <li><em>Note: There is one toggle button for each property, and one master toggle button. These buttons control whether or not HostBuddy is following the schedules you have created. The “STOP” button will pause all scheduling, and HostBuddy will remain inactive until the button is clicked again. When unclicked, HostBuddy will follow the schedule. HostBuddy will remain off until it is scheduled to be active based on the statuses you’ve added to your schedule or calendar.</em></li>
                        </ul>

                      </div>

                      <div className="step-box section" id="step6">
                        <h4>Step 5: Post Go Live</h4>

                        <ol>
                          <li>After going live with HostBuddy, we advise that you closely monitor conversations between your guests and HostBuddy. You can go to the “Action Items” section in your dashboard to review conversations marked as needing attention. You can also visit the transcripts page to review all conversations that HostBuddy has had involvement in.</li>
                          <li>To enroll in notifications for “Action Items”, navigate to the account page. Here, you can add contacts in the “Contact” tab in the form of email, phone number (for text notifications), and Slack. Once you have added your relevant contact information, you can select the “Notifications” tab to schedule and enroll in notifications.</li>
                          <li>Regularly update each HostBuddy property with missing information, and if you need support, please do not hesitate to reach out to our team. Artificial intelligence is nuanced, and our team is trained to troubleshoot problems that you may encounter.</li>
                          <li>Sit back and relax! You now have state of the art technology doing the heavy lifting for you. Welcome to the future of hosting!</li>
                        </ol>
                      </div>

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
                          <button type='button' onClick={() => handleClickScroll('step3')} className='sec-link'>Step 2: Customizing Property Profiles</button></li>
                        <li className={activeLink === 'step4' ? 'active' : ''}>
                          <button type='button' onClick={() => handleClickScroll('step4')} className='sec-link'>Step 3: Testing</button>
                        </li>
                        <li className={activeLink === 'step5' ? 'active' : ''}>
                          <button type='button' onClick={() => handleClickScroll('step5')} className='sec-link'>Step 4: Going Live</button>
                        </li>
                        <li className={activeLink === 'step6' ? 'active' : ''}>
                          <button type='button' onClick={() => handleClickScroll('step6')} className='sec-link'>Step 5: Post Go Live</button>
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

export default HostawaySetup
