import { useState } from 'react';
import { X } from 'lucide-react';

interface AddAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (accountName: string) => void;
}

export default function AddAccountModal({ isOpen, onClose, onAdd }: AddAccountModalProps) {
  const [accountName, setAccountName] = useState('');

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (accountName.trim()) {
      onAdd(accountName);
      setAccountName('');
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div 
        className="relative bg-[#17191f] border-2 border-[#013280] rounded-2xl w-full max-w-[450px] mx-4 overflow-hidden"
        style={{ boxShadow: '0 0 60px rgba(1, 50, 128, 0.5)' }}
      >
        <div className="p-8">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 text-[#676A73] hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <h2 
            className="text-white text-[22px] font-['DM_Sans:Bold',_sans-serif] mb-2"
            style={{ fontVariationSettings: "'opsz' 14" }}
          >
            Add New Account
          </h2>
          <p 
            className="text-[#a6a9b2] text-[13px] font-['DM_Sans:Regular',_sans-serif] mb-6"
            style={{ fontVariationSettings: "'opsz' 14" }}
          >
            Enter a name for your new host account
          </p>

          {/* Input */}
          <div className="mb-6">
            <label 
              className="block text-[#d0d3db] text-[13px] font-['DM_Sans:Medium',_sans-serif] mb-2"
              style={{ fontVariationSettings: "'opsz' 14" }}
            >
              Account Name
            </label>
            <input
              type="text"
              value={accountName}
              onChange={(e) => setAccountName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
              placeholder="e.g., Vacation Rentals LLC"
              className="w-full bg-[#0F1117] border border-[#013280] rounded-lg px-4 py-3 text-white text-[14px] font-['DM_Sans:Regular',_sans-serif] placeholder-[#676A73] focus:outline-none focus:border-[#3e88f7] transition-colors"
              style={{ fontVariationSettings: "'opsz' 14" }}
              autoFocus
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 bg-[#0F1117] border border-[#013280] text-[#d0d3db] py-2.5 px-6 rounded-lg text-[13px] font-['DM_Sans:SemiBold',_sans-serif] hover:border-[#3e88f7] transition-colors text-center"
              style={{ fontVariationSettings: "'opsz' 14" }}
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={!accountName.trim()}
              className="flex-1 bg-[#3e88f7] text-white py-2.5 px-6 rounded-lg text-[13px] font-['DM_Sans:SemiBold',_sans-serif] hover:bg-[#74A9F7] transition-all disabled:opacity-50 disabled:cursor-not-allowed text-center"
              style={{ 
                fontVariationSettings: "'opsz' 14",
                boxShadow: accountName.trim() ? '0 0 20px rgba(62, 136, 247, 0.4)' : 'none'
              }}
            >
              Add Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
