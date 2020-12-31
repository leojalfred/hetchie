import { string, array } from 'yup'

const date = new Date()
const year = date.getUTCFullYear()
const emailPattern = new RegExp(
  `(?:\\w+\\.){2}(?:${year}|${year + 1}|${year + 2})@lawmail.usc.edu`
)

export const email = string()
  .required('Email is required.')
  .matches(emailPattern, {
    message: `Must be valid USC Law email.`,
    excludeEmptyString: true,
  })

const namePattern = /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð,.'-]+$/u
export const name = label =>
  string()
    .required(`${label} is required.`)
    .matches(namePattern, {
      message: `${label} is invalid.`,
      excludeEmptyString: true,
    })

const hexPattern = /^[\da-f]+$/
export const idSchema = schema =>
  string()
    .required(`${schema} ID is required.`)
    .matches(hexPattern, {
      message: `${schema} ID is invalid.`,
      excludeEmptyString: true,
    })
export const idArraySchema = schema => array().of(idSchema(schema))

export function evaluate(data, schema) {
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
