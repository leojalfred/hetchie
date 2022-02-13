import { faEnvelope } from '@fortawesome/free-regular-svg-icons'
import {
  faCheckCircle,
  faGraduationCap,
  faLock,
  faSchool,
  faSignature
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Field, Form, Formik } from 'formik'
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { putUser } from '../../../actions/user'
import Button from '../../../components/buttons/BigButton'
import Error from '../../../components/Error'
import empty from '../../../utils/empty'
import schema from '../../../validation/credentials'
import { combinedError, getError } from '../../../validation/shared'
import './CredentialsForm.scss'

function CredentialsForm({
  error,
  initialValues,
  putUser,
  closeModal,
  register,
  submit,
}) {
  const [serverError, setServerError] = useState('')
  useEffect(() => {
    if (!empty(error)) setServerError(error)
    else setServerError('')
  }, [error])

  async function onSubmit(user) {
    if (typeof initialValues._id !== 'undefined')
      user = { ...user, _id: initialValues._id }

    putUser(user, closeModal, register)
  }

  return (
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
            <div className="modal__input-line">
              <div className="modal__input-container modal__input-container--credentials">
                <div className="modal__input-group modal__input-group--credentials">
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

              <div className="modal__input-container modal__input-container--credentials">
                <div className="modal__input-group modal__input-group--credentials">
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

            <div className="modal__email modal__input-group modal__input-group--credentials">
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
              <div className="modal__input-container modal__input-container--credentials">
                <div className="modal__input-group modal__input-group--credentials">
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

              <div className="modal__input-container modal__input-container--credentials">
                <div className="modal__input-group modal__input-group--credentials">
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
              <div className="modal__input-container modal__input-container--credentials">
                <div className="modal__input-group modal__input-group--credentials">
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

              <div className="modal__input-container modal__input-container--credentials">
                <div className="modal__input-group modal__input-group--credentials">
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
              {submit}
            </Button>
          </Form>
        </>
      )}
    </Formik>
  )
}

const mapStateToProps = ({ error }) => ({ error })
export default connect(mapStateToProps, { putUser })(CredentialsForm)
