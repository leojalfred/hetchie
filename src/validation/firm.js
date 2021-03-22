import * as yup from 'yup'

export default yup.object({
  name: yup.string().required('Firm name is required.'),
  firmLink: yup.string().url('Firm link must be valid URL.'),
  chambersLink: yup.string().url('Chambers link must be valid URL.'),
  vaultLink: yup.string().url('Vault link must be valid URL.'),
  positions: yup.array(
    yup
      .number()
      .typeError('Position must be a number.')
      .integer('Position must be an integer.')
      .min(1, 'Position year must be at least 1.')
      .max(100, 'Position year must be at most 100.')
  ),
  rankingLinks: yup.array(
    yup.string().url('Ranking link must be a valid URL.')
  ),
})
