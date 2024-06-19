import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import './features.css';
import Accordion from 'react-bootstrap/Accordion';

/*
import FeatureIconOne from '../../../public/img/home/feature_icon1.png';
import FeatureIconTwo from '../../../public/img/home/feature_icon2.png';
import FeatureIconThree from '../../../public/img/home/feature_icon3.png';
import FeatureIconFour from '../../../public/img/home/feature_iconnew1.png';
import ComputerBrainImg from '../../../public/img/home/intelligence.png';
import ControlToggleImg from '../../../public/img/home/host_control_toggle.png';
import EditPropertyImg from '../../../public/img/home/Property_customization.png';
import transcriptsPanel from '../../../public/img/home/actionItems_and_transcripts.png';
*/

const FeatureIconOne = 'https://hostbuddylb.com/home/feature_icon1.webp';
const FeatureIconTwo = 'https://hostbuddylb.com/home/feature_icon2.webp';
const FeatureIconThree = 'https://hostbuddylb.com/home/feature_icon3.webp';
const FeatureIconFour = 'https://hostbuddylb.com/home/feature_iconnew1.png';

const ComputerBrainImg = 'https://hostbuddylb.com/home/intelligence.webp';
const ControlToggleImg = 'https://hostbuddylb.com/home/host_control_toggle.webp';
const EditPropertyImg = 'https://hostbuddylb.com/home/Property_customization.webp';
const transcriptsPanel = 'https://hostbuddylb.com/home/actionItems_and_transcripts.webp';

const Features = () => {
    const [activeKey, setActiveKey] = useState("0");
    const handleToggle = (eventKey) => {
        setActiveKey(eventKey === activeKey ? null : eventKey);
    };
    return (
        <section className="features">
            <Container>
                <h3>Features <svg xmlns="http://www.w3.org/2000/svg" width="18" height="19" viewBox="0 0 18 19" fill="none">
                            <path d="M9 0.5L10.2092 8.29085L18 9.5L10.2092 10.7092L9 18.5L7.79085 10.7092L0 9.5L7.79085 8.29085L9 0.5Z" fill="#146EF5"></path>
                            <path d="M15 12.5L15.594 14.906L18 15.5L15.594 16.094L15 18.5L14.406 16.094L12 15.5L14.406 14.906L15 12.5Z" fill="#146EF5"></path>
                        </svg></h3>
                <div className="heading heading-center">
                    <h2>Discover <strong>HostBuddy’s</strong> Innovative Features</h2>
                </div>
                <div className="row">
                    <div className="col-lg-6">
                        <div className="features-content">
                            <Accordion defaultActiveKey="0" activeKey={activeKey} onSelect={handleToggle}>
                                <Accordion.Item eventKey="0" className={activeKey === "0" ? 'active' : ''}>
                                    <Accordion.Header>
                                        <img src={FeatureIconOne} alt="feature-icon" />
                                        Industry Leading AI Technology
                                    </Accordion.Header>
                                    <Accordion.Body>
                                        HostBuddy is built using the most advanced conversational AI available today, which we’ve further optimized to perfect its performance in supporting guests at short-term rentals. Our committed team works relentlessly to stay at the forefront as AI technology advances, ensuring you and your guests receive the highest level of service.
                                    </Accordion.Body>
                                    <div className='animate-line'></div>
                                </Accordion.Item>

                                <Accordion.Item eventKey="1" className={activeKey === "1" ? 'active' : ''}>
                                    <Accordion.Header>
                                        <img src={FeatureIconTwo} alt="feature-icon" />
                                        Robust Customization
                                    </Accordion.Header>
                                    <Accordion.Body>
                                        Whether you have a six-bedroom cabin in the woods or a high-rise apartment with multiple points of entry, HostBuddy can be trained to be an expert concierge for your property.
                                    </Accordion.Body>
                                    <div className='animate-line'></div>
                                </Accordion.Item>

                                <Accordion.Item eventKey="2" className={activeKey === "2" ? 'active' : ''}>
                                    <Accordion.Header>
                                        <img src={FeatureIconThree} alt="feature-icon" />
                                        Full Host Control
                                    </Accordion.Header>
                                    <Accordion.Body>
                                        HostBuddy is at your service whenever you need coverage. Our advanced scheduling feature allows you to set recurring weekly schedules or one-off shifts, giving you the flexibility to manage your time as you see fit.
                                    </Accordion.Body>
                                    <div className='animate-line'></div>
                                </Accordion.Item>

                                <Accordion.Item eventKey="3" className={activeKey === "3" ? 'active' : ''}>
                                    <Accordion.Header>
                                        <img src={FeatureIconFour} alt="feature-icon" />
                                        Always Stay In The Loop
                                    </Accordion.Header>
                                    <Accordion.Body>
                                        Our software ensures you stay informed with what is going on at your property. HostBuddy analyzes each conversation, identifies issues and action items, and brings them to your attention on the dashboard, so you can see what’s important at a glance.
                                    </Accordion.Body>
                                    <div className='animate-line'></div>
                                </Accordion.Item>
                            </Accordion>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="features-img">
                            {activeKey == '0' && <img src={ComputerBrainImg} alt='feature-img' />}
                            {activeKey == '1' && <img src={EditPropertyImg} alt='feature-img' />}
                            {activeKey == '2' && <img src={ControlToggleImg} alt='feature-img' />}
                            {activeKey == '3' && <img src={transcriptsPanel} alt='feature-img' />}
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    )
}

export default Features;