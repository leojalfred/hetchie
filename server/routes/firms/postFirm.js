import validate from '../../validation/postFirm'
import Firm from '../../models/Firm'

export default async function postFirm({ body }, response) {
  const { message, valid } = validate(body)
  if (!valid) return response.status(400).send(message)

  try {
    const data = new Firm(body)
    const saved = await data.save()

    response.json(saved)
  } catch (error) {
    console.log(error)
  }
}
