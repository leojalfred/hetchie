import * as yup from 'yup'
import { nameSchema } from './shared'

export default yup.object().shape({
  firm: nameSchema('Firm'),
  locations: yup.array().of(yup.string().required('Location is required.')),
  practices: yup.array().of(yup.string().required('Practice is required.')),
  qualifications: yup
    .array()
    .of(yup.string().required('Qualification is required.')),
  smallSalary: yup.number(),
  largeSalary: yup.number().required('Large market salary is required.'),
  date: yup.date(),
  requiredGPA: yup
    .number()
    .required('Required GPA is required.')
    .min(0, 'Required GPA must be at least 0.')
    .max(4, 'Required GPA must be at most 4.'),
  preferredGPA: yup
    .number()
    .min(0, 'Preferred GPA must be at least 0.')
    .max(4, 'Preferred GPA must be at most 4.'),
})
