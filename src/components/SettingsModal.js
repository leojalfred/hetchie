import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-regular-svg-icons'
import { faUserCog } from '@fortawesome/free-solid-svg-icons'
import { connect } from 'react-redux'
import { updateUser } from '../actions/authActions'
import Modal from './Modal'
import CredentialsForm from './CredentialsForm'

function SettingsModal({ auth, isOpen, closeModal, errors, updateUser }) {
  const [user, setUser] = useState()
  useEffect(() => {
    async function getUsers() {
      try {
        const info = await axios.get(`/users?id=${auth.user.id}`)
        setUser(info.data)
      } catch (error) {
        console.log(error)
      }
    }
    getUsers()
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
      </div>

      <CredentialsForm
        errors={errors}
        initialValues={user}
        handler={updateUser}
        closeModal={closeModal}
        submit="Update"
      />
    </Modal>
  )
}

const mapStateToProps = ({ auth, errors }) => ({ auth, errors })
export default connect(mapStateToProps, { updateUser })(SettingsModal)
