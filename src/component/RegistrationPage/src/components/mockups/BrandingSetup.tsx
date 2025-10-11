import { Palette, Upload } from 'lucide-react';
import { Badge } from '../ui/badge';

export function BrandingSetup() {
  return (
    <div className="bg-slate-800/50 rounded-lg border border-slate-700 overflow-hidden">
      <div className="bg-blue-600/10 border-b border-blue-500/20 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Palette className="w-5 h-5 text-blue-400" />
          <h3 className="text-white">Branding Configuration</h3>
        </div>
        <Badge variant="outline" className="bg-green-500/10 text-green-400 border-green-500/20">
          V1
        </Badge>
      </div>

      <div className="p-6">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Panel - Configuration */}
          <div className="space-y-6">
            <div>
              <label className="text-slate-300 mb-2 block">Company Logo</label>
              <div className="border-2 border-dashed border-slate-600 rounded-lg p-6 hover:border-blue-500/50 transition-colors cursor-pointer">
                <div className="flex flex-col items-center gap-2">
                  <Upload className="w-8 h-8 text-slate-500" />
                  <p className="text-slate-400">Click to upload or drag and drop</p>
                  <p className="text-slate-500 text-sm">SVG, PNG or JPG (max. 2MB)</p>
                </div>
              </div>
            </div>

            <div>
              <label className="text-slate-300 mb-2 block">Favicon</label>
              <div className="border-2 border-dashed border-slate-600 rounded-lg p-4 hover:border-blue-500/50 transition-colors cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-slate-700 rounded flex items-center justify-center">
                    <Upload className="w-4 h-4 text-slate-500" />
                  </div>
                  <p className="text-slate-400">Upload favicon.ico</p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-slate-300 block">Color Palette</label>
              
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <label className="text-slate-400 text-sm">Primary</label>
                  <div className="flex gap-2">
                    <div className="w-10 h-10 rounded bg-purple-600 border border-slate-600 cursor-pointer"></div>
                    <input 
                      type="text" 
                      value="#7C3AED" 
                      className="flex-1 bg-slate-900 border border-slate-600 rounded px-3 text-slate-300"
                      readOnly
                    />
                  </div>
                  <p className="text-slate-500 text-xs">Used for buttons and CTAs</p>
                </div>

                <div className="space-y-2">
                  <label className="text-slate-400 text-sm">Accent</label>
                  <div className="flex gap-2">
                    <div className="w-10 h-10 rounded bg-blue-500 border border-slate-600 cursor-pointer"></div>
                    <input 
                      type="text" 
                      value="#3B82F6" 
                      className="flex-1 bg-slate-900 border border-slate-600 rounded px-3 text-slate-300"
                      readOnly
                    />
                  </div>
                  <p className="text-slate-500 text-xs">Used for highlights</p>
                </div>

                <div className="space-y-2">
                  <label className="text-slate-400 text-sm">Background</label>
                  <div className="flex gap-2">
                    <div className="w-10 h-10 rounded bg-slate-900 border border-slate-600 cursor-pointer"></div>
                    <input 
                      type="text" 
                      value="#0F172A" 
                      className="flex-1 bg-slate-900 border border-slate-600 rounded px-3 text-slate-300"
                      readOnly
                    />
                  </div>
                  <p className="text-slate-500 text-xs">Main background</p>
                </div>

                <div className="space-y-2">
                  <label className="text-slate-400 text-sm">Surface</label>
                  <div className="flex gap-2">
                    <div className="w-10 h-10 rounded bg-slate-800 border border-slate-600 cursor-pointer"></div>
                    <input 
                      type="text" 
                      value="#1E293B" 
                      className="flex-1 bg-slate-900 border border-slate-600 rounded px-3 text-slate-300"
                      readOnly
                    />
                  </div>
                  <p className="text-slate-500 text-xs">Cards and panels</p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-slate-300 block">Typography</label>
              <select className="w-full bg-slate-900 border border-slate-600 rounded px-4 py-2 text-slate-300">
                <option>Inter (Recommended)</option>
                <option>Roboto</option>
                <option>Open Sans</option>
                <option>Poppins</option>
              </select>
              <p className="text-slate-500 text-sm">Choose from approved font families</p>
            </div>

            <div className="flex gap-3 pt-4">
              <button className="px-4 py-2 bg-slate-700 text-slate-300 rounded-lg hover:bg-slate-600 transition-colors">
                Preview in Sandbox
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Publish Live
              </button>
            </div>
          </div>

          {/* Right Panel - Live Preview */}
          <div className="space-y-4">
            <div className="bg-slate-900 border border-slate-700 rounded-lg p-4">
              <p className="text-slate-400 text-sm mb-4">Live Preview - ACME Rentals Branded Inbox</p>
              
              {/* Mock ACME Branded Inbox Preview */}
              <div className="bg-slate-950 rounded-lg border border-slate-800 overflow-hidden">
                {/* ACME Header */}
                <div className="bg-gradient-to-r from-orange-600 to-red-600 px-4 py-3 flex items-center justify-between border-b border-orange-500/20">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-white rounded flex items-center justify-center shadow-sm">
                      <span className="text-orange-600 text-xs font-bold">AR</span>
                    </div>
                    <div>
                      <span className="text-white text-sm">ACME Rentals</span>
                      <p className="text-orange-100 text-xs">Guest Messaging</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-white/20 rounded-full"></div>
                  </div>
                </div>

                {/* Inbox Content */}
                <div className="flex h-40">
                  {/* Conversation List */}
                  <div className="w-1/3 border-r border-slate-800 bg-slate-900/50">
                    <div className="p-2 space-y-1">
                      <div className="bg-orange-600/10 border-l-2 border-orange-500 p-2 rounded">
                        <p className="text-white text-xs">Sarah Johnson</p>
                        <p className="text-slate-400 text-xs truncate">Check-in question...</p>
                      </div>
                      <div className="bg-slate-800/50 p-2 rounded hover:bg-slate-800">
                        <p className="text-slate-300 text-xs">Mike Chen</p>
                        <p className="text-slate-500 text-xs truncate">Parking info needed</p>
                      </div>
                      <div className="bg-slate-800/50 p-2 rounded hover:bg-slate-800">
                        <p className="text-slate-300 text-xs">Emma Davis</p>
                        <p className="text-slate-500 text-xs truncate">Thank you message</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Message Thread */}
                  <div className="flex-1 flex flex-col bg-slate-900/30">
                    <div className="flex-1 p-3 space-y-2">
                      <div className="flex justify-start">
                        <div className="bg-slate-800 rounded-lg rounded-tl-none px-3 py-2 max-w-[80%]">
                          <p className="text-slate-200 text-xs">Hi! What time is check-in?</p>
                        </div>
                      </div>
                      <div className="flex justify-end">
                        <div className="bg-gradient-to-r from-orange-600 to-red-600 rounded-lg rounded-tr-none px-3 py-2 max-w-[80%]">
                          <p className="text-white text-xs">Check-in is at 3:00 PM</p>
                        </div>
                      </div>
                    </div>
                    <div className="p-2 border-t border-slate-800">
                      <div className="bg-slate-800 rounded px-2 py-1.5">
                        <p className="text-slate-500 text-xs">Type a message...</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-slate-500 text-sm mt-3">
                ✓ Updates reflect instantly as you make changes
              </p>
            </div>

            <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-4">
              <p className="text-amber-400 text-sm">
                <strong>Accessibility Check:</strong> All color combinations meet WCAG 2.1 AA standards (4.5:1 contrast ratio)
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
