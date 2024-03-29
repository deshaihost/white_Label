import React from 'react';
import './meetHostBuddy.css';
import MeetBanner from './banner/MeetBanner';
import Setup from './setup/Setup';
import Discover from './discover/Discover';
import { Helmet } from 'react-helmet';

const MeetHostBoddy = () => {
  return (
    <div className='meet-buddy'>
      <Helmet>
        <title>Meet HostBuddy – Hostbuddy</title>
      </Helmet>
        <div className="meet-buddy-container">
          <MeetBanner />
          <Setup />
          <Discover />
        </div>
    </div>
  )
}

export default MeetHostBoddy
