import { useState, useEffect } from 'react'
import { Formik, Form, Field } from 'formik'
import { connect } from 'react-redux'
import empty from 'utils/empty'
import schema from 'validation/school'
import { getError, combinedError } from 'validation/shared'
import Container from 'components/Container'
import Error from 'components/Error'
import Button from 'components/buttons/BigButton'
import './School.scss'

function School({ error }) {
  const initialValues = {
    firm: '',
    locations: [],
    practices: [],
    qualifications: [],
    smallSalary: 150000,
    largeSalary: 190000,
    date: '',
    requiredGPA: '',
    preferredGPA: '',
  }
  const handleSubmit = () => {}

  const [serverError, setServerError] = useState('')
  useEffect(() => {
    if (!empty(error)) setServerError(error)
    else setServerError('')
  }, [error])

  return (
    <div className="school">
      <Container>
        <h1>School Tools</h1>
        <h2>Add Firms</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={schema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, isSubmitting }) => (
            <>
              {getError(serverError, errors, touched)}
              <Error message={combinedError} />

              <Form>
                <Button disabled={isSubmitting}>Add firm</Button>
              </Form>
            </>
          )}
        </Formik>
      </Container>
    </div>
  )
}

const mapStateToProps = ({ error }) => ({ error })
export default connect(mapStateToProps)(School)
