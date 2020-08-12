import express from 'express'
import Location from '../models/Location'

const router = express.Router()
router.get('/', async (request, response) => {
  try {
    const locations = await Location.find()
    response.json(locations)
  } catch (error) {
    console.log(error)
  }
})

export default router
