import { object } from 'yup'
import { idSchema, idArraySchema, evaluate } from './shared'

export default function validateSaveList(data) {
  const schema = object().shape({
    id: idSchema('User'),
    list: idSchema('List'),
    firms: idArraySchema('Firms'),
  })

  return evaluate(data, schema)
}
