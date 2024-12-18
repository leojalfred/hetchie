import Button from '../../components/buttons/BigButton'
import Container from '../../components/Container'
import './About.scss'

function About() {
  return (
    <main className="about">
      <Container className="about__container">
        <section className="about__section">
          <h2 className="about__section-heading">How We Can Help</h2>
          <p>
            Law school is a big investment and getting the right job out of law
            school is hard. hetchie was designed when a couple
            engineers-turned-law students realized most of their classmates were
            creating similar tools and researching similar topics, all for the
            same firms, just to decide where to bid.
          </p>
          <p>
            hetchie streamlines your bidding process, using your own preferences
            to guide you to the best research for the most relevant firms. This
            research enables you to improve the list in real time and develop
            the perfect bid set for your On-Campus Interviews.
          </p>
          <p className="about__text">Don't waste your bids. Optimize them.</p>
          <Button className="about__button" href="mailto:contact@hetchie.com">
            Request consultation
          </Button>
        </section>
        <section className="about__contact">
          <h2 className="about__section-heading">Contact Us</h2>
          <p className="about__contact-text">
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
