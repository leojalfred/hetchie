import * as yup from 'yup'
import { emailSchema, nameSchema } from './shared'

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

export default yup.object().shape({
  first: nameSchema('First'),
  last: nameSchema('Last'),
  email: emailSchema,
  school: yup.string().required('School is required.'),
  year: yup
    .number()
    .typeError('Graduation year must be a number.')
    .required('Graduation year is required.')
    .integer('Graduation year must be an integer.')
    .min(year, `Graduation year must be at least ${year}.`),
  password: passwordSchema('Password'),
  confirm: passwordSchema('Confirm password').oneOf(
    [yup.ref('password'), null],
    'Passwords must match.'
  ),
})
