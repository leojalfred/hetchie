import validate from '../../validation/putList'
import User from '../../models/User'

export default async ({ body }, response) => {
  const { message, valid } = validate(body)
  if (!valid) return response.status(400).send(message)

  try {
    const { _id, name } = body

    const user = await User.findById(_id)
    if (user.lists && user.lists.some(list => list.name === name))
      return response.status(409).send('List already exists.')

    if (user.lists) user.lists.push({ name })
    else user.lists = [{ name }]

    const savedUser = await user.save()
    response.json(savedUser)
  } catch (error) {
    console.log(error)
  }
}
