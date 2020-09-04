import { object, string } from 'yup'
import { email } from './shared'

export default function validateLogin(data) {
  const schema = object().shape({
    email,
    password: string().required('Password is required.'),
  })

  let message = ''
  let valid = false
  try {
    schema.validateSync(data)
    valid = true
  } catch (error) {
    message = error.message
  }

  return { message, valid }
}
