import { faTimesCircle } from '@fortawesome/free-regular-svg-icons'
import { faListOl, faUserGraduate } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { string } from 'yup'
import { put } from '../../actions/user'
import Button from '../../components/buttons/BigButton'
import Error from '../../components/Error'
import empty from '../../utils/empty'
import Modal from './components/Modal'
import Ranker from './components/Ranker'
import './PreferencesModal.scss'

function PreferencesModal({ user, hetchie, error, put, isOpen, closeModal }) {
  const [message, setMessage] = useState('')
  useEffect(() => {
    if (!empty(error)) setMessage(error)
    else setMessage('')
  }, [error])

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
            <h1 className="modal__heading">Firm preferences</h1>
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

        <Error message={message} />

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
                options={hetchie.locations}
              />
            </div>
            <div className="preferences__ranker">
              <h3 className="preferences__title">Practice Preferences</h3>
              <Ranker
                type="practice"
                userData={userPractices}
                setUserData={setUserPractices}
                options={hetchie.practices}
              />
            </div>
          </div>

          <Button className="modal__submit" type="submit" disabled={submitting}>
            Update
          </Button>
        </form>
      </div>
    </Modal>
  )
}

const mapStateToProps = ({ user, hetchie, error }) => ({ user, hetchie, error })
export default connect(mapStateToProps, { put })(PreferencesModal)
