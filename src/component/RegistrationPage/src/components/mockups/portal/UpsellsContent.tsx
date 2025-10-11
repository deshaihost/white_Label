import { DollarSign, Plus, TrendingUp, Calendar } from 'lucide-react';
import { Badge } from '../../ui/badge';

export function UpsellsContent() {
  const upsells = [
    {
      id: 1,
      name: 'Gap Night Upsells',
      type: 'Gap Night',
      description: 'Automatically offer discounted rates to fill vacant nights between bookings',
      status: 'Active',
      conversions: 12,
      revenue: '$1,840',
      properties: 5
    },
    {
      id: 2,
      name: 'Inquiry Followups',
      type: 'Inquiry',
      description: 'Send automated follow-up messages to guests who inquired but did not book',
      status: 'Active',
      conversions: 8,
      revenue: '$2,240',
      properties: 5
    },
    {
      id: 3,
      name: 'Last-Minute Weekend Deal',
      type: 'Gap Night',
      description: 'Special pricing for weekend bookings made within 48 hours',
      status: 'Paused',
      conversions: 5,
      revenue: '$890',
      properties: 3
    },
  ];

  return (
    <>
      {/* Page Header */}
      <div className="px-6 py-5 border-b border-slate-800">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-white text-2xl mb-1">Upsells</h1>
            <p className="text-slate-400">Automated upsell campaigns to increase revenue</p>
          </div>
          <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center gap-2 transition-colors">
            <Plus className="w-4 h-4" />
            Create Campaign
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="px-6 py-4 border-b border-slate-800 bg-slate-900/30">
        <div className="grid grid-cols-4 gap-4">
          <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3">
            <p className="text-green-400 text-sm mb-1">Total Revenue</p>
            <p className="text-white text-2xl">$4,970</p>
          </div>
          <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3">
            <p className="text-blue-400 text-sm mb-1">Conversions</p>
            <p className="text-white text-2xl">25</p>
          </div>
          <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-3">
            <p className="text-purple-400 text-sm mb-1">Active Campaigns</p>
            <p className="text-white text-2xl">2</p>
          </div>
          <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-3">
            <p className="text-amber-400 text-sm mb-1">Avg. Conversion Rate</p>
            <p className="text-white text-2xl">18%</p>
          </div>
        </div>
      </div>

      {/* Upsell Campaigns */}
      <div className="p-6">
        <div className="space-y-4">
          {upsells.map((upsell) => (
            <div
              key={upsell.id}
              className="bg-slate-800/50 border border-slate-700 rounded-lg p-5 hover:bg-slate-800 transition-colors"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-white">{upsell.name}</h3>
                    <Badge variant="outline" className="bg-blue-500/10 text-blue-400 border-blue-500/20 text-xs">
                      {upsell.type}
                    </Badge>
                    {upsell.status === 'Active' ? (
                      <Badge className="bg-green-500/10 text-green-400 border-green-500/20">
                        <span className="mr-1">●</span> Active
                      </Badge>
                    ) : (
                      <Badge className="bg-amber-500/10 text-amber-400 border-amber-500/20">
                        <span className="mr-1">●</span> Paused
                      </Badge>
                    )}
                  </div>
                  <p className="text-slate-400 text-sm mb-3">{upsell.description}</p>
                  
                  <div className="flex items-center gap-6 text-sm">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-green-400" />
                      <span className="text-slate-400">{upsell.conversions} conversions</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-green-400" />
                      <span className="text-slate-400">{upsell.revenue} revenue</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-blue-400" />
                      <span className="text-slate-400">{upsell.properties} properties</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 ml-4">
                  <button className="px-3 py-1.5 bg-slate-700 hover:bg-slate-600 text-slate-300 rounded-lg text-sm border border-slate-600 transition-colors">
                    View Details
                  </button>
                  {upsell.status === 'Active' ? (
                    <button className="px-3 py-1.5 bg-amber-600/10 hover:bg-amber-600/20 text-amber-400 rounded-lg text-sm border border-amber-500/20 transition-colors">
                      Pause
                    </button>
                  ) : (
                    <button className="px-3 py-1.5 bg-green-600/10 hover:bg-green-600/20 text-green-400 rounded-lg text-sm border border-green-500/20 transition-colors">
                      Activate
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Info Box */}
        <div className="mt-6 bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
          <h4 className="text-blue-400 mb-2">Campaign Types</h4>
          <div className="space-y-2 text-sm">
            <p className="text-slate-400">
              <strong className="text-blue-400">Gap Night Upsells:</strong> Automatically fill vacant nights between bookings with discounted offers
            </p>
            <p className="text-slate-400">
              <strong className="text-blue-400">Inquiry Followups:</strong> Re-engage guests who inquired but did not complete their booking
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
