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
                    <h2>How it Works 
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
                                <h4><strong>Automate</strong> Your Guest Communications</h4>
                                <p>Created by hosts, for hosts, HostBuddy is the leading AI messaging software for short term rental hosts. HostBuddy lets you automate the demanding responsibilities of guest communication, allowing you to relax knowing your guests are well taken care of.</p>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <img src={lateNightBot} alt='works-img' />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-lg-6">
                            <div className="works-content">
                                <h4><strong>Integrate</strong> Into Your Existing Systems</h4>
                                <p>Connect a PMS account to give HostBuddy access to property details and real-time guest information, and to let HostBuddy see and respond to guest messages over your existing communication channels. HostBuddy can integrate with most major property management softwares on the market - <Link to='/faq'>See the full list.</Link></p>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <img src={IntegrationsImg} alt='works-img' />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-lg-6">
                            <div className="works-content">
                                <h4>Tailor To <strong>Your Specifications</strong></h4>
                                <p>Our interface makes it easy for you to provide property information, troubleshooting instructions, or any other relevant details for HostBuddy to use in supporting guests. Our easy-to-follow setup guide will have your application ready to go live quickly and effortlessly.</p>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <img src={PropertyWithAmenitiesImg} alt='works-img' />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-lg-6">
                            <div className="works-content">
                                <h4><strong>Schedule</strong> To Your Needs</h4>
                                <p>Think of HostBuddy as the most dedicated employee you could have. Available anytime you need support, HostBuddy can be scheduled to fit your specific coverage needs. Say goodbye to lockouts, late-night messages, and issue troubleshooting—HostBuddy will take it from here.</p>
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