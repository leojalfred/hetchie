import express from 'express'
import Firm from '../models/Firm'

const router = express.Router()
router.get('/', async (request, response) => {
  try {
    const firms = await Firm.find()
    response.json(firms)
  } catch (error) {
    console.log(error)
  }
})

export default router
