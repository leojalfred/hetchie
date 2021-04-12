import * as yup from 'yup'
import { idSchema, evaluate } from './shared'

export default function validateName(data) {
  const schema = yup.object({
    name: yup.string().required('Firm name is required.'),
    links: yup.object({
      firm: yup.string().url('Firm link must be valid URL.'),
      chambers: yup.string().url('Chambers link must be valid URL.'),
      vault: yup.string().url('Vault link must be valid URL.'),
    }),
    rankings: yup.array(
      yup.object({
        position: yup
          .number()
          .required('Ranking position is required.')
          .typeError('Ranking position must be a number.')
          .integer('Ranking position must be an integer.')
          .min(1, 'Ranking position year must be at least 1.')
          .max(100, 'Ranking position year must be at most 100.'),
        ranking: idSchema('Ranking'),
      })
    ),
  })

  return evaluate(data, schema)
}
