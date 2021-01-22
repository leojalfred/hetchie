import bcrypt from 'bcryptjs'
import validate from '../../validation/register'
import User from '../../models/User'
import signResponse from '../../utils/signResponse'

export default async function put({ body }, response) {
  const { message, valid } = validate(body)
  if (!valid) return response.status(400).send(message)

  try {
    const { first, last, email, school, year, password, _id } = body
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)
    const update = {
      first,
      last,
      email,
      school,
      year,
      password: hash,
    }

    const user = await User.findByIdAndUpdate(_id, update, { new: true })
      .select('-verified -password -__v')
      .populate('locations')
      .populate('practices')
      .exec()

    signResponse(user.toObject(), response)
  } catch (error) {
    console.log(error)
  }
}
