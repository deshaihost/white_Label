import svgPaths from "./svg-2ulr0e3i7w";
import imgAvatar from "figma:asset/56bb66f7699260e83e4640bfd5d4fb2714728f14.png";
import imgImageContainer from "figma:asset/2a66851d395b2599c086244ba8f57b7e66a3c300.png";
import imgImageContainer1 from "figma:asset/1bbf84eab8996cc54ff7f12ad7d0f87b02cfa7fa.png";
import imgImageContainer2 from "figma:asset/a37d273392ab7470b5d0bed7d276f17795919b78.png";
import imgImage from "figma:asset/dabdc2b916adcf0e687bab85d9e004b766807434.png";
import imgImageContainer3 from "figma:asset/90a39214c18003ee3db83cbab111db29d19ced1c.png";
import imgImage1 from "figma:asset/4efbafa1e8984736c3195367cf7acb82c6acd6d1.png";
import imgImage2 from "figma:asset/17717758d42ac6e1a27868d10c6301583b47c623.png";
import imgImage3 from "figma:asset/b998b10a2435f8dc5742738eb7c0a91ae8dbef6b.png";
import imgOverflowShadow from "figma:asset/5820ea0f992f3ea50474f95e2ba50a70f14ad516.png";
import imgImageContainer4 from "figma:asset/f8073b535e6867061d6aef993da3805e2e289e68.png";
import imgImage4 from "figma:asset/9905a713b23e99b8225ca433991d7d4c9ffb6301.png";

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

function SideNavigation() {
  return (
    <div className="absolute bg-[#17191f] h-[900px] left-0 top-0 w-[200px]" data-name="Side Navigation">
      <div className="box-border content-stretch flex flex-col h-[900px] items-start justify-between overflow-clip px-[8px] py-[16px] relative rounded-[inherit] w-[200px]">
        <Top />
        <Bottom />
      </div>
      <div aria-hidden="true" className="absolute border-[#013280] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function LeadingIcon() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Leading Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Leading Icon">
          <path d={svgPaths.p272bfa00} id="Icon" stroke="var(--stroke-0, #A6A9B2)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function Input() {
  return (
    <div className="basis-0 content-stretch flex grow items-center min-h-px min-w-px relative shrink-0" data-name="Input">
      <p className="basis-0 font-['DM_Sans:Medium',_sans-serif] font-medium grow leading-[normal] min-h-px min-w-px relative shrink-0 text-[#676a73] text-[14px]" style={{ fontVariationSettings: "'opsz' 14" }}>
        Search...
      </p>
    </div>
  );
}

function InputArea() {
  return (
    <div className="bg-[#676a73] h-[32px] relative rounded-[4px] shrink-0 w-full" data-name="Input Area">
      <div aria-hidden="true" className="absolute border border-[rgba(189,193,201,0.15)] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[6px] h-[32px] items-center px-[8px] py-0 relative w-full">
          <LeadingIcon />
          <Input />
        </div>
      </div>
    </div>
  );
}

function SelectInput() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[4px] grow items-start min-h-px min-w-px relative shrink-0" data-name="Select Input">
      <InputArea />
    </div>
  );
}

function Select() {
  return (
    <div className="basis-0 content-stretch flex gap-[8px] grow items-start min-h-px min-w-px relative shrink-0" data-name="Select">
      <SelectInput />
    </div>
  );
}

function LeadingIcon1() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Leading Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Leading Icon">
          <path d="M4 8H12M2 4H14M6 12H10" id="Icon" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.3" />
        </g>
      </svg>
    </div>
  );
}

function FiltersButton() {
  return (
    <div className="bg-[#3e88f7] box-border content-stretch flex gap-[4px] h-[32px] items-center px-[8px] py-0 relative rounded-[4px] shrink-0" data-name="Filters Button">
      <LeadingIcon1 />
      <p className="font-['DM_Sans:SemiBold',_sans-serif] font-semibold leading-[normal] relative shrink-0 text-[14px] text-nowrap text-white whitespace-pre" style={{ fontVariationSettings: "'opsz' 14" }}>
        Filters
      </p>
    </div>
  );
}

function SearchFiltersButton() {
  return (
    <div className="content-stretch flex gap-[8px] items-start relative shrink-0 w-full" data-name="Search + Filters Button">
      <Select />
      <FiltersButton />
    </div>
  );
}

function Header() {
  return (
    <div className="absolute bg-[#17191f] box-border content-stretch flex flex-col gap-[4px] items-start left-[20px] p-[12px] rounded-tl-[4px] top-[42px] w-[368px]" data-name="Header">
      <div aria-hidden="true" className="absolute border-[#013280] border-[1px_0px_1px_1px] border-solid inset-0 pointer-events-none rounded-tl-[4px]" />
      <p className="font-['Poppins:Bold',_sans-serif] leading-[1.4] not-italic relative shrink-0 text-[24px] text-nowrap text-white whitespace-pre">Inbox</p>
      <SearchFiltersButton />
    </div>
  );
}

function ScrollBar() {
  return (
    <div className="absolute bg-[#0f1117] box-border content-stretch flex gap-[8px] h-[748px] items-start left-[372px] p-[4px] top-[136px]" data-name="Scroll Bar">
      <div aria-hidden="true" className="absolute border-[#013280] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="bg-[#4a4d54] h-[160px] rounded-[8px] shrink-0 w-[8px]" data-name="Bar" />
    </div>
  );
}

function NameDate() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0 text-nowrap w-full" data-name="Name + Date">
      <p className="[white-space-collapse:collapse] basis-0 font-['DM_Sans:SemiBold',_sans-serif] font-semibold grow leading-[normal] min-h-px min-w-px overflow-ellipsis overflow-hidden relative shrink-0 text-[16px] text-white" style={{ fontVariationSettings: "'opsz' 14" }}>
        Brooklyn Simmons
      </p>
      <div className="flex flex-col font-['DM_Sans:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#a6a9b2] text-[14px]" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[normal] text-nowrap whitespace-pre">2/12 10:00 AM</p>
      </div>
    </div>
  );
}

function Badge2() {
  return (
    <div className="bg-[#3e88f7] box-border content-stretch flex gap-[8px] h-[18px] items-center justify-center min-w-[18px] px-[2px] py-0 relative rounded-[20px] shrink-0" data-name="Badge">
      <div className="flex flex-col font-['DM_Sans:SemiBold',_sans-serif] font-semibold justify-center leading-[0] overflow-ellipsis overflow-hidden relative shrink-0 text-[#001330] text-[12px] text-center text-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[normal] overflow-ellipsis overflow-hidden whitespace-pre">4</p>
      </div>
    </div>
  );
}

function MessageCounter() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0 w-full" data-name="Message + Counter">
      <p className="[white-space-collapse:collapse] basis-0 font-['DM_Sans:SemiBold',_sans-serif] font-semibold grow leading-[normal] min-h-px min-w-px overflow-ellipsis overflow-hidden relative shrink-0 text-[#d0d3db] text-[14px] text-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        Hi, I would like to know if there is parking available?
      </p>
      <Badge2 />
    </div>
  );
}

function ReservationDatesProperty() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0 w-full" data-name="Reservation dates + Property">
      <p className="font-['DM_Sans:Regular',_sans-serif] font-normal leading-[normal] relative shrink-0 text-[#a6a9b2] text-[14px] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'opsz' 14" }}>
        Feb 12-15
      </p>
      <div className="relative shrink-0 size-[2px]" data-name="Divider">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #A6A9B2)" id="Divider" r="1" />
        </svg>
      </div>
      <p className="[white-space-collapse:collapse] basis-0 font-['DM_Sans:Regular',_sans-serif] font-normal grow leading-[normal] min-h-px min-w-px overflow-ellipsis overflow-hidden relative shrink-0 text-[#a6a9b2] text-[14px] text-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        4517 Washington Ave. Manchester, Kentucky 39495
      </p>
    </div>
  );
}

function LabelContainer() {
  return (
    <div className="box-border content-stretch flex gap-[8px] items-center justify-center px-[2px] py-0 relative shrink-0" data-name="Label Container">
      <p className="font-['DM_Sans:Medium',_sans-serif] font-medium leading-[normal] relative shrink-0 text-[#e1e3e8] text-[14px] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'opsz' 14" }}>
        Guest
      </p>
    </div>
  );
}

function RecipientType() {
  return (
    <div className="bg-[#676a73] box-border content-stretch flex h-[20px] items-center px-[2px] py-0 relative rounded-[2px] shrink-0" data-name="Recipient Type">
      <LabelContainer />
    </div>
  );
}

function Flag01() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="flag-01">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="flag-01">
          <g id="Icon">
            <path d={svgPaths.pb078740} fill="var(--fill-0, #F26C0C)" />
            <path d={svgPaths.p1ed3b780} stroke="var(--stroke-0, #F26C0C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.641667" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Urgent() {
  return (
    <div className="bg-[#4d2100] content-stretch flex gap-[2px] items-center justify-center relative rounded-[2px] shrink-0 size-[20px]" data-name="Urgent">
      <Flag01 />
    </div>
  );
}

function RecipientTypeUrgent() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="Recipient Type + Urgent">
      <RecipientType />
      <Urgent />
    </div>
  );
}

function LabelContainer1() {
  return (
    <div className="box-border content-stretch flex gap-[8px] items-center justify-center px-[2px] py-0 relative shrink-0" data-name="Label Container">
      <p className="font-['DM_Sans:Medium',_sans-serif] font-medium leading-[normal] relative shrink-0 text-[#c9f5f5] text-[14px] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'opsz' 14" }}>
        Check-out today
      </p>
    </div>
  );
}

function ReservationPhase() {
  return (
    <div className="bg-[#035d63] box-border content-stretch flex h-[20px] items-center px-[2px] py-0 relative rounded-[2px] shrink-0" data-name="Reservation Phase">
      <LabelContainer1 />
    </div>
  );
}

function Channel() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Channel">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Channel">
          <rect fill="var(--fill-0, #676A73)" height="20" rx="2" width="20" />
          <path d={svgPaths.p3227f400} fill="var(--fill-0, #A6A9B2)" id="icon" />
        </g>
      </svg>
    </div>
  );
}

function ReservationPhaseOta() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="Reservation Phase + OTA">
      <ReservationPhase />
      <Channel />
    </div>
  );
}

function Tags() {
  return (
    <div className="box-border content-start flex flex-wrap gap-[4px] items-start justify-between pb-0 pt-[2px] px-0 relative shrink-0 w-full" data-name="Tags">
      <RecipientTypeUrgent />
      <ReservationPhaseOta />
    </div>
  );
}

function Details() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[2px] grow items-start justify-center min-h-px min-w-px relative shrink-0" data-name="Details">
      <NameDate />
      <MessageCounter />
      <ReservationDatesProperty />
      <Tags />
    </div>
  );
}

function Pin02() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="pin-02">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="pin-02">
          <g id="Icon">
            <path d={svgPaths.p2e3d7180} fill="var(--fill-0, #3B1900)" />
            <path d={svgPaths.p259c6b80} stroke="var(--stroke-0, #3B1900)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Pinned() {
  return (
    <div className="bg-[#f26c0c] box-border content-stretch flex gap-[8px] items-center justify-center overflow-clip relative rounded-[100px] shadow-[0px_0px_0px_2px_#17191f] shrink-0 size-[20px]" data-name="Pinned">
      <Pin02 />
    </div>
  );
}

function Badges() {
  return (
    <div className="absolute content-stretch flex items-center left-[8px] top-[6.5px]" data-name="Badges">
      <Pinned />
    </div>
  );
}

function ChatCard() {
  return (
    <div className="bg-[#17191f] relative shrink-0 w-full" data-name="Chat Card">
      <div aria-hidden="true" className="absolute border-[#013280] border-[0px_1px_1px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[8px] items-center px-[12px] py-[8px] relative w-full">
          <div className="min-h-[80px] min-w-[80px] relative rounded-[4px] shrink-0 size-[80px]" data-name="Image Container">
            <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-[4px] size-full" src={imgImageContainer} />
          </div>
          <Details />
        </div>
      </div>
    </div>
  );
}

function NameDate1() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0 text-nowrap w-full" data-name="Name + Date">
      <p className="[white-space-collapse:collapse] basis-0 font-['DM_Sans:SemiBold',_sans-serif] font-semibold grow leading-[normal] min-h-px min-w-px overflow-ellipsis overflow-hidden relative shrink-0 text-[16px] text-white" style={{ fontVariationSettings: "'opsz' 14" }}>
        Floyd Miles
      </p>
      <div className="flex flex-col font-['DM_Sans:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#a6a9b2] text-[14px]" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[normal] text-nowrap whitespace-pre">2/12 10:00 AM</p>
      </div>
    </div>
  );
}

function Badge3() {
  return (
    <div className="bg-[#3e88f7] box-border content-stretch flex gap-[8px] h-[18px] items-center justify-center min-w-[18px] px-[2px] py-0 relative rounded-[20px] shrink-0" data-name="Badge">
      <div className="flex flex-col font-['DM_Sans:SemiBold',_sans-serif] font-semibold justify-center leading-[0] overflow-ellipsis overflow-hidden relative shrink-0 text-[#001330] text-[12px] text-center text-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[normal] overflow-ellipsis overflow-hidden whitespace-pre">1</p>
      </div>
    </div>
  );
}

function MessageCounter1() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0 w-full" data-name="Message + Counter">
      <p className="[white-space-collapse:collapse] basis-0 font-['DM_Sans:SemiBold',_sans-serif] font-semibold grow leading-[normal] min-h-px min-w-px overflow-ellipsis overflow-hidden relative shrink-0 text-[#d0d3db] text-[14px] text-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        Hi, I would like to know if there is parking available?
      </p>
      <Badge3 />
    </div>
  );
}

function ReservationDatesProperty1() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0 w-full" data-name="Reservation dates + Property">
      <p className="font-['DM_Sans:Regular',_sans-serif] font-normal leading-[normal] relative shrink-0 text-[#a6a9b2] text-[14px] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'opsz' 14" }}>
        Feb 12-15
      </p>
      <div className="relative shrink-0 size-[2px]" data-name="Divider">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #A6A9B2)" id="Divider" r="1" />
        </svg>
      </div>
      <p className="[white-space-collapse:collapse] basis-0 font-['DM_Sans:Regular',_sans-serif] font-normal grow leading-[normal] min-h-px min-w-px overflow-ellipsis overflow-hidden relative shrink-0 text-[#a6a9b2] text-[14px] text-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        4517 Washington Ave. Manchester, Kentucky 39495
      </p>
    </div>
  );
}

function LabelContainer2() {
  return (
    <div className="box-border content-stretch flex gap-[8px] items-center justify-center px-[2px] py-0 relative shrink-0" data-name="Label Container">
      <p className="font-['DM_Sans:Medium',_sans-serif] font-medium leading-[normal] relative shrink-0 text-[#e1e3e8] text-[14px] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'opsz' 14" }}>
        Guest
      </p>
    </div>
  );
}

function RecipientType1() {
  return (
    <div className="bg-[#676a73] box-border content-stretch flex h-[20px] items-center px-[2px] py-0 relative rounded-[2px] shrink-0" data-name="Recipient Type">
      <LabelContainer2 />
    </div>
  );
}

function RecipientTypeUrgent1() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="Recipient Type + Urgent">
      <RecipientType1 />
    </div>
  );
}

function LabelContainer3() {
  return (
    <div className="box-border content-stretch flex gap-[8px] items-center justify-center px-[2px] py-0 relative shrink-0" data-name="Label Container">
      <p className="font-['DM_Sans:Medium',_sans-serif] font-medium leading-[normal] relative shrink-0 text-[#ecdefc] text-[14px] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'opsz' 14" }}>
        Check-in today
      </p>
    </div>
  );
}

function ReservationPhase1() {
  return (
    <div className="bg-[#5607b0] box-border content-stretch flex h-[20px] items-center px-[2px] py-0 relative rounded-[2px] shrink-0" data-name="Reservation Phase">
      <LabelContainer3 />
    </div>
  );
}

function Channel1() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Channel">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Channel">
          <rect fill="var(--fill-0, #676A73)" height="20" rx="2" width="20" />
          <path d={svgPaths.p15b76200} fill="var(--fill-0, #A6A9B2)" id="icon" />
        </g>
      </svg>
    </div>
  );
}

function ReservationPhaseOta1() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="Reservation Phase + OTA">
      <ReservationPhase1 />
      <Channel1 />
    </div>
  );
}

function Tags1() {
  return (
    <div className="box-border content-start flex flex-wrap gap-[4px] items-start justify-between pb-0 pt-[2px] px-0 relative shrink-0 w-full" data-name="Tags">
      <RecipientTypeUrgent1 />
      <ReservationPhaseOta1 />
    </div>
  );
}

function Details1() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[2px] grow items-start justify-center min-h-px min-w-px relative shrink-0" data-name="Details">
      <NameDate1 />
      <MessageCounter1 />
      <ReservationDatesProperty1 />
      <Tags1 />
    </div>
  );
}

function Pin3() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="pin-02">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="pin-02">
          <g id="Icon">
            <path d={svgPaths.p2e3d7180} fill="var(--fill-0, #3B1900)" />
            <path d={svgPaths.p259c6b80} stroke="var(--stroke-0, #3B1900)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Pinned1() {
  return (
    <div className="bg-[#f26c0c] box-border content-stretch flex gap-[8px] items-center justify-center overflow-clip relative rounded-[100px] shadow-[0px_0px_0px_2px_#17191f] shrink-0 size-[20px]" data-name="Pinned">
      <Pin3 />
    </div>
  );
}

function Zap() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="zap">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="zap">
          <path d={svgPaths.p20075100} fill="var(--fill-0, #382500)" id="Icon" stroke="var(--stroke-0, #382500)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
        </g>
      </svg>
    </div>
  );
}

function SameDayBooking() {
  return (
    <div className="bg-[#e9b117] box-border content-stretch flex gap-[8px] items-center justify-center overflow-clip relative rounded-[100px] shadow-[0px_0px_0px_2px_#17191f] shrink-0 size-[20px]" data-name="Same Day Booking">
      <Zap />
    </div>
  );
}

function RefreshCw02() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="refresh-cw-02">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="refresh-cw-02">
          <g id="Icon">
            <path d={svgPaths.p265e1b00} fill="var(--fill-0, #00282B)" />
            <path d={svgPaths.p33f613c0} fill="var(--fill-0, #00282B)" />
            <path d={svgPaths.p232ce700} stroke="var(--stroke-0, #00282B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function SameDayTurnover() {
  return (
    <div className="bg-[#1ec7c7] box-border content-stretch flex gap-[8px] items-center justify-center overflow-clip relative rounded-[100px] shadow-[0px_0px_0px_2px_#17191f] shrink-0 size-[20px]" data-name="Same Day Turnover">
      <RefreshCw02 />
    </div>
  );
}

function Badges1() {
  return (
    <div className="absolute content-stretch flex items-center left-[8px] top-[6.5px]" data-name="Badges">
      <Pinned1 />
      <SameDayBooking />
      <SameDayTurnover />
    </div>
  );
}

function ChatCard1() {
  return (
    <div className="bg-[#0f1117] relative shrink-0 w-full" data-name="Chat Card">
      <div aria-hidden="true" className="absolute border-[#013280] border-[0px_1px_1px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[8px] items-center px-[12px] py-[8px] relative w-full">
          <div className="min-h-[80px] min-w-[80px] relative rounded-[4px] shrink-0 size-[80px]" data-name="Image Container">
            <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-[4px] size-full" src={imgImageContainer1} />
          </div>
          <Details1 />
          <div className="absolute bg-[#3e88f7] h-[40px] left-px rounded-br-[2px] rounded-tr-[2px] top-[calc(50%+0.5px)] translate-y-[-50%] w-[3px]" data-name="Selection Indicator" />
        </div>
      </div>
    </div>
  );
}

function NameDate2() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0 text-nowrap w-full" data-name="Name + Date">
      <p className="[white-space-collapse:collapse] basis-0 font-['DM_Sans:SemiBold',_sans-serif] font-semibold grow leading-[normal] min-h-px min-w-px overflow-ellipsis overflow-hidden relative shrink-0 text-[16px] text-white" style={{ fontVariationSettings: "'opsz' 14" }}>
        Cody Fisher
      </p>
      <div className="flex flex-col font-['DM_Sans:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#a6a9b2] text-[14px]" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[normal] text-nowrap whitespace-pre">2/12 10:00 AM</p>
      </div>
    </div>
  );
}

function MessageCounter2() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0 w-full" data-name="Message + Counter">
      <p className="[white-space-collapse:collapse] basis-0 font-['DM_Sans:Regular',_sans-serif] font-normal grow leading-[normal] min-h-px min-w-px overflow-ellipsis overflow-hidden relative shrink-0 text-[#d0d3db] text-[14px] text-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        Hi, I would like to know if there is parking available?
      </p>
    </div>
  );
}

function LabelContainer4() {
  return (
    <div className="box-border content-stretch flex gap-[8px] items-center justify-center px-[2px] py-0 relative shrink-0" data-name="Label Container">
      <p className="font-['DM_Sans:Medium',_sans-serif] font-medium leading-[normal] relative shrink-0 text-[#e1e3e8] text-[14px] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'opsz' 14" }}>
        External contact
      </p>
    </div>
  );
}

function RecipientType2() {
  return (
    <div className="bg-[#676a73] box-border content-stretch flex h-[20px] items-center px-[2px] py-0 relative rounded-[2px] shrink-0" data-name="Recipient Type">
      <LabelContainer4 />
    </div>
  );
}

function Flag2() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="flag-01">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="flag-01">
          <g id="Icon">
            <path d={svgPaths.pb078740} fill="var(--fill-0, #F26C0C)" />
            <path d={svgPaths.p1ed3b780} stroke="var(--stroke-0, #F26C0C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.641667" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Urgent1() {
  return (
    <div className="bg-[#4d2100] content-stretch flex gap-[2px] items-center justify-center relative rounded-[2px] shrink-0 size-[20px]" data-name="Urgent">
      <Flag2 />
    </div>
  );
}

function RecipientTypeUrgent2() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="Recipient Type + Urgent">
      <RecipientType2 />
      <Urgent1 />
    </div>
  );
}

function Channel2() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Channel">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Channel">
          <rect fill="var(--fill-0, #676A73)" height="20" rx="2" width="20" />
          <path d={svgPaths.p2c31eb00} fill="var(--fill-0, #A6A9B2)" id="icon" />
        </g>
      </svg>
    </div>
  );
}

function Tags2() {
  return (
    <div className="box-border content-start flex flex-wrap gap-[4px] items-start justify-between pb-0 pt-[2px] px-0 relative shrink-0 w-full" data-name="Tags">
      <RecipientTypeUrgent2 />
      <Channel2 />
    </div>
  );
}

function Details2() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[2px] grow items-start justify-center min-h-px min-w-px relative shrink-0" data-name="Details">
      <NameDate2 />
      <MessageCounter2 />
      <Tags2 />
    </div>
  );
}

function ChatCard2() {
  return (
    <div className="bg-[#17191f] relative shrink-0 w-full" data-name="Chat Card">
      <div aria-hidden="true" className="absolute border-[#013280] border-[0px_1px_1px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[8px] items-center px-[12px] py-[8px] relative w-full">
          <div className="min-h-[80px] min-w-[80px] relative rounded-[4px] shrink-0 size-[80px]" data-name="Image Container">
            <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[4px]">
              <div className="absolute bg-[#edbbd6] inset-0 rounded-[4px]" />
              <img alt="" className="absolute max-w-none object-50%-50% object-cover rounded-[4px] size-full" src={imgImageContainer2} />
            </div>
          </div>
          <Details2 />
        </div>
      </div>
    </div>
  );
}

function NameDate3() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0 text-nowrap w-full" data-name="Name + Date">
      <p className="[white-space-collapse:collapse] basis-0 font-['DM_Sans:SemiBold',_sans-serif] font-semibold grow leading-[normal] min-h-px min-w-px overflow-ellipsis overflow-hidden relative shrink-0 text-[16px] text-white" style={{ fontVariationSettings: "'opsz' 14" }}>
        Jane Cooper
      </p>
      <div className="flex flex-col font-['DM_Sans:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#a6a9b2] text-[14px]" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[normal] text-nowrap whitespace-pre">2/12 10:00 AM</p>
      </div>
    </div>
  );
}

function Badge4() {
  return (
    <div className="bg-[#3e88f7] box-border content-stretch flex gap-[8px] h-[18px] items-center justify-center min-w-[18px] px-[2px] py-0 relative rounded-[20px] shrink-0" data-name="Badge">
      <div className="flex flex-col font-['DM_Sans:SemiBold',_sans-serif] font-semibold justify-center leading-[0] overflow-ellipsis overflow-hidden relative shrink-0 text-[#001330] text-[12px] text-center text-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[normal] overflow-ellipsis overflow-hidden whitespace-pre">1</p>
      </div>
    </div>
  );
}

function MessageCounter3() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0 w-full" data-name="Message + Counter">
      <p className="[white-space-collapse:collapse] basis-0 font-['DM_Sans:SemiBold',_sans-serif] font-semibold grow leading-[normal] min-h-px min-w-px overflow-ellipsis overflow-hidden relative shrink-0 text-[#d0d3db] text-[14px] text-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        Hi, I would like to know if there is parking available?
      </p>
      <Badge4 />
    </div>
  );
}

function ReservationDatesProperty2() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0 w-full" data-name="Reservation dates + Property">
      <p className="font-['DM_Sans:Regular',_sans-serif] font-normal leading-[normal] relative shrink-0 text-[#a6a9b2] text-[14px] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'opsz' 14" }}>
        Feb 12-15
      </p>
      <div className="relative shrink-0 size-[2px]" data-name="Divider">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #A6A9B2)" id="Divider" r="1" />
        </svg>
      </div>
      <p className="[white-space-collapse:collapse] basis-0 font-['DM_Sans:Regular',_sans-serif] font-normal grow leading-[normal] min-h-px min-w-px overflow-ellipsis overflow-hidden relative shrink-0 text-[#a6a9b2] text-[14px] text-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        4517 Washington Ave. Manchester, Kentucky 39495
      </p>
    </div>
  );
}

function LabelContainer5() {
  return (
    <div className="box-border content-stretch flex gap-[8px] items-center justify-center px-[2px] py-0 relative shrink-0" data-name="Label Container">
      <p className="font-['DM_Sans:Medium',_sans-serif] font-medium leading-[normal] relative shrink-0 text-[#e1e3e8] text-[14px] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'opsz' 14" }}>
        Guest
      </p>
    </div>
  );
}

function RecipientType3() {
  return (
    <div className="bg-[#676a73] box-border content-stretch flex h-[20px] items-center px-[2px] py-0 relative rounded-[2px] shrink-0" data-name="Recipient Type">
      <LabelContainer5 />
    </div>
  );
}

function RecipientTypeUrgent3() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="Recipient Type + Urgent">
      <RecipientType3 />
    </div>
  );
}

function LabelContainer6() {
  return (
    <div className="box-border content-stretch flex gap-[8px] items-center justify-center px-[2px] py-0 relative shrink-0" data-name="Label Container">
      <p className="font-['DM_Sans:Medium',_sans-serif] font-medium leading-[normal] relative shrink-0 text-[#c0fad6] text-[14px] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'opsz' 14" }}>
        Current
      </p>
    </div>
  );
}

function ReservationPhase2() {
  return (
    <div className="bg-[#014714] box-border content-stretch flex h-[20px] items-center px-[2px] py-0 relative rounded-[2px] shrink-0" data-name="Reservation Phase">
      <LabelContainer6 />
    </div>
  );
}

function Channel3() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Channel">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Channel">
          <rect fill="var(--fill-0, #676A73)" height="20" rx="2" width="20" />
          <path d={svgPaths.p3227f400} fill="var(--fill-0, #A6A9B2)" id="icon" />
        </g>
      </svg>
    </div>
  );
}

function ReservationPhaseOta2() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="Reservation Phase + OTA">
      <ReservationPhase2 />
      <Channel3 />
    </div>
  );
}

function Tags3() {
  return (
    <div className="box-border content-start flex flex-wrap gap-[4px] items-start justify-between pb-0 pt-[2px] px-0 relative shrink-0 w-full" data-name="Tags">
      <RecipientTypeUrgent3 />
      <ReservationPhaseOta2 />
    </div>
  );
}

function Details3() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[2px] grow items-start justify-center min-h-px min-w-px relative shrink-0" data-name="Details">
      <NameDate3 />
      <MessageCounter3 />
      <ReservationDatesProperty2 />
      <Tags3 />
    </div>
  );
}

function RefreshCw3() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="refresh-cw-02">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="refresh-cw-02">
          <g id="Icon">
            <path d={svgPaths.p265e1b00} fill="var(--fill-0, #00282B)" />
            <path d={svgPaths.p33f613c0} fill="var(--fill-0, #00282B)" />
            <path d={svgPaths.p232ce700} stroke="var(--stroke-0, #00282B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function SameDayTurnover1() {
  return (
    <div className="bg-[#1ec7c7] box-border content-stretch flex gap-[8px] items-center justify-center overflow-clip relative rounded-[100px] shadow-[0px_0px_0px_2px_#17191f] shrink-0 size-[20px]" data-name="Same Day Turnover">
      <RefreshCw3 />
    </div>
  );
}

function Badges2() {
  return (
    <div className="absolute content-stretch flex items-center left-[8px] top-[6.5px]" data-name="Badges">
      <SameDayTurnover1 />
    </div>
  );
}

function ChatCard3() {
  return (
    <div className="bg-[#17191f] relative shrink-0 w-full" data-name="Chat Card">
      <div aria-hidden="true" className="absolute border-[#013280] border-[0px_1px_1px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[8px] items-center px-[12px] py-[8px] relative w-full">
          <div className="min-h-[80px] min-w-[80px] relative rounded-[4px] shrink-0 size-[80px]" data-name="image">
            <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-[4px] size-full" src={imgImage} />
          </div>
          <Details3 />
        </div>
      </div>
    </div>
  );
}

function NameDate4() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0 text-nowrap w-full" data-name="Name + Date">
      <p className="[white-space-collapse:collapse] basis-0 font-['DM_Sans:SemiBold',_sans-serif] font-semibold grow leading-[normal] min-h-px min-w-px overflow-ellipsis overflow-hidden relative shrink-0 text-[16px] text-white" style={{ fontVariationSettings: "'opsz' 14" }}>
        Kathryn Murphy
      </p>
      <div className="flex flex-col font-['DM_Sans:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#a6a9b2] text-[14px]" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[normal] text-nowrap whitespace-pre">2/12 10:00 AM</p>
      </div>
    </div>
  );
}

function MessageCounter4() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0 w-full" data-name="Message + Counter">
      <p className="[white-space-collapse:collapse] basis-0 font-['DM_Sans:Regular',_sans-serif] font-normal grow leading-[normal] min-h-px min-w-px overflow-ellipsis overflow-hidden relative shrink-0 text-[#d0d3db] text-[14px] text-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        Hi, I would like to know if there is parking available?
      </p>
    </div>
  );
}

function LabelContainer7() {
  return (
    <div className="box-border content-stretch flex gap-[8px] items-center justify-center px-[2px] py-0 relative shrink-0" data-name="Label Container">
      <p className="font-['DM_Sans:Medium',_sans-serif] font-medium leading-[normal] relative shrink-0 text-[#e1e3e8] text-[14px] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'opsz' 14" }}>
        Vendor
      </p>
    </div>
  );
}

function RecipientType4() {
  return (
    <div className="bg-[#676a73] box-border content-stretch flex h-[20px] items-center px-[2px] py-0 relative rounded-[2px] shrink-0" data-name="Recipient Type">
      <LabelContainer7 />
    </div>
  );
}

function RecipientTypeUrgent4() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="Recipient Type + Urgent">
      <RecipientType4 />
    </div>
  );
}

function Channel4() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Channel">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Channel">
          <rect fill="var(--fill-0, #676A73)" height="20" rx="2" width="20" />
          <path d={svgPaths.p1fa78300} fill="var(--fill-0, #A6A9B2)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Tags4() {
  return (
    <div className="box-border content-start flex flex-wrap gap-[4px] items-start justify-between pb-0 pt-[2px] px-0 relative shrink-0 w-full" data-name="Tags">
      <RecipientTypeUrgent4 />
      <Channel4 />
    </div>
  );
}

function Details4() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[2px] grow items-start justify-center min-h-px min-w-px relative shrink-0" data-name="Details">
      <NameDate4 />
      <MessageCounter4 />
      <Tags4 />
    </div>
  );
}

function ChatCard4() {
  return (
    <div className="bg-[#17191f] relative shrink-0 w-full" data-name="Chat Card">
      <div aria-hidden="true" className="absolute border-[#013280] border-[0px_1px_1px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[8px] items-center px-[12px] py-[8px] relative w-full">
          <div className="min-h-[80px] min-w-[80px] relative rounded-[4px] shrink-0 size-[80px]" data-name="Image Container">
            <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[4px]">
              <div className="absolute bg-[#ffbfb8] inset-0 rounded-[4px]" />
              <img alt="" className="absolute max-w-none object-50%-50% object-cover rounded-[4px] size-full" src={imgImageContainer3} />
            </div>
          </div>
          <Details4 />
        </div>
      </div>
    </div>
  );
}

function NameDate5() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0 text-nowrap w-full" data-name="Name + Date">
      <p className="[white-space-collapse:collapse] basis-0 font-['DM_Sans:SemiBold',_sans-serif] font-semibold grow leading-[normal] min-h-px min-w-px overflow-ellipsis overflow-hidden relative shrink-0 text-[16px] text-white" style={{ fontVariationSettings: "'opsz' 14" }}>
        Darrell Steward
      </p>
      <div className="flex flex-col font-['DM_Sans:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#a6a9b2] text-[14px]" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[normal] text-nowrap whitespace-pre">2/12 10:00 AM</p>
      </div>
    </div>
  );
}

function MessageCounter5() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0 w-full" data-name="Message + Counter">
      <p className="[white-space-collapse:collapse] basis-0 font-['DM_Sans:Regular',_sans-serif] font-normal grow leading-[normal] min-h-px min-w-px overflow-ellipsis overflow-hidden relative shrink-0 text-[#a6a9b2] text-[14px] text-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        Hi, I would like to know if there is parking available?
      </p>
    </div>
  );
}

function ReservationDatesProperty3() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0 w-full" data-name="Reservation dates + Property">
      <p className="font-['DM_Sans:Regular',_sans-serif] font-normal leading-[normal] relative shrink-0 text-[#a6a9b2] text-[14px] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'opsz' 14" }}>
        Feb 12-15
      </p>
      <div className="relative shrink-0 size-[2px]" data-name="Divider">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #A6A9B2)" id="Divider" r="1" />
        </svg>
      </div>
      <p className="[white-space-collapse:collapse] basis-0 font-['DM_Sans:Regular',_sans-serif] font-normal grow leading-[normal] min-h-px min-w-px overflow-ellipsis overflow-hidden relative shrink-0 text-[#a6a9b2] text-[14px] text-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        4517 Washington Ave. Manchester, Kentucky 39495
      </p>
    </div>
  );
}

function LabelContainer8() {
  return (
    <div className="box-border content-stretch flex gap-[8px] items-center justify-center px-[2px] py-0 relative shrink-0" data-name="Label Container">
      <p className="font-['DM_Sans:Medium',_sans-serif] font-medium leading-[normal] relative shrink-0 text-[#e1e3e8] text-[14px] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'opsz' 14" }}>
        Guest
      </p>
    </div>
  );
}

function RecipientType5() {
  return (
    <div className="bg-[#676a73] box-border content-stretch flex h-[20px] items-center px-[2px] py-0 relative rounded-[2px] shrink-0" data-name="Recipient Type">
      <LabelContainer8 />
    </div>
  );
}

function RecipientTypeUrgent5() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="Recipient Type + Urgent">
      <RecipientType5 />
    </div>
  );
}

function LabelContainer9() {
  return (
    <div className="box-border content-stretch flex gap-[8px] items-center justify-center px-[2px] py-0 relative shrink-0" data-name="Label Container">
      <p className="font-['DM_Sans:Medium',_sans-serif] font-medium leading-[normal] relative shrink-0 text-[#d4e4fc] text-[14px] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'opsz' 14" }}>
        Future
      </p>
    </div>
  );
}

function ReservationPhase3() {
  return (
    <div className="bg-[#013280] box-border content-stretch flex h-[20px] items-center px-[2px] py-0 relative rounded-[2px] shrink-0" data-name="Reservation Phase">
      <LabelContainer9 />
    </div>
  );
}

function Channel5() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Channel">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Channel">
          <rect fill="var(--fill-0, #676A73)" height="20" rx="2" width="20" />
          <path d={svgPaths.p1a8697a0} fill="var(--fill-0, #A6A9B2)" id="icon" />
        </g>
      </svg>
    </div>
  );
}

function ReservationPhaseOta3() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="Reservation Phase + OTA">
      <ReservationPhase3 />
      <Channel5 />
    </div>
  );
}

function Tags5() {
  return (
    <div className="box-border content-start flex flex-wrap gap-[4px] items-start justify-between pb-0 pt-[2px] px-0 relative shrink-0 w-full" data-name="Tags">
      <RecipientTypeUrgent5 />
      <ReservationPhaseOta3 />
    </div>
  );
}

function Details5() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[2px] grow items-start justify-center min-h-px min-w-px relative shrink-0" data-name="Details">
      <NameDate5 />
      <MessageCounter5 />
      <ReservationDatesProperty3 />
      <Tags5 />
    </div>
  );
}

function Badges3() {
  return <div className="absolute content-stretch flex items-center left-[8px] top-[6.5px]" data-name="Badges" />;
}

function ChatCard5() {
  return (
    <div className="bg-[#17191f] relative shrink-0 w-full" data-name="Chat Card">
      <div aria-hidden="true" className="absolute border-[#013280] border-[0px_1px_1px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[8px] items-center px-[12px] py-[8px] relative w-full">
          <div className="min-h-[80px] min-w-[80px] relative rounded-[4px] shrink-0 size-[80px]" data-name="image">
            <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-[4px] size-full" src={imgImage1} />
          </div>
          <Details5 />
          <Badges3 />
        </div>
      </div>
    </div>
  );
}

function NameDate6() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0 text-nowrap w-full" data-name="Name + Date">
      <p className="[white-space-collapse:collapse] basis-0 font-['DM_Sans:SemiBold',_sans-serif] font-semibold grow leading-[normal] min-h-px min-w-px overflow-ellipsis overflow-hidden relative shrink-0 text-[16px] text-white" style={{ fontVariationSettings: "'opsz' 14" }}>
        Jerome Bell
      </p>
      <div className="flex flex-col font-['DM_Sans:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#a6a9b2] text-[14px]" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[normal] text-nowrap whitespace-pre">2/12 10:00 AM</p>
      </div>
    </div>
  );
}

function MessageCounter6() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0 w-full" data-name="Message + Counter">
      <p className="[white-space-collapse:collapse] basis-0 font-['DM_Sans:Regular',_sans-serif] font-normal grow leading-[normal] min-h-px min-w-px overflow-ellipsis overflow-hidden relative shrink-0 text-[#a6a9b2] text-[14px] text-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        Hi, I would like to know if there is parking available?
      </p>
    </div>
  );
}

function ReservationDatesProperty4() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0 w-full" data-name="Reservation dates + Property">
      <p className="font-['DM_Sans:Regular',_sans-serif] font-normal leading-[normal] relative shrink-0 text-[#a6a9b2] text-[14px] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'opsz' 14" }}>
        Feb 12-15
      </p>
      <div className="relative shrink-0 size-[2px]" data-name="Divider">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #A6A9B2)" id="Divider" r="1" />
        </svg>
      </div>
      <p className="[white-space-collapse:collapse] basis-0 font-['DM_Sans:Regular',_sans-serif] font-normal grow leading-[normal] min-h-px min-w-px overflow-ellipsis overflow-hidden relative shrink-0 text-[#a6a9b2] text-[14px] text-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        4517 Washington Ave. Manchester, Kentucky 39495
      </p>
    </div>
  );
}

function LabelContainer10() {
  return (
    <div className="box-border content-stretch flex gap-[8px] items-center justify-center px-[2px] py-0 relative shrink-0" data-name="Label Container">
      <p className="font-['DM_Sans:Medium',_sans-serif] font-medium leading-[normal] relative shrink-0 text-[#e1e3e8] text-[14px] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'opsz' 14" }}>
        Guest
      </p>
    </div>
  );
}

function RecipientType6() {
  return (
    <div className="bg-[#676a73] box-border content-stretch flex h-[20px] items-center px-[2px] py-0 relative rounded-[2px] shrink-0" data-name="Recipient Type">
      <LabelContainer10 />
    </div>
  );
}

function RecipientTypeUrgent6() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="Recipient Type + Urgent">
      <RecipientType6 />
    </div>
  );
}

function LabelContainer11() {
  return (
    <div className="box-border content-stretch flex gap-[8px] items-center justify-center px-[2px] py-0 relative shrink-0" data-name="Label Container">
      <p className="font-['DM_Sans:Medium',_sans-serif] font-medium leading-[normal] relative shrink-0 text-[#faedc5] text-[14px] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'opsz' 14" }}>
        Inquiry
      </p>
    </div>
  );
}

function ReservationPhase4() {
  return (
    <div className="bg-[#614100] box-border content-stretch flex h-[20px] items-center px-[2px] py-0 relative rounded-[2px] shrink-0" data-name="Reservation Phase">
      <LabelContainer11 />
    </div>
  );
}

function Channel6() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Channel">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Channel">
          <rect fill="var(--fill-0, #676A73)" height="20" rx="2" width="20" />
          <path d={svgPaths.p3227f400} fill="var(--fill-0, #A6A9B2)" id="icon" />
        </g>
      </svg>
    </div>
  );
}

function ReservationPhaseOta4() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="Reservation Phase + OTA">
      <ReservationPhase4 />
      <Channel6 />
    </div>
  );
}

function Tags6() {
  return (
    <div className="box-border content-start flex flex-wrap gap-[4px] items-start justify-between pb-0 pt-[2px] px-0 relative shrink-0 w-full" data-name="Tags">
      <RecipientTypeUrgent6 />
      <ReservationPhaseOta4 />
    </div>
  );
}

function Details6() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[2px] grow items-start justify-center min-h-px min-w-px relative shrink-0" data-name="Details">
      <NameDate6 />
      <MessageCounter6 />
      <ReservationDatesProperty4 />
      <Tags6 />
    </div>
  );
}

function Badges4() {
  return <div className="absolute content-stretch flex items-center left-[8px] top-[6.5px]" data-name="Badges" />;
}

function ChatCard6() {
  return (
    <div className="bg-[#17191f] relative shrink-0 w-full" data-name="Chat Card">
      <div aria-hidden="true" className="absolute border-[#013280] border-[0px_1px_1px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[8px] items-center px-[12px] py-[8px] relative w-full">
          <div className="min-h-[80px] min-w-[80px] relative rounded-[4px] shrink-0 size-[80px]" data-name="image">
            <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-[4px] size-full" src={imgImage2} />
          </div>
          <Details6 />
          <Badges4 />
        </div>
      </div>
    </div>
  );
}

function NameDate7() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0 text-nowrap w-full" data-name="Name + Date">
      <p className="[white-space-collapse:collapse] basis-0 font-['DM_Sans:SemiBold',_sans-serif] font-semibold grow leading-[normal] min-h-px min-w-px overflow-ellipsis overflow-hidden relative shrink-0 text-[16px] text-white" style={{ fontVariationSettings: "'opsz' 14" }}>
        Guy Hawkins
      </p>
      <div className="flex flex-col font-['DM_Sans:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#a6a9b2] text-[14px]" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[normal] text-nowrap whitespace-pre">2/12 10:00 AM</p>
      </div>
    </div>
  );
}

function MessageCounter7() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0 w-full" data-name="Message + Counter">
      <p className="[white-space-collapse:collapse] basis-0 font-['DM_Sans:Regular',_sans-serif] font-normal grow leading-[normal] min-h-px min-w-px overflow-ellipsis overflow-hidden relative shrink-0 text-[#a6a9b2] text-[14px] text-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        Hi, I would like to know if there is parking available?
      </p>
    </div>
  );
}

function ReservationDatesProperty5() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0 w-full" data-name="Reservation dates + Property">
      <p className="font-['DM_Sans:Regular',_sans-serif] font-normal leading-[normal] relative shrink-0 text-[#a6a9b2] text-[14px] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'opsz' 14" }}>
        Feb 12-15
      </p>
      <div className="relative shrink-0 size-[2px]" data-name="Divider">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #A6A9B2)" id="Divider" r="1" />
        </svg>
      </div>
      <p className="[white-space-collapse:collapse] basis-0 font-['DM_Sans:Regular',_sans-serif] font-normal grow leading-[normal] min-h-px min-w-px overflow-ellipsis overflow-hidden relative shrink-0 text-[#a6a9b2] text-[14px] text-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        4517 Washington Ave. Manchester, Kentucky 39495
      </p>
    </div>
  );
}

function LabelContainer12() {
  return (
    <div className="box-border content-stretch flex gap-[8px] items-center justify-center px-[2px] py-0 relative shrink-0" data-name="Label Container">
      <p className="font-['DM_Sans:Medium',_sans-serif] font-medium leading-[normal] relative shrink-0 text-[#e1e3e8] text-[14px] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'opsz' 14" }}>
        Guest
      </p>
    </div>
  );
}

function RecipientType7() {
  return (
    <div className="bg-[#676a73] box-border content-stretch flex h-[20px] items-center px-[2px] py-0 relative rounded-[2px] shrink-0" data-name="Recipient Type">
      <LabelContainer12 />
    </div>
  );
}

function RecipientTypeUrgent7() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="Recipient Type + Urgent">
      <RecipientType7 />
    </div>
  );
}

function LabelContainer13() {
  return (
    <div className="box-border content-stretch flex gap-[8px] items-center justify-center px-[2px] py-0 relative shrink-0" data-name="Label Container">
      <p className="font-['DM_Sans:Medium',_sans-serif] font-medium leading-[normal] relative shrink-0 text-[#d4e4fc] text-[14px] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'opsz' 14" }}>
        Future
      </p>
    </div>
  );
}

function ReservationPhase5() {
  return (
    <div className="bg-[#013280] box-border content-stretch flex h-[20px] items-center px-[2px] py-0 relative rounded-[2px] shrink-0" data-name="Reservation Phase">
      <LabelContainer13 />
    </div>
  );
}

function Channel7() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Channel">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Channel">
          <rect fill="var(--fill-0, #676A73)" height="20" rx="2" width="20" />
          <path d={svgPaths.p3227f400} fill="var(--fill-0, #A6A9B2)" id="icon" />
        </g>
      </svg>
    </div>
  );
}

function ReservationPhaseOta5() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="Reservation Phase + OTA">
      <ReservationPhase5 />
      <Channel7 />
    </div>
  );
}

function Tags7() {
  return (
    <div className="box-border content-start flex flex-wrap gap-[4px] items-start justify-between pb-0 pt-[2px] px-0 relative shrink-0 w-full" data-name="Tags">
      <RecipientTypeUrgent7 />
      <ReservationPhaseOta5 />
    </div>
  );
}

function Details7() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[2px] grow items-start justify-center min-h-px min-w-px relative shrink-0" data-name="Details">
      <NameDate7 />
      <MessageCounter7 />
      <ReservationDatesProperty5 />
      <Tags7 />
    </div>
  );
}

function Badges5() {
  return <div className="absolute content-stretch flex items-center left-[8px] top-[6.5px]" data-name="Badges" />;
}

function ChatCard7() {
  return (
    <div className="bg-[#17191f] relative shrink-0 w-full" data-name="Chat Card">
      <div aria-hidden="true" className="absolute border-[#013280] border-[0px_1px_1px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[8px] items-center px-[12px] py-[8px] relative w-full">
          <div className="min-h-[80px] min-w-[80px] relative rounded-[4px] shrink-0 size-[80px]" data-name="image">
            <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-[4px] size-full" src={imgImage3} />
          </div>
          <Details7 />
          <Badges5 />
        </div>
      </div>
    </div>
  );
}

function ChatList() {
  return (
    <div className="absolute bg-[#17191f] h-[748px] left-[20px] rounded-bl-[4px] top-[136px] w-[352px]" data-name="Chat List">
      <div className="content-stretch flex flex-col h-[748px] items-start overflow-clip relative rounded-[inherit] w-[352px]">
        <ChatCard />
        <ChatCard1 />
        <ChatCard2 />
        <ChatCard3 />
        <ChatCard4 />
        <ChatCard5 />
        <ChatCard6 />
        <ChatCard7 />
        <div className="absolute bottom-px h-[32px] left-px right-px" data-name="overflow shadow">
          <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgOverflowShadow} />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[#013280] border-[0px_1px_1px] border-solid inset-0 pointer-events-none rounded-bl-[4px]" />
    </div>
  );
}

function LabelContainer14() {
  return (
    <div className="box-border content-stretch flex gap-[8px] items-center justify-center px-[2px] py-0 relative shrink-0" data-name="Label Container">
      <p className="font-['DM_Sans:Medium',_sans-serif] font-medium leading-[normal] relative shrink-0 text-[#e1e3e8] text-[14px] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'opsz' 14" }}>
        Guest
      </p>
    </div>
  );
}

function RecipientType8() {
  return (
    <div className="bg-[#676a73] box-border content-stretch flex h-[20px] items-center px-[2px] py-0 relative rounded-[2px] shrink-0" data-name="Recipient Type">
      <LabelContainer14 />
    </div>
  );
}

function LabelContainer15() {
  return (
    <div className="box-border content-stretch flex gap-[8px] items-center justify-center px-[2px] py-0 relative shrink-0" data-name="Label Container">
      <p className="font-['DM_Sans:Medium',_sans-serif] font-medium leading-[normal] relative shrink-0 text-[#ecdefc] text-[14px] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'opsz' 14" }}>
        Check-in today
      </p>
    </div>
  );
}

function ReservationPhase6() {
  return (
    <div className="bg-[#5607b0] box-border content-stretch flex h-[20px] items-center px-[2px] py-0 relative rounded-[2px] shrink-0" data-name="Reservation Phase">
      <LabelContainer15 />
    </div>
  );
}

function Tags8() {
  return (
    <div className="content-stretch flex gap-[4px] items-start relative shrink-0" data-name="Tags">
      <RecipientType8 />
      <ReservationPhase6 />
    </div>
  );
}

function Channel8() {
  return (
    <div className="h-[20px] relative shrink-0 w-[80.141px]" data-name="Channel">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 81 20">
        <g id="Channel">
          <rect fill="var(--fill-0, #676A73)" height="20" rx="2" width="80.1406" />
          <path d={svgPaths.p1f94ef00} fill="var(--fill-0, #A6A9B2)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function ReservationDetails() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full" data-name="Reservation Details">
      <Tags8 />
      <p className="font-['DM_Sans:SemiBold',_sans-serif] font-semibold leading-[normal] min-w-full relative shrink-0 text-[#d0d3db] text-[14px] w-[min-content]" style={{ fontVariationSettings: "'opsz' 14" }}>
        4517 Washington Ave. Manchester, Kentucky 39495
      </p>
      <p className="font-['DM_Sans:SemiBold',_sans-serif] font-semibold leading-[normal] min-w-full relative shrink-0 text-[#d0d3db] text-[14px] w-[min-content]" style={{ fontVariationSettings: "'opsz' 14" }}>
        Feb 12-15 (3 nights)
      </p>
      <Channel8 />
    </div>
  );
}

function Button1() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative rounded-[4px] shrink-0" data-name="Button">
      <p className="font-['DM_Sans:SemiBold',_sans-serif] font-semibold leading-[normal] relative shrink-0 text-[#74a9f7] text-[14px] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'opsz' 14" }}>
        Edit
      </p>
    </div>
  );
}

function HeadingEditBtn() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full" data-name="Heading + Edit Btn">
      <p className="basis-0 font-['Poppins:SemiBold',_sans-serif] grow leading-[1.4] min-h-px min-w-px not-italic relative shrink-0 text-[14px] text-white">Contact information</p>
      <Button1 />
    </div>
  );
}

function Phone() {
  return (
    <div className="content-stretch flex gap-[4px] items-start leading-[normal] relative shrink-0 text-[14px] w-full" data-name="Phone">
      <p className="font-['DM_Sans:Regular',_sans-serif] font-normal relative shrink-0 text-[#a6a9b2] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'opsz' 14" }}>
        Phone:
      </p>
      <p className="basis-0 font-['DM_Sans:SemiBold',_sans-serif] font-semibold grow min-h-px min-w-px relative shrink-0 text-[#d0d3db]" style={{ fontVariationSettings: "'opsz' 14" }}>
        (316) 555-0116
      </p>
    </div>
  );
}

function Phone1() {
  return (
    <div className="content-stretch flex gap-[4px] items-start leading-[normal] relative shrink-0 text-[14px] w-full" data-name="Phone">
      <p className="font-['DM_Sans:Regular',_sans-serif] font-normal relative shrink-0 text-[#a6a9b2] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'opsz' 14" }}>
        Email:
      </p>
      <p className="basis-0 font-['DM_Sans:SemiBold',_sans-serif] font-semibold grow min-h-px min-w-px relative shrink-0 text-[#d0d3db]" style={{ fontVariationSettings: "'opsz' 14" }}>
        floydmiles@gmail.com
      </p>
    </div>
  );
}

function ContactInfo() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full" data-name="Contact Info">
      <Phone />
      <Phone1 />
    </div>
  );
}

function Logo() {
  return (
    <div className="relative shrink-0 size-[32px]" data-name="Logo">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <g id="Logo">
          <path d={svgPaths.p115ff000} fill="url(#paint0_linear_1_10051)" id="Icon" />
        </g>
        <defs>
          <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_1_10051" x1="15.9999" x2="15.9999" y1="3.84" y2="27.9474">
            <stop stopColor="#1FA8ED" />
            <stop offset="0.535" stopColor="#1155C0" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

function LogoText() {
  return (
    <div className="content-stretch flex gap-[2px] items-center relative shrink-0" data-name="Logo + Text">
      <Logo />
      <p className="font-['Poppins:SemiBold',_sans-serif] leading-[1.4] not-italic relative shrink-0 text-[14px] text-nowrap text-white whitespace-pre">HostBuddy is</p>
    </div>
  );
}

function CircleStatus() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="circle-status">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="circle-status">
          <circle cx="10" cy="10" fill="var(--fill-0, #10CC4F)" id="Icon" r="5" />
        </g>
      </svg>
    </div>
  );
}

function TrailingIcon() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Trailing Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Trailing Icon">
          <path d="M5 7.5L10 12.5L15 7.5" id="Icon" stroke="var(--stroke-0, #A6A9B2)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function DropdownButton() {
  return (
    <div className="bg-[rgba(189,193,201,0.08)] h-[32px] relative rounded-[4px] shrink-0 w-full" data-name="Dropdown Button">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[6px] h-[32px] items-center px-[8px] py-0 relative w-full">
          <CircleStatus />
          <p className="basis-0 font-['DM_Sans:Medium',_sans-serif] font-medium grow leading-[normal] min-h-px min-w-px relative shrink-0 text-[#d0d3db] text-[14px]" style={{ fontVariationSettings: "'opsz' 14" }}>
            Active
          </p>
          <TrailingIcon />
        </div>
      </div>
    </div>
  );
}

function Dropdown() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[8px] grow items-start min-h-px min-w-px relative shrink-0" data-name="Dropdown">
      <DropdownButton />
    </div>
  );
}

function HostBuddyControl() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full" data-name="HostBuddy Control">
      <LogoText />
      <Dropdown />
    </div>
  );
}

function LeadingIcon18() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Leading Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g clipPath="url(#clip0_1_10036)" id="Leading Icon">
          <path d={svgPaths.p1af6b00} id="Icon" stroke="var(--stroke-0, #A6A9B2)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
        <defs>
          <clipPath id="clip0_1_10036">
            <rect fill="white" height="20" width="20" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function TrailingIcon1() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Trailing Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Trailing Icon">
          <path d="M5 7.5L10 12.5L15 7.5" id="Icon" stroke="var(--stroke-0, #A6A9B2)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function DropdownButton1() {
  return (
    <div className="bg-[rgba(189,193,201,0.08)] h-[32px] relative rounded-[4px] shrink-0 w-full" data-name="Dropdown Button">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[6px] h-[32px] items-center px-[8px] py-0 relative w-full">
          <LeadingIcon18 />
          <p className="basis-0 font-['DM_Sans:Medium',_sans-serif] font-medium grow leading-[normal] min-h-px min-w-px relative shrink-0 text-[#d0d3db] text-[14px]" style={{ fontVariationSettings: "'opsz' 14" }}>
            Neutral
          </p>
          <TrailingIcon1 />
        </div>
      </div>
    </div>
  );
}

function Dropdown1() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="Dropdown">
      <DropdownButton1 />
    </div>
  );
}

function Input1() {
  return (
    <div className="basis-0 content-stretch flex grow items-center min-h-px min-w-px relative shrink-0" data-name="Input">
      <p className="basis-0 font-['DM_Sans:Medium',_sans-serif] font-medium grow leading-[normal] min-h-px min-w-px relative shrink-0 text-[#676a73] text-[14px]" style={{ fontVariationSettings: "'opsz' 14" }}>
        Select
      </p>
    </div>
  );
}

function TrailingIcon2() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Trailing Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Trailing Icon">
          <path d="M5 7.5L10 12.5L15 7.5" id="Icon" stroke="var(--stroke-0, #A6A9B2)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function InputArea1() {
  return (
    <div className="bg-[#676a73] h-[32px] relative rounded-[4px] shrink-0 w-full" data-name="Input Area">
      <div aria-hidden="true" className="absolute border border-[rgba(189,193,201,0.15)] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[6px] h-[32px] items-center px-[8px] py-0 relative w-full">
          <Input1 />
          <TrailingIcon2 />
        </div>
      </div>
    </div>
  );
}

function SelectInput1() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[4px] grow items-start min-h-px min-w-px relative shrink-0" data-name="Select Input">
      <InputArea1 />
    </div>
  );
}

function Select1() {
  return (
    <div className="content-stretch flex gap-[8px] items-start relative shrink-0 w-full" data-name="Select">
      <SelectInput1 />
    </div>
  );
}

function Badge5() {
  return (
    <div className="bg-[rgba(189,193,201,0.08)] box-border content-stretch flex gap-[8px] h-[18px] items-center justify-center min-w-[18px] px-[2px] py-0 relative rounded-[20px] shrink-0" data-name="Badge">
      <div className="flex flex-col font-['DM_Sans:SemiBold',_sans-serif] font-semibold justify-center leading-[0] overflow-ellipsis overflow-hidden relative shrink-0 text-[#a6a9b2] text-[12px] text-center text-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[normal] overflow-ellipsis overflow-hidden whitespace-pre">3</p>
      </div>
    </div>
  );
}

function HeadingBadge() {
  return (
    <div className="basis-0 content-stretch flex gap-[4px] grow items-center min-h-px min-w-px relative shrink-0" data-name="Heading + Badge">
      <p className="font-['Poppins:SemiBold',_sans-serif] leading-[1.4] not-italic relative shrink-0 text-[14px] text-nowrap text-white whitespace-pre">Open issues</p>
      <Badge5 />
    </div>
  );
}

function Button2() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative rounded-[4px] shrink-0" data-name="Button">
      <p className="font-['DM_Sans:SemiBold',_sans-serif] font-semibold leading-[normal] relative shrink-0 text-[#74a9f7] text-[14px] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'opsz' 14" }}>
        View all
      </p>
    </div>
  );
}

function Heading() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full" data-name="Heading">
      <HeadingBadge />
      <Button2 />
    </div>
  );
}

function Check() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="check">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="check">
          <path d={svgPaths.p32ddfd00} id="Icon" stroke="var(--stroke-0, #A6A9B2)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function Button3() {
  return (
    <div className="bg-[rgba(189,193,201,0.08)] box-border content-stretch flex gap-[4px] items-center justify-center px-[12px] py-0 relative rounded-[4px] shrink-0 size-[32px]" data-name="Button">
      <Check />
    </div>
  );
}

function DescResolveBtn() {
  return (
    <div className="content-stretch flex gap-[4px] items-start relative shrink-0 w-full" data-name="Desc + Resolve Btn">
      <p className="basis-0 font-['DM_Sans:Regular',_sans-serif] font-normal grow leading-[normal] min-h-px min-w-px relative shrink-0 text-[#d0d3db] text-[14px]" style={{ fontVariationSettings: "'opsz' 14" }}>
        The guest reported that the bathroom towels are missing and could not be located after checking all suggested areas.
      </p>
      <Button3 />
    </div>
  );
}

function Issue() {
  return (
    <div className="content-stretch flex flex-col gap-[2px] items-start relative shrink-0 w-full" data-name="Issue">
      <p className="font-['DM_Sans:SemiBold',_sans-serif] font-semibold leading-[normal] relative shrink-0 text-[#a6a9b2] text-[12px] w-full" style={{ fontVariationSettings: "'opsz' 14" }}>
        Feb 13 12:00 PM
      </p>
      <DescResolveBtn />
    </div>
  );
}

function Details8() {
  return (
    <div className="absolute bg-[#17191f] h-[842px] left-[924px] rounded-br-[4px] rounded-tr-[4px] top-[42px] w-[296px]" data-name="Details">
      <div className="box-border content-stretch flex flex-col gap-[8px] h-[842px] items-start overflow-x-clip overflow-y-auto p-[12px] relative w-[296px]">
        <p className="font-['Poppins:SemiBold',_sans-serif] leading-[1.4] not-italic relative shrink-0 text-[14px] text-white w-full">Reservation details</p>
        <div className="h-[120px] relative rounded-[4px] shrink-0 w-full" data-name="image">
          <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-[4px] size-full" src={imgImageContainer1} />
        </div>
        <ReservationDetails />
        <div className="bg-[rgba(189,193,201,0.15)] h-px rounded-[1px] shrink-0 w-full" data-name="Divider" />
        <HeadingEditBtn />
        <ContactInfo />
        <div className="bg-[rgba(189,193,201,0.15)] h-px rounded-[1px] shrink-0 w-full" data-name="Divider" />
        <HostBuddyControl />
        <div className="bg-[rgba(189,193,201,0.15)] h-px rounded-[1px] shrink-0 w-full" data-name="Divider" />
        <p className="font-['Poppins:SemiBold',_sans-serif] leading-[1.4] not-italic relative shrink-0 text-[14px] text-white w-full">Sentiment</p>
        <Dropdown1 />
        <p className="font-['DM_Sans:Regular',_sans-serif] font-normal leading-[normal] relative shrink-0 text-[#d0d3db] text-[14px] w-full" style={{ fontVariationSettings: "'opsz' 14" }}>{`The guest's tone throughout the conversation was polite and cooperative, but there is no explicit indication that they were particularly satisfied or dissatisfied with their experience.`}</p>
        <div className="bg-[rgba(189,193,201,0.15)] h-px rounded-[1px] shrink-0 w-full" data-name="Divider" />
        <p className="font-['Poppins:SemiBold',_sans-serif] leading-[1.4] not-italic relative shrink-0 text-[14px] text-white w-full">Assign user</p>
        <Select1 />
        <div className="bg-[rgba(189,193,201,0.15)] h-px rounded-[1px] shrink-0 w-full" data-name="Divider" />
        <Heading />
        <Issue />
        <p className="font-['DM_Sans:Regular',_sans-serif] font-normal leading-[normal] relative shrink-0 text-[#a6a9b2] text-[14px] w-full" style={{ fontVariationSettings: "'opsz' 14" }}>
          +2 more issues
        </p>
      </div>
      <div aria-hidden="true" className="absolute border border-[#013280] border-solid inset-0 pointer-events-none rounded-br-[4px] rounded-tr-[4px]" />
    </div>
  );
}

function Pin8() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="pin-02">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="pin-02">
          <g id="Icon">
            <path d={svgPaths.p29008490} fill="var(--fill-0, #F26C0C)" />
            <path d={svgPaths.p3bd64e00} stroke="var(--stroke-0, #F26C0C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function PinButton() {
  return (
    <div className="bg-[rgba(255,255,255,0)] box-border content-stretch flex gap-[4px] items-center justify-center px-[12px] py-0 relative rounded-[4px] shrink-0 size-[32px]" data-name="Pin Button">
      <Pin8 />
    </div>
  );
}

function LayoutRight() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="layout-right">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="layout-right">
          <path d={svgPaths.p38f7a100} id="Icon" stroke="var(--stroke-0, #74A9F7)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.3" />
        </g>
      </svg>
    </div>
  );
}

function Label2() {
  return (
    <div className="box-border content-stretch flex gap-[8px] items-center justify-center px-[4px] py-0 relative shrink-0" data-name="Label">
      <p className="font-['DM_Sans:SemiBold',_sans-serif] font-semibold leading-[normal] relative shrink-0 text-[#98bffa] text-[14px] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'opsz' 14" }}>
        Details
      </p>
    </div>
  );
}

function Button4() {
  return (
    <div className="bg-[#01255e] box-border content-stretch flex h-[32px] items-center px-[8px] py-0 relative rounded-[4px] shrink-0" data-name="Button">
      <LayoutRight />
      <Label2 />
    </div>
  );
}

function NameButtons() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full" data-name="Name + Buttons">
      <div className="relative rounded-[4px] shrink-0 size-[32px]" data-name="Image Container">
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[4px]">
          <div className="absolute bg-[#bfd5cd] inset-0 rounded-[4px]" />
          <img alt="" className="absolute max-w-none object-50%-50% object-cover rounded-[4px] size-full" src={imgImageContainer4} />
        </div>
      </div>
      <p className="basis-0 font-['Poppins:Bold',_sans-serif] grow leading-[1.4] min-h-px min-w-px not-italic relative shrink-0 text-[18px] text-white">Floyd Miles</p>
      <PinButton />
      <Button4 />
    </div>
  );
}

function LeadingIcon20() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Leading Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Leading Icon">
          <path d={svgPaths.p2115b500} id="Icon" stroke="var(--stroke-0, #E1E3E8)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.866667" />
        </g>
      </svg>
    </div>
  );
}

function Tab() {
  return (
    <div className="bg-[rgba(255,255,255,0)] box-border content-stretch flex gap-[4px] h-full items-center px-[4px] py-[8px] relative rounded-tl-[4px] rounded-tr-[4px] shrink-0" data-name="_Tab">
      <LeadingIcon20 />
      <p className="font-['DM_Sans:SemiBold',_sans-serif] font-semibold leading-[normal] relative shrink-0 text-[14px] text-nowrap text-white whitespace-pre" style={{ fontVariationSettings: "'opsz' 14" }}>
        PMS
      </p>
      <div className="absolute bg-[#3e88f7] bottom-0 h-[3px] left-[4px] right-[4px] rounded-tl-[2px] rounded-tr-[2px]" data-name="Selection Indicator" />
    </div>
  );
}

function Whatsapp() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="whatsapp">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_1_9876)" id="whatsapp">
          <path clipRule="evenodd" d={svgPaths.p3b54ad80} fill="var(--fill-0, #A6A9B2)" fillRule="evenodd" id="Icon" />
        </g>
        <defs>
          <clipPath id="clip0_1_9876">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Tab1() {
  return (
    <div className="bg-[rgba(255,255,255,0)] box-border content-stretch flex gap-[4px] h-full items-center px-[4px] py-0 relative rounded-tl-[4px] rounded-tr-[4px] shrink-0" data-name="_Tab">
      <Whatsapp />
      <p className="font-['DM_Sans:Medium',_sans-serif] font-medium leading-[normal] relative shrink-0 text-[#d0d3db] text-[14px] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'opsz' 14" }}>
        WhatsApp
      </p>
    </div>
  );
}

function CheckSquareBroken() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="check-square-broken">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="check-square-broken">
          <path d={svgPaths.pba98f00} id="Icon" stroke="var(--stroke-0, #A6A9B2)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.866667" />
        </g>
      </svg>
    </div>
  );
}

function Badge6() {
  return (
    <div className="bg-[rgba(189,193,201,0.08)] box-border content-stretch flex gap-[8px] h-[18px] items-center justify-center min-w-[18px] px-[2px] py-0 relative rounded-[20px] shrink-0" data-name="Badge">
      <div className="flex flex-col font-['DM_Sans:SemiBold',_sans-serif] font-semibold justify-center leading-[0] overflow-ellipsis overflow-hidden relative shrink-0 text-[#a6a9b2] text-[12px] text-center text-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[normal] overflow-ellipsis overflow-hidden whitespace-pre">3</p>
      </div>
    </div>
  );
}

function Tab2() {
  return (
    <div className="bg-[rgba(255,255,255,0)] box-border content-stretch flex gap-[4px] h-full items-center px-[4px] py-0 relative rounded-tl-[4px] rounded-tr-[4px] shrink-0" data-name="_Tab">
      <CheckSquareBroken />
      <p className="font-['DM_Sans:Medium',_sans-serif] font-medium leading-[normal] relative shrink-0 text-[#d0d3db] text-[14px] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'opsz' 14" }}>
        Open issues
      </p>
      <Badge6 />
    </div>
  );
}

function StickerSquare() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="sticker-square">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="sticker-square">
          <path d={svgPaths.p2ce50c00} id="Icon" stroke="var(--stroke-0, #A6A9B2)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.866667" />
        </g>
      </svg>
    </div>
  );
}

function Badge7() {
  return (
    <div className="bg-[rgba(189,193,201,0.08)] box-border content-stretch flex gap-[8px] h-[18px] items-center justify-center min-w-[18px] px-[2px] py-0 relative rounded-[20px] shrink-0" data-name="Badge">
      <div className="flex flex-col font-['DM_Sans:SemiBold',_sans-serif] font-semibold justify-center leading-[0] overflow-ellipsis overflow-hidden relative shrink-0 text-[#a6a9b2] text-[12px] text-center text-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[normal] overflow-ellipsis overflow-hidden whitespace-pre">2</p>
      </div>
    </div>
  );
}

function Tab3() {
  return (
    <div className="bg-[rgba(255,255,255,0)] box-border content-stretch flex gap-[4px] h-full items-center px-[4px] py-0 relative rounded-tl-[4px] rounded-tr-[4px] shrink-0" data-name="_Tab">
      <StickerSquare />
      <p className="font-['DM_Sans:Medium',_sans-serif] font-medium leading-[normal] relative shrink-0 text-[#d0d3db] text-[14px] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'opsz' 14" }}>
        Notes
      </p>
      <Badge7 />
    </div>
  );
}

function TabMenu() {
  return (
    <div className="h-[32px] relative shrink-0 w-full" data-name="Tab Menu">
      <div className="content-stretch flex gap-[4px] h-[32px] items-center overflow-clip relative rounded-[inherit] w-full">
        <Tab />
        <Tab1 />
        <Tab2 />
        <Tab3 />
      </div>
      <div aria-hidden="true" className="absolute border-[#013280] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function ChatHeader() {
  return (
    <div className="absolute bg-[#17191f] box-border content-stretch flex flex-col gap-[8px] items-start justify-end left-[388px] pb-0 pt-[12px] px-[12px] top-[42px] w-[536px]" data-name="Chat Header">
      <div aria-hidden="true" className="absolute border-[#013280] border-[1px_0px_1px_2px] border-solid inset-0 pointer-events-none" />
      <NameButtons />
      <TabMenu />
    </div>
  );
}

function Stars2() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="stars-01">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="stars-01">
          <g id="Icon">
            <path d={svgPaths.pf8e9f00} stroke="var(--stroke-0, #A6A9B2)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.25" />
            <path d={svgPaths.pab2d800} stroke="var(--stroke-0, #A6A9B2)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.25" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function TrailingIcon3() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Trailing Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Trailing Icon">
          <path d="M5 7.5L10 12.5L15 7.5" id="Icon" stroke="var(--stroke-0, #A6A9B2)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function DropdownButton2() {
  return (
    <div className="bg-[rgba(255,255,255,0)] box-border content-stretch flex gap-[6px] h-[32px] items-center px-[8px] py-0 relative rounded-[4px] shrink-0" data-name="Dropdown Button">
      <Stars2 />
      <p className="font-['DM_Sans:Medium',_sans-serif] font-medium leading-[normal] relative shrink-0 text-[#d0d3db] text-[14px] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'opsz' 14" }}>
        AI response
      </p>
      <TrailingIcon3 />
    </div>
  );
}

function Dropdown2() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0" data-name="Dropdown">
      <DropdownButton2 />
    </div>
  );
}

function File02() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="file-02">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="file-02">
          <path d={svgPaths.p26561ff0} id="Icon" stroke="var(--stroke-0, #A6A9B2)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.3" />
        </g>
      </svg>
    </div>
  );
}

function Label3() {
  return (
    <div className="box-border content-stretch flex gap-[8px] items-center justify-center px-[4px] py-0 relative shrink-0" data-name="Label">
      <p className="font-['DM_Sans:SemiBold',_sans-serif] font-semibold leading-[normal] relative shrink-0 text-[#d0d3db] text-[14px] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'opsz' 14" }}>
        Send template
      </p>
    </div>
  );
}

function Button5() {
  return (
    <div className="bg-[rgba(255,255,255,0)] box-border content-stretch flex h-[32px] items-center px-[8px] py-0 relative rounded-[4px] shrink-0" data-name="Button">
      <File02 />
      <Label3 />
    </div>
  );
}

function AiResponseTemplates() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="AI Response + Templates">
      <Dropdown2 />
    </div>
  );
}

function TrailingIcon4() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Trailing Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Trailing Icon">
          <path d={svgPaths.p38dd5b00} id="Icon" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.3" />
        </g>
      </svg>
    </div>
  );
}

function SplitButtonBlocks() {
  return (
    <div className="bg-[#3e88f7] box-border content-stretch flex gap-[4px] h-[32px] items-center px-[8px] py-0 relative rounded-bl-[4px] rounded-tl-[4px] shrink-0" data-name="_Split Button Blocks">
      <p className="font-['DM_Sans:SemiBold',_sans-serif] font-semibold leading-[normal] relative shrink-0 text-[14px] text-nowrap text-white whitespace-pre" style={{ fontVariationSettings: "'opsz' 14" }}>
        Send
      </p>
      <TrailingIcon4 />
    </div>
  );
}

function Icon1() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d="M5 7.5L10 12.5L15 7.5" id="Icon_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function SplitButtonBlocks1() {
  return (
    <div className="bg-[#3e88f7] box-border content-stretch flex gap-[4px] items-center justify-center px-[12px] py-0 relative rounded-br-[4px] rounded-tr-[4px] shrink-0 size-[32px]" data-name="_Split Button Blocks">
      <Icon1 />
    </div>
  );
}

function SplitButton() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="Split Button">
      <SplitButtonBlocks />
      <SplitButtonBlocks1 />
      <div className="absolute bg-[rgba(15,17,23,0.32)] bottom-[8px] right-[31.5px] rounded-[1px] top-[8px] w-px" data-name="Divider" />
    </div>
  );
}

function Actions() {
  return (
    <div className="content-stretch flex items-start justify-between relative shrink-0 w-full" data-name="Actions">
      <AiResponseTemplates />
      <SplitButton />
    </div>
  );
}

function TextArea() {
  return (
    <div className="absolute bg-[#17191f] box-border content-stretch flex flex-col gap-[16px] items-start left-[388px] p-[12px] top-[791px] w-[536px]" data-name="Text Area">
      <div aria-hidden="true" className="absolute border-[#013280] border-[0px_0px_1px_2px] border-solid inset-0 pointer-events-none" />
      <p className="font-['DM_Sans:Medium',_sans-serif] font-medium leading-[normal] relative shrink-0 text-[#676a73] text-[16px] w-full" style={{ fontVariationSettings: "'opsz' 14" }}>
        Message...
      </p>
      <Actions />
    </div>
  );
}

function DayDivider() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full" data-name="Day Divider">
      <div className="basis-0 bg-[rgba(189,193,201,0.15)] grow h-px min-h-px min-w-px rounded-[1px] shrink-0" data-name="Divider" />
      <p className="font-['DM_Sans:SemiBold',_sans-serif] font-semibold leading-[normal] relative shrink-0 text-[#a6a9b2] text-[12px] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'opsz' 14" }}>
        Feb 12
      </p>
      <div className="basis-0 bg-[rgba(189,193,201,0.15)] grow h-px min-h-px min-w-px rounded-[1px] shrink-0" data-name="Divider" />
    </div>
  );
}

function Logo1() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Logo">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Logo">
          <path d={svgPaths.p3f92c700} fill="url(#paint0_linear_1_9830)" id="Icon" />
        </g>
        <defs>
          <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_1_9830" x1="10" x2="10" y1="2.4" y2="17.4664">
            <stop stopColor="#1FA8ED" />
            <stop offset="0.535" stopColor="#1155C0" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

function AuthorTimeStamp() {
  return (
    <div className="box-border content-stretch flex gap-[4px] items-center pl-0 pr-[4px] py-0 relative shrink-0" data-name="Author + Time Stamp">
      <Logo1 />
      <p className="font-['DM_Sans:Medium',_sans-serif] font-medium leading-[normal] relative shrink-0 text-[#a6a9b2] text-[14px] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'opsz' 14" }}>
        HostBuddy
      </p>
      <div className="relative shrink-0 size-[2px]" data-name="Divider">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #676A73)" id="Divider" r="1" />
        </svg>
      </div>
      <p className="font-['DM_Sans:Regular',_sans-serif] font-normal leading-[normal] relative shrink-0 text-[#a6a9b2] text-[14px] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'opsz' 14" }}>
        11:30 AM
      </p>
    </div>
  );
}

function MessageBubble() {
  return (
    <div className="bg-[#17191f] box-border content-stretch flex gap-[8px] items-center max-w-[420px] p-[12px] relative rounded-[12px] shrink-0" data-name="Message Bubble">
      <div aria-hidden="true" className="absolute border border-[rgba(189,193,201,0.15)] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <p className="basis-0 font-['DM_Sans:Regular',_sans-serif] font-normal grow leading-[normal] min-h-px min-w-px relative shrink-0 text-[16px] text-white" style={{ fontVariationSettings: "'opsz' 14" }}>{`Hi Floyd, here's your lock box code is 721539205🔓`}</p>
    </div>
  );
}

function ThumbsUp() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="thumbs-up">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="thumbs-up">
          <path d={svgPaths.p28226ff0} id="Icon" stroke="var(--stroke-0, #676A73)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.96" />
        </g>
      </svg>
    </div>
  );
}

function RatingButton() {
  return (
    <div className="bg-[rgba(255,255,255,0)] box-border content-stretch flex gap-[4px] items-center justify-center px-[12px] py-0 relative rounded-[4px] shrink-0 size-[24px]" data-name="Rating Button">
      <ThumbsUp />
    </div>
  );
}

function ThumbsDown() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="thumbs-down">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="thumbs-down">
          <path d={svgPaths.p380a3480} id="Icon" stroke="var(--stroke-0, #676A73)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.96" />
        </g>
      </svg>
    </div>
  );
}

function RatingButton1() {
  return (
    <div className="bg-[rgba(255,255,255,0)] box-border content-stretch flex gap-[4px] items-center justify-center px-[12px] py-0 relative rounded-[4px] shrink-0 size-[24px]" data-name="Rating Button">
      <ThumbsDown />
    </div>
  );
}

function HelpCircle1() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="help-circle">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_1_9818)" id="help-circle">
          <path d={svgPaths.p30961680} id="Icon" stroke="var(--stroke-0, #676A73)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.96" />
        </g>
        <defs>
          <clipPath id="clip0_1_9818">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Button6() {
  return (
    <div className="bg-[rgba(255,255,255,0)] box-border content-stretch flex gap-[4px] items-center justify-center px-[12px] py-0 relative rounded-[4px] shrink-0 size-[24px]" data-name="Button">
      <HelpCircle1 />
    </div>
  );
}

function FeedbackInfo() {
  return (
    <div className="box-border content-stretch flex gap-[4px] items-center pl-0 pr-[2px] py-0 relative shrink-0" data-name="Feedback + Info">
      <RatingButton />
      <RatingButton1 />
      <Button6 />
    </div>
  );
}

function Message() {
  return (
    <div className="content-stretch flex flex-col gap-[6px] items-end relative shrink-0 w-full" data-name="Message">
      <AuthorTimeStamp />
      <MessageBubble />
      <FeedbackInfo />
    </div>
  );
}

function AuthorTimeStamp1() {
  return (
    <div className="box-border content-stretch flex gap-[4px] items-center pl-[4px] pr-0 py-0 relative shrink-0" data-name="Author + Time Stamp">
      <div className="relative shrink-0 size-[20px]" data-name="image">
        <img alt="" className="block max-w-none size-full" height="20" src={imgImage4} width="20" />
      </div>
      <p className="font-['DM_Sans:SemiBold',_sans-serif] font-semibold leading-[normal] relative shrink-0 text-[#a6a9b2] text-[14px] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'opsz' 14" }}>
        Floyd Miles
      </p>
      <div className="relative shrink-0 size-[2px]" data-name="Divider">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #676A73)" id="Divider" r="1" />
        </svg>
      </div>
      <p className="font-['DM_Sans:Regular',_sans-serif] font-normal leading-[normal] relative shrink-0 text-[#a6a9b2] text-[14px] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'opsz' 14" }}>
        11:30 AM
      </p>
    </div>
  );
}

function MessageBubble1() {
  return (
    <div className="bg-[#676a73] box-border content-stretch flex gap-[8px] items-center max-w-[420px] p-[12px] relative rounded-[12px] shrink-0" data-name="Message Bubble">
      <div aria-hidden="true" className="absolute border border-[rgba(189,193,201,0.15)] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <p className="basis-0 font-['DM_Sans:Regular',_sans-serif] font-normal grow leading-[normal] min-h-px min-w-px relative shrink-0 text-[16px] text-white" style={{ fontVariationSettings: "'opsz' 14" }}>
        Ok thank you
      </p>
    </div>
  );
}

function Message1() {
  return (
    <div className="content-stretch flex flex-col gap-[6px] items-start relative shrink-0 w-full" data-name="Message">
      <AuthorTimeStamp1 />
      <MessageBubble1 />
    </div>
  );
}

function DayDivider1() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full" data-name="Day Divider">
      <div className="basis-0 bg-[rgba(189,193,201,0.15)] grow h-px min-h-px min-w-px rounded-[1px] shrink-0" data-name="Divider" />
      <p className="font-['DM_Sans:SemiBold',_sans-serif] font-semibold leading-[normal] relative shrink-0 text-[#a6a9b2] text-[12px] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'opsz' 14" }}>
        Today
      </p>
      <div className="basis-0 bg-[rgba(189,193,201,0.15)] grow h-px min-h-px min-w-px rounded-[1px] shrink-0" data-name="Divider" />
    </div>
  );
}

function Logo2() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Logo">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Logo">
          <path d={svgPaths.p3f92c700} fill="url(#paint0_linear_1_9830)" id="Icon" />
        </g>
        <defs>
          <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_1_9830" x1="10" x2="10" y1="2.4" y2="17.4664">
            <stop stopColor="#1FA8ED" />
            <stop offset="0.535" stopColor="#1155C0" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

function LabelContainer16() {
  return (
    <div className="box-border content-stretch flex gap-[8px] items-center justify-center px-[2px] py-0 relative shrink-0" data-name="Label Container">
      <p className="font-['DM_Sans:Medium',_sans-serif] font-medium leading-[normal] relative shrink-0 text-[#d4e4fc] text-[14px] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'opsz' 14" }}>
        Smart template
      </p>
    </div>
  );
}

function Lozenge() {
  return (
    <div className="bg-[#013280] box-border content-stretch flex h-[20px] items-center px-[2px] py-0 relative rounded-[2px] shrink-0" data-name="Lozenge">
      <LabelContainer16 />
    </div>
  );
}

function AuthorTimeStamp2() {
  return (
    <div className="box-border content-stretch flex gap-[4px] items-center pl-0 pr-[4px] py-0 relative shrink-0" data-name="Author + Time Stamp">
      <Logo2 />
      <p className="font-['DM_Sans:SemiBold',_sans-serif] font-semibold leading-[normal] relative shrink-0 text-[#a6a9b2] text-[14px] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'opsz' 14" }}>
        HostBuddy
      </p>
      <div className="relative shrink-0 size-[2px]" data-name="Divider">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #676A73)" id="Divider" r="1" />
        </svg>
      </div>
      <p className="font-['DM_Sans:Regular',_sans-serif] font-normal leading-[normal] relative shrink-0 text-[#a6a9b2] text-[14px] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'opsz' 14" }}>
        11:30 AM
      </p>
      <Lozenge />
    </div>
  );
}

function MessageBubble2() {
  return (
    <div className="bg-[#17191f] max-w-[480px] relative rounded-[12px] shrink-0 w-full" data-name="Message Bubble">
      <div aria-hidden="true" className="absolute border border-[rgba(189,193,201,0.15)] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <div className="flex flex-row items-center max-w-inherit size-full">
        <div className="box-border content-stretch flex gap-[8px] items-center max-w-inherit p-[12px] relative w-full">
          <p className="basis-0 font-['DM_Sans:Regular',_sans-serif] font-normal grow leading-[normal] min-h-px min-w-px relative shrink-0 text-[16px] text-white" style={{ fontVariationSettings: "'opsz' 14" }}>
            Hi Floyd, we hope you were able to get settled in okay and found the parking spaces near the laundry room without any trouble. Please let us know if there is anything we can do to make your stay more comfortable!
          </p>
        </div>
      </div>
    </div>
  );
}

function ThumbsUp1() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="thumbs-up">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="thumbs-up">
          <path d={svgPaths.p33926600} id="Icon" stroke="var(--stroke-0, #676A73)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.96" />
        </g>
      </svg>
    </div>
  );
}

function RatingButton2() {
  return (
    <div className="bg-[rgba(255,255,255,0)] box-border content-stretch flex gap-[4px] items-center justify-center px-[12px] py-0 relative rounded-[4px] shrink-0 size-[24px]" data-name="Rating Button">
      <ThumbsUp1 />
    </div>
  );
}

function ThumbsDown1() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="thumbs-down">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="thumbs-down">
          <path d={svgPaths.p16aed340} id="Icon" stroke="var(--stroke-0, #676A73)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.96" />
        </g>
      </svg>
    </div>
  );
}

function RatingButton3() {
  return (
    <div className="bg-[rgba(255,255,255,0)] box-border content-stretch flex gap-[4px] items-center justify-center px-[12px] py-0 relative rounded-[4px] shrink-0 size-[24px]" data-name="Rating Button">
      <ThumbsDown1 />
    </div>
  );
}

function HelpCircle2() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="help-circle">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_1_9812)" id="help-circle">
          <path d={svgPaths.p1d4fd000} id="Icon" stroke="var(--stroke-0, #676A73)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.96" />
        </g>
        <defs>
          <clipPath id="clip0_1_9812">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Button7() {
  return (
    <div className="bg-[rgba(255,255,255,0)] box-border content-stretch flex gap-[4px] items-center justify-center px-[12px] py-0 relative rounded-[4px] shrink-0 size-[24px]" data-name="Button">
      <HelpCircle2 />
    </div>
  );
}

function FeedbackInfo1() {
  return (
    <div className="box-border content-stretch flex gap-[4px] items-center pl-0 pr-[2px] py-0 relative shrink-0" data-name="Feedback + Info">
      <RatingButton2 />
      <RatingButton3 />
      <Button7 />
    </div>
  );
}

function Message2() {
  return (
    <div className="content-stretch flex flex-col gap-[6px] items-end relative shrink-0 w-full" data-name="Message">
      <AuthorTimeStamp2 />
      <MessageBubble2 />
      <FeedbackInfo1 />
    </div>
  );
}

function AuthorTimeStamp3() {
  return (
    <div className="box-border content-stretch flex gap-[4px] items-center pl-[4px] pr-0 py-0 relative shrink-0" data-name="Author + Time Stamp">
      <div className="relative shrink-0 size-[20px]" data-name="image">
        <img alt="" className="block max-w-none size-full" height="20" src={imgImage4} width="20" />
      </div>
      <p className="font-['DM_Sans:SemiBold',_sans-serif] font-semibold leading-[normal] relative shrink-0 text-[#a6a9b2] text-[14px] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'opsz' 14" }}>
        Floyd Miles
      </p>
      <div className="relative shrink-0 size-[2px]" data-name="Divider">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #676A73)" id="Divider" r="1" />
        </svg>
      </div>
      <p className="font-['DM_Sans:Regular',_sans-serif] font-normal leading-[normal] relative shrink-0 text-[#a6a9b2] text-[14px] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'opsz' 14" }}>
        11:30 AM
      </p>
    </div>
  );
}

function MessageBubble3() {
  return (
    <div className="bg-[#676a73] max-w-[480px] relative rounded-[12px] shrink-0 w-full" data-name="Message Bubble">
      <div aria-hidden="true" className="absolute border border-[rgba(189,193,201,0.15)] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <div className="flex flex-row items-center max-w-inherit size-full">
        <div className="box-border content-stretch flex gap-[8px] items-center max-w-inherit p-[12px] relative w-full">
          <p className="basis-0 font-['DM_Sans:Regular',_sans-serif] font-normal grow leading-[normal] min-h-px min-w-px relative shrink-0 text-[16px] text-white" style={{ fontVariationSettings: "'opsz' 14" }}>
            Hello Sam we were interested in extending our stay I notice that tomorrow Saturday only is booked? Is it possible to extend through the weekend
          </p>
        </div>
      </div>
    </div>
  );
}

function Message3() {
  return (
    <div className="content-stretch flex flex-col gap-[6px] items-start relative shrink-0 w-full" data-name="Message">
      <AuthorTimeStamp3 />
      <MessageBubble3 />
    </div>
  );
}

function ChatBox() {
  return (
    <div className="absolute bg-[#0f1117] box-border content-stretch flex flex-col gap-[16px] h-[665px] items-start left-[388px] px-[12px] py-[16px] top-[126px] w-[536px]" data-name="Chat Box">
      <div aria-hidden="true" className="absolute border-[#013280] border-[0px_0px_1px_2px] border-solid inset-0 pointer-events-none" />
      <DayDivider />
      <Message />
      <Message1 />
      <DayDivider1 />
      <Message2 />
      <Message3 />
    </div>
  );
}

function BreadcrumbItem() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="_Breadcrumb Item">
      <div className="flex flex-col font-['DM_Sans:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#a6a9b2] text-[14px] text-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[normal] whitespace-pre">Messaging</p>
      </div>
    </div>
  );
}

function ChevronRight() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="chevron-right">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="chevron-right">
          <path d="M6 12L10 8L6 4" id="Icon" stroke="var(--stroke-0, #676A73)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2" />
        </g>
      </svg>
    </div>
  );
}

function BreadcrumbItem1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="_Breadcrumb Item">
      <div className="flex flex-col font-['DM_Sans:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#a6a9b2] text-[14px] text-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[normal] whitespace-pre">Inbox</p>
      </div>
    </div>
  );
}

function Breacrumbs() {
  return (
    <div className="absolute content-stretch flex gap-[2px] items-center left-[20px] top-[12px]" data-name="Breacrumbs">
      <BreadcrumbItem />
      <ChevronRight />
      <BreadcrumbItem1 />
    </div>
  );
}

export default function InboxGuest() {
  return (
    <div className="bg-[#0f1117] relative min-h-screen w-full" data-name="Inbox - Guest">
      <Header />
      <ScrollBar />
      <ChatList />
      <Details8 />
      <ChatHeader />
      <TextArea />
      <ChatBox />
      <Breacrumbs />
    </div>
  );
}