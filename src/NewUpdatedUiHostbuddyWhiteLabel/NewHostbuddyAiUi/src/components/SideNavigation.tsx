import { useState } from 'react';
import svgPaths from "../imports/svg-2ulr0e3i7w";
import imgAvatar from "figma:asset/56bb66f7699260e83e4640bfd5d4fb2714728f14.png";
import logoImage from "figma:asset/bfa2eca34ff1871bdef279ce3bfab39aee5f270b.png";

function Isotype() {
  return (
    <div className="relative shrink-0 size-[40px]" data-name="Isotype">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 40 40">
        <g id="Isotype">
          <rect fill="var(--fill-0, #17191f)" height="40" rx="4" width="40" />
          <path d={svgPaths.p76d4a80} fill="url(#paint0_linear_1_10020)" id="Icon" />
        </g>
        <defs>
          <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_1_10020" x1="20" x2="20" y1="5.35187" y2="34.6478">
            <stop stopColor="#1FA8ED" />
            <stop offset="0.535" stopColor="#1155C0" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

function Type() {
  return (
    <div className="h-[40px] relative shrink-0 w-[112px]" data-name="Type">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 112 40">
        <g id="Type">
          <g id="Type_2">
            <path clipRule="evenodd" d={svgPaths.p272ed100} fill="white" fillRule="evenodd" />
            <path clipRule="evenodd" d={svgPaths.p26abe200} fill="white" fillRule="evenodd" />
            <path clipRule="evenodd" d={svgPaths.p11485100} fill="white" fillRule="evenodd" />
            <path d={svgPaths.p7bfcb80} fill="white" />
            <path d={svgPaths.p21e3cf00} fill="white" />
            <path d={svgPaths.pd7eca80} fill="white" />
            <path clipRule="evenodd" d={svgPaths.p1b083e00} fill="white" fillRule="evenodd" />
            <path d={svgPaths.pbb67780} fill="white" />
            <path d={svgPaths.p3c4100} fill="white" />
            <path clipRule="evenodd" d={svgPaths.pb3c10f0} fill="white" fillRule="evenodd" />
            <path d={svgPaths.pfd64300} fill="white" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function NavLogo() {
  return (
    <div className="content-stretch flex gap-[6px] items-center relative shrink-0" data-name="Nav Logo">
      <Isotype />
      <Type />
    </div>
  );
}

function LogoContainer() {
  return (
    <div className="relative shrink-0 w-full" data-name="Logo Container">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[8px] items-start px-[2px] py-0 relative w-full">
          <NavLogo />
        </div>
      </div>
    </div>
  );
}

function Stars01({ isActive }: { isActive?: boolean }) {
  const color = isActive ? '#98bffa' : '#676A73';
  return (
    <div className="relative shrink-0 size-[20px]" data-name="stars-01">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g clipPath="url(#clip0_1_9973)" id="stars-01">
          <g id="Icon">
            <path d={svgPaths.pf8e9f00} stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
            <path d={svgPaths.p182ed8f0} stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          </g>
        </g>
        <defs>
          <clipPath id="clip0_1_9973">
            <rect fill="white" height="20" width="20" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function SideNavItem({ isActive, onClick }: { isActive?: boolean; onClick?: () => void }) {
  return (
    <div 
      className={`${isActive ? 'bg-[#01255e]' : 'bg-[rgba(255,255,255,0)] hover:bg-[#01255e]'} h-[40px] relative rounded-[4px] shrink-0 w-full cursor-pointer transition-colors`} 
      data-name="_Side Nav Item" 
      onClick={onClick}
    >
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[6px] h-[40px] items-center pl-[12px] pr-[8px] py-0 relative w-full">
          <Stars01 isActive={isActive} />
          <p className={`basis-0 font-['DM_Sans:${isActive ? 'SemiBold' : 'Medium'}',_sans-serif] ${isActive ? 'font-semibold' : 'font-medium'} grow leading-[normal] min-h-px min-w-px relative shrink-0 text-[${isActive ? '#98bffa' : '#a6a9b2'}] text-[14px]`} style={{ fontVariationSettings: "'opsz' 14" }}>
            Get Started
          </p>
          {isActive && <div className="absolute bg-[#3e88f7] h-[14px] left-0 rounded-br-[2px] rounded-tr-[2px] top-1/2 translate-y-[-50%] w-[3px]" data-name="Selection Indicator" />}
        </div>
      </div>
    </div>
  );
}

function BarChartSquare01({ isActive }: { isActive?: boolean }) {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="bar-chart-square-01">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="bar-chart-square-01">
          <path d={svgPaths.p2b280a00} id="Icon" stroke={isActive ? "var(--stroke-0, #98bffa)" : "var(--stroke-0, #676A73)"} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function Badge({ count }: { count: number }) {
  return (
    <div className="bg-[rgba(189,193,201,0.08)] box-border content-stretch flex gap-[8px] h-[18px] items-center justify-center min-w-[18px] px-[2px] py-0 relative rounded-[20px] shrink-0" data-name="Badge">
      <div className="flex flex-col font-['DM_Sans:SemiBold',_sans-serif] font-semibold justify-center leading-[0] overflow-ellipsis overflow-hidden relative shrink-0 text-[#a6a9b2] text-[12px] text-center text-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[normal] overflow-ellipsis overflow-hidden whitespace-pre">{count}</p>
      </div>
    </div>
  );
}

function SideNavItem1({ isActive, onClick }: { isActive?: boolean; onClick?: () => void }) {
  return (
    <div 
      className={`${isActive ? 'bg-[#01255e]' : 'bg-[rgba(255,255,255,0)] hover:bg-[#01255e]'} h-[40px] relative rounded-[4px] shrink-0 w-full cursor-pointer transition-colors`} 
      data-name="_Side Nav Item" 
      onClick={onClick}
    >
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[6px] h-[40px] items-center pl-[12px] pr-[8px] py-0 relative w-full">
          <BarChartSquare01 isActive={isActive} />
          <p className={`basis-0 font-['DM_Sans:${isActive ? 'SemiBold' : 'Medium'}',_sans-serif] ${isActive ? 'font-semibold' : 'font-medium'} grow leading-[normal] min-h-px min-w-px relative shrink-0 text-[${isActive ? '#98bffa' : '#a6a9b2'}] text-[14px]`} style={{ fontVariationSettings: "'opsz' 14" }}>
            Dashboard
          </p>
          {isActive && <div className="absolute bg-[#3e88f7] h-[14px] left-0 rounded-br-[2px] rounded-tr-[2px] top-1/2 translate-y-[-50%] w-[3px]" data-name="Selection Indicator" />}
        </div>
      </div>
    </div>
  );
}

function HomeSmile() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="home-smile">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="home-smile">
          <path d={svgPaths.p34ac5f00} id="Icon" stroke="var(--stroke-0, #676A73)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function ChevronDown({ onClick }: { onClick?: () => void }) {
  return (
    <div className="relative shrink-0 size-[20px] cursor-pointer" data-name="chevron-down" onClick={(e) => {
      e.stopPropagation();
      onClick?.();
    }}>
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="chevron-down">
          <path d="M5 7.5L10 12.5L15 7.5" id="Icon" stroke="var(--stroke-0, #676A73)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function SideNavItem2({ isActive, onClick }: { isActive?: boolean; onClick?: () => void }) {
  return (
    <div 
      className={`${isActive ? 'bg-[#01255e]' : 'bg-[rgba(255,255,255,0)] hover:bg-[#01255e]'} h-[40px] relative rounded-[4px] shrink-0 w-full cursor-pointer transition-colors`} 
      data-name="_Side Nav Item" 
      onClick={onClick}
    >
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[6px] h-[40px] items-center pl-[12px] pr-[8px] py-0 relative w-full">
          <HomeSmile />
          <p className={`basis-0 font-['DM_Sans:${isActive ? 'SemiBold' : 'Medium'}',_sans-serif] ${isActive ? 'font-semibold' : 'font-medium'} grow leading-[normal] min-h-px min-w-px relative shrink-0 text-[${isActive ? '#98bffa' : '#a6a9b2'}] text-[14px]`} style={{ fontVariationSettings: "'opsz' 14" }}>
            Properties
          </p>
          {isActive && <div className="absolute bg-[#3e88f7] h-[14px] left-0 rounded-br-[2px] rounded-tr-[2px] top-1/2 translate-y-[-50%] w-[3px]" data-name="Selection Indicator" />}
        </div>
      </div>
    </div>
  );
}

function MessageDotsCircle() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="message-dots-circle">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="message-dots-circle">
          <path d={svgPaths.p36db6b00} id="Icon" stroke="var(--stroke-0, #676A73)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function ChevronUp({ onClick }: { onClick?: () => void }) {
  return (
    <div className="relative shrink-0 size-[20px] cursor-pointer" data-name="chevron-up" onClick={(e) => {
      e.stopPropagation();
      onClick?.();
    }}>
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="chevron-up">
          <path d="M15 12.5L10 7.5L5 12.5" id="Icon" stroke="var(--stroke-0, #676A73)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function SideNavItem3({ isExpanded, onToggle }: { isExpanded: boolean; onToggle: () => void }) {
  return (
    <div 
      className="bg-[rgba(255,255,255,0)] hover:bg-[#01255e] h-[40px] relative rounded-[4px] shrink-0 w-full cursor-pointer transition-colors" 
      data-name="_Side Nav Item"
      onClick={onToggle}
    >
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[6px] h-[40px] items-center pl-[12px] pr-[8px] py-0 relative w-full">
          <MessageDotsCircle />
          <p className="basis-0 font-['DM_Sans:Medium',_sans-serif] font-medium grow leading-[normal] min-h-px min-w-px relative shrink-0 text-[#a6a9b2] text-[14px]" style={{ fontVariationSettings: "'opsz' 14" }}>
            Messaging
          </p>
          {isExpanded ? (
            <ChevronUp />
          ) : (
            <ChevronDown />
          )}
        </div>
      </div>
    </div>
  );
}

function Badge1({ count }: { count: number }) {
  return (
    <div className="bg-[#3e88f7] box-border content-stretch flex gap-[8px] h-[18px] items-center justify-center min-w-[18px] px-[2px] py-0 relative rounded-[20px] shrink-0" data-name="Badge">
      <div className="flex flex-col font-['DM_Sans:SemiBold',_sans-serif] font-semibold justify-center leading-[0] overflow-ellipsis overflow-hidden relative shrink-0 text-[#001330] text-[12px] text-center text-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[normal] overflow-ellipsis overflow-hidden whitespace-pre">{count}</p>
      </div>
    </div>
  );
}

function SideNavItem4({ isActive, onClick }: { isActive?: boolean; onClick?: () => void }) {
  return (
    <div 
      className={`${isActive ? 'bg-[#01255e]' : 'bg-[rgba(255,255,255,0)] hover:bg-[#01255e]'} h-[32px] relative rounded-[4px] shrink-0 w-full cursor-pointer transition-colors`} 
      data-name="_Side Nav Item" 
      onClick={onClick}
    >
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[6px] h-[32px] items-center pl-[12px] pr-[8px] py-0 relative w-full">
          <p className={`basis-0 font-['DM_Sans:${isActive ? 'SemiBold' : 'Medium'}',_sans-serif] ${isActive ? 'font-semibold' : 'font-medium'} grow leading-[normal] min-h-px min-w-px relative shrink-0 text-[${isActive ? '#98bffa' : '#a6a9b2'}] text-[14px]`} style={{ fontVariationSettings: "'opsz' 14" }}>
            Inbox
          </p>
          {isActive && <div className="absolute bg-[#3e88f7] h-[14px] left-0 rounded-br-[2px] rounded-tr-[2px] top-1/2 translate-y-[-50%] w-[3px]" data-name="Selection Indicator" />}
        </div>
      </div>
    </div>
  );
}

function SideNavItem5({ isActive, onClick }: { isActive?: boolean; onClick?: () => void }) {
  return (
    <div 
      className={`${isActive ? 'bg-[#01255e]' : 'bg-[rgba(255,255,255,0)] hover:bg-[#01255e]'} h-[32px] relative rounded-[4px] shrink-0 w-full cursor-pointer transition-colors`} 
      data-name="_Side Nav Item" 
      onClick={onClick}
    >
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[6px] h-[32px] items-center pl-[12px] pr-[8px] py-0 relative w-full">
          <p className={`basis-0 font-['DM_Sans:${isActive ? 'SemiBold' : 'Medium'}',_sans-serif] ${isActive ? 'font-semibold' : 'font-medium'} grow leading-[normal] min-h-px min-w-px relative shrink-0 text-[${isActive ? '#98bffa' : '#a6a9b2'}] text-[14px]`} style={{ fontVariationSettings: "'opsz' 14" }}>
            Smart Templates
          </p>
          {isActive && <div className="absolute bg-[#3e88f7] h-[14px] left-0 rounded-br-[2px] rounded-tr-[2px] top-1/2 translate-y-[-50%] w-[3px]" data-name="Selection Indicator" />}
        </div>
      </div>
    </div>
  );
}

function SideNavItem6({ isActive, onClick }: { isActive?: boolean; onClick?: () => void }) {
  return (
    <div 
      className={`${isActive ? 'bg-[#01255e]' : 'bg-[rgba(255,255,255,0)] hover:bg-[#01255e]'} h-[32px] relative rounded-[4px] shrink-0 w-full cursor-pointer transition-colors`} 
      data-name="_Side Nav Item" 
      onClick={onClick}
    >
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[6px] h-[32px] items-center pl-[12px] pr-[8px] py-0 relative w-full">
          <p className={`basis-0 font-['DM_Sans:${isActive ? 'SemiBold' : 'Medium'}',_sans-serif] ${isActive ? 'font-semibold' : 'font-medium'} grow leading-[normal] min-h-px min-w-px relative shrink-0 text-[${isActive ? '#98bffa' : '#a6a9b2'}] text-[14px]`} style={{ fontVariationSettings: "'opsz' 14" }}>
            Preferences
          </p>
          {isActive && <div className="absolute bg-[#3e88f7] h-[14px] left-0 rounded-br-[2px] rounded-tr-[2px] top-1/2 translate-y-[-50%] w-[3px]" data-name="Selection Indicator" />}
        </div>
      </div>
    </div>
  );
}

function SideNavItem7({ isActive, onClick }: { isActive?: boolean; onClick?: () => void }) {
  return (
    <div 
      className={`${isActive ? 'bg-[#01255e]' : 'bg-[rgba(255,255,255,0)] hover:bg-[#01255e]'} h-[32px] relative rounded-[4px] shrink-0 w-full cursor-pointer transition-colors`} 
      data-name="_Side Nav Item" 
      onClick={onClick}
    >
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[6px] h-[32px] items-center pl-[12px] pr-[8px] py-0 relative w-full">
          <p className={`basis-0 font-['DM_Sans:${isActive ? 'SemiBold' : 'Medium'}',_sans-serif] ${isActive ? 'font-semibold' : 'font-medium'} grow leading-[normal] min-h-px min-w-px relative shrink-0 text-[${isActive ? '#98bffa' : '#a6a9b2'}] text-[14px]`} style={{ fontVariationSettings: "'opsz' 14" }}>
            Upsells
          </p>
          {isActive && <div className="absolute bg-[#3e88f7] h-[14px] left-0 rounded-br-[2px] rounded-tr-[2px] top-1/2 translate-y-[-50%] w-[3px]" data-name="Selection Indicator" />}
        </div>
      </div>
    </div>
  );
}



function SubItems({ currentPage, onNavigate }: { currentPage: string; onNavigate: (page: string) => void }) {
  return (
    <div className="relative shrink-0 w-full" data-name="Sub Items">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col items-start p-[8px] relative w-full">
          <SideNavItem4 isActive={currentPage === 'inbox'} onClick={() => onNavigate('inbox')} />
          <SideNavItem5 isActive={currentPage === 'smarttemplates'} onClick={() => onNavigate('smarttemplates')} />
          <SideNavItem6 isActive={currentPage === 'preferences'} onClick={() => onNavigate('preferences')} />
          <SideNavItem7 isActive={currentPage === 'upsells'} onClick={() => onNavigate('upsells')} />
        </div>
      </div>
    </div>
  );
}

function MenuExpanded({ currentPage, onNavigate, isExpanded, onToggle }: { currentPage: string; onNavigate: (page: string) => void; isExpanded: boolean; onToggle: () => void }) {
  return (
    <div className={`${isExpanded ? 'bg-[#0F1117]' : 'bg-[rgba(255,255,255,0)]'} content-stretch flex flex-col items-start relative rounded-[4px] shrink-0 w-full`} data-name="Menu Expanded">
      <SideNavItem3 isExpanded={isExpanded} onToggle={onToggle} />
      {isExpanded && <SubItems currentPage={currentPage} onNavigate={onNavigate} />}
    </div>
  );
}

function CheckDone02({ isActive }: { isActive?: boolean }) {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="check-done-02">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g clipPath="url(#clip0_1_10073)" id="check-done-02">
          <path d={svgPaths.p3765a000} id="Icon" stroke={isActive ? "var(--stroke-0, #98bffa)" : "var(--stroke-0, #676A73)"} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
        <defs>
          <clipPath id="clip0_1_10073">
            <rect fill="white" height="20" width="20" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function SideNavItem9({ isActive, onClick }: { isActive?: boolean; onClick?: () => void }) {
  return (
    <div 
      className={`${isActive ? 'bg-[#01255e]' : 'bg-[rgba(255,255,255,0)] hover:bg-[#01255e]'} h-[40px] relative rounded-[4px] shrink-0 w-full cursor-pointer transition-colors`} 
      data-name="_Side Nav Item" 
      onClick={onClick}
    >
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[6px] h-[40px] items-center pl-[12px] pr-[8px] py-0 relative w-full">
          <CheckDone02 isActive={isActive} />
          <p className={`basis-0 font-['DM_Sans:${isActive ? 'SemiBold' : 'Medium'}',_sans-serif] ${isActive ? 'font-semibold' : 'font-medium'} grow leading-[normal] min-h-px min-w-px relative shrink-0 text-[${isActive ? '#98bffa' : '#a6a9b2'}] text-[14px]`} style={{ fontVariationSettings: "'opsz' 14" }}>
            Action Items
          </p>
          {isActive && <div className="absolute bg-[#3e88f7] h-[14px] left-0 rounded-br-[2px] rounded-tr-[2px] top-1/2 translate-y-[-50%] w-[3px]" data-name="Selection Indicator" />}
        </div>
      </div>
    </div>
  );
}

function PieChart01({ isActive }: { isActive?: boolean }) {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="pie-chart-01">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g clipPath="url(#clip0_1_9906)" id="pie-chart-01">
          <path d={svgPaths.p3f2fed80} id="Icon" stroke={isActive ? "var(--stroke-0, #98bffa)" : "var(--stroke-0, #676A73)"} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
        <defs>
          <clipPath id="clip0_1_9906">
            <rect fill="white" height="20" width="20" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function SideNavItem10({ isActive, onClick }: { isActive?: boolean; onClick?: () => void }) {
  return (
    <div 
      className={`${isActive ? 'bg-[#01255e]' : 'bg-[rgba(255,255,255,0)] hover:bg-[#01255e]'} h-[40px] relative rounded-[4px] shrink-0 w-full cursor-pointer transition-colors`} 
      data-name="_Side Nav Item" 
      onClick={onClick}
    >
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[6px] h-[40px] items-center pl-[12px] pr-[8px] py-0 relative w-full">
          <PieChart01 isActive={isActive} />
          <p className={`basis-0 font-['DM_Sans:${isActive ? 'SemiBold' : 'Medium'}',_sans-serif] ${isActive ? 'font-semibold' : 'font-medium'} grow leading-[normal] min-h-px min-w-px relative shrink-0 text-[${isActive ? '#98bffa' : '#a6a9b2'}] text-[14px]`} style={{ fontVariationSettings: "'opsz' 14" }}>
            Insights
          </p>
          {isActive && <div className="absolute bg-[#3e88f7] h-[14px] left-0 rounded-br-[2px] rounded-tr-[2px] top-1/2 translate-y-[-50%] w-[3px]" data-name="Selection Indicator" />}
        </div>
      </div>
    </div>
  );
}

function Sliders04() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="sliders-04">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="sliders-04">
          <path d={svgPaths.p186b9100} id="Icon" stroke="var(--stroke-0, #676A73)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function ChevronDown1() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="chevron-down">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="chevron-down">
          <path d="M5 7.5L10 12.5L15 7.5" id="Icon" stroke="var(--stroke-0, #676A73)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function SideNavItem11({ isExpanded, onToggle }: { isExpanded: boolean; onToggle: () => void }) {
  return (
    <div 
      className="bg-[rgba(255,255,255,0)] hover:bg-[#01255e] h-[40px] relative rounded-[4px] shrink-0 w-full cursor-pointer transition-colors" 
      data-name="_Side Nav Item" 
      onClick={onToggle}
    >
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[6px] h-[40px] items-center pl-[12px] pr-[8px] py-0 relative w-full">
          <Sliders04 />
          <p className="basis-0 font-['DM_Sans:Medium',_sans-serif] font-medium grow leading-[normal] min-h-px min-w-px relative shrink-0 text-[#a6a9b2] text-[14px]" style={{ fontVariationSettings: "'opsz' 14" }}>
            Settings
          </p>
          {isExpanded ? (
            <ChevronUp onClick={onToggle} />
          ) : (
            <ChevronDown1 onClick={onToggle} />
          )}
        </div>
      </div>
    </div>
  );
}

function SettingsSubItem1({ isActive, onClick }: { isActive?: boolean; onClick?: () => void }) {
  return (
    <div 
      className={`${isActive ? 'bg-[#01255e]' : 'bg-[rgba(255,255,255,0)] hover:bg-[#01255e]'} h-[32px] relative rounded-[4px] shrink-0 w-full cursor-pointer transition-colors`} 
      data-name="_Side Nav Item" 
      onClick={onClick}
    >
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[6px] h-[32px] items-center pl-[12px] pr-[8px] py-0 relative w-full">
          <p className={`basis-0 font-['DM_Sans:${isActive ? 'SemiBold' : 'Medium'}',_sans-serif] ${isActive ? 'font-semibold' : 'font-medium'} grow leading-[normal] min-h-px min-w-px relative shrink-0 text-[${isActive ? '#98bffa' : '#a6a9b2'}] text-[14px]`} style={{ fontVariationSettings: "'opsz' 14" }}>
            Account
          </p>
          {isActive && <div className="absolute bg-[#3e88f7] h-[14px] left-0 rounded-br-[2px] rounded-tr-[2px] top-1/2 translate-y-[-50%] w-[3px]" data-name="Selection Indicator" />}
        </div>
      </div>
    </div>
  );
}

function SettingsSubItem2({ isActive, onClick }: { isActive?: boolean; onClick?: () => void }) {
  return (
    <div 
      className={`${isActive ? 'bg-[#01255e]' : 'bg-[rgba(255,255,255,0)] hover:bg-[#01255e]'} h-[32px] relative rounded-[4px] shrink-0 w-full cursor-pointer transition-colors`} 
      data-name="_Side Nav Item" 
      onClick={onClick}
    >
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[6px] h-[32px] items-center pl-[12px] pr-[8px] py-0 relative w-full">
          <p className={`basis-0 font-['DM_Sans:${isActive ? 'SemiBold' : 'Medium'}',_sans-serif] ${isActive ? 'font-semibold' : 'font-medium'} grow leading-[normal] min-h-px min-w-px relative shrink-0 text-[${isActive ? '#98bffa' : '#a6a9b2'}] text-[14px]`} style={{ fontVariationSettings: "'opsz' 14" }}>
            Contacts
          </p>
          {isActive && <div className="absolute bg-[#3e88f7] h-[14px] left-0 rounded-br-[2px] rounded-tr-[2px] top-1/2 translate-y-[-50%] w-[3px]" data-name="Selection Indicator" />}
        </div>
      </div>
    </div>
  );
}

function SettingsSubItem3({ isActive, onClick }: { isActive?: boolean; onClick?: () => void }) {
  return (
    <div 
      className={`${isActive ? 'bg-[#01255e]' : 'bg-[rgba(255,255,255,0)] hover:bg-[#01255e]'} h-[32px] relative rounded-[4px] shrink-0 w-full cursor-pointer transition-colors`} 
      data-name="_Side Nav Item" 
      onClick={onClick}
    >
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[6px] h-[32px] items-center pl-[12px] pr-[8px] py-0 relative w-full">
          <p className={`basis-0 font-['DM_Sans:${isActive ? 'SemiBold' : 'Medium'}',_sans-serif] ${isActive ? 'font-semibold' : 'font-medium'} grow leading-[normal] min-h-px min-w-px relative shrink-0 text-[${isActive ? '#98bffa' : '#a6a9b2'}] text-[14px]`} style={{ fontVariationSettings: "'opsz' 14" }}>
            Notifications
          </p>
          {isActive && <div className="absolute bg-[#3e88f7] h-[14px] left-0 rounded-br-[2px] rounded-tr-[2px] top-1/2 translate-y-[-50%] w-[3px]" data-name="Selection Indicator" />}
        </div>
      </div>
    </div>
  );
}

function SettingsSubItem4({ isActive, onClick }: { isActive?: boolean; onClick?: () => void }) {
  return (
    <div 
      className={`${isActive ? 'bg-[#01255e]' : 'bg-[rgba(255,255,255,0)] hover:bg-[#01255e]'} h-[32px] relative rounded-[4px] shrink-0 w-full cursor-pointer transition-colors`} 
      data-name="_Side Nav Item" 
      onClick={onClick}
    >
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[6px] h-[32px] items-center pl-[12px] pr-[8px] py-0 relative w-full">
          <p className={`basis-0 font-['DM_Sans:${isActive ? 'SemiBold' : 'Medium'}',_sans-serif] ${isActive ? 'font-semibold' : 'font-medium'} grow leading-[normal] min-h-px min-w-px relative shrink-0 text-[${isActive ? '#98bffa' : '#a6a9b2'}] text-[14px]`} style={{ fontVariationSettings: "'opsz' 14" }}>
            Action Items
          </p>
          {isActive && <div className="absolute bg-[#3e88f7] h-[14px] left-0 rounded-br-[2px] rounded-tr-[2px] top-1/2 translate-y-[-50%] w-[3px]" data-name="Selection Indicator" />}
        </div>
      </div>
    </div>
  );
}

function SettingsSubItem5({ isActive, onClick }: { isActive?: boolean; onClick?: () => void }) {
  return (
    <div 
      className={`${isActive ? 'bg-[#01255e]' : 'bg-[rgba(255,255,255,0)] hover:bg-[#01255e]'} h-[32px] relative rounded-[4px] shrink-0 w-full cursor-pointer transition-colors`} 
      data-name="_Side Nav Item" 
      onClick={onClick}
    >
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[6px] h-[32px] items-center pl-[12px] pr-[8px] py-0 relative w-full">
          <p className={`basis-0 font-['DM_Sans:${isActive ? 'SemiBold' : 'Medium'}',_sans-serif] ${isActive ? 'font-semibold' : 'font-medium'} grow leading-[normal] min-h-px min-w-px relative shrink-0 text-[${isActive ? '#98bffa' : '#a6a9b2'}] text-[14px]`} style={{ fontVariationSettings: "'opsz' 14" }}>
            Integrations
          </p>
          {isActive && <div className="absolute bg-[#3e88f7] h-[14px] left-0 rounded-br-[2px] rounded-tr-[2px] top-1/2 translate-y-[-50%] w-[3px]" data-name="Selection Indicator" />}
        </div>
      </div>
    </div>
  );
}

function SettingsSubItem6({ isActive, onClick }: { isActive?: boolean; onClick?: () => void }) {
  return (
    <div 
      className={`${isActive ? 'bg-[#01255e]' : 'bg-[rgba(255,255,255,0)] hover:bg-[#01255e]'} h-[32px] relative rounded-[4px] shrink-0 w-full cursor-pointer transition-colors`} 
      data-name="_Side Nav Item" 
      onClick={onClick}
    >
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[6px] h-[32px] items-center pl-[12px] pr-[8px] py-0 relative w-full">
          <p className={`basis-0 font-['DM_Sans:${isActive ? 'SemiBold' : 'Medium'}',_sans-serif] ${isActive ? 'font-semibold' : 'font-medium'} grow leading-[normal] min-h-px min-w-px relative shrink-0 text-[${isActive ? '#98bffa' : '#a6a9b2'}] text-[14px]`} style={{ fontVariationSettings: "'opsz' 14" }}>
            Users
          </p>
          {isActive && <div className="absolute bg-[#3e88f7] h-[14px] left-0 rounded-br-[2px] rounded-tr-[2px] top-1/2 translate-y-[-50%] w-[3px]" data-name="Selection Indicator" />}
        </div>
      </div>
    </div>
  );
}

function SettingsSubItem7({ isActive, onClick }: { isActive?: boolean; onClick?: () => void }) {
  return (
    <div 
      className={`${isActive ? 'bg-[#01255e]' : 'bg-[rgba(255,255,255,0)] hover:bg-[#01255e]'} h-[32px] relative rounded-[4px] shrink-0 w-full cursor-pointer transition-colors`} 
      data-name="_Side Nav Item" 
      onClick={onClick}
    >
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[6px] h-[32px] items-center pl-[12px] pr-[8px] py-0 relative w-full">
          <p className={`basis-0 font-['DM_Sans:${isActive ? 'SemiBold' : 'Medium'}',_sans-serif] ${isActive ? 'font-semibold' : 'font-medium'} grow leading-[normal] min-h-px min-w-px relative shrink-0 text-[${isActive ? '#98bffa' : '#a6a9b2'}] text-[14px]`} style={{ fontVariationSettings: "'opsz' 14" }}>
            Subscription
          </p>
          {isActive && <div className="absolute bg-[#3e88f7] h-[14px] left-0 rounded-br-[2px] rounded-tr-[2px] top-1/2 translate-y-[-50%] w-[3px]" data-name="Selection Indicator" />}
        </div>
      </div>
    </div>
  );
}



function SettingsSubItems({ currentPage, onNavigate }: { currentPage: string; onNavigate: (page: string) => void }) {
  return (
    <div className="relative shrink-0 w-full" data-name="Settings Sub Items">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col items-start p-[8px] relative w-full">
          <SettingsSubItem1 isActive={currentPage === 'account'} onClick={() => onNavigate('account')} />
          <SettingsSubItem2 isActive={currentPage === 'contacts'} onClick={() => onNavigate('contacts')} />
          <SettingsSubItem3 isActive={currentPage === 'notifications'} onClick={() => onNavigate('notifications')} />
          <SettingsSubItem4 isActive={currentPage === 'actionitems-settings'} onClick={() => onNavigate('actionitems-settings')} />
          <SettingsSubItem5 isActive={currentPage === 'integrations'} onClick={() => onNavigate('integrations')} />
          <SettingsSubItem6 isActive={currentPage === 'users'} onClick={() => onNavigate('users')} />
          <SettingsSubItem7 isActive={currentPage === 'subscription'} onClick={() => onNavigate('subscription')} />
        </div>
      </div>
    </div>
  );
}

function SettingsExpanded({ currentPage, onNavigate, isExpanded, onToggle }: { currentPage: string; onNavigate: (page: string) => void; isExpanded: boolean; onToggle: () => void }) {
  return (
    <div className={`${isExpanded ? 'bg-[#0F1117]' : 'bg-[rgba(255,255,255,0)]'} content-stretch flex flex-col items-start relative rounded-[4px] shrink-0 w-full`} data-name="Settings Expanded">
      <SideNavItem11 isExpanded={isExpanded} onToggle={onToggle} />
      {isExpanded && <SettingsSubItems currentPage={currentPage} onNavigate={onNavigate} />}
    </div>
  );
}

function MenuItems({ currentPage, onNavigate, isMessagingExpanded, onToggleMessaging, isSettingsExpanded, onToggleSettings }: { currentPage: string; onNavigate: (page: string) => void; isMessagingExpanded: boolean; onToggleMessaging: () => void; isSettingsExpanded: boolean; onToggleSettings: () => void }) {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Menu Items">
      <SideNavItem isActive={currentPage === 'getstarted'} onClick={() => onNavigate('getstarted')} />
      <SideNavItem1 isActive={currentPage === 'dashboard'} onClick={() => onNavigate('dashboard')} />
      <SideNavItem2 isActive={currentPage === 'properties'} onClick={() => onNavigate('properties')} />
      <MenuExpanded currentPage={currentPage} onNavigate={onNavigate} isExpanded={isMessagingExpanded} onToggle={onToggleMessaging} />
      <SideNavItem9 isActive={currentPage === 'actionitems'} onClick={() => onNavigate('actionitems')} />
      <SideNavItem10 isActive={currentPage === 'insights'} onClick={() => onNavigate('insights')} />
      <SettingsExpanded currentPage={currentPage} onNavigate={onNavigate} isExpanded={isSettingsExpanded} onToggle={onToggleSettings} />
    </div>
  );
}

function Top({ currentPage, onNavigate, isMessagingExpanded, onToggleMessaging, isSettingsExpanded, onToggleSettings }: { currentPage: string; onNavigate: (page: string) => void; isMessagingExpanded: boolean; onToggleMessaging: () => void; isSettingsExpanded: boolean; onToggleSettings: () => void }) {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full" data-name="Top">
      <LogoContainer />
      <MenuItems 
        currentPage={currentPage} 
        onNavigate={onNavigate} 
        isMessagingExpanded={isMessagingExpanded} 
        onToggleMessaging={onToggleMessaging} 
        isSettingsExpanded={isSettingsExpanded} 
        onToggleSettings={onToggleSettings} 
      />
    </div>
  );
}

function Icon() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.p2decdd00} id="Icon_2" stroke="var(--stroke-0, #A6A9B2)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function Button() {
  return (
    <div className="bg-[rgba(255,255,255,0)] box-border content-stretch flex gap-[4px] items-center justify-center px-[12px] py-0 relative rounded-[4px] shrink-0 size-[32px]" data-name="Button">
      <Icon />
    </div>
  );
}

function Account() {
  return (
    <div className="bg-[#0F1117] relative rounded-[4px] shrink-0 w-full" data-name="Account">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[8px] items-center p-[8px] relative w-full">
          <div className="pointer-events-none relative rounded-[4px] shrink-0 size-[32px]" data-name="Avatar">
            <div aria-hidden="true" className="absolute inset-0 rounded-[4px]">
              <div className="absolute bg-[#fff7b8] inset-0 rounded-[4px]" />
              <img alt="" className="absolute max-w-none object-50%-50% object-cover rounded-[4px] size-full" src={imgAvatar} />
            </div>
            <div aria-hidden="true" className="absolute border-2 border-[#013280] border-solid inset-[-2px] rounded-[6px]" />
          </div>
          <p className="basis-0 font-['DM_Sans:SemiBold',_sans-serif] font-semibold grow leading-[normal] min-h-px min-w-px relative shrink-0 text-[#d0d3db] text-[14px]" style={{ fontVariationSettings: "'opsz' 14" }}>
            Robert Fox
          </p>
          <Button />
        </div>
      </div>
    </div>
  );
}

function HelpCircle() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="help-circle">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g clipPath="url(#clip0_1_10000)" id="help-circle">
          <path d={svgPaths.p2a852000} id="Icon" stroke="var(--stroke-0, #676A73)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
        <defs>
          <clipPath id="clip0_1_10000">
            <rect fill="white" height="20" width="20" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function SideNavItem12({ onClick }: { onClick?: () => void }) {
  return (
    <div className="bg-[rgba(255,255,255,0)] h-[40px] relative rounded-[4px] shrink-0 w-full cursor-pointer" data-name="_Side Nav Item" onClick={onClick}>
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[6px] h-[40px] items-center pl-[12px] pr-[8px] py-0 relative w-full">
          <HelpCircle />
          <p className="basis-0 font-['DM_Sans:Medium',_sans-serif] font-medium grow leading-[normal] min-h-px min-w-px relative shrink-0 text-[#a6a9b2] text-[14px]" style={{ fontVariationSettings: "'opsz' 14" }}>{`Help & Support`}</p>
        </div>
      </div>
    </div>
  );
}

function ChevronLeftDouble() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="chevron-left-double">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="chevron-left-double">
          <path d={svgPaths.p15761e80} id="Icon" stroke="var(--stroke-0, #676A73)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function SideNavItem13({ onClick }: { onClick?: () => void }) {
  return (
    <div className="bg-[rgba(255,255,255,0)] h-[40px] relative rounded-[4px] shrink-0 w-full cursor-pointer" data-name="_Side Nav Item" onClick={onClick}>
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[6px] h-[40px] items-center pl-[12px] pr-[8px] py-0 relative w-full">
          <ChevronLeftDouble />
          <p className="basis-0 font-['DM_Sans:Medium',_sans-serif] font-medium grow leading-[normal] min-h-px min-w-px relative shrink-0 text-[#a6a9b2] text-[14px]" style={{ fontVariationSettings: "'opsz' 14" }}>
            Collapse Menu
          </p>
        </div>
      </div>
    </div>
  );
}

function LogOut01() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="log-out-01">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="log-out-01">
          <path d="M7.5 17.5H4.16667C3.72464 17.5 3.30072 17.3244 2.98816 17.0118C2.67559 16.6993 2.5 16.2754 2.5 15.8333V4.16667C2.5 3.72464 2.67559 3.30072 2.98816 2.98816C3.30072 2.67559 3.72464 2.5 4.16667 2.5H7.5" stroke="#676A73" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"/>
          <path d="M13.3333 14.1667L17.5 10L13.3333 5.83334" stroke="#676A73" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"/>
          <path d="M17.5 10H7.5" stroke="#676A73" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"/>
        </g>
      </svg>
    </div>
  );
}

function Users01() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="users-01">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="users-01">
          <path d="M15 17.5V15.8333C15 14.9493 14.6488 14.1014 14.0237 13.4763C13.3986 12.8512 12.5507 12.5 11.6667 12.5H8.33333C7.44928 12.5 6.60143 12.8512 5.97631 13.4763C5.35119 14.1014 5 14.9493 5 15.8333V17.5M13.3333 5.83333C13.3333 7.67428 11.841 9.16667 10 9.16667C8.15905 9.16667 6.66667 7.67428 6.66667 5.83333C6.66667 3.99238 8.15905 2.5 10 2.5C11.841 2.5 13.3333 3.99238 13.3333 5.83333Z" stroke="#676A73" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"/>
        </g>
      </svg>
    </div>
  );
}

function SideNavItemMasterAccount({ onClick }: { onClick?: () => void }) {
  return (
    <div className="bg-[rgba(255,255,255,0)] h-[32px] relative rounded-[4px] shrink-0 w-full hover:bg-[#01255e] transition-colors cursor-pointer" data-name="_Side Nav Item" onClick={onClick}>
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[8px] h-[32px] items-center pl-[12px] pr-[8px] py-0 relative w-full">
          <Users01 />
          <p className="basis-0 font-['DM_Sans:Medium',_sans-serif] font-medium grow leading-[normal] min-h-px min-w-px relative shrink-0 text-[#a6a9b2] text-[14px]" style={{ fontVariationSettings: "'opsz' 14" }}>
            Master Account
          </p>
        </div>
      </div>
    </div>
  );
}

function SideNavItemLogout({ onClick }: { onClick?: () => void }) {
  return (
    <div className="bg-[rgba(255,255,255,0)] h-[32px] relative rounded-[4px] shrink-0 w-full hover:bg-[#01255e] transition-colors cursor-pointer" data-name="_Side Nav Item" onClick={onClick}>
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[8px] h-[32px] items-center pl-[12px] pr-[8px] py-0 relative w-full">
          <LogOut01 />
          <p className="basis-0 font-['DM_Sans:Medium',_sans-serif] font-medium grow leading-[normal] min-h-px min-w-px relative shrink-0 text-[#a6a9b2] text-[14px]" style={{ fontVariationSettings: "'opsz' 14" }}>
            Log Out
          </p>
        </div>
      </div>
    </div>
  );
}

function HelpCircle2() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="help-circle">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g clipPath="url(#clip0_helpcircle2)" id="help-circle">
          <circle cx="10" cy="10" r="8.125" stroke="#676A73" strokeWidth="1.5"/>
          <path d="M10 14.375V14.375" stroke="#676A73" strokeLinecap="round" strokeWidth="1.5"/>
          <path d="M10 11.25V10.625C10 9.58947 10.8395 8.75 11.875 8.75V8.75C12.9105 8.75 13.75 7.91053 13.75 6.875V6.875C13.75 5.83947 12.9105 5 11.875 5H10.625C9.58947 5 8.75 5.83947 8.75 6.875V6.875" stroke="#676A73" strokeLinecap="round" strokeWidth="1.5"/>
        </g>
        <defs>
          <clipPath id="clip0_helpcircle2">
            <rect fill="white" height="20" width="20" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function SideNavItemHelp({ onClick }: { onClick?: () => void }) {
  return (
    <div className="bg-[rgba(255,255,255,0)] h-[32px] relative rounded-[4px] shrink-0 w-full hover:bg-[#01255e] transition-colors cursor-pointer" data-name="_Side Nav Item" onClick={onClick}>
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[8px] h-[32px] items-center pl-[12px] pr-[8px] py-0 relative w-full">
          <HelpCircle2 />
          <p className="basis-0 font-['DM_Sans:Medium',_sans-serif] font-medium grow leading-[normal] min-h-px min-w-px relative shrink-0 text-[#a6a9b2] text-[14px]" style={{ fontVariationSettings: "'opsz' 14" }}>{`Help & Support`}</p>
        </div>
      </div>
    </div>
  );
}

function ChevronLeftDouble2() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="chevron-left-double">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="chevron-left-double">
          <path d={svgPaths.p15761e80} id="Icon" stroke="var(--stroke-0, #676A73)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function SideNavItemCollapse({ onClick }: { onClick?: () => void }) {
  return (
    <div className="bg-[rgba(255,255,255,0)] h-[32px] relative rounded-[4px] shrink-0 w-full hover:bg-[#01255e] transition-colors cursor-pointer" data-name="_Side Nav Item" onClick={onClick}>
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[8px] h-[32px] items-center pl-[12px] pr-[8px] py-0 relative w-full">
          <ChevronLeftDouble2 />
          <p className="basis-0 font-['DM_Sans:Medium',_sans-serif] font-medium grow leading-[normal] min-h-px min-w-px relative shrink-0 text-[#a6a9b2] text-[14px]" style={{ fontVariationSettings: "'opsz' 14" }}>
            Collapse Menu
          </p>
        </div>
      </div>
    </div>
  );
}

function HelpCollapase({ onNavigate }: { onNavigate: (page: string) => void }) {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Help + Collapase">
      <SideNavItemMasterAccount onClick={() => onNavigate('masteraccount')} />
      <SideNavItemLogout />
      <SideNavItemHelp />
      <SideNavItemCollapse />
    </div>
  );
}

function Bottom({ onNavigate }: { onNavigate: (page: string) => void }) {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="Bottom">
      <HelpCollapase onNavigate={onNavigate} />
    </div>
  );
}

export default function SideNavigation({ currentPage, onNavigate }: { currentPage: string; onNavigate: (page: string) => void }) {
  const [isMessagingExpanded, setIsMessagingExpanded] = useState(false);
  const [isSettingsExpanded, setIsSettingsExpanded] = useState(false);

  const handleToggleMessaging = () => {
    setIsMessagingExpanded(!isMessagingExpanded);
  };

  const handleToggleSettings = () => {
    setIsSettingsExpanded(!isSettingsExpanded);
  };

  return (
    <div className="fixed bg-[#17191f] h-screen left-0 top-0 w-[200px] z-50 overflow-y-auto" data-name="Side Navigation">
      <div className="box-border content-stretch flex flex-col h-full items-start justify-between overflow-clip px-[8px] py-[16px] relative rounded-[inherit] w-[200px]">
        <Top currentPage={currentPage} onNavigate={onNavigate} isMessagingExpanded={isMessagingExpanded} onToggleMessaging={handleToggleMessaging} isSettingsExpanded={isSettingsExpanded} onToggleSettings={handleToggleSettings} />
        <Bottom onNavigate={onNavigate} />
      </div>
      <div aria-hidden="true" className="absolute border-[#24262e] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
    </div>
  );
}
