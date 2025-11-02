import svgPaths from "./svg-pvaxh1d3p3";
import imgImageContainer from "figma:asset/f8073b535e6867061d6aef993da3805e2e289e68.png";

function Pin02() {
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
      <Pin02 />
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

function Label() {
  return (
    <div className="box-border content-stretch flex gap-[8px] items-center justify-center px-[4px] py-0 relative shrink-0" data-name="Label">
      <p className="font-['DM_Sans:SemiBold',_sans-serif] font-semibold leading-[normal] relative shrink-0 text-[#98bffa] text-[14px] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'opsz' 14" }}>
        Details
      </p>
    </div>
  );
}

function Button() {
  return (
    <div className="bg-[#01255e] box-border content-stretch flex h-[32px] items-center px-[8px] py-0 relative rounded-[4px] shrink-0" data-name="Button">
      <LayoutRight />
      <Label />
    </div>
  );
}

function NameButtons() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full" data-name="Name + Buttons">
      <div className="relative rounded-[4px] shrink-0 size-[32px]" data-name="Image Container">
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[4px]">
          <div className="absolute bg-[#bfd5cd] inset-0 rounded-[4px]" />
          <img alt="" className="absolute max-w-none object-50%-50% object-cover rounded-[4px] size-full" src={imgImageContainer} />
        </div>
      </div>
      <p className="basis-0 font-['Poppins:Bold',_sans-serif] grow leading-[1.4] min-h-px min-w-px not-italic relative shrink-0 text-[18px] text-white">Floyd Miles</p>
      <PinButton />
      <Button />
    </div>
  );
}

function LeadingIcon() {
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
      <LeadingIcon />
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
        <g clipPath="url(#clip0_46_8668)" id="whatsapp">
          <path clipRule="evenodd" d={svgPaths.p3b54ad80} fill="var(--fill-0, #A6A9B2)" fillRule="evenodd" id="Icon" />
        </g>
        <defs>
          <clipPath id="clip0_46_8668">
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

function Badge() {
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
      <Badge />
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

function Badge1() {
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
      <Badge1 />
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
      <div aria-hidden="true" className="absolute border-[#24262e] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

export default function ChatHeader() {
  return (
    <div className="bg-[#17191f] relative size-full" data-name="Chat Header">
      <div aria-hidden="true" className="absolute border-[#24262e] border-[1px_0px_1px_2px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col justify-end size-full">
        <div className="box-border content-stretch flex flex-col gap-[8px] items-start justify-end pb-0 pt-[12px] px-[12px] relative size-full">
          <NameButtons />
          <TabMenu />
        </div>
      </div>
    </div>
  );
}