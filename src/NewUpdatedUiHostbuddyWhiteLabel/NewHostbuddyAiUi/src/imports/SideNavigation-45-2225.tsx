import svgPaths from "./svg-9alxyekbam";
import imgAvatar from "figma:asset/56bb66f7699260e83e4640bfd5d4fb2714728f14.png";

function Isotype() {
  return (
    <div className="relative shrink-0 size-[40px]" data-name="Isotype">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 40 40">
        <g id="Isotype">
          <rect fill="var(--fill-0, #0F1117)" height="40" rx="4" width="40" />
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
            <path clipRule="evenodd" d={svgPaths.p272ed100} fill="var(--fill-0, white)" fillRule="evenodd" />
            <path clipRule="evenodd" d={svgPaths.p26abe200} fill="var(--fill-0, white)" fillRule="evenodd" />
            <path clipRule="evenodd" d={svgPaths.p11485100} fill="var(--fill-0, white)" fillRule="evenodd" />
            <path d={svgPaths.p7bfcb80} fill="var(--fill-0, white)" />
            <path d={svgPaths.p21e3cf00} fill="var(--fill-0, white)" />
            <path d={svgPaths.pd7eca80} fill="var(--fill-0, white)" />
            <path clipRule="evenodd" d={svgPaths.p1b083e00} fill="var(--fill-0, white)" fillRule="evenodd" />
            <path d={svgPaths.pbb67780} fill="var(--fill-0, white)" />
            <path d={svgPaths.p3c4100} fill="var(--fill-0, white)" />
            <path clipRule="evenodd" d={svgPaths.pb3c10f0} fill="var(--fill-0, white)" fillRule="evenodd" />
            <path d={svgPaths.pfd64300} fill="var(--fill-0, white)" />
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

function Stars01() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="stars-01">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g clipPath="url(#clip0_1_9973)" id="stars-01">
          <g id="Icon">
            <path d={svgPaths.pf8e9f00} stroke="var(--stroke-0, #676A73)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
            <path d={svgPaths.p182ed8f0} stroke="var(--stroke-0, #676A73)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
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

function SideNavItem() {
  return (
    <div className="bg-[rgba(255,255,255,0)] h-[40px] relative rounded-[4px] shrink-0 w-full" data-name="_Side Nav Item">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[6px] h-[40px] items-center pl-[12px] pr-[8px] py-0 relative w-full">
          <Stars01 />
          <p className="basis-0 font-['DM_Sans:Medium',_sans-serif] font-medium grow leading-[normal] min-h-px min-w-px relative shrink-0 text-[#a6a9b2] text-[14px]" style={{ fontVariationSettings: "'opsz' 14" }}>
            Get Started
          </p>
        </div>
      </div>
    </div>
  );
}

function BarChartSquare01() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="bar-chart-square-01">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="bar-chart-square-01">
          <path d={svgPaths.p2b280a00} id="Icon" stroke="var(--stroke-0, #676A73)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function Badge() {
  return (
    <div className="bg-[rgba(189,193,201,0.08)] box-border content-stretch flex gap-[8px] h-[18px] items-center justify-center min-w-[18px] px-[2px] py-0 relative rounded-[20px] shrink-0" data-name="Badge">
      <div className="flex flex-col font-['DM_Sans:SemiBold',_sans-serif] font-semibold justify-center leading-[0] overflow-ellipsis overflow-hidden relative shrink-0 text-[#a6a9b2] text-[12px] text-center text-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[normal] overflow-ellipsis overflow-hidden whitespace-pre">2</p>
      </div>
    </div>
  );
}

function SideNavItem1() {
  return (
    <div className="bg-[rgba(255,255,255,0)] h-[40px] relative rounded-[4px] shrink-0 w-full" data-name="_Side Nav Item">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[6px] h-[40px] items-center pl-[12px] pr-[8px] py-0 relative w-full">
          <BarChartSquare01 />
          <p className="basis-0 font-['DM_Sans:Medium',_sans-serif] font-medium grow leading-[normal] min-h-px min-w-px relative shrink-0 text-[#a6a9b2] text-[14px]" style={{ fontVariationSettings: "'opsz' 14" }}>
            Dashboard
          </p>
          <Badge />
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

function ChevronDown() {
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

function SideNavItem2() {
  return (
    <div className="bg-[rgba(255,255,255,0)] h-[40px] relative rounded-[4px] shrink-0 w-full" data-name="_Side Nav Item">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[6px] h-[40px] items-center pl-[12px] pr-[8px] py-0 relative w-full">
          <HomeSmile />
          <p className="basis-0 font-['DM_Sans:Medium',_sans-serif] font-medium grow leading-[normal] min-h-px min-w-px relative shrink-0 text-[#a6a9b2] text-[14px]" style={{ fontVariationSettings: "'opsz' 14" }}>
            Properties
          </p>
          <ChevronDown />
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

function ChevronUp() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="chevron-up">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="chevron-up">
          <path d="M15 12.5L10 7.5L5 12.5" id="Icon" stroke="var(--stroke-0, #676A73)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function SideNavItem3() {
  return (
    <div className="bg-[rgba(255,255,255,0)] h-[40px] relative rounded-[4px] shrink-0 w-full" data-name="_Side Nav Item">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[6px] h-[40px] items-center pl-[12px] pr-[8px] py-0 relative w-full">
          <MessageDotsCircle />
          <p className="basis-0 font-['DM_Sans:Medium',_sans-serif] font-medium grow leading-[normal] min-h-px min-w-px relative shrink-0 text-[#a6a9b2] text-[14px]" style={{ fontVariationSettings: "'opsz' 14" }}>
            Messaging
          </p>
          <ChevronUp />
        </div>
      </div>
    </div>
  );
}

function Badge1() {
  return (
    <div className="bg-[#3e88f7] box-border content-stretch flex gap-[8px] h-[18px] items-center justify-center min-w-[18px] px-[2px] py-0 relative rounded-[20px] shrink-0" data-name="Badge">
      <div className="flex flex-col font-['DM_Sans:SemiBold',_sans-serif] font-semibold justify-center leading-[0] overflow-ellipsis overflow-hidden relative shrink-0 text-[#001330] text-[12px] text-center text-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[normal] overflow-ellipsis overflow-hidden whitespace-pre">4</p>
      </div>
    </div>
  );
}

function SideNavItem4() {
  return (
    <div className="bg-[#01255e] h-[32px] relative rounded-[4px] shrink-0 w-full" data-name="_Side Nav Item">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[6px] h-[32px] items-center pl-[12px] pr-[8px] py-0 relative w-full">
          <p className="basis-0 font-['DM_Sans:SemiBold',_sans-serif] font-semibold grow leading-[normal] min-h-px min-w-px relative shrink-0 text-[#98bffa] text-[14px]" style={{ fontVariationSettings: "'opsz' 14" }}>
            Inbox
          </p>
          <div className="absolute bg-[#3e88f7] h-[14px] left-0 rounded-br-[2px] rounded-tr-[2px] top-1/2 translate-y-[-50%] w-[3px]" data-name="Selection Indicator" />
          <Badge1 />
        </div>
      </div>
    </div>
  );
}

function SideNavItem5() {
  return (
    <div className="bg-[rgba(255,255,255,0)] h-[32px] relative rounded-[4px] shrink-0 w-full" data-name="_Side Nav Item">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[6px] h-[32px] items-center pl-[12px] pr-[8px] py-0 relative w-full">
          <p className="basis-0 font-['DM_Sans:Medium',_sans-serif] font-medium grow leading-[normal] min-h-px min-w-px relative shrink-0 text-[#a6a9b2] text-[14px]" style={{ fontVariationSettings: "'opsz' 14" }}>
            Smart Templates
          </p>
        </div>
      </div>
    </div>
  );
}

function SideNavItem6() {
  return (
    <div className="bg-[rgba(255,255,255,0)] h-[32px] relative rounded-[4px] shrink-0 w-full" data-name="_Side Nav Item">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[6px] h-[32px] items-center pl-[12px] pr-[8px] py-0 relative w-full">
          <p className="basis-0 font-['DM_Sans:Medium',_sans-serif] font-medium grow leading-[normal] min-h-px min-w-px relative shrink-0 text-[#a6a9b2] text-[14px]" style={{ fontVariationSettings: "'opsz' 14" }}>
            Preferences
          </p>
        </div>
      </div>
    </div>
  );
}

function SideNavItem7() {
  return (
    <div className="bg-[rgba(255,255,255,0)] h-[32px] relative rounded-[4px] shrink-0 w-full" data-name="_Side Nav Item">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[6px] h-[32px] items-center pl-[12px] pr-[8px] py-0 relative w-full">
          <p className="basis-0 font-['DM_Sans:Medium',_sans-serif] font-medium grow leading-[normal] min-h-px min-w-px relative shrink-0 text-[#a6a9b2] text-[14px]" style={{ fontVariationSettings: "'opsz' 14" }}>
            Upsells
          </p>
        </div>
      </div>
    </div>
  );
}

function SideNavItem8() {
  return (
    <div className="bg-[rgba(255,255,255,0)] h-[32px] relative rounded-[4px] shrink-0 w-full" data-name="_Side Nav Item">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[6px] h-[32px] items-center pl-[12px] pr-[8px] py-0 relative w-full">
          <p className="basis-0 font-['DM_Sans:Medium',_sans-serif] font-medium grow leading-[normal] min-h-px min-w-px relative shrink-0 text-[#a6a9b2] text-[14px]" style={{ fontVariationSettings: "'opsz' 14" }}>
            Review Removal
          </p>
        </div>
      </div>
    </div>
  );
}

function SubItems() {
  return (
    <div className="relative shrink-0 w-full" data-name="Sub Items">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col items-start p-[8px] relative w-full">
          <SideNavItem4 />
          <SideNavItem5 />
          <SideNavItem6 />
          <SideNavItem7 />
          <SideNavItem8 />
        </div>
      </div>
    </div>
  );
}

function MenuExpanded() {
  return (
    <div className="bg-[#0f1117] content-stretch flex flex-col items-start relative rounded-[4px] shrink-0 w-full" data-name="Menu Expanded">
      <SideNavItem3 />
      <SubItems />
    </div>
  );
}

function CheckDone02() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="check-done-02">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g clipPath="url(#clip0_1_10073)" id="check-done-02">
          <path d={svgPaths.p3765a000} id="Icon" stroke="var(--stroke-0, #676A73)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
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

function SideNavItem9() {
  return (
    <div className="bg-[rgba(255,255,255,0)] h-[40px] relative rounded-[4px] shrink-0 w-full" data-name="_Side Nav Item">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[6px] h-[40px] items-center pl-[12px] pr-[8px] py-0 relative w-full">
          <CheckDone02 />
          <p className="basis-0 font-['DM_Sans:Medium',_sans-serif] font-medium grow leading-[normal] min-h-px min-w-px relative shrink-0 text-[#a6a9b2] text-[14px]" style={{ fontVariationSettings: "'opsz' 14" }}>
            Action Items
          </p>
        </div>
      </div>
    </div>
  );
}

function PieChart01() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="pie-chart-01">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g clipPath="url(#clip0_1_9906)" id="pie-chart-01">
          <path d={svgPaths.p3f2fed80} id="Icon" stroke="var(--stroke-0, #676A73)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
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

function SideNavItem10() {
  return (
    <div className="bg-[rgba(255,255,255,0)] h-[40px] relative rounded-[4px] shrink-0 w-full" data-name="_Side Nav Item">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[6px] h-[40px] items-center pl-[12px] pr-[8px] py-0 relative w-full">
          <PieChart01 />
          <p className="basis-0 font-['DM_Sans:Medium',_sans-serif] font-medium grow leading-[normal] min-h-px min-w-px relative shrink-0 text-[#a6a9b2] text-[14px]" style={{ fontVariationSettings: "'opsz' 14" }}>
            Insights
          </p>
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

function SideNavItem11() {
  return (
    <div className="bg-[rgba(255,255,255,0)] h-[40px] relative rounded-[4px] shrink-0 w-full" data-name="_Side Nav Item">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[6px] h-[40px] items-center pl-[12px] pr-[8px] py-0 relative w-full">
          <Sliders04 />
          <p className="basis-0 font-['DM_Sans:Medium',_sans-serif] font-medium grow leading-[normal] min-h-px min-w-px relative shrink-0 text-[#a6a9b2] text-[14px]" style={{ fontVariationSettings: "'opsz' 14" }}>
            Settings
          </p>
          <ChevronDown1 />
        </div>
      </div>
    </div>
  );
}

function MenuItems() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Menu Items">
      <SideNavItem />
      <SideNavItem1 />
      <SideNavItem2 />
      <MenuExpanded />
      <SideNavItem9 />
      <SideNavItem10 />
      <SideNavItem11 />
    </div>
  );
}

function Top() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full" data-name="Top">
      <LogoContainer />
      <MenuItems />
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
    <div className="bg-[#0f1117] relative rounded-[4px] shrink-0 w-full" data-name="Account">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[8px] items-center p-[8px] relative w-full">
          <div className="pointer-events-none relative rounded-[4px] shrink-0 size-[32px]" data-name="Avatar">
            <div aria-hidden="true" className="absolute inset-0 rounded-[4px]">
              <div className="absolute bg-[#fff7b8] inset-0 rounded-[4px]" />
              <img alt="" className="absolute max-w-none object-50%-50% object-cover rounded-[4px] size-full" src={imgAvatar} />
            </div>
            <div aria-hidden="true" className="absolute border-2 border-[#24262e] border-solid inset-[-2px] rounded-[6px]" />
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

function SideNavItem12() {
  return (
    <div className="bg-[rgba(255,255,255,0)] h-[40px] relative rounded-[4px] shrink-0 w-full" data-name="_Side Nav Item">
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

function SideNavItem13() {
  return (
    <div className="bg-[rgba(255,255,255,0)] h-[40px] relative rounded-[4px] shrink-0 w-full" data-name="_Side Nav Item">
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

function HelpCollapase() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Help + Collapase">
      <SideNavItem12 />
      <SideNavItem13 />
    </div>
  );
}

function Bottom() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="Bottom">
      <Account />
      <HelpCollapase />
    </div>
  );
}

export default function SideNavigation() {
  return (
    <div className="bg-[#17191f] relative size-full" data-name="Side Navigation">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col items-start justify-between px-[8px] py-[16px] relative size-full">
          <Top />
          <Bottom />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[#24262e] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
    </div>
  );
}