import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from 'recharts';
import { Check } from 'lucide-react';
import dateRangeImage from 'figma:asset/82cd39ba88c072b0517c12828d2ea275b8c2b680.png';

const messagingTimingData = [
  { hour: '12am', value: 5 },
  { hour: '1am', value: 3 },
  { hour: '2am', value: 2 },
  { hour: '3am', value: 1 },
  { hour: '4am', value: 2 },
  { hour: '5am', value: 8 },
  { hour: '6am', value: 15 },
  { hour: '7am', value: 25 },
  { hour: '8am', value: 42 },
  { hour: '9am', value: 38 },
  { hour: '10am', value: 28 },
  { hour: '11am', value: 35 },
  { hour: '12pm', value: 45 },
  { hour: '1pm', value: 38 },
  { hour: '2pm', value: 32 },
  { hour: '3pm', value: 28 },
  { hour: '4pm', value: 35 },
  { hour: '5pm', value: 48 },
  { hour: '6pm', value: 40 },
  { hour: '7pm', value: 35 },
  { hour: '8pm', value: 28 },
  { hour: '9pm', value: 22 },
  { hour: '10pm', value: 18 },
  { hour: '11pm', value: 12 },
];

const actionItemsReceivedData = [
  { date: '10/1', value: 8 },
  { date: '10/2', value: 0 },
  { date: '10/3', value: 0 },
  { date: '10/4', value: 9 },
  { date: '10/5', value: 0 },
  { date: '10/6', value: 0 },
  { date: '10/7', value: 0 },
  { date: '10/8', value: 11 },
  { date: '10/9', value: 12 },
  { date: '10/10', value: 0 },
  { date: '10/11', value: 0 },
  { date: '10/12', value: 0 },
  { date: '10/13', value: 16 },
  { date: '10/14', value: 18 },
  { date: '10/15', value: 0 },
  { date: '10/16', value: 0 },
  { date: '10/17', value: 19 },
  { date: '10/18', value: 0 },
  { date: '10/19', value: 0 },
  { date: '10/20', value: 21 },
  { date: '10/21', value: 0 },
  { date: '10/22', value: 0 },
];

export default function Insights() {
  const [dateRange, setDateRange] = useState('Sept 9, 2025 to Oct 12, 2025');
  const [showDateModal, setShowDateModal] = useState(false);
  
  // Metric card states
  const [messagesSentView, setMessagesSentView] = useState<'total' | 'percent'>('total');
  const [messagesRespondedView, setMessagesRespondedView] = useState<'total' | 'percent'>('total');
  const [sentimentFilter, setSentimentFilter] = useState('All');
  const [showMessagesSentMenu, setShowMessagesSentMenu] = useState(false);
  const [showMessagesRespondedMenu, setShowMessagesRespondedMenu] = useState(false);
  const [showSentimentMenu, setShowSentimentMenu] = useState(false);
  
  // Chart states
  const [timingView, setTimingView] = useState('Total');
  const [showTimingMenu, setShowTimingMenu] = useState(false);
  const [actionItemsCategory, setActionItemsCategory] = useState('All Categories');
  const [actionItemsReceivedCategory, setActionItemsReceivedCategory] = useState('All Categories');
  const [showActionItemsCategoryMenu, setShowActionItemsCategoryMenu] = useState(false);
  const [showActionItemsReceivedCategoryMenu, setShowActionItemsReceivedCategoryMenu] = useState(false);

  return (
    <div className="h-screen bg-[#0F1117] overflow-y-auto">
      <div className="max-w-[1400px] mx-auto px-12 py-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-white text-[40px] font-['DM_Sans:Bold',_sans-serif] mb-2" style={{ fontVariationSettings: "'opsz' 14" }}>
              Business Insights
            </h1>
            <p className="text-[#a6a9b2] text-[16px] font-['DM_Sans:Regular',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
              On Dashboard
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setShowDateModal(true)}
              className="px-6 py-2.5 bg-[#0F1117] border border-[#013280] rounded-lg text-white text-[15px] font-['DM_Sans:SemiBold',_sans-serif] hover:bg-[#0F1117] transition-colors flex items-center gap-2"
            >
              <span style={{ fontVariationSettings: "'opsz' 14" }}>Adjust Dates</span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 6L8 10L12 6" stroke="#a6a9b2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-[#013280] mb-10"></div>

        {/* Messaging Section */}
        <div className="mb-10">
          <h2 className="text-white text-[28px] font-['DM_Sans:Bold',_sans-serif] mb-6" style={{ fontVariationSettings: "'opsz' 14" }}>
            Messaging
          </h2>

          {/* Metrics Cards */}
          <div className="grid grid-cols-4 gap-5 mb-8">
            {/* Messages Sent Card */}
            <div className="bg-[#0F1117] border-2 border-[#013280] rounded-xl p-6 relative" style={{ boxShadow: '0 0 25px rgba(1, 50, 128, 0.2)' }}>
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-[#a6a9b2] text-[14px] font-['DM_Sans:SemiBold',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
                  Messages Sent ({messagesSentView === 'total' ? 'Total' : 'Percent'})
                </h3>
                <div className="relative">
                  <button 
                    onClick={() => setShowMessagesSentMenu(!showMessagesSentMenu)}
                    className="text-[#a6a9b2] hover:text-white"
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <circle cx="8" cy="8" r="1.5" fill="currentColor"/>
                      <circle cx="8" cy="3" r="1.5" fill="currentColor"/>
                      <circle cx="8" cy="13" r="1.5" fill="currentColor"/>
                    </svg>
                  </button>
                  {showMessagesSentMenu && (
                    <div className="absolute right-0 top-6 w-[180px] bg-[#0F1117] border-2 border-[#013280] rounded-lg overflow-hidden z-50" style={{ boxShadow: '0 0 30px rgba(1, 50, 128, 0.3)' }}>
                      <button
                        onClick={() => { setMessagesSentView('total'); setShowMessagesSentMenu(false); }}
                        className="w-full px-4 py-2.5 text-left text-white text-[14px] font-['DM_Sans:Regular',_sans-serif] hover:bg-[#01255e] transition-colors flex items-center justify-between"
                        style={{ fontVariationSettings: "'opsz' 14" }}
                      >
                        <span>Show Total</span>
                        {messagesSentView === 'total' && <Check className="w-4 h-4 text-[#3e88f7]" />}
                      </button>
                      <button
                        onClick={() => { setMessagesSentView('percent'); setShowMessagesSentMenu(false); }}
                        className="w-full px-4 py-2.5 text-left text-white text-[14px] font-['DM_Sans:Regular',_sans-serif] hover:bg-[#01255e] transition-colors flex items-center justify-between"
                        style={{ fontVariationSettings: "'opsz' 14" }}
                      >
                        <span>Show Percent</span>
                        {messagesSentView === 'percent' && <Check className="w-4 h-4 text-[#3e88f7]" />}
                      </button>
                    </div>
                  )}
                </div>
              </div>
              <p className="text-white text-[36px] font-['DM_Sans:Bold',_sans-serif] mb-4" style={{ fontVariationSettings: "'opsz' 14" }}>
                {messagesSentView === 'total' ? '170' : '100%'}
              </p>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[#a6a9b2] text-[13px] font-['DM_Sans:Regular',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>By HostBuddy:</span>
                  <span className="text-white text-[13px] font-['DM_Sans:SemiBold',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
                    {messagesSentView === 'total' ? '136' : '80%'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#a6a9b2] text-[13px] font-['DM_Sans:Regular',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>By Host:</span>
                  <span className="text-white text-[13px] font-['DM_Sans:SemiBold',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
                    {messagesSentView === 'total' ? '34' : '20%'}
                  </span>
                </div>
              </div>
            </div>

            {/* Guest Messages Responded Card */}
            <div className="bg-[#0F1117] border-2 border-[#013280] rounded-xl p-6 relative" style={{ boxShadow: '0 0 25px rgba(1, 50, 128, 0.2)' }}>
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-[#a6a9b2] text-[14px] font-['DM_Sans:SemiBold',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
                  Guest Messages Responded ({messagesRespondedView === 'total' ? 'Total' : 'Percent'})
                </h3>
                <div className="relative">
                  <button 
                    onClick={() => setShowMessagesRespondedMenu(!showMessagesRespondedMenu)}
                    className="text-[#a6a9b2] hover:text-white"
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <circle cx="8" cy="8" r="1.5" fill="currentColor"/>
                      <circle cx="8" cy="3" r="1.5" fill="currentColor"/>
                      <circle cx="8" cy="13" r="1.5" fill="currentColor"/>
                    </svg>
                  </button>
                  {showMessagesRespondedMenu && (
                    <div className="absolute right-0 top-6 w-[180px] bg-[#0F1117] border-2 border-[#013280] rounded-lg overflow-hidden z-50" style={{ boxShadow: '0 0 30px rgba(1, 50, 128, 0.3)' }}>
                      <button
                        onClick={() => { setMessagesRespondedView('total'); setShowMessagesRespondedMenu(false); }}
                        className="w-full px-4 py-2.5 text-left text-white text-[14px] font-['DM_Sans:Regular',_sans-serif] hover:bg-[#01255e] transition-colors flex items-center justify-between"
                        style={{ fontVariationSettings: "'opsz' 14" }}
                      >
                        <span>Show Total</span>
                        {messagesRespondedView === 'total' && <Check className="w-4 h-4 text-[#3e88f7]" />}
                      </button>
                      <button
                        onClick={() => { setMessagesRespondedView('percent'); setShowMessagesRespondedMenu(false); }}
                        className="w-full px-4 py-2.5 text-left text-white text-[14px] font-['DM_Sans:Regular',_sans-serif] hover:bg-[#01255e] transition-colors flex items-center justify-between"
                        style={{ fontVariationSettings: "'opsz' 14" }}
                      >
                        <span>Show Percent</span>
                        {messagesRespondedView === 'percent' && <Check className="w-4 h-4 text-[#3e88f7]" />}
                      </button>
                    </div>
                  )}
                </div>
              </div>
              <p className="text-white text-[36px] font-['DM_Sans:Bold',_sans-serif] mb-4" style={{ fontVariationSettings: "'opsz' 14" }}>
                {messagesRespondedView === 'total' ? '85' : '100%'}
              </p>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[#a6a9b2] text-[13px] font-['DM_Sans:Regular',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>By HostBuddy:</span>
                  <span className="text-white text-[13px] font-['DM_Sans:SemiBold',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
                    {messagesRespondedView === 'total' ? '68' : '80%'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#a6a9b2] text-[13px] font-['DM_Sans:Regular',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>By Host:</span>
                  <span className="text-white text-[13px] font-['DM_Sans:SemiBold',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
                    {messagesRespondedView === 'total' ? '17' : '20%'}
                  </span>
                </div>
              </div>
            </div>

            {/* Average Response Times Card */}
            <div className="bg-[#0F1117] border-2 border-[#013280] rounded-xl p-6" style={{ boxShadow: '0 0 25px rgba(1, 50, 128, 0.2)' }}>
              <div className="mb-4">
                <h3 className="text-[#a6a9b2] text-[14px] font-['DM_Sans:SemiBold',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
                  Average Response Times (Minutes)
                </h3>
              </div>
              <p className="text-white text-[36px] font-['DM_Sans:Bold',_sans-serif] mb-4" style={{ fontVariationSettings: "'opsz' 14" }}>
                1.2
              </p>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[#a6a9b2] text-[13px] font-['DM_Sans:Regular',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>By HostBuddy:</span>
                  <span className="text-white text-[13px] font-['DM_Sans:SemiBold',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>0.5</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#a6a9b2] text-[13px] font-['DM_Sans:Regular',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>By Host:</span>
                  <span className="text-white text-[13px] font-['DM_Sans:SemiBold',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>4.8</span>
                </div>
              </div>
            </div>

            {/* Guest Sentiment Card */}
            <div className="bg-[#0F1117] border-2 border-[#013280] rounded-xl p-6 relative" style={{ boxShadow: '0 0 25px rgba(1, 50, 128, 0.2)' }}>
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-[#a6a9b2] text-[14px] font-['DM_Sans:SemiBold',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
                  Guest Sentiment ({sentimentFilter})
                </h3>
                <div className="relative">
                  <button 
                    onClick={() => setShowSentimentMenu(!showSentimentMenu)}
                    className="text-[#a6a9b2] hover:text-white"
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <circle cx="8" cy="8" r="1.5" fill="currentColor"/>
                      <circle cx="8" cy="3" r="1.5" fill="currentColor"/>
                      <circle cx="8" cy="13" r="1.5" fill="currentColor"/>
                    </svg>
                  </button>
                  {showSentimentMenu && (
                    <div className="absolute right-0 top-6 w-[180px] bg-[#0F1117] border-2 border-[#013280] rounded-lg overflow-hidden z-50" style={{ boxShadow: '0 0 30px rgba(1, 50, 128, 0.3)' }}>
                      {['All', 'Current', 'Future', 'Inquiry', 'Past Guests'].map((filter) => (
                        <button
                          key={filter}
                          onClick={() => { setSentimentFilter(filter); setShowSentimentMenu(false); }}
                          className="w-full px-4 py-2.5 text-left text-white text-[14px] font-['DM_Sans:Regular',_sans-serif] hover:bg-[#01255e] transition-colors flex items-center justify-between"
                          style={{ fontVariationSettings: "'opsz' 14" }}
                        >
                          <span>{filter}</span>
                          {sentimentFilter === filter && <Check className="w-4 h-4 text-[#3e88f7]" />}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <p className="text-white text-[36px] font-['DM_Sans:Bold',_sans-serif] mb-4" style={{ fontVariationSettings: "'opsz' 14" }}>
                42.6%
              </p>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[#a6a9b2] text-[13px] font-['DM_Sans:Regular',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>Positive:</span>
                  <span className="text-white text-[13px] font-['DM_Sans:SemiBold',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>42.6%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#a6a9b2] text-[13px] font-['DM_Sans:Regular',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>Neutral:</span>
                  <span className="text-white text-[13px] font-['DM_Sans:SemiBold',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>55.4%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#a6a9b2] text-[13px] font-['DM_Sans:Regular',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>Negative:</span>
                  <span className="text-white text-[13px] font-['DM_Sans:SemiBold',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>2.0%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Messaging Timing Chart */}
          <div className="bg-[#0F1117] border-2 border-[#013280] rounded-xl p-6" style={{ boxShadow: '0 0 25px rgba(1, 50, 128, 0.2)' }}>
            <div className="flex items-start justify-between mb-6">
              <h3 className="text-white text-[16px] font-['DM_Sans:SemiBold',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
                Timing of Messages Received (By Hour of Day - Average)
              </h3>
              <div className="relative">
                <button 
                  onClick={() => setShowTimingMenu(!showTimingMenu)}
                  className="text-[#a6a9b2] hover:text-white transition-colors"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <circle cx="8" cy="8" r="1.5" fill="currentColor"/>
                    <circle cx="8" cy="3" r="1.5" fill="currentColor"/>
                    <circle cx="8" cy="13" r="1.5" fill="currentColor"/>
                  </svg>
                </button>
                {showTimingMenu && (
                  <div className="absolute right-0 top-6 w-[180px] bg-[#0F1117] border-2 border-[#013280] rounded-lg overflow-hidden z-50" style={{ boxShadow: '0 0 30px rgba(1, 50, 128, 0.3)' }}>
                    <button
                      onClick={() => { setTimingView('Total'); setShowTimingMenu(false); }}
                      className="w-full px-4 py-2.5 text-left text-white text-[14px] font-['DM_Sans:Regular',_sans-serif] hover:bg-[#01255e] transition-colors flex items-center justify-between"
                      style={{ fontVariationSettings: "'opsz' 14" }}
                    >
                      <span>Total</span>
                      {timingView === 'Total' && <Check className="w-4 h-4 text-[#3e88f7]" />}
                    </button>
                    <button
                      onClick={() => { setTimingView('By Weekday'); setShowTimingMenu(false); }}
                      className="w-full px-4 py-2.5 text-left text-white text-[14px] font-['DM_Sans:Regular',_sans-serif] hover:bg-[#01255e] transition-colors flex items-center justify-between"
                      style={{ fontVariationSettings: "'opsz' 14" }}
                    >
                      <span>By Weekday</span>
                      {timingView === 'By Weekday' && <Check className="w-4 h-4 text-[#3e88f7]" />}
                    </button>
                    <button
                      onClick={() => { setTimingView('Mon'); setShowTimingMenu(false); }}
                      className="w-full px-4 py-2.5 text-left text-white text-[14px] font-['DM_Sans:Regular',_sans-serif] hover:bg-[#01255e] transition-colors flex items-center justify-between"
                      style={{ fontVariationSettings: "'opsz' 14" }}
                    >
                      <span>Mon</span>
                      {timingView === 'Mon' && <Check className="w-4 h-4 text-[#3e88f7]" />}
                    </button>
                    <button
                      onClick={() => { setTimingView('Tue'); setShowTimingMenu(false); }}
                      className="w-full px-4 py-2.5 text-left text-white text-[14px] font-['DM_Sans:Regular',_sans-serif] hover:bg-[#01255e] transition-colors flex items-center justify-between"
                      style={{ fontVariationSettings: "'opsz' 14" }}
                    >
                      <span>Tue</span>
                      {timingView === 'Tue' && <Check className="w-4 h-4 text-[#3e88f7]" />}
                    </button>
                    <button
                      onClick={() => { setTimingView('Wed'); setShowTimingMenu(false); }}
                      className="w-full px-4 py-2.5 text-left text-white text-[14px] font-['DM_Sans:Regular',_sans-serif] hover:bg-[#01255e] transition-colors flex items-center justify-between"
                      style={{ fontVariationSettings: "'opsz' 14" }}
                    >
                      <span>Wed</span>
                      {timingView === 'Wed' && <Check className="w-4 h-4 text-[#3e88f7]" />}
                    </button>
                    <button
                      onClick={() => { setTimingView('Thu'); setShowTimingMenu(false); }}
                      className="w-full px-4 py-2.5 text-left text-white text-[14px] font-['DM_Sans:Regular',_sans-serif] hover:bg-[#01255e] transition-colors flex items-center justify-between"
                      style={{ fontVariationSettings: "'opsz' 14" }}
                    >
                      <span>Thu</span>
                      {timingView === 'Thu' && <Check className="w-4 h-4 text-[#3e88f7]" />}
                    </button>
                    <button
                      onClick={() => { setTimingView('Fri'); setShowTimingMenu(false); }}
                      className="w-full px-4 py-2.5 text-left text-white text-[14px] font-['DM_Sans:Regular',_sans-serif] hover:bg-[#01255e] transition-colors flex items-center justify-between"
                      style={{ fontVariationSettings: "'opsz' 14" }}
                    >
                      <span>Fri</span>
                      {timingView === 'Fri' && <Check className="w-4 h-4 text-[#3e88f7]" />}
                    </button>
                    <button
                      onClick={() => { setTimingView('Sat'); setShowTimingMenu(false); }}
                      className="w-full px-4 py-2.5 text-left text-white text-[14px] font-['DM_Sans:Regular',_sans-serif] hover:bg-[#01255e] transition-colors flex items-center justify-between"
                      style={{ fontVariationSettings: "'opsz' 14" }}
                    >
                      <span>Sat</span>
                      {timingView === 'Sat' && <Check className="w-4 h-4 text-[#3e88f7]" />}
                    </button>
                    <button
                      onClick={() => { setTimingView('Sun'); setShowTimingMenu(false); }}
                      className="w-full px-4 py-2.5 text-left text-white text-[14px] font-['DM_Sans:Regular',_sans-serif] hover:bg-[#01255e] transition-colors flex items-center justify-between"
                      style={{ fontVariationSettings: "'opsz' 14" }}
                    >
                      <span>Sun</span>
                      {timingView === 'Sun' && <Check className="w-4 h-4 text-[#3e88f7]" />}
                    </button>
                  </div>
                )}
              </div>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={messagingTimingData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#013280" vertical={false} />
                <XAxis 
                  dataKey="hour" 
                  stroke="#a6a9b2" 
                  tick={{ fill: '#a6a9b2', fontSize: 12 }}
                  axisLine={{ stroke: '#013280' }}
                />
                <YAxis 
                  stroke="#a6a9b2" 
                  tick={{ fill: '#a6a9b2', fontSize: 12 }}
                  axisLine={{ stroke: '#013280' }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#0F1117', 
                    border: '1px solid #013280',
                    borderRadius: '8px',
                    color: '#fff'
                  }}
                />
                <Bar dataKey="value" fill="#3e88f7" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Action Items Section */}
        <div className="mb-10">
          <h2 className="text-white text-[28px] font-['DM_Sans:Bold',_sans-serif] mb-6" style={{ fontVariationSettings: "'opsz' 14" }}>
            Action Items
          </h2>

          <div className="grid grid-cols-2 gap-5">
            {/* Action Items Summary Card */}
            <div className="bg-[#0F1117] border-2 border-[#013280] rounded-xl p-6" style={{ boxShadow: '0 0 25px rgba(1, 50, 128, 0.2)' }}>
              <div className="flex items-start justify-between mb-8">
                <h3 className="text-white text-[16px] font-['DM_Sans:SemiBold',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
                  Action Items Received and Closed ({actionItemsCategory})
                </h3>
                <div className="relative">
                  <button 
                    onClick={() => setShowActionItemsCategoryMenu(!showActionItemsCategoryMenu)}
                    className="text-[#a6a9b2] hover:text-white transition-colors"
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <circle cx="8" cy="8" r="1.5" fill="currentColor"/>
                      <circle cx="8" cy="3" r="1.5" fill="currentColor"/>
                      <circle cx="8" cy="13" r="1.5" fill="currentColor"/>
                    </svg>
                  </button>
                  {showActionItemsCategoryMenu && (
                    <div className="absolute right-0 top-6 w-[200px] bg-[#0F1117] border-2 border-[#013280] rounded-lg overflow-hidden z-50" style={{ boxShadow: '0 0 30px rgba(1, 50, 128, 0.3)' }}>
                      {['All Categories', 'Cleanliness', 'Guest Requests', 'Maintenance', 'Reservation Changes', 'Other/Unknown'].map((category) => (
                        <button
                          key={category}
                          onClick={() => { setActionItemsCategory(category); setShowActionItemsCategoryMenu(false); }}
                          className="w-full px-4 py-2.5 text-left text-white text-[14px] font-['DM_Sans:Regular',_sans-serif] hover:bg-[#01255e] transition-colors flex items-center justify-between"
                          style={{ fontVariationSettings: "'opsz' 14" }}
                        >
                          <span>{category}</span>
                          {actionItemsCategory === category && <Check className="w-4 h-4 text-[#3e88f7]" />}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-[#0F1117] border border-[#013280] rounded-lg p-4 text-center">
                  <p className="text-white text-[40px] font-['DM_Sans:Bold',_sans-serif] mb-2" style={{ fontVariationSettings: "'opsz' 14" }}>
                    26
                  </p>
                  <p className="text-[#a6a9b2] text-[14px] font-['DM_Sans:Medium',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
                    Received
                  </p>
                </div>
                <div className="bg-[#0F1117] border border-[#013280] rounded-lg p-4 text-center">
                  <p className="text-white text-[40px] font-['DM_Sans:Bold',_sans-serif] mb-2" style={{ fontVariationSettings: "'opsz' 14" }}>
                    18
                  </p>
                  <p className="text-[#a6a9b2] text-[14px] font-['DM_Sans:Medium',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
                    Closed
                  </p>
                </div>
              </div>
            </div>

            {/* Action Items Received Chart */}
            <div className="bg-[#0F1117] border-2 border-[#013280] rounded-xl p-6" style={{ boxShadow: '0 0 25px rgba(1, 50, 128, 0.2)' }}>
              <div className="flex items-start justify-between mb-6">
                <h3 className="text-white text-[16px] font-['DM_Sans:SemiBold',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
                  Action Items Received ({actionItemsReceivedCategory})
                </h3>
                <div className="relative">
                  <button 
                    onClick={() => setShowActionItemsReceivedCategoryMenu(!showActionItemsReceivedCategoryMenu)}
                    className="text-[#a6a9b2] hover:text-white transition-colors"
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <circle cx="8" cy="8" r="1.5" fill="currentColor"/>
                      <circle cx="8" cy="3" r="1.5" fill="currentColor"/>
                      <circle cx="8" cy="13" r="1.5" fill="currentColor"/>
                    </svg>
                  </button>
                  {showActionItemsReceivedCategoryMenu && (
                    <div className="absolute right-0 top-6 w-[200px] bg-[#0F1117] border-2 border-[#013280] rounded-lg overflow-hidden z-50" style={{ boxShadow: '0 0 30px rgba(1, 50, 128, 0.3)' }}>
                      {['All Categories', 'Cleanliness', 'Guest Requests', 'Maintenance', 'Reservation Changes', 'Other/Unknown'].map((category) => (
                        <button
                          key={category}
                          onClick={() => { setActionItemsReceivedCategory(category); setShowActionItemsReceivedCategoryMenu(false); }}
                          className="w-full px-4 py-2.5 text-left text-white text-[14px] font-['DM_Sans:Regular',_sans-serif] hover:bg-[#01255e] transition-colors flex items-center justify-between"
                          style={{ fontVariationSettings: "'opsz' 14" }}
                        >
                          <span>{category}</span>
                          {actionItemsReceivedCategory === category && <Check className="w-4 h-4 text-[#3e88f7]" />}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <ResponsiveContainer width="100%" height={160}>
                <BarChart data={actionItemsReceivedData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#013280" vertical={false} />
                  <XAxis 
                    dataKey="date" 
                    stroke="#a6a9b2" 
                    tick={{ fill: '#a6a9b2', fontSize: 11 }}
                    axisLine={{ stroke: '#013280' }}
                  />
                  <YAxis 
                    stroke="#a6a9b2" 
                    tick={{ fill: '#a6a9b2', fontSize: 12 }}
                    axisLine={{ stroke: '#013280' }}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#0F1117', 
                      border: '1px solid #013280',
                      borderRadius: '8px',
                      color: '#fff'
                    }}
                  />
                  <Bar dataKey="value" fill="#3e88f7" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Upsells Section */}
        <div>
          <h2 className="text-white text-[28px] font-['DM_Sans:Bold',_sans-serif] mb-6" style={{ fontVariationSettings: "'opsz' 14" }}>
            Upsells
          </h2>
          <div className="bg-[#0F1117] border-2 border-[#013280] rounded-xl p-8 text-center" style={{ boxShadow: '0 0 25px rgba(1, 50, 128, 0.2)' }}>
            <p className="text-[#a6a9b2] text-[14px] font-['DM_Sans:Regular',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
              No Upsell Data Available for This Time Period
            </p>
          </div>
        </div>
      </div>

      {/* Date Range Modal */}
      {showDateModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50" onClick={() => setShowDateModal(false)}>
          <div className="relative" onClick={(e) => e.stopPropagation()}>
            <img 
              src={dateRangeImage} 
              alt="Date Range Selector"
              className="max-w-[600px] rounded-xl"
              style={{ boxShadow: '0 0 40px rgba(30, 75, 158, 0.6)' }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
