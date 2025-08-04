import React from 'react';
import { Modal } from 'react-bootstrap';
import Loader from '../../../../helper/Loader';
import { getSubscriptionStatus } from '../../../../helper/Authorized';
import { Link } from "react-router-dom";

const InviteModal = ({show, onClose, userData, sendInviteIsLoading, handleModalSubmit, email, role, setEmail, setRole, currentSubUserCount, maxUsersAllowed}) => {

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  // Check user's subscription plan and determine if they can invite users
  // Use getSubscriptionStatus from Authorized.js to get the plan
   const subscription_plan = getSubscriptionStatus(userData?.userData).plan;
 

  console.log( "sub debug", subscription_plan);
  
  // Determine if user can invite users based on plan and current count
  const canInviteUsers = (plan) => {
    if (!plan) return false; // No plan = no invites allowed
    const planLower = plan.toLowerCase();
    
    // Ultimate and Trial plans - always allow invites
    if (planLower.includes('ultimate') || planLower.includes('trial')) return true;
    
    // For Elite plan: allow if sub-users is less than 3
    if (planLower.includes('elite')) {
      return currentSubUserCount < 3;
    }
    
    // For Pro plan: allow if sub-users is less than 1  
    if (planLower.includes('pro')) {
      return currentSubUserCount < 1;
    }
    
    return false;
  };
  
  // Check if user should see upgrade prompt
  const shouldShowUpgrade = (plan) => {
    if (!plan) return true; // No plan = show subscribe link
    const planLower = plan.toLowerCase();
    
    // Ultimate and Trial - never show upgrade
    if (planLower.includes('ultimate') || planLower.includes('trial')) return false;
    
    // For Elite: show upgrade if sub-users >= 3
    if (planLower.includes('elite')) {
      return currentSubUserCount >= 3;
    }
    
    // For Pro: show upgrade if sub-users >= 1
    if (planLower.includes('pro')) {
      return currentSubUserCount >= 1;
    }
    
    return true;
  };
  
  const userHasPermission = canInviteUsers(subscription_plan);
  const showUpgradePrompt = shouldShowUpgrade(subscription_plan);

  return (
    <Modal show={show} size="lg" onHide={onClose} aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <h5 className="modal-title">Invite User</h5>
      </Modal.Header>
      <Modal.Body>
        <div>
          <p style={{color:'#DDD', marginBottom:'40px', fontSize:'16px'}}>Enter an email address to invite a new user to your account. They will be sent an email with a link to create an account, if they haven't already, and an invitation to join your team.</p>

          <label htmlFor="email" style={{ display:'block', marginBottom:'2px' }}>Email Address</label>
          <input id='email' className='form-control' type="email" placeholder="Enter email address" value={email} onChange={handleEmailChange} style={{ width:'100%', padding:'10px', marginBottom:'15px' }}/>

          <label htmlFor="role" style={{ display: 'block', marginBottom: '2px' }}>Role</label>
          <select id='role' className='form-control' value={role} onChange={handleRoleChange} style={{ width:'100%', padding:'10px' }}>
            <option value="" disabled>Select role</option>
            <option value="admin">Admin</option>
            <option value="operator">Operator</option>
            <option value="read_only">Read Only</option>
          </select>

          {userHasPermission && !showUpgradePrompt ? (
            !sendInviteIsLoading ? (
              <button className="btn btn-primary" onClick={handleModalSubmit} style={{display:'block', margin:'40px auto 0 auto', borderRadius:'50px', padding:'10px 20px'}}>
                Send Invite
              </button>
            ) : (
              <Loader />
            )
          ) : (
            <div style={{ textAlign: 'center', marginTop: '40px' }}>
              <p style={{ color: 'rgb(255,165,0)', fontSize: '16px' }}>
                {!subscription_plan ? 
                  'You must subscribe to invite users.' :
                  subscription_plan.toLowerCase().includes('pro') ?
                    'You have reached the maximum users for Pro plan. Upgrade to Elite or Ultimate to add more users.' :
                  subscription_plan.toLowerCase().includes('elite') ?
                    'You have reached the maximum users for Elite plan (3 sub-users allowed). Upgrade to Ultimate for unlimited users.' :
                    'You must be on the Elite plan or Ultimate to invite users.'
                }
              </p>
              {!subscription_plan ? (
                <Link to="/properties">Subscribe</Link>
              ) : !subscription_plan.toLowerCase().includes('ultimate') && !subscription_plan.toLowerCase().includes('trial') ? (
                <Link to="/setting/subscription">Upgrade Your Subscription</Link>
              ) : null}
            </div>
          )}

        </div>
      </Modal.Body>
    </Modal>
  );
};

export default InviteModal;