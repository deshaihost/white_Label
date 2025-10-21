import { useState } from 'react';
import { X } from 'lucide-react';
import { PrivacyPolicyModal } from './PrivacyPolicyModal';
import { TermsOfServiceModal } from './TermsOfServiceModal';

interface SubscribeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubscribe?: () => void;
  onViewPlans?: () => void;
}

export function SubscribeModal({ isOpen, onClose, onSubscribe, onViewPlans }: SubscribeModalProps) {
  const [propertyCount, setPropertyCount] = useState('');
  const [selectedPlan, setSelectedPlan] = useState('');
  const [billingPeriod, setBillingPeriod] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);
  const [showTermsOfService, setShowTermsOfService] = useState(false);

  if (!isOpen) return null;

  const handleSubscribeNow = () => {
    // Show confirmation modal
    setShowConfirmation(true);
  };

  const handleConfirm = () => {
    // This would redirect to Stripe payment portal
    console.log('Redirecting to Stripe...');
    // Mark as subscribed
    if (onSubscribe) {
      onSubscribe();
    }
    // Reset and close
    setShowConfirmation(false);
    onClose();
  };

  const handleClose = () => {
    setShowConfirmation(false);
    setPropertyCount('');
    setSelectedPlan('');
    setBillingPeriod('');
    onClose();
  };

  if (showConfirmation) {
    return (
      <>
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-[#0F1117] border-2 border-[#013280] rounded-2xl w-full max-w-[720px] mx-4 relative">
            {/* Header */}
            <div className="border-b border-[#013280] px-8 py-6 flex items-center justify-between">
              <h2 className="text-white text-[20px] font-['DM_Sans:SemiBold',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
                Subscription Confirmation
              </h2>
              <button
                onClick={handleClose}
                className="text-[#a6a9b2] hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="px-8 py-8">
              <p className="text-white text-[15px] font-['DM_Sans:Regular',_sans-serif] leading-relaxed mb-4" style={{ fontVariationSettings: "'opsz' 14" }}>
                You will be directed to the Stripe payment portal to securely complete your registration payment.
              </p>
              <p className="text-white text-[15px] font-['DM_Sans:Regular',_sans-serif] leading-relaxed" style={{ fontVariationSettings: "'opsz' 14" }}>
                By continuing, you agree to our{' '}
                <button 
                  onClick={() => setShowTermsOfService(true)}
                  className="text-[#3e88f7] hover:underline"
                >
                  Terms of Service
                </button>
                {' '}and{' '}
                <button 
                  onClick={() => setShowPrivacyPolicy(true)}
                  className="text-[#3e88f7] hover:underline"
                >
                  Privacy Policy
                </button>.
              </p>
            </div>

            {/* Footer */}
            <div className="px-8 py-6 flex justify-center">
              <button
                onClick={handleConfirm}
                className="bg-[#3e88f7] text-white px-12 py-3 rounded-full hover:bg-[#357ae8] transition-colors font-['DM_Sans:SemiBold',_sans-serif]"
                style={{ fontVariationSettings: "'opsz' 14" }}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>

        {/* Privacy Policy and Terms of Service Modals */}
        <PrivacyPolicyModal 
          isOpen={showPrivacyPolicy} 
          onClose={() => setShowPrivacyPolicy(false)} 
        />
        <TermsOfServiceModal 
          isOpen={showTermsOfService} 
          onClose={() => setShowTermsOfService(false)} 
        />
      </>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-[#0F1117] border-2 border-[#013280] rounded-2xl w-full max-w-[720px] mx-4 relative">
        {/* Header */}
        <div className="border-b border-[#013280] px-8 py-6 flex items-center justify-between">
          <h2 className="text-white text-[20px] font-['DM_Sans:SemiBold',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
            Subscribe
          </h2>
          <button
            onClick={handleClose}
            className="text-[#a6a9b2] hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="px-8 py-8 space-y-6">
          {/* Property Count */}
          <div>
            <label className="text-white text-[15px] font-['DM_Sans:Medium',_sans-serif] block mb-3" style={{ fontVariationSettings: "'opsz' 14" }}>
              Choose How Many Properties To Add
            </label>
            <input
              type="number"
              value={propertyCount}
              onChange={(e) => setPropertyCount(e.target.value)}
              placeholder="Enter number of properties"
              className="w-full bg-[#0F1117] border-2 border-[#013280] rounded-lg px-4 py-3 text-white text-[14px] font-['DM_Sans:Regular',_sans-serif] placeholder:text-[#676a73] focus:outline-none focus:border-[#3e88f7] transition-colors"
              style={{ fontVariationSettings: "'opsz' 14" }}
            />
          </div>

          {/* Select Plan */}
          <div>
            <label className="text-white text-[15px] font-['DM_Sans:Medium',_sans-serif] block mb-3" style={{ fontVariationSettings: "'opsz' 14" }}>
              Select Plan
            </label>
            <select
              value={selectedPlan}
              onChange={(e) => setSelectedPlan(e.target.value)}
              className="w-full bg-[#0F1117] border-2 border-[#013280] rounded-lg px-4 py-3 text-[#676a73] text-[14px] focus:outline-none focus:border-[#3e88f7] transition-colors appearance-none cursor-pointer"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1.5L6 6.5L11 1.5' stroke='%23676a73' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right 1rem center',
                paddingRight: '3rem'
              }}
            >
              <option value="">-- Please Select --</option>
              <option value="pro">HostBuddy Pro</option>
              <option value="elite">HostBuddy Elite</option>
              <option value="ultimate">HostBuddy Ultimate</option>
            </select>
          </div>

          {/* Select Billing Period */}
          <div>
            <label className="text-white text-[15px] font-['DM_Sans:Medium',_sans-serif] block mb-3" style={{ fontVariationSettings: "'opsz' 14" }}>
              Select Billing Period
            </label>
            <select
              value={billingPeriod}
              onChange={(e) => setBillingPeriod(e.target.value)}
              className="w-full bg-[#0F1117] border-2 border-[#013280] rounded-lg px-4 py-3 text-[#676a73] text-[14px] focus:outline-none focus:border-[#3e88f7] transition-colors appearance-none cursor-pointer"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1.5L6 6.5L11 1.5' stroke='%23676a73' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right 1rem center',
                paddingRight: '3rem'
              }}
            >
              <option value="">-- Please Select --</option>
              <option value="monthly">Monthly</option>
              <option value="annual">Annual (2 Months Free!)</option>
            </select>
          </div>
        </div>

        {/* Footer */}
        <div className="px-8 py-6 space-y-4 flex flex-col items-center">
          <button
            onClick={handleSubscribeNow}
            className="bg-[#3e88f7] text-white px-12 py-3 rounded-full hover:bg-[#357ae8] transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-['DM_Sans:SemiBold',_sans-serif]"
            style={{ fontVariationSettings: "'opsz' 14" }}
            disabled={!propertyCount || !selectedPlan || !billingPeriod}
          >
            Subscribe Now
          </button>
          <button 
            onClick={() => {
              if (onViewPlans) {
                onViewPlans();
              }
              handleClose();
            }}
            className="text-[#3e88f7] text-[14px] font-['DM_Sans:Medium',_sans-serif] hover:underline"
            style={{ fontVariationSettings: "'opsz' 14" }}
          >
            View our plans and pricing
          </button>
        </div>
      </div>
    </div>
  );
}
