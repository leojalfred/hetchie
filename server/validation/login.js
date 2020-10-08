import { object, string } from 'yup'
import { email, evaluate } from './shared'

export default function validateLogin(data) {
  const schema = object().shape({
    email,
    password: string().required('Password is required.'),
  })

  return evaluate(data, schema)
}
