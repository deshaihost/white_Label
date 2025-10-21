interface UnlockPropertyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUnlock: () => void;
  propertyName?: string;
  isUnlockAll?: boolean; // NEW: Flag to indicate if unlocking all properties
}

export default function UnlockPropertyModal({ isOpen, onClose, onUnlock, propertyName, isUnlockAll = false }: UnlockPropertyModalProps) {
  if (!isOpen) return null;

  const handleUnlock = () => {
    onUnlock();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[60] p-4">
      <div className="bg-[#0F1117] border-2 border-[#013280] rounded-2xl w-full max-w-[450px] shadow-[0_0_40px_rgba(62,136,247,0.3)] p-8">
        {/* Title */}
        <h2 className="text-white text-center text-[24px] font-['DM_Sans:SemiBold',_sans-serif] mb-6" style={{ fontVariationSettings: "'opsz' 14" }}>
          Unlock Properties
        </h2>

        {/* Description */}
        <p className="text-[#d0d3db] text-center text-[15px] font-['DM_Sans:Regular',_sans-serif] leading-relaxed mb-6" style={{ fontVariationSettings: "'opsz' 14" }}>
          Locked properties allow setup and testing only. You'll need to unlock a property to allow HostBuddy to respond to its guests.
        </p>

        {/* Question */}
        <p className="text-white text-center text-[15px] font-['DM_Sans:Medium',_sans-serif] mb-8" style={{ fontVariationSettings: "'opsz' 14" }}>
          Would you like to unlock {isUnlockAll ? 'these properties' : 'this property'}?
        </p>

        {/* Unlock Button */}
        <div className="flex justify-center">
          <button
            onClick={handleUnlock}
            className="bg-[#3e88f7] hover:bg-[#5296f8] text-white px-10 py-3 rounded-lg text-[15px] font-['DM_Sans:SemiBold',_sans-serif] transition-colors shadow-[0_0_20px_rgba(62,136,247,0.4)]"
            style={{ fontVariationSettings: "'opsz' 14" }}
          >
            Unlock
          </button>
        </div>
      </div>
    </div>
  );
}
