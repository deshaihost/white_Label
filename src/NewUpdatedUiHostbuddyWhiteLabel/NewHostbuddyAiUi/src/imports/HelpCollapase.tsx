import svgPaths from "./svg-o5wzovgo5c";

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

function SideNavItem() {
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

function SideNavItem1() {
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

export default function HelpCollapase() {
  return (
    <div className="content-stretch flex flex-col items-start relative size-full" data-name="Help + Collapase">
      <SideNavItem />
      <SideNavItem1 />
    </div>
  );
}