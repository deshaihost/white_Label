import React from 'react';
import Banner from './banner/Banner';
import Features from './features/Features';
import Works from './works/Works';
import Plans from './plans/Plans';
import DemoVideoSection from './demoVideoSection/demoVideoSection';
import { Helmet } from 'react-helmet';

const Home = () => {
  return (
    <div className='home'>
      <Helmet>
        <title>HostBuddy AI</title>
        <link rel="canonical" href="https://www.hostbuddy.ai/" />
      </Helmet>
      <Banner />
      <Works />
      <DemoVideoSection />
      <Features />
      <div style={{ height: '100px' }} /> {/* Vertical spacer */}
      <Plans />
    </div>
  )
}

export default Home
