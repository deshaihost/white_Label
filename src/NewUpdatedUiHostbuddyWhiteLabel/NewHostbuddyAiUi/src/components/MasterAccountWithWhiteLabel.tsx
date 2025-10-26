import { useState } from 'react';
import MasterAccountSideNavigation from './MasterAccountSideNavigation';
import WhiteLabel from './WhiteLabel';
import MasterAccount from './MasterAccount';
import Users from './Users';
import Account from './Account';
import Contacts from './Contacts';
import NotificationSettings from './NotificationSettings';
import ActionItemsSettings from './ActionItemsSettings';
import Integrations from './Integrations';
import Subscription from './Subscription';

type ConfigSection = 'branding' | 'feature-selection' | 'domain-configuration';

export default function MasterAccountWithWhiteLabel() {
  const [currentPage, setCurrentPage] = useState<string>('allaccounts');

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
  };

  const handleNavigateToAllAccounts = () => {
    setCurrentPage('allaccounts');
  };

  const renderContent = () => {
    switch (currentPage) {
      case 'allaccounts':
        return <MasterAccount />;
      
      // White Label Pages
      case 'whitelabel':
        return <WhiteLabel view="branding" />;
      case 'whitelabel-features':
        return <WhiteLabel view="feature-selection" />;
      case 'whitelabel-domain':
        return <WhiteLabel view="domain-configuration" />;
      
      // Settings Pages
      case 'account':
        return <Account />;
      case 'contacts':
        return <Contacts />;
      case 'notifications':
        return <NotificationSettings />;
      case 'actionitems-settings':
        return <ActionItemsSettings />;
      case 'integrations':
        return <Integrations />;
      case 'users':
        return <Users />;
      case 'subscription':
        return <Subscription />;
      
      default:
        return <MasterAccount />;
    }
  };

  return (
    <div className="h-screen bg-[#0F1117] overflow-hidden">
      <div className="flex h-full">
        {/* Side Navigation */}
        <MasterAccountSideNavigation
          currentPage={currentPage}
          onNavigate={handleNavigate}
          onNavigateToAllAccounts={handleNavigateToAllAccounts}
        />
        
        {/* Main Content */}
        <div className="flex-1 ml-[200px] h-full overflow-hidden">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}