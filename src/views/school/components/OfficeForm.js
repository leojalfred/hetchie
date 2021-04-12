import { useState, useEffect } from 'react'
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
import { putName } from 'actions/data'
import schema from 'validation/office'
import { getError, combinedError } from 'validation/shared'
import Error from 'components/Error'
import { InputLine, InputGroup, Input, Submit } from 'components/Form'
import Select from 'components/Select'

function OfficeForm({ hetchie, error, putName }) {
  const initialValues = {
    firm: '',
    gpa: '',
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
    if (selectedFirm === undefined) {
      setServerError('Firm must be chosen.')
      return
    }

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
      gpa: data.gpa,
    }

    console.log(payload)

    setSubmitting(false)
  }

  const [serverError, setServerError] = useState('')
  useEffect(() => {
    if (!empty(error)) setServerError(error)
    else setServerError('')
  }, [error])

  const onChange = setter => selected => setter(selected)
  const onCreateLocation = name =>
    putName('location', name, locations, setLocations)
  const onCreatePractice = name =>
    putName('practice', name, practices, setPractices)
  const onCreateQualification = name =>
    putName('qualification', name, qualifications, setQualifications)

  const minDate = new Date().toLocaleDateString('en-US')
  let maxDate = new Date()
  maxDate.setFullYear(maxDate.getFullYear() + 3)
  maxDate = maxDate.toLocaleDateString('en-US')

  return (
    <div className="school__form">
      <h2>Add Offices</h2>
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
                    component={Select}
                    options={hetchie.firms}
                    value={selectedFirm}
                    name="firms"
                    placeholder="Firm name"
                    onChange={onChange(setSelectedFirm)}
                  />
                </InputGroup>

                <InputGroup title="GPA" icon={faUserGraduate}>
                  <Field
                    component={Input}
                    type="number"
                    name="gpa"
                    placeholder="4.0"
                    step="0.01"
                    min="1"
                    max="4"
                  />
                </InputGroup>
              </InputLine>

              <InputLine>
                <InputGroup title="Locations" icon={faMapMarkedAlt}>
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

                <InputGroup title="Practices" icon={faBriefcase}>
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
              </InputLine>

              <InputLine>
                <InputGroup title="Large market salary" icon={faMoneyCheckAlt}>
                  <Field
                    component={Input}
                    type="number"
                    name="salaryLarge"
                    placeholder="190000"
                    min="0"
                  />
                </InputGroup>

                <InputGroup title="Small market salary" icon={faMoneyCheckAlt}>
                  <Field
                    component={Input}
                    type="number"
                    name="salarySmall"
                    placeholder="150000"
                    min="0"
                  />
                </InputGroup>
              </InputLine>

              <InputLine>
                <InputGroup title="Qualifications" icon={faUserTie}>
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

                <InputGroup title="Date" icon={faCalendarAlt}>
                  <Field
                    component={Input}
                    type="date"
                    name="date"
                    placeholder={minDate}
                    min={minDate}
                    max={maxDate}
                  />
                </InputGroup>
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
export default connect(mapStateToProps, { putName })(OfficeForm)
