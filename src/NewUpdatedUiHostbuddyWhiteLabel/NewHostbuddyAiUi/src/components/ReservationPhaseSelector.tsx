interface ReservationPhaseSelectorProps {
  phases: {
    current: boolean;
    future: boolean;
    inquiryPast: boolean;
  };
  onToggle: (phase: 'current' | 'future' | 'inquiryPast') => void;
  title?: string;
  description?: string;
  variant?: 'buttons' | 'checkboxes';
}

export default function ReservationPhaseSelector({ 
  phases, 
  onToggle, 
  title = "Reservation Stages",
  description = "Select which reservation stages should have access to this information. Deselected stages will not see this SOP.",
  variant = 'buttons'
}: ReservationPhaseSelectorProps) {
  
  if (variant === 'buttons') {
    return (
      <div>
        <h3 className="text-white text-[14px] font-['DM_Sans:SemiBold',_sans-serif] mb-2" style={{ fontVariationSettings: "'opsz' 14" }}>
          {title}
        </h3>
        <p className="text-[#a6a9b2] text-[12px] font-['DM_Sans:Regular',_sans-serif] mb-4 leading-relaxed" style={{ fontVariationSettings: "'opsz' 14" }}>
          {description}
        </p>
        
        <div className="grid grid-cols-3 gap-3">
          <button
            onClick={() => onToggle('current')}
            className={`py-3 px-4 rounded-lg text-[13px] font-['DM_Sans:Medium',_sans-serif] transition-all ${
              phases.current 
                ? 'bg-[#3e88f7] text-white border-2 border-[#3e88f7]' 
                : 'bg-[#0F1117] text-[#676a73] border-2 border-[#013280]'
            }`}
            style={{ 
              fontVariationSettings: "'opsz' 14",
              ...(phases.current ? { boxShadow: '0 0 12px rgba(62, 136, 247, 0.15)' } : {})
            }}
          >
            Current
          </button>
          <button
            onClick={() => onToggle('future')}
            className={`py-3 px-4 rounded-lg text-[13px] font-['DM_Sans:Medium',_sans-serif] transition-all ${
              phases.future 
                ? 'bg-[#3e88f7] text-white border-2 border-[#3e88f7]' 
                : 'bg-[#0F1117] text-[#676a73] border-2 border-[#013280]'
            }`}
            style={{ 
              fontVariationSettings: "'opsz' 14",
              ...(phases.future ? { boxShadow: '0 0 12px rgba(62, 136, 247, 0.15)' } : {})
            }}
          >
            Future
          </button>
          <button
            onClick={() => onToggle('inquiryPast')}
            className={`py-3 px-4 rounded-lg text-[13px] font-['DM_Sans:Medium',_sans-serif] transition-all ${
              phases.inquiryPast 
                ? 'bg-[#3e88f7] text-white border-2 border-[#3e88f7]' 
                : 'bg-[#0F1117] text-[#676a73] border-2 border-[#013280]'
            }`}
            style={{ 
              fontVariationSettings: "'opsz' 14",
              ...(phases.inquiryPast ? { boxShadow: '0 0 12px rgba(62, 136, 247, 0.15)' } : {})
            }}
          >
            Inquiry/Past
          </button>
        </div>
      </div>
    );
  }
  
  // Checkbox variant
  return (
    <div>
      <h3 className="text-white text-[14px] font-['DM_Sans:SemiBold',_sans-serif] mb-2" style={{ fontVariationSettings: "'opsz' 14" }}>
        {title}
      </h3>
      <p className="text-[#a6a9b2] text-[12px] font-['DM_Sans:Regular',_sans-serif] mb-4 leading-relaxed" style={{ fontVariationSettings: "'opsz' 14" }}>
        {description}
      </p>
      
      <div className="space-y-3">
        <button
          onClick={() => onToggle('current')}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-[#0F1117] transition-all"
        >
          <div className={`w-5 h-5 rounded flex items-center justify-center transition-all ${
            phases.current
              ? 'bg-[#3e88f7] shadow-lg'
              : 'bg-[#17191f] border border-[#013280]'
          }`}
            style={phases.current ? { boxShadow: '0 0 5px rgba(62, 136, 247, 0.25)' } : {}}
          >
            {phases.current && (
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M2 6L5 9L10 3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            )}
          </div>
          <span className={`text-[14px] font-['DM_Sans:Regular',_sans-serif] ${
            phases.current ? 'text-white' : 'text-[#676a73]'
          }`} style={{ fontVariationSettings: "'opsz' 14" }}>
            Current
          </span>
        </button>

        <button
          onClick={() => onToggle('future')}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-[#0F1117] transition-all"
        >
          <div className={`w-5 h-5 rounded flex items-center justify-center transition-all ${
            phases.future
              ? 'bg-[#3e88f7] shadow-lg'
              : 'bg-[#17191f] border border-[#013280]'
          }`}
            style={phases.future ? { boxShadow: '0 0 5px rgba(62, 136, 247, 0.25)' } : {}}
          >
            {phases.future && (
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M2 6L5 9L10 3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            )}
          </div>
          <span className={`text-[14px] font-['DM_Sans:Regular',_sans-serif] ${
            phases.future ? 'text-white' : 'text-[#676a73]'
          }`} style={{ fontVariationSettings: "'opsz' 14" }}>
            Future
          </span>
        </button>

        <button
          onClick={() => onToggle('inquiryPast')}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-[#0F1117] transition-all"
        >
          <div className={`w-5 h-5 rounded flex items-center justify-center transition-all ${
            phases.inquiryPast
              ? 'bg-[#3e88f7] shadow-lg'
              : 'bg-[#17191f] border border-[#013280]'
          }`}
            style={phases.inquiryPast ? { boxShadow: '0 0 5px rgba(62, 136, 247, 0.25)' } : {}}
          >
            {phases.inquiryPast && (
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M2 6L5 9L10 3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            )}
          </div>
          <span className={`text-[14px] font-['DM_Sans:Regular',_sans-serif] ${
            phases.inquiryPast ? 'text-white' : 'text-[#676a73]'
          }`} style={{ fontVariationSettings: "'opsz' 14" }}>
            Inquiry/Past
          </span>
        </button>
      </div>
    </div>
  );
}
