import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import './works.css';
import { Link } from 'react-router-dom';

const AssistantImg = 'https://hostbuddylb.com/home/assistant.webp';
const IntegrationsImg = 'https://hostbuddylb.com/home/integrations_works_crop.webp';
const PropertyWithAmenitiesImg = 'https://hostbuddylb.com/home/property_with_amenities.webp';
const lateNightBot = 'https://hostbuddylb.com/home/empty_desk_night.webp';

const cleaningManagement = 'https://storage.googleapis.com/frontend_media/home-new/Cleaning%20Management%20Software%20Integrations%20(coming%20soon).webp';
const stayInCharge = 'https://storage.googleapis.com/frontend_media/home-new/stay%20in%20control.webp';
const teamSpecific = 'https://storage.googleapis.com/frontend_media/home-new/Team%20Specific%20Notifications%20(coming%20soon).webp';
const vacantNight = 'https://storage.googleapis.com/frontend_media/home-new/Vacant%20Night%20Upsells%20(coming%20soon).webp';
const stayInformed = 'https://storage.googleapis.com/frontend_media/home-new/Stay%20Informed.webp';
const schedule = 'https://storage.googleapis.com/frontend_media/home-new/Schedule%20Based%20On%20Your%20Needs%20(1).webp';
const unlimitedTesting = 'https://storage.googleapis.com/frontend_media/home-new/Test%20Before%20You%20Subscribe.webp';
const robustCustomization = 'https://storage.googleapis.com/frontend_media/home-new/Customized%20Representation.webp';
const seamlessPropertySetup = 'https://storage.googleapis.com/frontend_media/home-new/Seamless%20Property%20Setup.webp';
const industryLeadingAI = 'https://storage.googleapis.com/frontend_media/home-new/Industry%20Leading%20AI.webp';
const SmartTemlating = 'https://storage.googleapis.com/frontend_media/home-new/ReviewRequest.webp'

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
                                <p>Set up all your properties in minutes by simply connecting your property management system. HostBuddy does the legwork for you by extracting information from existing welcome documents, listing information, past conversations, or any other available resources to automatically create an organized database used to support your guests.</p>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <img src={seamlessPropertySetup} alt='works-img' />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-lg-6">
                            <div className="works-content">
                                <h3>Guest <strong>Upsells</strong></h3>
                                <p>Have HostBuddy pay for itself by offering your guests extension discounts for vacant nights created by minimum stay requirements. Impress your guests with early check-ins and late checkout offers. Automatically follow up with guests who have gone silent after sending an inquiry.</p>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <img src={vacantNight} alt='works-img' />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-lg-6">
                            <div className="works-content">
                                <h3><strong>Smart</strong> Templating</h3>
                                <p>Target the right guests at the right time with intelligent, context-aware templated messages. Automatically send review requests to guests who express positive sentiments about their experience, and skip those who are dissatisfied.</p>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <img src={SmartTemlating} alt='works-img' />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-lg-6">
                            <div className="works-content">
                                <h3><strong>Unlimited</strong> Testing</h3>
                                <p>Set up your properties and simulate test messages without a subscription. Test as much as you'd like before even beginning your free trial.</p>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <img src={unlimitedTesting} alt='works-img' />
                        </div>
                    </div>

                    {/*
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="works-content">
                                <h3><strong>Grounded</strong> Responses</h3>
                                <p>Don’t stress about hallucinations - HostBuddy is meticulously designed to respond based only on your property details, and can explain each response to ensure transparency.</p>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <img src={groundedResponses} alt='works-img' />
                        </div>
                    </div>
                    */}

                    <div className="row">
                        <div className="col-lg-6">
                            <div className="works-content">
                                <h3>Schedule Based On <strong>Your Needs</strong></h3>
                                <p>Think of HostBuddy as the most dedicated employee you could have. Available anytime you need support, HostBuddy can be scheduled to fit your specific coverage needs. Say goodbye to lockouts, late-night messages, and issue troubleshooting—HostBuddy will take it from here.</p>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <img src={schedule} alt='works-img' />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-lg-6">
                            <div className="works-content">
                                <h3><strong>Stay Informed</strong> With Updates From HostBuddy</h3>
                                <p>HostBuddy analyzes each conversation, identifies issues and action items, and brings them to your attention so you can see what’s important at a glance. You can receive these updates through text, email, or Slack integration to stay in the loop.</p>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <img src={stayInformed} alt='works-img' />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-lg-6">
                            <div className="works-content">
                                <h3><strong>Robust</strong> Customization</h3>
                                <p>With advanced customization options, HostBuddy is designed for maximum flexibility to fit the needs of your business, no matter how complicated they may be. You can set behavior and tone to your likings, and you're always in full control of HostBuddy's knowledge base.</p>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <img src={robustCustomization} alt='works-img' />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-lg-6">
                            <div className="works-content">
                                <h3><strong>Team Specific</strong> Notifications</h3>
                                <h4>(coming soon)</h4>
                                <p>Seeking the ability to have HostBuddy send action items directly to certain members of your team? Using advanced categorization, HostBuddy can identify issues and send requests for support directly to operations, cleaning or maintenance teams depending on the nature of the issue.</p>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <img src={teamSpecific} alt='works-img' />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-lg-6">
                            <div className="works-content">
                                <h3><strong>Directed</strong> Responses</h3>
                                <h4>(coming soon)</h4>
                                <p>HostBuddy will notify you when a guest message requires action or decision making beyond its capability. Respond directly to the notification to make the final call, and HostBuddy will send the appropriate response based on your guidance.</p>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <img src={stayInCharge} alt='works-img' />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-lg-6">
                            <div className="works-content">
                                <h3>Cleaning Management Software <strong>Integrations</strong></h3>
                                <h4>(coming soon)</h4>
                                <p>Keep HostBuddy informed about when your properties are ready for check-in. Pull updates directly from your cleaning management systems to allow for early check-ins when they are available.</p>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <img src={cleaningManagement} alt='works-img' />
                        </div>
                    </div>

                </div>
            </Container>
        </section>
    )
}

export default Works;