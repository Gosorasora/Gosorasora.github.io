import React from 'react';
import Hero from '../components/Hero';
import Intro from '../components/Intro';
import Cases from '../components/Cases';
import Writing from '../components/Writing';
import About from '../components/About';
import Portfolio from '../components/Portfolio';
import Resume from '../components/Resume';

const Home = () => {
  return (
    <>
      <Intro />
      <Hero />
      <About />
      <Cases />
      <Portfolio />
      <Writing />
      <Resume />
    </>
  );
};

export default Home;
