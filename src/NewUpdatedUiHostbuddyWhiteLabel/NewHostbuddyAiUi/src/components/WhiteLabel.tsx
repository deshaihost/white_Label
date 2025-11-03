import { useState } from 'react';
import { Upload, RefreshCw, Eye, Save, Check, Image, Home, MessageSquare, ListTodo, BarChart3, Settings, Mail, Calendar, Clock, MoreVertical, Search, Star, ThumbsUp, ThumbsDown, Smile, Building2, FileText, Sparkles, DollarSign, Zap, Activity, Grid3x3, Package, ExternalLink, Lock, Copy } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from 'recharts';
import ChatList from '../imports/ChatList';
import Header from '../imports/Header';
import ChatHeader from '../imports/ChatHeader';
import ChatBox from '../imports/ChatBox';
import TextArea from '../imports/TextArea';
import { CompleteButton } from './CompleteButton';
import APIDocumentationModal from './APIDocumentationModal';
import hostbuddyFavicon from 'figma:asset/e6e16c6cdcd8747d7b61a791104aa364352ecb46.png';
import { showSaveSuccess } from './useSaveNotification';

type PresetType = 'hostbuddy-original-dark' | 'hostbuddy-original-light' | 'custom';

interface BrandColors {
  // Background Colors (9 properties)
  primaryBg: string;
  secondaryBg: string;
  cardBg: string;
  hoverBg: string;
  inputBg: string;
  textareaBg: string;
  dropdownBg: string;
  modalOverlay: string;
  sidebarBg: string; // NEW: Dedicated sidebar background
  
  // Text Colors (7 properties)
  primaryText: string;
  secondaryText: string;
  tertiaryText: string;
  quaternaryText: string;
  disabledText: string;
  placeholderText: string;
  linkText: string; // NEW: Dedicated link text color
  
  // Border Colors (4 properties)
  primaryBorder: string;
  activeBorder: string;
  inactiveBorder: string;
  subtleBorder: string; // NEW: For very subtle dividers
  
  // Interactive Colors (5 properties)
  primaryBlue: string;
  primaryBlueHover: string;
  lightBlue: string;
  secondaryButtonBg: string;
  secondaryButtonHover: string;
  
  // Status Colors (5 properties)
  successGreen: string;
  currentGreen: string;
  warningOrange: string;
  errorRed: string;
  destructiveRed: string;
  
  // Component Colors (6 properties)
  toggleBgOff: string;
  cancelButton: string;
  cancelButtonHover: string;
  dropdownSelect: string;
  tableHeaderBg: string;
  tableRowHover: string;
  
  // Shadow & Effects (5 properties)
  cardShadow: string;
  primaryGlow: string;
  buttonGlow: string;
  toggleGlow: string;
  warningGlow: string;
  
  // Branding Assets (1 property)
  faviconUrl: string;
  
  // Typography (2 properties)
  headingFont: string;
  bodyFont: string;
}

// Total: 9 + 7 + 4 + 5 + 5 + 6 + 5 + 1 + 2 = 44 properties

// HostBuddy Original Dark - Uses EXACT approved colors from 62-color palette
const HOSTBUDDY_ORIGINAL_DARK: BrandColors = {
  // Background Colors - All from approved Neutral palette
  primaryBg: '#0F1117',      // Neutral-1100 (Primary app background)
  secondaryBg: '#17191F',    // Neutral-1000 (Secondary backgrounds)
  cardBg: '#24262E',         // Neutral-900 (Card backgrounds)
  hoverBg: '#01255E',        // Brand-1000 (Hover states)
  inputBg: '#0F1117',        // Neutral-1100 (Input fields)
  textareaBg: '#01255E',     // Brand-1000 (Textarea backgrounds)
  dropdownBg: '#01255E',     // Brand-1000 (Dropdown menus)
  modalOverlay: 'rgba(0, 0, 0, 0.6)', // Standard overlay
  sidebarBg: '#17191F',      // Neutral-1000 (Sidebar background)
  
  // Text Colors - All from approved Neutral palette
  primaryText: '#FFFFFF',    // Neutral-0 (Headings, labels)
  secondaryText: '#D0D3DB',  // Neutral-200 (Body text)
  tertiaryText: '#A6A9B2',   // Neutral-400 (Muted text)
  quaternaryText: '#676A73', // Neutral-600 (Inactive text)
  disabledText: '#4A4D54',   // Neutral-700 (Disabled states)
  placeholderText: '#8A8E98', // Neutral-500 (Placeholders)
  linkText: '#98BFFA',       // Brand-300 (Link text)
  
  // Border Colors - All from approved Brand palette
  primaryBorder: '#013280',  // Brand-900 (Primary borders)
  activeBorder: '#3E88F7',   // Brand-500 (Active/focus borders)
  inactiveBorder: '#013280', // Brand-900 (Inactive borders)
  subtleBorder: '#24262E',   // Neutral-900 (Subtle dividers)
  
  // Interactive Colors - All from approved Brand palette
  primaryBlue: '#3E88F7',    // Brand-500 (Primary brand color)
  primaryBlueHover: '#74A9F7', // Brand-400 (Primary hover)
  lightBlue: '#98BFFA',      // Brand-300 (Secondary highlights)
  secondaryButtonBg: '#01255E', // Brand-1000 (Secondary buttons)
  secondaryButtonHover: '#013280', // Brand-900 (Secondary hover)
  
  // Status Colors - All from approved palettes
  successGreen: '#10B981',   // Green-500 (Success states)
  currentGreen: '#4ADE80',   // Green-400 (Current indicators)
  warningOrange: '#FB923C',  // Orange-400 (Warnings)
  errorRed: '#EF4444',       // Red-500 (Error states)
  destructiveRed: '#D4183D', // Red-700 (Delete actions)
  
  // Component Colors - All from approved palettes
  toggleBgOff: '#676A73',    // Neutral-600 (Disabled toggles)
  cancelButton: '#4A4D54',   // Neutral-700 (Cancel buttons)
  cancelButtonHover: '#676A73', // Neutral-600 (Cancel hover)
  dropdownSelect: '#A6A9B2', // Neutral-400 (Dropdown text)
  tableHeaderBg: '#0F1117',  // Neutral-1100 (Table headers)
  tableRowHover: '#01255E',  // Brand-1000 (Table row hover)
  
  // Shadow & Effects - All use approved base colors
  cardShadow: '0 0 25px rgba(1, 50, 128, 0.2)', // Brand-900 based
  primaryGlow: '0 0 15px rgba(62, 136, 247, 0.3)', // Brand-500 based
  buttonGlow: '0 0 20px rgba(62, 136, 247, 0.25)', // Brand-500 based
  toggleGlow: '0 0 12px rgba(62, 136, 247, 0.4)', // Brand-500 based
  warningGlow: '0 0 8px rgba(251, 146, 60, 0.4)', // Orange-400 based
  
  // Branding Assets
  faviconUrl: hostbuddyFavicon, // HostBuddy favicon
  
  // Typography
  headingFont: 'Poppins',
  bodyFont: 'DM Sans',
};

// HostBuddy Original Light - Premium light mode with excellent contrast and modern aesthetics
const HOSTBUDDY_ORIGINAL_LIGHT: BrandColors = {
  // Background Colors - Sophisticated layered backgrounds
  primaryBg: '#F5F7FA',      // Soft neutral gray (Main app background)
  secondaryBg: '#FFFFFF',    // Pure white (Elevated surfaces)
  cardBg: '#FFFFFF',         // Pure white (Card backgrounds)
  hoverBg: '#EBF2FE',        // Very light blue (Hover states - noticeable but subtle)
  inputBg: '#FFFFFF',        // Pure white (Input fields)
  textareaBg: '#FFFFFF',     // Pure white (Textarea backgrounds)
  dropdownBg: '#FFFFFF',     // Pure white (Dropdown menus)
  modalOverlay: 'rgba(15, 17, 23, 0.6)', // Dark overlay with good contrast
  sidebarBg: '#FFFFFF',      // Pure white (Sidebar background)
  
  // Text Colors - Excellent readability and hierarchy
  primaryText: '#111827',    // Near black (Headings - maximum contrast)
  secondaryText: '#1F2937',  // Dark gray (Body text - excellent readability)
  tertiaryText: '#6B7280',   // Medium gray (Muted text - clear hierarchy)
  quaternaryText: '#9CA3AF', // Light gray (Very muted text)
  disabledText: '#D1D5DB',   // Very light gray (Disabled states)
  placeholderText: '#9CA3AF', // Light gray (Placeholders)
  linkText: '#3E88F7',       // Brand blue (Link text - accessible and on-brand)
  
  // Border Colors - Clear definition with subtle elegance
  primaryBorder: '#E5E7EB',  // Light gray (Primary borders - visible but not harsh)
  activeBorder: '#3E88F7',   // Brand blue (Active/focus borders)
  inactiveBorder: '#F3F4F6', // Very light gray (Inactive borders)
  subtleBorder: '#F9FAFB',   // Ultra light gray (Subtle dividers)
  
  // Interactive Colors - Vibrant and accessible
  primaryBlue: '#3E88F7',    // Brand blue (Primary actions)
  primaryBlueHover: '#2563EB', // Deeper blue (Hover - strong visual feedback)
  lightBlue: '#60A5FA',      // Light blue (Secondary highlights)
  secondaryButtonBg: '#F3F4F6', // Light gray (Secondary buttons)
  secondaryButtonHover: '#E5E7EB', // Medium gray (Secondary hover)
  
  // Status Colors - High contrast and accessible
  successGreen: '#059669',   // Emerald-600 (Success - stronger presence)
  currentGreen: '#10B981',   // Emerald-500 (Current indicators)
  warningOrange: '#EA580C',  // Orange-600 (Warnings - high visibility)
  errorRed: '#DC2626',       // Red-600 (Error states - clear and strong)
  destructiveRed: '#B91C1C', // Red-700 (Delete actions - maximum severity)
  
  // Component Colors - Modern and cohesive
  toggleBgOff: '#D1D5DB',    // Gray-300 (Disabled toggles - clear off state)
  cancelButton: '#F3F4F6',   // Gray-100 (Cancel buttons)
  cancelButtonHover: '#E5E7EB', // Gray-200 (Cancel hover)
  dropdownSelect: '#111827', // Near black (Dropdown text - strong contrast)
  tableHeaderBg: '#F9FAFB',  // Gray-50 (Table headers - subtle differentiation)
  tableRowHover: '#F3F4F6',  // Gray-100 (Table row hover - clear interaction)
  
  // Shadow & Effects - Sophisticated depth and elevation
  cardShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)', // Tailwind-inspired shadow
  primaryGlow: '0 0 0 3px rgba(62, 136, 247, 0.15)', // Focus ring with better visibility
  buttonGlow: '0 4px 12px rgba(62, 136, 247, 0.2)', // Elevated button shadow
  toggleGlow: '0 0 0 4px rgba(62, 136, 247, 0.15)', // Toggle focus ring
  warningGlow: '0 0 0 3px rgba(234, 88, 12, 0.15)', // Warning focus ring
  
  // Branding Assets
  faviconUrl: hostbuddyFavicon, // HostBuddy favicon
  
  // Typography
  headingFont: 'Poppins',
  bodyFont: 'DM Sans',
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

type PreviewPage = 'dashboard' | 'properties' | 'messaging' | 'actionitems' | 'insights' | 'settings';

// Preview Components
function DashboardPreview({ brandColors }: { brandColors: BrandColors }) {
  const chartData = [
    { hour: '12am', value: 2 }, { hour: '1am', value: 1 }, { hour: '2am', value: 1 }, { hour: '3am', value: 1 },
    { hour: '4am', value: 1 }, { hour: '5am', value: 3 }, { hour: '6am', value: 4 }, { hour: '7am', value: 8 },
    { hour: '8am', value: 12 }, { hour: '9am', value: 10 }, { hour: '10am', value: 9 }, { hour: '11am', value: 10 },
    { hour: '12pm', value: 8 }, { hour: '1pm', value: 7 }, { hour: '2pm', value: 15 }, { hour: '3pm', value: 11 },
    { hour: '4pm', value: 9 }, { hour: '5pm', value: 8 }, { hour: '6pm', value: 10 }, { hour: '7pm', value: 9 },
    { hour: '8pm', value: 7 }, { hour: '9pm', value: 6 }, { hour: '10pm', value: 4 }, { hour: '11pm', value: 3 },
  ];

  return (
    <>
      <h1 
        className="text-[32px] font-['DM_Sans:Bold',_sans-serif] mb-6"
        style={{ fontVariationSettings: "'opsz' 14", color: brandColors.primaryText }}
      >
        Dashboard
      </h1>

      {/* Welcome Banner */}
      <div className="border rounded-lg p-4 mb-6" style={{ backgroundColor: brandColors.hoverBg, borderColor: brandColors.primaryBorder }}>
        <div className="flex justify-between items-center">
          <p 
            className="text-[14px] font-['DM_Sans:Medium',_sans-serif]"
            style={{ fontVariationSettings: "'opsz' 14", color: brandColors.primaryBlue }}
          >
            Welcome to HostBuddy, Sam
          </p>
          <button 
            className="text-[14px] font-['DM_Sans:SemiBold',_sans-serif] transition-colors underline"
            style={{ 
              fontVariationSettings: "'opsz' 14",
              textDecoration: 'underline',
              color: brandColors.primaryBlue
            }}
            onMouseEnter={(e) => e.currentTarget.style.color = brandColors.lightBlue}
            onMouseLeave={(e) => e.currentTarget.style.color = brandColors.primaryBlue}
          >
            New to HostBuddy? Get Started →
          </button>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-3 gap-5 mb-6">
        {[
          { title: 'Guest Messages Responded (Total)', value: '513', stats: [['By Host:', '513'], [`By ${brandingName}:`, '2042']] },
          { title: 'Average Response Times (Minutes)', value: '0.5', stats: [[`By ${brandingName}:`, '0.5'], ['By Host:', '18.1']] },
          { title: 'Guest Sentiment (Percent)', value: '33.2%', stats: [['Positive:', '33.2%'], ['Neutral:', '58.6%'], ['Negative:', '7.0%']] }
        ].map((card, idx) => (
          <div 
            key={idx}
            className="border-2 rounded-xl p-6"
            style={{ backgroundColor: brandColors.secondaryBg, borderColor: brandColors.primaryBorder, boxShadow: brandColors.cardShadow }}
          >
            <h3 
              className="text-[14px] font-['DM_Sans:SemiBold',_sans-serif] mb-4"
              style={{ fontVariationSettings: "'opsz' 14", color: brandColors.tertiaryText }}
            >
              {card.title}
            </h3>
            <p 
              className="text-[36px] font-['DM_Sans:Bold',_sans-serif] mb-4"
              style={{ fontVariationSettings: "'opsz' 14", color: brandColors.primaryText }}
            >
              {card.value}
            </p>
            <div className="space-y-2">
              {card.stats.map((stat, i) => (
                <div key={i} className="flex items-center justify-between">
                  <span className="text-[13px] font-['DM_Sans:Regular',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14", color: brandColors.tertiaryText }}>{stat[0]}</span>
                  <span className="text-[13px] font-['DM_Sans:SemiBold',_sans-serif] tabular-nums" style={{ fontVariationSettings: "'opsz' 14", color: brandColors.primaryText }}>{stat[1]}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Chart */}
      <div className="border-2 rounded-xl p-6 mb-6" style={{ backgroundColor: brandColors.secondaryBg, borderColor: brandColors.primaryBorder, boxShadow: brandColors.cardShadow }}>
        <h3 className="text-[14px] font-['DM_Sans:SemiBold',_sans-serif] mb-4" style={{ fontVariationSettings: "'opsz' 14", color: brandColors.primaryText }}>
          Timing of messages received (by hour of day - average)
        </h3>
        <div className="h-[240px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke={brandColors.primaryBorder} vertical={false} />
              <XAxis
                dataKey="hour"
                stroke={brandColors.tertiaryText}
                tick={{ fill: brandColors.tertiaryText, fontSize: 12 }}
                axisLine={{ stroke: brandColors.primaryBorder }}
              />
              <YAxis
                stroke={brandColors.tertiaryText}
                tick={{ fill: brandColors.tertiaryText, fontSize: 12 }}
                axisLine={{ stroke: brandColors.primaryBorder }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: brandColors.secondaryBg, 
                  border: `1px solid ${brandColors.primaryBorder}`,
                  borderRadius: '8px',
                  color: brandColors.primaryText
                }}
              />
              <Bar dataKey="value" fill={brandColors.primaryBlue} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 text-center">
          <p className="text-[12px] font-['DM_Sans:Regular',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14", color: brandColors.tertiaryText }}>
            Above data from Sep 11, 2025 to Oct 13, 2025
          </p>
          <button className="text-[12px] font-['DM_Sans:SemiBold',_sans-serif] mt-1" style={{ fontVariationSettings: "'opsz' 14", color: brandColors.primaryBlue, textDecoration: 'underline' }}>
            See more statistics
          </button>
        </div>
      </div>

      {/* Action Items Table */}
      <div className="border-2 rounded-xl overflow-hidden" style={{ backgroundColor: brandColors.secondaryBg, borderColor: brandColors.primaryBorder, boxShadow: brandColors.cardShadow }}>
        <div className="p-6 pb-4 flex justify-between items-center border-b" style={{ borderColor: brandColors.primaryBorder }}>
          <h3 className="text-[16px] font-['DM_Sans:SemiBold',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14", color: brandColors.primaryText }}>
            Incomplete Action Items <span className="text-[14px] font-['DM_Sans:Regular',_sans-serif]" style={{ color: brandColors.tertiaryText }}>(Most Recent)</span>
          </h3>
          <button className="text-[14px] font-['DM_Sans:Medium',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14", color: brandColors.primaryBlue }}>
            See All
          </button>
        </div>

        {/* Table Header */}
        <div className="grid grid-cols-[100px_200px_1fr_80px] gap-4 px-6 py-3 border-b" style={{ backgroundColor: brandColors.primaryBg, borderColor: brandColors.primaryBorder }}>
          <p className="text-[12px] font-['DM_Sans:SemiBold',_sans-serif] uppercase" style={{ fontVariationSettings: "'opsz' 14", color: brandColors.tertiaryText }}>Date/Time</p>
          <p className="text-[12px] font-['DM_Sans:SemiBold',_sans-serif] uppercase" style={{ fontVariationSettings: "'opsz' 14", color: brandColors.tertiaryText }}>Property/Guest</p>
          <p className="text-[12px] font-['DM_Sans:SemiBold',_sans-serif] uppercase" style={{ fontVariationSettings: "'opsz' 14", color: brandColors.tertiaryText }}>Action Item</p>
          <p className="text-[12px] font-['DM_Sans:SemiBold',_sans-serif] uppercase text-center" style={{ fontVariationSettings: "'opsz' 14", color: brandColors.tertiaryText }}>Complete</p>
        </div>

        {/* Table Rows */}
        {[
          { date: '10/17', time: '4:32 PM', property: 'Boho Villa', guest: 'Brolin Cox', action: 'HostBuddy suggested to send check-out time', completed: false },
          { date: '10/17', time: '3:47 PM', property: 'Modern Villa', guest: 'Sophia Lee', action: 'Guest asked about early check-in', completed: false },
          { date: '10/17', time: '2:15 PM', property: 'OASIS VILLA', guest: 'Marcus Johnson', action: 'Follow up on parking inquiry', completed: false }
        ].map((item, idx) => (
          <div
            key={idx}
            className="grid grid-cols-[100px_200px_1fr_80px] gap-4 px-6 py-4 border-b last:border-b-0 transition-colors"
            style={{ borderColor: brandColors.primaryBorder }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = brandColors.hoverBg}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            <div>
              <p className="text-[14px] font-['DM_Sans:Medium',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14", color: brandColors.primaryText }}>{item.date}</p>
              <p className="text-[12px] font-['DM_Sans:Regular',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14", color: brandColors.tertiaryText }}>{item.time}</p>
            </div>
            <div>
              <p className="text-[14px] font-['DM_Sans:Medium',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14", color: brandColors.primaryText }}>{item.property}</p>
              <p className="text-[12px] font-['DM_Sans:Regular',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14", color: brandColors.tertiaryText }}>{item.guest}</p>
            </div>
            <p className="text-[14px] font-['DM_Sans:Regular',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14", color: brandColors.primaryText }}>{item.action}</p>
            <div className="flex justify-center items-center">
              <CompleteButton 
                completed={item.completed}
                onClick={() => {}}
              />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

function PropertiesPreview({ brandColors }: { brandColors: BrandColors }) {
  const properties = [
    { 
      name: 'Boho Villa | Best Location | Full Staff', 
      status: 'RESPONDING',
      statusText: 'Currently RESPONDING to all guests',
      image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjB2aWxsYXxlbnwxfHx8fDE3NjA3NDE4ODV8MA&ixlib=rb-4.1.0&q=80&w=1080'
    },
    { 
      name: 'Modern Villa | Best Location | Full Staff | Cinema', 
      status: 'OFF',
      statusText: 'Currently Off (until scheduled ON)',
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBob3VzZSUyMGV4dGVyaW9yfGVufDF8fHx8MTc2MDY5ODE0MHww&ixlib=rb-4.1.0&q=80&w=1080'
    },
    { 
      name: 'OASIS VILLA • PRIME Location • FULL STAFF • Cinema', 
      status: 'OFF',
      statusText: 'Currently Off (until scheduled ON)',
      image: 'https://images.unsplash.com/photo-1482192505345-5655af888cc4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMGNhYmlufGVufDF8fHx8MTc2MDcxNTMwMXww&ixlib=rb-4.1.0&q=80&w=1080'
    },
    { 
      name: 'PRIME Location FREE Parking Secured Residence', 
      status: 'OFF',
      statusText: 'Currently Off (until scheduled ON)',
      image: 'https://images.unsplash.com/photo-1515263487990-61b07816b324?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcGFydG1lbnQlMjBidWlsZGluZ3xlbnwxfHx8fDE3NjA2OTU5NzV8MA&ixlib=rb-4.1.0&q=80&w=1080'
    },
  ];

  return (
    <>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 
          className="text-[28px] font-['DM_Sans:Bold',_sans-serif]"
          style={{ fontVariationSettings: "'opsz' 14", color: brandColors.primaryBlue }}
        >
          Properties
        </h1>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-4 py-2 rounded-lg border-2" style={{ borderColor: brandColors.primaryBorder, backgroundColor: brandColors.secondaryBg }}>
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: brandColors.successGreen, boxShadow: '0 0 8px rgba(16, 185, 129, 0.6)' }} />
            <span className="text-[13px] font-['DM_Sans:Medium',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14", color: brandColors.secondaryText }}>
              HostBuddy Status
            </span>
          </div>
          <button 
            className="px-5 py-2 rounded-lg text-[13px] font-['DM_Sans:SemiBold',_sans-serif] transition-all uppercase tracking-wide"
            style={{ 
              fontVariationSettings: "'opsz' 14",
              backgroundColor: brandColors.primaryBlue,
              color: brandColors.primaryText,
              boxShadow: brandColors.buttonGlow
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = brandColors.primaryBlueHover}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = brandColors.primaryBlue}
          >
            STOP ALL
          </button>
        </div>
      </div>

      {/* Action Cards */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="border-2 rounded-lg p-5" style={{ borderColor: brandColors.activeBorder, backgroundColor: brandColors.secondaryBg }}>
          <h3 className="text-[16px] font-['DM_Sans:SemiBold',_sans-serif] mb-2" style={{ fontVariationSettings: "'opsz' 14", color: brandColors.primaryBlue }}>
            Import Properties
          </h3>
          <p className="text-[13px] font-['DM_Sans:Regular',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14", color: brandColors.tertiaryText }}>
            Connected to Beds24. Click to import your properties.
          </p>
        </div>
        <div className="border-2 rounded-lg p-5" style={{ borderColor: brandColors.activeBorder, backgroundColor: brandColors.secondaryBg }}>
          <h3 className="text-[16px] font-['DM_Sans:SemiBold',_sans-serif] mb-2" style={{ fontVariationSettings: "'opsz' 14", color: brandColors.primaryBlue }}>
            Subscribe
          </h3>
          <p className="text-[13px] font-['DM_Sans:Regular',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14", color: brandColors.tertiaryText }}>
            Get HostBuddy plugged in to your guest communication.
          </p>
        </div>
      </div>

      {/* Property List */}
      <div className="space-y-3">
        {properties.map((property, idx) => (
          <div 
            key={idx}
            className="border-2 rounded-lg p-4 transition-all"
            style={{ 
              backgroundColor: brandColors.secondaryBg, 
              borderColor: brandColors.primaryBorder,
              boxShadow: brandColors.cardShadow 
            }}
          >
            <div className="flex items-center gap-4">
              {/* Property Image */}
              <img 
                src={property.image} 
                alt={property.name}
                className="w-16 h-16 rounded object-cover flex-shrink-0"
              />
              
              {/* Property Info */}
              <div className="flex-1 min-w-0">
                <h3 className="text-[14px] font-['DM_Sans:SemiBold',_sans-serif] mb-2" style={{ fontVariationSettings: "'opsz' 14", color: brandColors.primaryText }}>
                  {property.name}
                </h3>
                <div className="flex items-center gap-3 mb-1">
                  <button 
                    className="px-2.5 py-1 rounded text-[11px] font-['DM_Sans:SemiBold',_sans-serif] uppercase tracking-wide transition-colors"
                    style={{ 
                      fontVariationSettings: "'opsz' 14",
                      backgroundColor: brandColors.primaryBlue,
                      color: brandColors.primaryText
                    }}
                  >
                    STOP
                  </button>
                  <button className="flex items-center gap-1.5 text-[12px] font-['DM_Sans:Medium',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14", color: brandColors.primaryBlue }}>
                    <Clock className="w-3.5 h-3.5" />
                    Schedule
                  </button>
                </div>
                <p className="text-[12px] font-['DM_Sans:Regular',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14", color: property.status === 'RESPONDING' ? brandColors.successGreen : brandColors.errorRed }}>
                  {property.statusText}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 flex-shrink-0">
                <button 
                  className="px-4 py-2 rounded-lg text-[13px] font-['DM_Sans:SemiBold',_sans-serif] transition-colors border"
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
                  Property Setup
                </button>
                <button 
                  className="px-4 py-2 rounded-lg text-[13px] font-['DM_Sans:SemiBold',_sans-serif] transition-all"
                  style={{ 
                    fontVariationSettings: "'opsz' 14",
                    backgroundColor: brandColors.primaryBlue,
                    color: brandColors.primaryText,
                    boxShadow: brandColors.buttonGlow
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = brandColors.primaryBlueHover}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = brandColors.primaryBlue}
                >
                  Test Property
                </button>
                <button className="p-2 hover:opacity-70 transition-opacity">
                  <MoreVertical className="w-5 h-5" style={{ color: brandColors.tertiaryText }} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

function MessagingPreview({ brandColors, faviconUrl }: { brandColors: BrandColors; faviconUrl: string }) {
  return (
    <>
      {/* CSS Override styles for Figma components */}
      <style>{`
        /* Override all hardcoded background colors from Figma imports */
        #messaging-preview-wrapper [class*="bg-[#0f1117]"],
        #messaging-preview-wrapper [class*="bg-[#0F1117]"] {
          background-color: ${brandColors.primaryBg} !important;
        }
        
        #messaging-preview-wrapper [class*="bg-[#17191f]"],
        #messaging-preview-wrapper [class*="bg-[#17191F]"] {
          background-color: ${brandColors.secondaryBg} !important;
        }
        
        #messaging-preview-wrapper [class*="bg-[#24262e]"],
        #messaging-preview-wrapper [class*="bg-[#24262E]"] {
          background-color: ${brandColors.cardBg} !important;
        }
        
        #messaging-preview-wrapper [class*="bg-[#01255e]"],
        #messaging-preview-wrapper [class*="bg-[#01255E]"] {
          background-color: ${brandColors.hoverBg} !important;
        }
        
        #messaging-preview-wrapper [class*="bg-[#013280]"] {
          background-color: ${brandColors.primaryBorder} !important;
        }
        
        #messaging-preview-wrapper [class*="bg-[#3e88f7]"] {
          background-color: ${brandColors.primaryBlue} !important;
        }
        
        /* Override text colors */
        #messaging-preview-wrapper [class*="text-[#98bffa]"] {
          color: ${brandColors.lightBlue} !important;
        }
        
        #messaging-preview-wrapper [class*="text-[#d4e4fc]"] {
          color: ${brandColors.lightBlue} !important;
        }
        
        #messaging-preview-wrapper [class*="text-[#3e88f7]"] {
          color: ${brandColors.primaryBlue} !important;
        }
        
        #messaging-preview-wrapper [class*="text-white"] {
          color: ${brandColors.primaryText} !important;
        }
        
        #messaging-preview-wrapper [class*="text-[#d0d3db]"] {
          color: ${brandColors.secondaryText} !important;
        }
        
        #messaging-preview-wrapper [class*="text-[#a6a9b2]"] {
          color: ${brandColors.tertiaryText} !important;
        }
        
        #messaging-preview-wrapper [class*="text-[#676a73]"],
        #messaging-preview-wrapper [class*="text-[#676A73]"] {
          color: ${brandColors.quaternaryText} !important;
        }
        
        /* Override border colors with rgba */
        #messaging-preview-wrapper [class*="border-[rgba(189,193,201,0.15)]"] {
          border-color: ${brandColors.subtleBorder} !important;
        }
        
        #messaging-preview-wrapper [class*="border-[#24262e]"],
        #messaging-preview-wrapper [class*="border-[#24262E]"] {
          border-color: ${brandColors.primaryBorder} !important;
        }
        
        /* Override divider backgrounds */
        #messaging-preview-wrapper [class*="bg-[rgba(189,193,201,0.15)]"] {
          background-color: ${brandColors.subtleBorder} !important;
        }
        
        /* Override transparent backgrounds */
        #messaging-preview-wrapper [class*="bg-[rgba(255,255,255,0)]"] {
          background-color: transparent !important;
        }
      `}</style>
      
      <div 
        id="messaging-preview-wrapper"
        className="flex flex-col -m-8 overflow-hidden"
        style={{
          // Apply brand colors as CSS variables
          '--fill-0': brandColors.quaternaryText,
          '--stroke-0': brandColors.quaternaryText,
          backgroundColor: brandColors.primaryBg,
          height: 'calc(100vh - 120px)'
        } as React.CSSProperties}
      >
        {/* Chat Header - Top */}
        <div 
          className="shrink-0"
          style={{ backgroundColor: brandColors.secondaryBg }}
        >
          <ChatHeader />
        </div>

        {/* Chat Box - Middle (scrollable) */}
        <div 
          className="flex-1 overflow-y-auto"
          style={{ backgroundColor: brandColors.primaryBg }}
        >
          <ChatBox faviconUrl={faviconUrl} />
        </div>

        {/* Text Area - Bottom */}
        <div 
          className="shrink-0"
          style={{ backgroundColor: brandColors.secondaryBg }}
        >
          <TextArea />
        </div>
      </div>
    </>
  );
}

function OldMessagingPreview_BACKUP({ brandColors }: { brandColors: BrandColors }) {
  // BACKUP - old version
  const conversations_backup = [
    {
      name: 'Brolin Cox',
      message: 'Hi Brolin, welcome to Hidden Haven...',
      timestamp: '10/17 4:32 PM',
      dateRange: 'Oct 17 - 19',
      property: 'Chalcedony',
      status: 'Guest',
      checkIn: 'Check-in today',
      platform: '🟠',
      starred: true,
      unread: 0,
      urgent: true,
      image: 'https://images.unsplash.com/photo-1667584523543-d1d9cc828a15?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBsaXZpbmclMjByb29tJTIwaW50ZXJpb3J8ZW58MXx8fHwxNzYwNzA2Mjg5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    {
      name: 'Hallie Swartzbaeker',
      message: 'Of course! The entrance to th...',
      timestamp: '10/17 4:59 PM',
      dateRange: 'Oct 17 - 20',
      property: '831 A',
      status: 'Guest',
      checkIn: 'Check-in today',
      platform: '🔵',
      unread: 18,
      image: 'https://images.unsplash.com/photo-1742039953129-e4edcc82d319?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBiZWRyb29tJTIwaG90ZWx8ZW58MXx8fHwxNzYwNzE4MTE5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    {
      name: 'Unknown Contact...',
      message: 'Kindly return the key in the lo...',
      timestamp: '10/17 4:47 PM',
      dateRange: 'External Contact',
      property: '',
      status: 'Guest',
      platform: '🟠',
      starred: true,
      unread: 1,
      image: 'https://images.unsplash.com/photo-1623300025008-ccbe3e8501aa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcGFydG1lbnQlMjBlbnRyYW5jZXxlbnwxfHx8fDE3NjA3NDYxMjh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    {
      name: 'Tiana Narruhn',
      message: 'Rental Agreement for Dapper ...',
      timestamp: '10/17 4:45 PM',
      dateRange: 'Oct 21 - 23',
      property: '831 D',
      status: 'Guest',
      futureStatus: 'Future',
      platform: '🔵',
      unread: 3,
      image: 'https://images.unsplash.com/photo-1601019404210-8bb5dd3ab015?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWFjaCUyMGhvdXNlJTIwdmFjYXRpb258ZW58MXx8fHwxNzYwNjY4ODQ2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    {
      name: 'David Blackwell',
      message: 'Hi David, welcome to San Dieg...',
      timestamp: '10/17 4:32 PM',
      dateRange: 'Oct 17 - 20',
      property: 'Leo 604',
      status: 'Guest',
      checkIn: 'Check-in today',
      platform: '🔵',
      unread: 2,
      image: 'https://images.unsplash.com/photo-1667584523543-d1d9cc828a15?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBsaXZpbmclMjByb29tJTIwaW50ZXJpb3J8ZW58MXx8fHwxNzYwNzA2Mjg5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    {
      name: 'Amariea Robinson',
      message: 'Hi Amariea! Thank you so muc...',
      timestamp: '10/17 4:32 PM',
      dateRange: 'Oct 20 - 24',
      property: '1811 Adams - 7',
      status: 'Guest',
      futureStatus: 'Future',
      platform: '🔵',
      unread: 1,
      image: 'https://images.unsplash.com/photo-1742039953129-e4edcc82d319?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBiZWRyb29tJTIwaG90ZWx8ZW58MXx8fHwxNzYwNzE4MTE5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    }
  ];

  return (
    <div className="flex gap-0 -m-8 h-[calc(100vh-200px)]">
      {/* Conversations List */}
      <div className="w-[360px] border-r-2" style={{ borderColor: brandColors.primaryBorder, backgroundColor: brandColors.secondaryBg }}>
        {/* Header */}
        <div className="p-4 border-b-2" style={{ borderColor: brandColors.primaryBorder }}>
          <h2 className="text-[18px] font-['DM_Sans:SemiBold',_sans-serif] mb-3" style={{ fontVariationSettings: "'opsz' 14", color: brandColors.primaryText }}>
            Inbox
          </h2>
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <MessageSquare className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: brandColors.tertiaryText }} />
              <input
                type="text"
                placeholder="Search by guest name or p..."
                className="w-full h-[32px] rounded-[4px] pl-9 pr-3 text-[14px] font-['DM_Sans:Medium',_sans-serif] border"
                style={{ 
                  fontVariationSettings: "'opsz' 14",
                  backgroundColor: brandColors.inputBg,
                  borderColor: brandColors.primaryBorder,
                  color: brandColors.primaryText
                }}
              />
            </div>
            <button 
              className="px-3 h-[32px] rounded-[4px] flex items-center gap-1.5 text-[14px] font-['DM_Sans:SemiBold',_sans-serif] transition-colors"
              style={{ 
                fontVariationSettings: "'opsz' 14",
                backgroundColor: brandColors.primaryBlue,
                color: '#FFFFFF'
              }}
            >
              Filters
            </button>
          </div>
        </div>

        {/* Conversations */}
        <div className="overflow-y-auto">
          {conversations.map((conv, idx) => (
            <div
              key={idx}
              className="p-3 border-b cursor-pointer transition-colors"
              style={{ 
                borderColor: brandColors.primaryBorder,
                backgroundColor: idx === 0 ? brandColors.hoverBg : 'transparent'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = brandColors.hoverBg}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = idx === 0 ? brandColors.hoverBg : 'transparent'}
            >
              <div className="flex gap-3">
                {/* Property Image */}
                <img 
                  src={conv.image} 
                  alt={conv.property}
                  className="w-[80px] h-[60px] rounded object-cover flex-shrink-0"
                />
                
                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start mb-1">
                    <div className="flex items-center gap-2">
                      <p className="text-[14px] font-['DM_Sans:SemiBold',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14", color: brandColors.primaryText }}>
                        {conv.name}
                      </p>
                      {conv.urgent && (
                        <span className="px-1.5 py-0.5 rounded text-[10px] font-['DM_Sans:SemiBold',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14", backgroundColor: brandColors.errorRed, color: '#FFFFFF' }}>
                          🔥 Urgent
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] font-['DM_Sans:Regular',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14", color: brandColors.tertiaryText }}>
                      {conv.timestamp}
                    </span>
                  </div>
                  
                  <p className="text-[13px] font-['DM_Sans:Regular',_sans-serif] truncate mb-1" style={{ fontVariationSettings: "'opsz' 14", color: brandColors.tertiaryText }}>
                    {conv.message}
                  </p>
                  
                  <div className="flex items-center gap-2 text-[11px] font-['DM_Sans:Regular',_sans-serif] mb-2" style={{ fontVariationSettings: "'opsz' 14", color: brandColors.quaternaryText }}>
                    <span>{conv.dateRange}</span>
                    {conv.property && <span>{conv.property}</span>}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className="px-2 py-0.5 rounded text-[11px] font-['DM_Sans:SemiBold',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14", backgroundColor: conv.statusBg, color: conv.statusColor }}>
                        {conv.status}
                      </span>
                      {conv.checkIn && (
                        <span className="px-2 py-0.5 rounded text-[11px] font-['DM_Sans:SemiBold',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14", backgroundColor: brandColors.primaryBlue, color: '#FFFFFF' }}>
                          {conv.checkIn}
                        </span>
                      )}
                      <span>{conv.platform}</span>
                    </div>
                    {conv.unread > 0 && (
                      <span className="w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-['DM_Sans:SemiBold',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14", backgroundColor: brandColors.primaryBlue, color: '#FFFFFF' }}>
                        {conv.unread}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Conversation View */}
      <div className="flex-1 flex flex-col" style={{ backgroundColor: brandColors.primaryBg }}>
        {/* Header */}
        <div className="px-4 py-3 border-b-2 flex items-center justify-between" style={{ borderColor: brandColors.primaryBorder, backgroundColor: brandColors.secondaryBg }}>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded flex items-center justify-center text-[14px] font-['DM_Sans:SemiBold',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14", backgroundColor: brandColors.primaryBlue, color: '#FFFFFF' }}>
              B
            </div>
            <div className="flex items-center gap-2">
              <h3 className="text-[16px] font-['DM_Sans:SemiBold',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14", color: brandColors.primaryText }}>
                Brolin Cox
              </h3>
              <span className="px-2 py-0.5 rounded text-[10px] font-['DM_Sans:SemiBold',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14", backgroundColor: brandColors.errorRed, color: '#FFFFFF' }}>
                🔥 Urgent
              </span>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {['PMS', 'WhatsApp', 'OpenPhone'].map((btn) => (
              <button key={btn} className="px-3 py-1.5 rounded border text-[12px] font-['DM_Sans:Medium',_sans-serif] transition-colors" style={{ fontVariationSettings: "'opsz' 14", borderColor: brandColors.primaryBorder, backgroundColor: 'transparent', color: brandColors.tertiaryText }}>
                {btn}
              </button>
            ))}
            <button className="px-3 py-1.5 rounded border text-[12px] font-['DM_Sans:Medium',_sans-serif] flex items-center gap-1 transition-colors" style={{ fontVariationSettings: "'opsz' 14", borderColor: brandColors.primaryBorder, backgroundColor: 'transparent', color: brandColors.tertiaryText }}>
              Open Issue
              <span className="w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-['DM_Sans:SemiBold',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14", backgroundColor: brandColors.primaryBlue, color: '#FFFFFF' }}>1</span>
            </button>
            <button className="px-3 py-1.5 rounded border text-[12px] font-['DM_Sans:Medium',_sans-serif] transition-colors" style={{ fontVariationSettings: "'opsz' 14", borderColor: brandColors.primaryBorder, backgroundColor: 'transparent', color: brandColors.tertiaryText }}>
              Notes
            </button>
            <button className="px-3 py-1.5 rounded text-[12px] font-['DM_Sans:SemiBold',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14", backgroundColor: brandColors.primaryBlue, color: '#FFFFFF' }}>
              Details
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 p-4 space-y-4 overflow-y-auto">
          {[
            { sender: 'host', text: 'Hi Brolin, Have you access Code to location UUUUUUL', time: 'Host 3:12 PM' },
            { sender: 'host', text: 'You can check in now unit is ready. Thank you!', time: 'Host 3:12 PM' },
            { sender: 'guest', text: 'Awesome. Thank you we are about 15 minutes away! I appreciate it', time: 'Brolin Cox 3:20 PM' },
            { sender: 'host', text: "That's great to hear! Safe travels for the last stretch of your drive. We hope you have a fantastic stay!", time: 'HostBuddy 3:23 PM', hostBuddy: true },
            { sender: 'host', text: 'Hi Brolin, welcome to Hidden Haven! I hope you and your group are settling in comfortably after your early arrival. If you need anything at all during your stay, just let us know. Enjoy your time in San Diego!', time: 'HostBuddy 4:32 PM', hostBuddy: true }
          ].map((msg, idx) => (
            <div key={idx} className={`flex ${msg.sender === 'host' ? 'flex-col items-end' : 'flex-col items-start'}`}>
              {msg.sender === 'guest' ? (
                <>
                  <div className="max-w-[70%] px-4 py-2.5 rounded-lg mb-1 border" style={{ backgroundColor: brandColors.secondaryBg, borderColor: brandColors.primaryBorder }}>
                    <p className="text-[14px] font-['DM_Sans:Regular',_sans-serif] leading-relaxed" style={{ fontVariationSettings: "'opsz' 14", color: brandColors.primaryText }}>
                      {msg.text}
                    </p>
                  </div>
                  <span className="text-[11px] font-['DM_Sans:Regular',_sans-serif] px-1" style={{ fontVariationSettings: "'opsz' 14", color: brandColors.tertiaryText }}>
                    {msg.time}
                  </span>
                </>
              ) : (
                <>
                  <div className="max-w-[70%] px-4 py-2.5 rounded-lg mb-1" style={{ backgroundColor: brandColors.hoverBg, border: `1px solid ${brandColors.primaryBorder}` }}>
                    <p className="text-[14px] font-['DM_Sans:Regular',_sans-serif] leading-relaxed" style={{ fontVariationSettings: "'opsz' 14", color: brandColors.primaryText }}>
                      {msg.text}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    {msg.hostBuddy && (
                      <div className="flex items-center gap-1.5">
                        <div className="w-4 h-4 rounded flex items-center justify-center text-[8px] font-['DM_Sans:SemiBold',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14", backgroundColor: brandColors.primaryBlue, color: '#FFFFFF' }}>
                          H
                        </div>
                      </div>
                    )}
                    <span className="text-[11px] font-['DM_Sans:Regular',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14", color: brandColors.tertiaryText }}>
                      {msg.time}
                    </span>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>

        {/* Input Area */}
        <div className="p-4 border-t-2" style={{ borderColor: brandColors.primaryBorder, backgroundColor: brandColors.secondaryBg }}>
          <div className="flex gap-2 mb-2">
            <input 
              type="text"
              placeholder="Message..."
              className="flex-1 px-3 py-2 rounded border text-[14px] font-['DM_Sans:Regular',_sans-serif]"
              style={{ 
                fontVariationSettings: "'opsz' 14",
                backgroundColor: brandColors.inputBg,
                borderColor: brandColors.primaryBorder,
                color: brandColors.primaryText
              }}
            />
            <button 
              className="px-4 py-2 rounded text-[14px] font-['DM_Sans:SemiBold',_sans-serif]"
              style={{ 
                fontVariationSettings: "'opsz' 14",
                backgroundColor: brandColors.primaryBlue,
                color: '#FFFFFF'
              }}
            >
              Send
            </button>
          </div>
          <button className="text-[12px] font-['DM_Sans:Medium',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14", color: brandColors.tertiaryText }}>
            🤖 AI Response
          </button>
        </div>
      </div>
    </div>
  );
}

function ActionItemsPreview({ brandColors }: { brandColors: BrandColors }) {
  return (
    <>
      <h1 
        className="text-[32px] font-['DM_Sans:Bold',_sans-serif] mb-6"
        style={{ fontVariationSettings: "'opsz' 14", color: brandColors.primaryText }}
      >
        Action Items
      </h1>

      <div 
        className="border-2 rounded-xl overflow-hidden"
        style={{ backgroundColor: brandColors.secondaryBg, borderColor: brandColors.primaryBorder, boxShadow: brandColors.cardShadow }}
      >
        {/* Table Header */}
        <div className="grid grid-cols-[120px_200px_1fr_100px] gap-4 px-6 py-3 border-b" style={{ backgroundColor: brandColors.tableHeaderBg, borderColor: brandColors.primaryBorder }}>
          <p className="text-[12px] font-['DM_Sans:SemiBold',_sans-serif] uppercase" style={{ fontVariationSettings: "'opsz' 14", color: brandColors.tertiaryText }}>Date/Time</p>
          <p className="text-[12px] font-['DM_Sans:SemiBold',_sans-serif] uppercase" style={{ fontVariationSettings: "'opsz' 14", color: brandColors.tertiaryText }}>Property/Guest</p>
          <p className="text-[12px] font-['DM_Sans:SemiBold',_sans-serif] uppercase" style={{ fontVariationSettings: "'opsz' 14", color: brandColors.tertiaryText }}>Action Item</p>
          <p className="text-[12px] font-['DM_Sans:SemiBold',_sans-serif] uppercase text-center" style={{ fontVariationSettings: "'opsz' 14", color: brandColors.tertiaryText }}>Complete</p>
        </div>

        {/* Sample Rows */}
        {[
          { date: 'Oct 17', time: '2:30 PM', property: 'Beach House', guest: 'John Doe', action: 'Send check-in instructions' },
          { date: 'Oct 17', time: '11:15 AM', property: 'Mountain Cabin', guest: 'Jane Smith', action: 'Respond to guest inquiry' },
          { date: 'Oct 16', time: '4:45 PM', property: 'City Loft', guest: 'Bob Wilson', action: 'Confirm booking details' },
          { date: 'Oct 16', time: '9:30 AM', property: 'Lake Cottage', guest: 'Alice Brown', action: 'Update house rules' }
        ].map((item, idx) => (
          <div
            key={idx}
            className="grid grid-cols-[120px_200px_1fr_100px] gap-4 px-6 py-4 border-b last:border-b-0 transition-colors"
            style={{ borderColor: brandColors.primaryBorder }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = brandColors.tableRowHover}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            <div>
              <p className="text-[14px] font-['DM_Sans:Medium',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14", color: brandColors.primaryText }}>{item.date}</p>
              <p className="text-[12px] font-['DM_Sans:Regular',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14", color: brandColors.tertiaryText }}>{item.time}</p>
            </div>
            <div>
              <p className="text-[14px] font-['DM_Sans:Medium',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14", color: brandColors.primaryText }}>{item.property}</p>
              <p className="text-[12px] font-['DM_Sans:Regular',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14", color: brandColors.tertiaryText }}>{item.guest}</p>
            </div>
            <p className="text-[14px] font-['DM_Sans:Regular',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14", color: brandColors.primaryText }}>{item.action}</p>
            <div className="flex justify-center items-center">
              <button 
                className="w-7 h-7 rounded-full border-2 flex items-center justify-center transition-all"
                style={{ borderColor: brandColors.primaryBlue, boxShadow: brandColors.primaryGlow }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = brandColors.primaryBlue}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                <Check className="w-4 h-4" strokeWidth={2.5} style={{ color: brandColors.primaryBlue }} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

function InsightsPreview({ brandColors }: { brandColors: BrandColors }) {
  return (
    <>
      <h1 
        className="text-[32px] font-['DM_Sans:Bold',_sans-serif] mb-6"
        style={{ fontVariationSettings: "'opsz' 14", color: brandColors.primaryText }}
      >
        Insights
      </h1>

      {/* Chart */}
      <div 
        className="border-2 rounded-xl p-6 mb-6"
        style={{ backgroundColor: brandColors.secondaryBg, borderColor: brandColors.primaryBorder, boxShadow: brandColors.cardShadow }}
      >
        <h3 className="text-[16px] font-['DM_Sans:SemiBold',_sans-serif] mb-4" style={{ fontVariationSettings: "'opsz' 14", color: brandColors.primaryText }}>
          Message Volume by Hour
        </h3>
        <div className="h-[280px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={[
              { hour: '12am', value: 2 }, { hour: '6am', value: 4 }, { hour: '12pm', value: 8 },
              { hour: '2pm', value: 15 }, { hour: '6pm', value: 10 }, { hour: '9pm', value: 6 }
            ]}>
              <CartesianGrid strokeDasharray="3 3" stroke={brandColors.primaryBorder} vertical={false} />
              <XAxis dataKey="hour" stroke={brandColors.tertiaryText} tick={{ fill: brandColors.tertiaryText, fontSize: 12 }} axisLine={{ stroke: brandColors.primaryBorder }} />
              <YAxis stroke={brandColors.tertiaryText} tick={{ fill: brandColors.tertiaryText, fontSize: 12 }} axisLine={{ stroke: brandColors.primaryBorder }} />
              <Tooltip contentStyle={{ backgroundColor: brandColors.secondaryBg, border: `1px solid ${brandColors.primaryBorder}`, borderRadius: '8px', color: brandColors.primaryText }} />
              <Bar dataKey="value" fill={brandColors.primaryBlue} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-5">
        {[
          { title: 'Response Rate', value: '98.5%', change: '+2.3%' },
          { title: 'Avg Response Time', value: '0.5 min', change: '-18 min' },
          { title: 'Guest Satisfaction', value: '4.8/5', change: '+0.2' }
        ].map((stat, idx) => (
          <div 
            key={idx}
            className="border-2 rounded-xl p-6"
            style={{ backgroundColor: brandColors.secondaryBg, borderColor: brandColors.primaryBorder, boxShadow: brandColors.cardShadow }}
          >
            <p className="text-[13px] font-['DM_Sans:SemiBold',_sans-serif] mb-2" style={{ fontVariationSettings: "'opsz' 14", color: brandColors.tertiaryText }}>{stat.title}</p>
            <p className="text-[32px] font-['DM_Sans:Bold',_sans-serif] mb-2" style={{ fontVariationSettings: "'opsz' 14", color: brandColors.primaryText }}>{stat.value}</p>
            <p className="text-[12px] font-['DM_Sans:SemiBold',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14", color: brandColors.successGreen }}>{stat.change}</p>
          </div>
        ))}
      </div>
    </>
  );
}

function SettingsPreview({ brandColors }: { brandColors: BrandColors }) {
  return (
    <>
      <h1 
        className="text-[32px] font-['DM_Sans:Bold',_sans-serif] mb-6"
        style={{ fontVariationSettings: "'opsz' 14", color: brandColors.primaryText }}
      >
        Settings
      </h1>

      <div className="space-y-5">
        {/* Account Section */}
        <div 
          className="border-2 rounded-xl p-6"
          style={{ backgroundColor: brandColors.secondaryBg, borderColor: brandColors.primaryBorder, boxShadow: brandColors.cardShadow }}
        >
          <h3 className="text-[18px] font-['DM_Sans:SemiBold',_sans-serif] mb-4" style={{ fontVariationSettings: "'opsz' 14", color: brandColors.primaryText }}>
            Account Settings
          </h3>
          <div className="space-y-4">
            {['Email', 'Password', 'Phone Number'].map((field, idx) => (
              <div key={idx} className="flex justify-between items-center py-3 border-b last:border-b-0" style={{ borderColor: brandColors.primaryBorder }}>
                <span className="text-[14px] font-['DM_Sans:Medium',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14", color: brandColors.secondaryText }}>{field}</span>
                <button 
                  className="text-[13px] font-['DM_Sans:SemiBold',_sans-serif]"
                  style={{ fontVariationSettings: "'opsz' 14", color: brandColors.primaryBlue }}
                  onMouseEnter={(e) => e.currentTarget.style.color = brandColors.lightBlue}
                  onMouseLeave={(e) => e.currentTarget.style.color = brandColors.primaryBlue}
                >
                  Edit
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Notifications Section */}
        <div 
          className="border-2 rounded-xl p-6"
          style={{ backgroundColor: brandColors.secondaryBg, borderColor: brandColors.primaryBorder, boxShadow: brandColors.cardShadow }}
        >
          <h3 className="text-[18px] font-['DM_Sans:SemiBold',_sans-serif] mb-4" style={{ fontVariationSettings: "'opsz' 14", color: brandColors.primaryText }}>
            Notifications
          </h3>
          <div className="space-y-4">
            {['Email Notifications', 'SMS Alerts', 'Push Notifications'].map((setting, idx) => (
              <div key={idx} className="flex justify-between items-center">
                <span className="text-[14px] font-['DM_Sans:Medium',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14", color: brandColors.secondaryText }}>{setting}</span>
                <div 
                  className="w-12 h-6 rounded-full p-1 cursor-pointer transition-all"
                  style={{ backgroundColor: idx === 0 ? brandColors.primaryBlue : brandColors.toggleBgOff, boxShadow: idx === 0 ? brandColors.toggleGlow : 'none' }}
                >
                  <div 
                    className="w-4 h-4 rounded-full transition-all"
                    style={{ 
                      backgroundColor: brandColors.primaryText,
                      transform: idx === 0 ? 'translateX(24px)' : 'translateX(0)'
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

// Feature Configuration Types
interface FeatureModule {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  available: boolean;
  version: 'v1' | 'v2';
  link: string;
}

type ConfigSection = 'branding' | 'feature-selection' | 'domain-configuration';

interface WhiteLabelProps {
  view?: ConfigSection;
  brandingName?: string;
}

export default function WhiteLabel({ view = 'branding', brandingName = "HostBuddy" }: WhiteLabelProps) {
  const configSection = view;
  const [currentPreset, setCurrentPreset] = useState<PresetType>('hostbuddy-original-dark');
  const [brandColors, setBrandColors] = useState<BrandColors>(HOSTBUDDY_ORIGINAL_DARK);
  const [logoUrl, setLogoUrl] = useState<string>('');
  const [faviconUrl, setFaviconUrl] = useState<string>('');
  const [previewPage, setPreviewPage] = useState<PreviewPage>('dashboard');
  
  // API Documentation modal state
  const [apiModalOpen, setApiModalOpen] = useState(false);
  
  // Domain Configuration state
  const [selectedDomain, setSelectedDomain] = useState<string>('');
  const [customDomain, setCustomDomain] = useState<string>('');
  const [isEditingDomain, setIsEditingDomain] = useState<boolean>(false);
  const [tempDomain, setTempDomain] = useState<string>('');
  const [domainStatus, setDomainStatus] = useState<'not-checked' | 'checking' | 'verified' | 'error'>('not-checked');
  const [selectedFeatureForApi, setSelectedFeatureForApi] = useState<string>('');
  
  // Feature modules state
  const [featureModules, setFeatureModules] = useState<FeatureModule[]>([
    { id: 'properties', name: 'Properties Page', description: 'List view with AI automation controls', enabled: true, available: true, version: 'v1', link: 'https://whitelabel.hostbuddy.ai/properties' },
    { id: 'property-profile', name: 'Property Profile', description: 'Resources, Basics, SOPs, Conversation Preferences (3 tabs)', enabled: true, available: true, version: 'v1', link: 'https://whitelabel.hostbuddy.ai/propertyprofile' },
    { id: 'smart-templates', name: 'Smart Templates', description: 'Manage AI message templates', enabled: true, available: true, version: 'v1', link: 'https://whitelabel.hostbuddy.ai/smarttemplates' },
    { id: 'upsells', name: 'Upsells', description: 'Gap Night Upsells & Inquiry Followups', enabled: true, available: true, version: 'v1', link: 'https://whitelabel.hostbuddy.ai/upsells' },
    { id: 'messaging-inbox', name: 'Messaging Inbox', description: 'All HostBuddy messaging features', enabled: true, available: true, version: 'v1', link: 'https://whitelabel.hostbuddy.ai/inbox' },
    { id: 'action-items', name: 'Action Items', description: 'Track AI-generated operational tasks', enabled: true, available: true, version: 'v1', link: 'https://whitelabel.hostbuddy.ai/actionitems' },
    { id: 'insights', name: 'Insights', description: 'Analytics and reporting dashboard', enabled: false, available: false, version: 'v2', link: 'https://whitelabel.hostbuddy.ai/insights' },
    { id: 'action-item-settings', name: 'Action Item Settings', description: 'Configure AI task generation rules', enabled: false, available: false, version: 'v2', link: 'https://whitelabel.hostbuddy.ai/actionitemsettings' },
    { id: 'integrations', name: 'Integrations', description: 'WhatsApp, OpenTable, Resy, Turo, Webhooks', enabled: false, available: false, version: 'v2', link: 'https://whitelabel.hostbuddy.ai/integrations' },
  ]);

  const handlePresetChange = (preset: PresetType) => {
    setCurrentPreset(preset);
    if (preset === 'hostbuddy-original-dark') {
      setBrandColors(HOSTBUDDY_ORIGINAL_DARK);
    } else if (preset === 'hostbuddy-original-light') {
      setBrandColors(HOSTBUDDY_ORIGINAL_LIGHT);
    }
    // 'custom' preset doesn't change colors - it's set when user modifies colors
  };

  const handleColorChange = (key: keyof BrandColors, value: string) => {
    setBrandColors(prev => ({
      ...prev,
      [key]: value
    }));
    // Mark as custom when user changes any color
    if (currentPreset !== 'custom') {
      setCurrentPreset('custom');
    }
  };

  const handleFontChange = (type: 'heading' | 'body', font: string) => {
    setBrandColors(prev => ({
      ...prev,
      [type === 'heading' ? 'headingFont' : 'bodyFont']: font
    }));
    // Mark as custom when user changes fonts
    if (currentPreset !== 'custom') {
      setCurrentPreset('custom');
    }
  };

  const handleFeatureToggle = (featureId: string) => {
    setFeatureModules(prev => prev.map(feature => 
      feature.id === featureId && feature.available
        ? { ...feature, enabled: !feature.enabled }
        : feature
    ));
  };

  const getFeatureLink = (featureId: string) => {
    const baseDomain = customDomain || 'whitelabel.hostbuddy.ai';
    const pathMap: { [key: string]: string } = {
      'properties': '/properties',
      'property-profile': '/propertyprofile',
      'smart-templates': '/smarttemplates',
      'upsells': '/upsells',
      'messaging-inbox': '/inbox',
      'action-items': '/actionitems',
      'insights': '/insights',
      'action-item-settings': '/actionitemsettings',
      'integrations': '/integrations',
    };
    return `https://${baseDomain}${pathMap[featureId] || ''}`;
  };

  const handleSaveDomain = () => {
    setCustomDomain(tempDomain);
    setIsEditingDomain(false);
    showSaveSuccess('Domain saved successfully');
  };

  const handleCancelDomain = () => {
    setTempDomain(customDomain);
    setIsEditingDomain(false);
  };

  const handleConfigureClick = (featureName: string) => {
    setSelectedFeatureForApi(featureName);
    setApiModalOpen(true);
  };

  const handleResetAll = () => {
    // Reset to the last selected HostBuddy Original preset, defaulting to dark
    const resetPreset = currentPreset === 'hostbuddy-original-light' ? 'hostbuddy-original-light' : 'hostbuddy-original-dark';
    setCurrentPreset(resetPreset);
    setBrandColors(resetPreset === 'hostbuddy-original-dark' ? HOSTBUDDY_ORIGINAL_DARK : HOSTBUDDY_ORIGINAL_LIGHT);
  };

  const handleLogoUpload = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/svg+xml,image/png,image/jpeg';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setLogoUrl(e.target?.result as string);
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
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setFaviconUrl(e.target?.result as string);
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  // Color extraction utilities
  const rgbToHex = (r: number, g: number, b: number): string => {
    return '#' + [r, g, b].map(x => {
      const hex = Math.round(x).toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    }).join('');
  };

  const getLuminance = (r: number, g: number, b: number): number => {
    // Calculate relative luminance
    const [rs, gs, bs] = [r, g, b].map(c => {
      c = c / 255;
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
  };

  const getSaturation = (r: number, g: number, b: number): number => {
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const delta = max - min;
    return max === 0 ? 0 : delta / max;
  };

  const colorDistance = (c1: number[], c2: number[]): number => {
    // Euclidean distance in RGB space
    return Math.sqrt(
      Math.pow(c1[0] - c2[0], 2) +
      Math.pow(c1[1] - c2[1], 2) +
      Math.pow(c1[2] - c2[2], 2)
    );
  };

  const extractColorsFromImage = (imageData: ImageData): string[] => {
    const pixels: number[][] = [];
    const data = imageData.data;
    
    // Sample every 10th pixel to improve performance
    for (let i = 0; i < data.length; i += 40) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      const a = data[i + 3];
      
      // Skip transparent pixels
      if (a < 128) continue;
      
      pixels.push([r, g, b]);
    }

    // Simple k-means clustering to find dominant colors
    const k = 12; // Number of color clusters
    const maxIterations = 10;
    
    // Initialize centroids randomly
    let centroids: number[][] = [];
    for (let i = 0; i < k; i++) {
      centroids.push(pixels[Math.floor(Math.random() * pixels.length)]);
    }

    // K-means iterations
    for (let iter = 0; iter < maxIterations; iter++) {
      const clusters: number[][][] = Array(k).fill(null).map(() => []);
      
      // Assign pixels to nearest centroid
      pixels.forEach(pixel => {
        let minDist = Infinity;
        let nearestCluster = 0;
        
        centroids.forEach((centroid, idx) => {
          const dist = colorDistance(pixel, centroid);
          if (dist < minDist) {
            minDist = dist;
            nearestCluster = idx;
          }
        });
        
        clusters[nearestCluster].push(pixel);
      });
      
      // Update centroids
      centroids = clusters.map(cluster => {
        if (cluster.length === 0) return centroids[0];
        
        const sum = cluster.reduce((acc, pixel) => [
          acc[0] + pixel[0],
          acc[1] + pixel[1],
          acc[2] + pixel[2]
        ], [0, 0, 0]);
        
        return [
          sum[0] / cluster.length,
          sum[1] / cluster.length,
          sum[2] / cluster.length
        ];
      });
    }

    // Convert to hex and return
    return centroids.map(c => rgbToHex(c[0], c[1], c[2]));
  };

  const mapColorsToTheme = (colors: string[]): BrandColors => {
    // Analyze each color
    const colorData = colors.map(hex => {
      const r = parseInt(hex.slice(1, 3), 16);
      const g = parseInt(hex.slice(3, 5), 16);
      const b = parseInt(hex.slice(5, 7), 16);
      const luminance = getLuminance(r, g, b);
      const saturation = getSaturation(r, g, b);
      
      return { hex, r, g, b, luminance, saturation };
    });

    // Sort by luminance
    const sortedByLuminance = [...colorData].sort((a, b) => a.luminance - b.luminance);
    
    // Find most saturated color for primary blue
    const saturatedColors = [...colorData].sort((a, b) => b.saturation - a.saturation);
    const primaryBlue = saturatedColors[0]?.hex || '#3E88F7';
    
    // Find second most saturated for accent
    const lightBlue = saturatedColors[1]?.hex || '#98BFFA';
    
    // Dark colors for backgrounds
    const darkColors = sortedByLuminance.filter(c => c.luminance < 0.1);
    const primaryBg = darkColors[0]?.hex || '#0F1117';
    const secondaryBg = darkColors[1]?.hex || '#17191F';
    const cardBg = darkColors[2]?.hex || '#24262E';
    
    // Mid-dark for borders and hover
    const midDarkColors = sortedByLuminance.filter(c => c.luminance >= 0.1 && c.luminance < 0.2);
    const primaryBorder = midDarkColors[0]?.hex || '#013280';
    const hoverBg = midDarkColors[1]?.hex || '#01255E';
    
    // Light colors for text
    const lightColors = sortedByLuminance.filter(c => c.luminance > 0.5);
    const primaryText = lightColors[lightColors.length - 1]?.hex || '#FFFFFF';
    const secondaryText = lightColors[lightColors.length - 2]?.hex || '#D0D3DB';
    
    // Mid-light for secondary text
    const midLightColors = sortedByLuminance.filter(c => c.luminance >= 0.2 && c.luminance <= 0.5);
    const tertiaryText = midLightColors[midLightColors.length - 1]?.hex || '#A6A9B2';
    const quaternaryText = midLightColors[Math.floor(midLightColors.length / 2)]?.hex || '#676A73';
    const disabledText = midLightColors[0]?.hex || '#4A4D54';

    // Extract RGB for shadow generation
    const pbR = parseInt(primaryBlue.slice(1, 3), 16);
    const pbG = parseInt(primaryBlue.slice(3, 5), 16);
    const pbB = parseInt(primaryBlue.slice(5, 7), 16);

    return {
      // Background Colors
      primaryBg,
      secondaryBg,
      cardBg,
      hoverBg,
      inputBg: primaryBg,
      textareaBg: hoverBg,
      dropdownBg: hoverBg,
      modalOverlay: 'rgba(0, 0, 0, 0.6)',
      sidebarBg: secondaryBg,
      
      // Text Colors
      primaryText,
      secondaryText,
      tertiaryText,
      quaternaryText,
      disabledText,
      placeholderText: quaternaryText,
      linkText: lightBlue,
      
      // Border Colors
      primaryBorder,
      activeBorder: primaryBlue,
      inactiveBorder: primaryBorder,
      subtleBorder: cardBg,
      
      // Interactive Colors
      primaryBlue,
      primaryBlueHover: lightBlue,
      lightBlue,
      secondaryButtonBg: hoverBg,
      secondaryButtonHover: primaryBorder,
      
      // Status Colors
      successGreen: '#10B981',
      currentGreen: '#4ADE80',
      warningOrange: '#FB923C',
      errorRed: '#EF4444',
      destructiveRed: '#D4183D',
      
      // Component Colors
      toggleBgOff: quaternaryText,
      cancelButton: disabledText,
      cancelButtonHover: quaternaryText,
      dropdownSelect: tertiaryText,
      tableHeaderBg: primaryBg,
      tableRowHover: hoverBg,
      
      // Shadow & Effects
      cardShadow: `0 0 25px rgba(${pbR}, ${pbG}, ${pbB}, 0.2)`,
      primaryGlow: `0 0 15px rgba(${pbR}, ${pbG}, ${pbB}, 0.3)`,
      buttonGlow: `0 0 20px rgba(${pbR}, ${pbG}, ${pbB}, 0.25)`,
      toggleGlow: `0 0 12px rgba(${pbR}, ${pbG}, ${pbB}, 0.4)`,
      warningGlow: '0 0 8px rgba(251, 146, 60, 0.4)',
      
      // Branding Assets
      faviconUrl: hostbuddyFavicon,
      
      // Typography
      headingFont: 'Poppins',
      bodyFont: 'DM Sans',
    };
  };

  const handleScreenshotUpload = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/png,image/jpeg,image/jpg';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const img = new window.Image();
          img.onload = () => {
            // Create canvas to extract colors
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            if (!ctx) return;

            // Scale down large images for performance
            const maxSize = 400;
            let width = img.width;
            let height = img.height;
            
            if (width > maxSize || height > maxSize) {
              if (width > height) {
                height = (height / width) * maxSize;
                width = maxSize;
              } else {
                width = (width / height) * maxSize;
                height = maxSize;
              }
            }
            
            canvas.width = width;
            canvas.height = height;
            ctx.drawImage(img, 0, 0, width, height);
            
            // Extract image data
            const imageData = ctx.getImageData(0, 0, width, height);
            
            // Extract dominant colors
            const extractedColors = extractColorsFromImage(imageData);
            
            // Map to theme
            const newTheme = mapColorsToTheme(extractedColors);
            
            // Apply to state
            setBrandColors(newTheme);
            setCurrentPreset('dark'); // Mark as custom
          };
          img.src = e.target?.result as string;
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  return (
    <div className="h-screen bg-[#0F1117] overflow-hidden">
      <div className="h-full flex">
        {/* Branding Configuration - Two Panel Layout */}
        {configSection === 'branding' && (
          <>
            {/* Left Panel - Configuration */}
            <div className="w-[420px] h-full bg-[#17191f] border-r-2 border-[#013280] overflow-y-auto">
              <div className="p-8">
                {/* Header */}
                <div className="mb-6">
                  <h1 className="text-white text-[28px] font-['DM_Sans:Bold',_sans-serif] mb-2" style={{ fontVariationSettings: "'opsz' 14" }}>
                    Branding Configuration
                  </h1>
                  <p className="text-[#a6a9b2] text-[14px] font-['DM_Sans:Regular',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
                    Customize your HostBuddy experience
                  </p>
                </div>

                {/* Logo Upload */}
            <div className="mb-8">
              <h3 className="text-white text-[16px] font-['DM_Sans:SemiBold',_sans-serif] mb-4" style={{ fontVariationSettings: "'opsz' 14" }}>
                Company Logo
              </h3>
              <div 
                className="border-2 border-dashed border-[#013280] rounded-lg p-8 bg-[#0F1117] hover:border-[#3e88f7] transition-colors cursor-pointer group"
                onClick={handleLogoUpload}
              >
                {logoUrl ? (
                  <div className="flex flex-col items-center gap-3">
                    <img src={logoUrl} alt="Company Logo" className="max-h-16 max-w-full object-contain" />
                    <p className="text-[#98bffa] text-[13px] font-['DM_Sans:Medium',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
                      Click to change
                    </p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-3 text-center">
                    <Upload className="w-8 h-8 text-[#676a73] group-hover:text-[#3e88f7] transition-colors" />
                    <div>
                      <p className="text-[#d0d3db] text-[14px] font-['DM_Sans:Medium',_sans-serif] mb-1" style={{ fontVariationSettings: "'opsz' 14" }}>
                        Click to upload or drag and drop
                      </p>
                      <p className="text-[#676a73] text-[12px] font-['DM_Sans:Regular',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
                        SVG, PNG or JPG (max. 2MB)
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Favicon Upload */}
            <div className="mb-8">
              <h3 className="text-white text-[16px] font-['DM_Sans:SemiBold',_sans-serif] mb-4" style={{ fontVariationSettings: "'opsz' 14" }}>
                Favicon
              </h3>
              <div 
                className="border-2 border-dashed border-[#013280] rounded-lg p-6 bg-[#0F1117] hover:border-[#3e88f7] transition-colors cursor-pointer group flex items-center justify-center"
                onClick={handleFaviconUpload}
              >
                {faviconUrl ? (
                  <div className="flex items-center gap-4">
                    <img src={faviconUrl} alt="Favicon" className="w-8 h-8 object-contain" />
                    <p className="text-[#98bffa] text-[13px] font-['DM_Sans:Medium',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
                      Click to change
                    </p>
                  </div>
                ) : (
                  <div className="flex items-center gap-3">
                    <Upload className="w-6 h-6 text-[#676a73] group-hover:text-[#3e88f7] transition-colors" />
                    <div>
                      <p className="text-[#d0d3db] text-[13px] font-['DM_Sans:Medium',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
                        Upload Favicon
                      </p>
                      <p className="text-[#676a73] text-[11px] font-['DM_Sans:Regular',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
                        ICO or PNG (32x32)
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Typography */}
            <div className="mb-8">
              <h3 className="text-white text-[16px] font-['DM_Sans:SemiBold',_sans-serif] mb-4" style={{ fontVariationSettings: "'opsz' 14" }}>
                Typography
              </h3>
              <div className="bg-[#0F1117] border-2 border-[#013280] rounded-lg p-4 space-y-4">
                <div>
                  <label className="text-[#d0d3db] text-[13px] font-['DM_Sans:Medium',_sans-serif] block mb-2" style={{ fontVariationSettings: "'opsz' 14" }}>
                    Heading Font
                  </label>
                  <select
                    value={brandColors.headingFont}
                    onChange={(e) => handleFontChange('heading', e.target.value)}
                    className="w-full px-3 py-2 bg-[#0F1117] border-2 border-[#013280] rounded text-[#d0d3db] text-[13px] font-['DM_Sans:Medium',_sans-serif] focus:border-[#3e88f7] focus:outline-none transition-colors cursor-pointer"
                    style={{ fontVariationSettings: "'opsz' 14" }}
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
                <div>
                  <label className="text-[#d0d3db] text-[13px] font-['DM_Sans:Medium',_sans-serif] block mb-2" style={{ fontVariationSettings: "'opsz' 14" }}>
                    Body Font
                  </label>
                  <select
                    value={brandColors.bodyFont}
                    onChange={(e) => handleFontChange('body', e.target.value)}
                    className="w-full px-3 py-2 bg-[#0F1117] border-2 border-[#013280] rounded text-[#d0d3db] text-[13px] font-['DM_Sans:Medium',_sans-serif] focus:border-[#3e88f7] focus:outline-none transition-colors cursor-pointer"
                    style={{ fontVariationSettings: "'opsz' 14" }}
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
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white text-[16px] font-['DM_Sans:SemiBold',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
                  Color Palette
                </h3>
                <button
                  onClick={handleResetAll}
                  className="px-3 py-1.5 bg-[#4A4D54] hover:bg-[#676A73] text-[#d0d3db] rounded text-[12px] font-['DM_Sans:Medium',_sans-serif] transition-colors flex items-center gap-1.5"
                  style={{ fontVariationSettings: "'opsz' 14" }}
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  Reset All
                </button>
              </div>

              {/* Screenshot Upload */}
              <div className="mb-6">
                <button
                  onClick={handleScreenshotUpload}
                  className="w-full px-4 py-3 bg-[#01255e] hover:bg-[#013280] border-2 border-[#013280] hover:border-[#3e88f7] rounded-lg text-[#98bffa] text-[13px] font-['DM_Sans:SemiBold',_sans-serif] transition-all flex items-center justify-center gap-2"
                  style={{ fontVariationSettings: "'opsz' 14" }}
                >
                  <Image className="w-4 h-4" />
                  Extract Colors from Screenshot
                </button>
                <p className="text-[#676a73] text-[11px] font-['DM_Sans:Regular',_sans-serif] mt-2 text-center" style={{ fontVariationSettings: "'opsz' 14" }}>
                  Upload an image to automatically extract a matching color palette
                </p>
              </div>

              {/* Preset Selector */}
              <div className="mb-6 flex gap-2">
                <button
                  onClick={() => handlePresetChange('hostbuddy-original-dark')}
                  className={`flex-1 px-4 py-2.5 rounded-lg text-[13px] font-['DM_Sans:SemiBold',_sans-serif] transition-all ${
                    currentPreset === 'hostbuddy-original-dark'
                      ? 'bg-[#3e88f7] text-white border-2 border-[#3e88f7]'
                      : 'bg-[#0F1117] text-[#676a73] border-2 border-[#013280] hover:border-[#3e88f7] hover:text-[#a6a9b2]'
                  }`}
                  style={{ 
                    fontVariationSettings: "'opsz' 14",
                    ...(currentPreset === 'hostbuddy-original-dark' ? { boxShadow: '0 0 15px rgba(62, 136, 247, 0.3)' } : {})
                  }}
                >
                  Dark Mode
                </button>
                
                <button
                  onClick={() => handlePresetChange('hostbuddy-original-light')}
                  className={`flex-1 px-4 py-2.5 rounded-lg text-[13px] font-['DM_Sans:SemiBold',_sans-serif] transition-all ${
                    currentPreset === 'hostbuddy-original-light'
                      ? 'bg-[#3e88f7] text-white border-2 border-[#3e88f7]'
                      : 'bg-[#0F1117] text-[#676a73] border-2 border-[#013280] hover:border-[#3e88f7] hover:text-[#a6a9b2]'
                  }`}
                  style={{ 
                    fontVariationSettings: "'opsz' 14",
                    ...(currentPreset === 'hostbuddy-original-light' ? { boxShadow: '0 0 15px rgba(62, 136, 247, 0.3)' } : {})
                  }}
                >
                  Light Mode
                </button>
              </div>

              {/* Color Groups */}
              <div className="space-y-6">
                {/* Background Colors */}
                <div className="bg-[#0F1117] border-2 border-[#013280] rounded-lg p-4">
                  <h4 className="text-[#98bffa] text-[13px] font-['DM_Sans:SemiBold',_sans-serif] mb-3 uppercase tracking-wide" style={{ fontVariationSettings: "'opsz' 14" }}>
                    Backgrounds
                  </h4>
                  <div className="space-y-1">
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
                <div className="bg-[#0F1117] border-2 border-[#013280] rounded-lg p-4">
                  <h4 className="text-[#98bffa] text-[13px] font-['DM_Sans:SemiBold',_sans-serif] mb-3 uppercase tracking-wide" style={{ fontVariationSettings: "'opsz' 14" }}>
                    Text
                  </h4>
                  <div className="space-y-1">
                    <ColorInput label="Primary" value={brandColors.primaryText} onChange={(v) => handleColorChange('primaryText', v)} description="Headings & labels" />
                    <ColorInput label="Secondary" value={brandColors.secondaryText} onChange={(v) => handleColorChange('secondaryText', v)} description="Body text" />
                    <ColorInput label="Tertiary" value={brandColors.tertiaryText} onChange={(v) => handleColorChange('tertiaryText', v)} description="Muted text" />
                    <ColorInput label="Quaternary" value={brandColors.quaternaryText} onChange={(v) => handleColorChange('quaternaryText', v)} description="Inactive text" />
                    <ColorInput label="Disabled" value={brandColors.disabledText} onChange={(v) => handleColorChange('disabledText', v)} description="Disabled states" />
                    <ColorInput label="Placeholder" value={brandColors.placeholderText} onChange={(v) => handleColorChange('placeholderText', v)} description="Input placeholders" />
                  </div>
                </div>

                {/* Border Colors */}
                <div className="bg-[#0F1117] border-2 border-[#013280] rounded-lg p-4">
                  <h4 className="text-[#98bffa] text-[13px] font-['DM_Sans:SemiBold',_sans-serif] mb-3 uppercase tracking-wide" style={{ fontVariationSettings: "'opsz' 14" }}>
                    Borders
                  </h4>
                  <div className="space-y-1">
                    <ColorInput label="Primary" value={brandColors.primaryBorder} onChange={(v) => handleColorChange('primaryBorder', v)} description="Standard borders" />
                    <ColorInput label="Active" value={brandColors.activeBorder} onChange={(v) => handleColorChange('activeBorder', v)} description="Focus & hover" />
                    <ColorInput label="Inactive" value={brandColors.inactiveBorder} onChange={(v) => handleColorChange('inactiveBorder', v)} description="Inactive elements" />
                  </div>
                </div>

                {/* Interactive Colors */}
                <div className="bg-[#0F1117] border-2 border-[#013280] rounded-lg p-4">
                  <h4 className="text-[#98bffa] text-[13px] font-['DM_Sans:SemiBold',_sans-serif] mb-3 uppercase tracking-wide" style={{ fontVariationSettings: "'opsz' 14" }}>
                    Interactive
                  </h4>
                  <div className="space-y-1">
                    <ColorInput label="Primary Blue" value={brandColors.primaryBlue} onChange={(v) => handleColorChange('primaryBlue', v)} description="Main brand color" />
                    <ColorInput label="Primary Hover" value={brandColors.primaryBlueHover} onChange={(v) => handleColorChange('primaryBlueHover', v)} description="Primary hover" />
                    <ColorInput label="Light Blue" value={brandColors.lightBlue} onChange={(v) => handleColorChange('lightBlue', v)} description="Link text" />
                    <ColorInput label="Secondary Button" value={brandColors.secondaryButtonBg} onChange={(v) => handleColorChange('secondaryButtonBg', v)} description="Secondary buttons" />
                    <ColorInput label="Secondary Hover" value={brandColors.secondaryButtonHover} onChange={(v) => handleColorChange('secondaryButtonHover', v)} description="Secondary hover" />
                  </div>
                </div>

                {/* Status Colors */}
                <div className="bg-[#0F1117] border-2 border-[#013280] rounded-lg p-4">
                  <h4 className="text-[#98bffa] text-[13px] font-['DM_Sans:SemiBold',_sans-serif] mb-3 uppercase tracking-wide" style={{ fontVariationSettings: "'opsz' 14" }}>
                    Status
                  </h4>
                  <div className="space-y-1">
                    <ColorInput label="Success Green" value={brandColors.successGreen} onChange={(v) => handleColorChange('successGreen', v)} description="Success states" />
                    <ColorInput label="Current Green" value={brandColors.currentGreen} onChange={(v) => handleColorChange('currentGreen', v)} description="Current indicators" />
                    <ColorInput label="Warning Orange" value={brandColors.warningOrange} onChange={(v) => handleColorChange('warningOrange', v)} description="Warnings" />
                    <ColorInput label="Error Red" value={brandColors.errorRed} onChange={(v) => handleColorChange('errorRed', v)} description="Error states" />
                    <ColorInput label="Destructive Red" value={brandColors.destructiveRed} onChange={(v) => handleColorChange('destructiveRed', v)} description="Delete actions" />
                  </div>
                </div>

                {/* Component Colors */}
                <div className="bg-[#0F1117] border-2 border-[#013280] rounded-lg p-4">
                  <h4 className="text-[#98bffa] text-[13px] font-['DM_Sans:SemiBold',_sans-serif] mb-3 uppercase tracking-wide" style={{ fontVariationSettings: "'opsz' 14" }}>
                    Components
                  </h4>
                  <div className="space-y-1">
                    <ColorInput label="Toggle Off" value={brandColors.toggleBgOff} onChange={(v) => handleColorChange('toggleBgOff', v)} description="Disabled toggles" />
                    <ColorInput label="Cancel Button" value={brandColors.cancelButton} onChange={(v) => handleColorChange('cancelButton', v)} description="Cancel buttons" />
                    <ColorInput label="Cancel Hover" value={brandColors.cancelButtonHover} onChange={(v) => handleColorChange('cancelButtonHover', v)} description="Cancel hover" />
                    <ColorInput label="Dropdown Select" value={brandColors.dropdownSelect} onChange={(v) => handleColorChange('dropdownSelect', v)} description="Dropdown text" />
                    <ColorInput label="Table Header" value={brandColors.tableHeaderBg} onChange={(v) => handleColorChange('tableHeaderBg', v)} description="Table headers" />
                    <ColorInput label="Table Row Hover" value={brandColors.tableRowHover} onChange={(v) => handleColorChange('tableRowHover', v)} description="Table hover" />
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-6 pt-6 border-t-2 border-[#013280]">
                  <div className="flex flex-col gap-3">
                    <button
                      onClick={() => showSaveSuccess('Branding configuration saved successfully')}
                      className="w-full px-6 py-2.5 bg-[#0F1117] border-2 border-[#013280] hover:border-[#3e88f7] text-[#d0d3db] rounded-lg text-[14px] font-['DM_Sans:SemiBold',_sans-serif] transition-colors flex items-center justify-center gap-2"
                      style={{ fontVariationSettings: "'opsz' 14" }}
                    >
                      <Save className="w-4 h-4" />
                      Save
                    </button>
                    <button
                      className="w-full px-6 py-2.5 bg-[#01255e] hover:bg-[#013280] border-2 border-[#013280] hover:border-[#3e88f7] text-[#98bffa] rounded-lg text-[14px] font-['DM_Sans:SemiBold',_sans-serif] transition-colors flex items-center justify-center gap-2"
                      style={{ fontVariationSettings: "'opsz' 14" }}
                    >
                      <Eye className="w-4 h-4" />
                      Preview in Sandbox
                    </button>
                    <button
                      onClick={() => showSaveSuccess('Branding configuration published successfully')}
                      className="w-full px-6 py-2.5 bg-[#3e88f7] hover:bg-[#74A9F7] text-white rounded-lg text-[14px] font-['DM_Sans:SemiBold',_sans-serif] transition-colors flex items-center justify-center gap-2"
                      style={{ 
                        fontVariationSettings: "'opsz' 14",
                        boxShadow: '0 0 20px rgba(62, 136, 247, 0.3)'
                      }}
                    >
                      <ExternalLink className="w-4 h-4" />
                      Publish Live
                    </button>
                  </div>
                </div>
              </div>
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
                      Live Preview
                    </h2>
                    <p className="text-[12px] font-['DM_Sans:Regular',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14", color: brandColors.quaternaryText }}>
                      Visual representation of our various pages - not an exact rendition
                    </p>
                  </div>
                  <div className="px-3 py-1.5 rounded-full border" style={{ backgroundColor: brandColors.hoverBg, borderColor: brandColors.primaryBorder }}>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-[#4ADE80] rounded-full animate-pulse" />
                      <span className="text-[#4ADE80] text-[11px] font-['DM_Sans:SemiBold',_sans-serif] uppercase tracking-wide" style={{ fontVariationSettings: "'opsz' 14" }}>
                        Live
                      </span>
                    </div>
                  </div>
                </div>

                {/* Preview Content */}
                <div className="flex-1 overflow-auto flex">
                  {/* Simulated Sidebar */}
                  <div className="w-[200px] h-screen flex-shrink-0 border-r" style={{ backgroundColor: brandColors.secondaryBg, borderColor: brandColors.primaryBorder }}>
                    <div className="px-2 py-4 h-full flex flex-col gap-2">
                      {/* Logo Area */}
                      <div className="mb-2 px-0.5">
                        {logoUrl ? (
                          <img src={logoUrl} alt="Logo" className="max-h-10 w-full object-contain" />
                        ) : (
                          <div className="h-10 rounded flex items-center justify-center text-[10px] font-['DM_Sans:SemiBold',_sans-serif] border-2 border-dashed" style={{ backgroundColor: brandColors.primaryBg, color: brandColors.tertiaryText, borderColor: brandColors.primaryBorder }}>
                            Your Logo
                          </div>
                        )}
                      </div>

                      {/* Menu Items */}
                      <div className="flex flex-col">
                        {[
                          { id: 'dashboard' as PreviewPage, label: 'Dashboard' },
                          { id: 'properties' as PreviewPage, label: 'Properties' },
                          { id: 'messaging' as PreviewPage, label: 'Messaging' },
                          { id: 'actionitems' as PreviewPage, label: 'Action Items' },
                          { id: 'insights' as PreviewPage, label: 'Insights' },
                          { id: 'settings' as PreviewPage, label: 'Settings' }
                        ].map(item => (
                          <button
                            key={item.id}
                            onClick={() => setPreviewPage(item.id)}
                            className="h-10 px-3 rounded-[4px] flex items-center text-[14px] relative transition-all text-left"
                            style={{ 
                              fontVariationSettings: "'opsz' 14",
                              backgroundColor: previewPage === item.id ? brandColors.hoverBg : 'transparent',
                              color: previewPage === item.id ? brandColors.lightBlue : brandColors.tertiaryText,
                              fontFamily: previewPage === item.id ? "'DM_Sans:SemiBold', sans-serif" : "'DM_Sans:Medium', sans-serif"
                            }}
                            onMouseEnter={(e) => {
                              if (previewPage !== item.id) {
                                e.currentTarget.style.backgroundColor = brandColors.hoverBg;
                              }
                            }}
                            onMouseLeave={(e) => {
                              if (previewPage !== item.id) {
                                e.currentTarget.style.backgroundColor = 'transparent';
                              }
                            }}
                          >
                            {previewPage === item.id && (
                              <div className="absolute h-3.5 left-0 top-1/2 -translate-y-1/2 w-[3px] rounded-br-[2px] rounded-tr-[2px]" style={{ backgroundColor: brandColors.primaryBlue }} />
                            )}
                            {item.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Main Content */}
                  <div 
                    className="flex-1 p-8 overflow-auto min-h-screen"
                    style={{ backgroundColor: brandColors.primaryBg }}
                  >
                    {previewPage === 'dashboard' && <DashboardPreview brandColors={brandColors} />}
                    {previewPage === 'properties' && <PropertiesPreview brandColors={brandColors} />}
                    {previewPage === 'messaging' && <MessagingPreview brandColors={brandColors} faviconUrl={faviconUrl || brandColors.faviconUrl} />}
                    {previewPage === 'actionitems' && <ActionItemsPreview brandColors={brandColors} />}
                    {previewPage === 'insights' && <InsightsPreview brandColors={brandColors} />}
                    {previewPage === 'settings' && <SettingsPreview brandColors={brandColors} />}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Feature Selection - Full Width Layout */}
        {configSection === 'feature-selection' && (
          <div className="flex-1 h-full overflow-y-auto">
            <div className="p-12">
              <div>
                {/* Stats Overview */}
                <div className="grid grid-cols-3 gap-4 mb-8">
                  <div 
                    className="bg-[#0F1117] border-2 border-[#013280] rounded-xl p-4 hover:border-[#3e88f7] transition-all duration-300"
                    style={{ boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)' }}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div 
                        className="w-10 h-10 rounded-lg flex items-center justify-center"
                        style={{ 
                          background: 'linear-gradient(135deg, #3e88f7 0%, #98bffa 100%)',
                          boxShadow: '0 0 8px rgba(62, 136, 247, 0.15)'
                        }}
                      >
                        <Package className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <div className="text-[#d0d3db] text-[24px] font-['DM_Sans:Bold',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
                          {featureModules.filter(f => f.version === 'v1').length}
                        </div>
                        <div className="text-[#a6a9b2] text-[11px] font-['DM_Sans:Medium',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
                          Available
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div 
                    className="bg-[#0F1117] border-2 border-[#013280] rounded-xl p-4 hover:border-[#3e88f7] transition-all duration-300"
                    style={{ boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)' }}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div 
                        className="w-10 h-10 rounded-lg flex items-center justify-center"
                        style={{ 
                          background: 'linear-gradient(135deg, #10B981 0%, #34D399 100%)',
                          boxShadow: '0 0 8px rgba(16, 185, 129, 0.15)'
                        }}
                      >
                        <Zap className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <div className="text-[#d0d3db] text-[24px] font-['DM_Sans:Bold',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
                          {featureModules.filter(f => f.enabled).length}
                        </div>
                        <div className="text-[#a6a9b2] text-[11px] font-['DM_Sans:Medium',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
                          Enabled
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div 
                    className="bg-[#0F1117] border-2 border-[#013280] rounded-xl p-4 hover:border-[#3e88f7] transition-all duration-300"
                    style={{ boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)' }}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div 
                        className="w-10 h-10 rounded-lg flex items-center justify-center"
                        style={{ 
                          background: 'linear-gradient(135deg, #FB923C 0%, #FDBA74 100%)',
                          boxShadow: '0 0 8px rgba(251, 146, 60, 0.15)'
                        }}
                      >
                        <Clock className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <div className="text-[#d0d3db] text-[24px] font-['DM_Sans:Bold',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
                          {featureModules.filter(f => f.version === 'v2').length}
                        </div>
                        <div className="text-[#a6a9b2] text-[11px] font-['DM_Sans:Medium',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
                          Coming Soon
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-[#a6a9b2] text-[13px] font-['DM_Sans:Regular',_sans-serif] mb-6" style={{ fontVariationSettings: "'opsz' 14" }}>
                  Configure which modules are available to your end users. Toggle features on/off and access API documentation for custom integrations.
                </p>

                {/* V1 Modules */}
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-3">
                      <h3 className="text-white text-[18px] font-['DM_Sans:Bold',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
                        Available Modules
                      </h3>
                      <div 
                        className="px-3 py-1 rounded-full flex items-center gap-1.5"
                        style={{ 
                          background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(52, 211, 153, 0.15) 100%)',
                          border: '1.5px solid rgba(16, 185, 129, 0.3)'
                        }}
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-[#10B981]" style={{ boxShadow: '0 0 4px rgba(16, 185, 129, 0.5)' }} />
                        <span className="text-[#10B981] text-[11px] font-['DM_Sans:SemiBold',_sans-serif] uppercase tracking-wide" style={{ fontVariationSettings: "'opsz' 14" }}>
                          Ready Now
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-4">
                    {featureModules.filter(f => f.version === 'v1').map((feature, idx) => {
                      const icons = [Building2, FileText, Sparkles, DollarSign, MessageSquare, ListTodo];
                      const IconComponent = icons[idx] || Package;
                      
                      return (
                        <div 
                          key={feature.id}
                          className="group bg-[#0F1117] border-2 border-[#013280] rounded-xl p-5 hover:border-[#3e88f7] transition-all duration-300"
                          style={{ 
                            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
                            ...(feature.enabled && { background: 'linear-gradient(135deg, rgba(62, 136, 247, 0.03) 0%, rgba(0, 0, 0, 0) 100%)' })
                          }}
                        >
                          <div className="flex items-start gap-4">
                            {/* Icon */}
                            <div 
                              className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-300"
                              style={{ 
                                background: feature.enabled 
                                  ? 'linear-gradient(135deg, #3e88f7 0%, #98bffa 100%)'
                                  : 'linear-gradient(135deg, #17191f 0%, #0F1117 100%)',
                                border: feature.enabled ? 'none' : '1.5px solid #013280',
                                boxShadow: feature.enabled ? '0 0 12px rgba(62, 136, 247, 0.25)' : 'none'
                              }}
                            >
                              <IconComponent 
                                className="w-6 h-6" 
                                style={{ color: feature.enabled ? '#ffffff' : '#676A73' }}
                              />
                            </div>

                            {/* Content */}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between mb-2">
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-1">
                                    <h4 className="text-[#d0d3db] text-[15px] font-['DM_Sans:SemiBold',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
                                      {feature.name}
                                    </h4>
                                    {feature.enabled && (
                                      <div 
                                        className="w-2 h-2 rounded-full" 
                                        style={{ 
                                          backgroundColor: '#10B981', 
                                          boxShadow: '0 0 6px rgba(16, 185, 129, 0.4)' 
                                        }} 
                                      />
                                    )}
                                  </div>
                                  <p className="text-[#a6a9b2] text-[13px] font-['DM_Sans:Regular',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
                                    {feature.description}
                                  </p>
                                </div>
                              </div>

                              {/* Module Link */}
                              <div className="mb-3">
                                <div className="flex items-center gap-2 bg-[#0F1117] border border-[#013280] rounded-lg px-3 py-2">
                                  <span className="text-[#676a73] text-[11px] font-['DM_Sans:Medium',_sans-serif] flex-1 truncate" style={{ fontVariationSettings: "'opsz' 14" }}>
                                    {getFeatureLink(feature.id)}
                                  </span>
                                  <button
                                    onClick={() => {
                                      navigator.clipboard.writeText(getFeatureLink(feature.id));
                                      showSaveSuccess('Link copied to clipboard');
                                    }}
                                    className="px-2 py-1 bg-[#01255e] hover:bg-[#013280] border border-[#013280] hover:border-[#3e88f7] text-[#98bffa] hover:text-white text-[11px] font-['DM_Sans:SemiBold',_sans-serif] rounded transition-all duration-300 flex items-center gap-1.5 flex-shrink-0"
                                    style={{ fontVariationSettings: "'opsz' 14" }}
                                  >
                                    <Copy className="w-3 h-3" />
                                    Copy
                                  </button>
                                </div>
                              </div>

                              {/* Controls */}
                              <div className="flex items-center gap-3 mt-4">
                                <button
                                  onClick={() => handleConfigureClick(feature.name)}
                                  className="px-4 py-2 bg-[#01255e] hover:bg-[#013280] border border-[#013280] hover:border-[#3e88f7] text-[#98bffa] text-[12px] font-['DM_Sans:SemiBold',_sans-serif] rounded-lg transition-all duration-300 flex items-center gap-2"
                                  style={{ fontVariationSettings: "'opsz' 14", boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)' }}
                                >
                                  <ExternalLink className="w-3.5 h-3.5" />
                                  API Docs
                                </button>
                                
                                <div className="flex items-center gap-2">
                                  <span className="text-[#676a73] text-[11px] font-['DM_Sans:Medium',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
                                    {feature.enabled ? 'Enabled' : 'Disabled'}
                                  </span>
                                  <div 
                                    onClick={() => handleFeatureToggle(feature.id)}
                                    className="w-14 h-7 rounded-full p-1 cursor-pointer transition-all duration-300"
                                    style={{ 
                                      backgroundColor: feature.enabled ? '#3e88f7' : '#676A73', 
                                      boxShadow: feature.enabled ? '0 0 8px rgba(62, 136, 247, 0.3), inset 0 1px 2px rgba(0, 0, 0, 0.2)' : 'inset 0 1px 2px rgba(0, 0, 0, 0.3)' 
                                    }}
                                  >
                                    <div 
                                      className="w-5 h-5 bg-white rounded-full transition-all duration-300"
                                      style={{ 
                                        transform: feature.enabled ? 'translateX(28px)' : 'translateX(0)',
                                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)'
                                      }}
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* V2 Modules */}
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-3">
                      <h3 className="text-white text-[18px] font-['DM_Sans:Bold',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
                        Upcoming Modules
                      </h3>
                      <div 
                        className="px-3 py-1 rounded-full flex items-center gap-1.5"
                        style={{ 
                          background: 'linear-gradient(135deg, rgba(251, 146, 60, 0.15) 0%, rgba(253, 186, 116, 0.15) 100%)',
                          border: '1.5px solid rgba(251, 146, 60, 0.3)'
                        }}
                      >
                        <Clock className="w-3 h-3 text-[#FB923C]" />
                        <span className="text-[#FB923C] text-[11px] font-['DM_Sans:SemiBold',_sans-serif] uppercase tracking-wide" style={{ fontVariationSettings: "'opsz' 14" }}>
                          Q1 2026
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-4">
                    {featureModules.filter(f => f.version === 'v2').map((feature, idx) => {
                      const icons = [Activity, Settings, Grid3x3];
                      const IconComponent = icons[idx] || Package;
                      
                      return (
                        <div 
                          key={feature.id}
                          className="relative bg-[#0F1117] border-2 border-[#013280] rounded-xl p-5 opacity-60"
                          style={{ boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)' }}
                        >
                          <div className="flex items-start gap-4">
                            {/* Icon */}
                            <div 
                              className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
                              style={{ 
                                background: 'linear-gradient(135deg, #17191f 0%, #0F1117 100%)',
                                border: '1.5px solid #013280'
                              }}
                            >
                              <IconComponent className="w-6 h-6 text-[#676A73]" />
                            </div>

                            {/* Content */}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between mb-2">
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-1">
                                    <h4 className="text-[#d0d3db] text-[15px] font-['DM_Sans:SemiBold',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
                                      {feature.name}
                                    </h4>
                                    <div 
                                      className="px-2 py-0.5 rounded flex items-center gap-1"
                                      style={{ backgroundColor: 'rgba(103, 106, 115, 0.2)', border: '1px solid #676A73' }}
                                    >
                                      <Lock className="w-2.5 h-2.5 text-[#676a73]" />
                                      <span className="text-[#676a73] text-[9px] font-['DM_Sans:SemiBold',_sans-serif] uppercase" style={{ fontVariationSettings: "'opsz' 14" }}>
                                        Locked
                                      </span>
                                    </div>
                                  </div>
                                  <p className="text-[#a6a9b2] text-[13px] font-['DM_Sans:Regular',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
                                    {feature.description}
                                  </p>
                                </div>
                              </div>

                              {/* Module Link */}
                              <div className="mb-3 opacity-60">
                                <div className="flex items-center gap-2 bg-[#0F1117] border border-[#013280] rounded-lg px-3 py-2">
                                  <span className="text-[#676a73] text-[11px] font-['DM_Sans:Medium',_sans-serif] flex-1 truncate" style={{ fontVariationSettings: "'opsz' 14" }}>
                                    {getFeatureLink(feature.id)}
                                  </span>
                                  <button
                                    disabled
                                    className="px-2 py-1 bg-[#0F1117] border border-[#013280] text-[#676a73] text-[11px] font-['DM_Sans:SemiBold',_sans-serif] rounded cursor-not-allowed flex items-center gap-1.5 flex-shrink-0"
                                    style={{ fontVariationSettings: "'opsz' 14" }}
                                  >
                                    <Copy className="w-3 h-3" />
                                    Copy
                                  </button>
                                </div>
                              </div>

                              {/* Controls */}
                              <div className="flex items-center gap-3 mt-4">
                                <button
                                  disabled
                                  className="px-4 py-2 bg-[#0F1117] border border-[#013280] text-[#676a73] text-[12px] font-['DM_Sans:SemiBold',_sans-serif] rounded-lg cursor-not-allowed flex items-center gap-2"
                                  style={{ fontVariationSettings: "'opsz' 14" }}
                                >
                                  <ExternalLink className="w-3.5 h-3.5" />
                                  API Docs
                                </button>
                                
                                <div className="flex items-center gap-2 opacity-50">
                                  <span className="text-[#676a73] text-[11px] font-['DM_Sans:Medium',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
                                    Disabled
                                  </span>
                                  <div 
                                    className="w-14 h-7 rounded-full p-1 cursor-not-allowed"
                                    style={{ backgroundColor: '#676A73' }}
                                  >
                                    <div 
                                      className="w-5 h-5 bg-white rounded-full"
                                      style={{ boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)' }}
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Integration Options */}
                <div 
                  className="relative rounded-xl p-6 mb-6 overflow-hidden"
                  style={{ 
                    background: 'linear-gradient(135deg, #2D1B69 0%, #1a0f3d 100%)',
                    border: '2px solid #6B46C1',
                    boxShadow: '0 8px 32px rgba(107, 70, 193, 0.15)'
                  }}
                >
                  {/* Glow Effect */}
                  <div 
                    className="absolute top-0 right-0 w-40 h-40 rounded-full blur-3xl opacity-10"
                    style={{ background: 'radial-gradient(circle, #A78BFA 0%, transparent 70%)' }}
                  />
                  
                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-5">
                      <div 
                        className="w-10 h-10 rounded-lg flex items-center justify-center"
                        style={{ 
                          background: 'linear-gradient(135deg, #8B5CF6 0%, #A78BFA 100%)',
                          boxShadow: '0 0 8px rgba(139, 92, 246, 0.2)'
                        }}
                      >
                        <Grid3x3 className="w-5 h-5 text-white" />
                      </div>
                      <h4 className="text-[#E9D5FF] text-[16px] font-['DM_Sans:Bold',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
                        Integration Options
                      </h4>
                    </div>
                    
                    <div className="space-y-4">
                      {/* Option 1 */}
                      <div 
                        className="bg-black bg-opacity-20 rounded-lg p-4 border border-[#6B46C1] hover:border-[#8B5CF6] transition-all duration-300"
                        style={{ boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}
                      >
                        <div className="flex items-start gap-3">
                          <div 
                            className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                            style={{ background: 'rgba(167, 139, 250, 0.2)', border: '1px solid #8B5CF6' }}
                          >
                            <span className="text-[#E9D5FF] text-[13px] font-['DM_Sans:Bold',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
                              1
                            </span>
                          </div>
                          <div className="flex-1">
                            <p className="text-[#E9D5FF] text-[14px] font-['DM_Sans:SemiBold',_sans-serif] mb-1" style={{ fontVariationSettings: "'opsz' 14" }}>
                              Hosted White-Label Portal
                            </p>
                            <p className="text-[#C4B5FD] text-[12px] font-['DM_Sans:Regular',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
                              Deploy instantly with our fully managed infrastructure. Your branding, our technology—no development required.
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Option 2 */}
                      <div 
                        className="bg-black bg-opacity-20 rounded-lg p-4 border border-[#6B46C1] hover:border-[#8B5CF6] transition-all duration-300"
                        style={{ boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}
                      >
                        <div className="flex items-start gap-3">
                          <div 
                            className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                            style={{ background: 'rgba(167, 139, 250, 0.2)', border: '1px solid #8B5CF6' }}
                          >
                            <span className="text-[#E9D5FF] text-[13px] font-['DM_Sans:Bold',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
                              2
                            </span>
                          </div>
                          <div className="flex-1">
                            <p className="text-[#E9D5FF] text-[14px] font-['DM_Sans:SemiBold',_sans-serif] mb-1" style={{ fontVariationSettings: "'opsz' 14" }}>
                              Custom API Integration
                            </p>
                            <p className="text-[#C4B5FD] text-[12px] font-['DM_Sans:Regular',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
                              Build your own interface while leveraging our AI engine. Access API documentation via "API Docs" buttons above.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div 
                      className="mt-4 p-3 rounded-lg flex items-start gap-2"
                      style={{ background: 'rgba(167, 139, 250, 0.1)', border: '1px solid rgba(139, 92, 246, 0.3)' }}
                    >
                      <Sparkles className="w-4 h-4 text-[#A78BFA] flex-shrink-0 mt-0.5" />
                      <p className="text-[#C4B5FD] text-[11px] font-['DM_Sans:Regular',_sans-serif] italic" style={{ fontVariationSettings: "'opsz' 14" }}>
                        Mix and match: Use our hosted portal for some features while integrating others via API into your existing platform.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Info Box */}
                <div 
                  className="bg-[#01255e] bg-opacity-30 border-2 border-[#3e88f7] rounded-xl p-4 mb-6"
                  style={{ boxShadow: '0 0 12px rgba(62, 136, 247, 0.08)' }}
                >
                  <div className="flex items-start gap-3">
                    <div 
                      className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ background: 'rgba(62, 136, 247, 0.2)', border: '1px solid #3e88f7' }}
                    >
                      <Image className="w-4 h-4 text-[#98bffa]" />
                    </div>
                    <p className="text-[#98bffa] text-[12px] font-['DM_Sans:Medium',_sans-serif] flex-1" style={{ fontVariationSettings: "'opsz' 14" }}>
                      <strong className="font-['DM_Sans:SemiBold',_sans-serif]">Tenant-Wide Settings:</strong> Feature availability applies to all users in your organization. Enabled modules will be immediately accessible to your end users.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Domain Configuration - Full Width Layout */}
        {configSection === 'domain-configuration' && (
          <div className="flex-1 h-full overflow-y-auto">
            <div className="p-12">
              <div className="space-y-8">
                {/* Connected Domains */}
                <div 
                  className="bg-[#0F1117] border-2 border-[#013280] rounded-xl p-6"
                  style={{ boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)' }}
                >
                  <div className="mb-4">
                    <h3 className="text-white text-[18px] font-['DM_Sans:Bold',_sans-serif] mb-2" style={{ fontVariationSettings: "'opsz' 14" }}>
                      Connected domains
                    </h3>
                    <p className="text-[#a6a9b2] text-[13px] font-['DM_Sans:Regular',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
                      Connect a domain from a third-party provider. <a href="#" className="text-[#3e88f7] hover:text-[#98bffa]">Learn more</a>
                    </p>
                  </div>

                  {!isEditingDomain && !customDomain ? (
                    <button
                      onClick={() => {
                        setIsEditingDomain(true);
                        setTempDomain('');
                      }}
                      className="w-full px-4 py-3 bg-[#01255e] hover:bg-[#013280] border-2 border-[#013280] hover:border-[#3e88f7] rounded-lg text-[#98bffa] hover:text-white text-[14px] font-['DM_Sans:SemiBold',_sans-serif] transition-all duration-300"
                      style={{ fontVariationSettings: "'opsz' 14" }}
                    >
                      + Add Domain
                    </button>
                  ) : null}

                  {isEditingDomain && (
                    <div className="space-y-3">
                      <input
                        type="text"
                        value={tempDomain}
                        onChange={(e) => setTempDomain(e.target.value)}
                        placeholder="www.mywebsite.com"
                        className="w-full px-4 py-3 bg-[#17191f] border-2 border-[#013280] rounded-lg text-[#d0d3db] text-[14px] font-['DM_Sans:Regular',_sans-serif] placeholder:text-[#676A73] focus:border-[#3e88f7] focus:outline-none transition-colors"
                        style={{ fontVariationSettings: "'opsz' 14" }}
                      />
                      <div className="flex items-center gap-3">
                        <button
                          onClick={handleCancelDomain}
                          className="px-4 py-2 text-[#a6a9b2] hover:text-white text-[14px] font-['DM_Sans:SemiBold',_sans-serif] transition-colors"
                          style={{ fontVariationSettings: "'opsz' 14" }}
                        >
                          Cancel
                        </button>
                        <button
                          onClick={handleSaveDomain}
                          disabled={!tempDomain}
                          className="px-6 py-2 bg-[#3e88f7] hover:bg-[#74A9F7] disabled:bg-[#676A73] disabled:cursor-not-allowed text-white rounded-lg text-[14px] font-['DM_Sans:SemiBold',_sans-serif] transition-all"
                          style={{ fontVariationSettings: "'opsz' 14", boxShadow: tempDomain ? '0 0 15px rgba(62, 136, 247, 0.3)' : 'none' }}
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  )}

                  {customDomain && !isEditingDomain && (
                    <div className="space-y-4">
                      <div className="bg-[#17191f] border-2 border-[#013280] rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <span className="text-[#d0d3db] text-[14px] font-['DM_Sans:Medium',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
                            {customDomain}
                          </span>
                          <button
                            onClick={() => {
                              setTempDomain(customDomain);
                              setIsEditingDomain(true);
                            }}
                            className="text-[#3e88f7] hover:text-[#98bffa] text-[13px] font-['DM_Sans:SemiBold',_sans-serif] transition-colors"
                            style={{ fontVariationSettings: "'opsz' 14" }}
                          >
                            Edit
                          </button>
                        </div>
                      </div>

                      {/* Set domain redirect toggle (optional) */}
                      <div className="flex items-center justify-between pt-4 border-t-2 border-[#013280]">
                        <div>
                          <h4 className="text-[#d0d3db] text-[14px] font-['DM_Sans:SemiBold',_sans-serif] mb-1" style={{ fontVariationSettings: "'opsz' 14" }}>
                            Set domain redirect
                          </h4>
                          <p className="text-[#a6a9b2] text-[12px] font-['DM_Sans:Regular',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
                            Using a redirect will make it simpler for people to access your site.
                          </p>
                        </div>
                        <div 
                          className="w-14 h-7 rounded-full p-1 cursor-pointer transition-all duration-300"
                          style={{ 
                            backgroundColor: '#3e88f7', 
                            boxShadow: '0 0 8px rgba(62, 136, 247, 0.3), inset 0 1px 2px rgba(0, 0, 0, 0.2)' 
                          }}
                        >
                          <div 
                            className="w-5 h-5 bg-white rounded-full transition-all duration-300"
                            style={{ 
                              transform: 'translateX(28px)',
                              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)'
                            }}
                          />
                        </div>
                      </div>

                      {/* Redirect info */}
                      <div className="bg-[#0F1117] border border-[#013280] rounded-lg p-3 space-y-1">
                        <div className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-[#10B981] mt-0.5 flex-shrink-0" />
                          <p className="text-[#d0d3db] text-[12px] font-['DM_Sans:Medium',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
                            Redirect www.{customDomain} to {customDomain}
                          </p>
                        </div>
                        <div className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-[#10B981] mt-0.5 flex-shrink-0" />
                          <p className="text-[#d0d3db] text-[12px] font-['DM_Sans:Medium',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
                            Redirect {customDomain} to www.{customDomain}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* System Architecture & Authentication Flow */}
                <div 
                  className="bg-[#0F1117] border-2 border-[#013280] rounded-xl p-6"
                  style={{ boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)' }}
                >
                  <h3 className="text-white text-[18px] font-['DM_Sans:Bold',_sans-serif] mb-6" style={{ fontVariationSettings: "'opsz' 14" }}>
                    System Architecture & Authentication Flow
                  </h3>

                  {/* Configuration Publishing */}
                  <div className="mb-8">
                    <h4 className="text-[#98bffa] text-[16px] font-['DM_Sans:SemiBold',_sans-serif] mb-4" style={{ fontVariationSettings: "'opsz' 14" }}>
                      Configuration Publishing
                    </h4>
                    
                    <div className="flex items-center gap-4 mb-4">
                      <div 
                        className="px-4 py-3 rounded-lg bg-[#3e88f7] text-white text-[14px] font-['DM_Sans:SemiBold',_sans-serif]"
                        style={{ fontVariationSettings: "'opsz' 14", boxShadow: '0 0 12px rgba(62, 136, 247, 0.3)' }}
                      >
                        Master Account Portal
                      </div>
                      
                      <div className="text-[#676A73] text-[18px]">→</div>
                      
                      <div 
                        className="px-4 py-3 rounded-lg bg-[#17191f] border-2 border-[#013280] text-[#d0d3db] text-[14px] font-['DM_Sans:SemiBold',_sans-serif]"
                        style={{ fontVariationSettings: "'opsz' 14" }}
                      >
                        Branding + Settings
                      </div>
                      
                      <div className="text-[#676A73] text-[18px]">→</div>
                      
                      <div 
                        className="px-4 py-3 rounded-lg bg-[#10B981] text-white text-[14px] font-['DM_Sans:SemiBold',_sans-serif]"
                        style={{ fontVariationSettings: "'opsz' 14", boxShadow: '0 0 12px rgba(16, 185, 129, 0.3)' }}
                      >
                        Live Tenant (portal.partnername.com)
                      </div>
                    </div>
                    
                    <p className="text-[#a6a9b2] text-[13px] font-['DM_Sans:Regular',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
                      Real-time updates: Changes to branding and feature toggles apply instantly to preview and live environments
                    </p>
                  </div>

                  {/* End-User Authentication (SSO) */}
                  <div>
                    <h4 className="text-[#98bffa] text-[16px] font-['DM_Sans:SemiBold',_sans-serif] mb-4" style={{ fontVariationSettings: "'opsz' 14" }}>
                      End-User Authentication (SSO)
                    </h4>
                    
                    <div className="flex items-center gap-4 mb-4">
                      <div 
                        className="px-4 py-3 rounded-lg bg-[#676A73] text-white text-[14px] font-['DM_Sans:SemiBold',_sans-serif]"
                        style={{ fontVariationSettings: "'opsz' 14" }}
                      >
                        Partner PMS
                      </div>
                      
                      <div className="text-[#676A73] text-[18px]">→</div>
                      
                      <div 
                        className="px-4 py-3 rounded-lg text-white text-[14px] font-['DM_Sans:SemiBold',_sans-serif]"
                        style={{ 
                          fontVariationSettings: "'opsz' 14",
                          background: 'linear-gradient(135deg, #8B5CF6 0%, #A78BFA 100%)',
                          boxShadow: '0 0 12px rgba(139, 92, 246, 0.3)'
                        }}
                      >
                        JWT Token
                      </div>
                      
                      <div className="text-[#676A73] text-[18px]">→</div>
                      
                      <div 
                        className="px-4 py-3 rounded-lg bg-[#10B981] text-white text-[14px] font-['DM_Sans:SemiBold',_sans-serif]"
                        style={{ fontVariationSettings: "'opsz' 14", boxShadow: '0 0 12px rgba(16, 185, 129, 0.3)' }}
                      >
                        Branded Portal
                      </div>
                    </div>
                    
                    <div className="bg-[#01255e] bg-opacity-30 border border-[#3e88f7] rounded-lg p-3">
                      <p className="text-[#98bffa] text-[13px] font-['DM_Sans:Regular',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
                        Uses <code className="px-1.5 py-0.5 bg-[#17191f] rounded text-[#98bffa] font-['DM_Sans:Medium',_sans-serif]">{'get_autoaccount_token'}</code> Master Account endpoint for secure session creation
                      </p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4 border-t-2 border-[#013280]">
                  <button
                    className="flex-1 px-6 py-2 bg-[#0F1117] border-2 border-[#013280] hover:border-[#3e88f7] text-[#d0d3db] rounded-lg text-[14px] font-['DM_Sans:SemiBold',_sans-serif] transition-colors flex items-center justify-center gap-2"
                    style={{ fontVariationSettings: "'opsz' 14" }}
                  >
                    <Eye className="w-4 h-4" />
                    Preview in Sandbox
                  </button>
                  <button
                    onClick={() => showSaveSuccess('White label configuration published successfully')}
                    className="flex-1 px-6 py-2 bg-[#3e88f7] hover:bg-[#74A9F7] text-white rounded-lg text-[14px] font-['DM_Sans:SemiBold',_sans-serif] transition-colors flex items-center justify-center gap-2"
                    style={{ 
                      fontVariationSettings: "'opsz' 14",
                      boxShadow: '0 0 20px rgba(62, 136, 247, 0.3)'
                    }}
                  >
                    <Save className="w-4 h-4" />
                    Publish Live
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* API Documentation Modal */}
      <APIDocumentationModal 
        isOpen={apiModalOpen}
        onClose={() => setApiModalOpen(false)}
        featureName={selectedFeatureForApi}
      />
    </div>
  );
}
