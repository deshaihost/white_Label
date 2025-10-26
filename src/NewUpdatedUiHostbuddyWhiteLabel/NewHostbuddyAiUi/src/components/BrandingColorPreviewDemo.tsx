import { useState } from 'react';

// Sample brand colors for demonstration
interface BrandColors {
  primaryBg: string;
  secondaryBg: string;
  cardBg: string;
  primaryText: string;
  secondaryText: string;
  tertiaryText: string;
  primaryBlue: string;
  primaryBlueHover: string;
  lightBlue: string;
  primaryBorder: string;
  activeBorder: string;
  hoverBg: string;
  successGreen: string;
  errorRed: string;
  warningOrange: string;
}

const DEFAULT_BRAND_COLORS: BrandColors = {
  primaryBg: '#0F1117',
  secondaryBg: '#17191F',
  cardBg: '#24262E',
  primaryText: '#FFFFFF',
  secondaryText: '#D0D3DB',
  tertiaryText: '#A6A9B2',
  primaryBlue: '#3E88F7',
  primaryBlueHover: '#74A9F7',
  lightBlue: '#98BFFA',
  primaryBorder: '#013280',
  activeBorder: '#3E88F7',
  hoverBg: '#01255E',
  successGreen: '#10B981',
  errorRed: '#EF4444',
  warningOrange: '#FB923C',
};

interface ColorInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  description?: string;
}

function ColorInput({ label, value, onChange, description }: ColorInputProps) {
  return (
    <div className="flex items-center justify-between gap-4 py-2">
      <div className="flex-1">
        <label className="text-[#d0d3db] text-[13px] font-['DM_Sans:Medium',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
          {label}
        </label>
        {description && (
          <p className="text-[#676a73] text-[11px] font-['DM_Sans:Regular',_sans-serif] mt-0.5" style={{ fontVariationSettings: "'opsz' 14" }}>
            {description}
          </p>
        )}
      </div>
      <div className="flex items-center gap-2">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-24 px-2 py-1.5 bg-[#0F1117] border-2 border-[#013280] rounded text-[#d0d3db] text-[12px] font-['DM_Sans:Medium',_sans-serif] focus:border-[#3e88f7] focus:outline-none transition-colors"
          style={{ fontVariationSettings: "'opsz' 14" }}
          placeholder="#000000"
        />
        <label className="relative cursor-pointer">
          <input
            type="color"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
          />
          <div
            className="w-10 h-8 rounded border-2 border-[#013280] hover:border-[#3e88f7] transition-colors"
            style={{ backgroundColor: value }}
          />
        </label>
      </div>
    </div>
  );
}

// Preview Components
function DashboardPreview({ brandColors }: { brandColors: BrandColors }) {
  return (
    <div className="p-6">
      <h1 
        className="text-[32px] font-['DM_Sans:Bold',_sans-serif] mb-6"
        style={{ fontVariationSettings: "'opsz' 14", color: brandColors.primaryText }}
      >
        Dashboard Preview
      </h1>

      {/* Welcome Banner */}
      <div className="border rounded-lg p-4 mb-6" style={{ backgroundColor: brandColors.hoverBg, borderColor: brandColors.primaryBorder }}>
        <div className="flex justify-between items-center">
          <p 
            className="text-[14px] font-['DM_Sans:Medium',_sans-serif]"
            style={{ fontVariationSettings: "'opsz' 14", color: brandColors.primaryBlue }}
          >
            Welcome to your branded portal!
          </p>
          <button 
            className="text-[14px] font-['DM_Sans:SemiBold',_sans-serif] transition-colors underline"
            style={{ 
              fontVariationSettings: "'opsz' 14",
              color: brandColors.primaryBlue
            }}
            onMouseEnter={(e) => e.currentTarget.style.color = brandColors.lightBlue}
            onMouseLeave={(e) => e.currentTarget.style.color = brandColors.primaryBlue}
          >
            Get Started →
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { title: 'Active Properties', value: '12', icon: '🏠' },
          { title: 'Total Bookings', value: '247', icon: '📅' },
          { title: 'Revenue', value: '$24,567', icon: '💰' }
        ].map((card, idx) => (
          <div 
            key={idx}
            className="border-2 rounded-xl p-4"
            style={{ 
              backgroundColor: brandColors.cardBg, 
              borderColor: brandColors.primaryBorder,
              boxShadow: `0 4px 12px ${brandColors.primaryBorder}20`
            }}
          >
            <div className="flex items-center gap-3 mb-2">
              <span className="text-2xl">{card.icon}</span>
              <div>
                <h3 
                  className="text-[13px] font-['DM_Sans:SemiBold',_sans-serif]"
                  style={{ fontVariationSettings: "'opsz' 14", color: brandColors.tertiaryText }}
                >
                  {card.title}
                </h3>
                <p 
                  className="text-[24px] font-['DM_Sans:Bold',_sans-serif]"
                  style={{ fontVariationSettings: "'opsz' 14", color: brandColors.primaryText }}
                >
                  {card.value}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <button 
          className="px-6 py-3 rounded-lg text-[14px] font-['DM_Sans:SemiBold',_sans-serif] transition-all"
          style={{ 
            fontVariationSettings: "'opsz' 14",
            backgroundColor: brandColors.primaryBlue,
            color: brandColors.primaryText
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = brandColors.primaryBlueHover}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = brandColors.primaryBlue}
        >
          Primary Action
        </button>
        <button 
          className="px-6 py-3 rounded-lg text-[14px] font-['DM_Sans:SemiBold',_sans-serif] transition-all border-2"
          style={{ 
            fontVariationSettings: "'opsz' 14",
            backgroundColor: 'transparent',
            borderColor: brandColors.primaryBlue,
            color: brandColors.primaryBlue
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = brandColors.primaryBlue;
            e.currentTarget.style.color = brandColors.primaryText;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.color = brandColors.primaryBlue;
          }}
        >
          Secondary Action
        </button>
      </div>
    </div>
  );
}

export default function BrandingColorPreviewDemo() {
  const [brandColors, setBrandColors] = useState<BrandColors>(DEFAULT_BRAND_COLORS);

  const handleColorChange = (key: keyof BrandColors, value: string) => {
    setBrandColors(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const resetColors = () => {
    setBrandColors(DEFAULT_BRAND_COLORS);
  };

  return (
    <div className="h-screen bg-[#0F1117] overflow-hidden">
      <div className="h-full flex">
        {/* Left Panel - Branding Configuration */}
        <div className="w-[420px] h-full bg-[#17191f] border-r-2 border-[#013280] overflow-y-auto">
          <div className="p-8">
            {/* Header */}
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-3">
                <div 
                  className="w-10 h-10 rounded-lg flex items-center justify-center text-white text-lg"
                  style={{ 
                    background: 'linear-gradient(135deg, #3e88f7 0%, #98bffa 100%)',
                    boxShadow: '0 0 8px rgba(62, 136, 247, 0.15)'
                  }}
                >
                  🎨
                </div>
                <h1 className="text-white text-[28px] font-['DM_Sans:Bold',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
                  Branding Configuration
                </h1>
              </div>
              <p className="text-[#a6a9b2] text-[14px] font-['DM_Sans:Regular',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
                Customize colors and see instant preview on the right →
              </p>
            </div>

            {/* Reset Button */}
            <div className="mb-6">
              <button
                onClick={resetColors}
                className="px-4 py-2 bg-[#4A4D54] hover:bg-[#676A73] text-[#d0d3db] rounded-lg text-[13px] font-['DM_Sans:Medium',_sans-serif] transition-colors flex items-center gap-2"
                style={{ fontVariationSettings: "'opsz' 14" }}
              >
                🔄 Reset All Colors
              </button>
            </div>

            {/* Color Configuration Groups */}
            <div className="space-y-6">
              {/* Background Colors */}
              <div className="bg-[#0F1117] border-2 border-[#013280] rounded-lg p-4">
                <h4 className="text-[#98bffa] text-[14px] font-['DM_Sans:SemiBold',_sans-serif] mb-4 uppercase tracking-wide" style={{ fontVariationSettings: "'opsz' 14" }}>
                  Background Colors
                </h4>
                <div className="space-y-2">
                  <ColorInput 
                    label="Primary Background" 
                    value={brandColors.primaryBg} 
                    onChange={(v) => handleColorChange('primaryBg', v)} 
                    description="Main app background"
                  />
                  <ColorInput 
                    label="Secondary Background" 
                    value={brandColors.secondaryBg} 
                    onChange={(v) => handleColorChange('secondaryBg', v)} 
                    description="Elevated surfaces"
                  />
                  <ColorInput 
                    label="Card Background" 
                    value={brandColors.cardBg} 
                    onChange={(v) => handleColorChange('cardBg', v)} 
                    description="Card containers"
                  />
                  <ColorInput 
                    label="Hover Background" 
                    value={brandColors.hoverBg} 
                    onChange={(v) => handleColorChange('hoverBg', v)} 
                    description="Hover states"
                  />
                </div>
              </div>

              {/* Text Colors */}
              <div className="bg-[#0F1117] border-2 border-[#013280] rounded-lg p-4">
                <h4 className="text-[#98bffa] text-[14px] font-['DM_Sans:SemiBold',_sans-serif] mb-4 uppercase tracking-wide" style={{ fontVariationSettings: "'opsz' 14" }}>
                  Text Colors
                </h4>
                <div className="space-y-2">
                  <ColorInput 
                    label="Primary Text" 
                    value={brandColors.primaryText} 
                    onChange={(v) => handleColorChange('primaryText', v)} 
                    description="Headings & labels"
                  />
                  <ColorInput 
                    label="Secondary Text" 
                    value={brandColors.secondaryText} 
                    onChange={(v) => handleColorChange('secondaryText', v)} 
                    description="Body text"
                  />
                  <ColorInput 
                    label="Tertiary Text" 
                    value={brandColors.tertiaryText} 
                    onChange={(v) => handleColorChange('tertiaryText', v)} 
                    description="Muted text"
                  />
                </div>
              </div>

              {/* Interactive Colors */}
              <div className="bg-[#0F1117] border-2 border-[#013280] rounded-lg p-4">
                <h4 className="text-[#98bffa] text-[14px] font-['DM_Sans:SemiBold',_sans-serif] mb-4 uppercase tracking-wide" style={{ fontVariationSettings: "'opsz' 14" }}>
                  Interactive Colors
                </h4>
                <div className="space-y-2">
                  <ColorInput 
                    label="Primary Blue" 
                    value={brandColors.primaryBlue} 
                    onChange={(v) => handleColorChange('primaryBlue', v)} 
                    description="Main brand color"
                  />
                  <ColorInput 
                    label="Primary Blue Hover" 
                    value={brandColors.primaryBlueHover} 
                    onChange={(v) => handleColorChange('primaryBlueHover', v)} 
                    description="Hover states"
                  />
                  <ColorInput 
                    label="Light Blue" 
                    value={brandColors.lightBlue} 
                    onChange={(v) => handleColorChange('lightBlue', v)} 
                    description="Secondary highlights"
                  />
                </div>
              </div>

              {/* Border Colors */}
              <div className="bg-[#0F1117] border-2 border-[#013280] rounded-lg p-4">
                <h4 className="text-[#98bffa] text-[14px] font-['DM_Sans:SemiBold',_sans-serif] mb-4 uppercase tracking-wide" style={{ fontVariationSettings: "'opsz' 14" }}>
                  Border Colors
                </h4>
                <div className="space-y-2">
                  <ColorInput 
                    label="Primary Border" 
                    value={brandColors.primaryBorder} 
                    onChange={(v) => handleColorChange('primaryBorder', v)} 
                    description="Standard borders"
                  />
                  <ColorInput 
                    label="Active Border" 
                    value={brandColors.activeBorder} 
                    onChange={(v) => handleColorChange('activeBorder', v)} 
                    description="Focus & hover borders"
                  />
                </div>
              </div>

              {/* Status Colors */}
              <div className="bg-[#0F1117] border-2 border-[#013280] rounded-lg p-4">
                <h4 className="text-[#98bffa] text-[14px] font-['DM_Sans:SemiBold',_sans-serif] mb-4 uppercase tracking-wide" style={{ fontVariationSettings: "'opsz' 14" }}>
                  Status Colors
                </h4>
                <div className="space-y-2">
                  <ColorInput 
                    label="Success Green" 
                    value={brandColors.successGreen} 
                    onChange={(v) => handleColorChange('successGreen', v)} 
                    description="Success states"
                  />
                  <ColorInput 
                    label="Error Red" 
                    value={brandColors.errorRed} 
                    onChange={(v) => handleColorChange('errorRed', v)} 
                    description="Error states"
                  />
                  <ColorInput 
                    label="Warning Orange" 
                    value={brandColors.warningOrange} 
                    onChange={(v) => handleColorChange('warningOrange', v)} 
                    description="Warning states"
                  />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 pt-6 border-t-2 border-[#013280] space-y-3">
              <button
                className="w-full px-6 py-3 bg-[#0F1117] border-2 border-[#013280] hover:border-[#3e88f7] text-[#d0d3db] rounded-lg text-[14px] font-['DM_Sans:SemiBold',_sans-serif] transition-colors flex items-center justify-center gap-2"
                style={{ fontVariationSettings: "'opsz' 14" }}
              >
                💾 Save Configuration
              </button>
              <button
                className="w-full px-6 py-3 bg-[#3e88f7] hover:bg-[#74A9F7] text-white rounded-lg text-[14px] font-['DM_Sans:SemiBold',_sans-serif] transition-colors flex items-center justify-center gap-2"
                style={{ 
                  fontVariationSettings: "'opsz' 14",
                  boxShadow: '0 0 20px rgba(62, 136, 247, 0.3)'
                }}
              >
                👁️ Apply Changes
              </button>
            </div>
          </div>
        </div>

        {/* Right Panel - Live Preview */}
        <div className="flex-1 h-full overflow-hidden">
          <div className="h-full flex flex-col">
            {/* Preview Header */}
            <div className="px-8 py-4 flex items-center justify-between border-b" style={{ backgroundColor: brandColors.secondaryBg, borderColor: brandColors.primaryBorder }}>
              <div>
                <h2 className="text-[18px] font-['DM_Sans:SemiBold',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14", color: brandColors.primaryText }}>
                  🎨 Live Preview
                </h2>
                <p className="text-[12px] font-['DM_Sans:Regular',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14", color: brandColors.tertiaryText }}>
                  Changes are reflected instantly as you modify colors
                </p>
              </div>
              <div className="px-3 py-1.5 rounded-full border" style={{ backgroundColor: brandColors.hoverBg, borderColor: brandColors.primaryBorder }}>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-[#4ADE80] rounded-full animate-pulse" />
                  <span className="text-[#4ADE80] text-[11px] font-['DM_Sans:SemiBold',_sans-serif] uppercase tracking-wide" style={{ fontVariationSettings: "'opsz' 14" }}>
                    Live Preview
                  </span>
                </div>
              </div>
            </div>

            {/* Preview Content */}
            <div 
              className="flex-1 overflow-auto"
              style={{ backgroundColor: brandColors.primaryBg }}
            >
              <DashboardPreview brandColors={brandColors} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}