import validate from '../../validation/preferences'
import User from '../../models/User'

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

    response.json(user)
  } catch (error) {
    console.log(error)
  }
}
