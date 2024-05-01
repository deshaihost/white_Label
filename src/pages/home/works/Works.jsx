import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import './works.css';
import WorksOne from '../../../public/img/home/openai_logo.png';
import WorksTwo from '../../../public/img/home/Property_customization.png';
import WorksThree from '../../../public/img/home/full_host_control.png';
import WorksFour from '../../../public/img/home/tailored_recommendations.png';

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
                                <h4><strong>AI-Powered </strong> Communication</h4>
                                <p>Experience hosting in the digital age. HostBuddy’s AI-powered communication revolutionizes the way you interact with your guests, providing instant assistance, 24/7 availability, and personalized responses.</p>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <img src={WorksOne} alt='works-img' />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-lg-6">
                            <div className="works-content">
                                <h4>Property <strong> Customization</strong></h4>
                                <p>Tailor your hosting experience with HostBuddy’s Property Customization feature. There's no limit to what HostBuddy can learn.</p>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <img src={WorksTwo} alt='works-img' />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-lg-6">
                            <div className="works-content">
                                <h4>Full <strong> Host Control</strong> </h4>
                                <p>Experience full host control with HostBuddy’s 24/7 Support. Choose when to give Hostbuddy control and when you'd like to jump back in. Customize your weekly calendar to ensure full coverage during the busiest hours of each day.</p>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <img src={WorksThree} alt='works-img' />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-lg-6">
                            <div className="works-content">
                                <h4><strong>Tailored Recommendations </strong> for Improvement</h4>
                                <p>Hostbuddy tracks conversations to help inform you of what information it is missing. This ensures that Hostbuddy has everything it needs to best support your business and guests.</p>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <img src={WorksFour} alt='works-img' />
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    )
}

export default Works;