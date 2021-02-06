import { object, string } from 'yup'
import { evaluate } from './shared'

export default function validateRanking(data) {
  const schema = object().shape({
    name: string().required('Ranking name is required.'),
    link: string()
      .required('Ranking link is required.')
      .url('Ranking link must be valid URL.'),
  })

  return evaluate(data, schema)
}
