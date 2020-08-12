import express from 'express'
import Qualification from '../models/Qualification'

const router = express.Router()
router.get('/', async (request, response) => {
  try {
    const qualifications = await Qualification.find()
    response.json(qualifications)
  } catch (error) {
    console.log(error)
  }
})

export default router
