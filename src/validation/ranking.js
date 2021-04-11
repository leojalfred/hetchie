import { object, string } from 'yup'

export default object({
  name: string().required('Ranking name is required.'),
  link: string()
    .required('Ranking link is required.')
    .url('Ranking link must be valid URL.'),
})
