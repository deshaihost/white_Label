import { X } from 'lucide-react';
import { useState } from 'react';
import ReservationPhaseSelector from './ReservationPhaseSelector';
import { showSaveSuccess } from './useSaveNotification';

interface SOPFieldModalProps {
  isOpen: boolean;
  onClose: () => void;
  fieldLabel: string;
  onSave: (phases: { current: boolean; future: boolean; inquiryPast: boolean }) => void;
  initialPhases?: { current: boolean; future: boolean; inquiryPast: boolean };
  onDelete?: () => void;
  allowDelete?: boolean;
  allowTitleEdit?: boolean;
  onTitleChange?: (newTitle: string) => void;
}

export default function SOPFieldModal({ 
  isOpen, 
  onClose, 
  fieldLabel,
  onSave,
  initialPhases = { current: true, future: true, inquiryPast: true },
  onDelete,
  allowDelete = false,
  allowTitleEdit = false,
  onTitleChange
}: SOPFieldModalProps) {
  const [phases, setPhases] = useState(initialPhases);
  const [editedTitle, setEditedTitle] = useState(fieldLabel);

  if (!isOpen) return null;

  const togglePhase = (phase: 'current' | 'future' | 'inquiryPast') => {
    setPhases(prev => ({
      ...prev,
      [phase]: !prev[phase]
    }));
  };

  const handleSave = () => {
    onSave(phases);
    if (allowTitleEdit && onTitleChange && editedTitle !== fieldLabel) {
      onTitleChange(editedTitle);
    }
    onClose();
  };

  const handleCopyToProperties = () => {
    // This would open a property selection modal
    console.log('Copy to other properties');
  };

  const handleDeleteQuestion = () => {
    if (onDelete) {
      onDelete();
      showSaveSuccess('SOP question deleted successfully');
    }
  };

  const handleDeleteFromMultiple = () => {
    // This would open a property selection modal for deletion
    console.log('Delete from multiple properties');
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={onClose}>
      <div 
        className="bg-[#0F1117] border border-[#013280] rounded-xl w-full max-w-lg mx-4"
        style={{ boxShadow: '0 0 30px rgba(62, 136, 247, 0.1)' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#013280]">
          <div className="flex-1">
            {allowTitleEdit ? (
              <input
                type="text"
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
                className="w-full bg-transparent text-white text-[18px] font-['DM_Sans:Bold',_sans-serif] mb-1 border-none outline-none focus:ring-0 p-0"
                style={{ fontVariationSettings: "'opsz' 14" }}
              />
            ) : (
              <h2 className="text-white text-[18px] font-['DM_Sans:Bold',_sans-serif] mb-1" style={{ fontVariationSettings: "'opsz' 14" }}>
                {fieldLabel}
              </h2>
            )}
            <p className="text-[#a6a9b2] text-[12px] font-['DM_Sans:Regular',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
              Configure visibility and management options
            </p>
          </div>
          <button 
            onClick={onClose}
            className="text-[#a6a9b2] hover:text-white transition-colors ml-4"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Reservation Phases Section */}
          <ReservationPhaseSelector
            phases={phases}
            onToggle={togglePhase}
            title="Reservation Stages"
            description="Select which reservation stages should have access to this information. Deselected stages will not see this SOP."
            variant="buttons"
          />

          {/* Divider */}
          <div className="border-t border-[#013280]"></div>

          {/* Management Options */}
          <div>
            <h3 className="text-white text-[14px] font-['DM_Sans:SemiBold',_sans-serif] mb-3" style={{ fontVariationSettings: "'opsz' 14" }}>
              Management Options
            </h3>
            
            <div className="space-y-2">
              <button
                onClick={handleCopyToProperties}
                className="w-full bg-[#0F1117] hover:bg-[#01327a] border border-[#013280] text-[#3e88f7] py-3 px-4 rounded-lg text-[13px] font-['DM_Sans:Medium',_sans-serif] transition-all text-left flex items-center gap-2"
                style={{ fontVariationSettings: "'opsz' 14" }}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                Copy to Other Properties
              </button>

              {allowDelete && (
                <button
                  onClick={handleDeleteQuestion}
                  className="w-full bg-[#0F1117] hover:bg-[#4a1616] border border-[#013280] hover:border-[#ef4444] text-[#ef4444] py-3 px-4 rounded-lg text-[13px] font-['DM_Sans:Medium',_sans-serif] transition-all text-left flex items-center gap-2"
                  style={{ fontVariationSettings: "'opsz' 14" }}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  Delete Entry
                </button>
              )}

              <button
                onClick={handleDeleteFromMultiple}
                className="w-full bg-[#0F1117] hover:bg-[#4a1616] border border-[#013280] hover:border-[#ef4444] text-[#ef4444] py-3 px-4 rounded-lg text-[13px] font-['DM_Sans:Medium',_sans-serif] transition-all text-left flex items-center gap-2"
                style={{ fontVariationSettings: "'opsz' 14" }}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Delete from Multiple Properties
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex gap-3 p-6 border-t border-[#013280]">
          <button
            onClick={onClose}
            className="flex-1 bg-[#0F1117] hover:bg-[#01327a] text-white py-3 px-4 rounded-lg text-[14px] font-['DM_Sans:SemiBold',_sans-serif] transition-all border border-[#013280]"
            style={{ fontVariationSettings: "'opsz' 14" }}
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="flex-1 bg-[#3e88f7] hover:bg-[#5296f8] text-white py-3 px-4 rounded-lg text-[14px] font-['DM_Sans:SemiBold',_sans-serif] transition-all"
            style={{ 
              fontVariationSettings: "'opsz' 14",
              boxShadow: '0 0 20px rgba(62, 136, 247, 0.15)'
            }}
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
