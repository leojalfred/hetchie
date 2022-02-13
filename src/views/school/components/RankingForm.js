import { faLink, faUniversity } from '@fortawesome/free-solid-svg-icons'
import { Field, Form, Formik } from 'formik'
import { useState } from 'react'
import { connect } from 'react-redux'
import { postRanking } from '../../../actions/data'
import Error from '../../../components/Error'
import {
  Input, InputGroup, InputLine, Submit, TopLine
} from '../../../components/Form'
import schema from '../../../validation/ranking'
import { combinedError, getError } from '../../../validation/shared'

function RankingForm({ postRanking }) {
  const initialValues = {
    name: '',
    link: '',
  }

  const [notification, setNotification] = useState({ type: 'hidden', text: '' })
  const onSubmit = (data, actions) => {
    postRanking(data, setNotification)
    actions.resetForm()
    actions.setSubmitting(false)
  }

  return (
    <div className="school__form">
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
        {({ errors, touched, isSubmitting }) => (
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
    </div>
  )
}

export default connect(null, { postRanking })(RankingForm)
