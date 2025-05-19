import React, { useState, useEffect } from 'react'
import './agreements.css';
import { Helmet } from 'react-helmet';
const PrivacyPolicy = () => {
    const [activeLink, setActiveLink] = useState("");
  const handleClickScroll = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setActiveLink(id);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll(".step-box.section");
      sections.forEach((section) => {
        const bounding = section.getBoundingClientRect();
        if (bounding.top <= 20 && bounding.bottom >= 50) {
          setActiveLink(section.id);
        }
      });
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div>
       <div>
      <div className="account-main">
        <Helmet>
          <title>Privacy Policy - HostBuddy AI</title>
          <link rel="canonical" href="https://www.HostBuddy.ai/privacy-policy" />
        </Helmet>
        <div className="container">
          <div className="banner-heading">
            <h2>Privacy Policy</h2>
          </div>
          <div className="row">
            {/* <div className="col-lg-4">
              <SideBar />
            </div> */}
            <div className="col-lg-12">
              <div className="account-container blur-background-top-right">
                <div className="account_heading">
                  <h3>Privacy Policy</h3>
                </div>
                <div className="account-content">
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="guide-steps">
                        <div className="step-box">
                          <h4>Welcome to HostBuddy AI!</h4>
                          <p>
                            This Privacy Policy outlines the policies and procedures of HostBuddy AI LLC ("we", "our", or "us") regarding the collection, use, processing, and disclosure of your information on https://HostBuddy.ai (the "website") and the services, tools, or features we offer. This policy is designed to inform our users  (referred to as "users" or "you") about how we handle their personal data.
                          </p>
                        </div>

                        <div className="step-box section" id="step1">
                          <h4>1. Collection of Personal Data</h4>
                          <p>
                            At HostBuddy AI, we prioritize the protection of your personal data while providing AI communication support services for short-term rental management. To ensure efficient service delivery, we collect specific types of personal data, including:
                          </p>
                          <ul>
                            <li>
                              a. Contact Information: This encompasses essential details such as your phone number and email address, enabling us to communicate effectively regarding your rental property management needs.
                            </li>
                            <li>
                              b. Payment Information: Should you opt for our subscription services, rest assured that your payment details are handled securely through our trusted payment processing partner, Stripe. We do not share this sensitive financial information with any third parties.
                            </li>
                            <li>
                              c. Property Details: Understanding the unique aspects of your rental property is crucial for us to tailor our services to your requirements. Therefore, we may collect information such as property addresses, access codes, directions, and any other pertinent details you choose to provide.
                            </li>
                          </ul>
                        </div>

                        <div className="step-box section" id="step2">
                          <h4>2. Use of Personal Data</h4>
                          <p>
                            Your personal data is utilized with the utmost care and integrity, serving the following purposes:
                          </p>
                          <ul>
                            <li>
                              a. Service Enhancement: We utilize your personal data to provide, maintain, and enhance our AI communication support services, ensuring seamless management of your short term rental properties.
                            </li>
                            <li>
                              b. Communication: From time to time, we may send you marketing materials, company updates, newsletters, service announcements, and promotional offers. However, you retain the option to opt out of receiving such communications at any point, respecting  your preferences and privacy.
                            </li>
                          </ul>
                        </div>

                        <div className="step-box section" id="step3">
                          <h4>3. Sharing of Personal Data</h4>
                          <p>
                            We prioritize transparency and accountability in our data sharing practices, ensuring your information is shared only under specific circumstances:
                          </p>
                          <ul>
                            <li>
                              a. Property Management Software Partners: If you choose to integrate your HostBuddy AI account with external property management software, we may share necessary account data to facilitate seamless synchronization and operation between platforms.
                            </li>
                            <li>
                              b. Guests: Information that you enter on our platform for a given property, is accessible to guests at that property via chat with our AI chatbot, if the chatbot is provided and configured for guests at the property.
                            </li>
                            <li>
                              c. Legal Requirements: In compliance with US law, we may be obligated to share personal data in response to lawful requests or legal proceedings, prioritizing transparency and adherence to regulatory requirements.
                            </li>
                            <li>
                              d. Phone numbers: HostBuddy AI respects your privacy and does not share your phone number with any third parties or platforms under any circumstances, unless required by law.
                            </li>
                            <li>
                              e. Service Providers for Notifications: When you opt in to receive notifications and provide your contact information, we use third-party providers, such as Twilio and SendGrid, to facilitate the delivery of these notifications. These providers are granted access to your information solely for this purpose and are contractually obligated to handle your data securely and in accordance with our privacy standards.
                            </li>
                            <li>
                              f. AI Service Providers: To deliver core functionalities of our service, we may include certain user information in prompts sent via API to third-party AI providers, such as OpenAI or Anthropic, in order to process and respond to your requests accurately. These providers use the information only to generate responses on our behalf and are required to handle all data securely and in compliance with data protection standards. We limit the information shared to only what is necessary to provide the service.
                            </li>
                          </ul>
                        </div>

                        <div className="step-box section" id="step4">
                          <h4>4. Guest Data</h4>
                          <ul>
                            <li>
                              a. Host Responsibility for Data Sharing: By using our services, hosts confirm that sharing guest data with HostBuddy AI does not violate any applicable agreements, terms, or legal requirements, including those set by third-party platforms (e.g., Airbnb, PMS providers).
                            </li>
                            <li>
                              b. PMS Data Agreement: HostBuddy AI operates under data processing agreements with Property Management Software providers to ensure that guest data is handled in compliance with privacy and data protection standards.
                            </li>
                          </ul>
                        </div>

                        <div className="step-box section" id="step5">
                          <h4>5. Data Security</h4>
                          <ul>
                            <li>
                              a. Security Measures: We implement industry-standard security measures to protect your personal data  against unauthorized access, alteration, disclosure, or destruction.
                            </li>
                            <li>
                              b. Encryption: Personal data transmitted to and from our website is encrypted using Secure Socket Layer  (SSL) technology to ensure its confidentiality and integrity.
                            </li>
                            <li>
                              c. Access Controls: Access to your personal data is restricted to authorized personnel who need to know  that information in order to operate, develop, or improve our services.
                            </li>
                          </ul>
                        </div>

                        <div className="step-box section" id="step6">
                          <h4>6. Data Minimization</h4>
                          <ul>
                            <li>
                              a. Minimization Principle: We collect and process only the minimum amount of personal data necessary  to fulfill the purposes outlined in this Privacy Policy.
                            </li>
                            <li>
                              b. Limited Access: Access to personal data is limited to authorized personnel and is restricted to what is  necessary for the performance of their duties.
                            </li>
                          </ul>
                        </div>

                        <div className="step-box section" id="step7">
                          <h4>7. Data Accuracy</h4>
                          <ul>
                            <li>
                              a. Accuracy Verification: We take reasonable steps to ensure that personal data we collect and process is  accurate, complete, and up-to-date.
                            </li>
                            <li>
                              b. User Updates: Users can update, correct, or delete their personal data by accessing their account  settings or by contacting us directly.
                            </li>
                          </ul>
                        </div>

                        <div className="step-box section" id="step8">
                          <h4>8. Data Transfer</h4>
                          <ul>
                            <li>
                              a. International Transfers: Your personal data may be transferred to, stored, and processed in countries  outside of your own, where data protection laws may differ. By using our services, you consent to such transfers.
                            </li>
                            <li>
                              b. Standard Contractual Clauses: Where required by law, we use standard contractual clauses or other  appropriate safeguards to ensure the protection of your personal data during international transfers.
                            </li>
                          </ul>
                        </div>

                        <div className="step-box section" id="step9">
                          <h4>9. Children's Privacy</h4>
                          <ul>
                            <li>
                              a. Age Restriction: Our services are not intended for children under the age of 18. We do not knowingly  collect personal data from children under 18. If you are a parent or guardian and believe that your child has provided us with personal data, please contact us to request deletion of that information.
                            </li>
                          </ul>
                        </div>

                        <div className="step-box section" id="step10">
                          <h4>10. Data Breach Notification</h4>
                          <ul>
                            <li>
                              a. Notification Obligation: In the event of a data breach that may compromise the security of your personal data, we will notify you and relevant authorities as required by applicable law.
                            </li>
                          </ul>
                        </div>

                        <div className="step-box section" id="step11">
                          <h4>11. Your Rights</h4>
                          <ul>
                            <li>
                              a. Right to Access: You have the right to request access to your personal data and information about how  it is processed.
                            </li>
                            <li>
                              b. Right to Rectification: You have the right to request correction of inaccurate or incomplete personal data.
                            </li>
                            <li>
                              c. Right to Erasure: You have the right to request deletion of your personal data under certain circumstances, such as when it is no longer necessary for the purposes for which it was collected.
                            </li>
                            <li>
                              d. Right to Restriction of Processing: You have the right to request restriction of processing of your personal data under certain circumstances, such as when its accuracy is contested or the processing is unlawful.
                            </li>
                            <li>
                              e. Right to Data Portability: You have the right to receive your personal data in a structured, commonly used, and machine-readable format and to transmit it to another controller.
                            </li>
                          </ul>
                        </div>

                        <div className="step-box section" id="step12">
                          <h4>12. Automated Decision-Making</h4>
                          <ul>
                            <li>
                              a. Transparency: If we engage in automated decision-making processes that have legal or significant  effects on you, we will provide information about the logic involved and the potential consequences of such processing.
                            </li>
                          </ul>
                        </div>

                        <div className="step-box section" id="step13">
                          <h4>13. Data Retention Policy</h4>
                          <ul>
                            <li>
                              a. Retention Period: We retain your personal data only for as long as necessary to fulfill the purposes  outlined in this Privacy Policy, unless a longer retention period is required or permitted by law.
                            </li>
                            <li>
                              b. Criteria for Retention: We consider factors such as the nature and sensitivity of the personal data, the purposes for which it was collected, and legal requirements when determining the appropriate retention period.
                            </li>
                            <li>
                              c. Guest Data Retention: Guest data obtained through PMS integration is retained only for the duration necessary to provide the intended services or as directed by the PMS provider. Upon request from the PMS or the host, we will delete or anonymize guest data as required by applicable law.
                            </li>
                          </ul>
                        </div>

                        <div className="step-box section" id="step14">
                          <h4>14. Guest Data Processing</h4>
                          <ul>
                            <li>
                              a. Purpose Limitation of Guest Data: Guest data obtained through the Property Management Software (PMS) integration is only accessed and processed to provide necessary property management services to the host. HostBuddy AI will not use guest data for any purposes outside the scope of these services.
                            </li>
                            <li>
                              b. Guest Data Subject Rights: HostBuddy AI supports hosts in fulfilling data subject rights for guests, such as access, rectification, and deletion, in compliance with applicable regulations. Hosts or the Property Management Software (PMS) provider may initiate such requests, which we will address promptly to ensure compliance.
                            </li>
                          </ul>
                        </div>

                        <div className="step-box section" id="step15">
                          <h4>15. Consent Withdrawal</h4>
                          <ul>
                            <li>
                              a. Right to Withdraw Consent: If you have provided consent for the processing of your personal data, you  have the right to withdraw that consent at any time. Withdrawal of consent does not affect the lawfulness  of processing based on consent before its withdrawal.
                            </li>
                          </ul>
                        </div>

                        <div className="step-box section" id="step16">
                          <h4>16. Changes to This Privacy Policy</h4>
                          <p>
                            We may update this Privacy Policy to reflect changes to our information practices. Any changes will be posted on this page, and we encourage users to review it regularly.
                          </p>
                        </div>

                        <div className="step-box section" id="step17">
                          <h4>17. Contact Us</h4>
                          <p>
                            For any questions about this Privacy Policy or our data practices, please contact us at info@HostBuddy.ai.
                          </p>
                        </div>

                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}

export default PrivacyPolicy
