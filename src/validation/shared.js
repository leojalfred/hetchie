import { string } from 'yup'
import empty from 'utils/empty'

const date = new Date()
const year = date.getUTCFullYear()
const emailPattern = new RegExp(
  `(?:\\w+\\.){2}(?:${year}|${year + 1}|${year + 2})@lawmail.usc.edu`
)

export const emailSchema = string()
  .required('Email is required.')
  .matches(emailPattern, {
    message: `Must be valid USC Law email.`,
    excludeEmptyString: true,
  })

const namePattern = /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð,.'-]+$/u
export const nameSchema = label =>
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

export let combinedError = ''
export function getError(serverError, clientErrors, touched) {
  if (!empty(clientErrors)) {
    for (const [key, error] of Object.entries(clientErrors)) {
      if (touched[key]) combinedError = error
      return
    }
  } else if (serverError) combinedError = serverError
  else combinedError = ''
}
