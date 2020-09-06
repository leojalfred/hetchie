import { string } from 'yup'
import empty from 'utils/empty'

export const email = string()
  .required('Email is required.')
  .email('Email is invalid.')

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
