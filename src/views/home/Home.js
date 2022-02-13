import React from 'react'
import { connect } from 'react-redux'
import Button from '../../components/buttons/BigButton'
import Container from '../../components/Container'
import './Home.scss'

function Home({ user, openRegisterModal }) {
  return (
    <main className="home">
      <Container>
        <div className="home__main">
          <h1 className="home__heading">hetchie</h1>
          <p className="home__text">Welcome to hetchie!</p>
          <p className="home__text">
            hetchie is a revolutionary tool, designed to streamline your
            preparation for On-Campus Interviews by sorting participating firms
            by your interests and guiding you directly to the best resources
            available.
          </p>
          {!user.loggedIn && (
            <Button className="home__button" onClick={openRegisterModal}>
              Get started
            </Button>
          )}
        </div>
      </Container>
    </main>
  )
}

const mapStateToProps = ({ user }) => ({ user })
export default connect(mapStateToProps)(Home)
