import { Play, Pause, Calendar, MoreVertical, Settings, Search } from 'lucide-react';
import { Badge } from '../../ui/badge';

interface PropertiesContentProps {
  onPropertyClick: (propertyId: string) => void;
}

export function PropertiesContent({ onPropertyClick }: PropertiesContentProps) {
  const properties = [
    { 
      id: 'sunset-villa',
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
      id: 'mountain-retreat',
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
      id: 'downtown-loft',
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
      id: 'lakeside-cabin',
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
      id: 'desert-oasis',
      name: 'Luxury Desert Oasis', 
      address: '555 Palm Springs Blvd, Palm Springs, CA', 
      status: 'Active', 
      messages: 31,
      aiHandled: 28,
      lastActivity: '15 min ago', 
      active: true,
      image: '🌴'
    },
  ];

  return (
    <>
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
          {properties.map((property) => (
            <div 
              key={property.id}
              className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-slate-700/50 hover:bg-slate-800/50 transition-colors group"
            >
              <div className="col-span-4 flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-slate-700 to-slate-800 rounded-lg flex items-center justify-center text-2xl flex-shrink-0 border border-slate-600">
                  {property.image}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-slate-200 truncate group-hover:text-white transition-colors">
                    {property.name}
                  </p>
                  <p className="text-slate-500 text-sm truncate mb-1">{property.address}</p>
                  <button
                    onClick={() => onPropertyClick(property.id)}
                    className="text-blue-400 hover:text-blue-300 text-xs flex items-center gap-1 transition-colors"
                  >
                    Edit property profile →
                  </button>
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
                    <button 
                      onClick={(e) => e.stopPropagation()}
                      className="px-3 py-1.5 bg-amber-600/10 hover:bg-amber-600/20 text-amber-400 rounded-lg text-sm flex items-center gap-1.5 border border-amber-500/20 transition-colors"
                    >
                      <Pause className="w-3.5 h-3.5" />
                      Pause
                    </button>
                    <button 
                      onClick={(e) => e.stopPropagation()}
                      className="p-1.5 hover:bg-slate-700 rounded-lg transition-colors"
                    >
                      <MoreVertical className="w-4 h-4 text-slate-400" />
                    </button>
                  </>
                ) : (
                  <>
                    <button 
                      onClick={(e) => e.stopPropagation()}
                      className="px-3 py-1.5 bg-green-600/10 hover:bg-green-600/20 text-green-400 rounded-lg text-sm flex items-center gap-1.5 border border-green-500/20 transition-colors"
                    >
                      <Play className="w-3.5 h-3.5" />
                      Activate
                    </button>
                    <button 
                      onClick={(e) => e.stopPropagation()}
                      className="px-3 py-1.5 bg-slate-700 hover:bg-slate-600 text-slate-300 rounded-lg text-sm flex items-center gap-1.5 border border-slate-600 transition-colors"
                    >
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
    </>
  );
}
