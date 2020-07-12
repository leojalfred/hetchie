import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-regular-svg-icons'
import { faListOl } from '@fortawesome/free-solid-svg-icons'
import { Formik, Form } from 'formik'
import { connect } from 'react-redux'
import Modal from './Modal'
import Ranker from './Ranker'
import './PreferencesModal.scss'

function PreferencesModal({ auth, isOpen, closeModal }) {
  const [user, setUser] = useState()
  useEffect(() => setUser(auth.user), [auth])

  const initialValues = {
    'location-0': '',
    'location-1': '',
    'location-2': '',
    'location-3': '',
    'location-4': '',
    'practice-0': '',
    'practice-1': '',
    'practice-2': '',
    'practice-3': '',
    'practice-4': '',
  }

  const onSubmit = async user => console.log('meme')

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

        <Formik initialValues={initialValues} onSubmit={onSubmit}>
          {({ isSubmitting }) => (
            <Form>
              <div className="preferences">
                <div className="preferences__ranker">
                  <h3 className="preferences__title">Location Preferences</h3>
                  <Ranker type="location" />
                </div>
                <div className="preferences__ranker">
                  <h3 className="preferences__title">Practice Preferences</h3>
                  <Ranker type="practice" />
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </Modal>
  )
}

const mapStateToProps = ({ auth }) => ({ auth })
export default connect(mapStateToProps)(PreferencesModal)
