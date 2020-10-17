import validate from '../../validation/putFirms'
import User from '../../models/User'

export default async ({ body }, response) => {
  const { message, valid } = validate(body)
  if (!valid) return response.status(400).send(message)

  try {
    const { id, lists, firms } = body
    const user = await User.findById(id)

    const data = {}
    response.json(data)
  } catch (error) {
    console.log(error)
  }
}
