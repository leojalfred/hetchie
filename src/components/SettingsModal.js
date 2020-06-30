import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-regular-svg-icons'
import { faUserCog } from '@fortawesome/free-solid-svg-icons'
import { connect } from 'react-redux'
import Modal from './Modal'
import CredentialsForm from './CredentialsForm'

function SettingsModal({ auth, isOpen, closeModal }) {
  const [user, setUser] = useState()
  useEffect(() => {
    async function getUser() {
      try {
        const info = await axios.get(`/users?id=${auth.user.id}`)
        const credentials = { ...info.data, password: '', confirm: '' }
        setUser(credentials)
      } catch (error) {
        console.log(error)
      }
    }
    getUser()
  }, [auth])

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
            <h2 className="modal__heading">Update account</h2>
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
          initialValues={user}
          closeModal={closeModal}
          setUser={setUser}
          submit="Update"
        />
      </div>
    </Modal>
  )
}

const mapStateToProps = ({ auth }) => ({ auth })
export default connect(mapStateToProps)(SettingsModal)
