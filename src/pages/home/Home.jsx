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
        <title>Hostbuddy</title>
      </Helmet>
      <Banner />
      <Features />
      <Works />
      <Plans />
    </div>
  )
}

export default Home
