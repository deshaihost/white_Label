import { useState } from 'react';
import { X } from 'lucide-react';

interface AddSOPModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (title: string, description: string) => void;
  sectionName: string;
}

export default function AddSOPModal({ open, onOpenChange, onSave, sectionName }: AddSOPModalProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSave = () => {
    if (title.trim() && description.trim()) {
      onSave(title, description);
      // Reset form
      setTitle('');
      setDescription('');
      onOpenChange(false);
    }
  };

  const handleCancel = () => {
    setTitle('');
    setDescription('');
    onOpenChange(false);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-[#0F1117] border-2 border-[#013280] rounded-2xl w-[600px] shadow-2xl"
        style={{ boxShadow: '0 0 30px rgba(62, 136, 247, 0.2)' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#013280]">
          <h3 className="text-white text-[20px] font-['DM_Sans:Bold',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
            Add New SOP - {sectionName}
          </h3>
          <button
            onClick={handleCancel}
            className="text-[#a6a9b2] hover:text-white transition-colors p-2"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="space-y-6">
            {/* Title Field */}
            <div>
              <label className="text-white text-[14px] font-['DM_Sans:SemiBold',_sans-serif] mb-2 block" style={{ fontVariationSettings: "'opsz' 14" }}>
                Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter SOP title..."
                className="w-full bg-[#01255e] border border-[#013280] rounded-lg px-4 py-3 text-white text-[14px] font-['DM_Sans:Regular',_sans-serif] placeholder:text-[#676a73] focus:outline-none focus:border-[#3e88f7] transition-colors"
                style={{ fontVariationSettings: "'opsz' 14" }}
              />
            </div>

            {/* Description Field */}
            <div>
              <label className="text-white text-[14px] font-['DM_Sans:SemiBold',_sans-serif] mb-2 block" style={{ fontVariationSettings: "'opsz' 14" }}>
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter SOP description..."
                rows={6}
                className="w-full bg-[#01255e] border border-[#013280] rounded-lg px-4 py-3 text-white text-[14px] font-['DM_Sans:Regular',_sans-serif] placeholder:text-[#676a73] focus:outline-none focus:border-[#3e88f7] transition-colors resize-none"
                style={{ fontVariationSettings: "'opsz' 14" }}
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center gap-3 mt-8">
            <button
              onClick={handleCancel}
              className="px-8 py-2.5 rounded-lg bg-[#676a73] hover:bg-[#7a7d86] text-white text-[14px] font-['DM_Sans:SemiBold',_sans-serif] transition-colors"
              style={{ fontVariationSettings: "'opsz' 14" }}
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={!title.trim() || !description.trim()}
              className="px-8 py-2.5 rounded-lg bg-[#3e88f7] hover:bg-[#5296f8] text-white text-[14px] font-['DM_Sans:SemiBold',_sans-serif] transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ 
                fontVariationSettings: "'opsz' 14",
                boxShadow: '0 0 10px rgba(62, 136, 247, 0.2)'
              }}
            >
              Add SOP
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
