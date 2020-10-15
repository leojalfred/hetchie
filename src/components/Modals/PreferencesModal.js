import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { string } from 'yup'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faListOl, faUserGraduate } from '@fortawesome/free-solid-svg-icons'
import { faTimesCircle } from '@fortawesome/free-regular-svg-icons'
import { connect } from 'react-redux'
import empty from 'utils/empty'
import { put } from 'actions/user'
import Modal from './components/Modal'
import Error from 'components/Error'
import Ranker from './components/Ranker'
import Button from 'components/Buttons/BigButton'
import './PreferencesModal.scss'

function PreferencesModal({ user, error, put, isOpen, closeModal }) {
  const [message, setMessage] = useState('')
  useEffect(() => {
    if (!empty(error)) setMessage(error)
    else setMessage('')
  }, [error])

  const [locations, setLocations] = useState()
  const [practices, setPractices] = useState()
  useEffect(() => {
    async function getData() {
      const locationsResponse = await axios.get('/api/locations')
      const locationsData = locationsResponse.data
      const locationOptions = locationsData.map(({ _id, name }) => ({
        value: _id,
        label: name,
      }))

      function sort(a, b) {
        if (a.label < b.label) return -1
        if (a.label > b.label) return 1
        return 0
      }
      const sortedLocations = locationOptions.sort(sort)
      setLocations(sortedLocations)

      const practicesResponse = await axios.get('/api/practices')
      const practicesData = practicesResponse.data
      const practiceOptions = practicesData.map(({ _id, name }) => ({
        value: _id,
        label: name,
      }))
      const sortedPractices = practiceOptions.sort(sort)
      setPractices(sortedPractices)
    }
    getData()
  }, [])

  const [gpa, setGPA] = useState('')
  const [userLocations, setUserLocations] = useState([])
  const [userPractices, setUserPractices] = useState([])
  useEffect(() => {
    if (user.data.gpa) setGPA(user.data.gpa)
    if (!empty(user.data.locations)) {
      const formattedLocations = user.data.locations.map(({ _id, name }) => ({
        value: _id,
        label: name,
      }))
      setUserLocations(formattedLocations)
    }
    if (!empty(user.data.practices)) {
      const formattedPractices = user.data.practices.map(({ _id, name }) => ({
        value: _id,
        label: name,
      }))
      setUserPractices(formattedPractices)
    }
  }, [user.data])

  const onChange = ({ currentTarget }) => setGPA(currentTarget.value)

  const gpaPattern = /(([0-3]{1}\.\d{0,2})|([0-4]{1}))|[4]\.[0]{0,2}/
  const schema = string().required('GPA is required.').matches(gpaPattern, {
    message: 'GPA is invalid.',
    excludeEmptyString: true,
  })

  const [submitting, setSubmitting] = useState(false)
  function onSubmit(event) {
    event.preventDefault()
    setSubmitting(true)

    const gpaInput = document.querySelector('#gpa')
    const gpa = gpaInput.value

    try {
      schema.validateSync(gpa)

      const { _id } = user.data
      const locationIDs = userLocations.map(({ value }) => value)
      const practiceIDs = userPractices.map(({ value }) => value)
      const body = { _id, gpa, locations: locationIDs, practices: practiceIDs }
      put('/api/users/preferences', body)

      closeModal()
    } catch (error) {
      setMessage(error.message)
    } finally {
      setSubmitting(false)
    }
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

        {message && <Error message={message} />}

        <form onSubmit={onSubmit}>
          <h3 className="preferences__title">GPA</h3>
          <div className="modal__input-group">
            <FontAwesomeIcon
              className="modal__input-icon"
              icon={faUserGraduate}
            />
            <input
              id="gpa"
              className="modal__input"
              type="number"
              step="0.01"
              name="gpa"
              placeholder="4.00"
              min="1"
              max="4"
              value={gpa}
              onChange={onChange}
            />
          </div>

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

const mapStateToProps = ({ user, error }) => ({ user, error })
export default connect(mapStateToProps, { put })(PreferencesModal)
