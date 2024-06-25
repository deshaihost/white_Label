import React from 'react';
import Accordion from 'react-bootstrap/Accordion';
import { Container } from 'react-bootstrap';
import './faq.css';
import { Helmet } from 'react-helmet';

function Faqs() {
    return (
        <section className="faqs">
            <Helmet>
                <title>FAQs – HostBuddy AI</title>
                <link rel="canonical" href="https://www.hostbuddy.ai/faqs" />
            </Helmet>
            <Container>
                <div className="banner-heading">
                    <h1>Frequently Asked Questions</h1>
                </div>
                <div className="banner-container">
                    <Accordion defaultActiveKey="0">

                        <Accordion.Item eventKey="0">
                            <Accordion.Header>How does HostBuddy AI work?</Accordion.Header>
                            <Accordion.Body>
                                HostBuddy AI leverages the latest developments in natural language processing to to support hosts in the short-term rental industry with guest messaging. This means HostBuddy can understand the nuances of communication and provide fluent, human-like responses to any guest message.
                                <br /><br />
                                Our software guides you through the process of adding information about each of your properties. Then, HostBuddy intelligently uses these details you provide to answer guest questions, troubleshoot their issues, and fluently handle day-to-day conversation, ensuring your guests are covered 24/7.
                                <br /><br />
                                Check out the Meet HostBuddy page to see it all in action!
                            </Accordion.Body>
                        </Accordion.Item>

                        <Accordion.Item eventKey="1">
                            <Accordion.Header>What makes HostBuddy AI unique?</Accordion.Header>
                            <Accordion.Body>
                                HostBuddy AI is highly customizable and fine-tuned to provide human-like responses to each guest query it receives. This product was created by Airbnb Superhosts with the guest experience in mind. Our product not only provides guests with the information they need but also fosters a conversational and organic experience that ensures your guests receive the attentive and personalized experience they deserve!
                            </Accordion.Body>
                        </Accordion.Item>

                        <Accordion.Item eventKey="2">
                            <Accordion.Header>How does HostBuddy know the specifics of my property?</Accordion.Header>
                            <Accordion.Body>
                                There are multiple ways to provide HostBuddy with information about your property. HostBuddy will intelligently parse the information from the different sources, and will use the most relevant details when responding to each guest query. Each of these are optional, and you can use whatever inputs best suit your needs. There is no limit on the amount of text you can add.
                                <br /><br />
                                1. When you connect a PMS integration, HostBuddy will pull property details from the chosen PMS property listing into its knowledge base. It will also pull and maintain real-time guest information, so that HostBuddy knows the status and details of each reservation or inquiry.
                                <br /><br />
                                2. You can upload files (.txt, .pdf, .docx) into HostBuddy’s knowledge base. This is useful if you already have documents that explain details about your property, or if you want to write your own free text to provide details for HostBuddy.
                                <br /><br />
                                3. We also provide a detailed form that guides you step-by-step to provide all of the information that Hostbuddy needs to intelligently assist guests. Answer specific questions in the form to fill knowledge gaps, or go through the entire form to use it as HostBuddy’s complete knowledge base for the property.
                            </Accordion.Body>
                        </Accordion.Item>

                        <Accordion.Item eventKey="3">
                            <Accordion.Header>Is HostBuddy able to integrate with my property management software?</Accordion.Header>
                            <Accordion.Body>
                            Currently, HostBuddy AI supports integration with many major property management softwares on the market. Here is a list of our current integrations: Guesty, Hostaway, Hostfully, Hostify, Hospitable, Lodgify, Smoobu, Beds24, Zeevou. If you do not see your property management software here, please let us know! We are actively seeking more integration partners and are happy to consider integrating with your preferred PMS.
                            </Accordion.Body>
                        </Accordion.Item>

                        <Accordion.Item eventKey="4">
                            <Accordion.Header>My properties have complicated setups and require a human touch to ensure that information is communicated correctly. How can I trust an AI product to take care of my guests' needs?</Accordion.Header>
                            <Accordion.Body>
                                HostBuddy is built using the most advanced conversational AI models available today, and is highly customizable to fit the needs of even the most complex property. With robust training on technical problem-solving, it is capable of supporting guests through lockouts, Wi-Fi troubleshooting, usage of HVAC, electronics, or any other challenging support item. Play around with our MeetHostBuddy feature to see how HostBuddy can support your guests today!
                            </Accordion.Body>
                        </Accordion.Item>

                        <Accordion.Item eventKey="5">
                            <Accordion.Header>How can I be sure HostBuddy won’t share sensitive information with the wrong guests?</Accordion.Header>
                            <Accordion.Body>
                                    You have complete control over the information in HostBuddy’s knowledge base. We also provide controls that allow you restrict any specific pieces of information from being visible to a set of guests - for example, according to the status and timing of their reservation. If information is restricted for a set of guests, then HostBuddy will not have access to that information at all when responding to those guests.
                                    <br /><br />
                                    HostBuddy’s knowledge base is segmented by property, meaning when it responds to a guest, it only has access to the information about the property that guest is associated with. This makes it impossible for HostBuddy to provide guests with information about the wrong property.
                                    <br /><br />
                                    HostBuddy AI prioritizes security, and follows industry-standard practices to ensure the protection of guest and host information. We are committed to maintaining the highest level of security and privacy for all users.
                            </Accordion.Body>
                        </Accordion.Item>

                        <Accordion.Item eventKey="6">
                            <Accordion.Header>I currently have most of my business’ working hours covered by myself or virtual assistants. Is it possible to have HostBuddy only cover the hours that I do not have coverage?</Accordion.Header>
                            <Accordion.Body>
                            HostBuddy is your dedicated cohost, available whenever you need support. It can be scheduled to work specific days and hours. Whether you need to turn off your phone and unplug or take the wheel and cover guest communications, HostBuddy is ready to assist or stand by until you need it next.
                            </Accordion.Body>
                        </Accordion.Item>

                        <Accordion.Item eventKey="7">
                            <Accordion.Header>I left HostBuddy online for a long time and would love to have a high-level overview of what I missed while I was away!</Accordion.Header>
                            <Accordion.Body>
                            In your dashboard's “Transcripts” page, you can view a list of conversations from when you were away. HostBuddy will indicate which conversations may need your attention and which ones were resolved. This feature helps ensure that you can jump right back in to assist guests with reservation changes, required maintenance, and other items that require your intervention.
                            </Accordion.Body>
                        </Accordion.Item>

                        <Accordion.Item eventKey="8">
                            <Accordion.Header>What support options are available for HostBuddy AI users?</Accordion.Header>
                            <Accordion.Body>
                            HostBuddy AI provides comprehensive support options, including documentation, FAQs, and a dedicated support team to assist users. We are committed to ensuring that your guests are supported correctly and are always happy to work with you to ensure that our software fits your needs.
                            </Accordion.Body>
                        </Accordion.Item>

                        <Accordion.Item eventKey="9">
                            <Accordion.Header>Can HostBuddy send direct updates to me and my team members about issues that need support?</Accordion.Header>
                            <Accordion.Body>
                            Yes, HostBuddy can send you notifications about important events - for example, when a new action item has been detected in a conversation that requires your attention. You can configure these notifications in your account, set your preferred timing, and send to multiple recipients if desired.
                            <br /><br />
                            We currently support sending notifications via email. Support for SMS, WhatsApp, and Slack notifications are in the works and coming very soon.
                            <br /><br />
                            We would love to hear your thoughts on which integrations you'd like to see support for. Please send us an email to help integrate HostBuddy more into your business at info@hostbuddy.ai.
                            </Accordion.Body>
                        </Accordion.Item>

                    </Accordion>
                </div>
            </Container>
        </section>
    );
}

export default Faqs;