import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGavel } from '@fortawesome/free-solid-svg-icons'
import { faEnvelopeOpen } from '@fortawesome/free-regular-svg-icons'
import Container from 'components/Container'
import Button from 'components/buttons/BigButton'
import './About.scss'

function About() {
  return (
    <main className="about">
      <Container className="about__container">
        <section className="about__section">
          <div className="about__section-topline">
            <FontAwesomeIcon className="about__icon" icon={faGavel} />
            <h2 className="about__section-heading">How We Can Help</h2>
          </div>
          <p className="about__text">
            Law school is a big investment and getting the right job out of law
            school is hard. hetchie was designed when a couple
            engineers-turned-law students realized most of their classmates were
            creating similar tools and researching similar topics, all for the
            same firms, just to decide where to bid.
          </p>
          <p className="about__text">
            hetchie streamlines your bidding process, using your own preferences
            to guide you to the best research for the most relevant firms. This
            research enables you to improve the list in real time and develop
            the perfect bid set for your On-Campus Interviews.
          </p>
          <p className="about__text">Don't waste your bids. Optimize them.</p>
          <Button className="about__button">Request consultation</Button>
        </section>
        <section className="about__contact">
          <div className="about__section-topline">
            <FontAwesomeIcon className="about__icon" icon={faEnvelopeOpen} />
            <h2 className="about__section-heading">Contact Us</h2>
          </div>
          <p className="about__text">
            Email:{' '}
            <a className="about__link" href="mailto:contact@hetchie.com">
              contact@hetchie.com
            </a>
          </p>
        </section>
      </Container>
    </main>
  )
}

export default About
