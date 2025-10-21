import { ArrowRight } from 'lucide-react';
import faviconImage from 'figma:asset/8c57f694868279ca7b9c2fd95c7970c4ad789baf.png';

export function GetStarted() {
  return (
    <div className="flex-1 bg-[#0F1117] overflow-y-auto">
      <div className="max-w-[1200px] mx-auto p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-white text-[28px] mb-2">Welcome to HostBuddy!</h1>
          <p className="text-[#a6a9b2] text-[14px]">
            Click the tiles below to get set up and running in no time!
          </p>
        </div>

        {/* Setup Steps Grid */}
        <div className="grid grid-cols-2 gap-6 mb-12">
          {/* Step 1: Connect your PMS */}
          <div className="bg-[#17191f] border-2 border-[#013280] rounded-2xl p-8 hover:border-[#3e88f7] transition-all cursor-pointer relative shadow-[0_0_20px_rgba(62,136,247,0.15)] hover:shadow-[0_0_30px_rgba(62,136,247,0.3)]">
            <div className="absolute top-6 left-6 text-white text-[72px] leading-none">1</div>
            <div className="absolute top-6 right-6 text-white text-[15px]">Connect your PMS</div>
            <div className="flex items-center justify-center gap-8 mt-12">
              {/* PMS System - Cloud Server */}
              <div className="flex flex-col items-center gap-3">
                <div className="w-16 h-16 flex items-center justify-center">
                  <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
                    {/* Cloud */}
                    <path d="M48 28C48 24 45 20 40 20C40 14 35 10 28 10C21 10 16 14 16 20C11 20 8 24 8 28C8 32 11 36 16 36H48C53 36 56 32 56 28C56 24 53 20 48 20V28Z" fill="#01255e" opacity="0.3"/>
                    <path d="M48 28C48 24 45 20 40 20C40 14 35 10 28 10C21 10 16 14 16 20C11 20 8 24 8 28C8 32 11 36 16 36H48C53 36 56 32 56 28C56 24 53 20 48 20V28Z" stroke="#3e88f7" strokeWidth="2.5"/>
                    {/* Server lines */}
                    <rect x="16" y="42" width="32" height="8" rx="2" fill="#3e88f7" opacity="0.6"/>
                    <rect x="16" y="52" width="32" height="8" rx="2" fill="#3e88f7"/>
                    <circle cx="20" cy="46" r="1.5" fill="white"/>
                    <circle cx="20" cy="56" r="1.5" fill="white"/>
                  </svg>
                </div>
                <span className="text-[#a6a9b2] text-[12px]">Your PMS</span>
              </div>
              
              {/* Sync Arrows */}
              <div className="flex flex-col gap-1">
                <ArrowRight className="w-10 h-10 text-[#3e88f7]" strokeWidth={2.5} />
              </div>
              
              {/* HostBuddy Icon */}
              <div className="flex flex-col items-center gap-3">
                <div className="w-16 h-16 bg-white rounded-xl p-3 flex items-center justify-center shadow-lg" style={{ boxShadow: '0 0 20px rgba(62, 136, 247, 0.3)' }}>
                  <img src={faviconImage} alt="HostBuddy AI" className="w-full h-full object-contain" />
                </div>
                <span className="text-[#a6a9b2] text-[12px]">HostBuddy AI</span>
              </div>
            </div>
          </div>

          {/* Step 2: Import your Properties */}
          <div className="bg-[#17191f] border-2 border-[#013280] rounded-2xl p-8 hover:border-[#3e88f7] transition-all cursor-pointer relative shadow-[0_0_20px_rgba(62,136,247,0.15)] hover:shadow-[0_0_30px_rgba(62,136,247,0.3)]">
            <div className="absolute top-6 left-6 text-white text-[72px] leading-none">2</div>
            <div className="absolute top-6 right-6 text-white text-[15px]">Import your Properties</div>
            <div className="flex items-center justify-center gap-6 mt-12">
              {/* Multiple property cards flowing into HostBuddy */}
              <div className="flex gap-3">
                {/* Property card 1 */}
                <div className="w-16 h-20 bg-[#01255e] rounded-lg border-2 border-[#3e88f7] opacity-60 transform -rotate-12 relative overflow-hidden">
                  <div className="absolute top-2 left-2 right-2 h-8 bg-[#3e88f7] rounded opacity-40"></div>
                  <div className="absolute bottom-2 left-2 right-2 space-y-1">
                    <div className="h-1 bg-[#98bffa] rounded"></div>
                    <div className="h-1 bg-[#98bffa] rounded w-3/4"></div>
                  </div>
                </div>
                {/* Property card 2 */}
                <div className="w-16 h-20 bg-[#01255e] rounded-lg border-2 border-[#3e88f7] transform -rotate-6 relative overflow-hidden">
                  <div className="absolute top-2 left-2 right-2 h-8 bg-[#3e88f7] rounded opacity-40"></div>
                  <div className="absolute bottom-2 left-2 right-2 space-y-1">
                    <div className="h-1 bg-[#98bffa] rounded"></div>
                    <div className="h-1 bg-[#98bffa] rounded w-3/4"></div>
                  </div>
                </div>
                {/* Property card 3 */}
                <div className="w-16 h-20 bg-[#17191f] rounded-lg border-2 border-[#5296f8] transform rotate-3 relative overflow-hidden shadow-lg" style={{ boxShadow: '0 0 15px rgba(62, 136, 247, 0.4)' }}>
                  <div className="absolute top-2 left-2 right-2 h-8 bg-[#3e88f7] rounded opacity-60"></div>
                  <div className="absolute bottom-2 left-2 right-2 space-y-1">
                    <div className="h-1 bg-[#98bffa] rounded"></div>
                    <div className="h-1 bg-[#98bffa] rounded w-3/4"></div>
                  </div>
                </div>
              </div>
              
              <ArrowRight className="w-10 h-10 text-[#3e88f7]" strokeWidth={2.5} />
              
              {/* HostBuddy database */}
              <div className="relative">
                <div className="w-16 h-16 bg-white rounded-xl p-3 flex items-center justify-center shadow-lg" style={{ boxShadow: '0 0 20px rgba(62, 136, 247, 0.3)' }}>
                  <img src={faviconImage} alt="HostBuddy AI" className="w-full h-full object-contain" />
                </div>
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-[#3e88f7] rounded-full flex items-center justify-center">
                  <span className="text-white text-[10px] font-bold">3</span>
                </div>
              </div>
            </div>
          </div>

          {/* Step 3: Test */}
          <div className="bg-[#17191f] border-2 border-[#013280] rounded-2xl p-8 hover:border-[#3e88f7] transition-all cursor-pointer relative shadow-[0_0_20px_rgba(62,136,247,0.15)] hover:shadow-[0_0_30px_rgba(62,136,247,0.3)]">
            <div className="absolute top-6 left-6 text-white text-[72px] leading-none">3</div>
            <div className="absolute top-6 right-6 text-white text-[15px]">Test</div>
            <div className="flex items-center justify-center gap-6 mt-12">
              {/* Chat bubbles with AI */}
              <div className="relative">
                {/* User message */}
                <div className="bg-[#3e88f7] rounded-2xl rounded-br-sm px-4 py-2 mb-2 ml-8 shadow-lg" style={{ boxShadow: '0 0 10px rgba(62, 136, 247, 0.3)' }}>
                  <div className="flex gap-1">
                    <div className="w-1 h-1 bg-white rounded-full"></div>
                    <div className="w-1 h-1 bg-white rounded-full"></div>
                    <div className="w-1 h-1 bg-white rounded-full"></div>
                  </div>
                </div>
                {/* AI response */}
                <div className="bg-[#01255e] rounded-2xl rounded-bl-sm px-4 py-2 mr-8 relative">
                  <div className="flex gap-1">
                    <div className="w-1 h-1 bg-[#98bffa] rounded-full"></div>
                    <div className="w-1 h-1 bg-[#98bffa] rounded-full"></div>
                    <div className="w-1 h-1 bg-[#98bffa] rounded-full"></div>
                  </div>
                  {/* AI badge */}
                  <div className="absolute -left-2 -bottom-2 w-8 h-8 bg-white rounded-full p-1 shadow-lg">
                    <img src={faviconImage} alt="AI" className="w-full h-full object-contain" />
                  </div>
                </div>
              </div>
              
              {/* Testing checklist */}
              <div className="bg-[#17191f] border border-[#3e88f7] rounded-xl p-3 space-y-2 w-32">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-[#3e88f7] rounded flex items-center justify-center">
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path d="M2 5L4 7L8 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div className="h-1 bg-[#3e88f7] rounded flex-1"></div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-[#3e88f7] rounded flex items-center justify-center">
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path d="M2 5L4 7L8 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div className="h-1 bg-[#3e88f7] rounded flex-1"></div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-[#01255e] rounded flex items-center justify-center animate-pulse">
                    <div className="w-1.5 h-1.5 bg-[#98bffa] rounded-full"></div>
                  </div>
                  <div className="h-1 bg-[#01255e] rounded flex-1"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Step 4: Go Live */}
          <div className="bg-[#17191f] border-2 border-[#013280] rounded-2xl p-8 hover:border-[#3e88f7] transition-all cursor-pointer relative shadow-[0_0_20px_rgba(62,136,247,0.15)] hover:shadow-[0_0_30px_rgba(62,136,247,0.3)]">
            <div className="absolute top-6 left-6 text-white text-[72px] leading-none">4</div>
            <div className="absolute top-6 right-6 text-white text-[15px]">Go Live</div>
            <div className="flex items-center justify-center mt-12">
              {/* Simple Rocket Launch */}
              <svg width="120" height="80" viewBox="0 0 120 80" fill="none">
                {/* Rocket body */}
                <path d="M60 15L50 35H70L60 15Z" fill="#3e88f7"/>
                <rect x="50" y="35" width="20" height="25" rx="2" fill="#3e88f7"/>
                {/* Window */}
                <circle cx="60" cy="45" r="4" fill="#98bffa"/>
                {/* Fins */}
                <path d="M50 50L40 65L50 60Z" fill="#01255e"/>
                <path d="M70 50L80 65L70 60Z" fill="#01255e"/>
                {/* Flame */}
                <path d="M55 60L52 70L60 65L68 70L65 60Z" fill="#5296f8" opacity="0.6"/>
                <path d="M57 60L55 68L60 64L65 68L63 60Z" fill="#98bffa" opacity="0.8"/>
                {/* Motion lines */}
                <path d="M20 25L30 25" stroke="#3e88f7" strokeWidth="2" strokeLinecap="round" opacity="0.4"/>
                <path d="M15 35L25 35" stroke="#3e88f7" strokeWidth="2" strokeLinecap="round" opacity="0.4"/>
                <path d="M18 45L28 45" stroke="#3e88f7" strokeWidth="2" strokeLinecap="round" opacity="0.4"/>
                <path d="M90 25L100 25" stroke="#3e88f7" strokeWidth="2" strokeLinecap="round" opacity="0.4"/>
                <path d="M95 35L105 35" stroke="#3e88f7" strokeWidth="2" strokeLinecap="round" opacity="0.4"/>
                <path d="M92 45L102 45" stroke="#3e88f7" strokeWidth="2" strokeLinecap="round" opacity="0.4"/>
              </svg>
            </div>
          </div>
        </div>

        {/* Explore Features Section */}
        <div className="mb-8">
          <h2 className="text-white text-[24px] mb-4">
            Explore <span className="text-[#3e88f7]">HostBuddy's Features</span>
          </h2>
          <p className="text-[#a6a9b2] text-[13px] leading-relaxed max-w-[800px]">
            HostBuddy is packed with features that make it easy for you to automate your short term rental business and drive more revenue. Check them out below.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-2 gap-6">
          {/* Customize HostBuddy's Behavior */}
          <div className="bg-[#17191f] border border-[#013280] rounded-lg p-6 hover:border-[#3e88f7]/50 transition-colors cursor-pointer">
            <div className="flex items-start justify-between mb-3">
              <h3 className="text-[#3e88f7] text-[14px]">Customize HostBuddy's Behavior →</h3>
            </div>
            <p className="text-white text-[13px] leading-relaxed">
              See how HostBuddy can be tailored to suit the needs and circumstances of your business.
            </p>
          </div>

          {/* Get Notified */}
          <div className="bg-[#17191f] border border-[#013280] rounded-lg p-6 hover:border-[#3e88f7]/50 transition-colors cursor-pointer">
            <div className="flex items-start justify-between mb-3">
              <h3 className="text-[#3e88f7] text-[14px]">Get Notified →</h3>
            </div>
            <p className="text-white text-[13px] leading-relaxed">
              HostBuddy intelligently identifies issues and action items, and can notify your team through various channels.
            </p>
          </div>

          {/* Manage Upsells */}
          <div className="bg-[#17191f] border border-[#013280] rounded-lg p-6 hover:border-[#3e88f7]/50 transition-colors cursor-pointer">
            <div className="flex items-start justify-between mb-3">
              <h3 className="text-[#3e88f7] text-[14px]">Manage Upsells →</h3>
            </div>
            <p className="text-white text-[13px] leading-relaxed">
              Leverage HostBuddy's advanced templating system to design messages and automate them with powerful send if/when logic.
            </p>
          </div>

          {/* Leverage Smart Templates */}
          <div className="bg-[#17191f] border border-[#013280] rounded-lg p-6 hover:border-[#3e88f7]/50 transition-colors cursor-pointer">
            <div className="flex items-start justify-between mb-3">
              <h3 className="text-[#3e88f7] text-[14px]">Leverage Smart Templates →</h3>
            </div>
            <p className="text-white text-[13px] leading-relaxed">
              See how HostBuddy can pay for itself by offering your guests amenities, generate upsell revenue at the moment of the booking.
            </p>
          </div>

          {/* Optimize HostBuddy's responses */}
          <div className="bg-[#17191f] border border-[#013280] rounded-lg p-6 hover:border-[#3e88f7]/50 transition-colors cursor-pointer">
            <div className="flex items-start justify-between mb-3">
              <h3 className="text-[#3e88f7] text-[14px]">Optimize HostBuddy's responses →</h3>
            </div>
            <p className="text-white text-[13px] leading-relaxed">
              A quick guide to best practices for streamlining and improving the knowledge base, ensuring every potential issue is covered.
            </p>
          </div>

          {/* More coming soon */}
          <div className="bg-[#17191f] border border-[#013280] rounded-lg p-6 opacity-50">
            <div className="flex items-center justify-center h-full">
              <h3 className="text-[#a6a9b2] text-[14px]">More coming soon!</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
