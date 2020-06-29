import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-regular-svg-icons'
import {
  faLongArrowAltRight,
  faUserPlus,
} from '@fortawesome/free-solid-svg-icons'
import { connect } from 'react-redux'
import { registerUser } from '../actions/authActions'
import Modal from './Modal'
import CredentialsForm from './CredentialsForm'

function RegisterModal({
  isOpen,
  closeRegisterModal,
  openLoginModal,
  errors,
  registerUser,
}) {
  function switchModals() {
    closeRegisterModal()
    setTimeout(() => {
      openLoginModal()
    }, 200)
  }

  return (
    <Modal
      contentLabel="Register Modal"
      isOpen={isOpen}
      onRequestClose={closeRegisterModal}
      icon={faUserPlus}
    >
      <div className="modal__content">
        <div className="modal__topline">
          <div className="modal__text">
            <h2 className="modal__heading">Get started</h2>
            <p className="modal__description">
              Create an account to start optimizing your bids
            </p>
          </div>
          <FontAwesomeIcon
            className="modal__close"
            icon={faTimesCircle}
            onClick={closeRegisterModal}
          />
        </div>
      </div>

      <CredentialsForm
        errors={errors}
        handler={registerUser}
        closeModal={closeRegisterModal}
        submit="Register"
      />

      <button className="modal__button" type="button" onClick={switchModals}>
        Log in
        <FontAwesomeIcon
          className="modal__button-icon"
          icon={faLongArrowAltRight}
        />
      </button>
    </Modal>
  )
}

function mapStateToProps({ errors }) {
  return { errors }
}
export default connect(mapStateToProps, { registerUser })(RegisterModal)
