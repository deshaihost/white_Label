import React from 'react';
import Accordion from 'react-bootstrap/Accordion';
import { Container } from 'react-bootstrap';
import './faq.css';
import { Helmet } from 'react-helmet';

function Faqs() {
    return (
        <section className="faqs">
            <Helmet>
                <title>FAQs – HostBuddy</title>
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
                            HostBuddy AI uses natural language processing to support hosts in the short-term rental industry. It leverages property information provided by hosts to answer guest questions, troubleshoot issues, and ensure that your guests are covered 24/7.
                            </Accordion.Body>
                        </Accordion.Item>

                        <Accordion.Item eventKey="1">
                            <Accordion.Header>What makes HostBuddy AI unique?</Accordion.Header>
                            <Accordion.Body>
                            Unlike other AI solutions for short-term rentals, HostBuddy AI is highly customizable and fine-tuned to provide human-like responses to each guest query it receives. This product was created by Airbnb Superhosts with the guest experience in mind. Our product not only provides guests with the information they need but also fosters a conversational and organic experience that ensures your guests receive the attentive and personalized experience they deserve!
                            </Accordion.Body>
                        </Accordion.Item>

                        <Accordion.Item eventKey="2">
                            <Accordion.Header>Is HostBuddy able to integrate with my property management software?</Accordion.Header>
                            <Accordion.Body>
                            Currently, HostBuddy AI supports integration with many major property management softwares on the market. Here is a list of our current integrations: Guesty, Hostaway, Hostfully, Hostify, Hospitable, Lodgify, Smoobu, Beds24, Zeevou. If you do not see your property management software here, please let us know! We are actively seeking more integration partners and are happy to consider integrating with your preferred PMS.
                            </Accordion.Body>
                        </Accordion.Item>

                        <Accordion.Item eventKey="3">
                            <Accordion.Header>My properties have complicated setups and require a human touch to ensure that information is communicated correctly. How can I trust an AI product to take care of my guests' needs?</Accordion.Header>
                            <Accordion.Body>
                                HostBuddy is built using the most advanced conversational AI models available today, and is highly customizable to fit the needs of even the most complex property. With robust training on technical problem-solving, it is capable of supporting guests through lockouts, Wi-Fi troubleshooting, usage of HVAC, electronics, or any other challenging support item. Play around with our MeetHostBuddy feature to see how HostBuddy can support your guests today!
                            </Accordion.Body>
                        </Accordion.Item>

                        <Accordion.Item eventKey="4">
                            <Accordion.Header>I currently have most of my business’ working hours covered by myself or virtual assistants. Is it possible to have HostBuddy only cover the hours that I do not have coverage?</Accordion.Header>
                            <Accordion.Body>
                            HostBuddy is your dedicated cohost, available whenever you need support. It can be scheduled to work specific days and hours. Whether you need to turn off your phone and unplug or take the wheel and cover guest communications, HostBuddy is ready to assist or stand by until you need it next.
                            </Accordion.Body>
                        </Accordion.Item>

                        <Accordion.Item eventKey="5">
                            <Accordion.Header>I left HostBuddy online for a long time and would love to have a high-level overview of what I missed while I was away!</Accordion.Header>
                            <Accordion.Body>
                            In your dashboard's “Insights” page, you can view a list of conversations from when you were away. HostBuddy will indicate which conversations may need your attention and which ones were resolved. This feature helps ensure that you can jump right back in to assist guests with reservation changes, required maintenance, and other items that require your intervention.
                            </Accordion.Body>
                        </Accordion.Item>

                        <Accordion.Item eventKey="6">
                            <Accordion.Header>How secure is HostBuddy AI for handling guest information?</Accordion.Header>
                            <Accordion.Body>
                            HostBuddy AI prioritizes security and follows industry-standard practices to ensure the protection of guest and host information. Any data that you supply can be customized to only allow for confidential information to be sent during specific reservation phases (such as pre-arrival, check-in, and post-checkout).
                            </Accordion.Body>
                        </Accordion.Item>

                        <Accordion.Item eventKey="7">
                            <Accordion.Header>What support options are available for HostBuddy AI users?</Accordion.Header>
                            <Accordion.Body>
                            HostBuddy AI provides comprehensive support options, including documentation, FAQs, and a dedicated support team to assist users. We are committed to ensuring that your guests are supported correctly and are always happy to work with you to ensure that our software fits your needs.
                            </Accordion.Body>
                        </Accordion.Item>

                        <Accordion.Item eventKey="8">
                            <Accordion.Header>I would like HostBuddy to be more involved in my team's day-to-day operations. Do you have plans to add integrations with Slack, text messaging, or other communication platforms that would allow HostBuddy to update necessary team members about issues that need support?</Accordion.Header>
                            <Accordion.Body>
                            We are currently developing HostBuddy’s capabilities to facilitate open communication between guests, HostBuddy, and your team. This enhancement is underway, and we would love to hear your thoughts on which integrations we should support when the feature is completed. Please send us an email to help integrate HostBuddy more into your business at info@hostbuddy.ai.
                            </Accordion.Body>
                        </Accordion.Item>

                    </Accordion>
                </div>
            </Container>
        </section>
    );
}

export default Faqs;