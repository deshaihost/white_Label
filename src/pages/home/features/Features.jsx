import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import './features.css';
import FeatureIconOne from '../../../public/img/home/feature_icon1.png';
import FeatureIconTwo from '../../../public/img/home/feature_icon2.png';
import FeatureIconThree from '../../../public/img/home/feature_icon3.png';
import FeatureIconFour from '../../../public/img/home/feature_iconnew1.png';
import FeatureImgOne from '../../../public/img/home/chatgpt.png';
import FeatureImgTwo from '../../../public/img/home/assistant.png';
import FeatureImgThree from '../../../public/img/home/intelligence.png';
import FeatureImgFour from '../../../public/img/home/Direct_Integrations.png';
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
                                        In the rapidly evolving landscape of short-term rentals, HostBuddy stands at the forefront of innovation, harnessing the power of the most advanced conversational AI models in the world. This state-of-the-art integration not only ensures impeccable communication accuracy but also delivers real-time, context-aware responses, elevating guest experience to unparalleled heights.
                                    </Accordion.Body>
                                    <div className='animate-line'></div>
                                </Accordion.Item>

                                <Accordion.Item eventKey="1" className={activeKey === "1" ? 'active' : ''}>
                                    <Accordion.Header>
                                        <img src={FeatureIconTwo} alt="feature-icon" />
                                        24/7 Support
                                    </Accordion.Header>
                                    <Accordion.Body>
                                        HostBuddy acts as your personal, dedicated assistant, expertly handling guest communications wherever you require support. With HostBuddy at your service, you can confidently ensure that your guests receive attentive care, whether you’re offline, taking a well-deserved break, or spending quality time with family and friends. Trust HostBuddy to seamlessly manage guest interactions anytime you need support for as long as you need it.
                                    </Accordion.Body>
                                    <div className='animate-line'></div>
                                </Accordion.Item>

                                <Accordion.Item eventKey="2" className={activeKey === "2" ? 'active' : ''}>
                                    <Accordion.Header>
                                        <img src={FeatureIconThree} alt="feature-icon" />
                                        Tailored Hosting Intelligence
                                    </Accordion.Header>
                                    <Accordion.Body>
                                        Tailored to the unique needs of your business, HostBuddy offers specialized support based on the specific details of each of your properties. Equipped with in-depth knowledge, HostBuddy is adept at resolving guest issues, answering a range of questions - whether general or specific - and even suggesting local activities and attractions. This personalized approach ensures that your guests receive informed and relevant assistance, enhancing their overall experience.
                                    </Accordion.Body>
                                    <div className='animate-line'></div>
                                </Accordion.Item>

                                <Accordion.Item eventKey="3" className={activeKey === "3" ? 'active' : ''}>
                                    <Accordion.Header>
                                        <img src={FeatureIconFour} alt="feature-icon" />
                                        Direct Integrations
                                    </Accordion.Header>
                                    <Accordion.Body>
                                        HostBuddy seamlessly integrates into your existing setup. Thanks to our partnerships with leading property management software providers, HostBuddy can engage with guests directly on the booking platforms they use and trust. For more details on how this integration works and the benefits it offers, we invite you to visit our FAQ page.
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