import validator from 'validator'

export default function validateLogin({ email, password }) {
  const errors = {}

  email = email || ''
  password = password || ''

  if (validator.isEmpty(email)) errors.email = 'Email is required.'
  else if (!validator.isEmail(email)) errors.email = 'Email is invalid.'

  if (validator.isEmpty(password)) errors.password = 'Password is required.'

  let isValid = true
  Object.values(errors).forEach(value => {
    if (value) isValid = false
  })

  return { errors, isValid }
}
