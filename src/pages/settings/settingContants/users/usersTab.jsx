import React, { useEffect, useState } from 'react';
import InviteModal from './inviteModal';
import InboxUpgrade from './inbox_Upgrade/InboxUpgrade';
import { Link } from "react-router-dom";
import ToastHandle from '../../../../helper/ToastMessage';
import Loader from '../../../../helper/Loader';
import axios from 'axios';
import { getSubscriptionStatus } from '../../../../helper/Authorized';
import './users.css';

// Icon Components
const UserPlusIcon = () => (
  <svg className="users-invite-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
  </svg>
);

const Trash2Icon = () => (
  <svg className="users-delete-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </svg>
);

const ShieldIcon = () => (
  <svg className="users-table-role-icon admin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
);

const UsersIconSvg = () => (
  <svg className="users-table-role-icon operator" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>
);

const EyeIcon = () => (
  <svg className="users-table-role-icon readonly" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
);

const XIcon = () => (
  <svg className="users-modal-close-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const ChevronDownIcon = () => (
  <svg className="users-role-dropdown-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
);

const UsersTab = (userData) => {
  const mainUserEmail = userData?.userData?.email;

  const [getSubUsersIsLoading, setGetSubUsersIsLoading] = useState(false);
  const [apiSubUsers, setApiSubUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState('');
  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);
  const [sendInviteIsLoading, setSendInviteIsLoading] = useState(false);
  const [removingUsers, setRemovingUsers] = useState({});

  // Get user's subscription plan and determine max users allowed
  const subscriptionStatus = getSubscriptionStatus(userData?.userData);
  const subscriptionPlan = subscriptionStatus.plan;

  // Determine max users based on plan (sub-users only, not including main user)
  const getMaxUsersAllowed = (plan) => {
    if (!plan) return 0; // No sub-users allowed for no plan
    const planLower = plan.toLowerCase();
    if (planLower.includes('ultimate') || planLower.includes('trial')) return Infinity;
    if (planLower.includes('elite')) return 3; // 3 additional sub-users
    if (planLower.includes('pro')) return 1; // 1 additional sub-user
    // Trial users get unlimited users
    return 0; // Default: no sub-users for other plans
  };

  const maxUsersAllowed = getMaxUsersAllowed(subscriptionPlan);
  const currentSubUserCount = apiSubUsers.length; // Only count sub-users, not the main user

  // Debug logging to help troubleshoot
  console.log('Debug - Users Tab:', {
    subscriptionPlan,
    maxUsersAllowed,
    apiSubUsersLength: apiSubUsers.length,
    currentSubUserCount,
    remaining: maxUsersAllowed - currentSubUserCount
  });

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
    // For Ultimate and Trial plans, always allow
    if (maxUsersAllowed === Infinity) {
      setIsModalOpen(true);
      return;
    }
    // For Elite and Pro plans, check if sub-user count exceeds limit  
    // Elite: 3 sub-users allowed, Pro: 1 sub-user allowed
    if (currentSubUserCount >= maxUsersAllowed) {
      setIsUpgradeModalOpen(true);
    } else {
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

  // Get role icon component
  const getRoleIcon = (role) => {
    const roleLower = role?.toLowerCase() || '';
    if (roleLower === 'admin') return <ShieldIcon />;
    if (roleLower === 'operator') return <UsersIconSvg />;
    if (roleLower.includes('read')) return <EyeIcon />;
    return null;
  };

  // Get status class
  const getStatusClass = (status) => {
    const statusLower = status?.toLowerCase() || '';
    if (statusLower === 'active') return 'active';
    if (statusLower === 'pending') return 'pending';
    return 'inactive';
  };

  return (
    <div className="users-container">
      {/* Page Header */}
      <div>
        <h1 className="users-page-title">Your Team</h1>
        <p className="users-page-subtitle">
          Manage team members and their access levels
        </p>
      </div>

      {/* Users Table */}
      {!getSubUsersIsLoading ? (
        <div className="users-table-container">
          {/* Table Header */}
          <div className="users-table-header">
            <div className="users-table-header-cell">User</div>
            <div className="users-table-header-cell">Role</div>
            <div className="users-table-header-cell">Status</div>
            <div className="users-table-header-cell">Manage</div>
          </div>

          {/* User Rows */}
          {apiSubUsers.length > 0 ? (
            apiSubUsers.map((user, index) => {
              const { email, role, status } = user;
              const statusClass = getStatusClass(status);

              return (
                <div key={index} className="users-table-row">
                  {/* User Cell */}
                  <div className="users-table-user-cell">
                    <span className="users-table-user-name">{email.split('@')[0] || 'User'}</span>
                    <span className="users-table-user-email">{email}</span>
                  </div>

                  {/* Role Cell */}
                  <div className="users-table-role-cell">
                    {getRoleIcon(role)}
                    <span className="users-table-role-text">{role}</span>
                  </div>

                  {/* Status Cell */}
                  <div className="users-table-status-cell">
                    <div className={`users-status-indicator ${statusClass}`}></div>
                    <span className={`users-status-text ${statusClass}`}>{status}</span>
                  </div>

                  {/* Manage Cell */}
                  <div className="users-table-manage-cell">
                    {email !== mainUserEmail && (
                      removingUsers[email] ? (
                        <Loader />
                      ) : (
                        <button
                          type="button"
                          className="users-delete-btn"
                          onClick={() => {
                            if (window.confirm("Are you sure you want to remove this user?")) {
                              callRemoveUserApi(email);
                            }
                          }}
                        >
                          <Trash2Icon />
                          <span>Delete</span>
                        </button>
                      )
                    )}
                  </div>
                </div>
              );
            })
          ) : (
            <div className="users-empty-state">
              No team members yet. Click "Invite User" to add your first team member.
            </div>
          )}
        </div>
      ) : (
        <div className="users-loading-container">
          <Loader />
        </div>
      )}

      {/* Invite User Button */}
      <div className="users-invite-btn-container">
        <button
          type="button"
          className="users-invite-btn"
          onClick={handleInviteClick}
        >
          <UserPlusIcon />
          <span>Invite User</span>
        </button>
      </div>

      {/* Role Permissions Card */}
      <div className="users-permissions-card">
        <h3 className="users-permissions-title">Role Permissions</h3>
        
        <div className="users-permission-item">
          <ShieldIcon />
          <p className="users-permission-text">
            <span className="users-permission-role">ADMIN</span> users can perform any action on the account, including inviting new users, changing account settings, and updating payment information.
          </p>
        </div>

        <div className="users-permission-item">
          <UsersIconSvg />
          <p className="users-permission-text">
            <span className="users-permission-role">OPERATOR</span> users can perform most actions on the account, including changing general settings. They cannot invite new users or update payment information.
          </p>
        </div>

        <div className="users-permission-item">
          <EyeIcon />
          <p className="users-permission-text">
            <span className="users-permission-role">READ ONLY</span> users can view all data in the account, but cannot make any changes. They cannot access the payment portal or view any payment/billing information.
          </p>
        </div>
      </div>

      {/* Invite User Modal */}
      {isModalOpen && (
        <div className="users-modal-overlay">
          <div className="users-modal-content">
            {/* Modal Header */}
            <div className="users-modal-header">
              <div className="users-modal-title-wrapper">
                <UserPlusIcon />
                <h2 className="users-modal-title">Invite User</h2>
              </div>
              <button
                type="button"
                className="users-modal-close"
                onClick={() => {
                  setIsModalOpen(false);
                  setInviteEmail('');
                  setInviteRole('');
                }}
              >
                <XIcon />
              </button>
            </div>

            {/* Modal Body */}
            <div className="users-modal-body">
              <p className="users-modal-description">
                Invite a new team member by entering their details below. They'll receive an email with instructions to join your team.
              </p>

              {/* Full Name Input */}
              <div className="users-modal-input-group">
                <label className="users-modal-label" htmlFor="inviteEmail">
                  Email Address
                </label>
                <input
                  type="email"
                  id="inviteEmail"
                  className="users-modal-input"
                  placeholder="john@example.com"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                />
              </div>

              {/* Role Dropdown */}
              <div className="users-modal-input-group">
                <label className="users-modal-label" htmlFor="inviteRole">
                  Role
                </label>
                <div className="users-role-dropdown-wrapper">
                  <button
                    type="button"
                    className="users-role-dropdown-button"
                    onClick={() => setIsRoleDropdownOpen(!isRoleDropdownOpen)}
                  >
                    <span className={`users-role-dropdown-value ${!inviteRole ? 'placeholder' : ''}`}>
                      {inviteRole && getRoleIcon(inviteRole)}
                      <span>{inviteRole || 'Select role'}</span>
                    </span>
                    <ChevronDownIcon />
                  </button>

                  {isRoleDropdownOpen && (
                    <>
                      <div
                        className="users-role-dropdown-overlay"
                        onClick={() => setIsRoleDropdownOpen(false)}
                      />
                      <div className="users-role-dropdown-menu">
                        {['admin', 'operator', 'read only'].map((role) => (
                          <button
                            key={role}
                            type="button"
                            className="users-role-dropdown-item"
                            onClick={() => {
                              setInviteRole(role);
                              setIsRoleDropdownOpen(false);
                            }}
                          >
                            {getRoleIcon(role)}
                            <span>{role}</span>
                          </button>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <div className="users-modal-actions">
                <button
                  type="button"
                  className="users-modal-submit-btn"
                  onClick={handleModalSubmit}
                  disabled={sendInviteIsLoading}
                >
                  <UserPlusIcon />
                  <span>{sendInviteIsLoading ? 'Sending...' : 'Send Invite'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

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