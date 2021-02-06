import * as yup from 'yup'

export default yup.object({
  firm: yup.string().required('Firm name is required'),
  locations: yup.array().of(yup.string().required('Location is required.')),
  practices: yup.array().of(yup.string().required('Practice is required.')),
  gpaRequired: yup
    .number()
    .required('Required GPA is required.')
    .min(0, 'Required GPA must be at least 0.')
    .max(4, 'Required GPA must be at most 4.'),
  gpaBand: yup
    .number()
    .min(0, 'Preferred GPA must be at least 0.')
    .max(4, 'Preferred GPA must be at most 4.'),
  salaryLarge: yup
    .number()
    .required('Large market salary is required.')
    .min(0, 'Large market salary must be at least $0.'),
  salarySmall: yup.number().min(0, 'Small market salary must be at least $0.'),
  rankings: yup.array().of(
    yup.object({
      position: yup.number().required('Ranking position is required.'),
      ranking: yup.string().required('Ranking name is required.'),
    })
  ),
  // qualifications: yup
  //   .array()
  //   .of(yup.string().required('Qualification is required.')),
  // links: yup.object({
  //   firm: yup.string().url('Firm link must be valid URL.'),
  //   chambers: yup.string().url('Chambers link must be valid URL.'),
  //   vault: yup.string().url('Vault link must be valid URL.'),
  // }),
  // date: yup.date().required('Interview date is required.'),
})
