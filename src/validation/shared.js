import { string } from 'yup'
import empty from 'utils/empty'

export const emailSchema = string()
  .required('Email is required.')
  .email('Email is invalid.')

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
