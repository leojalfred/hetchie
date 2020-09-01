import bcrypt from 'bcryptjs'
import validate from '../../validation/register'
import User from '../../models/User'

export default async ({ body }, response) => {
  const { errors, isValid } = validate(body)
  if (!isValid) return response.status(400).json(errors)

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
    response.json(user)
  } catch (error) {
    console.log(error)
  }
}
