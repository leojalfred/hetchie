import * as yup from 'yup'
import { idSchema, idArraySchema } from './shared'

export default function validatePreferences(data) {
  const schema = yup.object().shape({
    _id: idSchema('User'),
    locations: idArraySchema('Location'),
    practices: idArraySchema('Practices'),
  })

  let errors = []
  let valid = false
  try {
    schema.validateSync(data)
    valid = true
  } catch (error) {
    errors = error.errors
  }

  return { errors, valid }
}
