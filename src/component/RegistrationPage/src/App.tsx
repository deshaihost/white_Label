import { BrandingSetup } from "./components/mockups/BrandingSetup";
import { SettingsSetup } from "./components/mockups/SettingsSetup";
import { UserManagement } from "./components/mockups/UserManagement";
import { BrandedPortalExperience } from "./components/mockups/BrandedPortalExperience";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "./components/ui/tabs";

export default function App() {
  return (
    <div className="min-h-screen bg-slate-950">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 py-12 px-8">
        <div className="max-w-[1800px] mx-auto">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
              <span className="text-purple-600">HB</span>
            </div>
            <h1 className="text-white">
              HostBuddy White Label System
            </h1>
          </div>
          <p className="text-purple-100 max-w-3xl">
            Complete visual walkthrough of the white label
            configuration portal and branded end-user experience
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[1800px] mx-auto px-8 py-12">
        <Tabs defaultValue="setup" className="w-full">
          <TabsList className="grid w-full max-w-[600px] grid-cols-2 mb-8">
            <TabsTrigger value="setup">
              Partner Setup Portal
            </TabsTrigger>
            <TabsTrigger value="enduser">
              End-User Experience
            </TabsTrigger>
          </TabsList>

          {/* PARTNER SETUP PORTAL */}
          <TabsContent value="setup" className="space-y-8">
            <div className="bg-slate-900 rounded-xl p-6 border border-slate-800">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-blue-500/10 border border-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-blue-400 text-xl">
                    ⚙️
                  </span>
                </div>
                <div>
                  <h2 className="text-white mb-1">
                    Partner Setup Portal
                  </h2>
                  <p className="text-slate-400">
                    Configure your branded HostBuddy instance
                    within the Master Account framework
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <BrandingSetup />
                <SettingsSetup />
                <UserManagement />
              </div>
            </div>
          </TabsContent>

          {/* END-USER EXPERIENCE */}
          <TabsContent value="enduser" className="space-y-8">
            <BrandedPortalExperience />
          </TabsContent>
        </Tabs>

        {/* System Flow Section */}
        <div className="mt-12 bg-slate-900 rounded-xl p-8 border border-slate-800">
          <h2 className="text-white mb-6">
            System Architecture & Authentication Flow
          </h2>

          <div className="grid gap-6">
            {/* Publishing Flow */}
            <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700">
              <h3 className="text-slate-200 mb-4">
                Configuration Publishing
              </h3>
              <div className="flex items-center gap-4 flex-wrap">
                <div className="px-4 py-3 bg-blue-600 text-white rounded-lg">
                  Master Account Portal
                </div>
                <div className="text-slate-500">→</div>
                <div className="px-4 py-3 bg-slate-700 text-slate-300 rounded-lg border border-slate-600">
                  Branding + Settings
                </div>
                <div className="text-slate-500">→</div>
                <div className="px-4 py-3 bg-green-600 text-white rounded-lg">
                  Live Tenant (portal.partnername.com)
                </div>
              </div>
              <p className="text-slate-400 mt-3">
                Real-time updates: Changes to branding and
                feature toggles apply instantly to preview and
                live environments
              </p>
            </div>

            {/* SSO Flow */}
            <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700">
              <h3 className="text-slate-200 mb-4">
                End-User Authentication (SSO)
              </h3>
              <div className="flex items-center gap-4 flex-wrap">
                <div className="px-4 py-3 bg-slate-700 text-white rounded-lg border border-slate-600">
                  Partner PMS
                </div>
                <div className="text-slate-500">→</div>
                <div className="px-4 py-3 bg-purple-600 text-white rounded-lg">
                  JWT Token
                </div>
                <div className="text-slate-500">→</div>
                <div className="px-4 py-3 bg-green-600 text-white rounded-lg">
                  Branded Portal
                </div>
              </div>
              <p className="text-slate-400 mt-3">
                Uses{" "}
                <code className="text-purple-400 bg-slate-900 px-2 py-1 rounded">
                  /get_subaccount_token
                </code>{" "}
                Master Account endpoint for secure session
                creation
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}