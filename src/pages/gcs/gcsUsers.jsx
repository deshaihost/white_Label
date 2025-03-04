import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Accordion, Spinner } from 'react-bootstrap';
import { callGetGcsUserDataApi, callGetSubAccountTokenApi, setToken } from './gcs_functionality';
import Loader from '../../helper/Loader';
import AddSubAcctModal from './addSubAcctModal';
import './gcsUsers.css';

const GcsUsers = () => {
  const navigate = useNavigate();

  const [usersData, setUsersData] = useState([]);
  const [activeKey, setActiveKey] = useState(null);
  const [loadingAccounts, setLoadingAccounts] = useState(true);
  const [navigatingToSubaccount, setNavigatingToSubaccount] = useState(false);
  const [loadingAccountId, setLoadingAccountId] = useState(null); // Track which account is loading
  const [showAddModal, setShowAddModal] = useState(false); // State for modal visibility
  const [refreshTrigger, setRefreshTrigger] = useState(0); // Used to trigger a refresh

  // Function to handle accordion item selection
  const handleAccordionSelect = (itemKey) => {
    setActiveKey(activeKey === itemKey ? null : itemKey);
  };

  // Navigate to a specific subaccount's dashboard (get the token for the subaccount, save it to be used for our API calls, and redirect to the dashboard)
  const navigateToSubaccount = async (subAccountUserId) => {
    if (navigatingToSubaccount) return;
    setNavigatingToSubaccount(true);
    setLoadingAccountId(subAccountUserId); // Set the specific account as loading
    
    try {
      const token = await callGetSubAccountTokenApi(subAccountUserId);
      
      if (token) {
        setToken(token);
        navigate('/dashboard');
      } else { // If no token was returned, reset the loading state
        setLoadingAccountId(null);
        setNavigatingToSubaccount(false);
      }
    } catch (error) { // If an error occurred, reset the loading state
      setLoadingAccountId(null);
      setNavigatingToSubaccount(false);
      console.error("Error navigating to subaccount:", error);
    }
  };

  // Handle successful account addition
  const handleAccountAdded = () => {
    setRefreshTrigger(prev => prev + 1); // Increment the refresh trigger to cause a re-fetch
  };

  // Fetch users data from API on component mount
  useEffect(() => {
    const fetchUsers = async () => {
      const data = await callGetGcsUserDataApi(setLoadingAccounts);
      
      if (data && data.user && data.user.subaccounts) {
        // Transform the subaccounts object into an array for easier rendering
        const subaccountsArray = Object.entries(data.user.subaccounts).map(([id, account]) => {
          // Check integration status
          const hasIntegrations = account?.calry_integrations && Object.keys(account.calry_integrations).length > 0;
          let integrationStatus = "Not Connected";
          
          if (hasIntegrations) {
            // Get the first (and only) integration key and capitalize its first letter
            const integrationKey = Object.keys(account.calry_integrations)[0];
            const capitalizedKey = integrationKey.charAt(0).toUpperCase() + integrationKey.slice(1);
            integrationStatus = `Connected to ${capitalizedKey}`;
          }
          
          return {
            id,
            title: account.sub_account_name || `${id}`, // Use ID as fallback if no name
            subtitle: integrationStatus,
            options: ['Edit permissions', 'Reset password', 'Remove access']
          };
        });
        
        setUsersData(subaccountsArray);
      } else {
        setUsersData([]);
      }
    };
    
    fetchUsers();
  }, [refreshTrigger]); // Add refreshTrigger as a dependency to re-fetch when it changes

  return (
    <div className="gcs-users">
      <div className="setup-tile blur-background-top-right">
        <h2>PM Accounts</h2>
        
        {loadingAccounts ? (
          <div className="text-center my-5">
            <Spinner animation="border" variant="light" />
            <p className="text-light mt-3">Loading accounts...</p>
          </div>
        ) : usersData.length > 0 ? (
          <Accordion activeKey={activeKey} onSelect={handleAccordionSelect}>
            {usersData.map((user) => (
              loadingAccountId === user.id ? ( // Show loader for the specific account being loaded
                <Loader key={user.id} />
              ) : (
                <Accordion.Item eventKey={user.id} key={user.id} className='accordion-link' onClick={() => navigateToSubaccount(user.id)}>
                  <Accordion.Header>
                    {user.title}
                    <div className="subtitle">{user.subtitle}</div>
                  </Accordion.Header>
                  {false && ( // no body for now while using accordion-link items
                    <Accordion.Body>
                      <div className="accordion-content-tile">
                        <div className="user-options">
                          {user.options.map((option, index) => (
                            <button key={index} className={index === user.options.length - 1 ? "underline-btn danger" : "underline-btn"}>
                              {option}
                            </button>
                          ))}
                        </div>
                      </div>
                    </Accordion.Body>
                  )}
                </Accordion.Item>
              )
            ))}
          </Accordion>
        ) : (
          <div className="text-center my-5">
            <p className="text-light">No accounts found. Add a Guesty account to get started.</p>
          </div>
        )}
        
        {/* Add User Button */}
        <div className="other-content-tile">
          <button className="primary-btn" onClick={() => setShowAddModal(true)}>
            + Add New PM Account
          </button>
        </div>
      </div>

      {/* Add Account Modal */}
      <AddSubAcctModal show={showAddModal} handleClose={() => setShowAddModal(false)} onAccountAdded={handleAccountAdded}/>
    </div>
  );
};

export default GcsUsers;