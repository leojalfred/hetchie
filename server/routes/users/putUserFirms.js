import validate from '../../validation/putFirms'
import User from '../../models/User'
import signResponse from '../../utils/signResponse'

export default async function putFirms({ body }, response) {
  const { message, valid } = validate(body)
  if (!valid) return response.status(400).send(message)

  try {
    const { id, lists, firms } = body
    const user = await User.findById(id)
      .select('-verified -password -__v')
      .populate('locations')
      .populate('practices')
      .populate('school')
      .exec()

    for (const list of lists) {
      const matchingList = element => element._id == list
      const i = user.lists.findIndex(matchingList)

      for (const firm of firms) {
        const matchingFirm = element => element._id == firm
        if (!user.lists[i].firms.some(matchingFirm))
          user.lists[i].firms.push(firm)
      }
    }

    const savedUser = await user.save()
    signResponse(savedUser.toObject(), response)
  } catch (error) {
    console.log(error)
  }
}
