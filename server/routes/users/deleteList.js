import validate from '../../validation/deleteList'
import User from '../../models/User'
import signResponse from '../../utils/signResponse'

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
    signResponse(savedUser.toObject(), response)
  } catch (error) {
    console.log(error)
  }
}
