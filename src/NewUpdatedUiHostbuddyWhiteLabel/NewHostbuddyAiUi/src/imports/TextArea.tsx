import svgPaths from "./svg-298ff7zjby";

function Stars01() {
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
    <div className="bg-[rgba(255,255,255,0)] box-border content-stretch flex gap-[6px] h-[32px] items-center px-[8px] py-0 relative rounded-[4px] shrink-0" data-name="Dropdown Button">
      <Stars01 />
      <p className="font-['DM_Sans:Medium',_sans-serif] font-medium leading-[normal] relative shrink-0 text-[#d0d3db] text-[14px] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'opsz' 14" }}>
        AI response
      </p>
      <TrailingIcon />
    </div>
  );
}

function Dropdown() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0" data-name="Dropdown">
      <DropdownButton />
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

function Label() {
  return (
    <div className="box-border content-stretch flex gap-[8px] items-center justify-center px-[4px] py-0 relative shrink-0" data-name="Label">
      <p className="font-['DM_Sans:SemiBold',_sans-serif] font-semibold leading-[normal] relative shrink-0 text-[#d0d3db] text-[14px] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'opsz' 14" }}>
        Send template
      </p>
    </div>
  );
}

function Button() {
  return (
    <div className="bg-[rgba(255,255,255,0)] box-border content-stretch flex h-[32px] items-center px-[8px] py-0 relative rounded-[4px] shrink-0" data-name="Button">
      <File02 />
      <Label />
    </div>
  );
}

function AiResponseTemplates() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="AI Response + Templates">
      <Dropdown />
      <div className="bg-[rgba(189,193,201,0.15)] h-[16px] rounded-[1px] shrink-0 w-px" data-name="Divider" />
      <Button />
    </div>
  );
}

function TrailingIcon1() {
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
      <TrailingIcon1 />
    </div>
  );
}

function Icon() {
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
      <Icon />
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

export default function TextArea() {
  return (
    <div className="bg-[#17191f] relative size-full" data-name="Text Area">
      <div aria-hidden="true" className="absolute border-[#24262e] border-[0px_0px_1px_2px] border-solid inset-0 pointer-events-none" />
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[16px] items-start p-[12px] relative size-full">
          <p className="font-['DM_Sans:Medium',_sans-serif] font-medium leading-[normal] relative shrink-0 text-[#676a73] text-[16px] w-full" style={{ fontVariationSettings: "'opsz' 14" }}>
            Message...
          </p>
          <Actions />
        </div>
      </div>
    </div>
  );
}