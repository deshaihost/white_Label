import { X, ArrowRight } from 'lucide-react';

interface PreBuiltTemplate {
  id: string;
  title: string;
  description: string;
}

interface PreBuiltTemplatesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (template: PreBuiltTemplate) => void;
}

export default function PreBuiltTemplatesModal({ isOpen, onClose, onSelect }: PreBuiltTemplatesModalProps) {
  if (!isOpen) return null;

  const templates: PreBuiltTemplate[] = [
    {
      id: '1',
      title: 'Post-stay review request',
      description: 'Send a message to your guests after their stay if they have a positive sentiment, asking them to leave a review.'
    },
    {
      id: '2',
      title: 'Property Ready message',
      description: 'If your property is cleaned early, send a message to the next guest welcoming them to check in early.'
    },
    {
      id: '3',
      title: 'Post-check-in welcome message',
      description: 'Send a message to your guests after they check in to welcome them'
    }
  ];

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50" onClick={onClose}>
      <div 
        className="bg-[#0F1117] border-2 border-[#013280] rounded-xl w-[700px] max-h-[80vh] overflow-hidden"
        style={{ boxShadow: '0 0 40px rgba(1, 50, 128, 0.3)' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#0F1117] border-b border-[#013280] px-6 py-5 flex items-center justify-between">
          <div>
            <h3 className="text-white text-[24px] font-['DM_Sans:Bold',_sans-serif] mb-2" style={{ fontVariationSettings: "'opsz' 14" }}>
              Pre-Built Templates
            </h3>
            <p className="text-[#a6a9b2] text-[15px] font-['DM_Sans:Regular',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
              Choose a pre-built template to get started quickly.
            </p>
          </div>
          <button onClick={onClose} className="text-[#a6a9b2] hover:text-white transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Template List */}
        <div className="bg-[#0F1117] p-6 max-h-[600px] overflow-y-auto" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          <style>{`.overflow-y-auto::-webkit-scrollbar { display: none; }`}</style>
          <div className="space-y-3">
            {templates.map((template) => (
              <button
                key={template.id}
                onClick={() => {
                  onSelect(template);
                  onClose();
                }}
                className="w-full bg-[#0F1117] border-2 border-[#013280] rounded-lg p-5 hover:bg-[#01255e] hover:border-[#3e88f7] transition-all flex items-center justify-between gap-4 h-[120px]"
                style={{ boxShadow: '0 0 15px rgba(1, 50, 128, 0.15)' }}
              >
                <div className="flex-1 text-left flex flex-col justify-center">
                  <h4 className="text-white text-[18px] font-['DM_Sans:Bold',_sans-serif] mb-2" style={{ fontVariationSettings: "'opsz' 14" }}>
                    {template.title}
                  </h4>
                  <p className="text-[#a6a9b2] text-[14px] font-['DM_Sans:Regular',_sans-serif] leading-relaxed line-clamp-2" style={{ fontVariationSettings: "'opsz' 14" }}>
                    {template.description}
                  </p>
                </div>
                <ArrowRight className="w-5 h-5 text-[#3e88f7] shrink-0" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
