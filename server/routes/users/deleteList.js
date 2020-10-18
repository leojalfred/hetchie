import validate from '../../validation/deleteList'
import User from '../../models/User'

export default async ({ body }, response) => {
  const { message, valid } = validate(body)
  if (!valid) return response.status(400).send(message)

  try {
    const { id, list } = body
    const user = await User.findById(id)
      .select('-verified -password -__v')
      .populate('locations')
      .populate('practices')
      .exec()

    const deleteList = element => element._id != list
    const lists = user.lists.filter(deleteList)
    user.lists = lists

    const savedUser = await user.save()
    response.json(savedUser)
  } catch (error) {
    console.log(error)
  }
}
