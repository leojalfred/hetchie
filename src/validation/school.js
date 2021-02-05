import * as yup from 'yup'

export default yup.object({
  firm: yup.string().required('Firm name is required'),
  locations: yup.array().of(yup.string().required('Location is required.')),
  practices: yup.array().of(yup.string().required('Practice is required.')),
  gpa: yup.object({
    required: yup
      .number()
      .required('Required GPA is required.')
      .min(0, 'Required GPA must be at least 0.')
      .max(4, 'Required GPA must be at most 4.'),
    band: yup
      .number()
      .min(0, 'Preferred GPA must be at least 0.')
      .max(4, 'Preferred GPA must be at most 4.'),
  }),
  salary: yup.object({
    small: yup.number(),
    large: yup.number().required('Large market salary is required.'),
  }),
  rankings: yup.array().of(
    yup.object({
      position: yup.number().required('Ranking position is required.'),
      ranking: yup.string().required('Ranking name is required.'),
    })
  ),
  qualifications: yup
    .array()
    .of(yup.string().required('Qualification is required.')),
  links: yup.object({
    firm: yup.string(),
    chambers: yup.string(),
    vault: yup.string(),
  }),
  date: yup.date().required('Interview date is required.'),
})
