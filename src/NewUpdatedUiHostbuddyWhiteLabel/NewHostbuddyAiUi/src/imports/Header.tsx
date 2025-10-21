import svgPaths from "./svg-lc0z2fau1e";

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
    <div className="bg-[#24262e] h-[32px] relative rounded-[4px] shrink-0 w-full" data-name="Input Area">
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

export default function Header() {
  return (
    <div className="bg-[#17191f] relative rounded-tl-[4px] size-full" data-name="Header">
      <div aria-hidden="true" className="absolute border-[#24262e] border-[1px_0px_1px_1px] border-solid inset-0 pointer-events-none rounded-tl-[4px]" />
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[4px] items-start p-[12px] relative size-full">
          <p className="font-['Poppins:Bold',_sans-serif] leading-[1.4] not-italic relative shrink-0 text-[24px] text-nowrap text-white whitespace-pre">Inbox</p>
          <SearchFiltersButton />
        </div>
      </div>
    </div>
  );
}