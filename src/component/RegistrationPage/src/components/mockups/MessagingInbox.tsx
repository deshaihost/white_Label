import { MessageCircle, Search, Filter, MoreVertical, Send, Paperclip, Smile, Star, Archive, Clock } from 'lucide-react';
import { Badge } from '../ui/badge';

export function MessagingInbox() {
  return (
    <div className="bg-slate-800/50 rounded-lg border border-slate-700 overflow-hidden">
      <div className="bg-green-600/10 border-b border-green-500/20 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <MessageCircle className="w-5 h-5 text-green-400" />
          <h3 className="text-white">5. Messaging Inbox Page</h3>
        </div>
        <Badge variant="outline" className="bg-green-500/10 text-green-400 border-green-500/20">
          V1
        </Badge>
      </div>

      <div className="p-6">
        <p className="text-slate-400 mb-6">
          Unified guest communication hub with all HostBuddy messaging features. Partner logo displayed in header.
        </p>

        {/* Mock Browser Window */}
        <div className="bg-slate-950 rounded-lg border border-slate-800 overflow-hidden shadow-2xl">
          {/* Mock Header - Branded */}
          <div className="bg-gradient-to-r from-blue-600 to-cyan-600 px-6 py-3 flex items-center justify-between border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-white rounded-lg flex items-center justify-center shadow-lg">
                <span className="text-blue-600 font-bold">AR</span>
              </div>
              <div>
                <span className="text-white">Acme Rentals</span>
                <p className="text-blue-100 text-xs">AI-Powered Guest Messaging</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <nav className="flex items-center gap-1">
                <button className="px-3 py-2 text-blue-100 hover:text-white hover:bg-white/10 rounded-lg text-sm transition-colors">Properties</button>
                <button className="px-3 py-2 text-white bg-white/20 rounded-lg text-sm">Messages</button>
                <button className="px-3 py-2 text-blue-100 hover:text-white hover:bg-white/10 rounded-lg text-sm transition-colors">Templates</button>
              </nav>
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-white text-sm">JS</span>
              </div>
            </div>
          </div>

          {/* Page Content */}
          <div className="bg-slate-900">
            {/* Page Header */}
            <div className="px-6 py-4 border-b border-slate-800">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                  <h1 className="text-white text-2xl">Messages</h1>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-blue-500/10 text-blue-400 border-blue-500/20">
                      12 Active
                    </Badge>
                    <Badge className="bg-purple-500/10 text-purple-400 border-purple-500/20">
                      8 AI Handling
                    </Badge>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <select className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-300 text-sm focus:outline-none focus:border-blue-500">
                    <option>All Properties</option>
                    <option>Sunset Beach Villa</option>
                    <option>Mountain View Retreat</option>
                  </select>
                  <button className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-sm flex items-center gap-2 border border-slate-700 transition-colors">
                    <Filter className="w-4 h-4" />
                    Filters
                  </button>
                </div>
              </div>
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500" />
                <input
                  type="text"
                  placeholder="Search conversations by guest name, property, or message content..."
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg pl-10 pr-4 py-2.5 text-slate-300 placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>
            </div>

            {/* Inbox Layout */}
            <div className="grid grid-cols-12 h-[600px]">
              {/* Conversations Sidebar */}
              <div className="col-span-4 border-r border-slate-800 overflow-y-auto">
                {/* Filter Tabs */}
                <div className="flex border-b border-slate-800 bg-slate-900/50">
                  <button className="flex-1 px-4 py-3 text-sm text-white border-b-2 border-blue-500">
                    All <span className="ml-1 text-slate-400">(12)</span>
                  </button>
                  <button className="flex-1 px-4 py-3 text-sm text-slate-400 hover:text-white transition-colors">
                    Unread <span className="ml-1">(5)</span>
                  </button>
                  <button className="flex-1 px-4 py-3 text-sm text-slate-400 hover:text-white transition-colors">
                    Starred <span className="ml-1">(3)</span>
                  </button>
                </div>

                {/* Conversation List */}
                <div className="divide-y divide-slate-800">
                  {[
                    { 
                      guest: 'Sarah Johnson', 
                      property: 'Sunset Beach Villa', 
                      preview: 'Perfect! Thank you so much for the quick response 😊', 
                      time: '2m ago', 
                      unread: true, 
                      aiHandled: true,
                      avatar: 'SJ',
                      status: 'Check-in Today'
                    },
                    { 
                      guest: 'Mike Chen', 
                      property: 'Mountain View Retreat', 
                      preview: 'Is there parking available at the property?', 
                      time: '18m ago', 
                      unread: true, 
                      aiHandled: true,
                      avatar: 'MC',
                      status: 'Arriving Tomorrow'
                    },
                    { 
                      guest: 'Emma Davis', 
                      property: 'Downtown Loft', 
                      preview: 'We absolutely loved our stay! The place was spotless and the location...', 
                      time: '1h ago', 
                      unread: false, 
                      aiHandled: false,
                      avatar: 'ED',
                      status: 'Checked Out'
                    },
                    { 
                      guest: 'Alex Torres', 
                      property: 'Lakeside Cabin', 
                      preview: 'Would it be possible to check in a few hours early?', 
                      time: '2h ago', 
                      unread: false, 
                      aiHandled: true,
                      avatar: 'AT',
                      status: 'Arriving in 3 days'
                    },
                    { 
                      guest: 'Lisa Wang', 
                      property: 'Sunset Beach Villa', 
                      preview: 'The WiFi password is not working. Could you help?', 
                      time: '3h ago', 
                      unread: false, 
                      aiHandled: false,
                      avatar: 'LW',
                      status: 'Currently Staying'
                    },
                    { 
                      guest: 'David Kim', 
                      property: 'Desert Oasis', 
                      preview: 'Just wanted to confirm - check-in is at 3pm, correct?', 
                      time: '5h ago', 
                      unread: false, 
                      aiHandled: true,
                      avatar: 'DK',
                      status: 'Arriving Next Week'
                    },
                  ].map((convo, i) => (
                    <div
                      key={i}
                      className={`p-4 cursor-pointer transition-all hover:bg-slate-800/50 ${
                        i === 0 ? 'bg-blue-600/5 border-l-2 border-l-blue-500' : ''
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white text-sm flex-shrink-0">
                          {convo.avatar}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <div className="flex items-center gap-2">
                              <p className={`text-sm truncate ${convo.unread ? 'text-white' : 'text-slate-300'}`}>
                                {convo.guest}
                              </p>
                              {convo.aiHandled && (
                                <Badge className="bg-purple-500/10 text-purple-400 border-purple-500/20 text-xs px-1.5 py-0">
                                  AI
                                </Badge>
                              )}
                            </div>
                            <span className="text-slate-500 text-xs flex-shrink-0 ml-2">{convo.time}</span>
                          </div>
                          <p className="text-slate-500 text-xs mb-2">{convo.property}</p>
                          <p className={`text-sm truncate ${convo.unread ? 'text-slate-300' : 'text-slate-500'}`}>
                            {convo.preview}
                          </p>
                          <div className="flex items-center gap-2 mt-2">
                            <Badge variant="outline" className="bg-slate-800/50 text-slate-400 border-slate-700 text-xs">
                              <Clock className="w-3 h-3 mr-1" />
                              {convo.status}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Message Thread */}
              <div className="col-span-8 flex flex-col">
                {/* Thread Header */}
                <div className="px-6 py-4 border-b border-slate-800 bg-slate-900/50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white">
                        SJ
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="text-white">Sarah Johnson</p>
                          <Badge className="bg-purple-500/10 text-purple-400 border-purple-500/20 text-xs">
                            AI Active
                          </Badge>
                        </div>
                        <div className="flex items-center gap-3 mt-1">
                          <p className="text-slate-400 text-sm">Sunset Beach Villa</p>
                          <span className="text-slate-600">•</span>
                          <p className="text-slate-400 text-sm">Check-in: Dec 15, 2024</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="p-2 hover:bg-slate-800 rounded-lg transition-colors" title="Star conversation">
                        <Star className="w-4 h-4 text-slate-400" />
                      </button>
                      <button className="p-2 hover:bg-slate-800 rounded-lg transition-colors" title="Archive">
                        <Archive className="w-4 h-4 text-slate-400" />
                      </button>
                      <button className="p-2 hover:bg-slate-800 rounded-lg transition-colors" title="More options">
                        <MoreVertical className="w-4 h-4 text-slate-400" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Messages Area */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-900/30">
                  {/* Guest Message */}
                  <div className="flex justify-start items-start gap-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white text-sm flex-shrink-0">
                      SJ
                    </div>
                    <div className="max-w-[65%]">
                      <div className="bg-slate-800 rounded-lg rounded-tl-none px-4 py-3 border border-slate-700">
                        <p className="text-slate-200">Hi! I just booked Sunset Beach Villa for next weekend. Looking forward to it! 🌊</p>
                      </div>
                      <p className="text-slate-500 text-xs mt-1.5 ml-1">Sarah • 10:32 AM</p>
                    </div>
                  </div>

                  {/* AI Response */}
                  <div className="flex justify-end items-start gap-3">
                    <div className="max-w-[65%]">
                      <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg rounded-tr-none px-4 py-3 border border-blue-500/20">
                        <p className="text-white">Hi Sarah! We're thrilled to host you at Sunset Beach Villa. You're all set for December 15-17. The property has stunning ocean views and you'll love the direct beach access. If you have any questions before your arrival, feel free to ask!</p>
                      </div>
                      <div className="flex items-center justify-end gap-2 mt-1.5 mr-1">
                        <Badge className="bg-purple-500/10 text-purple-400 border-purple-500/20 text-xs px-2">
                          AI Response
                        </Badge>
                        <p className="text-slate-500 text-xs">10:33 AM</p>
                      </div>
                    </div>
                    <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm flex-shrink-0">
                      AI
                    </div>
                  </div>

                  {/* Guest Message */}
                  <div className="flex justify-start items-start gap-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white text-sm flex-shrink-0">
                      SJ
                    </div>
                    <div className="max-w-[65%]">
                      <div className="bg-slate-800 rounded-lg rounded-tl-none px-4 py-3 border border-slate-700">
                        <p className="text-slate-200">Thank you! What time is check-in and is there parking?</p>
                      </div>
                      <p className="text-slate-500 text-xs mt-1.5 ml-1">Sarah • 10:45 AM</p>
                    </div>
                  </div>

                  {/* AI Response */}
                  <div className="flex justify-end items-start gap-3">
                    <div className="max-w-[65%]">
                      <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg rounded-tr-none px-4 py-3 border border-blue-500/20">
                        <p className="text-white">Check-in is at 3:00 PM and checkout is at 11:00 AM. There's free private parking available right in front of the property - space for 2 vehicles. The gate code is included in your check-in instructions which will be sent 24 hours before arrival. 🚗</p>
                      </div>
                      <div className="flex items-center justify-end gap-2 mt-1.5 mr-1">
                        <Badge className="bg-purple-500/10 text-purple-400 border-purple-500/20 text-xs px-2">
                          AI Response
                        </Badge>
                        <p className="text-slate-500 text-xs">10:46 AM</p>
                      </div>
                    </div>
                    <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm flex-shrink-0">
                      AI
                    </div>
                  </div>

                  {/* Guest Message */}
                  <div className="flex justify-start items-start gap-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white text-sm flex-shrink-0">
                      SJ
                    </div>
                    <div className="max-w-[65%]">
                      <div className="bg-slate-800 rounded-lg rounded-tl-none px-4 py-3 border border-slate-700">
                        <p className="text-slate-200">Perfect! Thank you so much for the quick response 😊</p>
                      </div>
                      <p className="text-slate-500 text-xs mt-1.5 ml-1">Sarah • 10:47 AM</p>
                    </div>
                  </div>

                  {/* AI Typing Indicator */}
                  <div className="flex justify-end items-start gap-3">
                    <div className="max-w-[65%]">
                      <div className="flex items-center gap-2 bg-blue-600/10 rounded-lg rounded-tr-none px-4 py-3 border border-blue-500/20">
                        <div className="flex gap-1">
                          <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                        <span className="text-blue-400 text-sm">AI is typing...</span>
                      </div>
                    </div>
                    <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm flex-shrink-0">
                      AI
                    </div>
                  </div>
                </div>

                {/* Reply Box */}
                <div className="p-4 border-t border-slate-800 bg-slate-900/50">
                  <div className="bg-slate-800 rounded-lg border border-slate-700 focus-within:border-blue-500 transition-colors">
                    <textarea 
                      className="w-full bg-transparent px-4 py-3 text-slate-300 placeholder-slate-500 resize-none focus:outline-none"
                      rows={2}
                      placeholder="Type a message or let AI respond automatically..."
                    />
                    <div className="px-4 pb-3 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <button className="p-2 hover:bg-slate-700 rounded-lg transition-colors" title="Attach file">
                          <Paperclip className="w-4 h-4 text-slate-400" />
                        </button>
                        <button className="p-2 hover:bg-slate-700 rounded-lg transition-colors" title="Add emoji">
                          <Smile className="w-4 h-4 text-slate-400" />
                        </button>
                        <div className="h-4 w-px bg-slate-700 mx-1"></div>
                        <label className="flex items-center gap-2 text-sm text-slate-400 cursor-pointer hover:text-slate-300 transition-colors">
                          <input type="checkbox" defaultChecked className="w-4 h-4 rounded border-slate-600 bg-slate-800 checked:bg-purple-600 checked:border-purple-600" />
                          <span>Let AI handle</span>
                        </label>
                      </div>
                      <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center gap-2 transition-colors">
                        <Send className="w-4 h-4" />
                        Send
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-3 gap-4 text-sm">
          <div className="flex items-center gap-2 text-slate-400">
            <Badge className="bg-purple-500/10 text-purple-400 border-purple-500/20 text-xs">AI</Badge>
            <span>AI-handled conversations with automatic responses</span>
          </div>
          <div className="flex items-center gap-2 text-slate-400">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span>Selected conversation thread</span>
          </div>
          <div className="flex items-center gap-2 text-slate-400">
            <Filter className="w-4 h-4" />
            <span>Filter by property, channel, reservation stage</span>
          </div>
        </div>
      </div>
    </div>
  );
}
