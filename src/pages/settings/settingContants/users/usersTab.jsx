import React, { useEffect, useState } from 'react';
import InviteModal from './inviteModal';
import InboxUpgrade from './inbox_Upgrade/InboxUpgrade';
import { Link } from "react-router-dom";
import ToastHandle from '../../../../helper/ToastMessage';
import Loader from '../../../../helper/Loader';
import axios from 'axios';
import { getSubscriptionStatus } from '../../../../helper/Authorized';

const UsersTab = (userData) => {
  const mainUserEmail = userData?.userData?.email;

  const [getSubUsersIsLoading, setGetSubUsersIsLoading] = useState(false);
  const [apiSubUsers, setApiSubUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState('');
  const [sendInviteIsLoading, setSendInviteIsLoading] = useState(false);
  const [removingUsers, setRemovingUsers] = useState({});

  // Get user's subscription plan and determine max users allowed
  const subscriptionStatus = getSubscriptionStatus(userData?.userData);
  const subscriptionPlan = subscriptionStatus.plan;

  // Determine max users based on plan
  const getMaxUsersAllowed = (plan) => {
    if (!plan) return 0;
    const planLower = plan.toLowerCase();
    if (planLower.includes('pro')) return 1;
    if (planLower.includes('elite')) return 3;
    if (planLower.includes('ultimate')) return Infinity; // Ultimate users get unlimited users
    if (planLower === 'trial') return 3; // Trial users get Elite benefits
    return 0; // Default for other plans or no plan
  };

  const maxUsersAllowed = getMaxUsersAllowed(subscriptionPlan);
  const currentUserCount = apiSubUsers.length + 1; // +1 for the main user

  const callGetSubUsersApi = async () => {
    const baseUrl = process.env.REACT_APP_API_ENDPOINT;
    const API_KEY = process.env.REACT_APP_API_KEY;
    setGetSubUsersIsLoading(true);

    try {
      const config = {
        headers: { "X-API-Key": API_KEY, 'Content-Type': 'application/json' },
        validateStatus: function (status) { return status >= 200 && status < 500; } // don't throw an error for non-2xx responses
      };

      const response = await axios.get(`${baseUrl}/get_sub_users`, config);

      if (response.status === 200) {
        setApiSubUsers(response?.data?.sub_users);
      }
    }
    catch (error) { }
    finally {
      setGetSubUsersIsLoading(false);
    }
  };

  const callSendInviteApi = async (email) => {
    const baseUrl = process.env.REACT_APP_API_ENDPOINT;
    const API_KEY = process.env.REACT_APP_API_KEY;
    setSendInviteIsLoading(true);

    try {
      const config = {
        headers: { "X-API-Key": API_KEY, 'Content-Type': 'application/json' },
        validateStatus: function (status) { return status >= 200 && status < 500; }
      };
      const body_data = { 'email': inviteEmail, 'role': inviteRole };

      const response = await axios.post(`${baseUrl}/invite_sub_user`, body_data, config);

      if (response.status === 200) {
        ToastHandle("User invited successfully", "success");
        return true;
      }
      else {
        ToastHandle(response.data.error, "danger");
        return false;
      }
    }
    catch (error) { ToastHandle("Error inviting user", "danger"); }
    finally { setSendInviteIsLoading(false); }
    return false;
  };

  const callRemoveUserApi = async (email) => {
    const baseUrl = process.env.REACT_APP_API_ENDPOINT;
    const API_KEY = process.env.REACT_APP_API_KEY;
    setRemovingUsers((prev) => ({ ...prev, [email]: true }));
    try {
      const config = {
        headers: { "X-API-Key": API_KEY, 'Content-Type': 'application/json' },
        validateStatus: (status) => status >= 200 && status < 500
      };
      const body_data = { email };
      const res = await axios.post(`${baseUrl}/remove_sub_user`, body_data, config);
      if (res.status === 200) {
        ToastHandle("User removed successfully", "success");
        callGetSubUsersApi();
      } else {
        ToastHandle(res.data.error, "danger");
      }
    } catch (error) {
      ToastHandle("Error removing user", "danger");
    } finally {
      setRemovingUsers((prev) => {
        const newObj = { ...prev };
        delete newObj[email];
        return newObj;
      });
    }
  };

  // When the page loads, call the API to get sub users
  useEffect(() => {
    callGetSubUsersApi();
  }, []);

  const handleInviteClick = () => {
    // Check if user has a valid plan that allows inviting users
    if (maxUsersAllowed === 0) {
      // User has no plan or plan doesn't allow users, show upgrade modal
      setIsUpgradeModalOpen(true);
      return;
    }

    // Check if user can add more users based on their plan
    if (currentUserCount >= maxUsersAllowed) {
      // User has reached their plan limit, show upgrade modal
      setIsUpgradeModalOpen(true);
    } else {
      // User can add more users, show regular invite modal
      setIsModalOpen(true);
    }
  };

  const handleModalSubmit = async () => {
    // Validate that both inputs are filled
    if (!inviteEmail || !inviteRole) {
      ToastHandle("Please fill in both fields", "danger");
      return;
    }
    // validate the email address using regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(inviteEmail)) {
      ToastHandle("Invalid email address", "danger");
      return;
    }
    // If valid, call the API to send the invite
    const apiSuccess = await callSendInviteApi();
    if (apiSuccess) {
      setInviteEmail('');
      setInviteRole('');
      setIsModalOpen(false);
      callGetSubUsersApi();
    }
  };

  return (
    <div className='settings-integrations'>
      <h3 className="mb-4">Your Team</h3>

      {/* Remaining users bar */}
      <div style={{
        display: 'inline-flex',
        alignItems: 'center',
        background: '#232335',
        borderRadius: '32px',
        padding: '8px 24px',
        fontSize: '14px',
        color: '#bfc0d2',
        marginBottom: '16px',
        marginLeft: '2px',
        fontFamily: 'inherit',
      }}>
        <span style={{marginRight: '8px', letterSpacing: '0.5px'}}>
          Remaining users: {maxUsersAllowed === Infinity ? '∞' : Math.max(0, maxUsersAllowed - currentUserCount)}
        </span>
        <span 
          style={{ color: '#2970ff', cursor: 'pointer', fontWeight: 500, marginLeft: '8px', fontFamily: 'inherit' }}
          onClick={handleInviteClick}
        >
          Add more
        </span>
      </div>

      <table style={{ marginTop: '40px', width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ padding: '10px', borderBottom: '1px solid white', fontSize: '18px', color: '#AAA' }}>Users</th>
            <th style={{ padding: '10px', borderBottom: '1px solid white', fontSize: '18px', color: '#AAA' }}>Role</th>
            <th style={{ padding: '10px', borderBottom: '1px solid white', fontSize: '18px', color: '#AAA' }}>Status</th>
            <th style={{ padding: '10px', borderBottom: '1px solid white', fontSize: '18px', color: '#AAA' }}>Manage</th>
          </tr>
        </thead>
        <tbody>
          {!getSubUsersIsLoading ? (
            apiSubUsers.map((user, index) => {
              const { email, role, status } = user;

              return (
                <tr key={index} style={{ height: '40px', borderBottom: '1px solid white' }}>
                  <td style={{ padding: '10px', fontSize: '14px' }}>{email}</td>
                  <td style={{ padding: '10px', fontSize: '14px' }}>{role}</td>
                  <td style={{ padding: '10px', fontSize: '14px' }}>{status}</td>
                  <td style={{ padding: '10px', fontSize: '14px' }}>
                    {email !== mainUserEmail && (
                      removingUsers[email] ? <Loader /> : <span style={{ color: 'red', cursor: 'pointer' }} onClick={() => {
                        if (window.confirm("Are you sure you want to remove this user?")) {
                          callRemoveUserApi(email);
                        }
                      }}
                      >
                        Remove
                      </span>
                    )
                    }
                  </td>
                </tr>
              );
            })
          ) : (
            <Loader />
          )}
        </tbody>
      </table>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '40px' }}>
        <button type="button" className="btn btn-primary" style={{ borderRadius: '50px', padding: '10px 20px' }} onClick={handleInviteClick}>
          Invite User
        </button>
        {/* <p style={{ fontSize: '14px', color: '#AAA', marginTop: '10px', textAlign: 'center' }}>
          {maxUsersAllowed > 0 ? (
            maxUsersAllowed === Infinity ? (
              `${currentUserCount} users (${subscriptionPlan} plan - unlimited)`
            ) : (
              `${currentUserCount} of ${maxUsersAllowed} users used (${subscriptionPlan} plan)`
            )
          ) : subscriptionPlan ? (
            'Upgrade your plan to invite team members'
          ) : (
            'Subscribe to invite team members'
          )}
        </p> */}
      </div>

      <p style={{ fontSize: '16px', width: '100%', marginTop: '60px' }}>ADMIN users can perform any action on the account, including inviting new users, changing account settings, and updating payment information.</p>
      <p style={{ fontSize: '16px', width: '100%', marginTop: '10px' }}>OPERATOR users can perform most actions on the account, including changing general settings. They cannot invite new users or update payment information.</p>
      <p style={{ fontSize: '16px', width: '100%', marginTop: '10px' }}>READ ONLY users can view all data in the account, but cannot make any changes. They cannot access the payment portal or view any payment/billing information.</p>

      <InviteModal show={isModalOpen} onClose={() => setIsModalOpen(false)} userData={userData} sendInviteIsLoading={sendInviteIsLoading} handleModalSubmit={handleModalSubmit} email={inviteEmail} setEmail={setInviteEmail} role={inviteRole} setRole={setInviteRole} />

      {/* InboxUpgrade Modal */}
      {isUpgradeModalOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 1050,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px'
        }}>
          <InboxUpgrade
            title="Upgrade Your HostBuddy Plan"
            description="You've reached the maximum number of users for your current plan. Upgrade to add more team members."
            onComparePlans={() => {
              setIsUpgradeModalOpen(false);
              window.location.href = '/setting/subscription';
            }}
            onMaybeLater={() => setIsUpgradeModalOpen(false)}
          />
        </div>
      )}
    </div>
  );
};

export default UsersTab;