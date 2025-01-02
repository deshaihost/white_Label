import { getSubscriptionStatus } from "../../helper/Authorized";
import AccountNotifBanner from "./accountNotifBanner";
import { Link } from "react-router-dom";

const SubscriptionBanner = ({ userData, bottomMargin, topMargin}) => {

  if (!userData) { return null; }
  
  const { plan, status } = getSubscriptionStatus(userData);
  let title = '';
  let message = '';
  let theme = 'default';
  const now = new Date();

  if (plan === 'trial') {
    if (!userData.trial_ends) { return null; }
    const trialEnds = new Date(userData.trial_ends);
    const daysRemaining = Math.ceil((trialEnds - now) / (1000 * 60 * 60 * 24));

    if (daysRemaining > 5) {
      // User is in trial with more than 5 days remaining
      title = 'Free Trial';
      message = (<>HostBuddy is free for {daysRemaining} more day{daysRemaining !== 1 ? 's' : ''}. <Link to="/properties">Subscribe</Link> to ensure continued access when the trial ends.</>);
      theme = 'default';
    } else {
      // User is in trial with 5 or fewer days remaining
      title = 'Trial Ending Soon';
      message = (<>{daysRemaining} day{daysRemaining !== 1 ? 's' : ''} remain{daysRemaining !== 1 ? '' : 's'} in your free trial. <Link to="/properties">Subscribe</Link> to ensure continued access when the trial ends.</>);
      theme = 'warning';
    }
  } else if (plan === 'trial_over') {
    if (userData?.subscription) { return null; } // for legacy subscr format users. Just don't show the banner

    // Free trial has ended, and user has not subscribed
    title = 'Free Trial Ended';
    message = (<>Your free trial has ended. <Link to="/properties">Subscribe</Link> to continue using HostBuddy.</>);
    theme = 'warning';
  } else if (status === 'canceled') {
    const subscrEndDate = userData?.subscr_payment_good_until ? new Date(userData.subscr_payment_good_until) : null;
    if (plan === 'subscription_over') {
      // User has canceled and subscription has ended
      title = 'Subscription Ended';
      message = (<>Your subscription has been canceled and is no longer active. <Link to="/properties">Subscribe</Link> to continue using HostBuddy.</>);
      theme = 'default';
    } else if (subscrEndDate && now < subscrEndDate) {
      // User has canceled, and subscription will end in the future
      const endDateStr = subscrEndDate.toLocaleDateString();
      title = 'Subscription Canceled';
      message = `Your subscription has been canceled and will end on ${endDateStr}.`;
      theme = 'default';
    } else {
      // Shouldn't happen. Canceled should be caught by one of the two above
      title = 'Subscription Canceled';
      message = 'Your subscription has been canceled, and services will end soon.';
      theme = 'default';
    }
  } else if (status === 'payment_failed') {
    const subscrEndDate = userData.subscr_payment_good_until ? new Date(userData.subscr_payment_good_until) : null;
    let daysSinceEnd = 0;
    if (subscrEndDate) {
      daysSinceEnd = Math.ceil((now - subscrEndDate) / (1000 * 60 * 60 * 24));
    }

    // User has a payment failure. Show the same banner with default theme first, then warning after 3 days, then error after 5 days
    title = 'Payment Failed';
    message = 'Your last subscription payment failed. Please update your payment information and try again to avoid service interruption.';
    theme = daysSinceEnd < 3 ? 'default' : daysSinceEnd <= 5 ? 'warning' : 'error';
  } else {
    return null;
  }

  return (
    <AccountNotifBanner title={title} message={message} theme={theme} bottomMargin={bottomMargin} topMargin={topMargin}/>
  );
};

export default SubscriptionBanner;