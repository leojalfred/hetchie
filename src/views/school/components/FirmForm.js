import { useState, useEffect } from 'react'
import { Formik, Form, Field } from 'formik'
import { faGavel, faLink } from '@fortawesome/free-solid-svg-icons'
import empty from 'utils/empty'
import schema from 'validation/firm'
import { getError, combinedError } from 'validation/shared'
import Error from 'components/Error'
import { InputLine, InputGroup, Input } from 'components/Inputs'
import Rankings from './Rankings'

function FirmForm({ error }) {
  const initialValues = {
    name: '',
    firmLink: '',
    chambersLink: '',
    vaultLink: '',
    rankings: [{ position: '', link: '' }],
  }

  const [rankings, setRankings] = useState([null])
  const onSubmit = data => {
    setSubmitting(true)
    console.log(data)
    console.log(rankings)
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
                <InputGroup title="Firm name" icon={faGavel}>
                  <Field
                    component={Input}
                    type="text"
                    name="name"
                    placeholder="Firm name"
                  />
                </InputGroup>

                <InputGroup title="Firm link" icon={faLink}>
                  <Field
                    component={Input}
                    type="url"
                    name="firmLink"
                    placeholder="Firm link"
                  />
                </InputGroup>
              </InputLine>

              <InputLine>
                <InputGroup title="Chambers link" icon={faLink}>
                  <Field
                    component={Input}
                    type="url"
                    name="chambersLink"
                    placeholder="Chambers link"
                  />
                </InputGroup>

                <InputGroup title="Vault link" icon={faLink}>
                  <Field
                    component={Input}
                    type="url"
                    name="vaultLink"
                    placeholder="Vault link"
                  />
                </InputGroup>
              </InputLine>

              <Rankings
                rankings={rankings}
                setRankings={setRankings}
                submitting={submitting}
              />
            </Form>
          </>
        )}
      </Formik>
    </div>
  )
}

export default FirmForm
