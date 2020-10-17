import validate from '../../validation/putFirms'
import User from '../../models/User'

export default async ({ body }, response) => {
  const { message, valid } = validate(body)
  if (!valid) return response.status(400).send(message)

  try {
    const { id, lists, firms } = body
    const user = await User.findById(id)

    for (const list of lists) {
      const i = user.lists.findIndex(element => element._id == list)
      const putList = user.lists[i]

      for (const firm of firms) {
        if (!putList.firms.some(element => element._id === firm))
          putList.firms.push(firm)
      }

      user.lists[i] = putList
    }

    const savedUser = await user.save()
    response.json(savedUser)
  } catch (error) {
    console.log('fuck')
    console.error(error.message)
  }
}
