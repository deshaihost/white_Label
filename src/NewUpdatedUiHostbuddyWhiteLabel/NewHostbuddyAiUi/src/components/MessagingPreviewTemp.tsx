import { Search, Star, Home, ThumbsUp, ThumbsDown, Smile } from 'lucide-react';

interface BrandColors {
  [key: string]: string;
}

export function MessagingPreview({ brandColors }: { brandColors: BrandColors }) {
  const conversations = [
    {
      name: 'Brolin Cox',
      message: 'Hi Brolin, welcome to Hidden Haven...',
      timestamp: '10/17 4:32 PM',
      dateRange: 'Oct 17 - 19',
      property: 'Chalcedony',
      status: 'Guest',
      checkIn: 'Check-in today',
      platform: '🟠',
      starred: true,
      unread: 0,
      urgent: true,
      image: 'https://images.unsplash.com/photo-1667584523543-d1d9cc828a15?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBsaXZpbmclMjByb29tJTIwaW50ZXJpb3J8ZW58MXx8fHwxNzYwNzA2Mjg5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    {
      name: 'Hallie Swartzbaeker',
      message: 'Of course! The entrance to th...',
      timestamp: '10/17 4:59 PM',
      dateRange: 'Oct 17 - 20',
      property: '831 A',
      status: 'Guest',
      checkIn: 'Check-in today',
      platform: '🔵',
      unread: 18,
      image: 'https://images.unsplash.com/photo-1742039953129-e4edcc82d319?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBiZWRyb29tJTIwaG90ZWx8ZW58MXx8fHwxNzYwNzE4MTE5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    {
      name: 'Unknown Contact...',
      message: 'Kindly return the key in the lo...',
      timestamp: '10/17 4:47 PM',
      dateRange: 'External Contact',
      property: '',
      status: 'Guest',
      platform: '🟠',
      starred: true,
      unread: 1,
      image: 'https://images.unsplash.com/photo-1623300025008-ccbe3e8501aa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcGFydG1lbnQlMjBlbnRyYW5jZXxlbnwxfHx8fDE3NjA3NDYxMjh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    {
      name: 'Tiana Narruhn',
      message: 'Rental Agreement for Dapper ...',
      timestamp: '10/17 4:45 PM',
      dateRange: 'Oct 21 - 23',
      property: '831 D',
      status: 'Guest',
      futureStatus: 'Future',
      platform: '🔵',
      unread: 3,
      image: 'https://images.unsplash.com/photo-1601019404210-8bb5dd3ab015?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWFjaCUyMGhvdXNlJTIwdmFjYXRpb258ZW58MXx8fHwxNzYwNjY4ODQ2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    {
      name: 'David Blackwell',
      message: 'Hi David, welcome to San Dieg...',
      timestamp: '10/17 4:32 PM',
      dateRange: 'Oct 17 - 20',
      property: 'Leo 604',
      status: 'Guest',
      checkIn: 'Check-in today',
      platform: '🔵',
      unread: 2,
      image: 'https://images.unsplash.com/photo-1667584523543-d1d9cc828a15?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBsaXZpbmclMjByb29tJTIwaW50ZXJpb3J8ZW58MXx8fHwxNzYwNzA2Mjg5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    {
      name: 'Amariea Robinson',
      message: 'Hi Amariea! Thank you so muc...',
      timestamp: '10/17 4:32 PM',
      dateRange: 'Oct 20 - 24',
      property: '1811 Adams - 7',
      status: 'Guest',
      futureStatus: 'Future',
      platform: '🔵',
      unread: 1,
      image: 'https://images.unsplash.com/photo-1742039953129-e4edcc82d319?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBiZWRyb29tJTIwaG90ZWx8ZW58MXx8fHwxNzYwNzE4MTE5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    }
  ];

  return (
    <div className="flex gap-0 -m-8 h-[calc(100vh-200px)]">
      {/* Conversations List */}
      <div className="w-[360px] border-r-2" style={{ borderColor: '#013280', backgroundColor: '#17191F' }}>
        {/* Header */}
        <div className="p-4 border-b" style={{ borderColor: '#013280' }}>
          <h2 className="text-[20px] font-['DM_Sans:SemiBold',_sans-serif] mb-3" style={{ fontVariationSettings: "'opsz' 14", color: '#FFFFFF' }}>
            Inbox
          </h2>
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#676a73]" />
              <input
                type="text"
                placeholder="Search by guest name or p..."
                className="w-full h-[40px] rounded-[6px] pl-9 pr-3 text-[14px] font-['DM_Sans:Regular',_sans-serif] border"
                style={{ 
                  fontVariationSettings: "'opsz' 14",
                  backgroundColor: '#0F1117',
                  borderColor: '#013280',
                  color: '#d0d3db'
                }}
              />
            </div>
            <button 
              className="px-3 h-[40px] rounded-[6px] flex items-center gap-1.5 text-[14px] font-['DM_Sans:SemiBold',_sans-serif]"
              style={{ 
                fontVariationSettings: "'opsz' 14",
                backgroundColor: '#3e88f7',
                color: '#FFFFFF'
              }}
            >
              <span className="text-[14px]">≡</span> Filters
            </button>
          </div>
        </div>

        {/* Conversations */}
        <div className="overflow-y-auto">
          {conversations.map((conv, idx) => (
            <div
              key={idx}
              className="p-3 border-b cursor-pointer transition-colors relative"
              style={{ 
                borderColor: '#013280',
                backgroundColor: idx === 0 ? '#01255e' : 'transparent'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#01255e'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = idx === 0 ? '#01255e' : 'transparent'}
            >
              {/* Star indicator */}
              {conv.starred && (
                <div className="absolute top-3 left-3 z-10">
                  <div className="w-5 h-5 rounded-full flex items-center justify-center" style={{ backgroundColor: '#f97316' }}>
                    <Star className="w-3 h-3 text-white fill-white" />
                  </div>
                </div>
              )}
              
              <div className="flex gap-3">
                {/* Property Image */}
                <img 
                  src={conv.image} 
                  alt={conv.property}
                  className="w-[80px] h-[60px] rounded object-cover flex-shrink-0"
                />
                
                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start mb-1">
                    <div className="flex items-center gap-2">
                      <p className="text-[14px] font-['DM_Sans:SemiBold',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14", color: '#FFFFFF' }}>
                        {conv.name}
                      </p>
                    </div>
                    <span className="text-[11px] font-['DM_Sans:Regular',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14", color: '#a6a9b2' }}>
                      {conv.timestamp}
                    </span>
                  </div>
                  
                  <p className="text-[13px] font-['DM_Sans:Regular',_sans-serif] truncate mb-2" style={{ fontVariationSettings: "'opsz' 14", color: '#a6a9b2' }}>
                    {conv.message}
                  </p>
                  
                  <div className="flex items-center gap-2 text-[12px] font-['DM_Sans:Regular',_sans-serif] mb-2" style={{ fontVariationSettings: "'opsz' 14", color: '#676a73' }}>
                    <span>{conv.dateRange}</span>
                    {conv.property && <span>{conv.property}</span>}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="px-2 py-0.5 rounded text-[11px] font-['DM_Sans:SemiBold',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14", backgroundColor: 'rgba(189, 193, 201, 0.08)', color: '#a6a9b2' }}>
                        {conv.status}
                      </span>
                      {conv.checkIn && (
                        <span className="px-2 py-0.5 rounded text-[11px] font-['DM_Sans:SemiBold',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14", backgroundColor: '#7C3AED', color: '#FFFFFF' }}>
                          {conv.checkIn}
                        </span>
                      )}
                      {conv.futureStatus && (
                        <span className="px-2 py-0.5 rounded text-[11px] font-['DM_Sans:SemiBold',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14", backgroundColor: '#3e88f7', color: '#001330' }}>
                          {conv.futureStatus}
                        </span>
                      )}
                      <span className="text-[14px]">{conv.platform}</span>
                    </div>
                    {conv.unread > 0 && (
                      <span className="w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-['DM_Sans:SemiBold',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14", backgroundColor: '#3e88f7', color: '#001330' }}>
                        {conv.unread}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Conversation View */}
      <div className="flex-1 flex flex-col" style={{ backgroundColor: '#0F1117' }}>
        {/* Header */}
        <div className="px-6 py-3 border-b flex items-center justify-between" style={{ borderColor: '#013280' }}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-[6px] flex items-center justify-center text-[16px] font-['DM_Sans:Bold',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14", backgroundColor: '#3e88f7', color: '#FFFFFF' }}>
              B
            </div>
            <div className="flex items-center gap-2">
              <h3 className="text-[18px] font-['DM_Sans:SemiBold',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14", color: '#FFFFFF' }}>
                Brolin Cox
              </h3>
              <span className="px-2 py-1 rounded text-[11px] font-['DM_Sans:SemiBold',_sans-serif] flex items-center gap-1" style={{ fontVariationSettings: "'opsz' 14", backgroundColor: '#FF4D00', color: '#FFFFFF' }}>
                🟠 Urgent
              </span>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Star className="w-5 h-5" style={{ color: '#FF6B2C', fill: '#FF6B2C' }} />
            
            {[
              { icon: '💬', label: 'PMS' },
              { icon: '💬', label: 'WhatsApp' },
              { icon: '📞', label: 'OpenPhone' },
              { icon: '❗', label: 'Open Issue', badge: '1' },
              { icon: '📝', label: 'Notes' }
            ].map((btn, i) => (
              <button 
                key={i}
                className="px-3 py-2 rounded-[6px] border text-[13px] font-['DM_Sans:Medium',_sans-serif] flex items-center gap-2"
                style={{ 
                  fontVariationSettings: "'opsz' 14",
                  borderColor: '#013280',
                  backgroundColor: 'transparent',
                  color: '#a6a9b2'
                }}
              >
                <span className="text-[12px]">{btn.icon}</span>
                {btn.label}
                {btn.badge && (
                  <span className="w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-['DM_Sans:SemiBold',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14", backgroundColor: '#3e88f7', color: '#001330' }}>
                    {btn.badge}
                  </span>
                )}
              </button>
            ))}
            
            <button 
              className="px-4 py-2 rounded-[6px] text-[13px] font-['DM_Sans:SemiBold',_sans-serif]"
              style={{ 
                fontVariationSettings: "'opsz' 14",
                backgroundColor: '#3e88f7',
                color: '#FFFFFF',
                boxShadow: '0 0 20px rgba(62, 136, 247, 0.3)'
              }}
            >
              📋 Details
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 px-6 py-6 space-y-4 overflow-y-auto">
          {[
            { sender: 'host', text: 'Hi Brolin, Have you access Code to location. UUUUUUL', time: 'Host 3:12 PM', avatar: '🔒' },
            { sender: 'host', text: 'You can check in now unit is ready. Thank you!', time: 'Host 3:12 PM' },
            { sender: 'guest', text: 'Awesome. Thank you we are about 15 minutes away! I appreciate it', time: 'Brolin Cox 3:20 PM' },
            { sender: 'host', text: "That's great to hear! Safe travels for the last stretch of your drive. We hope you have a fantastic stay!", time: 'HostBuddy 3:23 PM', hostBuddy: true },
            { sender: 'host', text: 'Hi Brolin, welcome to Hidden Haven! I hope you and your group are settling in comfortably after your early arrival. If you need anything at all during your stay, just let us know. Enjoy your time in San Diego!', time: 'HostBuddy 4:32 PM', hostBuddy: true }
          ].map((msg, idx) => (
            <div key={idx}>
              {msg.sender === 'guest' ? (
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: '#3e88f7' }}>
                    <span className="text-white text-[14px] font-['DM_Sans:SemiBold',_sans-serif]">B</span>
                  </div>
                  <div className="flex-1">
                    <div className="max-w-[80%] px-4 py-3 rounded-xl mb-1" style={{ backgroundColor: '#24262E', border: '1px solid #013280' }}>
                      <p className="text-[14px] font-['DM_Sans:Regular',_sans-serif] leading-relaxed" style={{ fontVariationSettings: "'opsz' 14", color: '#d0d3db' }}>
                        {msg.text}
                      </p>
                    </div>
                    <span className="text-[11px] font-['DM_Sans:Regular',_sans-serif] px-1" style={{ fontVariationSettings: "'opsz' 14", color: '#676a73' }}>
                      {msg.time}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-end">
                  <div className="max-w-[80%] px-4 py-3 rounded-xl mb-1" style={{ backgroundColor: '#24262E' }}>
                    <p className="text-[14px] font-['DM_Sans:Regular',_sans-serif] leading-relaxed" style={{ fontVariationSettings: "'opsz' 14", color: '#d0d3db' }}>
                      {msg.text}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 px-1">
                    {msg.hostBuddy && (
                      <div className="flex items-center gap-2">
                        <Home className="w-4 h-4" style={{ color: '#3e88f7', fill: '#3e88f7' }} />
                        <span className="text-[11px] font-['DM_Sans:Regular',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14", color: '#676a73' }}>
                          {msg.time}
                        </span>
                      </div>
                    )}
                    {!msg.hostBuddy && (
                      <span className="text-[11px] font-['DM_Sans:Regular',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14", color: '#676a73' }}>
                        {msg.time}
                      </span>
                    )}
                    <button style={{ color: '#676a73' }}><ThumbsUp className="w-3.5 h-3.5" /></button>
                    <button style={{ color: '#676a73' }}><ThumbsDown className="w-3.5 h-3.5" /></button>
                    <button style={{ color: '#676a73' }}><Smile className="w-3.5 h-3.5" /></button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Input Area */}
        <div className="px-6 py-4 border-t" style={{ borderColor: '#013280' }}>
          <div className="flex gap-3 mb-2">
            <input 
              type="text"
              placeholder="Message..."
              className="flex-1 px-4 py-3 rounded-[8px] border text-[14px] font-['DM_Sans:Regular',_sans-serif]"
              style={{ 
                fontVariationSettings: "'opsz' 14",
                backgroundColor: '#17191F',
                borderColor: '#013280',
                color: '#d0d3db'
              }}
            />
            <button 
              className="px-6 py-3 rounded-[8px] text-[14px] font-['DM_Sans:SemiBold',_sans-serif]"
              style={{ 
                fontVariationSettings: "'opsz' 14",
                backgroundColor: '#3e88f7',
                color: '#FFFFFF'
              }}
            >
              Send →
            </button>
          </div>
          <button className="flex items-center gap-2 text-[13px] font-['DM_Sans:Medium',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14", color: '#a6a9b2' }}>
            <span className="text-[16px]">✨</span> AI Response <span className="text-[10px]">▼</span>
          </button>
        </div>
      </div>
    </div>
  );
}
