import React from 'react'
import { connect } from 'react-redux'
import './Home.scss'
import BigButton from '../../components/BigButton'

function Home({ user, openRegisterModal }) {
  return (
    <main className="home">
      <div className="home__main container">
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
        {!user.loggedIn && (
          <BigButton className="home__button" onClick={openRegisterModal}>
            Get Started
          </BigButton>
        )}
      </div>
    </main>
  )
}

const mapStateToProps = ({ user }) => ({ user })
export default connect(mapStateToProps)(Home)
