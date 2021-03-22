import { useState, useEffect } from 'react'
import { Formik, Form, Field } from 'formik'
import { faGavel, faLink } from '@fortawesome/free-solid-svg-icons'
import empty from 'utils/empty'
import schema from 'validation/firm'
import { getError, combinedError } from 'validation/shared'
import Error from 'components/Error'
import {
  InputLine,
  InputContainer,
  InputGroup,
  InputIcon,
  Input,
  Submit,
} from 'components/Inputs'

function FirmForm({ error }) {
  const initialValues = {
    name: '',
    firmLink: '',
    chambersLink: '',
    vaultLink: '',
    positions: [],
    rankingLinks: [],
  }

  const onSubmit = data => {
    setSubmitting(true)
    setSubmitting(false)
  }

  const [serverError, setServerError] = useState('')
  useEffect(() => {
    if (!empty(error)) setServerError(error)
    else setServerError('')
  }, [error])

  const [submitting, setSubmitting] = useState(false)

  return (
    <div>
      <h2>Add Firms</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={schema}
        onSubmit={onSubmit}
      >
        {({ errors, touched, values }) => (
          <>
            {getError(serverError, errors, touched)}
            <Error message={combinedError} />

            <Form>
              <InputLine>
                <InputContainer>
                  <h3>Firm name</h3>
                  <InputGroup>
                    <InputIcon icon={faGavel} />
                    <Field
                      component={Input}
                      type="text"
                      name="name"
                      placeholder="Firm name"
                    />
                  </InputGroup>
                </InputContainer>

                <InputContainer>
                  <h3>Firm link</h3>
                  <InputGroup>
                    <InputIcon icon={faLink} />
                    <Field
                      component={Input}
                      type="url"
                      name="firmLink"
                      placeholder="Firm link"
                    />
                  </InputGroup>
                </InputContainer>
              </InputLine>

              <Submit isSubmitting={submitting}>Add firm</Submit>
            </Form>
          </>
        )}
      </Formik>
    </div>
  )
}

export default FirmForm
