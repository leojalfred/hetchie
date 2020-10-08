import * as yup from 'yup'
import { idSchema, name, evaluate } from './shared'

export default function validate(data) {
  const schema = yup.object().shape({
    _id: idSchema('User'),
    name: name('List name'),
  })

  return evaluate(data, schema)
}
