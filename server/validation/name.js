import { object, string } from 'yup'
import { evaluate } from './shared'

export default function validateName(data) {
  const schema = object().shape({
    name: string().required('Name is required'),
  })

  return evaluate(data, schema)
}
