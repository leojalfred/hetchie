import {
  faSortNumericUp,
  faUniversity,
  faLink,
} from '@fortawesome/free-solid-svg-icons'
import { Field } from 'formik'
import { connect } from 'react-redux'
import { InputLine, InputGroup, Input } from 'components/Inputs'
import Select from 'components/Select'

function RankingLine({ hetchie }) {
  return (
    <InputLine>
      <InputGroup title="Position" type="4" icon={faSortNumericUp}>
        <Field
          component={Input}
          type="number"
          name={`position`}
          placeholder="1"
          min="1"
          max="100"
        />
      </InputGroup>

      <InputGroup title="Ranking" type="4" icon={faUniversity}>
        <Field
          component={Select}
          options={hetchie.rankings}
          name={`name`}
          placeholder="Ranking"
          creatable
        />
      </InputGroup>

      <InputGroup title="Link" type="4" icon={faLink}>
        <Field
          component={Input}
          type="text"
          name={`link`}
          placeholder="Vault ranking link"
        />
      </InputGroup>
    </InputLine>
  )
}

const mapStateToProps = ({ hetchie }) => ({ hetchie })
export default connect(mapStateToProps)(RankingLine)
