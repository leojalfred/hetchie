import React, { useEffect, useState } from 'react'
import * as yup from 'yup'
import { Formik, Form, Field } from 'formik'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope } from '@fortawesome/free-regular-svg-icons'
import {
  faCheckCircle,
  faGraduationCap,
  faLock,
  faSchool,
  faSignature,
} from '@fortawesome/free-solid-svg-icons'
import './CredentialsForm.scss'
import {
  email,
  name,
  password,
  year,
  getErrorKeys,
  clientErrorKeys,
  serverErrorKeys,
} from '../scripts/validation'
import Button from './BigButton'

export default function CredentialsForm({
  errors,
  initialValues,
  handler,
  closeModal,
  setUser,
  submit,
}) {
  const [serverErrors, setServerErrors] = useState({})
  useEffect(() => {
    if (errors) setServerErrors(errors)
  }, [errors])

  function equalTo(ref, msg) {
    return yup.mixed().test({
      name: 'equalTo',
      exclusive: false, // eslint-disable-next-line
      message: msg || '${path} must be the same as ${reference}',
      params: {
        reference: ref.path,
      },
      test: function (value) {
        return value === this.resolve(ref)
      },
    })
  }
  yup.addMethod(yup.string, 'equalTo', equalTo)
  const CredentialsSchema = yup.object().shape({
    ...email,
    first: yup.string().required('First name is required.').matches(name, {
      message: 'First name is invalid.',
      excludeEmptyString: true,
    }),
    last: yup.string().required('Last name is required.').matches(name, {
      message: 'Last name is invalid.',
      excludeEmptyString: true,
    }),
    school: yup.string().required('School is required.'),
    year: yup
      .number()
      .typeError('Graduation year must be a number.')
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
  })

  async function onSubmit(user) {
    if (typeof initialValues._id !== 'undefined')
      user = { ...user, _id: initialValues._id }

    handler(user, closeModal, setUser)
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={CredentialsSchema}
      onSubmit={onSubmit}
    >
      {({ errors, touched, isSubmitting }) => (
        <>
          {getErrorKeys(errors, touched, serverErrors)}
          {(clientErrorKeys.length > 0 || serverErrorKeys.length > 0) && (
            <div className="modal__input-errors">
              {clientErrorKeys.map((error, i) => (
                <p className="modal__input-error" key={i}>
                  {errors[error]}
                </p>
              ))}
              {serverErrorKeys.map((error, i) => (
                <p className="modal__input-error" key={i}>
                  {serverErrors[error]}
                </p>
              ))}
            </div>
          )}
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
