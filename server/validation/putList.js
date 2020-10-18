import { object, string } from 'yup'
import { idSchema, evaluate } from './shared'

export default function validate(data) {
  const schema = object().shape({
    _id: idSchema('User'),
    name: string().required('List name is required.'),
  })

  return evaluate(data, schema)
}
