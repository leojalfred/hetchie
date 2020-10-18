import { object } from 'yup'
import { idSchema, evaluate } from './shared'

export default data => {
  const schema = object().shape({
    id: idSchema('User'),
    list: idSchema('List'),
  })

  return evaluate(data, schema)
}
