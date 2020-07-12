import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-regular-svg-icons'
import { faListOl } from '@fortawesome/free-solid-svg-icons'
import { connect } from 'react-redux'
import Modal from './Modal'
import Ranker from './Ranker'
import './PreferencesModal.scss'

function PreferencesModal({ auth, isOpen, closeModal }) {
  const [user, setUser] = useState()
  useEffect(() => setUser(auth.user), [auth])

  return (
    <Modal
      contentLabel="Settings Modal"
      isOpen={isOpen}
      onRequestClose={closeModal}
      icon={faListOl}
    >
      <div className="modal__content">
        <div className="modal__topline">
          <div className="modal__text">
            <h2 className="modal__heading">Firm preferences</h2>
            <p className="modal__description">
              Enter your GPA and rank your location and practice preferences to
              personalize your search results
            </p>
          </div>

          <FontAwesomeIcon
            className="modal__close"
            icon={faTimesCircle}
            onClick={closeModal}
          />
        </div>

        <div className="preferences">
          <div className="preferences__ranker">
            <h3 className="preferences__title">Location Preferences</h3>
            <Ranker />
          </div>
          <div className="preferences__ranker">
            <h3 className="preferences__title">Practice Preferences</h3>
            <Ranker />
          </div>
        </div>
      </div>
    </Modal>
  )
}

const mapStateToProps = ({ auth }) => ({ auth })
export default connect(mapStateToProps)(PreferencesModal)
