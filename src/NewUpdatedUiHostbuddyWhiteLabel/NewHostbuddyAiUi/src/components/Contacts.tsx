import { useState } from 'react';
import { showSaveSuccess } from './useSaveNotification';
import { Mail, Phone, MessageCircle, Slack, Webhook } from 'lucide-react';

interface EmailContact {
  name: string;
  email: string;
  confirmed: boolean;
  showCodeInput?: boolean;
}

interface PhoneContact {
  name: string;
  number: string;
  confirmed: boolean;
  showCodeInput?: boolean;
}

interface WhatsAppContact {
  name: string;
  number: string;
  confirmed: boolean;
  showCodeInput?: boolean;
}

interface WebhookEndpoint {
  name: string;
  url: string;
}

export default function Contacts() {
  const [emails, setEmails] = useState<EmailContact[]>([
    { name: 'Primary Email', email: 'select@stays.net', confirmed: true, showCodeInput: false },
    { name: 'Select Stays Team', email: 'hosting@selectstays.net', confirmed: true, showCodeInput: false },
    { name: 'Leadership', email: 'info@hostbuddy.ai', confirmed: true, showCodeInput: false },
    { name: 'Kat', email: 'kat@selectstays.net', confirmed: true, showCodeInput: false },
    { name: 'Operations Team', email: 'operations@selectstays.net', confirmed: true, showCodeInput: false }
  ]);

  const [emailVerificationCodes, setEmailVerificationCodes] = useState<{ [key: number]: string }>({});

  const [phoneNumbers, setPhoneNumbers] = useState<PhoneContact[]>([
    { name: 'Nick', number: '+14085067412', confirmed: true, showCodeInput: false },
    { name: 'Sam', number: '+15304016167', confirmed: true, showCodeInput: false },
    { name: 'Michael', number: '+15713582222', confirmed: true, showCodeInput: false }
  ]);

  const [verificationCodes, setVerificationCodes] = useState<{ [key: number]: string }>({});

  const [whatsappContacts, setWhatsappContacts] = useState<WhatsAppContact[]>([
    { name: 'Michael', number: '+15713582222', confirmed: true, showCodeInput: false }
  ]);

  const [whatsappVerificationCodes, setWhatsappVerificationCodes] = useState<{ [key: number]: string }>({});

  const [webhooks, setWebhooks] = useState<WebhookEndpoint[]>([
    { name: 'PMS Sync', url: 'https://pms.example.com/webhook' },
    { name: 'Analytics', url: 'https://analytics.example.com/webhook' }
  ]);

  const [showEmailForm, setShowEmailForm] = useState(false);
  const [emailName, setEmailName] = useState('');
  const [emailAddress, setEmailAddress] = useState('');

  const [showPhoneForm, setShowPhoneForm] = useState(false);
  const [phoneName, setPhoneName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [phoneConsent, setPhoneConsent] = useState(false);

  const [showWhatsAppForm, setShowWhatsAppForm] = useState(false);
  const [whatsappName, setWhatsappName] = useState('');
  const [whatsappNumber, setWhatsappNumber] = useState('');

  const [showWebhookForm, setShowWebhookForm] = useState(false);
  const [webhookName, setWebhookName] = useState('');
  const [webhookUrl, setWebhookUrl] = useState('');

  const handleEmailSubmit = () => {
    if (emailName && emailAddress) {
      setEmails([...emails, { name: emailName, email: emailAddress, confirmed: false, showCodeInput: false }]);
      setEmailName('');
      setEmailAddress('');
      setShowEmailForm(false);
      showSaveSuccess('Email address added successfully');
    }
  };

  const handleSendEmailCode = (index: number) => {
    const updatedEmails = [...emails];
    updatedEmails[index].showCodeInput = true;
    setEmails(updatedEmails);
    showSaveSuccess('Verification code sent!');
  };

  const handleVerifyEmailCode = (index: number) => {
    const code = emailVerificationCodes[index];
    if (code && code.length > 0) {
      const updatedEmails = [...emails];
      updatedEmails[index].confirmed = true;
      updatedEmails[index].showCodeInput = false;
      setEmails(updatedEmails);
      
      // Clear the code input
      const updatedCodes = { ...emailVerificationCodes };
      delete updatedCodes[index];
      setEmailVerificationCodes(updatedCodes);
      
      showSaveSuccess('Email address verified successfully!');
    }
  };

  const handleDeleteEmail = (index: number) => {
    setEmails(emails.filter((_, i) => i !== index));
    showSaveSuccess('Email address deleted');
  };

  const handlePhoneSubmit = () => {
    if (phoneName && phoneNumber && phoneConsent) {
      setPhoneNumbers([...phoneNumbers, { name: phoneName, number: phoneNumber, confirmed: false, showCodeInput: false }]);
      setPhoneName('');
      setPhoneNumber('');
      setPhoneConsent(false);
      setShowPhoneForm(false);
      showSaveSuccess('Phone number added successfully');
    }
  };

  const handleSendCode = (index: number) => {
    const updatedPhones = [...phoneNumbers];
    updatedPhones[index].showCodeInput = true;
    setPhoneNumbers(updatedPhones);
    showSaveSuccess('Verification code sent!');
  };

  const handleVerifyCode = (index: number) => {
    const code = verificationCodes[index];
    if (code && code.length > 0) {
      const updatedPhones = [...phoneNumbers];
      updatedPhones[index].confirmed = true;
      updatedPhones[index].showCodeInput = false;
      setPhoneNumbers(updatedPhones);
      
      // Clear the code input
      const updatedCodes = { ...verificationCodes };
      delete updatedCodes[index];
      setVerificationCodes(updatedCodes);
      
      showSaveSuccess('Phone number verified successfully!');
    }
  };

  const handleDeletePhone = (index: number) => {
    setPhoneNumbers(phoneNumbers.filter((_, i) => i !== index));
    showSaveSuccess('Phone number deleted');
  };

  const handleWhatsAppSubmit = () => {
    if (whatsappName && whatsappNumber) {
      setWhatsappContacts([...whatsappContacts, { name: whatsappName, number: whatsappNumber, confirmed: false, showCodeInput: false }]);
      setWhatsappName('');
      setWhatsappNumber('');
      setShowWhatsAppForm(false);
      showSaveSuccess('WhatsApp contact added successfully');
    }
  };

  const handleSendWhatsAppCode = (index: number) => {
    const updatedContacts = [...whatsappContacts];
    updatedContacts[index].showCodeInput = true;
    setWhatsappContacts(updatedContacts);
    showSaveSuccess('Verification code sent!');
  };

  const handleVerifyWhatsAppCode = (index: number) => {
    const code = whatsappVerificationCodes[index];
    if (code && code.length > 0) {
      const updatedContacts = [...whatsappContacts];
      updatedContacts[index].confirmed = true;
      updatedContacts[index].showCodeInput = false;
      setWhatsappContacts(updatedContacts);
      
      // Clear the code input
      const updatedCodes = { ...whatsappVerificationCodes };
      delete updatedCodes[index];
      setWhatsappVerificationCodes(updatedCodes);
      
      showSaveSuccess('WhatsApp contact verified successfully!');
    }
  };

  const handleDeleteWhatsApp = (index: number) => {
    setWhatsappContacts(whatsappContacts.filter((_, i) => i !== index));
    showSaveSuccess('WhatsApp contact deleted');
  };

  const handleWebhookSubmit = () => {
    if (webhookName && webhookUrl) {
      setWebhooks([...webhooks, { name: webhookName, url: webhookUrl }]);
      setWebhookName('');
      setWebhookUrl('');
      setShowWebhookForm(false);
      showSaveSuccess('Webhook endpoint added successfully');
    }
  };

  const handleDeleteWebhook = (index: number) => {
    setWebhooks(webhooks.filter((_, i) => i !== index));
    showSaveSuccess('Webhook endpoint deleted');
  };

  return (
    <div className="h-screen overflow-y-auto bg-[#0F1117]">
      <div className="max-w-[1000px] mx-auto px-8 py-12">
        <h1 className="text-white text-[28px] font-['DM_Sans:Bold',_sans-serif] mb-2" style={{ fontVariationSettings: "'opsz' 14" }}>
          Contact Information
        </h1>
        <p className="text-[#a6a9b2] text-[14px] font-['DM_Sans:Regular',_sans-serif] mb-10" style={{ fontVariationSettings: "'opsz' 14" }}>
          Manage your notification channels and integrations
        </p>

        {/* Communication Methods Section */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-6">
            <div className="h-px bg-[#3e88f7] flex-1 opacity-30"></div>
            <span className="text-[#74A9F7] text-[12px] font-['DM_Sans:SemiBold',_sans-serif] uppercase tracking-wider" style={{ fontVariationSettings: "'opsz' 14" }}>
              Communication Methods
            </span>
            <div className="h-px bg-[#3e88f7] flex-1 opacity-30"></div>
          </div>

          {/* Email Addresses */}
          <div className="mb-8 bg-[#0a0d14] border border-[#1a1d27] rounded-xl p-6" style={{ boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)' }}>
            <div className="flex items-center gap-2.5 mb-5">
              <Mail className="w-5 h-5 text-[#3e88f7]" />
              <h2 className="text-white text-[18px] font-['DM_Sans:SemiBold',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
                Email Addresses
              </h2>
            </div>
          
          {/* Existing Emails List */}
          {emails.length > 0 && (
            <div className="mb-6 space-y-4">
              {emails.map((item, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between py-3">
                    <div className="flex items-center gap-8 flex-1">
                      <span className="text-white text-[14px] font-['DM_Sans:Medium',_sans-serif] w-32" style={{ fontVariationSettings: "'opsz' 14" }}>
                        {item.name}
                      </span>
                      <span className="text-white text-[14px] font-['DM_Sans:Regular',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
                        {item.email}
                      </span>
                    </div>
                    <div className="flex items-center gap-6">
                      {!item.confirmed && !item.showCodeInput && (
                        <button
                          onClick={() => handleSendEmailCode(index)}
                          className="text-[#3e88f7] text-[14px] font-['DM_Sans:Medium',_sans-serif] hover:text-[#74A9F7] transition-colors"
                          style={{ fontVariationSettings: "'opsz' 14" }}
                        >
                          Send Code
                        </button>
                      )}
                      {!item.confirmed && item.showCodeInput && (
                        <div className="flex items-center gap-3">
                          <span className="text-white text-[14px] font-['DM_Sans:Regular',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
                            Enter Code
                          </span>
                          <input
                            type="text"
                            value={emailVerificationCodes[index] || ''}
                            onChange={(e) => setEmailVerificationCodes({ ...emailVerificationCodes, [index]: e.target.value })}
                            className="w-32 px-3 py-1.5 bg-[#0F1117] border border-[#3e88f7] rounded-lg text-white text-[14px] font-['DM_Sans:Regular',_sans-serif] focus:border-[#74A9F7] focus:outline-none transition-colors"
                            style={{ fontVariationSettings: "'opsz' 14", boxShadow: '0 0 10px rgba(62, 136, 247, 0.1)' }}
                            placeholder="Code"
                          />
                          <button
                            onClick={() => handleVerifyEmailCode(index)}
                            className="text-[#3e88f7] text-[14px] font-['DM_Sans:Medium',_sans-serif] hover:text-[#74A9F7] transition-colors"
                            style={{ fontVariationSettings: "'opsz' 14" }}
                          >
                            Submit
                          </button>
                        </div>
                      )}
                      <span 
                        className={`text-[14px] font-['DM_Sans:Regular',_sans-serif] ${item.confirmed ? 'text-[#a6a9b2]' : 'text-[#f59e0b]'}`}
                        style={{ fontVariationSettings: "'opsz' 14" }}
                      >
                        {item.confirmed ? 'Confirmed' : 'Not Confirmed'}
                      </span>
                      <button 
                        onClick={() => handleDeleteEmail(index)}
                        className="text-[#ef4444] text-[14px] font-['DM_Sans:Medium',_sans-serif] hover:text-[#dc2626] transition-colors" 
                        style={{ fontVariationSettings: "'opsz' 14" }}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Add Email Form */}
          {showEmailForm ? (
            <div 
              className="bg-[#17191f] border border-[#3e88f7] rounded-lg p-6"
              style={{ boxShadow: '0 0 20px rgba(62, 136, 247, 0.15)' }}
            >
              <div className="grid grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="text-white text-[14px] font-['DM_Sans:Medium',_sans-serif] mb-2 block" style={{ fontVariationSettings: "'opsz' 14" }}>
                    Name
                  </label>
                  <input
                    type="text"
                    value={emailName}
                    onChange={(e) => setEmailName(e.target.value)}
                    className="w-full px-4 py-3 bg-[#0F1117] border border-[#3e88f7] rounded-lg text-white text-[14px] font-['DM_Sans:Regular',_sans-serif] focus:border-[#74A9F7] focus:outline-none transition-colors"
                    style={{ fontVariationSettings: "'opsz' 14", boxShadow: '0 0 10px rgba(62, 136, 247, 0.1)' }}
                  />
                </div>
                <div>
                  <label className="text-white text-[14px] font-['DM_Sans:Medium',_sans-serif] mb-2 block" style={{ fontVariationSettings: "'opsz' 14" }}>
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={emailAddress}
                    onChange={(e) => setEmailAddress(e.target.value)}
                    placeholder="example@domain.com"
                    className="w-full px-4 py-3 bg-[#0F1117] border border-[#3e88f7] rounded-lg text-white text-[14px] font-['DM_Sans:Regular',_sans-serif] placeholder:text-[#676A73] focus:border-[#74A9F7] focus:outline-none transition-colors"
                    style={{ fontVariationSettings: "'opsz' 14", boxShadow: '0 0 10px rgba(62, 136, 247, 0.1)' }}
                  />
                </div>
              </div>
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => {
                    setShowEmailForm(false);
                    setEmailName('');
                    setEmailAddress('');
                  }}
                  className="px-8 py-2.5 bg-transparent border border-[#3e88f7] text-[#3e88f7] hover:bg-[#3e88f7] hover:bg-opacity-10 text-[14px] font-['DM_Sans:SemiBold',_sans-serif] rounded-lg transition-colors"
                  style={{ fontVariationSettings: "'opsz' 14" }}
                >
                  Cancel
                </button>
                <button
                  onClick={handleEmailSubmit}
                  disabled={!emailName || !emailAddress}
                  className="px-8 py-2.5 bg-[#3e88f7] hover:bg-[#74A9F7] disabled:bg-[#676A73] disabled:cursor-not-allowed text-white text-[14px] font-['DM_Sans:SemiBold',_sans-serif] rounded-lg transition-colors"
                  style={{ fontVariationSettings: "'opsz' 14", boxShadow: emailName && emailAddress ? '0 0 15px rgba(62, 136, 247, 0.3)' : 'none' }}
                >
                  Submit
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setShowEmailForm(true)}
              className="text-[#3e88f7] text-[14px] font-['DM_Sans:Medium',_sans-serif] hover:text-[#74A9F7] transition-colors flex items-center gap-2"
              style={{ fontVariationSettings: "'opsz' 14" }}
            >
              <span className="text-[18px]">+</span> Add Email Address
            </button>
          )}
          </div>

          {/* Phone Numbers */}
          <div className="mb-8 bg-[#0a0d14] border border-[#1a1d27] rounded-xl p-6" style={{ boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)' }}>
            <div className="flex items-center gap-2.5 mb-5">
              <Phone className="w-5 h-5 text-[#3e88f7]" />
              <h2 className="text-white text-[18px] font-['DM_Sans:SemiBold',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
                Phone Numbers
              </h2>
            </div>
          
          {/* Existing Phone Numbers List */}
          {phoneNumbers.length > 0 && (
            <div className="mb-6 space-y-4">
              {phoneNumbers.map((item, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between py-3">
                    <div className="flex items-center gap-8 flex-1">
                      <span className="text-white text-[14px] font-['DM_Sans:Medium',_sans-serif] w-32" style={{ fontVariationSettings: "'opsz' 14" }}>
                        {item.name}
                      </span>
                      <span className="text-white text-[14px] font-['DM_Sans:Regular',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
                        {item.number}
                      </span>
                    </div>
                    <div className="flex items-center gap-6">
                      {!item.confirmed && !item.showCodeInput && (
                        <button
                          onClick={() => handleSendCode(index)}
                          className="text-[#3e88f7] text-[14px] font-['DM_Sans:Medium',_sans-serif] hover:text-[#74A9F7] transition-colors"
                          style={{ fontVariationSettings: "'opsz' 14" }}
                        >
                          Send Code
                        </button>
                      )}
                      {!item.confirmed && item.showCodeInput && (
                        <div className="flex items-center gap-3">
                          <span className="text-white text-[14px] font-['DM_Sans:Regular',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
                            Enter Code
                          </span>
                          <input
                            type="text"
                            value={verificationCodes[index] || ''}
                            onChange={(e) => setVerificationCodes({ ...verificationCodes, [index]: e.target.value })}
                            className="w-32 px-3 py-1.5 bg-[#0F1117] border border-[#3e88f7] rounded-lg text-white text-[14px] font-['DM_Sans:Regular',_sans-serif] focus:border-[#74A9F7] focus:outline-none transition-colors"
                            style={{ fontVariationSettings: "'opsz' 14", boxShadow: '0 0 10px rgba(62, 136, 247, 0.1)' }}
                            placeholder="Code"
                          />
                          <button
                            onClick={() => handleVerifyCode(index)}
                            className="text-[#3e88f7] text-[14px] font-['DM_Sans:Medium',_sans-serif] hover:text-[#74A9F7] transition-colors"
                            style={{ fontVariationSettings: "'opsz' 14" }}
                          >
                            Submit
                          </button>
                        </div>
                      )}
                      <span 
                        className={`text-[14px] font-['DM_Sans:Regular',_sans-serif] ${item.confirmed ? 'text-[#a6a9b2]' : 'text-[#f59e0b]'}`}
                        style={{ fontVariationSettings: "'opsz' 14" }}
                      >
                        {item.confirmed ? 'Confirmed' : 'Not Confirmed'}
                      </span>
                      <button 
                        onClick={() => handleDeletePhone(index)}
                        className="text-[#ef4444] text-[14px] font-['DM_Sans:Medium',_sans-serif] hover:text-[#dc2626] transition-colors" 
                        style={{ fontVariationSettings: "'opsz' 14" }}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Add Phone Form */}
          {showPhoneForm ? (
            <div 
              className="bg-[#17191f] border border-[#3e88f7] rounded-lg p-6"
              style={{ boxShadow: '0 0 20px rgba(62, 136, 247, 0.15)' }}
            >
              <div className="grid grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="text-white text-[14px] font-['DM_Sans:Medium',_sans-serif] mb-2 block" style={{ fontVariationSettings: "'opsz' 14" }}>
                    Name
                  </label>
                  <input
                    type="text"
                    value={phoneName}
                    onChange={(e) => setPhoneName(e.target.value)}
                    className="w-full px-4 py-3 bg-[#0F1117] border border-[#3e88f7] rounded-lg text-white text-[14px] font-['DM_Sans:Regular',_sans-serif] focus:border-[#74A9F7] focus:outline-none transition-colors"
                    style={{ fontVariationSettings: "'opsz' 14", boxShadow: '0 0 10px rgba(62, 136, 247, 0.1)' }}
                  />
                </div>
                <div>
                  <label className="text-white text-[14px] font-['DM_Sans:Medium',_sans-serif] mb-2 block" style={{ fontVariationSettings: "'opsz' 14" }}>
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="+12345678901"
                    className="w-full px-4 py-3 bg-[#0F1117] border border-[#3e88f7] rounded-lg text-white text-[14px] font-['DM_Sans:Regular',_sans-serif] placeholder:text-[#676A73] focus:border-[#74A9F7] focus:outline-none transition-colors"
                    style={{ fontVariationSettings: "'opsz' 14", boxShadow: '0 0 10px rgba(62, 136, 247, 0.1)' }}
                  />
                </div>
              </div>
              
              {/* Consent Checkbox */}
              <div className="flex items-center gap-3 mb-6">
                <button
                  onClick={() => setPhoneConsent(!phoneConsent)}
                  className="w-5 h-5 rounded-full border-2 border-[#3e88f7] flex items-center justify-center flex-shrink-0 transition-all"
                  style={{ 
                    backgroundColor: phoneConsent ? '#3e88f7' : 'transparent',
                    boxShadow: phoneConsent ? '0 0 10px rgba(62, 136, 247, 0.4)' : 'none'
                  }}
                >
                  {phoneConsent && (
                    <div className="w-2.5 h-2.5 rounded-full bg-white" />
                  )}
                </button>
                <label className="text-white text-[14px] font-['DM_Sans:Regular',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
                  I consent to receive a one-time verification code at this number.
                </label>
              </div>
              
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => {
                    setShowPhoneForm(false);
                    setPhoneName('');
                    setPhoneNumber('');
                    setPhoneConsent(false);
                  }}
                  className="px-8 py-2.5 bg-transparent border border-[#3e88f7] text-[#3e88f7] hover:bg-[#3e88f7] hover:bg-opacity-10 text-[14px] font-['DM_Sans:SemiBold',_sans-serif] rounded-lg transition-colors"
                  style={{ fontVariationSettings: "'opsz' 14" }}
                >
                  Cancel
                </button>
                <button
                  onClick={handlePhoneSubmit}
                  disabled={!phoneConsent || !phoneName || !phoneNumber}
                  className="px-8 py-2.5 bg-[#3e88f7] hover:bg-[#74A9F7] disabled:bg-[#676A73] disabled:cursor-not-allowed text-white text-[14px] font-['DM_Sans:SemiBold',_sans-serif] rounded-lg transition-colors"
                  style={{ fontVariationSettings: "'opsz' 14", boxShadow: phoneConsent && phoneName && phoneNumber ? '0 0 15px rgba(62, 136, 247, 0.3)' : 'none' }}
                >
                  Submit
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setShowPhoneForm(true)}
              className="text-[#3e88f7] text-[14px] font-['DM_Sans:Medium',_sans-serif] hover:text-[#74A9F7] transition-colors flex items-center gap-2"
              style={{ fontVariationSettings: "'opsz' 14" }}
            >
              <span className="text-[18px]">+</span> Add Phone Number
            </button>
          )}
          </div>

          {/* WhatsApp Contacts */}
          <div className="mb-8 bg-[#0a0d14] border border-[#1a1d27] rounded-xl p-6" style={{ boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)' }}>
            <div className="flex items-center gap-2.5 mb-5">
              <MessageCircle className="w-5 h-5 text-[#3e88f7]" />
              <h2 className="text-white text-[18px] font-['DM_Sans:SemiBold',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
                WhatsApp Contacts
              </h2>
            </div>
          
          {/* Existing WhatsApp Contacts List */}
          {whatsappContacts.length > 0 && (
            <div className="mb-6 space-y-4">
              {whatsappContacts.map((item, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between py-3">
                    <div className="flex items-center gap-8 flex-1">
                      <span className="text-white text-[14px] font-['DM_Sans:Medium',_sans-serif] w-32" style={{ fontVariationSettings: "'opsz' 14" }}>
                        {item.name}
                      </span>
                      <span className="text-white text-[14px] font-['DM_Sans:Regular',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
                        {item.number}
                      </span>
                    </div>
                    <div className="flex items-center gap-6">
                      {!item.confirmed && !item.showCodeInput && (
                        <button
                          onClick={() => handleSendWhatsAppCode(index)}
                          className="text-[#3e88f7] text-[14px] font-['DM_Sans:Medium',_sans-serif] hover:text-[#74A9F7] transition-colors"
                          style={{ fontVariationSettings: "'opsz' 14" }}
                        >
                          Send Code
                        </button>
                      )}
                      {!item.confirmed && item.showCodeInput && (
                        <div className="flex items-center gap-3">
                          <span className="text-white text-[14px] font-['DM_Sans:Regular',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
                            Enter Code
                          </span>
                          <input
                            type="text"
                            value={whatsappVerificationCodes[index] || ''}
                            onChange={(e) => setWhatsappVerificationCodes({ ...whatsappVerificationCodes, [index]: e.target.value })}
                            className="w-32 px-3 py-1.5 bg-[#0F1117] border border-[#3e88f7] rounded-lg text-white text-[14px] font-['DM_Sans:Regular',_sans-serif] focus:border-[#74A9F7] focus:outline-none transition-colors"
                            style={{ fontVariationSettings: "'opsz' 14", boxShadow: '0 0 10px rgba(62, 136, 247, 0.1)' }}
                            placeholder="Code"
                          />
                          <button
                            onClick={() => handleVerifyWhatsAppCode(index)}
                            className="text-[#3e88f7] text-[14px] font-['DM_Sans:Medium',_sans-serif] hover:text-[#74A9F7] transition-colors"
                            style={{ fontVariationSettings: "'opsz' 14" }}
                          >
                            Submit
                          </button>
                        </div>
                      )}
                      <span 
                        className={`text-[14px] font-['DM_Sans:Regular',_sans-serif] ${item.confirmed ? 'text-[#a6a9b2]' : 'text-[#f59e0b]'}`}
                        style={{ fontVariationSettings: "'opsz' 14" }}
                      >
                        {item.confirmed ? 'Confirmed' : 'Not Confirmed'}
                      </span>
                      <button 
                        onClick={() => handleDeleteWhatsApp(index)}
                        className="text-[#ef4444] text-[14px] font-['DM_Sans:Medium',_sans-serif] hover:text-[#dc2626] transition-colors" 
                        style={{ fontVariationSettings: "'opsz' 14" }}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Add WhatsApp Form */}
          {showWhatsAppForm ? (
            <div 
              className="bg-[#17191f] border border-[#3e88f7] rounded-lg p-6"
              style={{ boxShadow: '0 0 20px rgba(62, 136, 247, 0.15)' }}
            >
              <div className="grid grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="text-white text-[14px] font-['DM_Sans:Medium',_sans-serif] mb-2 block" style={{ fontVariationSettings: "'opsz' 14" }}>
                    Name
                  </label>
                  <input
                    type="text"
                    value={whatsappName}
                    onChange={(e) => setWhatsappName(e.target.value)}
                    className="w-full px-4 py-3 bg-[#0F1117] border border-[#3e88f7] rounded-lg text-white text-[14px] font-['DM_Sans:Regular',_sans-serif] focus:border-[#74A9F7] focus:outline-none transition-colors"
                    style={{ fontVariationSettings: "'opsz' 14", boxShadow: '0 0 10px rgba(62, 136, 247, 0.1)' }}
                  />
                </div>
                <div>
                  <label className="text-white text-[14px] font-['DM_Sans:Medium',_sans-serif] mb-2 block" style={{ fontVariationSettings: "'opsz' 14" }}>
                    WhatsApp Number
                  </label>
                  <input
                    type="tel"
                    value={whatsappNumber}
                    onChange={(e) => setWhatsappNumber(e.target.value)}
                    placeholder="+12345678901"
                    className="w-full px-4 py-3 bg-[#0F1117] border border-[#3e88f7] rounded-lg text-white text-[14px] font-['DM_Sans:Regular',_sans-serif] placeholder:text-[#676A73] focus:border-[#74A9F7] focus:outline-none transition-colors"
                    style={{ fontVariationSettings: "'opsz' 14", boxShadow: '0 0 10px rgba(62, 136, 247, 0.1)' }}
                  />
                </div>
              </div>
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => {
                    setShowWhatsAppForm(false);
                    setWhatsappName('');
                    setWhatsappNumber('');
                  }}
                  className="px-8 py-2.5 bg-transparent border border-[#3e88f7] text-[#3e88f7] hover:bg-[#3e88f7] hover:bg-opacity-10 text-[14px] font-['DM_Sans:SemiBold',_sans-serif] rounded-lg transition-colors"
                  style={{ fontVariationSettings: "'opsz' 14" }}
                >
                  Cancel
                </button>
                <button
                  onClick={handleWhatsAppSubmit}
                  disabled={!whatsappName || !whatsappNumber}
                  className="px-8 py-2.5 bg-[#3e88f7] hover:bg-[#74A9F7] disabled:bg-[#676A73] disabled:cursor-not-allowed text-white text-[14px] font-['DM_Sans:SemiBold',_sans-serif] rounded-lg transition-colors"
                  style={{ fontVariationSettings: "'opsz' 14", boxShadow: whatsappName && whatsappNumber ? '0 0 15px rgba(62, 136, 247, 0.3)' : 'none' }}
                >
                  Submit
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setShowWhatsAppForm(true)}
              className="text-[#3e88f7] text-[14px] font-['DM_Sans:Medium',_sans-serif] hover:text-[#74A9F7] transition-colors flex items-center gap-2"
              style={{ fontVariationSettings: "'opsz' 14" }}
            >
              <span className="text-[18px]">+</span> Add WhatsApp Number
            </button>
          )}
          </div>
        </div>

        {/* Integrations Section */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-6">
            <div className="h-px bg-[#3e88f7] flex-1 opacity-30"></div>
            <span className="text-[#74A9F7] text-[12px] font-['DM_Sans:SemiBold',_sans-serif] uppercase tracking-wider" style={{ fontVariationSettings: "'opsz' 14" }}>
              Integrations
            </span>
            <div className="h-px bg-[#3e88f7] flex-1 opacity-30"></div>
          </div>

          {/* Slack Accounts */}
          <div className="mb-8 bg-[#0a0d14] border border-[#1a1d27] rounded-xl p-6" style={{ boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)' }}>
            <div className="flex items-center gap-2.5 mb-5">
              <Slack className="w-5 h-5 text-[#3e88f7]" />
              <h2 className="text-white text-[18px] font-['DM_Sans:SemiBold',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
                Slack Accounts
              </h2>
            </div>
            <p className="text-[#a6a9b2] text-[14px] font-['DM_Sans:Regular',_sans-serif] mb-6" style={{ fontVariationSettings: "'opsz' 14" }}>
              Click the button below to add HostBuddy AI to your Slack account.
            </p>
            <div className="flex justify-start">
              <button className="bg-white hover:bg-gray-100 text-black px-5 py-2.5 rounded-lg flex items-center gap-2 transition-colors font-['DM_Sans:SemiBold',_sans-serif] text-[14px]" style={{ fontVariationSettings: "'opsz' 14", boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)' }}>
                <svg width="20" height="20" viewBox="0 0 54 54" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M11.3 33.8c0 3.1-2.5 5.6-5.6 5.6S.1 36.9.1 33.8s2.5-5.6 5.6-5.6h5.6v5.6zm2.8 0c0-3.1 2.5-5.6 5.6-5.6s5.6 2.5 5.6 5.6v14c0 3.1-2.5 5.6-5.6 5.6s-5.6-2.5-5.6-5.6v-14z" fill="#E01E5A"/>
                  <path d="M19.7 11.3c-3.1 0-5.6-2.5-5.6-5.6S16.6.1 19.7.1s5.6 2.5 5.6 5.6v5.6h-5.6zm0 2.8c3.1 0 5.6 2.5 5.6 5.6s-2.5 5.6-5.6 5.6h-14c-3.1 0-5.6-2.5-5.6-5.6s2.5-5.6 5.6-5.6h14z" fill="#36C5F0"/>
                  <path d="M42.2 19.7c0-3.1 2.5-5.6 5.6-5.6s5.6 2.5 5.6 5.6-2.5 5.6-5.6 5.6h-5.6v-5.6zm-2.8 0c0 3.1-2.5 5.6-5.6 5.6s-5.6-2.5-5.6-5.6v-14c0-3.1 2.5-5.6 5.6-5.6s5.6 2.5 5.6 5.6v14z" fill="#2EB67D"/>
                  <path d="M33.8 42.2c3.1 0 5.6 2.5 5.6 5.6s-2.5 5.6-5.6 5.6-5.6-2.5-5.6-5.6v-5.6h5.6zm0-2.8c-3.1 0-5.6-2.5-5.6-5.6s2.5-5.6 5.6-5.6h14c3.1 0 5.6 2.5 5.6 5.6s-2.5 5.6-5.6 5.6h-14z" fill="#ECB22E"/>
                </svg>
                Add to Slack
              </button>
            </div>
          </div>

          {/* Webhook Endpoints */}
          <div className="mb-8 bg-[#0a0d14] border border-[#1a1d27] rounded-xl p-6" style={{ boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)' }}>
            <div className="flex items-center gap-2.5 mb-5">
              <Webhook className="w-5 h-5 text-[#3e88f7]" />
              <h2 className="text-white text-[18px] font-['DM_Sans:SemiBold',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
                Webhook Endpoints
              </h2>
            </div>
          
          {/* Existing Webhooks List */}
          {webhooks.length > 0 && (
            <div className="mb-6 space-y-4">
              {webhooks.map((webhook, index) => (
                <div key={index} className="flex items-center justify-between py-3">
                  <div className="flex items-center gap-8 flex-1">
                    <span className="text-white text-[14px] font-['DM_Sans:Medium',_sans-serif] w-32" style={{ fontVariationSettings: "'opsz' 14" }}>
                      {webhook.name}
                    </span>
                    <span className="text-white text-[14px] font-['DM_Sans:Regular',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
                      {webhook.url}
                    </span>
                  </div>
                  <button 
                    onClick={() => handleDeleteWebhook(index)}
                    className="text-[#ef4444] text-[14px] font-['DM_Sans:Medium',_sans-serif] hover:text-[#dc2626] transition-colors" 
                    style={{ fontVariationSettings: "'opsz' 14" }}
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          )}
          
          {/* Add Webhook Form */}
          {showWebhookForm ? (
            <div 
              className="bg-[#0a0d1a] border border-[#3e88f7] rounded-lg p-6"
              style={{ boxShadow: '0 0 20px rgba(62, 136, 247, 0.15)' }}
            >
              <div className="grid grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="text-white text-[14px] font-['DM_Sans:Medium',_sans-serif] mb-2 block" style={{ fontVariationSettings: "'opsz' 14" }}>
                    Name
                  </label>
                  <input
                    type="text"
                    value={webhookName}
                    onChange={(e) => setWebhookName(e.target.value)}
                    className="w-full px-4 py-3 bg-[#0F1117] border border-[#3e88f7] rounded-lg text-white text-[14px] font-['DM_Sans:Regular',_sans-serif] focus:border-[#74A9F7] focus:outline-none transition-colors"
                    style={{ fontVariationSettings: "'opsz' 14", boxShadow: '0 0 10px rgba(62, 136, 247, 0.1)' }}
                  />
                </div>
                <div>
                  <label className="text-white text-[14px] font-['DM_Sans:Medium',_sans-serif] mb-2 block" style={{ fontVariationSettings: "'opsz' 14" }}>
                    Webhook URL
                  </label>
                  <input
                    type="url"
                    value={webhookUrl}
                    onChange={(e) => setWebhookUrl(e.target.value)}
                    placeholder="https://example.com/webhook"
                    className="w-full px-4 py-3 bg-[#0F1117] border border-[#3e88f7] rounded-lg text-white text-[14px] font-['DM_Sans:Regular',_sans-serif] placeholder:text-[#676A73] focus:border-[#74A9F7] focus:outline-none transition-colors"
                    style={{ fontVariationSettings: "'opsz' 14", boxShadow: '0 0 10px rgba(62, 136, 247, 0.1)' }}
                  />
                </div>
              </div>
              <div className="flex justify-end">
                <button
                  onClick={handleWebhookSubmit}
                  disabled={!webhookName || !webhookUrl}
                  className="px-8 py-2.5 bg-transparent border-0 text-[#3e88f7] hover:text-[#74A9F7] disabled:text-[#676A73] disabled:cursor-not-allowed text-[14px] font-['DM_Sans:SemiBold',_sans-serif] transition-colors"
                  style={{ fontVariationSettings: "'opsz' 14" }}
                >
                  Submit
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setShowWebhookForm(true)}
              className="text-[#3e88f7] text-[14px] font-['DM_Sans:Medium',_sans-serif] hover:text-[#74A9F7] transition-colors flex items-center gap-2"
              style={{ fontVariationSettings: "'opsz' 14" }}
            >
              <span className="text-[18px]">+</span> Add Webhook
            </button>
          )}
          </div>
        </div>
      </div>
    </div>
  );
}
