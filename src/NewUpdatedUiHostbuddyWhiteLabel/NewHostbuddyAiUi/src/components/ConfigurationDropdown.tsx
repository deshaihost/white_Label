import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';

interface Configuration {
  id: string;
  name: string;
  isDefault: boolean;
}

interface ConfigurationDropdownProps {
  configurations: Configuration[];
  selectedConfigId: string;
  onSelectConfig: (configId: string) => void;
  onNewConfig: () => void;
}

export default function ConfigurationDropdown({
  configurations,
  selectedConfigId,
  onSelectConfig,
  onNewConfig
}: ConfigurationDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedConfig = configurations.find(c => c.id === selectedConfigId);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-6 py-2.5 bg-[#0F1117] border border-[#013280] rounded-lg text-white text-[15px] font-['DM_Sans:SemiBold',_sans-serif] hover:bg-[#01255e] transition-colors min-w-[140px] justify-between"
        style={{ fontVariationSettings: "'opsz' 14" }}
      >
        <span className="capitalize">{selectedConfig?.name || 'Default'}</span>
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div 
          className="absolute right-0 top-full mt-2 w-[240px] bg-[#0F1117] border-2 border-[#013280] rounded-lg overflow-hidden z-50"
          style={{ boxShadow: '0 0 30px rgba(30, 75, 158, 0.3)' }}
        >
          <div className="bg-[#0F1117] px-4 py-2 border-b border-[#013280]">
            <p className="text-[#a6a9b2] text-[12px] font-['DM_Sans:SemiBold',_sans-serif] uppercase" style={{ fontVariationSettings: "'opsz' 14" }}>
              Configuration
            </p>
          </div>
          
          <div className="py-1">
            {configurations.map((config) => (
              <button
                key={config.id}
                onClick={() => {
                  onSelectConfig(config.id);
                  setIsOpen(false);
                }}
                className="w-full flex items-center justify-between px-4 py-2.5 hover:bg-[#01255e] transition-colors"
              >
                <span className="text-white text-[14px] font-['DM_Sans:Regular',_sans-serif] capitalize" style={{ fontVariationSettings: "'opsz' 14" }}>
                  {config.name}
                </span>
                {config.id === selectedConfigId && (
                  <Check className="w-4 h-4 text-[#3e88f7]" />
                )}
              </button>
            ))}
          </div>

          <div className="border-t border-[#013280]">
            <button
              onClick={() => {
                onNewConfig();
                setIsOpen(false);
              }}
              className="w-full px-4 py-2.5 text-[#98bffa] text-[14px] font-['DM_Sans:SemiBold',_sans-serif] hover:bg-[#01255e] transition-colors text-left"
              style={{ fontVariationSettings: "'opsz' 14" }}
            >
              + New Configuration
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
