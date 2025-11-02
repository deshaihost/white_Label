import { useState } from 'react';
import { X } from 'lucide-react';

interface NewConfigurationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (name: string) => void;
}

export default function NewConfigurationModal({ isOpen, onClose, onSubmit }: NewConfigurationModalProps) {
  const [configName, setConfigName] = useState('');

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (configName.trim()) {
      onSubmit(configName.trim());
      setConfigName('');
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50" onClick={onClose}>
      <div 
        className="bg-[#0F1117] border-2 border-[#013280] rounded-xl w-[500px] overflow-hidden"
        style={{ boxShadow: '0 0 40px rgba(1, 50, 128, 0.3)' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#0F1117] border-b border-[#013280] px-6 py-4 flex items-center justify-between">
          <h3 className="text-white text-[20px] font-['DM_Sans:Bold',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
            New Configuration
          </h3>
          <button onClick={onClose} className="text-[#a6a9b2] hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="bg-[#0F1117] p-6">
          <label className="text-white text-[15px] font-['DM_Sans:SemiBold',_sans-serif] mb-3 block" style={{ fontVariationSettings: "'opsz' 14" }}>
            Configuration Name
          </label>
          <input
            type="text"
            value={configName}
            onChange={(e) => setConfigName(e.target.value)}
            placeholder="e.g., Daytime Configuration, Weekend Settings..."
            className="w-full bg-[#0F1117] border border-[#013280] rounded-lg px-4 py-3 text-white text-[15px] font-['DM_Sans:Regular',_sans-serif] placeholder:text-[#8A8E98] focus:outline-none focus:border-[#3e88f7] transition-colors"
            style={{ fontVariationSettings: "'opsz' 14" }}
            onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
            autoFocus
          />
        </div>

        {/* Footer */}
        <div className="bg-[#0F1117] border-t border-[#013280] px-6 py-4 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-5 py-2.5 text-[#a6a9b2] text-[15px] font-['DM_Sans:SemiBold',_sans-serif] hover:text-white transition-colors"
            style={{ fontVariationSettings: "'opsz' 14" }}
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={!configName.trim()}
            className="bg-[#01255e] text-white px-6 py-2.5 rounded-lg text-[15px] font-['DM_Sans:SemiBold',_sans-serif] hover:bg-[#013a8a] transition-colors border border-[#013280] disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ fontVariationSettings: "'opsz' 14" }}
          >
            Create Configuration
          </button>
        </div>
      </div>
    </div>
  );
}
