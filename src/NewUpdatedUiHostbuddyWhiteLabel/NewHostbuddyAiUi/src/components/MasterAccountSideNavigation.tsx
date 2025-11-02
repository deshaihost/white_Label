import { useState } from 'react';
import svgPaths from "../imports/svg-2ulr0e3i7w";

function Isotype() {
  return (
    <div className="relative shrink-0 size-[40px]" data-name="Isotype">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 40 40">
        <g id="Isotype">
          <rect fill="var(--fill-0, #17191f)" height="40" rx="4" width="40" />
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
            <path clipRule="evenodd" d={svgPaths.p272ed100} fill="white" fillRule="evenodd" />
            <path clipRule="evenodd" d={svgPaths.p26abe200} fill="white" fillRule="evenodd" />
            <path clipRule="evenodd" d={svgPaths.p11485100} fill="white" fillRule="evenodd" />
            <path d={svgPaths.p7bfcb80} fill="white" />
            <path d={svgPaths.p21e3cf00} fill="white" />
            <path d={svgPaths.pd7eca80} fill="white" />
            <path clipRule="evenodd" d={svgPaths.p1b083e00} fill="white" fillRule="evenodd" />
            <path d={svgPaths.pbb67780} fill="white" />
            <path d={svgPaths.p3c4100} fill="white" />
            <path clipRule="evenodd" d={svgPaths.pb3c10f0} fill="white" fillRule="evenodd" />
            <path d={svgPaths.pfd64300} fill="white" />
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

function Users01Icon({ isActive }: { isActive?: boolean }) {
  const color = isActive ? '#98bffa' : '#676A73';
  return (
    <div className="relative shrink-0 size-[20px]" data-name="users-01">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="users-01">
          <path d="M15 17.5V15.8333C15 14.9493 14.6488 14.1014 14.0237 13.4763C13.3986 12.8512 12.5507 12.5 11.6667 12.5H8.33333C7.44928 12.5 6.60143 12.8512 5.97631 13.4763C5.35119 14.1014 5 14.9493 5 15.8333V17.5M13.3333 5.83333C13.3333 7.67428 11.841 9.16667 10 9.16667C8.15905 9.16667 6.66667 7.67428 6.66667 5.83333C6.66667 3.99238 8.15905 2.5 10 2.5C11.841 2.5 13.3333 3.99238 13.3333 5.83333Z" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"/>
        </g>
      </svg>
    </div>
  );
}

function SettingsIcon() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="settings-01">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="settings-01">
          <path d={svgPaths.p186b9100} id="Icon" stroke="var(--stroke-0, #676A73)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function ChevronDown({ onClick }: { onClick?: () => void }) {
  return (
    <div className="relative shrink-0 size-[20px] cursor-pointer" data-name="chevron-down" onClick={(e) => {
      e.stopPropagation();
      onClick?.();
    }}>
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="chevron-down">
          <path d="M5 7.5L10 12.5L15 7.5" id="Icon" stroke="var(--stroke-0, #676A73)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function ChevronUp({ onClick }: { onClick?: () => void }) {
  return (
    <div className="relative shrink-0 size-[20px] cursor-pointer" data-name="chevron-up" onClick={(e) => {
      e.stopPropagation();
      onClick?.();
    }}>
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="chevron-up">
          <path d="M15 12.5L10 7.5L5 12.5" id="Icon" stroke="var(--stroke-0, #676A73)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function AllAccountsItem({ onClick, isActive }: { onClick?: () => void; isActive?: boolean }) {
  return (
    <div className={`${isActive ? 'bg-[#01255e]' : 'bg-[rgba(255,255,255,0)]'} h-[40px] relative rounded-[4px] shrink-0 w-full cursor-pointer hover:bg-[#01255e] transition-colors`} data-name="_Side Nav Item" onClick={onClick}>
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[6px] h-[40px] items-center pl-[12px] pr-[8px] py-0 relative w-full">
          <Users01Icon isActive={isActive} />
          <p className={`basis-0 font-['DM_Sans:${isActive ? 'SemiBold' : 'Medium'}',_sans-serif] ${isActive ? 'font-semibold' : 'font-medium'} grow leading-[normal] min-h-px min-w-px relative shrink-0 text-[${isActive ? '#98bffa' : '#a6a9b2'}] text-[14px]`} style={{ fontVariationSettings: "'opsz' 14" }}>
            All Accounts
          </p>
          {isActive && <div className="absolute bg-[#3e88f7] h-[14px] left-0 rounded-br-[2px] rounded-tr-[2px] top-1/2 translate-y-[-50%] w-[3px]" data-name="Selection Indicator" />}
        </div>
      </div>
    </div>
  );
}

function SettingsItem({ isExpanded, onToggle }: { isExpanded: boolean; onToggle: () => void }) {
  return (
    <div className="bg-[rgba(255,255,255,0)] h-[40px] relative rounded-[4px] shrink-0 w-full cursor-pointer" data-name="_Side Nav Item" onClick={onToggle}>
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[6px] h-[40px] items-center pl-[12px] pr-[8px] py-0 relative w-full">
          <SettingsIcon />
          <p className="basis-0 font-['DM_Sans:Medium',_sans-serif] font-medium grow leading-[normal] min-h-px min-w-px relative shrink-0 text-[#a6a9b2] text-[14px]" style={{ fontVariationSettings: "'opsz' 14" }}>
            Settings
          </p>
          {isExpanded ? (
            <ChevronUp onClick={onToggle} />
          ) : (
            <ChevronDown onClick={onToggle} />
          )}
        </div>
      </div>
    </div>
  );
}

interface SubItemProps {
  label: string;
  isActive?: boolean;
  onClick?: () => void;
}

function SettingsSubItem({ label, isActive, onClick }: SubItemProps) {
  return (
    <div className={`${isActive ? 'bg-[#01255e]' : 'bg-[rgba(255,255,255,0)]'} h-[32px] relative rounded-[4px] shrink-0 w-full cursor-pointer hover:bg-[#01255e] transition-colors`} data-name="_Side Nav Item" onClick={onClick}>
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[6px] h-[32px] items-center pl-[12px] pr-[8px] py-0 relative w-full">
          <p className={`basis-0 font-['DM_Sans:${isActive ? 'SemiBold' : 'Medium'}',_sans-serif] ${isActive ? 'font-semibold' : 'font-medium'} grow leading-[normal] min-h-px min-w-px relative shrink-0 text-[${isActive ? '#98bffa' : '#a6a9b2'}] text-[14px]`} style={{ fontVariationSettings: "'opsz' 14" }}>
            {label}
          </p>
          {isActive && <div className="absolute bg-[#3e88f7] h-[14px] left-0 rounded-br-[2px] rounded-tr-[2px] top-1/2 translate-y-[-50%] w-[3px]" data-name="Selection Indicator" />}
        </div>
      </div>
    </div>
  );
}

interface SettingsSubItemsProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

function SettingsSubItems({ currentPage, onNavigate }: SettingsSubItemsProps) {
  return (
    <div className="relative shrink-0 w-full" data-name="Sub Items">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col items-start p-[8px] relative w-full">
          <SettingsSubItem label="Account" isActive={currentPage === 'account'} onClick={() => onNavigate('account')} />
          <SettingsSubItem label="Contacts" isActive={currentPage === 'contacts'} onClick={() => onNavigate('contacts')} />
          <SettingsSubItem label="Notifications" isActive={currentPage === 'notifications'} onClick={() => onNavigate('notifications')} />
          <SettingsSubItem label="Action Items" isActive={currentPage === 'actionitems-settings'} onClick={() => onNavigate('actionitems-settings')} />
          <SettingsSubItem label="Integrations" isActive={currentPage === 'integrations'} onClick={() => onNavigate('integrations')} />
          <SettingsSubItem label="Users" isActive={currentPage === 'users'} onClick={() => onNavigate('users')} />
          <SettingsSubItem label="Subscription" isActive={currentPage === 'subscription'} onClick={() => onNavigate('subscription')} />
        </div>
      </div>
    </div>
  );
}

interface WhiteLabelSubItemsProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

function WhiteLabelSubItems({ currentPage, onNavigate }: WhiteLabelSubItemsProps) {
  return (
    <div className="relative shrink-0 w-full" data-name="Sub Items">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col items-start p-[8px] relative w-full">
          <SettingsSubItem label="Branding" isActive={currentPage === 'whitelabel'} onClick={() => onNavigate('whitelabel')} />
          <SettingsSubItem label="Feature Selection" isActive={currentPage === 'whitelabel-features'} onClick={() => onNavigate('whitelabel-features')} />
          <SettingsSubItem label="Domain Configuration" isActive={currentPage === 'whitelabel-domain'} onClick={() => onNavigate('whitelabel-domain')} />
        </div>
      </div>
    </div>
  );
}

interface SettingsExpandedProps {
  isExpanded: boolean;
  onToggle: () => void;
  currentPage: string;
  onNavigate: (page: string) => void;
}

function SettingsExpanded({ isExpanded, onToggle, currentPage, onNavigate }: SettingsExpandedProps) {
  return (
    <div className={`${isExpanded ? 'bg-[#0F1117]' : 'bg-[rgba(255,255,255,0)]'} content-stretch flex flex-col items-start relative rounded-[4px] shrink-0 w-full`} data-name="Settings Expanded">
      <SettingsItem isExpanded={isExpanded} onToggle={onToggle} />
      {isExpanded && <SettingsSubItems currentPage={currentPage} onNavigate={onNavigate} />}
    </div>
  );
}

interface WhiteLabelExpandedProps {
  isExpanded: boolean;
  onToggle: () => void;
  currentPage: string;
  onNavigate: (page: string) => void;
}

function WhiteLabelExpanded({ isExpanded, onToggle, currentPage, onNavigate }: WhiteLabelExpandedProps) {
  return (
    <div className={`${isExpanded ? 'bg-[#0F1117]' : 'bg-[rgba(255,255,255,0)]'} content-stretch flex flex-col items-start relative rounded-[4px] shrink-0 w-full`} data-name="White Label Expanded">
      <WhiteLabelItem isExpanded={isExpanded} onToggle={onToggle} />
      {isExpanded && <WhiteLabelSubItems currentPage={currentPage} onNavigate={onNavigate} />}
    </div>
  );
}

function LogOut01() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="log-out-01">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="log-out-01">
          <path d="M7.5 17.5H4.16667C3.72464 17.5 3.30072 17.3244 2.98816 17.0118C2.67559 16.6993 2.5 16.2754 2.5 15.8333V4.16667C2.5 3.72464 2.67559 3.30072 2.98816 2.98816C3.30072 2.67559 3.72464 2.5 4.16667 2.5H7.5" stroke="#676A73" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"/>
          <path d="M13.3333 14.1667L17.5 10L13.3333 5.83334" stroke="#676A73" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"/>
          <path d="M17.5 10H7.5" stroke="#676A73" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"/>
        </g>
      </svg>
    </div>
  );
}

function SideNavItemLogout({ onClick }: { onClick?: () => void }) {
  return (
    <div className="bg-[rgba(255,255,255,0)] h-[32px] relative rounded-[4px] shrink-0 w-full hover:bg-[#01255e] transition-colors cursor-pointer" data-name="_Side Nav Item" onClick={onClick}>
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[8px] h-[32px] items-center pl-[12px] pr-[8px] py-0 relative w-full">
          <LogOut01 />
          <p className="basis-0 font-['DM_Sans:Medium',_sans-serif] font-medium grow leading-[normal] min-h-px min-w-px relative shrink-0 text-[#a6a9b2] text-[14px]" style={{ fontVariationSettings: "'opsz' 14" }}>
            Log Out
          </p>
        </div>
      </div>
    </div>
  );
}

function HelpCircle() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="help-circle">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g clipPath="url(#clip0_helpcircle2)" id="help-circle">
          <circle cx="10" cy="10" r="8.125" stroke="#676A73" strokeWidth="1.5"/>
          <path d="M10 14.375V14.375" stroke="#676A73" strokeLinecap="round" strokeWidth="1.5"/>
          <path d="M10 11.25V10.625C10 9.58947 10.8395 8.75 11.875 8.75V8.75C12.9105 8.75 13.75 7.91053 13.75 6.875V6.875C13.75 5.83947 12.9105 5 11.875 5H10.625C9.58947 5 8.75 5.83947 8.75 6.875V6.875" stroke="#676A73" strokeLinecap="round" strokeWidth="1.5"/>
        </g>
        <defs>
          <clipPath id="clip0_helpcircle2">
            <rect fill="white" height="20" width="20" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function SideNavItemHelp({ onClick }: { onClick?: () => void }) {
  return (
    <div className="bg-[rgba(255,255,255,0)] h-[32px] relative rounded-[4px] shrink-0 w-full hover:bg-[#01255e] transition-colors cursor-pointer" data-name="_Side Nav Item" onClick={onClick}>
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[8px] h-[32px] items-center pl-[12px] pr-[8px] py-0 relative w-full">
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

function SideNavItemCollapse({ onClick }: { onClick?: () => void }) {
  return (
    <div className="bg-[rgba(255,255,255,0)] h-[32px] relative rounded-[4px] shrink-0 w-full hover:bg-[#01255e] transition-colors cursor-pointer" data-name="_Side Nav Item" onClick={onClick}>
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[8px] h-[32px] items-center pl-[12px] pr-[8px] py-0 relative w-full">
          <ChevronLeftDouble />
          <p className="basis-0 font-['DM_Sans:Medium',_sans-serif] font-medium grow leading-[normal] min-h-px min-w-px relative shrink-0 text-[#a6a9b2] text-[14px]" style={{ fontVariationSettings: "'opsz' 14" }}>
            Collapse Menu
          </p>
        </div>
      </div>
    </div>
  );
}

function BottomItems() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Bottom Items">
      <SideNavItemLogout />
      <SideNavItemHelp />
      <SideNavItemCollapse />
    </div>
  );
}

interface MenuItemsProps {
  isSettingsExpanded: boolean;
  isWhiteLabelExpanded: boolean;
  onSettingsToggle: () => void;
  onWhiteLabelToggle: () => void;
  currentPage: string;
  onNavigate: (page: string) => void;
  onNavigateToAllAccounts: () => void;
}

function PaletteIcon() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="palette">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="palette">
          <path d="M10 17.5C6.96243 17.5 4.5 15.0376 4.5 12C4.5 8.96243 6.96243 6.5 10 6.5C13.0376 6.5 15.5 8.96243 15.5 12C15.5 12.663 15.3534 13.2989 15.0787 13.8827C14.8291 14.4168 14.7043 14.6838 14.7043 14.9118C14.7043 15.1054 14.7703 15.3085 14.9453 15.5429C15.1363 15.7983 15.4531 16.0759 16.0867 16.6309C16.2298 16.7566 16.3013 16.8194 16.3281 16.883C16.3549 16.9467 16.3549 17.0533 16.3281 17.117C16.3013 17.1806 16.2298 17.2434 16.0867 17.3691C15.4531 17.9241 15.1363 18.2017 14.9453 18.4571C14.7703 18.6915 14.7043 18.8946 14.7043 19.0882C14.7043 19.3162 14.8291 19.5832 15.0787 20.1173C15.3534 20.7011 15.5 21.337 15.5 22" stroke="#676A73" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"/>
          <circle cx="8.5" cy="10.5" r="1" fill="#676A73"/>
          <circle cx="11.5" cy="9" r="1" fill="#676A73"/>
          <circle cx="7.5" cy="13.5" r="1" fill="#676A73"/>
        </g>
      </svg>
    </div>
  );
}

function WhiteLabelItem({ isExpanded, onToggle }: { isExpanded: boolean; onToggle: () => void }) {
  return (
    <div className="bg-[rgba(255,255,255,0)] h-[40px] relative rounded-[4px] shrink-0 w-full cursor-pointer" data-name="_Side Nav Item" onClick={onToggle}>
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[6px] h-[40px] items-center pl-[12px] pr-[8px] py-0 relative w-full">
          <PaletteIcon />
          <p className="basis-0 font-['DM_Sans:Medium',_sans-serif] font-medium grow leading-[normal] min-h-px min-w-px relative shrink-0 text-[#a6a9b2] text-[14px]" style={{ fontVariationSettings: "'opsz' 14" }}>
            White Label
          </p>
          {isExpanded ? (
            <ChevronUp onClick={onToggle} />
          ) : (
            <ChevronDown onClick={onToggle} />
          )}
        </div>
      </div>
    </div>
  );
}

function MenuItems({ isSettingsExpanded, isWhiteLabelExpanded, onSettingsToggle, onWhiteLabelToggle, currentPage, onNavigate, onNavigateToAllAccounts }: MenuItemsProps) {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Menu Items">
      <AllAccountsItem onClick={onNavigateToAllAccounts} isActive={currentPage === 'allaccounts'} />
      <WhiteLabelExpanded isExpanded={isWhiteLabelExpanded} onToggle={onWhiteLabelToggle} currentPage={currentPage} onNavigate={onNavigate} />
      <SettingsExpanded isExpanded={isSettingsExpanded} onToggle={onSettingsToggle} currentPage={currentPage} onNavigate={onNavigate} />
    </div>
  );
}

interface TopProps {
  isSettingsExpanded: boolean;
  isWhiteLabelExpanded: boolean;
  onSettingsToggle: () => void;
  onWhiteLabelToggle: () => void;
  currentPage: string;
  onNavigate: (page: string) => void;
  onNavigateToAllAccounts: () => void;
}

function Top({ isSettingsExpanded, isWhiteLabelExpanded, onSettingsToggle, onWhiteLabelToggle, currentPage, onNavigate, onNavigateToAllAccounts }: TopProps) {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full" data-name="Top">
      <LogoContainer />
      <MenuItems isSettingsExpanded={isSettingsExpanded} isWhiteLabelExpanded={isWhiteLabelExpanded} onSettingsToggle={onSettingsToggle} onWhiteLabelToggle={onWhiteLabelToggle} currentPage={currentPage} onNavigate={onNavigate} onNavigateToAllAccounts={onNavigateToAllAccounts} />
    </div>
  );
}

function Bottom() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="Bottom">
      <BottomItems />
    </div>
  );
}

interface MasterAccountSideNavigationProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  onNavigateToAllAccounts: () => void;
}

export default function MasterAccountSideNavigation({ currentPage, onNavigate, onNavigateToAllAccounts }: MasterAccountSideNavigationProps) {
  const [isSettingsExpanded, setIsSettingsExpanded] = useState(false);
  const [isWhiteLabelExpanded, setIsWhiteLabelExpanded] = useState(false);

  const handleToggleSettings = () => {
    setIsSettingsExpanded(!isSettingsExpanded);
  };

  const handleToggleWhiteLabel = () => {
    setIsWhiteLabelExpanded(!isWhiteLabelExpanded);
  };

  return (
    <div className="fixed bg-[#17191f] h-screen left-0 top-0 w-[200px] z-50 overflow-y-auto" data-name="Master Account Side Navigation">
      <div className="box-border content-stretch flex flex-col h-full items-start justify-between overflow-clip px-[8px] py-[16px] relative rounded-[inherit] w-[200px]">
        <Top isSettingsExpanded={isSettingsExpanded} isWhiteLabelExpanded={isWhiteLabelExpanded} onSettingsToggle={handleToggleSettings} onWhiteLabelToggle={handleToggleWhiteLabel} currentPage={currentPage} onNavigate={onNavigate} onNavigateToAllAccounts={onNavigateToAllAccounts} />
        <Bottom />
      </div>
      <div aria-hidden="true" className="absolute border-[#24262e] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
    </div>
  );
}
