import React, {  useEffect } from 'react'
import './tipsAndTricks.css';
import { Helmet } from 'react-helmet';
const TipsAndTricks = () => {
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
          <title>Hostbuddy Tips And Tricks</title>
        </Helmet>
        <div className="container">
          <div className="banner-heading">
            <h2>Hostbuddy Tips And Tricks</h2>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div className="account-container">
                <div className="account_heading">
                  <h3>Hostbuddy Tips And Tricks</h3>
                </div>
                <div className="account-content">
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="guide-steps">
                        <div className="step-box">
                          <h4>Welcome to Hostbuddy AI!</h4>
                          <p><em>This document covers best practices for building out information within your property details sections. These tips should be followed to ensure that your information is interpreted correctly by our software.</em></p>
                        </div>
                        <div className="step-box section" id="step1">
                          <h4>Supporting Documents</h4>
                          <p>
                            Supporting documents are an excellent way to quickly and easily provide HostBuddy with information about your property. They should be used in addition to manually adding information to your property details sections.
                          </p>
                          <ul>
                            <li>
                              Supporting documents are .pdf, .txt, or .docx files that users upload to provide information about a property. Users often use this section to add welcome documents for their property or provide more detailed directions and information about amenities and property features. This can be used creatively to provide HostBuddy with additional information or resources that cannot be added into property details sections. We do our best to provide a multitude of relevant fields, but recognize that some hosts may have certain amenities or property features that are not covered in our preset fields.
                            </li>
                            <li>
                              It is important to review any documents that you upload to ensure that they do not contradict information you have provided in the property details sections. This can cause HostBuddy to have difficulty providing accurate information to your guests.
                            </li>
                          </ul>
                        </div>
                        <div className="step-box section" id="step2">
                          <h4>Utilizing Additional Information (Pencil Icon)</h4>
                          <p>
                            You will notice a pencil icon next to certain fields in your property details sections (Basics, Listing Details, Amenities, and Extras). By clicking on the pencil icon, you will be able to add additional information about each field (amenity or other). These tips and tricks may be helpful to ensure HostBuddy responds adequately to guest queries.
                          </p>
                          <ul>
                            <li>
                              For every field that has a pencil icon, we recommend providing as much information as you can about the particular amenity or informational item that it applies to.
                            </li>
                            <li>
                              Consider the following items when completing the additional information:
                              <ul style={{ marginBottom: "0px" }}>
                                <li>
                                  The location of an amenity and backup locations in the event it is misplaced.
                                </li>
                                <li>
                                  Unique features of the amenity, such as what it looks like, how to use it, and where items that are meant to be used with it may be located (for example, if you have a dishwasher, explain where dishwasher detergent may be found).
                                </li>
                                <li>
                                  Information on how to troubleshoot common issues. To ensure HostBuddy is capable of supporting your guests and enabling them to fix issues that are impacting their stay, this section can be used to provide instructions on how to troubleshoot issues. Examples could include how to reset the WiFi router, where backup lockboxes are located, where a guest can find spare batteries, where the breaker is and which breakers are connected to which outlets, or anything else that a guest can reasonably fix themselves with the resources available to them.
                                </li>
                                <li>
                                  This document covers best practices for building out information within your property details sections. These tips should be followed to ensure that your information is interpreted correctly by our software.
                                </li>
                              </ul>
                            </li>
                          </ul>
                        </div>

                        <div className="step-box section" id="step3">
                          <h4>Using AI Friendly Language</h4>
                          <p>
                            Our software uses natural language processing to decipher information that it is provided. That being said, AI models do better with certain “AI Friendly” information. Here is a quick list of some tips for speaking AI!
                          </p>
                          <ul>
                            <li>
                              Be Concise: Use clear and concise language to avoid ambiguity.
                            </li>
                            <li>
                              Prioritize Important Information: Place the most critical information in prominent positions or at the beginning of documents to ensure they are easily accessible to the AI.
                            </li>
                            <li>
                              Use Simple Language: Avoid jargon, slang, and complex vocabulary to ensure the AI understands the information as intended.
                            </li>
                            <li>
                              Use Structured Formatting: Organize complex information in either lists or numbered steps (when relevant) to make it easier for the AI to parse and use.
                            </li>
                            <li>
                              Include Keywords: Use relevant keywords that guests might use in their queries to help the AI match questions with answers more accurately.
                            </li>
                            <li>
                              Use Correct Spelling and Grammar: Errors can confuse AI and lead to misinterpretations.
                            </li>
                            <li>
                              Provide Context: When explaining processes or amenities, include why they are important or how they might be used, which helps in formulating better AI responses.
                            </li>
                            <li>
                              Categorize Information: Group related information together (e.g., all details about the kitchen in one section) to help the AI understand context better.
                            </li>
                            <li>
                              Avoid Contradictions: Ensure the information does not contain conflicting details. This will confuse Hostbuddy, and it may provide incorrect information to your guest.
                            </li>
                            <li>
                              Use Active Voice: Active voice makes sentences clearer and more direct by placing the subject at the beginning, followed by the verb, then the object. This order highlights who is doing the action, making it easier for AI to interpret and for guests to understand the information. In contrast to passive voice, which can be vague and less engaging, active voice enhances the readability and effectiveness of communication. For example, "The host updates the guest information" (active) is more straightforward than "The guest information is updated by the host" (passive). This clarity is especially important in AI-driven interactions where precise language helps avoid misunderstandings.
                            </li>
                            <li>
                              Include Examples: When relevant, include examples to illustrate use cases or scenarios. This can be particularly helpful for troubleshooting common scenarios.
                            </li>
                            <li>
                              Use Neutral Tone: Maintain a neutral and professional tone, which is generally easier for AI to process.
                            </li>
                          </ul>
                        </div>

                        <div className="step-box section" id="step4">
                          <h4>General Advice</h4>
                          <ul>
                            <li>
                              Update Regularly: Keep the information updated to ensure the AI provides guests with the most current details.
                            </li>
                            <li>
                              Clarify Limitations: Clearly state any limitations or restrictions concerning the use of amenities or property features.
                            </li>
                            <li>
                              Provide Emergency Information: Include clear instructions for emergencies, which can be crucial for immediate responses. 
                            </li>
                            <li>
                              Mention Exceptions: Note any exceptions to standard procedures or amenities to avoid confusion. For example, if a guest says that the AC is not working, and the AC is only able to be used during summer months, it would be important to include this information.
                            </li>
                            <li>
                              Ask For Help: If you are struggling to have Hostbuddy respond in the way you would like for it to respond, please contact our team so that we can assist you!
                            </li>
                          </ul>
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

export default TipsAndTricks;
