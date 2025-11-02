import { useState } from 'react';
import { Settings, Sliders, X, Code, Book, Copy, Check } from 'lucide-react';
import { Badge } from '../ui/badge';
import { Switch } from '../ui/switch';

export function SettingsSetup() {
  const [showApiDocs, setShowApiDocs] = useState(false);
  const [selectedModule, setSelectedModule] = useState('');
  const [copiedEndpoint, setCopiedEndpoint] = useState('');

  const handleConfigureClick = (moduleName: string) => {
    setSelectedModule(moduleName);
    setShowApiDocs(true);
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedEndpoint(id);
    setTimeout(() => setCopiedEndpoint(''), 2000);
  };

  return (
    <div className="bg-slate-800/50 rounded-lg border border-slate-700 overflow-hidden">
      <div className="bg-blue-600/10 border-b border-blue-500/20 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Settings className="w-5 h-5 text-blue-400" />
          <h3 className="text-white">Feature Toggles</h3>
        </div>
        <Badge variant="outline" className="bg-green-500/10 text-green-400 border-green-500/20">
          V1
        </Badge>
      </div>

      <div className="p-6">
        <p className="text-slate-400 mb-6">
          Choose which modules are available to your end users. Features are being implemented in priority order.
        </p>

        <div className="space-y-4">
          {/* V1 Features */}
          <div className="space-y-3">
            <h4 className="text-slate-300 flex items-center gap-2">
              V1 Modules
              <Badge className="bg-green-600 text-white text-xs">Available Now</Badge>
            </h4>

            {[
              { name: '1. Properties Page', desc: 'List view with AI automation controls', enabled: true },
              { name: '2. Property Profile', desc: 'Resources, Basics, SOPs, Conversation Preferences (9 tabs)', enabled: true },
              { name: '3. Smart Templates', desc: 'Manage AI message templates', enabled: true },
              { name: '4. Upsells', desc: 'Gap Night Upsells & Inquiry Followups', enabled: true },
              { name: '5. Messaging Inbox', desc: 'All HostBuddy messaging features', enabled: true },
              { name: '6. Action Items', desc: 'Track AI-generated operational tasks', enabled: true },
            ].map((feature, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-slate-900/50 rounded-lg border border-slate-700">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-slate-200">{feature.name}</p>
                    {feature.enabled && (
                      <span className="text-green-400 text-xs">●</span>
                    )}
                  </div>
                  <p className="text-slate-400 text-sm">{feature.desc}</p>
                </div>
                <div className="flex items-center gap-2 ml-4">
                  <button 
                    onClick={() => handleConfigureClick(feature.name)}
                    className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded text-sm border border-slate-600 transition-colors flex items-center gap-1.5"
                  >
                    <Sliders className="w-3.5 h-3.5" />
                    Configure
                  </button>
                  <Switch checked={feature.enabled} />
                </div>
              </div>
            ))}
          </div>

          {/* V2 Features */}
          <div className="space-y-3 pt-4">
            <h4 className="text-slate-300 flex items-center gap-2">
              V2 Modules
              <Badge variant="outline" className="bg-amber-500/10 text-amber-400 border-amber-500/20 text-xs">
                Coming Soon
              </Badge>
            </h4>

            {[
              { name: '7. Insights', desc: 'Analytics and reporting dashboard', enabled: false },
              { name: '8. Action Item Settings', desc: 'Configure AI task generation rules', enabled: false },
              { name: '9. Integrations', desc: 'WhatsApp, OpenPhone, Slack, Turno, Webhooks', enabled: false },
            ].map((feature, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-slate-900/30 rounded-lg border border-slate-700/50 opacity-60">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-slate-300">{feature.name}</p>
                    <span className="text-slate-600 text-xs">🔒</span>
                  </div>
                  <p className="text-slate-500 text-sm">{feature.desc}</p>
                </div>
                <div className="flex items-center gap-2 ml-4">
                  <button disabled className="px-3 py-1.5 bg-slate-800/50 text-slate-500 rounded text-sm border border-slate-700 cursor-not-allowed flex items-center gap-1.5">
                    <Sliders className="w-3.5 h-3.5" />
                    Configure
                  </button>
                  <Switch checked={feature.enabled} disabled />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 space-y-4">
          <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
            <p className="text-blue-400 text-sm">
              <strong>Note:</strong> Feature availability applies tenant-wide. All enabled modules will be visible to your end users.
            </p>
          </div>
          
          <div className="p-4 bg-purple-500/10 border border-purple-500/20 rounded-lg">
            <h4 className="text-purple-300 mb-2 flex items-center gap-2">
              <Book className="w-4 h-4" />
              <strong>Two Integration Options</strong>
            </h4>
            <div className="space-y-2 text-sm">
              <p className="text-purple-300">
                <strong>Option 1: Hosted White-Label Portal</strong> - Use our fully hosted interface with your branding applied
              </p>
              <p className="text-purple-300">
                <strong>Option 2: API Integration</strong> - Click "Configure" to access API documentation and integrate HostBuddy's backend into your existing platform
              </p>
            </div>
            <p className="text-purple-400 text-sm mt-3">
              The API allows you to build your own UI while leveraging HostBuddy's AI messaging engine, or enhance your existing platform with our features.
            </p>
          </div>
        </div>

        {/* API Documentation Modal */}
        {showApiDocs && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
            <div className="bg-slate-900 border border-slate-700 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
              {/* Modal Header */}
              <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-800/50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center">
                    <Code className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-white">API Documentation</h3>
                    <p className="text-slate-400 text-sm">{selectedModule}</p>
                  </div>
                </div>
                <button 
                  onClick={() => setShowApiDocs(false)}
                  className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-slate-400" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="flex-1 overflow-y-auto p-6">
                <div className="space-y-6">
                  {/* Overview */}
                  <div>
                    <h4 className="text-white mb-2">Overview</h4>
                    <p className="text-slate-400 text-sm">
                      Integrate the Messaging Inbox module into your existing platform using HostBuddy's REST API. 
                      This allows you to build your own UI while leveraging our AI-powered messaging engine.
                    </p>
                  </div>

                  {/* Authentication */}
                  <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
                    <h4 className="text-white mb-3">Authentication</h4>
                    <p className="text-slate-400 text-sm mb-3">
                      All API requests require authentication using your API key in the header:
                    </p>
                    <div className="bg-slate-950 border border-slate-700 rounded p-3 relative group">
                      <code className="text-green-400 text-sm">
                        Authorization: Bearer your_api_key_here
                      </code>
                      <button 
                        onClick={() => copyToClipboard('Authorization: Bearer your_api_key_here', 'auth')}
                        className="absolute right-2 top-2 p-1.5 bg-slate-800 hover:bg-slate-700 rounded opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        {copiedEndpoint === 'auth' ? (
                          <Check className="w-3.5 h-3.5 text-green-400" />
                        ) : (
                          <Copy className="w-3.5 h-3.5 text-slate-400" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Endpoints */}
                  <div>
                    <h4 className="text-white mb-3">API Endpoints</h4>
                    <div className="space-y-4">
                      {/* Get Conversations */}
                      <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge className="bg-blue-600 text-white border-0">GET</Badge>
                          <code className="text-blue-400 text-sm">/api/v1/conversations</code>
                        </div>
                        <p className="text-slate-400 text-sm mb-3">Retrieve all conversations for your properties</p>
                        
                        <div className="space-y-2">
                          <p className="text-slate-300 text-sm">Query Parameters:</p>
                          <div className="bg-slate-950 border border-slate-700 rounded p-3">
                            <code className="text-sm text-slate-300 block">property_id: string (optional)</code>
                            <code className="text-sm text-slate-300 block">status: "active" | "archived" (optional)</code>
                            <code className="text-sm text-slate-300 block">limit: number (default: 50)</code>
                          </div>
                        </div>

                        <div className="mt-3">
                          <p className="text-slate-300 text-sm mb-2">Example Response:</p>
                          <div className="bg-slate-950 border border-slate-700 rounded p-3 relative group">
                            <pre className="text-xs text-green-400 overflow-x-auto">
{`{
  "conversations": [
    {
      "id": "conv_123",
      "guest_name": "Sarah Johnson",
      "property_id": "prop_456",
      "property_name": "Sunset Beach Villa",
      "last_message": "What time is check-in?",
      "last_message_at": "2024-12-10T14:32:00Z",
      "unread_count": 1,
      "ai_handled": true
    }
  ],
  "total": 12,
  "page": 1
}`}
                            </pre>
                            <button 
                              onClick={() => copyToClipboard('Example response JSON', 'response')}
                              className="absolute right-2 top-2 p-1.5 bg-slate-800 hover:bg-slate-700 rounded opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              {copiedEndpoint === 'response' ? (
                                <Check className="w-3.5 h-3.5 text-green-400" />
                              ) : (
                                <Copy className="w-3.5 h-3.5 text-slate-400" />
                              )}
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Send Message */}
                      <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge className="bg-green-600 text-white border-0">POST</Badge>
                          <code className="text-blue-400 text-sm">/api/v1/conversations/:id/messages</code>
                        </div>
                        <p className="text-slate-400 text-sm mb-3">Send a message in a conversation</p>
                        
                        <div className="space-y-2">
                          <p className="text-slate-300 text-sm">Request Body:</p>
                          <div className="bg-slate-950 border border-slate-700 rounded p-3">
                            <pre className="text-xs text-green-400">
{`{
  "message": "Check-in is at 3:00 PM",
  "ai_enabled": true
}`}
                            </pre>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Webhooks */}
                  <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
                    <h4 className="text-white mb-3">Webhooks</h4>
                    <p className="text-slate-400 text-sm mb-3">
                      Subscribe to real-time events by configuring webhook endpoints:
                    </p>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-start gap-2">
                        <span className="text-purple-400">•</span>
                        <div>
                          <code className="text-purple-400">conversation.created</code>
                          <p className="text-slate-500 text-xs">New conversation started</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-purple-400">•</span>
                        <div>
                          <code className="text-purple-400">message.received</code>
                          <p className="text-slate-500 text-xs">New message from guest</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-purple-400">•</span>
                        <div>
                          <code className="text-purple-400">ai.response.sent</code>
                          <p className="text-slate-500 text-xs">AI sent automated response</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Rate Limits */}
                  <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-4">
                    <h4 className="text-amber-400 mb-2">Rate Limits</h4>
                    <p className="text-amber-300 text-sm">
                      API requests are limited to 1000 requests per hour per API key. 
                      Contact support for higher limits.
                    </p>
                  </div>

                  {/* SDK & Libraries */}
                  <div>
                    <h4 className="text-white mb-3">SDKs & Client Libraries</h4>
                    <div className="grid grid-cols-3 gap-3">
                      <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-3 text-center">
                        <p className="text-slate-300 text-sm">JavaScript/Node.js</p>
                        <code className="text-blue-400 text-xs">npm install @hostbuddy/sdk</code>
                      </div>
                      <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-3 text-center">
                        <p className="text-slate-300 text-sm">Python</p>
                        <code className="text-blue-400 text-xs">pip install hostbuddy</code>
                      </div>
                      <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-3 text-center">
                        <p className="text-slate-300 text-sm">PHP</p>
                        <code className="text-blue-400 text-xs">composer require hostbuddy/sdk</code>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="px-6 py-4 border-t border-slate-800 bg-slate-800/50 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge className="bg-blue-500/10 text-blue-400 border-blue-500/20">
                    API v1
                  </Badge>
                  <span className="text-slate-500 text-sm">Base URL: https://api.hostbuddy.ai</span>
                </div>
                <div className="flex gap-2">
                  <button className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-sm border border-slate-700 transition-colors">
                    View Full Docs
                  </button>
                  <button 
                    onClick={() => setShowApiDocs(false)}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
