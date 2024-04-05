import React, { useState, useEffect } from 'react'
import SideBar from '../../component/sideBar/SideBar';
import { Link } from 'react-router-dom';
import './setupguide.css';

const SetupGuide = () => {
  const [activeLink, setActiveLink] = useState('');
  const handleClickScroll = (id) => {
    console.log("id", id)
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
      <div className="container">
        <div className="banner-heading">
          <h2>My HostBuddy</h2>
          <p>Manage your profile here </p>
        </div>
        <div className="row">
          <div className="col-lg-4">
            <SideBar />
          </div>
          <div className="col-lg-8">
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
                        <p>Overview of major milestones in onboarding</p>
                        <p><em>Updated over a week ago</em></p>
                        <p>Welcome to HostBuddy AI! Follow the directions below to begin Onboarding your Hostbuddy AI Communications Support Platform.</p>
                        <ul>
                          <li> <Link to='/'>Onboarding Expectations and Timeline</Link></li>
                          <li> <Link to='/'>Your First Assignment</Link></li>
                          <li> <Link to='/'>Configuring Pricing</Link></li>
                          <li> <Link to='/'>Payment Methods</Link></li>
                          <li> <Link to='/'>Importing Reservations</Link></li>
                          <li> <Link to='/'>Automated Messaging</Link></li>
                          <li> <Link to='/'>Channel Requirements</Link></li>
                        </ul>
                      </div>
                      <div className="step-box section" id="step1">
                        <h5>Onboarding Expectations and Timeline:</h5>
                        <p>Onboarding is typically a 45 day period where you’ll meet with an Onboarding Specialist to review the required steps to connect to your booking channels, ask questions, and review your progress. We typically see users go live with their booking channels within 1-2 weeks of using the platform. Onboarding can definitely be expedited, however, it is dependent upon your willingness to learn the system, complete action items, and any channel/integration delays. You’ll meet with your Onboarding Specialist 3 times throughout the 45 days to check in on your progress and get questions answered. Don’t worry, we have lots of resources to guide you through this process!</p>
                        <p>After you graduate from Onboarding, you will work directly with our amazing Customer Support team for any technical assistance. You might even interact with them during Onboarding. You can utilize the chat button (on the bottom right corner of the platform) to reach out anytime!</p>
                        <p>For general questions about the Onboarding process, check out our welcome page below:</p>
                      </div>

                      <div className="step-box section" id="step2">
                        <h5>Step 1:&nbsp;<Link to="/setup-guide/">Your First Assignment</Link>&nbsp;(Before your 1st Onboarding Call)</h5>
                        <p>Start with the basics! Completing the action items below will prepare you for your 1st Onboarding Call and expedite your Onboarding Process.</p>
                        <ul>
                          <li><Link to="/setup-guide/">Set up your agency settings</Link></li>
                          <li><Link to="/setup-guide/">Add your properties to the system</Link></li>
                          <li><Link to="/setup-guide/">Set up Pricing&nbsp;<strong>(more information on Step 2 below)</strong></Link></li>
                          <li><Link to="/setup-guide/">Add Rental Conditions</Link></li>
                          <li><Link to="/setup-guide/">Enable a payment processor in Hostfully</Link></li>
                          <li><Link to="/setup-guide/">Create accounts for any channel or integration partners you wish to use</Link></li>
                        </ul>
                        <p>
                          <iframe
                            width="560"
                            height="315"
                            src='https://www.youtube.com/embed/GDFm-hwDSrw?si=5QXSMNVlhrJ-IQe6'
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            title="YouTube video player"
                          />
                        </p>
                      </div>

                      <div className="step-box section" id="step3">
                        <h5>Step 2: Configuring Pricing</h5>
                        <p>Now that you have your properties in the system, the next step will be to update the pricing. Once you configure pricing in Hostfully and sync to the bookings channels, Hostfully becomes your source of truth for all data. In the future, you’ll make any changes in the Hostfully system and we will push that data to the bookings channels for you. But first, you need to get that data into the system! You have two choices:</p>
                        <ol>
                          <li>
                            <h6>Dynamic Pricer</h6>
                            <p>Use dynamic pricing software like Price Labs or Beyond Pricing to set up pricing with Hostfully. For the most up-to-date list of dynamic pricing options, please refer to the Hostfully Integrations Zone.</p>
                            <p>Below are a list of current help articles explaining how to set up different dynamic pricing tools with the Hostfully platform.</p>
                            <div class="contents_table">
                              <ul>
                                <li>Setting up Price Labs</li>
                                <li>Setting up Wheelhouse</li>
                                <li>Setting up Beyond Pricing</li>
                                <li>Setting up DPGO</li>
                                <li>Setting up NightPricer</li>
                              </ul>
                            </div>
                          </li>
                          <li>
                            <h6>Manual Pricing</h6>
                            <p>If you don’t want to use pricing software you can also manually configure pricing in Hostfully. You can set up your base right, weekend rate adjustment, seasonal pricing periods, and more under the Pricing tab of your listings. If you’ve imported your listing from Airbnb, the pricing data will also import into Hostfully. You will want to make sure your pricing calendar is updated and accurate before going live with any booking channel. Please review this article and the tutorial video below to configure pricing manually:</p>
                          </li>
                        </ol>
                        <h5>Video Tutorial</h5>
                        <p>
                          <iframe
                            width="560"
                            height="315"
                            src='https://www.youtube.com/embed/KWqaHWZKSh8?si=1Ck5SrR1VlPVn3-V'
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            title="YouTube video player"
                          />
                        </p>
                      </div>

                      <div className="step-box section" id="step4">
                        <h5>Step 3: Payment Methods</h5>
                        <p>You’ll need to set up a payment method in order to collect payment from your guests. We have 3 options for payment processors. Please review the articles for setup instructions and contact these companies directly to confirm their fees and features.</p>
                        <p>These three options can be used for direct bookings and channels that require/allow you to be the merchant of record (Vrbo/Booking.com).</p>
                        <ol>
                          <li>Stripe (able to set on property level aka can connect multiple Stripe accounts and have a different Stripe account per property)</li>
                          <li>Vacation Rent Payment (all or nothing. 1 VRP account to 1 Hostfully account for all properties)</li>
                          <li>Paypal (able to set on property level). This option can be used for direct bookings. It can also be used for Vrbo and Booking.com payment processing, but not in the traditional sense. Please see the PayPal help article for more information.</li>
                        </ol>
                        <p>If your country is not supported by these companies or you are going to use non-credit card payment methods, you’ll need to set up invoice methods (requirement for Vrbo if you are not using a payment processor).</p>
                      </div>

                      <div className="step-box section" id="step5">
                        <h5>Step 4: Add Your Existing Reservations</h5>
                        <p>Before syncing any channels, you’ll want to make sure your existing reservations are in the system so you don’t get double bookings.</p>
                        <p>We also import past reservations. 1 year back for Airbnb and 6 months back for Booking.com. Guest data (name, contact) may not be provided to us by the partner for these reservations per their policy and show as unknown.</p>
                        <p>Any outstanding Direct, Vrbo, or any other channel reservation will need to be added to your Hostfully calendar.</p>
                        <ul>
                          <li>Less than 20 – Manually add them by following this help article</li>
                          <li>More than 20 – you can manually add them or complete a spreadsheet and have us upload it. For instructions on using our reservation spreadsheet, see this help article.</li>
                        </ul>
                        <p>
                          <iframe
                            width="560"
                            height="315"
                            src='https://www.youtube.com/embed/Jj5OXl3IftU?si=wMgEH4AsWvhFnpkz'
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            title="YouTube video player"
                          />
                        </p>
                      </div>

                      <div className="step-box section" id="step6">
                        <h5>Step 5: Automatic Messaging</h5>
                        <p>If you want to set up automatic messaging, you can do this before syncing booking channels. However, you do not have to do this before syncing. If you want to sync first and create messaging later, feel free to do it this way also!</p>
                        <p><Link to='/'>How to set up automatic messaging</Link></p>
                        <h5>Video Tutorial</h5>
                        <p>
                          <iframe
                            width="560"
                            height="315"
                            src='https://www.youtube.com/embed/t52UMsfW1Ws?si=J86f3ROHwSdSbdhH'
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            title="YouTube video player"
                          />
                        </p>
                      </div>

                      <div className="step-box section" id="step7">
                        <h5>Step 6: Setting Up the Bookings Channels</h5>
                        <p>We integrate with a number of bookings channels.</p>
                        <p>Please make sure you have taken the following actions before syncing.</p>
                        <ol>
                          <li>Imported all properties.</li>
                          <li>Configured pricing on all properties.</li>
                          <li>Integrated payment processor.</li>
                          <li>Entered all non-Airbnb reservations.</li>
                        </ol>
                        <p>Then you can sync with any of these channels following the linked directions.</p>
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
                          <button type='button' onClick={() => handleClickScroll('step1')} className='sec-link'>Onboarding Expectations and Timeline:</button>
                        </li>
                        <li className={activeLink === 'step2' ? 'active' : ''}>
                          <button type='button' onClick={() => handleClickScroll('step2')} className='sec-link'>Step 1: Your First Assignment (Before your 1st Onboarding Call)</button>
                        </li>
                        <li className={activeLink === 'step3' ? 'active' : ''}>
                          <button type='button' onClick={() => handleClickScroll('step3')} className='sec-link'>Step 2: Configuring Pricing</button></li>
                        <li className={activeLink === 'step4' ? 'active' : ''}>
                          <button type='button' onClick={() => handleClickScroll('step4')} className='sec-link'>Step 3: Payment Methods</button>
                        </li>
                        <li className={activeLink === 'step5' ? 'active' : ''}>
                          <button type='button' onClick={() => handleClickScroll('step5')} className='sec-link'>Step 4: Add Your Existing Reservations</button>
                        </li>
                        <li className={activeLink === 'step6' ? 'active' : ''}>
                          <button type='button' onClick={() => handleClickScroll('step6')} className='sec-link'>Step 5: Automatic Messaging</button>
                        </li>
                        <li className={activeLink === 'step7' ? 'active' : ''}>
                          <button type='button' onClick={() => handleClickScroll('step7')} className='sec-link'>Step 6: Setting Up the Bookings Channels</button>
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
