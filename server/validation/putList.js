import { object } from 'yup'
import { idSchema, name, evaluate } from './shared'

export default function validate(data) {
  const schema = object().shape({
    _id: idSchema('User'),
    name: name('List name'),
  })

  return evaluate(data, schema)
}
