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

    const firmsMap = firms.reduce((map, firm) => {
      const { _id, ...data } = firm
      map[`${_id}`] = data['_doc']
      return map
    }, {})
    response.json(firmsMap)
  } catch (error) {
    console.log(error)
  }
})

export default router
