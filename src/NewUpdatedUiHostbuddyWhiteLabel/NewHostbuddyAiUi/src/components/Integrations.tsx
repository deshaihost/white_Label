import { useState } from 'react';
import { Input } from './ui/input';
import { showSaveSuccess } from './useSaveNotification';

export function Integrations() {
  const [activeTab, setActiveTab] = useState<'communication' | 'third-party' | 'webhooks'>('communication');
  const [connectedIntegrations, setConnectedIntegrations] = useState<string[]>(['turno']);
  const [hostbuddyProperty, setHostbuddyProperty] = useState('-Hot Tub Gateway in Central San Diego-');
  const [turnoProperty, setTurnoProperty] = useState('428 Arbor Vitas Dr');

  const handleDisconnectTurno = () => {
    setConnectedIntegrations(connectedIntegrations.filter(i => i !== 'turno'));
    showSaveSuccess('Turno integration disconnected successfully');
  };

  return (
    <div className="flex-1 bg-[#0F1117] overflow-y-auto">
      <div className="max-w-[1400px] mx-auto p-8">
        <h1 className="text-white mb-6">Integrations</h1>

        {/* Tabs */}
        <div className="flex gap-8 mb-8 border-b border-[#013280]">
          <button
            onClick={() => setActiveTab('communication')}
            className={`pb-3 px-1 text-[14px] border-b-2 transition-colors ${
              activeTab === 'communication'
                ? 'text-[#3e88f7] border-[#3e88f7]'
                : 'text-[#a6a9b2] border-transparent'
            }`}
          >
            Communication channels
          </button>
          <button
            onClick={() => setActiveTab('third-party')}
            className={`pb-3 px-1 text-[14px] border-b-2 transition-colors ${
              activeTab === 'third-party'
                ? 'text-[#3e88f7] border-[#3e88f7]'
                : 'text-[#a6a9b2] border-transparent'
            }`}
          >
            Third-party apps
          </button>
          <button
            onClick={() => setActiveTab('webhooks')}
            className={`pb-3 px-1 text-[14px] border-b-2 transition-colors ${
              activeTab === 'webhooks'
                ? 'text-[#3e88f7] border-[#3e88f7]'
                : 'text-[#a6a9b2] border-transparent'
            }`}
          >
            Webhooks
          </button>
        </div>

        {/* Communication Channels Tab */}
        {activeTab === 'communication' && (
          <div>
            <div className="grid grid-cols-2 gap-6 mb-8">
              {/* WhatsApp */}
              <div className="bg-[#0f1826] border border-[#013280] rounded-lg p-8 hover:border-[#3e88f7]/50 transition-colors cursor-pointer">
                <div className="flex items-center gap-3 mb-4">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="1.5"/>
                    <path d="M9.5 9.5C9.5 9.5 10 8 12 8C14 8 14.5 9 14.5 10C14.5 11.5 12 11.5 12 13.5M12 16H12.01" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span className="text-white">WhatsApp</span>
                </div>
                <p className="text-[#a6a9b2] text-[13px] leading-relaxed">
                  Connect your WhatsApp Business Account to view your WhatsApp conversations in your inbox, and let HostBuddy automatically respond to your guests over WhatsApp.
                </p>
              </div>

              {/* OpenPhone */}
              <div className="bg-[#0f1826] border border-[#013280] rounded-lg p-8 hover:border-[#3e88f7]/50 transition-colors cursor-pointer">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex items-center gap-0.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-white"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-white"></div>
                  </div>
                  <span className="text-white">OpenPhone</span>
                </div>
                <p className="text-[#a6a9b2] text-[13px] leading-relaxed">
                  Connect your OpenPhone Account to view your OpenPhone conversations in your inbox, and let HostBuddy automatically respond to your guests over OpenPhone.
                </p>
              </div>

              {/* Slack */}
              <div className="bg-[#0f1826] border border-[#013280] rounded-lg p-8 hover:border-[#3e88f7]/50 transition-colors cursor-pointer">
                <div className="flex items-center gap-3 mb-4">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <rect x="4" y="4" width="7" height="2" rx="1" fill="white"/>
                    <rect x="4" y="9" width="2" height="7" rx="1" fill="white"/>
                    <rect x="13" y="4" width="2" height="7" rx="1" fill="white"/>
                    <rect x="18" y="9" width="2" height="7" rx="1" fill="white"/>
                    <rect x="9" y="13" width="7" height="2" rx="1" fill="white"/>
                    <rect x="9" y="18" width="2" height="2" rx="1" fill="white"/>
                  </svg>
                  <span className="text-white">slack</span>
                </div>
                <p className="text-[#a6a9b2] text-[13px] leading-relaxed">
                  Connect your Slack account to allow HostBuddy to send action item notifications to your Slack channels. Reply to guests directly through Slack from your instruction.
                </p>
              </div>
            </div>

            {/* Connected Integrations */}
            <div>
              <h2 className="text-white mb-4">Connected integrations</h2>
              <div className="bg-[#0f1826] border border-[#013280] rounded-lg p-6">
                <p className="text-[#a6a9b2] text-[13px] text-center">
                  No integrations connected yet. Connect to an integration above to get started.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Third-party Apps Tab */}
        {activeTab === 'third-party' && (
          <div>
            <div className="grid grid-cols-2 gap-6 mb-8">
              {/* Minut */}
              <div className="bg-[#0f1826] border border-[#013280] rounded-lg p-8 hover:border-[#3e88f7]/50 transition-colors cursor-pointer">
                <div className="mb-4">
                  <div className="text-white text-[20px] tracking-[0.2em] mb-4">MINUT</div>
                </div>
                <p className="text-[#a6a9b2] text-[13px] leading-relaxed">
                  Connect with Minut's insights platform to automate and personalize guest messaging for noise or occupancy events, streamline your operations, keep your property protected and enhance guest experience.
                </p>
              </div>

              {/* Tidy */}
              <div className="bg-[#0f1826] border border-[#013280] rounded-lg p-8 hover:border-[#3e88f7]/50 transition-colors cursor-pointer">
                <div className="flex items-center gap-3 mb-4">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M12 4L13.5 9.5H19L14.5 13L16 18.5L12 15L8 18.5L9.5 13L5 9.5H10.5L12 4Z" fill="white"/>
                  </svg>
                  <span className="text-white text-[18px] tracking-wide">TIDY</span>
                </div>
                <p className="text-[#a6a9b2] text-[13px] leading-relaxed">
                  HostBuddy's groundbreaking partnership with Tidy allows you to completely automate the handling of early check-in / late check-out requests based on the real-time cleaning status of your properties. Contact us to get access.
                </p>
              </div>

              {/* Hostfully Guidebooks */}
              <div className="bg-[#0f1826] border border-[#013280] rounded-lg p-8 hover:border-[#3e88f7]/50 transition-colors cursor-pointer">
                <div className="mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-white">Hostfully</span>
                    <span className="text-[#a6a9b2]">Guidebooks</span>
                  </div>
                </div>
                <p className="text-[#a6a9b2] text-[13px] leading-relaxed">
                  Connect to Hostfully Guidebooks to allow HostBuddy to provide your guests with accurate, up-to-date information about your property and local recommendations directly from your Hostfully Guidebook.
                </p>
              </div>

              {/* Notion */}
              <div className="bg-[#0f1826] border border-[#013280] rounded-lg p-8 hover:border-[#3e88f7]/50 transition-colors cursor-pointer">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-6 h-6 bg-white rounded flex items-center justify-center">
                    <span className="text-black font-bold text-[14px]">N</span>
                  </div>
                  <span className="text-white">Notion</span>
                </div>
                <p className="text-[#a6a9b2] text-[13px] leading-relaxed">
                  Connect with Notion to let HostBuddy reference your documents and databases when responding to your guests, and to automatically keep HostBuddy's knowledge base up to date in real time. (Coming soon)
                </p>
              </div>
            </div>

            {/* Connected Integrations */}
            {connectedIntegrations.includes('turno') ? (
              <div>
                <h2 className="text-white mb-4">Connected integrations</h2>
                <div className="mb-6">
                  <div className="inline-block bg-[#3e88f7] text-white px-3 py-1 rounded text-[12px]">
                    Turno
                  </div>
                </div>
                
                <p className="text-[#a6a9b2] text-[13px] mb-6">
                  Use the table below to link your HostBuddy properties to the corresponding turno properties. Click "Submit" at the bottom when finished.
                </p>

                <div className="bg-[#0f1826] border border-[#013280] rounded-lg overflow-hidden mb-6">
                  <div className="grid grid-cols-2 border-b border-[#013280]">
                    <div className="p-4 border-r border-[#013280]">
                      <h3 className="text-white text-[14px]">HostBuddy properties</h3>
                    </div>
                    <div className="p-4">
                      <h3 className="text-white text-[14px]">Turno properties</h3>
                    </div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="p-4 border-r border-[#013280] bg-[#0F1117]">
                      <Input
                        value={hostbuddyProperty}
                        onChange={(e) => setHostbuddyProperty(e.target.value)}
                        className="bg-[#17191f] border-[#013280] text-white h-[40px]"
                      />
                    </div>
                    <div className="p-4 bg-[#192247]">
                      <Input
                        value={turnoProperty}
                        onChange={(e) => setTurnoProperty(e.target.value)}
                        className="bg-[#243166] border-[#2d3a7a] text-white h-[40px]"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <button className="bg-[#3e88f7] text-white px-8 py-2 rounded text-[14px] hover:bg-[#357ae8] transition-colors">
                    Submit
                  </button>
                  <button 
                    onClick={handleDisconnectTurno}
                    className="bg-[#ef4444] text-white px-6 py-2 rounded text-[14px] hover:bg-[#dc2626] transition-colors"
                  >
                    Disconnect Integration
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <h2 className="text-white mb-4">Connected integrations</h2>
                <div className="bg-[#0f1826] border border-[#013280] rounded-lg p-6">
                  <p className="text-[#a6a9b2] text-[13px] text-center">
                    No integrations connected yet. Connect to an integration above to get started.
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Webhooks Tab */}
        {activeTab === 'webhooks' && (
          <div>
            <div className="mb-6">
              <h2 className="text-white mb-4">Webhook Endpoints</h2>
              
              <div className="bg-[#0f1826] border border-[#013280] rounded-lg overflow-hidden">
                {/* Table Header */}
                <div className="grid grid-cols-[1fr_2fr_1fr_1fr] border-b border-[#013280] bg-[#0F1117]">
                  <div className="p-4">
                    <span className="text-white text-[14px]">Name</span>
                  </div>
                  <div className="p-4 border-l border-[#013280]">
                    <span className="text-white text-[14px]">Endpoint</span>
                  </div>
                  <div className="p-4 border-l border-[#013280]">
                    <span className="text-white text-[14px]">Status</span>
                  </div>
                  <div className="p-4 border-l border-[#013280]">
                    <span className="text-white text-[14px]">Action</span>
                  </div>
                </div>

                {/* Add Webhook Row */}
                <div className="grid grid-cols-[1fr_2fr_1fr_1fr] border-b border-[#013280]">
                  <div className="p-4 col-span-4">
                    <button className="text-[#3e88f7] text-[14px]">
                      + Add Webhook
                    </button>
                  </div>
                </div>

                {/* Empty State */}
                <div className="p-6">
                  <p className="text-[#a6a9b2] text-[13px]">
                    No webhooks connected yet.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
