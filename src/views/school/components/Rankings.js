import {
  faSortNumericUp,
  faUniversity,
} from '@fortawesome/free-solid-svg-icons'
import { FieldArray, Field } from 'formik'
import { connect } from 'react-redux'
import { InputLine, InputGroup, Input, Submit } from 'components/Form'
import Select from 'components/Select'
import Button from 'components/buttons/Button'
import './Rankings.scss'

function RankingLine({ rankings, setRankings, setError, hetchie, submitting }) {
  const onChange = i => selected => {
    if (rankings[i] === null && selected) setError('')

    const newRankings = [...rankings]
    newRankings[i] = selected
    setRankings(newRankings)
  }

  const addRanking = array => () => {
    array.push(1)
    setRankings([...rankings, null])
  }

  return (
    <>
      {rankings.length > 0 && (
        <>
          <h3 className="rankings__heading">Vault Rankings</h3>
          <div className="rankings__sub-headings">
            <h4 className="rankings__sub-heading">Position</h4>
            <h4 className="rankings__sub-heading">Ranking</h4>
          </div>
        </>
      )}
      <FieldArray
        name="positions"
        render={array => (
          <>
            {rankings.map((ranking, i) => (
              <div key={i}>
                <InputLine>
                  <InputGroup icon={faSortNumericUp}>
                    <Field
                      component={Input}
                      type="number"
                      name={`positions[${i}]`}
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
export default connect(mapStateToProps)(RankingLine)
