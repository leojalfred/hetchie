import validate from '../../validation/putList'
import User from '../../models/User'

export default async ({ body }, response) => {
  const { message, valid } = validate(body)
  if (!valid) return response.status(400).send(message)

  try {
    const { _id, name } = body
    const user = await User.findById(_id)
      .select('-verified -password -__v')
      .populate('locations')
      .populate('practices')
      .exec()

    const nameTaken = list => list.name === name
    if (user.lists.some(nameTaken))
      return response.status(409).send('List already exists.')

    if (!('lists' in user)) user.lists = []
    user.lists.push({ name, firms: [] })
    const savedUser = await user.save()

    const putList = user.lists[user.lists.length - 1]
    const putListOption = { value: putList._id, label: putList.name }
    const data = { ...savedUser.toObject(), putListOption }
    response.json(data)
  } catch (error) {
    console.log(error)
  }
}
