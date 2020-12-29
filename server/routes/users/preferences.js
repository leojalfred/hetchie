import validate from '../../validation/preferences'
import User from '../../models/User'
import signResponse from '../../utils/signResponse'

export default async ({ body }, response) => {
  const { message, valid } = validate(body)
  if (!valid) return response.status(400).send(message)

  try {
    const { _id, gpa, locations, practices } = body
    const update = { gpa, locations, practices }
    const user = await User.findByIdAndUpdate(_id, update, {
      new: true,
    })
      .select('-verified -password -__v')
      .populate('locations')
      .populate('practices')
      .exec()

    signResponse(user.toObject(), response)
  } catch (error) {
    console.log(error)
  }
}
