import React, { useState } from 'react'
import './BecomeAnAffiliate'
import "./BecomeAnAffiliate.css"
import { Col, Container, Row } from 'react-bootstrap'
import Affilateimg from "../../public/img/affilated-program.png"
import LOGO from "../../public/img/logo/logo_footer.png"
import Earn from "../../public/img/Commision.png"
import BecomeAff from "../../public/img/earn-affilate.png"
import ContactUs from "../testProperty/discover/contactUs/ContactUs";

const BecomeAnAffiliate = () => {
    const [modalShow, setModalShow] = useState(false);
    return (
        <>
            <div className=''>
                <div className='affilate custom-sections mb-5'>
                    <Container>
                        <img className='affi-logo  mt-5 mb-3' src={LOGO} />
                        <Row className="mt-3 align-items-center px-2 md-px-0">
                            <Col md={7} className='custom-order-2 pe-0 pe-md-5 mt-3 mb-md-0'>
                                <h1 className="fw-bold text-white mb-5">Affiliate Program</h1>
                                <h5 className='text-uppercase fw-normal text-white mb-4'>Why be an  affiliate?</h5>
                                <p className='text-white fw-normal'>
                                    <strong className='text-white '>Cutting-Edge Technology: </strong>
                                    Offer your community access to the most advanced Al solution for short-term rental hosts.</p>
                                <p className='text-white fw-bold my-5 '>Earn Commission on Each Sale</p>
                                <p className='text-white fw-normal  mb-5'>
                                    <strong className='text-white'>Recurring Revenue: </strong>
                                    Benefit from ongoing subscriptions and earn more beyond the initial sale.</p>
                                <p className='text-white fw-normal '>
                                    <strong className='text-white'>Unlimited Earnings: </strong>
                                    The more you promote, the more you earn.</p>
                                <button onClick={() => setModalShow(true)} className='emp-btn fw-bold text-black  w-100 my-5 display-btn'>EMPOWER HOSTS WITH AI </button>
                            </Col>
                            <Col md={5} className='pe-md-5 custom-order-1'>
                                <img className='w-100' src={Affilateimg} />
                                <button onClick={() => setModalShow(true)} className='emp-btn fw-bold text-black  w-100 my-5 display-btn-new'>EMPOWER HOSTS WITH AI </button>
                            </Col>
                        </Row>
                    </Container >
                </div >
                <div className='earn-commision py-5 custom-sections'>
                    <Container>
                        <Row className="mt-3 align-items-center px-2 md-px-0">
                            <Col md={5} className='pe-md-5  text-center'>
                                <img className='w-75' src={Earn} />
                                <button onClick={() => setModalShow(true)} className='emp-btn fw-bold text-black fs-3 w-100 my-5 display-btn-new'>EARN 20% COMMISSION</button></Col>
                            <Col md={7} className=' ps-md-5 pt-3 pt-md-0 '>
                                <h1 className='text-uppercase fw-normal text-white mb-5'>HOSTBUDDY AI WILL PROVIDE:</h1>
                                <p className='text-white fw-bold'>Unique Discount Code For Your Audience</p>
                                <p className='text-white fw-normal my-5'>
                                    <strong className='text-white'>20% Revenue Share: </strong>
                                    Earn 20% of the revenue from all orders placed with your code.</p>
                                <p className='text-white fw-normal '>
                                    <strong className='text-white'>Marketing Collateral: </strong>
                                    Access templated content for social media and email marketing.</p>
                                <p className='text-white fw-normal my-5'>
                                    <strong className='text-white'>Collaborative Content Creation:</strong>
                                    Partner with us for webinars, guest blog posts, and more.</p>
                                <p className='text-white fw-bold'>Early Feature Access</p>
                                <button onClick={() => setModalShow(true)} className='emp-btn fw-bold text-black fs-3 w-100 my-5 display-btn'>EARN 20% COMMISSION</button>
                            </Col>

                        </Row>
                    </Container>

                </div>

                <div className='become-affilate custom-sections my-5'>
                    <Container>
                        <Row className="mt-3 align-items-center px-2 md-px-0">
                            <Col md={7} className=' pe-md-5 mb-5 mb-md-0 custom-order-2'>
                                <h1 className='text-uppercase fw-normal text-white mb-5'>LET'S EARN TOGETHER</h1>
                                <p className='text-white fw-bold mb-5'>Revolutionize Hosting for your Audience</p>
                                <div className='d-flex flex-column gap-5'>
                                    <div className='d-flex custom-grid gap-4 align-items-center'>
                                        <div className='bg-section'>
                                            <p className=''>1</p>
                                        </div>
                                        <h3 className='text-white fs-2'>Sign Up</h3>

                                    </div>
                                    <div className='d-flex custom-grid gap-4 align-items-center'>
                                        <div className='bg-section'>
                                            <p className=''>2</p>
                                        </div>
                                        <h3 className='text-white fs-2'>Share your s</h3>

                                    </div>
                                    <div className='d-flex custom-grid gap-4 align-items-center'>
                                        <div className='bg-section'>
                                            <p className=''>3</p>
                                        </div>
                                        <h3 className='text-white fs-2'>Earn unlimited <br />commission</h3>

                                    </div>
                                </div>
                                <button onClick={() => setModalShow(true)} className='emp-btn fw-bold text-black fs-3 w-100 my-5 display-btn'>BECOME AN AFFILIATE</button>

                            </Col>
                            <Col md={5} className=' ps-md-5 text-center custom-order-1'>
                                <img className='w-75' src={BecomeAff} />
                                <button onClick={() => setModalShow(true)} className='emp-btn fw-bold text-black fs-3 w-100 my-5 display-btn-new'>BECOME AN AFFILIATE</button>
                            </Col>
                        </Row>
                    </Container >
                </div >
            </div>
            <ContactUs show={modalShow} onHide={() => setModalShow(false)} />
        </>
    )
}

export default BecomeAnAffiliate
