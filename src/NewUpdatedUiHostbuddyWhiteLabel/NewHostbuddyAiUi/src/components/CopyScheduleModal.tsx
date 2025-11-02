import { useState } from 'react';
import { X, Check } from 'lucide-react';
import { showSaveSuccess } from './useSaveNotification';

interface Property {
  id: number;
  name: string;
}

interface CopyScheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentPropertyId?: number;
  importedProperties?: Property[];
  onCopy?: (propertyIds: number[], timezoneOption: 'actual' | 'relative') => void;
}

export default function CopyScheduleModal({ isOpen, onClose, currentPropertyId, importedProperties = [], onCopy }: CopyScheduleModalProps) {
  const [selectedProperties, setSelectedProperties] = useState<number[]>([]);
  const [timezoneOption, setTimezoneOption] = useState<'actual' | 'relative'>('actual');

  // Only show imported properties, excluding the current one
  const availableProperties = importedProperties.filter(p => p.id !== currentPropertyId);

  // Debug logging
  console.log('CopyScheduleModal - currentPropertyId:', currentPropertyId);
  console.log('CopyScheduleModal - importedProperties:', importedProperties);
  console.log('CopyScheduleModal - availableProperties:', availableProperties);

  const toggleProperty = (id: number) => {
    setSelectedProperties(prev =>
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    );
  };

  const selectAll = () => {
    setSelectedProperties(availableProperties.map(p => p.id));
  };

  const deselectAll = () => {
    setSelectedProperties([]);
  };

  const handleCopy = () => {
    if (onCopy && selectedProperties.length > 0) {
      onCopy(selectedProperties, timezoneOption);
      showSaveSuccess(`Schedule copied to ${selectedProperties.length} ${selectedProperties.length === 1 ? 'property' : 'properties'} successfully`);
    }
    setSelectedProperties([]);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[60] p-4">
      <div className="bg-[#0F1117] border-2 border-[#013280] rounded-xl w-full max-w-[600px] shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#013280]">
          <div>
            <h2 className="text-white text-[20px] font-['DM_Sans:SemiBold',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
              Copy Schedule to Other Properties
            </h2>
            <p className="text-[#a6a9b2] text-[13px] font-['DM_Sans:Regular',_sans-serif] mt-1" style={{ fontVariationSettings: "'opsz' 14" }}>
              Select which properties should receive this schedule
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-[#a6a9b2] hover:text-white transition-colors p-2"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          {/* Properties Selection */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="text-white text-[14px] font-['DM_Sans:SemiBold',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
                Choose Properties
              </label>
              {availableProperties.length > 0 && (
                <div className="flex gap-2">
                  <button
                    onClick={selectAll}
                    className="text-[#3e88f7] text-[12px] font-['DM_Sans:SemiBold',_sans-serif] hover:opacity-80 transition-opacity"
                    style={{ fontVariationSettings: "'opsz' 14" }}
                  >
                    Select All
                  </button>
                  <span className="text-[#676a73]">•</span>
                  <button
                    onClick={deselectAll}
                    className="text-[#3e88f7] text-[12px] font-['DM_Sans:SemiBold',_sans-serif] hover:opacity-80 transition-opacity"
                    style={{ fontVariationSettings: "'opsz' 14" }}
                  >
                    Deselect All
                  </button>
                </div>
              )}
            </div>
            
            <div className="space-y-2 max-h-[240px] overflow-y-auto">
              {availableProperties.length === 0 ? (
                <div className="bg-[#17191f] border border-[#013280] rounded-lg p-6 text-center">
                  <p className="text-[#a6a9b2] text-[14px] font-['DM_Sans:Regular',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
                    No other properties available. Import more properties from your PMS or create additional properties to copy this schedule to.
                  </p>
                </div>
              ) : (
                availableProperties.map(property => (
                  <button
                    key={property.id}
                    onClick={() => toggleProperty(property.id)}
                    className={`w-full bg-[#17191f] border rounded-lg p-4 flex items-center justify-between transition-all ${
                      selectedProperties.includes(property.id)
                        ? 'border-[#3e88f7] bg-[#01255e]'
                        : 'border-[#013280] hover:border-[#676a73]'
                    }`}
                  >
                    <span className="text-white text-[14px] font-['DM_Sans:Medium',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
                      {property.name}
                    </span>
                    <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                      selectedProperties.includes(property.id)
                        ? 'bg-[#3e88f7] border-[#3e88f7]'
                        : 'border-[#676a73]'
                    }`}>
                      {selectedProperties.includes(property.id) && (
                        <Check className="w-3 h-3 text-white" strokeWidth={3} />
                      )}
                    </div>
                  </button>
                ))
              )}
            </div>

            {selectedProperties.length > 0 && (
              <p className="text-[#3e88f7] text-[12px] font-['DM_Sans:Medium',_sans-serif] mt-2" style={{ fontVariationSettings: "'opsz' 14" }}>
                {selectedProperties.length} {selectedProperties.length === 1 ? 'property' : 'properties'} selected
              </p>
            )}
          </div>

          {/* Timezone Behavior */}
          <div>
            <label className="text-white text-[14px] font-['DM_Sans:SemiBold',_sans-serif] mb-3 block" style={{ fontVariationSettings: "'opsz' 14" }}>
              Time Zone Behavior
            </label>
            
            <div className="space-y-2">
              <button
                onClick={() => setTimezoneOption('actual')}
                className={`w-full border rounded-lg p-4 text-left transition-all ${
                  timezoneOption === 'actual'
                    ? 'bg-[#01255e] border-[#3e88f7]'
                    : 'bg-[#17191f] border-[#013280] hover:border-[#676a73]'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mt-0.5 flex-shrink-0 ${
                    timezoneOption === 'actual'
                      ? 'border-[#3e88f7] bg-[#3e88f7]'
                      : 'border-[#676a73]'
                  }`}>
                    {timezoneOption === 'actual' && (
                      <div className="w-2 h-2 rounded-full bg-white" />
                    )}
                  </div>
                  <div>
                    <p className="text-white text-[14px] font-['DM_Sans:SemiBold',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
                      Copy Actual Time
                    </p>
                    <p className="text-[#a6a9b2] text-[12px] font-['DM_Sans:Regular',_sans-serif] mt-1 leading-relaxed" style={{ fontVariationSettings: "'opsz' 14" }}>
                      e.g. "12:00 PM (PST)" copies as "3:00 PM (EST)" - same moment in time
                    </p>
                  </div>
                </div>
              </button>

              <button
                onClick={() => setTimezoneOption('relative')}
                className={`w-full border rounded-lg p-4 text-left transition-all ${
                  timezoneOption === 'relative'
                    ? 'bg-[#01255e] border-[#3e88f7]'
                    : 'bg-[#17191f] border-[#013280] hover:border-[#676a73]'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mt-0.5 flex-shrink-0 ${
                    timezoneOption === 'relative'
                      ? 'border-[#3e88f7] bg-[#3e88f7]'
                      : 'border-[#676a73]'
                  }`}>
                    {timezoneOption === 'relative' && (
                      <div className="w-2 h-2 rounded-full bg-white" />
                    )}
                  </div>
                  <div>
                    <p className="text-white text-[14px] font-['DM_Sans:SemiBold',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
                      Copy Relative Time
                    </p>
                    <p className="text-[#a6a9b2] text-[12px] font-['DM_Sans:Regular',_sans-serif] mt-1 leading-relaxed" style={{ fontVariationSettings: "'opsz' 14" }}>
                      e.g. "12:00 PM (PST)" copies as "12:00 PM (EST)" - same local time
                    </p>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-[#013280] px-6 py-4 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="bg-[#17191f] hover:bg-[#17191f] text-white border border-[#013280] px-5 py-2.5 rounded-lg text-[14px] font-['DM_Sans:SemiBold',_sans-serif] transition-colors"
            style={{ fontVariationSettings: "'opsz' 14" }}
          >
            Cancel
          </button>
          <button
            onClick={handleCopy}
            disabled={selectedProperties.length === 0}
            className="bg-[#3e88f7] hover:bg-[#5296f8] text-white px-6 py-2.5 rounded-lg text-[14px] font-['DM_Sans:SemiBold',_sans-serif] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ fontVariationSettings: "'opsz' 14" }}
          >
            Copy Schedule
          </button>
        </div>
      </div>
    </div>
  );
}
