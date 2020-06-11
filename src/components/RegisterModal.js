import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faTimesCircle } from '@fortawesome/free-regular-svg-icons';
import {
  faLock,
  faLongArrowAltRight,
  faUserPlus,
} from '@fortawesome/free-solid-svg-icons';
import { Formik, Form, Field } from 'formik';
import Modal from './Modal';
import Button from './BigButton';

export default function RegisterModal({
  isOpen,
  closeRegisterModal,
  openLoginModal,
}) {
  function switchModals() {
    closeRegisterModal();
    setTimeout(() => {
      openLoginModal();
    }, 200);
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

        <Formik initialValues={{ email: '', password: '' }}>
          {({ isSubmitting }) => (
            <Form className="modal__form">
              <div className="modal__input-group">
                <FontAwesomeIcon
                  className="modal__input-icon"
                  icon={faEnvelope}
                />
                <Field
                  className="modal__input"
                  type="email"
                  name="email"
                  placeholder="Email"
                />
              </div>
              <div className="modal__input-group">
                <FontAwesomeIcon className="modal__input-icon" icon={faLock} />
                <Field
                  className="modal__input"
                  type="password"
                  name="password"
                  placeholder="Password"
                />
              </div>
              <Button
                className="modal__submit"
                type="submit"
                disabled={isSubmitting}
              >
                Register
              </Button>
            </Form>
          )}
        </Formik>
      </div>

      <button className="modal__button" type="button" onClick={switchModals}>
        Log in
        <FontAwesomeIcon
          className="modal__button-icon"
          icon={faLongArrowAltRight}
        />
      </button>
    </Modal>
  );
}
