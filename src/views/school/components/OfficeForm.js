import { useState, useEffect } from 'react'
import axios from 'axios'
import { Formik, Form, Field } from 'formik'
import {
  faGavel,
  faMapMarkedAlt,
  faBriefcase,
  faUserGraduate,
  faMoneyCheckAlt,
  faUserTie,
  faCalendarAlt,
} from '@fortawesome/free-solid-svg-icons'
import { connect } from 'react-redux'
import empty from 'utils/empty'
import sort from 'utils/sort'
import { putName, getData } from 'actions/data'
import schema from 'validation/school'
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
import Select from 'components/Select'

function OfficeForm({ hetchie, error, putName, getData }) {
  const initialValues = {
    firm: '',
    gpaRequired: '',
    gpaBand: '',
    salaryLarge: '',
    salarySmall: '',
    date: '',
  }

  const [submitting, setSubmitting] = useState(false)
  const [selectedFirm, setSelectedFirm] = useState()
  const [locations, setLocations] = useState([])
  const [practices, setPractices] = useState([])
  const [qualifications, setQualifications] = useState([])
  const onSubmit = data => {
    setSubmitting(true)

    const firm = selectedFirm.value

    const getID = ({ value }) => value
    const locationIDs = locations.map(getID)
    const practiceIDs = practices.map(getID)
    const qualificationIDs = qualifications.map(getID)

    const payload = {
      firm,
      locations: locationIDs,
      practices: practiceIDs,
      salary: {
        large: data.salaryLarge,
        small: data.salarySmall,
      },
      qualifications: qualificationIDs,
      gpa: {
        required: data.gpaRequired,
        band: data.gpaBand,
      },
    }

    console.log(payload)

    setSubmitting(false)
  }

  const [serverError, setServerError] = useState('')
  useEffect(() => {
    if (!empty(error)) setServerError(error)
    else setServerError('')
  }, [error])

  const [firms, setFirms] = useState([])
  useEffect(() => {
    async function getFirms() {
      const { data } = await axios.get('/api/firms')
      const firmOptions = data.map(({ _id, name }) => ({
        value: _id,
        label: name,
      }))

      setFirms(firmOptions.sort(sort))
    }

    getFirms()
  }, [])

  const onChange = setter => selected => setter(selected)
  const onCreateLocation = name =>
    putName('location', name, locations, setLocations)
  const onCreatePractice = name =>
    putName('practice', name, practices, setPractices)
  const onCreateQualification = name =>
    putName('qualification', name, qualifications, setQualifications)

  useEffect(() => {
    getData('qualifications')
  }, [getData])

  const minDate = new Date().toLocaleDateString('en-US')
  let maxDate = new Date()
  maxDate.setFullYear(maxDate.getFullYear() + 3)
  maxDate = maxDate.toLocaleDateString('en-US')

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
              <h3>Firm name</h3>
              <InputGroup>
                <InputIcon icon={faGavel} />
                <Field
                  component={Select}
                  options={firms}
                  value={selectedFirm}
                  name="firms"
                  placeholder="Firm name"
                  onChange={onChange(setSelectedFirm)}
                />
              </InputGroup>

              <InputLine>
                <InputContainer>
                  <h3>Locations</h3>
                  <InputGroup>
                    <InputIcon icon={faMapMarkedAlt} />
                    <Field
                      component={Select}
                      options={hetchie.locations}
                      value={locations}
                      name="locations"
                      placeholder="Locations"
                      onChange={onChange(setLocations)}
                      onCreateOption={onCreateLocation}
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
                      options={hetchie.practices}
                      value={practices}
                      name="practices"
                      placeholder="Practices"
                      onChange={onChange(setPractices)}
                      onCreateOption={onCreatePractice}
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

              <InputLine>
                <InputContainer>
                  <h3>Qualifications</h3>
                  <InputGroup>
                    <InputIcon icon={faUserTie} />
                    <Field
                      component={Select}
                      options={hetchie.qualifications}
                      value={qualifications}
                      name="qualifications"
                      placeholder="Qualifications"
                      onChange={onChange(setQualifications)}
                      onCreateOption={onCreateQualification}
                      creatable
                      isMulti
                    />
                  </InputGroup>
                </InputContainer>

                <InputContainer>
                  <h3>Date</h3>
                  <InputGroup>
                    <InputIcon icon={faCalendarAlt} />
                    <Field
                      component={Input}
                      type="date"
                      name="date"
                      placeholder={minDate}
                      min={minDate}
                      max={maxDate}
                    />
                  </InputGroup>
                </InputContainer>
              </InputLine>

              <Submit isSubmitting={submitting}>Add office</Submit>
            </Form>
          </>
        )}
      </Formik>
    </div>
  )
}

const mapStateToProps = ({ hetchie, error }) => ({ hetchie, error })
export default connect(mapStateToProps, { putName, getData })(OfficeForm)
