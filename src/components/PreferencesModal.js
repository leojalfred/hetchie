import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-regular-svg-icons'
import { faListOl } from '@fortawesome/free-solid-svg-icons'
import { connect } from 'react-redux'
import { putUserPreferences } from '../actions/userActions'
import Modal from './Modal'
import Ranker from './Ranker'
import Button from './BigButton'
import './PreferencesModal.scss'

function PreferencesModal({ user, putUserPreferences, isOpen, closeModal }) {
  const [locations, setLocations] = useState()
  const [practices, setPractices] = useState()
  useEffect(() => {
    async function getData() {
      const locationsResponse = await axios.get('/locations')
      const locationsData = locationsResponse.data
      const locationOptions = locationsData.map(({ _id, name }) => ({
        value: _id,
        label: name,
      }))
      setLocations(locationOptions)

      const practicesResponse = await axios.get('/practices')
      const practicesData = practicesResponse.data
      const practiceOptions = practicesData.map(({ _id, name }) => ({
        value: _id,
        label: name,
      }))
      setPractices(practiceOptions)
    }
    getData()
  }, [])

  const [userLocations, setUserLocations] = useState()
  const [userPractices, setUserPractices] = useState()
  useEffect(() => {
    const formattedLocations = user.data.locations.map(({ _id, name }) => ({
      value: _id,
      label: name,
    }))
    setUserLocations(formattedLocations)

    const formattedPractices = user.data.practices.map(({ _id, name }) => ({
      value: _id,
      label: name,
    }))
    setUserPractices(formattedPractices)
  }, [user.data])

  const [submitting, setSubmitting] = useState(false)
  function onSubmit(event) {
    event.preventDefault()
    setSubmitting(true)

    const { _id } = user.data
    const locationIDs = userLocations.map(location => location.value)
    const practiceIDs = userPractices.map(practice => practice.value)
    const body = { _id, locations: locationIDs, practices: practiceIDs }
    putUserPreferences(body)

    setSubmitting(false)
    closeModal()
  }

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

        <form onSubmit={onSubmit}>
          <div className="preferences">
            <div className="preferences__ranker">
              <h3 className="preferences__title">Location Preferences</h3>
              <Ranker
                type="location"
                userData={userLocations}
                setUserData={setUserLocations}
                options={locations}
              />
            </div>
            <div className="preferences__ranker">
              <h3 className="preferences__title">Practice Preferences</h3>
              <Ranker
                type="practice"
                userData={userPractices}
                setUserData={setUserPractices}
                options={practices}
              />
            </div>
          </div>

          <Button
            className="modal__submit preferences__submit"
            type="submit"
            disabled={submitting}
          >
            Update
          </Button>
        </form>
      </div>
    </Modal>
  )
}

const mapStateToProps = ({ user }) => ({ user })
export default connect(mapStateToProps, { putUserPreferences })(
  PreferencesModal
)
