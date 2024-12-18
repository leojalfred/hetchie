import { faEnvelope, faTimesCircle } from '@fortawesome/free-regular-svg-icons'
import {
  faLock,
  faLongArrowAltRight,
  faSignInAlt
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Field, Form, Formik } from 'formik'
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { object, string } from 'yup'
import { login } from '../../actions/user'
import Button from '../../components/buttons/BigButton'
import Error from '../../components/Error'
import empty from '../../utils/empty'
import { combinedError, emailSchema, getError } from '../../validation/shared'
import Modal from './components/Modal'

function LoginModal({
  error,
  login,
  history,
  closeLoginModal,
  openRegisterModal,
  isOpen,
}) {
  const [serverError, setServerError] = useState('')
  useEffect(() => {
    if (!empty(error)) setServerError(error)
    else setServerError('')
  }, [error])

  const initialValues = { email: '', password: '' }
  const schema = object().shape({
    email: emailSchema,
    password: string().required('Password is required.'),
  })

  const onSubmit = user => login(user, history, closeLoginModal)

  function switchModals() {
    closeLoginModal()
    setTimeout(() => {
      openRegisterModal()
    }, 200)
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
            <h1 className="modal__heading">Welcome back</h1>
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
          validationSchema={schema}
          onSubmit={onSubmit}
        >
          {({ errors, touched, isSubmitting }) => (
            <>
              {getError(serverError, errors, touched)}
              <Error message={combinedError} />

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

      <div className="modal__footer">
        <button className="modal__button" type="button" onClick={switchModals}>
          Create your account
          <FontAwesomeIcon
            className="modal__button-icon"
            icon={faLongArrowAltRight}
          />
        </button>
      </div>
    </Modal>
  )
}

const mapStateToProps = ({ error }) => ({ error })
export default connect(mapStateToProps, { login })(withRouter(LoginModal))
