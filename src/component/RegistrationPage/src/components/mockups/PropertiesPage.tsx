import { Home, Play, Pause, Calendar, MoreVertical, Settings, Search } from 'lucide-react';
import { Badge } from '../ui/badge';

export function PropertiesPage() {
  return (
    <div className="bg-slate-800/50 rounded-lg border border-slate-700 overflow-hidden">
      <div className="bg-green-600/10 border-b border-green-500/20 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Home className="w-5 h-5 text-green-400" />
          <h3 className="text-white">1. Properties Page</h3>
        </div>
        <Badge variant="outline" className="bg-green-500/10 text-green-400 border-green-500/20">
          V1
        </Badge>
      </div>

      <div className="p-6">
        <p className="text-slate-400 mb-6">
          List view of all properties with per-property AI automation controls. First page users see after login.
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
                <button className="px-3 py-2 text-white bg-white/20 rounded-lg text-sm">Properties</button>
                <button className="px-3 py-2 text-blue-100 hover:text-white hover:bg-white/10 rounded-lg text-sm transition-colors">Messages</button>
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
            <div className="px-6 py-5 border-b border-slate-800">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h1 className="text-white text-2xl mb-1">Properties</h1>
                  <p className="text-slate-400">Manage your listings and AI automation settings</p>
                </div>
                <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center gap-2 transition-colors">
                  <Settings className="w-4 h-4" />
                  Connect PMS
                </button>
              </div>

              {/* Search and Filters */}
              <div className="flex items-center gap-3">
                <div className="relative flex-1 max-w-md">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500" />
                  <input
                    type="text"
                    placeholder="Search properties..."
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg pl-10 pr-4 py-2.5 text-slate-300 placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
                  />
                </div>
                <select className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-slate-300 focus:outline-none focus:border-blue-500">
                  <option>All Properties</option>
                  <option>Active</option>
                  <option>Paused</option>
                  <option>Scheduled</option>
                </select>
              </div>
            </div>

            {/* Properties Table */}
            <div className="p-6">
              <div className="bg-slate-800/50 rounded-lg border border-slate-700 overflow-hidden">
                {/* Table Header */}
                <div className="grid grid-cols-12 gap-4 px-6 py-4 bg-slate-800 border-b border-slate-700">
                  <div className="col-span-4 text-slate-400 text-sm uppercase tracking-wide">Property</div>
                  <div className="col-span-2 text-slate-400 text-sm uppercase tracking-wide">Status</div>
                  <div className="col-span-2 text-slate-400 text-sm uppercase tracking-wide">Messages</div>
                  <div className="col-span-2 text-slate-400 text-sm uppercase tracking-wide">Last Activity</div>
                  <div className="col-span-2 text-slate-400 text-sm uppercase tracking-wide text-right">Actions</div>
                </div>

                {/* Table Rows */}
                {[
                  { 
                    name: 'Sunset Beach Villa', 
                    address: '2840 Pacific Coast Hwy, Malibu, CA', 
                    status: 'Active', 
                    messages: 24,
                    aiHandled: 22,
                    lastActivity: '5 min ago', 
                    active: true,
                    image: '🏖️'
                  },
                  { 
                    name: 'Mountain View Retreat', 
                    address: '456 Alpine Ridge, Aspen, CO', 
                    status: 'Active', 
                    messages: 18,
                    aiHandled: 16,
                    lastActivity: '1 hour ago', 
                    active: true,
                    image: '⛰️'
                  },
                  { 
                    name: 'Downtown Modern Loft', 
                    address: '789 Market St, San Francisco, CA', 
                    status: 'Paused', 
                    messages: 8,
                    aiHandled: 5,
                    lastActivity: '3 hours ago', 
                    active: false,
                    image: '🏙️'
                  },
                  { 
                    name: 'Cozy Lakeside Cabin', 
                    address: '321 Lake Shore Dr, Lake Tahoe, CA', 
                    status: 'Scheduled', 
                    messages: 12,
                    aiHandled: 12,
                    lastActivity: '2 hours ago', 
                    active: false,
                    image: '🏡'
                  },
                  { 
                    name: 'Luxury Desert Oasis', 
                    address: '555 Palm Springs Blvd, Palm Springs, CA', 
                    status: 'Active', 
                    messages: 31,
                    aiHandled: 28,
                    lastActivity: '15 min ago', 
                    active: true,
                    image: '🌴'
                  },
                ].map((property, i) => (
                  <div 
                    key={i} 
                    className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-slate-700/50 hover:bg-slate-800/50 transition-colors group cursor-pointer"
                  >
                    <div className="col-span-4 flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-slate-700 to-slate-800 rounded-lg flex items-center justify-center text-2xl flex-shrink-0 border border-slate-600">
                        {property.image}
                      </div>
                      <div className="min-w-0">
                        <p className="text-slate-200 truncate group-hover:text-white transition-colors">
                          {property.name}
                        </p>
                        <p className="text-slate-500 text-sm truncate">{property.address}</p>
                      </div>
                    </div>
                    
                    <div className="col-span-2 flex items-center">
                      {property.status === 'Active' && (
                        <Badge className="bg-green-500/10 text-green-400 border-green-500/20">
                          <span className="mr-1.5">●</span> Active
                        </Badge>
                      )}
                      {property.status === 'Paused' && (
                        <Badge className="bg-amber-500/10 text-amber-400 border-amber-500/20">
                          <span className="mr-1.5">●</span> Paused
                        </Badge>
                      )}
                      {property.status === 'Scheduled' && (
                        <Badge className="bg-blue-500/10 text-blue-400 border-blue-500/20">
                          <span className="mr-1.5">●</span> Scheduled
                        </Badge>
                      )}
                    </div>

                    <div className="col-span-2 flex items-center">
                      <div>
                        <p className="text-slate-200">{property.messages} total</p>
                        <p className="text-purple-400 text-sm flex items-center gap-1">
                          <span className="w-1.5 h-1.5 bg-purple-400 rounded-full"></span>
                          {property.aiHandled} by AI
                        </p>
                      </div>
                    </div>

                    <div className="col-span-2 flex items-center text-slate-400 text-sm">
                      {property.lastActivity}
                    </div>

                    <div className="col-span-2 flex items-center justify-end gap-2">
                      {property.active ? (
                        <>
                          <button className="px-3 py-1.5 bg-amber-600/10 hover:bg-amber-600/20 text-amber-400 rounded-lg text-sm flex items-center gap-1.5 border border-amber-500/20 transition-colors">
                            <Pause className="w-3.5 h-3.5" />
                            Pause
                          </button>
                          <button className="p-1.5 hover:bg-slate-700 rounded-lg transition-colors">
                            <MoreVertical className="w-4 h-4 text-slate-400" />
                          </button>
                        </>
                      ) : (
                        <>
                          <button className="px-3 py-1.5 bg-green-600/10 hover:bg-green-600/20 text-green-400 rounded-lg text-sm flex items-center gap-1.5 border border-green-500/20 transition-colors">
                            <Play className="w-3.5 h-3.5" />
                            Activate
                          </button>
                          <button className="px-3 py-1.5 bg-slate-700 hover:bg-slate-600 text-slate-300 rounded-lg text-sm flex items-center gap-1.5 border border-slate-600 transition-colors">
                            <Calendar className="w-3.5 h-3.5" />
                            Schedule
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Stats Footer */}
              <div className="mt-6 grid grid-cols-4 gap-4">
                <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
                  <p className="text-slate-400 text-sm mb-1">Total Properties</p>
                  <p className="text-white text-2xl">5</p>
                </div>
                <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                  <p className="text-green-400 text-sm mb-1">Active AI</p>
                  <p className="text-white text-2xl">3</p>
                </div>
                <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4">
                  <p className="text-purple-400 text-sm mb-1">Messages Today</p>
                  <p className="text-white text-2xl">93</p>
                </div>
                <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                  <p className="text-blue-400 text-sm mb-1">AI Response Rate</p>
                  <p className="text-white text-2xl">89%</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-3 gap-4 text-sm">
          <div className="flex items-center gap-2 text-slate-400">
            <Play className="w-4 h-4 text-green-400" />
            <span>Activate AI immediately for property</span>
          </div>
          <div className="flex items-center gap-2 text-slate-400">
            <Pause className="w-4 h-4 text-amber-400" />
            <span>Pause AI automation</span>
          </div>
          <div className="flex items-center gap-2 text-slate-400">
            <Calendar className="w-4 h-4 text-blue-400" />
            <span>Schedule future activation</span>
          </div>
        </div>
      </div>
    </div>
  );
}
