import { Plus, Search, Edit, Copy, Trash2, Clock } from 'lucide-react';
import { Badge } from '../../ui/badge';

export function TemplatesContent() {
  const templates = [
    { 
      id: 1,
      name: 'Welcome Message', 
      category: 'Check-in',
      preview: 'Welcome to [Property Name]! We are excited to host you. Your check-in time is...',
      lastUsed: '2 hours ago',
      uses: 45
    },
    { 
      id: 2,
      name: 'Check-in Instructions', 
      category: 'Check-in',
      preview: 'Here are your check-in instructions for [Property Name]. The door code is...',
      lastUsed: '5 hours ago',
      uses: 38
    },
    { 
      id: 3,
      name: 'WiFi Information', 
      category: 'Property Info',
      preview: 'Here are the WiFi details: Network: [WiFi Name], Password: [WiFi Password]...',
      lastUsed: '1 day ago',
      uses: 67
    },
    { 
      id: 4,
      name: 'Checkout Reminder', 
      category: 'Checkout',
      preview: 'Thank you for staying with us! Just a reminder that checkout is at 11:00 AM...',
      lastUsed: '3 hours ago',
      uses: 52
    },
    { 
      id: 5,
      name: 'Local Recommendations', 
      category: 'Guest Experience',
      preview: 'Here are some local favorites we think you will love! Restaurants: [List]...',
      lastUsed: '6 hours ago',
      uses: 23
    },
    { 
      id: 6,
      name: 'Parking Instructions', 
      category: 'Property Info',
      preview: 'Parking is available in the designated area. The gate code is...',
      lastUsed: '2 days ago',
      uses: 31
    },
  ];

  return (
    <>
      {/* Page Header */}
      <div className="px-6 py-5 border-b border-slate-800">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-white text-2xl mb-1">Smart Templates</h1>
            <p className="text-slate-400">Create and manage AI-powered message templates</p>
          </div>
          <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center gap-2 transition-colors">
            <Plus className="w-4 h-4" />
            Create Template
          </button>
        </div>

        {/* Search and Filters */}
        <div className="flex items-center gap-3">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              placeholder="Search templates..."
              className="w-full bg-slate-800 border border-slate-700 rounded-lg pl-10 pr-4 py-2.5 text-slate-300 placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>
          <select className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-slate-300 focus:outline-none focus:border-blue-500">
            <option>All Categories</option>
            <option>Check-in</option>
            <option>Checkout</option>
            <option>Property Info</option>
            <option>Guest Experience</option>
          </select>
        </div>
      </div>

      {/* Templates Grid */}
      <div className="p-6">
        <div className="grid gap-4">
          {templates.map((template) => (
            <div
              key={template.id}
              className="bg-slate-800/50 border border-slate-700 rounded-lg p-5 hover:bg-slate-800 transition-colors group"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-white group-hover:text-blue-400 transition-colors">
                      {template.name}
                    </h3>
                    <Badge variant="outline" className="bg-blue-500/10 text-blue-400 border-blue-500/20 text-xs">
                      {template.category}
                    </Badge>
                  </div>
                  <p className="text-slate-400 text-sm line-clamp-2">
                    {template.preview}
                  </p>
                </div>
                <div className="flex items-center gap-1 ml-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="p-2 hover:bg-slate-700 rounded-lg transition-colors" title="Edit">
                    <Edit className="w-4 h-4 text-slate-400" />
                  </button>
                  <button className="p-2 hover:bg-slate-700 rounded-lg transition-colors" title="Duplicate">
                    <Copy className="w-4 h-4 text-slate-400" />
                  </button>
                  <button className="p-2 hover:bg-slate-700 rounded-lg transition-colors" title="Delete">
                    <Trash2 className="w-4 h-4 text-red-400" />
                  </button>
                </div>
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-4 text-slate-500">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4" />
                    <span>Used {template.lastUsed}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span>•</span>
                    <span>{template.uses} times total</span>
                  </div>
                </div>
                <button className="text-blue-400 hover:text-blue-300 transition-colors">
                  View Details →
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Cards */}
        <div className="mt-6 grid grid-cols-3 gap-4">
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
            <p className="text-slate-400 text-sm mb-1">Total Templates</p>
            <p className="text-white text-2xl">6</p>
          </div>
          <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
            <p className="text-blue-400 text-sm mb-1">Most Used</p>
            <p className="text-white text-lg">WiFi Information</p>
          </div>
          <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4">
            <p className="text-purple-400 text-sm mb-1">Avg. Daily Uses</p>
            <p className="text-white text-2xl">23</p>
          </div>
        </div>
      </div>
    </>
  );
}
