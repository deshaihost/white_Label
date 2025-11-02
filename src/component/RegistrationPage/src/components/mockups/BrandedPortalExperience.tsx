import { useState } from 'react';
import { Home, MessageCircle, FileText, CheckSquare, DollarSign, BarChart3, Settings as SettingsIcon, ChevronDown, Bell, Plug } from 'lucide-react';
import { Badge } from '../ui/badge';
import { PropertiesContent } from './portal/PropertiesContent';
import { MessagesContent } from './portal/MessagesContent';
import { TemplatesContent } from './portal/TemplatesContent';
import { PropertyProfileContent } from './portal/PropertyProfileContent';
import { ActionItemsContent } from './portal/ActionItemsContent';
import { UpsellsContent } from './portal/UpsellsContent';
import { InsightsContent } from './portal/InsightsContent';
import { SettingsContent } from './portal/SettingsContent';

type Page = 'properties' | 'messages' | 'templates' | 'property-profile' | 'action-items' | 'upsells' | 'insights' | 'settings' | 'action-item-settings' | 'notifications' | 'integrations';

export function BrandedPortalExperience() {
  const [activePage, setActivePage] = useState<Page>('properties');
  const [selectedProperty, setSelectedProperty] = useState<string | null>(null);
  const [settingsOpen, setSettingsOpen] = useState(false);

  const handlePropertyClick = (propertyId: string) => {
    setSelectedProperty(propertyId);
    setActivePage('property-profile');
  };

  const handleBackToProperties = () => {
    setActivePage('properties');
    setSelectedProperty(null);
  };

  return (
    <div className="bg-slate-800/50 rounded-lg border border-slate-700 overflow-hidden">
      <div className="bg-green-600/10 border-b border-green-500/20 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
            <span className="text-green-400 text-xl">🖥️</span>
          </div>
          <div>
            <h3 className="text-white">End-User Branded Experience</h3>
            <p className="text-slate-400 text-sm">Interactive visual demo - for reference only</p>
          </div>
        </div>
        <Badge variant="outline" className="bg-green-500/10 text-green-400 border-green-500/20">
          V1
        </Badge>
      </div>

      <div className="p-6">
        {/* Important Disclaimer */}
        <div className="mb-6 bg-amber-500/10 border-2 border-amber-500/30 rounded-lg p-5">
          <div className="flex items-start gap-3">
            <span className="text-2xl">⚠️</span>
            <div>
              <h4 className="text-amber-400 mb-2">Visual Reference Only - Do NOT Replicate</h4>
              <p className="text-amber-300 text-sm mb-2">
                This interactive demo shows what the white-labeled interface <strong>could look like</strong> for end users. 
                This is for <strong>visualization and planning purposes only</strong>.
              </p>
              <p className="text-amber-300 text-sm">
                <strong>Important:</strong> Do not attempt to recreate this exact interface in the final product. 
                The actual implementation should follow HostBuddy's established design system and component library.
                This is a mockup to help stakeholders understand the user experience flow.
              </p>
            </div>
          </div>
        </div>

        <p className="text-slate-400 mb-6">
          Navigate using the left sidebar menu. Click on properties to view details, explore different sections.
        </p>

        {/* Mock Browser Window */}
        <div className="bg-slate-950 rounded-lg border border-slate-800 overflow-hidden shadow-2xl">
          {/* Branded Header - Always Visible */}
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
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center cursor-pointer hover:bg-white/30 transition-colors">
                <span className="text-white text-sm">JS</span>
              </div>
            </div>
          </div>

          {/* Main Layout with Sidebar */}
          <div className="flex h-[700px] bg-slate-900">
            {/* Left Sidebar Navigation */}
            <div className="w-64 border-r border-slate-800 bg-slate-900/50 overflow-y-auto">
              <nav className="p-4 space-y-1">
                {/* Properties */}
                <button
                  onClick={() => setActivePage('properties')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-colors ${
                    activePage === 'properties' || activePage === 'property-profile'
                      ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  <Home className="w-4 h-4" />
                  <span>Properties</span>
                </button>

                {/* Messages */}
                <button
                  onClick={() => setActivePage('messages')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-colors ${
                    activePage === 'messages'
                      ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Messages</span>
                  <Badge className="bg-white/10 text-white border-0 ml-auto px-1.5 py-0 text-xs">
                    5
                  </Badge>
                </button>

                {/* Action Items */}
                <button
                  onClick={() => setActivePage('action-items')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-colors ${
                    activePage === 'action-items'
                      ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  <CheckSquare className="w-4 h-4" />
                  <span>Action Items</span>
                  <Badge className="bg-amber-500/20 text-amber-400 border-0 ml-auto px-1.5 py-0 text-xs">
                    3
                  </Badge>
                </button>

                {/* Templates */}
                <button
                  onClick={() => setActivePage('templates')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-colors ${
                    activePage === 'templates'
                      ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  <FileText className="w-4 h-4" />
                  <span>Templates</span>
                </button>

                {/* Upsells */}
                <button
                  onClick={() => setActivePage('upsells')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-colors ${
                    activePage === 'upsells'
                      ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  <DollarSign className="w-4 h-4" />
                  <span>Upsells</span>
                </button>

                {/* Insights */}
                <button
                  onClick={() => setActivePage('insights')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-colors ${
                    activePage === 'insights'
                      ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  <BarChart3 className="w-4 h-4" />
                  <span>Insights</span>
                  <Badge variant="outline" className="bg-amber-500/10 text-amber-400 border-amber-500/20 ml-auto px-1.5 py-0 text-xs">
                    V2
                  </Badge>
                </button>

                {/* Divider */}
                <div className="h-px bg-slate-800 my-2"></div>

                {/* Settings with Dropdown */}
                <div>
                  <button
                    onClick={() => setSettingsOpen(!settingsOpen)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-colors ${
                      activePage === 'settings' || activePage === 'action-item-settings' || activePage === 'notifications' || activePage === 'integrations'
                        ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30'
                        : 'text-slate-400 hover:text-white hover:bg-slate-800'
                    }`}
                  >
                    <SettingsIcon className="w-4 h-4" />
                    <span>Settings</span>
                    <ChevronDown className={`w-4 h-4 ml-auto transition-transform ${settingsOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Dropdown Items */}
                  {settingsOpen && (
                    <div className="mt-1 ml-4 space-y-1">
                      <button
                        onClick={() => setActivePage('settings')}
                        className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg text-sm transition-colors ${
                          activePage === 'settings'
                            ? 'bg-blue-600/10 text-blue-400'
                            : 'text-slate-500 hover:text-slate-300 hover:bg-slate-800/50'
                        }`}
                      >
                        <SettingsIcon className="w-3.5 h-3.5" />
                        <span>General Settings</span>
                      </button>

                      <button
                        onClick={() => setActivePage('action-item-settings')}
                        className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg text-sm transition-colors ${
                          activePage === 'action-item-settings'
                            ? 'bg-blue-600/10 text-blue-400'
                            : 'text-slate-500 hover:text-slate-300 hover:bg-slate-800/50'
                        }`}
                      >
                        <CheckSquare className="w-3.5 h-3.5" />
                        <span>Action Item Settings</span>
                        <Badge variant="outline" className="bg-amber-500/10 text-amber-400 border-amber-500/20 ml-auto px-1.5 py-0 text-xs">
                          V2
                        </Badge>
                      </button>

                      <button
                        onClick={() => setActivePage('notifications')}
                        className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg text-sm transition-colors ${
                          activePage === 'notifications'
                            ? 'bg-blue-600/10 text-blue-400'
                            : 'text-slate-500 hover:text-slate-300 hover:bg-slate-800/50'
                        }`}
                      >
                        <Bell className="w-3.5 h-3.5" />
                        <span>Notifications</span>
                      </button>

                      <button
                        onClick={() => setActivePage('integrations')}
                        className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg text-sm transition-colors ${
                          activePage === 'integrations'
                            ? 'bg-blue-600/10 text-blue-400'
                            : 'text-slate-500 hover:text-slate-300 hover:bg-slate-800/50'
                        }`}
                      >
                        <Plug className="w-3.5 h-3.5" />
                        <span>Integrations</span>
                        <Badge variant="outline" className="bg-amber-500/10 text-amber-400 border-amber-500/20 ml-auto px-1.5 py-0 text-xs">
                          V2
                        </Badge>
                      </button>
                    </div>
                  )}
                </div>
              </nav>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 overflow-auto">
              {activePage === 'properties' && (
                <PropertiesContent onPropertyClick={handlePropertyClick} />
              )}
              {activePage === 'property-profile' && selectedProperty && (
                <PropertyProfileContent 
                  propertyId={selectedProperty} 
                  onBack={handleBackToProperties}
                />
              )}
              {activePage === 'messages' && <MessagesContent />}
              {activePage === 'templates' && <TemplatesContent />}
              {activePage === 'action-items' && <ActionItemsContent />}
              {activePage === 'upsells' && <UpsellsContent />}
              {activePage === 'insights' && <InsightsContent />}
              {activePage === 'settings' && <SettingsContent />}
              {activePage === 'action-item-settings' && (
                <div className="p-6">
                  <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-8 text-center">
                    <Badge variant="outline" className="bg-amber-500/10 text-amber-400 border-amber-500/20 mb-4">
                      V2 Feature
                    </Badge>
                    <h2 className="text-white text-xl mb-2">Action Item Settings</h2>
                    <p className="text-slate-400">Configure AI task generation rules and preferences</p>
                  </div>
                </div>
              )}
              {activePage === 'notifications' && (
                <div className="p-6">
                  <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-8 text-center">
                    <h2 className="text-white text-xl mb-2">Notification Settings</h2>
                    <p className="text-slate-400">Manage email, SMS, and in-app notification preferences</p>
                  </div>
                </div>
              )}
              {activePage === 'integrations' && (
                <div className="p-6">
                  <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-8 text-center">
                    <Badge variant="outline" className="bg-amber-500/10 text-amber-400 border-amber-500/20 mb-4">
                      V2 Feature
                    </Badge>
                    <h2 className="text-white text-xl mb-2">Integrations</h2>
                    <p className="text-slate-400 mb-4">Connect WhatsApp, OpenPhone, Slack, Turno, and more</p>
                    <div className="flex items-center justify-center gap-3 flex-wrap">
                      <span className="px-3 py-1 bg-slate-800 text-slate-300 rounded text-sm">WhatsApp</span>
                      <span className="px-3 py-1 bg-slate-800 text-slate-300 rounded text-sm">OpenPhone</span>
                      <span className="px-3 py-1 bg-slate-800 text-slate-300 rounded text-sm">Slack</span>
                      <span className="px-3 py-1 bg-slate-800 text-slate-300 rounded text-sm">Turno</span>
                      <span className="px-3 py-1 bg-slate-800 text-slate-300 rounded text-sm">Webhooks</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Help Text */}
        <div className="mt-6 grid grid-cols-3 gap-4">
          <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
            <p className="text-blue-400 text-sm">
              <strong>Navigation:</strong> Use the left sidebar to explore different sections of the portal
            </p>
          </div>
          <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4">
            <p className="text-purple-400 text-sm">
              <strong>Branding:</strong> All pages show partner branding (logo, colors, typography)
            </p>
          </div>
          <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
            <p className="text-green-400 text-sm">
              <strong>Interactive:</strong> Click properties to view details, explore messages and templates
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
