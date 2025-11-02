import { useState } from 'react';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from './ui/dialog';
import { Input } from './ui/input';
import { X, Trash2, UserPlus, Shield, Eye, Users as UsersIcon } from 'lucide-react';
import { showSaveSuccess } from './useSaveNotification';

export function Users() {
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteName, setInviteName] = useState('');
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState('');
  const [isRoleOpen, setIsRoleOpen] = useState(false);

  const [users, setUsers] = useState([
    {
      name: 'Gregory Werhsu',
      email: 'gwerhsu@gmail.com',
      role: 'admin',
      status: 'active'
    }
  ]);

  const roleOptions = ['admin', 'operator', 'read only'];

  const handleSendInvite = () => {
    console.log('Sending invite:', { name: inviteName, email: inviteEmail, role: inviteRole });
    setInviteName('');
    setInviteEmail('');
    setInviteRole('');
    setShowInviteModal(false);
    showSaveSuccess('User invitation sent successfully');
  };

  const handleDeleteUser = (index: number) => {
    const updatedUsers = users.filter((_, i) => i !== index);
    setUsers(updatedUsers);
    showSaveSuccess('User removed successfully');
  };

  const getRoleIcon = (role: string) => {
    switch(role) {
      case 'admin':
        return <Shield className="w-4 h-4 text-[#3e88f7]" />;
      case 'operator':
        return <UsersIcon className="w-4 h-4 text-[#98bffa]" />;
      case 'read only':
        return <Eye className="w-4 h-4 text-[#a6a9b2]" />;
      default:
        return null;
    }
  };

  return (
    <div className="flex-1 bg-[#0F1117] overflow-y-auto">
      <div className="max-w-[1400px] mx-auto p-8">
        <div className="mb-8">
          <h1 className="text-white text-[28px] font-['DM_Sans:Bold',_sans-serif] mb-2" style={{ fontVariationSettings: "'opsz' 14" }}>
            Your Team
          </h1>
          <p className="text-[#a6a9b2] text-[14px] font-['DM_Sans:Regular',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
            Manage team members and their access levels
          </p>
        </div>

        {/* Users Table */}
        <div className="mb-8">
          <div className="bg-[#17191f] border border-[#013280] rounded-xl overflow-hidden">
            {/* Table Header */}
            <div className="grid grid-cols-[3fr_2fr_1fr_1fr] border-b border-[#013280] bg-[#24262e]">
              <div className="p-4">
                <span className="text-white text-[14px] font-['DM_Sans:SemiBold',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>User</span>
              </div>
              <div className="p-4">
                <span className="text-white text-[14px] font-['DM_Sans:SemiBold',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>Role</span>
              </div>
              <div className="p-4">
                <span className="text-white text-[14px] font-['DM_Sans:SemiBold',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>Status</span>
              </div>
              <div className="p-4">
                <span className="text-white text-[14px] font-['DM_Sans:SemiBold',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>Manage</span>
              </div>
            </div>

            {/* User Rows */}
            {users.map((user, index) => (
              <div key={index} className="grid grid-cols-[3fr_2fr_1fr_1fr] border-b border-[#013280] last:border-b-0 hover:bg-[#24262e] transition-all duration-200">
                <div className="p-4">
                  <div className="flex flex-col gap-1">
                    <span className="text-white text-[15px] font-['DM_Sans:Medium',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>{user.name}</span>
                    <span className="text-[#a6a9b2] text-[13px] font-['DM_Sans:Regular',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>{user.email}</span>
                  </div>
                </div>
                <div className="p-4 flex items-center gap-2">
                  {getRoleIcon(user.role)}
                  <span className="text-white text-[14px] font-['DM_Sans:Regular',_sans-serif] capitalize" style={{ fontVariationSettings: "'opsz' 14" }}>{user.role}</span>
                </div>
                <div className="p-4 flex items-center">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse" style={{ boxShadow: '0 0 8px rgba(16, 185, 129, 0.5)' }}></div>
                    <span className="text-[#10b981] text-[13px] font-['DM_Sans:Medium',_sans-serif] capitalize" style={{ fontVariationSettings: "'opsz' 14" }}>{user.status}</span>
                  </div>
                </div>
                <div className="p-4 flex items-center">
                  <button
                    onClick={() => handleDeleteUser(index)}
                    className="flex items-center gap-2 text-[#ef4444] hover:text-[#f87171] transition-colors group"
                  >
                    <Trash2 className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    <span className="text-[13px] font-['DM_Sans:Medium',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>Delete</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Invite User Button */}
        <div className="flex justify-center mb-8">
          <button
            onClick={() => setShowInviteModal(true)}
            className="flex items-center gap-2 bg-[#3e88f7] hover:bg-[#74A9F7] text-white px-8 py-3 rounded-xl text-[14px] font-['DM_Sans:SemiBold',_sans-serif] transition-all duration-200 transform hover:scale-105"
            style={{ fontVariationSettings: "'opsz' 14", boxShadow: '0 0 25px rgba(62, 136, 247, 0.4)' }}
          >
            <UserPlus className="w-5 h-5" />
            Invite User
          </button>
        </div>

        {/* Role Descriptions */}
        <div className="bg-[#17191f] border border-[#013280] rounded-xl p-6 space-y-5">
          <h3 className="text-white text-[18px] font-['DM_Sans:SemiBold',_sans-serif] mb-2" style={{ fontVariationSettings: "'opsz' 14" }}>Role Permissions</h3>
          
          <div className="flex items-start gap-3">
            <Shield className="w-5 h-5 text-[#3e88f7] mt-0.5 flex-shrink-0" />
            <p className="text-[#d0d3db] text-[14px] leading-relaxed font-['DM_Sans:Regular',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
              <span className="text-white font-['DM_Sans:SemiBold',_sans-serif]">ADMIN</span> users can perform any action on the account, including inviting new users, changing account settings, and updating payment information.
            </p>
          </div>
          
          <div className="flex items-start gap-3">
            <UsersIcon className="w-5 h-5 text-[#98bffa] mt-0.5 flex-shrink-0" />
            <p className="text-[#d0d3db] text-[14px] leading-relaxed font-['DM_Sans:Regular',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
              <span className="text-white font-['DM_Sans:SemiBold',_sans-serif]">OPERATOR</span> users can perform most actions on the account, including changing general settings. They cannot invite new users or update payment information.
            </p>
          </div>
          
          <div className="flex items-start gap-3">
            <Eye className="w-5 h-5 text-[#a6a9b2] mt-0.5 flex-shrink-0" />
            <p className="text-[#d0d3db] text-[14px] leading-relaxed font-['DM_Sans:Regular',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
              <span className="text-white font-['DM_Sans:SemiBold',_sans-serif]">READ ONLY</span> users can view all data in the account, but cannot make any changes. They cannot access the payment portal or view any payment/billing information.
            </p>
          </div>
        </div>
      </div>

      {/* Invite User Modal */}
      <Dialog open={showInviteModal} onOpenChange={setShowInviteModal}>
        <DialogContent className="bg-[#0a0d14] border-2 border-[#3e88f7] max-w-[550px] p-0 gap-0 rounded-xl" style={{ boxShadow: '0 0 40px rgba(62, 136, 247, 0.3)' }}>
          <DialogTitle className="sr-only">Invite User</DialogTitle>
          <DialogDescription className="sr-only">
            Enter user details to invite a new team member to your account.
          </DialogDescription>
          
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-[#013280] bg-[#17191f]">
            <div className="flex items-center gap-3">
              <UserPlus className="w-6 h-6 text-[#3e88f7]" />
              <h2 className="text-white text-[20px] font-['DM_Sans:SemiBold',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>Invite User</h2>
            </div>
            <button
              onClick={() => setShowInviteModal(false)}
              className="text-[#a6a9b2] hover:text-white transition-colors hover:rotate-90 duration-200"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            <p className="text-[#a6a9b2] text-[14px] leading-relaxed mb-6 font-['DM_Sans:Regular',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
              Invite a new team member by entering their details below. They'll receive an email with instructions to join your team.
            </p>

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-white text-[14px] font-['DM_Sans:Medium',_sans-serif] mb-2" style={{ fontVariationSettings: "'opsz' 14" }}>Full Name</label>
                <Input
                  value={inviteName}
                  onChange={(e) => setInviteName(e.target.value)}
                  placeholder="John Doe"
                  className="bg-[#17191f] border-[#3e88f7] text-white h-[44px] placeholder:text-[#676A73] font-['DM_Sans:Regular',_sans-serif]"
                  style={{ fontVariationSettings: "'opsz' 14", boxShadow: '0 0 10px rgba(62, 136, 247, 0.1)' }}
                />
              </div>

              <div>
                <label className="block text-white text-[14px] font-['DM_Sans:Medium',_sans-serif] mb-2" style={{ fontVariationSettings: "'opsz' 14" }}>Email Address</label>
                <Input
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  placeholder="john@example.com"
                  className="bg-[#17191f] border-[#3e88f7] text-white h-[44px] placeholder:text-[#676A73] font-['DM_Sans:Regular',_sans-serif]"
                  style={{ fontVariationSettings: "'opsz' 14", boxShadow: '0 0 10px rgba(62, 136, 247, 0.1)' }}
                />
              </div>

              <div>
                <label className="block text-white text-[14px] font-['DM_Sans:Medium',_sans-serif] mb-2" style={{ fontVariationSettings: "'opsz' 14" }}>Role</label>
                <div className="relative">
                  <button
                    onClick={() => setIsRoleOpen(!isRoleOpen)}
                    className="w-full bg-[#17191f] border border-[#3e88f7] h-[44px] rounded-lg px-3 flex items-center justify-between text-left font-['DM_Sans:Regular',_sans-serif]"
                    style={{ fontVariationSettings: "'opsz' 14", boxShadow: '0 0 10px rgba(62, 136, 247, 0.1)' }}
                  >
                    <span className={`text-[14px] flex items-center gap-2 ${inviteRole ? 'text-white' : 'text-[#676A73]'}`}>
                      {inviteRole && getRoleIcon(inviteRole)}
                      <span className="capitalize">{inviteRole || 'Select role'}</span>
                    </span>
                    <svg className="w-4 h-4 text-[#a6a9b2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {isRoleOpen && (
                    <>
                      <div className="fixed inset-0 z-10" onClick={() => setIsRoleOpen(false)} />
                      <div className="absolute top-full left-0 right-0 mt-1 bg-[#17191f] border border-[#3e88f7] rounded-lg overflow-hidden z-20" style={{ boxShadow: '0 0 20px rgba(62, 136, 247, 0.2)' }}>
                        {roleOptions.map((role) => (
                          <button
                            key={role}
                            onClick={() => {
                              setInviteRole(role);
                              setIsRoleOpen(false);
                            }}
                            className="w-full px-3 py-2.5 text-left text-white text-[14px] hover:bg-[#3e88f7] hover:bg-opacity-10 transition-colors flex items-center gap-2 font-['DM_Sans:Regular',_sans-serif] capitalize"
                            style={{ fontVariationSettings: "'opsz' 14" }}
                          >
                            {getRoleIcon(role)}
                            {role}
                          </button>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className="flex justify-center">
              <button
                onClick={handleSendInvite}
                className="flex items-center gap-2 bg-[#3e88f7] hover:bg-[#74A9F7] text-white px-8 py-3 rounded-xl text-[14px] font-['DM_Sans:SemiBold',_sans-serif] transition-all duration-200 transform hover:scale-105"
                style={{ fontVariationSettings: "'opsz' 14", boxShadow: '0 0 20px rgba(62, 136, 247, 0.3)' }}
              >
                <UserPlus className="w-4 h-4" />
                Send Invite
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
