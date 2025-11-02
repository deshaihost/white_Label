import svgPaths from "./svg-4yzpxt3k1c";
import imgImage from "figma:asset/9905a713b23e99b8225ca433991d7d4c9ffb6301.png";

let globalFaviconUrl: string | undefined;

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

function Logo() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Logo">
      {globalFaviconUrl ? (
        <img alt="HostBuddy" className="block size-full object-contain rounded-sm" src={globalFaviconUrl} />
      ) : (
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
          <g id="Logo">
            <path d={svgPaths.p3f92c700} fill="url(#paint0_linear_46_8740)" id="Icon" />
          </g>
          <defs>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_46_8740" x1="10" x2="10" y1="2.4" y2="17.4664">
              <stop stopColor="#1FA8ED" />
              <stop offset="0.535" stopColor="#1155C0" />
            </linearGradient>
          </defs>
        </svg>
      )}
    </div>
  );
}

function AuthorTimeStamp() {
  return (
    <div className="box-border content-stretch flex gap-[4px] items-center pl-0 pr-[4px] py-0 relative shrink-0" data-name="Author + Time Stamp">
      <Logo />
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

function HelpCircle() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="help-circle">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_46_8737)" id="help-circle">
          <path d={svgPaths.p30961680} id="Icon" stroke="var(--stroke-0, #676A73)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.96" />
        </g>
        <defs>
          <clipPath id="clip0_46_8737">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Button() {
  return (
    <div className="bg-[rgba(255,255,255,0)] box-border content-stretch flex gap-[4px] items-center justify-center px-[12px] py-0 relative rounded-[4px] shrink-0 size-[24px]" data-name="Button">
      <HelpCircle />
    </div>
  );
}

function FeedbackInfo() {
  return (
    <div className="box-border content-stretch flex gap-[4px] items-center pl-0 pr-[2px] py-0 relative shrink-0" data-name="Feedback + Info">
      <RatingButton />
      <RatingButton1 />
      <Button />
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
        <img alt="" className="block max-w-none size-full" height="20" src={imgImage} width="20" />
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
    <div className="bg-[#24262e] box-border content-stretch flex gap-[8px] items-center max-w-[420px] p-[12px] relative rounded-[12px] shrink-0" data-name="Message Bubble">
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

function Logo1() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Logo">
      {globalFaviconUrl ? (
        <img alt="HostBuddy" className="block size-full object-contain rounded-sm" src={globalFaviconUrl} />
      ) : (
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
          <g id="Logo">
            <path d={svgPaths.p3f92c700} fill="url(#paint0_linear_46_8740)" id="Icon" />
          </g>
          <defs>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_46_8740" x1="10" x2="10" y1="2.4" y2="17.4664">
              <stop stopColor="#1FA8ED" />
              <stop offset="0.535" stopColor="#1155C0" />
            </linearGradient>
          </defs>
        </svg>
      )}
    </div>
  );
}

function LabelContainer() {
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
      <LabelContainer />
    </div>
  );
}

function AuthorTimeStamp2() {
  return (
    <div className="box-border content-stretch flex gap-[4px] items-center pl-0 pr-[4px] py-0 relative shrink-0" data-name="Author + Time Stamp">
      <Logo1 />
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

function HelpCircle1() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="help-circle">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_46_8722)" id="help-circle">
          <path d={svgPaths.p1d4fd000} id="Icon" stroke="var(--stroke-0, #676A73)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.96" />
        </g>
        <defs>
          <clipPath id="clip0_46_8722">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Button1() {
  return (
    <div className="bg-[rgba(255,255,255,0)] box-border content-stretch flex gap-[4px] items-center justify-center px-[12px] py-0 relative rounded-[4px] shrink-0 size-[24px]" data-name="Button">
      <HelpCircle1 />
    </div>
  );
}

function FeedbackInfo1() {
  return (
    <div className="box-border content-stretch flex gap-[4px] items-center pl-0 pr-[2px] py-0 relative shrink-0" data-name="Feedback + Info">
      <RatingButton2 />
      <RatingButton3 />
      <Button1 />
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
        <img alt="" className="block max-w-none size-full" height="20" src={imgImage} width="20" />
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
    <div className="bg-[#24262e] max-w-[480px] relative rounded-[12px] shrink-0 w-full" data-name="Message Bubble">
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

export default function ChatBox({ faviconUrl }: { faviconUrl?: string } = {}) {
  globalFaviconUrl = faviconUrl;
  
  return (
    <div className="bg-[#0f1117] relative size-full" data-name="Chat Box">
      <div aria-hidden="true" className="absolute border-[#24262e] border-[0px_0px_1px_2px] border-solid inset-0 pointer-events-none" />
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[16px] items-start px-[12px] py-[16px] relative size-full">
          <DayDivider />
          <Message />
          <Message1 />
          <DayDivider1 />
          <Message2 />
          <Message3 />
        </div>
      </div>
    </div>
  );
}