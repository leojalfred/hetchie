import React, { useEffect, useState } from 'react'
import { object, string } from 'yup'
import { Formik, Form, Field } from 'formik'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faTimesCircle } from '@fortawesome/free-regular-svg-icons'
import {
  faLock,
  faLongArrowAltRight,
  faSignInAlt,
} from '@fortawesome/free-solid-svg-icons'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import empty from '../utils/empty'
import { email, getError, combinedError } from '../utils/validation'
import { login } from '../actions/user'
import Modal from './Modal'
import Error from './Error'
import Button from './BigButton'

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
    email,
    password: string().required('Password is required.'),
  })

  const onSubmit = async user => login(user, history, closeLoginModal)

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
          validationSchema={schema}
          onSubmit={onSubmit}
        >
          {({ errors, touched, isSubmitting }) => (
            <>
              {getError(serverError, errors, touched)}
              {combinedError && <Error message={combinedError} />}

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
  )
}

const mapStateToProps = ({ error }) => ({ error })
export default connect(mapStateToProps, { login })(withRouter(LoginModal))
