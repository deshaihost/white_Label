import { BarChart3, TrendingUp, MessageCircle, Clock } from 'lucide-react';
import { Badge } from '../../ui/badge';

export function InsightsContent() {
  return (
    <>
      {/* Page Header */}
      <div className="px-6 py-5 border-b border-slate-800">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-white text-2xl">Insights & Analytics</h1>
              <Badge variant="outline" className="bg-amber-500/10 text-amber-400 border-amber-500/20">
                V2 Feature
              </Badge>
            </div>
            <p className="text-slate-400">Performance metrics and AI analytics dashboard</p>
          </div>
          <select className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-slate-300 focus:outline-none focus:border-blue-500">
            <option>Last 30 Days</option>
            <option>Last 7 Days</option>
            <option>Last 90 Days</option>
            <option>This Year</option>
          </select>
        </div>
      </div>

      {/* Placeholder Content */}
      <div className="p-6">
        <div className="bg-amber-500/10 border-2 border-amber-500/30 rounded-lg p-8 mb-6">
          <div className="text-center">
            <Badge variant="outline" className="bg-amber-500/10 text-amber-400 border-amber-500/20 mb-4">
              Coming in V2
            </Badge>
            <h2 className="text-white text-xl mb-2">Advanced Analytics Dashboard</h2>
            <p className="text-amber-300 mb-6">
              Track AI performance, guest satisfaction, response times, and revenue impact with comprehensive analytics and reporting
            </p>
          </div>
        </div>

        {/* Preview Stats Grid */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-slate-400 text-sm">Total Messages</p>
              <MessageCircle className="w-4 h-4 text-blue-400" />
            </div>
            <p className="text-white text-2xl mb-1">2,847</p>
            <p className="text-green-400 text-sm flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              +12% vs last month
            </p>
          </div>

          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-slate-400 text-sm">AI Response Rate</p>
              <BarChart3 className="w-4 h-4 text-purple-400" />
            </div>
            <p className="text-white text-2xl mb-1">89%</p>
            <p className="text-green-400 text-sm flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              +5% vs last month
            </p>
          </div>

          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-slate-400 text-sm">Avg Response Time</p>
              <Clock className="w-4 h-4 text-green-400" />
            </div>
            <p className="text-white text-2xl mb-1">2.3 min</p>
            <p className="text-green-400 text-sm flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              -15% vs last month
            </p>
          </div>

          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-slate-400 text-sm">Guest Satisfaction</p>
              <TrendingUp className="w-4 h-4 text-amber-400" />
            </div>
            <p className="text-white text-2xl mb-1">4.8/5</p>
            <p className="text-green-400 text-sm flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              +0.2 vs last month
            </p>
          </div>
        </div>

        {/* Chart Placeholders */}
        <div className="grid grid-cols-2 gap-6">
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
            <h3 className="text-white mb-4">Message Volume Over Time</h3>
            <div className="h-48 bg-slate-900/50 rounded-lg flex items-center justify-center border border-slate-700">
              <p className="text-slate-500">Line Chart Placeholder</p>
            </div>
          </div>

          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
            <h3 className="text-white mb-4">AI vs Manual Response Distribution</h3>
            <div className="h-48 bg-slate-900/50 rounded-lg flex items-center justify-center border border-slate-700">
              <p className="text-slate-500">Pie Chart Placeholder</p>
            </div>
          </div>

          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
            <h3 className="text-white mb-4">Response Time Trends</h3>
            <div className="h-48 bg-slate-900/50 rounded-lg flex items-center justify-center border border-slate-700">
              <p className="text-slate-500">Bar Chart Placeholder</p>
            </div>
          </div>

          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
            <h3 className="text-white mb-4">Top Performing Properties</h3>
            <div className="h-48 bg-slate-900/50 rounded-lg flex items-center justify-center border border-slate-700">
              <p className="text-slate-500">Table Placeholder</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
