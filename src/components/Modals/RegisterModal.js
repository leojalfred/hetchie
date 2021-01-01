import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-regular-svg-icons'
import {
  faLongArrowAltRight,
  faUserPlus,
} from '@fortawesome/free-solid-svg-icons'
import Modal from './components/Modal'
import CredentialsForm from './components/CredentialsForm'

export default function RegisterModal({
  isOpen,
  closeRegisterModal,
  openLoginModal,
}) {
  const initialValues = {
    first: '',
    last: '',
    email: '',
    school: '',
    year: '',
    password: '',
    confirm: '',
  }

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

        <CredentialsForm
          initialValues={initialValues}
          closeModal={closeRegisterModal}
          register={true}
          submit="Register"
        />
      </div>

      <div className="modal__footer">
        <p className="modal__small">
          By registering, you agree to our{' '}
          <button className="modal__privacy">privacy policy</button>
        </p>

        <button className="modal__button" type="button" onClick={switchModals}>
          Log in
          <FontAwesomeIcon
            className="modal__button-icon"
            icon={faLongArrowAltRight}
          />
        </button>
      </div>
    </Modal>
  )
}
