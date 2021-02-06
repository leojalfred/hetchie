import validate from '../../validation/name'
import Practice from '../../models/Practice'

export default async function putPractice({ body }, response) {
  const { message, valid } = validate(body)
  if (!valid) return response.status(400).send(message)

  try {
    const { name } = body
    const practice = new Practice({ name })
    const savedPractice = await practice.save()

    response.json(savedPractice)
  } catch (error) {
    console.log(error)
  }
}
