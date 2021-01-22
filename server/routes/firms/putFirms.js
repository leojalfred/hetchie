import express from 'express'
import Firm from '../../models/Firm'
// import Ranking from '../../models/Ranking'
// import Qualification from '../../models/Qualification'

const router = express.Router()
router.put('/', async ({ body }, response) => {
  try {
    console.dir(body)
    response.send('Done')
  } catch (error) {
    console.log(error)
  }
})

export default router
