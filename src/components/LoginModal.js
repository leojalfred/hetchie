import React, { useEffect, useState, useRef } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as yup from 'yup';
import { Formik, Form, Field } from 'formik';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faTimesCircle } from '@fortawesome/free-regular-svg-icons';
import {
  faLock,
  faLongArrowAltRight,
  faSignInAlt,
} from '@fortawesome/free-solid-svg-icons';
import { filterErrors, filteredErrors, login } from '../scripts/validation';
import { loginUser } from '../actions/authActions';
import Modal from './Modal';
import Button from './BigButton';

function LoginModal({
  isOpen,
  closeLoginModal,
  openRegisterModal,
  auth,
  history,
  errors,
  loginUser,
}) {
  const [serverErrors, setServerErrors] = useState({});
  const isFirstRun = useRef(true);
  useEffect(() => {
    if (auth.isAuthenticated) history.push('/');

    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }

    if (errors) setServerErrors(errors);
  }, [errors, history, auth]);

  const initialValues = { email: '', password: '' };
  const LoginSchema = yup.object().shape(login);

  function onSubmit(user, { setSubmitting }) {
    loginUser(user);
    closeLoginModal();
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
          {({ errors, touched, isSubmitting }) => (
            <>
              {filterErrors(errors, touched)}
              {filteredErrors.length > 0 && (
                <div className="modal__input-errors">
                  {filteredErrors.map((error, i) => (
                    <p className="modal__input-error" key={i}>
                      {errors[error]}
                    </p>
                  ))}
                </div>
              )}
              <Form className="modal__form">
                <div className="modal__input-container">
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
                  <div className="modal__input-group">
                    <FontAwesomeIcon
                      className="modal__input-icon"
                      icon={faLock}
                    />
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
            </>
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

function mapStateToProps(state) {
  return {
    auth: state.auth,
    errors: state.errors,
  };
}

export default connect(mapStateToProps, { loginUser })(withRouter(LoginModal));
