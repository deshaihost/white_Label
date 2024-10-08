import React, {  useEffect } from 'react'
import './TermsofService.css';
import { Helmet } from 'react-helmet';
const TermsofService = () => {
  // const [activeLink, setActiveLink] = useState("");
  // const handleClickScroll = (id) => {
  //   const element = document.getElementById(id);
  //   if (element) {
  //     element.scrollIntoView({ behavior: "smooth" });
  //     setActiveLink(id);
  //   }
  // };

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll(".step-box.section");
      sections.forEach((section) => {
        const bounding = section.getBoundingClientRect();
        if (bounding.top <= 20 && bounding.bottom >= 50) {
          // setActiveLink(section.id);
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
      <div className="account-main">
        <Helmet>
          <title>Terms of Service - HostBuddy AI</title>
          <link rel="canonical" href="https://www.hostbuddy.ai/termsof-service" />
        </Helmet>
        <div className="container">
          <div className="banner-heading">
            <h2>Terms of Service</h2>
          </div>
          <div className="row">
            {/* <div className="col-lg-4">
              <SideBar />
            </div> */}
            <div className="col-lg-12">
              <div className="account-container blur-background-top-right">
                <div className="account_heading">
                  <h3>Terms of Service</h3>
                </div>
                <div className="account-content">
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="guide-steps">
                        <div className="step-box">
                          <h4>Welcome to Hostbuddy AI!</h4>
                        </div>
                        <div className="step-box section" id="step1">
                          <h4>1. Acceptance of Terms</h4>
                          <p>
                          By accessing or using HostBuddy AI, you agree to be bound by these Terms. Your use of the Service  constitutes your acceptance of these Terms in full. If you do not agree to these Terms or any part thereof,  you are prohibited from using the Service.
                          </p>
                        </div>
                        <div className="step-box section" id="step2">
                          <h4>2. Use of the Service</h4>
                          <ul>
                            <li>
                              a. License: Subject to these Terms, HostBuddy AI grants you a non-exclusive, non-transferable license to  use the Service solely for your business purposes. This license allows you to access and utilize the features and functionalities of the Service in accordance with these Terms and any additional guidelines provided  by HostBuddy AI.
                            </li>
                            <li>
                              b. Prohibited Use: You agree not to:
                              <ul style={{ marginBottom: "0px" }}>
                                <li>
                                  a. Unlawful Purpose: Use the Service for any purpose that is unlawful, prohibited by these Terms,  or in violation of any applicable laws or regulations. This includes, but is not limited to, using the  Service to engage in illegal activities, distribute harmful content, or infringe upon the rights of  others.
                                </li>
                                <li>
                                  b. Interference and Disruption: Interfere with or disrupt the integrity, security, or performance of  the Service or any related systems, networks, or infrastructure. This includes, but is not limited  to, attempting to gain unauthorized access to the Service, introducing viruses or other malicious  code, or engaging in any activity that may adversely affect the availability or reliability of the  Service.
                                </li>
                                <li>
                                  c. Unauthorized Access: Access or use the Service in any manner that exceeds the scope of the  license granted herein, including accessing or using any unauthorized areas of the Service,  unauthorized accounts, or unauthorized data.
                                </li>
                              </ul>
                            </li>
                          </ul>
                        </div>

                        <div className="step-box section" id="step3">
                          <h4>3. User Responsibilities and Data Regulations compliance</h4>
                          <ul>
                            <li>
                              a. Accuracy of Information: You are responsible for the accuracy and legality of all information provided  to the chatbot. HostBuddy AI is not liable for any inaccuracies or legal violations in the information  provided.
                            </li>
                            <li>
                              b. Data Protection Compliance: Users agree to comply with all applicable international laws and  regulations related to software as a service (SAAS) products, data protection, including but not limited to  the General Data Protection Regulation (GDPR) in the European Union, the California Consumer Privacy  Act (CCPA), and any other relevant laws in the jurisdictions where they operate or where their data  subjects reside.
                            </li>
                            <li>
                              c. Data Security: HostBuddy AI implements industry-standard security measures to protect user data.  However, users acknowledge that no method of transmission over the internet or electronic storage is  completely secure, and HostBuddy AI cannot guarantee the absolute security of user data.
                            </li>
                            <li>
                              d. Data Ownership: Users retain ownership of all data provided to HostBuddy AI through the Service.  HostBuddy AI does not claim ownership of user data. However, by using the Service, users grant  HostBuddy AI a worldwide, royalty-free license to use, modify, reproduce, and distribute such data for the  purpose of providing and improving the Service.
                            </li>
                          </ul>
                        </div>

                        <div className="step-box section" id="step4">
                          <h4>4. Limitation of Liability</h4>
                          <ul>
                            <li>
                              a. Disclaimer: The Service is provided "as is" without warranties of any kind. HostBuddy AI disclaims all  liability for any indirect, incidental, consequential, or punitive damages arising out of or related to the use  of the Service.
                            </li>
                            <li>
                              b. Incorrect Guidance: HostBuddy AI may provide incorrect guidance due to limitations in data availability  or the inherent uncertainties of AI. Users accept this risk and agree that HostBuddy AI is not liable for any  negative consequences resulting from such guidance. 
                            </li>
                            <li>
                              c. Financial Obligations: HostBuddy AI is not responsible for any financial obligations incurred by users,  including but not limited to refunds or compensation to guests based on information provided by the  Service.
                            </li>
                          </ul>
                        </div>

                        <div className="step-box section" id="step5">
                          <h4>5. Privacy</h4>
                          <ul>
                            <li>
                              a. Data Collection: HostBuddy AI collects and processes user data in accordance with its Privacy Policy. By  using the Service, you consent to such data practices.
                            </li>
                          </ul>
                        </div>

                        <div className="step-box section" id="step6">
                          <h4>6. Termination</h4>
                          <p>
                            HostBuddy AI may terminate or suspend your access to the Service at any time, without prior notice or liability, for any reason. 
                          </p>
                        </div>

                        <div className="step-box section" id="step7">
                          <h4>7. Miscellaneous</h4>
                          <ul>
                            <li>
                              a. Governing Law: These Terms shall be governed by and construed in accordance with the laws of your local jurisdiction.
                            </li>
                            <li>
                              b. Changes to Terms: HostBuddy AI reserves the right to update or modify these Terms at any time. Continued use of the Service after such changes constitutes acceptance of the updated Terms.
                            </li>
                          </ul>
                        </div>

                        <div className="step-box section" id="step8">
                          <h4>8. Dispute Resolution</h4>
                          <ul>
                            <li>
                              a. Mediation and Arbitration: Any dispute arising from or relating to these Terms shall be resolved first  through good-faith negotiation between the parties. If a resolution cannot be reached, the parties agree  to pursue mediation or arbitration as a means of alternative dispute resolution.
                            </li>
                          </ul>
                        </div>

                        <div className="step-box section" id="step9">
                          <h4>9. Intellectual Property</h4>
                          <ul>
                            <li>
                              a. Ownership: All intellectual property rights in the Service and its content, including but not limited to  software, algorithms, trademarks, and logos, are owned by HostBuddy AI or its licensors. Users agree not  to reproduce, modify, or distribute any proprietary content without prior written consent.
                            </li>
                          </ul>
                        </div>

                        <div className="step-box section" id="step10">
                          <h4>10. User Feedback</h4>
                          <ul>
                            <li>
                              a. Feedback License: By providing feedback, suggestions, or other comments to HostBuddy AI regarding  the Service, you grant HostBuddy AI a perpetual, irrevocable, worldwide, royalty-free license to use,  modify, and incorporate such feedback into its products and services without any obligation or  compensation to you.
                            </li>
                          </ul>
                        </div>

                        <div className="step-box section" id="step11">
                          <h4>11. Representations and Warranties</h4>
                          <ul>
                            <li>
                              a. User Representations: By using the Service, you represent and warrant that you have the legal authority  to enter into these Terms and that your use of the Service will not violate any applicable laws or  regulations.
                            </li>
                          </ul>
                        </div>

                        <div className="step-box section" id="step12">
                          <h4>12. Third-Party Services</h4>
                          <ul>
                            <li>
                              a. Integration: HostBuddy AI may integrate with third-party services or platforms to enhance functionality.  Users acknowledge and agree that their use of such third-party services is subject to the terms and  conditions of those services, and HostBuddy AI is not responsible for any actions or omissions of third party providers.
                            </li>
                          </ul>
                        </div>

                        <div className="step-box section" id="step13">
                          <h4>13. Severability</h4>
                          <ul>
                            <li>
                              a. Invalid Provisions: If any provision of these Terms is found to be invalid or unenforceable, such  provision shall be severed from the Terms, and the remaining provisions shall remain in full force and  effect.
                            </li>
                          </ul>
                        </div>

                        <div className="step-box section" id="step14">
                          <h4>14. Entire Agreement</h4>
                          <ul>
                            <li>
                              a. Comprehensive Agreement: These Terms constitute the entire agreement between you and HostBuddy AI regarding the use of the Service, superseding any prior agreements or understandings between the parties.
                            </li>
                          </ul>
                        </div>

                        <div className="step-box section" id="step15">
                          <h4>15. Waiver</h4>
                          <ul>
                            <li>
                              a. Waiver of Rights: The failure of HostBuddy AI to enforce any provision of these Terms shall not be  construed as a waiver of its right to do so in the future.
                            </li>
                          </ul>
                        </div>

                        <div className="step-box section" id="step16">
                          <h4>16. Contact Us</h4>
                          <p>
                            If you have any questions about these Terms, please contact us at info@hostbuddy.ai.
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
  );
};

export default TermsofService;
