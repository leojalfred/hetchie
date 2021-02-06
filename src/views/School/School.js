import { useState, useEffect } from 'react'
import { Formik, Form, Field } from 'formik'
import {
  faGavel,
  faMapMarkedAlt,
  faBriefcase,
  faUserGraduate,
  faMoneyCheckAlt,
} from '@fortawesome/free-solid-svg-icons'
import { connect } from 'react-redux'
import empty from 'utils/empty'
import schema from 'validation/school'
import { getError, combinedError } from 'validation/shared'
import Container from 'components/Container'
import Error from 'components/Error'
import {
  InputLine,
  InputContainer,
  InputGroup,
  InputIcon,
  Input,
  Submit,
} from 'components/Inputs'
import Select from 'components/Select'
import './School.scss'

function School({ error, locations, practices }) {
  const initialValues = {
    firm: '',
    gpaRequired: '',
    gpaBand: '',
    salaryLarge: '',
    salarySmall: '',
  }

  const [submitting, setSubmitting] = useState(false)
  const [userLocations, setUserLocations] = useState([])
  const [userPractices, setUserPractices] = useState([])
  const onSubmit = data => {
    setSubmitting(true)

    data.locations = userLocations
    data.practices = userPractices
    console.log(data)

    setSubmitting(false)
  }

  const [serverError, setServerError] = useState('')
  useEffect(() => {
    if (!empty(error)) setServerError(error)
    else setServerError('')
  }, [error])

  const onChange = setter => selected => setter(selected)

  return (
    <div className="school">
      <Container>
        <h1>School Tools</h1>
        <h2>Add Firms</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={schema}
          onSubmit={onSubmit}
        >
          {({ errors, touched }) => (
            <>
              {getError(serverError, errors, touched)}
              <Error message={combinedError} />

              <Form>
                <h3>Firm name</h3>
                <InputGroup>
                  <InputIcon icon={faGavel} />
                  <Field
                    component={Input}
                    type="text"
                    name="firm"
                    placeholder="Firm name"
                  />
                </InputGroup>

                <InputLine>
                  <InputContainer>
                    <h3>Locations</h3>
                    <InputGroup>
                      <InputIcon icon={faMapMarkedAlt} />
                      <Field
                        component={Select}
                        options={locations}
                        name="locations"
                        placeholder="Locations"
                        onChange={onChange(setUserLocations)}
                        creatable
                        isMulti
                      />
                    </InputGroup>
                  </InputContainer>

                  <InputContainer>
                    <h3>Practices</h3>
                    <InputGroup>
                      <InputIcon icon={faBriefcase} />
                      <Field
                        component={Select}
                        options={practices}
                        name="practices"
                        placeholder="Practices"
                        onChange={onChange(setUserPractices)}
                        creatable
                        isMulti
                      />
                    </InputGroup>
                  </InputContainer>
                </InputLine>

                <InputLine>
                  <InputContainer>
                    <h3>Required GPA</h3>
                    <InputGroup>
                      <InputIcon icon={faUserGraduate} />
                      <Field
                        component={Input}
                        type="number"
                        name="gpaRequired"
                        placeholder="4.0"
                        step="0.01"
                        min="1"
                        max="4"
                      />
                    </InputGroup>
                  </InputContainer>

                  <InputContainer>
                    <h3>Preferred GPA</h3>
                    <InputGroup>
                      <InputIcon icon={faUserGraduate} />
                      <Field
                        component={Input}
                        type="number"
                        name="gpaBand"
                        placeholder="4.0"
                        step="0.01"
                        min="1"
                        max="4"
                      />
                    </InputGroup>
                  </InputContainer>
                </InputLine>

                <InputLine>
                  <InputContainer>
                    <h3>Large market salary</h3>
                    <InputGroup>
                      <InputIcon icon={faMoneyCheckAlt} />
                      <Field
                        component={Input}
                        type="number"
                        name="salaryLarge"
                        placeholder="190000"
                        min="0"
                      />
                    </InputGroup>
                  </InputContainer>

                  <InputContainer>
                    <h3>Small market salary</h3>
                    <InputGroup>
                      <InputIcon icon={faMoneyCheckAlt} />
                      <Field
                        component={Input}
                        type="number"
                        name="salarySmall"
                        placeholder="150000"
                        min="0"
                      />
                    </InputGroup>
                  </InputContainer>
                </InputLine>

                <Submit isSubmitting={submitting}>Add firm</Submit>
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
