import React from 'react';
import Banner from './banner/Banner';
import Features from './features/Features';
import Works from './works/Works';
import Plans from './plans/Plans';

const Home = () => {
  return (
    <div className='home'>
      <Banner />
      <Features />
      <Works />
      <Plans />
    </div>
  )
}

export default Home
