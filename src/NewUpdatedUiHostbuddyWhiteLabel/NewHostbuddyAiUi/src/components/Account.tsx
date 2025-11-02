import { useState } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from './ui/alert-dialog';
import { X, User, MapPin, Database, AlertTriangle, Lock } from 'lucide-react';
import { showSaveSuccess } from './useSaveNotification';

export default function Account() {
  const [firstName, setFirstName] = useState('Jay');
  const [lastName, setLastName] = useState('Ulrich');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('jayerlikau@gmail.com');
  const [city, setCity] = useState('San Diego');
  const [state, setState] = useState('CA');
  const [postalCode, setPostalCode] = useState('92105');
  const [country, setCountry] = useState('United States');

  const [showChangePassword, setShowChangePassword] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [showReauthConfirm, setShowReauthConfirm] = useState(false);
  const [showDisconnectConfirm, setShowDisconnectConfirm] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleChangePassword = () => {
    // Handle password change logic
    console.log('Changing password...');
    setOldPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setShowChangePassword(false);
    showSaveSuccess('Password changed successfully');
  };

  const handleReauthenticate = () => {
    console.log('Reauthenticating PMS...');
    setShowReauthConfirm(false);
  };

  const handleDisconnect = () => {
    console.log('Disconnecting PMS...');
    setShowDisconnectConfirm(false);
  };

  const handleDeleteAccount = () => {
    console.log('Deleting account...');
    setShowDeleteConfirm(false);
  };

  return (
    <div className="h-screen overflow-y-auto bg-[#0F1117]">
      <div className="max-w-[1000px] mx-auto px-8 py-12">
        <h1 className="text-white text-[28px] font-['DM_Sans:Bold',_sans-serif] mb-2" style={{ fontVariationSettings: "'opsz' 14" }}>
          Account Settings
        </h1>
        <p className="text-[#a6a9b2] text-[14px] font-['DM_Sans:Regular',_sans-serif] mb-10" style={{ fontVariationSettings: "'opsz' 14" }}>
          Manage your personal information, location, and account security
        </p>

        {/* Personal Information Section */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-6">
            <div className="h-px bg-[#3e88f7] flex-1 opacity-30"></div>
            <span className="text-[#74A9F7] text-[12px] font-['DM_Sans:SemiBold',_sans-serif] uppercase tracking-wider" style={{ fontVariationSettings: "'opsz' 14" }}>
              Personal Information
            </span>
            <div className="h-px bg-[#3e88f7] flex-1 opacity-30"></div>
          </div>

          {/* Account Details */}
          <div className="mb-8 bg-[#0a0d14] border border-[#1a1d27] rounded-xl p-6" style={{ boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)' }}>
            <div className="flex items-center gap-2.5 mb-5">
              <User className="w-5 h-5 text-[#3e88f7]" />
              <h2 className="text-white text-[18px] font-['DM_Sans:SemiBold',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
                Account Details
              </h2>
            </div>
          
            <div className="space-y-4 mb-6">
              {/* First Name and Last Name */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-white text-[14px] font-['DM_Sans:Medium',_sans-serif] mb-2" style={{ fontVariationSettings: "'opsz' 14" }}>First Name</label>
                  <Input
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="bg-[#0F1117] border-[#3e88f7] text-white h-[44px] font-['DM_Sans:Regular',_sans-serif] focus:border-[#74A9F7]"
                    style={{ fontVariationSettings: "'opsz' 14", boxShadow: '0 0 10px rgba(62, 136, 247, 0.1)' }}
                  />
                </div>
                <div>
                  <label className="block text-white text-[14px] font-['DM_Sans:Medium',_sans-serif] mb-2" style={{ fontVariationSettings: "'opsz' 14" }}>Last Name</label>
                  <Input
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="bg-[#0F1117] border-[#3e88f7] text-white h-[44px] font-['DM_Sans:Regular',_sans-serif] focus:border-[#74A9F7]"
                    style={{ fontVariationSettings: "'opsz' 14", boxShadow: '0 0 10px rgba(62, 136, 247, 0.1)' }}
                  />
                </div>
              </div>

              {/* Phone Number and Email */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-white text-[14px] font-['DM_Sans:Medium',_sans-serif] mb-2" style={{ fontVariationSettings: "'opsz' 14" }}>Phone Number</label>
                  <Input
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="(555) 123-4567"
                    className="bg-[#0F1117] border-[#3e88f7] text-white h-[44px] font-['DM_Sans:Regular',_sans-serif] placeholder:text-[#676A73] focus:border-[#74A9F7]"
                    style={{ fontVariationSettings: "'opsz' 14", boxShadow: '0 0 10px rgba(62, 136, 247, 0.1)' }}
                  />
                </div>
                <div>
                  <label className="block text-white text-[14px] font-['DM_Sans:Medium',_sans-serif] mb-2" style={{ fontVariationSettings: "'opsz' 14" }}>Email</label>
                  <Input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-[#0F1117] border-[#3e88f7] text-white h-[44px] font-['DM_Sans:Regular',_sans-serif] focus:border-[#74A9F7]"
                    style={{ fontVariationSettings: "'opsz' 14", boxShadow: '0 0 10px rgba(62, 136, 247, 0.1)' }}
                  />
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-4">
              <button 
                onClick={() => setShowChangePassword(true)}
                className="px-6 py-2.5 bg-transparent border border-[#3e88f7] text-[#3e88f7] hover:bg-[#3e88f7] hover:bg-opacity-10 text-[14px] font-['DM_Sans:SemiBold',_sans-serif] rounded-lg transition-colors flex items-center gap-2"
                style={{ fontVariationSettings: "'opsz' 14" }}
              >
                <Lock className="w-4 h-4" />
                Change Password
              </button>
              <button 
                onClick={() => showSaveSuccess('Account details saved successfully')}
                className="px-8 py-2.5 bg-[#3e88f7] hover:bg-[#74A9F7] text-white text-[14px] font-['DM_Sans:SemiBold',_sans-serif] rounded-lg transition-colors"
                style={{ fontVariationSettings: "'opsz' 14", boxShadow: '0 0 15px rgba(62, 136, 247, 0.3)' }}
              >
                Save
              </button>
            </div>
          </div>

          {/* Location / Region Settings */}
          <div className="mb-8 bg-[#0a0d14] border border-[#1a1d27] rounded-xl p-6" style={{ boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)' }}>
            <div className="flex items-center gap-2.5 mb-2">
              <MapPin className="w-5 h-5 text-[#3e88f7]" />
              <h2 className="text-white text-[18px] font-['DM_Sans:SemiBold',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
                Location / Region Settings
              </h2>
            </div>
            <p className="text-[#a6a9b2] text-[13px] mb-6 font-['DM_Sans:Regular',_sans-serif] ml-7" style={{ fontVariationSettings: "'opsz' 14" }}>
              This information is used to determine your time zone and other regional configuration. You must add sufficient information to determine your time zone before enabling certain features, such as daily notifications.
            </p>

            <div className="space-y-4 mb-6">
              {/* City and State */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-white text-[14px] font-['DM_Sans:Medium',_sans-serif] mb-2" style={{ fontVariationSettings: "'opsz' 14" }}>City</label>
                  <Input
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="bg-[#0F1117] border-[#3e88f7] text-white h-[44px] font-['DM_Sans:Regular',_sans-serif] focus:border-[#74A9F7]"
                    style={{ fontVariationSettings: "'opsz' 14", boxShadow: '0 0 10px rgba(62, 136, 247, 0.1)' }}
                  />
                </div>
                <div>
                  <label className="block text-white text-[14px] font-['DM_Sans:Medium',_sans-serif] mb-2" style={{ fontVariationSettings: "'opsz' 14" }}>State</label>
                  <Input
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="bg-[#0F1117] border-[#3e88f7] text-white h-[44px] font-['DM_Sans:Regular',_sans-serif] focus:border-[#74A9F7]"
                    style={{ fontVariationSettings: "'opsz' 14", boxShadow: '0 0 10px rgba(62, 136, 247, 0.1)' }}
                  />
                </div>
              </div>

              {/* Postal Code and Country */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-white text-[14px] font-['DM_Sans:Medium',_sans-serif] mb-2" style={{ fontVariationSettings: "'opsz' 14" }}>Postal Code</label>
                  <Input
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    className="bg-[#0F1117] border-[#3e88f7] text-white h-[44px] font-['DM_Sans:Regular',_sans-serif] focus:border-[#74A9F7]"
                    style={{ fontVariationSettings: "'opsz' 14", boxShadow: '0 0 10px rgba(62, 136, 247, 0.1)' }}
                  />
                </div>
                <div>
                  <label className="block text-white text-[14px] font-['DM_Sans:Medium',_sans-serif] mb-2" style={{ fontVariationSettings: "'opsz' 14" }}>Country</label>
                  <Input
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="bg-[#0F1117] border-[#3e88f7] text-white h-[44px] font-['DM_Sans:Regular',_sans-serif] focus:border-[#74A9F7]"
                    style={{ fontVariationSettings: "'opsz' 14", boxShadow: '0 0 10px rgba(62, 136, 247, 0.1)' }}
                  />
                </div>
              </div>
            </div>

            {/* Update Button and Timezone Display */}
            <div className="flex items-center justify-between">
              <button 
                onClick={() => showSaveSuccess('Location settings updated successfully')}
                className="px-8 py-2.5 bg-[#3e88f7] hover:bg-[#74A9F7] text-white text-[14px] font-['DM_Sans:SemiBold',_sans-serif] rounded-lg transition-colors"
                style={{ fontVariationSettings: "'opsz' 14", boxShadow: '0 0 15px rgba(62, 136, 247, 0.3)' }}
              >
                Update
              </button>

              <p className="text-[#a6a9b2] text-[13px] font-['DM_Sans:Regular',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
                Your time zone: <span className="text-white">America/Los_Angeles</span>
              </p>
            </div>
          </div>
        </div>

        {/* Integrations Section */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-6">
            <div className="h-px bg-[#3e88f7] flex-1 opacity-30"></div>
            <span className="text-[#74A9F7] text-[12px] font-['DM_Sans:SemiBold',_sans-serif] uppercase tracking-wider" style={{ fontVariationSettings: "'opsz' 14" }}>
              Integrations
            </span>
            <div className="h-px bg-[#3e88f7] flex-1 opacity-30"></div>
          </div>

          {/* PMS Settings */}
          <div className="mb-8 bg-[#0a0d14] border border-[#1a1d27] rounded-xl p-6" style={{ boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)' }}>
            <div className="flex items-center gap-2.5 mb-2">
              <Database className="w-5 h-5 text-[#3e88f7]" />
              <h2 className="text-white text-[18px] font-['DM_Sans:SemiBold',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
                PMS Settings
              </h2>
            </div>
            <p className="text-[#a6a9b2] text-[13px] mb-6 font-['DM_Sans:Regular',_sans-serif] ml-7" style={{ fontVariationSettings: "'opsz' 14" }}>
              Manage your Property Management System integration.
            </p>

            <div className="flex gap-4">
              <button 
                onClick={() => setShowReauthConfirm(true)}
                className="px-6 py-2.5 bg-[#3e88f7] hover:bg-[#74A9F7] text-white text-[14px] font-['DM_Sans:SemiBold',_sans-serif] rounded-lg transition-colors"
                style={{ fontVariationSettings: "'opsz' 14", boxShadow: '0 0 15px rgba(62, 136, 247, 0.3)' }}
              >
                Reauthenticate PMS
              </button>
              <button 
                onClick={() => setShowDisconnectConfirm(true)}
                className="px-6 py-2.5 bg-[#7f1d1d] hover:bg-[#991b1b] text-white text-[14px] font-['DM_Sans:SemiBold',_sans-serif] rounded-lg transition-colors"
                style={{ fontVariationSettings: "'opsz' 14" }}
              >
                Disconnect PMS
              </button>
            </div>
          </div>
        </div>

        {/* Danger Zone Section */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-6">
            <div className="h-px bg-[#ef4444] flex-1 opacity-30"></div>
            <span className="text-[#ef4444] text-[12px] font-['DM_Sans:SemiBold',_sans-serif] uppercase tracking-wider" style={{ fontVariationSettings: "'opsz' 14" }}>
              Danger Zone
            </span>
            <div className="h-px bg-[#ef4444] flex-1 opacity-30"></div>
          </div>

          <div className="bg-[#0a0d14] border-2 border-[#7f1d1d] rounded-xl p-6" style={{ boxShadow: '0 2px 8px rgba(127, 29, 29, 0.2)' }}>
            <div className="flex items-center gap-2.5 mb-2">
              <AlertTriangle className="w-5 h-5 text-[#ef4444]" />
              <h2 className="text-white text-[18px] font-['DM_Sans:SemiBold',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
                Delete Account
              </h2>
            </div>
            <p className="text-[#a6a9b2] text-[13px] mb-6 font-['DM_Sans:Regular',_sans-serif] ml-7" style={{ fontVariationSettings: "'opsz' 14" }}>
              These actions are destructive and cannot be undone. Please proceed with caution.
            </p>

            <button 
              onClick={() => setShowDeleteConfirm(true)}
              className="px-6 py-2.5 bg-[#7f1d1d] hover:bg-[#991b1b] text-white text-[14px] font-['DM_Sans:SemiBold',_sans-serif] rounded-lg transition-colors"
              style={{ fontVariationSettings: "'opsz' 14" }}
            >
              Delete Account
            </button>
          </div>
        </div>
      </div>

      {/* Change Password Modal */}
      <Dialog open={showChangePassword} onOpenChange={setShowChangePassword}>
        <DialogContent className="bg-[#17191f] border border-[#3e88f7] max-w-[450px] p-0" style={{ boxShadow: '0 0 30px rgba(62, 136, 247, 0.2)' }}>
          <div className="relative p-6">
            <button
              onClick={() => setShowChangePassword(false)}
              className="absolute right-4 top-4 text-[#a6a9b2] hover:text-white transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
            
            <DialogHeader className="mb-6">
              <DialogTitle className="text-white text-[20px] font-['DM_Sans:Bold',_sans-serif] text-center" style={{ fontVariationSettings: "'opsz' 14" }}>
                Change Password
              </DialogTitle>
              <DialogDescription className="text-[#a6a9b2] text-[13px] font-['DM_Sans:Regular',_sans-serif] text-center" style={{ fontVariationSettings: "'opsz' 14" }}>
                Please enter your current password and the new password you would like to set.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              <div>
                <label className="block text-white text-[14px] font-['DM_Sans:Medium',_sans-serif] mb-2" style={{ fontVariationSettings: "'opsz' 14" }}>Old Password</label>
                <Input
                  type="password"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  className="bg-[#0F1117] border-[#3e88f7] text-white h-[44px] font-['DM_Sans:Regular',_sans-serif] focus:border-[#74A9F7]"
                  style={{ fontVariationSettings: "'opsz' 14", boxShadow: '0 0 10px rgba(62, 136, 247, 0.1)' }}
                />
              </div>

              <div>
                <label className="block text-white text-[14px] font-['DM_Sans:Medium',_sans-serif] mb-2" style={{ fontVariationSettings: "'opsz' 14" }}>New Password</label>
                <Input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="bg-[#0F1117] border-[#3e88f7] text-white h-[44px] font-['DM_Sans:Regular',_sans-serif] focus:border-[#74A9F7]"
                  style={{ fontVariationSettings: "'opsz' 14", boxShadow: '0 0 10px rgba(62, 136, 247, 0.1)' }}
                />
              </div>

              <div>
                <label className="block text-white text-[14px] font-['DM_Sans:Medium',_sans-serif] mb-2" style={{ fontVariationSettings: "'opsz' 14" }}>Confirm New Password</label>
                <Input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="bg-[#0F1117] border-[#3e88f7] text-white h-[44px] font-['DM_Sans:Regular',_sans-serif] focus:border-[#74A9F7]"
                  style={{ fontVariationSettings: "'opsz' 14", boxShadow: '0 0 10px rgba(62, 136, 247, 0.1)' }}
                />
              </div>

              <div className="flex justify-center gap-3 pt-2">
                <button
                  onClick={() => {
                    setShowChangePassword(false);
                    setOldPassword('');
                    setNewPassword('');
                    setConfirmPassword('');
                  }}
                  className="px-6 py-2.5 bg-transparent border border-[#3e88f7] text-[#3e88f7] hover:bg-[#3e88f7] hover:bg-opacity-10 text-[14px] font-['DM_Sans:SemiBold',_sans-serif] rounded-lg transition-colors"
                  style={{ fontVariationSettings: "'opsz' 14" }}
                >
                  Cancel
                </button>
                <button 
                  onClick={handleChangePassword}
                  className="px-6 py-2.5 bg-[#3e88f7] hover:bg-[#74A9F7] text-white text-[14px] font-['DM_Sans:SemiBold',_sans-serif] rounded-lg transition-colors"
                  style={{ fontVariationSettings: "'opsz' 14", boxShadow: '0 0 15px rgba(62, 136, 247, 0.3)' }}
                >
                  Change Password
                </button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Reauthenticate PMS Confirmation */}
      <AlertDialog open={showReauthConfirm} onOpenChange={setShowReauthConfirm}>
        <AlertDialogContent className="bg-[#17191f] border border-[#3e88f7]" style={{ boxShadow: '0 0 30px rgba(62, 136, 247, 0.2)' }}>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white text-[18px] font-['DM_Sans:Bold',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
              Reauthenticate PMS
            </AlertDialogTitle>
            <AlertDialogDescription className="text-[#a6a9b2] text-[14px] font-['DM_Sans:Regular',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
              Are you sure you want to reauthenticate your Property Management System? This will redirect you to your PMS login page.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-transparent border border-[#3e88f7] text-[#3e88f7] hover:bg-[#3e88f7] hover:bg-opacity-10 font-['DM_Sans:SemiBold',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleReauthenticate}
              className="bg-[#3e88f7] hover:bg-[#74A9F7] text-white font-['DM_Sans:SemiBold',_sans-serif]"
              style={{ fontVariationSettings: "'opsz' 14", boxShadow: '0 0 15px rgba(62, 136, 247, 0.3)' }}
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Disconnect PMS Confirmation */}
      <AlertDialog open={showDisconnectConfirm} onOpenChange={setShowDisconnectConfirm}>
        <AlertDialogContent className="bg-[#17191f] border border-[#7f1d1d]" style={{ boxShadow: '0 0 30px rgba(127, 29, 29, 0.2)' }}>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white text-[18px] font-['DM_Sans:Bold',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
              Disconnect PMS
            </AlertDialogTitle>
            <AlertDialogDescription className="text-[#a6a9b2] text-[14px] font-['DM_Sans:Regular',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
              Are you sure you want to disconnect your Property Management System? This will stop HostBuddy from accessing your property data and guest conversations.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-transparent border border-[#3e88f7] text-[#3e88f7] hover:bg-[#3e88f7] hover:bg-opacity-10 font-['DM_Sans:SemiBold',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDisconnect}
              className="bg-[#7f1d1d] hover:bg-[#991b1b] text-white font-['DM_Sans:SemiBold',_sans-serif]"
              style={{ fontVariationSettings: "'opsz' 14" }}
            >
              Disconnect
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Delete Account Confirmation */}
      <AlertDialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
        <AlertDialogContent className="bg-[#17191f] border-2 border-[#7f1d1d]" style={{ boxShadow: '0 0 30px rgba(127, 29, 29, 0.3)' }}>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white text-[18px] font-['DM_Sans:Bold',_sans-serif] flex items-center gap-2" style={{ fontVariationSettings: "'opsz' 14" }}>
              <AlertTriangle className="w-5 h-5 text-[#ef4444]" />
              Delete Account
            </AlertDialogTitle>
            <AlertDialogDescription className="text-[#a6a9b2] text-[14px] font-['DM_Sans:Regular',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
              Are you sure you want to delete your account? This action cannot be undone and all your data will be permanently deleted.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-transparent border border-[#3e88f7] text-[#3e88f7] hover:bg-[#3e88f7] hover:bg-opacity-10 font-['DM_Sans:SemiBold',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDeleteAccount}
              className="bg-[#7f1d1d] hover:bg-[#991b1b] text-white font-['DM_Sans:SemiBold',_sans-serif]"
              style={{ fontVariationSettings: "'opsz' 14" }}
            >
              Delete Account
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
