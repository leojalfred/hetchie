import { useState } from 'react'
import { Formik, Form, Field } from 'formik'
import { faUniversity, faLink } from '@fortawesome/free-solid-svg-icons'
import { connect } from 'react-redux'
import { putRanking } from 'actions/data'
import schema from 'validation/ranking'
import { getError, combinedError } from 'validation/shared'
import Error from 'components/Error'
import { TopLine, InputLine, InputGroup, Input, Submit } from 'components/Form'

function RankingForm({ putRanking }) {
  const initialValues = {
    name: '',
    link: '',
  }

  const [notification, setNotification] = useState({ type: 'hidden', text: '' })
  const onSubmit = (data, actions) => {
    putRanking(data, setNotification)
    actions.resetForm()
    actions.setSubmitting(false)
  }

  return (
    <>
      <TopLine
        heading="Add Rankings"
        notification={notification}
        setNotification={setNotification}
      />
      <Formik
        initialValues={initialValues}
        validationSchema={schema}
        onSubmit={onSubmit}
      >
        {({ errors, touched, values, isSubmitting }) => (
          <>
            {getError(null, errors, touched)}
            <Error message={combinedError} />

            <Form>
              <InputLine>
                <InputGroup icon={faUniversity}>
                  <Field
                    component={Input}
                    type="text"
                    name="name"
                    placeholder="Vault ranking"
                  />
                </InputGroup>

                <InputGroup icon={faLink}>
                  <Field
                    component={Input}
                    type="text"
                    name="link"
                    placeholder="Vault ranking link"
                  />
                </InputGroup>
              </InputLine>

              <Submit isSubmitting={isSubmitting}>Add ranking</Submit>
            </Form>
          </>
        )}
      </Formik>
    </>
  )
}

export default connect(null, { putRanking })(RankingForm)
