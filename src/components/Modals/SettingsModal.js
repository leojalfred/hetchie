import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-regular-svg-icons'
import { faUserCog } from '@fortawesome/free-solid-svg-icons'
import { connect } from 'react-redux'
import Modal from './components/Modal'
import CredentialsForm from './components/CredentialsForm'

function SettingsModal({ user, isOpen, closeModal }) {
  const [userData, setUserData] = useState()
  useEffect(() => {
    const credentials = {
      ...user.data,
      school: user.data.school.name,
      password: '',
      confirm: '',
    }
    setUserData(credentials)
  }, [user])

  return (
    <Modal
      contentLabel="Settings Modal"
      isOpen={isOpen}
      onRequestClose={closeModal}
      icon={faUserCog}
    >
      <div className="modal__content">
        <div className="modal__topline">
          <div className="modal__text">
            <h1 className="modal__heading">Update account</h1>
            <p className="modal__description">
              Edit this form to update your account information
            </p>
          </div>

          <FontAwesomeIcon
            className="modal__close"
            icon={faTimesCircle}
            onClick={closeModal}
          />
        </div>

        <CredentialsForm
          initialValues={userData}
          closeModal={closeModal}
          submit="Update"
        />
      </div>
    </Modal>
  )
}

const mapStateToProps = ({ user }) => ({ user })
export default connect(mapStateToProps)(SettingsModal)
