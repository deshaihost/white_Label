import React from 'react';
import { Modal } from 'react-bootstrap';
import Loader from '../../../../helper/Loader';
import { getSubscriptionStatus } from '../../../../helper/Authorized';
import { Link } from "react-router-dom";

const InviteModal = ({show, onClose, userData, sendInviteIsLoading, handleModalSubmit, email, role, setEmail, setRole}) => {

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  // Check user's subscription plan and determine if they can invite users
  const subscription_plan = getSubscriptionStatus(userData?.userData).plan;
  
  // Determine if user can invite users based on plan
  const canInviteUsers = (plan) => {
    if (!plan) return false;
    const planLower = plan.toLowerCase();
    return planLower.includes('pro') || planLower.includes('elite') || planLower === 'trial';
  };
  
  const userHasPermission = canInviteUsers(subscription_plan);

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

          {userHasPermission ? (
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
                {subscription_plan ? 
                  'You must be on the Pro plan or higher to invite users.' : 
                  'You must subscribe to invite users.'
                }
              </p>
              {subscription_plan ? (
                <Link to="/setting/subscription">Upgrade Your Subscription</Link>
              ) : (
                <Link to="/properties">Subscribe</Link>
              )}
            </div>
          )}

        </div>
      </Modal.Body>
    </Modal>
  );
};

export default InviteModal;