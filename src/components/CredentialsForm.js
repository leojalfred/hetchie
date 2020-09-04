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
import { connect } from 'react-redux'
import empty from '../utils/empty'
import { email, getError, combinedError } from '../utils/validation'
import { putUser } from '../actions/user'
import Error from './Error'
import Button from './BigButton'
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

  const name = /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð,.'-]+$/u
  const password = /.*(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[ !"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]).*/
  const date = new Date()
  const year = date.getUTCFullYear()

  const nameSchema = label =>
    yup
      .string()
      .required(`${label} name is required.`)
      .matches(name, {
        message: label + ' name is invalid.',
        excludeEmptyString: true,
      })
  const passwordSchema = label =>
    yup
      .string()
      .required(label + ' is required.')
      .matches(password, {
        message:
          label +
          ' must contain at least one digit, upper- and lowercase letter, and symbol.',
        excludeEmptyString: true,
      })

  yup.addMethod(yup.string, 'equalTo', function (ref, msg) {
    yup.mixed().test({
      name: 'equalTo',
      exclusive: false, // eslint-disable-next-line
      message: msg || '${path} must be the same as ${reference}',
      params: { reference: ref.path },
      test: value => value === this.resolve(ref),
    })
  })

  const schema = yup.object().shape({
    email,
    first: nameSchema('First'),
    last: nameSchema('Last'),
    school: yup.string().required('School is required.'),
    year: yup
      .number()
      .required('Graduation year is required.')
      .integer('Graduation year must be an integer.')
      .min(year, `Graduation year must be at least ${year}.`),
    password: passwordSchema('Password'),
    confirm: passwordSchema('Confirm password').equalTo(
      yup.ref('password'),
      'Passwords must match.'
    ),
  })

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
          {combinedError && <Error message={combinedError} />}

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
