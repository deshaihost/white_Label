import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import './works.css';
import { Link } from 'react-router-dom';

/*
import AssistantImg from 'https://hostbuddylb.com/home/assistant.png';
import IntegrationsImg from 'https://hostbuddylb.com/home/integrations_works_crop.png';
import PropertyWithAmenitiesImg from 'https://hostbuddylb.com/home/property_with_amenities.jpeg';
import lateNightBot from 'https://hostbuddylb.com/home/empty_desk_night.png';
*/

const AssistantImg = 'https://hostbuddylb.com/home/assistant.webp';
const IntegrationsImg = 'https://hostbuddylb.com/home/integrations_works_crop.webp';
const PropertyWithAmenitiesImg = 'https://hostbuddylb.com/home/property_with_amenities.webp';
const lateNightBot = 'https://hostbuddylb.com/home/empty_desk_night.webp';

const Works = () => {
    return(
        <section className='works'>
            <div className="works-heading">
                <Container>
                    <div className="speed-circle"></div>
                    <h2>Features 
                        <svg xmlns="http://www.w3.org/2000/svg" width="19" height="18" viewBox="0 0 19 18" fill="none">
                            <path d="M9.5 0L10.7092 7.79085L18.5 9L10.7092 10.2092L9.5 18L8.29085 10.2092L0.5 9L8.29085 7.79085L9.5 0Z" fill="url(#paint0_linear_27_486)"></path>
                            <path d="M15.5 12L16.094 14.406L18.5 15L16.094 15.594L15.5 18L14.906 15.594L12.5 15L14.906 14.406L15.5 12Z" fill="url(#paint1_linear_27_486)"></path>
                            <defs>
                                <linearGradient id="paint0_linear_27_486" x1="9.5" y1="0" x2="9.5" y2="18" gradientUnits="userSpaceOnUse">
                                    <stop stop-color="#F9FBFF"></stop>
                                    <stop offset="1" stop-color="#6CA7FF"></stop>
                                </linearGradient>
                                <linearGradient id="paint1_linear_27_486" x1="15.5" y1="12" x2="15.5" y2="18" gradientUnits="userSpaceOnUse">
                                    <stop stop-color="#F9FBFF"></stop>
                                    <stop offset="1" stop-color="#6CA7FF"></stop>
                                </linearGradient>
                            </defs>
                        </svg>
                    </h2>
                </Container>
            </div>
            <Container>
                <div className="works-container">
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="works-content">
                                <h3><strong>Industry-Leading</strong> AI Technology</h3>
                                <p>HostBuddy is built with effective guest communication at the core of its design, using the most advanced AI available today. It is trained to be conversational, solution-focused, and perhaps most importantly, to sound like a human.</p>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <img src={lateNightBot} alt='works-img' />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-lg-6">
                            <div className="works-content">
                                <h3><strong>Seamless</strong> Property Setup with Autofill</h3>
                                <p>Set up each property in minutes by simply connecting your property management system. HostBuddy does the legwork for you by extracting information from existing welcome documents, listing information, past conversations, or any other available resources to automatically create an organized database used to support your guests.</p>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <img src={IntegrationsImg} alt='works-img' />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-lg-6">
                            <div className="works-content">
                                <h3><strong>Unlimited</strong> Testing</h3>
                                <p>No subscription is required to set up your properties with HostBuddy. Once you have completed onboarding, you can thoroughly test responses directly from your dashboard prior to hiring HostBuddy to support your guests. This ensures that you are satisfied with responses before even beginning your 2 week trial period.</p>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <img src={PropertyWithAmenitiesImg} alt='works-img' />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-lg-6">
                            <div className="works-content">
                                <h3><strong>Stay Informed</strong> With Updates From HostBuddy</h3>
                                <p>HostBuddy analyzes each conversation, identifies issues and action items, and brings them to your attention on the dashboard, so you can see what’s important at a glance. You can easily receive these updates through text, email, and our Slack integration by setting up notifications in your account settings.</p>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <img src={AssistantImg} alt='works-img' />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-lg-6">
                            <div className="works-content">
                                <h3>Schedule Based On <strong>Your Needs</strong></h3>
                                <p>Think of HostBuddy as the most dedicated employee you could have. Available anytime you need support, HostBuddy can be scheduled to fit your specific coverage needs. Say goodbye to lockouts, late-night messages, and issue troubleshooting—HostBuddy will take it from here.</p>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <img src={AssistantImg} alt='works-img' />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-lg-6">
                            <div className="works-content">
                                <h3><strong>Customized</strong> Representation</h3>
                                <p>With advanced customization options, HostBuddy can be tailored to fit the needs of your business, no matter how complicated they may be. HostBuddy is capable of mirroring your tone and handling emergency situations based on your preferences.</p>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <img src={AssistantImg} alt='works-img' />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-lg-6">
                            <div className="works-content">
                                <h3><strong>Team Specific</strong> Notifications</h3>
                                <h4>(coming soon)</h4>
                                <p>Seeking the ability to have HostBuddy send action items directly to certain members of your team? Using advanced categorization of issues, HostBuddy can send requests for support directly to teams involved in operations, cleaning or maintenance.</p>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <img src={AssistantImg} alt='works-img' />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-lg-6">
                            <div className="works-content">
                                <h3><strong>Guest Relay</strong> For Hosts</h3>
                                <h4>(coming soon)</h4>
                                <p>Respond directly to HostBuddy for action item resolution. Provide status updates, decisions, and information for situations that require your feedback through your notification channels, allowing HostBuddy to communicate on your behalf.</p>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <img src={AssistantImg} alt='works-img' />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-lg-6">
                            <div className="works-content">
                                <h3>Vacant Night <strong>Upsells</strong></h3>
                                <h4>(coming soon)</h4>
                                <p>Have HostBuddy pay for itself by offering your guests extension discounts for vacant nights created by minimum stay requirements. Alternatively, impress your guests with early check-ins and late checkouts on days that cannot be booked.</p>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <img src={AssistantImg} alt='works-img' />
                        </div>
                    </div>

                </div>
            </Container>
        </section>
    )
}

export default Works;