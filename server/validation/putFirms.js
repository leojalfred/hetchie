import { object } from 'yup'
import { idSchema, idArraySchema, evaluate } from './shared'

export default data => {
  const schema = object().shape({
    id: idSchema('User'),
    lists: idArraySchema('Lists'),
    firms: idArraySchema('Firms'),
  })

  return evaluate(data, schema)
}
