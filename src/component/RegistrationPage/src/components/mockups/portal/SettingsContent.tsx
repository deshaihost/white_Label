import { User, Building, CreditCard, Shield } from 'lucide-react';

export function SettingsContent() {
  return (
    <>
      {/* Page Header */}
      <div className="px-6 py-5 border-b border-slate-800">
        <h1 className="text-white text-2xl mb-1">General Settings</h1>
        <p className="text-slate-400">Manage your account and preferences</p>
      </div>

      {/* Settings Content */}
      <div className="p-6 max-w-4xl">
        <div className="space-y-6">
          {/* Profile Settings */}
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center">
                <User className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <h3 className="text-white">Profile Information</h3>
                <p className="text-slate-400 text-sm">Update your personal details</p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-slate-300 text-sm block mb-2">Full Name</label>
                <input
                  type="text"
                  defaultValue="John Smith"
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-slate-300"
                />
              </div>
              <div>
                <label className="text-slate-300 text-sm block mb-2">Email Address</label>
                <input
                  type="email"
                  defaultValue="john@acmerentals.com"
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-slate-300"
                />
              </div>
            </div>
          </div>

          {/* Company Settings */}
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center">
                <Building className="w-5 h-5 text-green-400" />
              </div>
              <div>
                <h3 className="text-white">Company Information</h3>
                <p className="text-slate-400 text-sm">Manage your organization details</p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-slate-300 text-sm block mb-2">Company Name</label>
                <input
                  type="text"
                  defaultValue="Acme Rentals"
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-slate-300"
                />
              </div>
              <div>
                <label className="text-slate-300 text-sm block mb-2">Support Email</label>
                <input
                  type="email"
                  defaultValue="support@acmerentals.com"
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-slate-300"
                />
              </div>
            </div>
          </div>

          {/* Billing */}
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-purple-500/10 rounded-lg flex items-center justify-center">
                <CreditCard className="w-5 h-5 text-purple-400" />
              </div>
              <div>
                <h3 className="text-white">Billing & Subscription</h3>
                <p className="text-slate-400 text-sm">Manage your plan and payment methods</p>
              </div>
            </div>
            <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white mb-1">Professional Plan</p>
                  <p className="text-slate-400 text-sm">$299/month • 5 properties</p>
                </div>
                <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm transition-colors">
                  Manage Plan
                </button>
              </div>
            </div>
          </div>

          {/* Security */}
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-red-500/10 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-red-400" />
              </div>
              <div>
                <h3 className="text-white">Security Settings</h3>
                <p className="text-slate-400 text-sm">Password and authentication options</p>
              </div>
            </div>
            <div className="space-y-3">
              <button className="w-full px-4 py-2 bg-slate-700 hover:bg-slate-600 text-slate-300 rounded-lg text-sm border border-slate-600 transition-colors text-left">
                Change Password
              </button>
              <button className="w-full px-4 py-2 bg-slate-700 hover:bg-slate-600 text-slate-300 rounded-lg text-sm border border-slate-600 transition-colors text-left">
                Enable Two-Factor Authentication
              </button>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
            <button className="px-6 py-2 bg-slate-700 hover:bg-slate-600 text-slate-300 rounded-lg border border-slate-600 transition-colors">
              Cancel
            </button>
            <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
