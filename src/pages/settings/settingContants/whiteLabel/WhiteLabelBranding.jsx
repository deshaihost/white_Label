import React, { useState, useEffect } from 'react';
import './WhiteLabelBranding.css';
import {
  DashboardPreview,
  PropertiesPreview,
  MessagingPreview,
  ActionItemsPreview,
  InsightsPreview,
  SettingsPreview
} from './WhiteLabelPreviewPages';
import { getDomains, getCssConfig, saveCssConfig, uploadCompanyLogo, getLogo } from './whiteLabelServices';

// Import sidebar icons
import dashboardIcon from '../../../../component/newSideNavigationComponent/components/sideNavBarElements/sectionIndicatorComponent/navIcons/deshBoardDefault.svg';
import propertiesIcon from '../../../../component/newSideNavigationComponent/components/sideNavBarElements/sectionIndicatorComponent/navIcons/home-smile.svg';
import messagingIcon from '../../../../component/newSideNavigationComponent/components/sideNavBarElements/sectionIndicatorComponent/navIcons/messageDefault.svg';
import actionItemsIcon from '../../../../component/newSideNavigationComponent/components/sideNavBarElements/sectionIndicatorComponent/navIcons/actionDefault.svg';
import insightsIcon from '../../../../component/newSideNavigationComponent/components/sideNavBarElements/sectionIndicatorComponent/navIcons/insightDefault.svg';
import settingsIcon from '../../../../component/newSideNavigationComponent/components/sideNavBarElements/sectionIndicatorComponent/navIcons/settingsDefault.svg';
import chevronLeftDouble from '../../../../component/newSideNavigationComponent/components/sideNavBarElements/sectionIndicatorComponent/navIcons/chevron-left-double.svg';
import chevronRightDouble from '../../../../component/newSideNavigationComponent/components/sideNavBarElements/sectionIndicatorComponent/navIcons/chevron-right-double.svg';

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
  // Background Colors (9 properties)
  primaryBg: '#0F1117',
  secondaryBg: '#17191F',
  cardBg: '#24262E',
  hoverBg: '#01255E',
  inputBg: '#0F1117',
  textareaBg: '#01255E',
  dropdownBg: '#01255E',
  modalOverlay: 'rgba(0, 0, 0, 0.6)',
  sidebarBg: '#17191F',
  
  // Text Colors (7 properties)
  primaryText: '#FFFFFF',
  secondaryText: '#D0D3DB',
  tertiaryText: '#A6A9B2',
  quaternaryText: '#676A73',
  disabledText: '#4A4D54',
  placeholderText: '#8A8E98',
  linkText: '#98BFFA',
  
  // Border Colors (5 properties)
  primaryBorder: '#013280',
  activeBorder: '#3E88F7',
  inactiveBorder: '#013280',
  subtleBorder: '#24262E',
  accentBorder: '#2A4A8F',
  
  // Legacy Interactive Colors (for backward compatibility)
  primaryBlue: '#3E88F7',
  primaryBlueHover: '#74A9F7',
  lightBlue: '#98BFFA',
  
  // Action Links & Secondary Interactive Elements (1 property)
  actionLink: '#3E88F7',
  
  // Button Colors (8 properties) - INDEPENDENT FROM TEXT COLORS
  primaryButtonBg: '#3E88F7',
  primaryButtonText: '#FFFFFF',
  primaryButtonHover: '#74A9F7',
  secondaryButtonBg: '#01255E',
  secondaryButtonText: '#98BFFA',
  secondaryButtonHover: '#013280',
  outlineButtonBorder: '#3E88F7',
  outlineButtonText: '#3E88F7',
  
  // Badge & Status Colors (9 properties)
  statusBadgeBg: '#3E88F7',
  statusBadgeText: '#FFFFFF',
  successGreen: '#10B981',
  currentGreen: '#4ADE80',
  onlineGreen: '#00FF88',
  warningOrange: '#FB923C',
  errorRed: '#EF4444',
  offlineRed: '#FF4444',
  destructiveRed: '#D4183D',
  
  // Component Colors (6 properties)
  toggleBgOff: '#676A73',
  cancelButton: '#4A4D54',
  cancelButtonHover: '#676A73',
  dropdownSelect: '#A6A9B2',
  tableHeaderBg: '#0F1117',
  tableRowHover: '#01255E',
  
  // Charts & Data Visualization (3 properties)
  chartBarFill: '#3E88F7',
  chartGridLines: '#013280',
  chartAxisLines: '#013280',
  
  // Shadow & Effects (5 properties)
  cardShadow: '0 0 25px rgba(1, 50, 128, 0.2)',
  primaryGlow: '0 0 15px rgba(62, 136, 247, 0.3)',
  buttonGlow: '0 0 20px rgba(62, 136, 247, 0.25)',
  toggleGlow: '0 0 12px rgba(62, 136, 247, 0.4)',
  warningGlow: '0 0 8px rgba(251, 146, 60, 0.4)',
  
  // Typography (2 properties)
  headingFont: 'Poppins',
  bodyFont: 'DM Sans',
};

const HOSTBUDDY_ORIGINAL_LIGHT = {
  // Background Colors (9 properties)
  primaryBg: '#F5F7FA',
  secondaryBg: '#FFFFFF',
  cardBg: '#FFFFFF',
  hoverBg: '#EBF2FE',
  inputBg: '#FFFFFF',
  textareaBg: '#FFFFFF',
  dropdownBg: '#FFFFFF',
  modalOverlay: 'rgba(15, 17, 23, 0.6)',
  sidebarBg: '#FFFFFF',
  
  // Text Colors (7 properties)
  primaryText: '#111827',
  secondaryText: '#1F2937',
  tertiaryText: '#6B7280',
  quaternaryText: '#9CA3AF',
  disabledText: '#D1D5DB',
  placeholderText: '#9CA3AF',
  linkText: '#3E88F7',
  
  // Border Colors (5 properties)
  primaryBorder: '#E5E7EB',
  activeBorder: '#3E88F7',
  inactiveBorder: '#F3F4F6',
  subtleBorder: '#F9FAFB',
  accentBorder: '#60A5FA',
  
  // Legacy Interactive Colors (for backward compatibility)
  primaryBlue: '#3E88F7',
  primaryBlueHover: '#2563EB',
  lightBlue: '#60A5FA',
  
  // Action Links & Secondary Interactive Elements (1 property)
  actionLink: '#3E88F7',
  
  // Button Colors (8 properties) - INDEPENDENT FROM TEXT COLORS
  primaryButtonBg: '#3E88F7',
  primaryButtonText: '#FFFFFF',
  primaryButtonHover: '#2563EB',
  secondaryButtonBg: '#F3F4F6',
  secondaryButtonText: '#1F2937',
  secondaryButtonHover: '#E5E7EB',
  outlineButtonBorder: '#3E88F7',
  outlineButtonText: '#3E88F7',
  
  // Badge & Status Colors (9 properties)
  statusBadgeBg: '#3E88F7',
  statusBadgeText: '#FFFFFF',
  successGreen: '#059669',
  currentGreen: '#10B981',
  onlineGreen: '#10B981',
  warningOrange: '#EA580C',
  errorRed: '#DC2626',
  offlineRed: '#DC2626',
  destructiveRed: '#B91C1C',
  
  // Component Colors (6 properties)
  toggleBgOff: '#D1D5DB',
  cancelButton: '#F3F4F6',
  cancelButtonHover: '#E5E7EB',
  dropdownSelect: '#111827',
  tableHeaderBg: '#F9FAFB',
  tableRowHover: '#F3F4F6',
  
  // Charts & Data Visualization (3 properties)
  chartBarFill: '#3E88F7',
  chartGridLines: '#E5E7EB',
  chartAxisLines: '#E5E7EB',
  
  // Shadow & Effects (5 properties)
  cardShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
  primaryGlow: '0 0 0 3px rgba(62, 136, 247, 0.15)',
  buttonGlow: '0 4px 12px rgba(62, 136, 247, 0.2)',
  toggleGlow: '0 0 0 4px rgba(62, 136, 247, 0.15)',
  warningGlow: '0 0 0 3px rgba(234, 88, 12, 0.15)',
  
  // Typography (2 properties)
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
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);
  
  // Logo file management
  const [fullLogoFile, setFullLogoFile] = useState(null);
  const [faviconFile, setFaviconFile] = useState(null);
  const [uploadingLogos, setUploadingLogos] = useState(false);
  const [logoUploadSuccess, setLogoUploadSuccess] = useState('');
  const [logoUploadError, setLogoUploadError] = useState('');
  
  // Track which mode we're editing (light or dark)
  const [editingMode, setEditingMode] = useState('light'); // 'light' or 'dark'
  
  // Store both light and dark mode configurations separately
  const [lightModeColors, setLightModeColors] = useState(HOSTBUDDY_ORIGINAL_LIGHT);
  const [darkModeColors, setDarkModeColors] = useState(HOSTBUDDY_ORIGINAL_DARK);
  
  // Domain and key management
  const [domains, setDomains] = useState([]);
  const [selectedDomain, setSelectedDomain] = useState('');
  const [domainKey, setDomainKey] = useState('');
  const [loadingDomains, setLoadingDomains] = useState(true);
  
  // Loading and save states
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState('');
  const [saveError, setSaveError] = useState('');
  const [loadError, setLoadError] = useState('');

  // Load domains on mount
  useEffect(() => {
    const fetchDomains = async () => {
      setLoadingDomains(true);
      try {
        const response = await getDomains();
        if (response.success && response.data) {
          const domainList = response.data.domains || [];
          setDomains(domainList);
          
          // Auto-select first domain if available
          if (domainList.length > 0) {
            setSelectedDomain(domainList[0]);
          }
        } else {
          setLoadError(response.error || 'Failed to load domains');
        }
      } catch (error) {
        console.error('Error fetching domains:', error);
        setLoadError('Error fetching domains');
      } finally {
        setLoadingDomains(false);
      }
    };

    fetchDomains();
  }, []);

  // Load CSS config when domain is selected
  useEffect(() => {
    const loadCssForDomain = async () => {
      if (!selectedDomain) return;
      
      setLoading(true);
      setLoadError('');
      
      try {
        const response = await getCssConfig({ domain: selectedDomain });
        if (response.success && response.data && response.data.css_data) {
          const cssData = response.data.css_data;
          
          // Map CSS data from API to brandColors structure for LIGHT mode
          const loadedLightColors = {
            // Backgrounds
            primaryBg: cssData.background?.primary || HOSTBUDDY_ORIGINAL_DARK.primaryBg,
            secondaryBg: cssData.background?.secondary || HOSTBUDDY_ORIGINAL_DARK.secondaryBg,
            cardBg: cssData.background?.cards || HOSTBUDDY_ORIGINAL_DARK.cardBg,
            hoverBg: cssData.background?.hover || HOSTBUDDY_ORIGINAL_DARK.hoverBg,
            inputBg: cssData.background?.input || HOSTBUDDY_ORIGINAL_DARK.inputBg,
            textareaBg: cssData.background?.textarea || HOSTBUDDY_ORIGINAL_DARK.textareaBg,
            dropdownBg: cssData.background?.dropdown || HOSTBUDDY_ORIGINAL_DARK.dropdownBg,
            modalOverlay: cssData.background?.modal_overlay || HOSTBUDDY_ORIGINAL_DARK.modalOverlay,
            sidebarBg: cssData.background?.sidebar || HOSTBUDDY_ORIGINAL_DARK.sidebarBg,
            
            // Text
            primaryText: cssData.text?.primary || HOSTBUDDY_ORIGINAL_DARK.primaryText,
            secondaryText: cssData.text?.secondary || HOSTBUDDY_ORIGINAL_DARK.secondaryText,
            tertiaryText: cssData.text?.tertiary || HOSTBUDDY_ORIGINAL_DARK.tertiaryText,
            quaternaryText: cssData.text?.quaternary || HOSTBUDDY_ORIGINAL_DARK.quaternaryText,
            disabledText: cssData.text?.disabled || HOSTBUDDY_ORIGINAL_DARK.disabledText,
            placeholderText: cssData.text?.placeholder || HOSTBUDDY_ORIGINAL_DARK.placeholderText,
            linkText: cssData.text?.link || HOSTBUDDY_ORIGINAL_DARK.linkText,
            
            // Borders
            primaryBorder: cssData.borders?.primary || HOSTBUDDY_ORIGINAL_DARK.primaryBorder,
            activeBorder: cssData.borders?.active || HOSTBUDDY_ORIGINAL_DARK.activeBorder,
            inactiveBorder: cssData.borders?.inactive || HOSTBUDDY_ORIGINAL_DARK.inactiveBorder,
            subtleBorder: cssData.borders?.subtle || HOSTBUDDY_ORIGINAL_DARK.subtleBorder,
            accentBorder: cssData.borders?.accent || HOSTBUDDY_ORIGINAL_DARK.accentBorder,
            
            // Legacy Interactive Colors (backward compatibility)
            primaryBlue: cssData.buttons?.primary || cssData.legacy?.primary_blue || HOSTBUDDY_ORIGINAL_DARK.primaryBlue,
            primaryBlueHover: cssData.buttons?.primary_hover || cssData.legacy?.primary_blue_hover || HOSTBUDDY_ORIGINAL_DARK.primaryBlueHover,
            lightBlue: cssData.text?.link || cssData.legacy?.light_blue || HOSTBUDDY_ORIGINAL_DARK.lightBlue,
            
            // Action Links
            actionLink: cssData.interactive?.action_link || HOSTBUDDY_ORIGINAL_DARK.actionLink,
            
            // Button Colors (independent from text)
            primaryButtonBg: cssData.buttons?.primary_bg || cssData.buttons?.primary || HOSTBUDDY_ORIGINAL_DARK.primaryButtonBg,
            primaryButtonText: cssData.buttons?.primary_text || HOSTBUDDY_ORIGINAL_DARK.primaryButtonText,
            primaryButtonHover: cssData.buttons?.primary_hover || HOSTBUDDY_ORIGINAL_DARK.primaryButtonHover,
            secondaryButtonBg: cssData.buttons?.secondary_bg || cssData.buttons?.secondary || HOSTBUDDY_ORIGINAL_DARK.secondaryButtonBg,
            secondaryButtonText: cssData.buttons?.secondary_text || HOSTBUDDY_ORIGINAL_DARK.secondaryButtonText,
            secondaryButtonHover: cssData.buttons?.secondary_hover || HOSTBUDDY_ORIGINAL_DARK.secondaryButtonHover,
            outlineButtonBorder: cssData.buttons?.outline_border || HOSTBUDDY_ORIGINAL_DARK.outlineButtonBorder,
            outlineButtonText: cssData.buttons?.outline_text || HOSTBUDDY_ORIGINAL_DARK.outlineButtonText,
            
            // Status & Badge Colors
            statusBadgeBg: cssData.status?.badge_bg || HOSTBUDDY_ORIGINAL_DARK.statusBadgeBg,
            statusBadgeText: cssData.status?.badge_text || HOSTBUDDY_ORIGINAL_DARK.statusBadgeText,
            successGreen: cssData.status?.success || HOSTBUDDY_ORIGINAL_DARK.successGreen,
            currentGreen: cssData.status?.current || HOSTBUDDY_ORIGINAL_DARK.currentGreen,
            onlineGreen: cssData.status?.online || HOSTBUDDY_ORIGINAL_DARK.onlineGreen,
            errorRed: cssData.status?.error || HOSTBUDDY_ORIGINAL_DARK.errorRed,
            offlineRed: cssData.status?.offline || HOSTBUDDY_ORIGINAL_DARK.offlineRed,
            warningOrange: cssData.status?.warning || HOSTBUDDY_ORIGINAL_DARK.warningOrange,
            destructiveRed: cssData.status?.destructive || HOSTBUDDY_ORIGINAL_DARK.destructiveRed,
            
            // Components
            toggleBgOff: cssData.components?.toggle_off || HOSTBUDDY_ORIGINAL_DARK.toggleBgOff,
            cancelButton: cssData.components?.cancel_button || HOSTBUDDY_ORIGINAL_DARK.cancelButton,
            cancelButtonHover: cssData.components?.cancel_hover || HOSTBUDDY_ORIGINAL_DARK.cancelButtonHover,
            dropdownSelect: cssData.components?.dropdown_select || HOSTBUDDY_ORIGINAL_DARK.dropdownSelect,
            tableHeaderBg: cssData.components?.table_header || HOSTBUDDY_ORIGINAL_DARK.tableHeaderBg,
            tableRowHover: cssData.components?.table_row_hover || HOSTBUDDY_ORIGINAL_DARK.tableRowHover,
            
            // Charts & Data Visualization
            chartBarFill: cssData.charts?.bar_fill || HOSTBUDDY_ORIGINAL_DARK.chartBarFill,
            chartGridLines: cssData.charts?.grid_lines || HOSTBUDDY_ORIGINAL_DARK.chartGridLines,
            chartAxisLines: cssData.charts?.axis_lines || HOSTBUDDY_ORIGINAL_DARK.chartAxisLines,
            
            // Shadow & Effects
            cardShadow: cssData.effects?.card_shadow || HOSTBUDDY_ORIGINAL_DARK.cardShadow,
            primaryGlow: cssData.effects?.primary_glow || HOSTBUDDY_ORIGINAL_DARK.primaryGlow,
            buttonGlow: cssData.effects?.button_glow || HOSTBUDDY_ORIGINAL_DARK.buttonGlow,
            toggleGlow: cssData.effects?.toggle_glow || HOSTBUDDY_ORIGINAL_DARK.toggleGlow,
            warningGlow: cssData.effects?.warning_glow || HOSTBUDDY_ORIGINAL_DARK.warningGlow,
            
            // Typography
            headingFont: cssData.typography?.heading || HOSTBUDDY_ORIGINAL_DARK.headingFont,
            bodyFont: cssData.typography?.body || HOSTBUDDY_ORIGINAL_DARK.bodyFont,
          };
          
          setLightModeColors(loadedLightColors);
          
          // Load DARK mode if available
          if (response.data.has_dark_mode && response.data.dark_mode_css_data) {
            const darkCssData = response.data.dark_mode_css_data;
            const loadedDarkColors = {
              // Backgrounds
              primaryBg: darkCssData.background?.primary || HOSTBUDDY_ORIGINAL_DARK.primaryBg,
              secondaryBg: darkCssData.background?.secondary || HOSTBUDDY_ORIGINAL_DARK.secondaryBg,
              cardBg: darkCssData.background?.cards || HOSTBUDDY_ORIGINAL_DARK.cardBg,
              hoverBg: darkCssData.background?.hover || HOSTBUDDY_ORIGINAL_DARK.hoverBg,
              inputBg: darkCssData.background?.input || HOSTBUDDY_ORIGINAL_DARK.inputBg,
              textareaBg: darkCssData.background?.textarea || HOSTBUDDY_ORIGINAL_DARK.textareaBg,
              dropdownBg: darkCssData.background?.dropdown || HOSTBUDDY_ORIGINAL_DARK.dropdownBg,
              modalOverlay: darkCssData.background?.modal_overlay || HOSTBUDDY_ORIGINAL_DARK.modalOverlay,
              sidebarBg: darkCssData.background?.sidebar || HOSTBUDDY_ORIGINAL_DARK.sidebarBg,
              
              // Text
              primaryText: darkCssData.text?.primary || HOSTBUDDY_ORIGINAL_DARK.primaryText,
              secondaryText: darkCssData.text?.secondary || HOSTBUDDY_ORIGINAL_DARK.secondaryText,
              tertiaryText: darkCssData.text?.tertiary || HOSTBUDDY_ORIGINAL_DARK.tertiaryText,
              quaternaryText: darkCssData.text?.quaternary || HOSTBUDDY_ORIGINAL_DARK.quaternaryText,
              disabledText: darkCssData.text?.disabled || HOSTBUDDY_ORIGINAL_DARK.disabledText,
              placeholderText: darkCssData.text?.placeholder || HOSTBUDDY_ORIGINAL_DARK.placeholderText,
              linkText: darkCssData.text?.link || HOSTBUDDY_ORIGINAL_DARK.linkText,
              
              // Borders
              primaryBorder: darkCssData.borders?.primary || HOSTBUDDY_ORIGINAL_DARK.primaryBorder,
              activeBorder: darkCssData.borders?.active || HOSTBUDDY_ORIGINAL_DARK.activeBorder,
              inactiveBorder: darkCssData.borders?.inactive || HOSTBUDDY_ORIGINAL_DARK.inactiveBorder,
              subtleBorder: darkCssData.borders?.subtle || HOSTBUDDY_ORIGINAL_DARK.subtleBorder,
              accentBorder: darkCssData.borders?.accent || HOSTBUDDY_ORIGINAL_DARK.accentBorder,
              
              // Legacy Interactive Colors (backward compatibility)
              primaryBlue: darkCssData.buttons?.primary || darkCssData.legacy?.primary_blue || HOSTBUDDY_ORIGINAL_DARK.primaryBlue,
              primaryBlueHover: darkCssData.buttons?.primary_hover || darkCssData.legacy?.primary_blue_hover || HOSTBUDDY_ORIGINAL_DARK.primaryBlueHover,
              lightBlue: darkCssData.text?.link || darkCssData.legacy?.light_blue || HOSTBUDDY_ORIGINAL_DARK.lightBlue,
              
              // Action Links
              actionLink: darkCssData.interactive?.action_link || HOSTBUDDY_ORIGINAL_DARK.actionLink,
              
              // Button Colors (independent from text)
              primaryButtonBg: darkCssData.buttons?.primary_bg || darkCssData.buttons?.primary || HOSTBUDDY_ORIGINAL_DARK.primaryButtonBg,
              primaryButtonText: darkCssData.buttons?.primary_text || HOSTBUDDY_ORIGINAL_DARK.primaryButtonText,
              primaryButtonHover: darkCssData.buttons?.primary_hover || HOSTBUDDY_ORIGINAL_DARK.primaryButtonHover,
              secondaryButtonBg: darkCssData.buttons?.secondary_bg || darkCssData.buttons?.secondary || HOSTBUDDY_ORIGINAL_DARK.secondaryButtonBg,
              secondaryButtonText: darkCssData.buttons?.secondary_text || HOSTBUDDY_ORIGINAL_DARK.secondaryButtonText,
              secondaryButtonHover: darkCssData.buttons?.secondary_hover || HOSTBUDDY_ORIGINAL_DARK.secondaryButtonHover,
              outlineButtonBorder: darkCssData.buttons?.outline_border || HOSTBUDDY_ORIGINAL_DARK.outlineButtonBorder,
              outlineButtonText: darkCssData.buttons?.outline_text || HOSTBUDDY_ORIGINAL_DARK.outlineButtonText,
              
              // Status & Badge Colors
              statusBadgeBg: darkCssData.status?.badge_bg || HOSTBUDDY_ORIGINAL_DARK.statusBadgeBg,
              statusBadgeText: darkCssData.status?.badge_text || HOSTBUDDY_ORIGINAL_DARK.statusBadgeText,
              successGreen: darkCssData.status?.success || HOSTBUDDY_ORIGINAL_DARK.successGreen,
              currentGreen: darkCssData.status?.current || HOSTBUDDY_ORIGINAL_DARK.currentGreen,
              onlineGreen: darkCssData.status?.online || HOSTBUDDY_ORIGINAL_DARK.onlineGreen,
              errorRed: darkCssData.status?.error || HOSTBUDDY_ORIGINAL_DARK.errorRed,
              offlineRed: darkCssData.status?.offline || HOSTBUDDY_ORIGINAL_DARK.offlineRed,
              warningOrange: darkCssData.status?.warning || HOSTBUDDY_ORIGINAL_DARK.warningOrange,
              destructiveRed: darkCssData.status?.destructive || HOSTBUDDY_ORIGINAL_DARK.destructiveRed,
              
              // Components
              toggleBgOff: darkCssData.components?.toggle_off || HOSTBUDDY_ORIGINAL_DARK.toggleBgOff,
              cancelButton: darkCssData.components?.cancel_button || HOSTBUDDY_ORIGINAL_DARK.cancelButton,
              cancelButtonHover: darkCssData.components?.cancel_hover || HOSTBUDDY_ORIGINAL_DARK.cancelButtonHover,
              dropdownSelect: darkCssData.components?.dropdown_select || HOSTBUDDY_ORIGINAL_DARK.dropdownSelect,
              tableHeaderBg: darkCssData.components?.table_header || HOSTBUDDY_ORIGINAL_DARK.tableHeaderBg,
              tableRowHover: darkCssData.components?.table_row_hover || HOSTBUDDY_ORIGINAL_DARK.tableRowHover,
              
              // Charts & Data Visualization
              chartBarFill: darkCssData.charts?.bar_fill || HOSTBUDDY_ORIGINAL_DARK.chartBarFill,
              chartGridLines: darkCssData.charts?.grid_lines || HOSTBUDDY_ORIGINAL_DARK.chartGridLines,
              chartAxisLines: darkCssData.charts?.axis_lines || HOSTBUDDY_ORIGINAL_DARK.chartAxisLines,
              
              // Shadow & Effects
              cardShadow: darkCssData.effects?.card_shadow || HOSTBUDDY_ORIGINAL_DARK.cardShadow,
              primaryGlow: darkCssData.effects?.primary_glow || HOSTBUDDY_ORIGINAL_DARK.primaryGlow,
              buttonGlow: darkCssData.effects?.button_glow || HOSTBUDDY_ORIGINAL_DARK.buttonGlow,
              toggleGlow: darkCssData.effects?.toggle_glow || HOSTBUDDY_ORIGINAL_DARK.toggleGlow,
              warningGlow: darkCssData.effects?.warning_glow || HOSTBUDDY_ORIGINAL_DARK.warningGlow,
              
              // Typography
              headingFont: darkCssData.typography?.heading || HOSTBUDDY_ORIGINAL_DARK.headingFont,
              bodyFont: darkCssData.typography?.body || HOSTBUDDY_ORIGINAL_DARK.bodyFont,
            };
            setDarkModeColors(loadedDarkColors);
          } else {
            // No dark mode saved, use default dark preset
            setDarkModeColors(HOSTBUDDY_ORIGINAL_DARK);
          }
          
          // Set brandColors based on current editing mode
          if (editingMode === 'light') {
            setBrandColors(loadedLightColors);
          } else {
            setBrandColors(response.data.has_dark_mode ? loadedDarkColors : HOSTBUDDY_ORIGINAL_DARK);
          }
          
          setCurrentPreset('custom');
        } else {
          // No CSS config found, use defaults
          console.log('No CSS config found for domain, using defaults');
        }
      } catch (error) {
        console.error('Error loading CSS config:', error);
        setLoadError('Failed to load CSS configuration');
      } finally {
        setLoading(false);
      }
    };

    loadCssForDomain();
  }, [selectedDomain]);
  
  // Load logos when domain is selected
  useEffect(() => {
    loadLogos();
  }, [selectedDomain]);

  // Convert brandColors to API format
  const convertColorsToApiFormat = () => {
    return {
      background: {
        primary: brandColors.primaryBg,
        secondary: brandColors.secondaryBg,
        cards: brandColors.cardBg,
        hover: brandColors.hoverBg,
        input: brandColors.inputBg,
        textarea: brandColors.textareaBg,
        dropdown: brandColors.dropdownBg,
        modal: brandColors.modalBg,
        modal_overlay: brandColors.modalOverlay,
      },
      text: {
        primary: brandColors.primaryText,
        secondary: brandColors.secondaryText,
        tertiary: brandColors.tertiaryText,
        quaternary: brandColors.quaternaryText,
        placeholder: brandColors.placeholderText,
        link: brandColors.linkText,
        link_hover: brandColors.linkHoverText,
      },
      borders: {
        primary: brandColors.primaryBorder,
        secondary: brandColors.secondaryBorder,
        active: brandColors.activeBorder,
        error: brandColors.errorBorder,
      },
      buttons: {
        primary: brandColors.primaryBlue,
        primary_hover: brandColors.primaryBlueHover,
        light_blue: brandColors.lightBlue,
        secondary: brandColors.secondaryButtonBg,
        secondary_hover: brandColors.secondaryButtonHover,
      },
      status: {
        success: brandColors.successGreen,
        current: brandColors.currentGreen,
        error: brandColors.errorRed,
        warning: brandColors.warningOrange,
        info: brandColors.infoBlue,
      },
      components: {
        toggle_off: brandColors.toggleBgOff,
        cancel_button: brandColors.cancelButton,
        cancel_hover: brandColors.cancelButtonHover,
        dropdown_select: brandColors.dropdownSelect,
        table_header: brandColors.tableHeaderBg,
        table_row_hover: brandColors.tableRowHover,
      },
      typography: {
        heading: brandColors.headingFont,
        body: brandColors.bodyFont,
      }
    };
  };

  // Save CSS configuration
  const handleSave = async () => {
    console.log('Saving CSS configuration for domain:', selectedDomain);
    if (!selectedDomain) {
      setSaveError('Please select a domain');
      return;
    }
    
    if (!domainKey) {
      setSaveError('Please enter the domain key');
      return;
    }
    
    setSaving(true);
    setSaveError('');
    setSaveSuccess('');
    
    try {
      // Convert light mode colors to API format
      const light_css_properties = convertColorsForMode(lightModeColors);
      
      // Convert dark mode colors to API format
      const dark_css_properties = convertColorsForMode(darkModeColors);
      
      const response = await saveCssConfig({
        domain: selectedDomain,
        key: domainKey,
        css_properties: light_css_properties,
        dark_mode_css_properties: dark_css_properties
      });
      
      if (response.success) {
        setSaveSuccess('CSS configuration saved successfully for both light and dark modes!');
        setTimeout(() => setSaveSuccess(''), 3000);
      } else {
        setSaveError(response.error || 'Failed to save CSS configuration');
      }
    } catch (error) {
      console.error('Error saving CSS config:', error);
      setSaveError('An error occurred while saving');
    } finally {
      setSaving(false);
    }
  };
  
  // Helper function to convert any color set to API format
  const convertColorsForMode = (colors) => {
    return {
      background: {
        primary: colors.primaryBg,
        secondary: colors.secondaryBg,
        cards: colors.cardBg,
        hover: colors.hoverBg,
        input: colors.inputBg,
        textarea: colors.textareaBg,
        dropdown: colors.dropdownBg,
        modal_overlay: colors.modalOverlay,
        sidebar: colors.sidebarBg,
      },
      text: {
        primary: colors.primaryText,
        secondary: colors.secondaryText,
        tertiary: colors.tertiaryText,
        quaternary: colors.quaternaryText,
        disabled: colors.disabledText,
        placeholder: colors.placeholderText,
        link: colors.linkText,
      },
      borders: {
        primary: colors.primaryBorder,
        active: colors.activeBorder,
        inactive: colors.inactiveBorder,
        subtle: colors.subtleBorder,
        accent: colors.accentBorder,
      },
      // Store legacy values for backward compatibility
      legacy: {
        primary_blue: colors.primaryBlue,
        primary_blue_hover: colors.primaryBlueHover,
        light_blue: colors.lightBlue,
      },
      interactive: {
        action_link: colors.actionLink,
      },
      buttons: {
        primary_bg: colors.primaryButtonBg,
        primary_text: colors.primaryButtonText,
        primary_hover: colors.primaryButtonHover,
        secondary_bg: colors.secondaryButtonBg,
        secondary_text: colors.secondaryButtonText,
        secondary_hover: colors.secondaryButtonHover,
        outline_border: colors.outlineButtonBorder,
        outline_text: colors.outlineButtonText,
        // Also keep legacy keys for older API versions
        primary: colors.primaryButtonBg,
        primary_hover: colors.primaryButtonHover,
        secondary: colors.secondaryButtonBg,
        secondary_hover: colors.secondaryButtonHover,
      },
      status: {
        badge_bg: colors.statusBadgeBg,
        badge_text: colors.statusBadgeText,
        success: colors.successGreen,
        current: colors.currentGreen,
        online: colors.onlineGreen,
        warning: colors.warningOrange,
        error: colors.errorRed,
        offline: colors.offlineRed,
        destructive: colors.destructiveRed,
      },
      components: {
        toggle_off: colors.toggleBgOff,
        cancel_button: colors.cancelButton,
        cancel_hover: colors.cancelButtonHover,
        dropdown_select: colors.dropdownSelect,
        table_header: colors.tableHeaderBg,
        table_row_hover: colors.tableRowHover,
      },
      charts: {
        bar_fill: colors.chartBarFill,
        grid_lines: colors.chartGridLines,
        axis_lines: colors.chartAxisLines,
      },
      effects: {
        card_shadow: colors.cardShadow,
        primary_glow: colors.primaryGlow,
        button_glow: colors.buttonGlow,
        toggle_glow: colors.toggleGlow,
        warning_glow: colors.warningGlow,
      },
      typography: {
        heading: colors.headingFont,
        body: colors.bodyFont,
      }
    };
  };

  const handlePresetChange = (preset) => {
    setCurrentPreset(preset);
    if (preset === 'hostbuddy-original-dark') {
      setBrandColors(HOSTBUDDY_ORIGINAL_DARK);
    } else if (preset === 'hostbuddy-original-light') {
      setBrandColors(HOSTBUDDY_ORIGINAL_LIGHT);
    }
  };

  const handleColorChange = (key, value) => {
    // Update brandColors for immediate visual feedback
    setBrandColors(prev => ({
      ...prev,
      [key]: value
    }));
    
    // Also update the appropriate mode's configuration
    if (editingMode === 'light') {
      setLightModeColors(prev => ({
        ...prev,
        [key]: value
      }));
    } else {
      setDarkModeColors(prev => ({
        ...prev,
        [key]: value
      }));
    }
    
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
    // Show confirmation dialog
    const confirmed = window.confirm(
      'Are you sure you want to reset all colors to the HostBuddy Original preset? This will discard all your custom color changes.'
    );
    
    if (!confirmed) {
      return; // User cancelled, do nothing
    }
    
    const resetPreset = currentPreset === 'hostbuddy-original-light' ? 'hostbuddy-original-light' : 'hostbuddy-original-dark';
    setCurrentPreset(resetPreset);
    setBrandColors(resetPreset === 'hostbuddy-original-dark' ? HOSTBUDDY_ORIGINAL_DARK : HOSTBUDDY_ORIGINAL_LIGHT);
    
    // Also reset the mode-specific colors
    if (editingMode === 'light') {
      setLightModeColors(HOSTBUDDY_ORIGINAL_LIGHT);
    } else {
      setDarkModeColors(HOSTBUDDY_ORIGINAL_DARK);
    }
  };

  const handleLogoUpload = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/svg+xml,image/png,image/jpeg';
    input.onchange = async (e) => {
      const file = e.target.files?.[0];
      if (file) {
        // Validate file size (max 10MB)
        if (file.size > 10 * 1024 * 1024) {
          setLogoUploadError('Logo file size should not exceed 10MB');
          return;
        }
        
        // Clear any previous messages
        setLogoUploadError('');
        setLogoUploadSuccess('');
        
        // Set file and create preview
        setFullLogoFile(file);
        const reader = new FileReader();
        reader.onload = (e) => {
          setLogoUrl(e.target?.result);
        };
        reader.readAsDataURL(file);
        
        // Upload to backend if domain is selected
        if (selectedDomain) {
          await uploadLogos({ full_logo: file });
        }
      }
    };
    input.click();
  };

  const handleFaviconUpload = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/x-icon,image/png';
    input.onchange = async (e) => {
      const file = e.target.files?.[0];
      if (file) {
        // Validate file size (max 10MB)
        if (file.size > 10 * 1024 * 1024) {
          setLogoUploadError('Favicon file size should not exceed 10MB');
          return;
        }
        
        // Clear any previous messages
        setLogoUploadError('');
        setLogoUploadSuccess('');
        
        // Set file and create preview
        setFaviconFile(file);
        const reader = new FileReader();
        reader.onload = (e) => {
          setFaviconUrl(e.target?.result);
        };
        reader.readAsDataURL(file);
        
        // Upload to backend if domain is selected
        if (selectedDomain) {
          await uploadLogos({ logo: file });
        }
      }
    };
    input.click();
  };
  
  
  // Function to load logos from backend
  const loadLogos = async () => {
    if (!selectedDomain) return;
    
    try {
      const response = await getLogo({ domain: selectedDomain });
      if (response.success && response.data && response.data.logos_available) {
        const logos = response.data.logos_available;
        
        // Set logo URLs if available
        if (logos.full_logo && logos.full_logo.url) {
          setLogoUrl(logos.full_logo.url);
        } else {
          setLogoUrl('');
        }
        
        if (logos.logo && logos.logo.url) {
          setFaviconUrl(logos.logo.url);
        } else {
          setFaviconUrl('');
        }
      } else {
        // No logos available for this domain
        setLogoUrl('');
        setFaviconUrl('');
      }
    } catch (error) {
      console.error('Error loading logos:', error);
      // Don't show error for missing logos, just clear the URLs
      setLogoUrl('');
      setFaviconUrl('');
    }
  };
  
  // Function to upload logos to backend
  const uploadLogos = async ({ logo = null, full_logo = null }) => {
    if (!selectedDomain) {
      setLogoUploadError('Please select a domain first');
      return;
    }
    
    setUploadingLogos(true);
    setLogoUploadError('');
    setLogoUploadSuccess('');
    
    try {
      const result = await uploadCompanyLogo({
        domain: selectedDomain,
        logo: logo || faviconFile,
        full_logo: full_logo || fullLogoFile
      });
      
      if (result.success) {
        setLogoUploadSuccess('Logo uploaded successfully');
        
        // Reload logos to get the updated URLs from backend
        await loadLogos();
      } else {
        setLogoUploadError(result.error || 'Failed to upload logo');
      }
    } catch (error) {
      console.error('Error uploading logo:', error);
      setLogoUploadError('An error occurred while uploading');
    } finally {
      setUploadingLogos(false);
    }
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
              
              {/* Upload Status Messages */}
              {logoUploadError && (
                <div style={{ marginBottom: '12px', padding: '10px', background: '#4C1D1D', border: '1px solid #EF4444', borderRadius: '6px', color: '#FCA5A5', fontSize: '13px' }}>
                  {logoUploadError}
                </div>
              )}
              {logoUploadSuccess && (
                <div style={{ marginBottom: '12px', padding: '10px', background: '#1D4336', border: '1px solid #10B981', borderRadius: '6px', color: '#6EE7B7', fontSize: '13px' }}>
                  {logoUploadSuccess}
                </div>
              )}
              {uploadingLogos && (
                <div style={{ marginBottom: '12px', padding: '10px', background: '#01255E', borderRadius: '6px', color: '#98bffa', fontSize: '13px', textAlign: 'center' }}>
                  Uploading logos...
                </div>
              )}
              
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
                      <p className="upload-sub-text">SVG, PNG or JPG (max. 10MB)</p>
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

              {/* Domain Selection and Key */}
              <div style={{ marginBottom: '24px', padding: '16px', background: '#17191F', borderRadius: '8px', border: '2px solid #013280' }}>
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', marginBottom: '8px', color: '#98bffa', fontSize: '13px', fontWeight: 600, textTransform: 'uppercase' }}>
                    Select Domain
                  </label>
                  {loadingDomains ? (
                    <div style={{ color: '#a6a9b2', fontSize: '14px' }}>Loading domains...</div>
                  ) : domains.length === 0 ? (
                    <div style={{ color: '#EF4444', fontSize: '14px' }}>No domains found. Please create a domain first in the Registration page.</div>
                  ) : (
                    <select
                      value={selectedDomain}
                      onChange={(e) => setSelectedDomain(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        background: '#0F1117',
                        border: '2px solid #013280',
                        borderRadius: '6px',
                        color: '#d0d3db',
                        fontSize: '14px',
                        fontFamily: 'DM Sans, sans-serif',
                        cursor: 'pointer'
                      }}
                    >
                      {domains.map((domain, index) => (
                        <option key={index} value={domain}>
                          {domain}
                        </option>
                      ))}
                    </select>
                  )}
                </div>
                
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', color: '#98bffa', fontSize: '13px', fontWeight: 600, textTransform: 'uppercase' }}>
                    Domain Key
                  </label>
                  <input
                    type="text"
                    value={domainKey}
                    onChange={(e) => setDomainKey(e.target.value)}
                    placeholder="Enter your domain key"
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      background: '#0F1117',
                      border: '2px solid #013280',
                      borderRadius: '6px',
                      color: '#d0d3db',
                      fontSize: '14px',
                      fontFamily: 'DM Sans, sans-serif',
                      outline: 'none'
                    }}
                  />
                  <p style={{ marginTop: '6px', color: '#676a73', fontSize: '12px' }}>Required to save changes to this domain</p>
                </div>
              </div>

              {/* Mode Switcher */}
              <div style={{ marginBottom: '24px', padding: '16px', background: '#17191F', borderRadius: '8px', border: '2px solid #013280' }}>
                <label style={{ display: 'block', marginBottom: '12px', color: '#98bffa', fontSize: '13px', fontWeight: 600, textTransform: 'uppercase' }}>
                  Editing Mode
                </label>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <button
                    onClick={() => {
                      setEditingMode('light');
                      setBrandColors(lightModeColors);
                    }}
                    style={{
                      flex: 1,
                      padding: '10px 16px',
                      background: editingMode === 'light' ? '#3e88f7' : '#0F1117',
                      border: `2px solid ${editingMode === 'light' ? '#3e88f7' : '#013280'}`,
                      borderRadius: '6px',
                      color: editingMode === 'light' ? '#FFFFFF' : '#a6a9b2',
                      fontSize: '14px',
                      fontWeight: 600,
                      cursor: 'pointer',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    ☀️ Light Mode
                  </button>
                  <button
                    onClick={() => {
                      setEditingMode('dark');
                      setBrandColors(darkModeColors);
                    }}
                    style={{
                      flex: 1,
                      padding: '10px 16px',
                      background: editingMode === 'dark' ? '#3e88f7' : '#0F1117',
                      border: `2px solid ${editingMode === 'dark' ? '#3e88f7' : '#013280'}`,
                      borderRadius: '6px',
                      color: editingMode === 'dark' ? '#FFFFFF' : '#a6a9b2',
                      fontSize: '14px',
                      fontWeight: 600,
                      cursor: 'pointer',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    🌙 Dark Mode
                  </button>
                </div>
                <p style={{ marginTop: '8px', color: '#676a73', fontSize: '12px' }}>
                  Currently editing: <strong style={{ color: editingMode === 'light' ? '#F59E0B' : '#8B5CF6' }}>
                    {editingMode === 'light' ? 'Light Mode' : 'Dark Mode'}
                  </strong> colors
                </p>
              </div>

              {/* Loading State Message */}
              {loading && (
                <div style={{ marginBottom: '16px', padding: '12px', background: '#01255E', borderRadius: '6px', color: '#98bffa', fontSize: '14px', textAlign: 'center' }}>
                  Loading CSS configuration for {selectedDomain}...
                </div>
              )}

              {/* Error Messages */}
              {loadError && (
                <div style={{ marginBottom: '16px', padding: '12px', background: '#2D1B1B', borderRadius: '6px', color: '#EF4444', fontSize: '14px', border: '2px solid #EF4444' }}>
                  {loadError}
                </div>
              )}

              {/* Color Groups */}
              <div className="color-groups">
                {/* Background Colors */}
                <div className="color-group">
                  <h4 className="color-group-title">BACKGROUNDS</h4>
                  <div className="color-group-items">
                    <ColorInput label="Primary" value={brandColors.primaryBg} onChange={(v) => handleColorChange('primaryBg', v)} description="Main app background" />
                    <ColorInput label="Secondary" value={brandColors.secondaryBg} onChange={(v) => handleColorChange('secondaryBg', v)} description="Elevated surfaces" />
                    <ColorInput label="Sidebar" value={brandColors.sidebarBg} onChange={(v) => handleColorChange('sidebarBg', v)} description="Sidebar background" />
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
                    <ColorInput label="Link" value={brandColors.linkText} onChange={(v) => handleColorChange('linkText', v)} description="Link text" />
                  </div>
                </div>

                {/* Border Colors */}
                <div className="color-group">
                  <h4 className="color-group-title">BORDERS</h4>
                  <div className="color-group-items">
                    <ColorInput label="Primary" value={brandColors.primaryBorder} onChange={(v) => handleColorChange('primaryBorder', v)} description="Standard borders" />
                    <ColorInput label="Active" value={brandColors.activeBorder} onChange={(v) => handleColorChange('activeBorder', v)} description="Focus & hover" />
                    <ColorInput label="Inactive" value={brandColors.inactiveBorder} onChange={(v) => handleColorChange('inactiveBorder', v)} description="Inactive elements" />
                    <ColorInput label="Subtle" value={brandColors.subtleBorder} onChange={(v) => handleColorChange('subtleBorder', v)} description="Dividers" />
                    <ColorInput label="Accent" value={brandColors.accentBorder} onChange={(v) => handleColorChange('accentBorder', v)} description="Highlighted card borders" />
                  </div>
                </div>

                {/* Button Colors - Primary */}
                <div className="color-group">
                  <h4 className="color-group-title">BUTTONS - PRIMARY</h4>
                  <div className="color-group-items">
                    <ColorInput label="Background" value={brandColors.primaryButtonBg} onChange={(v) => handleColorChange('primaryButtonBg', v)} description="Primary button background" />
                    <ColorInput label="Text" value={brandColors.primaryButtonText} onChange={(v) => handleColorChange('primaryButtonText', v)} description="Primary button text" />
                    <ColorInput label="Hover" value={brandColors.primaryButtonHover} onChange={(v) => handleColorChange('primaryButtonHover', v)} description="Primary hover state" />
                  </div>
                </div>

                {/* Button Colors - Secondary & Outline */}
                <div className="color-group">
                  <h4 className="color-group-title">BUTTONS - SECONDARY & OUTLINE</h4>
                  <div className="color-group-items">
                    <ColorInput label="Secondary Bg" value={brandColors.secondaryButtonBg} onChange={(v) => handleColorChange('secondaryButtonBg', v)} description="Secondary button background" />
                    <ColorInput label="Secondary Text" value={brandColors.secondaryButtonText} onChange={(v) => handleColorChange('secondaryButtonText', v)} description="Secondary button text" />
                    <ColorInput label="Secondary Hover" value={brandColors.secondaryButtonHover} onChange={(v) => handleColorChange('secondaryButtonHover', v)} description="Secondary hover state" />
                    <ColorInput label="Outline Border" value={brandColors.outlineButtonBorder} onChange={(v) => handleColorChange('outlineButtonBorder', v)} description="Outline button border" />
                    <ColorInput label="Outline Text" value={brandColors.outlineButtonText} onChange={(v) => handleColorChange('outlineButtonText', v)} description="Outline button text" />
                    <ColorInput label="Cancel Bg" value={brandColors.cancelButton} onChange={(v) => handleColorChange('cancelButton', v)} description="Cancel button background" />
                    <ColorInput label="Cancel Hover" value={brandColors.cancelButtonHover} onChange={(v) => handleColorChange('cancelButtonHover', v)} description="Cancel hover state" />
                  </div>
                </div>

                {/* Action Links & Interactive */}
                <div className="color-group">
                  <h4 className="color-group-title">LINKS & INTERACTIVE</h4>
                  <div className="color-group-items">
                    <ColorInput label="Action Links" value={brandColors.actionLink} onChange={(v) => handleColorChange('actionLink', v)} description="'See All', 'See more', etc." />
                    <ColorInput label="Primary Blue" value={brandColors.primaryBlue} onChange={(v) => handleColorChange('primaryBlue', v)} description="Brand color (legacy)" />
                    <ColorInput label="Primary Hover" value={brandColors.primaryBlueHover} onChange={(v) => handleColorChange('primaryBlueHover', v)} description="Brand hover (legacy)" />
                    <ColorInput label="Light Blue" value={brandColors.lightBlue} onChange={(v) => handleColorChange('lightBlue', v)} description="Active menu text (legacy)" />
                  </div>
                </div>

                {/* Status & Badge Colors */}
                <div className="color-group">
                  <h4 className="color-group-title">STATUS & BADGES</h4>
                  <div className="color-group-items">
                    <ColorInput label="Badge Bg" value={brandColors.statusBadgeBg} onChange={(v) => handleColorChange('statusBadgeBg', v)} description="Status badge background" />
                    <ColorInput label="Badge Text" value={brandColors.statusBadgeText} onChange={(v) => handleColorChange('statusBadgeText', v)} description="Status badge text" />
                    <ColorInput label="Success" value={brandColors.successGreen} onChange={(v) => handleColorChange('successGreen', v)} description="Success states" />
                    <ColorInput label="Current" value={brandColors.currentGreen} onChange={(v) => handleColorChange('currentGreen', v)} description="Current indicators" />
                    <ColorInput label="Online" value={brandColors.onlineGreen} onChange={(v) => handleColorChange('onlineGreen', v)} description="Online status" />
                    <ColorInput label="Warning" value={brandColors.warningOrange} onChange={(v) => handleColorChange('warningOrange', v)} description="Warning messages" />
                    <ColorInput label="Error" value={brandColors.errorRed} onChange={(v) => handleColorChange('errorRed', v)} description="Error states" />
                    <ColorInput label="Offline" value={brandColors.offlineRed} onChange={(v) => handleColorChange('offlineRed', v)} description="Offline status" />
                    <ColorInput label="Destructive" value={brandColors.destructiveRed} onChange={(v) => handleColorChange('destructiveRed', v)} description="Delete actions" />
                  </div>
                </div>

                {/* Component Colors */}
                <div className="color-group">
                  <h4 className="color-group-title">COMPONENTS</h4>
                  <div className="color-group-items">
                    <ColorInput label="Toggle Off" value={brandColors.toggleBgOff} onChange={(v) => handleColorChange('toggleBgOff', v)} description="Disabled toggles" />
                    <ColorInput label="Dropdown Text" value={brandColors.dropdownSelect} onChange={(v) => handleColorChange('dropdownSelect', v)} description="Dropdown selected text" />
                    <ColorInput label="Table Header" value={brandColors.tableHeaderBg} onChange={(v) => handleColorChange('tableHeaderBg', v)} description="Table headers" />
                    <ColorInput label="Table Row Hover" value={brandColors.tableRowHover} onChange={(v) => handleColorChange('tableRowHover', v)} description="Table hover" />
                  </div>
                </div>

                {/* Charts & Data Visualization */}
                <div className="color-group">
                  <h4 className="color-group-title">CHARTS & DATA</h4>
                  <div className="color-group-items">
                    <ColorInput label="Bar Fill" value={brandColors.chartBarFill} onChange={(v) => handleColorChange('chartBarFill', v)} description="Chart bar color" />
                    <ColorInput label="Grid Lines" value={brandColors.chartGridLines} onChange={(v) => handleColorChange('chartGridLines', v)} description="Chart grid lines" />
                    <ColorInput label="Axis Lines" value={brandColors.chartAxisLines} onChange={(v) => handleColorChange('chartAxisLines', v)} description="Chart axis lines" />
                  </div>
                </div>

                {/* Save Success Messages */}
                {saveSuccess && (
                  <div style={{ marginBottom: '16px', padding: '12px', background: '#1B2D1B', borderRadius: '6px', color: '#10B981', fontSize: '14px', border: '2px solid #10B981' }}>
                    {saveSuccess}
                  </div>
                )}

                {/* Save Error Messages */}
                {saveError && (
                  <div style={{ marginBottom: '16px', padding: '12px', background: '#2D1B1B', borderRadius: '6px', color: '#EF4444', fontSize: '14px', border: '2px solid #EF4444' }}>
                    {saveError}
                  </div>
                )}

                {/* Action Buttons */}
                <div className="action-buttons">
                  {/* Currently there is only one save functionality, so no need for three separate buttons
                  <button className="action-button action-button-save" onClick={handleSave} disabled={saving || !selectedDomain || !domainKey}>
                    <SaveIcon className="button-icon" size={16} />
                    {saving ? 'Saving...' : 'Save'}
                  </button>
                  <button className="action-button action-button-preview">
                    <EyeIcon className="button-icon" size={16} />
                    Preview in Sandbox
                  </button>
                  */}
                  <button className="action-button action-button-publish" onClick={handleSave}>
                    {saving ? 'Publishing...' : 'Save And Publish Changes'}
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
              {/* Status Indicator
              <div className="preview-status">
                <div className="preview-status-dot"></div>
                <span className="preview-status-text">LIVE</span>
              </div>
              */}
            </div>

            {/* Preview Content */}
            <div className="preview-content">
              {/* Simulated Sidebar */}
              <div 
                className={`preview-sidebar ${sidebarCollapsed ? 'collapsed' : ''}`}
                style={{ 
                  backgroundColor: brandColors.secondaryBg, 
                  borderColor: brandColors.primaryBorder,
                  width: sidebarCollapsed ? '64px' : '180px',
                  transition: 'width 0.3s ease'
                }}
              >
                <div className="preview-sidebar-content">
                  {/* Logo Area */}
                  <div className="preview-logo-area" style={{ marginBottom: sidebarCollapsed ? '24px' : '16px' }}>
                    {!sidebarCollapsed && logoUrl ? (
                      <img src={logoUrl} alt="Logo" className="preview-logo-image" />
                    ) : !sidebarCollapsed ? (
                      <div className="preview-logo-placeholder" style={{ backgroundColor: brandColors.primaryBg, color: brandColors.tertiaryText, borderColor: brandColors.primaryBorder }}>
                        Your Logo
                      </div>
                    ) : faviconUrl ? (
                      <img src={faviconUrl} alt="Favicon" style={{ width: '32px', height: '32px', borderRadius: '4px', objectFit: 'contain' }} />
                    ) : (
                      <div style={{ width: '32px', height: '32px', borderRadius: '4px', backgroundColor: brandColors.primaryBlue, display: 'flex', alignItems: 'center', justifyContent: 'center', color: brandColors.primaryText, fontWeight: '600', fontSize: '14px' }}>
                        HB
                      </div>
                    )}
                  </div>

                  {/* Menu Items */}
                  <div className="preview-menu">
                    {[
                      { id: 'dashboard', label: 'Dashboard', icon: dashboardIcon },
                      { id: 'properties', label: 'Properties', icon: propertiesIcon },
                      { id: 'messaging', label: 'Messaging', icon: messagingIcon },
                      { id: 'action-items', label: 'Action Items', icon: actionItemsIcon },
                      { id: 'insights', label: 'Insights', icon: insightsIcon },
                      { id: 'settings', label: 'Settings', icon: settingsIcon }
                    ].map(item => (
                      <button
                        key={item.id}
                        onClick={() => setPreviewPage(item.id)}
                        className="preview-menu-item"
                        style={{
                          backgroundColor: previewPage === item.id ? brandColors.hoverBg : 'transparent',
                          color: previewPage === item.id ? brandColors.lightBlue : brandColors.tertiaryText,
                          justifyContent: sidebarCollapsed ? 'center' : 'flex-start',
                          padding: sidebarCollapsed ? '12px 0' : '12px 16px',
                          position: 'relative'
                        }}
                        title={sidebarCollapsed ? item.label : ''}
                      >
                        {previewPage === item.id && (
                          <div 
                            className="preview-menu-indicator"
                            style={{ 
                              backgroundColor: brandColors.primaryBlue,
                              position: 'absolute',
                              left: 0,
                              top: sidebarCollapsed ? 0 : '50%',
                              bottom: sidebarCollapsed ? 0 : 'auto',
                              height: sidebarCollapsed ? '100%' : '14px',
                              transform: sidebarCollapsed ? 'none' : 'translateY(-50%)',
                              width: '3px',
                              borderRadius: '0 2px 2px 0'
                            }} 
                          />
                        )}
                        {sidebarCollapsed ? (
                          <img 
                            src={item.icon} 
                            alt={item.label}
                            style={{ 
                              width: '20px', 
                              height: '20px',
                              filter: previewPage === item.id ? 'none' : 'brightness(0.7)'
                            }}
                          />
                        ) : (
                          item.label
                        )}
                      </button>
                    ))}
                  </div>

                  {/* Spacer to push collapse button to bottom */}
                  <div style={{ flex: 1 }} />

                  {/* Collapse/Expand Button */}
                  <div className="preview-sidebar-collapse-btn-container">
                    <button
                      className="preview-sidebar-collapse-btn"
                      onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                      style={{
                        backgroundColor: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        padding: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '100%',
                        color: brandColors.tertiaryText
                      }}
                      title={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
                    >
                      <img 
                        src={sidebarCollapsed ? chevronRightDouble : chevronLeftDouble}
                        alt={sidebarCollapsed ? 'Expand' : 'Collapse'}
                        style={{ width: '20px', height: '20px' }}
                      />
                    </button>
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