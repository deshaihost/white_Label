function TitleDescription() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[460px]" data-name="Title + Description">
      <p className="font-['Poppins:Bold',_sans-serif] leading-[1.4] not-italic relative shrink-0 text-[#373a42] text-[24px] w-full">Neutrals</p>
      <p className="font-['DM_Sans:Regular',_sans-serif] font-normal leading-[normal] relative shrink-0 text-[#535862] text-[16px] w-full" style={{ fontVariationSettings: "'opsz' 14" }}>
        Gray is a neutral color and is the foundation of the color system. Almost everything in UI design — text, form fields, backgrounds, dividers — are usually gray.
      </p>
    </div>
  );
}

function Colour() {
  return (
    <div className="bg-white h-[80px] relative shrink-0 w-full" data-name="Colour">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="box-border content-stretch flex gap-[8px] h-[80px] items-center justify-center p-[8px] relative w-full">
          <p className="font-['DM_Sans:Regular',_sans-serif] font-normal leading-[normal] relative shrink-0 text-[#0F1117] text-[14px] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'opsz' 14" }}>
            AAA 15.09:1
          </p>
        </div>
      </div>
    </div>
  );
}

function ColourSpecs() {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="Colour Specs">
      <div className="size-full">
        <div className="box-border content-stretch flex items-start justify-between leading-[normal] p-[8px] relative text-[14px] text-nowrap w-full whitespace-pre">
          <p className="font-['DM_Sans:SemiBold',_sans-serif] font-semibold relative shrink-0 text-[#4a4d54]" style={{ fontVariationSettings: "'opsz' 14" }}>
            0 White
          </p>
          <p className="font-['DM_Sans:Regular',_sans-serif] font-normal relative shrink-0 text-[#676a73]" style={{ fontVariationSettings: "'opsz' 14" }}>
            #FFFFFF
          </p>
        </div>
      </div>
    </div>
  );
}

function ColourSwatchBase() {
  return (
    <div className="bg-white relative rounded-[4px] shrink-0 w-[140px]" data-name="_Colour Swatch Base">
      <div className="content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] w-[140px]">
        <Colour />
        <ColourSpecs />
      </div>
      <div aria-hidden="true" className="absolute border border-[#e1e3e8] border-solid inset-[-1px] pointer-events-none rounded-[5px] shadow-[0px_2px_8px_-4px_rgba(0,0,0,0.2)]" />
    </div>
  );
}

function Colour1() {
  return (
    <div className="bg-[#f0f1f5] h-[80px] relative shrink-0 w-full" data-name="Colour">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="box-border content-stretch flex gap-[8px] h-[80px] items-center justify-center p-[8px] relative w-full">
          <p className="font-['DM_Sans:Regular',_sans-serif] font-normal leading-[normal] relative shrink-0 text-[#0F1117] text-[14px] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'opsz' 14" }}>
            AAA 13.37:1
          </p>
        </div>
      </div>
    </div>
  );
}

function ColourSpecs1() {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="Colour Specs">
      <div className="size-full">
        <div className="box-border content-stretch flex items-start justify-between leading-[normal] p-[8px] relative text-[14px] text-nowrap w-full whitespace-pre">
          <p className="font-['DM_Sans:SemiBold',_sans-serif] font-semibold relative shrink-0 text-[#4a4d54]" style={{ fontVariationSettings: "'opsz' 14" }}>
            50
          </p>
          <p className="font-['DM_Sans:Regular',_sans-serif] font-normal relative shrink-0 text-[#676a73]" style={{ fontVariationSettings: "'opsz' 14" }}>
            #F0F1F5
          </p>
        </div>
      </div>
    </div>
  );
}

function ColourSwatchBase1() {
  return (
    <div className="bg-white relative rounded-[4px] shrink-0 w-[140px]" data-name="_Colour Swatch Base">
      <div className="content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] w-[140px]">
        <Colour1 />
        <ColourSpecs1 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#e1e3e8] border-solid inset-[-1px] pointer-events-none rounded-[5px] shadow-[0px_2px_8px_-4px_rgba(0,0,0,0.2)]" />
    </div>
  );
}

function Colour2() {
  return (
    <div className="bg-[#e1e3e8] h-[80px] relative shrink-0 w-full" data-name="Colour">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="box-border content-stretch flex gap-[8px] h-[80px] items-center justify-center p-[8px] relative w-full">
          <p className="font-['DM_Sans:Regular',_sans-serif] font-normal leading-[normal] relative shrink-0 text-[#0F1117] text-[14px] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'opsz' 14" }}>
            AAA 11.75:1
          </p>
        </div>
      </div>
    </div>
  );
}

function ColourSpecs2() {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="Colour Specs">
      <div className="size-full">
        <div className="box-border content-stretch flex items-start justify-between leading-[normal] p-[8px] relative text-[14px] text-nowrap w-full whitespace-pre">
          <p className="font-['DM_Sans:SemiBold',_sans-serif] font-semibold relative shrink-0 text-[#4a4d54]" style={{ fontVariationSettings: "'opsz' 14" }}>
            100
          </p>
          <p className="font-['DM_Sans:Regular',_sans-serif] font-normal relative shrink-0 text-[#676a73]" style={{ fontVariationSettings: "'opsz' 14" }}>
            #E1E3E8
          </p>
        </div>
      </div>
    </div>
  );
}

function ColourSwatchBase2() {
  return (
    <div className="bg-white relative rounded-[4px] shrink-0 w-[140px]" data-name="_Colour Swatch Base">
      <div className="content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] w-[140px]">
        <Colour2 />
        <ColourSpecs2 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#e1e3e8] border-solid inset-[-1px] pointer-events-none rounded-[5px] shadow-[0px_2px_8px_-4px_rgba(0,0,0,0.2)]" />
    </div>
  );
}

function Colour3() {
  return (
    <div className="bg-[#d0d3db] h-[80px] relative shrink-0 w-full" data-name="Colour">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="box-border content-stretch flex gap-[8px] h-[80px] items-center justify-center p-[8px] relative w-full">
          <p className="font-['DM_Sans:Regular',_sans-serif] font-normal leading-[normal] relative shrink-0 text-[#0F1117] text-[14px] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'opsz' 14" }}>
            AAA 10.08:1
          </p>
        </div>
      </div>
    </div>
  );
}

function ColourSpecs3() {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="Colour Specs">
      <div className="size-full">
        <div className="box-border content-stretch flex items-start justify-between leading-[normal] p-[8px] relative text-[14px] text-nowrap w-full whitespace-pre">
          <p className="font-['DM_Sans:SemiBold',_sans-serif] font-semibold relative shrink-0 text-[#4a4d54]" style={{ fontVariationSettings: "'opsz' 14" }}>
            200
          </p>
          <p className="font-['DM_Sans:Regular',_sans-serif] font-normal relative shrink-0 text-[#676a73]" style={{ fontVariationSettings: "'opsz' 14" }}>
            #D0D3DB
          </p>
        </div>
      </div>
    </div>
  );
}

function ColourSwatchBase3() {
  return (
    <div className="bg-white relative rounded-[4px] shrink-0 w-[140px]" data-name="_Colour Swatch Base">
      <div className="content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] w-[140px]">
        <Colour3 />
        <ColourSpecs3 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#e1e3e8] border-solid inset-[-1px] pointer-events-none rounded-[5px] shadow-[0px_2px_8px_-4px_rgba(0,0,0,0.2)]" />
    </div>
  );
}

function Colour4() {
  return (
    <div className="bg-[#bdc1c9] h-[80px] relative shrink-0 w-full" data-name="Colour">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="box-border content-stretch flex gap-[8px] h-[80px] items-center justify-center p-[8px] relative w-full">
          <p className="font-['DM_Sans:Regular',_sans-serif] font-normal leading-[normal] relative shrink-0 text-[#0F1117] text-[14px] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'opsz' 14" }}>
            AAA 8.36:1
          </p>
        </div>
      </div>
    </div>
  );
}

function ColourSpecs4() {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="Colour Specs">
      <div className="size-full">
        <div className="box-border content-stretch flex items-start justify-between leading-[normal] p-[8px] relative text-[14px] text-nowrap w-full whitespace-pre">
          <p className="font-['DM_Sans:SemiBold',_sans-serif] font-semibold relative shrink-0 text-[#4a4d54]" style={{ fontVariationSettings: "'opsz' 14" }}>
            300
          </p>
          <p className="font-['DM_Sans:Regular',_sans-serif] font-normal relative shrink-0 text-[#676a73]" style={{ fontVariationSettings: "'opsz' 14" }}>
            #BDC1C9
          </p>
        </div>
      </div>
    </div>
  );
}

function ColourSwatchBase4() {
  return (
    <div className="bg-white relative rounded-[4px] shrink-0 w-[140px]" data-name="_Colour Swatch Base">
      <div className="content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] w-[140px]">
        <Colour4 />
        <ColourSpecs4 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#e1e3e8] border-solid inset-[-1px] pointer-events-none rounded-[5px] shadow-[0px_2px_8px_-4px_rgba(0,0,0,0.2)]" />
    </div>
  );
}

function Colour5() {
  return (
    <div className="bg-[#a6a9b2] h-[80px] relative shrink-0 w-full" data-name="Colour">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="box-border content-stretch flex gap-[8px] h-[80px] items-center justify-center p-[8px] relative w-full">
          <p className="font-['DM_Sans:Regular',_sans-serif] font-normal leading-[normal] relative shrink-0 text-[14px] text-nowrap text-white whitespace-pre" style={{ fontVariationSettings: "'opsz' 14" }}>
            2.35:1
          </p>
        </div>
      </div>
    </div>
  );
}

function ColourSpecs5() {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="Colour Specs">
      <div className="size-full">
        <div className="box-border content-stretch flex items-start justify-between leading-[normal] p-[8px] relative text-[14px] text-nowrap w-full whitespace-pre">
          <p className="font-['DM_Sans:SemiBold',_sans-serif] font-semibold relative shrink-0 text-[#4a4d54]" style={{ fontVariationSettings: "'opsz' 14" }}>
            400
          </p>
          <p className="font-['DM_Sans:Regular',_sans-serif] font-normal relative shrink-0 text-[#676a73]" style={{ fontVariationSettings: "'opsz' 14" }}>
            #A6A9B2
          </p>
        </div>
      </div>
    </div>
  );
}

function ColourSwatchBase5() {
  return (
    <div className="bg-white relative rounded-[4px] shrink-0 w-[140px]" data-name="_Colour Swatch Base">
      <div className="content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] w-[140px]">
        <Colour5 />
        <ColourSpecs5 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#e1e3e8] border-solid inset-[-1px] pointer-events-none rounded-[5px] shadow-[0px_2px_8px_-4px_rgba(0,0,0,0.2)]" />
    </div>
  );
}

function Colour6() {
  return (
    <div className="bg-[#8a8e98] h-[80px] relative shrink-0 w-full" data-name="Colour">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="box-border content-stretch flex gap-[8px] h-[80px] items-center justify-center p-[8px] relative w-full">
          <p className="font-['DM_Sans:Regular',_sans-serif] font-normal leading-[normal] relative shrink-0 text-[14px] text-nowrap text-white whitespace-pre" style={{ fontVariationSettings: "'opsz' 14" }}>
            3.28:1
          </p>
        </div>
      </div>
    </div>
  );
}

function ColourSpecs6() {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="Colour Specs">
      <div className="size-full">
        <div className="box-border content-stretch flex items-start justify-between leading-[normal] p-[8px] relative text-[14px] text-nowrap w-full whitespace-pre">
          <p className="font-['DM_Sans:SemiBold',_sans-serif] font-semibold relative shrink-0 text-[#4a4d54]" style={{ fontVariationSettings: "'opsz' 14" }}>
            500
          </p>
          <p className="font-['DM_Sans:Regular',_sans-serif] font-normal relative shrink-0 text-[#676a73]" style={{ fontVariationSettings: "'opsz' 14" }}>
            #8A8E98
          </p>
        </div>
      </div>
    </div>
  );
}

function ColourSwatchBase6() {
  return (
    <div className="bg-white relative rounded-[4px] shrink-0 w-[140px]" data-name="_Colour Swatch Base">
      <div className="content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] w-[140px]">
        <Colour6 />
        <ColourSpecs6 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#e1e3e8] border-solid inset-[-1px] pointer-events-none rounded-[5px] shadow-[0px_2px_8px_-4px_rgba(0,0,0,0.2)]" />
    </div>
  );
}

function Colour7() {
  return (
    <div className="bg-[#676a73] h-[80px] relative shrink-0 w-full" data-name="Colour">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="box-border content-stretch flex gap-[8px] h-[80px] items-center justify-center p-[8px] relative w-full">
          <p className="font-['DM_Sans:Regular',_sans-serif] font-normal leading-[normal] relative shrink-0 text-[14px] text-nowrap text-white whitespace-pre" style={{ fontVariationSettings: "'opsz' 14" }}>
            AA 5.40:1
          </p>
        </div>
      </div>
    </div>
  );
}

function ColourSpecs7() {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="Colour Specs">
      <div className="size-full">
        <div className="box-border content-stretch flex items-start justify-between leading-[normal] p-[8px] relative text-[14px] text-nowrap w-full whitespace-pre">
          <p className="font-['DM_Sans:SemiBold',_sans-serif] font-semibold relative shrink-0 text-[#4a4d54]" style={{ fontVariationSettings: "'opsz' 14" }}>
            600
          </p>
          <p className="font-['DM_Sans:Regular',_sans-serif] font-normal relative shrink-0 text-[#676a73]" style={{ fontVariationSettings: "'opsz' 14" }}>
            #676A73
          </p>
        </div>
      </div>
    </div>
  );
}

function ColourSwatchBase7() {
  return (
    <div className="bg-white relative rounded-[4px] shrink-0 w-[140px]" data-name="_Colour Swatch Base">
      <div className="content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] w-[140px]">
        <Colour7 />
        <ColourSpecs7 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#e1e3e8] border-solid inset-[-1px] pointer-events-none rounded-[5px] shadow-[0px_2px_8px_-4px_rgba(0,0,0,0.2)]" />
    </div>
  );
}

function Colour8() {
  return (
    <div className="bg-[#4a4d54] h-[80px] relative shrink-0 w-full" data-name="Colour">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="box-border content-stretch flex gap-[8px] h-[80px] items-center justify-center p-[8px] relative w-full">
          <p className="font-['DM_Sans:Regular',_sans-serif] font-normal leading-[normal] relative shrink-0 text-[14px] text-nowrap text-white whitespace-pre" style={{ fontVariationSettings: "'opsz' 14" }}>
            AAA 8.47:1
          </p>
        </div>
      </div>
    </div>
  );
}

function ColourSpecs8() {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="Colour Specs">
      <div className="size-full">
        <div className="box-border content-stretch flex items-start justify-between leading-[normal] p-[8px] relative text-[14px] text-nowrap w-full whitespace-pre">
          <p className="font-['DM_Sans:SemiBold',_sans-serif] font-semibold relative shrink-0 text-[#4a4d54]" style={{ fontVariationSettings: "'opsz' 14" }}>
            700
          </p>
          <p className="font-['DM_Sans:Regular',_sans-serif] font-normal relative shrink-0 text-[#676a73]" style={{ fontVariationSettings: "'opsz' 14" }}>
            #4A4D54
          </p>
        </div>
      </div>
    </div>
  );
}

function ColourSwatchBase8() {
  return (
    <div className="bg-white relative rounded-[4px] shrink-0 w-[140px]" data-name="_Colour Swatch Base">
      <div className="content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] w-[140px]">
        <Colour8 />
        <ColourSpecs8 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#e1e3e8] border-solid inset-[-1px] pointer-events-none rounded-[5px] shadow-[0px_2px_8px_-4px_rgba(0,0,0,0.2)]" />
    </div>
  );
}

function Colour9() {
  return (
    <div className="bg-[#373a42] h-[80px] relative shrink-0 w-full" data-name="Colour">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="box-border content-stretch flex gap-[8px] h-[80px] items-center justify-center p-[8px] relative w-full">
          <p className="font-['DM_Sans:Regular',_sans-serif] font-normal leading-[normal] relative shrink-0 text-[14px] text-nowrap text-white whitespace-pre" style={{ fontVariationSettings: "'opsz' 14" }}>
            AAA 11.37:1
          </p>
        </div>
      </div>
    </div>
  );
}

function ColourSpecs9() {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="Colour Specs">
      <div className="size-full">
        <div className="box-border content-stretch flex items-start justify-between leading-[normal] p-[8px] relative text-[14px] text-nowrap w-full whitespace-pre">
          <p className="font-['DM_Sans:SemiBold',_sans-serif] font-semibold relative shrink-0 text-[#4a4d54]" style={{ fontVariationSettings: "'opsz' 14" }}>
            800
          </p>
          <p className="font-['DM_Sans:Regular',_sans-serif] font-normal relative shrink-0 text-[#676a73]" style={{ fontVariationSettings: "'opsz' 14" }}>
            #373A42
          </p>
        </div>
      </div>
    </div>
  );
}

function ColourSwatchBase9() {
  return (
    <div className="bg-white relative rounded-[4px] shrink-0 w-[140px]" data-name="_Colour Swatch Base">
      <div className="content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] w-[140px]">
        <Colour9 />
        <ColourSpecs9 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#e1e3e8] border-solid inset-[-1px] pointer-events-none rounded-[5px] shadow-[0px_2px_8px_-4px_rgba(0,0,0,0.2)]" />
    </div>
  );
}

function Colour10() {
  return (
    <div className="bg-[#2b2e36] h-[80px] relative shrink-0 w-full" data-name="Colour">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="box-border content-stretch flex gap-[8px] h-[80px] items-center justify-center p-[8px] relative w-full">
          <p className="font-['DM_Sans:Regular',_sans-serif] font-normal leading-[normal] relative shrink-0 text-[14px] text-nowrap text-white whitespace-pre" style={{ fontVariationSettings: "'opsz' 14" }}>
            AAA 13.58:1
          </p>
        </div>
      </div>
    </div>
  );
}

function ColourSpecs10() {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="Colour Specs">
      <div className="size-full">
        <div className="box-border content-stretch flex items-start justify-between leading-[normal] p-[8px] relative text-[14px] text-nowrap w-full whitespace-pre">
          <p className="font-['DM_Sans:SemiBold',_sans-serif] font-semibold relative shrink-0 text-[#4a4d54]" style={{ fontVariationSettings: "'opsz' 14" }}>
            850
          </p>
          <p className="font-['DM_Sans:Regular',_sans-serif] font-normal relative shrink-0 text-[#676a73]" style={{ fontVariationSettings: "'opsz' 14" }}>
            #2B2E36
          </p>
        </div>
      </div>
    </div>
  );
}

function ColourSwatchBase10() {
  return (
    <div className="bg-white relative rounded-[4px] shrink-0 w-[140px]" data-name="_Colour Swatch Base">
      <div className="content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] w-[140px]">
        <Colour10 />
        <ColourSpecs10 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#e1e3e8] border-solid inset-[-1px] pointer-events-none rounded-[5px] shadow-[0px_2px_8px_-4px_rgba(0,0,0,0.2)]" />
    </div>
  );
}

function Colour11() {
  return (
    <div className="bg-[#676a73] h-[80px] relative shrink-0 w-full" data-name="Colour">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="box-border content-stretch flex gap-[8px] h-[80px] items-center justify-center p-[8px] relative w-full">
          <p className="font-['DM_Sans:Regular',_sans-serif] font-normal leading-[normal] relative shrink-0 text-[14px] text-nowrap text-white whitespace-pre" style={{ fontVariationSettings: "'opsz' 14" }}>
            AAA 15.09:1
          </p>
        </div>
      </div>
    </div>
  );
}

function ColourSpecs11() {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="Colour Specs">
      <div className="size-full">
        <div className="box-border content-stretch flex items-start justify-between leading-[normal] p-[8px] relative text-[14px] text-nowrap w-full whitespace-pre">
          <p className="font-['DM_Sans:SemiBold',_sans-serif] font-semibold relative shrink-0 text-[#4a4d54]" style={{ fontVariationSettings: "'opsz' 14" }}>
            900
          </p>
          <p className="font-['DM_Sans:Regular',_sans-serif] font-normal relative shrink-0 text-[#676a73]" style={{ fontVariationSettings: "'opsz' 14" }}>
            #24262E
          </p>
        </div>
      </div>
    </div>
  );
}

function ColourSwatchBase11() {
  return (
    <div className="bg-white relative rounded-[4px] shrink-0 w-[140px]" data-name="_Colour Swatch Base">
      <div className="content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] w-[140px]">
        <Colour11 />
        <ColourSpecs11 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#e1e3e8] border-solid inset-[-1px] pointer-events-none rounded-[5px] shadow-[0px_2px_8px_-4px_rgba(0,0,0,0.2)]" />
    </div>
  );
}

function Colour12() {
  return (
    <div className="bg-[#17191f] h-[80px] relative shrink-0 w-full" data-name="Colour">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="box-border content-stretch flex gap-[8px] h-[80px] items-center justify-center p-[8px] relative w-full">
          <p className="font-['DM_Sans:Regular',_sans-serif] font-normal leading-[normal] relative shrink-0 text-[14px] text-nowrap text-white whitespace-pre" style={{ fontVariationSettings: "'opsz' 14" }}>
            AAA 17.57:1
          </p>
        </div>
      </div>
    </div>
  );
}

function ColourSpecs12() {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="Colour Specs">
      <div className="size-full">
        <div className="box-border content-stretch flex items-start justify-between leading-[normal] p-[8px] relative text-[14px] text-nowrap w-full whitespace-pre">
          <p className="font-['DM_Sans:SemiBold',_sans-serif] font-semibold relative shrink-0 text-[#4a4d54]" style={{ fontVariationSettings: "'opsz' 14" }}>
            1000
          </p>
          <p className="font-['DM_Sans:Regular',_sans-serif] font-normal relative shrink-0 text-[#676a73]" style={{ fontVariationSettings: "'opsz' 14" }}>
            #17191F
          </p>
        </div>
      </div>
    </div>
  );
}

function ColourSwatchBase12() {
  return (
    <div className="bg-white relative rounded-[4px] shrink-0 w-[140px]" data-name="_Colour Swatch Base">
      <div className="content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] w-[140px]">
        <Colour12 />
        <ColourSpecs12 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#e1e3e8] border-solid inset-[-1px] pointer-events-none rounded-[5px] shadow-[0px_2px_8px_-4px_rgba(0,0,0,0.2)]" />
    </div>
  );
}

function Colour13() {
  return (
    <div className="bg-[#0f1117] h-[80px] relative shrink-0 w-full" data-name="Colour">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="box-border content-stretch flex gap-[8px] h-[80px] items-center justify-center p-[8px] relative w-full">
          <p className="font-['DM_Sans:Regular',_sans-serif] font-normal leading-[normal] relative shrink-0 text-[14px] text-nowrap text-white whitespace-pre" style={{ fontVariationSettings: "'opsz' 14" }}>
            AAA 18.87:1
          </p>
        </div>
      </div>
    </div>
  );
}

function ColourSpecs13() {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="Colour Specs">
      <div className="size-full">
        <div className="box-border content-stretch flex items-start justify-between leading-[normal] p-[8px] relative text-[14px] text-nowrap w-full whitespace-pre">
          <p className="font-['DM_Sans:SemiBold',_sans-serif] font-semibold relative shrink-0 text-[#4a4d54]" style={{ fontVariationSettings: "'opsz' 14" }}>
            1100
          </p>
          <p className="font-['DM_Sans:Regular',_sans-serif] font-normal relative shrink-0 text-[#676a73]" style={{ fontVariationSettings: "'opsz' 14" }}>
            #0F1117
          </p>
        </div>
      </div>
    </div>
  );
}

function ColourSwatchBase13() {
  return (
    <div className="bg-white relative rounded-[4px] shrink-0 w-[140px]" data-name="_Colour Swatch Base">
      <div className="content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] w-[140px]">
        <Colour13 />
        <ColourSpecs13 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#e1e3e8] border-solid inset-[-1px] pointer-events-none rounded-[5px] shadow-[0px_2px_8px_-4px_rgba(0,0,0,0.2)]" />
    </div>
  );
}

function ColourPalette() {
  return (
    <div className="content-stretch flex gap-[16px] items-center relative shrink-0" data-name="Colour Palette">
      <ColourSwatchBase />
      <ColourSwatchBase1 />
      <ColourSwatchBase2 />
      <ColourSwatchBase3 />
      <ColourSwatchBase4 />
      <ColourSwatchBase5 />
      <ColourSwatchBase6 />
      <ColourSwatchBase7 />
      <ColourSwatchBase8 />
      <ColourSwatchBase9 />
      <ColourSwatchBase10 />
      <ColourSwatchBase11 />
      <ColourSwatchBase12 />
      <ColourSwatchBase13 />
    </div>
  );
}

function Brand() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0" data-name="Brand">
      <TitleDescription />
      <ColourPalette />
    </div>
  );
}

function TitleDescription1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[460px]" data-name="Title + Description">
      <p className="font-['Poppins:Bold',_sans-serif] leading-[1.4] not-italic relative shrink-0 text-[#373a42] text-[24px] w-full">Brand</p>
      <p className="font-['DM_Sans:Regular',_sans-serif] font-normal leading-[normal] relative shrink-0 text-[#535862] text-[16px] w-full" style={{ fontVariationSettings: "'opsz' 14" }}>
        The brand color is used across all interactive elements such as buttons, links, inputs, etc. This color defines the overall feel and can elicit emotion.
      </p>
    </div>
  );
}

function Colour14() {
  return (
    <div className="bg-[#ebf3ff] h-[80px] relative shrink-0 w-full" data-name="Colour">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="box-border content-stretch flex gap-[8px] h-[80px] items-center justify-center p-[8px] relative w-full">
          <p className="font-['DM_Sans:Regular',_sans-serif] font-normal leading-[normal] relative shrink-0 text-[#013280] text-[14px] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'opsz' 14" }}>
            AAA 10.62:1
          </p>
        </div>
      </div>
    </div>
  );
}

function ColourSpecs14() {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="Colour Specs">
      <div className="size-full">
        <div className="box-border content-stretch flex items-start justify-between leading-[normal] p-[8px] relative text-[14px] text-nowrap w-full whitespace-pre">
          <p className="font-['DM_Sans:SemiBold',_sans-serif] font-semibold relative shrink-0 text-[#4a4d54]" style={{ fontVariationSettings: "'opsz' 14" }}>
            50
          </p>
          <p className="font-['DM_Sans:Regular',_sans-serif] font-normal relative shrink-0 text-[#676a73]" style={{ fontVariationSettings: "'opsz' 14" }}>
            #EBF3FF
          </p>
        </div>
      </div>
    </div>
  );
}

function ColourSwatchBase14() {
  return (
    <div className="bg-white relative rounded-[4px] shrink-0 w-[140px]" data-name="_Colour Swatch Base">
      <div className="content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] w-[140px]">
        <Colour14 />
        <ColourSpecs14 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#e1e3e8] border-solid inset-[-1px] pointer-events-none rounded-[5px] shadow-[0px_2px_8px_-4px_rgba(0,0,0,0.2)]" />
    </div>
  );
}

function Colour15() {
  return (
    <div className="bg-[#d4e4fc] h-[80px] relative shrink-0 w-full" data-name="Colour">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="box-border content-stretch flex gap-[8px] h-[80px] items-center justify-center p-[8px] relative w-full">
          <p className="font-['DM_Sans:Regular',_sans-serif] font-normal leading-[normal] relative shrink-0 text-[#013280] text-[14px] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'opsz' 14" }}>
            AAA 9.21:1
          </p>
        </div>
      </div>
    </div>
  );
}

function ColourSpecs15() {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="Colour Specs">
      <div className="size-full">
        <div className="box-border content-stretch flex items-start justify-between leading-[normal] p-[8px] relative text-[14px] text-nowrap w-full whitespace-pre">
          <p className="font-['DM_Sans:SemiBold',_sans-serif] font-semibold relative shrink-0 text-[#4a4d54]" style={{ fontVariationSettings: "'opsz' 14" }}>
            100
          </p>
          <p className="font-['DM_Sans:Regular',_sans-serif] font-normal relative shrink-0 text-[#676a73]" style={{ fontVariationSettings: "'opsz' 14" }}>
            #D4E4FC
          </p>
        </div>
      </div>
    </div>
  );
}

function ColourSwatchBase15() {
  return (
    <div className="bg-white relative rounded-[4px] shrink-0 w-[140px]" data-name="_Colour Swatch Base">
      <div className="content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] w-[140px]">
        <Colour15 />
        <ColourSpecs15 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#e1e3e8] border-solid inset-[-1px] pointer-events-none rounded-[5px] shadow-[0px_2px_8px_-4px_rgba(0,0,0,0.2)]" />
    </div>
  );
}

function Colour16() {
  return (
    <div className="bg-[#b4d0fa] h-[80px] relative shrink-0 w-full" data-name="Colour">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="box-border content-stretch flex gap-[8px] h-[80px] items-center justify-center p-[8px] relative w-full">
          <p className="font-['DM_Sans:Regular',_sans-serif] font-normal leading-[normal] relative shrink-0 text-[#013280] text-[14px] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'opsz' 14" }}>
            AAA 7.54:1
          </p>
        </div>
      </div>
    </div>
  );
}

function ColourSpecs16() {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="Colour Specs">
      <div className="size-full">
        <div className="box-border content-stretch flex items-start justify-between leading-[normal] p-[8px] relative text-[14px] text-nowrap w-full whitespace-pre">
          <p className="font-['DM_Sans:SemiBold',_sans-serif] font-semibold relative shrink-0 text-[#4a4d54]" style={{ fontVariationSettings: "'opsz' 14" }}>
            200
          </p>
          <p className="font-['DM_Sans:Regular',_sans-serif] font-normal relative shrink-0 text-[#676a73]" style={{ fontVariationSettings: "'opsz' 14" }}>
            #B4D0FA
          </p>
        </div>
      </div>
    </div>
  );
}

function ColourSwatchBase16() {
  return (
    <div className="bg-white relative rounded-[4px] shrink-0 w-[140px]" data-name="_Colour Swatch Base">
      <div className="content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] w-[140px]">
        <Colour16 />
        <ColourSpecs16 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#e1e3e8] border-solid inset-[-1px] pointer-events-none rounded-[5px] shadow-[0px_2px_8px_-4px_rgba(0,0,0,0.2)]" />
    </div>
  );
}

function Colour17() {
  return (
    <div className="bg-[#98bffa] h-[80px] relative shrink-0 w-full" data-name="Colour">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="box-border content-stretch flex gap-[8px] h-[80px] items-center justify-center p-[8px] relative w-full">
          <p className="font-['DM_Sans:Regular',_sans-serif] font-normal leading-[normal] relative shrink-0 text-[#013280] text-[14px] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'opsz' 14" }}>
            AA 6.31:1
          </p>
        </div>
      </div>
    </div>
  );
}

function ColourSpecs17() {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="Colour Specs">
      <div className="size-full">
        <div className="box-border content-stretch flex items-start justify-between leading-[normal] p-[8px] relative text-[14px] text-nowrap w-full whitespace-pre">
          <p className="font-['DM_Sans:SemiBold',_sans-serif] font-semibold relative shrink-0 text-[#4a4d54]" style={{ fontVariationSettings: "'opsz' 14" }}>
            300
          </p>
          <p className="font-['DM_Sans:Regular',_sans-serif] font-normal relative shrink-0 text-[#676a73]" style={{ fontVariationSettings: "'opsz' 14" }}>
            #98BFFA
          </p>
        </div>
      </div>
    </div>
  );
}

function ColourSwatchBase17() {
  return (
    <div className="bg-white relative rounded-[4px] shrink-0 w-[140px]" data-name="_Colour Swatch Base">
      <div className="content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] w-[140px]">
        <Colour17 />
        <ColourSpecs17 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#e1e3e8] border-solid inset-[-1px] pointer-events-none rounded-[5px] shadow-[0px_2px_8px_-4px_rgba(0,0,0,0.2)]" />
    </div>
  );
}

function Colour18() {
  return (
    <div className="bg-[#74a9f7] h-[80px] relative shrink-0 w-full" data-name="Colour">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="box-border content-stretch flex gap-[8px] h-[80px] items-center justify-center p-[8px] relative w-full">
          <p className="font-['DM_Sans:Regular',_sans-serif] font-normal leading-[normal] relative shrink-0 text-[#013280] text-[14px] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'opsz' 14" }}>
            AA 4.95:1
          </p>
        </div>
      </div>
    </div>
  );
}

function ColourSpecs18() {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="Colour Specs">
      <div className="size-full">
        <div className="box-border content-stretch flex items-start justify-between leading-[normal] p-[8px] relative text-[14px] text-nowrap w-full whitespace-pre">
          <p className="font-['DM_Sans:SemiBold',_sans-serif] font-semibold relative shrink-0 text-[#4a4d54]" style={{ fontVariationSettings: "'opsz' 14" }}>
            400
          </p>
          <p className="font-['DM_Sans:Regular',_sans-serif] font-normal relative shrink-0 text-[#676a73]" style={{ fontVariationSettings: "'opsz' 14" }}>
            #74A9F7
          </p>
        </div>
      </div>
    </div>
  );
}

function ColourSwatchBase18() {
  return (
    <div className="bg-white relative rounded-[4px] shrink-0 w-[140px]" data-name="_Colour Swatch Base">
      <div className="content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] w-[140px]">
        <Colour18 />
        <ColourSpecs18 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#e1e3e8] border-solid inset-[-1px] pointer-events-none rounded-[5px] shadow-[0px_2px_8px_-4px_rgba(0,0,0,0.2)]" />
    </div>
  );
}

function Colour19() {
  return (
    <div className="bg-[#3e88f7] h-[80px] relative shrink-0 w-full" data-name="Colour">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="box-border content-stretch flex gap-[8px] h-[80px] items-center justify-center p-[8px] relative w-full">
          <p className="font-['DM_Sans:Regular',_sans-serif] font-normal leading-[normal] relative shrink-0 text-[14px] text-nowrap text-white whitespace-pre" style={{ fontVariationSettings: "'opsz' 14" }}>
            3.46:1
          </p>
        </div>
      </div>
    </div>
  );
}

function ColourSpecs19() {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="Colour Specs">
      <div className="size-full">
        <div className="box-border content-stretch flex items-start justify-between leading-[normal] p-[8px] relative text-[14px] text-nowrap w-full whitespace-pre">
          <p className="font-['DM_Sans:SemiBold',_sans-serif] font-semibold relative shrink-0 text-[#4a4d54]" style={{ fontVariationSettings: "'opsz' 14" }}>
            500
          </p>
          <p className="font-['DM_Sans:Regular',_sans-serif] font-normal relative shrink-0 text-[#676a73]" style={{ fontVariationSettings: "'opsz' 14" }}>
            #3E88F7
          </p>
        </div>
      </div>
    </div>
  );
}

function ColourSwatchBase19() {
  return (
    <div className="bg-white relative rounded-[4px] shrink-0 w-[140px]" data-name="_Colour Swatch Base">
      <div className="content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] w-[140px]">
        <Colour19 />
        <ColourSpecs19 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#e1e3e8] border-solid inset-[-1px] pointer-events-none rounded-[5px] shadow-[0px_2px_8px_-4px_rgba(0,0,0,0.2)]" />
    </div>
  );
}

function Colour20() {
  return (
    <div className="bg-[#146ef5] h-[80px] relative shrink-0 w-full" data-name="Colour">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="box-border content-stretch flex gap-[8px] h-[80px] items-center justify-center p-[8px] relative w-full">
          <p className="font-['DM_Sans:Regular',_sans-serif] font-normal leading-[normal] relative shrink-0 text-[14px] text-nowrap text-white whitespace-pre" style={{ fontVariationSettings: "'opsz' 14" }}>
            AA 4.59:1
          </p>
        </div>
      </div>
    </div>
  );
}

function ColourSpecs20() {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="Colour Specs">
      <div className="size-full">
        <div className="box-border content-stretch flex items-start justify-between leading-[normal] p-[8px] relative text-[14px] text-nowrap w-full whitespace-pre">
          <p className="font-['DM_Sans:SemiBold',_sans-serif] font-semibold relative shrink-0 text-[#4a4d54]" style={{ fontVariationSettings: "'opsz' 14" }}>
            600 Base
          </p>
          <p className="font-['DM_Sans:Regular',_sans-serif] font-normal relative shrink-0 text-[#676a73]" style={{ fontVariationSettings: "'opsz' 14" }}>
            #146EF5
          </p>
        </div>
      </div>
    </div>
  );
}

function ColourSwatchBase20() {
  return (
    <div className="bg-white relative rounded-[4px] shrink-0 w-[140px]" data-name="_Colour Swatch Base">
      <div className="content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] w-[140px]">
        <Colour20 />
        <ColourSpecs20 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#e1e3e8] border-solid inset-[-1px] pointer-events-none rounded-[5px] shadow-[0px_2px_8px_-4px_rgba(0,0,0,0.2)]" />
    </div>
  );
}

function Colour21() {
  return (
    <div className="bg-[#0b5fde] h-[80px] relative shrink-0 w-full" data-name="Colour">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="box-border content-stretch flex gap-[8px] h-[80px] items-center justify-center p-[8px] relative w-full">
          <p className="font-['DM_Sans:Regular',_sans-serif] font-normal leading-[normal] relative shrink-0 text-[14px] text-nowrap text-white whitespace-pre" style={{ fontVariationSettings: "'opsz' 14" }}>
            AA 5.67:1
          </p>
        </div>
      </div>
    </div>
  );
}

function ColourSpecs21() {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="Colour Specs">
      <div className="size-full">
        <div className="box-border content-stretch flex items-start justify-between leading-[normal] p-[8px] relative text-[14px] text-nowrap w-full whitespace-pre">
          <p className="font-['DM_Sans:SemiBold',_sans-serif] font-semibold relative shrink-0 text-[#4a4d54]" style={{ fontVariationSettings: "'opsz' 14" }}>
            700
          </p>
          <p className="font-['DM_Sans:Regular',_sans-serif] font-normal relative shrink-0 text-[#676a73]" style={{ fontVariationSettings: "'opsz' 14" }}>
            #0B5FDE
          </p>
        </div>
      </div>
    </div>
  );
}

function ColourSwatchBase21() {
  return (
    <div className="bg-white relative rounded-[4px] shrink-0 w-[140px]" data-name="_Colour Swatch Base">
      <div className="content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] w-[140px]">
        <Colour21 />
        <ColourSpecs21 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#e1e3e8] border-solid inset-[-1px] pointer-events-none rounded-[5px] shadow-[0px_2px_8px_-4px_rgba(0,0,0,0.2)]" />
    </div>
  );
}

function Colour22() {
  return (
    <div className="bg-[#054cb5] h-[80px] relative shrink-0 w-full" data-name="Colour">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="box-border content-stretch flex gap-[8px] h-[80px] items-center justify-center p-[8px] relative w-full">
          <p className="font-['DM_Sans:Regular',_sans-serif] font-normal leading-[normal] relative shrink-0 text-[14px] text-nowrap text-white whitespace-pre" style={{ fontVariationSettings: "'opsz' 14" }}>
            AAA 7.76:1
          </p>
        </div>
      </div>
    </div>
  );
}

function ColourSpecs22() {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="Colour Specs">
      <div className="size-full">
        <div className="box-border content-stretch flex items-start justify-between leading-[normal] p-[8px] relative text-[14px] text-nowrap w-full whitespace-pre">
          <p className="font-['DM_Sans:SemiBold',_sans-serif] font-semibold relative shrink-0 text-[#4a4d54]" style={{ fontVariationSettings: "'opsz' 14" }}>
            800
          </p>
          <p className="font-['DM_Sans:Regular',_sans-serif] font-normal relative shrink-0 text-[#676a73]" style={{ fontVariationSettings: "'opsz' 14" }}>
            #054CB5
          </p>
        </div>
      </div>
    </div>
  );
}

function ColourSwatchBase22() {
  return (
    <div className="bg-white relative rounded-[4px] shrink-0 w-[140px]" data-name="_Colour Swatch Base">
      <div className="content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] w-[140px]">
        <Colour22 />
        <ColourSpecs22 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#e1e3e8] border-solid inset-[-1px] pointer-events-none rounded-[5px] shadow-[0px_2px_8px_-4px_rgba(0,0,0,0.2)]" />
    </div>
  );
}

function Colour23() {
  return (
    <div className="bg-[#013280] h-[80px] relative shrink-0 w-full" data-name="Colour">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="box-border content-stretch flex gap-[8px] h-[80px] items-center justify-center p-[8px] relative w-full">
          <p className="font-['DM_Sans:Regular',_sans-serif] font-normal leading-[normal] relative shrink-0 text-[14px] text-nowrap text-white whitespace-pre" style={{ fontVariationSettings: "'opsz' 14" }}>
            AAA 11.87:1
          </p>
        </div>
      </div>
    </div>
  );
}

function ColourSpecs23() {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="Colour Specs">
      <div className="size-full">
        <div className="box-border content-stretch flex items-start justify-between leading-[normal] p-[8px] relative text-[14px] text-nowrap w-full whitespace-pre">
          <p className="font-['DM_Sans:SemiBold',_sans-serif] font-semibold relative shrink-0 text-[#4a4d54]" style={{ fontVariationSettings: "'opsz' 14" }}>
            900
          </p>
          <p className="font-['DM_Sans:Regular',_sans-serif] font-normal relative shrink-0 text-[#676a73]" style={{ fontVariationSettings: "'opsz' 14" }}>
            #013280
          </p>
        </div>
      </div>
    </div>
  );
}

function ColourSwatchBase23() {
  return (
    <div className="bg-white relative rounded-[4px] shrink-0 w-[140px]" data-name="_Colour Swatch Base">
      <div className="content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] w-[140px]">
        <Colour23 />
        <ColourSpecs23 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#e1e3e8] border-solid inset-[-1px] pointer-events-none rounded-[5px] shadow-[0px_2px_8px_-4px_rgba(0,0,0,0.2)]" />
    </div>
  );
}

function Colour24() {
  return (
    <div className="bg-[#01255e] h-[80px] relative shrink-0 w-full" data-name="Colour">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="box-border content-stretch flex gap-[8px] h-[80px] items-center justify-center p-[8px] relative w-full">
          <p className="font-['DM_Sans:Regular',_sans-serif] font-normal leading-[normal] relative shrink-0 text-[14px] text-nowrap text-white whitespace-pre" style={{ fontVariationSettings: "'opsz' 14" }}>
            AAA 14.71:1
          </p>
        </div>
      </div>
    </div>
  );
}

function ColourSpecs24() {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="Colour Specs">
      <div className="size-full">
        <div className="box-border content-stretch flex items-start justify-between leading-[normal] p-[8px] relative text-[14px] text-nowrap w-full whitespace-pre">
          <p className="font-['DM_Sans:SemiBold',_sans-serif] font-semibold relative shrink-0 text-[#4a4d54]" style={{ fontVariationSettings: "'opsz' 14" }}>
            1000
          </p>
          <p className="font-['DM_Sans:Regular',_sans-serif] font-normal relative shrink-0 text-[#676a73]" style={{ fontVariationSettings: "'opsz' 14" }}>
            #01255E
          </p>
        </div>
      </div>
    </div>
  );
}

function ColourSwatchBase24() {
  return (
    <div className="bg-white relative rounded-[4px] shrink-0 w-[140px]" data-name="_Colour Swatch Base">
      <div className="content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] w-[140px]">
        <Colour24 />
        <ColourSpecs24 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#e1e3e8] border-solid inset-[-1px] pointer-events-none rounded-[5px] shadow-[0px_2px_8px_-4px_rgba(0,0,0,0.2)]" />
    </div>
  );
}

function Colour25() {
  return (
    <div className="bg-[#001330] h-[80px] relative shrink-0 w-full" data-name="Colour">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="box-border content-stretch flex gap-[8px] h-[80px] items-center justify-center p-[8px] relative w-full">
          <p className="font-['DM_Sans:Regular',_sans-serif] font-normal leading-[normal] relative shrink-0 text-[14px] text-nowrap text-white whitespace-pre" style={{ fontVariationSettings: "'opsz' 14" }}>
            AAA 18.49:1
          </p>
        </div>
      </div>
    </div>
  );
}

function ColourSpecs25() {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="Colour Specs">
      <div className="size-full">
        <div className="box-border content-stretch flex items-start justify-between leading-[normal] p-[8px] relative text-[14px] text-nowrap w-full whitespace-pre">
          <p className="font-['DM_Sans:SemiBold',_sans-serif] font-semibold relative shrink-0 text-[#4a4d54]" style={{ fontVariationSettings: "'opsz' 14" }}>
            1100
          </p>
          <p className="font-['DM_Sans:Regular',_sans-serif] font-normal relative shrink-0 text-[#676a73]" style={{ fontVariationSettings: "'opsz' 14" }}>
            #001330
          </p>
        </div>
      </div>
    </div>
  );
}

function ColourSwatchBase25() {
  return (
    <div className="bg-white relative rounded-[4px] shrink-0 w-[140px]" data-name="_Colour Swatch Base">
      <div className="content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] w-[140px]">
        <Colour25 />
        <ColourSpecs25 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#e1e3e8] border-solid inset-[-1px] pointer-events-none rounded-[5px] shadow-[0px_2px_8px_-4px_rgba(0,0,0,0.2)]" />
    </div>
  );
}

function ColourPalette1() {
  return (
    <div className="content-stretch flex gap-[16px] items-center relative shrink-0" data-name="Colour Palette">
      <ColourSwatchBase14 />
      <ColourSwatchBase15 />
      <ColourSwatchBase16 />
      <ColourSwatchBase17 />
      <ColourSwatchBase18 />
      <ColourSwatchBase19 />
      <ColourSwatchBase20 />
      <ColourSwatchBase21 />
      <ColourSwatchBase22 />
      <ColourSwatchBase23 />
      <ColourSwatchBase24 />
      <ColourSwatchBase25 />
    </div>
  );
}

function Brand1() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0" data-name="Brand">
      <TitleDescription1 />
      <ColourPalette1 />
    </div>
  );
}

function TitleDescription2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[460px]" data-name="Title + Description">
      <p className="font-['Poppins:Bold',_sans-serif] leading-[1.4] not-italic relative shrink-0 text-[#373a42] text-[24px] w-full">Green</p>
      <p className="font-['DM_Sans:Regular',_sans-serif] font-normal leading-[normal] relative shrink-0 text-[#535862] text-[16px] w-full" style={{ fontVariationSettings: "'opsz' 14" }}>
        Success colors communicate a positive action, positive trend, or a successful confirmation.
      </p>
    </div>
  );
}

function Colour26() {
  return (
    <div className="bg-[#e9fae8] h-[80px] relative shrink-0 w-full" data-name="Colour">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="box-border content-stretch flex gap-[8px] h-[80px] items-center justify-center p-[8px] relative w-full">
          <p className="font-['DM_Sans:Regular',_sans-serif] font-normal leading-[normal] relative shrink-0 text-[#024700] text-[14px] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'opsz' 14" }}>
            AAA 10.14:1
          </p>
        </div>
      </div>
    </div>
  );
}

function ColourSpecs26() {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="Colour Specs">
      <div className="size-full">
        <div className="box-border content-stretch flex items-start justify-between leading-[normal] p-[8px] relative text-[14px] text-nowrap w-full whitespace-pre">
          <p className="font-['DM_Sans:SemiBold',_sans-serif] font-semibold relative shrink-0 text-[#4a4d54]" style={{ fontVariationSettings: "'opsz' 14" }}>
            50
          </p>
          <p className="font-['DM_Sans:Regular',_sans-serif] font-normal relative shrink-0 text-[#676a73]" style={{ fontVariationSettings: "'opsz' 14" }}>
            #E9FAE8
          </p>
        </div>
      </div>
    </div>
  );
}

function ColourSwatchBase26() {
  return (
    <div className="bg-white relative rounded-[4px] shrink-0 w-[140px]" data-name="_Colour Swatch Base">
      <div className="content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] w-[140px]">
        <Colour26 />
        <ColourSpecs26 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#e1e3e8] border-solid inset-[-1px] pointer-events-none rounded-[5px] shadow-[0px_2px_8px_-4px_rgba(0,0,0,0.2)]" />
    </div>
  );
}

function Colour27() {
  return (
    <div className="bg-[#d6f5d5] h-[80px] relative shrink-0 w-full" data-name="Colour">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="box-border content-stretch flex gap-[8px] h-[80px] items-center justify-center p-[8px] relative w-full">
          <p className="font-['DM_Sans:Regular',_sans-serif] font-normal leading-[normal] relative shrink-0 text-[#024700] text-[14px] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'opsz' 14" }}>
            AAA 9.31:1
          </p>
        </div>
      </div>
    </div>
  );
}

function ColourSpecs27() {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="Colour Specs">
      <div className="size-full">
        <div className="box-border content-stretch flex items-start justify-between leading-[normal] p-[8px] relative text-[14px] text-nowrap w-full whitespace-pre">
          <p className="font-['DM_Sans:SemiBold',_sans-serif] font-semibold relative shrink-0 text-[#4a4d54]" style={{ fontVariationSettings: "'opsz' 14" }}>
            100
          </p>
          <p className="font-['DM_Sans:Regular',_sans-serif] font-normal relative shrink-0 text-[#676a73]" style={{ fontVariationSettings: "'opsz' 14" }}>
            #D6F5D5
          </p>
        </div>
      </div>
    </div>
  );
}

function ColourSwatchBase27() {
  return (
    <div className="bg-white relative rounded-[4px] shrink-0 w-[140px]" data-name="_Colour Swatch Base">
      <div className="content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] w-[140px]">
        <Colour27 />
        <ColourSpecs27 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#e1e3e8] border-solid inset-[-1px] pointer-events-none rounded-[5px] shadow-[0px_2px_8px_-4px_rgba(0,0,0,0.2)]" />
    </div>
  );
}

function Colour28() {
  return (
    <div className="bg-[#98f097] h-[80px] relative shrink-0 w-full" data-name="Colour">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="box-border content-stretch flex gap-[8px] h-[80px] items-center justify-center p-[8px] relative w-full">
          <p className="font-['DM_Sans:Regular',_sans-serif] font-normal leading-[normal] relative shrink-0 text-[#024700] text-[14px] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'opsz' 14" }}>
            AAA 8.01:1
          </p>
        </div>
      </div>
    </div>
  );
}

function ColourSpecs28() {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="Colour Specs">
      <div className="size-full">
        <div className="box-border content-stretch flex items-start justify-between leading-[normal] p-[8px] relative text-[14px] text-nowrap w-full whitespace-pre">
          <p className="font-['DM_Sans:SemiBold',_sans-serif] font-semibold relative shrink-0 text-[#4a4d54]" style={{ fontVariationSettings: "'opsz' 14" }}>
            200
          </p>
          <p className="font-['DM_Sans:Regular',_sans-serif] font-normal relative shrink-0 text-[#676a73]" style={{ fontVariationSettings: "'opsz' 14" }}>
            #98F097
          </p>
        </div>
      </div>
    </div>
  );
}

function ColourSwatchBase28() {
  return (
    <div className="bg-white relative rounded-[4px] shrink-0 w-[140px]" data-name="_Colour Swatch Base">
      <div className="content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] w-[140px]">
        <Colour28 />
        <ColourSpecs28 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#e1e3e8] border-solid inset-[-1px] pointer-events-none rounded-[5px] shadow-[0px_2px_8px_-4px_rgba(0,0,0,0.2)]" />
    </div>
  );
}

function Colour29() {
  return (
    <div className="bg-[#6cf069] h-[80px] relative shrink-0 w-full" data-name="Colour">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="box-border content-stretch flex gap-[8px] h-[80px] items-center justify-center p-[8px] relative w-full">
          <p className="font-['DM_Sans:Regular',_sans-serif] font-normal leading-[normal] relative shrink-0 text-[#024700] text-[14px] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'opsz' 14" }}>
            AAA 7.51:1
          </p>
        </div>
      </div>
    </div>
  );
}

function ColourSpecs29() {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="Colour Specs">
      <div className="size-full">
        <div className="box-border content-stretch flex items-start justify-between leading-[normal] p-[8px] relative text-[14px] text-nowrap w-full whitespace-pre">
          <p className="font-['DM_Sans:SemiBold',_sans-serif] font-semibold relative shrink-0 text-[#4a4d54]" style={{ fontVariationSettings: "'opsz' 14" }}>
            300
          </p>
          <p className="font-['DM_Sans:Regular',_sans-serif] font-normal relative shrink-0 text-[#676a73]" style={{ fontVariationSettings: "'opsz' 14" }}>
            #6CF069
          </p>
        </div>
      </div>
    </div>
  );
}

function ColourSwatchBase29() {
  return (
    <div className="bg-white relative rounded-[4px] shrink-0 w-[140px]" data-name="_Colour Swatch Base">
      <div className="content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] w-[140px]">
        <Colour29 />
        <ColourSpecs29 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#e1e3e8] border-solid inset-[-1px] pointer-events-none rounded-[5px] shadow-[0px_2px_8px_-4px_rgba(0,0,0,0.2)]" />
    </div>
  );
}

function Colour30() {
  return (
    <div className="bg-[#31e52e] h-[80px] relative shrink-0 w-full" data-name="Colour">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="box-border content-stretch flex gap-[8px] h-[80px] items-center justify-center p-[8px] relative w-full">
          <p className="font-['DM_Sans:Regular',_sans-serif] font-normal leading-[normal] relative shrink-0 text-[#024700] text-[14px] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'opsz' 14" }}>
            AA 6.50:1
          </p>
        </div>
      </div>
    </div>
  );
}

function ColourSpecs30() {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="Colour Specs">
      <div className="size-full">
        <div className="box-border content-stretch flex items-start justify-between leading-[normal] p-[8px] relative text-[14px] text-nowrap w-full whitespace-pre">
          <p className="font-['DM_Sans:SemiBold',_sans-serif] font-semibold relative shrink-0 text-[#4a4d54]" style={{ fontVariationSettings: "'opsz' 14" }}>
            400
          </p>
          <p className="font-['DM_Sans:Regular',_sans-serif] font-normal relative shrink-0 text-[#676a73]" style={{ fontVariationSettings: "'opsz' 14" }}>
            #31E52E
          </p>
        </div>
      </div>
    </div>
  );
}

function ColourSwatchBase30() {
  return (
    <div className="bg-white relative rounded-[4px] shrink-0 w-[140px]" data-name="_Colour Swatch Base">
      <div className="content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] w-[140px]">
        <Colour30 />
        <ColourSpecs30 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#e1e3e8] border-solid inset-[-1px] pointer-events-none rounded-[5px] shadow-[0px_2px_8px_-4px_rgba(0,0,0,0.2)]" />
    </div>
  );
}

function Colour31() {
  return (
    <div className="bg-[#0ed609] h-[80px] relative shrink-0 w-full" data-name="Colour">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="box-border content-stretch flex gap-[8px] h-[80px] items-center justify-center p-[8px] relative w-full">
          <p className="font-['DM_Sans:Regular',_sans-serif] font-normal leading-[normal] relative shrink-0 text-[14px] text-nowrap text-white whitespace-pre" style={{ fontVariationSettings: "'opsz' 14" }}>
            3.46:1
          </p>
        </div>
      </div>
    </div>
  );
}

function ColourSpecs31() {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="Colour Specs">
      <div className="size-full">
        <div className="box-border content-stretch flex items-start justify-between leading-[normal] p-[8px] relative text-[14px] text-nowrap w-full whitespace-pre">
          <p className="font-['DM_Sans:SemiBold',_sans-serif] font-semibold relative shrink-0 text-[#4a4d54]" style={{ fontVariationSettings: "'opsz' 14" }}>
            500
          </p>
          <p className="font-['DM_Sans:Regular',_sans-serif] font-normal relative shrink-0 text-[#676a73]" style={{ fontVariationSettings: "'opsz' 14" }}>
            #0ED609
          </p>
        </div>
      </div>
    </div>
  );
}

function ColourSwatchBase31() {
  return (
    <div className="bg-white relative rounded-[4px] shrink-0 w-[140px]" data-name="_Colour Swatch Base">
      <div className="content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] w-[140px]">
        <Colour31 />
        <ColourSpecs31 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#e1e3e8] border-solid inset-[-1px] pointer-events-none rounded-[5px] shadow-[0px_2px_8px_-4px_rgba(0,0,0,0.2)]" />
    </div>
  );
}

function Colour32() {
  return (
    <div className="bg-[#0ab205] h-[80px] relative shrink-0 w-full" data-name="Colour">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="box-border content-stretch flex gap-[8px] h-[80px] items-center justify-center p-[8px] relative w-full">
          <p className="font-['DM_Sans:Regular',_sans-serif] font-normal leading-[normal] relative shrink-0 text-[14px] text-nowrap text-white whitespace-pre" style={{ fontVariationSettings: "'opsz' 14" }}>
            2.84:1
          </p>
        </div>
      </div>
    </div>
  );
}

function ColourSpecs32() {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="Colour Specs">
      <div className="size-full">
        <div className="box-border content-stretch flex items-start justify-between leading-[normal] p-[8px] relative text-[14px] text-nowrap w-full whitespace-pre">
          <p className="font-['DM_Sans:SemiBold',_sans-serif] font-semibold relative shrink-0 text-[#4a4d54]" style={{ fontVariationSettings: "'opsz' 14" }}>
            600
          </p>
          <p className="font-['DM_Sans:Regular',_sans-serif] font-normal relative shrink-0 text-[#676a73]" style={{ fontVariationSettings: "'opsz' 14" }}>
            #0AB205
          </p>
        </div>
      </div>
    </div>
  );
}

function ColourSwatchBase32() {
  return (
    <div className="bg-white relative rounded-[4px] shrink-0 w-[140px]" data-name="_Colour Swatch Base">
      <div className="content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] w-[140px]">
        <Colour32 />
        <ColourSpecs32 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#e1e3e8] border-solid inset-[-1px] pointer-events-none rounded-[5px] shadow-[0px_2px_8px_-4px_rgba(0,0,0,0.2)]" />
    </div>
  );
}

function Colour33() {
  return (
    <div className="bg-[#068f03] h-[80px] relative shrink-0 w-full" data-name="Colour">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="box-border content-stretch flex gap-[8px] h-[80px] items-center justify-center p-[8px] relative w-full">
          <p className="font-['DM_Sans:Regular',_sans-serif] font-normal leading-[normal] relative shrink-0 text-[14px] text-nowrap text-white whitespace-pre" style={{ fontVariationSettings: "'opsz' 14" }}>
            4.25:1
          </p>
        </div>
      </div>
    </div>
  );
}

function ColourSpecs33() {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="Colour Specs">
      <div className="size-full">
        <div className="box-border content-stretch flex items-start justify-between leading-[normal] p-[8px] relative text-[14px] text-nowrap w-full whitespace-pre">
          <p className="font-['DM_Sans:SemiBold',_sans-serif] font-semibold relative shrink-0 text-[#4a4d54]" style={{ fontVariationSettings: "'opsz' 14" }}>
            700
          </p>
          <p className="font-['DM_Sans:Regular',_sans-serif] font-normal relative shrink-0 text-[#676a73]" style={{ fontVariationSettings: "'opsz' 14" }}>
            #068F03
          </p>
        </div>
      </div>
    </div>
  );
}

function ColourSwatchBase33() {
  return (
    <div className="bg-white relative rounded-[4px] shrink-0 w-[140px]" data-name="_Colour Swatch Base">
      <div className="content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] w-[140px]">
        <Colour33 />
        <ColourSpecs33 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#e1e3e8] border-solid inset-[-1px] pointer-events-none rounded-[5px] shadow-[0px_2px_8px_-4px_rgba(0,0,0,0.2)]" />
    </div>
  );
}

function Colour34() {
  return (
    <div className="bg-[#056e02] h-[80px] relative shrink-0 w-full" data-name="Colour">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="box-border content-stretch flex gap-[8px] h-[80px] items-center justify-center p-[8px] relative w-full">
          <p className="font-['DM_Sans:Regular',_sans-serif] font-normal leading-[normal] relative shrink-0 text-[14px] text-nowrap text-white whitespace-pre" style={{ fontVariationSettings: "'opsz' 14" }}>
            AA 6.49:1
          </p>
        </div>
      </div>
    </div>
  );
}

function ColourSpecs34() {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="Colour Specs">
      <div className="size-full">
        <div className="box-border content-stretch flex items-start justify-between leading-[normal] p-[8px] relative text-[14px] text-nowrap w-full whitespace-pre">
          <p className="font-['DM_Sans:SemiBold',_sans-serif] font-semibold relative shrink-0 text-[#4a4d54]" style={{ fontVariationSettings: "'opsz' 14" }}>
            800
          </p>
          <p className="font-['DM_Sans:Regular',_sans-serif] font-normal relative shrink-0 text-[#676a73]" style={{ fontVariationSettings: "'opsz' 14" }}>
            #056E02
          </p>
        </div>
      </div>
    </div>
  );
}

function ColourSwatchBase34() {
  return (
    <div className="bg-white relative rounded-[4px] shrink-0 w-[140px]" data-name="_Colour Swatch Base">
      <div className="content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] w-[140px]">
        <Colour34 />
        <ColourSpecs34 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#e1e3e8] border-solid inset-[-1px] pointer-events-none rounded-[5px] shadow-[0px_2px_8px_-4px_rgba(0,0,0,0.2)]" />
    </div>
  );
}

function Colour35() {
  return (
    <div className="bg-[#024700] h-[80px] relative shrink-0 w-full" data-name="Colour">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="box-border content-stretch flex gap-[8px] h-[80px] items-center justify-center p-[8px] relative w-full">
          <p className="font-['DM_Sans:Regular',_sans-serif] font-normal leading-[normal] relative shrink-0 text-[14px] text-nowrap text-white whitespace-pre" style={{ fontVariationSettings: "'opsz' 14" }}>
            AAA 11.03:1
          </p>
        </div>
      </div>
    </div>
  );
}

function ColourSpecs35() {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="Colour Specs">
      <div className="size-full">
        <div className="box-border content-stretch flex items-start justify-between leading-[normal] p-[8px] relative text-[14px] text-nowrap w-full whitespace-pre">
          <p className="font-['DM_Sans:SemiBold',_sans-serif] font-semibold relative shrink-0 text-[#4a4d54]" style={{ fontVariationSettings: "'opsz' 14" }}>
            900
          </p>
          <p className="font-['DM_Sans:Regular',_sans-serif] font-normal relative shrink-0 text-[#676a73]" style={{ fontVariationSettings: "'opsz' 14" }}>
            #024700
          </p>
        </div>
      </div>
    </div>
  );
}

function ColourSwatchBase35() {
  return (
    <div className="bg-white relative rounded-[4px] shrink-0 w-[140px]" data-name="_Colour Swatch Base">
      <div className="content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] w-[140px]">
        <Colour35 />
        <ColourSpecs35 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#e1e3e8] border-solid inset-[-1px] pointer-events-none rounded-[5px] shadow-[0px_2px_8px_-4px_rgba(0,0,0,0.2)]" />
    </div>
  );
}

function Colour36() {
  return (
    <div className="bg-[#013000] h-[80px] relative shrink-0 w-full" data-name="Colour">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="box-border content-stretch flex gap-[8px] h-[80px] items-center justify-center p-[8px] relative w-full">
          <p className="font-['DM_Sans:Regular',_sans-serif] font-normal leading-[normal] relative shrink-0 text-[14px] text-nowrap text-white whitespace-pre" style={{ fontVariationSettings: "'opsz' 14" }}>
            AAA 14.75:1
          </p>
        </div>
      </div>
    </div>
  );
}

function ColourSpecs36() {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="Colour Specs">
      <div className="size-full">
        <div className="box-border content-stretch flex items-start justify-between leading-[normal] p-[8px] relative text-[14px] text-nowrap w-full whitespace-pre">
          <p className="font-['DM_Sans:SemiBold',_sans-serif] font-semibold relative shrink-0 text-[#4a4d54]" style={{ fontVariationSettings: "'opsz' 14" }}>
            1000
          </p>
          <p className="font-['DM_Sans:Regular',_sans-serif] font-normal relative shrink-0 text-[#676a73]" style={{ fontVariationSettings: "'opsz' 14" }}>
            #013000
          </p>
        </div>
      </div>
    </div>
  );
}

function ColourSwatchBase36() {
  return (
    <div className="bg-white relative rounded-[4px] shrink-0 w-[140px]" data-name="_Colour Swatch Base">
      <div className="content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] w-[140px]">
        <Colour36 />
        <ColourSpecs36 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#e1e3e8] border-solid inset-[-1px] pointer-events-none rounded-[5px] shadow-[0px_2px_8px_-4px_rgba(0,0,0,0.2)]" />
    </div>
  );
}

function Colour37() {
  return (
    <div className="bg-[#011a00] h-[80px] relative shrink-0 w-full" data-name="Colour">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="box-border content-stretch flex gap-[8px] h-[80px] items-center justify-center p-[8px] relative w-full">
          <p className="font-['DM_Sans:Regular',_sans-serif] font-normal leading-[normal] relative shrink-0 text-[14px] text-nowrap text-white whitespace-pre" style={{ fontVariationSettings: "'opsz' 14" }}>
            AAA 18.28:1
          </p>
        </div>
      </div>
    </div>
  );
}

function ColourSpecs37() {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="Colour Specs">
      <div className="size-full">
        <div className="box-border content-stretch flex items-start justify-between leading-[normal] p-[8px] relative text-[14px] text-nowrap w-full whitespace-pre">
          <p className="font-['DM_Sans:SemiBold',_sans-serif] font-semibold relative shrink-0 text-[#4a4d54]" style={{ fontVariationSettings: "'opsz' 14" }}>
            1100
          </p>
          <p className="font-['DM_Sans:Regular',_sans-serif] font-normal relative shrink-0 text-[#676a73]" style={{ fontVariationSettings: "'opsz' 14" }}>
            #011A00
          </p>
        </div>
      </div>
    </div>
  );
}

function ColourSwatchBase37() {
  return (
    <div className="bg-white relative rounded-[4px] shrink-0 w-[140px]" data-name="_Colour Swatch Base">
      <div className="content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] w-[140px]">
        <Colour37 />
        <ColourSpecs37 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#e1e3e8] border-solid inset-[-1px] pointer-events-none rounded-[5px] shadow-[0px_2px_8px_-4px_rgba(0,0,0,0.2)]" />
    </div>
  );
}

function ColourPalette2() {
  return (
    <div className="content-stretch flex gap-[16px] items-center relative shrink-0" data-name="Colour Palette">
      <ColourSwatchBase26 />
      <ColourSwatchBase27 />
      <ColourSwatchBase28 />
      <ColourSwatchBase29 />
      <ColourSwatchBase30 />
      <ColourSwatchBase31 />
      <ColourSwatchBase32 />
      <ColourSwatchBase33 />
      <ColourSwatchBase34 />
      <ColourSwatchBase35 />
      <ColourSwatchBase36 />
      <ColourSwatchBase37 />
    </div>
  );
}

function Brand2() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0" data-name="Brand">
      <TitleDescription2 />
      <ColourPalette2 />
    </div>
  );
}

function TitleDescription3() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[460px]" data-name="Title + Description">
      <p className="font-['Poppins:Bold',_sans-serif] leading-[1.4] not-italic relative shrink-0 text-[#373a42] text-[24px] w-full">Orange</p>
      <p className="font-['DM_Sans:Regular',_sans-serif] font-normal leading-[normal] relative shrink-0 text-[#535862] text-[16px] w-full" style={{ fontVariationSettings: "'opsz' 14" }}>{`Warning colors can communicate that an action is potentially destructive or "on-hold". These colors are commonly used in confirmations to grab the users' attention.`}</p>
    </div>
  );
}

function Colour38() {
  return (
    <div className="bg-[#fff1e5] h-[80px] relative shrink-0 w-full" data-name="Colour">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="box-border content-stretch flex gap-[8px] h-[80px] items-center justify-center p-[8px] relative w-full">
          <p className="font-['DM_Sans:Regular',_sans-serif] font-normal leading-[normal] relative shrink-0 text-[#4d2100] text-[14px] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'opsz' 14" }}>
            AAA 12.37:1
          </p>
        </div>
      </div>
    </div>
  );
}

function ColourSpecs38() {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="Colour Specs">
      <div className="size-full">
        <div className="box-border content-stretch flex items-start justify-between leading-[normal] p-[8px] relative text-[14px] text-nowrap w-full whitespace-pre">
          <p className="font-['DM_Sans:SemiBold',_sans-serif] font-semibold relative shrink-0 text-[#4a4d54]" style={{ fontVariationSettings: "'opsz' 14" }}>
            50
          </p>
          <p className="font-['DM_Sans:Regular',_sans-serif] font-normal relative shrink-0 text-[#676a73]" style={{ fontVariationSettings: "'opsz' 14" }}>
            #FFF1E5
          </p>
        </div>
      </div>
    </div>
  );
}

function ColourSwatchBase38() {
  return (
    <div className="bg-white relative rounded-[4px] shrink-0 w-[140px]" data-name="_Colour Swatch Base">
      <div className="content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] w-[140px]">
        <Colour38 />
        <ColourSpecs38 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#e1e3e8] border-solid inset-[-1px] pointer-events-none rounded-[5px] shadow-[0px_2px_8px_-4px_rgba(0,0,0,0.2)]" />
    </div>
  );
}

function Colour39() {
  return (
    <div className="bg-[#ffe2c9] h-[80px] relative shrink-0 w-full" data-name="Colour">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="box-border content-stretch flex gap-[8px] h-[80px] items-center justify-center p-[8px] relative w-full">
          <p className="font-['DM_Sans:Regular',_sans-serif] font-normal leading-[normal] relative shrink-0 text-[#4d2100] text-[14px] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'opsz' 14" }}>
            AAA 11.07:1
          </p>
        </div>
      </div>
    </div>
  );
}

function ColourSpecs39() {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="Colour Specs">
      <div className="size-full">
        <div className="box-border content-stretch flex items-start justify-between leading-[normal] p-[8px] relative text-[14px] text-nowrap w-full whitespace-pre">
          <p className="font-['DM_Sans:SemiBold',_sans-serif] font-semibold relative shrink-0 text-[#4a4d54]" style={{ fontVariationSettings: "'opsz' 14" }}>
            100
          </p>
          <p className="font-['DM_Sans:Regular',_sans-serif] font-normal relative shrink-0 text-[#676a73]" style={{ fontVariationSettings: "'opsz' 14" }}>
            #FFE2C9
          </p>
        </div>
      </div>
    </div>
  );
}

function ColourSwatchBase39() {
  return (
    <div className="bg-white relative rounded-[4px] shrink-0 w-[140px]" data-name="_Colour Swatch Base">
      <div className="content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] w-[140px]">
        <Colour39 />
        <ColourSpecs39 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#e1e3e8] border-solid inset-[-1px] pointer-events-none rounded-[5px] shadow-[0px_2px_8px_-4px_rgba(0,0,0,0.2)]" />
    </div>
  );
}

function Colour40() {
  return (
    <div className="bg-[#fcbe8b] h-[80px] relative shrink-0 w-full" data-name="Colour">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="box-border content-stretch flex gap-[8px] h-[80px] items-center justify-center p-[8px] relative w-full">
          <p className="font-['DM_Sans:Regular',_sans-serif] font-normal leading-[normal] relative shrink-0 text-[#4d2100] text-[14px] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'opsz' 14" }}>
            AAA 8.40:1
          </p>
        </div>
      </div>
    </div>
  );
}

function ColourSpecs40() {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="Colour Specs">
      <div className="size-full">
        <div className="box-border content-stretch flex items-start justify-between leading-[normal] p-[8px] relative text-[14px] text-nowrap w-full whitespace-pre">
          <p className="font-['DM_Sans:SemiBold',_sans-serif] font-semibold relative shrink-0 text-[#4a4d54]" style={{ fontVariationSettings: "'opsz' 14" }}>
            200
          </p>
          <p className="font-['DM_Sans:Regular',_sans-serif] font-normal relative shrink-0 text-[#676a73]" style={{ fontVariationSettings: "'opsz' 14" }}>
            #FCBE8B
          </p>
        </div>
      </div>
    </div>
  );
}

function ColourSwatchBase40() {
  return (
    <div className="bg-white relative rounded-[4px] shrink-0 w-[140px]" data-name="_Colour Swatch Base">
      <div className="content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] w-[140px]">
        <Colour40 />
        <ColourSpecs40 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#e1e3e8] border-solid inset-[-1px] pointer-events-none rounded-[5px] shadow-[0px_2px_8px_-4px_rgba(0,0,0,0.2)]" />
    </div>
  );
}

function Colour41() {
  return (
    <div className="bg-[#faa764] h-[80px] relative shrink-0 w-full" data-name="Colour">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="box-border content-stretch flex gap-[8px] h-[80px] items-center justify-center p-[8px] relative w-full">
          <p className="font-['DM_Sans:Regular',_sans-serif] font-normal leading-[normal] relative shrink-0 text-[#4d2100] text-[14px] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'opsz' 14" }}>
            AAA 7.03:1
          </p>
        </div>
      </div>
    </div>
  );
}

function ColourSpecs41() {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="Colour Specs">
      <div className="size-full">
        <div className="box-border content-stretch flex items-start justify-between leading-[normal] p-[8px] relative text-[14px] text-nowrap w-full whitespace-pre">
          <p className="font-['DM_Sans:SemiBold',_sans-serif] font-semibold relative shrink-0 text-[#4a4d54]" style={{ fontVariationSettings: "'opsz' 14" }}>
            300
          </p>
          <p className="font-['DM_Sans:Regular',_sans-serif] font-normal relative shrink-0 text-[#676a73]" style={{ fontVariationSettings: "'opsz' 14" }}>
            #FAA764
          </p>
        </div>
      </div>
    </div>
  );
}

function ColourSwatchBase41() {
  return (
    <div className="bg-white relative rounded-[4px] shrink-0 w-[140px]" data-name="_Colour Swatch Base">
      <div className="content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] w-[140px]">
        <Colour41 />
        <ColourSpecs41 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#e1e3e8] border-solid inset-[-1px] pointer-events-none rounded-[5px] shadow-[0px_2px_8px_-4px_rgba(0,0,0,0.2)]" />
    </div>
  );
}

function Colour42() {
  return (
    <div className="bg-[#f7903b] h-[80px] relative shrink-0 w-full" data-name="Colour">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="box-border content-stretch flex gap-[8px] h-[80px] items-center justify-center p-[8px] relative w-full">
          <p className="font-['DM_Sans:Regular',_sans-serif] font-normal leading-[normal] relative shrink-0 text-[#4d2100] text-[14px] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'opsz' 14" }}>
            AA 5.88:1
          </p>
        </div>
      </div>
    </div>
  );
}

function ColourSpecs42() {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="Colour Specs">
      <div className="size-full">
        <div className="box-border content-stretch flex items-start justify-between leading-[normal] p-[8px] relative text-[14px] text-nowrap w-full whitespace-pre">
          <p className="font-['DM_Sans:SemiBold',_sans-serif] font-semibold relative shrink-0 text-[#4a4d54]" style={{ fontVariationSettings: "'opsz' 14" }}>
            400
          </p>
          <p className="font-['DM_Sans:Regular',_sans-serif] font-normal relative shrink-0 text-[#676a73]" style={{ fontVariationSettings: "'opsz' 14" }}>
            #F7903B
          </p>
        </div>
      </div>
    </div>
  );
}

function ColourSwatchBase42() {
  return (
    <div className="bg-white relative rounded-[4px] shrink-0 w-[140px]" data-name="_Colour Swatch Base">
      <div className="content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] w-[140px]">
        <Colour42 />
        <ColourSpecs42 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#e1e3e8] border-solid inset-[-1px] pointer-events-none rounded-[5px] shadow-[0px_2px_8px_-4px_rgba(0,0,0,0.2)]" />
    </div>
  );
}

function Colour43() {
  return (
    <div className="bg-[#f26c0c] h-[80px] relative shrink-0 w-full" data-name="Colour">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="box-border content-stretch flex gap-[8px] h-[80px] items-center justify-center p-[8px] relative w-full">
          <p className="font-['DM_Sans:Regular',_sans-serif] font-normal leading-[normal] relative shrink-0 text-[14px] text-nowrap text-white whitespace-pre" style={{ fontVariationSettings: "'opsz' 14" }}>
            3.03:1
          </p>
        </div>
      </div>
    </div>
  );
}

function ColourSpecs43() {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="Colour Specs">
      <div className="size-full">
        <div className="box-border content-stretch flex items-start justify-between leading-[normal] p-[8px] relative text-[14px] text-nowrap w-full whitespace-pre">
          <p className="font-['DM_Sans:SemiBold',_sans-serif] font-semibold relative shrink-0 text-[#4a4d54]" style={{ fontVariationSettings: "'opsz' 14" }}>
            500
          </p>
          <p className="font-['DM_Sans:Regular',_sans-serif] font-normal relative shrink-0 text-[#676a73]" style={{ fontVariationSettings: "'opsz' 14" }}>
            #F26C0C
          </p>
        </div>
      </div>
    </div>
  );
}

function ColourSwatchBase43() {
  return (
    <div className="bg-white relative rounded-[4px] shrink-0 w-[140px]" data-name="_Colour Swatch Base">
      <div className="content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] w-[140px]">
        <Colour43 />
        <ColourSpecs43 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#e1e3e8] border-solid inset-[-1px] pointer-events-none rounded-[5px] shadow-[0px_2px_8px_-4px_rgba(0,0,0,0.2)]" />
    </div>
  );
}

function Colour44() {
  return (
    <div className="bg-[#cc5b04] h-[80px] relative shrink-0 w-full" data-name="Colour">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="box-border content-stretch flex gap-[8px] h-[80px] items-center justify-center p-[8px] relative w-full">
          <p className="font-['DM_Sans:Regular',_sans-serif] font-normal leading-[normal] relative shrink-0 text-[14px] text-nowrap text-white whitespace-pre" style={{ fontVariationSettings: "'opsz' 14" }}>
            4.15:1
          </p>
        </div>
      </div>
    </div>
  );
}

function ColourSpecs44() {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="Colour Specs">
      <div className="size-full">
        <div className="box-border content-stretch flex items-start justify-between leading-[normal] p-[8px] relative text-[14px] text-nowrap w-full whitespace-pre">
          <p className="font-['DM_Sans:SemiBold',_sans-serif] font-semibold relative shrink-0 text-[#4a4d54]" style={{ fontVariationSettings: "'opsz' 14" }}>
            600
          </p>
          <p className="font-['DM_Sans:Regular',_sans-serif] font-normal relative shrink-0 text-[#676a73]" style={{ fontVariationSettings: "'opsz' 14" }}>
            #CC5B04
          </p>
        </div>
      </div>
    </div>
  );
}

function ColourSwatchBase44() {
  return (
    <div className="bg-white relative rounded-[4px] shrink-0 w-[140px]" data-name="_Colour Swatch Base">
      <div className="content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] w-[140px]">
        <Colour44 />
        <ColourSpecs44 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#e1e3e8] border-solid inset-[-1px] pointer-events-none rounded-[5px] shadow-[0px_2px_8px_-4px_rgba(0,0,0,0.2)]" />
    </div>
  );
}

function Colour45() {
  return (
    <div className="bg-[#a34903] h-[80px] relative shrink-0 w-full" data-name="Colour">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="box-border content-stretch flex gap-[8px] h-[80px] items-center justify-center p-[8px] relative w-full">
          <p className="font-['DM_Sans:Regular',_sans-serif] font-normal leading-[normal] relative shrink-0 text-[14px] text-nowrap text-white whitespace-pre" style={{ fontVariationSettings: "'opsz' 14" }}>
            AA 5.98:1
          </p>
        </div>
      </div>
    </div>
  );
}

function ColourSpecs45() {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="Colour Specs">
      <div className="size-full">
        <div className="box-border content-stretch flex items-start justify-between leading-[normal] p-[8px] relative text-[14px] text-nowrap w-full whitespace-pre">
          <p className="font-['DM_Sans:SemiBold',_sans-serif] font-semibold relative shrink-0 text-[#4a4d54]" style={{ fontVariationSettings: "'opsz' 14" }}>
            700
          </p>
          <p className="font-['DM_Sans:Regular',_sans-serif] font-normal relative shrink-0 text-[#676a73]" style={{ fontVariationSettings: "'opsz' 14" }}>
            #A34903
          </p>
        </div>
      </div>
    </div>
  );
}

function ColourSwatchBase45() {
  return (
    <div className="bg-white relative rounded-[4px] shrink-0 w-[140px]" data-name="_Colour Swatch Base">
      <div className="content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] w-[140px]">
        <Colour45 />
        <ColourSpecs45 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#e1e3e8] border-solid inset-[-1px] pointer-events-none rounded-[5px] shadow-[0px_2px_8px_-4px_rgba(0,0,0,0.2)]" />
    </div>
  );
}

function Colour46() {
  return (
    <div className="bg-[#7a3601] h-[80px] relative shrink-0 w-full" data-name="Colour">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="box-border content-stretch flex gap-[8px] h-[80px] items-center justify-center p-[8px] relative w-full">
          <p className="font-['DM_Sans:Regular',_sans-serif] font-normal leading-[normal] relative shrink-0 text-[14px] text-nowrap text-white whitespace-pre" style={{ fontVariationSettings: "'opsz' 14" }}>
            AAA 8.91:1
          </p>
        </div>
      </div>
    </div>
  );
}

function ColourSpecs46() {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="Colour Specs">
      <div className="size-full">
        <div className="box-border content-stretch flex items-start justify-between leading-[normal] p-[8px] relative text-[14px] text-nowrap w-full whitespace-pre">
          <p className="font-['DM_Sans:SemiBold',_sans-serif] font-semibold relative shrink-0 text-[#4a4d54]" style={{ fontVariationSettings: "'opsz' 14" }}>
            800
          </p>
          <p className="font-['DM_Sans:Regular',_sans-serif] font-normal relative shrink-0 text-[#676a73]" style={{ fontVariationSettings: "'opsz' 14" }}>
            #7A3601
          </p>
        </div>
      </div>
    </div>
  );
}

function ColourSwatchBase46() {
  return (
    <div className="bg-white relative rounded-[4px] shrink-0 w-[140px]" data-name="_Colour Swatch Base">
      <div className="content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] w-[140px]">
        <Colour46 />
        <ColourSpecs46 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#e1e3e8] border-solid inset-[-1px] pointer-events-none rounded-[5px] shadow-[0px_2px_8px_-4px_rgba(0,0,0,0.2)]" />
    </div>
  );
}

function Colour47() {
  return (
    <div className="bg-[#4d2100] h-[80px] relative shrink-0 w-full" data-name="Colour">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="box-border content-stretch flex gap-[8px] h-[80px] items-center justify-center p-[8px] relative w-full">
          <p className="font-['DM_Sans:Regular',_sans-serif] font-normal leading-[normal] relative shrink-0 text-[14px] text-nowrap text-white whitespace-pre" style={{ fontVariationSettings: "'opsz' 14" }}>
            AAA 13.70:1
          </p>
        </div>
      </div>
    </div>
  );
}

function ColourSpecs47() {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="Colour Specs">
      <div className="size-full">
        <div className="box-border content-stretch flex items-start justify-between leading-[normal] p-[8px] relative text-[14px] text-nowrap w-full whitespace-pre">
          <p className="font-['DM_Sans:SemiBold',_sans-serif] font-semibold relative shrink-0 text-[#4a4d54]" style={{ fontVariationSettings: "'opsz' 14" }}>
            900
          </p>
          <p className="font-['DM_Sans:Regular',_sans-serif] font-normal relative shrink-0 text-[#676a73]" style={{ fontVariationSettings: "'opsz' 14" }}>
            #4D2100
          </p>
        </div>
      </div>
    </div>
  );
}

function ColourSwatchBase47() {
  return (
    <div className="bg-white relative rounded-[4px] shrink-0 w-[140px]" data-name="_Colour Swatch Base">
      <div className="content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] w-[140px]">
        <Colour47 />
        <ColourSpecs47 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#e1e3e8] border-solid inset-[-1px] pointer-events-none rounded-[5px] shadow-[0px_2px_8px_-4px_rgba(0,0,0,0.2)]" />
    </div>
  );
}

function Colour48() {
  return (
    <div className="bg-[#3b1900] h-[80px] relative shrink-0 w-full" data-name="Colour">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="box-border content-stretch flex gap-[8px] h-[80px] items-center justify-center p-[8px] relative w-full">
          <p className="font-['DM_Sans:Regular',_sans-serif] font-normal leading-[normal] relative shrink-0 text-[14px] text-nowrap text-white whitespace-pre" style={{ fontVariationSettings: "'opsz' 14" }}>
            AAA 15.85:1
          </p>
        </div>
      </div>
    </div>
  );
}

function ColourSpecs48() {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="Colour Specs">
      <div className="size-full">
        <div className="box-border content-stretch flex items-start justify-between leading-[normal] p-[8px] relative text-[14px] text-nowrap w-full whitespace-pre">
          <p className="font-['DM_Sans:SemiBold',_sans-serif] font-semibold relative shrink-0 text-[#4a4d54]" style={{ fontVariationSettings: "'opsz' 14" }}>
            1000
          </p>
          <p className="font-['DM_Sans:Regular',_sans-serif] font-normal relative shrink-0 text-[#676a73]" style={{ fontVariationSettings: "'opsz' 14" }}>
            #3B1900
          </p>
        </div>
      </div>
    </div>
  );
}

function ColourSwatchBase48() {
  return (
    <div className="bg-white relative rounded-[4px] shrink-0 w-[140px]" data-name="_Colour Swatch Base">
      <div className="content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] w-[140px]">
        <Colour48 />
        <ColourSpecs48 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#e1e3e8] border-solid inset-[-1px] pointer-events-none rounded-[5px] shadow-[0px_2px_8px_-4px_rgba(0,0,0,0.2)]" />
    </div>
  );
}

function Colour49() {
  return (
    <div className="bg-[#240f00] h-[80px] relative shrink-0 w-full" data-name="Colour">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="box-border content-stretch flex gap-[8px] h-[80px] items-center justify-center p-[8px] relative w-full">
          <p className="font-['DM_Sans:Regular',_sans-serif] font-normal leading-[normal] relative shrink-0 text-[14px] text-nowrap text-white whitespace-pre" style={{ fontVariationSettings: "'opsz' 14" }}>
            AAA 18.37:1
          </p>
        </div>
      </div>
    </div>
  );
}

function ColourSpecs49() {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="Colour Specs">
      <div className="size-full">
        <div className="box-border content-stretch flex items-start justify-between leading-[normal] p-[8px] relative text-[14px] text-nowrap w-full whitespace-pre">
          <p className="font-['DM_Sans:SemiBold',_sans-serif] font-semibold relative shrink-0 text-[#4a4d54]" style={{ fontVariationSettings: "'opsz' 14" }}>
            1100
          </p>
          <p className="font-['DM_Sans:Regular',_sans-serif] font-normal relative shrink-0 text-[#676a73]" style={{ fontVariationSettings: "'opsz' 14" }}>
            #240F00
          </p>
        </div>
      </div>
    </div>
  );
}

function ColourSwatchBase49() {
  return (
    <div className="bg-white relative rounded-[4px] shrink-0 w-[140px]" data-name="_Colour Swatch Base">
      <div className="content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] w-[140px]">
        <Colour49 />
        <ColourSpecs49 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#e1e3e8] border-solid inset-[-1px] pointer-events-none rounded-[5px] shadow-[0px_2px_8px_-4px_rgba(0,0,0,0.2)]" />
    </div>
  );
}

function ColourPalette3() {
  return (
    <div className="content-stretch flex gap-[16px] items-center relative shrink-0" data-name="Colour Palette">
      <ColourSwatchBase38 />
      <ColourSwatchBase39 />
      <ColourSwatchBase40 />
      <ColourSwatchBase41 />
      <ColourSwatchBase42 />
      <ColourSwatchBase43 />
      <ColourSwatchBase44 />
      <ColourSwatchBase45 />
      <ColourSwatchBase46 />
      <ColourSwatchBase47 />
      <ColourSwatchBase48 />
      <ColourSwatchBase49 />
    </div>
  );
}

function Brand3() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0" data-name="Brand">
      <TitleDescription3 />
      <ColourPalette3 />
    </div>
  );
}

function TitleDescription4() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[460px]" data-name="Title + Description">
      <p className="font-['Poppins:Bold',_sans-serif] leading-[1.4] not-italic relative shrink-0 text-[#373a42] text-[24px] w-full">Red</p>
      <p className="font-['DM_Sans:Regular',_sans-serif] font-normal leading-[normal] relative shrink-0 text-[#535862] text-[16px] w-full" style={{ fontVariationSettings: "'opsz' 14" }}>{`Error colors are used across error states and in "destructive" actions. They communicate a destructive/negative action, such as removing a user from your team.`}</p>
    </div>
  );
}

function Colour50() {
  return (
    <div className="bg-[#fff0ed] h-[80px] relative shrink-0 w-full" data-name="Colour">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="box-border content-stretch flex gap-[8px] h-[80px] items-center justify-center p-[8px] relative w-full">
          <p className="font-['DM_Sans:Regular',_sans-serif] font-normal leading-[normal] relative shrink-0 text-[#5c1001] text-[14px] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'opsz' 14" }}>
            AAA 12.38:1
          </p>
        </div>
      </div>
    </div>
  );
}

function ColourSpecs50() {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="Colour Specs">
      <div className="size-full">
        <div className="box-border content-stretch flex items-start justify-between leading-[normal] p-[8px] relative text-[14px] text-nowrap w-full whitespace-pre">
          <p className="font-['DM_Sans:SemiBold',_sans-serif] font-semibold relative shrink-0 text-[#4a4d54]" style={{ fontVariationSettings: "'opsz' 14" }}>
            50
          </p>
          <p className="font-['DM_Sans:Regular',_sans-serif] font-normal relative shrink-0 text-[#676a73]" style={{ fontVariationSettings: "'opsz' 14" }}>
            #FFF0ED
          </p>
        </div>
      </div>
    </div>
  );
}

function ColourSwatchBase50() {
  return (
    <div className="bg-white relative rounded-[4px] shrink-0 w-[140px]" data-name="_Colour Swatch Base">
      <div className="content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] w-[140px]">
        <Colour50 />
        <ColourSpecs50 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#e1e3e8] border-solid inset-[-1px] pointer-events-none rounded-[5px] shadow-[0px_2px_8px_-4px_rgba(0,0,0,0.2)]" />
    </div>
  );
}

function Colour51() {
  return (
    <div className="bg-[#ffddd6] h-[80px] relative shrink-0 w-full" data-name="Colour">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="box-border content-stretch flex gap-[8px] h-[80px] items-center justify-center p-[8px] relative w-full">
          <p className="font-['DM_Sans:Regular',_sans-serif] font-normal leading-[normal] relative shrink-0 text-[#5c1001] text-[14px] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'opsz' 14" }}>
            AAA 10.83:1
          </p>
        </div>
      </div>
    </div>
  );
}

function ColourSpecs51() {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="Colour Specs">
      <div className="size-full">
        <div className="box-border content-stretch flex items-start justify-between leading-[normal] p-[8px] relative text-[14px] text-nowrap w-full whitespace-pre">
          <p className="font-['DM_Sans:SemiBold',_sans-serif] font-semibold relative shrink-0 text-[#4a4d54]" style={{ fontVariationSettings: "'opsz' 14" }}>
            100
          </p>
          <p className="font-['DM_Sans:Regular',_sans-serif] font-normal relative shrink-0 text-[#676a73]" style={{ fontVariationSettings: "'opsz' 14" }}>
            #FFDDD6
          </p>
        </div>
      </div>
    </div>
  );
}

function ColourSwatchBase51() {
  return (
    <div className="bg-white relative rounded-[4px] shrink-0 w-[140px]" data-name="_Colour Swatch Base">
      <div className="content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] w-[140px]">
        <Colour51 />
        <ColourSpecs51 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#e1e3e8] border-solid inset-[-1px] pointer-events-none rounded-[5px] shadow-[0px_2px_8px_-4px_rgba(0,0,0,0.2)]" />
    </div>
  );
}

function Colour52() {
  return (
    <div className="bg-[#ffaa99] h-[80px] relative shrink-0 w-full" data-name="Colour">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="box-border content-stretch flex gap-[8px] h-[80px] items-center justify-center p-[8px] relative w-full">
          <p className="font-['DM_Sans:Regular',_sans-serif] font-normal leading-[normal] relative shrink-0 text-[#5c1001] text-[14px] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'opsz' 14" }}>
            AAA 7.49:1
          </p>
        </div>
      </div>
    </div>
  );
}

function ColourSpecs52() {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="Colour Specs">
      <div className="size-full">
        <div className="box-border content-stretch flex items-start justify-between leading-[normal] p-[8px] relative text-[14px] text-nowrap w-full whitespace-pre">
          <p className="font-['DM_Sans:SemiBold',_sans-serif] font-semibold relative shrink-0 text-[#4a4d54]" style={{ fontVariationSettings: "'opsz' 14" }}>
            200
          </p>
          <p className="font-['DM_Sans:Regular',_sans-serif] font-normal relative shrink-0 text-[#676a73]" style={{ fontVariationSettings: "'opsz' 14" }}>
            #FFAA99
          </p>
        </div>
      </div>
    </div>
  );
}

function ColourSwatchBase52() {
  return (
    <div className="bg-white relative rounded-[4px] shrink-0 w-[140px]" data-name="_Colour Swatch Base">
      <div className="content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] w-[140px]">
        <Colour52 />
        <ColourSpecs52 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#e1e3e8] border-solid inset-[-1px] pointer-events-none rounded-[5px] shadow-[0px_2px_8px_-4px_rgba(0,0,0,0.2)]" />
    </div>
  );
}

function Colour53() {
  return (
    <div className="bg-[#fc8d77] h-[80px] relative shrink-0 w-full" data-name="Colour">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="box-border content-stretch flex gap-[8px] h-[80px] items-center justify-center p-[8px] relative w-full">
          <p className="font-['DM_Sans:Regular',_sans-serif] font-normal leading-[normal] relative shrink-0 text-[#5c1001] text-[14px] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'opsz' 14" }}>
            AA 6.02:1
          </p>
        </div>
      </div>
    </div>
  );
}

function ColourSpecs53() {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="Colour Specs">
      <div className="size-full">
        <div className="box-border content-stretch flex items-start justify-between leading-[normal] p-[8px] relative text-[14px] text-nowrap w-full whitespace-pre">
          <p className="font-['DM_Sans:SemiBold',_sans-serif] font-semibold relative shrink-0 text-[#4a4d54]" style={{ fontVariationSettings: "'opsz' 14" }}>
            300
          </p>
          <p className="font-['DM_Sans:Regular',_sans-serif] font-normal relative shrink-0 text-[#676a73]" style={{ fontVariationSettings: "'opsz' 14" }}>
            #FC8D77
          </p>
        </div>
      </div>
    </div>
  );
}

function ColourSwatchBase53() {
  return (
    <div className="bg-white relative rounded-[4px] shrink-0 w-[140px]" data-name="_Colour Swatch Base">
      <div className="content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] w-[140px]">
        <Colour53 />
        <ColourSpecs53 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#e1e3e8] border-solid inset-[-1px] pointer-events-none rounded-[5px] shadow-[0px_2px_8px_-4px_rgba(0,0,0,0.2)]" />
    </div>
  );
}

function Colour54() {
  return (
    <div className="bg-[#f97257] h-[80px] relative shrink-0 w-full" data-name="Colour">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="box-border content-stretch flex gap-[8px] h-[80px] items-center justify-center p-[8px] relative w-full">
          <p className="font-['DM_Sans:Regular',_sans-serif] font-normal leading-[normal] relative shrink-0 text-[#5c1001] text-[14px] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'opsz' 14" }}>
            AA 4.95:1
          </p>
        </div>
      </div>
    </div>
  );
}

function ColourSpecs54() {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="Colour Specs">
      <div className="size-full">
        <div className="box-border content-stretch flex items-start justify-between leading-[normal] p-[8px] relative text-[14px] text-nowrap w-full whitespace-pre">
          <p className="font-['DM_Sans:SemiBold',_sans-serif] font-semibold relative shrink-0 text-[#4a4d54]" style={{ fontVariationSettings: "'opsz' 14" }}>
            400
          </p>
          <p className="font-['DM_Sans:Regular',_sans-serif] font-normal relative shrink-0 text-[#676a73]" style={{ fontVariationSettings: "'opsz' 14" }}>
            #F97257
          </p>
        </div>
      </div>
    </div>
  );
}

function ColourSwatchBase54() {
  return (
    <div className="bg-white relative rounded-[4px] shrink-0 w-[140px]" data-name="_Colour Swatch Base">
      <div className="content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] w-[140px]">
        <Colour54 />
        <ColourSpecs54 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#e1e3e8] border-solid inset-[-1px] pointer-events-none rounded-[5px] shadow-[0px_2px_8px_-4px_rgba(0,0,0,0.2)]" />
    </div>
  );
}

function Colour55() {
  return (
    <div className="bg-[#f94925] h-[80px] relative shrink-0 w-full" data-name="Colour">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="box-border content-stretch flex gap-[8px] h-[80px] items-center justify-center p-[8px] relative w-full">
          <p className="font-['DM_Sans:Regular',_sans-serif] font-normal leading-[normal] relative shrink-0 text-[14px] text-nowrap text-white whitespace-pre" style={{ fontVariationSettings: "'opsz' 14" }}>
            3.50:1
          </p>
        </div>
      </div>
    </div>
  );
}

function ColourSpecs55() {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="Colour Specs">
      <div className="size-full">
        <div className="box-border content-stretch flex items-start justify-between leading-[normal] p-[8px] relative text-[14px] text-nowrap w-full whitespace-pre">
          <p className="font-['DM_Sans:SemiBold',_sans-serif] font-semibold relative shrink-0 text-[#4a4d54]" style={{ fontVariationSettings: "'opsz' 14" }}>
            500
          </p>
          <p className="font-['DM_Sans:Regular',_sans-serif] font-normal relative shrink-0 text-[#676a73]" style={{ fontVariationSettings: "'opsz' 14" }}>
            #F94925
          </p>
        </div>
      </div>
    </div>
  );
}

function ColourSwatchBase55() {
  return (
    <div className="bg-white relative rounded-[4px] shrink-0 w-[140px]" data-name="_Colour Swatch Base">
      <div className="content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] w-[140px]">
        <Colour55 />
        <ColourSpecs55 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#e1e3e8] border-solid inset-[-1px] pointer-events-none rounded-[5px] shadow-[0px_2px_8px_-4px_rgba(0,0,0,0.2)]" />
    </div>
  );
}

function Colour56() {
  return (
    <div className="bg-[#e03412] h-[80px] relative shrink-0 w-full" data-name="Colour">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="box-border content-stretch flex gap-[8px] h-[80px] items-center justify-center p-[8px] relative w-full">
          <p className="font-['DM_Sans:Regular',_sans-serif] font-normal leading-[normal] relative shrink-0 text-[14px] text-nowrap text-white whitespace-pre" style={{ fontVariationSettings: "'opsz' 14" }}>
            AA 4.50:1
          </p>
        </div>
      </div>
    </div>
  );
}

function ColourSpecs56() {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="Colour Specs">
      <div className="size-full">
        <div className="box-border content-stretch flex items-start justify-between leading-[normal] p-[8px] relative text-[14px] text-nowrap w-full whitespace-pre">
          <p className="font-['DM_Sans:SemiBold',_sans-serif] font-semibold relative shrink-0 text-[#4a4d54]" style={{ fontVariationSettings: "'opsz' 14" }}>
            600
          </p>
          <p className="font-['DM_Sans:Regular',_sans-serif] font-normal relative shrink-0 text-[#676a73]" style={{ fontVariationSettings: "'opsz' 14" }}>
            #E03412
          </p>
        </div>
      </div>
    </div>
  );
}

function ColourSwatchBase56() {
  return (
    <div className="bg-white relative rounded-[4px] shrink-0 w-[140px]" data-name="_Colour Swatch Base">
      <div className="content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] w-[140px]">
        <Colour56 />
        <ColourSpecs56 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#e1e3e8] border-solid inset-[-1px] pointer-events-none rounded-[5px] shadow-[0px_2px_8px_-4px_rgba(0,0,0,0.2)]" />
    </div>
  );
}

function Colour57() {
  return (
    <div className="bg-[#bd2709] h-[80px] relative shrink-0 w-full" data-name="Colour">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="box-border content-stretch flex gap-[8px] h-[80px] items-center justify-center p-[8px] relative w-full">
          <p className="font-['DM_Sans:Regular',_sans-serif] font-normal leading-[normal] relative shrink-0 text-[14px] text-nowrap text-white whitespace-pre" style={{ fontVariationSettings: "'opsz' 14" }}>
            AA 6.07:1
          </p>
        </div>
      </div>
    </div>
  );
}

function ColourSpecs57() {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="Colour Specs">
      <div className="size-full">
        <div className="box-border content-stretch flex items-start justify-between leading-[normal] p-[8px] relative text-[14px] text-nowrap w-full whitespace-pre">
          <p className="font-['DM_Sans:SemiBold',_sans-serif] font-semibold relative shrink-0 text-[#4a4d54]" style={{ fontVariationSettings: "'opsz' 14" }}>
            700
          </p>
          <p className="font-['DM_Sans:Regular',_sans-serif] font-normal relative shrink-0 text-[#676a73]" style={{ fontVariationSettings: "'opsz' 14" }}>
            #BD2709
          </p>
        </div>
      </div>
    </div>
  );
}

function ColourSwatchBase57() {
  return (
    <div className="bg-white relative rounded-[4px] shrink-0 w-[140px]" data-name="_Colour Swatch Base">
      <div className="content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] w-[140px]">
        <Colour57 />
        <ColourSpecs57 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#e1e3e8] border-solid inset-[-1px] pointer-events-none rounded-[5px] shadow-[0px_2px_8px_-4px_rgba(0,0,0,0.2)]" />
    </div>
  );
}

function Colour58() {
  return (
    <div className="bg-[#9e1e05] h-[80px] relative shrink-0 w-full" data-name="Colour">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="box-border content-stretch flex gap-[8px] h-[80px] items-center justify-center p-[8px] relative w-full">
          <p className="font-['DM_Sans:Regular',_sans-serif] font-normal leading-[normal] relative shrink-0 text-[14px] text-nowrap text-white whitespace-pre" style={{ fontVariationSettings: "'opsz' 14" }}>
            AAA 7.95:1
          </p>
        </div>
      </div>
    </div>
  );
}

function ColourSpecs58() {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="Colour Specs">
      <div className="size-full">
        <div className="box-border content-stretch flex items-start justify-between leading-[normal] p-[8px] relative text-[14px] text-nowrap w-full whitespace-pre">
          <p className="font-['DM_Sans:SemiBold',_sans-serif] font-semibold relative shrink-0 text-[#4a4d54]" style={{ fontVariationSettings: "'opsz' 14" }}>
            800
          </p>
          <p className="font-['DM_Sans:Regular',_sans-serif] font-normal relative shrink-0 text-[#676a73]" style={{ fontVariationSettings: "'opsz' 14" }}>
            #9E1E05
          </p>
        </div>
      </div>
    </div>
  );
}

function ColourSwatchBase58() {
  return (
    <div className="bg-white relative rounded-[4px] shrink-0 w-[140px]" data-name="_Colour Swatch Base">
      <div className="content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] w-[140px]">
        <Colour58 />
        <ColourSpecs58 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#e1e3e8] border-solid inset-[-1px] pointer-events-none rounded-[5px] shadow-[0px_2px_8px_-4px_rgba(0,0,0,0.2)]" />
    </div>
  );
}

function Colour59() {
  return (
    <div className="bg-[#5c1001] h-[80px] relative shrink-0 w-full" data-name="Colour">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="box-border content-stretch flex gap-[8px] h-[80px] items-center justify-center p-[8px] relative w-full">
          <p className="font-['DM_Sans:Regular',_sans-serif] font-normal leading-[normal] relative shrink-0 text-[14px] text-nowrap text-white whitespace-pre" style={{ fontVariationSettings: "'opsz' 14" }}>
            AAA 13.73:1
          </p>
        </div>
      </div>
    </div>
  );
}

function ColourSpecs59() {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="Colour Specs">
      <div className="size-full">
        <div className="box-border content-stretch flex items-start justify-between leading-[normal] p-[8px] relative text-[14px] text-nowrap w-full whitespace-pre">
          <p className="font-['DM_Sans:SemiBold',_sans-serif] font-semibold relative shrink-0 text-[#4a4d54]" style={{ fontVariationSettings: "'opsz' 14" }}>
            900
          </p>
          <p className="font-['DM_Sans:Regular',_sans-serif] font-normal relative shrink-0 text-[#676a73]" style={{ fontVariationSettings: "'opsz' 14" }}>
            #5C1001
          </p>
        </div>
      </div>
    </div>
  );
}

function ColourSwatchBase59() {
  return (
    <div className="bg-white relative rounded-[4px] shrink-0 w-[140px]" data-name="_Colour Swatch Base">
      <div className="content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] w-[140px]">
        <Colour59 />
        <ColourSpecs59 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#e1e3e8] border-solid inset-[-1px] pointer-events-none rounded-[5px] shadow-[0px_2px_8px_-4px_rgba(0,0,0,0.2)]" />
    </div>
  );
}

function Colour60() {
  return (
    <div className="bg-[#470c00] h-[80px] relative shrink-0 w-full" data-name="Colour">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="box-border content-stretch flex gap-[8px] h-[80px] items-center justify-center p-[8px] relative w-full">
          <p className="font-['DM_Sans:Regular',_sans-serif] font-normal leading-[normal] relative shrink-0 text-[14px] text-nowrap text-white whitespace-pre" style={{ fontVariationSettings: "'opsz' 14" }}>
            AAA 15.90:1
          </p>
        </div>
      </div>
    </div>
  );
}

function ColourSpecs60() {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="Colour Specs">
      <div className="size-full">
        <div className="box-border content-stretch flex items-start justify-between leading-[normal] p-[8px] relative text-[14px] text-nowrap w-full whitespace-pre">
          <p className="font-['DM_Sans:SemiBold',_sans-serif] font-semibold relative shrink-0 text-[#4a4d54]" style={{ fontVariationSettings: "'opsz' 14" }}>
            1000
          </p>
          <p className="font-['DM_Sans:Regular',_sans-serif] font-normal relative shrink-0 text-[#676a73]" style={{ fontVariationSettings: "'opsz' 14" }}>
            #470C00
          </p>
        </div>
      </div>
    </div>
  );
}

function ColourSwatchBase60() {
  return (
    <div className="bg-white relative rounded-[4px] shrink-0 w-[140px]" data-name="_Colour Swatch Base">
      <div className="content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] w-[140px]">
        <Colour60 />
        <ColourSpecs60 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#e1e3e8] border-solid inset-[-1px] pointer-events-none rounded-[5px] shadow-[0px_2px_8px_-4px_rgba(0,0,0,0.2)]" />
    </div>
  );
}

function Colour61() {
  return (
    <div className="bg-[#300800] h-[80px] relative shrink-0 w-full" data-name="Colour">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="box-border content-stretch flex gap-[8px] h-[80px] items-center justify-center p-[8px] relative w-full">
          <p className="font-['DM_Sans:Regular',_sans-serif] font-normal leading-[normal] relative shrink-0 text-[14px] text-nowrap text-white whitespace-pre" style={{ fontVariationSettings: "'opsz' 14" }}>
            AAA 18.10:1
          </p>
        </div>
      </div>
    </div>
  );
}

function ColourSpecs61() {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="Colour Specs">
      <div className="size-full">
        <div className="box-border content-stretch flex items-start justify-between leading-[normal] p-[8px] relative text-[14px] text-nowrap w-full whitespace-pre">
          <p className="font-['DM_Sans:SemiBold',_sans-serif] font-semibold relative shrink-0 text-[#4a4d54]" style={{ fontVariationSettings: "'opsz' 14" }}>
            1100
          </p>
          <p className="font-['DM_Sans:Regular',_sans-serif] font-normal relative shrink-0 text-[#676a73]" style={{ fontVariationSettings: "'opsz' 14" }}>
            #300800
          </p>
        </div>
      </div>
    </div>
  );
}

function ColourSwatchBase61() {
  return (
    <div className="bg-white relative rounded-[4px] shrink-0 w-[140px]" data-name="_Colour Swatch Base">
      <div className="content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] w-[140px]">
        <Colour61 />
        <ColourSpecs61 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#e1e3e8] border-solid inset-[-1px] pointer-events-none rounded-[5px] shadow-[0px_2px_8px_-4px_rgba(0,0,0,0.2)]" />
    </div>
  );
}

function ColourPalette4() {
  return (
    <div className="content-stretch flex gap-[16px] items-center relative shrink-0" data-name="Colour Palette">
      <ColourSwatchBase50 />
      <ColourSwatchBase51 />
      <ColourSwatchBase52 />
      <ColourSwatchBase53 />
      <ColourSwatchBase54 />
      <ColourSwatchBase55 />
      <ColourSwatchBase56 />
      <ColourSwatchBase57 />
      <ColourSwatchBase58 />
      <ColourSwatchBase59 />
      <ColourSwatchBase60 />
      <ColourSwatchBase61 />
    </div>
  );
}

function Brand4() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0" data-name="Brand">
      <TitleDescription4 />
      <ColourPalette4 />
    </div>
  );
}

export default function ColorPalettes() {
  return (
    <div className="bg-white relative size-full" data-name="Color Palettes">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[40px] items-start pb-[40px] pt-[16px] px-[40px] relative size-full">
          <Brand />
          <Brand1 />
          <Brand2 />
          <Brand3 />
          <Brand4 />
        </div>
      </div>
    </div>
  );
}