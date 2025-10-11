import { Users } from 'lucide-react';
import { Badge } from '../ui/badge';

export function UserManagement() {
  return (
    <div className="bg-slate-800/50 rounded-lg border border-slate-700 overflow-hidden">
      <div className="bg-blue-600/10 border-b border-blue-500/20 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Users className="w-5 h-5 text-blue-400" />
          <h3 className="text-white">User Management</h3>
        </div>
        <Badge variant="outline" className="bg-green-500/10 text-green-400 border-green-500/20">
          V1
        </Badge>
      </div>

      <div className="p-6">
        <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
              <Users className="w-5 h-5 text-purple-400" />
            </div>
            <div className="flex-1">
              <h4 className="text-purple-300 mb-2">Managed via Master Account Framework</h4>
              <p className="text-slate-400 mb-4">
                User management for white-labeled instances is handled through the existing Master Account user panel. This ensures unified authentication and centralized access control.
              </p>

              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <span className="text-purple-400 mt-1">✓</span>
                  <div>
                    <p className="text-slate-300">Assign or revoke access to white-labeled instance</p>
                    <p className="text-slate-500 text-sm">Control which users can access the branded portal</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="text-purple-400 mt-1">✓</span>
                  <div>
                    <p className="text-slate-300">Role-based permissions</p>
                    <p className="text-slate-500 text-sm">Admin, Editor, and Viewer roles inherited from HostBuddy structure</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="text-purple-400 mt-1">✓</span>
                  <div>
                    <p className="text-slate-300">Single authentication ecosystem</p>
                    <p className="text-slate-500 text-sm">All white-label access within the same auth system</p>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-purple-500/20">
                <p className="text-slate-400 text-sm">
                  Navigate to: <span className="text-purple-400">Master Account → Clients → [Partner] → Users</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
