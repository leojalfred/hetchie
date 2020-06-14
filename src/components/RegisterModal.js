import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faTimesCircle } from '@fortawesome/free-regular-svg-icons';
import {
  faCheckCircle,
  faGraduationCap,
  faLock,
  faLongArrowAltRight,
  faSchool,
  faSignature,
  faUserPlus,
} from '@fortawesome/free-solid-svg-icons';
import { Formik, Form, ErrorMessage, Field } from 'formik';
import * as yup from 'yup';
import { name, password, year } from '../scripts/validation';
import Modal from './Modal';
import Button from './BigButton';
import './RegisterModal.scss';

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
  };

  function equalTo(ref, msg) {
    return yup.mixed().test({
      name: 'equalTo',
      exclusive: false, // eslint-disable-next-line
      message: msg || '${path} must be the same as ${reference}',
      params: {
        reference: ref.path,
      },
      test: function (value) {
        return value === this.resolve(ref);
      },
    });
  }
  yup.addMethod(yup.string, 'equalTo', equalTo);

  const RegisterSchema = yup.object().shape({
    first: yup.string().required('First name is required.').matches(name, {
      message: 'First name is invalid.',
      excludeEmptyString: true,
    }),
    last: yup.string().required('Last name is required.').matches(name, {
      message: 'Last name is invalid.',
      excludeEmptyString: true,
    }),
    email: yup
      .string()
      .required('Email is required.')
      .email('Email is invalid.'),
    school: yup.string().required('School is required.'),
    year: yup
      .number()
      .required('Graduation year is required.')
      .integer('Graduation year must be an integer.')
      .min(year, `Graduation year must be at least ${year}.`),
    password: yup
      .string()
      .required('Password is required.')
      .matches(password.pattern, {
        message: password.message,
        excludeEmptyString: true,
      }),
    confirm: yup
      .string()
      .matches(password.pattern, {
        message: password.message,
        excludeEmptyString: true,
      })
      .equalTo(yup.ref('password'), 'Passwords must match.')
      .required('Confirm password is required.'),
  });

  function onSubmit(values, { setSubmitting }) {
    console.log(values);
  }

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

        <Formik
          initialValues={initialValues}
          validationSchema={RegisterSchema}
          onSubmit={onSubmit}
        >
          {({ errors, isSubmitting }) => (
            <Form className="modal__form">
              <div className="modal__input-line">
                <div className="modal__input-container">
                  <ErrorMessage name="first">
                    {(message) => (
                      <div className="modal__input-error">{message}</div>
                    )}
                  </ErrorMessage>
                  <div className="modal__input-group modal__input-group--register">
                    <FontAwesomeIcon
                      className="modal__input-icon"
                      icon={faSignature}
                    />
                    <Field
                      className="modal__input"
                      type="text"
                      name="first"
                      placeholder="First name"
                    />
                  </div>
                </div>

                <div className="modal__input-container">
                  <ErrorMessage name="last">
                    {(message) => (
                      <div className="modal__input-error">{message}</div>
                    )}
                  </ErrorMessage>
                  <div className="modal__input-group modal__input-group--register">
                    <FontAwesomeIcon
                      className="modal__input-icon"
                      icon={faSignature}
                    />
                    <Field
                      className="modal__input"
                      type="text"
                      name="last"
                      placeholder="Last name"
                    />
                  </div>
                </div>
              </div>

              <ErrorMessage name="email">
                {(message) => (
                  <div className="modal__input-error">{message}</div>
                )}
              </ErrorMessage>
              <div className="modal__email modal__input-group modal__input-group--register">
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

              <div className="modal__input-line">
                <div className="modal__input-container">
                  <ErrorMessage name="school">
                    {(message) => (
                      <div className="modal__input-error">{message}</div>
                    )}
                  </ErrorMessage>
                  <div className="modal__input-group modal__input-group--register">
                    <FontAwesomeIcon
                      className="modal__input-icon"
                      icon={faSchool}
                    />
                    <Field
                      className="modal__input"
                      type="text"
                      name="school"
                      placeholder="School"
                    />
                  </div>
                </div>

                <div className="modal__input-container">
                  <ErrorMessage name="year">
                    {(message) => (
                      <div className="modal__input-error">{message}</div>
                    )}
                  </ErrorMessage>
                  <div className="modal__input-group modal__input-group--register">
                    <FontAwesomeIcon
                      className="modal__input-icon"
                      icon={faGraduationCap}
                    />
                    <Field
                      className="modal__input"
                      type="text"
                      name="year"
                      placeholder="Graduation year"
                    />
                  </div>
                </div>
              </div>

              <div className="modal__input-line">
                <div className="modal__input-container">
                  <ErrorMessage name="password">
                    {(message) => (
                      <div className="modal__input-error">{message}</div>
                    )}
                  </ErrorMessage>
                  <div className="modal__input-group modal__input-group--register">
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

                <div className="modal__input-container">
                  <ErrorMessage name="confirm">
                    {(message) => (
                      <div className="modal__input-error">{message}</div>
                    )}
                  </ErrorMessage>
                  <div className="modal__input-group modal__input-group--register">
                    <FontAwesomeIcon
                      className="modal__input-icon"
                      icon={faCheckCircle}
                    />
                    <Field
                      className="modal__input"
                      type="password"
                      name="confirm"
                      placeholder="Confirm password"
                    />
                  </div>
                </div>
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
