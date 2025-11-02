function Font() {
  return (
    <div className="bg-[#00446b] box-border content-stretch flex gap-[8px] h-[24px] items-center px-[6px] py-[8px] relative rounded-[4px] shrink-0" data-name="Font">
      <div aria-hidden="true" className="absolute border border-[#005586] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <p className="font-['DM_Sans:Regular',_sans-serif] font-normal leading-[normal] relative shrink-0 text-[14px] text-nowrap text-white whitespace-pre" style={{ fontVariationSettings: "'opsz' 14" }}>
        Poppins
      </p>
    </div>
  );
}

function Size() {
  return (
    <div className="bg-[#00446b] box-border content-stretch flex gap-[8px] h-[24px] items-center px-[6px] py-[8px] relative rounded-[4px] shrink-0" data-name="Size">
      <div aria-hidden="true" className="absolute border border-[#005586] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <p className="font-['DM_Sans:Regular',_sans-serif] font-normal leading-[normal] relative shrink-0 text-[14px] text-nowrap text-white whitespace-pre" style={{ fontVariationSettings: "'opsz' 14" }}>
        Font size: 40px / 2.5 rem
      </p>
    </div>
  );
}

function Weight() {
  return (
    <div className="bg-[#00446b] box-border content-stretch flex gap-[8px] h-[24px] items-center px-[6px] py-[8px] relative rounded-[4px] shrink-0" data-name="Weight">
      <div aria-hidden="true" className="absolute border border-[#005586] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <p className="font-['DM_Sans:Regular',_sans-serif] font-normal leading-[normal] relative shrink-0 text-[14px] text-nowrap text-white whitespace-pre" style={{ fontVariationSettings: "'opsz' 14" }}>
        Font weight: Bold 700
      </p>
    </div>
  );
}

function LineHeight() {
  return (
    <div className="bg-[#00446b] box-border content-stretch flex gap-[8px] h-[24px] items-center px-[6px] py-[8px] relative rounded-[4px] shrink-0" data-name="Line height">
      <div aria-hidden="true" className="absolute border border-[#005586] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <p className="font-['DM_Sans:Regular',_sans-serif] font-normal leading-[normal] relative shrink-0 text-[14px] text-nowrap text-white whitespace-pre" style={{ fontVariationSettings: "'opsz' 14" }}>
        Line height: 130%
      </p>
    </div>
  );
}

function Specs() {
  return (
    <div className="content-stretch flex gap-[8px] items-start relative shrink-0 w-full" data-name="Specs">
      <Font />
      <Size />
      <Weight />
      <LineHeight />
    </div>
  );
}

function HeadingLarge() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0" data-name="Heading Large">
      <p className="font-['Poppins:Bold',_sans-serif] leading-[1.3] not-italic relative shrink-0 text-[40px] text-white w-full">Heading Large</p>
      <Specs />
    </div>
  );
}

function Font1() {
  return (
    <div className="bg-[#00446b] box-border content-stretch flex gap-[8px] h-[24px] items-center px-[6px] py-[8px] relative rounded-[4px] shrink-0" data-name="Font">
      <div aria-hidden="true" className="absolute border border-[#005586] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <p className="font-['DM_Sans:Regular',_sans-serif] font-normal leading-[normal] relative shrink-0 text-[14px] text-nowrap text-white whitespace-pre" style={{ fontVariationSettings: "'opsz' 14" }}>
        Poppins
      </p>
    </div>
  );
}

function Size1() {
  return (
    <div className="bg-[#00446b] box-border content-stretch flex gap-[8px] h-[24px] items-center px-[6px] py-[8px] relative rounded-[4px] shrink-0" data-name="Size">
      <div aria-hidden="true" className="absolute border border-[#005586] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <p className="font-['DM_Sans:Regular',_sans-serif] font-normal leading-[normal] relative shrink-0 text-[14px] text-nowrap text-white whitespace-pre" style={{ fontVariationSettings: "'opsz' 14" }}>
        Font size: 32px / 2 rem
      </p>
    </div>
  );
}

function Weight1() {
  return (
    <div className="bg-[#00446b] box-border content-stretch flex gap-[8px] h-[24px] items-center px-[6px] py-[8px] relative rounded-[4px] shrink-0" data-name="Weight">
      <div aria-hidden="true" className="absolute border border-[#005586] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <p className="font-['DM_Sans:Regular',_sans-serif] font-normal leading-[normal] relative shrink-0 text-[14px] text-nowrap text-white whitespace-pre" style={{ fontVariationSettings: "'opsz' 14" }}>
        Font weight: Bold 700
      </p>
    </div>
  );
}

function LineHeight1() {
  return (
    <div className="bg-[#00446b] box-border content-stretch flex gap-[8px] h-[24px] items-center px-[6px] py-[8px] relative rounded-[4px] shrink-0" data-name="Line height">
      <div aria-hidden="true" className="absolute border border-[#005586] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <p className="font-['DM_Sans:Regular',_sans-serif] font-normal leading-[normal] relative shrink-0 text-[14px] text-nowrap text-white whitespace-pre" style={{ fontVariationSettings: "'opsz' 14" }}>
        Line height: 130%
      </p>
    </div>
  );
}

function Specs1() {
  return (
    <div className="content-stretch flex gap-[8px] items-start relative shrink-0 w-full" data-name="Specs">
      <Font1 />
      <Size1 />
      <Weight1 />
      <LineHeight1 />
    </div>
  );
}

function HeadingMedium() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0" data-name="Heading Medium">
      <p className="font-['Poppins:Bold',_sans-serif] leading-[1.3] not-italic relative shrink-0 text-[32px] text-white w-full">Heading Medium</p>
      <Specs1 />
    </div>
  );
}

function Font2() {
  return (
    <div className="bg-[#00446b] box-border content-stretch flex gap-[8px] h-[24px] items-center px-[6px] py-[8px] relative rounded-[4px] shrink-0" data-name="Font">
      <div aria-hidden="true" className="absolute border border-[#005586] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <p className="font-['DM_Sans:Regular',_sans-serif] font-normal leading-[normal] relative shrink-0 text-[14px] text-nowrap text-white whitespace-pre" style={{ fontVariationSettings: "'opsz' 14" }}>
        Poppins
      </p>
    </div>
  );
}

function Size2() {
  return (
    <div className="bg-[#00446b] box-border content-stretch flex gap-[8px] h-[24px] items-center px-[6px] py-[8px] relative rounded-[4px] shrink-0" data-name="Size">
      <div aria-hidden="true" className="absolute border border-[#005586] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <p className="font-['DM_Sans:Regular',_sans-serif] font-normal leading-[normal] relative shrink-0 text-[14px] text-nowrap text-white whitespace-pre" style={{ fontVariationSettings: "'opsz' 14" }}>
        Font size: 24px / 1.5 rem
      </p>
    </div>
  );
}

function Weight2() {
  return (
    <div className="bg-[#00446b] box-border content-stretch flex gap-[8px] h-[24px] items-center px-[6px] py-[8px] relative rounded-[4px] shrink-0" data-name="Weight">
      <div aria-hidden="true" className="absolute border border-[#005586] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <p className="font-['DM_Sans:Regular',_sans-serif] font-normal leading-[normal] relative shrink-0 text-[14px] text-nowrap text-white whitespace-pre" style={{ fontVariationSettings: "'opsz' 14" }}>
        Font weight: Bold 700
      </p>
    </div>
  );
}

function LineHeight2() {
  return (
    <div className="bg-[#00446b] box-border content-stretch flex gap-[8px] h-[24px] items-center px-[6px] py-[8px] relative rounded-[4px] shrink-0" data-name="Line height">
      <div aria-hidden="true" className="absolute border border-[#005586] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <p className="font-['DM_Sans:Regular',_sans-serif] font-normal leading-[normal] relative shrink-0 text-[14px] text-nowrap text-white whitespace-pre" style={{ fontVariationSettings: "'opsz' 14" }}>
        Line height: 140%
      </p>
    </div>
  );
}

function Specs2() {
  return (
    <div className="content-stretch flex gap-[8px] items-start relative shrink-0 w-full" data-name="Specs">
      <Font2 />
      <Size2 />
      <Weight2 />
      <LineHeight2 />
    </div>
  );
}

function HeadingSmall() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0" data-name="Heading Small">
      <p className="font-['Poppins:Bold',_sans-serif] leading-[1.4] not-italic relative shrink-0 text-[24px] text-white w-full">Heading Small</p>
      <Specs2 />
    </div>
  );
}

function Font3() {
  return (
    <div className="bg-[#00446b] box-border content-stretch flex gap-[8px] h-[24px] items-center px-[6px] py-[8px] relative rounded-[4px] shrink-0" data-name="Font">
      <div aria-hidden="true" className="absolute border border-[#005586] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <p className="font-['DM_Sans:Regular',_sans-serif] font-normal leading-[normal] relative shrink-0 text-[14px] text-nowrap text-white whitespace-pre" style={{ fontVariationSettings: "'opsz' 14" }}>
        Poppins
      </p>
    </div>
  );
}

function Size3() {
  return (
    <div className="bg-[#00446b] box-border content-stretch flex gap-[8px] h-[24px] items-center px-[6px] py-[8px] relative rounded-[4px] shrink-0" data-name="Size">
      <div aria-hidden="true" className="absolute border border-[#005586] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <p className="font-['DM_Sans:Regular',_sans-serif] font-normal leading-[normal] relative shrink-0 text-[14px] text-nowrap text-white whitespace-pre" style={{ fontVariationSettings: "'opsz' 14" }}>
        Font size: 18px / 1.125 rem
      </p>
    </div>
  );
}

function Weight3() {
  return (
    <div className="bg-[#00446b] box-border content-stretch flex gap-[8px] h-[24px] items-center px-[6px] py-[8px] relative rounded-[4px] shrink-0" data-name="Weight">
      <div aria-hidden="true" className="absolute border border-[#005586] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <p className="font-['DM_Sans:Regular',_sans-serif] font-normal leading-[normal] relative shrink-0 text-[14px] text-nowrap text-white whitespace-pre" style={{ fontVariationSettings: "'opsz' 14" }}>
        Font weight: Bold 700
      </p>
    </div>
  );
}

function LineHeight3() {
  return (
    <div className="bg-[#00446b] box-border content-stretch flex gap-[8px] h-[24px] items-center px-[6px] py-[8px] relative rounded-[4px] shrink-0" data-name="Line height">
      <div aria-hidden="true" className="absolute border border-[#005586] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <p className="font-['DM_Sans:Regular',_sans-serif] font-normal leading-[normal] relative shrink-0 text-[14px] text-nowrap text-white whitespace-pre" style={{ fontVariationSettings: "'opsz' 14" }}>
        Line height: 140%
      </p>
    </div>
  );
}

function Specs3() {
  return (
    <div className="content-stretch flex gap-[8px] items-start relative shrink-0 w-full" data-name="Specs">
      <Font3 />
      <Size3 />
      <Weight3 />
      <LineHeight3 />
    </div>
  );
}

function HeadingSmall1() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0" data-name="Heading Small">
      <p className="font-['Poppins:Bold',_sans-serif] leading-[1.4] not-italic relative shrink-0 text-[18px] text-white w-full">Heading XS</p>
      <Specs3 />
    </div>
  );
}

function Font4() {
  return (
    <div className="bg-[#00446b] box-border content-stretch flex gap-[8px] h-[24px] items-center px-[6px] py-[8px] relative rounded-[4px] shrink-0" data-name="Font">
      <div aria-hidden="true" className="absolute border border-[#005586] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <p className="font-['DM_Sans:Regular',_sans-serif] font-normal leading-[normal] relative shrink-0 text-[14px] text-nowrap text-white whitespace-pre" style={{ fontVariationSettings: "'opsz' 14" }}>
        Poppins
      </p>
    </div>
  );
}

function Size4() {
  return (
    <div className="bg-[#00446b] box-border content-stretch flex gap-[8px] h-[24px] items-center px-[6px] py-[8px] relative rounded-[4px] shrink-0" data-name="Size">
      <div aria-hidden="true" className="absolute border border-[#005586] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <p className="font-['DM_Sans:Regular',_sans-serif] font-normal leading-[normal] relative shrink-0 text-[14px] text-nowrap text-white whitespace-pre" style={{ fontVariationSettings: "'opsz' 14" }}>
        Font size: 14px / 0.875 rem
      </p>
    </div>
  );
}

function Weight4() {
  return (
    <div className="bg-[#00446b] box-border content-stretch flex gap-[8px] h-[24px] items-center px-[6px] py-[8px] relative rounded-[4px] shrink-0" data-name="Weight">
      <div aria-hidden="true" className="absolute border border-[#005586] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <p className="font-['DM_Sans:Regular',_sans-serif] font-normal leading-[normal] relative shrink-0 text-[14px] text-nowrap text-white whitespace-pre" style={{ fontVariationSettings: "'opsz' 14" }}>
        Font weight: Semibold 600
      </p>
    </div>
  );
}

function LineHeight4() {
  return (
    <div className="bg-[#00446b] box-border content-stretch flex gap-[8px] h-[24px] items-center px-[6px] py-[8px] relative rounded-[4px] shrink-0" data-name="Line height">
      <div aria-hidden="true" className="absolute border border-[#005586] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <p className="font-['DM_Sans:Regular',_sans-serif] font-normal leading-[normal] relative shrink-0 text-[14px] text-nowrap text-white whitespace-pre" style={{ fontVariationSettings: "'opsz' 14" }}>
        Line height: 140%
      </p>
    </div>
  );
}

function Specs4() {
  return (
    <div className="content-stretch flex gap-[8px] items-start relative shrink-0 w-full" data-name="Specs">
      <Font4 />
      <Size4 />
      <Weight4 />
      <LineHeight4 />
    </div>
  );
}

function HeadingSmall2() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0" data-name="Heading Small">
      <p className="font-['Poppins:SemiBold',_sans-serif] leading-[1.4] not-italic relative shrink-0 text-[14px] text-white w-full">Heading XXS</p>
      <Specs4 />
    </div>
  );
}

function Frame3() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full">
      <p className="font-['DM_Sans:Regular',_sans-serif] font-normal leading-[normal] relative shrink-0 text-[16px] text-nowrap text-white whitespace-pre" style={{ fontVariationSettings: "'opsz' 14" }}>
        Body Medium 400
      </p>
      <div className="relative shrink-0 size-[2px]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #505050)" id="Ellipse 2" r="1" />
        </svg>
      </div>
      <p className="font-['DM_Sans:SemiBold',_sans-serif] font-semibold leading-[normal] relative shrink-0 text-[16px] text-nowrap text-white whitespace-pre" style={{ fontVariationSettings: "'opsz' 14" }}>
        Body Medium 600
      </p>
    </div>
  );
}

function Font5() {
  return (
    <div className="bg-[#00446b] box-border content-stretch flex gap-[8px] h-[24px] items-center px-[6px] py-[8px] relative rounded-[4px] shrink-0" data-name="Font">
      <div aria-hidden="true" className="absolute border border-[#005586] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <p className="font-['DM_Sans:Regular',_sans-serif] font-normal leading-[normal] relative shrink-0 text-[14px] text-nowrap text-white whitespace-pre" style={{ fontVariationSettings: "'opsz' 14" }}>
        DM Sans
      </p>
    </div>
  );
}

function Size5() {
  return (
    <div className="bg-[#00446b] box-border content-stretch flex gap-[8px] h-[24px] items-center px-[6px] py-[8px] relative rounded-[4px] shrink-0" data-name="Size">
      <div aria-hidden="true" className="absolute border border-[#005586] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <p className="font-['DM_Sans:Regular',_sans-serif] font-normal leading-[normal] relative shrink-0 text-[14px] text-nowrap text-white whitespace-pre" style={{ fontVariationSettings: "'opsz' 14" }}>
        Font size: 16px / 1 rem
      </p>
    </div>
  );
}

function Weight5() {
  return (
    <div className="bg-[#00446b] box-border content-stretch flex gap-[8px] h-[24px] items-center px-[6px] py-[8px] relative rounded-[4px] shrink-0" data-name="Weight">
      <div aria-hidden="true" className="absolute border border-[#005586] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <p className="font-['DM_Sans:Regular',_sans-serif] font-normal leading-[normal] relative shrink-0 text-[14px] text-nowrap text-white whitespace-pre" style={{ fontVariationSettings: "'opsz' 14" }}>
        Font weight: Regular 400, Semibold 600
      </p>
    </div>
  );
}

function Specs5() {
  return (
    <div className="content-stretch flex gap-[8px] items-start relative shrink-0 w-full" data-name="Specs">
      <Font5 />
      <Size5 />
      <Weight5 />
    </div>
  );
}

function HeadingSmall3() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0" data-name="Heading Small">
      <Frame3 />
      <Specs5 />
    </div>
  );
}

function Frame4() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full">
      <p className="font-['DM_Sans:Regular',_sans-serif] font-normal leading-[normal] relative shrink-0 text-[14px] text-nowrap text-white whitespace-pre" style={{ fontVariationSettings: "'opsz' 14" }}>
        Body Small 400
      </p>
      <div className="relative shrink-0 size-[2px]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #505050)" id="Ellipse 2" r="1" />
        </svg>
      </div>
      <p className="font-['DM_Sans:Medium',_sans-serif] font-medium leading-[normal] relative shrink-0 text-[14px] text-nowrap text-white whitespace-pre" style={{ fontVariationSettings: "'opsz' 14" }}>
        Body Small 500
      </p>
      <div className="relative shrink-0 size-[2px]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #505050)" id="Ellipse 2" r="1" />
        </svg>
      </div>
      <p className="font-['DM_Sans:SemiBold',_sans-serif] font-semibold leading-[normal] relative shrink-0 text-[14px] text-nowrap text-white whitespace-pre" style={{ fontVariationSettings: "'opsz' 14" }}>
        Body Small 600
      </p>
    </div>
  );
}

function Font6() {
  return (
    <div className="bg-[#00446b] box-border content-stretch flex gap-[8px] h-[24px] items-center px-[6px] py-[8px] relative rounded-[4px] shrink-0" data-name="Font">
      <div aria-hidden="true" className="absolute border border-[#005586] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <p className="font-['DM_Sans:Regular',_sans-serif] font-normal leading-[normal] relative shrink-0 text-[14px] text-nowrap text-white whitespace-pre" style={{ fontVariationSettings: "'opsz' 14" }}>
        DM Sans
      </p>
    </div>
  );
}

function Size6() {
  return (
    <div className="bg-[#00446b] box-border content-stretch flex gap-[8px] h-[24px] items-center px-[6px] py-[8px] relative rounded-[4px] shrink-0" data-name="Size">
      <div aria-hidden="true" className="absolute border border-[#005586] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <p className="font-['DM_Sans:Regular',_sans-serif] font-normal leading-[normal] relative shrink-0 text-[14px] text-nowrap text-white whitespace-pre" style={{ fontVariationSettings: "'opsz' 14" }}>
        Font size: 14px / 0.875 rem
      </p>
    </div>
  );
}

function Weight6() {
  return (
    <div className="bg-[#00446b] box-border content-stretch flex gap-[8px] h-[24px] items-center px-[6px] py-[8px] relative rounded-[4px] shrink-0" data-name="Weight">
      <div aria-hidden="true" className="absolute border border-[#005586] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <p className="font-['DM_Sans:Regular',_sans-serif] font-normal leading-[normal] relative shrink-0 text-[14px] text-nowrap text-white whitespace-pre" style={{ fontVariationSettings: "'opsz' 14" }}>
        Font weight: Regular 400, Medium 500, Semibold 600
      </p>
    </div>
  );
}

function Specs6() {
  return (
    <div className="content-stretch flex gap-[8px] items-start relative shrink-0 w-full" data-name="Specs">
      <Font6 />
      <Size6 />
      <Weight6 />
    </div>
  );
}

function HeadingSmall4() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0" data-name="Heading Small">
      <Frame4 />
      <Specs6 />
    </div>
  );
}

function Frame5() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full">
      <p className="font-['DM_Sans:Regular',_sans-serif] font-normal leading-[normal] relative shrink-0 text-[12px] text-nowrap text-white whitespace-pre" style={{ fontVariationSettings: "'opsz' 14" }}>
        Body XS 400
      </p>
      <div className="relative shrink-0 size-[2px]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #505050)" id="Ellipse 2" r="1" />
        </svg>
      </div>
      <p className="font-['DM_Sans:SemiBold',_sans-serif] font-semibold leading-[normal] relative shrink-0 text-[12px] text-nowrap text-white whitespace-pre" style={{ fontVariationSettings: "'opsz' 14" }}>
        Body XS 600
      </p>
    </div>
  );
}

function Font7() {
  return (
    <div className="bg-[#00446b] box-border content-stretch flex gap-[8px] h-[24px] items-center px-[6px] py-[8px] relative rounded-[4px] shrink-0" data-name="Font">
      <div aria-hidden="true" className="absolute border border-[#005586] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <p className="font-['DM_Sans:Regular',_sans-serif] font-normal leading-[normal] relative shrink-0 text-[14px] text-nowrap text-white whitespace-pre" style={{ fontVariationSettings: "'opsz' 14" }}>
        DM Sans
      </p>
    </div>
  );
}

function Size7() {
  return (
    <div className="bg-[#00446b] box-border content-stretch flex gap-[8px] h-[24px] items-center px-[6px] py-[8px] relative rounded-[4px] shrink-0" data-name="Size">
      <div aria-hidden="true" className="absolute border border-[#005586] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <p className="font-['DM_Sans:Regular',_sans-serif] font-normal leading-[normal] relative shrink-0 text-[14px] text-nowrap text-white whitespace-pre" style={{ fontVariationSettings: "'opsz' 14" }}>
        Font size: 12px / 0.75 rem
      </p>
    </div>
  );
}

function Weight7() {
  return (
    <div className="bg-[#00446b] box-border content-stretch flex gap-[8px] h-[24px] items-center px-[6px] py-[8px] relative rounded-[4px] shrink-0" data-name="Weight">
      <div aria-hidden="true" className="absolute border border-[#005586] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <p className="font-['DM_Sans:Regular',_sans-serif] font-normal leading-[normal] relative shrink-0 text-[14px] text-nowrap text-white whitespace-pre" style={{ fontVariationSettings: "'opsz' 14" }}>
        Font weight: Regular 400, Semibold 600
      </p>
    </div>
  );
}

function Specs7() {
  return (
    <div className="content-stretch flex gap-[8px] items-start relative shrink-0 w-full" data-name="Specs">
      <Font7 />
      <Size7 />
      <Weight7 />
    </div>
  );
}

function HeadingSmall5() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0" data-name="Heading Small">
      <Frame5 />
      <Specs7 />
    </div>
  );
}

export default function Typography() {
  return (
    <div className="bg-neutral-900 relative rounded-[64px] size-full" data-name="Typography">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[24px] items-start p-[64px] relative size-full">
          <HeadingLarge />
          <div className="bg-[#2b2b2b] h-px rounded-[2px] shrink-0 w-full" data-name="Divider" />
          <HeadingMedium />
          <div className="bg-[#2b2b2b] h-px rounded-[2px] shrink-0 w-full" data-name="Divider" />
          <HeadingSmall />
          <div className="bg-[#2b2b2b] h-px rounded-[2px] shrink-0 w-full" data-name="Divider" />
          <HeadingSmall1 />
          <div className="bg-[#2b2b2b] h-px rounded-[2px] shrink-0 w-full" data-name="Divider" />
          <HeadingSmall2 />
          <div className="bg-[#2b2b2b] h-px rounded-[2px] shrink-0 w-full" data-name="Divider" />
          <HeadingSmall3 />
          <div className="bg-[#2b2b2b] h-px rounded-[2px] shrink-0 w-full" data-name="Divider" />
          <HeadingSmall4 />
          <div className="bg-[#2b2b2b] h-px rounded-[2px] shrink-0 w-full" data-name="Divider" />
          <HeadingSmall5 />
        </div>
      </div>
    </div>
  );
}