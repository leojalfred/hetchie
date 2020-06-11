import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGavel } from '@fortawesome/free-solid-svg-icons';
import { faEnvelopeOpen } from '@fortawesome/free-regular-svg-icons';
import Navbar from '../../components/Navbar';
import BigButtonLink from '../../components/BigButton';
import './About.scss';

function About({ openLoginModal, openRegisterModal }) {
  return (
    <>
      <div className="about__jumbotron">
        <Navbar openLoginModal={openLoginModal} />
        <div className="about__container container">
          <h1 className="about__heading">About hetchie</h1>
        </div>
      </div>
      <main className="about__main container">
        <section className="about__section">
          <div className="about__section-topline">
            <FontAwesomeIcon className="about__icon" icon={faGavel} />
            <h2 className="about__section-heading">How We Can Help</h2>
          </div>
          <p className="about__text">
            Law school is a big investment, and getting the right job out of law
            school can be hard. hetchie was designed after a couple
            engineers-turned-law students realized most of their classmates were
            creating similar tools and researching similar topics, all for the
            same firms, just to decide where to bid.
          </p>
          <p className="about__text">
            hetchie streamlines your bidding process, starting with information
            fro you, such as your GPA and position preferences, and then giving
            you a custom-tailored list for your bids. The list provides access
            to other resources that will enable you to further refine your list,
            making sure your bids reflect the firms that you're actually
            interested in.
          </p>
          <p className="about__text">Don't waste your bids. Optimize them.</p>
          <BigButtonLink className="about__button">
            Request Consultation
          </BigButtonLink>
        </section>
        <section className="about__contact">
          <div className="about__section-topline">
            <FontAwesomeIcon className="about__icon" icon={faEnvelopeOpen} />
            <h2 className="about__section-heading">Contact Us</h2>
          </div>
          <p className="about__text">
            Email: <a href="mailto:email@email.com">email@email.com</a>
          </p>
        </section>
      </main>
    </>
  );
}

export default About;
