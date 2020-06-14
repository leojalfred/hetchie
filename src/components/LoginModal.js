import React from 'react';
import * as yup from 'yup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faTimesCircle } from '@fortawesome/free-regular-svg-icons';
import {
  faLock,
  faLongArrowAltRight,
  faSignInAlt,
} from '@fortawesome/free-solid-svg-icons';
import { Formik, Form, ErrorMessage, Field } from 'formik';
import { login } from '../scripts/validation';
import Modal from './Modal';
import Button from './BigButton';
import './LoginModal.scss';

export default function LoginModal({
  isOpen,
  closeLoginModal,
  openRegisterModal,
}) {
  const initialValues = { email: '', password: '' };
  const LoginSchema = yup.object().shape(login);

  function onSubmit(values, { setSubmitting }) {
    console.log(values);
  }

  function switchModals() {
    closeLoginModal();
    setTimeout(() => {
      openRegisterModal();
    }, 200);
  }

  return (
    <Modal
      contentLabel="Login Modal"
      isOpen={isOpen}
      onRequestClose={closeLoginModal}
      icon={faSignInAlt}
    >
      <div className="modal__content">
        <div className="modal__topline">
          <div className="modal__text">
            <h2 className="modal__heading">Welcome back</h2>
            <p className="modal__description">
              Log in to your account to optimize your bids
            </p>
          </div>
          <FontAwesomeIcon
            className="modal__close"
            icon={faTimesCircle}
            onClick={closeLoginModal}
          />
        </div>

        <Formik
          initialValues={initialValues}
          validationSchema={LoginSchema}
          onSubmit={onSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="modal__form">
              <div className="modal__input-container">
                <ErrorMessage name="email">
                  {(message) => (
                    <div className="modal__input-error">{message}</div>
                  )}
                </ErrorMessage>
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
              </div>
              <div className="modal__input-container">
                <ErrorMessage name="password">
                  {(message) => (
                    <div className="modal__input-error">{message}</div>
                  )}
                </ErrorMessage>
                <div className="modal__input-group">
                  <FontAwesomeIcon className="modal__input-icon" icon={faLock} />
                  <Field
                    className="modal__input"
                    type="password"
                    name="password"
                    placeholder="Password"
                  />
                </div>
              </div>
              <Button
                className="modal__submit"
                type="submit"
                disabled={isSubmitting}
              >
                Log in
              </Button>
            </Form>
          )}
        </Formik>
      </div>

      <button className="modal__button" type="button" onClick={switchModals}>
        Create your account
        <FontAwesomeIcon
          className="modal__button-icon"
          icon={faLongArrowAltRight}
        />
      </button>
    </Modal>
  );
}
