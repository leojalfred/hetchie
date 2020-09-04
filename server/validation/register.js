import * as yup from 'yup'
import { email } from './shared'

export default function validateRegister(data) {
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

  yup.addMethod(yup.string, 'equalTo', function (ref, msg) {
    yup.mixed().test({
      name: 'equalTo',
      exclusive: false, // eslint-disable-next-line
      message: msg || '${path} must be the same as ${reference}',
      params: { reference: ref.path },
      test: value => value === this.resolve(ref),
    })
  })

  const schema = yup.object().shape({
    email,
    first: nameSchema('First'),
    last: nameSchema('Last'),
    school: yup.string().required('School is required.'),
    year: yup
      .number()
      .required('Graduation year is required.')
      .integer('Graduation year must be an integer.')
      .min(year, `Graduation year must be at least ${year}.`),
    password: passwordSchema('Password'),
    confirm: passwordSchema('Confirm password').equalTo(
      yup.ref('password'),
      'Passwords must match.'
    ),
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
