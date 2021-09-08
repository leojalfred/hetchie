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
import { postName } from 'actions/data'
import schema from 'validation/office'
import { getError, combinedError } from 'validation/shared'
import Error from 'components/Error'
import { TopLine, InputLine, InputGroup, Input, Submit } from 'components/Form'
import Select from 'components/Select'

function OfficeForm({ hetchie, user, error, postName }) {
  const [notification, setNotification] = useState({ type: 'hidden', text: '' })

  const initialValues = {
    firm: '',
    gpa: '',
    salaryLarge: '',
    salarySmall: '',
    date: '',
  }

  const [selectedFirm, setSelectedFirm] = useState()
  const [locations, setLocations] = useState([])
  const [practices, setPractices] = useState([])
  const [qualifications, setQualifications] = useState([])
  const onSubmit = async (data, action) => {
    if (selectedFirm === null || selectedFirm === undefined) {
      setServerError('Firm must be chosen.')
      return
    }

    const firm = selectedFirm.value

    const getID = ({ value }) => value
    const locationIDs = locations.map(getID)
    const practiceIDs = practices.map(getID)
    const qualificationIDs = qualifications.map(getID)

    const payload = {
      id: user.data.school._id,
      firm,
      locations: locationIDs,
      practices: practiceIDs,
      gpa: data.gpa,
      salary: {
        large: data.salaryLarge,
        small: data.salarySmall,
      },
      qualifications: qualificationIDs,
      date: new Date(data.date),
    }

    try {
      const { data: added } = await axios.put('/api/schools', payload)
      if (added) {
        setNotification({
          type: 'success',
          text: 'New office successfully added!',
        })

        action.resetForm()
        setSelectedFirm(null)
        setLocations([])
        setPractices([])
        setQualifications([])
      } else
        setNotification({
          type: 'failure',
          text: 'Failed to add new office.',
        })
    } catch (error) {
      console.log(error)
    }

    action.setSubmitting(false)
  }

  const [serverError, setServerError] = useState('')
  useEffect(() => {
    if (!empty(error)) setServerError(error)
    else setServerError('')
  }, [error])

  const onFirmChange = selected => {
    setSelectedFirm(selected)
    setServerError('')
  }
  const onChange = setter => selected => setter(selected)
  const onCreateLocation = name =>
    postName('location', name, locations, setLocations)
  const onCreatePractice = name =>
    postName('practice', name, practices, setPractices)
  const onCreateQualification = name =>
    postName('qualification', name, qualifications, setQualifications)

  const minDate = new Date().toLocaleDateString('en-US')
  let maxDate = new Date()
  maxDate.setFullYear(maxDate.getFullYear() + 3)
  maxDate = maxDate.toLocaleDateString('en-US')

  return (
    <div className="school__form">
      <TopLine
        heading="Add Offices"
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
                    onChange={onFirmChange}
                  />
                </InputGroup>

                <InputGroup title="GPA" icon={faUserGraduate}>
                  <Field
                    component={Input}
                    type="number"
                    name="gpa"
                    placeholder="4.0"
                    step="0.01"
                    min="0"
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

              <Submit isSubmitting={isSubmitting}>Add office</Submit>
            </Form>
          </>
        )}
      </Formik>
    </div>
  )
}

const mapStateToProps = ({ hetchie, user, error }) => ({ hetchie, user, error })
export default connect(mapStateToProps, { postName })(OfficeForm)
