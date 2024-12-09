import React from 'react';
import Accordion from 'react-bootstrap/Accordion';
import { Container } from 'react-bootstrap';
import './propSetupTest.css';
import { Helmet } from 'react-helmet';

function PropSetupTest() {
    return (
        <section className="pst">
            <Helmet>
                <title>FAQs – HostBuddy AI</title>
                <link rel="canonical" href="https://www.hostbuddy.ai/faqs" />
            </Helmet>
            <Container>
                <div className="banner-heading">
                    <h1>Guided Setup</h1>
                </div>
                <div className="banner-container">
                    <Accordion defaultActiveKey="0">
                        <Accordion.Item eventKey="0" className="completed">
                            <Accordion.Header>
                                <div>
                                    1. Link to your PMS
                                    <div className="subtitle">Property details, past conversations, guest data, and availability data are automatically pulled when you connect your property management software.</div>
                                </div>
                            </Accordion.Header>
                            <Accordion.Body>
                                Dummy content
                            </Accordion.Body>
                        </Accordion.Item>

                        <Accordion.Item eventKey="1" className="completed">
                            <Accordion.Header>
                                <div>
                                    2. Upload documents
                                    <div className="subtitle">You can upload existing documents such as house manuals, welcome docs, or anything else that contains information about your property.</div>
                                </div>
                            </Accordion.Header>
                            <Accordion.Body>
                                Dummy content
                            </Accordion.Body>
                        </Accordion.Item>

                        <Accordion.Item eventKey="2">
                            <Accordion.Header>
                                <div>
                                    3. Auto-fill property profile
                                    <div className="subtitle">Auto-fill the property profile form using your PMS and document data to make HostBuddy's knowledge base easier to view and manage.</div>
                                </div>
                            </Accordion.Header>
                            <Accordion.Body>
                                Dummy content
                            </Accordion.Body>
                        </Accordion.Item>

                        <Accordion.Item eventKey="3">
                            <Accordion.Header>
                                <div>
                                    4. Review property profile
                                    <div className="subtitle">Review the property profile to make sure HostBuddy has all the information it needs to serve your guests.</div>
                                </div>
                            </Accordion.Header>
                            <Accordion.Body>
                                Dummy content
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                </div>
            </Container>
        </section>
    );
}

export default PropSetupTest;