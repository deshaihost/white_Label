import svgPaths from "./svg-41t4brqhga";
import imgImageContainer from "figma:asset/2a66851d395b2599c086244ba8f57b7e66a3c300.png";
import imgImageContainer1 from "figma:asset/1bbf84eab8996cc54ff7f12ad7d0f87b02cfa7fa.png";
import imgImageContainer2 from "figma:asset/a37d273392ab7470b5d0bed7d276f17795919b78.png";
import imgImage from "figma:asset/dabdc2b916adcf0e687bab85d9e004b766807434.png";
import imgImageContainer3 from "figma:asset/90a39214c18003ee3db83cbab111db29d19ced1c.png";
import imgImage1 from "figma:asset/4efbafa1e8984736c3195367cf7acb82c6acd6d1.png";
import imgImage2 from "figma:asset/17717758d42ac6e1a27868d10c6301583b47c623.png";
import imgImage3 from "figma:asset/b998b10a2435f8dc5742738eb7c0a91ae8dbef6b.png";
import imgOverflowShadow from "figma:asset/5820ea0f992f3ea50474f95e2ba50a70f14ad516.png";

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

function Badge() {
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
      <Badge />
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
    <div className="bg-[#24262e] box-border content-stretch flex h-[20px] items-center px-[2px] py-0 relative rounded-[2px] shrink-0" data-name="Recipient Type">
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
          <rect fill="var(--fill-0, #24262E)" height="20" rx="2" width="20" />
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
      <div aria-hidden="true" className="absolute border-[#24262e] border-[0px_1px_1px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[8px] items-center px-[12px] py-[8px] relative w-full">
          <div className="min-h-[80px] min-w-[80px] relative rounded-[4px] shrink-0 size-[80px]" data-name="Image Container">
            <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-[4px] size-full" src={imgImageContainer} />
          </div>
          <Details />
          <Badges />
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

function Badge1() {
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
      <Badge1 />
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
    <div className="bg-[#24262e] box-border content-stretch flex h-[20px] items-center px-[2px] py-0 relative rounded-[2px] shrink-0" data-name="Recipient Type">
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
          <rect fill="var(--fill-0, #24262E)" height="20" rx="2" width="20" />
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
      <div aria-hidden="true" className="absolute border-[#24262e] border-[0px_1px_1px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[8px] items-center px-[12px] py-[8px] relative w-full">
          <div className="min-h-[80px] min-w-[80px] relative rounded-[4px] shrink-0 size-[80px]" data-name="Image Container">
            <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-[4px] size-full" src={imgImageContainer1} />
          </div>
          <Details1 />
          <div className="absolute bg-[#3e88f7] h-[40px] left-px rounded-br-[2px] rounded-tr-[2px] top-[calc(50%+0.5px)] translate-y-[-50%] w-[3px]" data-name="Selection Indicator" />
          <Badges1 />
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
    <div className="bg-[#24262e] box-border content-stretch flex h-[20px] items-center px-[2px] py-0 relative rounded-[2px] shrink-0" data-name="Recipient Type">
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
          <rect fill="var(--fill-0, #24262E)" height="20" rx="2" width="20" />
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
      <div aria-hidden="true" className="absolute border-[#24262e] border-[0px_1px_1px] border-solid inset-0 pointer-events-none" />
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

function Badge2() {
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
      <Badge2 />
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
    <div className="bg-[#24262e] box-border content-stretch flex h-[20px] items-center px-[2px] py-0 relative rounded-[2px] shrink-0" data-name="Recipient Type">
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
          <rect fill="var(--fill-0, #24262E)" height="20" rx="2" width="20" />
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
      <div aria-hidden="true" className="absolute border-[#24262e] border-[0px_1px_1px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[8px] items-center px-[12px] py-[8px] relative w-full">
          <div className="min-h-[80px] min-w-[80px] relative rounded-[4px] shrink-0 size-[80px]" data-name="image">
            <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-[4px] size-full" src={imgImage} />
          </div>
          <Details3 />
          <Badges2 />
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
    <div className="bg-[#24262e] box-border content-stretch flex h-[20px] items-center px-[2px] py-0 relative rounded-[2px] shrink-0" data-name="Recipient Type">
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
          <rect fill="var(--fill-0, #24262E)" height="20" rx="2" width="20" />
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
      <div aria-hidden="true" className="absolute border-[#24262e] border-[0px_1px_1px] border-solid inset-0 pointer-events-none" />
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
    <div className="bg-[#24262e] box-border content-stretch flex h-[20px] items-center px-[2px] py-0 relative rounded-[2px] shrink-0" data-name="Recipient Type">
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
          <rect fill="var(--fill-0, #24262E)" height="20" rx="2" width="20" />
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
      <div aria-hidden="true" className="absolute border-[#24262e] border-[0px_1px_1px] border-solid inset-0 pointer-events-none" />
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
    <div className="bg-[#24262e] box-border content-stretch flex h-[20px] items-center px-[2px] py-0 relative rounded-[2px] shrink-0" data-name="Recipient Type">
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
          <rect fill="var(--fill-0, #24262E)" height="20" rx="2" width="20" />
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
      <div aria-hidden="true" className="absolute border-[#24262e] border-[0px_1px_1px] border-solid inset-0 pointer-events-none" />
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
    <div className="bg-[#24262e] box-border content-stretch flex h-[20px] items-center px-[2px] py-0 relative rounded-[2px] shrink-0" data-name="Recipient Type">
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
          <rect fill="var(--fill-0, #24262E)" height="20" rx="2" width="20" />
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
      <div aria-hidden="true" className="absolute border-[#24262e] border-[0px_1px_1px] border-solid inset-0 pointer-events-none" />
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

export default function ChatList() {
  return (
    <div className="bg-[#17191f] relative rounded-bl-[4px] size-full" data-name="Chat List">
      <div className="content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] size-full">
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
      <div aria-hidden="true" className="absolute border-[#24262e] border-[0px_1px_1px] border-solid inset-0 pointer-events-none rounded-bl-[4px]" />
    </div>
  );
}