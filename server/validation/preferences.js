import { object, string } from 'yup'
import { idSchema, idArraySchema } from './shared'

export default function validatePreferences(data) {
  const gpaPattern = /(([0-3]{1}\.\d{0,2})|([0-4]{1}))|[4]\.[0]{0,2}/
  const schema = object().shape({
    _id: idSchema('User'),
    gpa: string().required('GPA is required.').matches(gpaPattern, {
      message: 'GPA is invalid.',
      excludeEmptyString: true,
    }),
    locations: idArraySchema('Location'),
    practices: idArraySchema('Practices'),
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
