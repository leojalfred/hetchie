import { useState, useEffect } from 'react'
import { Formik, Form, Field } from 'formik'
import {
  faGavel,
  faLink,
  faInfo,
  faSortNumericUp,
} from '@fortawesome/free-solid-svg-icons'
import empty from 'utils/empty'
import schema from 'validation/firm'
import { getError, combinedError } from 'validation/shared'
import Error from 'components/Error'
import { InputLine, InputGroup, Input, Submit } from 'components/Inputs'
import RankingLine from './RankingLine'

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
                <InputGroup title="Chambers link" icon={faInfo}>
                  <Field
                    component={Input}
                    type="url"
                    name="chambersLink"
                    placeholder="Chambers link"
                  />
                </InputGroup>

                <InputGroup title="Vault link" icon={faSortNumericUp}>
                  <Field
                    component={Input}
                    type="url"
                    name="vaultLink"
                    placeholder="Vault link"
                  />
                </InputGroup>
              </InputLine>

              <h3 className="rankings-heading">Vault Rankings</h3>
              <RankingLine />

              <Submit isSubmitting={submitting}>Add firm</Submit>
            </Form>
          </>
        )}
      </Formik>
    </div>
  )
}

export default FirmForm
