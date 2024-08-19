import React, { useState } from 'react'
import "../becomen Affiliate/BecomeAnAffiliate.css"
import { Col, Container, Row } from 'react-bootstrap'
import ContactUs from "../testProperty/discover/contactUs/ContactUs";
import Horse from "../../images/horse.png"
import Rating from "../../images/rating.png"
const LOGO = 'https://hostbuddylb.com/logo/logo_footer.webp';
const Earn = 'https://hostbuddylb.com/becomeAnAffiliate/Commision.webp';
const BecomeAff = 'https://hostbuddylb.com/becomeAnAffiliate/earn-affilate.webp';

const SoftwareSolutions = () => {
    const [modalShow, setModalShow] = useState(false);
    return (
        <>
            <div className=''>
                <div className='affilate custom-sections md:mb-5 mb-3 software-solution'>
                    <Container>
                        <img className='affi-logo mx-auto  mt-5 mb-3' src={LOGO} />
                        <div className='main-heading'><h1 className="fw-bold text-white xl:mb-5 mb-3 text-center">White Labeled Software Solutions</h1></div>
                        <Row className="mt-3 align-items-center px-2 md-px-0 software-inner">
                            <Col md={7} className='custom-order-2 pe-0 pe-md-5 mt-3 mb-md-0'>
                                <h5 className='text-uppercase fw-normal text-white mb-4'>Integrate powerful AI guest communication technology directly into your product offering</h5>
                                <p className='text-white fw-normal'>
                                    <strong className='text-white '>Cutting-Edge Technology: </strong>
                                    Offer your users access to the most advanced AI solution for short-term rental hosts.</p>
                                <p className='text-white fw-bold lg:my-5 my-3 '><strong>Out-of-the-Box Solution:</strong>
                                Our technology is already developed and perfected. Save your business time and money by starting at the finish line.</p>
                                <p className='text-white fw-normal  lg:mb-5 mb-3'>
                                    <strong className='text-white'>Stay Ahead of the Competition:</strong>
                                    Leverage our technology as your own solution and establish yourself as a leader in the industry.</p>
                                <p className='text-white fw-normal '>
                                    <strong className='text-white'>Additional Revenue Stream and Retention:</strong>
                                    Generate a new stream of revenue by offering advanced AI features at a premium. Convert new customers and keep existing customers satisfied.</p>
                                <button onClick={() => setModalShow(true)} className='emp-btn fw-bold text-black  w-100 md:my-5 mb-0 mt-5    display-btn'>EMPOWER HOSTS WITH AI </button>
                            </Col>
                            <Col md={5} className='pe-md-5 custom-order-1 text-center'>
                                <img className='w-75' src={Horse} />
                            </Col>
                        </Row>
                    </Container >
                </div >
                <div className='earn-commision md:py-5 py-3 custom-sections'>
                    <Container>
                        <Row className="mt-3 align-items-center px-2 md-px-0">
                            <Col md={5} className='pe-md-5  text-center'>
                                <img className='w-75' src={Earn} />
                                <button onClick={() => setModalShow(true)} className='emp-btn fw-bold text-black fs-3 w-100 lg:my-5 my-3 display-btn-new'>PROVIDE MORE VALUE</button></Col>
                            <Col md={7} className=' ps-md-5 pt-3 pt-md-0 '>
                                <h1 className='text-uppercase fw-normal text-white xl:mb-5 mb-3'>HostBuddy AI Technology</h1>
                                <p className='text-white'><strong>Comprehensive Communication Coverage: </strong>Enable hosts to leverge advanced AI technology to respond directly to guests on their behalf, or provide suggested responses to xpedite communication.</p>
                                <p className='text-white fw-normal lg:my-5 my-3'>
                                    <strong className='text-white'>Smart Templating: </strong>
                                    Implement smart templates that analyze conversations and real-time property information to message the right guests at the right time.</p>
                                <p className='text-white fw-normal '>
                                    <strong className='text-white'>Marketing Collateral: </strong>
                                    Access templated content for social media and email marketing.</p>
                                <p className='text-white fw-normal lg:my-5 my-3'>
                                    <strong className='text-white'>Automated Upsells: </strong>
                                    Automate gap night and slow season upsells, as well as inquiry follow-ups to provide additional value to your hosts.</p>
                                <p className='text-white fw-bold'><strong>Early Feature Access: </strong>Enjoy access to new developments to our technology as they are deployed, ensuring you stay ahead of the competition.  </p>
                                <button onClick={() => setModalShow(true)} className='emp-btn fw-bold text-black fs-3 w-100 md:my-5 mb-0 mt-5 display-btn'>PROVIDE MORE VALUE</button>
                            </Col>

                        </Row>
                    </Container>

                </div>

                <div className='earn-commision md:py-5 py-3 custom-sections software-solution'>
                    <Container>
                        <Row className="mt-3 align-items-center px-2 md-px-0">
                        <Col md={7} className=' pt-3 pt-md-0 '>
                                <h1 className='text-uppercase fw-normal text-white xl:mb-5 mb-3'>Benefits of white labeling With HostBuddy AI</h1>
                                <p className='text-white'><strong>Dedicated Support:  </strong>Allow your team to focus on what they do best — perfecting your core product. Our team will work closely with you to enhance and improve your offering throughout our partnership.</p>
                                <p className='text-white fw-normal lg:my-5 my-3'>
                                    <strong className='text-white'>Seamless Integration: </strong>
                                    With HostBuddy AI’s team managing integrations and backend support, your team can concentrate on other critical tasks.</p>
                                <p className='text-white fw-normal '>
                                    <strong className='text-white'>Custom Branding: </strong>
                                    Collaborate with our team to create a look and feel that perfectly aligns with your brand.</p>
                                <p className='text-white fw-normal lg:my-5 my-3'>
                                    <strong className='text-white'>Feature Requests: </strong>
                                    Work with our team to develop your technology stack based on your users needs.</p>
                                
                                <button onClick={() => setModalShow(true)} className='emp-btn fw-bold text-black fs-3 w-100 my-5 display-btn'>PROVIDE MORE VALUE</button>
                            </Col>
                            <Col md={5} className='pe-md-5  text-center'>
                                <img className='w-75' src={Rating} />
                                <button onClick={() => setModalShow(true)} className='emp-btn fw-bold text-black fs-3 w-100 md:my-5 mb-0 mt-5 display-btn-new BACKED'>BACKED BY HOSTBUDDY AI</button></Col>
                        </Row>
                    </Container>

                </div>
                

                <div className='become-affilate custom-sections md:my-5 my-3'>
                    <Container>
                        <Row className="mt-3 align-items-center px-2 md-px-0">
                            <div className='main-heading'><h1 className="text-white mb-5 text-center">HOW IT WORKS</h1></div>
                            <Col md={7} className=' pe-md-5 mb-5 mb-md-0 custom-order-2'>
                                <h2 className='fw-normal text-white mb-5'>Revolutionize Hosting for your Users</h2>
                               <div className='d-flex flex-column gap-5 software-points'>
                                    <div className='d-flex custom-grid gap-4'>
                                        <div className='bg-section'>
                                            <p className=''>1</p>
                                        </div>
                                        <h3 className='text-white xl:text-2xl text-xl'><strong>Book a Demo: </strong>Meet with the HostBuddy AI team to learn about our available white-labeling options.</h3>

                                    </div>
                                    <div className='d-flex custom-grid gap-4'>
                                        <div className='bg-section'>
                                            <p className=''>2</p>
                                        </div>
                                        <h3 className='text-white text-2xl'><strong>Define Features: </strong>Discuss your needs and select the features that best suit your platform.</h3>

                                    </div>
                                    <div className='d-flex custom-grid gap-4'>
                                        <div className='bg-section'>
                                            <p className=''>3</p>
                                        </div>
                                        <h3 className='text-white text-2xl'><strong>Approve Deployment Plan: </strong>Collaborate with our team to finalize a deployment plan</h3>

                                    </div>
                                    <div className='d-flex custom-grid gap-4'>
                                        <div className='bg-section'>
                                            <p className=''>4</p>
                                        </div>
                                        <h3 className='text-white text-2xl'><strong>Collaborative Integration: </strong>Assist our team with integrating our technology into your platform. Do not worry, we’ll do all of the heavy lifting!</h3>

                                    </div>
                                    <div className='d-flex custom-grid gap-4'>
                                        <div className='bg-section'>
                                            <p className=''>5</p>
                                        </div>
                                        <h3 className='text-white text-2xl'><strong>Deployment and Continued Development: </strong>Deploy our white labeled solution to your user base, and work with our team to further develop your offering based on your needs.</h3>

                                    </div>
                                </div>
                                <button onClick={() => setModalShow(true)} className='emp-btn fw-bold text-black fs-3 w-100 md:my-5 mb-0 mt-5 display-btn'>BECOME AN AFFILIATE</button>

                            </Col>
                            <Col md={5} className=' ps-md-5 text-center custom-order-1'>
                                <img className='w-75' src={BecomeAff} />
                                <button onClick={() => setModalShow(true)} className='emp-btn fw-bold text-black fs-3 w-100 md:my-5 mb-0 mt-5 display-btn-new'>BOOK A DEMO</button>
                            </Col>
                        </Row>
                    </Container >
                </div >
            </div>
            <ContactUs show={modalShow} onHide={() => setModalShow(false)} />
        </>
    )
}

export default SoftwareSolutions;
