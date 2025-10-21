import { useState } from 'react';
import { ChevronRight, Zap, Users as UsersIcon, TrendingUp, Plus, AlertCircle } from 'lucide-react';
import MasterAccountSideNavigation from './MasterAccountSideNavigation';
import Account from './Account';
import Contacts from './Contacts';
import NotificationSettings from './NotificationSettings';
import { ActionItemsSettings } from './ActionItemsSettings';
import { Integrations } from './Integrations';
import { Users } from './Users';
import { Subscription } from './Subscription';
import WhiteLabel from './WhiteLabel';
import AddAccountModal from './AddAccountModal';
import { showSaveSuccess } from './useSaveNotification';

interface MasterAccountProps {
  onSelectPilotAccount?: () => void;
}

interface NewAccount {
  id: string;
  name: string;
  connected: boolean;
  properties: number;
  active: number;
}

export default function MasterAccount({ onSelectPilotAccount }: MasterAccountProps) {
  const [currentPage, setCurrentPage] = useState<string>('allaccounts');
  const [isAddAccountModalOpen, setIsAddAccountModalOpen] = useState(false);
  const [newAccounts, setNewAccounts] = useState<NewAccount[]>([]);

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
  };

  const handleNavigateToAllAccounts = () => {
    setCurrentPage('allaccounts');
  };

  const handleAddAccount = (accountName: string) => {
    const newAccount: NewAccount = {
      id: Date.now().toString(),
      name: accountName,
      connected: false,
      properties: 0,
      active: 0,
    };
    setNewAccounts([...newAccounts, newAccount]);
    showSaveSuccess(`Account '${accountName}' added successfully`);
  };

  return (
    <div className="flex h-screen bg-[#0F1117]">
      <MasterAccountSideNavigation 
        currentPage={currentPage} 
        onNavigate={handleNavigate}
        onNavigateToAllAccounts={handleNavigateToAllAccounts}
      />
      
      <div className="ml-[200px] flex-1 overflow-y-auto">
        {currentPage === 'allaccounts' && (
          <div className="max-w-[1100px] mx-auto px-12 py-16">
            {/* Header Section */}
            <div className="mb-12">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h1 
                    className="text-[#98bffa] text-[36px] font-['DM_Sans:Bold',_sans-serif] mb-2" 
                    style={{ fontVariationSettings: "'opsz' 14" }}
                  >
                    Accounts
                  </h1>
                  <p 
                    className="text-[#676A73] text-[14px] font-['DM_Sans:Regular',_sans-serif]" 
                    style={{ fontVariationSettings: "'opsz' 14" }}
                  >
                    Manage and monitor all your connected host accounts
                  </p>
                </div>
                
                <button 
                  className="w-12 h-12 rounded-full bg-[#3e88f7] hover:bg-[#74A9F7] flex items-center justify-center transition-all duration-300 hover:scale-110"
                  style={{ boxShadow: '0 0 30px rgba(62, 136, 247, 0.5)' }}
                  onClick={() => setIsAddAccountModalOpen(true)}
                >
                  <Plus className="w-6 h-6 text-white" />
                </button>
              </div>
            </div>

            {/* Pilot Account Card */}
            <div 
              className="bg-gradient-to-br from-[#0a0e1a] to-[#0F1117] border-2 border-[#013280] rounded-2xl p-8 mb-6 cursor-pointer hover:border-[#3e88f7] hover:scale-[1.01] transition-all duration-300 group relative overflow-hidden"
              style={{ boxShadow: '0 0 40px rgba(1, 50, 128, 0.4)' }}
              onClick={onSelectPilotAccount}
            >
              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#3e88f7]/0 via-[#3e88f7]/5 to-[#3e88f7]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Glow effect */}
              <div className="absolute -top-1 -left-1 w-20 h-20 bg-[#3e88f7] opacity-0 group-hover:opacity-20 blur-3xl transition-all duration-300 rounded-full" />
              <div className="absolute -bottom-1 -right-1 w-20 h-20 bg-[#98bffa] opacity-0 group-hover:opacity-20 blur-3xl transition-all duration-300 rounded-full" />
              
              <div className="flex items-center justify-between relative z-10">
                <div className="flex items-center gap-6">
                  {/* Account Icon */}
                  <div 
                    className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#3e88f7] to-[#013280] flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                    style={{ boxShadow: '0 0 30px rgba(62, 136, 247, 0.3)' }}
                  >
                    <UsersIcon className="w-8 h-8 text-white" />
                  </div>
                  
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h2 
                        className="text-white text-[22px] font-['DM_Sans:Bold',_sans-serif]" 
                        style={{ fontVariationSettings: "'opsz' 14" }}
                      >
                        Pilot Account
                      </h2>
                      <span 
                        className="px-3 py-1 bg-[#3e88f7]/20 border border-[#3e88f7] rounded-full text-[#98bffa] text-[11px] font-['DM_Sans:SemiBold',_sans-serif]"
                        style={{ fontVariationSettings: "'opsz' 14" }}
                      >
                        ACTIVE
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-[#00ff88]" style={{ boxShadow: '0 0 8px rgba(0, 255, 136, 0.5)' }} />
                      <p 
                        className="text-[#a6a9b2] text-[14px] font-['DM_Sans:Regular',_sans-serif]" 
                        style={{ fontVariationSettings: "'opsz' 14" }}
                      >
                        Connected to Guesty
                      </p>
                    </div>
                  </div>
                </div>
                
                <ChevronRight className="w-6 h-6 text-[#676A73] group-hover:text-[#98bffa] group-hover:translate-x-1 transition-all" />
              </div>
            </div>

            {/* New Accounts */}
            {newAccounts.length > 0 && (
              <div className="space-y-4">
                {newAccounts.map((account) => (
                  <div
                    key={account.id}
                    className="bg-gradient-to-br from-[#0a0e1a] to-[#0F1117] border border-[#013280] rounded-2xl p-8 cursor-pointer hover:border-[#3e88f7] hover:scale-[1.01] transition-all duration-300 group relative overflow-hidden"
                    style={{ boxShadow: '0 0 20px rgba(1, 50, 128, 0.2)' }}
                  >
                    {/* Gradient overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-r from-[#3e88f7]/0 via-[#3e88f7]/5 to-[#3e88f7]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    <div className="flex items-center justify-between relative z-10">
                      <div className="flex items-center gap-6">
                        {/* Account Icon */}
                        <div 
                          className="w-16 h-16 rounded-xl bg-[#0F1117] border border-[#013280] flex items-center justify-center group-hover:border-[#3e88f7] transition-all duration-300"
                        >
                          <UsersIcon className="w-8 h-8 text-[#676A73]" />
                        </div>
                        
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <h2 
                              className="text-white text-[22px] font-['DM_Sans:Bold',_sans-serif]" 
                              style={{ fontVariationSettings: "'opsz' 14" }}
                            >
                              {account.name}
                            </h2>
                            <span 
                              className="px-3 py-1 bg-[#676A73]/20 border border-[#676A73] rounded-full text-[#676A73] text-[11px] font-['DM_Sans:SemiBold',_sans-serif]"
                              style={{ fontVariationSettings: "'opsz' 14" }}
                            >
                              NOT ACTIVE
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <AlertCircle className="w-4 h-4 text-[#676A73]" />
                            <p 
                              className="text-[#676A73] text-[14px] font-['DM_Sans:Regular',_sans-serif]" 
                              style={{ fontVariationSettings: "'opsz' 14" }}
                            >
                              Not connected
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      <ChevronRight className="w-6 h-6 text-[#676A73] group-hover:text-[#98bffa] group-hover:translate-x-1 transition-all" />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {currentPage === 'account' && <Account />}
        {currentPage === 'contacts' && <Contacts />}
        {currentPage === 'notifications' && <NotificationSettings />}
        {currentPage === 'actionitems-settings' && <ActionItemsSettings />}
        {currentPage === 'integrations' && <Integrations />}
        {currentPage === 'users' && <Users />}
        {currentPage === 'subscription' && <Subscription />}
        {currentPage === 'whitelabel' && <WhiteLabel view="branding" />}
        {currentPage === 'whitelabel-features' && <WhiteLabel view="feature-selection" />}
        {currentPage === 'whitelabel-domain' && <WhiteLabel view="domain-configuration" />}
      </div>

      <AddAccountModal
        isOpen={isAddAccountModalOpen}
        onClose={() => setIsAddAccountModalOpen(false)}
        onAdd={handleAddAccount}
      />
    </div>
  );
}
