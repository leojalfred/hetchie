import { faGavel, faLink } from '@fortawesome/free-solid-svg-icons'
import { Field, Form, Formik } from 'formik'
import { useState } from 'react'
import { connect } from 'react-redux'
import { postFirm } from '../../../actions/data'
import Error from '../../../components/Error'
import { Input, InputGroup, InputLine, TopLine } from '../../../components/Form'
import schema from '../../../validation/firm'
import { combinedError, getError } from '../../../validation/shared'
import Rankings from './Rankings'

function FirmForm({ postFirm }) {
  const initialValues = {
    name: '',
    firmLink: '',
    chambersLink: '',
    vaultLink: '',
    positions: [],
  }

  const [rankings, setRankings] = useState([])
  const [error, setError] = useState('')
  const [notification, setNotification] = useState({ type: 'hidden', text: '' })

  const onSubmit = async (data, action) => {
    if (rankings.some(ranking => ranking === null)) {
      setError('Ranking must be chosen.')
      return
    }

    const zipped = data.positions.map((position, i) => ({
      position,
      ranking: rankings[i].value,
    }))
    const payload = {
      name: data.name,
      links: {
        firm: data.firmLink,
        chambers: data.chambersLink,
        vault: data.vaultLink,
      },
      rankings: zipped,
    }
    postFirm(payload, setNotification)

    action.resetForm()
    setRankings([])

    action.setSubmitting(false)
  }

  return (
    <div className="school__form">
      <TopLine
        heading="Add Firms"
        notification={notification}
        setNotification={setNotification}
      />
      <Formik
        initialValues={initialValues}
        validationSchema={schema}
        onSubmit={onSubmit}
      >
        {({ errors, touched, isSubmitting }) => (
          <>
            {getError(error, errors, touched)}
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
                setError={setError}
                submitting={isSubmitting}
              />
            </Form>
          </>
        )}
      </Formik>
    </div>
  )
}

export default connect(null, { postFirm })(FirmForm)
