import { string, array } from 'yup'

export const emailSchema = string()
  .required('Email is required.')
  .email('Email is invalid.')

const hexPattern = /^[\da-f]+$/
export const idSchema = schema =>
  string()
    .required(`${schema} ID is required.`)
    .matches(hexPattern, {
      message: `${schema} ID is invalid.`,
      excludeEmptyString: true,
    })
export const idArraySchema = schema => array().of(idSchema(schema))
