import * as yup from 'yup'
import { email } from './shared'

const name = /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð,.'-]+$/u
const password = /.*(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[ !"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]).*/
const date = new Date()
const year = date.getUTCFullYear()

const nameSchema = label =>
  yup
    .string()
    .required(`${label} name is required.`)
    .matches(name, {
      message: label + ' name is invalid.',
      excludeEmptyString: true,
    })
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
