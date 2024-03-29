import React from 'react';
import Accordion from 'react-bootstrap/Accordion';
import { Container } from 'react-bootstrap';
import './faq.css';
import { Helmet } from 'react-helmet';

function Faqs() {
    return (
        <section className="faqs">
            <Helmet>
                <title>FAQs – Hostbuddy</title>
            </Helmet>
            <Container>
                <div className="banner-heading">
                    <h2>Frequently Asked Questions</h2>
                </div>
                <div className="banner-container">
                    <Accordion defaultActiveKey="0">
                        <Accordion.Item eventKey="0">
                            <Accordion.Header>How does HostBuddy AI work?</Accordion.Header>
                            <Accordion.Body>
                                HostBuddy AI works by using natural language processing and machine learning to understand user queries and provide relevant information and assistance for managing property and related tasks.
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="1">
                            <Accordion.Header>Can I customize the responses of HostBuddy AI?</Accordion.Header>
                            <Accordion.Body>
                                No, HostBuddy AI&#8217;s responses are generated based on pre-trained models and cannot be customized by users.
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="2">
                            <Accordion.Header>Is HostBuddy AI suitable for all types of properties?</Accordion.Header>
                            <Accordion.Body>
                                Yes, HostBuddy AI is designed to be suitable for various types of properties, providing versatile assistance.
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="3">
                            <Accordion.Header>Does HostBuddy AI integrate with property management systems (PMS)?</Accordion.Header>
                            <Accordion.Body>
                                Yes, HostBuddy AI plans to integrate with property management systems (PMS) in the future to enhance its functionality.
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="4">
                            <Accordion.Header>How secure is HostBuddy AI for handling guest information?</Accordion.Header>
                            <Accordion.Body>
                                Yes, HostBuddy AI prioritizes security and follows industry-standard practices to ensure the protection of guest information.
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="5">
                            <Accordion.Header>What support options are available for HostBuddy AI users?</Accordion.Header>
                            <Accordion.Body>
                                Yes, HostBuddy AI provides comprehensive support options, including documentation, FAQs, and a dedicated support team to assist users.
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                </div>
            </Container>
        </section>
    );
}

export default Faqs;