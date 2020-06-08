import React from 'react';
import Navbar from '../../components/Navbar';
import BigButtonLink from '../../components/BigButtonLink';
import './Home.scss';

function Home() {
  return (
    <>
      <Navbar />
      <main className="home container">
        <h1 className="home__heading">hetchie</h1>
        <p className="home__text">
          Proident ex dolore aliqua enim magna reprehenderit elit proident do.
          Fugiat adipisicing aliqua consectetur voluptate Lorem minim anim sit
          reprehenderit aute enim adipisicing proident aute. Id fugiat magna
          eiusmod in aliqua commodo do ad ad fugiat mollit. Minim cillum
          cupidatat et pariatur ut sit laboris eu eu. Officia nostrud culpa
          laborum nulla mollit aute occaecat est cupidatat ea nulla laborum id.
          Velit culpa deserunt do velit duis mollit officia reprehenderit quis
          quis do commodo.
        </p>
        <BigButtonLink className="home__button" to="/register">
          Get Started
        </BigButtonLink>
      </main>
    </>
  );
}

export default Home;
