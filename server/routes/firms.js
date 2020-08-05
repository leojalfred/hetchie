import express from 'express'
import Firm from '../models/Firm'

const router = express.Router()
router.get('/', async (request, response) => {
  try {
    const firms = await Firm.find()
      .populate('locations')
      .populate('practices')
      .populate('rankings.ranking')
      .populate('qualifications')
      .exec()
    response.json(firms)
  } catch (error) {
    console.log(error)
  }
})

export default router
