import * as yup from 'yup'

const minDate = new Date()
const maxDate = new Date()
maxDate.setFullYear(maxDate.getFullYear() + 3)

export default yup.object({
  gpa: yup
    .number()
    .required('GPA is required.')
    .min(0, 'GPA must be at least 0.')
    .max(4, 'GPA must be at most 4.'),
  salaryLarge: yup
    .number()
    .required('Large market salary is required.')
    .min(0, 'Large market salary must be at least $0.'),
  salarySmall: yup.number().min(0, 'Small market salary must be at least $0.'),
  date: yup
    .date()
    .required('Interview date is required.')
    .min(minDate, 'Interview date cannot be today or before.')
    .max(maxDate, 'Interview date cannot be later than three years from now.'),
})
