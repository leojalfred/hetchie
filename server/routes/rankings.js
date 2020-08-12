import express from 'express'
import Ranking from '../models/Ranking'

const router = express.Router()
router.get('/', async (request, response) => {
  try {
    const rankings = await Ranking.find()
    response.json(rankings)
  } catch (error) {
    console.log(error)
  }
})

export default router
