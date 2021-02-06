import {
  faSortNumericUp,
  faUniversity,
  faLink,
} from '@fortawesome/free-solid-svg-icons'
import { Field } from 'formik'
import { connect } from 'react-redux'
import {
  InputLine,
  InputContainer,
  InputGroup,
  InputIcon,
  Input,
} from 'components/Inputs'
import Select from 'components/Select'

function RankingLine({ hetchie, key, rankings, onChange }) {
  return (
    <InputLine key={key}>
      <InputContainer>
        <h3>Vault ranking position</h3>
        <InputGroup>
          <InputIcon icon={faSortNumericUp} />
          <Field
            component={Input}
            type="number"
            name={`rankings[${key}].position`}
            placeholder="1"
            min="1"
            max="100"
          />
        </InputGroup>
      </InputContainer>

      <InputContainer>
        <h3>Vault ranking name</h3>
        <InputGroup>
          <InputIcon icon={faUniversity} />
          <Field
            component={Select}
            options={hetchie.rankings}
            value={rankings[key]}
            name={`rankings[${key}].name`}
            placeholder="Ranking"
            onChange={onChange}
            creatable
          />
        </InputGroup>
      </InputContainer>

      <InputContainer>
        <h3>Vault ranking link</h3>
        <InputGroup>
          <InputIcon icon={faLink} />
          <Field
            component={Input}
            type="text"
            name={`rankings[${key}].link`}
            placeholder="Vault ranking link"
          />
        </InputGroup>
      </InputContainer>
    </InputLine>
  )
}

const mapStateToProps = ({ hetchie }) => ({ hetchie })
export default connect(mapStateToProps)(RankingLine)
