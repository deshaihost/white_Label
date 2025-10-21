import { X } from 'lucide-react';

interface PrivacyPolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PrivacyPolicyModal({ isOpen, onClose }: PrivacyPolicyModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-[60]">
      <div className="bg-[#0F1117] border-2 border-[#013280] rounded-2xl w-full max-w-[800px] mx-4 relative max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="border-b border-[#013280] px-8 py-6 flex items-center justify-between flex-shrink-0">
          <h2 className="text-white text-[24px] font-['DM_Sans:SemiBold',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
            Privacy Policy
          </h2>
          <button
            onClick={onClose}
            className="text-[#a6a9b2] hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-8 py-6">
          <div className="text-[#d0d3db] text-[14px] font-['DM_Sans:Regular',_sans-serif] leading-relaxed space-y-6" style={{ fontVariationSettings: "'opsz' 14" }}>
            
            <div>
              <h3 className="text-white text-[16px] font-['DM_Sans:SemiBold',_sans-serif] mb-3" style={{ fontVariationSettings: "'opsz' 14" }}>
                Welcome to HostBuddy AI!
              </h3>
              <p className="text-[#a6a9b2]">
                This Privacy Policy outlines the policies and procedures of HostBuddy AI LLC ("we", "our", or "us") regarding the collection, use, processing, and disclosure of your information on https://HostBuddy.ai (the "website") and the services, tools, or features we offer. This policy is designed to inform our users (referred to as "users" or "you") about how we handle their personal data.
              </p>
            </div>

            <div>
              <h3 className="text-white text-[16px] font-['DM_Sans:SemiBold',_sans-serif] mb-3" style={{ fontVariationSettings: "'opsz' 14" }}>
                1. Collection of Personal Data
              </h3>
              <p className="text-[#a6a9b2] mb-3">
                At HostBuddy AI, we prioritize the protection of your personal data while providing AI communication support services for short-term rental management. To ensure efficient service delivery, we collect specific types of personal data, including:
              </p>
              <div className="space-y-2 pl-4">
                <p className="text-[#a6a9b2]">
                  <span className="font-['DM_Sans:SemiBold',_sans-serif]">a. Contact Information:</span> This encompasses essential details such as your phone number and email address, enabling us to communicate effectively regarding your rental property management needs.
                </p>
                <p className="text-[#a6a9b2]">
                  <span className="font-['DM_Sans:SemiBold',_sans-serif]">b. Payment Information:</span> Should you opt for our subscription services, rest assured that your payment details are handled securely through our trusted payment processing partner, Stripe. We do not share this sensitive financial information with any third parties.
                </p>
                <p className="text-[#a6a9b2]">
                  <span className="font-['DM_Sans:SemiBold',_sans-serif]">c. Property Details:</span> Understanding the unique aspects of your rental property is crucial for us to tailor our services to your requirements. Therefore, we may collect information such as property addresses, access codes, directions, and any other pertinent details you choose to provide.
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-white text-[16px] font-['DM_Sans:SemiBold',_sans-serif] mb-3" style={{ fontVariationSettings: "'opsz' 14" }}>
                2. Use of Personal Data
              </h3>
              <p className="text-[#a6a9b2] mb-3">
                Your personal data is utilized with the utmost care and integrity, serving the following purposes:
              </p>
              <div className="space-y-2 pl-4">
                <p className="text-[#a6a9b2]">
                  <span className="font-['DM_Sans:SemiBold',_sans-serif]">a. Service Enhancement:</span> We utilize your personal data to provide, maintain, and enhance our AI communication support services, ensuring seamless management of your short term rental properties.
                </p>
                <p className="text-[#a6a9b2]">
                  <span className="font-['DM_Sans:SemiBold',_sans-serif]">b. Communication:</span> From time to time, we may send you marketing materials, company updates, newsletters, service announcements, and promotional offers. However, you retain the option to opt out of receiving such communications at any point, respecting your preferences and privacy.
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-white text-[16px] font-['DM_Sans:SemiBold',_sans-serif] mb-3" style={{ fontVariationSettings: "'opsz' 14" }}>
                3. Sharing of Personal Data
              </h3>
              <p className="text-[#a6a9b2] mb-3">
                We prioritize transparency and accountability in our data sharing practices, ensuring your information is shared only under specific circumstances:
              </p>
              <div className="space-y-2 pl-4">
                <p className="text-[#a6a9b2]">
                  <span className="font-['DM_Sans:SemiBold',_sans-serif]">a. Property Management Software Partners:</span> If you choose to integrate your HostBuddy AI account with external property management software, we may share necessary account data to facilitate seamless synchronization and operation between platforms.
                </p>
                <p className="text-[#a6a9b2]">
                  <span className="font-['DM_Sans:SemiBold',_sans-serif]">b. Guests:</span> Information that you enter on our platform for a given property, is accessible to guests at that property via chat with our AI chatbot, if the chatbot is provided and configured for guests at the property.
                </p>
                <p className="text-[#a6a9b2]">
                  <span className="font-['DM_Sans:SemiBold',_sans-serif]">c. Legal Requirements:</span> In compliance with US law, we may be obligated to share personal data in response to lawful requests or legal proceedings, prioritizing transparency and adherence to regulatory requirements.
                </p>
                <p className="text-[#a6a9b2]">
                  <span className="font-['DM_Sans:SemiBold',_sans-serif]">d. Phone numbers:</span> HostBuddy AI respects your privacy and does not share your phone number with any third parties or platforms under any circumstances, unless required by law.
                </p>
                <p className="text-[#a6a9b2]">
                  <span className="font-['DM_Sans:SemiBold',_sans-serif]">e. Service Providers for Notifications:</span> When you opt in to receive notifications and provide your contact information, we use third-party providers, such as Twilio and SendGrid, to facilitate the delivery of these notifications. These providers are granted access to your information solely for this purpose and are contractually obligated to handle your data securely and in accordance with our privacy standards.
                </p>
                <p className="text-[#a6a9b2]">
                  <span className="font-['DM_Sans:SemiBold',_sans-serif]">f. AI Service Providers:</span> To deliver core functionalities of our service, we may include certain user information in prompts sent via API to third-party AI providers, such as OpenAI or Anthropic, in order to process and respond to your requests accurately. These providers use the information only to generate responses on our behalf and are required to handle all data securely and in compliance with data protection standards. We limit the information shared to only what is necessary to provide the service.
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-white text-[16px] font-['DM_Sans:SemiBold',_sans-serif] mb-3" style={{ fontVariationSettings: "'opsz' 14" }}>
                4. Guest Data
              </h3>
              <div className="space-y-2 pl-4">
                <p className="text-[#a6a9b2]">
                  <span className="font-['DM_Sans:SemiBold',_sans-serif]">a. Host Responsibility for Data Sharing:</span> By using our services, hosts confirm that sharing guest data with HostBuddy AI does not violate any applicable agreements, terms, or legal requirements, including those set by third-party platforms (e.g., Airbnb, PMS providers).
                </p>
                <p className="text-[#a6a9b2]">
                  <span className="font-['DM_Sans:SemiBold',_sans-serif]">b. PMS Data Agreement:</span> HostBuddy AI operates under data processing agreements with Property Management Software providers to ensure that guest data is handled in compliance with privacy and data protection standards.
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-white text-[16px] font-['DM_Sans:SemiBold',_sans-serif] mb-3" style={{ fontVariationSettings: "'opsz' 14" }}>
                5. Data Security
              </h3>
              <div className="space-y-2 pl-4">
                <p className="text-[#a6a9b2]">
                  <span className="font-['DM_Sans:SemiBold',_sans-serif]">a. Security Measures:</span> We implement industry-standard security measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction.
                </p>
                <p className="text-[#a6a9b2]">
                  <span className="font-['DM_Sans:SemiBold',_sans-serif]">b. Encryption:</span> Personal data transmitted to and from our website is encrypted using Secure Socket Layer (SSL) technology to ensure its confidentiality and integrity.
                </p>
                <p className="text-[#a6a9b2]">
                  <span className="font-['DM_Sans:SemiBold',_sans-serif]">c. Access Controls:</span> Access to your personal data is restricted to authorized personnel who need to know that information in order to operate, develop, or improve our services.
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-white text-[16px] font-['DM_Sans:SemiBold',_sans-serif] mb-3" style={{ fontVariationSettings: "'opsz' 14" }}>
                6. Data Minimization
              </h3>
              <div className="space-y-2 pl-4">
                <p className="text-[#a6a9b2]">
                  <span className="font-['DM_Sans:SemiBold',_sans-serif]">a. Minimization Principle:</span> We collect and process only the minimum amount of personal data necessary to fulfill the purposes outlined in this Privacy Policy.
                </p>
                <p className="text-[#a6a9b2]">
                  <span className="font-['DM_Sans:SemiBold',_sans-serif]">b. Limited Access:</span> Access to personal data is limited to authorized personnel and is restricted to what is necessary for the performance of their duties.
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-white text-[16px] font-['DM_Sans:SemiBold',_sans-serif] mb-3" style={{ fontVariationSettings: "'opsz' 14" }}>
                7. Data Accuracy
              </h3>
              <div className="space-y-2 pl-4">
                <p className="text-[#a6a9b2]">
                  <span className="font-['DM_Sans:SemiBold',_sans-serif]">a. Accuracy Verification:</span> We take reasonable steps to ensure that personal data we collect and process is accurate, complete, and up-to-date.
                </p>
                <p className="text-[#a6a9b2]">
                  <span className="font-['DM_Sans:SemiBold',_sans-serif]">b. User Updates:</span> Users can update, correct, or delete their personal data by accessing their account settings or by contacting us directly.
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-white text-[16px] font-['DM_Sans:SemiBold',_sans-serif] mb-3" style={{ fontVariationSettings: "'opsz' 14" }}>
                8. Data Transfer
              </h3>
              <div className="space-y-2 pl-4">
                <p className="text-[#a6a9b2]">
                  <span className="font-['DM_Sans:SemiBold',_sans-serif]">a. International Transfers:</span> Your personal data may be transferred to, stored, and processed in countries outside of your own, where data protection laws may differ. By using our services, you consent to such transfers.
                </p>
                <p className="text-[#a6a9b2]">
                  <span className="font-['DM_Sans:SemiBold',_sans-serif]">b. Standard Contractual Clauses:</span> Where required by law, we use standard contractual clauses or other appropriate safeguards to ensure the protection of your personal data during international transfers.
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-white text-[16px] font-['DM_Sans:SemiBold',_sans-serif] mb-3" style={{ fontVariationSettings: "'opsz' 14" }}>
                9. Children's Privacy
              </h3>
              <div className="space-y-2 pl-4">
                <p className="text-[#a6a9b2]">
                  <span className="font-['DM_Sans:SemiBold',_sans-serif]">a. Age Restriction:</span> Our services are not intended for children under the age of 18. We do not knowingly collect personal data from children under 18. If you are a parent or guardian and believe that your child has provided us with personal data, please contact us to request deletion of that information.
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-white text-[16px] font-['DM_Sans:SemiBold',_sans-serif] mb-3" style={{ fontVariationSettings: "'opsz' 14" }}>
                10. Data Breach Notification
              </h3>
              <div className="space-y-2 pl-4">
                <p className="text-[#a6a9b2]">
                  <span className="font-['DM_Sans:SemiBold',_sans-serif]">a. Notification Obligation:</span> In the event of a data breach that may compromise the security of your personal data, we will notify you and relevant authorities as required by applicable law.
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-white text-[16px] font-['DM_Sans:SemiBold',_sans-serif] mb-3" style={{ fontVariationSettings: "'opsz' 14" }}>
                11. Your Rights
              </h3>
              <div className="space-y-2 pl-4">
                <p className="text-[#a6a9b2]">
                  <span className="font-['DM_Sans:SemiBold',_sans-serif]">a. Right to Access:</span> You have the right to request access to your personal data and information about how it is processed.
                </p>
                <p className="text-[#a6a9b2]">
                  <span className="font-['DM_Sans:SemiBold',_sans-serif]">b. Right to Rectification:</span> You have the right to request correction of inaccurate or incomplete personal data.
                </p>
                <p className="text-[#a6a9b2]">
                  <span className="font-['DM_Sans:SemiBold',_sans-serif]">c. Right to Erasure:</span> You have the right to request deletion of your personal data under certain circumstances, such as when it is no longer necessary for the purposes for which it was collected.
                </p>
                <p className="text-[#a6a9b2]">
                  <span className="font-['DM_Sans:SemiBold',_sans-serif]">d. Right to Restriction of Processing:</span> You have the right to request restriction of processing of your personal data under certain circumstances, such as when its accuracy is contested or the processing is unlawful.
                </p>
                <p className="text-[#a6a9b2]">
                  <span className="font-['DM_Sans:SemiBold',_sans-serif]">e. Right to Data Portability:</span> You have the right to receive your personal data in a structured, commonly used, and machine-readable format and to transmit it to another controller.
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-white text-[16px] font-['DM_Sans:SemiBold',_sans-serif] mb-3" style={{ fontVariationSettings: "'opsz' 14" }}>
                12. Automated Decision-Making
              </h3>
              <div className="space-y-2 pl-4">
                <p className="text-[#a6a9b2]">
                  <span className="font-['DM_Sans:SemiBold',_sans-serif]">a. Transparency:</span> If we engage in automated decision-making processes that have legal or significant effects on you, we will provide information about the logic involved and the potential consequences of such processing.
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-white text-[16px] font-['DM_Sans:SemiBold',_sans-serif] mb-3" style={{ fontVariationSettings: "'opsz' 14" }}>
                13. Data Retention Policy
              </h3>
              <div className="space-y-2 pl-4">
                <p className="text-[#a6a9b2]">
                  <span className="font-['DM_Sans:SemiBold',_sans-serif]">a. Retention Period:</span> We retain your personal data only for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law.
                </p>
                <p className="text-[#a6a9b2]">
                  <span className="font-['DM_Sans:SemiBold',_sans-serif]">b. Criteria for Retention:</span> We consider factors such as the nature and sensitivity of the personal data, the purposes for which it was collected, and legal requirements when determining the appropriate retention period.
                </p>
                <p className="text-[#a6a9b2]">
                  <span className="font-['DM_Sans:SemiBold',_sans-serif]">c. Guest Data Retention:</span> Guest data obtained through PMS integration is retained only for the duration necessary to provide the intended services or as directed by the PMS provider. Upon request from the PMS or the host, we will delete or anonymize guest data as required by applicable law.
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-white text-[16px] font-['DM_Sans:SemiBold',_sans-serif] mb-3" style={{ fontVariationSettings: "'opsz' 14" }}>
                14. Guest Data Processing
              </h3>
              <div className="space-y-2 pl-4">
                <p className="text-[#a6a9b2]">
                  <span className="font-['DM_Sans:SemiBold',_sans-serif]">a. Purpose Limitation of Guest Data:</span> Guest data obtained through the Property Management Software (PMS) integration is only accessed and processed to provide necessary property management services to the host. HostBuddy AI will not use guest data for any purposes outside the scope of these services.
                </p>
                <p className="text-[#a6a9b2]">
                  <span className="font-['DM_Sans:SemiBold',_sans-serif]">b. Guest Data Subject Rights:</span> HostBuddy AI supports hosts in fulfilling data subject rights for guests, such as access, rectification, and deletion, in compliance with applicable regulations. Hosts or the Property Management Software (PMS) provider may initiate such requests, which we will address promptly to ensure compliance.
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-white text-[16px] font-['DM_Sans:SemiBold',_sans-serif] mb-3" style={{ fontVariationSettings: "'opsz' 14" }}>
                15. Consent Withdrawal
              </h3>
              <div className="space-y-2 pl-4">
                <p className="text-[#a6a9b2]">
                  <span className="font-['DM_Sans:SemiBold',_sans-serif]">a. Right to Withdraw Consent:</span> If you have provided consent for the processing of your personal data, you have the right to withdraw that consent at any time. Withdrawal of consent does not affect the lawfulness of processing based on consent before its withdrawal.
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-white text-[16px] font-['DM_Sans:SemiBold',_sans-serif] mb-3" style={{ fontVariationSettings: "'opsz' 14" }}>
                16. Changes to This Privacy Policy
              </h3>
              <p className="text-[#a6a9b2]">
                We may update this Privacy Policy to reflect changes to our information practices. Any changes will be posted on this page, and we encourage users to review it regularly.
              </p>
            </div>

            <div>
              <h3 className="text-white text-[16px] font-['DM_Sans:SemiBold',_sans-serif] mb-3" style={{ fontVariationSettings: "'opsz' 14" }}>
                17. Contact Us
              </h3>
              <p className="text-[#a6a9b2]">
                For any questions about this Privacy Policy or our data practices, please contact us at{' '}
                <a href="mailto:info@HostBuddy.ai" className="text-[#3e88f7] hover:underline">info@HostBuddy.ai</a>.
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
