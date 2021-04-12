import validate from '../../validation/ranking'
import Ranking from '../../models/Ranking'

export default async function postRanking({ body }, response) {
  const { message, valid } = validate(body)
  if (!valid) return response.status(400).send(message)

  try {
    const { name, link } = body
    const ranking = new Ranking({ name, link })
    const savedRanking = await ranking.save()

    response.json(savedRanking)
  } catch (error) {
    console.log(error)
  }
}
