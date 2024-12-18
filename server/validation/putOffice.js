import * as yup from 'yup'
import { idSchema, idArraySchema, evaluate } from './shared'

export default function validateName(data) {
  const NaNtoNull = value => (isNaN(value) ? null : value)

  const minDate = new Date()
  const maxDate = new Date()
  maxDate.setFullYear(maxDate.getFullYear() + 3)

  const schema = yup.object({
    id: idSchema('School'),
    firm: idSchema('Firm'),
    locations: idArraySchema('Location'),
    practices: idArraySchema('Practice'),
    gpa: yup
      .number()
      .required('Office GPA is required.')
      .typeError('Office GPA must be a number.')
      .min(0, 'Office GPA must be at least 0.')
      .max(100, 'Office GPA must be less than or equal to 4.'),
    salary: yup.object({
      large: yup
        .number()
        .typeError('Office large market salary must be a number.')
        .min(0, 'Office large market salary must be at least 0.')
        .transform(NaNtoNull)
        .nullable(),
      small: yup
        .number()
        .typeError('Office small market salary must be a number.')
        .min(0, 'Office small market salary must be at least 0.')
        .transform(NaNtoNull)
        .nullable(),
    }),
    qualifications: idArraySchema('Qualification'),
    date: yup
      .date()
      .required('Office interview date is required.')
      .min(minDate, 'Office interview must not be before today.')
      .max(
        maxDate,
        'Office interview must not be later than three years from today.'
      ),
  })

  return evaluate(data, schema)
}
