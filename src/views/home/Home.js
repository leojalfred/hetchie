import React from 'react'
import { connect } from 'react-redux'
import './Home.scss'
import Container from 'components/Container'
import Button from 'components/Buttons/BigButton'

function Home({ user, openRegisterModal }) {
  return (
    <main className="home">
      <Container>
        <div className="home__main">
          <h1 className="home__heading">hetchie</h1>
          <p className="home__text">
            Proident ex dolore aliqua enim magna reprehenderit elit proident do.
            Fugiat adipisicing aliqua consectetur voluptate Lorem minim anim sit
            reprehenderit aute enim adipisicing proident aute. Id fugiat magna
            eiusmod in aliqua commodo do ad ad fugiat mollit. Minim cillum
            cupidatat et pariatur ut sit laboris eu eu. Officia nostrud culpa
            laborum nulla mollit aute occaecat est cupidatat ea nulla laborum
            id. Velit culpa deserunt do velit duis mollit officia reprehenderit
            quis quis do commodo.
          </p>
          {!user.loggedIn && (
            <Button className="home__button" onClick={openRegisterModal}>
              Get Started
            </Button>
          )}
        </div>
      </Container>
    </main>
  )
}

const mapStateToProps = ({ user }) => ({ user })
export default connect(mapStateToProps)(Home)
