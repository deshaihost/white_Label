import React, { useState } from 'react';
import './WhiteLabelBranding.css';
import {
  DashboardPreview,
  PropertiesPreview,
  MessagingPreview,
  ActionItemsPreview,
  InsightsPreview,
  SettingsPreview
} from './WhiteLabelPreviewPages';

// SVG Icon Components
const UploadIcon = ({ className, size = 24 }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
    <polyline points="17 8 12 3 7 8"></polyline>
    <line x1="12" y1="3" x2="12" y2="15"></line>
  </svg>
);

const RefreshIcon = ({ className, size = 24 }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23 4 23 10 17 10"></polyline>
    <polyline points="1 20 1 14 7 14"></polyline>
    <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
  </svg>
);

const EyeIcon = ({ className, size = 24 }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
    <circle cx="12" cy="12" r="3"></circle>
  </svg>
);

const SaveIcon = ({ className, size = 24 }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
    <polyline points="17 21 17 13 7 13 7 21"></polyline>
    <polyline points="7 3 7 8 15 8"></polyline>
  </svg>
);

const ImageIcon = ({ className, size = 24 }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
    <circle cx="8.5" cy="8.5" r="1.5"></circle>
    <polyline points="21 15 16 10 5 21"></polyline>
  </svg>
);

const HOSTBUDDY_ORIGINAL_DARK = {
  // Background Colors
  primaryBg: '#0F1117',
  secondaryBg: '#17191F',
  cardBg: '#24262E',
  hoverBg: '#01255E',
  inputBg: '#0F1117',
  textareaBg: '#01255E',
  dropdownBg: '#01255E',
  modalOverlay: 'rgba(0, 0, 0, 0.6)',
  sidebarBg: '#17191F',
  
  // Text Colors
  primaryText: '#FFFFFF',
  secondaryText: '#D0D3DB',
  tertiaryText: '#A6A9B2',
  quaternaryText: '#676A73',
  disabledText: '#4A4D54',
  placeholderText: '#8A8E98',
  linkText: '#98BFFA',
  
  // Border Colors
  primaryBorder: '#013280',
  activeBorder: '#3E88F7',
  inactiveBorder: '#013280',
  subtleBorder: '#24262E',
  
  // Interactive Colors
  primaryBlue: '#3E88F7',
  primaryBlueHover: '#74A9F7',
  lightBlue: '#98BFFA',
  secondaryButtonBg: '#01255E',
  secondaryButtonHover: '#013280',
  
  // Status Colors
  successGreen: '#10B981',
  currentGreen: '#4ADE80',
  warningOrange: '#FB923C',
  errorRed: '#EF4444',
  destructiveRed: '#D4183D',
  
  // Component Colors
  toggleBgOff: '#676A73',
  cancelButton: '#4A4D54',
  cancelButtonHover: '#676A73',
  dropdownSelect: '#A6A9B2',
  tableHeaderBg: '#0F1117',
  tableRowHover: '#01255E',
  
  // Shadow & Effects
  cardShadow: '0 0 25px rgba(1, 50, 128, 0.2)',
  primaryGlow: '0 0 15px rgba(62, 136, 247, 0.3)',
  buttonGlow: '0 0 20px rgba(62, 136, 247, 0.25)',
  toggleGlow: '0 0 12px rgba(62, 136, 247, 0.4)',
  warningGlow: '0 0 8px rgba(251, 146, 60, 0.4)',
  
  // Typography
  headingFont: 'Poppins',
  bodyFont: 'DM Sans',
};

const HOSTBUDDY_ORIGINAL_LIGHT = {
  // Background Colors
  primaryBg: '#F5F7FA',
  secondaryBg: '#FFFFFF',
  cardBg: '#FFFFFF',
  hoverBg: '#EBF2FE',
  inputBg: '#FFFFFF',
  textareaBg: '#FFFFFF',
  dropdownBg: '#FFFFFF',
  modalOverlay: 'rgba(15, 17, 23, 0.6)',
  sidebarBg: '#FFFFFF',
  
  // Text Colors
  primaryText: '#111827',
  secondaryText: '#1F2937',
  tertiaryText: '#6B7280',
  quaternaryText: '#9CA3AF',
  disabledText: '#D1D5DB',
  placeholderText: '#9CA3AF',
  linkText: '#3E88F7',
  
  // Border Colors
  primaryBorder: '#E5E7EB',
  activeBorder: '#3E88F7',
  inactiveBorder: '#F3F4F6',
  subtleBorder: '#F9FAFB',
  
  // Interactive Colors
  primaryBlue: '#3E88F7',
  primaryBlueHover: '#2563EB',
  lightBlue: '#60A5FA',
  secondaryButtonBg: '#F3F4F6',
  secondaryButtonHover: '#E5E7EB',
  
  // Status Colors
  successGreen: '#059669',
  currentGreen: '#10B981',
  warningOrange: '#EA580C',
  errorRed: '#DC2626',
  destructiveRed: '#B91C1C',
  
  // Component Colors
  toggleBgOff: '#D1D5DB',
  cancelButton: '#F3F4F6',
  cancelButtonHover: '#E5E7EB',
  dropdownSelect: '#111827',
  tableHeaderBg: '#F9FAFB',
  tableRowHover: '#F3F4F6',
  
  // Shadow & Effects
  cardShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
  primaryGlow: '0 0 0 3px rgba(62, 136, 247, 0.15)',
  buttonGlow: '0 4px 12px rgba(62, 136, 247, 0.2)',
  toggleGlow: '0 0 0 4px rgba(62, 136, 247, 0.15)',
  warningGlow: '0 0 0 3px rgba(234, 88, 12, 0.15)',
  
  // Typography
  headingFont: 'Poppins',
  bodyFont: 'DM Sans',
};

const ColorInput = ({ label, value, onChange, description }) => {
  return (
    <div className="color-input-wrapper">
      <div className="color-input-label">
        <label className="color-label">{label}</label>
        {description && <p className="color-description">{description}</p>}
      </div>
      <div className="color-input-controls">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="color-text-input"
          placeholder="#000000"
        />
        <label className="color-picker-wrapper">
          <input
            type="color"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="color-picker-input"
          />
          <div
            className="color-preview"
            style={{ backgroundColor: value }}
          />
        </label>
      </div>
    </div>
  );
};

const WhiteLabelBranding = () => {
  const [currentPreset, setCurrentPreset] = useState('hostbuddy-original-dark');
  const [brandColors, setBrandColors] = useState(HOSTBUDDY_ORIGINAL_DARK);
  const [logoUrl, setLogoUrl] = useState('');
  const [faviconUrl, setFaviconUrl] = useState('');
  const [previewPage, setPreviewPage] = useState('dashboard');

  const handlePresetChange = (preset) => {
    setCurrentPreset(preset);
    if (preset === 'hostbuddy-original-dark') {
      setBrandColors(HOSTBUDDY_ORIGINAL_DARK);
    } else if (preset === 'hostbuddy-original-light') {
      setBrandColors(HOSTBUDDY_ORIGINAL_LIGHT);
    }
  };

  const handleColorChange = (key, value) => {
    setBrandColors(prev => ({
      ...prev,
      [key]: value
    }));
    if (currentPreset !== 'custom') {
      setCurrentPreset('custom');
    }
  };

  const handleFontChange = (type, font) => {
    setBrandColors(prev => ({
      ...prev,
      [type === 'heading' ? 'headingFont' : 'bodyFont']: font
    }));
    if (currentPreset !== 'custom') {
      setCurrentPreset('custom');
    }
  };

  const handleResetAll = () => {
    const resetPreset = currentPreset === 'hostbuddy-original-light' ? 'hostbuddy-original-light' : 'hostbuddy-original-dark';
    setCurrentPreset(resetPreset);
    setBrandColors(resetPreset === 'hostbuddy-original-dark' ? HOSTBUDDY_ORIGINAL_DARK : HOSTBUDDY_ORIGINAL_LIGHT);
  };

  const handleLogoUpload = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/svg+xml,image/png,image/jpeg';
    input.onchange = (e) => {
      const file = e.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setLogoUrl(e.target?.result);
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  const handleFaviconUpload = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/x-icon,image/png';
    input.onchange = (e) => {
      const file = e.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setFaviconUrl(e.target?.result);
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  return (
    <div className="white-label-branding-container">
      <div className="branding-layout">
        {/* Left Panel - Configuration */}
        <div className="branding-config-panel">
          <div className="config-content">
            {/* Header */}
            <div className="config-header">
              <h1 className="config-title">Branding Configuration</h1>
              <p className="config-subtitle">Customize your HostBuddy experience</p>
            </div>

            {/* Logo Upload */}
            <div className="config-section">
              <h3 className="section-title">Company Logo</h3>
              <div className="upload-area" onClick={handleLogoUpload}>
                {logoUrl ? (
                  <div className="upload-preview">
                    <img src={logoUrl} alt="Company Logo" className="uploaded-logo" />
                    <p className="upload-change-text">Click to change</p>
                  </div>
                ) : (
                  <div className="upload-placeholder">
                    <UploadIcon className="upload-icon" size={32} />
                    <div className="upload-text">
                      <p className="upload-main-text">Click to upload or drag and drop</p>
                      <p className="upload-sub-text">SVG, PNG or JPG (max. 2MB)</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Favicon Upload */}
            <div className="config-section">
              <h3 className="section-title">Favicon</h3>
              <div className="upload-area upload-area-small" onClick={handleFaviconUpload}>
                {faviconUrl ? (
                  <div className="upload-preview-inline">
                    <img src={faviconUrl} alt="Favicon" className="uploaded-favicon" />
                    <p className="upload-change-text">Click to change</p>
                  </div>
                ) : (
                  <div className="upload-placeholder-inline">
                    <UploadIcon className="upload-icon-small" size={24} />
                    <div className="upload-text-small">
                      <p className="upload-main-text-small">Upload Favicon</p>
                      <p className="upload-sub-text-small">ICO or PNG (32x32)</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Typography */}
            <div className="config-section">
              <h3 className="section-title">Typography</h3>
              <div className="typography-container">
                <div className="typography-field">
                  <label className="typography-label">Heading Font</label>
                  <select
                    value={brandColors.headingFont}
                    onChange={(e) => handleFontChange('heading', e.target.value)}
                    className="typography-select"
                  >
                    <option value="Poppins">Poppins (Modern)</option>
                    <option value="DM Sans">DM Sans (Clean)</option>
                    <option value="Inter">Inter (Modern)</option>
                    <option value="Montserrat">Montserrat (Professional)</option>
                    <option value="Open Sans">Open Sans (Friendly)</option>
                    <option value="Roboto">Roboto (Classic)</option>
                    <option value="Lato">Lato (Friendly)</option>
                    <option value="Raleway">Raleway (Elegant)</option>
                    <option value="Nunito">Nunito (Rounded)</option>
                    <option value="Work Sans">Work Sans (Modern)</option>
                  </select>
                </div>
                <div className="typography-field">
                  <label className="typography-label">Body Font</label>
                  <select
                    value={brandColors.bodyFont}
                    onChange={(e) => handleFontChange('body', e.target.value)}
                    className="typography-select"
                  >
                    <option value="Poppins">Poppins (Modern)</option>
                    <option value="DM Sans">DM Sans (Clean)</option>
                    <option value="Inter">Inter (Modern)</option>
                    <option value="Montserrat">Montserrat (Professional)</option>
                    <option value="Open Sans">Open Sans (Friendly)</option>
                    <option value="Roboto">Roboto (Classic)</option>
                    <option value="Lato">Lato (Friendly)</option>
                    <option value="Raleway">Raleway (Elegant)</option>
                    <option value="Nunito">Nunito (Rounded)</option>
                    <option value="Work Sans">Work Sans (Modern)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Color Palette */}
            <div className="config-section">
              <div className="palette-header">
                <h3 className="section-title">Color Palette</h3>
                <button onClick={handleResetAll} className="reset-button">
                  <RefreshIcon className="reset-icon" size={14} />
                  Reset All
                </button>
              </div>

              {/* Preset Selector */}
              <div className="preset-selector">
                <button
                  onClick={() => handlePresetChange('hostbuddy-original-dark')}
                  className={`preset-button ${currentPreset === 'hostbuddy-original-dark' ? 'preset-button-active' : ''}`}
                >
                  Dark Mode
                </button>
                <button
                  onClick={() => handlePresetChange('hostbuddy-original-light')}
                  className={`preset-button ${currentPreset === 'hostbuddy-original-light' ? 'preset-button-active' : ''}`}
                >
                  Light Mode
                </button>
              </div>

              {/* Color Groups */}
              <div className="color-groups">
                {/* Background Colors */}
                <div className="color-group">
                  <h4 className="color-group-title">BACKGROUNDS</h4>
                  <div className="color-group-items">
                    <ColorInput label="Primary" value={brandColors.primaryBg} onChange={(v) => handleColorChange('primaryBg', v)} description="Main app background" />
                    <ColorInput label="Secondary" value={brandColors.secondaryBg} onChange={(v) => handleColorChange('secondaryBg', v)} description="Elevated surfaces" />
                    <ColorInput label="Cards" value={brandColors.cardBg} onChange={(v) => handleColorChange('cardBg', v)} description="Card backgrounds" />
                    <ColorInput label="Hover" value={brandColors.hoverBg} onChange={(v) => handleColorChange('hoverBg', v)} description="Hover states" />
                    <ColorInput label="Input" value={brandColors.inputBg} onChange={(v) => handleColorChange('inputBg', v)} description="Input fields" />
                    <ColorInput label="Textarea" value={brandColors.textareaBg} onChange={(v) => handleColorChange('textareaBg', v)} description="Textarea fields" />
                    <ColorInput label="Dropdown" value={brandColors.dropdownBg} onChange={(v) => handleColorChange('dropdownBg', v)} description="Dropdown menus" />
                  </div>
                </div>

                {/* Text Colors */}
                <div className="color-group">
                  <h4 className="color-group-title">TEXT</h4>
                  <div className="color-group-items">
                    <ColorInput label="Primary" value={brandColors.primaryText} onChange={(v) => handleColorChange('primaryText', v)} description="Headings & labels" />
                    <ColorInput label="Secondary" value={brandColors.secondaryText} onChange={(v) => handleColorChange('secondaryText', v)} description="Body text" />
                    <ColorInput label="Tertiary" value={brandColors.tertiaryText} onChange={(v) => handleColorChange('tertiaryText', v)} description="Muted text" />
                    <ColorInput label="Quaternary" value={brandColors.quaternaryText} onChange={(v) => handleColorChange('quaternaryText', v)} description="Inactive text" />
                    <ColorInput label="Disabled" value={brandColors.disabledText} onChange={(v) => handleColorChange('disabledText', v)} description="Disabled states" />
                    <ColorInput label="Placeholder" value={brandColors.placeholderText} onChange={(v) => handleColorChange('placeholderText', v)} description="Input placeholders" />
                  </div>
                </div>

                {/* Border Colors */}
                <div className="color-group">
                  <h4 className="color-group-title">BORDERS</h4>
                  <div className="color-group-items">
                    <ColorInput label="Primary" value={brandColors.primaryBorder} onChange={(v) => handleColorChange('primaryBorder', v)} description="Standard borders" />
                    <ColorInput label="Active" value={brandColors.activeBorder} onChange={(v) => handleColorChange('activeBorder', v)} description="Focus & hover" />
                    <ColorInput label="Inactive" value={brandColors.inactiveBorder} onChange={(v) => handleColorChange('inactiveBorder', v)} description="Inactive elements" />
                  </div>
                </div>

                {/* Interactive Colors */}
                <div className="color-group">
                  <h4 className="color-group-title">INTERACTIVE</h4>
                  <div className="color-group-items">
                    <ColorInput label="Primary Blue" value={brandColors.primaryBlue} onChange={(v) => handleColorChange('primaryBlue', v)} description="Main brand color" />
                    <ColorInput label="Primary Hover" value={brandColors.primaryBlueHover} onChange={(v) => handleColorChange('primaryBlueHover', v)} description="Primary hover" />
                    <ColorInput label="Light Blue" value={brandColors.lightBlue} onChange={(v) => handleColorChange('lightBlue', v)} description="Link text" />
                    <ColorInput label="Secondary Button" value={brandColors.secondaryButtonBg} onChange={(v) => handleColorChange('secondaryButtonBg', v)} description="Secondary buttons" />
                    <ColorInput label="Secondary Hover" value={brandColors.secondaryButtonHover} onChange={(v) => handleColorChange('secondaryButtonHover', v)} description="Secondary hover" />
                  </div>
                </div>

                {/* Status Colors */}
                <div className="color-group">
                  <h4 className="color-group-title">STATUS</h4>
                  <div className="color-group-items">
                    <ColorInput label="Success Green" value={brandColors.successGreen} onChange={(v) => handleColorChange('successGreen', v)} description="Success states" />
                    <ColorInput label="Current Green" value={brandColors.currentGreen} onChange={(v) => handleColorChange('currentGreen', v)} description="Current indicators" />
                    <ColorInput label="Warning Orange" value={brandColors.warningOrange} onChange={(v) => handleColorChange('warningOrange', v)} description="Warnings" />
                    <ColorInput label="Error Red" value={brandColors.errorRed} onChange={(v) => handleColorChange('errorRed', v)} description="Error states" />
                    <ColorInput label="Destructive Red" value={brandColors.destructiveRed} onChange={(v) => handleColorChange('destructiveRed', v)} description="Delete actions" />
                  </div>
                </div>

                {/* Component Colors */}
                <div className="color-group">
                  <h4 className="color-group-title">COMPONENTS</h4>
                  <div className="color-group-items">
                    <ColorInput label="Toggle Off" value={brandColors.toggleBgOff} onChange={(v) => handleColorChange('toggleBgOff', v)} description="Disabled toggles" />
                    <ColorInput label="Cancel Button" value={brandColors.cancelButton} onChange={(v) => handleColorChange('cancelButton', v)} description="Cancel buttons" />
                    <ColorInput label="Cancel Hover" value={brandColors.cancelButtonHover} onChange={(v) => handleColorChange('cancelButtonHover', v)} description="Cancel hover" />
                    <ColorInput label="Dropdown Select" value={brandColors.dropdownSelect} onChange={(v) => handleColorChange('dropdownSelect', v)} description="Dropdown text" />
                    <ColorInput label="Table Header" value={brandColors.tableHeaderBg} onChange={(v) => handleColorChange('tableHeaderBg', v)} description="Table headers" />
                    <ColorInput label="Table Row Hover" value={brandColors.tableRowHover} onChange={(v) => handleColorChange('tableRowHover', v)} description="Table hover" />
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="action-buttons">
                  <button className="action-button action-button-save">
                    <SaveIcon className="button-icon" size={16} />
                    Save
                  </button>
                  <button className="action-button action-button-preview">
                    <EyeIcon className="button-icon" size={16} />
                    Preview in Sandbox
                  </button>
                  <button className="action-button action-button-publish">
                    Publish Live
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel - Live Preview */}
        <div className="branding-preview-panel" style={{ backgroundColor: brandColors.primaryBg }}>
          <div className="preview-container">
            {/* Preview Header */}
            <div className="preview-header" style={{ backgroundColor: brandColors.secondaryBg, borderColor: brandColors.primaryBorder }}>
              <div>
                <h2 className="preview-title" style={{ color: brandColors.primaryText }}>Live Preview</h2>
                <p className="preview-subtitle" style={{ color: brandColors.quaternaryText }}>
                  Visual representation of our various pages - not an exact rendition
                </p>
              </div>
              <div className="preview-status">
                <div className="preview-status-dot"></div>
                <span className="preview-status-text">LIVE</span>
              </div>
            </div>

            {/* Preview Content */}
            <div className="preview-content">
              {/* Simulated Sidebar */}
              <div className="preview-sidebar" style={{ backgroundColor: brandColors.secondaryBg, borderColor: brandColors.primaryBorder }}>
                <div className="preview-sidebar-content">
                  {/* Logo Area */}
                  <div className="preview-logo-area">
                    {logoUrl ? (
                      <img src={logoUrl} alt="Logo" className="preview-logo-image" />
                    ) : (
                      <div className="preview-logo-placeholder" style={{ backgroundColor: brandColors.primaryBg, color: brandColors.tertiaryText, borderColor: brandColors.primaryBorder }}>
                        Your Logo
                      </div>
                    )}
                  </div>

                  {/* Menu Items */}
                  <div className="preview-menu">
                    {[
                      { id: 'dashboard', label: 'Dashboard' },
                      { id: 'properties', label: 'Properties' },
                      { id: 'messaging', label: 'Messaging' },
                      { id: 'action-items', label: 'Action Items' },
                      { id: 'insights', label: 'Insights' },
                      { id: 'settings', label: 'Settings' }
                    ].map(item => (
                      <button
                        key={item.id}
                        onClick={() => setPreviewPage(item.id)}
                        className="preview-menu-item"
                        style={{
                          backgroundColor: previewPage === item.id ? brandColors.hoverBg : 'transparent',
                          color: previewPage === item.id ? brandColors.lightBlue : brandColors.tertiaryText
                        }}
                      >
                        {previewPage === item.id && (
                          <div className="preview-menu-indicator" style={{ backgroundColor: brandColors.primaryBlue }} />
                        )}
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Main Content Preview */}
              <div className="preview-main" style={{ backgroundColor: brandColors.primaryBg }}>
                {previewPage === 'dashboard' && <DashboardPreview brandColors={brandColors} />}
                {previewPage === 'properties' && <PropertiesPreview brandColors={brandColors} />}
                {previewPage === 'messaging' && <MessagingPreview brandColors={brandColors} />}
                {previewPage === 'action-items' && <ActionItemsPreview brandColors={brandColors} />}
                {previewPage === 'insights' && <InsightsPreview brandColors={brandColors} />}
                {previewPage === 'settings' && <SettingsPreview brandColors={brandColors} />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhiteLabelBranding;