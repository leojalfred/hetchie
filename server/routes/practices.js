import express from 'express'
import Practice from '../models/Practice'

const router = express.Router()
router.get('/', async (request, response) => {
  try {
    const practices = await Practice.find()
    response.json(practices)
  } catch (error) {
    console.log(error)
  }
})

export default router
