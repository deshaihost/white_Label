import React from 'react';
import Banner from './banner/Banner';
import Features from './features/Features';
import Works from './works/Works';
import Plans from './plans/Plans';
import { Helmet } from 'react-helmet';

const Home = () => {
  return (
    <div className='home'>
      <Helmet>
        <title>HostBuddy</title>
      </Helmet>
      <Banner />
      <Works />
      <Features />
      <div style={{ height: '100px' }} /> {/* Vertical spacer */}
      <Plans />
    </div>
  )
}

export default Home
