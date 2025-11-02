import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import PreBuiltTemplatesModal from './PreBuiltTemplatesModal';
import { showSaveSuccess } from './useSaveNotification';

interface Template {
  id: string;
  title: string;
  preview: string;
  enabled: boolean;
}

interface SmartTemplatesProps {
  templates: Template[];
  onUpdateTemplates: (templates: Template[]) => void;
  onAddTemplate: () => void;
  onEditTemplate: (templateId: string) => void;
}

export default function SmartTemplates({ templates, onUpdateTemplates, onAddTemplate, onEditTemplate }: SmartTemplatesProps) {
  const [showPreBuiltModal, setShowPreBuiltModal] = useState(false);

  const toggleTemplate = (id: string) => {
    const template = templates.find(t => t.id === id);
    const newState = !template?.enabled;
    const updatedTemplates = templates.map(template => 
      template.id === id ? { ...template, enabled: !template.enabled } : template
    );
    onUpdateTemplates(updatedTemplates);
    showSaveSuccess(`Template ${newState ? 'enabled' : 'disabled'} successfully`);
  };

  const handleEdit = (id: string) => {
    onEditTemplate(id);
  };

  const handlePreBuilt = () => {
    setShowPreBuiltModal(true);
  };

  const handleSelectPreBuilt = (template: any) => {
    console.log('Selected pre-built template:', template);
    // TODO: Navigate to edit page with pre-built template
    onAddTemplate();
  };

  return (
    <div className="h-screen bg-[#0F1117] overflow-y-auto">
      <div className="max-w-[1400px] mx-auto px-12 py-12">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-white text-[40px] font-['DM_Sans:Bold',_sans-serif] mb-6" style={{ fontVariationSettings: "'opsz' 14" }}>
            Smart Templates
          </h1>
          <p className="text-[#a6a9b2] text-[17px] font-['DM_Sans:Regular',_sans-serif] leading-relaxed mb-6 max-w-[900px]" style={{ fontVariationSettings: "'opsz' 14" }}>
            Highly customizable templated messages that let you contact the right guests at the right time. Automate friendly check-in messages, strategic upsells, policy reminders, and much more. Use AI to add context awareness and a personal touch to each message.
          </p>
          <button 
            className="text-[#3e88f7] text-[16px] font-['DM_Sans:SemiBold',_sans-serif] hover:opacity-80 transition-opacity flex items-center gap-2"
            style={{ fontVariationSettings: "'opsz' 14" }}
          >
            Learn more <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        {/* Divider */}
        <div className="border-t border-[#013280] mb-10"></div>

        {/* Template Cards */}
        <div className="space-y-5 mb-8">
          {templates.map((template) => (
            <div
              key={template.id}
              className="bg-[#0F1117] border-2 border-[#013280] rounded-xl p-8 flex items-center justify-between h-[140px]"
              style={{ boxShadow: '0 0 25px rgba(1, 50, 128, 0.2)' }}
            >
              <div className="flex-1 flex flex-col justify-center">
                <h3 className="text-white text-[22px] font-['DM_Sans:Bold',_sans-serif] mb-3" style={{ fontVariationSettings: "'opsz' 14" }}>
                  {template.title}
                </h3>
                <p className="text-[#a6a9b2] text-[16px] font-['DM_Sans:Regular',_sans-serif] leading-relaxed line-clamp-2" style={{ fontVariationSettings: "'opsz' 14" }}>
                  {template.preview}
                </p>
              </div>
              
              <div className="flex items-center gap-6 ml-8 shrink-0">
                {/* Toggle Switch */}
                <div className="flex items-center gap-4">
                  <span className={`text-[15px] font-['DM_Sans:SemiBold',_sans-serif] whitespace-nowrap ${
                    template.enabled ? 'text-[#10b981]' : 'text-[#ef4444]'
                  }`} style={{ fontVariationSettings: "'opsz' 14" }}>
                    {template.enabled ? 'Enabled' : 'Not enabled'}
                  </span>
                  <button
                    onClick={() => toggleTemplate(template.id)}
                    className={`w-14 h-7 rounded-full transition-all relative ${
                      template.enabled ? 'bg-[#3e88f7]' : 'bg-[#676a73]'
                    }`}
                    style={template.enabled ? { boxShadow: '0 0 12px rgba(62, 136, 247, 0.4)' } : {}}
                  >
                    <div
                      className={`absolute top-0.5 w-6 h-6 bg-white rounded-full transition-transform ${
                        template.enabled ? 'translate-x-7' : 'translate-x-0.5'
                      }`}
                    ></div>
                  </button>
                </div>

                {/* Edit Button */}
                <button
                  onClick={() => handleEdit(template.id)}
                  className="text-[#98bffa] text-[16px] font-['DM_Sans:SemiBold',_sans-serif] hover:text-[#3e88f7] transition-colors px-4"
                  style={{ fontVariationSettings: "'opsz' 14" }}
                >
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Add New Button */}
        <button
          onClick={onAddTemplate}
          className="text-[#98bffa] text-[18px] font-['DM_Sans:Bold',_sans-serif] hover:text-[#3e88f7] transition-colors flex items-center gap-2 mb-8"
          style={{ fontVariationSettings: "'opsz' 14" }}
        >
          <span className="text-[24px]">+</span> Add New
        </button>

        {/* Pre-built Template Link */}
        <div className="text-[#a6a9b2] text-[16px] font-['DM_Sans:Regular',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
          Or start from a{' '}
          <button
            onClick={handlePreBuilt}
            className="text-[#98bffa] font-['DM_Sans:SemiBold',_sans-serif] hover:text-[#3e88f7] transition-colors"
            style={{ fontVariationSettings: "'opsz' 14" }}
          >
            pre-built template
          </button>
        </div>
      </div>

      {/* Pre-built Templates Modal */}
      <PreBuiltTemplatesModal 
        isOpen={showPreBuiltModal}
        onClose={() => setShowPreBuiltModal(false)}
        onSelect={handleSelectPreBuilt}
      />
    </div>
  );
}
