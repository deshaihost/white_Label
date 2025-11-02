import { useState } from 'react';
import { X } from 'lucide-react';

interface NewUpsellConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (name: string, properties: string[]) => void;
}

export default function NewUpsellConfigModal({ isOpen, onClose, onSave }: NewUpsellConfigModalProps) {
  const [name, setName] = useState('');
  const [selectedProperties, setSelectedProperties] = useState<string[]>([]);
  
  // Mock properties - in real app, these would come from props or API
  const properties = [
    'Luxury Downtown Loft',
    'Beachside Villa',
    'Mountain Cabin',
    'Urban Studio'
  ];

  const handleSave = () => {
    if (name.trim()) {
      onSave(name, selectedProperties);
      setName('');
      setSelectedProperties([]);
      onClose();
    }
  };

  const toggleProperty = (property: string) => {
    setSelectedProperties(prev => 
      prev.includes(property) 
        ? prev.filter(p => p !== property)
        : [...prev, property]
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-[#0F1117] border-2 border-[#013280] rounded-xl w-[500px] max-h-[80vh] overflow-hidden"
        style={{ boxShadow: '0 0 40px rgba(1, 50, 128, 0.4)' }}>
        
        {/* Header */}
        <div className="bg-[#0F1117] px-6 py-4 border-b border-[#013280] flex items-center justify-between">
          <h2 className="text-white text-[18px] font-['DM_Sans:Bold',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
            New Configuration
          </h2>
          <button onClick={onClose} className="text-[#a6a9b2] hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(80vh-140px)]">
          {/* Name Input */}
          <div className="mb-6">
            <label className="block text-white text-[14px] font-['DM_Sans:SemiBold',_sans-serif] mb-2" style={{ fontVariationSettings: "'opsz' 14" }}>
              Configuration Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-[#0F1117] border border-[#013280] rounded-lg px-4 py-2.5 text-white text-[14px] font-['DM_Sans:Regular',_sans-serif] focus:outline-none focus:border-[#3e88f7]"
              style={{ fontVariationSettings: "'opsz' 14" }}
              placeholder="Enter configuration name"
            />
          </div>

          {/* Properties Selection */}
          <div>
            <label className="block text-white text-[14px] font-['DM_Sans:SemiBold',_sans-serif] mb-3" style={{ fontVariationSettings: "'opsz' 14" }}>
              Select Properties
            </label>
            <div className="space-y-2">
              {properties.map((property) => (
                <button
                  key={property}
                  onClick={() => toggleProperty(property)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg border-2 transition-all ${
                    selectedProperties.includes(property)
                      ? 'bg-[#01255e] border-[#3e88f7]'
                      : 'bg-[#0F1117] border-[#013280] hover:border-[#3e88f7]'
                  }`}
                >
                  <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                    selectedProperties.includes(property)
                      ? 'bg-[#3e88f7] border-[#3e88f7]'
                      : 'border-[#013280]'
                  }`}>
                    {selectedProperties.includes(property) && (
                      <svg className="w-3 h-3 text-white" viewBox="0 0 12 12" fill="none">
                        <path d="M2 6L5 9L10 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                  </div>
                  <span className="text-white text-[14px] font-['DM_Sans:Regular',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
                    {property}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <p className="text-[#a6a9b2] text-[12px] font-['DM_Sans:Regular',_sans-serif] mt-4" style={{ fontVariationSettings: "'opsz' 14" }}>
            Properties not included in any configuration will use the Default settings.
          </p>
        </div>

        {/* Footer */}
        <div className="bg-[#0F1117] px-6 py-4 border-t border-[#013280] flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-[#0F1117] border border-[#013280] rounded-lg text-white text-[15px] font-['DM_Sans:SemiBold',_sans-serif] hover:bg-[#0F1117] transition-colors"
            style={{ fontVariationSettings: "'opsz' 14" }}
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={!name.trim()}
            className="px-6 py-2.5 bg-[#3e88f7] rounded-lg text-white text-[15px] font-['DM_Sans:SemiBold',_sans-serif] hover:bg-[#74A9F7] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ fontVariationSettings: "'opsz' 14" }}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
