import { X } from 'lucide-react';

interface TermsOfServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function TermsOfServiceModal({ isOpen, onClose }: TermsOfServiceModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-[60]">
      <div className="bg-[#0F1117] border-2 border-[#013280] rounded-2xl w-full max-w-[800px] mx-4 relative max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="border-b border-[#013280] px-8 py-6 flex items-center justify-between flex-shrink-0">
          <h2 className="text-white text-[24px] font-['DM_Sans:SemiBold',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
            Terms of Service
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
                Welcome to Hostbuddy AI!
              </h3>
            </div>

            <div>
              <h3 className="text-white text-[16px] font-['DM_Sans:SemiBold',_sans-serif] mb-3" style={{ fontVariationSettings: "'opsz' 14" }}>
                1. Acceptance of Terms
              </h3>
              <p className="text-[#a6a9b2]">
                By accessing or using HostBuddy AI, you agree to be bound by these Terms. Your use of the Service constitutes your acceptance of these Terms in full. If you do not agree to these Terms or any part thereof, you are prohibited from using the Service.
              </p>
            </div>

            <div>
              <h3 className="text-white text-[16px] font-['DM_Sans:SemiBold',_sans-serif] mb-3" style={{ fontVariationSettings: "'opsz' 14" }}>
                2. Use of the Service
              </h3>
              <div className="space-y-3">
                <p className="text-[#a6a9b2]">
                  <span className="font-['DM_Sans:SemiBold',_sans-serif]">a. License:</span> Subject to these Terms, HostBuddy AI grants you a non-exclusive, non-transferable license to use the Service solely for your business purposes. This license allows you to access and utilize the features and functionalities of the Service in accordance with these Terms and any additional guidelines provided by HostBuddy AI.
                </p>
                <div>
                  <p className="text-[#a6a9b2] mb-2">
                    <span className="font-['DM_Sans:SemiBold',_sans-serif]">b. Prohibited Use:</span> You agree not to:
                  </p>
                  <div className="pl-4 space-y-2">
                    <p className="text-[#a6a9b2]">
                      <span className="font-['DM_Sans:SemiBold',_sans-serif]">a. Unlawful Purpose:</span> Use the Service for any purpose that is unlawful, prohibited by these Terms, or in violation of any applicable laws or regulations. This includes, but is not limited to, using the Service to engage in illegal activities, distribute harmful content, or infringe upon the rights of others.
                    </p>
                    <p className="text-[#a6a9b2]">
                      <span className="font-['DM_Sans:SemiBold',_sans-serif]">b. Interference and Disruption:</span> Interfere with or disrupt the integrity, security, or performance of the Service or any related systems, networks, or infrastructure. This includes, but is not limited to, attempting to gain unauthorized access to the Service, introducing viruses or other malicious code, or engaging in any activity that may adversely affect the availability or reliability of the Service.
                    </p>
                    <p className="text-[#a6a9b2]">
                      <span className="font-['DM_Sans:SemiBold',_sans-serif]">c. Unauthorized Access:</span> Access or use the Service in any manner that exceeds the scope of the license granted herein, including accessing or using any unauthorized areas of the Service, unauthorized accounts, or unauthorized data.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-white text-[16px] font-['DM_Sans:SemiBold',_sans-serif] mb-3" style={{ fontVariationSettings: "'opsz' 14" }}>
                3. User Responsibilities and Data Regulations compliance
              </h3>
              <div className="space-y-2 pl-4">
                <p className="text-[#a6a9b2]">
                  <span className="font-['DM_Sans:SemiBold',_sans-serif]">a. Accuracy of Information:</span> You are responsible for the accuracy and legality of all information provided to the chatbot. HostBuddy AI is not liable for any inaccuracies or legal violations in the information provided.
                </p>
                <p className="text-[#a6a9b2]">
                  <span className="font-['DM_Sans:SemiBold',_sans-serif]">b. Data Protection Compliance:</span> Users agree to comply with all applicable international laws and regulations related to software as a service (SAAS) products, data protection, including but not limited to the General Data Protection Regulation (GDPR) in the European Union, the California Consumer Privacy Act (CCPA), and any other relevant laws in the jurisdictions where they operate or where their data subjects reside.
                </p>
                <p className="text-[#a6a9b2]">
                  <span className="font-['DM_Sans:SemiBold',_sans-serif]">c. Data Security:</span> HostBuddy AI implements industry-standard security measures to protect user data. However, users acknowledge that no method of transmission over the internet or electronic storage is completely secure, and HostBuddy AI cannot guarantee the absolute security of user data.
                </p>
                <p className="text-[#a6a9b2]">
                  <span className="font-['DM_Sans:SemiBold',_sans-serif]">d. Data Ownership:</span> Users retain ownership of all data provided to HostBuddy AI through the Service. HostBuddy AI does not claim ownership of user data. However, by using the Service, users grant HostBuddy AI a worldwide, royalty-free license to use, modify, reproduce, and distribute such data for the purpose of providing and improving the Service.
                </p>
                <p className="text-[#a6a9b2]">
                  <span className="font-['DM_Sans:SemiBold',_sans-serif]">e. Data Processing Agreement:</span> When processing personal data on behalf of users who are subject to the GDPR or other data protection regulations, HostBuddy AI acts as a data processor. The relationship between HostBuddy AI and the user is governed by our Data Processing Agreement, which forms an integral part of these Terms.
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-white text-[16px] font-['DM_Sans:SemiBold',_sans-serif] mb-3" style={{ fontVariationSettings: "'opsz' 14" }}>
                4. Limitation of Liability
              </h3>
              <div className="space-y-2 pl-4">
                <p className="text-[#a6a9b2]">
                  <span className="font-['DM_Sans:SemiBold',_sans-serif]">a. Disclaimer:</span> The Service is provided "as is" without warranties of any kind. HostBuddy AI disclaims all liability for any indirect, incidental, consequential, or punitive damages arising out of or related to the use of the Service.
                </p>
                <p className="text-[#a6a9b2]">
                  <span className="font-['DM_Sans:SemiBold',_sans-serif]">b. Incorrect Guidance:</span> HostBuddy AI may provide incorrect guidance due to limitations in data availability or the inherent uncertainties of AI. Users accept this risk and agree that HostBuddy AI is not liable for any negative consequences resulting from such guidance.
                </p>
                <p className="text-[#a6a9b2]">
                  <span className="font-['DM_Sans:SemiBold',_sans-serif]">c. Financial Obligations:</span> HostBuddy AI is not responsible for any financial obligations incurred by users, including but not limited to refunds or compensation to guests based on information provided by the Service.
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-white text-[16px] font-['DM_Sans:SemiBold',_sans-serif] mb-3" style={{ fontVariationSettings: "'opsz' 14" }}>
                5. Privacy
              </h3>
              <div className="space-y-2 pl-4">
                <p className="text-[#a6a9b2]">
                  <span className="font-['DM_Sans:SemiBold',_sans-serif]">a. Data Collection:</span> HostBuddy AI collects and processes user data in accordance with its Privacy Policy and, where applicable, the Data Processing Agreement. By using the Service, you consent to such data practices.
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-white text-[16px] font-['DM_Sans:SemiBold',_sans-serif] mb-3" style={{ fontVariationSettings: "'opsz' 14" }}>
                6. Termination
              </h3>
              <p className="text-[#a6a9b2]">
                HostBuddy AI may terminate or suspend your access to the Service at any time, without prior notice or liability, for any reason.
              </p>
            </div>

            <div>
              <h3 className="text-white text-[16px] font-['DM_Sans:SemiBold',_sans-serif] mb-3" style={{ fontVariationSettings: "'opsz' 14" }}>
                7. Miscellaneous
              </h3>
              <div className="space-y-2 pl-4">
                <p className="text-[#a6a9b2]">
                  <span className="font-['DM_Sans:SemiBold',_sans-serif]">a. Governing Law:</span> These Terms shall be governed by and construed in accordance with the laws of your local jurisdiction.
                </p>
                <p className="text-[#a6a9b2]">
                  <span className="font-['DM_Sans:SemiBold',_sans-serif]">b. Changes to Terms:</span> HostBuddy AI reserves the right to update or modify these Terms at any time. Continued use of the Service after such changes constitutes acceptance of the updated Terms.
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-white text-[16px] font-['DM_Sans:SemiBold',_sans-serif] mb-3" style={{ fontVariationSettings: "'opsz' 14" }}>
                8. Dispute Resolution
              </h3>
              <div className="space-y-2 pl-4">
                <p className="text-[#a6a9b2]">
                  <span className="font-['DM_Sans:SemiBold',_sans-serif]">a. Mediation and Arbitration:</span> Any dispute arising from or relating to these Terms shall be resolved first through good-faith negotiation between the parties. If a resolution cannot be reached, the parties agree to pursue mediation or arbitration as a means of alternative dispute resolution.
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-white text-[16px] font-['DM_Sans:SemiBold',_sans-serif] mb-3" style={{ fontVariationSettings: "'opsz' 14" }}>
                9. Intellectual Property
              </h3>
              <div className="space-y-2 pl-4">
                <p className="text-[#a6a9b2]">
                  <span className="font-['DM_Sans:SemiBold',_sans-serif]">a. Ownership:</span> All intellectual property rights in the Service and its content, including but not limited to software, algorithms, trademarks, and logos, are owned by HostBuddy AI or its licensors. Users agree not to reproduce, modify, or distribute any proprietary content without prior written consent.
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-white text-[16px] font-['DM_Sans:SemiBold',_sans-serif] mb-3" style={{ fontVariationSettings: "'opsz' 14" }}>
                10. User Feedback
              </h3>
              <div className="space-y-2 pl-4">
                <p className="text-[#a6a9b2]">
                  <span className="font-['DM_Sans:SemiBold',_sans-serif]">a. Feedback License:</span> By providing feedback, suggestions, or other comments to HostBuddy AI regarding the Service, you grant HostBuddy AI a perpetual, irrevocable, worldwide, royalty-free license to use, modify, and incorporate such feedback into its products and services without any obligation or compensation to you.
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-white text-[16px] font-['DM_Sans:SemiBold',_sans-serif] mb-3" style={{ fontVariationSettings: "'opsz' 14" }}>
                11. Representations and Warranties
              </h3>
              <div className="space-y-2 pl-4">
                <p className="text-[#a6a9b2]">
                  <span className="font-['DM_Sans:SemiBold',_sans-serif]">a. User Representations:</span> By using the Service, you represent and warrant that you have the legal authority to enter into these Terms and that your use of the Service will not violate any applicable laws or regulations.
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-white text-[16px] font-['DM_Sans:SemiBold',_sans-serif] mb-3" style={{ fontVariationSettings: "'opsz' 14" }}>
                12. Third-Party Services
              </h3>
              <div className="space-y-2 pl-4">
                <p className="text-[#a6a9b2]">
                  <span className="font-['DM_Sans:SemiBold',_sans-serif]">a. Integration:</span> HostBuddy AI may integrate with third-party services or platforms to enhance functionality. Users acknowledge and agree that their use of such third-party services is subject to the terms and conditions of those services, and HostBuddy AI is not responsible for any actions or omissions of third party providers.
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-white text-[16px] font-['DM_Sans:SemiBold',_sans-serif] mb-3" style={{ fontVariationSettings: "'opsz' 14" }}>
                13. Severability
              </h3>
              <div className="space-y-2 pl-4">
                <p className="text-[#a6a9b2]">
                  <span className="font-['DM_Sans:SemiBold',_sans-serif]">a. Invalid Provisions:</span> If any provision of these Terms is found to be invalid or unenforceable, such provision shall be severed from the Terms, and the remaining provisions shall remain in full force and effect.
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-white text-[16px] font-['DM_Sans:SemiBold',_sans-serif] mb-3" style={{ fontVariationSettings: "'opsz' 14" }}>
                14. Entire Agreement
              </h3>
              <div className="space-y-2 pl-4">
                <p className="text-[#a6a9b2]">
                  <span className="font-['DM_Sans:SemiBold',_sans-serif]">a. Comprehensive Agreement:</span> These Terms, along with the Data Processing Agreement and Privacy Policy referenced herein, constitute the entire agreement between you and HostBuddy AI regarding the use of the Service, superseding any prior agreements or understandings between the parties.
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-white text-[16px] font-['DM_Sans:SemiBold',_sans-serif] mb-3" style={{ fontVariationSettings: "'opsz' 14" }}>
                15. Waiver
              </h3>
              <div className="space-y-2 pl-4">
                <p className="text-[#a6a9b2]">
                  <span className="font-['DM_Sans:SemiBold',_sans-serif]">a. Waiver of Rights:</span> The failure of HostBuddy AI to enforce any provision of these Terms shall not be construed as a waiver of its right to do so in the future.
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-white text-[16px] font-['DM_Sans:SemiBold',_sans-serif] mb-3" style={{ fontVariationSettings: "'opsz' 14" }}>
                16. Contact Us
              </h3>
              <p className="text-[#a6a9b2]">
                If you have any questions about these Terms, please contact us at{' '}
                <a href="mailto:info@hostbuddy.ai" className="text-[#3e88f7] hover:underline">info@hostbuddy.ai</a>.
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
