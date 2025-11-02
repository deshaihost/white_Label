import { X } from 'lucide-react';
import { useState } from 'react';

interface AddTopicModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (topicName: string, description: string) => void;
}

export default function AddTopicModal({ isOpen, onClose, onAdd }: AddTopicModalProps) {
  const [mode, setMode] = useState<'presets' | 'custom'>('presets');
  const [selectedPreset, setSelectedPreset] = useState('');
  const [customTitle, setCustomTitle] = useState('');
  const [customDescription, setCustomDescription] = useState('');

  if (!isOpen) return null;

  const presetOptions = [
    {
      title: 'Early Check In',
      description: 'Guests specifically asking to check in anytime before their scheduled check-in time.'
    },
    {
      title: 'Late Check Out',
      description: 'Guests specifically asking to check out anytime after their scheduled check-out time.'
    },
    {
      title: 'Discount Requests',
      description: 'Guests asking for a discount on their stay, including asks for a reduction or elimination in any fees related to the stay.'
    },
    {
      title: 'Refund Requests',
      description: 'Guests asking for a refund for any payment that they had previously made related to their stay.'
    },
    {
      title: 'Reservation Changes',
      description: 'Guests asking to change their reservation, including changing the dates of their stay, the number of guests, the type of room, or cancelling their reservation.'
    },
  ];

  const handleAdd = () => {
    if (mode === 'presets' && selectedPreset) {
      const preset = presetOptions.find(p => p.title === selectedPreset);
      if (preset) {
        onAdd(preset.title, preset.description);
      }
      setSelectedPreset('');
      onClose();
    } else if (mode === 'custom' && customTitle.trim() && customDescription.trim()) {
      onAdd(customTitle.trim(), customDescription.trim());
      setCustomTitle('');
      setCustomDescription('');
      onClose();
    }
  };

  const handleClose = () => {
    setSelectedPreset('');
    setCustomTitle('');
    setCustomDescription('');
    setMode('presets');
    onClose();
  };

  const canAdd = mode === 'presets' ? selectedPreset !== '' : (customTitle.trim() !== '' && customDescription.trim() !== '');

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50" onClick={handleClose}>
      <div 
        className="bg-[#0F1117] border-2 border-[#013280] rounded-2xl w-full max-w-[520px] mx-4"
        style={{ boxShadow: '0 0 40px rgba(62, 136, 247, 0.15)' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#013280]">
          <h2 className="text-white text-[20px] font-['DM_Sans:Bold',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
            Add Topic to Avoid
          </h2>
          <button 
            onClick={handleClose}
            className="text-[#a6a9b2] hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Toggle Buttons */}
          <div className="grid grid-cols-2 gap-0 bg-[#0F1117] rounded-lg p-1">
            <button
              onClick={() => setMode('presets')}
              className={`py-3 px-4 rounded-md text-[14px] font-['DM_Sans:SemiBold',_sans-serif] transition-all ${
                mode === 'presets'
                  ? 'bg-[#3e88f7] text-white'
                  : 'bg-transparent text-[#676a73] hover:text-[#a6a9b2]'
              }`}
              style={{ 
                fontVariationSettings: "'opsz' 14",
                ...(mode === 'presets' ? { boxShadow: '0 0 15px rgba(62, 136, 247, 0.2)' } : {})
              }}
            >
              Presets
            </button>
            <button
              onClick={() => setMode('custom')}
              className={`py-3 px-4 rounded-md text-[14px] font-['DM_Sans:SemiBold',_sans-serif] transition-all ${
                mode === 'custom'
                  ? 'bg-[#3e88f7] text-white'
                  : 'bg-transparent text-[#676a73] hover:text-[#a6a9b2]'
              }`}
              style={{ 
                fontVariationSettings: "'opsz' 14",
                ...(mode === 'custom' ? { boxShadow: '0 0 15px rgba(62, 136, 247, 0.2)' } : {})
              }}
            >
              Custom
            </button>
          </div>

          {/* Content Area */}
          <div className="min-h-[200px]">
            {mode === 'presets' ? (
              <div className="space-y-2">
                <select
                  value={selectedPreset}
                  onChange={(e) => setSelectedPreset(e.target.value)}
                  className="w-full bg-[#A6A9B2] text-[#17191F] rounded-lg px-4 py-3 text-[14px] font-['DM_Sans:Medium',_sans-serif] appearance-none cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#3e88f7]"
                  style={{ 
                    fontVariationSettings: "'opsz' 14",
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1.5L6 6.5L11 1.5' stroke='%2317191F' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 16px center',
                    paddingRight: '40px'
                  }}
                >
                  <option value="" disabled>✓ Select a topic</option>
                  {presetOptions.map((option) => (
                    <option key={option.title} value={option.title}>
                      {option.title}
                    </option>
                  ))}
                </select>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="text-white text-[14px] font-['DM_Sans:SemiBold',_sans-serif] block mb-2" style={{ fontVariationSettings: "'opsz' 14" }}>
                    Topic to Avoid Title
                  </label>
                  <input
                    type="text"
                    value={customTitle}
                    onChange={(e) => setCustomTitle(e.target.value)}
                    placeholder="Enter topic title..."
                    className="w-full bg-[#0F1117] border border-[#013280] rounded-lg px-4 py-3 text-white text-[14px] font-['DM_Sans:Regular',_sans-serif] placeholder-[#8A8E98] focus:outline-none focus:border-[#3e88f7] focus:ring-1 focus:ring-[#3e88f7]"
                    style={{ fontVariationSettings: "'opsz' 14" }}
                    autoFocus
                  />
                </div>
                <div>
                  <label className="text-white text-[14px] font-['DM_Sans:SemiBold',_sans-serif] block mb-2" style={{ fontVariationSettings: "'opsz' 14" }}>
                    Description
                  </label>
                  <textarea
                    value={customDescription}
                    onChange={(e) => setCustomDescription(e.target.value)}
                    placeholder="Enter description..."
                    rows={4}
                    className="w-full bg-[#0F1117] border border-[#013280] rounded-lg px-4 py-3 text-white text-[14px] font-['DM_Sans:Regular',_sans-serif] placeholder-[#8A8E98] focus:outline-none focus:border-[#3e88f7] focus:ring-1 focus:ring-[#3e88f7] resize-none"
                    style={{ fontVariationSettings: "'opsz' 14" }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-center gap-3 p-6 border-t border-[#013280]">
          <button
            onClick={handleClose}
            className="bg-[#4A4D54] hover:bg-[#676A73] text-white py-3 px-8 rounded-lg text-[14px] font-['DM_Sans:SemiBold',_sans-serif] transition-all min-w-[120px]"
            style={{ fontVariationSettings: "'opsz' 14" }}
          >
            Cancel
          </button>
          <button
            onClick={handleAdd}
            disabled={!canAdd}
            className={`py-3 px-8 rounded-lg text-[14px] font-['DM_Sans:SemiBold',_sans-serif] transition-all min-w-[140px] ${
              canAdd
                ? 'bg-[#3e88f7] hover:bg-[#74A9F7] text-white cursor-pointer'
                : 'bg-[#013280] text-[#676a73] cursor-not-allowed'
            }`}
            style={{ 
              fontVariationSettings: "'opsz' 14",
              ...(canAdd ? { boxShadow: '0 0 20px rgba(62, 136, 247, 0.2)' } : {})
            }}
          >
            Add Topic
          </button>
        </div>
      </div>
    </div>
  );
}
