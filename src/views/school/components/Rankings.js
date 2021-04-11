import {
  faSortNumericUp,
  faUniversity,
  faLink,
} from '@fortawesome/free-solid-svg-icons'
import { FieldArray, Field } from 'formik'
import { connect } from 'react-redux'
import { putName } from 'actions/data'
import { InputLine, InputGroup, Input, Submit } from 'components/Form'
import Select from 'components/Select'
import Button from 'components/buttons/Button'
import './Rankings.scss'

function RankingLine({
  rankings,
  setRankings,
  setError,
  hetchie,
  putName,
  submitting,
}) {
  const onChange = i => selected => {
    const newRankings = [...rankings]
    newRankings[i] = selected

    if (!newRankings.some(ranking => ranking === null)) setError('')
    setRankings(newRankings)
  }

  const onCreate = i => name =>
    putName('ranking', name, rankings, setRankings, i)

  const addRanking = array => () => {
    array.push({ position: '', link: '' })
    setRankings([...rankings, null])
  }

  return (
    <>
      <h3 className="rankings__heading">Vault Rankings</h3>
      <div className="rankings__sub-headings">
        <h4 className="rankings__sub-heading">Position</h4>
        <h4 className="rankings__sub-heading">Ranking</h4>
        <h4 className="rankings__sub-heading">Link</h4>
      </div>
      <FieldArray
        name="rankings"
        render={array => (
          <>
            {rankings.map((ranking, i) => (
              <div key={i}>
                <InputLine grid="3">
                  <InputGroup icon={faSortNumericUp}>
                    <Field
                      component={Input}
                      type="number"
                      name={`rankings[${i}].position`}
                      placeholder="1"
                      min="1"
                      max="100"
                    />
                  </InputGroup>

                  <InputGroup icon={faUniversity}>
                    <Field
                      component={Select}
                      options={hetchie.rankings}
                      placeholder="Ranking"
                      value={rankings[i]}
                      onChange={onChange(i)}
                      onCreateOption={onCreate(i)}
                      creatable
                    />
                  </InputGroup>

                  <InputGroup icon={faLink}>
                    <Field
                      component={Input}
                      type="text"
                      name={`rankings[${i}].link`}
                      placeholder="Vault ranking link"
                    />
                  </InputGroup>
                </InputLine>
              </div>
            ))}

            <div className="rankings__buttons">
              <Button
                className="rankings__add-ranking"
                type="button"
                onClick={addRanking(array)}
              >
                Add ranking
              </Button>
              <Submit className="rankings__add-firm" isSubmitting={submitting}>
                Add firm
              </Submit>
            </div>
          </>
        )}
      />
    </>
  )
}

const mapStateToProps = ({ hetchie }) => ({ hetchie })
export default connect(mapStateToProps, { putName })(RankingLine)
