import React from 'react';
import Banner from './banner/Banner';
import Features from './features/Features';
import Works from './works/Works';

const Home = () => {
  return (
    <div className='home'>
      <Banner />
      <Features />
      <Works />
    </div>
  )
}

export default Home
