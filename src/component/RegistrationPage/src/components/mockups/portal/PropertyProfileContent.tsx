import { ChevronLeft, Save, Info } from 'lucide-react';
import { Badge } from '../../ui/badge';
import { useState } from 'react';

interface PropertyProfileContentProps {
  propertyId: string;
  onBack: () => void;
}

export function PropertyProfileContent({ propertyId, onBack }: PropertyProfileContentProps) {
  const [activeTab, setActiveTab] = useState('conversation-preferences');

  const tabs = [
    'Resources',
    'Basics',
    'Listing Details',
    'Amenities',
    'SOPs',
    'Topics to Avoid',
    'Updates',
    'Schedule',
    'Conversation Preferences'
  ];

  return (
    <>
      {/* Breadcrumb & Actions */}
      <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          <span className="text-sm">Back to Properties</span>
        </button>
        <div className="flex items-center gap-2">
          <button className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-sm border border-slate-700 transition-colors">
            Cancel
          </button>
          <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm flex items-center gap-2 transition-colors">
            <Save className="w-4 h-4" />
            Save Changes
          </button>
        </div>
      </div>

      {/* Property Header */}
      <div className="px-6 py-5 border-b border-slate-800 bg-slate-900/50">
        <div className="flex items-start gap-4">
          <div className="w-16 h-16 bg-gradient-to-br from-slate-700 to-slate-800 rounded-lg flex items-center justify-center text-3xl border border-slate-600">
            🏖️
          </div>
          <div>
            <h1 className="text-white text-2xl mb-1">Sunset Beach Villa</h1>
            <p className="text-slate-400 mb-2">2840 Pacific Coast Hwy, Malibu, CA 90265</p>
            <div className="flex items-center gap-3">
              <Badge className="bg-green-500/10 text-green-400 border-green-500/20">
                <span className="mr-1">●</span> AI Active
              </Badge>
              <span className="text-slate-500 text-sm">Property ID: MLBU-2840</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="px-6 bg-slate-900 border-b border-slate-800 overflow-x-auto">
        <div className="flex gap-1">
          {tabs.map((tab, i) => (
            <button
              key={i}
              onClick={() => setActiveTab(tab.toLowerCase().replace(/\s+/g, '-'))}
              className={`px-4 py-3 text-sm whitespace-nowrap border-b-2 transition-colors ${
                (i === 8 && activeTab === 'conversation-preferences') || activeTab === tab.toLowerCase().replace(/\s+/g, '-')
                  ? 'border-blue-500 text-blue-400'
                  : 'border-transparent text-slate-400 hover:text-slate-300'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content - Conversation Preferences */}
      <div className="p-6">
        <div className="max-w-4xl">
          <div className="mb-6">
            <h2 className="text-white text-xl mb-2">AI Conversation Settings</h2>
            <p className="text-slate-400">
              Configure how the AI communicates with guests for this specific property
            </p>
          </div>

          <div className="space-y-6">
            {/* AI Personality */}
            <div className="bg-slate-800/50 rounded-lg border border-slate-700 p-5">
              <label className="text-slate-200 mb-3 block">AI Personality & Tone</label>
              <div className="grid grid-cols-3 gap-3 mb-4">
                {[
                  { label: 'Friendly & Welcoming', selected: true },
                  { label: 'Professional & Formal', selected: false },
                  { label: 'Casual & Relaxed', selected: false }
                ].map((option, i) => (
                  <button
                    key={i}
                    className={`px-4 py-3 rounded-lg border-2 text-sm transition-all ${
                      option.selected
                        ? 'bg-blue-600/20 border-blue-500 text-blue-400'
                        : 'bg-slate-900 border-slate-700 text-slate-400 hover:border-slate-600'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
              <p className="text-slate-500 text-sm">
                The AI will adopt this tone when communicating with guests
              </p>
            </div>

            {/* Message Length */}
            <div className="bg-slate-800/50 rounded-lg border border-slate-700 p-5">
              <label className="text-slate-200 mb-3 block">Response Length</label>
              <select className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-slate-300 focus:outline-none focus:border-blue-500">
                <option>Short & Concise (1-2 sentences)</option>
                <option>Balanced (2-3 sentences)</option>
                <option>Detailed & Thorough (3-4 sentences)</option>
              </select>
              <p className="text-slate-500 text-sm mt-2">
                Controls the typical length of AI responses
              </p>
            </div>

            {/* Context Awareness */}
            <div className="bg-slate-800/50 rounded-lg border border-slate-700 p-5">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <label className="text-slate-200 block mb-1">Context Awareness</label>
                  <p className="text-slate-500 text-sm">
                    AI will reference property details, amenities, and house rules
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3">
                <p className="text-blue-400 text-sm flex items-start gap-2">
                  <Info className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  When enabled, AI responses will include property-specific information like WiFi passwords, check-in instructions, and local recommendations
                </p>
              </div>
            </div>

            {/* Escalation Rules */}
            <div className="bg-slate-800/50 rounded-lg border border-slate-700 p-5">
              <label className="text-slate-200 mb-3 block">Escalation Rules</label>
              <p className="text-slate-400 text-sm mb-4">
                Automatically notify you when guests mention these topics
              </p>
              <div className="space-y-3">
                {[
                  { label: 'Booking changes or cancellations', checked: true },
                  { label: 'Refund requests', checked: true },
                  { label: 'Maintenance or repair issues', checked: true },
                  { label: 'Guest complaints or negative feedback', checked: true },
                  { label: 'Early check-in or late checkout requests', checked: false },
                  { label: 'Questions about house rules', checked: false }
                ].map((rule, i) => (
                  <label key={i} className="flex items-center gap-3 text-slate-300 cursor-pointer group">
                    <input 
                      type="checkbox" 
                      defaultChecked={rule.checked}
                      className="w-4 h-4 rounded border-slate-600 bg-slate-800 checked:bg-blue-600 checked:border-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-0 transition-colors"
                    />
                    <span className="group-hover:text-white transition-colors">{rule.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Test Response */}
            <div className="bg-slate-800/50 rounded-lg border border-slate-700 p-5">
              <label className="text-slate-200 mb-3 block">Test AI Response</label>
              <p className="text-slate-400 text-sm mb-4">
                Send a test message to see how the AI will respond with your current settings
              </p>
              <textarea 
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-slate-300 placeholder-slate-500 focus:outline-none focus:border-blue-500 resize-none"
                rows={3}
                placeholder="Example: What time is check-in and where can I park?"
              />
              <button className="mt-3 w-full px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                Generate AI Response
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
