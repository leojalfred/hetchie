import validate from '../../validation/name'
import Location from '../../models/Location'

export default async function putLocation({ body }, response) {
  const { message, valid } = validate(body)
  if (!valid) return response.status(400).send(message)

  try {
    const { name } = body
    const location = new Location({ name })
    const savedLocation = await location.save()

    response.json(savedLocation)
  } catch (error) {
    console.log(error)
  }
}
