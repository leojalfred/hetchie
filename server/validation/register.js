import * as yup from 'yup'
import { name, email, evaluate } from './shared'

export default function validateRegister(data) {
  const password = /.*(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[ !"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]).*/
  const date = new Date()
  const year = date.getUTCFullYear()

  const passwordSchema = label =>
    yup
      .string()
      .required(label + ' is required.')
      .matches(password, {
        message:
          label +
          ' must contain at least one digit, upper- and lowercase letter, and symbol.',
        excludeEmptyString: true,
      })

  const schema = yup.object().shape({
    first: name('First name'),
    last: name('Last name'),
    email,
    school: yup.string().required('School is required.'),
    year: yup
      .number()
      .required('Graduation year is required.')
      .integer('Graduation year must be an integer.')
      .min(year, `Graduation year must be at least ${year}.`),
    password: passwordSchema('Password'),
    confirm: passwordSchema('Confirm password').oneOf(
      [yup.ref('password'), null],
      'Passwords must match.'
    ),
  })

  return evaluate(data, schema)
}
