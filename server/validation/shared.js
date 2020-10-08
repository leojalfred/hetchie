import { string, array } from 'yup'

export const email = string()
  .required('Email is required.')
  .email('Email is invalid.')

const namePattern = /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð,.'-]+$/u
export const name = label =>
  yup
    .string()
    .required(`${label} is required.`)
    .matches(name, {
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
