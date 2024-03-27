import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import './features.css';
import FeatureIconOne from '../../../public/img/feature_icon1.png';
import FeatureIconTwo from '../../../public/img/feature_icon2.png';
import FeatureIconThree from '../../../public/img/feature_icon3.png';
import FeatureIconFour from '../../../public/img/feature_iconnew1.png';
import FeatureImgOne from '../../../public/img/feature_img1.png';
import FeatureImgTwo from '../../../public/img/hostbuddy2.png';
import FeatureImgThree from '../../../public/img/hostbuddy3.png';
import FeatureImgFour from '../../../public/img/hostbuddy4.png';
import Accordion from 'react-bootstrap/Accordion';

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
                                        In the rapidly evolving landscape of short-term rentals, HostBuddy stands at the forefront of innovation, harnessing the power of ChatGPT, one of the most advanced conversational AI models in the world. This state-of-the-art integration not only ensures impeccable communication accuracy but also delivers real-time, context-aware responses, elevating guest experience to unparalleled heights.
                                    </Accordion.Body>
                                    <div className='animate-line'></div>
                                </Accordion.Item>

                                <Accordion.Item eventKey="1" className={activeKey === "1" ? 'active' : ''}>
                                    <Accordion.Header>
                                        <img src={FeatureIconTwo} alt="feature-icon" />
                                        24/7 Support
                                    </Accordion.Header>
                                    <Accordion.Body>
                                        In the rapidly evolving landscape of short-term rentals, HostBuddy stands at the forefront of innovation, harnessing the power of ChatGPT, one of the most advanced conversational AI models in the world. This state-of-the-art integration not only ensures impeccable communication accuracy but also delivers real-time, context-aware responses, elevating guest experience to unparalleled heights.
                                    </Accordion.Body>
                                    <div className='animate-line'></div>
                                </Accordion.Item>

                                <Accordion.Item eventKey="2" className={activeKey === "2" ? 'active' : ''}>
                                    <Accordion.Header>
                                        <img src={FeatureIconThree} alt="feature-icon" />
                                        Tailored Hosting Intelligence
                                    </Accordion.Header>
                                    <Accordion.Body>
                                        In the rapidly evolving landscape of short-term rentals, HostBuddy stands at the forefront of innovation, harnessing the power of ChatGPT, one of the most advanced conversational AI models in the world. This state-of-the-art integration not only ensures impeccable communication accuracy but also delivers real-time, context-aware responses, elevating guest experience to unparalleled heights.
                                    </Accordion.Body>
                                    <div className='animate-line'></div>
                                </Accordion.Item>

                                <Accordion.Item eventKey="3" className={activeKey === "3" ? 'active' : ''}>
                                    <Accordion.Header>
                                        <img src={FeatureIconFour} alt="feature-icon" />
                                        Direct Integrations
                                    </Accordion.Header>
                                    <Accordion.Body>
                                        In the rapidly evolving landscape of short-term rentals, HostBuddy stands at the forefront of innovation, harnessing the power of ChatGPT, one of the most advanced conversational AI models in the world. This state-of-the-art integration not only ensures impeccable communication accuracy but also delivers real-time, context-aware responses, elevating guest experience to unparalleled heights.
                                    </Accordion.Body>
                                    <div className='animate-line'></div>
                                </Accordion.Item>
                            </Accordion>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="features-img">
                            {activeKey == '0' && <img src={FeatureImgOne} alt='feature-img' />}
                            {activeKey == '1' && <img src={FeatureImgTwo} alt='feature-img' />}
                            {activeKey == '2' && <img src={FeatureImgThree} alt='feature-img' />}
                            {activeKey == '3' && <img src={FeatureImgFour} alt='feature-img' />}
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    )
}

export default Features;