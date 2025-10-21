import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from 'recharts';
import { Check } from 'lucide-react';
import { CompleteButton } from './CompleteButton';
import { getActionItems, toggleActionItemCompletion, subscribeToActionItems, ActionItem } from './ActionItemsData';

const chartData = [
  { hour: '12am', value: 2 },
  { hour: '1am', value: 1 },
  { hour: '2am', value: 1 },
  { hour: '3am', value: 1 },
  { hour: '4am', value: 1 },
  { hour: '5am', value: 3 },
  { hour: '6am', value: 4 },
  { hour: '7am', value: 8 },
  { hour: '8am', value: 12 },
  { hour: '9am', value: 10 },
  { hour: '10am', value: 9 },
  { hour: '11am', value: 10 },
  { hour: '12pm', value: 8 },
  { hour: '1pm', value: 7 },
  { hour: '2pm', value: 15 },
  { hour: '3pm', value: 11 },
  { hour: '4pm', value: 9 },
  { hour: '5pm', value: 8 },
  { hour: '6pm', value: 10 },
  { hour: '7pm', value: 9 },
  { hour: '8pm', value: 7 },
  { hour: '9pm', value: 6 },
  { hour: '10pm', value: 4 },
  { hour: '11pm', value: 3 },
];

export default function Dashboard({ onNavigate }: { onNavigate?: (page: string) => void }) {
  const [actionItems, setActionItems] = useState<ActionItem[]>([]);
  
  // Metric card view states
  const [messagesRespondedView, setMessagesRespondedView] = useState<'total' | 'percent'>('total');
  const [guestTypeFilter, setGuestTypeFilter] = useState<'All Guests' | 'Current Guests' | 'Future Guests' | 'Inquiry Guests' | 'Past Guests'>('All Guests');
  
  // Menu states
  const [showMessagesRespondedMenu, setShowMessagesRespondedMenu] = useState(false);
  const [showGuestTypeMenu, setShowGuestTypeMenu] = useState(false);
  const [showChartMenu, setShowChartMenu] = useState(false);
  const [chartView, setChartView] = useState('Total');

  useEffect(() => {
    // Load initial data
    setActionItems(getActionItems());
    
    // Subscribe to updates
    const unsubscribe = subscribeToActionItems(() => {
      setActionItems(getActionItems());
    });
    
    return unsubscribe;
  }, []);

  const handleCompleteActionItem = (id: number) => {
    toggleActionItemCompletion(id);
  };

  const incompleteItems = actionItems.filter(item => !item.completed);
  return (
    <div className="bg-[#0F1117] min-h-screen p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-white text-[32px] font-['DM_Sans:Bold',_sans-serif] mb-6" style={{ fontVariationSettings: "'opsz' 14" }}>
          Dashboard
        </h1>

        {/* Welcome Banner */}
        <div className="bg-[#01255e] border border-[#013280] rounded-lg p-4 mb-6">
          <div className="flex justify-between items-center">
            <p className="text-[#3e88f7] text-[14px] font-['DM_Sans:Medium',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
              Welcome to HostBuddy, Sam
            </p>
            <button 
              onClick={() => onNavigate?.('getstarted')}
              className="text-[#3e88f7] text-[14px] font-['DM_Sans:SemiBold',_sans-serif] hover:text-[#98bffa] transition-colors underline" 
              style={{ fontVariationSettings: "'opsz' 14", textDecoration: 'underline' }}
            >
              New to HostBuddy? Get Started →
            </button>
          </div>
        </div>

        {/* Metrics Cards */}
        <div className="grid grid-cols-3 gap-5 mb-6">
          {/* Guest Messages Responded */}
          <div className="bg-[#17191f] border-2 border-[#013280] rounded-xl p-6 relative" style={{ boxShadow: '0 0 25px rgba(30, 75, 158, 0.2)' }}>
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-[#a6a9b2] text-[14px] font-['DM_Sans:SemiBold',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
                Guest Messages Responded ({messagesRespondedView === 'total' ? 'Total' : 'Percent'})
              </h3>
              <div className="relative">
                <button 
                  onClick={() => setShowMessagesRespondedMenu(!showMessagesRespondedMenu)}
                  className="text-[#a6a9b2] hover:text-white transition-colors"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <circle cx="8" cy="8" r="1.5" fill="currentColor"/>
                    <circle cx="8" cy="3" r="1.5" fill="currentColor"/>
                    <circle cx="8" cy="13" r="1.5" fill="currentColor"/>
                  </svg>
                </button>
                {showMessagesRespondedMenu && (
                  <div className="absolute right-0 top-6 w-[180px] bg-[#17191f] border-2 border-[#013280] rounded-lg overflow-hidden z-50" style={{ boxShadow: '0 0 30px rgba(30, 75, 158, 0.3)' }}>
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
              {messagesRespondedView === 'total' ? '513' : '20.1%'}
            </p>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[#a6a9b2] text-[13px] font-['DM_Sans:Regular',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>By Host:</span>
                <span className="text-white text-[13px] font-['DM_Sans:SemiBold',_sans-serif] tabular-nums" style={{ fontVariationSettings: "'opsz' 14" }}>
                  {messagesRespondedView === 'total' ? '513' : '20.1%'}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#a6a9b2] text-[13px] font-['DM_Sans:Regular',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>By HostBuddy:</span>
                <span className="text-white text-[13px] font-['DM_Sans:SemiBold',_sans-serif] tabular-nums" style={{ fontVariationSettings: "'opsz' 14" }}>
                  {messagesRespondedView === 'total' ? '2042' : '79.9%'}
                </span>
              </div>
            </div>
          </div>

          {/* Average Response Times */}
          <div className="bg-[#17191f] border-2 border-[#013280] rounded-xl p-6" style={{ boxShadow: '0 0 25px rgba(30, 75, 158, 0.2)' }}>
            <div className="mb-4">
              <h3 className="text-[#a6a9b2] text-[14px] font-['DM_Sans:SemiBold',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
                Average Response Times (Minutes)
              </h3>
            </div>
            <p className="text-white text-[36px] font-['DM_Sans:Bold',_sans-serif] mb-4" style={{ fontVariationSettings: "'opsz' 14" }}>
              0.5
            </p>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[#a6a9b2] text-[13px] font-['DM_Sans:Regular',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>By HostBuddy:</span>
                <span className="text-white text-[13px] font-['DM_Sans:SemiBold',_sans-serif] tabular-nums" style={{ fontVariationSettings: "'opsz' 14" }}>0.5</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#a6a9b2] text-[13px] font-['DM_Sans:Regular',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>By Host:</span>
                <span className="text-white text-[13px] font-['DM_Sans:SemiBold',_sans-serif] tabular-nums" style={{ fontVariationSettings: "'opsz' 14" }}>18.1</span>
              </div>
            </div>
          </div>

          {/* Guest Sentiment */}
          <div className="bg-[#17191f] border-2 border-[#013280] rounded-xl p-6 relative" style={{ boxShadow: '0 0 25px rgba(30, 75, 158, 0.2)' }}>
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-[#a6a9b2] text-[14px] font-['DM_Sans:SemiBold',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
                Guest Sentiment (Percent)
              </h3>
              <div className="relative">
                <button 
                  onClick={() => setShowGuestTypeMenu(!showGuestTypeMenu)}
                  className="text-[#a6a9b2] hover:text-white transition-colors"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <circle cx="8" cy="8" r="1.5" fill="currentColor"/>
                    <circle cx="8" cy="3" r="1.5" fill="currentColor"/>
                    <circle cx="8" cy="13" r="1.5" fill="currentColor"/>
                  </svg>
                </button>
                {showGuestTypeMenu && (
                  <div className="absolute right-0 top-6 w-[180px] bg-[#17191f] border-2 border-[#013280] rounded-lg overflow-hidden z-50" style={{ boxShadow: '0 0 30px rgba(30, 75, 158, 0.3)' }}>
                    <button
                      onClick={() => { setGuestTypeFilter('All Guests'); setShowGuestTypeMenu(false); }}
                      className="w-full px-4 py-2.5 text-left text-white text-[14px] font-['DM_Sans:Regular',_sans-serif] hover:bg-[#01255e] transition-colors flex items-center justify-between"
                      style={{ fontVariationSettings: "'opsz' 14" }}
                    >
                      <span>All Guests</span>
                      {guestTypeFilter === 'All Guests' && <Check className="w-4 h-4 text-[#3e88f7]" />}
                    </button>
                    <button
                      onClick={() => { setGuestTypeFilter('Current Guests'); setShowGuestTypeMenu(false); }}
                      className="w-full px-4 py-2.5 text-left text-white text-[14px] font-['DM_Sans:Regular',_sans-serif] hover:bg-[#01255e] transition-colors flex items-center justify-between"
                      style={{ fontVariationSettings: "'opsz' 14" }}
                    >
                      <span>Current Guests</span>
                      {guestTypeFilter === 'Current Guests' && <Check className="w-4 h-4 text-[#3e88f7]" />}
                    </button>
                    <button
                      onClick={() => { setGuestTypeFilter('Future Guests'); setShowGuestTypeMenu(false); }}
                      className="w-full px-4 py-2.5 text-left text-white text-[14px] font-['DM_Sans:Regular',_sans-serif] hover:bg-[#01255e] transition-colors flex items-center justify-between"
                      style={{ fontVariationSettings: "'opsz' 14" }}
                    >
                      <span>Future Guests</span>
                      {guestTypeFilter === 'Future Guests' && <Check className="w-4 h-4 text-[#3e88f7]" />}
                    </button>
                    <button
                      onClick={() => { setGuestTypeFilter('Inquiry Guests'); setShowGuestTypeMenu(false); }}
                      className="w-full px-4 py-2.5 text-left text-white text-[14px] font-['DM_Sans:Regular',_sans-serif] hover:bg-[#01255e] transition-colors flex items-center justify-between"
                      style={{ fontVariationSettings: "'opsz' 14" }}
                    >
                      <span>Inquiry Guests</span>
                      {guestTypeFilter === 'Inquiry Guests' && <Check className="w-4 h-4 text-[#3e88f7]" />}
                    </button>
                    <button
                      onClick={() => { setGuestTypeFilter('Past Guests'); setShowGuestTypeMenu(false); }}
                      className="w-full px-4 py-2.5 text-left text-white text-[14px] font-['DM_Sans:Regular',_sans-serif] hover:bg-[#01255e] transition-colors flex items-center justify-between"
                      style={{ fontVariationSettings: "'opsz' 14" }}
                    >
                      <span>Past Guests</span>
                      {guestTypeFilter === 'Past Guests' && <Check className="w-4 h-4 text-[#3e88f7]" />}
                    </button>
                  </div>
                )}
              </div>
            </div>
            <p className="text-white text-[36px] font-['DM_Sans:Bold',_sans-serif] mb-4" style={{ fontVariationSettings: "'opsz' 14" }}>
              33.2%
            </p>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[#a6a9b2] text-[13px] font-['DM_Sans:Regular',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>Positive:</span>
                <span className="text-white text-[13px] font-['DM_Sans:SemiBold',_sans-serif] tabular-nums" style={{ fontVariationSettings: "'opsz' 14" }}>
                  33.2%
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#a6a9b2] text-[13px] font-['DM_Sans:Regular',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>Neutral:</span>
                <span className="text-white text-[13px] font-['DM_Sans:SemiBold',_sans-serif] tabular-nums" style={{ fontVariationSettings: "'opsz' 14" }}>
                  58.6%
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#a6a9b2] text-[13px] font-['DM_Sans:Regular',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>Negative:</span>
                <span className="text-white text-[13px] font-['DM_Sans:SemiBold',_sans-serif] tabular-nums" style={{ fontVariationSettings: "'opsz' 14" }}>
                  7.0%
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Chart */}
        <div className="bg-[#17191f] border-2 border-[#013280] rounded-xl p-6 mb-6" style={{ boxShadow: '0 0 25px rgba(30, 75, 158, 0.2)' }}>
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-white text-[14px] font-['DM_Sans:SemiBold',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
              Timing of messages received (by hour of day - {
                chartView === 'Total' ? 'average' :
                chartView === 'By Weekday' ? 'by weekday' :
                chartView === 'Mon' ? 'Monday' :
                chartView === 'Tue' ? 'Tuesday' :
                chartView === 'Wed' ? 'Wednesday' :
                chartView === 'Thu' ? 'Thursday' :
                chartView === 'Fri' ? 'Friday' :
                chartView === 'Sat' ? 'Saturday' :
                chartView === 'Sun' ? 'Sunday' :
                'average'
              })
            </h3>
            <div className="relative">
              <button 
                onClick={() => setShowChartMenu(!showChartMenu)}
                className="text-[#676a73] hover:text-[#a6a9b2] transition-colors"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <circle cx="8" cy="3" r="1" fill="currentColor" />
                  <circle cx="8" cy="8" r="1" fill="currentColor" />
                  <circle cx="8" cy="13" r="1" fill="currentColor" />
                </svg>
              </button>
              {showChartMenu && (
                <div className="absolute right-0 top-6 w-[180px] bg-[#0F1117] border-2 border-[#013280] rounded-lg overflow-hidden z-50" style={{ boxShadow: '0 0 30px rgba(30, 75, 158, 0.3)' }}>
                  <button
                    onClick={() => { setChartView('Total'); setShowChartMenu(false); }}
                    className="w-full px-4 py-2.5 text-left text-white text-[14px] font-['DM_Sans:Regular',_sans-serif] hover:bg-[#01255e] transition-colors flex items-center justify-between"
                    style={{ fontVariationSettings: "'opsz' 14" }}
                  >
                    <span>Total</span>
                    {chartView === 'Total' && <Check className="w-4 h-4 text-[#3e88f7]" />}
                  </button>
                  <button
                    onClick={() => { setChartView('By Weekday'); setShowChartMenu(false); }}
                    className="w-full px-4 py-2.5 text-left text-white text-[14px] font-['DM_Sans:Regular',_sans-serif] hover:bg-[#01255e] transition-colors flex items-center justify-between"
                    style={{ fontVariationSettings: "'opsz' 14" }}
                  >
                    <span>By Weekday</span>
                    {chartView === 'By Weekday' && <Check className="w-4 h-4 text-[#3e88f7]" />}
                  </button>
                  <button
                    onClick={() => { setChartView('Mon'); setShowChartMenu(false); }}
                    className="w-full px-4 py-2.5 text-left text-white text-[14px] font-['DM_Sans:Regular',_sans-serif] hover:bg-[#01255e] transition-colors flex items-center justify-between"
                    style={{ fontVariationSettings: "'opsz' 14" }}
                  >
                    <span>Mon</span>
                    {chartView === 'Mon' && <Check className="w-4 h-4 text-[#3e88f7]" />}
                  </button>
                  <button
                    onClick={() => { setChartView('Tue'); setShowChartMenu(false); }}
                    className="w-full px-4 py-2.5 text-left text-white text-[14px] font-['DM_Sans:Regular',_sans-serif] hover:bg-[#01255e] transition-colors flex items-center justify-between"
                    style={{ fontVariationSettings: "'opsz' 14" }}
                  >
                    <span>Tue</span>
                    {chartView === 'Tue' && <Check className="w-4 h-4 text-[#3e88f7]" />}
                  </button>
                  <button
                    onClick={() => { setChartView('Wed'); setShowChartMenu(false); }}
                    className="w-full px-4 py-2.5 text-left text-white text-[14px] font-['DM_Sans:Regular',_sans-serif] hover:bg-[#01255e] transition-colors flex items-center justify-between"
                    style={{ fontVariationSettings: "'opsz' 14" }}
                  >
                    <span>Wed</span>
                    {chartView === 'Wed' && <Check className="w-4 h-4 text-[#3e88f7]" />}
                  </button>
                  <button
                    onClick={() => { setChartView('Thu'); setShowChartMenu(false); }}
                    className="w-full px-4 py-2.5 text-left text-white text-[14px] font-['DM_Sans:Regular',_sans-serif] hover:bg-[#01255e] transition-colors flex items-center justify-between"
                    style={{ fontVariationSettings: "'opsz' 14" }}
                  >
                    <span>Thu</span>
                    {chartView === 'Thu' && <Check className="w-4 h-4 text-[#3e88f7]" />}
                  </button>
                  <button
                    onClick={() => { setChartView('Fri'); setShowChartMenu(false); }}
                    className="w-full px-4 py-2.5 text-left text-white text-[14px] font-['DM_Sans:Regular',_sans-serif] hover:bg-[#01255e] transition-colors flex items-center justify-between"
                    style={{ fontVariationSettings: "'opsz' 14" }}
                  >
                    <span>Fri</span>
                    {chartView === 'Fri' && <Check className="w-4 h-4 text-[#3e88f7]" />}
                  </button>
                  <button
                    onClick={() => { setChartView('Sat'); setShowChartMenu(false); }}
                    className="w-full px-4 py-2.5 text-left text-white text-[14px] font-['DM_Sans:Regular',_sans-serif] hover:bg-[#01255e] transition-colors flex items-center justify-between"
                    style={{ fontVariationSettings: "'opsz' 14" }}
                  >
                    <span>Sat</span>
                    {chartView === 'Sat' && <Check className="w-4 h-4 text-[#3e88f7]" />}
                  </button>
                  <button
                    onClick={() => { setChartView('Sun'); setShowChartMenu(false); }}
                    className="w-full px-4 py-2.5 text-left text-white text-[14px] font-['DM_Sans:Regular',_sans-serif] hover:bg-[#01255e] transition-colors flex items-center justify-between"
                    style={{ fontVariationSettings: "'opsz' 14" }}
                  >
                    <span>Sun</span>
                    {chartView === 'Sun' && <Check className="w-4 h-4 text-[#3e88f7]" />}
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className="h-[240px] mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#013280" vertical={false} />
                <XAxis
                  dataKey="hour"
                  stroke="#a6a9b2"
                  tick={{ fill: '#a6a9b2', fontSize: 12 }}
                  axisLine={{ stroke: '#013280' }}
                  interval={0}
                />
                <YAxis
                  stroke="#a6a9b2"
                  tick={{ fill: '#a6a9b2', fontSize: 12 }}
                  axisLine={{ stroke: '#013280' }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#17191f', 
                    border: '1px solid #013280',
                    borderRadius: '8px',
                    color: '#fff'
                  }}
                />
                <Bar dataKey="value" fill="#3e88f7" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 text-center">
            <p className="text-[#a6a9b2] text-[12px] font-['DM_Sans:Regular',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
              Above data from Sep 11, 2025 to Oct 13, 2025
            </p>
            <button 
              onClick={() => onNavigate?.('insights')}
              className="text-[#3e88f7] text-[12px] font-['DM_Sans:SemiBold',_sans-serif] hover:text-[#98bffa] transition-colors mt-1" 
              style={{ fontVariationSettings: "'opsz' 14", textDecoration: 'underline' }}
            >
              See more statistics
            </button>
          </div>
        </div>
      </div>

      {/* Action Items Table */}
      <div className="bg-[#17191f] border-2 border-[#013280] rounded-xl overflow-hidden" style={{ boxShadow: '0 0 25px rgba(30, 75, 158, 0.2)' }}>
        <div className="p-6 pb-4 flex justify-between items-center border-b border-[#013280]">
          <h3 className="text-white text-[16px] font-['DM_Sans:SemiBold',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
            Incomplete Action Items <span className="text-[#a6a9b2] text-[14px] font-['DM_Sans:Regular',_sans-serif]">(Most Recent)</span>
          </h3>
          <button 
            onClick={() => onNavigate?.('actionitems')}
            className="text-[#3e88f7] text-[14px] font-['DM_Sans:Medium',_sans-serif] hover:underline" 
            style={{ fontVariationSettings: "'opsz' 14" }}
          >
            See All
          </button>
        </div>

        {/* Table Header */}
        <div className="grid grid-cols-[100px_200px_1fr_80px] gap-4 px-6 py-3 bg-[#0F1117] border-b border-[#013280]">
          <p className="text-[#a6a9b2] text-[12px] font-['DM_Sans:SemiBold',_sans-serif] uppercase" style={{ fontVariationSettings: "'opsz' 14" }}>
            Date/Time
          </p>
          <p className="text-[#a6a9b2] text-[12px] font-['DM_Sans:SemiBold',_sans-serif] uppercase" style={{ fontVariationSettings: "'opsz' 14" }}>
            Property/Guest
          </p>
          <p className="text-[#a6a9b2] text-[12px] font-['DM_Sans:SemiBold',_sans-serif] uppercase" style={{ fontVariationSettings: "'opsz' 14" }}>
            Action Item
          </p>
          <p className="text-[#a6a9b2] text-[12px] font-['DM_Sans:SemiBold',_sans-serif] uppercase text-center" style={{ fontVariationSettings: "'opsz' 14" }}>
            Complete
          </p>
        </div>

        {/* Table Rows */}
        {incompleteItems.slice(0, 6).map((item) => (
          <div
            key={item.id}
            className="grid grid-cols-[100px_200px_1fr_80px] gap-4 px-6 py-4 border-b border-[#013280] last:border-b-0 hover:bg-[#01255e] transition-colors"
          >
            <div>
              <p className="text-white text-[14px] font-['DM_Sans:Medium',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
                {item.date}
              </p>
              <p className="text-[#a6a9b2] text-[12px] font-['DM_Sans:Regular',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
                {item.time}
              </p>
            </div>
            <div>
              <p className="text-white text-[14px] font-['DM_Sans:Medium',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
                {item.property}
              </p>
              <p className="text-[#a6a9b2] text-[12px] font-['DM_Sans:Regular',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
                {item.guest}
              </p>
            </div>
            <p className="text-white text-[14px] font-['DM_Sans:Regular',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
              {item.action}
            </p>
            <div className="flex justify-center items-center">
              <CompleteButton 
                completed={item.completed}
                onClick={() => handleCompleteActionItem(item.id)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
